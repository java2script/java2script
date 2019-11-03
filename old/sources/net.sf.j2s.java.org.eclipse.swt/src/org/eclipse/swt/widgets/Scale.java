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
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.dnd.DragAndDrop;
import org.eclipse.swt.internal.dnd.DragEvent;
import org.eclipse.swt.internal.dnd.ScaleDND;
import org.eclipse.swt.internal.xhtml.CSSStyle;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;

/**
 * Instances of the receiver represent a selectable user
 * interface object that present a range of continuous
 * numeric values.
 * <dl>
 * <dt><b>Styles:</b></dt>
 * <dd>HORIZONTAL, VERTICAL</dd>
 * <dt><b>Events:</b></dt>
 * <dd>Selection</dd>
 * </dl>
 * <p>
 * Note: Only one of the styles HORIZONTAL and VERTICAL may be specified.
 * </p><p>
 * <p>
 * IMPORTANT: This class is intended to be subclassed <em>only</em>
 * within the SWT implementation.
 * </p>
 * 
 * @j2sPrefix
 * $WTC$$.registerCSS ("$wt.widgets.Scale");
 */

public class Scale extends Control {
	/*
	static final int TrackBarProc;
	static final TCHAR TrackBarClass = new TCHAR (0, OS.TRACKBAR_CLASS, true);
	static {
		WNDCLASS lpWndClass = new WNDCLASS ();
		OS.GetClassInfo (0, TrackBarClass, lpWndClass);
		TrackBarProc = lpWndClass.lpfnWndProc;
		/*
		* Feature in Windows.  The track bar window class
		* does not include CS_DBLCLKS.  This mean that these
		* controls will not get double click messages such as
		* WM_LBUTTONDBLCLK.  The fix is to register a new 
		* window class with CS_DBLCLKS.
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
		lpWndClass.style &= ~OS.CS_GLOBALCLASS;
		lpWndClass.style |= OS.CS_DBLCLKS;
		int byteCount = TrackBarClass.length () * TCHAR.sizeof;
		int lpszClassName = OS.HeapAlloc (hHeap, OS.HEAP_ZERO_MEMORY, byteCount);
		OS.MoveMemory (lpszClassName, TrackBarClass, byteCount);
		lpWndClass.lpszClassName = lpszClassName;
		OS.RegisterClass (lpWndClass);
//		OS.HeapFree (hHeap, 0, lpszClassName);	
	}
	*/
	
	private int minimum;
	private int maximum;
	private int increment;
	private int pageIncrement;
	
	private int lastX, lastY;
	
