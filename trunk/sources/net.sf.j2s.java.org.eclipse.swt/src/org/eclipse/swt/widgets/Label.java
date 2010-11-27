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
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.xhtml.CSSStyle;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;

/**
 * Instances of this class represent a non-selectable
 * user interface object that displays a string or image.
 * When SEPARATOR is specified, displays a single
 * vertical or horizontal line.
 * <dl>
 * <dt><b>Styles:</b></dt>
 * <dd>SEPARATOR, HORIZONTAL, VERTICAL</dd>
 * <dd>SHADOW_IN, SHADOW_OUT, SHADOW_NONE</dd>
 * <dd>CENTER, LEFT, RIGHT, WRAP</dd>
 * <dt><b>Events:</b></dt>
 * <dd>(none)</dd>
 * </dl>
 * <p>
 * Note: Only one of SHADOW_IN, SHADOW_OUT and SHADOW_NONE may be specified.
 * SHADOW_NONE is a HINT. Only one of HORIZONTAL and VERTICAL may be specified.
 * Only one of CENTER, LEFT and RIGHT may be specified.
 * </p><p>
 * IMPORTANT: This class is intended to be subclassed <em>only</em>
 * within the SWT implementation.
 * </p>
 * 
 * @j2sPrefix
 * $WTC$$.registerCSS ("$wt.widgets.Label");
 */
public class Label extends Control {
	String text = "";
	boolean textSizeCached = false;
	int textWidthCached, textHeightCached;
	private String lastColor;
	
