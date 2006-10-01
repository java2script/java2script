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

package net.sf.j2s.test.swt.os;

import org.eclipse.swt.SWT;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.graphics.Rectangle;


/**
 * @author josson smith
 *
 * 2006-10-1
 */
public class CoolBar {
	CoolItem [] items;
	CoolItem [] originalItems;
	int width, height;
	
	public int indexOf (CoolItem item) {
		for (int i = 0; i < items.length; i++) {
			if (item == items[i]) {
				return i;
			}
		}
		return -1;
	}

	boolean isLastItemOfRow (int index) {
		int count = items.length;
		if (index + 1 == count) return true;
		return items[index + 1] != null && items[index + 1].wrap;
	}
	public void setWrapIndices (int [] indices) {
		if (indices == null) indices = new int [0];
		int count = items.length;
		for (int i=0; i<indices.length; i++) {
		}
		for (int i=0; i<items.length; i++) {
			CoolItem item = items [i];
			if (item.wrap) {
				resizeToPreferredWidth (i - 1);
				item.wrap = false;
			}
		}
		resizeToMaximumWidth (count - 1);
		for (int i=0; i<indices.length; i++) {
			int index = indices [i];
			if (0 <= index && index < items.length) {
				CoolItem item = items [index];
				item.wrap = true;
				resizeToMaximumWidth (index - 1);
			}
		}
	}
	
	void resizeToPreferredWidth (int index) {
		int count = items.length;
		if (0 <= index && index < count) {
			//items[index].setSize()
		}
	}

	void resizeToMaximumWidth (int index) {
	}
	
	int getMargin(int index) {
		int margin = 7 + 2;
		if (!isLastItemOfRow(index)) {
			margin += 2;
		}
		return margin;
	}
	int getMargin(CoolItem item) {
		int index = indexOf(item);
		int margin = 9;
		if (!isLastItemOfRow(index)) {
			margin += 2;
		}
		return margin;
	}
	int minWidth(CoolItem item) {
		return 7 + 2 + item.minimumWidth + (item.minimumWidth != 0 ? 4 : 0) + (!isLastItemOfRow(indexOf(item)) ? 2 : 0);
	}
	boolean moveDelta(int index, int cx, int cy, int dx, int dy) {
		if (dx == 0 && dy == 0) return false;
		boolean needLayout = false;
		if (dy == 0) {
			int[] ws = new int[items.length];
			for (int i = 0; i < ws.length; i++) {
				ws[i] = items[i].idealWidth;
			}
			boolean needCalculate = false;
			
			CoolItem item = items[index];
			if (item.wrap && (dx < 0 || isLastItemOfRow(index))) {
				return false;
			}
			if ((index == 0 && items.length > 1) // The first cool item
					|| (item.wrap && !isLastItemOfRow(index))) { // The second+ line item
				if (dx >= item.lastCachedWidth) {
					CoolItem next = items[index + 1];
					items[index] = next;
					items[index + 1] = item;
					int width = next.idealWidth;
					next.idealWidth = item.idealWidth;
					item.idealWidth = width;
					dx = dx - item.lastCachedWidth;
					index++;
					needLayout = true;
				}
			}
			if (dx != 0 && index > 0 && !(item.wrap && !isLastItemOfRow(index))) {
				CoolItem cur = item;
				CoolItem prev = items[index - 1];
				int idx = index - 1;
				while (dx < 0) { // Move left
					if (prev.lastCachedWidth + dx < minWidth(prev)) {
						int ddx = prev.lastCachedWidth - minWidth(prev); // > 0
						prev.idealWidth -= ddx;
						item.idealWidth += ddx;
						needCalculate = true;
						dx += ddx;
						if (dx < 0) {
							if (idx - 1 >= 0 && !items[idx].wrap) {
								idx--;
								prev = items[idx];
							} else {
								if (dx + 11 <= 0) {
									CoolItem swpItem = prev; 
									int swpIndex = index;
									while (dx + minWidth(swpItem) <= 0) {
										dx += minWidth(swpItem);
										swpItem = items[swpIndex - 1]; 
										items[swpIndex - 1] = items[swpIndex];
										items[swpIndex] = swpItem;
										if (swpItem.wrap) {
											items[swpIndex - 1].wrap = true;
											swpItem.wrap = false;
										}
										needLayout = true;
										swpIndex--;
										if (swpIndex == 0 || swpItem.wrap) {
											break;
										}
									}
								}
								//prev.idealWidth -= dx;
								dx = 0; // break dx < 0 loop
								break;
							}
						}
					} else {
						break;
					}
				}
				CoolItem next = null;
				idx = index;
				while (dx > 0 && cur.lastCachedWidth - dx < minWidth(cur)) { 
					// reach current item's minimum size
					int dxx = cur.lastCachedWidth - minWidth(cur); 
					prev.idealWidth += dxx;
					cur.idealWidth -= dxx;
					needCalculate = true;
					dx -= dxx;
					if (dx > 0) { // need to push right more, select the next item
						if (idx + 1 < items.length && !isLastItemOfRow(idx)) {
							idx++;
							cur = items[idx];
							if (next == null) {
								next = cur;
							}
						} else {
							// Already piled up at the end. Try to swap the selected item
							if (dx >= 11 && next != null) {
								CoolItem swpItem = next; 
								int swpIndex = index;
								while (dx >= minWidth(swpItem)) {
									items[swpIndex + 1] = items[swpIndex];
									items[swpIndex] = swpItem;
									swpItem = items[swpIndex + 1];
									needLayout = true;
									dx -= minWidth(swpItem);
									swpIndex++;
									if (swpIndex >= items.length || isLastItemOfRow(swpIndex)) {
										break;
									}
								}
							}
							dx = 0;
							break; // break while loop
						}
					}
				}
				prev.idealWidth += dx;
				if (dx != 0) {
					needCalculate = true;
				}
				if (item != cur) {
					if (cur.idealWidth - dx < 0) {
						if (cur.idealWidth != 0) {
							needCalculate = true;
						}
						cur.idealWidth = 0;
					} else {
						cur.idealWidth -= dx;
					}
				} else {
					item.idealWidth -= dx;
				}
			}
			if (needCalculate && !needLayout) {
				for (int i = 0; i < ws.length; i++) {
					if (ws[i] != items[i].idealWidth) {
						needLayout = true;
						break;
					}
				}
			}
		}
		if (needLayout) {
			SetWindowPos(null, null, 0, 0, width, height, -1);
		}
		return needLayout;
	}
	
