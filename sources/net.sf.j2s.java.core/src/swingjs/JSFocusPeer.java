package swingjs;

import java.awt.Component;
import java.awt.Window;
import java.awt.peer.KeyboardFocusManagerPeer;

import javax.swing.JComponent;

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
	public Window getCurrentFocusedWindow() {
		DOMNode active = getActiveElement();
		JQueryObject o = JSUtil.jQuery.$(active).closest("swingjs-window");
		return currentWindow = /** @j2sNative o[0] && o[0].ui && o[0].ui.jc || */null;
	}

	@Override
	public void setCurrentFocusOwner(Component comp) {
		JSComponentUI ui = (JSComponentUI) ((JComponent) comp).ui;
		ui.focusNode.focus();
	}

	@Override
	public Component getCurrentFocusOwner() {
		return currentFocusOwner = DOMNode.getComponentFor(getActiveElement()); 
	}

	@Override
	public void clearGlobalFocusOwner(Window activeWindow) {
		if (currentFocusOwner != null) {
			JSComponentUI ui = (JSComponentUI) ((JComponent) currentFocusOwner).ui;
			if (ui != null) {
				ui.focusNode.blur();

//			currentFocusOwner.fire
//			new FocusEvent(currentFocusOwner,
//			          FocusEvent.FOCUS_LOST,
//			          false, null);
			}
			currentFocusOwner = null;
		}
	}

	private DOMNode getActiveElement() {
		return /** @j2sNative document.activeElement || */null;
	}

}
