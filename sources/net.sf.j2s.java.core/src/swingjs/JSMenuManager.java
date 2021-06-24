package swingjs;

import java.awt.EventQueue;
import java.awt.event.KeyEvent;

import javax.swing.JComponent;
import javax.swing.MenuElement;
import javax.swing.MenuSelectionManager;

import swingjs.api.js.DOMNode;
import swingjs.api.js.JQueryObject;

public class JSMenuManager extends MenuSelectionManager {
	
	private static DOMNode currentNode; 
	
	public static void setCurrentNode(Object node) {
		// set upon hover in j2sMenu.js
		currentNode = (DOMNode) node;
		defaultManager().clearSelectedPath();
	}
		
//	public static void addSwingJSAttributes(DOMNode itemNode, String type, JSComponentUI ui) {
//		JSUtil.jQuery.$(itemNode).addClass("swingjs" + type);
//		DOMNode.setAttr(itemNode, "data-menu_ui", ui);
//	}
//	
//	
	/**
	 *  MUCH simpler using jQuery!
	 *  Of course, not allowing cycles -- just getting the first one, but we could do that. 
	 * 
	 */
    @Override
	public void processKeyEvent(KeyEvent e) {
    	if ((e.getModifiers() & ~KeyEvent.ALT_MASK) != 0) {
    		// something more than just alt here
    		// handleAccelerator();
    		checkNavigationKeys(e);
    		return;
    	}

    	int i = Character.toLowerCase(e.getKeyCode());
    	JQueryObject obj = JSUtil.jQuery.$(".a.ui-mnem-" + i);
    	DOMNode node = (/**@j2sNative obj[0] || */null);
    	MenuElement jc = (MenuElement) DOMNode.getAttr(node, "data-component");
    	if (jc == null)
    		return; 
        EventQueue.setCurrentEventAndMostRecentTime(e);        
        jc.processKeyEvent(e, getPathTo(jc, true), this);
    }

	private void checkNavigationKeys(KeyEvent e) {
		// TODO Auto-generated method stub
		
	}

	public void setCurrentPath(JComponent jc) {
		currentNode = null;
		setSelectedPath(getPathTo((MenuElement) jc, false));
	} 
	
	private MenuElement[] getPathTo(MenuElement jc, boolean addTarget) {
		MenuElement[] selection = new MenuElement[0];
		while (jc != null) {
			if (addTarget) {
				/**
				 * @j2sNative selection.push(jc);
				 */
			}
			jc = /** @j2sNative jc.parent || jc.invoker || */
					null;
			if (!(jc instanceof MenuElement))
				break;
			/**
			 * @j2sNative selection.push(jc);
			 */
		}
		/** @j2sNative selection.reverse() */
		return selection;
	}

}
