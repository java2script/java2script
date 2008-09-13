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
import org.eclipse.core.runtime.CoreException;
import org.eclipse.jdt.internal.core.ExternalJavaProject;

/**
 * @author zhou renjian
 *
 * 2006-6-15
 */
public class Java2ScriptProject {

	/**
	 * Returns true if the given project is accessible and it has
	 * a java nature, otherwise false.
	 * @param project IProject
	 * @return boolean
	 */
	public static boolean hasJava2ScriptNature(IProject project) { 
		try {
			return project.hasNature("net.sf.j2s.java2scriptnature");
		} catch (CoreException e) {
			if (ExternalJavaProject.EXTERNAL_PROJECT_NAME.equals(project.getName()))
				return true;
			// project does not exist or is not open
		}
		return false;
	}
	
}
