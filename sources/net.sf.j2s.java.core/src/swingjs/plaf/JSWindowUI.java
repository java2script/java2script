package swingjs.plaf;

import java.awt.Dialog;
import java.awt.Font;
import java.awt.Insets;
import java.awt.JSDialog;
import java.awt.Window;
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;
import java.awt.image.BufferedImage;
import java.awt.peer.WindowPeer;

import javax.swing.JComponent;
import javax.swing.JWindow;

import swingjs.JSAppletViewer;
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

//	private Object dialogBlocker;

	protected boolean isPopup;
	
	protected DOMNode modalNode;

	/*
	 * Not Lightweight; an independent space with RootPane, LayeredPane,
	 * ContentPane, (optional) MenuBar, and GlassPane.
	 * 
	 * Part of the required initializations of all Dialog, Frame, and Window
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
		JSAppletViewer viewer = jc.秘appletViewer;
		applet = viewer.html5Applet;
		return this;
	}

	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			containerNode = domNode = newDOMObject("div", id);
			setWindowClass();
			bindWindowEvents();
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
		addClass(domNode, "swingjs-window");
		setZ(z);
	}

//	@Override
//	public FontMetrics getFontMetrics(Font font) {
//		return null;
////		if (!font.equals(this.font))
////			window.setFont(this.font = font);
////		return jc.getFontMetrics(font);
//	}
//
//
	@Override
	public void toFront() {
		if (jc.秘isDesktop()) {
			jc.requestFocus();
			return;
		}
		z = J2S.setWindowZIndex(domNode, Integer.MAX_VALUE);
		setZ(z);
		if (modalNode != null)
			DOMNode.setZ(modalNode, z - 1);
	}

	@Override
	public void toBack() {
		z = J2S.setWindowZIndex(domNode, Integer.MIN_VALUE);
		setZ(z);
		if (modalNode != null)
			DOMNode.setZ(modalNode, z - 1);		
	}

	@Override
	public void updateAlwaysOnTopState() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateFocusableWindowState() {
		System.out.println("JSWindow updateFocusable");
	}

	@Override
	public boolean requestWindowFocus() {
		// TODO Auto-generated method stub
		return false;
	}

	
	@Override
	public void setModalBlocked(Dialog blocker, boolean blocked) {
		modalBlocked = blocked;
	}

	@Override
	public void setModalBlocked(JSDialog blocker, boolean blocked) {
		modalBlocked = blocked;
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
		//accelNode.System.out.println("window disposed");
		J2S.unsetMouse(domNode);
		if (modalNode != null)
			DOMNode.dispose(modalNode);
		super.dispose();
	}	
	
	@Override
	public void beginValidate() {
		if (isDisposed) {
			setChildVisibilities(window);
		}
	}

	@Override
	public void endValidate() {
		if (isDisposed) {
			undisposeUI(null);
			bindWindowEvents();
			isDisposed = false;
		}
	}

	protected void bindWindowEvents() {
		setJ2sMouseHandler();
		setDraggableEvents();
		addJQueryFocusCallbacks();
		if (closerNode != null)
			bindJQueryEvents(closerNode, "click mouseenter mouseout", SOME_MOUSE_EVENT);
	}
	
	protected void setDraggableEvents() {
		// Frame and Dialog only
	}

		

	private static void setChildVisibilities(JComponent jc) {
		for (int i = jc.getComponentCount(); --i >= 0;) {
			JComponent c = (JComponent) jc.getComponent(i);
			setChildVisibilities(c);
		}
		JSComponentUI ui = (JSComponentUI) jc.ui;
		if (jc.isVisible())
			ui.setVisible(true);
	}

	@Override
	public Insets getInsets() {
		return zeroInsets; 
	}

	
	@Override
	public void setVisible(boolean b) {
		if (!isPopup) {
			hideMenusAndToolTip();
		}
		super.setVisible(b);
		toFront();
	}


	@Override
	public void windowOpened(WindowEvent e) {
		setComponentFocus();
	}


	@Override
	public void windowClosing(WindowEvent e) {
		hideMenusAndToolTip();
	}


	@Override
	public void windowClosed(WindowEvent e) {
		hideMenusAndToolTip();
	}


	@Override
	public void windowIconified(WindowEvent e) {
		hideMenusAndToolTip();
	}


	@Override
	public void windowDeiconified(WindowEvent e) {
		hideMenusAndToolTip();
	}


	@Override
	public void windowActivated(WindowEvent e) {
//		System.out.println("JSFrameUI windowActivated " + c.isVisible());
//		c.requestFocus(); // caused problem with combobox focus
	}


	@Override
	public void windowDeactivated(WindowEvent e) {
		hideMenusAndToolTip();
	}


	@Override
	public void componentResized(ComponentEvent e) {
		hideMenusAndToolTip();
	}


	@Override
	public void componentMoved(ComponentEvent e) {
		hideMenusAndToolTip();
	}


	@Override
	public void componentShown(ComponentEvent e) {
		hideMenusAndToolTip();
	}


	@Override
	public void componentHidden(ComponentEvent e) {
		hideMenusAndToolTip();
	}

}
