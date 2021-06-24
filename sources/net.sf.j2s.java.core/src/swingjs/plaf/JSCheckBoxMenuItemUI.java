package swingjs.plaf;

import javax.swing.JComponent;
import javax.swing.JMenuItem;

public class JSCheckBoxMenuItemUI extends JSCheckBoxUI {

	public JSCheckBoxMenuItemUI() {
		super();
		isMenuItem = true;
		actionItemOffset = -7;
	} 
	
	@Override
	protected String getPropertyPrefix() {
		return "CheckBoxMenuItem";
	}

	@Override
	public void installUI(JComponent jc) {
		menuItem = (JMenuItem) jc;
		super.installUI(jc);
	}

	@Override
	public boolean isFocusable() {
		return false;
	}


}
