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
package org.eclipse.swt.custom;

import org.eclipse.swt.*;
import org.eclipse.swt.widgets.*;
import org.eclipse.swt.graphics.*;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;
import org.eclipse.swt.events.*;
//import org.eclipse.swt.accessibility.*;

/**
 * A Label which supports aligned text and/or an image and different border styles.
 * <p>
 * If there is not enough space a CLabel uses the following strategy to fit the 
 * information into the available space:
 * <pre>
 * 		ignores the indent in left align mode
 * 		ignores the image and the gap
 * 		shortens the text by replacing the center portion of the label with an ellipsis
 * 		shortens the text by removing the center portion of the label
 * </pre>
 * <p>
 * <dl>
 * <dt><b>Styles:</b>
 * <dd>LEFT, RIGHT, CENTER, SHADOW_IN, SHADOW_OUT, SHADOW_NONE</dd>
 * <dt><b>Events:</b>
 * <dd></dd>
 * </dl>
 * 
 * </p><p>
 * IMPORTANT: This class is <em>not</em> intended to be subclassed.
 * </p>
 * 
 * @j2sPrefix
 * $WTC$$.registerCSS ("$wt.custom.CLabel");
 */
public class CLabel extends Canvas {

	/** Gap between icon and text */
	private static final int GAP = 5;
	/** Left and right margins */
	private static final int INDENT = 3;
	/** a string inserted in the middle of text that has been shortened */
	private static final String ELLIPSIS = "..."; //$NON-NLS-1$ // could use the ellipsis glyph on some platforms "\u2026"
	/** the alignment. Either CENTER, RIGHT, LEFT. Default is LEFT*/
	private int align = SWT.LEFT;
	private int hIndent = INDENT;
	private int vIndent = INDENT;
	/** the current text */
	private String text;
	/** the current icon */
	private Image image;
	// The tooltip is used for two purposes - the application can set
	// a tooltip or the tooltip can be used to display the full text when the
	// the text has been truncated due to the label being too short.
	// The appToolTip stores the tooltip set by the application.  Control.tooltiptext 
	// contains whatever tooltip is currently being displayed.
	private String appToolTipText;
	
	private Image backgroundImage;
	private Color[] gradientColors;
	private int[] gradientPercents;
	private boolean gradientVertical;
	private Color background;

	private Element imageHandle;
	private Element textHandle;
	private Element bgHandle;
	private Element borderHandle;
	
