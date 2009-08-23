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
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.graphics.Rectangle;
import org.eclipse.swt.internal.RunnableCompatibility;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.dnd.HTMLEventWrapper;
import org.eclipse.swt.internal.xhtml.CSSStyle;
import org.eclipse.swt.internal.xhtml.Clazz;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;

/**
 * Instances of this class represent a selectable user interface object
 * that represents a button in a tool bar.
 * <dl>
 * <dt><b>Styles:</b></dt>
 * <dd>PUSH, CHECK, RADIO, SEPARATOR, DROP_DOWN</dd>
 * <dt><b>Events:</b></dt>
 * <dd>Selection</dd>
 * </dl>
 * <p>
 * Note: Only one of the styles CHECK, PUSH, RADIO, SEPARATOR and DROP_DOWN 
 * may be specified.
 * </p><p>
 * IMPORTANT: This class is <em>not</em> intended to be subclassed.
 * </p>
 */
public class ToolItem extends Item {
	ToolBar parent;
	Control control;
	String toolTipText;
	Image disabledImage, hotImage;
	Image disabledImage2;
	int id;
	
	int cachedTextWidth, cachedTextHeight;
	boolean isInnerBounds;
	int seperatorWidth;
	Element dropDownEl;
	private RunnableCompatibility hItemSelection;
	private Object hItemMouseDown;
	private Object hItemMouseUp;
	private Object hArrowSelection;
	private Object hToolMouseDown;
	private Object hToolMouseUp;

/**
 * Constructs a new instance of this class given its parent
 * (which must be a <code>ToolBar</code>) and a style value
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
 * @see SWT#PUSH
 * @see SWT#CHECK
 * @see SWT#RADIO
 * @see SWT#SEPARATOR
 * @see SWT#DROP_DOWN
 * @see Widget#checkSubclass
 * @see Widget#getStyle
 */
public ToolItem (ToolBar parent, int style) {
	super (parent, checkStyle (style));
	this.parent = parent;
	parent.createItem (this, parent.getItemCount ());
	configureItem();
}

/**
 * Constructs a new instance of this class given its parent
 * (which must be a <code>ToolBar</code>), a style value
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
 * @see SWT#PUSH
 * @see SWT#CHECK
 * @see SWT#RADIO
 * @see SWT#SEPARATOR
 * @see SWT#DROP_DOWN
 * @see Widget#checkSubclass
 * @see Widget#getStyle
 */
public ToolItem (ToolBar parent, int style, int index) {
	super (parent, checkStyle (style));
	this.parent = parent;
	parent.createItem (this, index);
	configureItem();
}

void configureItem() {
	hItemSelection = new RunnableCompatibility() {
		public void run() {
			if (!isEnabled()) {
				toReturn(false);
				return ;
			}
			if ((style & SWT.CHECK) != 0) {
				//HTMLEvent e = (HTMLEvent) getEvent();
				setSelection (!getSelection ());
			} else {
				if ((style & SWT.RADIO) != 0) {
					if ((parent.getStyle () & SWT.NO_RADIO_GROUP) != 0) {
						setSelection (!getSelection ());
					} else {
						selectRadio ();
					}
				}
			}
			postEvent (SWT.Selection);
			/*
			if ((style & SWT.TOGGLE) != 0) {
				setSelection(!getSelection());
			}
			Event e = new Event();
			e.display = display;
			e.type = SWT.Selection;
			e.item = Button.this;
			e.text = getText();
			e.widget = Button.this;
			sendEvent(e);
			*/
		}
	};
	Clazz.addEvent(handle, "click", hItemSelection);
	Clazz.addEvent(handle, "dblclick", hItemSelection);
	
	if ((style & SWT.SEPARATOR) == 0) {
		if (dropDownEl != null) {
			Element arrow = dropDownEl.childNodes[0];
			hItemMouseDown = new RunnableCompatibility() {
				public void run() {
					if (!isEnabled()) {
						toReturn(false);
						return ;
					}
					OS.addCSSClass(handle, "tool-item-down");
					OS.addCSSClass(dropDownEl, "tool-item-drop-down-button-down");
				}
			};
			Clazz.addEvent(handle, "mousedown", hItemMouseDown);
			Clazz.addEvent(arrow, "mousedown", hItemMouseDown);
			Clazz.addEvent(dropDownEl, "mousedown", hItemMouseDown);
			
			hItemMouseUp = new RunnableCompatibility() {
				public void run() {
					if (!isEnabled()) {
						toReturn(false);
						return ;
					}
					OS.removeCSSClass(handle, "tool-item-down");
					OS.removeCSSClass(dropDownEl, "tool-item-drop-down-button-down");
				}
			};
			Clazz.addEvent(handle, "mouseup", hItemMouseUp);
			Clazz.addEvent(arrow, "mouseup", hItemMouseUp);
			Clazz.addEvent(dropDownEl, "mouseup", hItemMouseUp);
			Clazz.addEvent(handle, "mouseout", hItemMouseUp);
			Clazz.addEvent(arrow, "mouseout", hItemMouseUp);
			Clazz.addEvent(dropDownEl, "mouseout", hItemMouseUp);
			
			hArrowSelection = new RunnableCompatibility() {
				public void run() {
					if (!isEnabled()) {
						toReturn(false);
						return ;
					}
					Event event = new Event ();
					event.detail = SWT.ARROW;
					HTMLEventWrapper e = new HTMLEventWrapper(getEvent());
					/*
					int index = OS.SendMessage (handle, OS.TB_COMMANDTOINDEX, lpnmtb.iItem, 0);
					RECT rect = new RECT ();
					OS.SendMessage (handle, OS.TB_GETITEMRECT, index, rect);
					event.x = rect.left;
					event.y = rect.bottom;
					*/
					event.x = e.x;
					event.y = e.y;
					postEvent (SWT.Selection, event);
				}
			};
			Clazz.addEvent(arrow, "click", hArrowSelection);
			Clazz.addEvent(dropDownEl, "click", hArrowSelection);
		} else {
			hToolMouseDown = new RunnableCompatibility() {
				public void run() {
					if (!isEnabled()) {
						toReturn(false);
						return ;
					}
					OS.addCSSClass(handle, "tool-item-down");
				}
			};
			Clazz.addEvent(handle, "mousedown", hToolMouseDown);
			
			hToolMouseUp = new RunnableCompatibility() {
				public void run() {
					if (!isEnabled()) {
						toReturn(false);
						return ;
					}
					OS.removeCSSClass(handle, "tool-item-down");
				}
			};
			Clazz.addEvent(handle, "mouseup", hToolMouseUp);
			Clazz.addEvent(handle, "mouseout", hToolMouseUp);
		}
	}

}
/**
 * Adds the listener to the collection of listeners who will
 * be notified when the control is selected, by sending
 * it one of the messages defined in the <code>SelectionListener</code>
 * interface.
 * <p>
 * When <code>widgetSelected</code> is called when the mouse is over the arrow portion of a drop-down tool,
 * the event object detail field contains the value <code>SWT.ARROW</code>.
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
	checkWidget();
	if (listener == null) error (SWT.ERROR_NULL_ARGUMENT);
	TypedListener typedListener = new TypedListener (listener);
	addListener (SWT.Selection,typedListener);
	addListener (SWT.DefaultSelection,typedListener);
}

static int checkStyle (int style) {
	return checkBits (style, SWT.PUSH, SWT.CHECK, SWT.RADIO, SWT.SEPARATOR, SWT.DROP_DOWN, 0);
}

protected void checkSubclass () {
	if (!isValidSubclass ()) error (SWT.ERROR_INVALID_SUBCLASS);
}

void click (boolean dropDown) {	
	/*
	int hwnd = parent.handle;
	if (OS.GetKeyState (OS.VK_LBUTTON) < 0) return;
	int index = OS.SendMessage (hwnd, OS.TB_COMMANDTOINDEX, id, 0);
	RECT rect = new RECT ();
	OS.SendMessage (hwnd, OS.TB_GETITEMRECT, index, rect);
	int hotIndex = OS.SendMessage (hwnd, OS.TB_GETHOTITEM, 0, 0);
	
	/*
	* In order to emulate all the processing that
	* happens when a mnemonic key is pressed, fake
	* a mouse press and release.  This will ensure
	* that radio and pull down items are handled
	* properly.
	*-/
	int y = rect.top + (rect.bottom - rect.top) / 2;
	int lParam = (dropDown ? rect.right - 1 : rect.left) | (y << 16);
	parent.ignoreMouse = true;
	OS.SendMessage (hwnd, OS.WM_LBUTTONDOWN, 0, lParam);
	OS.SendMessage (hwnd, OS.WM_LBUTTONUP, 0, lParam);
	parent.ignoreMouse = false;
	
	if (hotIndex != -1) {
		OS.SendMessage (hwnd, OS.TB_SETHOTITEM, hotIndex, 0);
	}
	*/
}

