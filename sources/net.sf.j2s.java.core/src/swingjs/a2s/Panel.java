package swingjs.a2s;

import java.awt.Color;
import java.awt.Font;
import java.awt.LayoutManager;

import javax.swing.JPanel;

public class Panel extends JPanel {

	public  boolean isAWT = true;

	public Panel(LayoutManager layout) {
		super(layout);
		subclassSetup();
		setBackground(null);
		setOpaque(false);
	}

	protected void subclassSetup() {
		// JApplet startup
	}

	public Panel() {
		super();
		subclassSetup();
		setBackground(null);
		setOpaque(false);
	} 

	@Override
	public void setBackground(Color c) {
		super.setBackground(c);
		setOpaque(c != null);
	}


}
