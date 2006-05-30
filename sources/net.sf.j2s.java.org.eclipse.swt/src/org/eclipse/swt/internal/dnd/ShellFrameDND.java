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

package org.eclipse.swt.internal.dnd;

import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.HTMLEvent;
import org.eclipse.swt.internal.xhtml.document;
import org.eclipse.swt.internal.xhtml.window;

/**
 * @author josson smith
 *
 * 2006-3-15
 */
public class ShellFrameDND extends DragAdapter {
	int sourceX = 0;
	int sourceY = 0;
	int sourceWidth = 0;
	int sourceHeight = 0;
	String resize = null;
	Element frame = null;
	private Element overFrameHandle;
	public boolean isDraggable(HTMLEventWrapper e) {
		String cssName = e.target.className;
		if (cssName != null) { 
			if (cssName.indexOf ("shell") == 0 
					&& (cssName.indexOf ("top") != -1
					|| cssName.indexOf ("middle") != -1
					|| cssName.indexOf ("bottom") != -1)) {
				this.resize = cssName.substring (6);
				return true;
			} else if (cssName.indexOf ("shell-title-text") != -1) {
				return true;
			}
		}
		return false;
	};
	public boolean dragBegan(DragEvent e) {
		boolean firstTime = false;
		if (this.frame == null) {
			this.frame = document.createElement ("DIV");
			this.frame.className = "shell-handle";
			this.frame.style.backgroundColor = "transparent";
			this.frame.style.left = this.sourceX + "px";
			this.frame.style.top = this.sourceY + "px";
			this.frame.style.zIndex = "" + (Integer.parseInt(window.currentTopZIndex) + 100);
			document.body.appendChild (this.frame);
			boolean existedTitleBar = false;
			Element[] els = e.sourceElement.getElementsByTagName("DIV");
			for (int i = 0; i < els.length; i++) {
				if (els[i].className.indexOf("shell-title-bar") != -1) {
					existedTitleBar = true;
					break;
				}
			}
			if (existedTitleBar) {
				Element titleBar = document.createElement ("DIV");
				titleBar.className = "shell-title-bar opacity";
				titleBar.style.paddingTop = "4px";
				this.frame.appendChild (titleBar);
			}
			firstTime = true;
		} else {
			this.frame.style.left = this.sourceX + "px";
			this.frame.style.top = this.sourceY + "px";
			this.frame.style.display = "block";
		}
		this.sourceX = Integer.parseInt (e.sourceElement.style.left);
		this.sourceY = Integer.parseInt (e.sourceElement.style.top);
		this.sourceWidth = Integer.parseInt (e.sourceElement.style.width);
		this.sourceHeight = Integer.parseInt (e.sourceElement.style.height);
		/* first time, set start location to current location */
		e.startX = e.currentX;
		e.startY = e.currentY;
		if  (firstTime) {
			this.frame.style.width = this.sourceWidth + "px";
			this.frame.style.height = this.sourceHeight + "px";
		}
		Element[] frames = document.getElementsByTagName("IFRAME");
		if (frames.length != 0) {
			overFrameHandle = document.createElement ("DIV");
			overFrameHandle.className = "over-iframe-layer";
			overFrameHandle.style.zIndex = window.currentTopZIndex;
			document.body.appendChild(overFrameHandle);
		}
		return true;
	};
	public boolean dragging(DragEvent e) {
		if (this.resize != null) {
			int xx = this.sourceX;
			int yy = this.sourceY;
			int ww = this.sourceWidth;
			int hh = this.sourceHeight;
			if (this.resize == "left-top") {
				xx += e.deltaX ();
				yy += e.deltaY ();
				ww -= e.deltaX ();
				hh -= e.deltaY ();
				document.body.style.cursor = "nw-resize";
			} else if (this.resize == "center-top") {
				//xx += e.deltaX ();
				yy += e.deltaY ();
				//ww += e.deltaX ();
				hh -= e.deltaY ();
				document.body.style.cursor = "n-resize";
			} else if (this.resize == "right-top") {
				//xx += e.deltaX ();
				yy += e.deltaY ();
				ww += e.deltaX ();
				hh -= e.deltaY ();
				document.body.style.cursor = "ne-resize";
			} else if (this.resize == "left-middle") {
				xx += e.deltaX ();
				//yy += e.deltaY ();
				ww -= e.deltaX ();
				//hh += e.deltaY ();
				document.body.style.cursor = "w-resize";
			} else if (this.resize == "right-middle") {
				//xx += e.deltaX ();
				//yy += e.deltaY ();
				ww += e.deltaX ();
				//hh += e.deltaY ();
				document.body.style.cursor = "e-resize";
			} else if (this.resize == "left-bottom") {
				xx += e.deltaX ();
				//yy += e.deltaY ();
				ww -= e.deltaX ();
				hh += e.deltaY ();
				document.body.style.cursor = "sw-resize";
			} else if (this.resize == "center-bottom") {
				//xx += e.deltaX ();
				//yy += e.deltaY ();
				//ww += e.deltaX ();
				hh += e.deltaY ();
				document.body.style.cursor = "s-resize";
			} else if (this.resize == "right-bottom") {
				//xx += e.deltaX ();
				//yy += e.deltaY ();
				ww += e.deltaX ();
				hh += e.deltaY ();
				document.body.style.cursor = "se-resize";
			}
			this.frame.style.left = xx + "px";
			this.frame.style.top = yy + "px";
			this.frame.style.width = ((ww > 104) ? ww : 110)  + "px";
			this.frame.style.height = ((hh > 26) ? hh : 26) + "px";
			return true;
		}
		int xx = this.sourceX + e.deltaX ();
		int yy = this.sourceY + e.deltaY ();
		
		int gHeight = document.body.clientHeight;
		int gWidth = document.body.clientWidth;
		/*
		 * On mozilla, the mousemove event can contain mousemove
		 * outside the browser window, so make bound for the dragging.
		 */
		int dWidth = Integer.parseInt(e.sourceElement.style.width);
		if (xx < -dWidth) {
			xx = -dWidth;
		} else if (xx > gWidth - 2) {
			xx = gWidth - 2;
		}
		if (yy < 0) {
			yy = 0;
		} else if (yy > gHeight + 18) {
			yy = gHeight + 18;
		}

		/*
		 * When no Ctrl key is pressed while dragging, the
		 * bound will try to attach the edge to the bounds
		 * of the browser client area.
		 */
		if (!((HTMLEvent) e.event.event).ctrlKey) {
			if (Math.abs (xx - gWidth + dWidth) < 10) {
				xx = gWidth - dWidth;
			} else if (Math.abs (xx) < 10) {
				xx = 0;
			}
			int dHeight = Integer.parseInt(e.sourceElement.style.height);
			if (Math.abs (yy - gHeight + dHeight + 2) < 10) {
				yy = gHeight - dHeight - 2;
			} else if (Math.abs (yy - (-1)) < 10) {
				yy = -1;
			}
		}
//		try {
			this.frame.style.left = xx + "px";
			this.frame.style.top = yy + "px";
			if (document.body.scrollLeft != 0) {
				document.body.scrollLeft = 0;
			}
			if (document.body.scrollTop != 0) {
				document.body.scrollTop = 0;
			}
//		} catch (e) {
//		}
		return true;
	};
	public boolean dragEnded(DragEvent e) {
		int x = Integer.parseInt (this.frame.style.left);
		int y = Integer.parseInt (this.frame.style.top);
		int width = Integer.parseInt (this.frame.style.width);
		int height = Integer.parseInt (this.frame.style.height);
		Element shell = e.sourceElement;
		shell.style.left = x + "px";
		shell.style.top = y + "px";
		shell.style.width = width + "px";
		shell.style.height = height + "px";
		shell.style.zIndex = window.currentTopZIndex = "" + (Integer.parseInt(window.currentTopZIndex) + 2);
		
//		ShellFrameDND.fixShellHeight (e.sourceElement);
//		ShellFrameDND.fixShellWidth (e.sourceElement);
		
		this.updateShellBounds (x, y, width, height);
		clean();
		return true;
	}
	private void clean() {
		this.frame.style.display = "none";
		document.body.style.cursor = "auto";
		this.resize = null;

		if (overFrameHandle != null) {
			document.body.removeChild(overFrameHandle);
			overFrameHandle = null;
		}
	};
	public boolean updateShellBounds(int x, int y, int width, int height) {
		return true;
	};
	public boolean dragCanceled(DragEvent e) {
		clean();
		return true;
	};
	public static void fixShellHeight(Object shell) {
		int height = Integer.parseInt (((Element) shell).style.height);
		Element[] divs = ((Element) shell).getElementsByTagName ("DIV");
		for (int i = 0; i < divs.length; i++) {
			//Element div = divs.item (i);
			Element div = divs[i];
			if (div.className != null) {
				if (div.className.indexOf ("middle") != -1) {
					if (height - 40 >= 0) {
						div.style.height = (height - 40) + "px";
					} else {
						div.style.height = "0px";
					}
				} else if (div.className.indexOf ("shell-content") != -1) {
					div.style.height = ((height - 30 >= 0) ? height - 30 : 0) + "px";
				}
			}
		}
	}
	/*
	 * Fix Opera/IE's border CSS bug
	 */
	public static void fixShellWidth(Object shell) {
//		var needToFixedWidth = ("\n".split (/\n/).length != 2) 
//			|| navigator.userAgent.toLowerCase ().indexOf ("opera") != -1;
		boolean needToFixedWidth = true;
		int width = Integer.parseInt (((Element) shell).style.width) - 6;
		Element[] divs = ((Element) shell).getElementsByTagName ("DIV");
		for (int i = 0; i < divs.length; i++) {
			//Element div = divs.item (i);
			Element div = divs[i];
			String cssName = div.className;
			if (cssName != null) {
				if (cssName.indexOf ("shell-center-") != -1) {
					if (needToFixedWidth) {
						div.style.width = (width - 46) + "px";
					}
				} else if (cssName.indexOf ("shell-content") != -1) {
//					if (needToFixedWidth) {
//						div.style.width = width + "px";
//					} else {
						div.style.width = width + "px";
//					}
				} else if (cssName.indexOf ("shell-title-bar") != -1) {
//					if (needToFixedWidth) {
						div.style.width = width + "px";
//					}
				}
			}
		}
	}

}
