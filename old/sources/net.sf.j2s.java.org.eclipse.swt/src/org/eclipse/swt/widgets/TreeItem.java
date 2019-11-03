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
 * that represents a hierarchy of tree items in a tree widget.
 * 
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

public class TreeItem extends Item {
	/**
	 * the handle to the OS resource 
	 * (Warning: This field is platform dependent)
	 * <p>
	 * <b>IMPORTANT:</b> This field is <em>not</em> part of the SWT
	 * public API. It is marked public only so that it can be shared
	 * within the packages provided by SWT. It is not available on all
	 * platforms and should never be accessed from application code.
	 * </p>
	 */	
	//public int handle;
	Tree parent;
	String [] strings;
	Image [] images;
//	int background = -1, foreground = -1, font = -1;
//	int [] cellBackground, cellForeground, cellFont;
	TreeItem parentItem;
	TreeItem[] items;
	int index;
	int depth;
	boolean expandStatus, selected;
	Element checkElement;
	private Object hAnchorToggle;
	private Object hCheckSelection;
	private Object hTextSelection;
	private Object hTextDefaultSelection;
	private Object hNoTextSelection;
	private Element anchorElement;
	
/**
 * Constructs a new instance of this class given its parent
 * (which must be a <code>Tree</code> or a <code>TreeItem</code>)
 * and a style value describing its behavior and appearance.
 * The item is added to the end of the items maintained by its parent.
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
 * @param parent a tree control which will be the parent of the new instance (cannot be null)
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
public TreeItem (Tree parent, int style) {
	super (parent, style);
	this.parent = parent;
	this.items = new TreeItem[0];
	//parent.createItem (this, 0, OS.TVI_LAST);
	parent.createItem (this, null, -1);
	configureItem();
}

/**
 * Constructs a new instance of this class given its parent
 * (which must be a <code>Tree</code> or a <code>TreeItem</code>),
 * a style value describing its behavior and appearance, and the index
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
 * @param parent a tree control which will be the parent of the new instance (cannot be null)
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
public TreeItem (Tree parent, int style, int index) {
	super (parent, style);
	if (index < 0) error (SWT.ERROR_INVALID_RANGE);
	this.parent = parent;
	this.items = new TreeItem[0];
	/*
	int hItem = OS.TVI_FIRST;
	if (index != 0) {
		int count = 1, hwnd = parent.handle;
		hItem = OS.SendMessage (hwnd, OS.TVM_GETNEXTITEM, OS.TVGN_ROOT, 0);
		while (hItem != 0 && count < index) {
			hItem = OS.SendMessage (hwnd, OS.TVM_GETNEXTITEM, OS.TVGN_NEXT, hItem);
			count++;
		}
		if (hItem == 0) error (SWT.ERROR_INVALID_RANGE);
	}
	parent.createItem (this, 0, hItem);
	*/
	parent.createItem (this, null, index);
	configureItem();
}

/**
 * Constructs a new instance of this class given its parent
 * (which must be a <code>Tree</code> or a <code>TreeItem</code>)
 * and a style value describing its behavior and appearance.
 * The item is added to the end of the items maintained by its parent.
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
 * @param parentItem a tree control which will be the parent of the new instance (cannot be null)
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
public TreeItem (TreeItem parentItem, int style) {
	super (checkNull (parentItem).parent, style);
	parent = parentItem.parent;
//	int hItem = parentItem.handle;
//	parent.createItem (this, hItem, OS.TVI_LAST);
	this.parentItem = parentItem;
	this.items = new TreeItem[0];
	parent.createItem (this, parentItem, -1);//OS.TVI_LAST);
	configureItem();
}

/**
 * Constructs a new instance of this class given its parent
 * (which must be a <code>Tree</code> or a <code>TreeItem</code>),
 * a style value describing its behavior and appearance, and the index
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
 * @param parentItem a tree control which will be the parent of the new instance (cannot be null)
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
public TreeItem (TreeItem parentItem, int style, int index) {
	super (checkNull (parentItem).parent, style);
	if (index < 0) error (SWT.ERROR_INVALID_RANGE);
	parent = parentItem.parent;
	this.items = new TreeItem[0];
	this.parentItem = parentItem;
	/*
	int hItem = OS.TVI_FIRST;
	int hParent = parentItem.handle;
	if (index != 0) {
		int count = 1, hwnd = parent.handle;
		hItem = OS.SendMessage (hwnd, OS.TVM_GETNEXTITEM, OS.TVGN_CHILD, hParent);
		while (hItem != 0 && count < index) {
			hItem = OS.SendMessage (hwnd, OS.TVM_GETNEXTITEM, OS.TVGN_NEXT, hItem);
			count++;
		}
		if (hItem == 0) error (SWT.ERROR_INVALID_RANGE);
	}
	parent.createItem (this, hParent, hItem);
	*/
	parent.createItem (this, parentItem, index);
	configureItem();
}

