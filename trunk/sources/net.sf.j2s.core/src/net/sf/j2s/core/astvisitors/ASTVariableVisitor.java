/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
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
public class ASTVariableVisitor extends ASTFieldVisitor {
	
	/**
	 * FinalVariable that is used to record variable state, which will provide
	 * information for compiler to decide the generated name in *.js. 
	 * 
	 * @author zhou renjian
	 *
	 * 2006-12-6
	 */
	public class FinalVariable {
		/**
		 * Level of the block
		 */
		int blockLevel;
		
		/**
		 * Final variable may be in a very deep anonymous class 
		 */
		String methodScope;
		
		/**
		 * Variable name that is defined in Java sources
		 */
		String variableName;
		
		/**
		 * Variable name that is to be generated in the compiled *.js
		 */
		String toVariableName;
		
		public FinalVariable(int blockLevel, String variableName, String methodScope) {
			super();
			this.blockLevel = blockLevel;
			this.variableName = variableName;
			this.methodScope = methodScope;
		}
		
		public String toString() {
			return variableName + ":" + variableName;
		}

		public int getBlockLevel() {
			return blockLevel;
		}

		public void setToVariableName(String toVarName) {
			toVariableName = toVarName;
		}
	}

	/**
	 * List of variables that are declared as final.
	 */
	protected List finalVars = new ArrayList();
	
	/**
	 * Final variables only make senses (need "this.f$[...]") inside anonymous
	 * class.
	 */
	protected boolean isFinalSensible = true;

	/**
	 * Normal (non-final) variables may be affected by final variable names.
	 */
	protected List normalVars = new ArrayList();

	/**
	 * Only those final variables that are referenced inside anonymous class
	 * need to be passed into anonymous class.
	 */
	protected List visitedVars = new ArrayList();
	
	/**
	 * Whether to compile variable names into minimized names or not
	 */
	protected boolean toCompileVariableName = true;

	public boolean isToCompileVariableName() {
		return toCompileVariableName;
	}

	public void setToCompileVariableName(boolean toCompileVariableName) {
		this.toCompileVariableName = toCompileVariableName;
	}

	protected String getVariableName(String name) {
		for (int i = normalVars.size() - 1; i >= 0; i--) {
			FinalVariable var = (FinalVariable) normalVars.get(i);
			if (name.equals(var.variableName)) {
				//return getIndexedVarName(name, i);
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
			for (Iterator iter = finalVars.iterator(); iter.hasNext();) {
				FinalVariable f = (FinalVariable) iter.next();
				if (newName.equals(f.toVariableName)) {
					newName = null;
					i++;
					break;
				}
			}
			if (newName != null) {
				for (Iterator iter = normalVars.iterator(); iter.hasNext();) {
					FinalVariable f = (FinalVariable) iter.next();
					if (newName.equals(f.toVariableName)) {
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
	protected String listFinalVariables(List list, String seperator, String scope) {
		if (list.size() == 0) {
			return "null";
		}
		StringBuffer buf = new StringBuffer();
		buf.append("Clazz.cloneFinals (");
		for (Iterator iter = list.iterator(); iter.hasNext();) {
			FinalVariable fv = (FinalVariable) iter.next();
			String name = fv.variableName;
			if (fv.toVariableName != null) {
				name = fv.toVariableName;
			}
			buf.append("\"");
			buf.append(name);
			buf.append("\", ");
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
		buf.append(")");
		return buf.toString();
	}

	/**
	 * If given expression is constant value expression, return its value 
	 * string; or return null.
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
				char charValue = ((Character)constValue).charValue();
				if (charValue < 32 || charValue > 127) {
					buffer.append("\\u");
					String hexStr = Integer.toHexString(charValue);
					int zeroLen = 4 - hexStr.length();
					for (int i = 0; i < zeroLen; i++) {
						buffer.append('0');
					}
					buffer.append(hexStr);
				} else {
					buffer.append(constValue);
				}
				buffer.append('\'');
			} else {
				buffer.append(constValue);
			}
			return buffer.toString();
		}
		return null;
	}
}
