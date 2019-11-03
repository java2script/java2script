/*******************************************************************************
 * Copyright (c) 2000, 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *     Zhou Renjian - initial Java2Script implementation
 *******************************************************************************/
package org.eclipse.swt.widgets;

import org.eclipse.swt.SWT;
import org.eclipse.swt.SWTException;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.graphics.Rectangle;
import org.eclipse.swt.internal.RunnableCompatibility;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.xhtml.CSSStyle;
import org.eclipse.swt.internal.xhtml.Clazz;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;

/**
 * Instances of this class implement the notebook user interface
 * metaphor.  It allows the user to select a notebook page from
 * set of pages.
 * <p>
 * The item children that may be added to instances of this class
 * must be of type <code>TabItem</code>.
 * <code>Control</code> children are created and then set into a
 * tab item using <code>TabItem#setControl</code>.
 * </p><p>
 * Note that although this class is a subclass of <code>Composite</code>,
 * it does not make sense to set a layout on it.
 * </p><p>
 * <dl>
 * <dt><b>Styles:</b></dt>
 * <dd>TOP, BOTTOM</dd>
 * <dt><b>Events:</b></dt>
 * <dd>Selection</dd>
 * </dl>
 * <p>
 * Note: Only one of the styles TOP and BOTTOM may be specified.
 * </p><p>
 * IMPORTANT: This class is <em>not</em> intended to be subclassed.
 * </p>
 * 
 * @j2sPrefix
 * $WTC$$.registerCSS ("$wt.widgets.TabFolder");
 */
public class TabFolder extends Composite {
	TabItem [] items;
	Element borderFrame, borderNW, borderNE, borderSW, borderSE, 
		itemMore, btnPrevTab, btnNextTab, contentArea;
	private int offset;
	
