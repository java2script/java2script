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

/**
 * @author josson smith
 *
 * 2006-2-8
 */
public class FinalVariable {
	private int blockLevel;
	private String variableName;
	private String methodScope;
	private String toVariableName;
	
	private FinalVariable() {
	}
	
	public FinalVariable(int blockLevel, String variableName, String methodScope) {
		super();
		this.blockLevel = blockLevel;
		this.variableName = variableName;
		this.methodScope = methodScope;
	}
	public int getBlockLevel() {
		return blockLevel;
	}
	public void setBlockLevel(int blockLevel) {
		this.blockLevel = blockLevel;
	}
	public String getVariableName() {
		return variableName;
	}
	public void setVariableName(String variableName) {
		this.variableName = variableName;
	}
	
	public String getToVariableName() {
		return toVariableName;
	}

	public void setToVariableName(String toVariableName) {
		this.toVariableName = toVariableName;
	}

	public String getMethodScope() {
		return methodScope;
	}

	public void setMethodScope(String methodScope) {
		this.methodScope = methodScope;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return variableName + ":" + variableName;
	}
}