Image createDisabledImage (Image image, Color color) {
  	/*
  	* In order to be consistent with the way that disabled
	* images appear in other places in the user interface,
	* use the SWT Graphics to create a disabled image instead
    * of calling DrawState().
	*/
	return new Image (display, image, SWT.IMAGE_DISABLE);
	/*
	* This code is intentionally commented.
	*/
//	if (OS.IsWinCE) {
//		return new Image (display, image, SWT.IMAGE_DISABLE);
//	}
//	Rectangle rect = image.getBounds ();
//	Image disabled = new Image (display, rect);
//	GC gc = new GC (disabled);
//	gc.setBackground (color);
//	gc.fillRectangle (rect);
//	int hDC = gc.handle;
//	int hImage = image.handle;
//	int fuFlags = OS.DSS_DISABLED;
//	switch (image.type) {
//		case SWT.BITMAP: fuFlags |= OS.DST_BITMAP; break;
//		case SWT.ICON: fuFlags |= OS.DST_ICON; break;
//	}
//	OS.DrawState (hDC, 0, 0, hImage, 0, 0, 0, rect.width, rect.height, fuFlags);
//	gc.dispose ();
//	return disabled;
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
	/*
	checkWidget();
	int hwnd = parent.handle;
	int index = OS.SendMessage (hwnd, OS.TB_COMMANDTOINDEX, id, 0);
	RECT rect = new RECT ();
	OS.SendMessage (hwnd, OS.TB_GETITEMRECT, index, rect);
	int width = rect.right - rect.left;
	int height = rect.bottom - rect.top;
	return new Rectangle (rect.left, rect.top, width, height);
	*/
	
	Point pt = getLocation();
	int x = pt.x, y = pt.y;
	
	ToolBar p = parent;
	
	int w = 0, h = 0;
	if (p.containsImage && p.imgMaxHeight == 0 && p.imgMaxWidth == 0) {
		p.calculateImagesMaxSize();
	}
	if (p.containsText && p.txtMaxHeight == 0 && p.txtMaxWidth == 0) {
		p.calculateTextsMaxSize();
	}
	boolean hasText = text != null && text.length() != 0;
	boolean hasImage = image != null;
	
	//int hPadding = 4 + 4;
	//int vPading = 2 + 3;
	int border = 3;
	if ((p.style & SWT.FLAT) != 0) {
		border = 2;
	}
	if (p.containsImage) {
		if (p.containsText) { // mixed mode
			if ((p.style & SWT.RIGHT) != 0) {
				h = Math.max(p.imgMaxHeight, p.txtMaxHeight) + 5 + border;
				if (hasImage && hasText) {
					w = p.imgMaxWidth + cachedTextWidth + 8 + border;
				} else if (!hasImage && hasText) {
					w = cachedTextWidth + 8 + border;
				} else if (hasImage && !hasText) {
					w = p.imgMaxWidth + 4 + border;
				} else { // empty
					if ((style & SWT.SEPARATOR) != 0) {
						if ((p.style & SWT.VERTICAL) != 0) {
							w = -1;
						} else {
							w = 8;
						}
					} else { // calculating maximized item ...
						w = p.imgMaxWidth + p.txtMaxWidth + 8 + border;
					}
				}
			} else {
				h = p.imgMaxHeight + p.txtMaxHeight + 4 + border;
				if (hasImage && hasText) {
					w = Math.max(p.imgMaxWidth, cachedTextWidth) + 8 + border;
				} else if (!hasImage && hasText) {
					w = cachedTextWidth + 8 + border;
				} else if (hasImage && !hasText) {
					w = p.imgMaxWidth + 4 + border;
				} else { // empty
					if ((style & SWT.SEPARATOR) != 0) {
						if ((p.style & SWT.VERTICAL) != 0) {
							w = -1;
						} else {
							w = 8;
						}
					} else { // calculating maximized item ...
						w = Math.max(p.imgMaxWidth, p.txtMaxWidth) + 8 + border;
					}
				}
			}
		} else { // image mode : image, empty, seperator
			w = p.imgMaxWidth + 4 + border;
			h = p.imgMaxHeight + 3 + border;
			if ((p.style & SWT.VERTICAL) != 0) {
				w += 4;
			}
			if ((style & SWT.SEPARATOR) != 0) {
				if ((p.style & SWT.VERTICAL) != 0) {
					h = 8;
				} else {
					w = 8;
				}
			}
		}
	} else {
		if (p.containsText) { // text mode: text, empty, seperator
			if (hasText) {
				w = cachedTextWidth + 8 + border;
				h = cachedTextHeight + 5 + border;
			} else { // empty or seperator
				if ((style & SWT.SEPARATOR) != 0) {
					if ((p.style & SWT.VERTICAL) != 0) {
						w = p.txtMaxWidth + 8 + border;
						//if ((p.style & SWT.VERTICAL) != 0) {
							w += p.getBorderWidth() * 2;;
						//}
						if (control != null) {
							h = 21;
						} else {
							h = 8;
						}
					} else {
						w = 8;
						h = p.txtMaxHeight + 5 + border;
					}
				} else { // calculating maximized item ...
					w = p.txtMaxWidth + 4 + border;
					h = p.txtMaxHeight + 5 + border;
					if ((style & SWT.DROP_DOWN) != 0) {
						if ((p.style & SWT.VERTICAL) != 0) {
							w += 4;
						}
					}
				}
			}
		} else {
			// empty ...
			w = 21;
			h = 21;
		}
	}
	if ((style & SWT.SEPARATOR) != 0 && control != null) {
		//if ((p.style & SWT.VERTICAL) != 0)
		/*
		 * Because some set seperatorWidth are calculated by default packing.
		 * So it's OK to recalculate it here.
		 * 
		 * TODO: need more studies
		 */
		int ww = (seperatorWidth != -1) ? -1 : w; 
		if (ww == -1) {
			Point computeSize = control.computeSize(ww, h);
			w = computeSize.x - 1;
		}
	}
	
	// TODO: Bounds should be set in ToolBar#setWindowPos
	//updateItemBounds(w, h);
	
	if ((style & SWT.DROP_DOWN) != 0) {
		w += 8 + 2 + border;
	}
	if ((p.style & SWT.FLAT) != 0) {
		if ((p.style & SWT.VERTICAL) == 0 || (style & SWT.SEPARATOR) == 0) {
			h += 1;
		}
		if ((style & SWT.SEPARATOR) == 0) {
			w += 1;
		}
		if ((style & SWT.DROP_DOWN) != 0) {
			w += 1;
		}
	}
	if ((p.style & SWT.VERTICAL) != 0) {
		if ((style & SWT.DROP_DOWN) != 0) {
			w += 1;
		}
		//if ((p.style & SWT.FLAT) == 0) {
			w -= 4;
		//}
		if (!isInnerBounds) {
			w = parent.cachedMaxItemWidth;
			if ((style & SWT.SEPARATOR) != 0) {
				w += p.getBorderWidth() * 2;
			}
		}
		y += x;
		x = 0;
	}
	return new Rectangle (x, y, w, h);
}

