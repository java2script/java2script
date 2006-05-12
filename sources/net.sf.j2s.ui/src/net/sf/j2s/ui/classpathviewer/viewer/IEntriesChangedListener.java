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


/**
 * Listener interface to receive notification when entries in a runtime
 * classpath entry viewer change in some way.
 */
public interface IEntriesChangedListener {

	/**
	 * Notification entries have changed in the viewer
	 */
	public void entriesChanged(IClasspathViewer viewer);
}
