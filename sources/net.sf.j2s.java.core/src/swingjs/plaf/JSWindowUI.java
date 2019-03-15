package swingjs.plaf;

import java.awt.Dialog;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.Insets;
import java.awt.JSComponent;
import java.awt.JSDialog;
import java.awt.Window;
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;
import java.awt.image.BufferedImage;
import java.awt.peer.WindowPeer;

import javax.swing.JWindow;

import swingjs.JSAppletViewer;
import swingjs.JSUtil;
import swingjs.api.js.DOMNode;

public class JSWindowUI extends JSComponentUI implements WindowPeer, WindowListener, ComponentListener  {

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

//	private Object dialogBlocker;

	protected boolean isPopup;

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
			setWindowClass();
		}
		return domNode;
	}   
	

//	@Override
//	protected void addJQueryFocusCallbacks() {
//		// no focus for Window objects, only what they contain.
//	}
//
//	@Override
//	public boolean requestFocus() {
//		return true;
//	}
//
	
	
	protected void setWindowClass() { 
		setZOrder(z);
		addClass(domNode, "swingjs-window");
		// these next two lines are what allow the FocusManager to work....or not
//		focusNode = domNode;
//		addJQueryFocusCallbacks();
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
		z = J2S.setWindowZIndex(domNode, Integer.MAX_VALUE);
		DOMNode.setPositionAbsolute(domNode);
		if (modalNode != null)
			DOMNode.setZ(modalNode, z - 1);
	}

	@Override
	public void toBack() {
		if (debugging)
			System.out.println("window to back for " + id);
		z = J2S.setWindowZIndex(domNode, Integer.MIN_VALUE);
		if (modalNode != null)
			DOMNode.setZ(modalNode, z - 1);		
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
//		JSDialog b = ((JSDialog) (Object) blocker);
//		dialogBlocker = (blocked ? b : null);
	}

	@Override
	public void setModalBlocked(JSDialog blocker, boolean blocked) {
//		dialogBlocker = (blocked ? blocker : null);
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
		J2S.unsetMouse(domNode);
		DOMNode.dispose(outerNode);
		if (modalNode != null)
			DOMNode.dispose(modalNode);
	}

	@Override
	public Insets getInsets() {
		return zeroInsets; 
	}

	@Override
	public void setVisible(boolean b) {
		if (!isPopup)
			hideAllMenus();
		super.setVisible(b);
	}



	@Override
	public void windowOpened(WindowEvent e) {
		System.out.println("JSWindowUI windowOpened " + c.isVisible() + " " + id);
//		c.requestFocus();
	}


	@Override
	public void windowClosing(WindowEvent e) {
		hideAllMenus();
	}


	@Override
	public void windowClosed(WindowEvent e) {
		hideAllMenus();
	}


	@Override
	public void windowIconified(WindowEvent e) {
		hideAllMenus();
	}


	@Override
	public void windowDeiconified(WindowEvent e) {
		hideAllMenus();
	}


	@Override
	public void windowActivated(WindowEvent e) {
//		System.out.println("JSFrameUI windowActivated " + c.isVisible());
//		c.requestFocus(); // caused problem with combobox focus
	}


	@Override
	public void windowDeactivated(WindowEvent e) {
		hideAllMenus();
	}


	@Override
	public void componentResized(ComponentEvent e) {
		hideAllMenus();
	}


	@Override
	public void componentMoved(ComponentEvent e) {
		hideAllMenus();
	}


	@Override
	public void componentShown(ComponentEvent e) {
		hideAllMenus();
	}


	@Override
	public void componentHidden(ComponentEvent e) {
		hideAllMenus();
	}

}
