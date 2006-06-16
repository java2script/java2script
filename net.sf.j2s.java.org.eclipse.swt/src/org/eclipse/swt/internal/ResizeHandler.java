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

import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.internal.xhtml.document;
import org.eclipse.swt.internal.xhtml.window;
import org.eclipse.swt.widgets.Decorations;

/**
 * @author josson smith
 *
 * 2006-4-24
 */
public class ResizeHandler {
	Decorations shell;
	int status;
	
	private ResizeHandler() {
	}

	public ResizeHandler(Decorations shell, int status) {
		this.shell = shell;
		this.status = status;
	}
	
	public void updateMinimized() {
		shell.setLocation(-1, document.body.clientHeight - 26);
	}
	public void updateMaximized() {
		int height = document.body.clientHeight - 0;
		if (height > window.screen.availHeight - 10) {
			height = window.screen.availHeight - 10;
		}
		int width = document.body.clientWidth;
		if (width > window.screen.availWidth) {
			width = window.screen.availWidth;
		}
//		shell.setBounds(0 - 4, 0 - 4, width - 2, height + 4);
		shell.setBounds(shell.computeTrim(0, 0, width + 2, height - 18));
		document.body.scrollTop = 0;
	}
	public void updateCentered() {
		// Not used now
		Point size = shell.getSize();
		int y = (document.body.clientHeight - size.y) / 2 - 20;
		if (y < 0) {
			y = 0;
		}
		shell.setLocation((document.body.clientWidth - size.x) / 2, y);
	}
	public int getStatus() {
		return status;
	}
}
