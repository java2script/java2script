package a2s;

import java.awt.Insets;
import java.awt.event.ActionEvent;

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

    protected void fireActionPerformed(ActionEvent event) {
    	A2SEvent.addListener(null, this);
    	super.fireActionPerformed(event);
    }

}
