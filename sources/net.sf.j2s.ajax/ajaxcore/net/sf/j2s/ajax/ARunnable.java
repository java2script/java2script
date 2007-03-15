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

package net.sf.j2s.ajax;

/**
 * This abstract class provides a wrapper of interface Runnable to
 * give convenience for <code>AClass</code> or <code>ASWTClass</code>
 * to set and to get the class that is loaded.
 *  
 * @author zhou renjian
 *
 * 2006-8-4
 */
public abstract class ARunnable implements Runnable {
	private Class clazz;

	/**
	 * Return the loaded class.
	 * @return Class loaded class.
	 */
	public Class getClazz() {
		return clazz;
	}

	/**
	 * Set the loaded class
	 * @param clazz Class class that is already loaded.
	 */
	public void setClazz(Class clazz) {
		this.clazz = clazz;
	}
}