	private static int DRAW_FLAGS = SWT.DRAW_MNEMONIC | SWT.DRAW_TAB | SWT.DRAW_TRANSPARENT | SWT.DRAW_DELIMITER;

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
 * @param parent a widget which will be the parent of the new instance (cannot be null)
 * @param style the style of widget to construct
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the parent is null</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the parent</li>
 * </ul>
 *
 * @see SWT#LEFT
 * @see SWT#RIGHT
 * @see SWT#CENTER
 * @see SWT#SHADOW_IN
 * @see SWT#SHADOW_OUT
 * @see SWT#SHADOW_NONE
 * @see #getStyle()
 */
public CLabel(Composite parent, int style) {
	super(parent, checkStyle(style));
	if ((style & (SWT.CENTER | SWT.RIGHT)) == 0) style |= SWT.LEFT;
	if ((style & SWT.CENTER) != 0) align = SWT.CENTER;
	if ((style & SWT.RIGHT) != 0)  align = SWT.RIGHT;
	if ((style & SWT.LEFT) != 0)   align = SWT.LEFT;
	/*
	addPaintListener(new PaintListener(){
		public void paintControl(PaintEvent event) {
			onPaint(event);
		}
	});
	*/

	addDisposeListener(new DisposeListener(){
		public void widgetDisposed(DisposeEvent event) {
			onDispose(event);
		}
	});

	/*
	addTraverseListener(new TraverseListener() {
		public void keyTraversed(TraverseEvent event) {
			if (event.detail == SWT.TRAVERSE_MNEMONIC) {
				onMnemonic(event);
			}
		}
	});
	*/
	//initAccessible();

}
/**
 * Check the style bits to ensure that no invalid styles are applied.
 */
private static int checkStyle (int style) {
	if ((style & SWT.BORDER) != 0) style |= SWT.SHADOW_IN;
	int mask = SWT.SHADOW_IN | SWT.SHADOW_OUT | SWT.SHADOW_NONE | SWT.LEFT_TO_RIGHT | SWT.RIGHT_TO_LEFT;
	style = style & mask;
	style |= SWT.NO_FOCUS;
	//TEMPORARY CODE
	/*
	 * The default background on carbon and some GTK themes is not a solid color 
	 * but a texture.  To show the correct default background, we must allow
	 * the operating system to draw it and therefore, we can not use the 
	 * NO_BACKGROUND style.  The NO_BACKGROUND style is not required on platforms
	 * that use double buffering which is true in both of these cases.
	 */
	/* Ignore platform problem here in Java2Script SWT
	String platform = SWT.getPlatform();
	if ("carbon".equals(platform) || "gtk".equals(platform)) return style; //$NON-NLS-1$ //$NON-NLS-2$
	*/
	return style | SWT.NO_BACKGROUND;
}

//protected void checkSubclass () {
//	String name = getClass().getName ();
//	String validName = CLabel.class.getName();
//	if (!validName.equals(name)) {
//		SWT.error (SWT.ERROR_INVALID_SUBCLASS);
//	}
//}

public Point computeSize(int wHint, int hHint, boolean changed) {
	checkWidget();
	Point e = getTotalSize(image, text);
	if (wHint == SWT.DEFAULT){
		e.x += 2*hIndent;
	} else {
		e.x = wHint;
	}
	if (hHint == SWT.DEFAULT) {
		e.y += 2*vIndent;
	} else {
		e.y = hHint;
	}
	return e;
}
/**
 * Draw a rectangle in the given colors.
 */
/*
private void drawBevelRect(GC gc, int x, int y, int w, int h, Color topleft, Color bottomright) {
	gc.setForeground(bottomright);
	gc.drawLine(x+w, y,   x+w, y+h);
	gc.drawLine(x,   y+h, x+w, y+h);
	
	gc.setForeground(topleft);
	gc.drawLine(x, y, x+w-1, y);
	gc.drawLine(x, y, x,     y+h-1);
}
*/
char _findMnemonic (String string) {
	if (string == null) return '\0';
	int index = 0;
	int length = string.length ();
	do {
		while (index < length && string.charAt (index) != '&') index++;
		if (++index >= length) return '\0';
		if (string.charAt (index) != '&') return string.charAt (index);
		index++;
	} while (index < length);
 	return '\0';
}

/**
 * Returns the alignment.
 * The alignment style (LEFT, CENTER or RIGHT) is returned.
 * 
 * @return SWT.LEFT, SWT.RIGHT or SWT.CENTER
 */
public int getAlignment() {
	//checkWidget();
	return align;
}
/**
 * Return the CLabel's image or <code>null</code>.
 * 
 * @return the image of the label or null
 */
public Image getImage() {
	//checkWidget();
	return image;
}
/**
 * Compute the minimum size.
 */
private Point getTotalSize(Image image, String text) {
	Point size = new Point(0, 0);

	if (image != null) {
		Rectangle r = image.getBounds();
		if (r.width == 0 && r.height == 0) {
			r.width = 16;
			r.height = 16;
		}
		size.x += r.width;
		size.y += r.height;
	}
		
	// GC gc = new GC(this);
	if (text != null && text.length() > 0) {
		// Point e = gc.textExtent(text, DRAW_FLAGS);
		Point e = textExtent(text, DRAW_FLAGS);
		size.x += e.x;
		size.y = Math.max(size.y, e.y);
		if (image != null) size.x += GAP;
	} else {
		// size.y = Math.max(size.y, gc.getFontMetrics().getHeight());
		size.y = Math.max(size.y, OS.getStringStyledHeight("A", "clabel-text", null));
	}
	// gc.dispose();
	
	return size;
}

private Point textExtent(String text, int flags) {
	return OS.getStringStyledSize(text, "clabel-text", null);
}

public int getStyle () {
	int style = super.getStyle();
	switch (align) {
		case SWT.RIGHT: style |= SWT.RIGHT; break;
		case SWT.CENTER: style |= SWT.CENTER; break;
		case SWT.LEFT: style |= SWT.LEFT; break;
	}
	return style;
}

/**
 * Return the Label's text.
 * 
 * @return the text of the label or null
 */
public String getText() {
	//checkWidget();
	return text;
}
public String getToolTipText () {
	checkWidget();
	return appToolTipText;
}
/*
private void initAccessible() {
	Accessible accessible = getAccessible();
	accessible.addAccessibleListener(new AccessibleAdapter() {
		public void getName(AccessibleEvent e) {
			e.result = getText();
		}
		
		public void getHelp(AccessibleEvent e) {
			e.result = getToolTipText();
		}
		
		public void getKeyboardShortcut(AccessibleEvent e) {
			char mnemonic = _findMnemonic(CLabel.this.text);	
			if (mnemonic != '\0') {
				e.result = "Alt+"+mnemonic; //$NON-NLS-1$
			}
		}
	});
		
	accessible.addAccessibleControlListener(new AccessibleControlAdapter() {
		public void getChildAtPoint(AccessibleControlEvent e) {
			e.childID = ACC.CHILDID_SELF;
		}
		
		public void getLocation(AccessibleControlEvent e) {
//			Rectangle rect = getDisplay().map(getParent(), null, getBounds());
//			e.x = rect.x;
//			e.y = rect.y;
//			e.width = rect.width;
//			e.height = rect.height;
		}
		
		public void getChildCount(AccessibleControlEvent e) {
			e.detail = 0;
		}
		
		public void getRole(AccessibleControlEvent e) {
			e.detail = ACC.ROLE_LABEL;
		}
		
		public void getState(AccessibleControlEvent e) {
			e.detail = ACC.STATE_READONLY;
		}
		
		public void getValue(AccessibleControlEvent e) {
			e.result = getText();
		}
	});
}
*/

void onDispose(DisposeEvent event) {
	gradientColors = null;
	gradientPercents = null;
	backgroundImage = null;
	text = null;
	image = null;
	appToolTipText = null;
}
/*
void onMnemonic(TraverseEvent event) {
	char mnemonic = _findMnemonic(text);
	if (mnemonic == '\0') return;
	if (Character.toUpperCase(event.character) != Character.toUpperCase(mnemonic)) return;
	Composite control = this.getParent();
	while (control != null) {
		Control [] children = control.getChildren();
		int index = 0;
		while (index < children.length) {
			if (children [index] == this) break;
			index++;
		}
		index++;
		if (index < children.length) {
			if (children [index].setFocus ()) {
				event.doit = true;
				event.detail = SWT.TRAVERSE_NONE;
			}
		}
		control = control.getParent();
	}
}
*/

public void redraw() {
	super.redraw();
	if (image != null) {
		if (imageHandle == null) {
			imageHandle = document.createElement("DIV");
			imageHandle.className = "clabel-icon";
			if (textHandle != null) {
				this.containerHandle().insertBefore(imageHandle, textHandle);
			} else {
				this.containerHandle().appendChild(imageHandle);
			}
		}
	} else {
		if (imageHandle != null) {
			//imageHandle.parentNode.removeChild(imageHandle);
			OS.destroyHandle(imageHandle);
			this.imageHandle = null;
		}
	}
	if (text != null) {
		if (textHandle == null) {
			textHandle = document.createElement("DIV");
			textHandle.className = "clabel-text";
			this.containerHandle().appendChild(textHandle);
			OS.setTextSelection(textHandle, false);
		}
		OS.clearChildren(textHandle);
	} else {
		if (textHandle != null) {
			OS.clearChildren(textHandle);
		}
	}
	if (bgHandle != null) {
		OS.clearChildren(bgHandle);
	}
	onPaint(null);
}

void onPaint(PaintEvent event) {
	Rectangle rect = getClientArea();
	if (rect.width == 0 || rect.height == 0) return;
	boolean shortenText = false;
	String t = text;
	Image img = image;
	int availableWidth = Math.max(0, rect.width - 2*hIndent);
	Point extent = getTotalSize(img, t);
	if (extent.x > availableWidth) {
		img = null;
		extent = getTotalSize(img, t);
		if (extent.x > availableWidth) {
			shortenText = true;
		}
	}
	
	// GC gc = event.gc;
	String[] lines = text == null ? null : splitString(text); 
	// shorten the text
	if (shortenText) {
		extent.x = 0;
	    for(int i = 0; i < lines.length; i++) {
	    	// Point e = gc.textExtent(lines[i], DRAW_FLAGS);
	    	Point e = textExtent(lines[i], DRAW_FLAGS);
	    	if (e.x > availableWidth) {
	    		lines[i] = shortenText(/*gc, */lines[i], availableWidth);
	    		extent.x = Math.max(extent.x, getTotalSize(null, lines[i]).x);
	    	} else {
	    		extent.x = Math.max(extent.x, e.x);
	    	}
	    }
		if (appToolTipText == null) {
			super.setToolTipText(text);
		}
	} else {
		super.setToolTipText(appToolTipText);
	}
	// determine horizontal position
	int x = rect.x + hIndent;
	if (align == SWT.CENTER) {
		x = (rect.width - extent.x)/2;
	}
	if (align == SWT.RIGHT) {
		x = rect.width - hIndent - extent.x;
	}
	
	// draw a background image behind the text
	try {
		if (backgroundImage != null) {
			// draw a background image behind the text
			Rectangle imageRect = backgroundImage.getBounds();
			// tile image to fill space
			// gc.setBackground(getBackground());
			// gc.fillRectangle(rect);
			int xPos = 0;
			while (xPos < rect.width) {
				int yPos = 0;
				while (yPos < rect.height) {
					// gc.drawImage(backgroundImage, xPos, yPos);
					yPos += imageRect.height;
				}
				xPos += imageRect.width;
			}
		} else if (gradientColors != null) {
			// draw a gradient behind the text
			// final Color oldBackground = gc.getBackground();
			final Color oldBackground = getComputedBackground();
			if (gradientColors.length == 1) {
				// if (gradientColors[0] != null) gc.setBackground(gradientColors[0]);
				// gc.fillRectangle(0, 0, rect.width, rect.height);
				if (gradientColors[0] != null) setBackground(gradientColors[0]);
			} else {
				//final Color oldForeground = gc.getForeground();
				Color lastColor = gradientColors[0];
				if (lastColor == null) lastColor = oldBackground;
				int pos = 0;
				for (int i = 0; i < gradientPercents.length; ++i) {
					// gc.setForeground(lastColor);
					Color lastColorOld = lastColor;
					lastColor = gradientColors[i + 1];
					if (lastColor == null) lastColor = oldBackground;
					// gc.setBackground(lastColor);
					if (gradientVertical) {
						final int gradientHeight = (gradientPercents[i] * rect.height / 100) - pos;
						// gc.fillGradientRectangle(0, pos, rect.width, gradientHeight, true);
						fillGradientRectangle(0, pos, rect.width, gradientHeight, true, lastColorOld, lastColor);
						pos += gradientHeight;
					} else {
						final int gradientWidth = (gradientPercents[i] * rect.width / 100) - pos;
						// gc.fillGradientRectangle(pos, 0, gradientWidth, rect.height, false);
						fillGradientRectangle(pos, 0, gradientWidth, rect.height, false, lastColorOld, lastColor);
						pos += gradientWidth;
					}
				}
				if (gradientVertical && pos < rect.height) {
					// gc.setBackground(getBackground());
					// gc.fillRectangle(0, pos, rect.width, rect.height - pos);
					fillRectangle(0, pos, rect.width, rect.height - pos, oldBackground);
				}
				if (!gradientVertical && pos < rect.width) {
					// gc.setBackground(getBackground());
					// gc.fillRectangle(pos, 0, rect.width - pos, rect.height);
					fillRectangle(pos, 0, rect.width - pos, rect.height, oldBackground);
				}
				// gc.setForeground(oldForeground);
			}
			// gc.setBackground(oldBackground);
		} else {
			if ((getStyle() & SWT.NO_BACKGROUND) != 0) {
				// gc.setBackground(getBackground());
				// gc.fillRectangle(rect);
				fillRectangle(rect.x, rect.y, rect.width, rect.height, getBackground());
			}
		}
	} catch (SWTException e) {
		if ((getStyle() & SWT.NO_BACKGROUND) != 0) {
			// gc.setBackground(getBackground());
			// gc.fillRectangle(rect);
			fillRectangle(rect.x, rect.y, rect.width, rect.height, getBackground());
		}
	}

	// draw border
	int style = getStyle();
	if ((style & SWT.SHADOW_IN) != 0 || (style & SWT.SHADOW_OUT) != 0) {
		paintBorder(/*gc, */rect);
	}

	// draw the image
	if (img != null) {
		Rectangle imageRect = img.getBounds();
		if (imageRect.width == 0 && imageRect.height == 0) {
			imageRect.width = 16;
			imageRect.height = 16;
		}
		// gc.drawImage(img, 0, 0, imageRect.width, imageRect.height, 
		//                 x, (rect.height-imageRect.height)/2, imageRect.width, imageRect.height);
		drawImage(img, 0, 0, imageRect.width, imageRect.height, 
		                x, (rect.height-imageRect.height)/2, imageRect.width, imageRect.height);
		x +=  imageRect.width + GAP;
		extent.x -= imageRect.width + GAP;
	} else {
		if (imageHandle != null) {
			imageHandle.style.display = "none";
		}
	}
	// draw the text
	if (lines != null) {
		// int lineHeight = gc.getFontMetrics().getHeight();
		int lineHeight = OS.getStringStyledHeight("A", "clabel-text", null); // /*gc.*/getFontMetrics().getHeight();
		int textHeight = lines.length * lineHeight;
		int lineY = Math.max(vIndent, rect.y + (rect.height - textHeight) / 2);
		// gc.setForeground(getForeground());
		for (int i = 0; i < lines.length; i++) {
			int lineX = x;
			if (lines.length > 1) {
				if (align == SWT.CENTER) {
					// int lineWidth = gc.textExtent(lines[i], DRAW_FLAGS).x;
					int lineWidth = textExtent(lines[i], DRAW_FLAGS).x;
					lineX = x + Math.max(0, (extent.x - lineWidth) / 2);
				}
				if (align == SWT.RIGHT) {
					// int lineWidth = gc.textExtent(lines[i], DRAW_FLAGS).x;
					int lineWidth = textExtent(lines[i], DRAW_FLAGS).x;
					lineX = Math.max(x, rect.x + rect.width - hIndent - lineWidth);
				}
			}
			// gc.drawText(lines[i], lineX, lineY, DRAW_FLAGS);
			drawText(lines[i], lineX, lineY, DRAW_FLAGS);
			lineY += lineHeight;
		}
	}
}

private Color getComputedBackground () {
	String bg = null;
	/**
	 * @j2sNative
	 * if (O$.isIE) {
	 * 	// bg = this.handle.currentStyle.backgroundColor;
	 * 	// http://groups.google.com/group/mozilla.web-developers.general/browse_thread/thread/2f03f338dc9e4dd7/86f9cd1f3d1eabc5
	 * 	var oRG = document.body.createTextRange ();
	 * 	oRG.moveToElementText (this.handle);
	 * 	var iClr = oRG.queryCommandValue ("BackColor");
	 * 	bg = "rgb(" + (iClr & 0xFF) + ", " + ((iClr & 0xFF00) >> 8) + ", " + ((iClr & 0xFF0000) >> 16) + ")";
	 * } else {
	 * 	bg = document.defaultView.getComputedStyle (this.handle, null).backgroundColor;
	 * }
	 */ {}
	if (bg == null || ("" + bg).length() == 0) {
		return new Color(display, "menu");
	}
	return new Color(display, bg);
}

private void fillRectangle(int x, int y, int width, int height, Color oldBackground) {
	if (bgHandle == null) {
		bgHandle = document.createElement("DIV");
		bgHandle.className = "clabel-background";
		this.containerHandle().appendChild(bgHandle);
	}
	Element block = document.createElement("DIV");
	block.style.backgroundColor = oldBackground.getCSSHandle();
	block.className = "clabel-background-block";
	block.style.left = x + "px";
	block.style.top = y + "px";
	block.style.width = width + "px";
	block.style.height = height + "px";
	bgHandle.appendChild(block);
}

private void fillGradientRectangle(int x, int y, int width,
		int height, boolean vertical, Color colorBegin, Color colorEnd) {
	int gradientSteps = 7;
	/**
	 * @j2sNative
	 * var steps = window["swt.clabel.gradient.steps"];
	 * if (steps != null && !isNaN (steps)) {
	 * 	gradientSteps = steps;
	 * }
	 */ {}
	int inc = 0;
	int r1 = colorBegin.getRed();
	int r2 = colorEnd.getRed();
	int g1 = colorBegin.getGreen();
	int g2 = colorEnd.getGreen();
	int b1 = colorBegin.getBlue();
	int b2 = colorEnd.getBlue();
	for (int i = 0; i < gradientSteps + 1; i++) {
		int red = r1 + i * (r2 - r1) / gradientSteps;
		int green = g1 + i * (g2 - g1) / gradientSteps;
		int blue = b1 + i * (b2 - b1) / gradientSteps;
		Color color = new Color(null, red, green, blue);
		int delta = -1;
		if (vertical) {
			delta = i == gradientSteps ? height - inc : (i + 1) * height / (gradientSteps + 1) - inc;
			fillRectangle(x, y + inc, width, delta, color);
		} else {
			delta = i == gradientSteps ? width - inc : (i + 1) * width / (gradientSteps + 1)- inc;
			fillRectangle(x + inc, y, delta, height, color);
		}
		inc += delta;
	}
}

private void drawImage(Image img, int i, int j, int width, int height, int x,
		int y, int width2, int height2) {
	imageHandle.style.backgroundImage = "url('" + img.url + "')";
	imageHandle.style.width = width + "px";
	imageHandle.style.height = width + "px";
	imageHandle.style.left = x + "px";
	imageHandle.style.top = y + "px";
	imageHandle.style.display = "";
}
private void drawText(String string, int lineX, int lineY, int flags) {
	Element lineEl = document.createElement("DIV");
	lineEl.className = "clabel-line";
	lineEl.appendChild(document.createTextNode(string));
	lineEl.style.left = lineX + "px";
	lineEl.style.top = lineY + "px";
	lineEl.style.position = "absolute";
	textHandle.appendChild(lineEl);
}
/**
 * Paint the Label's border.
 */
private void paintBorder(/*GC gc, */Rectangle r) {
	Display disp= getDisplay();

	Color c1 = null;
	Color c2 = null;
	
	int style = getStyle();
	if ((style & SWT.SHADOW_IN) != 0) {
		c1 = disp.getSystemColor(SWT.COLOR_WIDGET_NORMAL_SHADOW);
		c2 = disp.getSystemColor(SWT.COLOR_WIDGET_HIGHLIGHT_SHADOW);
	}
	if ((style & SWT.SHADOW_OUT) != 0) {		
		c1 = disp.getSystemColor(SWT.COLOR_WIDGET_LIGHT_SHADOW);
		c2 = disp.getSystemColor(SWT.COLOR_WIDGET_NORMAL_SHADOW);
	}
		
	if (c1 != null && c2 != null) {
		// gc.setLineWidth(1);
		drawBevelRect(/*gc, */r.x, r.y, r.width-1, r.height-1, c1, c2);
	}
}
private void drawBevelRect(int x, int y, int width, int height, Color c1, Color c2) {
	if (borderHandle == null) {
		borderHandle = document.createElement("DIV");
		borderHandle.className = "clabel-border";
		this.containerHandle().appendChild(borderHandle);
	}
	borderHandle.style.left = x + "px";
	borderHandle.style.top = y + "px";
	if (OS.isIE50 || OS.isIE55 || OS.isIE60) {
		width += 1;
		height += 1;
	}
	borderHandle.style.width = (width - 1) + "px";
	borderHandle.style.height = (height - 1) + "px";
	borderHandle.style.borderLeftColor = c1.getCSSHandle();
	borderHandle.style.borderTopColor = c1.getCSSHandle();
	borderHandle.style.borderRightColor = c2.getCSSHandle();
	borderHandle.style.borderBottomColor = c2.getCSSHandle();
}
/**
 * Set the alignment of the CLabel.
 * Use the values LEFT, CENTER and RIGHT to align image and text within the available space.
 * 
 * @param align the alignment style of LEFT, RIGHT or CENTER
 * 
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 *    <li>ERROR_INVALID_ARGUMENT - if the value of align is not one of SWT.LEFT, SWT.RIGHT or SWT.CENTER</li>
 * </ul>
 */
public void setAlignment(int align) {
	checkWidget();
	if (align != SWT.LEFT && align != SWT.RIGHT && align != SWT.CENTER) {
		SWT.error(SWT.ERROR_INVALID_ARGUMENT);
	}
	if (this.align != align) {
		this.align = align;
		redraw();
	}
}

public void setBackground (Color color) {
	super.setBackground (color);
	// Are these settings the same as before?
	if (backgroundImage == null && 
			gradientColors == null && 
			gradientPercents == null) {
		if (color == null) {
			if (background == null) return;
		} else {
			if (color.equals(background)) return;
		}		
	}
	background = color;
	backgroundImage = null;
	gradientColors = null;
	gradientPercents = null;
	redraw ();
}

/**
 * Specify a gradient of colours to be drawn in the background of the CLabel.
 * <p>For example, to draw a gradient that varies from dark blue to blue and then to
 * white and stays white for the right half of the label, use the following call 
 * to setBackground:</p>
 * <pre>
 *	clabel.setBackground(new Color[]{display.getSystemColor(SWT.COLOR_DARK_BLUE), 
 *		                           display.getSystemColor(SWT.COLOR_BLUE),
 *		                           display.getSystemColor(SWT.COLOR_WHITE), 
 *		                           display.getSystemColor(SWT.COLOR_WHITE)},
 *		               new int[] {25, 50, 100});
 * </pre>
 *
 * @param colors an array of Color that specifies the colors to appear in the gradient 
 *               in order of appearance from left to right;  The value <code>null</code> 
 *               clears the background gradient; the value <code>null</code> can be used 
 *               inside the array of Color to specify the background color.
 * @param percents an array of integers between 0 and 100 specifying the percent of the width 
 *                 of the widget at which the color should change; the size of the percents 
 *                 array must be one less than the size of the colors array.
 * 
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 *    <li>ERROR_INVALID_ARGUMENT - if the values of colors and percents are not consistent</li>
 * </ul>
 */
public void setBackground(Color[] colors, int[] percents) {
	setBackground(colors, percents, false);
}
/**
 * Specify a gradient of colours to be drawn in the background of the CLabel.
 * <p>For example, to draw a gradient that varies from dark blue to white in the vertical,
 * direction use the following call 
 * to setBackground:</p>
 * <pre>
 *	clabel.setBackground(new Color[]{display.getSystemColor(SWT.COLOR_DARK_BLUE), 
 *		                           display.getSystemColor(SWT.COLOR_WHITE)},
 *		                 new int[] {100}, true);
 * </pre>
 *
 * @param colors an array of Color that specifies the colors to appear in the gradient 
 *               in order of appearance from left/top to right/bottom;  The value <code>null</code> 
 *               clears the background gradient; the value <code>null</code> can be used 
 *               inside the array of Color to specify the background color.
 * @param percents an array of integers between 0 and 100 specifying the percent of the width/height 
 *                 of the widget at which the color should change; the size of the percents 
 *                 array must be one less than the size of the colors array.
 * @param vertical indicate the direction of the gradient.  True is vertical and false is horizontal.
 * 
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 *    <li>ERROR_INVALID_ARGUMENT - if the values of colors and percents are not consistent</li>
 * </ul>
 * 
 * @since 3.0
 */
public void setBackground(Color[] colors, int[] percents, boolean vertical) {	
	checkWidget();
	if (colors != null) {
		if (percents == null || percents.length != colors.length - 1) {
			SWT.error(SWT.ERROR_INVALID_ARGUMENT);
		}
		if (getDisplay().getDepth() < 15) {
			// Don't use gradients on low color displays
			colors = new Color[] {colors[colors.length - 1]};
			percents = new int[] { };
		}
		for (int i = 0; i < percents.length; i++) {
			if (percents[i] < 0 || percents[i] > 100) {
				SWT.error(SWT.ERROR_INVALID_ARGUMENT);
			}
			if (i > 0 && percents[i] < percents[i-1]) {
				SWT.error(SWT.ERROR_INVALID_ARGUMENT);
			}
		}
	}
	
	// Are these settings the same as before?
	final Color background = getComputedBackground();
	if (backgroundImage == null) {
		if ((gradientColors != null) && (colors != null) && 
			(gradientColors.length == colors.length)) {
			boolean same = false;
			for (int i = 0; i < gradientColors.length; i++) {
				same = (gradientColors[i] == colors[i]) ||
					((gradientColors[i] == null) && (colors[i] == background)) ||
					((gradientColors[i] == background) && (colors[i] == null));
				if (!same) break;
			}
			if (same) {
				for (int i = 0; i < gradientPercents.length; i++) {
					same = gradientPercents[i] == percents[i];
					if (!same) break;
				}
			}
			if (same && this.gradientVertical == vertical) return;
		}
	} else {
		backgroundImage = null;
	}
	// Store the new settings
	if (colors == null) {
		gradientColors = null;
		gradientPercents = null;
		gradientVertical = false;
	} else {
		gradientColors = new Color[colors.length];
		for (int i = 0; i < colors.length; ++i)
			gradientColors[i] = (colors[i] != null) ? colors[i] : background;
		gradientPercents = new int[percents.length];
		for (int i = 0; i < percents.length; ++i)
			gradientPercents[i] = percents[i];
		gradientVertical = vertical;
	}
	// Refresh with the new settings
	redraw();
}
/**
 * Set the image to be drawn in the background of the label.
 * 
 * @param image the image to be drawn in the background
 * 
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setBackground(Image image) {
	checkWidget();
	if (image == backgroundImage) return;
	if (image != null) {
		gradientColors = null;
		gradientPercents = null;
	}
	backgroundImage = image;
	redraw();
	
}
public void setFont(Font font) {
	super.setFont(font);
	redraw();
}

/**
 * Set the label's Image.
 * The value <code>null</code> clears it.
 * 
 * @param image the image to be displayed in the label or null
 * 
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setImage(Image image) {
	checkWidget();
	if (image != this.image) {
		this.image = image;
		redraw();
	}
}
/**
 * Set the label's text.
 * The value <code>null</code> clears it.
 * 
 * @param text the text to be displayed in the label or null
 * 
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public void setText(String text) {
	checkWidget();
	if (text == null) text = ""; //$NON-NLS-1$
	if (! text.equals(this.text)) {
		this.text = text;
		redraw();
	}
}
public void setToolTipText (String string) {
	super.setToolTipText (string);
	appToolTipText = super.getToolTipText();
}
/**
 * Shorten the given text <code>t</code> so that its length doesn't exceed
 * the given width. The default implementation replaces characters in the
 * center of the original string with an ellipsis ("...").
 * Override if you need a different strategy.
 * 
 * @param gc the gc to use for text measurement
 * @param t the text to shorten
 * @param width the width to shorten the text to, in pixels
 * @return the shortened text
 */
protected String shortenText(/*GC gc, */String t, int width) {
	if (t == null) return null;
	// int w = gc.textExtent(ELLIPSIS, DRAW_FLAGS).x;
	int w = textExtent(ELLIPSIS, DRAW_FLAGS).x;
	int l = t.length();
	int pivot = l/2;
	int s = pivot;
	int e = pivot+1;
	while (s >= 0 && e < l) {
		String s1 = t.substring(0, s);
		String s2 = t.substring(e, l);
		// int l1 = gc.textExtent(s1, DRAW_FLAGS).x;
		// int l2 = gc.textExtent(s2, DRAW_FLAGS).x;
		int l1 = textExtent(s1, DRAW_FLAGS).x;
		int l2 = textExtent(s2, DRAW_FLAGS).x;
		if (l1+w+l2 < width) {
			t = s1 + ELLIPSIS + s2;
			break;
		}
		s--;
		e++;
	}
	return t;
}

private String[] splitString(String text) {
    String[] lines = new String[1];
    int start = 0, pos;
    do {
        pos = text.indexOf('\n', start);
        if (pos == -1) {
        	lines[lines.length - 1] = text.substring(start);
        } else {
            boolean crlf = (pos > 0) && (text.charAt(pos - 1) == '\r');
            lines[lines.length - 1] = text.substring(start, pos - (crlf ? 1 : 0));
            start = pos + 1;
            String[] newLines = new String[lines.length+1];
            System.arraycopy(lines, 0, newLines, 0, lines.length);
       		lines = newLines;
        }
    } while (pos != -1);
    return lines;
}

protected boolean SetWindowPos(Object wnd, Object wndInsertAfter, int X,
		int Y, int cx, int cy, int flags) {
	boolean ok = super.SetWindowPos(wnd, wndInsertAfter, X, Y, cx, cy, flags);
	if (ok) {
		redraw();
	}
	return ok;
}
}
