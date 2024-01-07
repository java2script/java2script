package swingjs.plaf;

import java.awt.Component;
/*
 * [notice is from BasicPopupMenuUI.java jdku8.jdk]
 * Some parts of this code have been adapted for SwingJS by Bob Hanson, St. Olaf College
 * 
 * 
 * Copyright (c) 1997, 2013, Oracle and/or its affiliates. All rights reserved.
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
import java.awt.Dimension;
import java.awt.JSComponent;
import java.awt.event.ContainerEvent;
import java.awt.event.ContainerListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.beans.PropertyChangeEvent;

import javax.swing.InputMap;
import javax.swing.JComponent;
import javax.swing.JMenu;
import javax.swing.JMenuItem;
import javax.swing.JPopupMenu;
import javax.swing.JRootPane;
import javax.swing.LookAndFeel;
import javax.swing.MenuElement;
import javax.swing.MenuSelectionManager;
import javax.swing.UIManager;
import javax.swing.event.MenuKeyEvent;
import javax.swing.event.MenuKeyListener;

import swingjs.JSMouse;
import swingjs.JSUtil;
import swingjs.api.js.DOMNode;
import swingjs.api.js.JQueryObject;
import swingjs.api.js.JQueryObject.JQEvent;
import swingjs.jquery.JQueryUI;

public class JSPopupMenuUI extends JSPanelUI implements ContainerListener, MouseListener {


	public static final String UI_DISABLED = "ui-j2smenu-disabled ui-state-disabled";


	@Override
	public void propertyChange(PropertyChangeEvent e) {
		//String prop = e.getPropertyName();
//		System.out.println("jspopiupmenuui prop " + prop);
		super.propertyChange(e);
	}

//	public void setPathTo(Object comp, Object jqKeyEvent) {
//		if (comp == null || /** @j2sNative jqKeyEvent.keyCode <= 32 || */false)
//			return;
//		JSMenuManager msm = (JSMenuManager) MenuSelectionManager.defaultManager();
//        msm.setCurrentPath((JComponent) comp);
//        if (jqKeyEvent != null) {
//        	KeyEvent e = JSKeyEvent.newJSKeyEvent((JComponent) comp, jqKeyEvent, 0, false);
//        	msm.processKeyEvent(e);
//        	if (e.isConsumed())
//        		hideAllMenus();
//        }
//	}
//
	static {
		JQueryUI.loadJQMenu();
	}
	
	private interface api {
		
		interface js {
			
			/**
			 * An abstract class to cover the JavaScript calls made to j2sMenu
			 * @author hansonr
			 *
			 */
			abstract class JSSwingMenu {

				class Options {
					JPopupMenu jPopupMenu;
				}
				
			JQueryObject activeMenu;
			Options options;
			abstract void disposeMenu(JPopupMenu menu);
			abstract void hideMenu(JPopupMenu menu);
			abstract void setMenu(JPopupMenu menu);
			abstract void showMenu(JPopupMenu menu, int x, int y);
			abstract void updateMenu(JPopupMenu menu, boolean andShow);
			abstract void updateMenuItem(JPopupMenu menu, DOMNode domNode);
			abstract JSSwingMenu getInstance(JPopupMenu menu);
			abstract void _keydown(Object jqevent);
			}
		}
	}

	// a frameless independent window
	
	private static api.js.JSSwingMenu j2sSwingMenu;

	private static Component lastInvoker;

	private JPopupMenu popupMenu;

	private JSMenuKeyListener menuKeyListener;

	private static long showTime;
	

	public JSPopupMenuUI() {
		if (j2sSwingMenu == null) {
			j2sSwingMenu = (api.js.JSSwingMenu) J2S.getSwing();
		}
		isContainer = true;	
		isMenuItem = true;
		isPopupMenu = true;
		setDoc();
	}
	
	@Override
	public DOMNode updateDOMNode() {
		// j2sMenu.js will wrap this in a div with the appropriate
		if (domNode == null) {
			containerNode = domNode = newDOMObject("ul", id);
			bindJQueryEvents(domNode, "mouseenter", SOME_MOUSE_EVENT);
		}
		return updateDOMNodeCUI();
	}

	@Override
	public void componentAdded(ContainerEvent e) {
		// OK, the idea here is that we detach all child nodes
		// and then reattach them. 
		//System.out.println("jspopupmenu componentadded " + e);
		DOMNode.detachAll(outerNode);
		setTainted();
		setHTMLElement();
		Component child = e.getChild();
		if (child instanceof JMenuItem)
			((JMenuItem) e.getChild()).addMenuKeyListener(menuKeyListener);
	}

	@Override
	public void componentRemoved(ContainerEvent e) {
		//System.out.println("jspopupmenu componentremoved " + e);
		DOMNode.detachAll(outerNode);
		setTainted();
		setHTMLElement();
		Component child = e.getChild();
		if (child instanceof JMenuItem)
			((JMenuItem) e.getChild()).removeMenuKeyListener(menuKeyListener);
	}

	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		// we use == here because this will be JavaScript
		//System.out.println("jspopupmenu JSEVent " + eventType);
		checkStopPopupMenuTimer(target, eventType, jQueryEvent);
		return super.handleJSEvent(target, eventType, jQueryEvent);
	}

	@Override
	public void installUI(JComponent jc) {
        installDefaults();
        installListeners();
	}

	public void installDefaults() {
		popupMenu = (JPopupMenu) jc;
		((JPopupMenu) jc).addContainerListener(this);
      LookAndFeel.installColorsAndFont(jc,
        "PopupMenu.background",
        "PopupMenu.foreground",
        "PopupMenu.font");
	}

	@Override
	public void uninstallUI(JComponent jc) {
		((JPopupMenu) jc).removeContainerListener(this);
	      uninstallListeners();
	}

    protected void uninstallListeners() {
//        if (popupMenuListener != null) {
//            popupMenu.removePopupMenuListener(popupMenuListener);
//        }
        if (menuKeyListener != null) {
            popupMenu.removeMenuKeyListener(menuKeyListener);
        }
    }

	@Override
	public void setVisible(boolean b) {
		hideMenusAndToolTip();
		if (b) {
			if (isTainted || menu == null || outerNode == null || DOMNode.firstChild(outerNode) == null) {
				if (menu == null) {
					// important to do this here, not earlier?
					setTainted();
					setHTMLElement();
					menu = (JPopupMenu) jc;
					j2sSwingMenu.setMenu(menu);
					setTainted(false);
					Component top = JSComponent.秘getTopInvokableAncestor(jc, true);
					if (top != null) {
						top.removeMouseListener(this);
						top.addMouseListener(this);
					}
				} else {
					updateMenu(true);
				}
			}
			lastInvoker = menu.getInvoker();
			// issue here?? jc.addNotify();
			//have to cheat here; these values are private to JMenu.
			int x = /** @j2sNative this.menu.desiredLocationX || */0;
			int y = /** @j2sNative this.menu.desiredLocationY || */0;
			setZ(getInheritedZ((JComponent) menu.getInvoker()) + 2);
			j2sSwingMenu.showMenu(menu, x, y);
			showTime = System.currentTimeMillis();
//		} else {
//			hideMenu();
		}
	}

