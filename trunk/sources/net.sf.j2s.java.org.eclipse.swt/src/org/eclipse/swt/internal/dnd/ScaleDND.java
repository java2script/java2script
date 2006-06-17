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
import org.eclipse.swt.internal.xhtml.document;

/**
 * @author josson smith
 *
 * 2006-3-15
 */
public class ScaleDND extends DragAdapter {
	protected int sourceX = 0;
	protected int sourceY = 0;
	protected boolean isHorizontal;
	public boolean dragBegan(DragEvent e) {
		String cssName = e.sourceElement.className;
		if (cssName.indexOf ("horizontal") != -1) {
			isHorizontal = true;
		} else {
			isHorizontal = false;
		}
		this.sourceX = Integer.parseInt (e.sourceElement.style.left);
		this.sourceY = Integer.parseInt (e.sourceElement.style.top);
		/* first time, set start location to current location */
		e.startX = e.currentX;
		e.startY = e.currentY;
		return true;
	}

	public boolean dragCanceled(DragEvent e) {
		document.body.style.cursor = "auto";
		return true;
	}

	public boolean dragEnded(DragEvent e) {
		document.body.style.cursor = "auto";
		return true;
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
		if (isHorizontal) {
			//if (dWidth == NaN) {
			dWidth = 10;
			//}
			//if (dHeight == NaN) {
			dHeight = 18;
			//}
		} else {
			dWidth = 18;
			dHeight = 10;
		}
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
			e.sourceElement.style.left = currentLocation(e).x + "px";
		} else {
			e.sourceElement.style.top = currentLocation(e).y + "px";
		}
		return true;
	}

}
