package swingjs;

import java.awt.AWTEvent;
import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.GraphicsConfiguration;
import java.awt.Image;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.Toolkit;
import java.awt.event.PaintEvent;
import java.awt.image.ColorModel;
import java.awt.image.ImageObserver;
import java.awt.image.ImageProducer;
import java.awt.image.VolatileImage;
import java.awt.peer.ContainerPeer;
import java.awt.peer.LightweightPeer;

import sun.awt.CausedFocusEvent.Cause;

/**
 * A class to provide a JavaScript peer interface for Swing AWT components that
 * have not been developed yet?
 * 
 * @author Bob Hanson
 * 
 */
public class JSNullComponentPeer implements LightweightPeer {

	@SuppressWarnings("unused")
	private Component target;
	@SuppressWarnings("unused")
	private boolean isNull = true;
	
	public JSNullComponentPeer(Component target) {
		this.target = target;
		
	}

	@Override
	public boolean isObscured() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean canDetermineObscurity() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void setVisible(boolean b) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setEnabled(boolean b) {
		// TODO Auto-generated method stub

	}

	@Override
	public void paint(Graphics g) {
		// TODO Auto-generated method stub

	}

	@Override
	public void repaint(long tm, int x, int y, int width, int height) {
		// TODO Auto-generated method stub

	}

	@Override
	public void print(Graphics g) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setBounds(int x, int y, int width, int height, int op) {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEvent(AWTEvent e) {
		// TODO Auto-generated method stub

	}

	@Override
	public void coalescePaintEvent(PaintEvent e) {
		// TODO Auto-generated method stub

	}

	@Override
	public Point getLocationOnScreen() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Dimension getPreferredSize() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Dimension getMinimumSize() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ColorModel getColorModel() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Toolkit getToolkit() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Graphics getGraphics() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FontMetrics getFontMetrics(Font font) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void dispose() {
		// TODO Auto-generated method stub

	}

	@Override
	public void setForeground(Color c) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setBackground(Color c) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setFont(Font f) {
		// TODO Auto-generated method stub

	}

	@Override
	public void updateCursorImmediately() {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean requestFocus(Component lightweightChild, boolean temporary,
			boolean focusedWindowChangeAllowed, long time, Cause cause) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isFocusable() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Image createImage(ImageProducer producer) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Image createImage(int width, int height) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public VolatileImage createVolatileImage(int width, int height) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean prepareImage(Image img, int w, int h, ImageObserver o) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public int checkImage(Image img, int w, int h, ImageObserver o) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public GraphicsConfiguration getGraphicsConfiguration() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean handlesWheelScrolling() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Image getBackBuffer() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void destroyBuffers() {
		// TODO Auto-generated method stub

	}

	@Override
	public void reparent(ContainerPeer newContainer) {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean isReparentSupported() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void layout() {
		// TODO Auto-generated method stub

	}

	@Override
	public Rectangle getBounds() {
		// TODO Auto-generated method stub
		return null;
	}


}
