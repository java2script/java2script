/*******************************************************************************
 * Copyright (c) 2000, 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.swt.widgets;

import org.eclipse.swt.SWT;
import org.eclipse.swt.SWTException;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.graphics.Rectangle;
import org.eclipse.swt.internal.RunnableCompatibility;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.xhtml.CSSStyle;
import org.eclipse.swt.internal.xhtml.Clazz;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.HTMLEvent;
import org.eclipse.swt.internal.xhtml.document;

/**
 * Instances of this class represent a selectable user interface object
 * that represents an item in a table.
 * <dl>
 * <dt><b>Styles:</b></dt>
 * <dd>(none)</dd>
 * <dt><b>Events:</b></dt>
 * <dd>(none)</dd>
 * </dl>
 * <p>
 * IMPORTANT: This class is <em>not</em> intended to be subclassed.
 * </p>
 */

public class TableItem extends Item {
	Table parent;
	String [] strings;
	Image [] images;
	boolean checked, grayed, cached;
	int imageIndent, background = -1, foreground = -1, font = -1;
	int [] cellBackground, cellForeground, cellFont;
	/**
	 * TODO : the index is not valid after a remove is called.
	 * 	But updating this field after a remove will degrade performance when the removed item is at the top
	 */
	int index;
	private boolean selected;
	Element check;
	private Object hCheckSelection;
	private Object hItemDefaultSelection;
	private Object hItemSelection;

/**
 * Constructs a new instance of this class given its parent
 * (which must be a <code>Table</code>) and a style value
 * describing its behavior and appearance. The item is added
 * to the end of the items maintained by its parent.
 * <p>
 * The style value is either one of the style constants defined in
 * class <code>SWT</code> which is applicable to instances of this
 * class, or must be built by <em>bitwise OR</em>'ing together 
 * (that is, using the <code>int</code> "|" operator) two or more
 * of those <code>SWT</code> style constants. The class description
 * lists the style constants that are applicable to the class.
 * Style bits are also inherited from superclasses.
 * </p>
 *
 * @param parent a composite control which will be the parent of the new instance (cannot be null)
 * @param style the style of control to construct
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the parent is null</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the parent</li>
 *    <li>ERROR_INVALID_SUBCLASS - if this class is not an allowed subclass</li>
 * </ul>
 *
 * @see SWT
 * @see Widget#checkSubclass
 * @see Widget#getStyle
 */
public TableItem (Table parent, int style) {
	this (parent, style, checkNull (parent).getItemCount (), true);
}

/**
 * Constructs a new instance of this class given its parent
 * (which must be a <code>Table</code>), a style value
 * describing its behavior and appearance, and the index
 * at which to place it in the items maintained by its parent.
 * <p>
 * The style value is either one of the style constants defined in
 * class <code>SWT</code> which is applicable to instances of this
 * class, or must be built by <em>bitwise OR</em>'ing together 
 * (that is, using the <code>int</code> "|" operator) two or more
 * of those <code>SWT</code> style constants. The class description
 * lists the style constants that are applicable to the class.
 * Style bits are also inherited from superclasses.
 * </p>
 *
 * @param parent a composite control which will be the parent of the new instance (cannot be null)
 * @param style the style of control to construct
 * @param index the index to store the receiver in its parent
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the parent is null</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the parent</li>
 *    <li>ERROR_INVALID_SUBCLASS - if this class is not an allowed subclass</li>
 * </ul>
 *
 * @see SWT
 * @see Widget#checkSubclass
 * @see Widget#getStyle
 */
public TableItem (Table parent, int style, int index) {
	this (parent, style, index, true);
}

TableItem (Table parent, int style, int index, boolean create) {
	super (parent, style);
	this.parent = parent;
	if (create) parent.createItem (this, index);
	configureItem();
}

private void configureItem() {
	if((parent.style & SWT.CHECK) != 0 && check != null){
		hCheckSelection = new RunnableCompatibility() {
			public void run() {
				Event e = new Event();
				e.display = display;
				e.type = SWT.Selection;
				e.detail = SWT.CHECK;
				e.item = TableItem.this;
				e.widget = TableItem.this;
				parent.sendEvent(e);
				setChecked(!checked);
			}
		};
		Clazz.addEvent(check, "click", hCheckSelection);
	}
	
//	Clazz.addEvent(this.handle, "keydown", new RunnableCompatibility() {
//		public void run() {
//			HTMLEvent evt = (HTMLEvent) getEvent();
//			int index = parent.getSelectionIndex();
//			if(evt.keyCode == 40){
//				if(index < parent.getColumnCount() - 1){
//					parent.select(index+1);
//				}
//			}else if(evt.keyCode == 38){
//				if(index > 0){
//					parent.select(index-1);
//				}
//			}
//		}
//	});

	
	hItemSelection = new RunnableCompatibility() {
		public void run() {
			if(handle.disabled){
				return;
			}
//			handle.focus();
			OS.SetFocus(parent.handle); //parent.handle.focus();
//			Element element = handle.childNodes[0].childNodes[0].childNodes[1];
//			element.className = "tree-item-text-selected";
			HTMLEvent evt = (HTMLEvent) getEvent();
			parent.toggleSelection(TableItem.this, evt.ctrlKey, evt.shiftKey);
			Event e = new Event();
			e.display = display;
			e.type = SWT.Selection;
			e.detail = SWT.NONE;
			e.item = TableItem.this;
			e.widget = TableItem.this;
			parent.sendEvent(e);
			parent.setFocusIndex(parent.indexOf(TableItem.this));
			toReturn(false);
		}
	};
	Clazz.addEvent(handle, "click", hItemSelection);
	
	hItemDefaultSelection = new RunnableCompatibility(){
		public void run(){
			if(handle.disabled){
				return;
			}
			HTMLEvent evt = (HTMLEvent) getEvent();
			parent.toggleSelection(TableItem.this, evt.ctrlKey, evt.shiftKey);
			Event e = new Event();
			e.display = display;
			e.type = SWT.DefaultSelection;
			e.detail = SWT.NONE;
			e.item = TableItem.this;
			e.widget = TableItem.this;
			parent.sendEvent(e);
			toReturn(false);					
		}
	};
	Clazz.addEvent(handle, "dblclick", hItemDefaultSelection);
}

static Table checkNull (Table control) {
	if (control == null) SWT.error (SWT.ERROR_NULL_ARGUMENT);
	return control;
}

protected void checkSubclass () {
	if (!isValidSubclass ()) error (SWT.ERROR_INVALID_SUBCLASS);
}

void clear () {
	text = "";
	image = null;
	strings = null;
	images = null;
	imageIndent = 0;
	checked = grayed = false;
	//background = foreground = font = -1;
	//cellBackground = cellForeground = cellFont = null;
	if ((parent.style & SWT.VIRTUAL) != 0) cached = false;
}

/**
 * Returns the receiver's background color.
 *
 * @return the background color
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @since 2.0
 */
public Color getBackground () {
	checkWidget ();
	if (!parent.checkData (this, true)) error (SWT.ERROR_WIDGET_DISPOSED);
//	int pixel = (background == -1) ? parent.getBackgroundPixel() : background;
//	return Color.win32_new (display, pixel);
	return new Color(display, handle.style.backgroundColor);
}

/**
 * Returns the background color at the given column index in the receiver.
 *
 * @param index the column index
 * @return the background color
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @since 3.0
 */
public Color getBackground (int index) {
	checkWidget ();
	if (!parent.checkData (this, true)) error (SWT.ERROR_WIDGET_DISPOSED);
	int count = Math.max (1, parent.getColumnCount ());
	if (0 > index || index > count - 1) return getBackground ();
//	int pixel = cellBackground != null ? cellBackground [index] : -1;
//	return pixel == -1 ? getBackground () : Color.win32_new (display, pixel);
	return new Color(display, handle.childNodes[index].style.backgroundColor);
}

/**
 * Returns a rectangle describing the receiver's size and location
 * relative to its parent.
 *
 * @return the receiver's bounding rectangle
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @since 3.1
 */
/*public*/ Rectangle getBounds () {
	checkWidget();
	if (!parent.checkData (this, true)) error (SWT.ERROR_WIDGET_DISPOSED);
	int itemIndex = parent.indexOf (this);
	if (itemIndex == -1) return new Rectangle (0, 0, 0, 0);
//	RECT rect = getBounds (itemIndex, 0, true, false);
//	int width = rect.right - rect.left, height = rect.bottom - rect.top;
//	return new Rectangle (rect.left, rect.top, width, height);
	return new Rectangle(0, 0, 0, 0);
}

/**
 * Returns a rectangle describing the receiver's size and location
 * relative to its parent at a column in the table.
 *
 * @param index the index that specifies the column
 * @return the receiver's bounding column rectangle
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public Rectangle getBounds (int index) {
	checkWidget();
	if (!parent.checkData (this, true)) error (SWT.ERROR_WIDGET_DISPOSED);
	int itemIndex = parent.indexOf (this);
	if (itemIndex == -1) return new Rectangle (0, 0, 0, 0);
//	RECT rect = getBounds (itemIndex, index, true, true);
//	int width = rect.right - rect.left, height = rect.bottom - rect.top;
//	return new Rectangle (rect.left, rect.top, width, height);
	return new Rectangle(0, 0, 0, 0);
}

/*
RECT getBounds (int row, int column, boolean getText, boolean getImage) {
	if (!getText && !getImage) return new RECT ();
	int count = Math.max (1, parent.getColumnCount ());
	if (0 > column || column > count - 1) return new RECT ();
	if (parent.fixScrollWidth) parent.setScrollWidth (null, true);
	RECT rect = new RECT ();
	int hwnd = parent.handle;
	if (column == 0 && count == 1) {
		if (getText && getImage) {
			rect.left = OS.LVIR_SELECTBOUNDS;
		} else {
			rect.left = getText ? OS.LVIR_LABEL : OS.LVIR_ICON;
		}
		if (OS.SendMessage (hwnd, OS. LVM_GETITEMRECT, row, rect) == 0) {
			rect.left = 0;
		}
	} else {
		/*
		* Feature in Windows.  Calling LVM_GETSUBITEMRECT with LVIR_LABEL
		* and zero for the column number gives the bounds of the first item
		* without including the bounds of the icon.  This is undocumented.
		* When called with values greater than zero, the icon bounds are
		* included and this behavior is documented.
		*-/
		rect.top = column;
		rect.left = getText ? OS.LVIR_LABEL : OS.LVIR_ICON;
		if (OS.SendMessage (hwnd, OS. LVM_GETSUBITEMRECT, row, rect) != 0) {
			if (getText && getImage) {
				if (column == 0) {
					RECT iconRect = new RECT ();
					iconRect.left = OS.LVIR_ICON;
					iconRect.top = column;
					if (OS.SendMessage (hwnd, OS. LVM_GETSUBITEMRECT, row, iconRect) != 0) {
						rect.left = iconRect.left;
						rect.right = Math.max (rect.right, iconRect.right);
					}
				}
			} else {
				if (column != 0) {
					/*
					* Feature in Windows.  LVM_GETSUBITEMRECT returns an image width
					* even when the subitem does not contain an image.  The fix is to
					* adjust the rectangle to represent the area the table is drawing.
					*-/
					if (images != null && images [column] != null) {
						if (getText) {
							RECT iconRect = new RECT ();
							iconRect.left = OS.LVIR_ICON;
							iconRect.top = column;		
							if (OS.SendMessage (hwnd, OS. LVM_GETSUBITEMRECT, row, iconRect) != 0) {
								rect.left = iconRect.right + Table.INSET / 2;
							}
						}
					} else {
						if (getImage) rect.right = rect.left;
					}
				}
			}
		} else {
			rect.left = rect.top = 0;
		}
	}
	
	/*
	* Bug in Windows.  In version 5.80 of COMCTL32.DLL, the top
	* of the rectangle returned by LVM_GETSUBITEMRECT is off by
	* the grid width when the grid is visible.  The fix is to
	* move the top of the rectangle up by the grid width.
	*-/
	int gridWidth = parent.getLinesVisible () ? Table.GRID_WIDTH : 0;
	if (OS.COMCTL32_VERSION >= OS.VERSION (5, 80)) rect.top -= gridWidth;
	if (column != 0) rect.left += gridWidth;
	rect.right = Math.max (rect.right, rect.left);
	rect.top += gridWidth;
	rect.bottom = Math.max (rect.bottom - gridWidth, rect.top);
	return rect;
}
*/

/**
 * Returns <code>true</code> if the receiver is checked,
 * and false otherwise.  When the parent does not have
 * the <code>CHECK</code> style, return false.
 *
 * @return the checked state of the checkbox
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public boolean getChecked () {
	checkWidget();
	if (!parent.checkData (this, true)) error (SWT.ERROR_WIDGET_DISPOSED);
	if ((parent.style & SWT.CHECK) == 0) return false;
	return checked;
}

/**
 * Returns the font that the receiver will use to paint textual information for this item.
 *
 * @return the receiver's font
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 *
 * @since 3.0
 */
public Font getFont () {
	checkWidget ();
	if (!parent.checkData (this, true)) error (SWT.ERROR_WIDGET_DISPOSED);
	//return font == -1 ? parent.getFont () : Font.win32_new (display, font);
	return display.getSystemFont();
}

/**
 * Returns the font that the receiver will use to paint textual information
 * for the specified cell in this item.
 *
 * @param index the column index
 * @return the receiver's font
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 *
 * @since 3.0
 */
public Font getFont (int index) {
	checkWidget ();
	if (!parent.checkData (this, true)) error (SWT.ERROR_WIDGET_DISPOSED);
	int count = Math.max (1, parent.getColumnCount ());
	if (0 > index || index > count -1) return getFont ();
//	int hFont = (cellFont != null) ? cellFont [index] : font;
//	return hFont == -1 ? getFont () : Font.win32_new (display, hFont);
	return display.getSystemFont();
}

/**
 * Returns the foreground color that the receiver will use to draw.
 *
 * @return the receiver's foreground color
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @since 2.0
 */
public Color getForeground () {
	checkWidget ();
	if (!parent.checkData (this, true)) error (SWT.ERROR_WIDGET_DISPOSED);
//	int pixel = (foreground == -1) ? parent.getForegroundPixel () : foreground;
//	return Color.win32_new (display, pixel);
	return new Color(display, handle.style.color);
}

/**
 * 
 * Returns the foreground color at the given column index in the receiver.
 *
 * @param index the column index
 * @return the foreground color
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @since 3.0
 */
public Color getForeground (int index) {
	checkWidget ();
	if (!parent.checkData (this, true)) error (SWT.ERROR_WIDGET_DISPOSED);
	int count = Math.max (1, parent.getColumnCount ());
	if (0 > index || index > count -1) return getForeground ();
//	int pixel = cellForeground != null ? cellForeground [index] : -1;
//	return pixel == -1 ? getForeground () : Color.win32_new (display, pixel);
	return new Color(null, handle.childNodes[index].style.backgroundColor);
}

/**
 * Returns <code>true</code> if the receiver is grayed,
 * and false otherwise. When the parent does not have
 * the <code>CHECK</code> style, return false.
 *
 * @return the grayed state of the checkbox
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public boolean getGrayed () {
	checkWidget();
	if (!parent.checkData (this, true)) error (SWT.ERROR_WIDGET_DISPOSED);
	if ((parent.style & SWT.CHECK) == 0) return false;
	return grayed;
}

public Image getImage () {
	checkWidget();
	if (!parent.checkData (this, true)) error (SWT.ERROR_WIDGET_DISPOSED);
	return super.getImage ();
}

/**
 * Returns the image stored at the given column index in the receiver,
 * or null if the image has not been set or if the column does not exist.
 *
 * @param index the column index
 * @return the image stored at the given column index in the receiver
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public Image getImage (int index) {
	checkWidget();
	if (!parent.checkData (this, true)) error (SWT.ERROR_WIDGET_DISPOSED);
	if (index == 0) return getImage ();
	if (images != null) {
		if (0 <= index && index < images.length) return images [index];
	}
	return null;
}

/**
 * Returns a rectangle describing the size and location
 * relative to its parent of an image at a column in the
 * table.  An empty rectangle is returned if index exceeds
 * the index of the table's last column.
 *
 * @param index the index that specifies the column
 * @return the receiver's bounding image rectangle
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public Rectangle getImageBounds (int index) {
	checkWidget();
	if (!parent.checkData (this, true)) error (SWT.ERROR_WIDGET_DISPOSED);
	int itemIndex = parent.indexOf (this);
	if (itemIndex == -1) return new Rectangle (0, 0, 0, 0);
//	RECT rect = getBounds (itemIndex, index, false, true);
//	int width = rect.right - rect.left, height = rect.bottom - rect.top;
//	return new Rectangle (rect.left, rect.top, width, height);
	return new Rectangle (0, 0, 0, 0);
}

/**
 * Gets the image indent.
 *
 * @return the indent
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public int getImageIndent () {
	checkWidget();
	if (!parent.checkData (this, true)) error (SWT.ERROR_WIDGET_DISPOSED);
	return imageIndent;
}

String getNameText () {
	if ((parent.style & SWT.VIRTUAL) != 0) {
		if (!cached) return "*virtual*"; //$NON-NLS-1$
	}
	return super.getNameText ();
}

/**
 * Returns the receiver's parent, which must be a <code>Table</code>.
 *
 * @return the receiver's parent
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public Table getParent () {
	checkWidget();
	return parent;
}

public String getText () {
	checkWidget();
	if (!parent.checkData (this, true)) error (SWT.ERROR_WIDGET_DISPOSED);
	return super.getText ();
}

/**
 * Returns the text stored at the given column index in the receiver,
 * or empty string if the text has not been set.
 *
 * @param index the column index
 * @return the text stored at the given column index in the receiver
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public String getText (int index) {
	checkWidget();
	if (!parent.checkData (this, true)) error (SWT.ERROR_WIDGET_DISPOSED);
	if (index == 0) return getText ();
	if (strings != null) {
		if (0 <= index && index < strings.length) {
			String string = strings [index];
			return string != null ? string : "";
		}
	}
	return "";
}

void redraw () {
	if ((parent.style & SWT.VIRTUAL) != 0) cached = true;
	if (parent.currentItem == this || parent.drawCount != 0) return;
//	int hwnd = parent.handle;
//	if (!OS.IsWindowVisible (hwnd)) return;
	int index = parent.indexOf (this);
	if (index == -1) return;
//	OS.SendMessage (hwnd, OS.LVM_REDRAWITEMS, index, index);
}

void redraw (int column, boolean drawText, boolean drawImage) {
	if ((parent.style & SWT.VIRTUAL) != 0) cached = true;
	if (parent.currentItem == this || parent.drawCount != 0) return;
//	int hwnd = parent.handle;
//	if (!OS.IsWindowVisible (hwnd)) return;
	int index = parent.indexOf (this);
	if (index == -1) return;
//	RECT rect = getBounds (index, column, drawText, drawImage);
//	OS.InvalidateRect (hwnd, rect, true);
}

/* (non-Javadoc)
 * @see org.eclipse.swt.widgets.Widget#releaseHandle()
 */
protected void releaseHandle() {
	if (check != null) {
		if (hCheckSelection != null) {
			Clazz.removeEvent(check, "click", hCheckSelection);
			hCheckSelection = null;
		}
		OS.destroyHandle(check);
		check = null;
	}
	if (handle != null) {
		if (hItemSelection != null) {
			Clazz.removeEvent(handle, "click", hItemSelection);
			hItemSelection = null;
		}
		if (hItemDefaultSelection != null) {
			Clazz.removeEvent(handle, "dblclick", hItemDefaultSelection);
			hItemDefaultSelection = null;
		}
		OS.deepClearChildren(handle);
//		OS.destroyHandle(handle);
//		handle = null;
	}
	super.releaseHandle();
}
protected void releaseChild () {
	super.releaseChild ();
	parent.destroyItem (this);
}

protected void releaseWidget () {
	super.releaseWidget ();
	parent = null;
	strings = null;
	images = null;
//	cellBackground = cellForeground = cellFont = null;
}

/**
 * Sets the receiver's background color to the color specified
 * by the argument, or to the default system color for the item
 * if the argument is null.
 *
 * @param color the new color (or null)
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_INVALID_ARGUMENT - if the argument has been disposed</li> 
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @since 2.0
 */
public void setBackground (Color color) {
	checkWidget ();
	if (color != null && color.isDisposed ()) {
		SWT.error (SWT.ERROR_INVALID_ARGUMENT);
	}
//	int pixel = -1;
	if (color != null) {
//		parent.customDraw = true;
//		pixel = color.handle;
		handle.style.backgroundColor = color.getCSSHandle();
	}
//	if (background == pixel) return;
//	background = pixel;
//	redraw ();
}

/**
 * Sets the background color at the given column index in the receiver 
 * to the color specified by the argument, or to the default system color for the item
 * if the argument is null.
 *
 * @param index the column index
 * @param color the new color (or null)
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_INVALID_ARGUMENT - if the argument has been disposed</li> 
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @since 3.0
 */
public void setBackground (int index, Color color) {
	checkWidget ();
	if (color != null && color.isDisposed ()) {
		SWT.error (SWT.ERROR_INVALID_ARGUMENT);
	}
	int count = Math.max (1, parent.getColumnCount ());
	if (0 > index || index > count - 1) return;
//	int pixel = -1;
	if (color != null) {
//		this.backgroundColors[index] = color.getCSSHandle();
		
		handle.childNodes[index].style.backgroundColor = color.getCSSHandle();
//		parent.customDraw = true;
//		pixel = color.handle;
	}
	/*
	if (cellBackground == null) {
		cellBackground = new int [count];
		for (int i = 0; i < count; i++) {
			cellBackground [i] = -1;
		}
	}
	if (cellBackground [index] == pixel) return;
	cellBackground [index] = pixel;
	redraw (index, true, true);
	*/
}

/**
 * Sets the checked state of the checkbox for this item.  This state change 
 * only applies if the Table was created with the SWT.CHECK style.
 *
 * @param checked the new checked state of the checkbox
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setChecked (boolean checked) {
	checkWidget();
	if ((parent.style & SWT.CHECK) == 0) return;
	if (this.checked == checked) return;
	setChecked (checked, false);
}

void setChecked (boolean checked, boolean notify) {
	this.checked = checked;
	if (this.check != null) {
		this.check.checked = this.checked;
	}
	if (notify) {
		Event event = new Event();
		event.item = this;
		event.detail = SWT.CHECK;
		parent.postEvent (SWT.Selection, event);
	}
	redraw ();
}

/**
 * Sets the font that the receiver will use to paint textual information
 * for this item to the font specified by the argument, or to the default font
 * for that kind of control if the argument is null.
 *
 * @param font the new font (or null)
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_INVALID_ARGUMENT - if the argument has been disposed</li> 
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @since 3.0
 */
public void setFont (Font font){
	checkWidget ();
	if (font != null && font.isDisposed ()) {
		SWT.error (SWT.ERROR_INVALID_ARGUMENT);
	}
	int hFont = -1;
	if (font != null) {
		parent.customDraw = true;
//		hFont = font.handle;
	}
	if (this.font == hFont) return;
	this.font = hFont;
	/*
	/*
	* Bug in Windows.  Despite the fact that every item in the
	* table always has LPSTR_TEXTCALLBACK, Windows caches the
	* bounds for the selected items.  This means that 
	* when you change the string to be something else, Windows
	* correctly asks you for the new string but when the item
	* is selected, the selection draws using the bounds of the
	* previous item.  The fix is to reset LPSTR_TEXTCALLBACK
	* even though it has not changed, causing Windows to flush
	* cached bounds.
	*-/
	if ((parent.style & SWT.VIRTUAL) == 0 && cached) {
		int itemIndex = parent.indexOf (this);
		if (itemIndex != -1) {
			int hwnd = parent.handle;
			LVITEM lvItem = new LVITEM ();
			lvItem.mask = OS.LVIF_TEXT;
			lvItem.iItem = itemIndex;
			lvItem.pszText = OS.LPSTR_TEXTCALLBACK;
			OS.SendMessage (hwnd, OS.LVM_SETITEM, 0, lvItem);
			cached = false;
		}
	}
	*/
	parent.setScrollWidth (this, false);
	redraw ();
}

/**
 * Sets the font that the receiver will use to paint textual information
 * for the specified cell in this item to the font specified by the 
 * argument, or to the default font for that kind of control if the 
 * argument is null.
 *
 * @param index the column index
 * @param font the new font (or null)
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_INVALID_ARGUMENT - if the argument has been disposed</li> 
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @since 3.0
 */
public void setFont (int index, Font font) {
	checkWidget ();
	if (font != null && font.isDisposed ()) {
		SWT.error (SWT.ERROR_INVALID_ARGUMENT);
	}
	int count = Math.max (1, parent.getColumnCount ());
	if (0 > index || index > count - 1) return;
//	int hFont = -1;
	if (font != null) {
		parent.customDraw = true;
//		hFont = font.handle;
	}
	if (cellFont == null) {
		cellFont = new int [count];
		for (int i = 0; i < count; i++) {
			cellFont [i] = -1;
		}
	}
	/*
	if (cellFont [index] == hFont) return;
	cellFont [index] = hFont;
	if (index == 0) {
		/*
		* Bug in Windows.  Despite the fact that every item in the
		* table always has LPSTR_TEXTCALLBACK, Windows caches the
		* bounds for the selected items.  This means that 
		* when you change the string to be something else, Windows
		* correctly asks you for the new string but when the item
		* is selected, the selection draws using the bounds of the
		* previous item.  The fix is to reset LPSTR_TEXTCALLBACK
		* even though it has not changed, causing Windows to flush
		* cached bounds.
		*-/
		if ((parent.style & SWT.VIRTUAL) == 0 && cached) {
			int itemIndex = parent.indexOf (this);
			if (itemIndex != -1) {
				int hwnd = parent.handle;
				LVITEM lvItem = new LVITEM ();
				lvItem.mask = OS.LVIF_TEXT;
				lvItem.iItem = itemIndex;
				lvItem.pszText = OS.LPSTR_TEXTCALLBACK;
				OS.SendMessage (hwnd, OS.LVM_SETITEM, 0, lvItem);
				cached = false;
			}
		}
		parent.setScrollWidth (this, false);
	}	
	*/
	redraw (index, true, false);
}

/**
 * Sets the receiver's foreground color to the color specified
 * by the argument, or to the default system color for the item
 * if the argument is null.
 *
 * @param color the new color (or null)
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_INVALID_ARGUMENT - if the argument has been disposed</li> 
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @since 2.0
 */
public void setForeground (Color color){
	checkWidget ();
	if (color != null && color.isDisposed ()) {
		SWT.error (SWT.ERROR_INVALID_ARGUMENT);
	}
//	int pixel = -1;
	if (color != null) {
//		parent.customDraw = true;
//		pixel = color.handle;
		handle.style.color = color.getCSSHandle();
	}
//	if (foreground == pixel) return;
//	foreground = pixel;
//	redraw ();
}

/**
 * Sets the foreground color at the given column index in the receiver 
 * to the color specified by the argument, or to the default system color for the item
 * if the argument is null.
 *
 * @param index the column index
 * @param color the new color (or null)
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_INVALID_ARGUMENT - if the argument has been disposed</li> 
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @since 3.0
 */
public void setForeground (int index, Color color){
	checkWidget ();
	if (color != null && color.isDisposed ()) {
		SWT.error (SWT.ERROR_INVALID_ARGUMENT);
	}
	int count = Math.max (1, parent.getColumnCount ());
	if (0 > index || index > count - 1) return;
//	int pixel = -1;
	if (color != null) {
//		parent.customDraw = true;
//		pixel = color.handle;
		handle.childNodes[index].style.color = color.getCSSHandle();
	}
	/*
	if (cellForeground == null) {
		cellForeground = new int [count];
		for (int i = 0; i < count; i++) {
			cellForeground [i] = -1;
		}
	}
	if (cellForeground [index] == pixel) return;
	cellForeground [index] = pixel;
	redraw (index, true, false);
	*/
}

/**
 * Sets the grayed state of the checkbox for this item.  This state change 
 * only applies if the Table was created with the SWT.CHECK style.
 *
 * @param grayed the new grayed state of the checkbox; 
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setGrayed (boolean grayed) {
	checkWidget();
	if ((parent.style & SWT.CHECK) == 0) return;
	if (this.grayed == grayed) return;
	this.grayed = grayed;
	redraw ();
}

/**
 * Sets the image for multiple columns in the table. 
 * 
 * @param images the array of new images
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the array of images is null</li>
 *    <li>ERROR_INVALID_ARGUMENT - if one of the images has been disposed</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setImage (Image [] images) {
	checkWidget();
	if (images == null) error (SWT.ERROR_NULL_ARGUMENT);
	for (int i=0; i<images.length; i++) {
		setImage (i, images [i]);
	}
}

public void setText (String string) {
	//checkWidget();
	setText (0, string);
}

/**
 * Sets the receiver's image at a column.
 *
 * @param index the column index
 * @param image the new image
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_INVALID_ARGUMENT - if the image has been disposed</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setImage (int index, Image image) {
	checkWidget();
	if (image != null && image.isDisposed ()) {
		error(SWT.ERROR_INVALID_ARGUMENT);
	}
	if (index == 0) {
		if (image != null && image.type == SWT.ICON) {
			if (image.equals (this.image)) return;
		}
		super.setImage (image);
	}
	int count = Math.max (1, parent.getColumnCount ());
	if (0 > index || index > count - 1) return;
	if (images == null && index != 0) images = new Image [count];
	if (images != null) {
		if (image != null && image.type == SWT.ICON) {
			if (image.equals (images [index])) return;
		}
		images [index] = image;
	}
	
	/* Ensure that the image list is created */
	//parent.imageIndex (image);
	