Point getLocation() {
	ToolBar p = parent;
	
	int x = 0, y = 0;
	Point pos = OS.calcuateRelativePosition(handle, parent.handle);
	if ((parent.style & SWT.FLAT) != 0) {
		int idx = p.indexOf(this);
		pos.x += idx;
	}
	x = pos.x;
	y = pos.y;
	if ((parent.style & SWT.SHADOW_OUT) != 0) {
		y -= OS.isIE ? 4 : 2;
	}
	if ((parent.style & SWT.BORDER) != 0) {
		if (OS.isOpera) {
			x -= 2;
			y -= 2;
		} else if (!OS.isIE) {
			x += 2;
			y += 2;
		}
	}
	if ((style & SWT.SEPARATOR) != 0) {
		if (control == null) {
			if ((parent.style & SWT.VERTICAL) != 0) {
				y -= 3;
			} else {
				x -= 3;
			}
		} else {
			
		}
	}
	return new Point(x, y);
}

void updateItemBounds(int w, int h) {
	ToolBar p = parent;
	boolean hasText = text != null && text.length() != 0;
	boolean hasImage = image != null;
	int border = 3;
	if ((p.style & SWT.FLAT) != 0) {
		border = 2;
	}
	CSSStyle s = handle.style;
	s.width = Math.max(0, w - 8 - border) + "px";
	s.height = Math.max(0, h - 5 - border) + "px";
	if ((style & SWT.SEPARATOR) != 0) {
		if (control != null) {
			s.width = w + "px";
			s.height = h + "px";
			control.setSize(w, h);
			Point pt = getLocation();
			control.left = pt.x;
			control.top = pt.y;
		} else {
			s.height = (h - 6) + "px";
		}
	} else if (!hasText/* && (style & SWT.SEPARATOR) == 0*/) {
		s.width = Math.max(0, w - 8 - border) + "px";
		s.height = Math.max(0, h - 5 - border) + "px";
		if (OS.isIE && (p.style & SWT.RIGHT) == 0) { // TODO: I hate this IE hacking!
			// 2 : padding between image and text?
			if (p.containsImage) {
				s.fontSize = "0";
				if (hasImage && p.containsText) {
					s.height = Math.max(0, h - 5 - border - 2) + "px";
				} else {
					s.height = Math.max(0, h - 5 - border - 1) + "px";
				}
			} else {
				s.fontSize = "0";
				s.height = Math.max(0, h - 5 - border + 1) + "px";
			}
		}
		if (!p.containsText) {
			s.backgroundPosition = "center center";
		} else if ((parent.style & SWT.RIGHT) == 0) {
			s.backgroundPosition = "center top";
		} else {
			s.backgroundPosition = "left center";
		}
	}
	if (OS.isIE && dropDownEl != null) { // TODO: I hate this IE hacking!
		dropDownEl.style.height = (h - border + 1) + "px";
		if (hasImage && (p.style & SWT.RIGHT) == 0) {
			// 2 : padding between image and text?
			dropDownEl.style.height = Math.max(0, h - 2 - border) + "px";
		}
		//dropDownEl.childNodes[0].style.top = ((h - 5 - border - 4) / 2 - 7) + "px";
	}
}

