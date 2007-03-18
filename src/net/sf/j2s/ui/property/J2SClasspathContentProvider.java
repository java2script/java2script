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

import net.sf.j2s.ui.classpath.CompositeResources;
import net.sf.j2s.ui.classpath.ContactedClasses;

import org.eclipse.jface.viewers.ITreeContentProvider;
import org.eclipse.jface.viewers.Viewer;

/**
 * @author zhou renjian
 *
 * 2006-2-1
 */
public class J2SClasspathContentProvider implements ITreeContentProvider {

	public Object[] getChildren(Object parentElement) {
		if (parentElement instanceof J2SClasspathModel) {
			J2SClasspathModel model = (J2SClasspathModel) parentElement;
			return model.getCategories();
		} else if (parentElement instanceof J2SCategory) {
			J2SCategory ctg = (J2SCategory) parentElement;
			if (J2SClasspathModel.categories[0].equals(ctg.getKey())) {
				return ctg.getParent().getResources();
			} else if ("Classes".equals(ctg.getKey())) {
				return ctg.getParent().getUnitClasses();
//			} else if (J2SClasspathModel.categories[1].equals(ctg.getKey())) {
//				return ctg.getParent().getUnitClasses();
			} else {
				return ctg.getParent().getAbandonedClasses();
			}
		} else if (parentElement instanceof CompositeResources) {
			CompositeResources comp = (CompositeResources) parentElement;
			return comp.getChildren();
		} else if (parentElement instanceof ContactedClasses) {
			ContactedClasses comp = (ContactedClasses) parentElement;
			return comp.getChildren();
		}
		return new Object[0];
	}

	public Object getParent(Object element) {
		return null;
	}

	public boolean hasChildren(Object element) {
		return getChildren(element).length > 0;
	}

	public Object[] getElements(Object inputElement) {
		return getChildren(inputElement);
	}

	public void dispose() {
		
	}

	public void inputChanged(Viewer viewer, Object oldInput, Object newInput) {
		
	}

}
