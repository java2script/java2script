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
import org.eclipse.swt.widgets.Decorations;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Monitor;

/**
 * @author zhou renjian
 *
 * 2006-4-24
 * @j2sSuffix
var $browserResizingHandle = null;
$browserLayoutResize = function () {
	if ($browserResizingHandle != null) {
		window.clearTimeout ($browserResizingHandle);
	}
	$browserResizingHandle = window.setTimeout (function () {
		org.eclipse.swt.internal.ResizeSystem.updateResize ();
	}, 50);
};

if (document.addEventListener) {
	window.addEventListener('resize', $browserLayoutResize, true);
} else if (document.attachEvent) {
	window.attachEvent('onresize', $browserLayoutResize);
}
 */
public class ResizeSystem {
	static ResizeHandler[] handlers = new ResizeHandler[0];
	public static void register(Decorations shell, int status) {
		for (int i = 0; i < handlers.length; i++) {
			if (handlers[i] != null && handlers[i].shell == shell && handlers[i].status == status) {
				return ;
			}
		}
		for (int i = 0; i < handlers.length; i++) {
			if (handlers[i] == null) {
				handlers[i] = new ResizeHandler(shell, status);
				return ;
			}
		}
		handlers[handlers.length] = new ResizeHandler(shell, status);
		return ;
	}
	public static void unregister(Decorations shell, int status) {
		for (int i = 0; i < handlers.length; i++) {
			if (handlers[i] != null && handlers[i].shell == shell && handlers[i].status == status) {
				handlers[i] = null;
				return ;
			}
		}
	}
	public static void register(Monitor monitor) {
		for (int i = 0; i < handlers.length; i++) {
			if (handlers[i] != null && handlers[i].monitor == monitor) {
				return ;
			}
		}
		for (int i = 0; i < handlers.length; i++) {
			if (handlers[i] == null) {
				handlers[i] = new ResizeHandler(monitor);
				return ;
			}
		}
		handlers[handlers.length] = new ResizeHandler(monitor);
		return ;
	}
	public static void unregister(Monitor monitor) {
		for (int i = 0; i < handlers.length; i++) {
			if (handlers[i] != null && handlers[i].monitor == monitor) {
				handlers[i] = null;
				return ;
			}
		}
	}
	public static void reset() {
		for (int i = 0; i < handlers.length; i++) {
			if (handlers[i] != null) {
				handlers[i].shell = null;
				handlers[i].monitor = null;
				handlers[i] = null;
				return ;
			}
		}
		handlers = new ResizeHandler[0];
	}
	public static void updateResize() {
		for (int i = 0; i < handlers.length; i++) {
			ResizeHandler hdl = handlers[i];
			if (hdl != null && hdl.shell != null && hdl.shell.handle != null) {
				hdl.shell._updateMonitorSize();
				int status = hdl.getStatus();
				if (status == SWT.MAX) {
					hdl.updateMaximized();
				} else if (status == SWT.MIN) {
					hdl.updateMinimized();
				} else if (status == SWT.CENTER) {
					hdl.updateCentered();
				}
			} else if (hdl != null && hdl.monitor != null){
				hdl.updateMonitor();
			}
		}
		
		Display.updateMonitor();
	}
}
