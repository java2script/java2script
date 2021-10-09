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

import java.awt.Container;
import java.awt.event.ActionEvent;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.InputEvent;
import java.awt.event.KeyEvent;
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
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JPopupMenu;
import javax.swing.KeyStroke;
import javax.swing.MenuElement;
import javax.swing.MenuSelectionManager;
import javax.swing.SwingUtilities;
import javax.swing.UIManager;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.plaf.ComponentInputMapUIResource;

import sun.swing.DefaultLookup;
import sun.swing.UIAction;
import swingjs.api.js.DOMNode;

/**
 * A Button Listener for SwingJS that is one instantialization per button, for
 * all AbstractButtons, including menu items.
 * 
 * 
 * 
 * @author Jeff Dinkins
 * @author Arnaud Weber (keyboard UI support)
 * 
 * 
 *         Note that in Swingjs a JavaScript button press is routed directly to
 *         the button via a link to the UI, not routed through the underlying
 *         panel based on xy position.
 * 
 * @author Bob Hanson
 */

public class ButtonListener
		implements MouseListener, MouseMotionListener, FocusListener, ChangeListener, PropertyChangeListener {

	private JSButtonUI ui;

	/**
	 * Populates Buttons actions.
	 */
	static void loadActionMap(LazyActionMap map) {
		map.put(new Actions(Actions.PRESS));
		map.put(new Actions(Actions.RELEASE));
		map.put(new Actions(Actions.SELECT, null, true)); // for JMenu
		map.put(new Actions(Actions.CLICK)); // for JMenu and JMenuItem
	}

	public ButtonListener(JSButtonUI ui) {
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
		AbstractButton b = (AbstractButton) e.getSource();

		if (prop == AbstractButton.CONTENT_AREA_FILLED_CHANGED_PROPERTY) {
			checkOpacity(b);
			return;
		}
		if (prop == AbstractButton.MNEMONIC_CHANGED_PROPERTY) { // "mnemonic"
			updateMnemonicBinding(b);
		} 
		if (ui.isMenuItem || ui.isMenu) {
			switch (prop) {
			case "labelFor":
			case "displayedMnemonic":
			case "accelerator":
			case "ancestor":
				updateAcceleratorBinding(b);
				updateMnemonicBinding(b);
			break;
			}
		}
		ui.propertyChangedFromListener(e, prop);
	}

	protected void checkOpacity(AbstractButton b) {
		if (!b.isContentAreaFilled()) {
				DOMNode.setStyles(ui.domNode, "border", "none", "outline", "none");
		}
		b.setOpaque(b.isContentAreaFilled());
	}

	/**
	 * Register default key actions: pressing space to "click" a button and
	 * registring the keyboard mnemonic (if any).
	 */
	public void installKeyboardActions(JComponent c) {
		LazyActionMap.installLazyActionMap(c, ButtonListener.class, "Button.actionMap");
		if (!ui.isMenu && !ui.isMenuItem) {
			AbstractButton button = (AbstractButton) c;
			// Update the mnemonic binding.
			updateMnemonicBinding(button);
			InputMap km = getInputMap(JComponent.WHEN_FOCUSED, c);
			SwingUtilities.replaceUIInputMap(c, JComponent.WHEN_FOCUSED, km);
			return;
		}
		if (ui.isMenu)
			crossMenuMnemonic = UIManager.getBoolean("Menu.crossMenuMnemonic");
		createInputMap(c);
		updateAcceleratorBinding((JMenuItem) c);
	}

	InputMap createInputMap(JComponent c) {
		return new ComponentInputMapUIResource(c);
	}

	/**
	 * Unregister's default key actions
	 */
	public void uninstallKeyboardActions(JComponent c) {
		SwingUtilities.replaceUIInputMap(c, JComponent.WHEN_IN_FOCUSED_WINDOW, null);
		SwingUtilities.replaceUIInputMap(c, JComponent.WHEN_FOCUSED, null);
		SwingUtilities.replaceUIActionMap(c, null);
	}

	/**
	 * Returns the InputMap for condition <code>condition</code>. Called as part of
	 * <code>installKeyboardActions</code>.
	 */
	InputMap getInputMap(int condition, JComponent c) {
		if (condition == JComponent.WHEN_FOCUSED) {
//			JSComponentUI ui = (JSComponentUI) c.getUI();
//			if (ui instanceof JSButtonUI) {
				// SwingJS - there was a mistake here -- missing '.' ??
				return (InputMap) DefaultLookup.get(c, ui, ui.getPropertyPrefix() + ".focusInputMap");
//			}
		}
		return null;
	}

	/**
	 * Resets the binding for the mnemonic in the WHEN_IN_FOCUSED_WINDOW UI
	 * InputMap.
	 */
	void updateMnemonicBinding(AbstractButton b) {
		int m = b.getMnemonic();
		
		ui.updateDOMNode();
		if (ui.isMenu && m != 0 && lastMnemonic != 0) {
			ui.setMnemonic(m);
		}
		if (m == lastMnemonic)
			return;
		if (ui.isMenuItem || ui.isMenu) {
			int[] shortcutKeys = (int[]) DefaultLookup.get(ui.menuItem, ui, "Menu.shortcutKeys");
			if (shortcutKeys == null) {
				shortcutKeys = new int[] { KeyEvent.ALT_MASK };
			}
			InputMap map = SwingUtilities.getUIInputMap(ui.menuItem, JComponent.WHEN_IN_FOCUSED_WINDOW);
			if (lastMnemonic != 0 && map != null) {
				for (int shortcutKey : shortcutKeys) {
					map.remove(KeyStroke.getKeyStroke(lastMnemonic, shortcutKey, false));
				}
			}
			if (m != 0) {
				if (map == null) {
					map = createInputMap(ui.menuItem);
					SwingUtilities.replaceUIInputMap(ui.menuItem, JComponent.WHEN_IN_FOCUSED_WINDOW, map);
				}
				for (int i = shortcutKeys.length; --i >= 0;) {
					map.put(KeyStroke.getKeyStroke(m, shortcutKeys[i], false), ui.isMenu ? "selectMenu" : "doClick");
				}
			}
		}
		lastMnemonic = m;
		if (ui.isMenuItem || ui.isMenu) {
			return;
		}
		// non-menu only
		InputMap map = SwingUtilities.getUIInputMap(b, JComponent.WHEN_IN_FOCUSED_WINDOW);
		if (m != 0) {
			if (map == null) {
				map = new ComponentInputMapUIResource(b);
				SwingUtilities.replaceUIInputMap(b, JComponent.WHEN_IN_FOCUSED_WINDOW, map);
			}
			map.clear();
			map.put(KeyStroke.getKeyStroke(m, InputEvent.ALT_MASK, false), "pressed");
			map.put(KeyStroke.getKeyStroke(m, InputEvent.ALT_MASK, true), "released");
			map.put(KeyStroke.getKeyStroke(m, 0, true), "released");
		} else if (map != null) {
			map.clear();
		}
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		AbstractButton b = (AbstractButton) e.getSource();
		verifyButtonClick(b, false);
	}

	@Override
	public void focusGained(FocusEvent e) {
	}

	@Override
	public void focusLost(FocusEvent e) {
		AbstractButton b = (AbstractButton) e.getSource();
		ButtonModel model = b.getModel();
		model.setArmed(false);
		model.setPressed(false);
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
			JSComponentUI ui = b.秘getUI();
			if (ui.isMenu) {
				JMenu jm = (JMenu) b;
				if (jm.isTopLevelMenu()) {
					//jm.setPopupMenuVisible(!jm.isPopupMenuVisible());
					JComponent root = ((JComponent) b.getTopLevelAncestor()).getRootPane();
					root.requestFocus();
					JMenuBar mb = (JMenuBar) jm.getParent();
					int i = mb.getSelectionModel().getSelectedIndex();
					if (i >= 0)
						mb.getMenu(i).setSelected(false);
					// this will drive the menubar selection to -1
				}
				jm.menuSelectionChanged(true);		
			}
		}
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		if (SwingUtilities.isLeftMouseButton(e)) {
			AbstractButton b = (AbstractButton) e.getSource();
			if (checkHideMenus(b))
				return;
			b.doClick(0);
			verifyButtonClick(b, true);
//			JSComponentUI ui = b.秘getUI();
		}
	}

	/**
	 * @param b
	 * @return true if MenuUI
	 */
	private static boolean checkHideMenus(AbstractButton b) {
		String s = b.getUIClassID();
		if (s == "MenuUI")
			return true;
		if (s.indexOf("MenuItemUI") >= 0)
			JSComponentUI.hideMenusAndToolTip();
		return false;
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
	 * It is necessary that this method be called any time the "CHECKED" attribute
	 * of a toggle button is changed. Otherwise it may fire for a previous state
	 * after the state is changed in code directly.
	 * 
	 * @param m
	 * 
	 * @return true
	 */
	boolean verifyButtonClick(AbstractButton b, boolean delayed) {
		DOMNode btn = ui.actionNode;
		if (btn == null || ui.domNode == null)
			return true;
		boolean state = b.getModel().isSelected();
		/**
		 * @j2sNative
		 * 
		 * 			if (delayed) { setTimeout(function(){ btn && btn.checked != state
		 *            && (btn.checked = state); }, 0); } else { btn.checked = state; }
		 * 
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
		private static final String CLICK = "doClick"; // JMenuItem only
		private static final String SELECT = "selectMenu"; // JMenu only

		Actions(String name) {
			super(name);
		}

		@Override
		public void actionPerformed(ActionEvent e) {
			AbstractButton b = (AbstractButton) e.getSource();
			if (b.秘getUI().isModalBlocked())
				return;
			
			ButtonModel model = b.getModel();
			switch (getName()) {
			case PRESS:
				model.setArmed(true);
				model.setPressed(true);
				if (!b.hasFocus()) {
					b.requestFocus();
				}
				break;
			case RELEASE:
				model.setPressed(false);
				model.setArmed(false);
				break;
			case CLICK:
				JMenuItem mi = (JMenuItem) e.getSource();
				MenuSelectionManager.defaultManager().clearSelectedPath();
				if (!checkHideMenus(mi)) {
					mi.doClick();
					break;
				}
				// fall through
			case SELECT:
				JMenu menu = getMenu(e);
				if (menu.isTopLevelMenu()) {
					JSComponentUI.hideMenusAndToolTip();
					JPopupMenu p = menu.getPopupMenu();
					menu.setPopupMenuVisible(!p.isVisible());
					return;
				}

				if (!crossMenuMnemonic) {
					JPopupMenu pm = JSPopupMenuUI.getLastPopup();
					if (pm != null && pm != menu.getParent()) {
						return;
					}
				}

				final MenuSelectionManager defaultManager = MenuSelectionManager.defaultManager();
				if (force) {
					Container cnt = menu.getParent();
					if (cnt != null && cnt instanceof JMenuBar) {
						MenuElement me[];
						MenuElement subElements[];

						subElements = menu.getPopupMenu().getSubElements();
						if (subElements.length > 0) {
							me = new MenuElement[4];
							me[0] = (MenuElement) cnt;
							me[1] = menu;
							me[2] = menu.getPopupMenu();
							me[3] = subElements[0];
						} else {
							me = new MenuElement[3];
							me[0] = (MenuElement) cnt;
							me[1] = menu;
							me[2] = menu.getPopupMenu();
						}
						defaultManager.setSelectedPath(me);
					}
				} else {
					MenuElement path[] = defaultManager.getSelectedPath();
					if (path.length > 0 && path[path.length - 1] == menu) {
						appendPath(path, menu.getPopupMenu());
					}
				}
				break;
			}
		}

		@Override
		public boolean isEnabled(Object sender) {
			if (sender instanceof JMenu) {
				return ((JMenu) sender).isEnabled();
			}
			if (sender instanceof JMenuItem) {
				return ((JMenuItem) sender).isEnabled();
			}
			if (sender instanceof AbstractButton && !((AbstractButton) sender).getModel().isEnabled()) {
				return false;
			}
			return true;
		}

		///// menu:::

		// NOTE: This will be null if the action is registered in the
		// ActionMap. For the timer use it will be non-null.
		private JMenu menu;
		private boolean force = false;

		Actions(String key, JMenu menu, boolean shouldForce) {
			super(key);
			this.menu = menu;
			this.force = shouldForce;
		}

		private JMenu getMenu(ActionEvent e) {
			if (e.getSource() instanceof JMenu) {
				return (JMenu) e.getSource();
			}
			return menu;
		}

		private static void appendPath(MenuElement[] path, MenuElement elem) {
			MenuElement newPath[] = new MenuElement[path.length + 1];
			System.arraycopy(path, 0, newPath, 0, path.length);
			newPath[path.length] = elem;
			MenuSelectionManager.defaultManager().setSelectedPath(newPath);
		}

	}

	private int lastMnemonic;
	private static boolean crossMenuMnemonic;

//// menuitem:::	

	void updateAcceleratorBinding(JComponent jc) {
		KeyStroke a;
		if (ui.isMenu && ((JMenu) ui.jc).isTopLevelMenu()) {
			int i = ((JMenu) ui.jc).getMnemonic();
			if (i == 0)
				return;
			a = KeyStroke.getKeyStroke(i, KeyEvent.ALT_MASK, false);
//			updateMnemonicBinding(ui.menuItem);
		} else {
			a = ui.menuItem.getAccelerator();
		}
		InputMap map = SwingUtilities.getUIInputMap(jc, JComponent.WHEN_IN_FOCUSED_WINDOW);

		if (map != null) {
			map.clear();
		}
		if (a != null) {
			if (map == null) {
				map = createInputMap(jc);
				SwingUtilities.replaceUIInputMap(jc, JComponent.WHEN_IN_FOCUSED_WINDOW, map);
			}
//			System.out.println(">>>>>>>>>ButtonListener accel added for " + a + " " + ui.id);
			map.put(a, "doClick");
		}
	}

}
