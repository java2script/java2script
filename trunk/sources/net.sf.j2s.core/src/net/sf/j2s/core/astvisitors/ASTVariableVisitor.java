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
 * @author zhou renjian
 *
 * 2006-12-3
 */
public class ASTVariableVisitor extends ASTFieldVisitor {
	
	protected List finalVars = new ArrayList();
	
	protected boolean isFinalSensible = true;

	protected List normalVars = new ArrayList();
	
	protected boolean toCompileVariableName = true;

	protected List visitedVars = new ArrayList();

	public boolean isToCompileVariableName() {
		return toCompileVariableName;
	}

	public void setToCompileVariableName(boolean toCompileVariableName) {
		this.toCompileVariableName = toCompileVariableName;
	}


	protected String getVariableName(String name) {
		for (int i = normalVars.size() - 1; i >= 0; i--) {
			FinalVariable var = (FinalVariable) normalVars.get(i);
			if (name.equals(var.getVariableName())) {
				//return getIndexedVarName(name, i);
				return var.getToVariableName();
			}
		}
		return name;
	}

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
				int h = i / 26;
				int l = i % 26;
				newName = String.valueOf((char) ('a' + h)) + String.valueOf((char) ('a' + l));
			}
			for (Iterator iter = finalVars.iterator(); iter.hasNext();) {
				FinalVariable f = (FinalVariable) iter.next();
				if (newName.equals(f.getToVariableName())) {
					newName = null;
					i++;
					break;
				}
			}
			if (newName != null) {
				for (Iterator iter = normalVars.iterator(); iter.hasNext();) {
					FinalVariable f = (FinalVariable) iter.next();
					if (newName.equals(f.getToVariableName())) {
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

	protected String listFinalVariables(List list, String seperator, String scope) {
		if (list.size() == 0) {
			return "null";
		}
		StringBuffer buf = new StringBuffer();
		buf.append("Clazz.cloneFinals (");
		for (Iterator iter = list.iterator(); iter.hasNext();) {
			FinalVariable fv = (FinalVariable) iter.next();
			String name = fv.getVariableName();
			if (fv.getToVariableName() != null) {
				name = fv.getToVariableName();
			}
				buf.append("\"");
				buf.append(name);
				buf.append("\", ");
				String methodScope = fv.getMethodScope();
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
			//}
		}
		buf.append(")");
		return buf.toString();
	}

}
