package swingjs.a2s;

import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.Graphics;
import java.awt.LayoutManager;

import javax.swing.JComponent;
import javax.swing.JPanel;

public class Panel extends JPanel {

	public void isAWT() {}
	public void isAWTContainer() {}

	public Panel() {
		this(new FlowLayout());
	} 

	public Panel(LayoutManager layout) {
		super(layout);
		subclassSetup();
		setBackground(null);
		setOpaque(false);
		A2SContainer.fixAWTPaint(this, JComponent.class);
	}

	protected void subclassSetup() {
		// JApplet startup
	}

	@Override
	public void setBackground(Color c) {
		super.setBackground(c);
		setOpaque(c != null);
	}


}
