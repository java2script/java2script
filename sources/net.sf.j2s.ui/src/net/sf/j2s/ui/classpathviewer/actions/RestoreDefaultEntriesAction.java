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
import net.sf.j2s.ui.classpathviewer.viewer.JavaClasspathTab;
import net.sf.j2s.ui.classpathviewer.viewer.JavaRuntime;

import org.eclipse.debug.core.ILaunchConfigurationWorkingCopy;
import org.eclipse.jdt.internal.debug.ui.actions.ActionMessages;
import org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.ui.actions.SelectionListenerAction;

/**
 * Restores default entries in the runtime classpath.
 */
public class RestoreDefaultEntriesAction extends RuntimeClasspathAction {
	
	private JavaClasspathTab fTab;
	
	public RestoreDefaultEntriesAction(IClasspathViewer viewer, JavaClasspathTab tab) {
		super(ActionMessages.RestoreDefaultEntriesAction_0, viewer); //$NON-NLS-1$
		fTab = tab;
	}	

	/**
	 * Prompts for a project to add.
	 * 
	 * @see IAction#run()
	 */	
	public void run() {
		IRuntimeClasspathEntry[] entries= null;
//		try {
			ILaunchConfigurationWorkingCopy copy= (ILaunchConfigurationWorkingCopy) fTab.getLaunchConfiguration();
			copy.setAttribute(IJavaLaunchConfigurationConstants.ATTR_DEFAULT_CLASSPATH, true);
			//copy.setAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, (String) null);
			entries= JavaRuntime.computeUnresolvedRuntimeClasspath(copy);
//		} catch (CoreException e) {
//			//TODO set error message
//			return;
//		}	
		getViewer().setEntries(entries);
	}

	/**
	 * @see SelectionListenerAction#updateSelection(IStructuredSelection)
	 */
	protected boolean updateSelection(IStructuredSelection selection) {
		return true;
	}
	
}
