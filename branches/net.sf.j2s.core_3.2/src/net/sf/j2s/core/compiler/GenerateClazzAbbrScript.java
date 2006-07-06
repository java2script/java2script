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

package net.sf.j2s.core.compiler;

/**
 * @author josson smith
 *
 * 2006-5-2
 */
public class GenerateClazzAbbrScript {

	public static void main(String[] args) {
		String[] clazzAbbrMap = Java2ScriptCompiler.getClazzAbbrMap();
		StringBuffer buf = new StringBuffer();
		for (int i = 0; i < clazzAbbrMap.length / 2; i++) {
			buf.append("$_" + clazzAbbrMap[i + i + 1] + "=" + clazzAbbrMap[i + i] + ";");
		}
		System.out.println(buf.toString());
	}

}
