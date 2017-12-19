package a2s;

import java.awt.Insets;

import javax.swing.JButton;


public class Button extends JButton {

	public Button() {
		super();
	}

	public Button(String text) {
		super(text);
	}
	
	private static Insets awtInsets = new Insets(0, 6, 0, 6);
	// awt.Button has an unadjustable horizontal inset of what appears to be about 6 pixels
	@Override
	public Insets getMargin() {
		return awtInsets;
	}

}
