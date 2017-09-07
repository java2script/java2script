/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.core.astvisitors;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import org.eclipse.jdt.core.dom.Expression;

/**
 * Final variables inside anonymous class is a big thing for Java2Script
 * compiler. And Java2Script compiler also tries to minimize the variable
 * name.
 * 
 * @author zhou renjian
 *
 * 2006-12-3
 */
public class ASTVariableVisitor extends AbstractPluginVisitor {
	
	/**
	 * List of variables that are declared as final.
	 */
	protected List<ASTFinalVariable> finalVars = new ArrayList<ASTFinalVariable>();
	
	/**
	 * Final variables only make senses (need "this.f$[...]") inside anonymous
	 * class.
	 */
	protected boolean isFinalSensible = true;

	/**
	 * Normal (non-final) variables may be affected by final variable names.
	 */
	protected List<ASTFinalVariable> normalVars = new ArrayList<ASTFinalVariable>();

	/**
	 * Only those final variables that are referenced inside anonymous class
	 * need to be passed into anonymous class.
	 */
	protected List<ASTFinalVariable> visitedVars = new ArrayList<ASTFinalVariable>();
	
	/**
	 * Whether to compile variable names into minimized names or not
	 */
	protected boolean toCompileVariableName = false; // BH - ensure default is FALSE not TRUE

	public boolean isToCompileVariableName() {
		return toCompileVariableName;
	}

	/**
	 * @param toCompileVariableName  
	 */
	public void setToCompileVariableName(boolean toCompileVariableName) {
		//BH abandoned this.toCompileVariableName = toCompileVariableName;
	}

	protected String getVariableName(String name) {
		for (int i = normalVars.size() - 1; i >= 0; i--) {
			ASTFinalVariable var =  normalVars.get(i);
			if (name.equals(var.variableName)) {
				return var.toVariableName;
			}
		}
		return name;
	}


	/**
	 * Try to return a minimized variable name for the given index order.
	 * @param name
	 * @param i
	 * @return
	 */
	public String getIndexedVarName(String name, int i) {
		if (!toCompileVariableName) {
			return name;
		}
		String newName = null;
		while (true) {
			if (i < 26) {
				newName = String.valueOf((char) ('a' + i));
			} else if (i < 52) {
				newName = String.valueOf((char) ('A' + (i - 26)));
			} else {
				/*
				 * Here compiler assumes that there are no project with more than
				 * 26 * 26 variables.
				 */
				int h = i / 26;
				int l = i % 26;
				newName = String.valueOf((char) ('a' + h)) + String.valueOf((char) ('a' + l));
			}
			for (Iterator<ASTFinalVariable> iter = finalVars.iterator(); iter.hasNext();) {
				if (newName.equals(iter.next().toVariableName)) {
					newName = null;
					i++;
					break;
				}
			}
			if (newName != null) {
				for (Iterator<ASTFinalVariable> iter = normalVars.iterator(); iter.hasNext();) {
					if (newName.equals(iter.next().toVariableName)) {
						newName = null;
						i++;
						break;
					}
				}
			}
			if (newName != null) {
				break;
			}
		}
		return newName;
	}

	/**
	 * Generated final variable list for anonymous class creation.
	 * <ol>
	 * 	<li>Generate "null" if there are no referenced final variales inside 
	 * anonymous class</li>
	 *  <li>Generate "Clazz.cloneFinals (...)" if there are referenced final 
	 * variable</li>
	 * </ol>
	 * 
	 * @param list
	 * @param seperator
	 * @param scope
	 * @return
	 */
	protected String listFinalVariables(List<ASTFinalVariable> list, String seperator, String scope) {
		if (list.size() == 0) {
			return "null";
		}
		StringBuffer buf = new StringBuffer();
		buf.append("{");
		for (Iterator<ASTFinalVariable> iter = list.iterator(); iter.hasNext();) {
			ASTFinalVariable fv = iter.next();
			String name = fv.variableName;
			if (fv.toVariableName != null) {
				name = fv.toVariableName;
			}
			//buf.append("\"");
			buf.append(name);
			//buf.append("\": ");
			buf.append(": ");
			String methodScope = fv.methodScope;
			if (methodScope == null && scope == null) {
				buf.append(name);
			} else if (methodScope == null || scope == null) {
				buf.append("this.$finals." + name);
			} else if (methodScope.equals(scope)) {
				buf.append(name);
			} else {
				buf.append("this.$finals." + name);
			}
			if (iter.hasNext()) {
				buf.append(seperator);
			}
		}
		buf.append("}");
		return buf.toString();
	}

	/**
	 * If given expression is constant value expression, return its value 
	 * string; or character or return null.
	 * 
	 * @param node
	 * @return
	 */
	protected String checkConstantValue(Expression node) {
		Object constValue = node.resolveConstantExpressionValue();
		if (constValue != null && (constValue instanceof Number
				|| constValue instanceof Character
				|| constValue instanceof Boolean)) {
			StringBuffer buffer = new StringBuffer();
			if (constValue instanceof Character) {
				buffer.append('\'');
				addChar(((Character)constValue).charValue(), buffer);
				buffer.append('\'');
			} else {
				// Number or Boolean
				buffer.append(constValue);
			}
			return buffer.toString();
		}
		if (constValue instanceof String) {
			StringBuffer buffer = new StringBuffer();
			String str = (String) constValue;
			int length = str.length();
			buffer.append("\"");
			for (int i = 0; i < length; i++)
				addChar(str.charAt(i), buffer);
			buffer.append("\"");
			return buffer.toString();
		}
		return null;
	}

	private void addChar(char c, StringBuffer buffer) {
		if (c < 32 || c > 127) {
			String hexStr = "0000" + Integer.toHexString(c);
			buffer.append("\\u").append(hexStr.substring(hexStr.length() - 4));
		} else {
			switch (c) {
			case '\\':
			case '\'':
			case '\"':
				buffer.append('\\');
				buffer.append(c);
				break;
			case '\r':
				buffer.append("\\r");
				break;
			case '\n':
				buffer.append("\\n");
				break;
			case '\t':
				buffer.append("\\t");
				break;
			case '\f':
				buffer.append("\\f");
				break;
			default:
				buffer.append(c);
				break;
			}
		}
	}
}