	protected boolean SetWindowPos(Object hWnd, Object hWndInsertAfter, int X, int Y, int cx, int cy, int uFlags) {
		width = cx;
		height = cy;
		int bw = 0;
		for (int i = 0; i < items.length; i++) {
			CoolItem item = items[i];
			Rectangle bounds = item.getBounds();
			item.left = bounds.x;
			item.top = bounds.y;
			int w = bounds.width - 13 - bw;
			item.width = (w > 0 ? w : 0);
			item.height = bounds.height;
		}
		return true;
	}

	public Point computeSize (int wHint, int hHint, boolean changed) {
		int width = 0, height = 0;
		int border = 0;
		int count = items.length;
		if (count != 0) {
			boolean redraw = false;
			int rowHeight = 0;
			int rowWidth = 0;
			int separator = 2;
			for (int i = 0; i < count; i++) {
				if (items[i].wrap) {
					//System.out.println("wrap...");
					width = Math.max(width, rowWidth - separator);
					rowWidth = 0;
					height += rowHeight;
					//if (i != count - 1) {
						height += 2;
					//}
					rowHeight = 0;
				}
				if (items[i].ideal) {
					rowWidth += 7 + 2 + Math.max(items[i].idealWidth, items[i].minimumWidth + 2) + separator;
					if (items[i].control == null) {
						rowHeight = Math.max(rowHeight, 4);
					} else {
						rowHeight = Math.max(rowHeight, items[i].idealHeight);
					}
				} else {
					if (items[i].control != null) {
						rowWidth += items[i].control.length() * 8 +  + getMargin(i) + separator;
					} else {
						rowWidth += getMargin(i) + separator;
						rowHeight = Math.max(rowHeight, 4);
					}
				}
			}
			width = Math.max(width, rowWidth - separator);
			height += rowHeight;
			if (redraw) {
				/*
				if (OS.COMCTL32_MAJOR >= 6) {
					OS.DefWindowProc (handle, OS.WM_SETREDRAW, 1, 0);
				} else {
					OS.SendMessage (handle, OS.WM_SETREDRAW, 1, 0);
				}
				*/
			}
		}
		// */
		if (width == 0) width = 64;
		if (height == 0) height = 64;
		if (wHint != SWT.DEFAULT) width = wHint;
		if (hHint != SWT.DEFAULT) height = hHint;
		height += border * 2;
		width += border * 2;	
		return new Point (width, height);
	}
}
