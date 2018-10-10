package a2s;

import java.awt.MenuShortcut;

import javax.swing.JMenuItem;

public class MenuItem extends JMenuItem {

	public MenuItem() {
		super();
	}

	public MenuItem(String string) {
		super(string);
	}

	public MenuItem(String label, MenuShortcut s) {
		super(label, s.getKey()); // skips s.usesShiftModifier();
	}

}