/**
 * Returns the control that is used to fill the bounds of
 * the item when the items is a <code>SEPARATOR</code>.
 *
 * @return the control
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public Control getControl () {
	checkWidget();
	return control;
}

/**
 * Returns the receiver's disabled image if it has one, or null
 * if it does not.
 * <p>
 * The disabled image is displayed when the receiver is disabled.
 * </p>
 *
 * @return the receiver's disabled image
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public Image getDisabledImage () {
	checkWidget();
	return disabledImage;
}

/**
 * Returns <code>true</code> if the receiver is enabled, and
 * <code>false</code> otherwise. A disabled control is typically
 * not selectable from the user interface and draws with an
 * inactive or "grayed" look.
 *
 * @return the receiver's enabled state
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @see #isEnabled
 */
public boolean getEnabled () {
	checkWidget();
	if ((style & SWT.SEPARATOR) != 0) {
		return (state & DISABLED) == 0;
	}
	/*
	int hwnd = parent.handle;
	int fsState = OS.SendMessage (hwnd, OS.TB_GETSTATE, id, 0);
	return (fsState & OS.TBSTATE_ENABLED) != 0;
	*/
	return !OS.existedCSSClass(handle, "tool-item-disabled");
}

/**
 * Returns the receiver's hot image if it has one, or null
 * if it does not.
 * <p>
 * The hot image is displayed when the mouse enters the receiver.
 * </p>
 *
 * @return the receiver's hot image
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public Image getHotImage () {
	checkWidget();
	return hotImage;
}

/**
 * Returns the receiver's parent, which must be a <code>ToolBar</code>.
 *
 * @return the receiver's parent
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public ToolBar getParent () {
	checkWidget();
	return parent;
}

/**
 * Returns <code>true</code> if the receiver is selected,
 * and false otherwise.
 * <p>
 * When the receiver is of type <code>CHECK</code> or <code>RADIO</code>,
 * it is selected when it is checked (which some platforms draw as a
 * pushed in button). If the receiver is of any other type, this method
 * returns false.
 * </p>
 *
 * @return the selection state
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public boolean getSelection () {
	checkWidget();
	if ((style & (SWT.CHECK | SWT.RADIO)) == 0) return false;
	/*
	int hwnd = parent.handle;
	int fsState = OS.SendMessage (hwnd, OS.TB_GETSTATE, id, 0);
	return (fsState & OS.TBSTATE_CHECKED) != 0;
	*/
	return OS.existedCSSClass(handle, "tool-item-selected");
}

/**
 * Returns the receiver's tool tip text, or null if it has not been set.
 *
 * @return the receiver's tool tip text
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public String getToolTipText () {
	checkWidget();
	return toolTipText;
}

/**
 * Gets the width of the receiver.
 *
 * @return the width
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public int getWidth () {
	checkWidget();
	/*
	int hwnd = parent.handle;
	int index = OS.SendMessage (hwnd, OS.TB_COMMANDTOINDEX, id, 0);
	RECT rect = new RECT ();
	OS.SendMessage (hwnd, OS.TB_GETITEMRECT, index, rect);
	return rect.right - rect.left;
	*/
	return 24;
}

/**
 * Returns <code>true</code> if the receiver is enabled and all
 * of the receiver's ancestors are enabled, and <code>false</code>
 * otherwise. A disabled control is typically not selectable from the
 * user interface and draws with an inactive or "grayed" look.
 *
 * @return the receiver's enabled state
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @see #getEnabled
 */
public boolean isEnabled () {
	checkWidget();
	return getEnabled () && parent.isEnabled ();
}

protected void releaseChild () {
	super.releaseChild ();
	parent.destroyItem (this);
}

/* (non-Javadoc)
 * @see org.eclipse.swt.widgets.Widget#releaseHandle()
 */
