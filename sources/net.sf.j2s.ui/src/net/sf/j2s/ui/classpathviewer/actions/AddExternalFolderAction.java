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
import org.eclipse.core.runtime.Path;
import org.eclipse.jdt.internal.debug.ui.actions.ActionMessages;
import org.eclipse.jface.action.IAction;
import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.DirectoryDialog;

/**
 * Adds an external folder to the runtime class path.
 */
public class AddExternalFolderAction extends OpenDialogAction {

	public AddExternalFolderAction(IClasspathViewer viewer, String dialogSettingsPrefix) {
		super(ActionMessages.AddExternalFolderAction_Add_External_Folder_1, viewer, dialogSettingsPrefix); //$NON-NLS-1$
	}	

	/**
	 * Prompts for a folder to add.
	 * 
	 * @see IAction#run()
	 */	
	public void run() {
							
		String lastUsedPath= getDialogSetting(LAST_PATH_SETTING);
		if (lastUsedPath == null) {
			lastUsedPath= ""; //$NON-NLS-1$
		}
		DirectoryDialog dialog= new DirectoryDialog(getShell(), SWT.MULTI);
		dialog.setText(ActionMessages.AddExternalFolderAction_Folder_Selection_3); //$NON-NLS-1$
		dialog.setFilterPath(lastUsedPath);
		String res= dialog.open();
		if (res == null) {
			return;
		}
			
		IPath filterPath= new Path(dialog.getFilterPath());
		IRuntimeClasspathEntry[] elems= new IRuntimeClasspathEntry[1];
		IPath path= new Path(res).makeAbsolute();	
		elems[0]= JavaRuntime.newArchiveRuntimeClasspathEntry(path);

		setDialogSetting(LAST_PATH_SETTING, filterPath.toOSString());
		
		getViewer().addEntries(elems);
	}	
}
