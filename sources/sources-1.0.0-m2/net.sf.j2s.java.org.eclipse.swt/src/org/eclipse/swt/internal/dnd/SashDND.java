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

import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;
import org.eclipse.swt.internal.xhtml.window;

/**
 * @author josson smith
 *
 * 2006-3-15
 */
public class SashDND extends DragAdapter {
	protected int sourceX = 0;
	protected int sourceY = 0;
	protected Element thumb;
	protected boolean isHorizontal;
	private Element overFrameHandle;
	public boolean dragBegan(DragEvent e) {
		thumb = document.createElement ("DIV");
		String cssName = e.sourceElement.className;
		thumb.className = cssName;
		if (cssName != null && cssName.indexOf ("sash-mouse-down") == -1)  {
			thumb.className += " sash-mouse-down";
		}
		if (cssName.indexOf ("horizontal") != -1) {
			isHorizontal = true;
		} else {
			isHorizontal = false;
		}
		thumb.style.left = e.sourceElement.style.left;
		thumb.style.top = e.sourceElement.style.top;
		thumb.style.width = e.sourceElement.style.width;
		thumb.style.height = e.sourceElement.style.height;
		thumb.onselectstart = DNDUtils.onselectstart;
		if (e.sourceElement.nextSibling != null) {
			e.sourceElement.parentNode.insertBefore (thumb, 
					e.sourceElement.nextSibling);
		} else {
			e.sourceElement.parentNode.appendChild (thumb);
		}
		this.sourceX = Integer.parseInt (e.sourceElement.style.left);
		this.sourceY = Integer.parseInt (e.sourceElement.style.top);
		/* first time, set start location to current location */
		e.startX = e.currentX;
		e.startY = e.currentY;
		Element[] frames = document.getElementsByTagName("IFRAME");
		if (frames.length != 0) {
			overFrameHandle = document.createElement ("DIV");
			overFrameHandle.className = "over-iframe-layer";
			overFrameHandle.style.zIndex = window.currentTopZIndex;
			document.body.appendChild(overFrameHandle);
		}
		return true;
	}

	public boolean dragCanceled(DragEvent e) {
		clean();
		return true;
	}

	public boolean dragEnded(DragEvent e) {
		clean();
		return true;
	}

	protected void clean() {
		thumb.style.display = "none";
		document.body.style.cursor = "auto";
		thumb.parentNode.removeChild(thumb);
		if (overFrameHandle != null) {
			document.body.removeChild(overFrameHandle);
			overFrameHandle = null;
		}
	}

	protected Point currentLocation(DragEvent e) {
		int xx = this.sourceX + e.deltaX ();
		int yy = this.sourceY + e.deltaY ();
		
		int gHeight = Integer.parseInt(e.sourceElement.parentNode.style.height);
		int gWidth = Integer.parseInt(e.sourceElement.parentNode.style.width);
		/*
		 * On mozilla, the mousemove event can contain mousemove
		 * outside the browser window, so make bound for the dragging.
		 */
		int dWidth = Integer.parseInt(e.sourceElement.style.width);
		int dHeight = Integer.parseInt(e.sourceElement.style.height);
		if (xx < 0) {
			xx = 0;
		} else if (xx > gWidth - dWidth - 2) {
			xx = gWidth - dWidth - 2;
		}
		if (yy < 0) {
			yy = 0;
		} else if (yy > gHeight - dHeight - 2) {
			yy = gHeight - dHeight - 2;
		}
		return new Point(xx, yy);
	}
	
	public boolean dragging(DragEvent e) {
		if (isHorizontal) {
			document.body.style.cursor = "e-resize";
			thumb.style.cursor = "e-resize";
		} else {
			document.body.style.cursor = "s-resize";
			thumb.style.cursor = "s-resize";
		}

		if (isHorizontal) {
			thumb.style.left = currentLocation(e).x + "px";
		} else {
			thumb.style.top = currentLocation(e).y + "px";
		}
		return true;
	}

}
