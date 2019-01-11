package swingjs;

import java.util.List;

import javax.swing.JComponent;
import javax.swing.MenuElement;
import javax.swing.MenuSelectionManager;

import swingjs.api.js.DOMNode;
import swingjs.api.js.JQuery;
import swingjs.plaf.JSComponentUI;

public class JSMenuManager extends MenuSelectionManager {
	
	private static DOMNode currentNode; 
	
	public static void setCurrentNode(Object node) {
		// set upon hover in j2sMenu.js
		currentNode = (DOMNode) node;
		defaultManager().clearSelectedPath();
	}
		
	public static void addSwingJSAttributes(DOMNode itemNode, String type, JSComponentUI ui) {
		JSUtil.jQuery.$(itemNode).addClass("swingjs" + type);
		DOMNode.setAttr(itemNode, "data-menu_ui", ui);
	}
	
    @Override
	public MenuElement[] getSelectedPath() {
       if (currentNode != null)
    	   setCurrentPath(null);
       return super.getSelectedPath();
    }


	public void setCurrentPath(DOMNode node) {
		if (node == null)
			node = currentNode;
		currentNode = null;
		MenuElement[] selection = new MenuElement[0];
		JComponent jc = /** @j2sNative node["data-ui"].jc || */null;
		/** @j2sNative 
		 *  while (jc != null) {
		 *   jc = jc.parent || jc.invoker;
		 *   if (jc) {
		 *     selection.push(jc);
		 *     if (jc.uiClassID == "MenuBarUI")
		 *     	 jc = null;
		 *   }
		 *  }
		 * selection.reverse();
		 * 
		 * 
		 *
		 * 		xxPath = selection;
		 */	
		setSelectedPath(selection);
	}



}
