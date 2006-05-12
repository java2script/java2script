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

import java.util.Iterator;

import net.sf.j2s.ui.classpathviewer.IClasspathEntry;

public class ClasspathGroup extends AbstractClasspathEntry {
	private String name;
	
	private boolean canBeRemoved= true;
	
	public ClasspathGroup(String name, IClasspathEntry parent, boolean canBeRemoved) {
		this.parent= parent;
		this.name= name;
		this.canBeRemoved= canBeRemoved;
	}
		
	public void addEntry(IClasspathEntry entry, Object beforeEntry) {
		if (!childEntries.contains(entry)) {
			int index = -1;
			if (beforeEntry != null) {
				index = childEntries.indexOf(beforeEntry);
			}
			if (index >= 0) {
				childEntries.add(index, entry);
			} else {
				childEntries.add(entry);
			}
		}
	}
	
	public void removeEntry(IClasspathEntry entry) {
		childEntries.remove(entry);
	}
	
	public boolean contains(IClasspathEntry entry) {
		return childEntries.contains(entry);
	}
	
	public String toString() {
		return name;
	}

	public void removeAll() {
		Iterator iter= childEntries.iterator();
		while (iter.hasNext()) {
			Object entry = iter.next();
			if (entry instanceof ClasspathGroup) {
				((ClasspathGroup)entry).removeAll();
			}
		}
		childEntries.clear();
	}
	
	public boolean canBeRemoved() {
		return canBeRemoved;
	}

	/* (non-Javadoc)
	 * @see org.eclipse.jdt.internal.debug.ui.classpath.IClasspathEntry#isEditable()
	 */
	public boolean isEditable() {
		return false;
	}
}
