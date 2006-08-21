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

package org.eclipse.swt.internal;

import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.Decorations;

/**
 * @author josson smith
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

try {
	window.addEventListener('resize', $browserLayoutResize, true);
} catch (e) {
	window.onresize = $browserLayoutResize;
}
 */
public class ResizeSystem {
	static ResizeHandler[] handlers = new ResizeHandler[0];
	public static void register(Decorations shell, int status) {
		for (int i = 0; i < handlers.length; i++) {
			if (handlers[i] != null && handlers[i].shell == shell) {
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
	public static void unregister(Decorations shell) {
		for (int i = 0; i < handlers.length; i++) {
			if (handlers[i] != null && handlers[i].shell == shell) {
				handlers[i] = null;
				return ;
			}
		}
	}
	public static void updateResize() {
		for (int i = 0; i < handlers.length; i++) {
			ResizeHandler hdl = handlers[i];
			hdl.shell._updateMonitorSize();
			if (hdl != null) {
				int status = hdl.getStatus();
				if (status == SWT.MAX) {
					hdl.updateMaximized();
				} else if (status == SWT.MIN) {
					hdl.updateMinimized();
				} else if (status == SWT.CENTER) {
					hdl.updateCentered();
				}
			}
		}
	}
}
