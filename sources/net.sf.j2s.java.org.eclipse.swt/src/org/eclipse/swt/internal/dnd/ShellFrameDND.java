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

package org.eclipse.swt.internal.dnd;

import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.xhtml.CSSStyle;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.HTMLEvent;
import org.eclipse.swt.internal.xhtml.document;
import org.eclipse.swt.internal.xhtml.window;

/**
 * @author zhou renjian
 *
 * 2006-3-15
 */
public class ShellFrameDND implements DragListener {
	protected int sourceX = 0;
	protected int sourceY = 0;
	protected int sourceWidth = 0;
	protected int sourceHeight = 0;
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
			this.frame.className = "shell-handle shell-opacity";
			this.frame.style.backgroundColor = "menu";
			this.frame.style.left = this.sourceX + "px";
			this.frame.style.top = this.sourceY + "px";
			this.frame.style.zIndex = window.currentTopZIndex + 100;
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
				titleBar.className = "shell-title-bar";
				titleBar.style.margin = "4px 0";
				titleBar.style.width = "100%";
				
				this.frame.appendChild (titleBar);
			}
			firstTime = true;
		} else {
			this.frame.style.left = this.sourceX + "px";
			this.frame.style.top = this.sourceY + "px";
			this.frame.style.display = "block";
		}
		
		CSSStyle style = e.sourceElement.style;
		this.sourceX = style.left.length() > 0 ? Integer.parseInt (style.left) : 0;
		this.sourceY = style.top.length() > 0 ? Integer.parseInt (style.top) : 0;
		this.sourceWidth = style.width.length() > 0 ? Integer.parseInt (style.width) : 0;
		this.sourceHeight = style.height.length() > 0 ? Integer.parseInt (style.height) : 0;
		/* first time, set start location to current location */
		e.startX = e.currentX;
		e.startY = e.currentY;
		if  (firstTime) {
			this.initFrameBounds(this.sourceX, this.sourceY, this.sourceWidth, this.sourceHeight);
		}
		this.frame.style.width = this.sourceWidth + "px";
		this.frame.style.height = this.sourceHeight + "px";
		Element[] frames = document.getElementsByTagName("IFRAME");
		boolean needOverIFrameLayer = false;
		for (int i = 0; i < frames.length; i++) {
			if (frames[i].style.display != "none") {
				needOverIFrameLayer = true;
				break;
			}
		}
		if (needOverIFrameLayer) {
			overFrameHandle = document.createElement ("DIV");
			overFrameHandle.className = "over-iframe-layer";
			overFrameHandle.style.zIndex = window.currentTopZIndex;
			document.body.appendChild(overFrameHandle);
		}
		return true;
	};
	public boolean dragging(DragEvent e) {
		
		int gHeight = OS.getFixedBodyClientHeight(); //document.body.clientHeight;
		int gWidth = OS.getFixedBodyClientWidth(); //document.body.clientWidth;
		boolean noScroll = (document.body.style.overflow == "hidden");
		/**
		 * @j2sNative
		 * noScroll = noScroll || document.body.style.overflowX == "hidden";
		 */ {}
		if (noScroll) {
			gWidth = document.body.parentNode.clientWidth;
		}

		CSSStyle style = e.sourceElement.style;
		int dWidth = style.width.length() > 0 ? Integer.parseInt(style.width) : 0;
		int dHeight = style.height.length() > 0 ? Integer.parseInt(style.height) : 0;
		int dX = style.left.length() > 0 ? Integer.parseInt(style.left) : 0;
		int dY = style.top.length() > 0 ? Integer.parseInt(style.top) : 0;
		
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

			xx = adjustX(e, xx, gWidth, dWidth);
			yy = adjustY(e, yy, gHeight, dHeight);
			
			ww = adjustW(e, ww, gWidth, dX);
			hh = adjustH(e, hh, gHeight, dY);

			this.frame.style.left = xx + "px";
			this.frame.style.top = yy + "px";
//			this.frame.style.width = ((ww > 104) ? ww : 110)  + "px";
//			this.frame.style.height = ((hh > 26) ? hh : 26) + "px";
			this.frame.style.width = ((ww > 16) ? ww : 16)  + "px"; // For shell, 16x16 for mininum size.
			this.frame.style.height = ((hh > 16) ? hh : 16) + "px";
			return true;
		}
		int xx = this.sourceX + e.deltaX ();
		int yy = this.sourceY + e.deltaY ();

		xx = adjustX(e, xx, gWidth, dWidth);
		yy = adjustY(e, yy, gHeight, dHeight);
		
		this.frame.style.left = xx + "px";
		this.frame.style.top = yy + "px";
		/*
		 * In early SWT implementation, document.body is always with
		 * "overflow:hidden;" CSS. Now, there are no such constraints.
		 * 
		 * -Feb 27, 2007
		 * 
		if (document.body.scrollLeft != 0) {
			document.body.scrollLeft = 0;
		}
		if (document.body.scrollTop != 0) {
			document.body.scrollTop = 0;
		}
		*/
		return true;
	}
	private int adjustY(DragEvent e, int yy, int gHeight, int dHeight) {
		/*
		 * On mozilla, the mousemove event can contain mousemove
		 * outside the browser window, so make bound for the dragging.
		 */
		if (yy < 0) {
			yy = 0;
		// It's OK to move outside the width, as there will be scrollbar
		// } else if (yy > gHeight + 18) {
		//	yy = gHeight + 18;
		}
		if (!((HTMLEvent) e.event.event).ctrlKey) {
			int dTop = Math.abs (yy);
			int dBottom = Math.abs (yy - gHeight + dHeight + 2);
			if (dBottom < 10) {
				if (dBottom < dTop) {
					yy = gHeight - dHeight - 2;
				} else { // dTop <= dBottom < 10
					yy = 0;
				}
			} else if (dTop < 10) {
				yy = 0;
			}
		}
		return yy;
	}
	private int adjustX(DragEvent e, int xx, int gWidth, int dWidth) {
		/*
		 * On mozilla, the mousemove event can contain mousemove
		 * outside the browser window, so make bound for the dragging.
		 */
		if (xx < -dWidth) {
			xx = -dWidth;
		// It's OK to move outside the width, as there will be scrollbar
		// } else if (xx > gWidth - 2) {
		//	xx = gWidth - 2;
		}

		/*
		 * When no Ctrl key is pressed while dragging, the
		 * bound will try to attach the edge to the bounds
		 * of the browser client area.
		 */
		if (!((HTMLEvent) e.event.event).ctrlKey) {
			int dLeft = Math.abs (xx);
			int dRight = Math.abs (xx - gWidth + dWidth + 2);
			if (dRight < 10) {
				if (dRight < dLeft) {
					xx = gWidth - dWidth - 2;
				} else { // dLeft <= dRight < 10
					xx = 0;
				}
			} else if (dLeft < 10) {
				xx = 0;
			}
		}
		return xx;
	};
	private int adjustH(DragEvent e, int hh, int gHeight, int dY) {
		if (hh < 0) {
			hh = 16;
		}
		/*
		 * When no Ctrl key is pressed while dragging, the
		 * bound will try to attach the edge to the bounds
		 * of the browser client area.
		 */
		if (!((HTMLEvent) e.event.event).ctrlKey) {
			int dBottom = Math.abs (dY + hh - gHeight + 2);
			if (dBottom < 10) {
				hh = gHeight - dY - 2;
			}
		}
		return hh;
	}
	private int adjustW(DragEvent e, int ww, int gWidth, int dX) {
		if (ww < 16) {
			ww = 16;
		}
		/*
		 * When no Ctrl key is pressed while dragging, the
		 * bound will try to attach the edge to the bounds
		 * of the browser client area.
		 */
		if (!((HTMLEvent) e.event.event).ctrlKey) {
			int dRight = Math.abs (dX + ww - gWidth + 2);
			//System.out.println(dRight);
			if (dRight < 10) {
				ww = gWidth - dX - 2;
			}
		}
		return ww;
	};

	public boolean dragEnded(DragEvent e) {
		CSSStyle style = this.frame.style;
		int x = Integer.parseInt (style.left);
		int y = Integer.parseInt (style.top);
		int width = Integer.parseInt (style.width);
		int height = Integer.parseInt (style.height);
		Element shell = e.sourceElement;
//		shell.style.left = x + "px";
//		shell.style.top = y + "px";
//		shell.style.width = width + "px";
//		shell.style.height = height + "px";
		shell.style.zIndex = window.currentTopZIndex = window.currentTopZIndex + 2;
		
//		ShellFrameDND.fixShellHeight (e.sourceElement);
//		ShellFrameDND.fixShellWidth (e.sourceElement);
		
		this.updateShellBounds (x, y, width, height);
		clean();
		return true;
	}
	private void clean() {
		if(this.frame != null) {
			this.frame.style.display = "none";
		}
		document.body.style.cursor = "auto";
		this.resize = null;

		if (overFrameHandle != null) {
			//document.body.removeChild(overFrameHandle);
			OS.destroyHandle(overFrameHandle);
			overFrameHandle = null;
		}
	};
	
	public void dispose() {
		clean();
		if (this.frame != null) {
			//this.frame.parentNode.removeChild(this.frame);
			OS.destroyHandle(this.frame);
			this.frame = null;
		}
	}
	
	/**
	 * To initialize bounds.
	 */
	public boolean initFrameBounds(int x, int y, int width, int height) {
		return true;
	};
	public boolean updateShellBounds(int x, int y, int width, int height) {
		return true;
	};
	public boolean dragCanceled(DragEvent e) {
		clean();
		return true;
	};
	public static void fixShellHeight(Object shell) {
		CSSStyle style = ((Element) shell).style;
		int height = style.height.length() > 0 ? Integer.parseInt (style.height) : 0;
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
		CSSStyle style = ((Element) shell).style;
		int width = style.width.length() > 0 ? Integer.parseInt (style.width) - 6 : 0;
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