protected void releaseHandle() {
	if (dropDownEl != null) {
		Element arrow = dropDownEl.childNodes[0];
		if (hItemMouseDown != null) {
			Clazz.removeEvent(dropDownEl, "mousedown", hItemMouseDown);
			Clazz.removeEvent(arrow, "mousedown", hItemMouseDown);
		}
		if (hItemMouseUp != null) {
			Clazz.removeEvent(dropDownEl, "mouseup", hItemMouseUp);
			Clazz.removeEvent(dropDownEl, "mouseout", hItemMouseUp);
			Clazz.removeEvent(arrow, "mouseup", hItemMouseUp);
			Clazz.removeEvent(arrow, "mouseout", hItemMouseUp);
		}
		if (hArrowSelection != null) {
			Clazz.removeEvent(dropDownEl, "click", hArrowSelection);
			Clazz.removeEvent(arrow, "click", hArrowSelection);
			hArrowSelection = null;
		}
		OS.destroyHandle(dropDownEl);
		dropDownEl = null;
	}
	if (handle != null) {
		if (hItemSelection != null) {
			Clazz.removeEvent(handle, "click", hItemSelection);
			Clazz.removeEvent(handle, "dblclick", hItemSelection);
			hItemSelection = null;
		}
		if (hItemMouseDown != null) {
			Clazz.removeEvent(handle, "mousedown", hItemMouseDown);
		}
		if (hItemMouseUp != null) {
			Clazz.removeEvent(handle, "mouseup", hItemMouseUp);
			Clazz.removeEvent(handle, "mouseout", hItemMouseUp);
		}

		if (hToolMouseDown != null) {
			Clazz.removeEvent(handle, "mousedown", hToolMouseDown);
			hToolMouseDown = null;
		}
		if (hToolMouseUp != null) {
			Clazz.removeEvent(handle, "mouseup", hToolMouseUp);
			Clazz.removeEvent(handle, "mouseout", hToolMouseUp);
			hToolMouseUp = null;
		}
		hItemMouseDown = null;
		hItemMouseUp = null;
//		OS.destroyHandle(handle);
	}
	super.releaseHandle();
}

protected void releaseWidget () {
	super.releaseWidget ();
	parent = null;
	control = null;
	toolTipText = null;
	disabledImage = hotImage = null;
	if (disabledImage2 != null) disabledImage2.dispose ();
	disabledImage2 = null;
}

void releaseImages () {
	/*
	TBBUTTONINFO info = new TBBUTTONINFO ();
	info.cbSize = TBBUTTONINFO.sizeof;
	info.dwMask = OS.TBIF_IMAGE | OS.TBIF_STYLE;
	int hwnd = parent.handle;
	OS.SendMessage (hwnd, OS.TB_GETBUTTONINFO, id, info);
	/*
	* Feature in Windows.  For some reason, a tool item that has
	* the style BTNS_SEP does not return I_IMAGENONE when queried
	* for an image index, despite the fact that no attempt has been
	* made to assign an image to the item.  As a result, operations
	* on an image list that use the wrong index cause random results.	
	* The fix is to ensure that the tool item is not a separator
	* before using the image index.  Since separators cannot have
	* an image and one is never assigned, this is not a problem.
	*-/
	if ((info.fsStyle & OS.BTNS_SEP) == 0 && info.iImage != OS.I_IMAGENONE) {
		ImageList imageList = parent.getImageList ();
		ImageList hotImageList = parent.getHotImageList ();
		ImageList disabledImageList = parent.getDisabledImageList();
		if (imageList != null) imageList.put (info.iImage, null);
		if (hotImageList != null) hotImageList.put (info.iImage, null);
		if (disabledImageList != null) disabledImageList.put (info.iImage, null);
	}
	*/
}

/**
 * Removes the listener from the collection of listeners who will
 * be notified when the control is selected.
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
	checkWidget();
	if (listener == null) error (SWT.ERROR_NULL_ARGUMENT);
	if (eventTable == null) return;
	eventTable.unhook (SWT.Selection, listener);
	eventTable.unhook (SWT.DefaultSelection,listener);	
}

void resizeControl () {
	if (control != null && !control.isDisposed ()) {
		/*
		* Set the size and location of the control
		* separately to minimize flashing in the
		* case where the control does not resize
		* to the size that was requested.  This
		* case can occur when the control is a
		* combo box.
		*/
		Rectangle itemRect = getBounds ();
		control.setSize (itemRect.width, itemRect.height);
		Rectangle rect = control.getBounds ();
		rect.x = itemRect.x + (itemRect.width - rect.width) / 2;
		rect.y = itemRect.y + (itemRect.height - rect.height) / 2;
		control.setLocation (rect.x, rect.y);
		if ((style & SWT.DROP_DOWN) != 0) {
			handle.style.width = (itemRect.width - 8 - 4 - 1) + "px";
		} else {
			handle.style.width = itemRect.width + "px";
		}
		handle.style.height = itemRect.height + "px";
	}
}

void selectRadio () {
	int index = 0;
	ToolItem [] items = parent.getItems ();
	while (index < items.length && items [index] != this) index++;
	int i = index - 1;
	while (i >= 0 && items [i].setRadioSelection (false)) --i;
	int j = index + 1;
	while (j < items.length && items [j].setRadioSelection (false)) j++;
	setSelection (true);
}

