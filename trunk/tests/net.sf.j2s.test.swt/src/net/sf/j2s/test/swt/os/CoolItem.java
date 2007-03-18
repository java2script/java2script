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

package net.sf.j2s.test.swt.os;

import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.graphics.Rectangle;


/**
 * @author zhou renjian
 *
 * 2006-10-1
 */
public class CoolItem {
	CoolBar parent;
	boolean ideal, minimum;
	String control;
	
	int idealWidth, idealHeight;
	int preferredWidth, preferredHeight;
	int minimumWidth, minimumHeight;
	int lastCachedWidth, lastCachedHeight;
	boolean wrap;
	
	int left, top, width, height;

	public CoolItem(CoolBar parent) {
		this.parent = parent;
		this.control = "";
		this.wrap = false;
	}
	public Rectangle getSetBounds () {
		return new Rectangle (left, top, width, height);
	}
	public Rectangle getBounds () {
		Point size = getSize();
		Point pos = getPosition();
		return new Rectangle (pos.x, pos.y, size.x, size.y);
	}
	public Point getMinimumSize () {
		if (minimum) {
			return new Point(minimumWidth, minimumHeight);
		} else {
			return new Point(0, 0);
		}
	}
	public Point getPreferredSize () {
		if (ideal) {
			return new Point(preferredWidth, preferredHeight);
		} else {
			return new Point(11, (minimum ? minimumHeight : 0));
		}
	}
	Point getPosition() {
		int index = parent.indexOf (this);
		int x = 0;
		int y = 0;
		int rowHeight = 0;
		for (int i = 0; i <= index; i++) {
			if (i != index) {
				x += parent.items[i].lastCachedWidth;
			}
			if (parent.items[i].wrap) {
				y += rowHeight + 2;
				if (i != index) {
					x = parent.items[i].lastCachedWidth;
				} else {
					x = 0;
				}
			}
			if (parent.items[i].control == null) {
				rowHeight = Math.max(rowHeight, parent.items[i].lastCachedHeight - 4);
			} else {
				rowHeight = Math.max(rowHeight, parent.items[i].lastCachedHeight);
			}
		}
		return new Point(x, y);
	}
	public Point getSize() {
		int width = 0;
		int height = 0;
		if (true) {
			height = idealHeight;
			if (!parent.isLastItemOfRow (parent.indexOf(this))) {
				if (minimumWidth != 0) {
					width = 9 + Math.max(idealWidth, minimumWidth + 4) + 2;
				} else {
					width = 9 + idealWidth + 2;
				}
			} else {
				width = parent.width - getPosition().x;
			}
			lastCachedWidth = width;
			lastCachedHeight = height;
			return new Point (width, height);
		}
		
		if (ideal) {
			width += idealWidth;
			height = idealHeight;
			if (control == null) {
				height = 4;
			}
		} else if (control != null) {
			height = 0; //control.getBounds().height;
		} else {
			height = 4;
		}
		if (!parent.isLastItemOfRow (parent.indexOf(this))) {
//			if (idealWidth != 0) {
//				width += 2;
//			} else {
//				width -= 2;
//			}
		} else if (ideal) {
			width = parent.width - getPosition().x;
		}
		lastCachedWidth = width;
		lastCachedHeight = height;
		return new Point (width, height);
	}
	public void setMinimumSize (int width, int height) {
		width = Math.max (0, width);
		height = Math.max (0, height);
		minimum = true;
		minimumWidth = width;
		minimumHeight = height;
	}
	public void setMinimumSize (Point size) {
		setMinimumSize (size.x, size.y);
	}
	public void setPreferredSize (int width, int height) {
		width = Math.max (0, width);
		height = Math.max (0, height);
		ideal = true;
		idealWidth = Math.max (0, width - 9);
		idealHeight = height;
		preferredWidth = width;
		preferredHeight = height;
	}
	public void setPreferredSize (Point size) {
		setPreferredSize (size.x, size.y);
	}
}
