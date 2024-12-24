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

import java.awt.Component;
import java.awt.Dimension;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ContainerEvent;
import java.awt.event.ContainerListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.beans.PropertyChangeEvent;

import javax.swing.BoxLayout;
import javax.swing.InputMap;
import javax.swing.JApplet;
import javax.swing.JComponent;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.LookAndFeel;
import javax.swing.MenuElement;
import javax.swing.MenuSelectionManager;
import javax.swing.SwingUtilities;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.plaf.UIResource;

import sun.swing.DefaultLookup;
import sun.swing.UIAction;
import swingjs.JSMenuManager;
import swingjs.api.js.DOMNode;

/**
 * The JSMenuBarUI uses a very simple bare-bones jQuery-driven ul/li menuing
 * system. See
 * http://www.kriesi.at/wp-content/extra_data/suckerfish_tutorial/step4.html. It
 * uses only four lines of JavaScript and a bit of CSS.
 * 
 * @author Bob Hanson
 *
 */
public class JSMenuBarUI extends JSPanelUI implements ContainerListener {

	private JMenuBar menuBar;
	private ChangeListener changeListener;
	private ContainerListener containerListener;
	private Handler handler;
	private boolean installed;
	private KeyListener keyListener;

	public JSMenuBarUI() {
		isContainer = true;
		allowPaintedBackground = false;
		setDoc();
	}

	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			containerNode = domNode = newDOMObject("div", id);//???, "tabindex", "0");
			DOMNode.setTopLeftAbsolute(domNode, 0, 0); // after title bar
		}
		setBackgroundImpl(jc.isOpaque() ? getBackground() : null);
		return updateDOMNodeCUI();
	}

	@Override
	public void propertyChangedFromListener(PropertyChangeEvent e, String prop) {
		//System.out.println("JSMenuBarUI prop from listener = " + prop);
		super.propertyChangedFromListener(e, prop);
	}

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		//System.out.println("JSMenuBarUI prop " + prop);
		if (!installed && jc.getRootPane() != null) {
			jc.getRootPane().addKeyListener(keyListener);
			installed = true;
		}
		super.propertyChange(e);
	}

	@Override
	protected int getContainerHeight() {
		Insets m = menuBar.getInsets();
		height = getFont().getFontMetrics().getHeight() + m.top + m.bottom;
		return height;
	}

	@Override
	public void setVisible(boolean b) {
		super.setVisible(b);
		Component top = menuBar.getTopLevelAncestor();
		if ( top instanceof JApplet)
			((JSAppletUI)((JApplet) top).getUI()).adjustCanvasForMenuBar();		
	}

	@Override
	public Insets getInsets() {
		return new Insets(0,10,0,10);
		
	}
	
	@Override
	public Dimension getPreferredSize(JComponent jc) {
		// layout manager will call this specifically for the height
		// we could make this larger if it ends up being multilevel?
		Dimension d = null;///new Dimension(0, getContainerHeight());
		return d;
	}

	@Override
	public void componentAdded(ContainerEvent e) {
		// OK, the idea here is that we detach all child nodes
		// and then reattach them.
		// (already done)
//		DOMNode.detachAll(domNode);
//		setTainted();
//		setHTMLElement();
	}

	@Override
	public void componentRemoved(ContainerEvent e) {
		DOMNode.detachAll(domNode);
		setTainted();
		setHTMLElement();
	}

	static void loadActionMap(LazyActionMap map) {
		map.put(new Actions(Actions.TAKE_FOCUS));
	}

	@Override
	public void installUI(JComponent c) {
		menuBar = (JMenuBar) c;

		installDefaults();
		installListeners();
		installKeyboardActions();

	}

	protected void installDefaults() {
		if (menuBar.getLayout() == null || menuBar.getLayout() instanceof UIResource) {
			menuBar.setLayout(new DefaultMenuLayout(menuBar, BoxLayout.LINE_AXIS));
			menuBar.addContainerListener(this);
		}

		LookAndFeel.installProperty(menuBar, "opaque", Boolean.TRUE);
		LookAndFeel.installBorder(menuBar, "MenuBar.border");
		LookAndFeel.installColorsAndFont(menuBar, "MenuBar.background", "MenuBar.foreground", "MenuBar.font");
		menuBar.setOpaque(true);
	}

	protected void installListeners() {
		containerListener = createContainerListener();
		changeListener = createChangeListener();
		keyListener = createKeyListener();
		
		for (int i = 0; i < menuBar.getMenuCount(); i++) {
			JMenu menu = menuBar.getMenu(i);
			if (menu != null)
				menu.getModel().addChangeListener(changeListener);
		}
		menuBar.addContainerListener(containerListener);
	}

	protected void installKeyboardActions() {
		InputMap inputMap = getInputMap(JComponent.WHEN_IN_FOCUSED_WINDOW);

		SwingUtilities.replaceUIInputMap(menuBar, JComponent.WHEN_IN_FOCUSED_WINDOW, inputMap);

		LazyActionMap.installLazyActionMap(menuBar, JSMenuBarUI.class, "MenuBar.actionMap");
	}

	InputMap getInputMap(int condition) {
		if (condition == JComponent.WHEN_IN_FOCUSED_WINDOW) {
			Object[] bindings = (Object[]) DefaultLookup.get(menuBar, this, "MenuBar.windowBindings");
			if (bindings != null) {
				return LookAndFeel.makeComponentInputMap(menuBar, bindings);
			}
		}
		return null;
	}

	@Override
	public void uninstallUI(JComponent c) {
		uninstallDefaults();
		uninstallListeners();
		uninstallKeyboardActions();

		menuBar = null;
	}

	protected void uninstallDefaults() {
		if (menuBar != null) {
			LookAndFeel.uninstallBorder(menuBar);
		}
	}

	protected void uninstallListeners() {
		menuBar.removeContainerListener(containerListener);

		for (int i = 0; i < menuBar.getMenuCount(); i++) {
			JMenu menu = menuBar.getMenu(i);
			if (menu != null)
				menu.getModel().removeChangeListener(changeListener);
		}

		containerListener = null;
		changeListener = null;
		handler = null;
	}

	protected void uninstallKeyboardActions() {
		SwingUtilities.replaceUIInputMap(menuBar, JComponent.WHEN_IN_FOCUSED_WINDOW, null);
		SwingUtilities.replaceUIActionMap(menuBar, null);
	}

	protected ContainerListener createContainerListener() {
		return getHandler();
	}

	protected ChangeListener createChangeListener() {
		return getHandler();
	}

	protected KeyListener createKeyListener() {
		return getHandler();
	}

	private Handler getHandler() {
		if (handler == null) {
			handler = new Handler();
		}
		return handler;
	}

	private class Handler implements ChangeListener, ContainerListener, KeyListener {
		//
		// ChangeListener
		//
		@Override
		public void stateChanged(ChangeEvent e) {
			for (int i = 0, c = menuBar.getMenuCount(); i < c; i++) {
				JMenu menu = menuBar.getMenu(i);
				if (menu != null && menu.isSelected()) {
					menuBar.getSelectionModel().setSelectedIndex(i);
					return;
				}
			}
			menuBar.getSelectionModel().clearSelection();
		}

		//
		// ContainerListener
		//
		@Override
		public void componentAdded(ContainerEvent e) {
			Component c = e.getChild();
			if (c instanceof JMenu)
				((JMenu) c).getModel().addChangeListener(changeListener);
		}

		@Override
		public void componentRemoved(ContainerEvent e) {
			Component c = e.getChild();
			if (c instanceof JMenu)
				((JMenu) c).getModel().removeChangeListener(changeListener);
		}

		@Override
		public void keyTyped(KeyEvent e) {
		}

		@Override
		public void keyPressed(KeyEvent e) {			
			JSMenuManager msm = (JSMenuManager) MenuSelectionManager.defaultManager();
	        msm.setCurrentPath(null);
	        msm.processKeyEvent(e);
		}

		@Override
		public void keyReleased(KeyEvent e) {
			// TODO Auto-generated method stub
			
		}
	}

	private static class Actions extends UIAction {
		private static final String TAKE_FOCUS = "takeFocus";

		Actions(String key) {
			super(key);
		}

		@Override
		public void actionPerformed(ActionEvent e) {
			// TAKE_FOCUS
			JMenuBar menuBar = (JMenuBar) e.getSource();
			MenuSelectionManager defaultManager = MenuSelectionManager.defaultManager();
			MenuElement me[];
			MenuElement subElements[];
			JMenu menu = menuBar.getMenu(0);
			if (menu != null) {
				me = new MenuElement[3];
				me[0] = (MenuElement) menuBar;
				me[1] = (MenuElement) menu;
				me[2] = (MenuElement) menu.getPopupMenu();
				defaultManager.setSelectedPath(me);
			}
		}
	}

}
