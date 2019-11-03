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

package com.ognize.jface.async;

import org.eclipse.jface.window.Window;

/**
 * @author josson smith
 *
 * 2006-4-29
 */
public abstract class AsyncWindowRunnable implements Runnable {
	private Window window;
	
	protected void setWindow(Window window) {
		this.window = window;
	}

	public Window getWindow() {
		return window;
	}
	
	public int getReturnCode() {
		return window.getReturnCode();
	}
}
