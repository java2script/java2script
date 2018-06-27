package swingjs.plaf;

import java.awt.Dialog;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.Insets;
import java.awt.JSComponent;
import java.awt.Toolkit;
import java.awt.Window;
import java.awt.image.BufferedImage;
import java.awt.peer.WindowPeer;

import javax.swing.JWindow;

import swingjs.JSAppletViewer;
import swingjs.JSUtil;
import swingjs.api.js.DOMNode;

public class JSWindowUI extends JSComponentUI implements WindowPeer {

	protected DOMNode  
	/**************/ frameNode, /*********************/
  /************/ titleBarNode, /********************/
  /**/ titleNode,                      closerNode, //
  /***************/ layerNode; /********************/
  
	protected JWindow w;
	protected int z;

  protected int defaultWidth = 400;
  protected int defaultHeight = 400;
	

	protected boolean isFrame, isDialog;
	protected Window window;
	protected Font font;

	/**
	 * a translucent screen that prevents events to pass - for JDialog
	 */
	protected DOMNode modalNode;


	private Graphics2D graphics;

	/*
	 * Not Lightweight; an independent space with RootPane, LayeredPane,
	 * ContentPane, (optional) MenuBar, and GlassPane
	 * 
	 * 
	 * Used by JWindow, JFrame, JDialog, and JPopupMenu
	 * 
	 * 
	 * Lots to do here
	 * 
	 * @author Bob Hanson
	 */
	@Override
	public WindowPeer setFrame(Window target, boolean isFrame) {
		//set((JComponent)(Object)target); // yes, I know it is not a JComponent. This is JavaScript!
		window = target;
		w = (JWindow) window;
		this.isFrame = isFrame;
		isContainer = isWindow = true;
		JSComponent jc = (JSComponent) (Object) this;
		JSAppletViewer viewer = JSUtil.getAppletViewer();
		applet = viewer.html5Applet;
		graphics = (Graphics2D) jc.getGraphics();
		return this;
	}

	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			containerNode = domNode = newDOMObject("div", id);
			setWindowClass(domNode);
		}
		return domNode;
	}
	
	protected void setWindowClass(DOMNode windowNode) {
		DOMNode.setZ(windowNode, z);
		$(windowNode).addClass("swingjs-window");
		JSUtil.J2S._setDragDropTarget(windowNode);
	}

	@Override
	public Toolkit getToolkit() {
		return Toolkit.getDefaultToolkit();
	}

	@Override
	public FontMetrics getFontMetrics(Font font) {
		if (!font.equals(this.font))
			this.window.setFont(this.font = font);
		return graphics.getFontMetrics(font);
	}


	@Override
	public void toFront() {
		if (debugging)
			System.out.println("window to front for " + id);
		z = JSUtil.J2S._setWindowZIndex(domNode, Integer.MAX_VALUE);
	}

	@Override
	public void toBack() {
		System.out.println("window to back for " + id);
		z = JSUtil.J2S._setWindowZIndex(domNode, Integer.MIN_VALUE);
		
	}

	@Override
	public void updateAlwaysOnTopState() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateFocusableWindowState() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean requestWindowFocus() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void setModalBlocked(Dialog blocker, boolean blocked) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateMinimumSize() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateIconImages() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setOpacity(float opacity) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setOpaque(boolean isOpaque) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateWindow(BufferedImage backBuffer) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void repositionSecurityWarning() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void dispose() {
		JSUtil.J2S._jsUnsetMouse(domNode);
		DOMNode.remove(outerNode);
		if (modalNode != null)
			DOMNode.remove(modalNode);
	}

	@Override
	public Insets getInsets() {
		return new Insets(0, 0, 0, 0);
	}

}