void configureItem() {
	//if (index != 0) return;
	Element[] innerChildren = handle.childNodes[0] // td
	                                            .childNodes[0].childNodes[0].childNodes;
	for (int i = 0; i < innerChildren.length - 1; i++) {
		Element hAnchor = innerChildren[i];
		String css = hAnchor.childNodes[1].className;
		if (css.indexOf("plus") != -1 || css.indexOf("minus") != -1) {
			anchorElement = hAnchor;
			hAnchorToggle = new RunnableCompatibility() {
				public void run() {
					toggleExpandStatus();
				}
			};
			Clazz.addEvent(hAnchor, "click", hAnchorToggle);
			break;
		}
	}
	if ((parent.style & SWT.CHECK) != 0) {
		hCheckSelection = new RunnableCompatibility() {
			public void run() {
				Event e = new Event();
				e.display = display;
				e.type = SWT.Selection;
				e.detail = SWT.CHECK;
				e.item = TreeItem.this;
				e.widget = TreeItem.this;
				parent.sendEvent(e);
			}
		};
		Clazz.addEvent(checkElement, "click", hCheckSelection);
	}
	Element text = innerChildren[innerChildren.length - 1];
	hTextSelection = new RunnableCompatibility() {
		public void run() {
			HTMLEvent evt = (HTMLEvent) getEvent();
			parent.toggleSelection(TreeItem.this, evt.ctrlKey, evt.shiftKey);
			Event e = new Event();
			e.display = display;
			e.type = SWT.Selection;
			e.detail = SWT.NONE;
			e.item = TreeItem.this;
			e.widget = TreeItem.this;
			parent.sendEvent(e);
			toReturn(false);
		}
	};
	Clazz.addEvent(text, "click", hTextSelection);
	
	hTextDefaultSelection = new RunnableCompatibility() {
		public void run() {
			toggleExpandStatus();
			// Adding default selection event for double click
			Event e = new Event();
			e.display = display;
			e.type = SWT.DefaultSelection;
			e.detail = SWT.NONE;
			e.item = TreeItem.this;
			e.widget = TreeItem.this;
			parent.sendEvent(e);
			e = new Event();
			e.display = display;
			e.type = SWT.MouseDoubleClick;
			e.detail = SWT.NONE;
			e.item = TreeItem.this;
			e.widget = TreeItem.this;
			parent.sendEvent(e);
			toReturn(false);
		}
	};
	Clazz.addEvent(text, "dblclick", hTextDefaultSelection);
	
	hNoTextSelection = OS.setTextSelection(text, false);
}
static TreeItem checkNull (TreeItem item) {
	if (item == null) SWT.error (SWT.ERROR_NULL_ARGUMENT);
	return item;
}