	ImageList imageList;
	private Object hMorePrevClick;
	/*
	static final int TabFolderProc;
	static final TCHAR TabFolderClass = new TCHAR (0, OS.WC_TABCONTROL, true);
	static final char [] TAB = new char [] {'T', 'A', 'B', 0};
	
	/*
	* These are the undocumented control id's for the children of
	* a tab control.  Since there are no constants for these values,
	* they may change with different versions of Windows.
	*-/
	static final int ID_UPDOWN = 1;
	
	static {
		WNDCLASS lpWndClass = new WNDCLASS ();
		OS.GetClassInfo (0, TabFolderClass, lpWndClass);
		TabFolderProc = lpWndClass.lpfnWndProc;
		/*
		* Feature in Windows.  The tab control window class
		* uses the CS_HREDRAW and CS_VREDRAW style bits to
		* force a full redraw of the control and all children
		* when resized.  This causes flashing.  The fix is to
		* register a new window class without these bits and
		* implement special code that damages only the exposed
		* area.
		* 
		* NOTE:  Screen readers look for the exact class name
		* of the control in order to provide the correct kind
		* of assistance.  Therefore, it is critical that the
		* new window class have the same name.  It is possible
		* to register a local window class with the same name
		* as a global class.  Since bits that affect the class
		* are being changed, it is possible that other native
		* code, other than SWT, could create a control with
		* this class name, and fail unexpectedly.
		*-/
		int hInstance = OS.GetModuleHandle (null);
		int hHeap = OS.GetProcessHeap ();
		lpWndClass.hInstance = hInstance;
		lpWndClass.style &= ~(OS.CS_HREDRAW | OS.CS_VREDRAW | OS.CS_GLOBALCLASS);
		int byteCount = TabFolderClass.length () * TCHAR.sizeof;
		int lpszClassName = OS.HeapAlloc (hHeap, OS.HEAP_ZERO_MEMORY, byteCount);
		OS.MoveMemory (lpszClassName, TabFolderClass, byteCount);
		lpWndClass.lpszClassName = lpszClassName;
		OS.RegisterClass (lpWndClass);
//		OS.HeapFree (hHeap, 0, lpszClassName);	
	}
	*/
	private Object hMoreNextClick;

/**
 * Constructs a new instance of this class given its parent
 * and a style value describing its behavior and appearance.
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
 * 
 * @j2sIgnore
 */
public TabFolder (Composite parent, int style) {
	super (parent, checkStyle (style));
}

/**
 * Adds the listener to the collection of listeners who will
 * be notified when the receiver's selection changes, by sending
 * it one of the messages defined in the <code>SelectionListener</code>
 * interface.
 * <p>
 * When <code>widgetSelected</code> is called, the item field of the event object is valid.
 * <code>widgetDefaultSelected</code> is not called.
 * </p>
 *
 * @param listener the listener which should be notified
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the listener is null</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 *
 * @see SelectionListener
 * @see #removeSelectionListener
 * @see SelectionEvent
 */
public void addSelectionListener(SelectionListener listener) {
	checkWidget ();
	if (listener == null) error (SWT.ERROR_NULL_ARGUMENT);
	TypedListener typedListener = new TypedListener(listener);
	addListener(SWT.Selection,typedListener);
	addListener(SWT.DefaultSelection,typedListener);
}

/*
int callWindowProc (int hwnd, int msg, int wParam, int lParam) {
	if (handle == 0) return 0;
	return OS.CallWindowProc (TabFolderProc, hwnd, msg, wParam, lParam);
}
*/

static int checkStyle (int style) {
	style = checkBits (style, SWT.TOP, SWT.BOTTOM, 0, 0, 0, 0);
	
	/* Force tabs to be on the bottom for tab folders on PPC */
	/*
	if (OS.IsPPC) {
		style |= SWT.BOTTOM;
		style &= ~SWT.TOP;
	}
	*/
	
	/*
	* Even though it is legal to create this widget
	* with scroll bars, they serve no useful purpose
	* because they do not automatically scroll the
	* widget's client area.  The fix is to clear
	* the SWT style.
	*/
	return style & ~(SWT.H_SCROLL | SWT.V_SCROLL);
}

protected void checkSubclass () {
	if (!isValidSubclass ()) error (SWT.ERROR_INVALID_SUBCLASS);
}

public Point computeSize (int wHint, int hHint, boolean changed) {
	checkWidget ();
	Point size = super.computeSize (wHint, hHint, changed);
	int width = 12;
	int height = 0;
	if (items != null && items.length != 0) {
//		int height = OS.getContainerHeight(items[0].handle);
//		size.y += height;
		for (int i = 0; i < items.length; i++) {
			if (items[i] != null && !items[i].isDisposed()) {
				int containerWidth = OS.getContainerWidth(items[i].handle);
				if (containerWidth == OS.getFixedBodyClientWidth()/*document.body.clientWidth*/) {
					if (items[i].image != null) {
						containerWidth = 18;
					} else {
						containerWidth = 0;
					}
					containerWidth += 6 + OS.getStringStyledWidth(items[i].text, "tab-folder-default", null);
				}
				width += containerWidth;
				if (items[i].control != null) {
					Point s = items[i].control.computeSize(wHint, hHint);
					height = Math.max(height, s.y);
				}
			}
		}
	}
	/*
	RECT insetRect = new RECT (), itemRect = new RECT ();
	OS.SendMessage (handle, OS.TCM_ADJUSTRECT, 0, insetRect);
	int width = insetRect.left - insetRect.right;
	int count = OS.SendMessage (handle, OS.TCM_GETITEMCOUNT, 0, 0);
	if (count != 0) {
		OS.SendMessage (handle, OS.TCM_GETITEMRECT, count - 1, itemRect);
		width = Math.max (width, itemRect.right - insetRect.right);
	}
	RECT rect = new RECT ();
	OS.SetRect (rect, 0, 0, width, size.y);
	OS.SendMessage (handle, OS.TCM_ADJUSTRECT, 1, rect);
	*/
	int border = getBorderWidth ();
//	rect.left -= border;  rect.right += border;
//	width = rect.right - rect.left;
	width += border * 2;
	size.x = Math.max (width, size.x);
	size.y = Math.max (height, size.y);
	
//	size.x += items.length * 32;
//	size.y += 24;
	return size;
}

public Rectangle computeTrim (int x, int y, int width, int height) {
	checkWidget ();
	/*
	RECT rect = new RECT ();
	OS.SetRect (rect, x, y, x + width, y + height);
	OS.SendMessage (handle, OS.TCM_ADJUSTRECT, 1, rect);
	int border = getBorderWidth ();
	rect.left -= border;  rect.right += border;
	rect.top -= border;  rect.bottom += border;
	int newWidth = rect.right - rect.left;
	int newHeight = rect.bottom - rect.top;
	return new Rectangle (rect.left, rect.top, newWidth, newHeight);
	*/
	int lineHeight = 0;
	if (items != null && items.length > 0) {
		lineHeight = Math.max(OS.getContainerHeight(items[offset].handle), 20);
		if (getSelectionIndex() == offset) {
			lineHeight -= 2; // padding-top:2px
		}
		if (OS.isIE) {
			lineHeight++; // ...
		} else {
			// Mozilla
			if ((style & SWT.BOTTOM) != 0) {
				lineHeight--;
			}
		}
		x -= 4;
		y -= 4 + lineHeight;
	}
	width += 8;
	height += 8 + lineHeight;
	int border = getBorderWidth ();
	x -= border;
	y -= border;
	width += border * 2;
	height += border * 2;
	return new Rectangle(x, y, width, height);
}

/* (non-Javadoc)
 * @see org.eclipse.swt.widgets.Composite#containerHandle()
 */
protected Element containerHandle() {
	return contentArea;
}

Object createCSSElement(Object parent, String css) {
	Element el = document.createElement("DIV");
	if (css != null) {
		el.className = css;
	}
	if (parent != null) {
		((Element) parent).appendChild(el);
	}
	return el;
}

void createItem (TabItem item, final int index) {
	/*
	int count = OS.SendMessage (handle, OS.TCM_GETITEMCOUNT, 0, 0);
	if (!(0 <= index && index <= count)) error (SWT.ERROR_INVALID_RANGE);
	if (count == items.length) {
		TabItem [] newItems = new TabItem [items.length + 4];
		System.arraycopy (items, 0, newItems, 0, items.length);
		items = newItems;
	}
	TCITEM tcItem = new TCITEM ();
	if (OS.SendMessage (handle, OS.TCM_INSERTITEM, index, tcItem) == -1) {
		error (SWT.ERROR_ITEM_NOT_ADDED);
	}
	System.arraycopy (items, index, items, index + 1, count - index);
	*/
	int count = items.length;
//		if (handle != null) {
//			handle.add (null);//new org.eclipse.swt.internal.xhtml.Options(string, string));
//		}
	Element tab = document.createElement("DIV");
	tab.className = "tab-item-default";
	//titles.appendChild(tab);
	borderFrame.insertBefore(tab, itemMore);
	OS.removeCSSClass(borderFrame, "tab-folder-no-tab");
	item.textEl = document.createElement("SPAN");
	tab.appendChild(item.textEl);
	item.textEl.appendChild(document.createTextNode(item.getNameText()));
	int width = -2;
	if (items != null && items.length != 0) {
		for (int i = 0; i < index; i++) {
			if (items[i] != null && !items[i].isDisposed()) {
				width += OS.getContainerWidth(items[i].handle);
			}
		}
	}
	if (width < 2) {
		width = 2;
	}
	tab.style.left = width + "px";
	items[index] = item;
	items[index].handle = tab;
//	Clazz.addEvent(tab, "click", new RunnableCompatibility() {
//		public void run() {
//			setSelection(index);
//			//sendEvent(SWT.Selection);
//		}
//	});
	/*
	* Send a selection event when the item that is added becomes
	* the new selection.  This only happens when the first item
	* is added.
	*/
	if (count == 0) {
//		tab.className += " tab-item-selected";
//		tab.style.left = (width - 1) + "px";
		setSelection(0, false);
		Event event = new Event ();
		event.item = items [0];
		sendEvent (SWT.Selection, event);
		// the widget could be destroyed at this point
	}
	
	OS.setTextSelection(tab, false);
}

protected void createHandle () {
	children = new Control[0];
	/*
	super.createHandle ();
	
	/* Enable the flat look for tab folders on PPC *-/
	if (OS.IsPPC) {
		OS.SendMessage (handle, OS.CCM_SETVERSION, 0x020c /*COMCTL32_VERSION*-/, 0);
	}

	state &= ~CANVAS;
	/*
	* Feature in Windows.  Despite the fact that the
	* tool tip text contains \r\n, the tooltip will
	* not honour the new line unless TTM_SETMAXTIPWIDTH
	* is set.  The fix is to set TTM_SETMAXTIPWIDTH to
	* a large value.
	*-/
	int hwndToolTip = OS.SendMessage (handle, OS.TCM_GETTOOLTIPS, 0, 0);
	OS.SendMessage (hwndToolTip, OS.TTM_SETMAXTIPWIDTH, 0, 0x7FFF);	
	*/
	items = new TabItem [0];//new TabItem [4];
	String cssName = "tab-folder-default";
	if ((style & SWT.BORDER) != 0) {
		cssName += " tab-folder-border-default";
	}
	handle = (Element) createCSSElement(parent.containerHandle(), cssName);
	cssName = "tab-folder-no-tab";
	if ((style & SWT.BOTTOM) != 0) {
		cssName += " tab-folder-bottom";
	}
	borderFrame = (Element) createCSSElement(handle, cssName);
	cssName = "tab-folder-border ";
	itemMore = (Element) createCSSElement(borderFrame, "tab-item-more");
	if (OS.isMozilla && !OS.isFirefox) {
		itemMore.style.bottom = "6px";
	}
	Element el = (Element) createCSSElement(itemMore, "tab-item-button");
	btnNextTab = document.createElement("BUTTON");
	el.appendChild(btnNextTab);
	Element arrowRight = (Element) createCSSElement(btnNextTab, "button-arrow-right");
	if (((OS.isSafari && OS.isChrome) || OS.isMozilla) && !OS.isFirefox) {
		arrowRight.style.left = "-5px";
		arrowRight.style.top = "0";
	} else if (OS.isIE) {
		arrowRight.style.top = "0";
	} else if (OS.isSafari) {
		arrowRight.style.left = "-1px";
		arrowRight.style.top = "1px";
	} else if (OS.isOpera) {
		arrowRight.style.left = "-4px";
		arrowRight.style.top = "0";
	}
	
	hMoreNextClick = new RunnableCompatibility() {
		public void run() {
			if (offset + 1 >= items.length) return ;
			int w = 0;
			int ww = OS.getContainerWidth(items[offset].handle);
			int width = getSize().x - 36;
			for (int i = offset + 1; i < items.length; i++) {
				int x = OS.getContainerWidth(items[i].handle);
				w += x;
				ww += x;
				if (w > width) {
					if (i < items.length - 1) {
						offset++;
						setSelection(getSelectionIndex(), false);
						return ;
					}
				}
			}
			if (ww > width) {
				offset++;
				setSelection(getSelectionIndex(), false);
				return ;
			}
		}
	};
	Clazz.addEvent(el, "click", hMoreNextClick);
	Clazz.addEvent(btnNextTab, "click", hMoreNextClick);
	
	el = (Element) createCSSElement(itemMore, "tab-item-button");
	btnPrevTab = document.createElement("BUTTON");
	el.appendChild(btnPrevTab);
	//createCSSElement(btnPrevTab, "button-arrow-left");
	Element arrowLeft = (Element) createCSSElement(btnPrevTab, "button-arrow-left");
	if (((OS.isSafari && OS.isChrome) || OS.isMozilla) && !OS.isFirefox) {
		arrowLeft.style.left = "-6px";
		arrowLeft.style.top = "0";
	} else if (OS.isIE) {
		arrowLeft.style.top = "0";
	} else if (OS.isSafari) {
		arrowLeft.style.left = "-3px";
		arrowLeft.style.top = "1px";
	} else if (OS.isOpera) {
		arrowLeft.style.left = "-4px";
		arrowLeft.style.top = "0";
	}
	hMorePrevClick = new RunnableCompatibility() {
		public void run() {
			if (offset <= 0) return ;
			offset--;
			setSelection(getSelectionIndex(), false);
		}
	};
	Clazz.addEvent(el, "click", hMorePrevClick);
	Clazz.addEvent(btnPrevTab, "click", hMorePrevClick);
	
	borderNW = (Element) createCSSElement(borderFrame, cssName + "tab-folder-border-nw");
	borderNE = (Element) createCSSElement(borderFrame, cssName + "tab-folder-border-ne");
	borderSW = (Element) createCSSElement(borderFrame, cssName + "tab-folder-border-sw");
	borderSE = (Element) createCSSElement(borderFrame, cssName + "tab-folder-border-se");
	contentArea = (Element) createCSSElement(handle, "tab-folder-content-area");
	
	state &= ~CANVAS;
}

protected void createWidget () {
	super.createWidget ();
	//items = new TabItem [4];
}

void destroyItem (TabItem item) {
	/*
	int count = OS.SendMessage (handle, OS.TCM_GETITEMCOUNT, 0, 0);
	int index = 0;
	while (index < count) {
		if (items [index] == item) break;
		index++;
	}
	if (index == count) return;
	int selectionIndex = OS.SendMessage (handle, OS.TCM_GETCURSEL, 0, 0);
	if (OS.SendMessage (handle, OS.TCM_DELETEITEM, index, 0) == 0) {
		error (SWT.ERROR_ITEM_NOT_REMOVED);
	}
	System.arraycopy (items, index + 1, items, index, --count - index);
	items [count] = null;
	if (count == 0) {
		if (imageList != null) {
			OS.SendMessage (handle, OS.TCM_SETIMAGELIST, 0, 0);
			display.releaseImageList (imageList);
		}
		imageList = null;
		items = new TabItem [4];
	}
	if (count > 0 && index == selectionIndex) {
		setSelection (Math.max (0, selectionIndex - 1), true);
	}
	*/
}

/*
void drawThemeBackground (int hDC, RECT rect) {
	int hTheme = OS.OpenThemeData (handle, TAB);
	OS.DrawThemeBackground (hTheme, hDC, OS.TABP_BODY, 0, rect, null);
	OS.CloseThemeData (hTheme);	
}
*/

Control findThemeControl () {
	// TEMPORARY CODE
	return null;
	//return background == -1 ? this : null;	
}

public void setBounds(int x, int y, int width, int height) {
//	outerArea.style.left = x + "px";
//	outerArea.style.top = y + "px";
//	if (width != 0) {
//		if ((style & SWT.BORDER) != 0) {//handle.className != null && handle.className.indexOf("border") != -1) {
//			width = Math.max(0, width - 6);
//		}
//		outerArea.style.width = width + "px";
//	}
//	if (height != 0) {
//		if ((style & SWT.BORDER) != 0) {//handle.className != null && handle.className.indexOf("border") != -1) {
//			height = Math.max(0, height - 6);
//		}
//		outerArea.style.height = height + "px";
//	}
	
	super.setBounds(x, y, width, height);
//	int selectedIndex = getSelectionIndex();
//	if(selectedIndex != -1 ){
//		
//		Control control = items[selectedIndex].control;
//		if(control != null)
//		if(control != null && control.isDisposed()){
//			control.setBounds(getClientArea());
//		}
//	}
//	int idx = getSelectionIndex();
//	items[idx].fixControlBounds();
}

public void setSize(int width, int height) {
//	outerArea.style.width = width + "px";
//	outerArea.style.height = (height - 24) + "px";
	super.setSize(width, height);
//	int idx = getSelectionIndex();
//	items[idx].fixControlBounds();
}

/* (non-Javadoc)
 * @see org.eclipse.swt.widgets.Composite#SetWindowPos(java.lang.Object, java.lang.Object, int, int, int, int, int)
 */
protected boolean SetWindowPos(Object hWnd, Object hWndInsertAfter, int X, int Y, int cx, int cy, int uFlags) {
	int selectionIndex = getSelectionIndex();
	if (selectionIndex != -1) {
		Control ctrl = items[selectionIndex].control;
		if (ctrl != null)
			ctrl.setBounds(getClientArea());
		setSelection(selectionIndex, false);
		/*
		 * Need to make sure < > button should be shown or not
		 */
		int ww = 0;
		if(handle.style.width.length() > 0){			
			ww = Integer.parseInt(handle.style.width);
		}
		if (ww == 0) {
			updateSelectionWithWidth(selectionIndex, cx);
		}
	}
	return super.SetWindowPos(hWnd, hWndInsertAfter, X, Y, cx, cy, uFlags);
}

///* (non-Javadoc)
// * @see org.eclipse.swt.widgets.Control#showWidget(boolean)
// */
//void showWidget(boolean visible) {
//	items[getSelectionIndex()].handle.style.visibility = visible ? "visible" : "hidden";
//	super.showWidget(visible);
//}

public Rectangle getClientArea () {
	checkWidget ();
	forceResize ();
	/*
	RECT rect = new RECT ();
	OS.GetClientRect (handle, rect);
	OS.SendMessage (handle, OS.TCM_ADJUSTRECT, 0, rect);
	int width = rect.right - rect.left;
	int height = rect.bottom - rect.top;
	return new Rectangle (rect.left, rect.top, width, height);
	*/
//	return super.getClientArea();
	int x = 4, y = 4;
	int h = height - 8, w = width - 8;
	if (items != null && items.length != 0) {
		int lineHeight = OS.getContainerHeight(items[offset].handle);
		if (OS.isIE) lineHeight++; // ...
		if (getSelectionIndex() == offset) {
			lineHeight -= 2; // padding-top:2px
		}
		h -= lineHeight;
		if ((style & SWT.BOTTOM) == 0) {
			y += lineHeight;
		} else {
			if (OS.isIE) h--; 
		}
	}
	
	int border = getBorderWidth ();
	x += border;
	y += border;
	w -= border * 2;
	h -= border * 2;
	return new Rectangle(x, y, w, h);
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
 */
public TabItem getItem (int index) {
	checkWidget ();
//	int count = OS.SendMessage (handle, OS.TCM_GETITEMCOUNT, 0, 0);
//	if (!(0 <= index && index < count)) error (SWT.ERROR_INVALID_RANGE);
	return items [index];
}

/**
 * Returns the number of items contained in the receiver.
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
//	return OS.SendMessage (handle, OS.TCM_GETITEMCOUNT, 0, 0);
	return items.length;
}

/**
 * Returns an array of <code>TabItem</code>s which are the items
 * in the receiver. 
 * <p>
 * Note: This is not the actual structure used by the receiver
 * to maintain its list of items, so modifying the array will
 * not affect the receiver. 
 * </p>
 *
 * @return the items in the receiver
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public TabItem [] getItems () {
	checkWidget ();
//	int count = OS.SendMessage (handle, OS.TCM_GETITEMCOUNT, 0, 0);
	int count = getItemCount();
	TabItem [] result = new TabItem [count];
	System.arraycopy (items, 0, result, 0, count);
	return result;
}

/**
 * Returns an array of <code>TabItem</code>s that are currently
 * selected in the receiver. An empty array indicates that no
 * items are selected.
 * <p>
 * Note: This is not the actual structure used by the receiver
 * to maintain its selection, so modifying the array will
 * not affect the receiver. 
 * </p>
 * @return an array representing the selection
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public TabItem [] getSelection () {
	checkWidget ();
//	int index = OS.SendMessage (handle, OS.TCM_GETCURSEL, 0, 0);
	int index = getSelectionIndex();
	if (index == -1) return new TabItem [0];
	return new TabItem [] {items [index]};
}

/**
 * Returns the zero-relative index of the item which is currently
 * selected in the receiver, or -1 if no item is selected.
 *
 * @return the index of the selected item
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public int getSelectionIndex () {
	checkWidget ();
	//return OS.SendMessage (handle, OS.TCM_GETCURSEL, 0, 0);
	for (int i = 0; i < items.length; i++) {
		if (items[i] != null && items[i].handle != null
				 && items[i].handle.className != null 
				 && items[i].handle.className.indexOf("selected") != -1) {
			return i;
		}
	}
	/*
	 * should return -1 instead of 0
	 */
	return -1;
	//return handle.selectedIndex;
}



/*
int imageIndex (Image image) {
	if (image == null) return OS.I_IMAGENONE;
	if (imageList == null) {
		Rectangle bounds = image.getBounds ();
		imageList = display.getImageList (style & SWT.RIGHT_TO_LEFT, bounds.width, bounds.height);
		int hImageList = imageList.getHandle ();
		OS.SendMessage (handle, OS.TCM_SETIMAGELIST, 0, hImageList);
	}
	int index = imageList.indexOf (image);
	if (index == -1) {
		index = imageList.add (image);
	} else {
		imageList.put (index, image);
	}
	return index;
}
*/

void hookSelection() {
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
 *    <li>ERROR_NULL_ARGUMENT - if the string is null</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public int indexOf (TabItem item) {
	checkWidget ();
	if (item == null) error (SWT.ERROR_NULL_ARGUMENT);
	//int count = OS.SendMessage (handle, OS.TCM_GETITEMCOUNT, 0, 0);
	int count = getItemCount();
	for (int i=0; i<count; i++) {
		if (items [i] == item) return i;
	}
	return -1;
}

Point minimumSize (int wHint, int hHint, boolean flushCache) {
	Control [] children = _getChildren ();
	int width = 0, height = 0;
	for (int i=0; i<children.length; i++) {
		Control child = children [i];
		int index = 0;	
		//int count = OS.SendMessage (handle, OS.TCM_GETITEMCOUNT, 0, 0);
		int count = getItemCount();
		while (index < count) {
			if (items [index].control == child) break;
			index++;
		}
		if (index == count) {
			Rectangle rect = child.getBounds ();
			width = Math.max (width, rect.x + rect.width);
			height = Math.max (height, rect.y + rect.height);
		} else {
			Point size = child.computeSize (wHint, hHint, flushCache);
			width = Math.max (width, size.x);
			height = Math.max (height, size.y);
		}
	}
	return new Point (width, height);
}

boolean mnemonicHit (char key) {
	int selection = getSelectionIndex ();
	for (int i=0; i<items.length; i++) {
		if (i != selection) {
			TabItem item = items [i];
			if (item != null) {
				char ch = findMnemonic (item.getText ());
				if (Character.toUpperCase (key) == Character.toUpperCase (ch)) {		
					if (setFocus ()) {
						setSelection (i, true);
						return true;
					}
				}
			}
		}
	}
	return false;
}

boolean mnemonicMatch (char key) {
	for (int i=0; i<items.length; i++) {
		TabItem item = items [i];
		if (item != null) {
			char ch = findMnemonic (item.getText ());
			if (Character.toUpperCase (key) == Character.toUpperCase (ch)) {		
				return true;
			}
		}
	}
	return false;
}

/* (non-Javadoc)
 * @see org.eclipse.swt.widgets.Scrollable#releaseHandle()
 */
protected void releaseHandle() {
	if (borderNW != null) {
		OS.destroyHandle(borderNW);
		borderNW = null;
	}
	if (borderNE != null) {
		OS.destroyHandle(borderNE);
		borderNE = null;
	}
	if (borderSW != null) {
		OS.destroyHandle(borderSW);
		borderSW = null;
	}
	if (borderSE != null) {
		OS.destroyHandle(borderSE);
		borderSE = null;
	}
	if (btnPrevTab != null) {
		if (hMorePrevClick != null) {
			Clazz.removeEvent(btnPrevTab, "click", hMorePrevClick);
			Clazz.removeEvent(btnPrevTab.parentNode, "click", hMorePrevClick);
			hMorePrevClick = null;
		}
		OS.destroyHandle(btnPrevTab.parentNode);
		OS.destroyHandle(btnPrevTab);
		btnPrevTab = null;
	}
	if (btnNextTab != null) {
		if (hMoreNextClick != null) {
			Clazz.removeEvent(btnNextTab, "click", hMoreNextClick);
			Clazz.removeEvent(btnNextTab.parentNode, "click", hMoreNextClick);
			hMoreNextClick = null;
		}
		OS.destroyHandle(btnNextTab.parentNode);
		OS.destroyHandle(btnNextTab);
		btnNextTab = null;
	}
	if (itemMore != null) {
		OS.destroyHandle(itemMore);
		itemMore = null;
	}
	if (borderFrame != null) {
		OS.destroyHandle(borderFrame);
		borderFrame = null;
	}
	if (contentArea != null) {
		OS.destroyHandle(contentArea);
		contentArea = null;
	}
	super.releaseHandle();
}
protected void releaseWidget () {
	//int count = OS.SendMessage (handle, OS.TCM_GETITEMCOUNT, 0, 0);
	int count = getItemCount();
	for (int i=0; i<count; i++) {
		TabItem item = items [i];
		if (!item.isDisposed ()) item.releaseResources ();
	}
	items = null;
	if (imageList != null) {
		//OS.SendMessage (handle, OS.TCM_SETIMAGELIST, 0, 0);
		display.releaseImageList (imageList);
	}
	imageList = null;
	super.releaseWidget ();
}

protected void removeControl (Control control) {
	super.removeControl (control);
	//int count = OS.SendMessage (handle, OS.TCM_GETITEMCOUNT, 0, 0);
	int count = getItemCount();
	for (int i=0; i<count; i++) {
		TabItem item = items [i];
		if (item.control == control) item.setControl (null);
	}
}
/**
 * Removes the listener from the collection of listeners who will
 * be notified when the receiver's selection changes.
 *
 * @param listener the listener which should no longer be notified
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the listener is null</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 *
 * @see SelectionListener
 * @see #addSelectionListener
 */
public void removeSelectionListener (SelectionListener listener) {
	checkWidget ();
	if (listener == null) error (SWT.ERROR_NULL_ARGUMENT);
	if (eventTable == null) return;
	eventTable.unhook (SWT.Selection, listener);
	eventTable.unhook (SWT.DefaultSelection,listener);	
}

/**
 * Sets the receiver's selection to be the given array of items.
 * The current selected is first cleared, then the new items are
 * selected.
 *
 * @param items the array of items
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the items array is null</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setSelection (TabItem [] items) {
	checkWidget ();
	if (items == null) error (SWT.ERROR_NULL_ARGUMENT);
	if (items.length == 0) {
		setSelection (-1, false);
	} else {
		for (int i=items.length-1; i>=0; --i) {
			int index = indexOf (items [i]);
			if (index != -1) setSelection (index, false);
		}
	}
}

/**
 * Selects the item at the given zero-relative index in the receiver. 
 * If the item at the index was already selected, it remains selected.
 * The current selection is first cleared, then the new items are
 * selected. Indices that are out of range are ignored.
 *
 * @param index the index of the item to select
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setSelection (int index) {
	checkWidget ();
	//int count = OS.SendMessage (handle, OS.TCM_GETITEMCOUNT, 0, 0);
	int count = getItemCount();
	if (!(0 <= index && index < count)) return;
	setSelection (index, false);
}

void setSelection (int index, boolean notify) {
	/**
	 * TODO: When a tab is selected programmly, should move
	 * the tab into visible tab area.
	 */
//	int oldIndex = OS.SendMessage (handle, OS.TCM_GETCURSEL, 0, 0);
	int oldIndex = getSelectionIndex();
	
	if (oldIndex != -1 && oldIndex != index) {
		TabItem item = items [oldIndex];
		Control control = item.control;
		if (control != null && !control.isDisposed ()) {
			control.setVisible (false);
			//control.handle.style.display = "none";
		}
	}
//	OS.SendMessage (handle, OS.TCM_SETCURSEL, index, 0);
	updateSelection(index);
//	int newIndex = OS.SendMessage (handle, OS.TCM_GETCURSEL, 0, 0);
	int newIndex = index;
	if (oldIndex == index) {
		newIndex = -1;
	}
	if (newIndex != -1) {
		TabItem item = items [newIndex];
		Control control = item.control;
		if (control != null && !control.isDisposed ()) {
			/*
			 * When the TabFolder has not yet layouted, getClientArea 
			 * will not get the right client area!
			 * later layout should relayout the control.
			 */
			control.setBounds (getClientArea ());
			control.setVisible (true);
			//control.handle.style.display = "block";
		}
		if (notify) {
			Event event = new Event ();
			event.item = item;
			sendEvent (SWT.Selection, event);
		}
	}
}
protected void _updateOrientation(){
	/*
	 * Force left to right
	 */
	if((style & SWT.RIGHT_TO_LEFT) != 0){
		handle.style.direction = "ltr";
	} else if (parent != null 
			&& (parent.style & SWT.RIGHT_TO_LEFT) != 0) {
		handle.style.direction = "ltr";
	}
}

void updateSelection(int index) {
	updateSelectionWithWidth(index, -1);
}
void updateSelectionWithWidth(int index, int prefWidth) {
	String key = "tab-item-selected";
	for (int i = 0; i < offset; i++) {
		if(i != index && items[i].control != null){
			items[i].control.setVisible(false);
		}
		//items[i].handle.style.display = "none";
		if (index >= offset) {
			OS.removeCSSClass(items[i].handle, key);
		}
	}
	if (items[index] != null) {
//		boolean before = false;
		int left = -2;
		int x = 2;
		for (int i = offset; i < items.length; i++) {
			//items[i].handle.style.display = "block";
			if (items[i].handle.style.zIndex == -1) {
				items[i].handle.style.display = "";
			}
			items[i].handle.style.zIndex = i + 1;
			OS.removeCSSClass(items[i].handle, key);
			int w = OS.getContainerWidth(items[i].handle);
			if (i < index) {
				left += w;
			}
			CSSStyle s = items[i].handle.style;
			if (i == index) {
				x -= 2;
			}
			s.left = x + "px";
			x += w;
		}
		int ww = 0;
		if(handle.style.width.length() > 0){			
			ww = Integer.parseInt(handle.style.width);
		}
		if (prefWidth != -1 && ww == 0) {
			ww = prefWidth;
		}
		if (ww > 0) {
			OS.updateCSSClass(borderFrame, "tab-show-more-item", x > ww || offset != 0);
		}
		OS.addCSSClass(items[index].handle, key);
		items[index].handle.style.zIndex = (index >= offset) ? items.length + 1 : -1;
		if (index < offset) {
			items[index].handle.style.display = "none";
		} else {
			items[index].handle.style.display = "";
		}
		if (this.width != 0) {
			int w = OS.getContainerWidth(items[index].handle);
			left += 4;
//			if (before) {
//			} else {
//				left += 2;
//			}
			int y = (this.width - left - ((style & SWT.BORDER) != 0 ? 4 : 0));
			if (index >= offset) {
				y -= w;
			}
			if (y < 0) {
				y = 0;
			}
			if (left < 2) {
				left = 2;
			}
			if ((style & SWT.BOTTOM) != 0) {
				borderSW.style.width = (left - 2) + "px";
				borderSE.style.width = y + "px";
			} else {
				borderNW.style.width = (left - 2) + "px";
				borderNE.style.width = y + "px";
			}
		}
	}
}
/*
String toolTipText (NMTTDISPINFO hdr) {
	if ((hdr.uFlags & OS.TTF_IDISHWND) != 0) {
		return null;
	}
	int index = hdr.idFrom;
	int hwndToolTip = OS.SendMessage (handle, OS.TCM_GETTOOLTIPS, 0, 0);
	if (hwndToolTip == hdr.hwndFrom) {
		if (toolTipText != null) return "";
		if (0 <= index && index < items.length) {
			TabItem item = items [index];
			if (item != null) return item.toolTipText;
		}
	}
	return super.toolTipText (hdr);
}
*/

boolean traversePage (boolean next) {
	int count = getItemCount ();
	if (count <= 1) return false;
	int index = getSelectionIndex ();
	if (index == -1) {
		index = 0;
	} else {
		int offset = (next) ? 1 : -1;
		index = (index + offset + count) % count;
	}
	setSelection (index, true);
	return index == getSelectionIndex ();
}

/*
int widgetStyle () {
	/*
	* Bug in Windows.  Under certain circumstances,
	* when TCM_SETITEM is used to change the text
	* in a tab item, the tab folder draws on top
	* of the client area.  The fix is ensure that
	* this cannot happen by setting WS_CLIPCHILDREN.
	*-/
	int bits = super.widgetStyle () | OS.WS_CLIPCHILDREN;
	if ((style & SWT.NO_FOCUS) != 0) bits |= OS.TCS_FOCUSNEVER;
	if ((style & SWT.BOTTOM) != 0) bits |= OS.TCS_BOTTOM;
	return bits | OS.TCS_TABS | OS.TCS_TOOLTIPS;
}

TCHAR windowClass () {
	return TabFolderClass;
}

int windowProc () {
	return TabFolderProc;
}

LRESULT WM_GETDLGCODE (int wParam, int lParam) {
	LRESULT result = super.WM_GETDLGCODE (wParam, lParam);
	/*
	* Return DLGC_BUTTON so that mnemonics will be
	* processed without needing to press the ALT key
	* when the widget has focus.
	*-/
	if (result != null) return result;
	return new LRESULT (OS.DLGC_BUTTON);
}

LRESULT WM_NCHITTEST (int wParam, int lParam) {
	LRESULT result = super.WM_NCHITTEST (wParam, lParam);
	if (result != null) return result;
	/*
	* Feature in Windows.  The tab control implements
	* WM_NCHITTEST to return HTCLIENT when the cursor
	* is inside the tab buttons.  This causes mouse
	* events like WM_MOUSEMOVE to be delivered to the
	* parent.  Also, tool tips for the tab control are
	* never invoked because tool tips rely on mouse
	* events to be delivered to the window that wants
	* to display the tool tip.  The fix is to call the
	* default window proc that returns HTCLIENT when
	* the mouse is in the client area.	
	*-/
	int hittest = OS.DefWindowProc (handle, OS.WM_NCHITTEST, wParam, lParam);
	return new LRESULT (hittest);
}

LRESULT WM_NOTIFY (int wParam, int lParam) {
	/*
	* Feature in Windows.  When the tab folder window
	* proc processes WM_NOTIFY, it forwards this
	* message to its parent.  This is done so that
	* children of this control that send this message 
	* type to their parent will notify not only
	* this control but also the parent of this control,
	* which is typically the application window and
	* the window that is looking for the message.
	* If the control did not forward the message, 
	* applications would have to subclass the control 
	* window to see the message. Because the control
	* window is subclassed by SWT, the message
	* is delivered twice, once by SWT and once when
	* the message is forwarded by the window proc.
	* The fix is to avoid calling the window proc 
	* for this control.
	*-/
	LRESULT result = super.WM_NOTIFY (wParam, lParam);
	if (result != null) return result;
	return LRESULT.ZERO;
}

LRESULT WM_PARENTNOTIFY (int wParam, int lParam) {
	LRESULT result = super.WM_PARENTNOTIFY (wParam, lParam);
	if (result != null) return result;
	/*
	* Feature in Windows.  Windows does not explicitly set the orientation of
	* the buddy control.  Instead, the orientation is inherited when WS_EX_LAYOUTRTL
	* is specified for the tab folder.  This means that when both WS_EX_LAYOUTRTL
	* and WS_EX_NOINHERITLAYOUT are specified for the tab folder, the buddy control
	* will not be oriented correctly.  The fix is to explicitly set the orientation
	* for the buddy control.
	* 
	* NOTE: WS_EX_LAYOUTRTL is not supported on Windows NT.
	*-/
	if (OS.WIN32_VERSION < OS.VERSION (4, 10)) return result;
	if ((style & SWT.RIGHT_TO_LEFT) != 0) {
		int code = wParam & 0xFFFF;
		switch (code) {
			case OS.WM_CREATE: {
				int id = (wParam >> 16), hwnd = lParam;
				if (id == ID_UPDOWN) {
					int bits = OS.GetWindowLong (hwnd, OS.GWL_EXSTYLE);
					OS.SetWindowLong (hwnd, OS.GWL_EXSTYLE,	bits | OS.WS_EX_LAYOUTRTL);
				}
				break;
			}
		}
	}
	return result;
}

LRESULT WM_SIZE (int wParam, int lParam) {
	LRESULT result = super.WM_SIZE (wParam, lParam);
	/*
	* It is possible (but unlikely), that application
	* code could have disposed the widget in the resize
	* event.  If this happens, end the processing of the
	* Windows message by returning the result of the
	* WM_SIZE message.
	*-/
	if (isDisposed ()) return result;
	int index = OS.SendMessage (handle, OS.TCM_GETCURSEL, 0, 0);
	if (index != -1) {
		TabItem item = items [index];
		Control control = item.control;
		if (control != null && !control.isDisposed ()) {
			control.setBounds (getClientArea ());
		}
	}
	return result;
}

LRESULT WM_WINDOWPOSCHANGING (int wParam, int lParam) {
	LRESULT result = super.WM_WINDOWPOSCHANGING (wParam, lParam);
	if (result != null) return result;
	if (!OS.IsWindowVisible (handle)) return result;
	WINDOWPOS lpwp = new WINDOWPOS ();
	OS.MoveMemory (lpwp, lParam, WINDOWPOS.sizeof);
	if ((lpwp.flags & (OS.SWP_NOSIZE | OS.SWP_NOREDRAW)) != 0) {
		return result;
	}
	// TEMPORARY CODE
//	if (OS.COMCTL32_MAJOR >= 6 && OS.IsAppThemed ()) {
//		OS.InvalidateRect (handle, null, true);
//		return result;
//	}
	int bits = OS.GetWindowLong (handle, OS.GWL_STYLE);
	if ((bits & OS.TCS_MULTILINE) != 0) {
		OS.InvalidateRect (handle, null, true);
		return result;
	}
	RECT rect = new RECT ();
	OS.SetRect (rect, 0, 0, lpwp.cx, lpwp.cy);
	OS.SendMessage (handle, OS.WM_NCCALCSIZE, 0, rect);
	int newWidth = rect.right - rect.left;
	int newHeight = rect.bottom - rect.top;
	OS.GetClientRect (handle, rect);
	int oldWidth = rect.right - rect.left;
	int oldHeight = rect.bottom - rect.top;
	if (newWidth == oldWidth && newHeight == oldHeight) {
		return result;
	}
	RECT inset = new RECT ();
	OS.SendMessage (handle, OS.TCM_ADJUSTRECT, 0, inset);
	int marginX = -inset.right, marginY = -inset.bottom;
	if (newWidth != oldWidth) {
		int left = oldWidth;
		if (newWidth < oldWidth) left = newWidth;
		OS.SetRect (rect, left - marginX, 0, newWidth, newHeight);
		OS.InvalidateRect (handle, rect, true);
	}
	if (newHeight != oldHeight) {
		int bottom = oldHeight;
		if (newHeight < oldHeight) bottom = newHeight;
		if (newWidth < oldWidth) oldWidth -= marginX;
		OS.SetRect (rect, 0, bottom - marginY, oldWidth, newHeight);
		OS.InvalidateRect (handle, rect, true);
	}
	return result;
}

LRESULT wmNotifyChild (int wParam, int lParam) {
	NMHDR hdr = new NMHDR ();
	OS.MoveMemory (hdr, lParam, NMHDR.sizeof);
	int code = hdr.code;
	switch (code) {
		case OS.TCN_SELCHANGE: 
		case OS.TCN_SELCHANGING:
			TabItem item = null;
			int index = OS.SendMessage (handle, OS.TCM_GETCURSEL, 0, 0);
			if (index != -1) item = items [index];
			if (item != null) {
				Control control = item.control;
				if (control != null && !control.isDisposed ()) {
					if (code == OS.TCN_SELCHANGE) {
						control.setBounds (getClientArea ());
					}
					control.setVisible (code == OS.TCN_SELCHANGE);
				}
			}
			if (code == OS.TCN_SELCHANGE) {
				Event event = new Event ();
				event.item = item;
				postEvent (SWT.Selection, event);
			}
	}
	return super.wmNotifyChild (wParam, lParam);
}
*/

}
