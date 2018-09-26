package a2s;

import javax.swing.JMenu;

public class Menu extends JMenu {

	public Menu(String title) {
        this(title, false);
	}

	public Menu() {
        this("", false);
		String s = null;
	}

	public Menu(String title, boolean isTearOff) {
		super(title);
	}

	public int countItems() {
		return super.getComponentCount();
	}

}
