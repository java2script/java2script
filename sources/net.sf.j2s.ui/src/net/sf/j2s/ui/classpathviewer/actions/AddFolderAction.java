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


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import net.sf.j2s.ui.classpathviewer.IRuntimeClasspathEntry;
import net.sf.j2s.ui.classpathviewer.viewer.IClasspathViewer;
import net.sf.j2s.ui.classpathviewer.viewer.JavaRuntime;

import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Status;
import org.eclipse.jdt.debug.ui.IJavaDebugUIConstants;
import org.eclipse.jdt.internal.debug.core.JDIDebugPlugin;
import org.eclipse.jdt.internal.debug.ui.actions.ActionMessages;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.viewers.ILabelProvider;
import org.eclipse.jface.viewers.ITreeContentProvider;
import org.eclipse.jface.window.Window;
import org.eclipse.ui.dialogs.ElementTreeSelectionDialog;
import org.eclipse.ui.dialogs.ISelectionStatusValidator;
import org.eclipse.ui.model.WorkbenchContentProvider;
import org.eclipse.ui.model.WorkbenchLabelProvider;
import org.eclipse.ui.views.navigator.ResourceSorter;

/**
 * Adds an internal folder to the runtime class path.
 */
public class AddFolderAction extends RuntimeClasspathAction {

	public AddFolderAction(IClasspathViewer viewer) {
		super(ActionMessages.AddFolderAction_Add__Folders_1, viewer); //$NON-NLS-1$
	}	

	/**
	 * Prompts for folder(s) to add.
	 * 
	 * @see IAction#run()
	 */	
	public void run() {
		
		ISelectionStatusValidator validator= new ISelectionStatusValidator() {
			List fAlreadySelected = getSelectedFolders();
			public IStatus validate(Object[] selection) {
				for (int i= 0; i < selection.length; i++) {
					if (!(selection[i] instanceof IContainer)) {
						return new Status(IStatus.ERROR, JDIDebugPlugin.getUniqueIdentifier(), IJavaDebugUIConstants.INTERNAL_ERROR, ActionMessages.AddFolderAction_Selection_must_be_a_folder_2, null); //$NON-NLS-1$
					} else if (fAlreadySelected.contains(selection[i])) {
						return new Status(IStatus.ERROR, JDIDebugPlugin.getUniqueIdentifier(), IJavaDebugUIConstants.INTERNAL_ERROR, ActionMessages.AddFolderAction_Classpath_already_includes_selected_folder_s___1, null); //$NON-NLS-1$
					}
					
				}
				return new Status(IStatus.OK, JDIDebugPlugin.getUniqueIdentifier(), 0, "", null); //$NON-NLS-1$
			}			
		};
		
		ILabelProvider lp= new WorkbenchLabelProvider();
		ITreeContentProvider cp= new WorkbenchContentProvider();

		ElementTreeSelectionDialog dialog= new ElementTreeSelectionDialog(getShell(), lp, cp);
		dialog.setSorter(new ResourceSorter(ResourceSorter.NAME));
		dialog.setValidator(validator);
		dialog.setTitle(ActionMessages.AddFolderAction_Folder_Selection_4); //$NON-NLS-1$
		dialog.setMessage(ActionMessages.AddFolderAction_Choose_folders_to_add__5); //$NON-NLS-1$
		dialog.setInput(ResourcesPlugin.getWorkspace().getRoot());	

		if (dialog.open() == Window.OK) {
			Object[] elements= dialog.getResult();
			IRuntimeClasspathEntry[] res= new IRuntimeClasspathEntry[elements.length];
			for (int i= 0; i < res.length; i++) {
				IResource elem= (IResource)elements[i];
				res[i]= JavaRuntime.newArchiveRuntimeClasspathEntry(elem);
			}
			getViewer().addEntries(res);
		}
					
	}
	
	/**
	 * Returns a list of resources of currently selected folders
	 */
	protected List getSelectedFolders() {
		List list = getEntriesAsList();
		List folders = new ArrayList();
		Iterator iter = list.iterator();
		while (iter.hasNext()) {
			IRuntimeClasspathEntry entry = (IRuntimeClasspathEntry)iter.next();
			if (entry.getType() == IRuntimeClasspathEntry.ARCHIVE) {
				IResource res = entry.getResource();
				if (res != null && res instanceof IContainer) {
					folders.add(res);
				}
			}
		}
		return folders;
	}
	
	protected int getActionType() {
		return ADD;
	}
}
