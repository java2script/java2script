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

package net.sf.j2s.ajax;

import org.eclipse.jface.window.Window;

/**
 * @author zhou renjian
 *
 * 2006-4-29
 */
public abstract class AWindowRunnable implements Runnable {
	private Window win;
	
	protected void setWindow(Window win) {
		this.win = win;
	}

	public Window getWindow() {
		return win;
	}
	
	public int getReturnCode() {
		return win.getReturnCode();
	}
}