/**
 * Sets the control that is used to fill the bounds of
 * the item when the items is a <code>SEPARATOR</code>.
 *
 * @param control the new control
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_INVALID_ARGUMENT - if the control has been disposed</li> 
 *    <li>ERROR_INVALID_PARENT - if the control is not in the same widget tree</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setControl (Control control) {
	checkWidget();
	if (control != null) {
		if (control.isDisposed()) error (SWT.ERROR_INVALID_ARGUMENT);
		if (control.parent != parent) error (SWT.ERROR_INVALID_PARENT);
	}
	if ((style & SWT.SEPARATOR) == 0) return;
	this.control = control;
	if (control != null) {
		OS.removeCSSClass(handle, "tool-item-seperator");
		OS.addCSSClass(handle, "tool-item-inner-control");
		handle.appendChild(control.handle);
	} else {
		OS.addCSSClass(handle, "tool-item-seperator");
		OS.removeCSSClass(handle, "tool-item-inner-control");
	}
	/*
	* Feature in Windows.  When a tool bar wraps, tool items
	* with the style BTNS_SEP are used as wrap points.  This
	* means that controls that are placed on top of separator
	* items are not positioned properly.  Also, vertical tool
	* bars are implemented using TB_SETROWS to set the number
	* of rows.  When a control is placed on top of a separator,
	* the height of the separator does not grow.  The fix in
	* both cases is to change the tool item style from BTNS_SEP
	* to BTNS_BUTTON, causing the item to wrap like a tool item
	* button.  The new tool item button is disabled to avoid key
	* traversal and the image is set to I_IMAGENONE to avoid
	* getting the first image from the image list.
	*/
	if ((parent.style & (SWT.WRAP | SWT.VERTICAL)) != 0) {
		/*
		boolean changed = false;
		int hwnd = parent.handle;
		TBBUTTONINFO info = new TBBUTTONINFO ();
		info.cbSize = TBBUTTONINFO.sizeof;
		info.dwMask = OS.TBIF_STYLE | OS.TBIF_STATE;
		OS.SendMessage (hwnd, OS.TB_GETBUTTONINFO, id, info);
		if (control == null) {
			if ((info.fsStyle & OS.BTNS_SEP) == 0) {
				changed = true;
				info.fsStyle &= ~OS.BTNS_BUTTON;
				info.fsStyle |= OS.BTNS_SEP;
				if ((state & DISABLED) != 0) {
					info.fsState &= ~OS.TBSTATE_ENABLED;
				} else {
					info.fsState |= OS.TBSTATE_ENABLED;
				}
			}
		} else {
			if ((info.fsStyle & OS.BTNS_SEP) != 0) {
				changed = true;
				info.fsStyle &= ~OS.BTNS_SEP;
				info.fsStyle |= OS.BTNS_BUTTON;
				info.fsState &= ~OS.TBSTATE_ENABLED;
				info.dwMask |= OS.TBIF_IMAGE;
				info.iImage = OS.I_IMAGENONE;
			}
		}
		if (changed) {
			OS.SendMessage (hwnd, OS.TB_SETBUTTONINFO, id, info);
			/*
			* Bug in Windows.  When TB_SETBUTTONINFO changes the
			* style of a tool item from BTNS_SEP to BTNS_BUTTON
			* and the tool bar is wrapped, the tool bar does not
			* redraw properly.  Windows uses separator items as
			* wrap points and sometimes draws etching above or
			* below and entire row.  The fix is to redraw the
			* tool bar.
			*-/
			if (OS.SendMessage (hwnd, OS.TB_GETROWS, 0, 0) > 1) {
				OS.InvalidateRect (hwnd, null, true);
			}
		}
		*/
	}
	resizeControl ();
}

/**
 * Enables the receiver if the argument is <code>true</code>,
 * and disables it otherwise.
 * <p>
 * A disabled control is typically
 * not selectable from the user interface and draws with an
 * inactive or "grayed" look.
 * </p>
 *
 * @param enabled the new enabled state
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setEnabled (boolean enabled) {
	checkWidget();
	/*
	int hwnd = parent.handle;
	int fsState = OS.SendMessage (hwnd, OS.TB_GETSTATE, id, 0);
	/*
	* Feature in Windows.  When TB_SETSTATE is used to set the
	* state of a tool item, the item redraws even when the state
	* has not changed.  The fix is to detect this case and avoid
	* setting the state. 
	*-/
	if (((fsState & OS.TBSTATE_ENABLED) != 0) == enabled) return;
	if (enabled) {
		fsState |= OS.TBSTATE_ENABLED;
		state &= ~DISABLED;
	} else {
		fsState &= ~OS.TBSTATE_ENABLED;
		state |= DISABLED;
	}
	OS.SendMessage (hwnd, OS.TB_SETSTATE, id, fsState);
	*/
	OS.updateCSSClass(handle, "tool-item-disabled", !enabled);
	if (image != null) updateImages (enabled && parent.getEnabled ());
}

/**
 * Sets the receiver's disabled image to the argument, which may be
 * null indicating that no disabled image should be displayed.
 * <p>
 * The disbled image is displayed when the receiver is disabled.
 * </p>
 *
 * @param image the disabled image to display on the receiver (may be null)
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_INVALID_ARGUMENT - if the image has been disposed</li> 
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setDisabledImage (Image image) {
	checkWidget();
	if ((style & SWT.SEPARATOR) != 0) return;
	if (image != null && image.isDisposed()) error(SWT.ERROR_INVALID_ARGUMENT);
	disabledImage = image;
	updateImages (getEnabled () && parent.getEnabled ());
}

/**
 * Sets the receiver's hot image to the argument, which may be
 * null indicating that no hot image should be displayed.
 * <p>
 * The hot image is displayed when the mouse enters the receiver.
 * </p>
 *
 * @param image the hot image to display on the receiver (may be null)
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_INVALID_ARGUMENT - if the image has been disposed</li> 
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setHotImage (Image image) {
	checkWidget();
	if ((style & SWT.SEPARATOR) != 0) return;
	if (image != null && image.isDisposed()) error(SWT.ERROR_INVALID_ARGUMENT);
	hotImage = image;
	updateImages (getEnabled () && parent.getEnabled ());
}

public void setImage (Image image) {
	checkWidget();
	if ((style & SWT.SEPARATOR) != 0) return;
	if (image != null && image.isDisposed()) error(SWT.ERROR_INVALID_ARGUMENT);
	super.setImage (image);
	parent.imgMaxHeight = 0;
	parent.imgMaxWidth = 0;
	parent.containsImage = this.image != null;
	if (!parent.containsImage) {
		for (int i = 0; i < parent.items.length; i++) {
			if (parent.items[i].image != null) {
				parent.containsImage = true;
				break;
			}
		}
	}
	updateImages (getEnabled () && parent.getEnabled ());
}

boolean setRadioSelection (boolean value) {
	if ((style & SWT.RADIO) == 0) return false;
	if (getSelection () != value) {
		setSelection (value);
		postEvent (SWT.Selection);
	}
	return true;
}

/**
 * Sets the selection state of the receiver.
 * <p>
 * When the receiver is of type <code>CHECK</code> or <code>RADIO</code>,
 * it is selected when it is checked (which some platforms draw as a
 * pushed in button).
 * </p>
 *
 * @param selected the new selection state
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setSelection (boolean selected) {
	checkWidget();
	if ((style & (SWT.CHECK | SWT.RADIO)) == 0) return;
	/*
	int hwnd = parent.handle;
	int fsState = OS.SendMessage (hwnd, OS.TB_GETSTATE, id, 0);
	/*
	* Feature in Windows.  When TB_SETSTATE is used to set the
	* state of a tool item, the item redraws even when the state
	* has not changed.  The fix is to detect this case and avoid
	* setting the state. 
	*-/
	if (((fsState & OS.TBSTATE_CHECKED) != 0) == selected) return;
	if (selected) {
		fsState |= OS.TBSTATE_CHECKED;
	} else {
		fsState &= ~OS.TBSTATE_CHECKED;
	}
	OS.SendMessage (hwnd, OS.TB_SETSTATE, id, fsState);
	*/
	
	OS.updateCSSClass(handle, "tool-item-selected", selected);
	
	/*
	* Bug in Windows.  When a tool item with the style
	* BTNS_CHECK or BTNS_CHECKGROUP is selected and then
	* disabled, the item does not draw using the disabled
	* image.  The fix is to use the disabled image in all
	* image lists.
	* 
	* NOTE: This means that the image list must be updated
	* when the selection changes in a disabled tool item.
	*/
	if ((style & (SWT.CHECK | SWT.RADIO)) != 0) {
		if (!getEnabled () || !parent.getEnabled ()) {
			updateImages (false);
		}
	}
}

