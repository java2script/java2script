package swingjs.a2s;

import java.awt.Font;
import java.awt.HeadlessException;

import javax.swing.JMenuBar;

public class MenuBar extends JMenuBar {
	
    public MenuBar() throws HeadlessException {
    	super();
    }

    @Override
    public Font getFont() {
    	return getFontAWT();
    }

}
