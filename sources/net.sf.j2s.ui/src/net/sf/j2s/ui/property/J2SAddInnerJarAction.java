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
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import net.sf.j2s.ui.classpath.CSSResource;
import net.sf.j2s.ui.classpath.CompositeResources;
import net.sf.j2s.ui.classpath.ContactedClasses;
import net.sf.j2s.ui.classpath.ContactedUnitClass;
import net.sf.j2s.ui.classpath.IRuntimeClasspathEntry;
import net.sf.j2s.ui.classpath.ProjectResources;
import net.sf.j2s.ui.classpath.Resource;
import net.sf.j2s.ui.classpath.UnitClass;
import net.sf.j2s.ui.launching.JavaRuntime;
import net.sf.j2s.ui.resources.ExternalResources;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Status;
import org.eclipse.jdt.internal.debug.core.JDIDebugPlugin;
import org.eclipse.jdt.internal.debug.ui.actions.ActionMessages;
import org.eclipse.jdt.internal.debug.ui.actions.ObjectFilter;
import org.eclipse.jdt.ui.ISharedImages;
import org.eclipse.jdt.ui.JavaUI;
import org.eclipse.jface.viewers.ILabelProvider;
import org.eclipse.jface.viewers.ITreeContentProvider;
import org.eclipse.jface.viewers.LabelProvider;
import org.eclipse.jface.viewers.StructuredSelection;
import org.eclipse.jface.viewers.TreeViewer;
import org.eclipse.jface.viewers.Viewer;
import org.eclipse.jface.viewers.ViewerFilter;
import org.eclipse.jface.window.Window;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.graphics.Image;
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
public class J2SAddInnerJarAction implements SelectionListener {
	J2SConfigPage page;
	File j2sFile;
	