/**
 * Sets the receiver's text. The string may include
 * the mnemonic character.
 * </p>
 * <p>
 * Mnemonics are indicated by an '&amp' that causes the next
 * character to be the mnemonic.  When the user presses a
 * key sequence that matches the mnemonic, a selection
 * event occurs. On most platforms, the mnemonic appears
 * underlined but may be emphasised in a platform specific
 * manner.  The mnemonic indicator character '&amp' can be
 * escaped by doubling it in the string, causing a single
 *'&amp' to be displayed.
 * </p>
 * 
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
public void setText (String string) {
	checkWidget();
	if (string == null) error (SWT.ERROR_NULL_ARGUMENT);
	if ((style & SWT.SEPARATOR) != 0) return;
	super.setText (string);
	cachedTextHeight = 0;
	cachedTextWidth = 0;
	parent.txtMaxHeight = 0;
	parent.txtMaxWidth = 0;
	parent.containsText = string != null && string.length() != 0;
	if (!parent.containsText) {
		for (int i = 0; i < parent.items.length; i++) {
			String txt = parent.items[i].text;
			if (txt != null && txt.length() != 0) {
				parent.containsImage = true;
				break;
			}
		}
	}
	/*
	int hwnd = parent.handle;
	int hHeap = OS.GetProcessHeap ();
	TCHAR buffer = new TCHAR (parent.getCodePage (), string, true);
	int byteCount = buffer.length () * TCHAR.sizeof;
	int pszText = OS.HeapAlloc (hHeap, OS.HEAP_ZERO_MEMORY, byteCount);
	OS.MoveMemory (pszText, buffer, byteCount); 
	TBBUTTONINFO info = new TBBUTTONINFO ();
	info.cbSize = TBBUTTONINFO.sizeof;
	info.dwMask = OS.TBIF_TEXT | OS.TBIF_STYLE;
	info.pszText = pszText;
	info.fsStyle = (byte) (widgetStyle () | OS.BTNS_AUTOSIZE);
	if (string.length () != 0) info.fsStyle |= OS.BTNS_SHOWTEXT;
	OS.SendMessage (hwnd, OS.TB_SETBUTTONINFO, id, info);
	OS.HeapFree (hHeap, 0, pszText);

	/*
	* Bug in Windows.  For some reason, when the font is set
	* before any tool item has text, the tool items resize to
	* a very small size.  Also, a tool item will only show text
	* when text has already been set on one item and then a new
	* item is created.  The fix is to use WM_SETFONT to force
	* the tool bar to redraw and layout.
	*-/
	int hFont = OS.SendMessage (hwnd, OS.WM_GETFONT, 0, 0);
	OS.SendMessage (hwnd, OS.WM_SETFONT, hFont, 0);
	*/
		
	if (handle != null) {
		Element textEl = null;
		if (handle.childNodes.length == 0) {
			textEl = document.createElement("DIV");
			textEl.className = "tool-item-text";
			handle.appendChild(textEl);
		} else {
			if (OS.existedCSSClass(handle.childNodes[0], "tool-item-text")) {
				textEl = handle.childNodes[0];
			} else {
				textEl = document.createElement("DIV");
				textEl.className = "tool-item-text";
				handle.insertBefore(textEl, handle.childNodes[0]);
			}
			OS.clearChildren(textEl);
		}
		textEl.appendChild(document.createTextNode(string));
		
		OS.setTextSelection(textEl, false);
	}
	
	parent.layoutItems ();
}

/**
 * Sets the receiver's tool tip text to the argument, which
 * may be null indicating that no tool tip text should be shown.
 *
 * @param string the new tool tip text (or null)
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setToolTipText (String string) {
	checkWidget();
	toolTipText = string;
}

/**
 * Sets the width of the receiver, for <code>SEPARATOR</code> ToolItems.
 *
 * @param width the new width
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setWidth (int width) {
	checkWidget();
	if ((style & SWT.SEPARATOR) == 0) return;
	if (width < 0) return;
	seperatorWidth = width;
	/*
	int hwnd = parent.handle;
	TBBUTTONINFO info = new TBBUTTONINFO ();
	info.cbSize = TBBUTTONINFO.sizeof;
	info.dwMask = OS.TBIF_SIZE;
	info.cx = (short) width;
	OS.SendMessage (hwnd, OS.TB_SETBUTTONINFO, id, info);
	*/
	parent.layoutItems ();
}

