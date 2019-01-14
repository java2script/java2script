package swingjs;

import java.awt.AWTEvent;
import java.awt.Component;
import java.awt.JSComponent;
import java.awt.Window;
import java.awt.peer.KeyboardFocusManagerPeer;

import javax.swing.JComponent;

import sun.awt.AppContext;
import swingjs.api.js.DOMNode;
import swingjs.api.js.JQueryObject;
import swingjs.plaf.JSComponentUI;

public class JSFocusPeer implements KeyboardFocusManagerPeer {

	private Window currentWindow;
	private Component currentFocusOwner;

	@Override
	public void setCurrentFocusedWindow(Window win) {
		currentWindow = win;
		setCurrentFocusOwner(win);
	}

	@Override
	public void clearGlobalFocusOwner(Window activeWindow) {
		if (currentFocusOwner != null) {
			JSComponentUI ui = (JSComponentUI) ((JComponent) currentFocusOwner).ui;
			if (ui != null && ui.focusNode != null) {
				System.out.println("JSFP clear global blurring " + /** @j2sNative ui.focusNode.id ||*/0);
//				ui.focusNode.blur();

//			currentFocusOwner.fire
//			new FocusEvent(currentFocusOwner,
//			          FocusEvent.FOCUS_LOST,
//			          false, null);
			}
			currentFocusOwner = null;
		}
	}

	@Override
	public Window getCurrentFocusedWindow() {
		DOMNode active = getAccessibleActiveElement();
		JQueryObject o = JSUtil.jQuery.$(active).closest("swingjs-window");
		return currentWindow = (Window) getAccessibleComponentFor(/** @j2sNative o[0]  || */null);
	}

	/**
	 * related would be from a focus lost event.
	 * @param related
	 * @return
	 */
	public Component getCurrentFocusOwner(Object related) {
		return currentFocusOwner = getAccessibleComponentFor(related == null ? getAccessibleActiveElement() : (DOMNode) related);
	}

	@Override
	public void setCurrentFocusOwner(Component comp) {
		currentFocusOwner = comp;
		

		if (comp == null) {
//			System.out.println("JSFP clearing focus owner");
//			/**
//			 * @j2sNative
//			 * document.activeElement.blur();
//			 */
			return;
			
		}
//		/** 
//		 * @j2sNative
//		 * 
//		 * xxc = comp;
//		 * debugger;
//		 */
		JSComponentUI ui = (JSComponentUI) ((JComponent) comp).ui;
		System.out.println( (/** @j2sNative "JSFP setting currentfocusnode " +(ui.focusNode ? ui.focusNode.id  + " " + document.activeElement.id: "OHOH") ||*/ui));

		ui.requestFocus();

		System.out.println((/** @j2sNative ">>JSFP setting currentfocusnode " + (ui.focusNode ? ui.focusNode.id  + " " + document.activeElement.id: "OHOH") ||*/ui));

	}

	private DOMNode getAccessibleActiveElement() {
		DOMNode node = null;
		/**
		 * @j2sNative
		 * node = document.activeElement;
		 * if (!node || node == document.body || !node.ui) {
		 *   return null;
		 * }
		 */
		return (getAccessibleComponentFor(node) == null ? null : node);
	}

	/**
	 * This is a check that the given node is part of this applet's creation. 
	 * SwingJS uses component.appContext.threadGroup to hold such information. 
	 * 
	 * @param node
	 * @return
	 */
	public static JSComponent getAccessibleComponentFor(DOMNode node) {
		JSComponent c = /** @j2sNative node && node.ui && node.ui.jc || */null;
		return (c != null && c.getAppContext().getThreadGroup() == Thread.currentThread().getThreadGroup() ? c : null);
	}

	public void handleJSMouseEventFocus(AWTEvent e) {
		System.out.println("handling mouseeventfocus event " + e);
	}

	@Override
	public Component getCurrentFocusOwner() {
		return getCurrentFocusOwner(null);
	}

}
