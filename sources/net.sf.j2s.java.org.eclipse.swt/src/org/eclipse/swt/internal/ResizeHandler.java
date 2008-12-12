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

package org.eclipse.swt.internal;

import org.eclipse.swt.SWT;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.graphics.Rectangle;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;
import org.eclipse.swt.widgets.Decorations;
import org.eclipse.swt.widgets.Monitor;

/**
 * @author zhou renjian
 *
 * 2006-4-24
 */
public class ResizeHandler {
	Monitor monitor;
	Decorations shell;
	int status;
	
	public ResizeHandler(Monitor monitor) {
		this.monitor = monitor;
	}

	public ResizeHandler(Decorations shell, int status) {
		this.shell = shell;
		this.status = status;
	}
	
	public void updateMinimized() {
		Element tb = null;
		/**
		 * @j2sNative
		 * tb = this.shell.titleBar;
		 */ {}
		int h = ((shell.getStyle() & SWT.TITLE) != 0) ? OS.getContainerHeight(tb) : 0;
		shell.setLocation(-1, shell.getMonitor().getClientArea().height - h - 6);
	}
	public void updateMaximized() {
		Monitor monitor = shell.getMonitor();
		Rectangle area = monitor.getClientArea();
		int height = area.height;
		int width = area.width;
		boolean isBodyMonitor = false;
		/**
		 * @j2sNative
		 * isBodyMonitor = monitor.handle == document.body;
		 */ {}
		if (isBodyMonitor) { // update with current body client area
			width = document.body.parentNode.clientWidth;
			height = OS.getFixedBodyClientHeight();
		}
		//int titleHeight = ((shell.getStyle() & SWT.TITLE) != 0) ? 20 : 0;
		Element tb = null;
		/**
		 * @j2sNative
		 * tb = this.shell.titleBar;
		 */ {}
		int titleHeight = ((shell.getStyle() & SWT.TITLE) != 0) ? OS.getContainerHeight(tb) : 0;
		// FIXME: maximized size is not accurate
		//shell.setBounds(shell.computeTrim(0, 0, width + 4, height - titleHeight + 6));
//		boolean isOptMaximized = false;
//		/**
//		 * @j2sNative
//		 * isOptMaximized = window["ShellManager"] != null; 
//		 */ {}
//		if (!isOptMaximized) {
//			shell.setBounds(shell.computeTrim(0, 0, width, height - titleHeight));
//		} else {
			shell.setBounds(shell.computeTrim(0,  -titleHeight, width, height));
//		}
//		shell.setBounds(0 - 4, 0 - 4, width - 2, height + 4);
		//shell.setBounds(shell.computeTrim(0, 0, width + 2, height - 18));
	}
	public void updateCentered() {
		Element tb = null;
		/**
		 * @j2sNative
		 * tb = this.shell.titleBar;
		 */ {}
		int h = ((shell.getStyle() & SWT.TITLE) != 0) ? OS.getContainerHeight(tb) : 20;
		// Not used now
		Monitor monitor = shell.getMonitor();
		Point size = shell.getSize();
		int y = (monitor.getClientArea().height - size.y) / 2 - h;
		if (y < 0) {
			y = 0;
		}
		shell.setLocation((monitor.getClientArea().width - size.x) / 2, y);
	}
	/**
	 * @j2sNative
	 * this.monitor.clientWidth = document.body.parentNode.clientWidth;
	 * this.monitor.clientHeight = O$.getFixedBodyClientHeight(); //document.body.clientHeight;
	 */
	public void updateMonitor() {
	}

	public int getStatus() {
		return status;
	}
}
