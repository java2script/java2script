package swingjs.plaf;

import javax.swing.JComponent;
import javax.swing.JMenuItem;

import swingjs.api.js.DOMNode;

public class JSRadioButtonMenuItemUI extends JSRadioButtonUI {
	
	public JSRadioButtonMenuItemUI() {
		super();
		isMenuItem = true;
		allowPaintedBackground = false;
		actionItemOffset = -8;
	}
	
	@Override
	protected String getPropertyPrefix() {
		return "RadioButtonMenuItem.";
	}
	
	@Override
	public void installUI(JComponent jc) {
		menuItem = (JMenuItem) jc;
		super.installUI(jc);
	}
	
}
