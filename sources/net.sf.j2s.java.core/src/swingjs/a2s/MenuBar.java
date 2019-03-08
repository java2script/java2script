package swingjs.a2s;

import java.awt.Component;
import java.awt.HeadlessException;
import java.awt.MenuComponent;
import java.awt.MenuShortcut;
import java.util.Enumeration;
import java.util.Vector;

import javax.swing.JMenuBar;

public class MenuBar extends JMenuBar {

	public void isAWT() {
	}

	public MenuBar() throws HeadlessException {
		super();
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

	Menu helpMenu = null;

	@Override
	public Menu getHelpMenu() {
		return helpMenu;
	}

	public void setHelpMenu(java.awt.Menu m) {
		helpMenu = m;
	}

	public void remove(MenuComponent m) {
		super.remove((Component) m);
	}

	public int countMenus() {
		return getMenuCount();
	}

}