//	/*not private*/ void hideMenu() {
//		if (menu != null)
//			j2sSwingMenu.hideMenu(menu);	
//	}
	
	@Override
	public void dispose() {
    DOMNode.dispose(domNode);
    DOMNode.dispose(outerNode);
    if (menu != null)
    	j2sSwingMenu.disposeMenu(menu);
	}

	@Override
	public Dimension getPreferredSize(JComponent jc) {
		// unnecessary  -- will never be subject to a layout manager
		return null;
	}

	public void updateMenu(boolean andShow) {
		//System.out.println("jspopupmenu updateMenu andshow=" + andShow);
		setTainted();
		setHTMLElement();
		if (andShow)
			JSPopupMenuUI.j2sSwingMenu.updateMenu(menu, andShow);
	}
	
	
//    /**
//     * This Listener fires the Action that provides the correct auditory
//     * feedback.
//     *
//     * @since 1.4
//     */
//    private class JSPopupMenuListener implements PopupMenuListener {
//        public void popupMenuCanceled(PopupMenuEvent e) {
//        }
//
//        public void popupMenuWillBecomeInvisible(PopupMenuEvent e) {
//        }
//
//        public void popupMenuWillBecomeVisible(PopupMenuEvent e) {
//            BasicLookAndFeel.playSound((JPopupMenu)e.getSource(),
//                                       "PopupMenu.popupSound");
//        }
//    }
//
//
//	
//    static final StringBuilder MENU_KEYBOARD_HELPER_KEY = new StringBuilder(
//            "swingjs.plaf.JSPopupMenuUI.MenuKeyboardHelper");
//
    protected void installListeners() {
//        if (popupMenuListener == null) {
//            popupMenuListener = new BasicPopupMenuListener();
//        }
//        popupMenu.addPopupMenuListener(popupMenuListener);

        if (menuKeyListener == null) {
            menuKeyListener = new JSMenuKeyListener();
        }
        popupMenu.addMenuKeyListener(menuKeyListener);
        if (popupMenu.getInvoker() instanceof JRootPane) {
        	popupMenu.getInvoker().addKeyListener(menuKeyListener);
        }

//        AppContext context = AppContext.getAppContext();
//        synchronized (MOUSE_GRABBER_KEY) {
//            MouseGrabber mouseGrabber = (MouseGrabber)context.get(
//                                                     MOUSE_GRABBER_KEY);
//            if (mouseGrabber == null) {
//                mouseGrabber = new MouseGrabber();
//                context.put(MOUSE_GRABBER_KEY, mouseGrabber);
//            }
//        }
//        synchronized (MENU_KEYBOARD_HELPER_KEY) {
//            MenuKeyboardHelper helper =
//                    (MenuKeyboardHelper)context.get(MENU_KEYBOARD_HELPER_KEY);
//            if (helper == null) {
//                helper = new MenuKeyboardHelper();
//                context.put(MENU_KEYBOARD_HELPER_KEY, helper);
//                MenuSelectionManager msm = MenuSelectionManager.defaultManager();
//                msm.addChangeListener(helper);
//            }
//        }
    }

    static JPopupMenu getLastPopup() {
        MenuSelectionManager msm = MenuSelectionManager.defaultManager();
        MenuElement[] p = msm.getSelectedPath();
        JPopupMenu popup = null;

        for(int i = p.length - 1; popup == null && i >= 0; i--) {
            if (p[i] instanceof JPopupMenu)
                popup = (JPopupMenu)p[i];
        }
        return popup;
    }

	private static MenuElement nextEnabledChild(MenuElement e[], int fromIndex, int toIndex) {
		for (int i = fromIndex; i <= toIndex; i++) {
			if (e[i] != null) {
				Component comp = e[i].getComponent();
				if (comp != null && (comp.isEnabled() || UIManager.getBoolean("MenuItem.disabledAreNavigable"))
						&& comp.isVisible()) {
					return e[i];
				}
			}
		}
		return null;
	}

	private static MenuElement previousEnabledChild(MenuElement e[], int fromIndex, int toIndex) {
		for (int i = fromIndex; i >= toIndex; i--) {
			if (e[i] != null) {
				Component comp = e[i].getComponent();
				if (comp != null && (comp.isEnabled() || UIManager.getBoolean("MenuItem.disabledAreNavigable"))
						&& comp.isVisible()) {
					return e[i];
				}
			}
		}
		return null;
	}

    static InputMap getInputMap(JPopupMenu popup, JComponent rootPane) {
        InputMap windowInputMap = null;
        Object[] bindings = (Object[])UIManager.get("PopupMenu.selectedWindowInputMapBindings");
        if (bindings != null) {
            windowInputMap = LookAndFeel.makeComponentInputMap(rootPane, bindings);
            if (!popup.getComponentOrientation().isLeftToRight()) {
                Object[] km = (Object[])UIManager.get("PopupMenu.selectedWindowInputMapBindings.RightToLeft");
                if (km != null) {
                    InputMap rightToLeftInputMap = LookAndFeel.makeComponentInputMap(rootPane, km);
                    rightToLeftInputMap.setParent(windowInputMap);
                    windowInputMap = rightToLeftInputMap;
                }
            }
        }
        return windowInputMap;
    }

