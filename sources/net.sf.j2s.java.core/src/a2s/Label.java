package a2s;

import java.awt.Color;

import javax.swing.JLabel;
import javax.swing.SwingConstants;

public class Label extends JLabel {

	public Label() {
		this("", java.awt.Label.LEFT);
	}
	
	public Label(String text) {
		this(text, java.awt.Label.LEFT);
	}
	
	public Label(String text, int center) {
		super(text, center);
		super.setBackground(null);
		setAlignment(java.awt.Label.LEFT);
	}

	public void setBackground(Color c) {
		super.setBackground(c);
		setOpaque(c != null);
	}
	
	public void setAlignment(int alignment) {
		float xAlignment = 0f;
		float yAlignment = 0.5f;
		switch (alignment) {
		case java.awt.Label.LEFT:
			alignment = SwingConstants.LEFT;
			xAlignment = 0;
			break;
		case java.awt.Label.RIGHT:
			alignment = SwingConstants.RIGHT;
			xAlignment = 1;
			break;
		case java.awt.Label.CENTER:
			alignment = SwingConstants.CENTER;
			xAlignment = 0.5f;
			break;
		}
		setAlignmentX(xAlignment);
		setAlignmentY(yAlignment);
		setHorizontalAlignment(alignment);
//		setHorizontalTextPosition(alignment);
		setVerticalAlignment(SwingConstants.CENTER);
		setVerticalTextPosition(SwingConstants.CENTER);
	}

}
