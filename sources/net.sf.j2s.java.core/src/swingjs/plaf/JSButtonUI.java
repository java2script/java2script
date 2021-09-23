/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1997, 2005, Oracle and/or its affiliates. All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Oracle designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Oracle in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Oracle, 500 Oracle Parkway, Redwood Shores, CA 94065 USA
 * or visit www.oracle.com if you need additional information or have any
 * questions.
 */

package swingjs.plaf;

//import java.awt.FontMetrics;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Insets;
import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;
import java.awt.event.MouseMotionListener;
import java.awt.image.BufferedImage;

import javax.swing.AbstractButton;
import javax.swing.BorderFactory;
import javax.swing.ButtonModel;
import javax.swing.Icon;
import javax.swing.JComponent;
import javax.swing.JMenuItem;
import javax.swing.LookAndFeel;
import javax.swing.UIManager;
import javax.swing.plaf.UIResource;

import swingjs.api.js.DOMNode;

/**
 * SWingJS implementation of stateful user interface for buttons. Modeled after
 * javax.swing.plaf.basic.BasicButtonUI.java (commented out below).
 * 
 * @author Bob Hanson
 * 
 */
public class JSButtonUI extends JSLightweightUI {

	// Hierarchy:
	//
	// JSButtonUI
	// |
	// |__JSMenuItemUI
	// | |
	// | |__JSMenuUI
	// |
	// |__JSRadioButtonUI
	// |
	// |__JSCheckBoxUI
	// | |
	// | |__JSCheckBoxMenuItemUI
	// |
	// |__JSRadioButtonMenuItemUI
	//
	//
	// mousePress --> Frame(Component).dispatchEvent
	// --> LightWeightDispatcher --> [data-component]

	/**
	 * a wrapper if this is not a menu item
	 */
	protected JMenuItem menuItem;
	protected AbstractButton button;

	@Override
	public DOMNode updateDOMNode() {
		// all subclasses will have their own version of this. They do not call super.updateDOMNode()
		// this one is only for a simple button
		if (domNode == null) {
			isSimpleButton = true;
			imagePersists = true; // at least for now.
			allowPaintedBackground = false;
			setDoPropagate();
			domNode = enableNode = buttonNode = newDOMObject("button", id + "_dom", "type", "button", "style", "padding:0");
			//DOMNode.setStyles(domNode, "outline", "none");
			//DOMNode.setStyles(domNode,"transform","translateY(0.5px)translateX(0.5px)");
			addClass(domNode, "j2sbutton");
			setFocusable();
			DOMNode.setPositionAbsolute(domNode);
			iconNode = null;
			createButton();
		}
		setupButton();
		return updateDOMNodeCUI();
	}

	protected void createButton() {
		addCentering(buttonNode);
		setDataComponent(buttonNode);
		if (actionNode != null && iconNode != actionNode)
			setDataComponent(actionNode);
		setDataComponent(iconNode); // needed for mac safari/chrome
		setDataComponent(textNode); // needed for mac safari/chrome
		setEnabled(c.isEnabled());
	}
	
