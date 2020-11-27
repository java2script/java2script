package swingjs.a2s;

import java.awt.Color;
import java.awt.Insets;
import java.awt.event.ActionEvent;

import javax.swing.JButton;

public class Button extends JButton {

	private final static Color bgcolor = new Color(238, 238, 238);//#EEEEEE
	public void isAWT() {} // prevents LookAndFeel.installColorsAndFont()
	
	public Button() {
		this(null);
	}

	public Button(String text) {
		super(text);
		if (!super.isBackgroundSet())
			super.setBackground(bgcolor);
		
	}
	
	private static Insets awtInsets = new Insets(5, 6, 5, 6);
	// awt.Button has an unadjustable horizontal inset of what appears to be about 6 pixels
	@Override
	public Insets getMargin() {
		return awtInsets;
	}

    @Override
	protected void fireActionPerformed(ActionEvent event) {
    	A2SEvent.addListener(this);
    	super.fireActionPerformed(event);
    }
    

}
