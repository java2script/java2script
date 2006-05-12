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

import org.eclipse.core.runtime.CoreException;
import org.eclipse.jdt.core.IClasspathEntry;
import org.eclipse.jdt.internal.debug.ui.JDIDebugUIPlugin;
import org.eclipse.jdt.internal.debug.ui.actions.ActionMessages;
import org.eclipse.jdt.internal.debug.ui.launcher.LauncherMessages;
import org.eclipse.jdt.ui.wizards.BuildPathDialogAccess;

/**
 * Adds a library to the runtime class path.
 */
public class AddLibraryAction extends RuntimeClasspathAction {

	public AddLibraryAction(IClasspathViewer viewer) {
		super(ActionMessages.AddLibraryAction_0, viewer); //$NON-NLS-1$
	}	

	/**
	 * Prompts for folder(s) to add.
	 * 
	 * @see org.eclipse.jface.action.IAction#run()
	 */	
	public void run() {

		IClasspathEntry[] newEntries = BuildPathDialogAccess.chooseContainerEntries(getShell(), null, new IClasspathEntry[0]);
		if (newEntries != null) {
			IRuntimeClasspathEntry[] res= new IRuntimeClasspathEntry[newEntries.length];
			for (int i = 0; i < newEntries.length; i++) {
				IClasspathEntry entry = newEntries[i];
				try {
					res[i] = JavaRuntime.newRuntimeContainerClasspathEntry(entry.getPath(), IRuntimeClasspathEntry.STANDARD_CLASSES);
				} catch (CoreException e) {
					JDIDebugUIPlugin.errorDialog(LauncherMessages.RuntimeClasspathAdvancedDialog_Unable_to_create_new_entry__3, e); //$NON-NLS-1$
					return;
				}
			}
			getViewer().addEntries(res);
		}								
	}
		
	protected int getActionType() {
		return ADD;
	}
}