//    private static boolean checkInvokerEqual(MenuElement present, MenuElement last) {
//        Component invokerPresent = present.getComponent();
//        Component invokerLast = last.getComponent();
//
//        if (invokerPresent instanceof JPopupMenu) {
//            invokerPresent = ((JPopupMenu)invokerPresent).getInvoker();
//    }
//        if (invokerLast instanceof JPopupMenu) {
//            invokerLast = ((JPopupMenu)invokerLast).getInvoker();
//        }
//        return (invokerPresent == invokerLast);
//    }

	static MenuElement findEnabledChild(MenuElement e[], int fromIndex, boolean forward) {
		MenuElement result;
		if (forward) {
			result = nextEnabledChild(e, fromIndex + 1, e.length - 1);
			if (result == null)
				result = nextEnabledChild(e, 0, fromIndex - 1);
		} else {
			result = previousEnabledChild(e, fromIndex - 1, 0);
			if (result == null)
				result = previousEnabledChild(e, e.length - 1, fromIndex + 1);
		}
		return result;
	}

	static MenuElement findEnabledChild(MenuElement e[], MenuElement elem, boolean forward) {
		for (int i = 0; i < e.length; i++) {
			if (e[i] == elem) {
				return findEnabledChild(e, i, forward);
			}
		}
		return null;
	}

    /**
     * Handles mnemonic for children JMenuItems.
     * @since 1.5
     */
    private class JSMenuKeyListener implements MenuKeyListener, KeyListener {
//        MenuElement menuToOpen = null;

        @Override
		public void menuKeyTyped(MenuKeyEvent e) {
//            if (menuToOpen != null) {
//                // we have a submenu to open
//                JPopupMenu subpopup = ((JMenu)menuToOpen).getPopupMenu();
//                MenuElement subitem = findEnabledChild(
//                        subpopup.getSubElements(), -1, true);
//
//                ArrayList<MenuElement> lst = new ArrayList<MenuElement>(Arrays.asList(e.getPath()));
//                lst.add(menuToOpen);
//                lst.add(subpopup);
//                if (subitem != null) {
//                    lst.add(subitem);
//                }
//                MenuElement newPath[] = new MenuElement[0];
//                newPath = lst.toArray(newPath);
//                MenuSelectionManager.defaultManager().setSelectedPath(newPath);
//                e.consume();
//            }
//            menuToOpen = null;
        }

        @Override
		public void menuKeyPressed(MenuKeyEvent e) {
        	// In Java, this is returning a pointer to the JPopupMenu
        	MenuElement[] path = e.getPath();
        	MenuElement item = (path.length == 0 ? null : path[path.length - 1]);
        	if (item instanceof JMenu) {
        		j2sSwingMenu.getInstance(menu)._keydown(/** @j2sNative e.bdata.jqevent ||*/null);
            	e.consume();
            	
              // Select the menu item with the matching mnemonic. If
              // the same mnemonic has been invoked then select the next
              // menu item in the cycle. 
            	  
             // really not useful
//            	MenuElement[] path = e.getPath();
//              MenuElement newPath[] = new MenuElement[path.length+1];
//              System.arraycopy(path, 0, newPath, 0, path.length);
//              MenuSelectionManager manager = e.getMenuSelectionManager();
//              //newPath[path.length] = newItem;
//              manager.setSelectedPath(newPath);
//        	
        	
//            char keyChar = e.getKeyChar();
//
//            // Handle the case for Escape or Enter...
//            if (!Character.isLetterOrDigit(keyChar)) {
//                return;
//            }
//
//            MenuSelectionManager manager = e.getMenuSelectionManager();
//            MenuElement path[] = e.getPath();
//            MenuElement items[] = popupMenu.getSubElements();
//            int currentIndex = -1;
//            int matches = 0;
//            int firstMatch = -1;
//            int indexes[] = null;
//
//            char lc = lower(keyChar);
//            for (int j = 0; j < items.length; j++) {
//                if (! (items[j] instanceof JMenuItem)) {
//                    continue;
//                }
//                JMenuItem item = (JMenuItem)items[j];
//                int mnemonic = item.getMnemonic();
//                if (mnemonic > 0  // Swingjs - added
//                		&& 
//                		item.isEnabled() &&
//                    item.isVisible() && lc == lower(mnemonic)) {
//                    if (matches == 0) {
//                        firstMatch = j;
//                        matches++;
//                    } else {
//                        if (indexes == null) {
//                            indexes = new int[items.length];
//                            indexes[0] = firstMatch;
//                        }
//                        indexes[matches++] = j;
//                    }
//                }
//                if (item.isArmed() || item.isSelected()) {
//                    currentIndex = matches - 1;
//                }
//            }
//
//            if (matches == 0) {
//                // no op
//            } else if (matches == 1) {
//                // Invoke the menu action
//                JMenuItem item = (JMenuItem)items[firstMatch];
//                if (item instanceof JMenu) {
//                    // submenus are handled in menuKeyTyped
//                    menuToOpen = item;
//                } else if (item.isEnabled()) {
//                    // we have a menu item
//                    manager.clearSelectedPath();
//                    item.doClick();
//                }
//                e.consume();
//            } else {
//                // Select the menu item with the matching mnemonic. If
//                // the same mnemonic has been invoked then select the next
//                // menu item in the cycle.
//                MenuElement newItem;
//
//                newItem = items[indexes[(currentIndex + 1) % matches]];
//
//                MenuElement newPath[] = new MenuElement[path.length+1];
//                System.arraycopy(path, 0, newPath, 0, path.length);
//                newPath[path.length] = newItem;
//                manager.setSelectedPath(newPath);
//                e.consume();
//            }
        	} else if (item instanceof JMenuItem) {
        		((JMenuItem) item).doClick();
            	e.consume();
    	        hideMenusAndToolTip();
        	}
        }

        @Override
		public void menuKeyReleased(MenuKeyEvent e) {
        }

//        private char lower(char keyChar) {
//            return Character.toLowerCase(keyChar);
//        }
//
//        private char lower(int mnemonic) {
//            return Character.toLowerCase((char) mnemonic);
//        }
//
		@Override
		public void keyTyped(KeyEvent e) {
		}

		@Override
		public void keyPressed(KeyEvent e) {
			MenuSelectionManager.defaultManager().processKeyEvent(e);
		}

		@Override
		public void keyReleased(KeyEvent e) {
		}
    }