protected void checkSubclass () {
	if (!isValidSubclass ()) error (SWT.ERROR_INVALID_SUBCLASS);
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
 * 
 */
public Color getBackground () {
	checkWidget ();
//	int pixel = (background == -1) ? parent.getBackgroundPixel() : background;
//	return Color.win32_new (display, pixel);
	return new Color (display, handle.style.backgroundColor);
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
 * @since 3.1
 */
public Color getBackground (int index) {
	checkWidget ();
	int count = Math.max (1, parent.getColumnCount ());
	if (0 > index || index > count - 1) return getBackground ();
	/*
	int pixel = cellBackground != null ? cellBackground [index] : -1;
	return pixel == -1 ? getBackground () : Color.win32_new (display, pixel);
	*/
	return new Color(display, handle.style.backgroundColor);
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
 */
public Rectangle getBounds () {
	checkWidget ();
	/*
	RECT rect = getBounds (0, true, false, false);
	int width = rect.right - rect.left, height = rect.bottom - rect.top;
	return new Rectangle (rect.left, rect.top, width, height);
	*/
	return new Rectangle(0, 0, 0, 0);
}

/**
 * Returns a rectangle describing the receiver's size and location
 * relative to its parent at a column in the tree.
 *
 * @param index the index that specifies the column
 * @return the receiver's bounding column rectangle
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @since 3.1
 */
public Rectangle getBounds (int index) {
	checkWidget();
	/*
	RECT rect = getBounds (index, true, true, true);
	int width = rect.right - rect.left, height = rect.bottom - rect.top;
	return new Rectangle (rect.left, rect.top, width, height);
	*/
	return new Rectangle(0, 0, 0, 0);
}

/*
RECT getBounds (int index, boolean getText, boolean getImage, boolean full) {
//	TODO - take into account grid (add boolean arg) to damage less during redraw
	if (!getText && !getImage) return new RECT ();
	int count = 0, hwndHeader = parent.hwndHeader;
	if (hwndHeader != 0) {
		count = OS.SendMessage (hwndHeader, OS.HDM_GETITEMCOUNT, 0, 0);
	}
	RECT rect = new RECT ();
	if (index == 0) {
		int hwnd = parent.handle; 
		rect.left = handle;
		if (OS.SendMessage (hwnd, OS.TVM_GETITEMRECT, 1, rect) == 0) {
			return new RECT ();
		}
		if (getImage) {
			Point size = parent.getImageSize ();
			rect.left -= size.x + Tree.INSET;
			if (!getText) rect.right = rect.left + size.x;
		}
		if (getText && full && hwndHeader != 0 && count != 0) {
			RECT headerRect = new RECT ();
			if (OS.SendMessage (hwndHeader, OS.HDM_GETITEMRECT, 0, headerRect) == 0) {
				return new RECT ();
			}
			rect.right = headerRect.right;
		}
	} else {
		if (!(0 <= index && index < count)) return new RECT ();
		RECT headerRect = new RECT ();
		if (OS.SendMessage (hwndHeader, OS.HDM_GETITEMRECT, index, headerRect) == 0) {
			return new RECT ();
		}
		int hwnd = parent.handle;
		rect.left = handle;
		if (OS.SendMessage (hwnd, OS.TVM_GETITEMRECT, 0, rect) == 0) {
			return new RECT ();
		}
		rect.left = headerRect.left;
		rect.right = headerRect.right;
		if (!getText || !getImage) {
			if (images != null && images [index] != null) {
				Point size = parent.getImageSize ();
				if (getImage) {
					rect.right = Math.min (rect.left + size.x, rect.right);
				} else {
					rect.left = Math.min (rect.left + size.x, rect.right);
				}
			} else {
				if (getImage) rect.right = rect.left;
			}
		}
	}
	int gridWidth = parent.getLinesVisible () ? Tree.GRID_WIDTH : 0;
	if (getText || !getImage) {
		rect.right = Math.max (rect.left, rect.right - gridWidth);
	}
	rect.bottom = Math.max (rect.top, rect.bottom - gridWidth);
	return rect;
}
*/

/**
 * Returns <code>true</code> if the receiver is checked,
 * and false otherwise.  When the parent does not have
 * the <code>CHECK style, return false.
 * <p>
 *
 * @return the checked state
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public boolean getChecked () {
	checkWidget ();
	if ((parent.style & SWT.CHECK) == 0) return false;
	/*
	int hwnd = parent.handle;
	TVITEM tvItem = new TVITEM ();
	tvItem.mask = OS.TVIF_HANDLE | OS.TVIF_STATE;
	tvItem.stateMask = OS.TVIS_STATEIMAGEMASK;
	tvItem.hItem = handle;
	int result = OS.SendMessage (hwnd, OS.TVM_GETITEM, 0, tvItem);
	return (result != 0) && (((tvItem.state >> 12) & 1) == 0);
	*/
	if (checkElement != null) {
		return checkElement.checked;
	}
	return false;
}

/**
 * Returns <code>true</code> if the receiver is expanded,
 * and false otherwise.
 * <p>
 *
 * @return the expanded state
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public boolean getExpanded () {
	checkWidget ();
	/*
	int hwnd = parent.handle;
	TVITEM tvItem = new TVITEM ();
	tvItem.hItem = handle;
	tvItem.mask = OS.TVIF_STATE;
	OS.SendMessage (hwnd, OS.TVM_GETITEM, 0, tvItem);
	return (tvItem.state & OS.TVIS_EXPANDED) != 0;
	*/
	return expandStatus;
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
//	return font == -1 ? parent.getFont () : Font.win32_new (display, font);
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
 * @since 3.1
 */
public Font getFont (int index) {
	checkWidget ();
	int count = Math.max (1, parent.getColumnCount ());
	if (0 > index || index > count -1) return getFont ();
	/*
	int hFont = (cellFont != null) ? cellFont [index] : font;
	return hFont == -1 ? getFont () : Font.win32_new (display, hFont);
	*/
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
 * 
 */
public Color getForeground () {
	checkWidget ();
//	int pixel = (foreground == -1) ? parent.getForegroundPixel() : foreground;
//	return Color.win32_new (display, pixel);
	return new Color(display, parent.handle.style.color);
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
 * @since 3.1
 */
public Color getForeground (int index) {
	checkWidget ();
	int count = Math.max (1, parent.getColumnCount ());
	if (0 > index || index > count -1) return getForeground ();
//	int pixel = cellForeground != null ? cellForeground [index] : -1;
//	return pixel == -1 ? getForeground () : Color.win32_new (display, pixel);
	return new Color(display, handle.style.color);
}

/**
 * Returns <code>true</code> if the receiver is grayed,
 * and false otherwise. When the parent does not have
 * the <code>CHECK style, return false.
 * <p>
 *
 * @return the grayed state
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public boolean getGrayed () {
	checkWidget ();
	if ((parent.style & SWT.CHECK) == 0) return false;
	/*
	int hwnd = parent.handle;
	TVITEM tvItem = new TVITEM ();
	tvItem.mask = OS.TVIF_HANDLE | OS.TVIF_STATE;
	tvItem.stateMask = OS.TVIS_STATEIMAGEMASK;
	tvItem.hItem = handle;
	int result = OS.SendMessage (hwnd, OS.TVM_GETITEM, 0, tvItem);
	return (result != 0) && ((tvItem.state >> 12) > 2);
	*/
	// TODO:
	if (checkElement != null) {
		return checkElement.checked;
	}
	return true;
}

/**
 * Returns the item at the given, zero-relative index in the
 * receiver. Throws an exception if the index is out of range.
 *
 * @param index the index of the item to return
 * @return the item at the given index
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_INVALID_RANGE - if the index is not between 0 and the number of elements in the list minus 1 (inclusive)</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @since 3.1
 */
public TreeItem getItem (int index) {
	checkWidget ();
	if (index < 0) error (SWT.ERROR_INVALID_RANGE);
	/*
	int hwnd = parent.handle;
	int hItem = OS.SendMessage (hwnd, OS.TVM_GETNEXTITEM, OS.TVGN_CHILD, handle);
	while (index-- > 0 && hItem != 0) {
		hItem = OS.SendMessage (hwnd, OS.TVM_GETNEXTITEM, OS.TVGN_NEXT, hItem);
	}
	if (hItem == 0) error (SWT.ERROR_INVALID_RANGE);
	TVITEM tvItem = new TVITEM ();
	tvItem.mask = OS.TVIF_HANDLE | OS.TVIF_PARAM;
	tvItem.hItem = hItem;
	OS.SendMessage (hwnd, OS.TVM_GETITEM, 0, tvItem);
	return parent.items [tvItem.lParam];
	*/
//	TreeItem[] copiedItems = new TreeItem[0];
//	TreeItem[] items = parent.items;
//	for (int i = 0; i < items.length; i++) {
//		if (items[i] != null && items[i].parentItem == null) {
//			copiedItems[copiedItems.length] = items[i];
//		}
//	}
//	return copiedItems[index];
	return items[index];
}

/**
 * Returns the number of items contained in the receiver
 * that are direct item children of the receiver.
 *
 * @return the number of items
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public int getItemCount () {
	checkWidget ();
	/*
	int hwnd = parent.handle;
	int hItem = OS.SendMessage (hwnd, OS.TVM_GETNEXTITEM, OS.TVGN_CHILD, handle);
	if (hItem == 0) return 0;
	return parent.getItemCount (hItem);
	*/
	return items.length;
//	TreeItem[] copiedItems = new TreeItem[0];
//	TreeItem[] items = parent.items;
//	for (int i = 0; i < items.length; i++) {
//		if (items[i] != null && items[i].parentItem == null) {
//			copiedItems[copiedItems.length] = items[i];
//		}
//	}
//	return copiedItems.length;
}

/**
 * Returns a (possibly empty) array of <code>TreeItem</code>s which
 * are the direct item children of the receiver.
 * <p>
 * Note: This is not the actual structure used by the receiver
 * to maintain its list of items, so modifying the array will
 * not affect the receiver. 
 * </p>
 *
 * @return the receiver's items
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public TreeItem [] getItems () {
	checkWidget ();
//	int hwnd = parent.handle;
//	int hItem = OS.SendMessage (hwnd, OS.TVM_GETNEXTITEM, OS.TVGN_CHILD, handle);
//	if (hItem == 0) return new TreeItem [0];
	return items;
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
 * 
 * @since 3.1
 */
public Image getImage (int index) {
	checkWidget();
	if (index == 0) return getImage ();
	if (images != null) {
		if (0 <= index && index < images.length) return images [index];
	}
	return null;
}

/**
 * Returns a rectangle describing the size and location
 * relative to its parent of an image at a column in the
 * table.
 *
 * @param index the index that specifies the column
 * @return the receiver's bounding image rectangle
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @since 3.1
 */
public Rectangle getImageBounds (int index) {
	checkWidget();
	/*
	RECT rect = getBounds (index, false, true, false);
	int width = rect.right - rect.left, height = rect.bottom - rect.top;
	return new Rectangle (rect.left, rect.top, width, height);
	*/
	return new Rectangle (0, 0, 0, 0);
}

/**
 * Returns the receiver's parent, which must be a <code>Tree</code>.
 *
 * @return the receiver's parent
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public Tree getParent () {
	checkWidget ();
	return parent;
}

/**
 * Returns the receiver's parent item, which must be a
 * <code>TreeItem</code> or null when the receiver is a
 * root.
 *
 * @return the receiver's parent item
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public TreeItem getParentItem () {
	checkWidget ();
	/*
	int hwnd = parent.handle;
	TVITEM tvItem = new TVITEM ();
	tvItem.mask = OS.TVIF_HANDLE | OS.TVIF_PARAM;
	tvItem.hItem = OS.SendMessage (hwnd, OS.TVM_GETNEXTITEM, OS.TVGN_PARENT, handle);
	if (tvItem.hItem == 0) return null;
	OS.SendMessage (hwnd, OS.TVM_GETITEM, 0, tvItem);
	return parent.items [tvItem.lParam];
	*/
	return parentItem;
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
 * 
 * @since 3.1
 */
public String getText (int index) {
	checkWidget();
	if (index == 0) return getText ();
	if (strings != null) {
		if (0 <= index && index < strings.length) {
			String string = strings [index];
			return string != null ? string : "";
		}
	}
	return "";
}

/**
 * Searches the receiver's list starting at the first item
 * (index 0) until an item is found that is equal to the 
 * argument, and returns the index of that item. If no item
 * is found, returns -1.
 *
 * @param item the search item
 * @return the index of the item
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the tool item is null</li>
 *    <li>ERROR_INVALID_ARGUMENT - if the tool item has been disposed</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @since 3.1
 */
public int indexOf (TreeItem item) {
	checkWidget ();
	if (item == null) error (SWT.ERROR_NULL_ARGUMENT);
	if (item.isDisposed()) error(SWT.ERROR_INVALID_ARGUMENT);
//	int hwnd = parent.handle;
//	int hItem = OS.SendMessage (hwnd, OS.TVM_GETNEXTITEM, OS.TVGN_CHILD, handle);
//	return hItem == 0 ? -1 : parent.indexOf (hItem, item.handle);
	
	return parent.indexOf(index, item);
}

void redraw () {
	if (parent.drawCount > 0) return;
	/*
	int hwnd = parent.handle;
	if (!OS.IsWindowVisible (hwnd)) return;
	RECT rect = new RECT ();
	rect.left = handle;
	/*
	* When there are no columns and the tree is not
	* full selection, redraw only the text.  This is
	* an optimization to reduce flashing.
	*-/
	boolean full = (parent.style & SWT.FULL_SELECTION) != 0;
	if (!full) {
		int hwndHeader = parent.hwndHeader;
		if (hwndHeader != 0) {
			full = OS.SendMessage (hwndHeader, OS.HDM_GETITEMCOUNT, 0, 0) != 0;
		}
	}
	if (OS.SendMessage (hwnd, OS.TVM_GETITEMRECT, full ? 0 : 1, rect) != 0) {
		OS.InvalidateRect (hwnd, rect, true);
	}
	*/
}

void redraw (int column, boolean drawText, boolean drawImage) {
	if (parent.drawCount > 0) return;
	/*
	int hwnd = parent.handle;
	if (!OS.IsWindowVisible (hwnd)) return;
	RECT rect = getBounds (column, drawText, drawImage, true);
	OS.InvalidateRect (hwnd, rect, true);
	*/
}

protected void releaseChild () {
	super.releaseChild ();
	TreeItem[] children = this.getItems();
	for (int i = 0; i < children.length; i++){
		children[i].dispose();
	}
	parent.destroyItem (this);
	if(parentItem!=null){
		parentItem.destroyItem(this);
	}
}

private void destroyItem(TreeItem item) {
	int length = items.length;
	int index = -1;
	for(int i = 0; i < length; i++){
		if(items[i].equals(item)){
			index = i;
		}
	}
	if(index > -1){
		TreeItem[] newItems = new TreeItem[0];
		System.arraycopy(items, 0, newItems, 0, index);
		System.arraycopy(items, index + 1, newItems, index, items.length - index - 1);
		items = newItems;
	}
	
}

protected void releaseHandle () {
	if (text != null) {
		if (hNoTextSelection != null) {
			Clazz.removeEvent(text, "selectstart", hNoTextSelection);
			hNoTextSelection = null;
		}
		if (hTextSelection != null) {
			Clazz.removeEvent(text, "click", hTextSelection);
			hTextSelection = null;
		}
		if (hTextDefaultSelection != null) {
			Clazz.removeEvent(text, "dblclick", hTextDefaultSelection);
			hTextDefaultSelection = null;
		}
		OS.destroyHandle(text);
		text = null;
	}
	if (hCheckSelection != null) {
		Clazz.removeEvent(checkElement, "click", hCheckSelection);
		hCheckSelection = null;
	}
	if (anchorElement != null && hAnchorToggle != null) {
		Clazz.removeEvent(anchorElement, "click", hAnchorToggle);
		anchorElement = null;
		hAnchorToggle = null;
	}
	if (checkElement != null) {
		OS.destroyHandle(checkElement);
		checkElement = null;
	}
	if (handle != null) {
		OS.deepClearChildren(handle);
//		OS.destroyHandle(handle);
//		handle = null;
	}
	super.releaseHandle ();
//	handle = 0;
}

protected void releaseWidget () {
	super.releaseWidget ();
	//cellBackground = cellForeground = cellFont = null;
	parent = null;
	parentItem = null;
	items = null;
}

/**
 * Removes all of the items from the receiver.
 * <p>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 *
 * @since 3.1
 */
public void removeAll () {
	checkWidget ();
	/*
	int hwnd = parent.handle;
	TVITEM tvItem = new TVITEM ();
	tvItem.mask = OS.TVIF_HANDLE | OS.TVIF_PARAM;
	tvItem.hItem = OS.SendMessage (hwnd, OS.TVM_GETNEXTITEM, OS.TVGN_CHILD, handle);
	while (tvItem.hItem != 0) {
		OS.SendMessage (hwnd, OS.TVM_GETITEM, 0, tvItem);
		TreeItem item = parent.items [tvItem.lParam];
		if (item != null && !item.isDisposed ()) {
			item.dispose ();
		}
		tvItem.hItem = OS.SendMessage (hwnd, OS.TVM_GETNEXTITEM, OS.TVGN_CHILD, handle);
	}
	*/
	TreeItem[] items = getItems();
	int length = items.length;
	for(int i = 0 ;i < length; i++){
		items[i].dispose();
	}
	this.items = new TreeItem[0];
	
	OS.replaceCSSClassInDepth(this.handle, "tree-anchor-plus", "tree-anchor-line");
	OS.replaceCSSClassInDepth(this.handle, "tree-anchor-minus", "tree-anchor-line");
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
 * 
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
 * @since 3.1
 * 
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
	*/
	redraw (index, true, true);
}

/**
 * Sets the checked state of the receiver.
 * <p>
 *
 * @param checked the new checked state
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setChecked (boolean checked) {
	checkWidget ();
	if ((parent.style & SWT.CHECK) == 0) return;
	/*
	int hwnd = parent.handle;
	TVITEM tvItem = new TVITEM ();
	tvItem.mask = OS.TVIF_HANDLE | OS.TVIF_STATE;
	tvItem.stateMask = OS.TVIS_STATEIMAGEMASK;
	tvItem.hItem = handle;
	OS.SendMessage (hwnd, OS.TVM_GETITEM, 0, tvItem);
	int state = tvItem.state >> 12;
	if (checked) {
		if ((state & 0x1) != 0) state++;
	} else {
		if ((state & 0x1) == 0) --state;
	}
	tvItem.state = state << 12;
	OS.SendMessage (hwnd, OS.TVM_SETITEM, 0, tvItem);
	*/
	if (checkElement != null) {
		checkElement.checked = checked;
	}
}

/**
 * Sets the expanded state of the receiver.
 * <p>
 *
 * @param expanded the new expanded state
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setExpanded (boolean expanded) {
	checkWidget ();
	/*
	/*
	* Feature in Windows.  When the user collapses the root
	* of a subtree that has the focus item, Windows moves
	* the selection to the root of the subtree and issues
	* a TVN_SELCHANGED to inform the programmer that the
	* seletion has changed.  When the programmer collapses
	* the same subtree using TVM_EXPAND, Windows does not
	* send the selection changed notification.  This is not
	* strictly wrong but is inconsistent.  The fix is to notice
	* that the selection has changed and issue the event.
	*-/
	int hwnd = parent.handle;
	int hOldItem = OS.SendMessage (hwnd, OS.TVM_GETNEXTITEM, OS.TVGN_CARET, 0);
	parent.ignoreExpand = true;
	OS.SendMessage (hwnd, OS.TVM_EXPAND, expanded ? OS.TVE_EXPAND : OS.TVE_COLLAPSE, handle);
	parent.ignoreExpand = false;
	int hNewItem = OS.SendMessage (hwnd, OS.TVM_GETNEXTITEM, OS.TVGN_CARET, 0);
	if (hNewItem != hOldItem) {
		Event event = new Event ();
		if (hNewItem != 0) {
			TVITEM tvItem = new TVITEM ();
			tvItem.mask = OS.TVIF_HANDLE | OS.TVIF_PARAM;
			tvItem.hItem = hNewItem;
			if (OS.SendMessage (hwnd, OS.TVM_GETITEM, 0, tvItem) != 0) {
				event.item = parent.items [tvItem.lParam];	
			}
			parent.hAnchor = hNewItem;
		}
		parent.sendEvent (SWT.Selection, event);
	}
	*/
	expandStatus = expanded;
//	if(getItemCount() == 0){
//		return;
//	}

	TreeItem[] items = parent.getDescendantItems(index);
	for (int i = 0; i < items.length; i++) {
		if(items[i] == null)
			continue;
		if (items[i].parentItem == this) {
			items[i].expandStatus = expandStatus;
		}
		if (items[i].expandStatus) {
			//items[i].expandStatus = !toExpand;
			items[i].handle.style.display = expanded ? "" : "none";
		} else {
			items[i].handle.style.display = "none";
		}
		//items[i].handle.style.display = toExpand ? "none" : "";
	}
	Element[] innerChildren = handle.childNodes[0] // td[class="tree-column-first"]
	                                     .childNodes[0].childNodes[0] // tree-line-wrapper
	                                                               .childNodes;
	Element hAnchor = innerChildren[innerChildren.length - 2].childNodes[1];
	if (expanded) {
		hAnchor.className = "tree-anchor-h tree-anchor-minus";
	} else {
		hAnchor.className = "tree-anchor-h tree-anchor-plus";
	}
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
	/*
	int hFont = -1;
	if (font != null) {
		parent.customDraw = true;
		hFont = font.handle;
	}
	if (this.font == hFont) return;
	this.font = hFont;
	/*
	* Bug in Windows.  When the font is changed for an item,
	* the bounds for the item are not updated, causing the text
	* to be clipped.  The fix is to reset the text, causing
	* Windows to compute the new bounds using the new font.
	*-/
	int hwnd = parent.handle;
	TVITEM tvItem = new TVITEM ();
	tvItem.mask = OS.TVIF_HANDLE | OS.TVIF_TEXT;
	tvItem.hItem = handle;
	tvItem.pszText = OS.LPSTR_TEXTCALLBACK;
	OS.SendMessage (hwnd, OS.TVM_SETITEM, 0, tvItem);
	*/
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
 * @since 3.1
 */
public void setFont (int index, Font font) {
	checkWidget ();
	if (font != null && font.isDisposed ()) {
		SWT.error (SWT.ERROR_INVALID_ARGUMENT);
	}
	int count = Math.max (1, parent.getColumnCount ());
	if (0 > index || index > count - 1) return;
	/*
	int hFont = -1;
	if (font != null) {
		parent.customDraw = true;
		hFont = font.handle;
	}
	if (cellFont == null) {
		cellFont = new int [count];
		for (int i = 0; i < count; i++) {
			cellFont [i] = -1;
		}
	}
	if (cellFont [index] == hFont) return;
	cellFont [index] = hFont;
	/*
	* Bug in Windows.  When the font is changed for an item,
	* the bounds for the item are not updated, causing the text
	* to be clipped.  The fix is to reset the text, causing
	* Windows to compute the new bounds using the new font.
	*-/
	if (index == 0) {
		int hwnd = parent.handle;
		TVITEM tvItem = new TVITEM ();
		tvItem.mask = OS.TVIF_HANDLE | OS.TVIF_TEXT;
		tvItem.hItem = handle;
		tvItem.pszText = OS.LPSTR_TEXTCALLBACK;
		OS.SendMessage (hwnd, OS.TVM_SETITEM, 0, tvItem);
	} else {
		redraw (index, true, false);
	}
	*/
}

/**
 * Sets the receiver's foreground color to the color specified
 * by the argument, or to the default system color for the item
 * if the argument is null.
 *
 * @param color the new color (or null)
 *
 * @since 2.0
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
 * 
 */
public void setForeground (Color color) {
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
 * @since 3.1
 * 
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
 * Sets the grayed state of the receiver.
 * <p>
 *
 * @param grayed the new grayed state
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setGrayed (boolean grayed) {
	checkWidget ();
	if ((parent.style & SWT.CHECK) == 0) return;
	/*
	int hwnd = parent.handle;
	TVITEM tvItem = new TVITEM ();
	tvItem.mask = OS.TVIF_HANDLE | OS.TVIF_STATE;
	tvItem.stateMask = OS.TVIS_STATEIMAGEMASK;
	tvItem.hItem = handle;
	OS.SendMessage (hwnd, OS.TVM_GETITEM, 0, tvItem);
	int state = tvItem.state >> 12;
	if (grayed) {
		if (state <= 2) state +=2;
	} else {
		if (state > 2) state -=2;
	}
	tvItem.state = state << 12;
	OS.SendMessage (hwnd, OS.TVM_SETITEM, 0, tvItem);
	*/
	if (checkElement != null) {
		checkElement.checked = grayed;
	}
}

/**
 * Sets the image for multiple columns in the tree. 
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
 * 
 * @since 3.1
 */
public void setImage (Image [] images) {
	checkWidget();
	if (images == null) error (SWT.ERROR_NULL_ARGUMENT);
	for (int i=0; i<images.length; i++) {
		setImage (i, images [i]);
	}
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
 * 
 * @since 3.1
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
	//TODO - items that are not in column zero don't need to be in the image list
	/*
	parent.imageIndex (image);
	
	if (index == 0) {
		int hwnd = parent.handle;
		TVITEM tvItem = new TVITEM ();
		tvItem.mask = OS.TVIF_HANDLE | OS.TVIF_IMAGE | OS.TVIF_SELECTEDIMAGE;
		tvItem.hItem = handle;
		tvItem.iImage = tvItem.iSelectedImage = OS.I_IMAGECALLBACK;
		/*
		* Bug in Windows.  When I_IMAGECALLBACK is used with TVM_SETITEM
		* to indicate that an image has changed, Windows does not draw
		* the new image.  The fix is to use LPSTR_TEXTCALLBACK to force
		* Windows to ask for the text, causing Windows to ask for both.
		*-/
		tvItem.mask |= OS.TVIF_TEXT;
		tvItem.pszText = OS.LPSTR_TEXTCALLBACK;
		OS.SendMessage (hwnd, OS.TVM_SETITEM, 0, tvItem);
	} else {
		redraw (index, false, true);
	}
	*/
	if (index == 0) {
		if (this.image.handle == null && this.image.url != null && this.image.url.length() != 0) {
			Element[] innerChildren = handle.childNodes[index].childNodes;
			if (index == 0) {
				innerChildren = innerChildren[0].childNodes[0].childNodes;
			}
			Element text = innerChildren[innerChildren.length - 1];
//			if (index == 0) {
//				text = text.childNodes[text.childNodes.length - 1];
//			}
			//Element text = handle.childNodes[index].childNodes[0].childNodes[0];
			//text = text.childNodes[text.childNodes.length - 1];
				
			Element[] els = text.childNodes;
			CSSStyle handleStyle = handle.style;
			if (els.length == 1 || !OS.existedCSSClass(els[els.length - 2], "tree-image-icon")) {
				Element div = document.createElement("DIV");
				div.className = "tree-image-icon image-p-4 image-n-5";
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
		OS.addCSSClass(handle.parentNode, "tree-image");
	}
}

public void setImage (Image image) {
	checkWidget ();
	setImage (0, image);
}

/**
 * Sets the text for multiple columns in the tree. 
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
 * 
 * @since 3.1
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
 * 
 * @since 3.1
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
	if (index == 0) {
		
	}
	
	Element[] innerChildren = handle.childNodes[index].childNodes;
	if (index == 0) {
		innerChildren = innerChildren[0].childNodes[0].childNodes;
	}
	Element text0 = innerChildren[innerChildren.length - 1];
	if (index == 0) {
		text0 = text0.childNodes[text0.childNodes.length - 1];
	}
	OS.clearChildren(text0);
	text0.appendChild(document.createTextNode(string));
	/*
	if (index == 0) {
		int hwnd = parent.handle;
		TVITEM tvItem = new TVITEM ();
		tvItem.mask = OS.TVIF_HANDLE | OS.TVIF_TEXT;
		tvItem.hItem = handle;
		tvItem.pszText = OS.LPSTR_TEXTCALLBACK;
		OS.SendMessage (hwnd, OS.TVM_SETITEM, 0, tvItem);
	} else {
		redraw (index, true, false);
	}
	*/
}

public void setText (String string) {
	checkWidget();
	setText (0, string);
}

void showSelection(boolean selected) {
	this.selected = selected;
	OS.updateCSSClass(handle, "tree-item-selected", selected);
	if (OS.isIE) { // IE won't update selected background! 
		Element tmpDiv = document.createElement("DIV");
		tmpDiv.style.width = "1px"; // hasLayout
		tmpDiv.style.height = "1px";
		Element tempElem = handle.childNodes[0].childNodes[0].childNodes[0];
		Element innerEl = tempElem.childNodes[tempElem.childNodes.length-1].childNodes[0];
		innerEl.style.hasLayout = true;
		innerEl.appendChild(tmpDiv);
		OS.destroyHandle(tmpDiv);
		innerEl.style.display = "inline-block";
//		handle.style.hasLayout = true;
		if((style & SWT.RIGHT_TO_LEFT) != 0){
			innerEl.style.left = "0px";
			tempElem.childNodes[tempElem.childNodes.length-1].style.left = "0px";
		}
	}
}

//	public TreeItem [] getDescendantItems () {
//		int nextSiblingItem = parent.findNextSiblingItem(this.index);
//		return nextSiblingItem;
//	}


void toggleExpandStatus() {
	Element[] innerChildren = handle.childNodes[0] // td[class="tree-column-first"]
	                                     .childNodes[0].childNodes[0] // tree-line-wrapper
	                                                               .childNodes;
	String clazzName = innerChildren[innerChildren.length - 2].childNodes[1].className;
	int type = 0;
	if (clazzName == null) {
		type = 0;
	} else if (clazzName.indexOf("minus") != -1) {
		type = -1;
	} else if (clazzName.indexOf("plus") != -1){
		type = 1;
	}
	if (type == 0) {
		return ;
	}
	boolean toExpand = type >= 0;
	setExpanded(toExpand);
	Event e = new Event();
	e.type = toExpand ? SWT.Expand : SWT.Collapse;
	//e.detail = SWT.NONE;
	e.display = display;
	e.item = this;
	e.widget = this;
	parent.sendEvent(e);
}

public void addItem(TreeItem item, int index) {
	if(index == -1 || index == items.length){
		items[items.length] = item;
	}else{
		TreeItem[] newItem = new TreeItem[0];
		System.arraycopy(items, 0, newItem, 0, index);
		System.arraycopy(items, index , newItem, index+1, items.length - index);
		newItem[index] = item;
		items = newItem;
	}
}
boolean isSelected(){
	return this.selected;
}

public void enableWidget(boolean enabled) {
	this.handle.disabled = !enabled;
	if (this.checkElement != null) {
		this.checkElement.disabled = !enabled;
	}
}

}
