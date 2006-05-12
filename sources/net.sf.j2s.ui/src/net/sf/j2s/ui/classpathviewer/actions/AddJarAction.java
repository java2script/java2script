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

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Status;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.jdt.internal.debug.core.JDIDebugPlugin;
import org.eclipse.jdt.internal.debug.ui.actions.ActionMessages;
import org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.viewers.ILabelProvider;
import org.eclipse.jface.viewers.ITreeContentProvider;
import org.eclipse.jface.viewers.ViewerFilter;
import org.eclipse.jface.window.Window;
import org.eclipse.ui.dialogs.ElementTreeSelectionDialog;
import org.eclipse.ui.dialogs.ISelectionStatusValidator;
import org.eclipse.ui.model.WorkbenchContentProvider;
import org.eclipse.ui.model.WorkbenchLabelProvider;
import org.eclipse.ui.views.navigator.ResourceSorter;

/**
 * Adds an internal jar to the runtime class path.
 */
public class AddJarAction extends RuntimeClasspathAction {

	private ISelectionStatusValidator validator= new ISelectionStatusValidator() {
		public IStatus validate(Object[] selection) {
			if (selection.length == 0) {
				return new Status(IStatus.ERROR, JDIDebugPlugin.getUniqueIdentifier(), 0, "", null); //$NON-NLS-1$
			}
			for (int i= 0; i < selection.length; i++) {
				if (!(selection[i] instanceof IFile)) {
					return new Status(IStatus.ERROR, JDIDebugPlugin.getUniqueIdentifier(), 0, "", null); //$NON-NLS-1$
				}					
			}
			return new Status(IStatus.OK, JDIDebugPlugin.getUniqueIdentifier(), 0, "", null); //$NON-NLS-1$
		}			
	};

	public AddJarAction(IClasspathViewer viewer) {
		super(ActionMessages.AddJarAction_Add__JARs_1, viewer); //$NON-NLS-1$
		//this.configuration = configuration;
	}	
	private ILaunchConfiguration configuration;
	public AddJarAction(IClasspathViewer viewer, ILaunchConfiguration configuration) {
		super(ActionMessages.AddJarAction_Add__JARs_1, viewer); //$NON-NLS-1$
		this.configuration = configuration;
	}	
	public ILaunchConfiguration getConfiguration() {
		return configuration;
	}

	public void setConfiguration(ILaunchConfiguration configuration) {
		this.configuration = configuration;
	}

	/**
	 * Prompts for a jar to add.
	 * 
	 * @see IAction#run()
	 */	
	public void run() {
		
		ViewerFilter filter= new ArchiveFilter(getSelectedJars());
		
		ILabelProvider lp= new WorkbenchLabelProvider();
		ITreeContentProvider cp= new WorkbenchContentProvider();

		ElementTreeSelectionDialog dialog= new ElementTreeSelectionDialog(getShell(), lp, cp);
		dialog.setValidator(validator);
		dialog.setTitle(ActionMessages.AddJarAction_JAR_Selection_7); //$NON-NLS-1$
		dialog.setMessage(ActionMessages.AddJarAction_Choose_jars_to_add__8); //$NON-NLS-1$
		dialog.addFilter(filter);
		if (configuration == null) {
			dialog.setInput(ResourcesPlugin.getWorkspace().getRoot());
		} else {
			try {
				String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
				dialog.setInput(ResourcesPlugin.getWorkspace().getRoot().getProject(projectName));
			} catch (CoreException e) {
				e.printStackTrace();
				dialog.setInput(ResourcesPlugin.getWorkspace().getRoot());
			}
		}
		dialog.setSorter(new ResourceSorter(ResourceSorter.NAME));

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
	 * Returns a list of resources of currently selected jars
	 */
	protected List getSelectedJars() {
		List list = getEntriesAsList();
		List jars = new ArrayList();
		Iterator iter = list.iterator();
		while (iter.hasNext()) {
			IRuntimeClasspathEntry entry = (IRuntimeClasspathEntry)iter.next();
			if (entry.getType() == IRuntimeClasspathEntry.ARCHIVE) {
				IResource res = entry.getResource();
				if (res != null && res instanceof IFile) {
					jars.add(res);
				}
			}
		}
		return jars;
	}
	
	protected int getActionType() {
		return ADD;
	}
}
