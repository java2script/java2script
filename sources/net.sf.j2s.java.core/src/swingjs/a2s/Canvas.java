package swingjs.a2s;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GraphicsConfiguration;

public class Canvas extends Panel {

	public Canvas(GraphicsConfiguration config) {
		this();
	}

	public Canvas() {
		super();
		_alwaysPaint = true;
	}

	public Dimension getPreferredSize() {
		// must bypass JComponent here because we subclass Panel
		return preferredSize();
	}

	public Dimension preferredSize() {
		// must bypass JComponent here because we subclass Panel
		return prefSizeComp();
	}


	@Override
	public void setBackground(Color c) {
		super.setBackground(c);
		setOpaque(c != null);
	}

	@Override
	public void paint(Graphics g) {
		((Graphics2D) g).setBackground(getBackground());
		g.clearRect(0, 0, width, height);

		// see http://www.oracle.com/technetwork/java/painting-140037.html#awt_summary

		// BH AWT called canvas.update(g), but Swing will call canvas.paint(g) instead.
		// BH a2s does allow for that, with paint(g) calling update(g) (Opposite of
		// standard Swing).

		// BH So in the code, canvas.paint should be renamed something like
		// canvas.paintMe

		update(g);
	}

//	private boolean notified;
	@SuppressWarnings("unused")
	@Override
	public void update(Graphics g) {
//		if (!notified && JSUtil.is)
//			System.out.println("neither paint(g) nor update(g) is implemented for " + this);
//		notified = true;
	       		if (/** @j2sNative this.paintComponent$java_awt_Graphics || */
		false)
			paintComponent(g);
	}

}
