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
package net.sf.j2s.ui.classpathviewer.viewer;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import net.sf.j2s.ui.classpathviewer.IClasspathEntry;
import net.sf.j2s.ui.classpathviewer.IRuntimeClasspathEntry;

import org.eclipse.jface.viewers.IStructuredContentProvider;
import org.eclipse.jface.viewers.ITreeContentProvider;
import org.eclipse.jface.viewers.TreeViewer;
import org.eclipse.jface.viewers.Viewer;

/**
 * Content provider that maintains a list of classpath entries which are shown in a tree
 * viewer.
 */
public class ClasspathContentProvider implements ITreeContentProvider {
	private TreeViewer treeViewer;
	private ClasspathModel model= null;
	private boolean refreshEnabled= false;
	private boolean refreshRequested= false;
	private JavaClasspathTab fTab;
	
	public ClasspathContentProvider(JavaClasspathTab tab) {
		fTab = tab;
	}
		
	public void add(IClasspathEntry parent, IRuntimeClasspathEntry child, Object beforeElement) {
		Object newEntry= null;
		if (parent == null || parent == model) {
			newEntry= model.addEntry(child);
			parent= model;
		} else if (parent instanceof ClasspathGroup) {
			newEntry= model.createEntry(child, parent);
			((ClasspathGroup)parent).addEntry((ClasspathEntry)newEntry, beforeElement);
		} 
		if (newEntry != null) {
			treeViewer.add(parent, newEntry);
			treeViewer.setExpandedState(parent, true);
			treeViewer.reveal(newEntry);
			refresh();
		}
	}
	
	public void add(int entryType, IRuntimeClasspathEntry child) {
		Object newEntry= model.addEntry(entryType, child);
		if (newEntry != null) {
			treeViewer.add(getParent(newEntry), newEntry);
			refresh();
		}
	}

	public void removeAll() {
		model.removeAll();
		refresh();
	}
	
	private void refresh() {
		if (refreshEnabled) {
			treeViewer.refresh();
			refreshRequested= false;
		} else {
			refreshRequested= true;
		}
	}
	
	public void removeAll(IClasspathEntry parent) {
		if (parent instanceof ClasspathGroup) {
			((ClasspathGroup)parent).removeAll();
		}
		refresh();
	}

	/**
	 * @see ITreeContentProvider#getParent(Object)
	 */
	public Object getParent(Object element) {
		if (element instanceof ClasspathEntry) {
			return ((ClasspathEntry)element).getParent();
		}
		if (element instanceof ClasspathGroup) {
			return model;
		}
		
		return null;
	}

	/**
	 * @see ITreeContentProvider#hasChildren(Object)
	 */
	public boolean hasChildren(Object element) {
		if (element instanceof ClasspathEntry) {
			return (((ClasspathEntry)element).hasChildren());
		}
		if (element instanceof ClasspathGroup) {
			return ((ClasspathGroup)element).hasEntries();
			
		} 
		
		if (element instanceof ClasspathModel) {
			return ((ClasspathModel) element).hasEntries();
		}
		return false;
	}

	/**
	 * @see IStructuredContentProvider#getElements(Object)
	 */
	public Object[] getElements(Object inputElement) {
		return getChildren(inputElement);
	}

	
	/* (non-Javadoc)
	 * @see org.eclipse.jface.viewers.IContentProvider#dispose()
	 */
	public void dispose() {

	}

	/* (non-Javadoc)
	 * @see org.eclipse.jface.viewers.IContentProvider#inputChanged(org.eclipse.jface.viewers.Viewer, java.lang.Object, java.lang.Object)
	 */
	public void inputChanged(Viewer viewer, Object oldInput, Object newInput) {
		treeViewer = (TreeViewer) viewer;
		
		if (newInput != null) {
			model= (ClasspathModel)newInput;
		} else {
			if (model != null) {
				model.removeAll();
			}
			model= null;
		}
	}

	/* (non-Javadoc)
	 * @see org.eclipse.jface.viewers.ITreeContentProvider#getChildren(java.lang.Object)
	 */
	public Object[] getChildren(Object parentElement) {
		if (parentElement instanceof ClasspathGroup) {
			return ((ClasspathGroup)parentElement).getEntries();
		}
		if (parentElement instanceof ClasspathModel) {
			return ((ClasspathModel)parentElement).getEntries();
		}
		if (parentElement instanceof ClasspathEntry) {
			return ((ClasspathEntry)parentElement).getChildren(fTab.getLaunchConfiguration());
		}
		if (parentElement == null) {
			List all= new ArrayList();
			Object[] topEntries= model.getEntries();
			for (int i = 0; i < topEntries.length; i++) {
				Object object = topEntries[i];
				if (object instanceof ClasspathEntry) {
					all.add(object);
				} else if (object instanceof ClasspathGroup) {
					all.addAll(Arrays.asList(((ClasspathGroup)object).getEntries()));
				}
			}
			return all.toArray();
		}
		
		return null;
	}

	public void removeAll(List selection) {
		Object[] array= selection.toArray();
		model.removeAll(array);
		treeViewer.remove(array);
		refresh();
	}
	
	public IClasspathEntry[] getUserClasspathEntries() {
		return model.getEntries(ClasspathModel.USER);
	}

	public IClasspathEntry[] getBootstrapClasspathEntries() {
		return model.getEntries(ClasspathModel.BOOTSTRAP);
	}
	
	public void handleMove(boolean direction, IClasspathEntry entry) {
		IClasspathEntry parent = (IClasspathEntry)getParent(entry);
		parent.moveChild(direction, entry);
	}

	public ClasspathModel getModel() {
		return model;
	}

	public void setRefreshEnabled(boolean refreshEnabled) {
		this.refreshEnabled = refreshEnabled;
		treeViewer.getTree().setRedraw(refreshEnabled);
		if (refreshEnabled && refreshRequested) {
			refresh();
		}
	}

	public void setEntries(IRuntimeClasspathEntry[] entries) {
		model.removeAll();
		IRuntimeClasspathEntry entry;
		for (int i = 0; i < entries.length; i++) {
			entry= entries[i];
			switch (entry.getClasspathProperty()) {
				case IRuntimeClasspathEntry.USER_CLASSES:
					model.addEntry(ClasspathModel.USER, entry);
					break;
				default:
					model.addEntry(ClasspathModel.BOOTSTRAP, entry);
					break;
			}
		}	
		refresh();
	}
}