	private ISelectionStatusValidator validator= new ISelectionStatusValidator() {
		public IStatus validate(Object[] selection) {
			if (selection.length == 0) {
				return new Status(IStatus.ERROR, JDIDebugPlugin.getUniqueIdentifier(), 0, "", null); //$NON-NLS-1$
			}
			for (int i= 0; i < selection.length; i++) {
				if (!(selection[i] instanceof String)) {
					return new Status(IStatus.ERROR, JDIDebugPlugin.getUniqueIdentifier(), 0, "", null); //$NON-NLS-1$
				}					
			}
			return new Status(IStatus.OK, JDIDebugPlugin.getUniqueIdentifier(), 0, "", null); //$NON-NLS-1$
		}			
	};

	
	public J2SAddInnerJarAction(J2SConfigPage page) {
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
//		ILabelProvider lp= new WorkbenchLabelProvider();
//		ITreeContentProvider cp= new WorkbenchContentProvider();
		ILabelProvider lp= new LabelProvider() {
		
			public String getText(Object element) {
				if (element instanceof J2SLibrary[]) {
					//J2SLibrary[] libs = (J2SLibrary[]) element;
					return "Inner JS Library";
				} else if (element instanceof J2SLibrary) {
					J2SLibrary lib = (J2SLibrary) element;
					String name = lib.getName();
					return name;
				} else if (element instanceof String) {
					String res = (String) element;
					String name = new File(res).getName();
					if (name.endsWith(".j2x")) {
						return name.substring(0, name.length() - 4);
					}
					return name;
				}
				return super.getText(element);
			}
		
			public Image getImage(Object element) {
//				if (element instanceof UnitClass || element instanceof ContactedUnitClass) {
//		            return JavaUI.getSharedImages().getImage(ISharedImages.IMG_OBJS_CLASS);
//				} else if (element instanceof CSSResource) {
//		            return JavaUI.getSharedImages().getImage(ISharedImages.IMG_OBJS_CFILE);
//				} else if (element instanceof ContactedClasses) {
//		            return JavaUI.getSharedImages().getImage(ISharedImages.IMG_OBJS_LIBRARY);
//				} else if (element instanceof ProjectResources) {
//		            return JavaUI.getSharedImages().getImage(ISharedImages.IMG_OBJS_PACKFRAG_ROOT);
//				} else if (element instanceof CompositeResources) {
//		            return JavaUI.getSharedImages().getImage(ISharedImages.IMG_OBJS_EXTERNAL_ARCHIVE);
//				} else if (element instanceof J2SCategory) {
//					J2SCategory ctg = (J2SCategory) element;
//					//if (ctg)
//		            return JavaUI.getSharedImages().getImage(ISharedImages.IMG_OBJS_EMPTY_LOGICAL_PACKAGE);
//				}
				if (element instanceof J2SLibrary[]) {
		            return JavaUI.getSharedImages().getImage(ISharedImages.IMG_OBJS_PACKFRAG_ROOT);
				} else if (element instanceof J2SLibrary) {
		            return JavaUI.getSharedImages().getImage(ISharedImages.IMG_OBJS_PACKFRAG_ROOT);
				} else if (element instanceof String) {
		            return JavaUI.getSharedImages().getImage(ISharedImages.IMG_OBJS_LIBRARY);
				}
				return super.getImage(element);
			}
		
		};
		ITreeContentProvider cp= new ITreeContentProvider() {
		
			public void inputChanged(Viewer viewer, Object oldInput, Object newInput) {
			}
		
			public void dispose() {
			}
		
			public Object[] getElements(Object inputElement) {
				return getChildren(inputElement);
			}
		
			public boolean hasChildren(Object element) {
				if (element instanceof J2SLibrary[]) {
					return true;
				} else if (element instanceof J2SLibrary) {
					return  true;
				}
				return false;
			}
		
			public Object getParent(Object element) {
				return null;
			}
		
			public Object[] getChildren(Object parentElement) {
				if (parentElement instanceof J2SLibrary[]) {
					J2SLibrary[] libs = (J2SLibrary[]) parentElement;
					return libs;
				} else if (parentElement instanceof J2SLibrary) {
					J2SLibrary lib = (J2SLibrary) parentElement;
					String[] resources = lib.getResources();
					try {
						String[] ress = new String[resources.length];
						for (int i = 0; i < resources.length; i++) {
							ress[i] = "|" + (new File(resources[i].substring(1)).getCanonicalPath());
						}
						return ress;
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					return resources;
				}
				return null;
			}
		};

		ElementTreeSelectionDialog dialog= new ElementTreeSelectionDialog(e.display.getActiveShell(), lp, cp) {
			protected TreeViewer createTreeViewer(Composite parent) {
				TreeViewer treeViewer = super.createTreeViewer(parent);
				
//				if (project != null) {
//					treeViewer.setSelection(new StructuredSelection(project));
				treeViewer.expandToLevel(2);
//				}
				return treeViewer;
			}
		};
		dialog.setValidator(validator);
		dialog.setTitle("Libraries Selection"); //$NON-NLS-1$
		dialog.setMessage("Choose libraries (*.j2x)"); //$NON-NLS-1$
//		dialog.addFilter(filter);
		List rr = page.classpathModel.resources;
		List al = new ArrayList(rr.size());
		for (Iterator iter = rr.iterator(); iter.hasNext();) {
			Resource res = (Resource) iter.next();
			try {
				al.add("|" + res.getAbsoluteFile().getCanonicalPath());
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
		dialog.addFilter(new ObjectFilter(al));
		String[] allKeys = ExternalResources.getAllKeys();
		String[] allDescriptions = ExternalResources.getAllDescriptions();
		String[][] allResources = ExternalResources.getAllResources();
		J2SLibrary[] libs = new J2SLibrary[allKeys.length];
		for (int i = 0; i < libs.length; i++) {
			J2SLibrary library = new J2SLibrary();
			library.setName(allKeys[i]);
			library.setDesc(allDescriptions[i]);
			library.setResources(allResources[i]);
			libs[i] = library;
		}
		dialog.setInput(libs);
		//dialog.setInitialSelection(page.j2s);
		//if (configuration == null) {
		//	dialog.setInput(root);
//		} else {
//			try {
//				String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
//				dialog.setInput(ResourcesPlugin.getWorkspace().getRoot().getProject(projectName));
//			} catch (CoreException e) {
//				e.printStackTrace();
//				dialog.setInput(ResourcesPlugin.getWorkspace().getRoot());
//			}
//		}
//		dialog.setSorter(new ResourceSorter(ResourceSorter.NAME));

		if (dialog.open() == Window.OK) {
			Object[] expandedElements = page.viewer.getExpandedElements();
			Object[] elements= dialog.getResult();
			boolean added = false;
			for (int i= 0; i < elements.length; i++) {
				String elem= (String)elements[i];
				//IResource elem= (IResource)elements[i];
				String resPath = elem.substring(1);
//				resPath = XFileUtil.toRelativePath(resPath.substring(1), j2sFile != null ? j2sFile.getAbsolutePath() : null);
//				System.out.println(resPath);
				IRuntimeClasspathEntry entry = JavaRuntime.newArchiveRuntimeClasspathEntry(resPath);
				if (entry != null) {
					((Resource) entry).setAbsolute(true);
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

	public File getJ2SFile() {
		return j2sFile;
	}

	public void setJ2SFile(File file) {
		j2sFile = file;
	}

	
}
