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


import java.io.File;
import java.util.ArrayList;
import java.util.List;

import net.sf.j2s.ui.classpathviewer.IRuntimeClasspathEntry;
import net.sf.j2s.ui.classpathviewer.Resource;
import net.sf.j2s.ui.classpathviewer.UnitClass;
import net.sf.j2s.ui.classpathviewer.viewer.IClasspathViewer;
import net.sf.j2s.ui.classpathviewer.viewer.JavaRuntime;

import org.eclipse.core.resources.IContainer;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.MultiStatus;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.jdt.debug.ui.IJavaDebugUIConstants;
import org.eclipse.jdt.internal.debug.ui.JDIDebugUIPlugin;
import org.eclipse.jdt.internal.debug.ui.actions.ActionMessages;
import org.eclipse.jdt.ui.ISharedImages;
import org.eclipse.jdt.ui.JavaUI;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.viewers.ILabelProvider;
import org.eclipse.jface.viewers.IStructuredContentProvider;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.jface.viewers.LabelProvider;
import org.eclipse.jface.viewers.Viewer;
import org.eclipse.jface.window.Window;
import org.eclipse.swt.graphics.Image;
import org.eclipse.ui.actions.SelectionListenerAction;
import org.eclipse.ui.dialogs.ListSelectionDialog;
import org.eclipse.ui.model.WorkbenchLabelProvider;

/**
 * Adds a project to the runtime class path.
 */
public class AddClassAction extends RuntimeClasspathAction {
	
	class MyClassLabelProvider extends LabelProvider {

		public Image getImage(Object element) {
			if (element instanceof Resource) {
				IRuntimeClasspathEntry entry = (IRuntimeClasspathEntry) element;
				Resource resource = (Resource) element;
				if (resource != null && resource instanceof UnitClass) {
                    return JavaUI.getSharedImages().getImage(ISharedImages.IMG_OBJS_CLASS);
				}
				if (resource instanceof IContainer) {
					WorkbenchLabelProvider lp = new WorkbenchLabelProvider();
					return lp.getImage(resource);
				}
				boolean external = resource == null;
				//boolean source = (entry.getSourceAttachmentPath() != null && !Path.EMPTY.equals(entry.getSourceAttachmentPath()));
				String key = null;
				if (external) {
					IPath path = entry.getPath();
					if (path != null)
					{
						//TODO: check for invalid paths and change image
						File file = path.toFile();
						if (file.exists() && file.isDirectory()) {
							key = ISharedImages.IMG_OBJS_PACKFRAG_ROOT;
						//} else if (source) {
	                    //    key = ISharedImages.IMG_OBJS_EXTERNAL_ARCHIVE_WITH_SOURCE;
						} else {
							key = ISharedImages.IMG_OBJS_EXTERNAL_ARCHIVE;
						}	
					}

				} else {
//					if (source) {
//						key = ISharedImages.IMG_OBJS_JAR_WITH_SOURCE;
//					} else {
						key = ISharedImages.IMG_OBJS_JAR;
//					}
				}
				if (key != null) {
					return JavaUI.getSharedImages().getImage(key);
				} else {
					return JavaUI.getSharedImages().getImage(ISharedImages.IMG_OBJS_LIBRARY);
				}
			}
			return super.getImage(element);
		}

		public String getText(Object element) {
			if (element instanceof Resource) {
				Resource res = (Resource) element;
				return res.getName();
			}
			return super.getText(element);
		}
		
	}
	class ContentProvider implements IStructuredContentProvider {
		
		private List fClasses;
		
		public ContentProvider(List projects) {
			fClasses = projects;
		}
		
		/**
		 * @see org.eclipse.jface.viewers.IStructuredContentProvider#getElements(java.lang.Object)
		 */
		public Object[] getElements(Object inputElement) {
			return fClasses.toArray();
		}

		/**
		 * @see org.eclipse.jface.viewers.IContentProvider#dispose()
		 */
		public void dispose() {
		}

		/**
		 * @see org.eclipse.jface.viewers.IContentProvider#inputChanged(org.eclipse.jface.viewers.Viewer, java.lang.Object, java.lang.Object)
		 */
		public void inputChanged(
			Viewer viewer,
			Object oldInput,
			Object newInput) {
		}

	}	

	private ILaunchConfiguration configuration;
	public AddClassAction(IClasspathViewer viewer, ILaunchConfiguration configuration) {
		//super(ActionMessages.AddProjectAction_Add_Project_1, viewer); //$NON-NLS-1$
		super("Add Classes...", viewer); //$NON-NLS-1$
		this.configuration = configuration;
	}	

	public ILaunchConfiguration getConfiguration() {
		return configuration;
	}

	public void setConfiguration(ILaunchConfiguration configuration) {
		this.configuration = configuration;
	}

