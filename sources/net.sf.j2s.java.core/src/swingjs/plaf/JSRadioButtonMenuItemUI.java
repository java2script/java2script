package swingjs.plaf;

import javax.swing.JMenuItem;

public class JSRadioButtonMenuItemUI extends JSRadioButtonUI {
	
	public JSRadioButtonMenuItemUI() {
		super();
		isMenuItem = true;
		allowPaintedBackground = false;
	}
	
	@Override
	protected String getPropertyPrefix() {
		return "RadioButtonMenuItem.";
	}
	
	@Override
	protected void installUIImpl() {
		menuItem = (JMenuItem) c;
		super.installUIImpl();
	}
}
