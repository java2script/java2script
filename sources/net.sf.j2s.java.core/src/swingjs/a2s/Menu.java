package swingjs.a2s;

import java.awt.Font;
import java.awt.MenuComponent;
import java.awt.MenuShortcut;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;

import javax.swing.JComponent;
import javax.swing.JMenu;
import javax.swing.JMenuItem;
import javax.swing.KeyStroke;

public class Menu extends JMenu implements AWTMenu {

	public Menu(String title) {
		this(title, false);
	}

	public Menu() {
		this("", false);
	}

	public Menu(String title, boolean isTearOff) {
		super(title);
	}

	@Override
	public int countItems() {
		return super.getComponentCount();
	}

    @Override
	public java.awt.MenuItem getItem(int index) {
    	return (java.awt.MenuItem) getComponent(index);
    }
    
	@Override
	public java.awt.MenuItem add(java.awt.MenuItem mi) {
		return (java.awt.MenuItem) this.add((JComponent) mi);
	}

	@Override
	public void insert(java.awt.MenuItem menuitem, int index) {
		insert((JMenuItem) menuitem, index);
	}

	@Override
	public void remove(MenuComponent comp) {
		remove((JComponent) comp);
	}

	@Override
	public MenuShortcut getShortcut() {
		KeyStroke a = getAccelerator();
		return (a == null ? null : new MenuShortcut(a.getKeyCode(), (a.getModifiers() & KeyEvent.SHIFT_MASK) != 0));
	}

	@Override
	public void setShortcut(MenuShortcut s) {
		setAccelerator(KeyStroke.getKeyStroke(s.getKey(), 
				  ActionEvent.CTRL_MASK | (s.usesShiftModifier() ? ActionEvent.SHIFT_MASK : 0)));
	}

	@Override
	public void deleteShortcut() {
		setAccelerator(null);
	}

	
    @Override
    public Font getFont() {
    	return getFontAWT();
    }



}
