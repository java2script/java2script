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
 * 2006-6-3
 */
public class NameConvertItem {
	public String className;
	public String varName;
	public String toVarName;
	public boolean isMethod;
	
	public NameConvertItem(String className, String varName, String toVarName, boolean isMethod) {
		super();
		this.className = className;
		this.varName = varName;
		this.toVarName = toVarName;
		this.isMethod = isMethod;
	}
	
}
