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
package net.sf.j2s.ui.property;

import java.io.File;
import java.util.ArrayList;

import net.sf.j2s.ui.classpathviewer.IRuntimeClasspathEntry;
import net.sf.j2s.ui.classpathviewer.actions.ArchiveFilter;
import net.sf.j2s.ui.classpathviewer.viewer.JavaRuntime;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Status;
import org.eclipse.jdt.internal.debug.core.JDIDebugPlugin;
import org.eclipse.jdt.internal.debug.ui.actions.ActionMessages;
import org.eclipse.jface.viewers.ILabelProvider;
import org.eclipse.jface.viewers.ITreeContentProvider;
import org.eclipse.jface.viewers.StructuredSelection;
import org.eclipse.jface.viewers.TreeViewer;
import org.eclipse.jface.viewers.ViewerFilter;
import org.eclipse.jface.window.Window;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.ScrollBar;
import org.eclipse.ui.dialogs.ElementTreeSelectionDialog;
import org.eclipse.ui.dialogs.ISelectionStatusValidator;
import org.eclipse.ui.model.WorkbenchContentProvider;
import org.eclipse.ui.model.WorkbenchLabelProvider;
import org.eclipse.ui.views.navigator.ResourceSorter;

/**
 * @author josson smith
 *
 * 2006-2-1
 */
public class J2SAddJarAction implements SelectionListener {
	J2SConfigPage page;
	
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

	
	public J2SAddJarAction(J2SConfigPage page) {
		super();
		this.page = page;
	}

	public void widgetSelected(SelectionEvent e) {
		ViewerFilter filter= new ArchiveFilter(new ArrayList());
		IWorkspaceRoot root = ResourcesPlugin.getWorkspace().getRoot();
		String rootPath = root.getLocation().toOSString();
		String rootTruePath = new File(rootPath).getAbsolutePath();
		String j2sPath = page.j2sFile.getAbsolutePath();
		String prjName = null;
		if (j2sPath.startsWith(rootTruePath)) {
			j2sPath = j2sPath.substring(rootTruePath.length());
			if (j2sPath.startsWith(File.separator)) {
				j2sPath = j2sPath.substring(1);
			}
			prjName = j2sPath.substring(0, j2sPath.indexOf(File.separatorChar));
		}
		final IProject project = (prjName != null) ? root.getProject(prjName) : null;
		ILabelProvider lp= new WorkbenchLabelProvider();
		ITreeContentProvider cp= new WorkbenchContentProvider();

		ElementTreeSelectionDialog dialog= new ElementTreeSelectionDialog(e.display.getActiveShell(), lp, cp) {
			protected TreeViewer createTreeViewer(Composite parent) {
				TreeViewer treeViewer = super.createTreeViewer(parent);
				
				if (project != null) {
					treeViewer.setSelection(new StructuredSelection(project));
					treeViewer.expandToLevel(project, 2);
				}
				return treeViewer;
			}
		};
		dialog.setValidator(validator);
		dialog.setTitle(ActionMessages.AddJarAction_JAR_Selection_7); //$NON-NLS-1$
		dialog.setMessage(ActionMessages.AddJarAction_Choose_jars_to_add__8); //$NON-NLS-1$
		dialog.addFilter(filter);
		//dialog.setInitialSelection(page.j2s);
		//if (configuration == null) {
			dialog.setInput(root);
//		} else {
//			try {
//				String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
//				dialog.setInput(ResourcesPlugin.getWorkspace().getRoot().getProject(projectName));
//			} catch (CoreException e) {
//				e.printStackTrace();
//				dialog.setInput(ResourcesPlugin.getWorkspace().getRoot());
//			}
//		}
		dialog.setSorter(new ResourceSorter(ResourceSorter.NAME));

		if (dialog.open() == Window.OK) {
			Object[] expandedElements = page.viewer.getExpandedElements();
			Object[] elements= dialog.getResult();
			boolean added = false;
			for (int i= 0; i < elements.length; i++) {
				IResource elem= (IResource)elements[i];
				IRuntimeClasspathEntry entry = JavaRuntime.newArchiveRuntimeClasspathEntry(elem);
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
			//getViewer().addEntries(res);
		}	
	}

	public void widgetDefaultSelected(SelectionEvent e) {
		// TODO Auto-generated method stub

	}

}
