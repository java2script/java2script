package swingjs.a2s;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.GraphicsConfiguration;

public class Canvas extends Panel {

	public Canvas(GraphicsConfiguration config) {
		this();
	}

	public Canvas() {
		super();
		//no: AWT canvases are not opaque xxxsetBackground(Color.white);
		秘setPaintsSelf(PAINTS_SELF_ALWAYS);
		秘paintClass = 秘updateClass = /**@j2sNative C$ || */null;
	}

	@Override
	public Dimension getPreferredSize() {
		// must bypass JComponent here because we subclass Panel
		return preferredSize();
	}

	@Override
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
		g.clearRect(0, 0, width, height);
	}

	@Override
	public void update(Graphics g) {
		g.clearRect(0, 0, width, height);
		paint(g);
	}

//	@Override
//	public void paint(Graphics g) {
//		((Graphics2D) g).setBackground(getBackground());
//		g.clearRect(0, 0, width, height);
//

	// on second thought, I think this was a mistaken idea: BH 2019.06

//		// see http://www.oracle.com/technetwork/java/painting-140037.html#awt_summary
//
//		// BH AWT called canvas.update(g), but Swing will call canvas.paint(g) instead.
//		// BH a2s does allow for that, with paint(g) calling update(g) (Opposite of
//		// standard Swing).
//
//		// BH So in the code, canvas.paint should be renamed something like
//		// canvas.paintMe
//
//		update(g);
//	}
//
////	private boolean notified;
//	@SuppressWarnings("unused")
//	@Override
//	public void update(Graphics g) {
//	       		if (/** @j2sNative this.paintComponent$java_awt_Graphics || */
//		false)
//			paintComponent(g);
//	}

}
