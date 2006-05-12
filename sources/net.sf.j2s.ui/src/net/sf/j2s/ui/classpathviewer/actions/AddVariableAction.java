/*******************************************************************************
 * Copyright (c) 2000, 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package net.sf.j2s.ui.classpathviewer.actions;


import net.sf.j2s.ui.classpathviewer.IRuntimeClasspathEntry;
import net.sf.j2s.ui.classpathviewer.viewer.IClasspathViewer;
import net.sf.j2s.ui.classpathviewer.viewer.JavaRuntime;

import org.eclipse.core.runtime.IPath;
import org.eclipse.jdt.internal.debug.ui.actions.ActionMessages;
import org.eclipse.jdt.ui.wizards.BuildPathDialogAccess;

/**
 * Adds a variable to the runtime class path.
 */
public class AddVariableAction extends RuntimeClasspathAction {

	public AddVariableAction(IClasspathViewer viewer) {
		super(ActionMessages.AddVariableAction_Add_Variables_1, viewer); //$NON-NLS-1$
	}	

	/**
	 * Prompts for variables to add.
	 * 
	 * @see org.eclipse.jface.action.IAction#run()
	 */	
	public void run() {
		
		IPath[] paths = BuildPathDialogAccess.chooseVariableEntries(getShell(), new IPath[0]);
		if (paths != null) {			
			IRuntimeClasspathEntry[] entries = new IRuntimeClasspathEntry[paths.length];
			for (int i = 0; i < paths.length; i++) {
				entries[i] = JavaRuntime.newVariableRuntimeClasspathEntry(paths[i]);
			}
			getViewer().addEntries(entries);
		}				
	}
	
	protected int getActionType() {
		return ADD;
	}
}
