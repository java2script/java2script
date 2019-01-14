/*
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (c) 1997, 2006, Oracle and/or its affiliates. All rights reserved.
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

import java.awt.event.ActionEvent;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.InputEvent;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import javax.swing.AbstractButton;
import javax.swing.ButtonModel;
import javax.swing.InputMap;
import javax.swing.JComponent;
import javax.swing.JMenu;
import javax.swing.KeyStroke;
import javax.swing.SwingUtilities;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.plaf.ComponentInputMapUIResource;
import sun.swing.UIAction;
import swingjs.api.js.DOMNode;

/**
 * A Button Listener for SwingJS that is one instantialization per button.
 * 
 * 
 * 
 * @author Jeff Dinkins
 * @author Arnaud Weber (keyboard UI support)
 * 
 * 
 *         Note that in Swingjs a JavaScript button press is routed directly
 *         to the button via a link to the UI, not routed through the
 *         underlying panel based on xy position. 
 * 
 * @author Bob Hanson
 */

public class ButtonListener implements MouseListener, MouseMotionListener,
		FocusListener, ChangeListener, PropertyChangeListener {
	
	private JSButtonUI ui;

	/**
	 * Populates Buttons actions.
	 */
	static void loadActionMap(LazyActionMap map) {
		map.put(new Actions(Actions.PRESS));
		map.put(new Actions(Actions.RELEASE));
	}

	public ButtonListener(JSButtonUI ui, boolean isMenuItem) {
		this.ui = ui;
	}


	
//	static String labelprops = AbstractButton.MARGIN_CHANGED_PROPERTY + ";"
//			+ AbstractButton.VERTICAL_ALIGNMENT_CHANGED_PROPERTY + ";"
//			+ AbstractButton.HORIZONTAL_ALIGNMENT_CHANGED_PROPERTY + ";"
//			+ AbstractButton.VERTICAL_TEXT_POSITION_CHANGED_PROPERTY + ";"
//			+ AbstractButton.HORIZONTAL_TEXT_POSITION_CHANGED_PROPERTY;

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		if (ui.isUIDisabled)
			return;
		// System.out.println("JSButtonListener property change: " + prop + " " +
		// e.getSource());
		AbstractButton b = (AbstractButton) e.getSource();
		
		if (prop == AbstractButton.CONTENT_AREA_FILLED_CHANGED_PROPERTY) {
			checkOpacity(b);
			return;
		}
		if (prop == AbstractButton.MNEMONIC_CHANGED_PROPERTY) {
			updateMnemonicBinding(b);
		}
		ui.propertyChangedFromListener(e, prop);
	}

	protected void checkOpacity(AbstractButton b) {
		b.setOpaque(b.isContentAreaFilled());
	}

	/**
	 * Register default key actions: pressing space to "click" a button and
	 * registring the keyboard mnemonic (if any).
	 */
	public void installKeyboardActions(JComponent c) {
		AbstractButton button = (AbstractButton) c;
		// Update the mnemonic binding.
		updateMnemonicBinding(button);

		LazyActionMap.installLazyActionMap(c, ButtonListener.class,
				"Button.actionMap");

		InputMap km = getInputMap(JComponent.WHEN_FOCUSED, c);

		SwingUtilities.replaceUIInputMap(c, JComponent.WHEN_FOCUSED, km);
	}

	/**
	 * Unregister's default key actions
	 */
	public void uninstallKeyboardActions(JComponent c) {
		SwingUtilities
				.replaceUIInputMap(c, JComponent.WHEN_IN_FOCUSED_WINDOW, null);
		SwingUtilities.replaceUIInputMap(c, JComponent.WHEN_FOCUSED, null);
		SwingUtilities.replaceUIActionMap(c, null);
	}

	/**
	 * Returns the InputMap for condition <code>condition</code>. Called as part
	 * of <code>installKeyboardActions</code>.
	 */
	InputMap getInputMap(int condition, JComponent c) {
		// if (condition == JComponent.WHEN_FOCUSED) {
		// BasicButtonUI ui = (BasicButtonUI)BasicLookAndFeel.getUIOfType(
		// ((AbstractButton)c).getUI(), BasicButtonUI.class);
		// if (ui != null) {
		// return (InputMap)DefaultLookup.get(
		// c, ui, ui.getPropertyPrefix() + "focusInputMap");
		// }
		// }
		return null;
	}

	/**
	 * Resets the binding for the mnemonic in the WHEN_IN_FOCUSED_WINDOW UI
	 * InputMap.
	 */
	void updateMnemonicBinding(AbstractButton b) {
		int m = b.getMnemonic();
		if (m != 0) {
			InputMap map = SwingUtilities.getUIInputMap(b,
					JComponent.WHEN_IN_FOCUSED_WINDOW);

			if (map == null) {
				map = new ComponentInputMapUIResource(b);
				SwingUtilities.replaceUIInputMap(b, JComponent.WHEN_IN_FOCUSED_WINDOW,
						map);
			}
			map.clear();
			map.put(KeyStroke.getKeyStroke(m, InputEvent.ALT_MASK, false), "pressed");
			map.put(KeyStroke.getKeyStroke(m, InputEvent.ALT_MASK, true), "released");
			map.put(KeyStroke.getKeyStroke(m, 0, true), "released");
		} else {
			InputMap map = SwingUtilities.getUIInputMap(b,
					JComponent.WHEN_IN_FOCUSED_WINDOW);
			if (map != null) {
				map.clear();
			}
		}
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		AbstractButton b = (AbstractButton) e.getSource();
		verifyButtonClick(b);
	}

	@Override
	public void focusGained(FocusEvent e) {
		// AbstractButton b = (AbstractButton) e.getSource();
		// if (b instanceof JButton && ((JButton)b).isDefaultCapable()) {
		// JRootPane root = b.getRootPane();
		// if (root != null) {
		// BasicButtonUI ui = (BasicButtonUI)BasicLookAndFeel.getUIOfType(
		// ((AbstractButton)b).getUI(), BasicButtonUI.class);
		// if (ui != null && DefaultLookup.getBoolean(b, ui,
		// ui.getPropertyPrefix() +
		// "defaultButtonFollowsFocus", true)) {
		// root.putClientProperty("temporaryDefaultButton", b);
		// root.setDefaultButton((JButton)b);
		// root.putClientProperty("temporaryDefaultButton", null);
		// }
		// }
		// }
		// b.repaint();
	}

	@Override
	public void focusLost(FocusEvent e) {
		AbstractButton b = (AbstractButton) e.getSource();
		// JRootPane root = b.getRootPane();
		// if (root != null) {
		// JButton initialDefault =
		// (JButton)root.getClientProperty("initialDefaultButton");
		// if (b != initialDefault) {
		// BasicButtonUI ui = (BasicButtonUI)BasicLookAndFeel.getUIOfType(
		// ((AbstractButton)b).getUI(), BasicButtonUI.class);
		// if (ui != null && DefaultLookup.getBoolean(b, ui,
		// ui.getPropertyPrefix() +
		// "defaultButtonFollowsFocus", true)) {
		// root.setDefaultButton(initialDefault);
		// }
		// }
		// }
		//
		ButtonModel model = b.getModel();
		model.setArmed(false);
		model.setPressed(false);
		//
		// b.repaint();
	}

	@Override
	public void mouseMoved(MouseEvent e) {
	}

	@Override
	public void mouseDragged(MouseEvent e) {
	}

	@Override
	public void mouseClicked(MouseEvent e) {
	}

	@Override
	public void mousePressed(MouseEvent e) {
		if (SwingUtilities.isLeftMouseButton(e)) {
			AbstractButton b = (AbstractButton) e.getSource();
			if (b.getUIClassID() == "MenuUI" && ((JMenu)b).isTopLevelMenu()) {
				((JMenu)b).setPopupMenuVisible (true);
				JComponent root = ((JComponent) b.getTopLevelAncestor()).getRootPane();
				root.requestFocus();
				
				/** @j2sNative   root.ui.focusNode.focus(); */
				
			}
		}
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		if (SwingUtilities.isLeftMouseButton(e)) {
			AbstractButton b = (AbstractButton) e.getSource();
			if (b.getUIClassID() == "MenuUI") {
				return;
			}
			b.doClick(0);
			verifyButtonClick(b);

			// // if (!isMenuItem && !b.contains(e.getX(), e.getY()))
			// // return;
			// // We need to check the state before and after the button click
			// // for radio and checkboxes to make sure the DOM button actually got
			// hit.
			// // mousePress is an "arm"; mouseRelease is a "click"
			//
			// long multiClickThreshhold = b.getMultiClickThreshhold();
			// long lastTime = lastPressedTimestamp;
			// long currentTime = lastPressedTimestamp = e.getWhen();
			// if (lastTime != -1 && currentTime - lastTime < multiClickThreshhold) {
			// shouldDiscardRelease = true;
			// return;
			// }
			//
			// //System.out.println("JSButtonListener press " + b.getName() + " " +
			// e);
			//
			// ButtonModel model = b.getModel();
			// if (!model.isEnabled()) {
			// // Disabled buttons ignore all input...
			// return;
			// }
			// if (!model.isArmed()) {
			// // button not armed, should be
			// model.setArmed(true);
			// }
			// model.setPressed(true);
			// if (!b.hasFocus() && b.isRequestFocusEnabled()) {
			// b.requestFocus();
			// }
			// // Support for multiClickThreshhold
			// if (shouldDiscardRelease) {
			// shouldDiscardRelease = false;
			// return;
			// }
			// AbstractButton b = (AbstractButton) e.getSource();
			// ButtonModel model = b.getModel();
			// //necessary? ((JSButtonUI) (ComponentUI)
			// b.getUI()).verifyButtonClick(model);
			//
			// //System.out.println("JSButtonListener released " + b.getName() + " " +
			// e);
			//
			// model.setPressed(false);
			// model.setArmed(false);
		}
	}

	@Override
	public void mouseEntered(MouseEvent e) {
		AbstractButton b = (AbstractButton) e.getSource();
		ButtonModel model = b.getModel();
		if (b.isRolloverEnabled() && !SwingUtilities.isLeftMouseButton(e)) {
			model.setRollover(true);
		}
		if (model.isPressed())
			model.setArmed(true);
	}

	@Override
	public void mouseExited(MouseEvent e) {
		AbstractButton b = (AbstractButton) e.getSource();
		ButtonModel model = b.getModel();
		if (b.isRolloverEnabled()) {
			model.setRollover(false);
		}
		model.setArmed(false);
	}

	/**
	 * Just ensure the button is in sync by forcing the 
	 * HTML5 DOM button to the same setting as Java. 
	 * 
	 * @param m
	 * 
	 * @return true
	 */
	boolean verifyButtonClick(AbstractButton b) {
		ButtonModel m = b.getModel();
		DOMNode btn = ui.actionNode;
		// BH: I don't know that this is necessary anymore
		boolean state = m.isSelected();// && !ui.isRadio;
		/**
		 * @j2sNative
		 * 
		 *            setTimeout(function(){btn && (btn.checked = state)}, 0);
		 */
		{
		  System.out.println("" + btn + state);
		}
		return true;
	}

	/**
	 * Actions for Buttons. Two types of action are supported: pressed: Moves the
	 * button to a pressed state released: Disarms the button.
	 */
	private static class Actions extends UIAction {
		private static final String PRESS = "pressed";
		private static final String RELEASE = "released";

		Actions(String name) {
			super(name);
		}

		@Override
		public void actionPerformed(ActionEvent e) {
			AbstractButton b = (AbstractButton) e.getSource();
			String key = getName();
			if (key == PRESS) {
				ButtonModel model = b.getModel();
				model.setArmed(true);
				model.setPressed(true);
				if (!b.hasFocus()) {
					b.requestFocus();
				}
			} else if (key == RELEASE) {
				ButtonModel model = b.getModel();
				model.setPressed(false);
				model.setArmed(false);
			}
		}

		@Override
		public boolean isEnabled(Object sender) {
			if (sender != null && (sender instanceof AbstractButton)
					&& !((AbstractButton) sender).getModel().isEnabled()) {
				return false;
			} else {
				return true;
			}
		}
	}
}