	Image image, image2;
	/*
	int font, hCopiedBitmap;
	static final int LabelProc;
	static final TCHAR LabelClass = new TCHAR (0, "STATIC", true);
	static final int ICON_WIDTH = 128, ICON_HEIGHT = 128;
	static {
		WNDCLASS lpWndClass = new WNDCLASS ();
		OS.GetClassInfo (0, LabelClass, lpWndClass);
		LabelProc = lpWndClass.lpfnWndProc;
	}
	*/

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
 * @see SWT#SEPARATOR
 * @see SWT#HORIZONTAL
 * @see SWT#VERTICAL
 * @see SWT#SHADOW_IN
 * @see SWT#SHADOW_OUT
 * @see SWT#SHADOW_NONE
 * @see SWT#CENTER
 * @see SWT#LEFT
 * @see SWT#RIGHT
 * @see SWT#WRAP
 * @see Widget#checkSubclass
 * @see Widget#getStyle
 * 
 * @j2sIgnore
 */
public Label (Composite parent, int style) {
	super (parent, checkStyle (style));
}

/*
void _setImage (Image image) {
	if (image2 != null) image2.dispose ();
	image2 = null;
	if (hCopiedBitmap != 0) OS.DeleteObject (hCopiedBitmap);
	hCopiedBitmap = 0;
	boolean hasAlpha = false;
	int hImage = 0, imageBits = 0, fImageType = 0;
	if (image != null) {
		switch (image.type) {
			case SWT.BITMAP: {
				ImageData data = image.getImageData ();
				if (OS.COMCTL32_MAJOR < 6) {
					Rectangle rect = image.getBounds ();
					switch (data.getTransparencyType ()) {
						case SWT.TRANSPARENCY_PIXEL: 
							if (rect.width <= ICON_WIDTH && rect.height <= ICON_HEIGHT) {
								image2 = new Image (display, data, data.getTransparencyMask ());
								hImage = image2.handle;
								imageBits = OS.SS_ICON;
								fImageType = OS.IMAGE_ICON;
								break;
							}
							//FALL THROUGH
						case SWT.TRANSPARENCY_ALPHA:
							image2 = new Image (display, rect.width, rect.height);
							GC gc = new GC (image2);
							gc.setBackground (getBackground ());
							gc.fillRectangle (rect);
							gc.drawImage (image, 0, 0);
							gc.dispose ();
							hImage = image2.handle;
							imageBits = OS.SS_BITMAP;
							fImageType = OS.IMAGE_BITMAP;
							break;
						case SWT.TRANSPARENCY_NONE:
							hImage = image.handle;
							imageBits = OS.SS_BITMAP;
							fImageType = OS.IMAGE_BITMAP;
							break;
					}
				} else {
					if (data.alpha != -1 || data.alphaData != null || data.transparentPixel != -1) {
						hasAlpha = true;
						hImage = Display.create32bitDIB (image.handle, data.alpha, data.alphaData, data.transparentPixel);
					} else {
						hImage = image.handle;
						/*
						* Bug in Windows.  For some reason in Windows XP only, indexed palette
						* bitmaps are not drawn properly even though the screen depth can
						* handle all colors in the palette.  The fix is to use a higher depth
						* bitmap instead.
						*-/
						if (data.depth <= 8 && display.getDepth () > 8) {
							image2 = new Image (display, data.width, data.height);
							GC gc = new GC (image2);
							gc.drawImage (image, 0, 0);
							gc.dispose ();
							hImage = image2.handle;
						}
					}
					imageBits = OS.SS_BITMAP;
					fImageType = OS.IMAGE_BITMAP;
				}
				break;
			}
			case SWT.ICON: {
				hImage = image.handle;
				imageBits = OS.SS_ICON;
				fImageType = OS.IMAGE_ICON;
				break;
			}
		}
	}
	RECT rect = new RECT ();
	OS.GetWindowRect (handle, rect);
	int newBits = OS.GetWindowLong (handle, OS.GWL_STYLE);
	int oldBits = newBits;
	newBits &= ~(OS.SS_BITMAP | OS.SS_ICON);
	newBits |= imageBits | OS.SS_REALSIZEIMAGE | OS.SS_CENTERIMAGE;
	if (newBits != oldBits) {
		OS.SetWindowLong (handle, OS.GWL_STYLE, newBits);
	}
	OS.SendMessage (handle, OS.STM_SETIMAGE, fImageType, hImage);
	
	/*
	* When STM_SETIMAGE encounters a bitmap with alpha information,
	* it makes a copy of the bitmap.  Therefore the bitmap that was
	* created to preserve transparency can be deleted right away.
	* 
	* Note: The client code also needs to delete the copied image
	* created by Windows when the image changed but does not need
	* to delete the copied image when the control is disposed.
	*-/
	if (hasAlpha && hImage != 0) {
		OS.DeleteObject (hImage);
		hCopiedBitmap = OS.SendMessage (handle, OS.STM_GETIMAGE, OS.IMAGE_BITMAP, 0);
	}

	/*
	* Feature in Windows.  When STM_SETIMAGE is used to set the
	* image for a static control, Windows either streches the image
	* to fit the control or shrinks the control to fit the image.
	* While not stricly wrong, neither of these is desirable.
	* The fix is to stop Windows from stretching the image by
	* using SS_REALSIZEIMAGE and SS_CENTERIMAGE, allow Windows
	* to shrink the control, and then restore the control to the
	* original size.
	*-/
	int flags = OS.SWP_NOZORDER | OS.SWP_DRAWFRAME | OS.SWP_NOACTIVATE | OS.SWP_NOMOVE;
	SetWindowPos (handle, 0, 0, 0, rect.right - rect.left, rect.bottom - rect.top, flags);
	OS.InvalidateRect (handle, null, true);
}

int callWindowProc (int hwnd, int msg, int wParam, int lParam) {
	if (handle == 0) return 0;
	return OS.CallWindowProc (LabelProc, hwnd, msg, wParam, lParam);
}
*/
static int checkStyle (int style) {
	style |= SWT.NO_FOCUS;
	if ((style & SWT.SEPARATOR) != 0) {
		style = checkBits (style, SWT.VERTICAL, SWT.HORIZONTAL, 0, 0, 0, 0);
		return checkBits (style, SWT.SHADOW_OUT, SWT.SHADOW_IN, SWT.SHADOW_NONE, 0, 0, 0);
	} 
	return checkBits (style, SWT.LEFT, SWT.CENTER, SWT.RIGHT, 0, 0, 0);
}

public Point computeSize (int wHint, int hHint, boolean changed) {
	checkWidget ();
	int width = 0, height = 0;
	int border = getBorderWidth ();
	if ((style & SWT.SEPARATOR) != 0) {
		//int lineWidth = OS.GetSystemMetrics (OS.SM_CXBORDER);
		int lineWidth = 1;
		if ((style & SWT.HORIZONTAL) != 0) {
			width = DEFAULT_WIDTH;  height = lineWidth * 2;
		} else {
			width = lineWidth * 2; height = DEFAULT_HEIGHT;
		}
		if (wHint != SWT.DEFAULT) width = wHint;
		if (hHint != SWT.DEFAULT) height = hHint;
		width += border * 2; height += border * 2;
		return new Point (width, height);
	}
	/*
	* NOTE: SS_BITMAP and SS_ICON are not single bit
	* masks so it is necessary to test for all of the
	* bits in these masks.
	*/
	/*
	int bits = OS.GetWindowLong (handle, OS.GWL_STYLE);
	boolean isBitmap = (bits & OS.SS_BITMAP) == OS.SS_BITMAP;
	boolean isIcon = (bits & OS.SS_ICON) == OS.SS_ICON;
	if (isBitmap || isIcon) {
		if (image != null) {
			Rectangle rect = image.getBounds();
			width = rect.width;
			height = rect.height;
		}
	} else {
		int hDC = OS.GetDC (handle);
		int newFont = OS.SendMessage (handle, OS.WM_GETFONT, 0, 0);
		int oldFont = OS.SelectObject (hDC, newFont);
		RECT rect = new RECT ();
		int flags = OS.DT_CALCRECT | OS.DT_EDITCONTROL | OS.DT_EXPANDTABS;
		if ((style & SWT.WRAP) != 0 && wHint != SWT.DEFAULT) {
			flags |= OS.DT_WORDBREAK;
			rect.right = wHint;
		}
		int length = OS.GetWindowTextLength (handle);
		TCHAR buffer = new TCHAR (getCodePage (), length + 1);
		OS.GetWindowText (handle, buffer, length + 1);
		OS.DrawText (hDC, buffer, length, rect, flags);
		width = rect.right - rect.left;
		height = rect.bottom - rect.top;
		if (height == 0) {
			TEXTMETRIC tm = OS.IsUnicode ? (TEXTMETRIC) new TEXTMETRICW () : new TEXTMETRICA ();
			OS.GetTextMetrics (hDC, tm);
			height = tm.tmHeight;
		}
		if (newFont != 0) OS.SelectObject (hDC, oldFont);
		OS.ReleaseDC (handle, hDC);
	}
	*/
	if (text != null) {
		if ((style & SWT.WRAP) != 0 && wHint != SWT.DEFAULT && hHint == SWT.DEFAULT) {
			height = OS.getStringStyledWrappedHeight(text, "label-default", handle.style.cssText, wHint);
		} else {
			if (!textSizeCached || changed) {
				Point cssSize = OS.getStringStyledSize(text, "label-default", handle.style.cssText);
				textSizeCached = true;
				textWidthCached = cssSize.x;
				textHeightCached = cssSize.y;
			}
			width = textWidthCached;
			height = textHeightCached;
		}
	}
	if (image != null) {
		Point imageSize = OS.getImageSize(image);
		width += imageSize.x;
		height = Math.max(imageSize.y, height);
	}
	if (wHint != SWT.DEFAULT) width = wHint;
	if (hHint != SWT.DEFAULT) height = hHint;
	width += border * 2; height += border * 2;
	/* 
	* Feature in WinCE PPC.  Text labels have a trim
	* of one pixel wide on the right and left side.
	* The fix is to increase the size.
	*/
//	if (OS.IsWinCE) {
//		if (!isBitmap && !isIcon) width += 2;
//	}
	return new Point (width, height);
}

/**
 * Returns a value which describes the position of the
 * text or image in the receiver. The value will be one of
 * <code>LEFT</code>, <code>RIGHT</code> or <code>CENTER</code>
 * unless the receiver is a <code>SEPARATOR</code> label, in 
 * which case, <code>NONE</code> is returned.
 *
 * @return the alignment 
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public int getAlignment () {
	checkWidget ();
	if ((style & SWT.SEPARATOR) != 0) return 0;
	if ((style & SWT.LEFT) != 0) return SWT.LEFT;
	if ((style & SWT.CENTER) != 0) return SWT.CENTER;
	if ((style & SWT.RIGHT) != 0) return SWT.RIGHT;
	return SWT.LEFT;
}

/**
 * Returns the receiver's image if it has one, or null
 * if it does not.
 *
 * @return the receiver's image
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public Image getImage () {
	checkWidget ();
	return image;
}

String getNameText () {
	return getText ();
}

/**
 * Returns the receiver's text, which will be an empty
 * string if it has never been set or if the receiver is
 * a <code>SEPARATOR</code> label.
 *
 * @return the receiver's text
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public String getText () {
	checkWidget ();
	if ((style & SWT.SEPARATOR) != 0) return "";
	return text;
}

/*
* Not currently used.
*/
/*
boolean getWrap () {
	int bits = OS.GetWindowLong (handle, OS.GWL_STYLE);
	if ((bits & (OS.SS_RIGHT | OS.SS_CENTER)) != 0) return true;
	if ((bits & OS.SS_LEFTNOWORDWRAP) != 0) return false;
	return true;
}

boolean mnemonicHit (char key) {
	Composite control = this.parent;
	while (control != null) {
		Control [] children = control._getChildren ();
		int index = 0;
		while (index < children.length) {
			if (children [index] == this) break;
			index++;
		}
		index++;
		if (index < children.length) {
			if (children [index].setFocus ()) return true;
		}
		control = control.parent;
	}
	return false;
}

boolean mnemonicMatch (char key) {
	char mnemonic = findMnemonic (getText ());
	if (mnemonic == '\0') return false;
	return Character.toUpperCase (key) == Character.toUpperCase (mnemonic);
}
*/

void releaseWidget () {
	super.releaseWidget ();
	if (image2 != null) image2.dispose ();
	image2 = null;
	text = null;
	image = null;

	/* Windows deletes the copied image when the control is disposed */
	//hCopiedBitmap = 0;
}

/**
 * Controls how text and images will be displayed in the receiver.
 * The argument should be one of <code>LEFT</code>, <code>RIGHT</code>
 * or <code>CENTER</code>.  If the receiver is a <code>SEPARATOR</code>
 * label, the argument is ignored and the alignment is not changed.
 *
 * @param alignment the new alignment 
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setAlignment (int alignment) {
	checkWidget ();
	if ((style & SWT.SEPARATOR) != 0) return;
	if ((alignment & (SWT.LEFT | SWT.RIGHT | SWT.CENTER)) == 0) return;
	style &= ~(SWT.LEFT | SWT.RIGHT | SWT.CENTER);
	style |= alignment & (SWT.LEFT | SWT.RIGHT | SWT.CENTER);
	if ((style & SWT.LEFT) != 0) {
		handle.style.textAlign = "left";
		if (image != null) {
			if (image.packedURL == null) {
				handle.style.backgroundPosition = "left center";
			} else {
				updatePackedImagePosition(width, height);
			}
		}
	} else if ((style & SWT.CENTER) != 0) {
		handle.style.textAlign = "center";
		if (image != null) {
			if (image.packedURL == null) {
				handle.style.backgroundPosition = "center center";
			} else {
				updatePackedImagePosition(width, height);
			}
		}
	} else if ((style & SWT.RIGHT) != 0) {
		handle.style.textAlign = "right";
		if (image != null) {
			if (image.packedURL == null) {
				handle.style.backgroundPosition = "right center";
			} else {
				updatePackedImagePosition(width, height);
			}
		}
	}
	/*
	int bits = OS.GetWindowLong (handle, OS.GWL_STYLE);
	/*
	* Feature in Windows.  The windows label does not align
	* the bitmap or icon.  Any attempt to set alignment bits
	* such as SS_CENTER cause the label to display text.  The
	* fix is to disallow alignment.
	*
	* NOTE: SS_BITMAP and SS_ICON are not single bit
	* masks so it is necessary to test for all of the
	* bits in these masks.
	*-/
	if ((bits & OS.SS_BITMAP) == OS.SS_BITMAP) return;
	if ((bits & OS.SS_ICON) == OS.SS_ICON) return;
	//bits &= ~(OS.SS_LEFTNOWORDWRAP | OS.SS_CENTER | OS.SS_RIGHT);
	if ((style & SWT.LEFT) != 0 && (style & SWT.WRAP) == 0) {
		bits |= OS.SS_LEFTNOWORDWRAP;
	}
	if ((style & SWT.CENTER) != 0) bits |= OS.SS_CENTER;
	if ((style & SWT.RIGHT) != 0) bits |= OS.SS_RIGHT;
	OS.SetWindowLong (handle, OS.GWL_STYLE, bits);
	OS.InvalidateRect (handle, null, true);
	*/
}

