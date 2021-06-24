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
		return super.prefSizeComp();
	}

	@Override
	public void setBackground(Color c) {
		super.setBackground(c);
		super.setOpaque(c != null);
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

}
