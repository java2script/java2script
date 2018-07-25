package swingjs;

import java.awt.Component;
import java.awt.Window;
import java.awt.event.FocusEvent;
import java.awt.peer.KeyboardFocusManagerPeer;

public class JSFocusManager implements KeyboardFocusManagerPeer {

	private Window currentWindow;
	private Component currentFocusOwner;

	@Override
	public void setCurrentFocusedWindow(Window win) {
		currentWindow = win;
	}

	@Override
	public Window getCurrentFocusedWindow() {
		return currentWindow;
	}

	@Override
	public void setCurrentFocusOwner(Component comp) {
		currentFocusOwner = comp;
	}

	@Override
	public Component getCurrentFocusOwner() {
		return currentFocusOwner;
	}

	@Override
	public void clearGlobalFocusOwner(Window activeWindow) {
		if (currentFocusOwner != null) {
			// what else?
//			currentFocusOwner.fire
//			new FocusEvent(currentFocusOwner,
//			          FocusEvent.FOCUS_LOST,
//			          false, null);
			currentFocusOwner = null;
		}
	}

}