/**
 * Sets the receiver's image to the argument, which may be
 * null indicating that no image should be displayed.
 *
 * @param image the image to display on the receiver (may be null)
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_INVALID_ARGUMENT - if the image has been disposed</li> 
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setImage (Image image) {
	checkWidget ();
	if ((style & SWT.SEPARATOR) != 0) return;
	if (image != null && image.isDisposed()) error(SWT.ERROR_INVALID_ARGUMENT);
	//_setImage (this.image = image);
	this.image = image;
	if (image == null) {
		handle.style.backgroundImage = "";
		handle.style.backgroundPosition = "";
		if (OS.isIENeedPNGFix && handle.style.filter != null) {
			handle.style.filter = "";
		}
		return;
	}
	if (this.image.handle == null && this.image.url != null && this.image.url.length() != 0) {
		CSSStyle handleStyle = handle.style;
		if (OS.isIENeedPNGFix && image.url.toLowerCase().endsWith(".png") && handleStyle.filter != null) {
//				Element imgBackground = document.createElement("DIV");
//				imgBackground.style.position = "absolute";
//				imgBackground.style.width = "100%";
//				imgBackground.style.height = "100%";
//				imgBackground.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
//				handle.appendChild(imgBackground);
			handleStyle.backgroundImage = "";
			handleStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"" + this.image.url + "\", sizingMethod=\"image\")";
		} else {
			if (OS.isIENeedPNGFix && handleStyle.filter != null) handleStyle.filter = ""; 
			handleStyle.backgroundRepeat = "no-repeat";
			if (this.image.packedURL != null) {
				handleStyle.backgroundImage = "url(\"" + this.image.packedURL + "\")";
				//handleStyle.backgroundPosition = "-" + this.image.packedOffsetX + "px -" + this.image.packedOffsetY + "px";
				updatePackedImagePosition(width, height);
			} else {
				handleStyle.backgroundPosition = "left center";
				handleStyle.backgroundImage = "url(\"" + this.image.url + "\")";
			}
		}
	} else if (handle.childNodes.length == 0) {
		if (image.handle == null) return ;
		for (int i = 0; i < image.handle.childNodes.length; i++) {
			handle.appendChild(image.handle.childNodes[i]);
		}
	} else {
		if (image.handle == null) return ;
		Element txt = handle.childNodes[0];
		for (int i = 0; i < image.handle.childNodes.length; i++) {
			handle.insertBefore(image.handle.childNodes[i], txt);
		}
	}
}

/**
 * Sets the receiver's text.
 * <p>
 * This method sets the widget label.  The label may include
 * the mnemonic character and line delimiters.
 * </p>
 * <p>
 * Mnemonics are indicated by an '&amp' that causes the next
 * character to be the mnemonic.  When the user presses a
 * key sequence that matches the mnemonic, focus is assigned
 * to the control that follows the label. On most platforms,
 * the mnemonic appears underlined but may be emphasised in a
 * platform specific manner.  The mnemonic indicator character
 *'&amp' can be escaped by doubling it in the string, causing
 * a single '&amp' to be displayed.
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
	checkWidget ();
	if (string == null) error (SWT.ERROR_NULL_ARGUMENT);
	if ((style & SWT.SEPARATOR) != 0) return;
	/*
	* Feature in Windows.  For some reason, SetWindowText() for
	* static controls redraws the control, even when the text has
	* has not changed.  The fix is to check for this case and do
	* nothing.
	*/
	//if (string.equals (text)) return;
	if (image != null) {
		handle.style.backgroundImage = "";
		if (OS.isIE && image.url != null && image.url.toLowerCase().endsWith(".png")
				&& handle.style.filter != null) {
			handle.style.filter = "";
		}
	}
	if (string == text) {
		return ;
	}
	textSizeCached = false;
	text = string;
	OS.clearChildren(handle);
	OS.insertText(handle, text);
	/*
	int newBits = OS.GetWindowLong (handle, OS.GWL_STYLE), oldBits = newBits;
	newBits &= ~(OS.SS_BITMAP | OS.SS_ICON | OS.SS_REALSIZEIMAGE | OS.SS_CENTERIMAGE);
	if ((style & SWT.LEFT) != 0 && (style & SWT.WRAP) == 0) newBits |= OS.SS_LEFTNOWORDWRAP;
	if ((style & SWT.CENTER) != 0) newBits |= OS.SS_CENTER;
	if ((style & SWT.RIGHT) != 0) newBits |= OS.SS_RIGHT;
	if (newBits != oldBits) {
		/*
		* Bug in Windows.  When the style of a label is SS_BITMAP
		* or SS_ICON, the label does not remember the font that is
		* set in WM_SETFONT.  The fix is to remember the font and
		* return the font in WM_GETFONT and to reset the font when
		* the style is changed from SS_BITMAP or SS_ICON to a style
		* that displays text.
		*-/
		int hFont = OS.SendMessage (handle, OS.WM_GETFONT, 0, 0);
		OS.SetWindowLong (handle, OS.GWL_STYLE, newBits);
		if (hFont != 0) OS.SendMessage (handle, OS.WM_SETFONT, hFont, 0);
	}
	string = Display.withCrLf (string);
	TCHAR buffer = new TCHAR (getCodePage (), string, true);
	OS.SetWindowText (handle, buffer);
	*/
}

