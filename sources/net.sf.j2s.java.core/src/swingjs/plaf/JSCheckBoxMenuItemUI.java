package swingjs.plaf;

import javax.swing.JComponent;
import javax.swing.JMenuItem;

import swingjs.api.js.DOMNode;

public class JSCheckBoxMenuItemUI extends JSCheckBoxUI {

	public JSCheckBoxMenuItemUI() {
		super();
		isMenuItem = true;
		actionItemOffset = -7;
	} 
	
	@Override
	protected String getPropertyPrefix() {
		return "CheckBoxMenuItem.";
	}

	@Override
	public void installUI(JComponent jc) {
		menuItem = (JMenuItem) jc;
		super.installUI(jc);
	}
	
}
