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

package net.sf.j2s.core;

import org.eclipse.core.resources.IProject;

/**
 * @author zhou renjian
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