/*
* Not currently used.
*/
/*
void setWrap (boolean wrap) {
	int bits = OS.GetWindowLong (handle, OS.GWL_STYLE);
	if ((bits & (OS.SS_RIGHT | OS.SS_CENTER)) != 0) return;
	bits &= ~OS.SS_LEFTNOWORDWRAP;
	if (!wrap) bits |= OS.SS_LEFTNOWORDWRAP;
	OS.SetWindowLong (handle, OS.GWL_STYLE, bits);
	OS.InvalidateRect (handle, null, true);
}

int widgetExtStyle () {
	int bits = super.widgetExtStyle () & ~OS.WS_EX_CLIENTEDGE;
	if ((style & SWT.BORDER) != 0) return bits | OS.WS_EX_STATICEDGE;
	return bits;
}

int widgetStyle () {
	int bits = super.widgetStyle () | OS.SS_NOTIFY;
	if ((style & SWT.SEPARATOR) != 0) return bits | OS.SS_OWNERDRAW;
	if ((style & SWT.CENTER) != 0) return bits | OS.SS_CENTER;
	if ((style & SWT.RIGHT) != 0) return bits | OS.SS_RIGHT;
	if ((style & SWT.WRAP) != 0) return bits | OS.SS_LEFT;
	return bits | OS.SS_LEFTNOWORDWRAP;
}
*/

