package a2s;

import java.awt.Graphics;

import javax.swing.JComponent;


public class Canvas extends Panel {
	

	
	@Override
	public void paint(Graphics g) {
		
	// see	http://www.oracle.com/technetwork/java/painting-140037.html#awt_summary
			
	//BH AWT called canvas.update(g), but Swing will call canvas.paint(g) instead. 
	//BH a2s does allow for that, with paint(g) calling update(g) (Opposite of standard Swing).
		
	//BH So in the code, canvas.paint should be renamed something like canvas.paintMe
		
		
		update(g);
	}

	private boolean notified;
	@SuppressWarnings("unused")
	@Override
	public void update(Graphics g) {
		if (!notified)
			System.out.println("neither paint(g) nor update(g) is implemented for " + this);
		notified = true;
		if (/** @j2sNative this.paintComponent$java_awt_Graphics || */false)
			paintComponent(g);
	}
}
