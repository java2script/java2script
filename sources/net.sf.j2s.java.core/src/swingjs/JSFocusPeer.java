package swingjs;

import java.applet.JSApplet;
import java.awt.AWTEvent;
import java.awt.Component;
import java.awt.Container;
import java.awt.JSComponent;
import java.awt.KeyboardFocusManager;
import java.awt.Window;
import java.awt.event.FocusEvent;
import java.awt.event.WindowEvent;
import java.awt.peer.KeyboardFocusManagerPeer;
import java.beans.PropertyVetoException;

import javax.swing.JComponent;
import javax.swing.JInternalFrame;
import swingjs.api.js.DOMNode;
import swingjs.api.js.JQueryObject;
import swingjs.plaf.JSComponentUI;

/**
 * NEEDS WORK
 * 
 * @author hansonr
 *
 */
public class JSFocusPeer implements KeyboardFocusManagerPeer {

	private Window currentWindow;
	private Component currentFocusOwner;

	@Override
	public void setCurrentFocusedWindow(Window win) {
		currentWindow = win;
//		setCurrentFocusOwner(win);
	}

	@Override
	public void clearGlobalFocusOwner(Window activeWindow) {
		currentFocusOwner = null;
	}

	@Override
	public Window getCurrentFocusedWindow() { // ... or Applet...
		DOMNode active = getAccessibleActiveElement();
		@SuppressWarnings("unused")
		JQueryObject o = JSUtil.jQuery.$(active).closest("swingjs-window");
		return currentWindow = (Window) getAccessibleComponentFor(/** @j2sNative o[0]  || */null);
	}

	/**
	 * related would be from a focus lost event.
	 * @param related
	 * @return
	 */
	public Component getCurrentFocusOwner(Object related) {
	  currentFocusOwner = getAccessibleComponentFor(related == null ? getAccessibleActiveElement() : (DOMNode) related);
	  if (currentFocusOwner == null)
	    currentWindow = null;
	  return currentFocusOwner;
	}

	@Override
	public void setCurrentFocusOwner(Component comp) {
		currentFocusOwner = comp;
		if (comp == null)
			return;
		((JSComponentUI) ((JComponent) comp).ui).focus();
	}

	private DOMNode getAccessibleActiveElement() {
		DOMNode node = getActiveElement();
		return (node == null || getAccessibleComponentFor(node) == null ? null : node);
	}

	public static DOMNode getActiveElement() {
		/**
		 * @j2sNative
		 * var node = document.activeElement;
		 * return  (!node || node == document.body || !node.ui && !node["data-component"] ? null : node);
		 */
		{
		return null;
		}
	}

	/**
	 * This is a check that the given node is part of this applet's creation. 
	 * SwingJS uses component.appContext.threadGroup to hold such information. 
	 * 
	 * @param node
	 * @return
	 */
	public static JSComponent getAccessibleComponentFor(DOMNode node) {
		JSComponent c = /** @j2sNative node && node.ui && node.ui.jc || node && node["data-component"]||*/null;
		return (c != null && c.getAppContext().getThreadGroup() == Thread.currentThread().getThreadGroup() ? c : null);
	}

	public void handleJSMouseEventFocus(AWTEvent e) {
		System.out.println("handling mouseeventfocus event " + e);
	}

	@Override
	public Component getCurrentFocusOwner() {
		return getCurrentFocusOwner(null);
	}

	/**
	 * send focus events out as though via SystemEventQueue
	 * 
	 * @param jco
	 * @param related
	 * @param focusGained
	 */
	public static void handleJSFocus(Object jco, Object related, boolean focusGained) {
		JComponent c0 = (JComponent) jco;
		AWTEvent e;
		if (related == null) { // see below
			e = new FocusEvent(c0, focusGained ? FocusEvent.FOCUS_GAINED : FocusEvent.FOCUS_LOST);
			c0.dispatchEvent(e);
			return;
		}
		JComponent other;
		if (focusGained) {
			other = (JComponent) JSFocusPeer.getAccessibleComponentFor((DOMNode) related);
			if (other != null && other != c0) {
				other.dispatchEvent(new FocusEvent(other, FocusEvent.FOCUS_LOST, false, c0));
			}
			c0.dispatchEvent(new FocusEvent(c0, FocusEvent.FOCUS_GAINED, false, other));
		} else {
			//System.out.println("JSFocusPeer lost " + ((JSComponentUI)c0.getUI()).getId());
			other = (JComponent) JSToolkit.getCurrentFocusOwner(related);
			c0.dispatchEvent(new FocusEvent(c0, FocusEvent.FOCUS_LOST, false, other));
			if (other != null && other != c0)
				other.dispatchEvent(new FocusEvent(other, FocusEvent.FOCUS_GAINED, false, c0));
		}
	}

	public void checkFrameFocusOnMouseDown(AWTEvent e) {
		Container p = JSComponent.秘getTopInvokableAncestor((Container) e.getSource(), true);
		// Table editor mouse down may have p == null
		if (p == null || getCurrentFocusOwner() != null && p == currentWindow) 
			return;
		Window w = currentWindow;
		p.dispatchEvent(new WindowEvent((Window) p, WindowEvent.WINDOW_ACTIVATED));

		//oops, windows do not report focus gained 
		// handleJSFocus(p, currentWindow, true);
		setCurrentFocusedWindow((Window) p);
		if (p instanceof JInternalFrame) {
			try {
				((JInternalFrame) p).setSelected(true);
			} catch (PropertyVetoException e1) {
				e1.printStackTrace();
			}
		} else if (p instanceof Window) {
			((Window) p).toFront();
		}
		if (p.秘isFocusSetAndEnabled()) {
			((JSComponentUI)((JSComponent) p).ui).focus(); 
			handleJSFocus(p, w, true);
		}
	}

	public static void focus(DOMNode focusNode) {
		/** @j2sNative 
		 * 
		 * focusNode.focus();
		 * 
		 *
		 *  
		 *  */
	}

	public static void setFocusLast(JSApplet applet) {
		// this works because appendText for AWT TextArea fires a
		// requestFocus, and that method caches its most recent 
		// component for a window (so only saved if the component has
		// been added. JSAppletViewer now requests focus from JSFocusPeer 
		// for the most recent request and executes it after the 
		// window has been made visible.

		Component c = KeyboardFocusManager.getMostRecentFocusOwner((Window) (Object) applet);
		if (c != null)
			c.requestFocus();
	}

}