	if (index == 0) {
		if (this.image.handle == null && this.image.url != null && this.image.url.length() != 0) {
			Element text = handle.childNodes[index].childNodes[0];
			//text = text.childNodes[text.childNodes.length - 1];
				
			Element[] els = text.childNodes;
			CSSStyle handleStyle = handle.style;
			if (els.length == 1 || !OS.existedCSSClass(els[els.length - 2], "table-image")) {
				Element div = document.createElement("DIV");
				div.className = "table-image image-p-4 image-n-5";
				text.insertBefore(div, els[els.length - 1]);
				handleStyle = div.style; 
			} else {
				handleStyle = els[els.length - 2].style;
			}
			if (OS.isIENeedPNGFix && image.url.toLowerCase().endsWith(".png") && handleStyle.filter != null) {
//					Element imgBackground = document.createElement("DIV");
//					imgBackground.style.position = "absolute";
//					imgBackground.style.width = "100%";
//					imgBackground.style.height = "100%";
//					imgBackground.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
//					handle.appendChild(imgBackground);
				handleStyle.backgroundImage = "";
				handleStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
			} else {
				if (OS.isIENeedPNGFix && handleStyle.filter != null) handleStyle.filter = ""; 
				handleStyle.backgroundImage = "url(\"" + this.image.url + "\")";
			}
		}
		OS.addCSSClass(handle.parentNode, "table-image");
	}
	//if (index == 0) parent.setScrollWidth (this, false);
	redraw (index, false, true);
}