/* (non-Javadoc)
 * @see org.eclipse.swt.widgets.Control#createHandle()
 */
void createHandle() {
	//super.createHandle();
	
	handle = document.createElement ("DIV");
	handle.className = "label-default";
	if ((style & SWT.SEPARATOR) != 0) {
		/*
		 * IE has a bug of DIV-one pixel height! 
		Element seperator = document.createElement("DIV"); 
		if ((style & SWT.VERTICAL) != 0) {
			seperator.className = "label-seperator-vertical";
		} else {
			seperator.className = "label-seperator-horizontal";
		}
		handle.appendChild(seperator);
		*/
		if ((style & SWT.SHADOW_IN) != 0) {
			handle.className += " shadow-in";
		} else if ((style & SWT.SHADOW_NONE) != 0) {
			handle.className += " shadow-none";
		} else {
			handle.className += " shadow-out";
		}
		handle.style.fontSize = "0";
		Element seperator1 = document.createElement("DIV"); 
		Element seperator2 = document.createElement("DIV"); 
		if ((style & SWT.HORIZONTAL) != 0) {
			seperator1.className = "label-seperator-horizontal-top";
			seperator2.className = "label-seperator-horizontal-bottom";
		} else {
			seperator1.className = "label-seperator-vertical-left";
			seperator2.className = "label-seperator-vertical-right";
		}
		handle.appendChild(seperator1);
		handle.appendChild(seperator2);
	}
	if ((style & SWT.WRAP) != 0) {
		handle.className += " label-wrap";
	}
	if ((style & SWT.BORDER) != 0) {
		handle.className += " label-border";
	}
	if (parent != null) {
		Element parentHandle = parent.containerHandle();
		if (parentHandle!= null) {
			parentHandle.appendChild(handle);
		}
	}
	
	OS.setTextSelection(this.handle, false);
}