	/**
	 * We need to also set the data-component object for the mnemonic
	 */
	@Override
	protected DOMNode setJSText(DOMNode obj, String prop, String val) {
		DOMNode node = DOMNode.setAttr(obj, prop, val);
		if (val.indexOf("<u>") >= 0) {
			setDataComponent(DOMNode.firstChild(node));
		}
		return node;
	}



	
	/**
	 * 
	 * @param type       "_item" or "_menu" (unused)
	 * @param buttonNode will be a for-label for radio and checkbox only; otherwise
	 *                   null
	 * @return
	 */
	protected DOMNode createItem(String type, DOMNode buttonNode) {
		// all subclasses will call this method, including
		// standard MenuItem and Menu labels
		String text = button.getText();
		Icon icon = getIcon();
		int gap = button.getIconTextGap();
		isMenuSep = (("|").equals(text) || ("-").equals(text));
		if (isMenuSep) {
			// separator masquerading as a menu item
			text = null;
		}
		itemNode = newDOMObject("li", id);
		if (text == null && icon == null)
			return itemNode;
		DOMNode.setStyle(itemNode, "outline", "none");
		menuAnchorNode = newDOMObject("div", id + "_a");// this needed? , "tabindex", "8");
		if (type != "_bar") {
			addClass(menuAnchorNode, "a");
//			DOMNode.setStyles(menuAnchorNode, "margin", "1px 2px 1px 2px", "height", "1em");
		}
		itemNode.appendChild(menuAnchorNode);
		setDoPropagate();
		if (buttonNode == null) {
			// not a radio or checkbox
			addCentering(menuAnchorNode);
			enableNode = itemNode;
			setIconAndText("btn", icon, gap, text);
		} else {
			menuAnchorNode.appendChild(buttonNode);
			setMenuItem(buttonNode);
		}
		setMenuItem(menuAnchorNode);
		setMenuItem();
		// j2sMenu.js will set the mouse-up event for the <a> tag with the
		// role=menuitem
		// attribute via j2sApplet.setMouse().
		// That event will then fire handleJSEvent
		setDataComponent(menuAnchorNode);
		setDataComponent(itemNode);
		return itemNode;
	}

	protected void setMenuItem() {
		setMenuItem(itemNode);
		setMenuItem(iconNode);
		if (actionNode != null && actionNode != iconNode)
			setMenuItem(actionNode);
		setMenuItem(textNode);
		setMenuItem(centeringNode);
	}

	@SuppressWarnings("unused")
	@Override
	protected void enableNode(DOMNode node, boolean b) {
		if (node == null || isUIDisabled)
			return;
		if (isMenuItem) {
			if (b) {
				removeClass(node, JSPopupMenuUI.UI_DISABLED);
			} else {
				addClass(node, JSPopupMenuUI.UI_DISABLED);
			}
			return;
		}
		super.enableNode(node, b);
	}

	protected void setupButton() {
		setIconAndText("button", getIcon(), button.getIconTextGap(), button.getText());
		// "emptyBorder" is not really empty.
		if (button.getBorder() == null || button.getBorder() == BorderFactory.emptyBorder)
			DOMNode.setStyle(buttonNode, "border", "none");
		else if (button.getBorder() == BorderFactory.html5Border)
			DOMNode.setStyle(buttonNode, "border", null);
		if (!button.isContentAreaFilled())
			DOMNode.setStyles(domNode, "border", "none", "outline", "none");
//
//		System.out.println(button.getText() + " " + button.getBorder());
		if (!isMenuSep) {
			setMnemonic(-1);
			setAlignments(button, false);
			updateCenteringNode();
		}
		
	}

	@Override
	public void dispose() {
		if (isUIDisabled)
			return;
		super.dispose();
		if (menuAnchorNode != null) {
			// This is set in j2sMenu.js; we set it null here
			// re-establish events when this button is added again
			DOMNode.setAttr(menuAnchorNode, "_menu", null);
		}
	}

	@Override
	protected void undisposeUI(DOMNode node) {
		if (!isDisposed)
			return;
		super.undisposeUI(node);
	}


