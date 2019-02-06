package swingjs.a2s;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Insets;

import javax.swing.JLabel;
import javax.swing.SwingConstants;
import javax.swing.plaf.ComponentUI;

import swingjs.plaf.JSLabelUI;

public class Label extends JLabel {

	public Label() {
		this("", java.awt.Label.LEFT);
	}
	
	public Label(String text) {
		this(text, java.awt.Label.LEFT);
	}
	
	public Label(String text, int center) {
		super(text);
		/**
		 * @j2sNative
		 * this.getUI$().isAWT = true;
		 */
		super.setBackground(null);
		setAlignment(center);
	}

	@Override
	public void setText(String text) {
	  super.setText(text);
	}
	
	@Override
	public void setBackground(Color c) {
		super.setBackground(c);
		setOpaque(c != null);
	}
	
	private static Insets awtInsets = new Insets(3, 6, 2, 6);
	// awt.Label has an unadjustable horizontal inset of what appears to be about 6 pixels
	@Override
	public Insets getInsets() {
		return awtInsets;
	}

	@Override
	public Insets getInsets(Insets s) {
		s.top = awtInsets.top;
		s.left = awtInsets.left;
		s.bottom = awtInsets.bottom;
		s.right = awtInsets.right;
		return s;
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

    @Override
    public Font getFont() {
    	return getFontAWT();
    }


}