//	
//    static ActionMap getActionMap() {
//        return LazyActionMap.getActionMap(JSPopupMenuUI.class,
//                                          "PopupMenu.actionMap");
//    }
//
//    static void loadActionMap(LazyActionMap map) {
//        map.put(new Actions(Actions.CANCEL));
//        map.put(new Actions(Actions.SELECT_NEXT));
//        map.put(new Actions(Actions.SELECT_PREVIOUS));
//        map.put(new Actions(Actions.SELECT_PARENT));
//        map.put(new Actions(Actions.SELECT_CHILD));
//        map.put(new Actions(Actions.RETURN));
////        BasicLookAndFeel.installAudioActionMap(map);
//    }
//
//
//    private static class Actions extends UIAction {
//        // Types of actions
//        private static final String CANCEL = "cancel";
//        private static final String SELECT_NEXT = "selectNext";
//        private static final String SELECT_PREVIOUS = "selectPrevious";
//        private static final String SELECT_PARENT = "selectParent";
//        private static final String SELECT_CHILD = "selectChild";
//        private static final String RETURN = "return";
//
//        // Used for next/previous actions
//        private static final boolean FORWARD = true;
//        private static final boolean BACKWARD = false;
//
//        // Used for parent/child actions
//        private static final boolean PARENT = false;
//        private static final boolean CHILD = true;
//
//
//        Actions(String key) {
//            super(key);
//        }
//
//        @Override
//		public void actionPerformed(ActionEvent e) {
//            String key = getName();
//            if (key == CANCEL) {
//                cancel();
//            }
//            else if (key == SELECT_NEXT) {
//                selectItem(FORWARD);
//            }
//            else if (key == SELECT_PREVIOUS) {
//                selectItem(BACKWARD);
//            }
//            else if (key == SELECT_PARENT) {
//                selectParentChild(PARENT);
//            }
//            else if (key == SELECT_CHILD) {
//                selectParentChild(CHILD);
//            }
//            else if (key == RETURN) {
//                doReturn();
//            }
//        }
//
//        private void doReturn() {
//            KeyboardFocusManager fmgr =
//                KeyboardFocusManager.getCurrentKeyboardFocusManager();
//            Component focusOwner = fmgr.getFocusOwner();
//            if(focusOwner != null && !(focusOwner instanceof JRootPane)) {
//                return;
//            }
//
//            MenuSelectionManager msm = MenuSelectionManager.defaultManager();
//            MenuElement path[] = msm.getSelectedPath();
//            MenuElement lastElement;
//            if(path.length > 0) {
//                lastElement = path[path.length-1];
//                if(lastElement instanceof JMenu) {
//                    MenuElement newPath[] = new MenuElement[path.length+1];
//                    System.arraycopy(path,0,newPath,0,path.length);
//                    newPath[path.length] = ((JMenu)lastElement).getPopupMenu();
//                    msm.setSelectedPath(newPath);
//                } else if(lastElement instanceof JMenuItem) {
//                    JMenuItem mi = (JMenuItem)lastElement;
////
////                    if (mi.getUI() instanceof BasicMenuItemUI) {
////                        ((BasicMenuItemUI)mi.getUI()).doClick(msm);
////                    }
////                    else {
//                        msm.clearSelectedPath();
//                        mi.doClick(0);
////                    }
//                }
//            }
//        }
//        private void selectParentChild(boolean direction) {
//            MenuSelectionManager msm = MenuSelectionManager.defaultManager();
//            MenuElement path[] = msm.getSelectedPath();
//            int len = path.length;
//
//            if (direction == PARENT) {
//                // selecting parent
//                int popupIndex = len-1;
//
//                if (len > 2 &&
//                    // check if we have an open submenu. A submenu item may or
//                    // may not be selected, so submenu popup can be either the
//                    // last or next to the last item.
//                    (path[popupIndex] instanceof JPopupMenu ||
//                     path[--popupIndex] instanceof JPopupMenu) &&
//                    !((JMenu)path[popupIndex-1]).isTopLevelMenu()) {
//
//                    // we have a submenu, just close it
//                    MenuElement newPath[] = new MenuElement[popupIndex];
//                    System.arraycopy(path, 0, newPath, 0, popupIndex);
//                    msm.setSelectedPath(newPath);
//                    return;
//                }
//            } else {
//                // selecting child
//                if (len > 0 && path[len-1] instanceof JMenu &&
//                    !((JMenu)path[len-1]).isTopLevelMenu()) {
//
//                    // we have a submenu, open it
//                    JMenu menu = (JMenu)path[len-1];
//                    JPopupMenu popup = menu.getPopupMenu();
//                    MenuElement[] subs = popup.getSubElements();
//                    MenuElement item = findEnabledChild(subs, -1, true);
//                    MenuElement[] newPath;
//
//                    if (item == null) {
//                        newPath = new MenuElement[len+1];
//                    } else {
//                        newPath = new MenuElement[len+2];
//                        newPath[len+1] = item;
//                    }
//                    System.arraycopy(path, 0, newPath, 0, len);
//                    newPath[len] = popup;
//                    msm.setSelectedPath(newPath);
//                    return;
//                }
//            }
//
//            // check if we have a toplevel menu selected.
//            // If this is the case, we select another toplevel menu
//            if (len > 1 && path[0] instanceof JMenuBar) {
//                MenuElement currentMenu = path[1];
//                MenuElement nextMenu = findEnabledChild(
//                    path[0].getSubElements(), currentMenu, direction);
//
//                if (nextMenu != null && nextMenu != currentMenu) {
//                    MenuElement newSelection[];
//                    if (len == 2) {
//                        // menu is selected but its popup not shown
//                        newSelection = new MenuElement[2];
//                        newSelection[0] = path[0];
//                        newSelection[1] = nextMenu;
//                    } else {
//                        // menu is selected and its popup is shown
//                        newSelection = new MenuElement[3];
//                        newSelection[0] = path[0];
//                        newSelection[1] = nextMenu;
//                        newSelection[2] = ((JMenu)nextMenu).getPopupMenu();
//                    }
//                    msm.setSelectedPath(newSelection);
//                }
//            }
//        }
//
//        private void selectItem(boolean direction) {
//            MenuSelectionManager msm = MenuSelectionManager.defaultManager();
//            MenuElement path[] = msm.getSelectedPath();
//            if (path.length == 0) {
//                return;
//            }
//            int len = path.length;
//            if (len == 1 && path[0] instanceof JPopupMenu) {
//
//                JPopupMenu popup = (JPopupMenu) path[0];
//                MenuElement[] newPath = new MenuElement[2];
//                newPath[0] = popup;
//                newPath[1] = findEnabledChild(popup.getSubElements(), -1, direction);
//                msm.setSelectedPath(newPath);
//            } else if (len == 2 &&
//                    path[0] instanceof JMenuBar && path[1] instanceof JMenu) {
//
//                // a toplevel menu is selected, but its popup not shown.
//                // Show the popup and select the first item
//                JPopupMenu popup = ((JMenu)path[1]).getPopupMenu();
//                MenuElement next =
//                    findEnabledChild(popup.getSubElements(), -1, FORWARD);
//                MenuElement[] newPath;
//
//                if (next != null) {
//                    // an enabled item found -- include it in newPath
//                    newPath = new MenuElement[4];
//                    newPath[3] = next;
//                } else {
//                    // menu has no enabled items -- still must show the popup
//                    newPath = new MenuElement[3];
//                }
//                System.arraycopy(path, 0, newPath, 0, 2);
//                newPath[2] = popup;
//                msm.setSelectedPath(newPath);
//
//            } else if (path[len-1] instanceof JPopupMenu &&
//                       path[len-2] instanceof JMenu) {
//
//                // a menu (not necessarily toplevel) is open and its popup
//                // shown. Select the appropriate menu item
//                JMenu menu = (JMenu)path[len-2];
//                JPopupMenu popup = menu.getPopupMenu();
//                MenuElement next =
//                    findEnabledChild(popup.getSubElements(), -1, direction);
//
//                if (next != null) {
//                    MenuElement[] newPath = new MenuElement[len+1];
//                    System.arraycopy(path, 0, newPath, 0, len);
//                    newPath[len] = next;
//                    msm.setSelectedPath(newPath);
//                } else {
//                    // all items in the popup are disabled.
//                    // We're going to find the parent popup menu and select
//                    // its next item. If there's no parent popup menu (i.e.
//                    // current menu is toplevel), do nothing
//                    if (len > 2 && path[len-3] instanceof JPopupMenu) {
//                        popup = ((JPopupMenu)path[len-3]);
//                        next = findEnabledChild(popup.getSubElements(),
//                                                menu, direction);
//
//                        if (next != null && next != menu) {
//                            MenuElement[] newPath = new MenuElement[len-1];
//                            System.arraycopy(path, 0, newPath, 0, len-2);
//                            newPath[len-2] = next;
//                            msm.setSelectedPath(newPath);
//                        }
//                    }
//                }
//
//            } else {
//                // just select the next item, no path expansion needed
//                MenuElement subs[] = path[len-2].getSubElements();
//                MenuElement nextChild =
//                    findEnabledChild(subs, path[len-1], direction);
//                if (nextChild == null) {
//                    nextChild = findEnabledChild(subs, -1, direction);
//                }
//                if (nextChild != null) {
//                    path[len-1] = nextChild;
//                    msm.setSelectedPath(path);
//                }
//            }
//        }
//
//        private void cancel() {
//        	hideAllMenus();
////        	
////            // 4234793: This action should call JPopupMenu.firePopupMenuCanceled but it's
////            // a protected method. The real solution could be to make
////            // firePopupMenuCanceled public and call it directly.
////            JPopupMenu lastPopup = getLastPopup();
////            if (lastPopup != null) {
////                lastPopup.putClientProperty("JPopupMenu.firePopupMenuCanceled", Boolean.TRUE);
////            }
////            String mode = UIManager.getString("Menu.cancelMode");
////            if ("hideMenuTree".equals(mode)) {
////                MenuSelectionManager.defaultManager().clearSelectedPath();
////            } else {
////                shortenSelectedPath();
////            }
//        }
//
////        private void shortenSelectedPath() {
////            MenuElement path[] = MenuSelectionManager.defaultManager().getSelectedPath();
////            if (path.length <= 2) {
////                MenuSelectionManager.defaultManager().clearSelectedPath();
////                return;
////            }
////            // unselect MenuItem and its Popup by default
////            int value = 2;
////            MenuElement lastElement = path[path.length - 1];
////            JPopupMenu lastPopup = getLastPopup();
////            if (lastElement == lastPopup) {
////                MenuElement previousElement = path[path.length - 2];
////                if (previousElement instanceof JMenu) {
////                    JMenu lastMenu = (JMenu) previousElement;
////                    if (lastMenu.isEnabled() && lastPopup.getComponentCount() > 0) {
////                        // unselect the last visible popup only
////                        value = 1;
////                    } else {
////                        // unselect invisible popup and two visible elements
////                        value = 3;
////                    }
////                }
////            }
////            if (path.length - value <= 2
////                    && !UIManager.getBoolean("Menu.preserveTopLevelSelection")) {
////                // clear selection for the topLevelMenu
////                value = path.length;
////            }
////            MenuElement newPath[] = new MenuElement[path.length - value];
////            System.arraycopy(path, 0, newPath, 0, path.length - value);
////            MenuSelectionManager.defaultManager().setSelectedPath(newPath);
////        }
//    }

