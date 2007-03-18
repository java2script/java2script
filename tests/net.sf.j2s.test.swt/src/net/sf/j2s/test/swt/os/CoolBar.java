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

import org.eclipse.swt.SWT;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.graphics.Rectangle;


/**
 * @author zhou renjian
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
	boolean moveDelta(int index, int dx, int dy) {
		if (dx == 0 && dy == 0) return false;
		boolean needResize = false;
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
					if (item.wrap) {
						next.wrap = true;
						item.wrap = false;
					}
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
									if (swpItem.wrap) {
										items[swpIndex].wrap = true;
										swpItem.wrap = false;
									}
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
		} else { // dy != 0
			int line = verticalLine(index);
			if (line + dy < 0) {
				if (index == 0 && isLastItemOfRow(index)) {
					// already the top line, no need to add a new line
				} else {
					// Move upwards, add a new line
					CoolItem ci = items[index];
					if ((index == 0 && items.length > 1) // first line's first item moves upwards
							|| (ci.wrap && index < items.length - 1)) { // some inner item
						items[index + 1].wrap = true;
					}
					for (int i = index; i > 0; i--) {
						items[i] = items[i - 1];
					}
					items[0] = ci;
					items[1].wrap = true;
					ci.wrap = false;
					needLayout = true;
					needResize = true;
				}
			} else if (line + dy < getVerticalLines()) {
				// inline move, no need to create new line, but maybe remove lines
				int lineNumber = line + dy;
				int i = 0;
				for (i = 0; i < items.length; i++) {
					if (lineNumber == 0) {
						// should always breaks from here
						//i++;
						break;
					}
					if (items[i].wrap) {
						lineNumber--;
					}
				}
				if (i > 0) i--; // re-adjust the index the above line's last item
				CoolItem ci = items[index];
				if (index == 0 && isLastItemOfRow(index)) {
					needResize = true;
				}
				if (ci.wrap) {
					if (isLastItemOfRow(index)) {
						// remove a line
						needResize = true;
					}
					if (index < items.length - 1) { // index != 0 because ci.wrap
						items[index + 1].wrap = true;
					}
				}
				int x = ci.getPosition().x + dx;
				if (x <= 0) { // to left most
					if (i == 0) { // move upwards to line 0
						ci.wrap = false;
					} else {
						if (index == 0 && i == 1) { // move the first single item to the second line
						} else {
							ci.wrap = true;
						}
						if (i < items.length - 1) {
							items[i + 1].wrap = false;
						}
					}
				} else { // inside the line
					int rowWidth = 0;
					int separator = 2;
					for (; i < items.length; i++) {
						CoolItem item = items[i];
						int minimum = item.minimumWidth + (item.minimumWidth != 0 ? 2 : 0);
						rowWidth += 7 + 2 + Math.max(item.idealWidth, minimum) + separator;
						int xx = item.getPosition().x;
						if (xx < x && (x <= rowWidth || isLastItemOfRow(i))) {
							item.idealWidth = Math.max(0, x - xx - (7 + 2 + minimum + separator));
							minimum = ci.minimumWidth + (ci.minimumWidth != 0 ? 2 : 0);
							int mw = 7 + 2 + minimum + separator;
							ci.idealWidth = Math.max(item.minimumWidth, Math.max(ci.idealWidth, rowWidth - x - mw));
							if (rowWidth - x - mw < ci.idealWidth) {
								needResize = true;
							}
							break;
						}
					}
					ci.wrap = false;
				}
				// copy and move items -- re-order
				if (dy < 0 && x > 0 && i < items.length - 1) {
					i++;
				}
				if (dy > 0) {
					for (int j = index; j < i; j++) {
						items[j] = items[j + 1];
					}
				} else {
					for (int j = index; j > i; j--) {
						items[j] = items[j - 1];
					}
				}
				items[i] = ci;
				items[0].wrap = false;
				needLayout = true;
			} else { // total lines is greater than current line count
				if ((items[index].wrap || index == 0) && isLastItemOfRow(index)) {
					// already the bottom line!
				} else {
					// append new line
					CoolItem ci = items[index];
					if (index > 0 && ci.wrap) {
						items[index + 1].wrap = true;
					}
					for (int i = index; i < items.length - 1; i++) {
						items[i] = items[i + 1];
					}
					items[items.length - 1] = ci;
					ci.wrap = true;
					needLayout = true;
					needResize = true;
				}
			}
		}
		int w = width;
		int h = height;
		if (needResize) {
			Point computeSize = computeSize(-1, -1, false);
			w = computeSize.x;
			h = computeSize.y;
		}
		if (needLayout) {
			SetWindowPos(null, null, 0, 0, width, h, -1);
		}
		if (w > width) {
			for (int i = index + 1; i < items.length; i++) {
				if (isLastItemOfRow(i)) {
					moveDelta(i, width - height, 0);
					break;
				}
			}
		}
		return needLayout;
	}
	
	int getVerticalLines() {
		int lines = 0;
		for (int i = 0; i < items.length; i++) {
			if (items[i].wrap) {
				lines++;
			}
		}
		return lines + 1;
	}
	int verticalLine(int index) {
		int lines = 0;
		for (int i = 0; i <= index; i++) {
			if (items[i].wrap) {
				lines++;
			}
		}
		return lines;
	}
	
	int verticalLineByPixel(int px) {
		if (px < 0) {
			return -1;
		}
		int lines = 0;
		int rowHeight = 0;
		int height = 0;
		for (int i = 0; i < items.length; i++) {
			if (items[i].wrap) {
				height += rowHeight + 2;
				rowHeight = 0;
				if (px < height) {
					return lines;
				}
				lines++;
			}
			if (items[i].control == null) {
				rowHeight = Math.max(rowHeight, 4);
			} else if (items[i].ideal) {
				rowHeight = Math.max(rowHeight, items[i].idealHeight);
			}
		}
		height += rowHeight;
		if (px < height) {
			return lines;
		}
		return lines + 1;
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
