package a2s;

import java.awt.Color;
import java.awt.LayoutManager;

import javax.swing.JPanel;

public class Panel extends JPanel {

	public Panel(LayoutManager layout) {
		super(layout);
		setBackground(null);
		setOpaque(false);
	}

	public Panel() {
		super();
		setBackground(null);
		setOpaque(false);
	} 

	public void setBackground(Color c) {
		super.setBackground(c);
		setOpaque(c != null);
	}
	

}
