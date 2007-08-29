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
package net.sf.j2s.ui.property;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.jdt.internal.debug.ui.JDIDebugUIPlugin;
import org.eclipse.jdt.internal.debug.ui.actions.ObjectFilter;
import org.eclipse.jface.viewers.Viewer;
import org.eclipse.swt.custom.BusyIndicator;

/**
 * ArchiveFilter
 */
public class ArchiveFilter extends ObjectFilter {
	
	/**
	 * Collection of archives and containers to display
	 */
	private Set fArchives;

	/* (non-Javadoc)
	 * @see org.eclipse.jface.viewers.ViewerFilter#select(org.eclipse.jface.viewers.Viewer, java.lang.Object, java.lang.Object)
	 */
	public boolean select(Viewer viewer, Object parentElement, Object element) {
		return fArchives.contains(element) && super.select(viewer, parentElement, element);
	}

	/**
	 * Constructs a new filter to display archives and their containers,
	 * excluding the resources in the given list.
	 * 
	 * @param objects resources to exclude
	 */
	public ArchiveFilter(List objects) {
		super(objects);
		init();
	}
	
	/**
	 * Search for all archives in the workspace.
	 */
	private void init() {
		BusyIndicator.showWhile(JDIDebugUIPlugin.getStandardDisplay(), new Runnable() {
			public void run() {
				fArchives = new HashSet();
				traverse(ResourcesPlugin.getWorkspace().getRoot(), fArchives);
			}
		});
	}

	/**
	 * Traverse the given container, adding archives to the given set.
	 * Returns whether any files were added
	 * 
	 * @param root
	 */
	private boolean traverse(IContainer container, Set set) {
		boolean added = false;
		try {	
			IResource[] resources = container.members();
			for (int i = 0; i < resources.length; i++) {
				IResource resource = resources[i];
				if (resource instanceof IFile) {
					IFile file = (IFile)resource;
					String ext = file.getFileExtension();
					if (ext != null && (file.getName().endsWith(".z.js") 
							|| ext.equalsIgnoreCase("css")
							/*|| ext.equalsIgnoreCase("j2s")*/)) { //$NON-NLS-1$ //$NON-NLS-2$
						set.add(file);
						added = true;
					}
				} else if (resource instanceof IContainer) {
					if (traverse((IContainer)resource, set)) {
						set.add(resource);	
						added = true;
					}
				}
			}
		} catch (CoreException e) {
		}
		return added;
	}
}
