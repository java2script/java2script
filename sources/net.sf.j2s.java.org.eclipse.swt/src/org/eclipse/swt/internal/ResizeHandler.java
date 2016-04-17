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
import org.eclipse.swt.widgets.Decorations;
import org.eclipse.swt.widgets.Monitor;
import org.eclipse.swt.widgets.QuickLaunch;
import org.eclipse.swt.widgets.TaskBar;

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
	
	private Rectangle getClientArea() {
		int orientation = SWT.LEFT;
		int clientWidth = 0;
		int clientHeight = 0;
		int offsetX = 0;
		int offsetY = 0;
		/**
		 * @j2sNative
		 * clientWidth = document.body.parentNode.clientWidth;
		 * clientHeight = O$.getFixedBodyClientHeight(); //document.body.clientHeight;
		 * var display = null;
		 * if (this.shell != null) {
		 * 	display = this.shell.display;
		 * }
		 * if (display == null) {
		 * 	display = $wt.widgets.Display.Default;
		 * }
		 * if (display != null && display.taskBar != null) {
		 * 	orientation = display.taskBar.orientation;
		 * }
		 */ {}
		if (orientation == SWT.BOTTOM) {
			offsetY = QuickLaunch.BAR_HEIGHT;
			clientHeight = clientHeight - QuickLaunch.BAR_HEIGHT - TaskBar.BAR_HEIGHT;
		} else if (orientation == SWT.TOP) {
			offsetY = TaskBar.BAR_HEIGHT;
			clientHeight = clientHeight - TaskBar.BAR_HEIGHT;
		}
		return new Rectangle(offsetX, offsetY, clientWidth, clientHeight);
	}
	
	public void updateMinimized() {
		Rectangle clientArea = getClientArea();
		int titleHeight = 0;
		if ((shell.getStyle() & SWT.TITLE) != 0)
		/**
		 * @j2sNative
		 * try {
		 * 	titleHeight = this.shell.getTitleBarHeight();
		 * } catch (e) {
		 * }
		 */ {}
		shell.setLocation(clientArea.x - 1, clientArea.y + clientArea.height - titleHeight - 6);
	}

	public void updateMaximized() {
		Rectangle clientArea = getClientArea();
		
		int titleHeight = 0;
		if ((shell.getStyle() & SWT.TITLE) != 0)
		/**
		 * @j2sNative
		 * try {
		 * 	titleHeight = this.shell.getTitleBarHeight();
		 * } catch (e) {
		 * }
		 */ {}
		// FIXME: maximized size is not accurate
		//shell.setBounds(shell.computeTrim(0, 0, width + 4, height - titleHeight + 6));
		boolean disablingMaxBar = false;
		/**
		 * @j2sNative
		 * disablingMaxBar = window["swt.maximized.bar"] == false; 
		 */ {}
		if (disablingMaxBar) {
			if (status == SWT.MAX) {
				shell.setBounds(shell.computeTrim(clientArea.x,  clientArea.y, clientArea.width, clientArea.height - titleHeight));
			} else if ((status & SWT.TOP) != 0 && (status & SWT.BOTTOM) != 0) {
				Rectangle bounds = shell.getBounds();
				int shellWidth = shell.getSize().x;
				int deltaHeight = 0; // 2
				if ((status & SWT.LEFT) != 0) {
					shell.setBounds(clientArea.x,  clientArea.y, shellWidth, clientArea.height + deltaHeight);
				} else if ((status & SWT.RIGHT) != 0) {
					shell.setBounds(clientArea.x + clientArea.width - shellWidth, clientArea.y, shellWidth, clientArea.height + deltaHeight);
				} else {
					shell.setBounds(bounds.x,  clientArea.y, shellWidth, clientArea.height + deltaHeight);
				}
			} else if ((status & SWT.LEFT) != 0 && (status & SWT.RIGHT) != 0) {
				Rectangle bounds = shell.getBounds();
				int shellHeight = shell.getSize().y;
				if ((status & SWT.TOP) != 0) {
					shell.setBounds(clientArea.x,  clientArea.y, clientArea.width + 2, shellHeight);
				} else if ((status & SWT.BOTTOM) != 0) {
					shell.setBounds(clientArea.x,  clientArea.y + clientArea.height - 2 - shellHeight, clientArea.width + 2, shellHeight);
				} else { 
					shell.setBounds(clientArea.x,  bounds.y, clientArea.width + 2, shellHeight);
				}
			}
		} else {
			if (status == SWT.MAX) {
				shell.setBounds(shell.computeTrim(clientArea.x,  clientArea.y - titleHeight, clientArea.width, clientArea.height));
			} else if ((status & SWT.TOP) != 0 && (status & SWT.BOTTOM) != 0) {
				Rectangle bounds = shell.getBounds();
				int shellWidth = shell.getSize().x;
				int deltaHeight = 0; // 2
				if ((status & SWT.LEFT) != 0) {
					shell.setBounds(clientArea.x,  clientArea.y, shellWidth, clientArea.height + deltaHeight);
				} else if ((status & SWT.RIGHT) != 0) {
					shell.setBounds(clientArea.x + clientArea.width - shellWidth + 2, clientArea.y, shellWidth, clientArea.height + deltaHeight);
				} else {
					shell.setBounds(bounds.x,  clientArea.y, shellWidth, clientArea.height + deltaHeight);
				}
			} else if ((status & SWT.LEFT) != 0 && (status & SWT.RIGHT) != 0) {
				Rectangle bounds = shell.getBounds();
				int shellHeight = shell.getSize().y;
				if ((status & SWT.TOP) != 0) {
					shell.setBounds(clientArea.x,  clientArea.y, clientArea.width + 2, shellHeight);
				} else if ((status & SWT.BOTTOM) != 0) {
					shell.setBounds(clientArea.x,  clientArea.y + clientArea.height - 2 - shellHeight, clientArea.width + 2, shellHeight);
				} else { 
					shell.setBounds(clientArea.x,  bounds.y, clientArea.width + 2, shellHeight);
				}
			}
		}
//		shell.setBounds(0 - 4, 0 - 4, width - 2, height + 4);
		//shell.setBounds(shell.computeTrim(0, 0, width + 2, height - 18));
	}
	
	public void updateCentered() {
		Rectangle clientArea = getClientArea();
		
		Point size = shell.getSize();
		int y = (clientArea.height - size.y) / 2;
		if (y < 0) {
			y = 0;
		}
		if (status == SWT.CENTER) {
			if (y > 0) {
				y = (int) Math.round((clientArea.height - size.y) * 0.618 / 1.618);
			}
			shell.setLocation((clientArea.width - size.x) / 2 + clientArea.x, y + clientArea.y);
		} else if ((status & SWT.TOP) != 0){
			shell.setLocation((clientArea.width - size.x) / 2 + clientArea.x, clientArea.y);
		} else if ((status & SWT.BOTTOM) != 0){
			int trimWidth = (shell.getStyle() & SWT.NO_TRIM) != 0 ? 0 : 4; // 4: shadow
			shell.setLocation((clientArea.width - size.x) / 2 + clientArea.x, clientArea.height - 2 - size.y + clientArea.y + trimWidth);
		} else if ((status & SWT.LEFT) != 0){
			shell.setLocation(clientArea.x, y + clientArea.y);
		} else if ((status & SWT.RIGHT) != 0){
			int trimWidth = (shell.getStyle() & SWT.NO_TRIM) != 0 ? 0 : 4; // 4: shadow
			shell.setLocation(clientArea.width - size.x + clientArea.x + trimWidth, y + clientArea.y);
		}
	}
	
	public void updateCornered() {
		Rectangle clientArea = getClientArea();
		Point size = shell.getSize();
		if ((status & SWT.TOP) != 0){
			if ((status & SWT.LEFT) != 0) {
				shell.setLocation(clientArea.x, clientArea.y);
			} else if ((status & SWT.RIGHT) != 0) {
				shell.setLocation(clientArea.width - size.x, clientArea.y);
			}
		} else if ((status & SWT.BOTTOM) != 0){
			if ((status & SWT.LEFT) != 0) {
				shell.setLocation(clientArea.x, clientArea.height - size.y + clientArea.y);
			} else if ((status & SWT.RIGHT) != 0) {
				shell.setLocation(clientArea.width - size.x, clientArea.height - size.y + clientArea.y);
			}
		}
	}

	public void updateMonitor() {
		if (monitor == null) {
			return;
		}
		
		Rectangle clientArea = getClientArea();
		/**
		 * @j2sNative
		 * this.monitor.clientX = clientArea.x;
		 * this.monitor.clientY = clientArea.y;
		 * this.monitor.clientWidth = clientArea.width;
		 * this.monitor.clientHeight = clientArea.height;
		 */ { clientArea.toString(); }
	}

	public int getStatus() {
		return status;
	}
}
