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

import net.sf.j2s.ui.classpath.CSSResource;
import net.sf.j2s.ui.classpath.CompositeResources;
import net.sf.j2s.ui.classpath.ContactedClasses;
import net.sf.j2s.ui.classpath.ContactedUnitClass;
import net.sf.j2s.ui.classpath.ProjectResources;
import net.sf.j2s.ui.classpath.Resource;
import net.sf.j2s.ui.classpath.UnitClass;

import org.eclipse.jdt.ui.ISharedImages;
import org.eclipse.jdt.ui.JavaUI;
import org.eclipse.jface.viewers.LabelProvider;
import org.eclipse.swt.graphics.Image;

/**
 * @author josson smith
 *
 * 2006-2-1
 */
public class J2SClasspathLabelProvider extends LabelProvider {

	public Image getImage(Object element) {
		if (element instanceof UnitClass || element instanceof ContactedUnitClass) {
            return JavaUI.getSharedImages().getImage(ISharedImages.IMG_OBJS_CLASS);
		} else if (element instanceof CSSResource) {
            return JavaUI.getSharedImages().getImage(ISharedImages.IMG_OBJS_CFILE);
		} else if (element instanceof ContactedClasses) {
            return JavaUI.getSharedImages().getImage(ISharedImages.IMG_OBJS_LIBRARY);
		} else if (element instanceof ProjectResources) {
            return JavaUI.getSharedImages().getImage(ISharedImages.IMG_OBJS_PACKFRAG_ROOT);
		} else if (element instanceof CompositeResources) {
            return JavaUI.getSharedImages().getImage(ISharedImages.IMG_OBJS_EXTERNAL_ARCHIVE);
		} else if (element instanceof J2SCategory) {
			J2SCategory ctg = (J2SCategory) element;
			//if (ctg)
            return JavaUI.getSharedImages().getImage(ISharedImages.IMG_OBJS_EMPTY_LOGICAL_PACKAGE);
		}
		return null;
	}

	public String getText(Object element) {
		if (element instanceof Resource) {
			Resource res = (Resource) element;
			return res.getName();
		} else if (element instanceof J2SCategory) {
			J2SCategory ctg = (J2SCategory) element;
			return ctg.getKey();
		}
		return null;
	}

	public void dispose() {
		// TODO Auto-generated method stub

	}

}
