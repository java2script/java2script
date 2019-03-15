package swingjs.a2s;

import java.awt.Color;
import java.awt.Component;
import java.awt.HeadlessException;
import java.awt.Insets;
import java.awt.MenuComponent;
import java.awt.MenuContainer;
import java.awt.MenuShortcut;
import java.util.Enumeration;
import java.util.Vector;

import javax.swing.JMenuBar;

public class MenuBar extends JMenuBar implements MenuContainer {

	public void isAWT() {
	}

	public MenuBar() throws HeadlessException {
		super();
		setBackground(new Color(0xEEEEEE));
	}

	private static Insets awtInsets = new Insets(6, 10, 6, 10);

	@Override
	public Insets getInsets() {
	    return awtInsets;
	}
	
	public void add(java.awt.Menu m) {
		super.add((Component) m);
	}

	public void add(java.awt.MenuItem m) {
		super.add((Component) m);
	}

	public void deleteShortcut(MenuShortcut s) {
		int nmenus = getMenuCount();
		for (int i = 0; i < nmenus; i++) {
			((Menu) getMenu(i)).deleteShortcut(s);
		}
	}

	public synchronized Enumeration<MenuShortcut> shortcuts() {
		Vector<MenuShortcut> shortcuts = new Vector<>();
		int nmenus = getMenuCount();
		for (int i = 0; i < nmenus; i++) {
			Enumeration<MenuShortcut> e = ((Menu) getMenu(i)).shortcuts();
			while (e.hasMoreElements()) {
				shortcuts.addElement(e.nextElement());
			}
		}
		return shortcuts.elements();
	}

	java.awt.Menu helpMenu = null;

	@Override
	public Menu getHelpMenu() {
		return (Menu) helpMenu;
	}

	public void setHelpMenu(java.awt.Menu m) {
      if (helpMenu == m) {
          return;
      }
      if (helpMenu != null) {
          remove((MenuComponent) helpMenu);
      }
      if (m.getParent() != this) {
          add(m);
      }
      helpMenu = m;
      if (m != null) {
          m.isHelpMenu = true;
          m.parent = this;
//          MenuBarPeer peer = (MenuBarPeer)this.peer;
//          if (peer != null) {
//              if (m.peer == null) {
//                  m.addNotify();
//              }
//              peer.addHelpMenu(m);
//          }
      }
	}

	@Override
	public void remove(MenuComponent m) {
		super.remove((Component) m);
	}

	public int countMenus() {
		return getMenuCount();
	}

}