//    /**
//     * This helper is added to MenuSelectionManager as a ChangeListener to
//     * listen to menu selection changes. When a menu is activated, it passes
//     * focus to its parent JRootPane, and installs an ActionMap/InputMap pair
//     * on that JRootPane. Those maps are necessary in order for menu
//     * navigation to work. When menu is being deactivated, it restores focus
//     * to the component that has had it before menu activation, and uninstalls
//     * the maps.
//     * This helper is also installed as a KeyListener on root pane when menu
//     * is active. It forwards key events to MenuSelectionManager for mnemonic
//     * keys handling.
//     */
//    class MenuKeyboardHelper
//        implements ChangeListener, KeyListener {
//
//        private Component lastFocused = null;
////        private MenuElement[] lastPathSelected = new MenuElement[0];
////        private JPopupMenu lastPopup;
//
//        private JRootPane invokerRootPane;
//        private ActionMap menuActionMap = getActionMap();
//        private InputMap menuInputMap;
//        private boolean focusTraversalKeysEnabled;
//
//        /*
//         * Fix for 4213634
//         * If this is false, KEY_TYPED and KEY_RELEASED events are NOT
//         * processed. This is needed to avoid activating a menuitem when
//         * the menu and menuitem share the same mnemonic.
//         */
//        private boolean receivedKeyPressed = false;
//
//        void removeItems() {
//            if (lastFocused != null) {
//                if(!lastFocused.requestFocusInWindow()) {
//                    // Workarounr for 4810575.
//                    // If lastFocused is not in currently focused window
//                    // requestFocusInWindow will fail. In this case we must
//                    // request focus by requestFocus() if it was not
//                    // transferred from our popup.
//                    Window cfw = KeyboardFocusManager
//                                 .getCurrentKeyboardFocusManager()
//                                  .getFocusedWindow();
//                    if(cfw != null &&
//                       "###focusableSwingPopup###".equals(cfw.getName())) {
//                        lastFocused.requestFocus();
//                    }
//
//                }
//                lastFocused = null;
//            }
//            if (invokerRootPane != null) {
//                invokerRootPane.removeKeyListener(this);
//                invokerRootPane.setFocusTraversalKeysEnabled(focusTraversalKeysEnabled);
//                removeUIInputMap(invokerRootPane, menuInputMap);
//                removeUIActionMap(invokerRootPane, menuActionMap);
//                invokerRootPane = null;
//            }
//            receivedKeyPressed = false;
//        }
//
////        private FocusListener rootPaneFocusListener = new FocusAdapter() {
////                @Override
////				public void focusGained(FocusEvent ev) {
////                    Component opposite = ev.getOppositeComponent();
////                    if (opposite != null) {
////                        lastFocused = opposite;
////                    }
////                    ev.getComponent().removeFocusListener(this);
////                }
////            };
//
//        /**
//         * Return the last JPopupMenu in <code>path</code>,
//         * or <code>null</code> if none found
//         */
//        JPopupMenu getActivePopup(MenuElement[] path) {
//            for (int i=path.length-1; i>=0; i--) {
//                MenuElement elem = path[i];
//                if (elem instanceof JPopupMenu) {
//                    return (JPopupMenu)elem;
//                }
//            }
//            return null;
//        }
//
//        void addUIInputMap(JComponent c, InputMap map) {
//            InputMap lastNonUI = null;
//            InputMap parent = c.getInputMap(JComponent.WHEN_IN_FOCUSED_WINDOW);
//
//            while (parent != null && !(parent instanceof UIResource)) {
//                lastNonUI = parent;
//                parent = parent.getParent();
//            }
//
//            if (lastNonUI == null) {
//                c.setInputMap(JComponent.WHEN_IN_FOCUSED_WINDOW, map);
//            } else {
//                lastNonUI.setParent(map);
//            }
//            map.setParent(parent);
//        }
//
//        void addUIActionMap(JComponent c, ActionMap map) {
//            ActionMap lastNonUI = null;
//            ActionMap parent = c.getActionMap();
//
//            while (parent != null && !(parent instanceof UIResource)) {
//                lastNonUI = parent;
//                parent = parent.getParent();
//            }
//
//            if (lastNonUI == null) {
//                c.setActionMap(map);
//            } else {
//                lastNonUI.setParent(map);
//            }
//            map.setParent(parent);
//        }
//
//        void removeUIInputMap(JComponent c, InputMap map) {
//            InputMap im = null;
//            InputMap parent = c.getInputMap(JComponent.WHEN_IN_FOCUSED_WINDOW);
//
//            while (parent != null) {
//                if (parent == map) {
//                    if (im == null) {
//                        c.setInputMap(JComponent.WHEN_IN_FOCUSED_WINDOW,
//                                      map.getParent());
//                    } else {
//                        im.setParent(map.getParent());
//                    }
//                    break;
//                }
//                im = parent;
//                parent = parent.getParent();
//            }
//        }
//
//        void removeUIActionMap(JComponent c, ActionMap map) {
//            ActionMap im = null;
//            ActionMap parent = c.getActionMap();
//
//            while (parent != null) {
//                if (parent == map) {
//                    if (im == null) {
//                        c.setActionMap(map.getParent());
//                    } else {
//                        im.setParent(map.getParent());
//                    }
//                    break;
//                }
//                im = parent;
//                parent = parent.getParent();
//            }
//        }
//
//        
//
//        @Override
//		public void stateChanged(ChangeEvent ev) {
//            MenuSelectionManager msm = MenuSelectionManager.defaultManager();
//
//        	
////        	jc.setVisible(true);
//
//System.out.println("jspopup state changed " + msm.getSelectedPath().length);        	
////        	
//////        	if (!(UIManager.getLookAndFeel() instanceof BasicLookAndFeel)) {
//////                uninstall();
//////                return;
//////            }
////            MenuSelectionManager msm = (MenuSelectionManager)ev.getSource();
////            MenuElement[] p = msm.getSelectedPath();
////            JPopupMenu popup = getActivePopup(p);
////            if (popup != null && !popup.isFocusable()) {
////                // Do nothing for non-focusable popups
////                return;
////            }
////
////            if (lastPathSelected.length != 0 && p.length != 0 ) {
////                if (!checkInvokerEqual(p[0],lastPathSelected[0])) {
////                    removeItems();
////                    lastPathSelected = new MenuElement[0];
////                }
////            }
////
////            if (lastPathSelected.length == 0 && p.length > 0) {
////                // menu posted
////                JComponent invoker;
////
////                if (popup == null) {
////                    if (p.length == 2 && p[0] instanceof JMenuBar &&
////                        p[1] instanceof JMenu) {
////                        // a menu has been selected but not open
////                        invoker = (JComponent)p[1];
////                        popup = ((JMenu)invoker).getPopupMenu();
////                    } else {
////                        return;
////                    }
////                } else {
////                    Component c = popup.getInvoker();
////                    if(c instanceof JFrame) {
////                        invoker = ((JFrame)c).getRootPane();
////                    } else if(c instanceof JDialog) {
////                        invoker = ((JDialog)c).getRootPane();
////                    } else if(c instanceof JApplet) {
////                        invoker = ((JApplet)c).getRootPane();
////                    } else {
////                        while (!(c instanceof JComponent)) {
////                            if (c == null) {
////                                return;
////                            }
////                            c = c.getParent();
////                        }
////                        invoker = (JComponent)c;
////                    }
////                }
////
////                // remember current focus owner
////                lastFocused = KeyboardFocusManager.
////                    getCurrentKeyboardFocusManager().getFocusOwner();
////
////                // request focus on root pane and install keybindings
////                // used for menu navigation
////                invokerRootPane = SwingUtilities.getRootPane(invoker);
////                if (invokerRootPane != null) {
////                    invokerRootPane.addFocusListener(rootPaneFocusListener);
////                    invokerRootPane.requestFocus(true);
////                    invokerRootPane.addKeyListener(this);
////                    focusTraversalKeysEnabled = invokerRootPane.
////                                      getFocusTraversalKeysEnabled();
////                    invokerRootPane.setFocusTraversalKeysEnabled(false);
////
////                    menuInputMap = getInputMap(popup, invokerRootPane);
////                    addUIInputMap(invokerRootPane, menuInputMap);
//////                    addUIActionMap(invokerRootPane, menuActionMap);
////                }
////            } else if (lastPathSelected.length != 0 && p.length == 0) {
////                // menu hidden -- return focus to where it had been before
////                // and uninstall menu keybindings
////                   removeItems();
////            } else {
////                if (popup != lastPopup) {
////                    receivedKeyPressed = false;
////                }
////            }
////
////            // Remember the last path selected
////            lastPathSelected = p;
////            lastPopup = popup;
//        }
//
//        @Override
//		public void keyPressed(KeyEvent ev) {
//            receivedKeyPressed = true;
//            MenuSelectionManager.defaultManager().processKeyEvent(ev);
//        }
//
//        @Override
//		public void keyReleased(KeyEvent ev) {
//            if (receivedKeyPressed) {
//                receivedKeyPressed = false;
//                MenuSelectionManager.defaultManager().processKeyEvent(ev);
//            }
//        }
//
//        @Override
//		public void keyTyped(KeyEvent ev) {
//            if (receivedKeyPressed) {
//                MenuSelectionManager.defaultManager().processKeyEvent(ev);
//            }
//        }
//
//        void uninstall() {
//            synchronized (MENU_KEYBOARD_HELPER_KEY) {
//                MenuSelectionManager.defaultManager().removeChangeListener(this);
//                AppContext.getAppContext().remove(MENU_KEYBOARD_HELPER_KEY);
//            }
//        }
//    }


	public boolean isJSPopupVisible() {
		return menu != null && menu.haveLoc && DOMNode.getStyle(domNode, "display") != "none";
	}

