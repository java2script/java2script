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


import org.eclipse.swt.SWT;
import org.eclipse.swt.SWTException;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.GC;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.graphics.Rectangle;
import org.eclipse.swt.internal.RunnableCompatibility;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.internal.xhtml.Element;
import org.eclipse.swt.internal.xhtml.document;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Item;
import org.eclipse.swt.widgets.Widget;

/**
 * Instances of this class represent a selectable user interface object
 * that represent a page in a notebook widget.
 * 
 * <dl>
 * <dt><b>Styles:</b></dt>
 * <dd>SWT.CLOSE</dd>
 * <dt><b>Events:</b></dt>
 * <dd>(none)</dd>
 * </dl>
 * <p>
 * IMPORTANT: This class is <em>not</em> intended to be subclassed.
 * </p>
 */
public class CTabItem extends Item {
	CTabFolder parent;
	int x,y,width,height = 0;
	Control control; // the tab page
	
	String toolTipText;
	String shortenedText;
	int shortenedTextWidth;
	boolean hasImage;
	Element textEl;
	Element rightEl;
	boolean isSelected;
	// Appearance
	Font font;
	Image disabledImage; 
	
	Rectangle closeRect = new Rectangle(0, 0, 0, 0);
	int closeImageState = CTabFolder.NONE;
	boolean showClose = false;
	boolean showing = false;