	/**
	 * Prompts for a project to add.
	 * 
	 * @see IAction#run()
	 */	
	public void run() {
		List classes = getPossibleAdditions();
		
		ILabelProvider labelProvider= new MyClassLabelProvider();
		IStructuredContentProvider content = new ContentProvider(classes);
		ListSelectionDialog dialog= new ListSelectionDialog(getShell(),classes, content, labelProvider, ActionMessages.AddProjectAction_Choose__project_s__to_add__3); //$NON-NLS-1$
		dialog.setTitle(ActionMessages.AddProjectAction_Project_Selection_2); //$NON-NLS-1$
		MultiStatus status = new MultiStatus(JDIDebugUIPlugin.getUniqueIdentifier(), IJavaDebugUIConstants.INTERNAL_ERROR, ActionMessages.AddProjectAction_One_or_more_exceptions_occurred_while_adding_projects__1, null); //$NON-NLS-1$
				
		if (dialog.open() == Window.OK) {			
			Object[] selections = dialog.getResult();
//			
//			List additions = new ArrayList(selections.length);
//			for (int i = 0; i < selections.length; i++) {
//				IJavaProject jp = (IJavaProject)selections[i];
//				additions.add(jp);
//			}
//			
//			List runtimeEntries = new ArrayList(additions.size());
//			Iterator iter = additions.iterator();
//			while (iter.hasNext()) {
//				IJavaProject jp = (IJavaProject)iter.next();
//				runtimeEntries.add(JavaRuntime.newProjectRuntimeClasspathEntry(jp));
//			}
//			IRuntimeClasspathEntry[] entries = (IRuntimeClasspathEntry[])runtimeEntries.toArray(new IRuntimeClasspathEntry[runtimeEntries.size()]);
			IRuntimeClasspathEntry[] entries = new IRuntimeClasspathEntry[selections.length];
			for (int i = 0; i < selections.length; i++) {
				entries[i] = (IRuntimeClasspathEntry) selections[i];
			}
			getViewer().addEntries(entries);
		}	
		
		content.dispose();
		labelProvider.dispose();			
		
		if (!status.isOK()) {
			JDIDebugUIPlugin.errorDialog(status.getMessage(), status);
		}
	}

	/**
	 * @see SelectionListenerAction#updateSelection(IStructuredSelection)
	 */
	protected boolean updateSelection(IStructuredSelection selection) {
		return getViewer().updateSelection(getActionType(), selection)/* && !getPossibleAdditions().isEmpty()*/;
	}
	
	protected int getActionType() {
		return ADD;
	}
	
	/**
	 * Returns the possible projects that can be added
	 */
	protected List getPossibleAdditions() {
		List units = new ArrayList();
		IRuntimeClasspathEntry[] classes = JavaRuntime.computeUpdatedRuntimeClasspath(configuration);
		for (int i = 0; i < classes.length; i++) {
			if (classes[i] instanceof Resource) {
				Resource res = (Resource) classes[i];
				if (res.exists()) {
					System.out.println(res.getAbsoluteFile().exists());
					units.add(classes[i]);
				}
			}
		}
		return units;
//		File workingDirectory = null;
//		try {
//			workingDirectory = J2SLaunchingUtil.getWorkingDirectory(configuration);
//		} catch (CoreException e2) {
//			// TODO Auto-generated catch block
//			e2.printStackTrace();
//		}
//		if (workingDirectory == null) {
//			return new ArrayList();
//		}
//		new File(workingDirectory, ".j2s");
//		IJavaProject[] projects;
//		IWorkspaceRoot root = ResourcesPlugin.getWorkspace().getRoot();
//		try {
//			projects= JavaCore.create(root).getJavaProjects();
//		} catch (JavaModelException e) {
//			JDIDebugUIPlugin.log(e);
//			projects= new IJavaProject[0];
//		}
//		List remaining = new ArrayList();
//		for (int i = 0; i < projects.length; i++) {
//			File file = new File(projects[i].getProject().getLocation().toOSString(), ".j2s");
//			System.out.println(file.getAbsolutePath());
//			if (file.exists()) {
//				Properties props = new Properties();
//				boolean isEnabled = false;
//				try {
//					props.load(new FileInputStream(file));
//					String status = props.getProperty("j2s.compiler.status");
//					if ("enable".equals(status)) {
//						isEnabled = true;
//					}
//				} catch (FileNotFoundException e1) {
//					e1.printStackTrace();
//				} catch (IOException e1) {
//					e1.printStackTrace();
//				}
//				if (isEnabled) {
//			remaining.add(projects[i]);
//				}
//			}
//		}
//		List alreadySelected = new ArrayList();
//		IRuntimeClasspathEntry[] entries = getViewer().getEntries();
//		for (int i = 0; i < entries.length; i++) {
//			if (entries[i].getType() == IRuntimeClasspathEntry.PROJECT) {
//				IPath path = entries[i].getPath();
//				IResource res = root.findMember(path);
//				IJavaProject jp = (IJavaProject)JavaCore.create(res);
//				alreadySelected.add(jp);
//			}
//		}
//		remaining.removeAll(alreadySelected);
//		return remaining;		
	}
}
