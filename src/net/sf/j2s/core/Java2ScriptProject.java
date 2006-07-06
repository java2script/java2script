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

package net.sf.j2s.core;

import org.eclipse.core.resources.IProject;

/**
 * @author josson smith
 *
 * 2006-6-15
 */
public class Java2ScriptProject {

	public static boolean hasJava2ScriptNature(IProject project) {
		Java2ScriptProjectNature pn = new Java2ScriptProjectNature();
		pn.setProject(project);
		return pn.hasNature();
	}
	
}
