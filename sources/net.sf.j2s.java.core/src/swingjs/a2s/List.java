package swingjs.a2s;

import java.awt.Font;

import javax.swing.JList;

public class List extends JList {

	public List() {
		super();
	}

    @Override
    public Font getFont() {
    	return getFontAWT();
    }

}
