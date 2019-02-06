package swingjs.a2s;

import java.awt.HeadlessException;

import javax.swing.JMenuBar;

public class MenuBar extends JMenuBar {
	
	public  boolean isAWT = true;
	
    public MenuBar() throws HeadlessException {
    	super();
    }

}
