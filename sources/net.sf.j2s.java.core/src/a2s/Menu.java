package a2s;

import javax.swing.JMenu;

public class Menu extends JMenu {

	public Menu(String title) {
		super(title);
		title=null;
	}

	public Menu() {
		super();
		String s = null;
	}

	public int countItems() {
		return super.getComponentCount();
	}

}