@Override
boolean SetWindowPos(Object hWnd, Object hWndInsertAfter, int X, int Y,
		int cx, int cy, int uFlags) {
	if (hWnd == null) return true;
	Element el = (Element) hWnd;
	el.style.left = X + "px";
	el.style.top = Y + "px";
	int width = cx > 0 ? cx : 0;
	el.style.width = width + "px";
	int height = cy > 0 ? cy : 0;
	el.style.height = height + "px";
	
	if ((style & SWT.SEPARATOR) != 0) {
		CSSStyle handleStyle = handle.childNodes[0].style;
		if ((style & SWT.HORIZONTAL) != 0) {
			int h = (height / 2) - 1;
			if (OS.isIE) {
				h--;
			}
			handleStyle.marginTop = h + "px";
			handleStyle.width = width + "px";
			handle.childNodes[1].style.width = width + "px";
		} else {
			handleStyle.marginLeft = ((width / 2) - 1) + "px";
			handleStyle.height = height + "px";
			handle.childNodes[1].style.marginLeft = (width / 2) + "px";
			handle.childNodes[1].style.height = height + "px";
		}
	}
	
	if (image != null && image.packedURL != null) {
		updatePackedImagePosition(cx, cy);
	}
	return true;
}

private void updatePackedImagePosition(int cx, int cy) {
	// FIXME packed image item should be smaller than cx * cy
	if (cx <= 0 || cy <= 0) {
		cx = image.packedItemWidth;
		cy = image.packedItemHeight;
	}
	int y = image.packedOffsetY - (cy - image.packedItemHeight) / 2;
	if ((style & SWT.LEFT) != 0) {
		handle.style.backgroundPosition = "-" + image.packedOffsetX + "px -" + y + "px";
	} else if ((style & SWT.CENTER) != 0) {
		handle.style.backgroundPosition = "-" + (image.packedOffsetX - (cx - image.packedItemWidth) / 2) + "px -" + y + "px";;
	} else if ((style & SWT.RIGHT) != 0) {
		handle.style.backgroundPosition = "-" + (image.packedOffsetX - cx + image.packedItemWidth) + "px -" + y + "px";;
	} else {
		handle.style.backgroundPosition = "-" + image.packedOffsetX + "px -" + y + "px";
	}
}