void updateImages (boolean enabled) {
	if (image != null) {
		OS.addCSSClass(parent.handle, "tool-item-enable-image");
		OS.addCSSClass(handle, "tool-item-enable-image");
	} else {
		boolean existedImage = false;
		for (int i = 0; i < parent.items.length; i++) {
			if (parent.items[i].image != null) {
				existedImage = true;
				break;
			}
		}
		if (!existedImage) {
			OS.removeCSSClass(parent.handle, "tool-item-enable-image");
		}
		OS.removeCSSClass(handle, "tool-item-enable-image");
	}
	if (image != null) {
		if (this.image.handle == null && this.image.url != null && this.image.url.length() != 0) {
			CSSStyle handleStyle = handle.style;
			if (OS.isIENeedPNGFix && image.url.toLowerCase().endsWith(".png") && handleStyle.filter != null) {
				handleStyle.backgroundImage = "";
				handleStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
			} else {
				if (OS.isIENeedPNGFix && handleStyle.filter != null) handleStyle.filter = ""; 
				handleStyle.backgroundImage = "url(\"" + this.image.url + "\")";
			}
		}
	} else {
		CSSStyle handleStyle = handle.style;
		if (OS.isIENeedPNGFix && handleStyle.filter != null) handleStyle.filter = ""; 
		handleStyle.backgroundImage = "";
	}
	/*
	int hwnd = parent.handle;
	TBBUTTONINFO info = new TBBUTTONINFO ();
	info.cbSize = TBBUTTONINFO.sizeof;
	info.dwMask = OS.TBIF_IMAGE;
	OS.SendMessage (hwnd, OS.TB_GETBUTTONINFO, id, info);
	if (info.iImage == OS.I_IMAGENONE && image == null) return;
	ImageList imageList = parent.getImageList ();
	ImageList hotImageList = parent.getHotImageList ();
	ImageList disabledImageList = parent.getDisabledImageList();
	if (info.iImage == OS.I_IMAGENONE) {
		Rectangle bounds = image.getBounds ();
		int listStyle = parent.style & SWT.RIGHT_TO_LEFT;
		if (imageList == null) {
			imageList = display.getImageListToolBar (listStyle, bounds.width, bounds.height);
		}
		if (disabledImageList == null) {
			disabledImageList = display.getImageListToolBarDisabled (listStyle, bounds.width, bounds.height);
		}
		if (hotImageList == null) {
			hotImageList = display.getImageListToolBarHot (listStyle, bounds.width, bounds.height);
		}
		Image disabled = disabledImage;
		if (disabledImage == null) {
			if (disabledImage2 != null) disabledImage2.dispose ();
			disabledImage2 = null;
			disabled = image;
			if (!enabled) {
				Color color = parent.getBackground ();
				disabled = disabledImage2 = createDisabledImage (image, color);
			}
		}
		/*
		* Bug in Windows.  When a tool item with the style
		* BTNS_CHECK or BTNS_CHECKGROUP is selected and then
		* disabled, the item does not draw using the disabled
		* image.  The fix is to assign the disabled image in
		* all image lists.
		*-/
		Image image2 = image, hot = hotImage;
		if ((style & (SWT.CHECK | SWT.RADIO)) != 0) {
			if (!enabled) image2 = hot = disabled;
		}
		info.iImage = imageList.add (image2);
		disabledImageList.add (disabled);
		hotImageList.add (hot != null ? hot : image2);
		parent.setImageList (imageList);
		parent.setDisabledImageList (disabledImageList);
		parent.setHotImageList (hotImageList);
	} else {
		Image disabled = null;
		if (disabledImageList != null) {
			if (image != null) {
				if (disabledImage2 != null) disabledImage2.dispose ();
				disabledImage2 = null;
				disabled = disabledImage;
				if (disabledImage == null) {
					disabled = image;
					if (!enabled) {
						Color color = parent.getBackground ();
						disabled = disabledImage2 = createDisabledImage (image, color);
					}
				}
			}
			disabledImageList.put (info.iImage, disabled);
		}
		/*
		* Bug in Windows.  When a tool item with the style
		* BTNS_CHECK or BTNS_CHECKGROUP is selected and then
		* disabled, the item does not draw using the disabled
		* image.  The fix is to use the disabled image in all
		* image lists.
		*-/
		Image image2 = image, hot = hotImage;
		if ((style & (SWT.CHECK | SWT.RADIO)) != 0) {
			if (!enabled) image2 = hot = disabled;
		}
		if (imageList != null) imageList.put (info.iImage, image2);
		if (hotImageList != null) {
			hotImageList.put (info.iImage, hot != null ? hot : image2);
		}
		if (image == null) info.iImage = OS.I_IMAGENONE;
	}

	/*
	* Bug in Windows.  If the width of an item has already been
	* calculated, the tool bar control will not recalculate it to 
	* include the space for the image.  The fix is to set the width
	* to zero, forcing the control recalculate the width for the item.
	*-/
	info.dwMask |= OS.TBIF_SIZE;
	info.cx = 0;	
	OS.SendMessage (hwnd, OS.TB_SETBUTTONINFO, id, info);
	*/
	parent.layoutItems ();
}

/*
int widgetStyle () {
	if ((style & SWT.DROP_DOWN) != 0) return OS.BTNS_DROPDOWN;
	if ((style & SWT.PUSH) != 0) return OS.BTNS_BUTTON;
	if ((style & SWT.CHECK) != 0) return OS.BTNS_CHECK;
	/*
	* This code is intentionally commented.  In order to
	* consistently support radio tool items across platforms,
	* the platform radio behavior is not used.
	*-/
//	if ((style & SWT.RADIO) != 0) return OS.BTNS_CHECKGROUP;
	if ((style & SWT.RADIO) != 0) return OS.BTNS_CHECK;
	if ((style & SWT.SEPARATOR) != 0) return OS.BTNS_SEP;
	return OS.BTNS_BUTTON;
}

LRESULT wmCommandChild (int wParam, int lParam) {
	if ((style & SWT.RADIO) != 0) {
		if ((parent.getStyle () & SWT.NO_RADIO_GROUP) == 0) {
			selectRadio ();
		}
	}
	postEvent (SWT.Selection);
	return null;
}
*/
}
