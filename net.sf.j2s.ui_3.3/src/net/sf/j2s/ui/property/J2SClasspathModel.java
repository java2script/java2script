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

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import net.sf.j2s.ui.classpath.Resource;
import net.sf.j2s.ui.classpath.UnitClass;

/**
 * @author zhou renjian
 *
 * 2006-2-1
 */
public class J2SClasspathModel {
	protected List resources = new ArrayList();
	protected List unitClasses = new ArrayList();
	protected List abandonedClasses = new ArrayList();
	
	public void addResource(Resource res) {
		if (!resources.contains(res)) {
			if (res.getName().endsWith(".j2x")) {
				for (Iterator iter = resources.iterator(); iter.hasNext();) {
					Resource r = (Resource) iter.next();
					if (r.getName().endsWith(".j2x")) {
						boolean equals = false;
						try {
							equals = r.getAbsoluteFile().getCanonicalPath().equals(res.getAbsoluteFile().getCanonicalPath());
						} catch (IOException e) {
							e.printStackTrace();
						}
						if (equals) {
							return;
						}
					}
				}
			}
			resources.add(res);
		}
	}
	public void removeResource(Resource res) {
		resources.remove(res);
	}
	
	public void addUnitClass(UnitClass cl) {
		unitClasses.add(cl);
	}
	public void removeUnitClass(UnitClass cl) {
		unitClasses.remove(cl);
	}
	
	public void addAbandonedClass(UnitClass cl) {
		abandonedClasses.add(cl);
	}
	public void removeAbandonedClass(UnitClass cl) {
		abandonedClasses.remove(cl);
	}

	public void abandonUnitClass(UnitClass cl) {
		unitClasses.remove(cl);
		abandonedClasses.add(cl);
	}
	
	public void restoreUnitClass(UnitClass cl) {
		abandonedClasses.remove(cl);
		unitClasses.add(cl);
	}
	
	public Resource[] getResources() {
		return (Resource[]) resources.toArray(new Resource[0]);
	}
	
	public UnitClass[] getUnitClasses() {
		return (UnitClass[]) unitClasses.toArray(new UnitClass[0]);
	}
	
	public UnitClass[] getAbandonedClasses() {
		return (UnitClass[]) abandonedClasses.toArray(new UnitClass[0]);
	}
	
	static String[] categories = new String[] {
		"Resources",
//		"Classes",
		"Abandoned Classes"
	};
	
	J2SCategory[] ctgs = null;
	public J2SCategory[] getCategories() {
		if (ctgs != null) {
			return ctgs;
		}
		ctgs = new J2SCategory[categories.length];
		for (int i = 0; i < ctgs.length; i++) {
			ctgs[i] = new J2SCategory(this, categories[i]);
		}
		return ctgs;
	}
	
	public boolean isResourceInResources(Object res) {
		return resources.contains(res);
	}
	
	public boolean isResourceInClasses(Object res) {
		return unitClasses.contains(res);
	}
	
	public boolean isResourceInAbandons(Object res) {
		return abandonedClasses.contains(res);
	}
	
	public void removeTheResource(Resource res) {
		if (!resources.remove(res)) {
			if (!unitClasses.remove(res)) {
				abandonedClasses.remove(res);
			}
		}
	}
}