/* (non-Javadoc)
 * @see org.eclipse.swt.widgets.Control#setEnabled(boolean)
 */
public void setEnabled(boolean enabled) {
	super.setEnabled(enabled);
	if (!enabled) {
		lastColor = handle.style.color; 
		handle.style.color = "gray";
	} else {
		handle.style.color = lastColor;
		lastColor = null;
	}
}

/* (non-Javadoc)
 * @see org.eclipse.swt.widgets.Control#setForeground(org.eclipse.swt.graphics.Color)
 */
public void setForeground(Color color) {
	super.setForeground(color);
	if (lastColor != null) {
		lastColor = handle.style.color;
	}
}

/* (non-Javadoc)
 * @see org.eclipse.swt.widgets.Control#setFont(org.eclipse.swt.graphics.Font)
 */
public void setFont(Font font) {
	textSizeCached = false;
	super.setFont(font);
}

/*
String windowClass() {
	return "DIV";
}

int windowProc () {
	return LabelProc;
}

LRESULT WM_ERASEBKGND (int wParam, int lParam) {
	LRESULT result = super.WM_ERASEBKGND (wParam, lParam);
	if (result != null) return result;
	if ((style & SWT.SEPARATOR) != 0) return LRESULT.ONE;
	/*
	* Bug in Windows.  When a label has the SS_BITMAP
	* or SS_ICON style, the label does not draw the
	* background.  The fix is to draw the background
	* when the label is showing a bitmap or icon.
	*
	* NOTE: SS_BITMAP and SS_ICON are not single bit
	* masks so it is necessary to test for all of the
	* bits in these masks.
	*-/
	int bits = OS.GetWindowLong (handle, OS.GWL_STYLE);
	boolean isBitmap = (bits & OS.SS_BITMAP) == OS.SS_BITMAP;
	boolean isIcon = (bits & OS.SS_ICON) == OS.SS_ICON;
	if (isBitmap || isIcon) {
		drawBackground (wParam);
		return LRESULT.ONE;
	}
	return result;
}

LRESULT WM_GETFONT (int wParam, int lParam) {
	LRESULT result = super.WM_GETFONT (wParam, lParam);
	if (result != null) return result;
	/*
	* Bug in Windows.  When the style of a label is SS_BITMAP
	* or SS_ICON, the label does not remember the font that is
	* set in WM_SETFONT.  The fix is to remember the font and
	* return the font in WM_GETFONT.
	*-/
	if (font == 0) font = defaultFont ();
	return new LRESULT (font);
}

LRESULT WM_SETFONT (int wParam, int lParam) {
	/*
	* Bug in Windows.  When the style of a label is SS_BITMAP
	* or SS_ICON, the label does not remember the font that is
	* set in WM_SETFONT.  The fix is to remember the font and
	* return the font in WM_GETFONT.
	*-/
	return super.WM_SETFONT (font = wParam, lParam);
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
	if ((style & SWT.SEPARATOR) != 0) {
		OS.InvalidateRect (handle, null, true);
		return result;
	}
	
	/*
	* Bug in Windows.  For some reason, a label with
	* SS_BITMAP or SS_ICON and SS_CENTER does not redraw
	* properly when resized.  Only the new area is drawn
	* and the old area is not cleared.  The fix is to
	* force the redraw.
	*
	* NOTE: SS_BITMAP and SS_ICON are not single bit
	* masks so it is necessary to test for all of the
	* bits in these masks.
	*-/
	int bits = OS.GetWindowLong (handle, OS.GWL_STYLE);
	boolean isBitmap = (bits & OS.SS_BITMAP) == OS.SS_BITMAP;
	boolean isIcon = (bits & OS.SS_ICON) == OS.SS_ICON;
	if (isBitmap || isIcon) {
		OS.InvalidateRect (handle, null, true);
		return result;
	}
		
	/*
	* Bug in Windows.  For some reason, a label with
	* style SS_LEFT, SS_CENTER or SS_RIGHT does not
	* redraw the text in the new position when resized.
	* Note that SS_LEFTNOWORDWRAP does not have the
	* problem.  The fix is to force the redraw.
	*-/
	if ((style & (SWT.WRAP | SWT.CENTER | SWT.RIGHT)) != 0) {
		OS.InvalidateRect (handle, null, true);
		return result;
	}
	
	return result;
}

LRESULT wmColorChild (int wParam, int lParam) {
	LRESULT result = super.wmColorChild (wParam, lParam);
	if (OS.COMCTL32_MAJOR >= 6 && OS.IsAppThemed ()) {
		Control control = findThemeControl ();
		if (control != null) {
			OS.SetBkMode (wParam, OS.TRANSPARENT);
			RECT rect = new RECT ();
			OS.GetClientRect (control.handle, rect);
			OS.MapWindowPoints (control.handle, handle, rect, 2);
			control.drawThemeBackground (wParam, rect);
			return new LRESULT (OS.GetStockObject (OS.NULL_BRUSH));
		}
	}
	return result;
}

LRESULT WM_SYSCOLORCHANGE (int wParam, int lParam) {
	LRESULT result = super.WM_SYSCOLORCHANGE (wParam, lParam);
	if (result != null) return result;
	if (image2 != null) _setImage (image);
	return result;
}

LRESULT wmDrawChild (int wParam, int lParam) {
	DRAWITEMSTRUCT struct = new DRAWITEMSTRUCT ();
	OS.MoveMemory (struct, lParam, DRAWITEMSTRUCT.sizeof);
	drawBackground (struct.hDC);
	if ((style & SWT.SHADOW_NONE) != 0) return null;
	RECT rect = new RECT ();
	int lineWidth = OS.GetSystemMetrics (OS.SM_CXBORDER);
	int flags = OS.EDGE_ETCHED;
	if ((style & SWT.SHADOW_IN) != 0) flags = OS.EDGE_SUNKEN;
	if ((style & SWT.HORIZONTAL) != 0) {
		int bottom = struct.top + Math.max (lineWidth * 2, (struct.bottom - struct.top) / 2);
		OS.SetRect (rect, struct.left, struct.top, struct.right, bottom);
		OS.DrawEdge (struct.hDC, rect, flags, OS.BF_BOTTOM);
	} else {
		int right = struct.left + Math.max (lineWidth * 2, (struct.right - struct.left) / 2);
		OS.SetRect (rect, struct.left, struct.top, right, struct.bottom);
		OS.DrawEdge (struct.hDC, rect, flags, OS.BF_RIGHT);
	}
	return null;
}
*/
}