	/**
	 * called by j2sApplet.js
	 * 
	 * @return handled
	 */
	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		// from menus only - action is on mouse-up
		// other controls use a ButtonListener
		// checkbox or radio menuitem handle themselves
		if (eventType == KeyEvent.KEY_PRESSED) {

		}
		if (actionNode == null) {
			if (menuItem == null) {
				switch (eventType) {
				case KeyEvent.KEY_RELEASED:
					int keyCode = /** @j2sNative jQueryEvent.keyCode || */
							0;
					if (keyCode == 13 || keyCode == 32) {
						button.doClick();
						return HANDLED;
					}
				}
			} else {
				switch (eventType) {
				case MouseEvent.MOUSE_RELEASED:
					menuItem.doClick(0);
					return HANDLED;
				}
			}
		}
		return NOT_HANDLED;
	}

	// from BasicButtonUI

	@Override
	public void installUI(JComponent jc) {
		// response to general button actions
		// takes place through the standard Java
		// pathway involving Component.LightweightDispatcher
		// posting to the event queue
		button = (AbstractButton) jc;
		installDefaults(button);
		installListeners(button);
		installKeyboardActions(button);
	}

	@Override
	public void uninstallUI(JComponent jc) {
		uninstallKeyboardActions(button);
		uninstallListeners(button);

		// uninstallDefaults((AbstractButton) c);
	}

	protected void installListeners(AbstractButton b) {
		buttonListener = new ButtonListener(this);
		if (buttonListener != null) {
			b.addMouseListener(buttonListener);
			b.addMouseMotionListener(buttonListener);
			b.addFocusListener(buttonListener);
			b.addPropertyChangeListener(buttonListener);
			b.addChangeListener(buttonListener);
		}
	}

	protected void uninstallListeners(AbstractButton b) {
		ButtonListener listener = getButtonListener(b);
		if (listener != null) {
			b.removeMouseListener(listener);
			b.removeMouseMotionListener(listener);
			b.removeFocusListener(listener);
			b.removeChangeListener(listener);
			b.removePropertyChangeListener(listener);
		}
	}

	protected void installKeyboardActions(AbstractButton b) {
		ButtonListener listener = getButtonListener(b);
		if (listener != null) {
			listener.installKeyboardActions(b);
		}
	}

	protected void uninstallKeyboardActions(AbstractButton b) {
		ButtonListener listener = getButtonListener(b);
		if (listener != null) {
			listener.uninstallKeyboardActions(b);
		}
	}

	/**
	 * Returns the ButtonListener for the passed in Button, or null if one could not
	 * be found.
	 */
	protected ButtonListener getButtonListener(AbstractButton b) {
		MouseMotionListener[] listeners = b.getMouseMotionListeners();

		if (listeners != null) {
			for (int counter = 0; counter < listeners.length; counter++) {
				if (listeners[counter] instanceof ButtonListener) {
					return (ButtonListener) listeners[counter];
				}
			}
		}
		return null;
	}

	// SwingJS -- this is interesting, as it summarizes everything we will need
	// to implement, ultimately. SwingUtilities.layoutCompoundLabel
	// details what we are going to have to do somewhere.

	// private String layout(AbstractButton b, FontMetrics fm, int width, int
	// height) {
	// Insets i = b.getInsets();
	// viewRect.x = i.left;
	// viewRect.y = i.top;
	// viewRect.width = width - (i.right + viewRect.x);
	// viewRect.height = height - (i.bottom + viewRect.y);
	//
	// textRect.x = textRect.y = textRect.width = textRect.height = 0;
	// iconRect.x = iconRect.y = iconRect.width = iconRect.height = 0;
	//
	// // layout the text and icon
	// return SwingUtilities.layoutCompoundLabel(b, fm, b.getText(), b.getIcon(),
	// b.getVerticalAlignment(), b.getHorizontalAlignment(),
	// b.getVerticalTextPosition(), b.getHorizontalTextPosition(), viewRect,
	// iconRect, textRect, b.getText() == null ? 0 : b.getIconTextGap());
	// return null;
	// }

	// // Visual constants
	// // NOTE: This is not used or set any where. Were we allowed to remove
	// // fields, this would be removed.
	// protected int defaultTextIconGap;
	//
	/**
	 * Amount to offset text, the value of this comes from defaultTextShiftOffset
	 * once setTextShiftOffset has been invoked.
	 */
	protected int shiftOffset = 0;

	/**
	 * Value that is set in shiftOffset once setTextShiftOffset has been invoked.
	 * The value of this comes from the defaults table.
	 */
	protected int defaultTextShiftOffset;

	@Override
	protected String getPropertyPrefix() {
		return "Button";
	}

	//
	// protected String propertyPrefix = "Button.";
	//
	// private static final Object BASIC_BUTTON_UI_KEY = new Object();
	//
	// // ********************************
	// // Create PLAF
	// // ********************************
	// public static ComponentUI createUI(JComponent c) {
	// AppContext appContext = AppContext.getAppContext();
	// BasicButtonUI buttonUI =
	// (BasicButtonUI) appContext.get(BASIC_BUTTON_UI_KEY);
	// if (buttonUI == null) {
	// buttonUI = new BasicButtonUI();
	// appContext.put(BASIC_BUTTON_UI_KEY, buttonUI);
	// }
	// return buttonUI;
	// }
	//
	//
	//
	// // ********************************
	// // Install PLAF
	// // ********************************
	// public void installUI(JComponent c) {
	// installDefaults((AbstractButton) c);
	// installListeners((AbstractButton) c);
	// installKeyboardActions((AbstractButton) c);
	// BasicHTML.updateRenderer(c, ((AbstractButton) c).getText());
	// }
	//
	protected void installDefaults(AbstractButton b) {
		// load shared instance defaults
		String pp = getPropertyPrefix();

		defaultTextShiftOffset = UIManager.getInt(pp + ".textShiftOffset");

		// // set the following defaults on the button
		// if (b.isContentAreaFilled()) {
		// LookAndFeel.installProperty(b, "opaque", Boolean.TRUE);
		// } else {
		// LookAndFeel.installProperty(b, "opaque", Boolean.FALSE);
		// }

		if (b.getMargin() == null || (b.getMargin() instanceof UIResource)) {
			b.setMargin(UIManager.getInsets(pp + ".margin"));
		}
		LookAndFeel.installColorsAndFont(b, pp + ".background", pp + ".foreground", pp + ".font");

		LookAndFeel.installBorder(b, pp + ".border");
		//
		// Object rollover = UIManager.get(pp + "rollover");
		// if (rollover != null) {
		// LookAndFeel.installProperty(b, "rolloverEnabled", rollover);
		// }
		LookAndFeel.installProperty(b, "iconTextGap", new Integer(4));
	}

	//
	// protected void installListeners(AbstractButton b) {
	// JSButtonListener listener = createButtonListener(b);
	// if(listener != null) {
	// b.addMouseListener(listener);
	// b.addMouseMotionListener(listener);
	// b.addFocusListener(listener);
	// b.addPropertyChangeListener(listener);
	// b.addChangeListener(listener);
	// }
	// }
	//
	// protected void installKeyboardActions(AbstractButton b){
	// JSButtonListener listener = getButtonListener(b);
	//
	// if(listener != null) {
	// listener.installKeyboardActions(b);
	// }
	// }
	//
	//
	// // ********************************
	// // Uninstall PLAF
	// // ********************************
	// public void uninstallUI(JComponent c) {
	// uninstallKeyboardActions((AbstractButton) c);
	// uninstallListeners((AbstractButton) c);
	// uninstallDefaults((AbstractButton) c);
	// BasicHTML.updateRenderer(c, "");
	// }
	//
	// protected void uninstallKeyboardActions(AbstractButton b) {
	// JSButtonListener listener = getButtonListener(b);
	// if(listener != null) {
	// listener.uninstallKeyboardActions(b);
	// }
	// }
	//
	// protected void uninstallListeners(AbstractButton b) {
	// JSButtonListener listener = getButtonListener(b);
	// if(listener != null) {
	// b.removeMouseListener(listener);
	// b.removeMouseMotionListener(listener);
	// b.removeFocusListener(listener);
	// b.removeChangeListener(listener);
	// b.removePropertyChangeListener(listener);
	// }
	// }
	//
	// protected void uninstallDefaults(AbstractButton b) {
	// LookAndFeel.uninstallBorder(b);
	// }
	//
	// // ********************************
	// // Create Listeners
	// // ********************************
	// protected JSButtonListener createButtonListener(AbstractButton b) {
	// return new JSButtonListener(b);
	// }
	//
	// public int getDefaultTextIconGap(AbstractButton b) {
	// return defaultTextIconGap;
	// }
	//
	// /* These rectangles/insets are allocated once for all
	// * ButtonUI.paint() calls. Re-using rectangles rather than
	// * allocating them in each paint call substantially reduced the time
	// * it took paint to run. Obviously, this method can't be re-entered.
	// */
	// private static Rectangle viewRect = new Rectangle();
	// private static Rectangle textRect = new Rectangle();
	// private static Rectangle iconRect = new Rectangle();
	//
	// // ********************************
	// // Paint Methods
	// // ********************************
	//
	// public void paint(Graphics g, JComponent c)
	// {
	// AbstractButton b = (AbstractButton) jc;
	// ButtonModel model = b.getModel();
	//
	// String text = layout(b, SwingUtilities2.getFontMetrics(b, g),
	// b.getWidth(), b.getHeight());
	//
	// clearTextShiftOffset();
	//
	// // perform UI specific press action, e.g. Windows L&F shifts text
	// if (model.isArmed() && model.isPressed()) {
	// paintButtonPressed(g,b);
	// }
	//
	// // Paint the Icon
	// if(b.getIcon() != null) {
	// paintIcon(g,c,iconRect);
	// }
	//
	// if (text != null && !text.equals("")){
	// View v = (View) c.getClientProperty(BasicHTML.propertyKey);
	// if (v != null) {
	// v.paint(g, textRect);
	// } else {
	// paintText(g, b, textRect, text);
	// }
	// }
	//
	// if (b.isFocusPainted() && b.hasFocus()) {
	// // paint UI specific focus
	// paintFocus(g,b,viewRect,textRect,iconRect);
	// }
	// }
	//
	// protected void paintIcon(Graphics g, JComponent c, Rectangle iconRect){
	// AbstractButton b = (AbstractButton) jc;
	// ButtonModel model = b.getModel();
	// Icon icon = b.getIcon();
	// Icon tmpIcon = null;
	//
	// if(icon == null) {
	// return;
	// }
	//
	// Icon selectedIcon = null;
	//
	// /* the fallback icon should be based on the selected state */
	// if (model.isSelected()) {
	// selectedIcon = (Icon) b.getSelectedIcon();
	// if (selectedIcon != null) {
	// icon = selectedIcon;
	// }
	// }
	//
	// if(!model.isEnabled()) {
	// if(model.isSelected()) {
	// tmpIcon = (Icon) b.getDisabledSelectedIcon();
	// if (tmpIcon == null) {
	// tmpIcon = selectedIcon;
	// }
	// }
	//
	// if (tmpIcon == null) {
	// tmpIcon = (Icon) b.getDisabledIcon();
	// }
	// } else if(model.isPressed() && model.isArmed()) {
	// tmpIcon = (Icon) b.getPressedIcon();
	// if(tmpIcon != null) {
	// // revert back to 0 offset
	// clearTextShiftOffset();
	// }
	// } else if(b.isRolloverEnabled() && model.isRollover()) {
	// if(model.isSelected()) {
	// tmpIcon = (Icon) b.getRolloverSelectedIcon();
	// if (tmpIcon == null) {
	// tmpIcon = selectedIcon;
	// }
	// }
	//
	// if (tmpIcon == null) {
	// tmpIcon = (Icon) b.getRolloverIcon();
	// }
	// }
	//
	// if(tmpIcon != null) {
	// icon = tmpIcon;
	// }
	//
	// if(model.isPressed() && model.isArmed()) {
	// icon.paintIcon(c, g, iconRect.x + getTextShiftOffset(),
	// iconRect.y + getTextShiftOffset());
	// } else {
	// icon.paintIcon(c, g, iconRect.x, iconRect.y);
	// }
	//
	// }
	//
	// /**
	// * As of Java 2 platform v 1.4 this method should not be used or overriden.
	// * Use the paintText method which takes the AbstractButton argument.
	// */
	// protected void paintText(Graphics g, JComponent c, Rectangle textRect,
	// String text) {
	// AbstractButton b = (AbstractButton) jc;
	// ButtonModel model = b.getModel();
	// FontMetrics fm = SwingUtilities2.getFontMetrics(c, g);
	// int mnemonicIndex = b.getDisplayedMnemonicIndex();
	//
	// /* Draw the Text */
	// if(model.isEnabled()) {
	// /*** paint the text normally */
	// g.setColor(b.getForeground());
	// SwingUtilities2.drawStringUnderlineCharAt(c, g,text, mnemonicIndex,
	// textRect.x + getTextShiftOffset(),
	// textRect.y + fm.getAscent() + getTextShiftOffset());
	// }
	// else {
	// /*** paint the text disabled ***/
	// g.setColor(b.getBackground().brighter());
	// SwingUtilities2.drawStringUnderlineCharAt(c, g,text, mnemonicIndex,
	// textRect.x, textRect.y + fm.getAscent());
	// g.setColor(b.getBackground().darker());
	// SwingUtilities2.drawStringUnderlineCharAt(c, g,text, mnemonicIndex,
	// textRect.x - 1, textRect.y + fm.getAscent() - 1);
	// }
	// }
	//
	// /**
	// * Method which renders the text of the current button.
	// * <p>
	// * @param g Graphics context
	// * @param b Current button to render
	// * @param textRect Bounding rectangle to render the text.
	// * @param text String to render
	// * @since 1.4
	// */
	// protected void paintText(Graphics g, AbstractButton b, Rectangle textRect,
	// String text) {
	// paintText(g, (JComponent)b, textRect, text);
	// }
	//
	// // Method signature defined here overriden in subclasses.
	// // Perhaps this class should be abstract?
	// protected void paintFocus(Graphics g, AbstractButton b,
	// Rectangle viewRect, Rectangle textRect, Rectangle iconRect){
	// }
	//
	//
	//
	// protected void paintButtonPressed(Graphics g, AbstractButton b){
	// }
	//
	// protected void clearTextShiftOffset(){
	// this.shiftOffset = 0;
	// }
	//
	// protected void setTextShiftOffset(){
	// this.shiftOffset = defaultTextShiftOffset;
	// }
	//
	// protected int getTextShiftOffset() {
	// return shiftOffset;
	// }
	//
	// // ********************************
	// // Layout Methods
	// // ********************************
	
	//
	// public Dimension getPreferredSize(JComponent c) {
	// AbstractButton b = (AbstractButton)c;
	// return BasicGraphicsUtils.getPreferredButtonSize(b, b.getIconTextGap());
	// }
	//
	// public Dimension getMaximumSize(JComponent c) {
	// Dimension d = getPreferredSize(c);
	// View v = (View) c.getClientProperty(BasicHTML.propertyKey);
	// if (v != null) {
	// d.width += v.getMaximumSpan(View.X_AXIS) - v.getPreferredSpan(View.X_AXIS);
	// }
	// return d;
	// }
	//
	// /**
	// * Returns the baseline.
	// *
	// * @throws NullPointerException {@inheritDoc}
	// * @throws IllegalArgumentException {@inheritDoc}
	// * @see javax.swing.JComponent#getBaseline(int, int)
	// * @since 1.6
	// */
	// public int getBaseline(JComponent c, int width, int height) {
	// super.getBaseline(c, width, height);
	// AbstractButton b = (AbstractButton)c;
	// String text = b.getText();
	// if (text == null || "".equals(text)) {
	// return -1;
	// }
	// FontMetrics fm = b.getFontMetrics(b.getFont());
	// layout(b, fm, width, height);
	// return BasicHTML.getBaseline(b, textRect.y, fm.getAscent(),
	// textRect.width, textRect.height);
	// }
	//
	// /**
	// * Returns an enum indicating how the baseline of the component
	// * changes as the size changes.
	// *
	// * @throws NullPointerException {@inheritDoc}
	// * @see javax.swing.JComponent#getBaseline(int, int)
	// * @since 1.6
	// */
	// public Component.BaselineResizeBehavior getBaselineResizeBehavior(
	// JComponent c) {
	// super.getBaselineResizeBehavior(c);
	// if (c.getClientProperty(BasicHTML.propertyKey) != null) {
	// return Component.BaselineResizeBehavior.OTHER;
	// }
	// switch(((AbstractButton)c).getVerticalAlignment()) {
	// case AbstractButton.TOP:
	// return Component.BaselineResizeBehavior.CONSTANT_ASCENT;
	// case AbstractButton.BOTTOM:
	// return Component.BaselineResizeBehavior.CONSTANT_DESCENT;
	// case AbstractButton.CENTER:
	// return Component.BaselineResizeBehavior.CENTER_OFFSET;
	// }
	// return Component.BaselineResizeBehavior.OTHER;
	// }
	//
	// private String layout(AbstractButton b, FontMetrics fm,
	// int width, int height) {
	// Insets i = b.getInsets();
	// viewRect.x = i.left;
	// viewRect.y = i.top;
	// viewRect.width = width - (i.right + viewRect.x);
	// viewRect.height = height - (i.bottom + viewRect.y);
	//
	// textRect.x = textRect.y = textRect.width = textRect.height = 0;
	// iconRect.x = iconRect.y = iconRect.width = iconRect.height = 0;
	//
	// // layout the text and icon
	// return SwingUtilities.layoutCompoundLabel(
	// b, fm, b.getText(), b.getIcon(),
	// b.getVerticalAlignment(), b.getHorizontalAlignment(),
	// b.getVerticalTextPosition(), b.getHorizontalTextPosition(),
	// viewRect, iconRect, textRect,
	// b.getText() == null ? 0 : b.getIconTextGap());
	// }
	//
	// /**
	// * Returns the ButtonListener for the passed in Button, or null if one
	// * could not be found.
	// */
	// private JSButtonListener getButtonListener(AbstractButton b) {
	// MouseMotionListener[] listeners = b.getMouseMotionListeners();
	//
	// if (listeners != null) {
	// for (int counter = 0; counter < listeners.length; counter++) {
	// if (listeners[counter] instanceof JSButtonListener) {
	// return (JSButtonListener)listeners[counter];
	// }
	// }
	// }
	// return null;
	// }
	//
	//

	@Override
	protected Dimension getCSSAdjustment(boolean addingCSS, boolean mutable) {
		return mutable || itemNode != null ? new Dimension((itemNode == null ? 0 : 10), 0) : ZERO_SIZE;
	}

	@Override
	protected void setInnerComponentBounds(int width, int height) {
		if (isSimpleButton) {// && (imageNode == null || button.getText() == null)) {
			Insets i = getButtonOuterInsets(button);
			if (!(button.getBorder() instanceof UIResource)) {
				DOMNode.setTopLeftAbsolute(domNode, i.top, i.left);
				DOMNode.setSize(domNode, width-i.left - i.right, height-i.top - i.bottom);
				DOMNode.setStyle(domNode, "border", 
					i.left + i.right + i.top + i.bottom > 0 ? "none" : null);
			}
		}
	}

	@Override
	protected Dimension getHTMLSizePreferred(DOMNode obj, boolean addCSS) {
		// addCSS is always false
		setAlignments(button, !addCSS);
		return setHTMLSize1(obj, addCSS, true);
	}

	/**
	 * set in getIcon(); checked in paint
	 * 
	 */
	private Icon thisIcon;

	@SuppressWarnings("unused")
	@Override
	public void paint(Graphics g, JComponent c) {
		if (jc.秘paintsSelfEntirely()) {
			DOMNode.setStyle(centeringNode, "visibility", "visible");
		} else if (currentIcon != null && imageNode != null && imagePersists) {
			Icon icon = thisIcon;
			if (icon != null && icon != getIcon()) {
				$(iconNode).empty();
				currentIcon = getOrCreateIcon(c, thisIcon);
				imageNode = ((BufferedImage) currentIcon.getImage()).秘getImageNode(BufferedImage.GET_IMAGE_FOR_ICON);
				iconNode.appendChild(imageNode);
			}
		}
		super.paint(g, c);
	}

	@Override
	protected Icon getIcon() {
		ButtonModel model = button.getModel();
		Icon disabledIcon = /** @j2sNative this.button.disabledIcon || */
				null;
		return thisIcon = (disabledIcon != null && !model.isEnabled() ? disabledIcon : button.getIcon());
	}


	@Override
	public boolean isFocusable() {
		return true;
	}

	@Override 
	public Dimension getPreferredSize(JComponent jc) {
		if (isAWT && isSimpleButton)
			return JSLabelUI.getMinimumSizePeer(jc, button);
		Icon ic;
		if (!isSimpleButton || isAWT || button.getText() != null || (ic = getIcon()) == null)
			return super.getPreferredSize(jc);
		Insets in = button.getInsets();
		return new Dimension(in.left + in.right + ic.getIconWidth(), in.top + in.bottom + ic.getIconHeight());
	}
	
}