public void setImage (Image image) {
	checkWidget ();
	setImage (0, image);
}

/**
 * Sets the indent of the first column's image, expressed in terms of the image's width.
 *
 * @param indent the new indent
 *
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @deprecated this functionality is not supported on most platforms
 */
public void setImageIndent (int indent) {
	checkWidget();
	if (indent < 0) return;
	if (imageIndent == indent) return;
	imageIndent = indent;
	if ((parent.style & SWT.VIRTUAL) == 0) {
		int index = parent.indexOf (this);
		if (index != -1) {
			/*
			int hwnd = parent.handle;
			LVITEM lvItem = new LVITEM ();
			lvItem.mask = OS.LVIF_INDENT;
			lvItem.iItem = index;
			lvItem.iIndent = indent;
			OS.SendMessage (hwnd, OS.LVM_SETITEM, 0, lvItem);
			*/
		}
	}
	parent.setScrollWidth (this, false);
	redraw ();
}

/**
 * Sets the text for multiple columns in the table. 
 * 
 * @param strings the array of new strings
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the text is null</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setText (String [] strings) {
	checkWidget();
	if (strings == null) error (SWT.ERROR_NULL_ARGUMENT);
	for (int i=0; i<strings.length; i++) {
		String string = strings [i];
		if (string != null) setText (i, string);
	}
}

/**
 * Sets the receiver's text at a column
 *
 * @param index the column index
 * @param string the new text
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the text is null</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setText (int index, String string) {
	checkWidget();
	if (string == null) error (SWT.ERROR_NULL_ARGUMENT);
	if (index == 0) {
		if (string.equals (text)) return;
		super.setText (string);
	}
	int count = Math.max (1, parent.getColumnCount ());
	if (0 > index || index > count - 1) return;
	if (strings == null && index != 0) strings = new String [count];
	if (strings != null) {
		if (string.equals (strings [index])) return;
		strings [index] = string;
	}
	Element text = handle.childNodes[index].childNodes[0];
	if (index == 0) {
//		if((parent.style & SWT.RIGHT_TO_LEFT) == 0) {
			text = text.childNodes[text.childNodes.length - 1];
//		}else{
//			text = text.childNodes[0];
//		}
	}
	text.innerHTML = string;
	
	int[] columnMaxWidth = parent.columnMaxWidth;
	int width = OS.getContainerWidth(text.parentNode);
	if(columnMaxWidth.length > index){
		if(columnMaxWidth[index] < width){
			parent.lineWidth = parent.lineWidth + width - columnMaxWidth[index];
			columnMaxWidth[index] = width;
		}
	}else{
		parent.lineWidth = parent.lineWidth + width;
		columnMaxWidth[index] = width;
	}
//	if(children.length > 0){
//		text.removeChild(children[0]);
//	}
//	text.appendChild(document.createTextNode(string));
//	
//	Element tbodyTD = null;
//	if (index < handle.childNodes.length) {
//		if (handle.childNodes[index] != null
//				&& "TD".equals(handle.childNodes[index].nodeName)) {
//			tbodyTD = handle.childNodes[index];
//		}
//	}
//	if (tbodyTD == null){
//		tbodyTD = document.createElement("TD");
//		handle.appendChild(tbodyTD);
////		} else {
//	}
//	if (tbodyTD.childNodes != null) {
//		for (int i = 0; i < tbodyTD.childNodes.length; i++) {
//			if (tbodyTD.childNodes[i] != null) {
//				tbodyTD.removeChild(tbodyTD.childNodes[i]);
//			}
//		}
//	}
//	Element el = document.createElement("DIV");
//	tbodyTD.appendChild(el);
//	el.className = "table-item-cell-default";
//	//el.appendChild(document.createTextNode(string));
//	
//	if (index == 0 && (parent.style & SWT.CHECK) != 0) {
//		Element check = document.createElement("INPUT");
//		check.type = "checkbox";
//		el.appendChild(check);
//		Clazz.addEvent(check, "click", new RunnableCompatibility() {
//			public void run() {
//				Event e = new Event();
//				e.display = display;
//				e.type = SWT.Selection;
//				e.detail = SWT.CHECK;
//				e.item = TableItem.this;
//				e.widget = TableItem.this;
//				parent.sendEvent(e);
//			}
//		});
//	}
//	
//	Element text = document.createElement("DIV");
//	el.appendChild(text);
//	text.className = "table-item-cell-text-default";
//	text.appendChild(document.createTextNode(string));
//	if ((parent.style & SWT.FULL_SELECTION) != 0 || index == 0) {
//		Clazz.addEvent(text, "click", new RunnableCompatibility() {
//			public void run() {
////				Element element = handle.childNodes[0].childNodes[0].childNodes[1];
////				element.className = "tree-item-text-selected";
//				HTMLEvent evt = (HTMLEvent) getEvent();
//				parent.toggleSelection(TableItem.this, evt.ctrlKey, evt.shiftKey);
//				Event e = new Event();
//				e.display = display;
//				e.type = SWT.Selection;
//				e.detail = SWT.NONE;
//				e.item = TableItem.this;
//				e.widget = TableItem.this;
//				parent.sendEvent(e);
//				toReturn(false);
//			}
//		});
//		Clazz.addEvent(text, "dblclick", new RunnableCompatibility(){
//			public void run(){
//				HTMLEvent evt = (HTMLEvent) getEvent();
//				parent.toggleSelection(TableItem.this, evt.ctrlKey, evt.shiftKey);
//				Event e = new Event();
//				e.display = display;
//				e.type = SWT.DefaultSelection;
//				e.detail = SWT.NONE;
//				e.item = TableItem.this;
//				e.widget = TableItem.this;
//				parent.sendEvent(e);
//				toReturn(false);					
//			}
//		});
//	}

//		tbodyTD.style.overflow = "hidden";
//		tbodyTD.style.whiteSpace = "nowrap";
//		tbodyTD.style.margin = "0";
//		tbodyTD.style.padding = "0";
//		tbodyTD.appendChild(document.createTextNode(string));

	/*
	if (index == 0) {
		/*
		* Bug in Windows.  Despite the fact that every item in the
		* table always has LPSTR_TEXTCALLBACK, Windows caches the
		* bounds for the selected items.  This means that 
		* when you change the string to be something else, Windows
		* correctly asks you for the new string but when the item
		* is selected, the selection draws using the bounds of the
		* previous item.  The fix is to reset LPSTR_TEXTCALLBACK
		* even though it has not changed, causing Windows to flush
		* cached bounds.
		*-/
		if ((parent.style & SWT.VIRTUAL) == 0 && cached) {
			int itemIndex = parent.indexOf (this);
			if (itemIndex != -1) {
				int hwnd = parent.handle;
				LVITEM lvItem = new LVITEM ();
				lvItem.mask = OS.LVIF_TEXT;
				lvItem.iItem = itemIndex;
				lvItem.pszText = OS.LPSTR_TEXTCALLBACK;
				OS.SendMessage (hwnd, OS.LVM_SETITEM, 0, lvItem);
				cached = false;
			}
		}
		parent.setScrollWidth (this, false);
	}
	redraw (index, true, false);
	*/
}
void showSelection(boolean selected) {
	this.selected = selected;
	OS.updateCSSClass(handle, "table-item-selected", selected);
	if (OS.isIE) { // IE won't update selected background! 
		Element tmpDiv = document.createElement("DIV");
		tmpDiv.style.width = "1px"; // hasLayout
		handle.childNodes[0].appendChild(tmpDiv);
		OS.destroyHandle(tmpDiv);
	}
}
boolean isSelected(){
	return this.selected;
}

public void enableWidget(boolean enabled) {
	this.handle.disabled = !enabled;
	if (this.check != null) {
		this.check.disabled = !enabled;
	}
}

}