	private int selection;
	private Element thumbHandle;
	//private Object draggingEvent;
	private Element trackHandle;
	private Element[] lines;
	private DragAndDrop dnd;

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
 * @see SWT#HORIZONTAL
 * @see SWT#VERTICAL
 * @see Widget#checkSubclass
 * @see Widget#getStyle
 * 
 * @j2sIgnore
 */
public Scale (Composite parent, int style) {
	super (parent, checkStyle (style));
	/*
	minimum = 0;
	maximum = 100;
	pageIncrement = 10;
	*/
}

/**
 * Adds the listener to the collection of listeners who will
 * be notified when the receiver's value changes, by sending
 * it one of the messages defined in the <code>SelectionListener</code>
 * interface.
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
 */
public void addSelectionListener(SelectionListener listener) {
	checkWidget ();
	if (listener == null) error (SWT.ERROR_NULL_ARGUMENT);
	TypedListener typedListener = new TypedListener (listener);
	addListener (SWT.Selection,typedListener);
	addListener (SWT.DefaultSelection,typedListener);
}
/*
int callWindowProc (int hwnd, int msg, int wParam, int lParam) {
	if (handle == 0) return 0;
	return OS.CallWindowProc (TrackBarProc, hwnd, msg, wParam, lParam);
}
*/
static int checkStyle (int style) {
	return checkBits (style, SWT.HORIZONTAL, SWT.VERTICAL, 0, 0, 0, 0);
}

/* (non-Javadoc)
 * @see org.eclipse.swt.widgets.Control#getBorderWidth()
 */
public int getBorderWidth() {
	if ((style & SWT.BORDER) != 0) {
		return 2;
	}
	return 0;
}

public Point computeSize (int wHint, int hHint, boolean changed) {
	checkWidget ();
	int border = getBorderWidth ();
	int width = border * 2, height = border * 2;
	//RECT rect = new RECT ();
	//OS.SendMessage (handle, OS.TBM_GETTHUMBRECT, 0, rect);
	int thumbWidth = 10;
	int thumbHeight = 10;
	if ((style & SWT.HORIZONTAL) != 0) {
		/*
		width += OS.GetSystemMetrics (OS.SM_CXHSCROLL) * 10;
		int scrollY = OS.GetSystemMetrics (OS.SM_CYHSCROLL);
		height += (rect.top * 2) + scrollY + (scrollY / 3);
		*/
//		width += UIStringUtil.calculatePlainStringLineWidth("W") * 10;
//		int scrollY = UIStringUtil.calculatePlainStringLineHeight("W");
		width += 16 * 10;
		int scrollY = 16;
		height += (thumbHeight * 2) + scrollY + (scrollY / 3);
	} else {
		/*
		int scrollX = OS.GetSystemMetrics (OS.SM_CXVSCROLL);
		width += (rect.left * 2) + scrollX + (scrollX / 3);
		height += OS.GetSystemMetrics (OS.SM_CYVSCROLL) * 10;
		*/
//		int scrollX = UIStringUtil.calculatePlainStringLineWidth("W");
		int scrollX = 16;
		width += (thumbWidth * 2) + scrollX + (scrollX / 3);
//		height += UIStringUtil.calculatePlainStringLineHeight("W") * 10;
		height += 16 * 10;
	}
	if (wHint != SWT.DEFAULT) width = wHint + (border * 2);
	if (hHint != SWT.DEFAULT) height = hHint + (border * 2);
	return new Point (width, height);
}


void createHandle () {
	//super.createHandle ();
	minimum = 0;
	maximum = 100;
	pageIncrement = 10;
	/*
	OS.SendMessage (handle, OS.TBM_SETRANGEMAX, 0, 100);
	OS.SendMessage (handle, OS.TBM_SETPAGESIZE, 0, 10);
	OS.SendMessage (handle, OS.TBM_SETTICFREQ, 10, 0);
	*/
	handle = document.createElement ("DIV");
	handle.className = "scale-default";
	if (parent != null) {
		Element parentHandle = parent.containerHandle();
		if (parentHandle!= null) {
			parentHandle.appendChild(handle);
		}
	}
	
	if ((style & SWT.BORDER) != 0) {
		handle.className += " scale-border";
	}
	
	thumbHandle = document.createElement("DIV");
	handle.appendChild(thumbHandle);
	if ((style & SWT.HORIZONTAL) != 0) {
		thumbHandle.className = "scale-thumb-horizontal";
		thumbHandle.style.left = "0px";
	} else {
		thumbHandle.className = "scale-thumb-vertical";
		thumbHandle.style.top = "0px";
	}
	
	lines = new Element[0];

	boolean isHorizontal = (style & SWT.HORIZONTAL) != 0;
	decorateScale();
	trackHandle = document.createElement ("DIV");
	if (isHorizontal) {
		trackHandle.className = "scale-center-block-horizontal";
	} else {
		trackHandle.className = "scale-center-block-vertical";
	}
	handle.appendChild (trackHandle);

	Element line1 = document.createElement ("DIV");
	if (isHorizontal) {
		line1.className = "scale-line-polar-top";
	} else {
		line1.className = "scale-line-polar-left";
	}
	handle.appendChild (line1);
	Element line2 = document.createElement ("DIV");
	if (isHorizontal) {
		line2.className = "scale-line-polar-bottom";
	} else {
		line2.className = "scale-line-polar-right";
	}
	handle.appendChild (line2);
	
	dnd = new DragAndDrop();
	dnd.addDragListener(new ScaleDND() {
		public boolean dragging(DragEvent e) {
			super.dragging(e);
			Event event = new Event ();
			event.x = lastX;
			event.y = lastY;
			Point size = getSize();
			int delta = 0;
			if ((style & SWT.BORDER) != 0) {
				delta = 6;
			}
			int width = size.x + delta;
			if (width < 2) {
				width = 2;
			}
			event.width = width;
			int height = size.y + delta;
			if (height < 2) {
				height = 2;
			}
			event.height = height;
			event.widget = Scale.this;
			event.item = Scale.this;
			sendEvent (SWT.Selection, event);
			return true;
		}
	
		public boolean dragEnded(DragEvent e) {
			super.dragEnded(e);
			Event event = new Event ();
			//Point location = getLocation();
//			event.x = ScaleDND.x;//location.x;
//			event.y = ScaleDND.y;//location.y;
			Point p = currentLocation(e);
			if (isHorizontal) {
				event.x = p.x; //SashDND.x;//location.x;
				event.y = Integer.parseInt(handle.style.top);//p.y; //SashDND.y;//location.y;
			} else {
				event.x = Integer.parseInt(handle.style.left);//p.x; //SashDND.x;//location.x;
				event.y = p.y; //SashDND.y;//location.y;
			}
			Point size = getSize();
			int delta = 0;
			if ((style & SWT.BORDER) != 0) {
				delta = 6;
			}
			int width = size.x + delta;
			if (width < 2) {
				width = 2;
			}
			event.width = width;
			int height = size.y + delta;
			if (height < 2) {
				height = 2;
			}
			event.height = height;
			event.widget = Scale.this;
			event.item = Scale.this;
			if ((style & SWT.SMOOTH) == 0) {
				event.detail = SWT.DRAG;
			}
			sendEvent (SWT.Selection, event);
			if (event.doit) {
				lastX = event.x;
				lastY = event.y;
			}
			return true;
		}
	
	});
	dnd.bind(thumbHandle);
}

/* (non-Javadoc)
 * @see org.eclipse.swt.widgets.Control#releaseHandle()
 */
protected void releaseHandle() {
	if (dnd != null) {
		dnd.unbind();
		dnd = null;
	}
	if (lines != null) {
		for (int i = 0; i < lines.length; i++) {
			OS.destroyHandle(lines[i]);
			lines[i] = null;
		}
		//lines = new Element[0];
	}
	if (thumbHandle != null) {
		OS.destroyHandle(thumbHandle);
		thumbHandle = null;
	}
	if (trackHandle != null) {
		OS.destroyHandle(trackHandle);
		trackHandle = null;
	}
	super.releaseHandle();
}

/*
int defaultForeground () {
	return OS.GetSysColor (OS.COLOR_BTNFACE);
}
*/

private void decorateScale() {
	int outerSize;
	if ((style & SWT.HORIZONTAL) != 0) {
		outerSize = getSize().x;
	} else {
		outerSize = getSize().y;
	}
	
	int pages = (maximum - minimum) / pageIncrement;
	
	for (int i = pages; i < lines.length; i++) {
		if (lines[i] != null) {
			lines[i].style.display = "none";
		}
	}
	int thumbSize = 16;
	int range = outerSize - thumbSize + pages;
	for (int i = 0; i < pages; i++) {
		Element line = lines[i];
		if (line == null) {
			line = document.createElement("DIV");
			handle.appendChild(line);
			if ((style & SWT.HORIZONTAL) != 0) {
				line.className = "scale-line-decoration-horizontal";
			} else {
				line.className = "scale-line-decoration-vertical";
			}
			lines[i] = line;
		} else {
			line.style.display = "block";
		}
		if ((style & SWT.HORIZONTAL) != 0) {
			line.style.left = Math.floor (range * i / pages + thumbSize / 2) + "px";
		} else {
			line.style.top = Math.floor (range * i / pages + thumbSize / 2) + "px";
		}
	}
}

/**
 * Returns the amount that the receiver's value will be
 * modified by when the up/down (or right/left) arrows
 * are pressed.
 *
 * @return the increment
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public int getIncrement () {
	checkWidget ();
	//return OS.SendMessage (handle, OS.TBM_GETLINESIZE, 0, 0);
	return increment;
}

/**
 * Returns the maximum value which the receiver will allow.
 *
 * @return the maximum
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public int getMaximum () {
	checkWidget ();
	//return OS.SendMessage (handle, OS.TBM_GETRANGEMAX, 0, 0);
	return maximum;
}

/**
 * Returns the minimum value which the receiver will allow.
 *
 * @return the minimum
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public int getMinimum () {
	checkWidget ();
	//return OS.SendMessage (handle, OS.TBM_GETRANGEMIN, 0, 0);
	return minimum;
}

/**
 * Returns the amount that the receiver's value will be
 * modified by when the page increment/decrement areas
 * are selected.
 *
 * @return the page increment
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public int getPageIncrement () {
	checkWidget ();
	//return OS.SendMessage (handle, OS.TBM_GETPAGESIZE, 0, 0);
	return pageIncrement;
}

/**
 * Returns the 'selection', which is the receiver's position.
 *
 * @return the selection
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public int getSelection () {
	checkWidget ();
	//return OS.SendMessage (handle, OS.TBM_GETPOS, 0, 0);
	CSSStyle thumbStyle = thumbHandle.style;
	if ((style & SWT.HORIZONTAL) != 0) {
		int left = thumbStyle.left.length() > 0 ? Integer.parseInt(thumbStyle.left) : 0;
		selection = left * maximum / (getSize().x - 12);
	} else {
		int top = thumbStyle.top.length() > 0 ? Integer.parseInt(thumbStyle.top) : 0;
		selection = maximum - top * maximum / (getSize().y - 12);
	}
	return selection;
}

/**
 * Removes the listener from the collection of listeners who will
 * be notified when the receiver's value changes.
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
public void removeSelectionListener(SelectionListener listener) {
	checkWidget ();
	if (listener == null) error (SWT.ERROR_NULL_ARGUMENT);
	if (eventTable == null) return;
	eventTable.unhook (SWT.Selection, listener);
	eventTable.unhook (SWT.DefaultSelection,listener);	
}

/*
void setBackgroundPixel (int pixel) {
	if (background == pixel) return;
	super.setBackgroundPixel (pixel);
	/*
	* Bug in Windows.  Changing the background color of the Scale
	* widget and calling InvalidateRect() still draws with the old
	* color.  The fix is to post a fake WM_SETFOCUS event to cause
	* it to redraw with the new background color.
	* 
	* Note.  This WM_SETFOCUS message causes recursion when
	* setBackground is called from within the focus event
	* listener.
	*-/
	OS.PostMessage (handle, OS.WM_SETFOCUS, 0, 0);
}
*/

/**
 * Sets the amount that the receiver's value will be
 * modified by when the up/down (or right/left) arrows
 * are pressed to the argument, which must be at least 
 * one.
 *
 * @param increment the new increment (must be greater than zero)
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setIncrement (int increment) {
	checkWidget ();
	if (increment < 1) return;
//	int minimum = OS.SendMessage (handle, OS.TBM_GETRANGEMIN, 0, 0);
//	int maximum = OS.SendMessage (handle, OS.TBM_GETRANGEMAX, 0, 0);
	if (increment > maximum - minimum) return;
	//OS.SendMessage (handle, OS.TBM_SETLINESIZE, 0, increment);
	if (this.increment == increment) return ;
	this.increment = increment;
//	clearScaleDecoration();
//	decorateScale();
}

/**
 * Sets the maximum value that the receiver will allow.  This new
 * value will be ignored if it is not greater than the receiver's current
 * minimum value.  If the new maximum is applied then the receiver's
 * selection value will be adjusted if necessary to fall within its new range.
 *
 * @param value the new maximum, which must be greater than the current minimum
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setMaximum (int value) {
	checkWidget ();
	//int minimum = OS.SendMessage (handle, OS.TBM_GETRANGEMIN, 0, 0);
	if (0 <= minimum && minimum < value) {
		//OS.SendMessage (handle, OS.TBM_SETRANGEMAX, 1, value);
		if (maximum == value) return;
		maximum = value;
//		clearScaleDecoration();
		decorateScale();
		setSelection(selection);
	}
}

/**
 * Sets the minimum value that the receiver will allow.  This new
 * value will be ignored if it is negative or is not less than the receiver's
 * current maximum value.  If the new minimum is applied then the receiver's
 * selection value will be adjusted if necessary to fall within its new range.
 *
 * @param value the new minimum, which must be nonnegative and less than the current maximum
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setMinimum (int value) {
	checkWidget ();
	//int maximum = OS.SendMessage (handle, OS.TBM_GETRANGEMAX, 0, 0);
	if (0 <= value && value < maximum) {
		//OS.SendMessage (handle, OS.TBM_SETRANGEMIN, 1, value);
		if (minimum == value) return;
		minimum = value;
//		clearScaleDecoration();
		decorateScale();
		setSelection(selection);
	}
}

/**
 * Sets the amount that the receiver's value will be
 * modified by when the page increment/decrement areas
 * are selected to the argument, which must be at least
 * one.
 *
 * @param pageIncrement the page increment (must be greater than zero)
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setPageIncrement (int pageIncrement) {
	checkWidget ();
	if (pageIncrement < 1) return;
//	int minimum = OS.SendMessage (handle, OS.TBM_GETRANGEMIN, 0, 0);
//	int maximum = OS.SendMessage (handle, OS.TBM_GETRANGEMAX, 0, 0);
	if (pageIncrement > maximum - minimum) return;
//	OS.SendMessage (handle, OS.TBM_SETPAGESIZE, 0, pageIncrement);
//	OS.SendMessage (handle, OS.TBM_SETTICFREQ, pageIncrement, 0);
	if (this.pageIncrement == pageIncrement) return;
	this.pageIncrement = pageIncrement;
//	clearScaleDecoration();
	decorateScale();
}

/**
 * Sets the 'selection', which is the receiver's value,
 * to the argument which must be greater than or equal to zero.
 *
 * @param value the new selection (must be zero or greater)
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setSelection (int value) {
	checkWidget ();
	//OS.SendMessage (handle, OS.TBM_SETPOS, 1, value);
	if (value < minimum) {
		selection = minimum;
	} else if (value > maximum) {
		selection = maximum;
	} else {
		selection = value;
	}

//	if (selection == value) return;
//	if (minimum <= value && value < maximum) {
//		selection = value;
//	}
	if ((style & SWT.HORIZONTAL) != 0) {
		thumbHandle.style.left = Math.round(selection * (getSize().x - 12) / maximum) + "px";
	} else {
		thumbHandle.style.top = Math.round((maximum - selection) * (getSize().y - 12) / maximum) + "px";
	}
}

/* (non-Javadoc)
 * @see org.eclipse.swt.widgets.Widget#SetWindowPos(java.lang.Object, java.lang.Object, int, int, int, int, int)
 */
boolean SetWindowPos(Object hWnd, Object hWndInsertAfter, int X, int Y, int cx, int cy, int uFlags) {
	decorateScale();
	Element el = (Element) hWnd;
	el.style.left = X + "px";
	el.style.top = Y + "px";
	el.style.width = (cx > 0 ? cx : 0) + "px";
	el.style.height = (cy > 0 ? cy : 0) + "px";
	setSelection(selection);
	return true;
//	return super.SetWindowPos(hWnd, hWndInsertAfter, X, Y, cx, cy, uFlags);
}

/*
int widgetStyle () {
	int bits = super.widgetStyle () | OS.WS_TABSTOP | OS.TBS_BOTH | OS.TBS_AUTOTICKS;
	if ((style & SWT.HORIZONTAL) != 0) return bits | OS.TBS_HORZ | OS.TBS_DOWNISLEFT;
	return bits | OS.TBS_VERT;
}

String windowClass () {
	return TrackBarClass;
}

int windowProc () {
	return TrackBarProc;
}

LRESULT wmScrollChild (int wParam, int lParam) {
	
	/* Do nothing when scrolling is ending *-/
	int code = wParam & 0xFFFF;
	switch (code) {
		case OS.TB_ENDTRACK:
		case OS.TB_THUMBPOSITION:
			return null;
	}

	Event event = new Event ();
	/*
	* This code is intentionally commented.  The event
	* detail field is not currently supported on all
	* platforms.
	*-/
//	switch (code) {
//		case OS.TB_TOP: 		event.detail = SWT.HOME;  break;
//		case OS.TB_BOTTOM:		event.detail = SWT.END;  break;
//		case OS.TB_LINEDOWN:	event.detail = SWT.ARROW_DOWN;  break;
//		case OS.TB_LINEUP: 		event.detail = SWT.ARROW_UP;  break;
//		case OS.TB_PAGEDOWN: 	event.detail = SWT.PAGE_DOWN;  break;
//		case OS.TB_PAGEUP: 		event.detail = SWT.PAGE_UP;  break;
//	}
	
	/*
	* Send the event because WM_HSCROLL and WM_VSCROLL
	* are sent from a modal message loop in windows that
	* is active when the user is scrolling.
	*-/
	sendEvent (SWT.Selection, event);
	// widget could be disposed at this point
	return null;
}
*/
}