//	private static int np=0;
	
	/**
	 * 
	 * From j2sMenu.js.
	 * 
	 * Processes only a few of the many actions generated there, specifically mouse
	 * enter, move, and exit.
	 * 
	 * Handles all menu and submenu open/close/collapse-all actions.
	 * 
	 * Does NOT process mouse down/up or click events, which are all taken care of
	 * by J2S mouse action methods.
	 * 
	 * @param data
	 */
	@SuppressWarnings({ "unused" })
	public static void processJ2SMenuCmd(Object[] data) {
		String trigger = (String) data[0];
		api.js.JSSwingMenu j2smenu = (api.js.JSSwingMenu) data[1];
		JQueryObject.JQEvent e = (JQEvent) data[2];
		JQueryObject t = (JQueryObject) data[3]; // could actually be e in some cases
		Object n = data[4];
		JQueryObject m = j2smenu.activeMenu;
		String mid = (m == null ? null : m.attr("id"));
		DOMNode target = (DOMNode) data[5];
		DOMNode base = (t == null ? null : target != null ? target : t == e ? (DOMNode) DOMNode.getAttr(e, "target") : t.get(0));
		String id = (base == null ? null : (String) DOMNode.getAttr(base, "id"));
		JComponent c = (base == null ? null : (JComponent) DOMNode.getAttr(base, "data-component"));
		JSComponentUI tui = (base == null ? null : (JSComponentUI) DOMNode.getAttr(base, "data-ui"));
		JMenu menu = null;		
		int eventID = 0;
		switch (trigger) {
		case "_hidePopupMenu":
		case "_hide":
		case "clearOut":
		case "collapse":
		case "expand":
		case "keyActivate":
		case "noclickout":
		case "onblur":
		case "onclick":
		case "onclick_out":
		case "onfocus":
		case "onleave":
		case "onmovep":
		case "onoutn":
		case "onovern":
		case "onoverp":
		case "onpress":
		case "onrelease":
		case "refresh":
		case "select":
		case "_activate":
		case "_move":
		case "_show":
		case "_startOpening":
			break;
		case "collapseAll":
			hideMenusAndToolTip();
			isMenuOpen = false;
			c = j2smenu.options.jPopupMenu;
			c.visible = false;
			JSPopupMenuUI ui = (JSPopupMenuUI) c.getUI();
			JComponent invoker = ((JComponent)((JPopupMenu)c).getInvoker());
			if (invoker instanceof JMenu) {
				((JMenu) invoker).setSelected(false);
				invoker = invoker.getRootPane();
			}
			if (invoker != null)
				invoker.requestFocus();
	        MenuSelectionManager.defaultManager().setSelectedPath(null);
			break;
		case "setFocus":
			isMenuOpen = true;
			//System.out.println("pm focus " + id);
			eventID = MouseEvent.MOUSE_ENTERED;
			break;
		case "onmoven": // mouse moved over a node (comprising of several tags: div, a, li, ctr, txt, icon, caret)
			eventID = MouseEvent.MOUSE_MOVED;
			break;
		case "unsetFocus":
			hideTooltip();
			eventID = MouseEvent.MOUSE_EXITED;
			break;
		case "_openSubmenu":
			updateMenuSelection(t, true);
			break;
		case "_closeSubmenus":
			 updateMenuSelection(t, false);
			break;
		case "_hideAllMenus":
			 updateMenuSelection(t, false);
			break;
		default:
			System.err.println("JSPopupMenu not processing " + trigger);
			break;
		}
		if (e != null && eventID != 0 && c != null) {
				JSMouse.retargetMouseEvent(e, base, c, c, eventID);
		}
	}

    @SuppressWarnings("null")
	private static void updateMenuSelection(Object t, boolean isOpen) {
		// t is JMenu.ui.domNode[] from jQuery 
		for (int i = /** @j2sNative t.length || */0; --i >= 0;) {
			JMenu p = /** @j2sNative t[i]["data-component"] || */null;
			if (p.isSelected() != isOpen)
				p.setSelected(isOpen);
		}

	}

	public boolean isPopupTrigger(MouseEvent e) {
        return e.isPopupTrigger();
    }
    
	public static void closeAllMenus() {
		if (System.currentTimeMillis() - showTime < 100)
			return;
		// top-level or submenu:
		if (lastInvoker != null) {
			lastInvoker.requestFocus();
			lastInvoker = null;
	        MenuSelectionManager.defaultManager().setSelectedPath(null);
		}
		JSUtil.jQuery.$(".ui-j2smenu").hide().attr("aria-hidden","true").attr("aria-expanded","false");
		JSUtil.jQuery.$(".ui-j2smenu-node").removeClass("ui-state-active").removeClass("ui-state-focus");
	}

	@Override
	public void mouseClicked(MouseEvent e) {
	}

	@Override
	public void mousePressed(MouseEvent e) {
	}

	@Override
	public void mouseReleased(MouseEvent e) {
	}

	@Override
	public void mouseEntered(MouseEvent e) {
	}

	@SuppressWarnings("unused")
	@Override
	public void mouseExited(MouseEvent e) {
		try {
			if (/**
				 * @j2sNative 
				 * e.bdata.jqevent.target.className.indexOf("j2smenu") >= 0 
				 * || e.bdata.jqevent.target.id.indexOf("MenuBar") >= 0 ||
				 */
			false)
				return;
		} catch (Throwable t) {
		}
		closeAllMenus();
	}



}
