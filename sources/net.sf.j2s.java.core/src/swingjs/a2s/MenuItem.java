package swingjs.a2s;

import java.awt.Font;
import java.awt.MenuComponent;
import java.awt.MenuShortcut;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;

import javax.swing.JComponent;
import javax.swing.JMenuItem;
import javax.swing.KeyStroke;

public class MenuItem extends JMenuItem implements AWTMenuItem {

	public MenuItem() {
		super();
	}

	public MenuItem(String string) {
		super(string);
	}

	public MenuItem(String label, MenuShortcut s) {
		super(label); 
		setShortcut(s);
	}

	@Override
	public void remove(MenuComponent comp) {
		super.remove((JComponent) comp);		
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
