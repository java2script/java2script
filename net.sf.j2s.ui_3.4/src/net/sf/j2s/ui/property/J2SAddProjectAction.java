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
package net.sf.j2s.ui.property;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import net.sf.j2s.ui.classpath.IRuntimeClasspathEntry;
import net.sf.j2s.ui.classpath.ProjectResources;
import net.sf.j2s.ui.classpath.Resource;
import net.sf.j2s.ui.launching.JavaRuntime;

import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.MultiStatus;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.debug.ui.IJavaDebugUIConstants;
import org.eclipse.jdt.internal.debug.ui.JDIDebugUIPlugin;
import org.eclipse.jdt.internal.debug.ui.actions.ActionMessages;
import org.eclipse.jdt.internal.debug.ui.actions.ProjectSelectionDialog;
import org.eclipse.jface.window.Window;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.widgets.ScrollBar;

/**
 * @author zhou renjian
 *
 * 2006-2-1
 */
public class J2SAddProjectAction implements SelectionListener {
	
	J2SConfigPage page;
	
	public J2SAddProjectAction(J2SConfigPage page) {
		super();
		this.page = page;
	}

	/**
	 * Returns the possible projects that can be added
	 */
	protected List getPossibleAdditions() {
		IJavaProject[] projects;
		IWorkspaceRoot root = ResourcesPlugin.getWorkspace().getRoot();
		try {
			projects= JavaCore.create(root).getJavaProjects();
		} catch (JavaModelException e) {
			JDIDebugUIPlugin.log(e);
			projects= new IJavaProject[0];
		}
		List remaining = new ArrayList();
		String path = null; 
		if (page.j2sFile != null) {
			path = page.j2sFile.getAbsolutePath();
		}
		for (int i = 0; i < projects.length; i++) {
			File file = new File(projects[i].getProject().getLocation().toOSString(), ".j2s");
			//System.out.println(file.getAbsolutePath());
			if (file.exists() && (path != null && !path.equals(file.getAbsolutePath()))) {
				Properties props = new Properties();
				boolean isEnabled = false;
				try {
					props.load(new FileInputStream(file));
					String status = props.getProperty("j2s.compiler.status");
					if ("enable".equals(status)) {
						isEnabled = true;
					}
				} catch (FileNotFoundException e1) {
					e1.printStackTrace();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
				if (isEnabled) {
					List ress = page.classpathModel.resources;
					boolean existed = false;
					for (Iterator iter = ress.iterator(); iter.hasNext();) {
						Resource r = (Resource) iter.next();
						if (r instanceof ProjectResources) {
							ProjectResources pr = (ProjectResources) r;
							try {
								if (pr.getAbsoluteFile().getCanonicalPath().equals(file.getCanonicalPath())) {
									existed = true;
									break;
								}
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
						}
					}
					if (!existed) {
						remaining.add(projects[i]);
					}
				}
			}
		}
		List alreadySelected = new ArrayList();
		remaining.removeAll(alreadySelected);
		return remaining;		
	}

	public void widgetSelected(SelectionEvent e) {
		List projects = getPossibleAdditions();
		ProjectSelectionDialog dialog= new ProjectSelectionDialog(page.getShell(),projects);
		dialog.setTitle(ActionMessages.AddProjectAction_Project_Selection_2); 
		MultiStatus status = new MultiStatus(JDIDebugUIPlugin.getUniqueIdentifier(), IJavaDebugUIConstants.INTERNAL_ERROR, "One or more exceptions occurred while adding projects.", null);  //$NON-NLS-1$
				
		if (dialog.open() == Window.OK) {			
			Object[] expandedElements = page.viewer.getExpandedElements();
			Object[] selections = dialog.getResult();
			boolean added = false;
			for (int i = 0; i < selections.length; i++) {
				IJavaProject jp = (IJavaProject)selections[i];
				IRuntimeClasspathEntry entry = JavaRuntime.newProjectRuntimeClasspathEntry(jp);
				if (entry != null) {
					page.classpathModel.resources.add(entry);
					added = true;
				}
			}
			if (added) {
				ScrollBar bar =  page.viewer.getTree().getVerticalBar();
				double selection = 0;
				if (bar != null) {
					selection = (0.0 + bar.getSelection()) / bar.getMaximum();
				}
				 page.viewer.refresh();
				//viewer.expandToLevel(2);
				 page.viewer.setExpandedElements(expandedElements);
				if (bar != null) {
					bar.setSelection((int) Math.round(selection * bar.getMaximum()));
				}
				 page.updateButtonGroup();
				 page.fireConfigModified();
			}
		}		
	}

	public void widgetDefaultSelected(SelectionEvent e) {

	}

}