	// internal constants
	static final int TOP_MARGIN = 2;
	static final int BOTTOM_MARGIN = 2;
	static final int LEFT_MARGIN = 4;
	static final int RIGHT_MARGIN = 4;
	static final int INTERNAL_SPACING = 4;
	static final int FLAGS = SWT.DRAW_TRANSPARENT | SWT.DRAW_MNEMONIC;
	static final String ELLIPSIS = "..."; //$NON-NLS-1$ // could use the ellipsis glyph on some platforms "\u2026"
	
/**
 * Constructs a new instance of this class given its parent
 * (which must be a <code>CTabFolder</code>) and a style value
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
 * @param parent a CTabFolder which will be the parent of the new instance (cannot be null)
 * @param style the style of control to construct
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the parent is null</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the parent</li>
 * </ul>
 *
 * @see SWT
 * @see Widget#getStyle()
 */
public CTabItem (CTabFolder parent, int style) {
	this(parent, style, parent.getItemCount());
}
/**
 * Constructs a new instance of this class given its parent
 * (which must be a <code>CTabFolder</code>), a style value
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
 * @param parent a CTabFolder which will be the parent of the new instance (cannot be null)
 * @param style the style of control to construct
 * @param index the index to store the receiver in its parent
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the parent is null</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the parent</li>
 * </ul>
 *
 * @see SWT
 * @see Widget#getStyle()
 */
public CTabItem (CTabFolder parent, int style, int index) {
	super (parent, checkStyle(style));
	this.parent = parent;
	showClose = parent.showClose;
	parent.createItem (this, index);
	configure(index);
}
String getNameText () {
	return getText ();
}

private void configure(int index) {
	handle.onclick = new RunnableCompatibility() {
		public void run() {
			parent.setSelection(CTabItem.this);
		}
	};
	if(parent.showClose){
		handle.onmouseover = new RunnableCompatibility() {
			public void run() {
				prepareCloseBtn(true);
			}
		};
		handle.onmouseout = new RunnableCompatibility() {
			public void run() {
				prepareCloseBtn(false);
			}
		};
	}
}

static int checkStyle(int style) {
	return SWT.NONE;
}
static String shortenText(GC gc, String text, int width) {
	if (gc.textExtent(text, FLAGS).x <= width) return text;
	int ellipseWidth = gc.textExtent(ELLIPSIS, FLAGS).x;
	int length = text.length();
	int end = length - 1;
	while (end > 0) {
		text = text.substring(0, end);
		int l = gc.textExtent(text, FLAGS).x;
		if (l + ellipseWidth <= width) {
			return text + ELLIPSIS;
		}
		end--;
	}
	return text.substring(0,1);
}
public void dispose() {
	if (isDisposed ()) return;
	//if (!isValidThread ()) error (SWT.ERROR_THREAD_INVALID_ACCESS);
	parent.destroyItem(this);
	super.dispose();
	parent = null;
	control = null;
	toolTipText = null;
	shortenedText = null;
	font = null;
}
void drawClose(GC gc) {
	if (closeRect.width == 0 || closeRect.height == 0) return;
	Display display = getDisplay();

	// draw X 9x9
	int indent = Math.max(1, (CTabFolder.BUTTON_SIZE-9)/2);
	int x = closeRect.x + indent;
	int y = closeRect.y + indent;
	y += parent.onBottom ? -1 : 1;
	
	Color closeBorder = display.getSystemColor(CTabFolder.BUTTON_BORDER);
	switch (closeImageState) {
		case CTabFolder.NORMAL: {
			int[] shape = new int[] {x,y, x+2,y, x+4,y+2, x+5,y+2, x+7,y, x+9,y, 
					                 x+9,y+2, x+7,y+4, x+7,y+5, x+9,y+7, x+9,y+9,
			                         x+7,y+9, x+5,y+7, x+4,y+7, x+2,y+9, x,y+9,
			                         x,y+7, x+2,y+5, x+2,y+4, x,y+2};
			gc.setBackground(display.getSystemColor(CTabFolder.BUTTON_FILL));
			gc.fillPolygon(shape);
			gc.setForeground(closeBorder);
			gc.drawPolygon(shape);
			break;
		}
		case CTabFolder.HOT: {
			int[] shape = new int[] {x,y, x+2,y, x+4,y+2, x+5,y+2, x+7,y, x+9,y, 
					                 x+9,y+2, x+7,y+4, x+7,y+5, x+9,y+7, x+9,y+9,
			                         x+7,y+9, x+5,y+7, x+4,y+7, x+2,y+9, x,y+9,
			                         x,y+7, x+2,y+5, x+2,y+4, x,y+2};
			Color fill = new Color(display, CTabFolder.CLOSE_FILL);
			gc.setBackground(fill);
			gc.fillPolygon(shape);
			fill.dispose();
			gc.setForeground(closeBorder);
			gc.drawPolygon(shape);
			break;
		}
		case CTabFolder.SELECTED: {
			int[] shape = new int[] {x+1,y+1, x+3,y+1, x+5,y+3, x+6,y+3, x+8,y+1, x+10,y+1, 
					                 x+10,y+3, x+8,y+5, x+8,y+6, x+10,y+8, x+10,y+10,
			                         x+8,y+10, x+6,y+8, x+5,y+8, x+3,y+10, x+1,y+10,
			                         x+1,y+8, x+3,y+6, x+3,y+5, x+1,y+3};
			Color fill = new Color(display, CTabFolder.CLOSE_FILL);
			gc.setBackground(fill);
			gc.fillPolygon(shape);
			fill.dispose();
			gc.setForeground(closeBorder);
			gc.drawPolygon(shape);
			break;
		}
		case CTabFolder.NONE: {
			int[] shape = new int[] {x,y, x+10,y, x+10,y+10, x,y+10};
			if (parent.gradientColors != null && !parent.gradientVertical) {
//				parent.drawBackground(gc, shape, false);
			} else {
				Color defaultBackground = parent.getBackground();
				Image image = parent.bgImage;
				Color[] colors = parent.gradientColors;
				int[] percents = parent.gradientPercents;
				boolean vertical = parent.gradientVertical; 
//				parent.drawBackground(gc, shape, x, y, 10, 10, defaultBackground, image, colors, percents, vertical);
			}
			break;
		}
	}
}
/**
 * Returns a rectangle describing the receiver's size and location
 * relative to its parent.
 *
 * @return the receiver's bounding column rectangle
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public Rectangle getBounds () {
	//checkWidget();
	int w = width;
	if (!parent.simple && !parent.single && parent.indexOf(this) == parent.selectedIndex) w += parent.curveWidth - parent.curveIndent;
	return new Rectangle(x, y, w, height);
}
/**
* Gets the control that is displayed in the content are of the tab item.
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
 * Get the image displayed in the tab if the tab is disabled.
 * 
 * @return the disabled image or null
 * 
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @deprecated the disabled image is not used
 */
public Image getDisabledImage(){
	checkWidget();
	return disabledImage;
}
/**
 * Returns the font that the receiver will use to paint textual information.
 *
 * @return the receiver's font
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 *  @since 3.0
 */
public Font getFont() {
	checkWidget();
	if (font != null) return font;
	return parent.getFont();
}
/**
 * Returns the receiver's parent, which must be a <code>CTabFolder</code>.
 *
 * @return the receiver's parent
 * 
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 */
public CTabFolder getParent () {
	checkWidget();
	return parent;
}
/**
 * Returns the receiver's tool tip text, or null if it has
 * not been set.
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
	if (toolTipText == null && shortenedText != null) {
		String text = getText();
		if (!shortenedText.equals(text)) return text;
	}
	return toolTipText;
}
/**
* Returns <code>true</code> if the item will be rendered in the visible area of the CTabFolder. Returns false otherwise.
* 
*  @return <code>true</code> if the item will be rendered in the visible area of the CTabFolder. Returns false otherwise.
* 
*  @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
* @since 3.0
*/
public boolean isShowing () {
	checkWidget();
	return showing;
}

int preferredHeight(GC gc) {
	Image image = getImage();
	int h = (image == null) ? 0 : image.getBounds().height;
	String text = getText();
	if (font == null) {
		h = Math.max(h, gc.textExtent(text, FLAGS).y);
	} else {
		Font gcFont = gc.getFont();
		gc.setFont(font);
		h = Math.max(h, gc.textExtent(text, FLAGS).y);
		gc.setFont(gcFont);
	}
	return h + TOP_MARGIN + BOTTOM_MARGIN;
}
int preferredWidth(GC gc, boolean isSelected, boolean minimum) {
	// NOTE: preferred width does not include the "dead space" caused
	// by the curve.
	if (isDisposed()) return 0;
	int w = 0;
	Image image = getImage();
	if (image != null && (isSelected || parent.showUnselectedImage)) {
		w += image.getBounds().width;
	}
	String text = null;
	if (minimum) {
		int minChars = parent.minChars;
		text = minChars == 0 ? null : getText();
		if (text != null && text.length() > minChars) {
			int end = minChars < ELLIPSIS.length() + 1 ? minChars : minChars - ELLIPSIS.length();
			text = text.substring(0, end);
			if (minChars > ELLIPSIS.length() + 1) text += ELLIPSIS;
		}
	} else {
		text = getText();
	}
	if (text != null) {
		if (w > 0) w += INTERNAL_SPACING;
		if (font == null) {
			w += gc.textExtent(text, FLAGS).x;
		} else {
			Font gcFont = gc.getFont();
			gc.setFont(font);
			w += gc.textExtent(text, FLAGS).x;
			gc.setFont(gcFont);
		}
	}
	if (parent.showClose || showClose) {
		if (isSelected || parent.showUnselectedClose) {
			if (w > 0) w += INTERNAL_SPACING;
			w += CTabFolder.BUTTON_SIZE;
		}
	}
	return w + LEFT_MARGIN + RIGHT_MARGIN;
}
/**
 * Sets the control that is used to fill the client area of
 * the tab folder when the user selects the tab item.
 *
 * @param control the new control (or null)
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
	System.out.println("Ctab setControl " + control +  " " + control.parent + " " + parent);
	if (this.control != null && this.control.isDisposed ()) {
		this.control = null;
	}
	Control oldControl = this.control, newControl = control;
	this.control = control;
	int index = parent.indexOf (this);
	if (index != parent.getSelectionIndex ()) {
		if (newControl != null) newControl.setVisible (false);
		return;
	}
	if (newControl != null) {
		Rectangle clientArea = parent.getClientArea ();
		if (clientArea.height <= 0 || clientArea.width <= 0) {
			System.out.println("client area has trouble");
		} else {
			if(this.isSelected){
				newControl.setBounds (clientArea);
			}
			newControl.setVisible(true);
		}
//		if (newControl != null) {
//			newControl.setBounds (parent.getClientArea ());
//			newControl.setVisible (true);
//		}
//		System.err.println(clientArea);
//		System.out.println("here!");
		//newControl.setVisible (true);
	}
	if (oldControl != null) oldControl.setVisible (false);

//	checkWidget();
//	if (control != null) {
//		if (control.isDisposed()) SWT.error (SWT.ERROR_INVALID_ARGUMENT);
//		if (control.getParent() != parent) SWT.error (SWT.ERROR_INVALID_PARENT);
//	}
//	if (this.control != null && !this.control.isDisposed()) {
//		this.control.setVisible(false);
//	}
//	this.control = control;
//	if (this.control != null) {
//		int index = parent.indexOf (this);
//		if (index == parent.getSelectionIndex ()){
//			this.control.setBounds(parent.getClientArea ());
//			this.control.setVisible(true);
//		} else {
//			this.control.setVisible(false);
//		}
//	}
}
/**
 * Sets the image that is displayed if the tab item is disabled.
 * Null will clear the image.
 * 
 * @param image the image to be displayed when the item is disabled or null
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the receiver has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the receiver</li>
 * </ul>
 * 
 * @deprecated This image is not used
 */
public void setDisabledImage (Image image) {
	checkWidget();
	if (image != null && image.isDisposed ()) {
		SWT.error(SWT.ERROR_INVALID_ARGUMENT);
	}
	this.disabledImage = image;
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
	checkWidget();
	if (font != null && font.isDisposed ()) {
		SWT.error(SWT.ERROR_INVALID_ARGUMENT);
	}
	if (font == null && this.font == null) return;
	if (font != null && font.equals(this.font)) return;
	this.font = font;
	if (!parent.updateTabHeight(false)) {
		parent.updateItems();
		//parent.redrawTabs();
	}
}
public void setImage (Image image) {
	checkWidget();
	if (image != null && image.isDisposed ()) {
		SWT.error(SWT.ERROR_INVALID_ARGUMENT);
	}
	Image oldImage = getImage();
	if (image == null && oldImage == null) return;
	if (image != null && image.equals(oldImage)) return;
	super.setImage(image);
	if (!parent.updateTabHeight(false)) {
		// If image is the same size as before, 
		// redraw only the image
		if (oldImage != null && image != null) {
			Rectangle oldBounds = oldImage.getBounds();
			Rectangle bounds = image.getBounds();
			if (bounds.width == oldBounds.width && bounds.height == oldBounds.height) {
				if (showing) parent.redraw(x, y, width, height, false);
				return;
			}
		} 
		parent.updateItems();
		//parent.redrawTabs();
	}
}
public void setText (String string) {
	checkWidget();
	if (string == null) error (SWT.ERROR_NULL_ARGUMENT);
	if (handle != null) {
		OS.clearChildren(handle);
		textEl = document.createElement("DIV");
		textEl.className = "ctab-item-main-default-left";
		textEl.appendChild(document.createTextNode(string));
		handle.appendChild(textEl);

		rightEl = document.createElement("DIV");
		rightEl.className = cssClassForRight();
//		rightEl.onmousemove = new 
//		rightEl.onmouseout
		handle.appendChild(rightEl);
		configureRightEl();
		//handle.appendChild(document.createTextNode(string));
		parent.updateSelection(parent.getSelectionIndex());
	}
//	int index = parent.indexOf (this);
//	if (index == -1) return;
//	super.setText (string);
	this.text = string;
//	checkWidget();
//	if (string == null) SWT.error (SWT.ERROR_NULL_ARGUMENT);
//	if (string.equals(getText())) return;
//	super.setText(string);
//	shortenedText = null;
//	shortenedTextWidth = 0;
//	if (!parent.updateTabHeight(false)) {
//		parent.updateItems();
//		parent.redrawTabs();
//	}
}
void configureRightEl() {
	// TODO Auto-generated method stub
	if(showClose){
		rightEl.onclick = new RunnableCompatibility() {
			public void run() {
				CTabFolderEvent e = new CTabFolderEvent(parent);
				
				e.widget = parent;
				e.time = display.getLastEventTime ();
				e.item = CTabItem.this;
				e.doit = true;
				CTabFolder parent = CTabItem.this.parent; 
				for (int j = 0; j < parent.folderListeners.length; j++) {
					CTabFolder2Listener listener = parent.folderListeners[j];
					listener.close(e);
				}
				for (int j = 0; j < parent.tabListeners.length; j++) {
					CTabFolderListener listener = parent.tabListeners[j];
					listener.itemClosed(e);
				}
				if (e.doit) {
					parent.destroyItem(CTabItem.this);
				}
				
				
			}
		};
		/*
		 * IE does not support HOVER on DIVs so this is a workaround !
		 */
		rightEl.onmouseover = new RunnableCompatibility() {
			public void run() {
				prepareCloseBtn(true);
				rightEl.className = rightEl.className.trim() + "-hover";
			
			}
		};
		rightEl.onmouseout = new RunnableCompatibility() {
			public void run() {
				prepareCloseBtn(false);
				int idx = rightEl.className.indexOf("-hover");
				if(idx >= 0){
					rightEl.className = rightEl.className.substring(0, idx); 
				}
				//rightEl.className = rightEl.className;
			}
		}; 

	}
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

protected void releaseChild () {
	super.releaseChild ();
	int index = parent.indexOf (this);
	if (index == parent.getSelectionIndex ()) {
		if (control != null) control.setVisible (false);
	}
	parent.destroyItem (this);
}

protected void releaseWidget () {
	super.releaseWidget ();
	control = null;
	parent = null;
}
protected void releaseHandle() {
	if (textEl != null) {
		OS.destroyHandle(textEl);
		textEl = null;
	}
	if (rightEl != null){
		OS.destroyHandle(rightEl);
		rightEl = null;
	}
	if (handle != null) {
		OS.destroyHandle(handle);
		handle = null;
	}
	super.releaseHandle();
}
protected void prepareCloseBtn(boolean in){
	//rightEl.style.backgroundImage = in ? "url(images/ctab-simple-right-close.png)" : "url(images/ctab-simple-right.gif)";
	String key = " ctab-item-attach-close-right";
	if(this.isSelected || !parent.showClose){
		return;
	}
	int idx = rightEl.className.indexOf(key);
	if(idx != -1){
		rightEl.className = 
			rightEl.className.substring(0,idx) + rightEl.className.substring(idx+key.length());
	}
	if(in){
		rightEl.className += " ctab-item-attach-close-right";
	}
	/*
	 * Workaround for firefox;)
	 */
	this.handle.style.height = (OS.getContainerHeight(this.textEl) + 1)+ "px";
	this.rightEl.style.height = (OS.getContainerHeight(this.textEl) + 1)+ "px";
}

protected void showCloseFocus(){

}

String cssClassForRight(){
	String cssName = "ctab-item-attach-";
	cssName += parent.simple ? "" : "rounded-";
	cssName += parent.showClose ? "default-" : "noextrapos-";
	cssName += "right";
	return cssName;
}

}
