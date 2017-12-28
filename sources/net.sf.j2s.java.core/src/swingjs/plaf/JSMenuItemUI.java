package swingjs.plaf;


import java.awt.Dimension;

import javax.swing.JComponent;
import javax.swing.JMenuItem;
import javax.swing.LookAndFeel;
import swingjs.api.js.DOMNode;

public class JSMenuItemUI extends JSButtonUI {
	
	/**
	 * Just a simple menu item -- not radio or checkbox
	 */
	public JSMenuItemUI() {
		super();
		isMenuItem = true;
		allowPaintedBackground = false;
	}

	@Override
	protected DOMNode updateDOMNode() {
		if (domNode == null) {
			domNode = createItem("_item", null);
		}
		// add code here for adjustments when changes in bounds or other properties occur.
		DOMNode.setVisible(domNode, jc.isVisible());
		return domNode;
	}

	@Override
	protected int getContainerHeight() {
		return height = 25;
	}

	@Override
	protected Dimension getCSSAdjustment(boolean addingCSS) {
		return new Dimension(5, 0);
	}
	
	@Override
	public void installUI(JComponent jc) {
		menuItem = (JMenuItem) jc;
		super.installUI(jc);
    LookAndFeel.installColorsAndFont(jc, "MenuItem.background", "MenuItem.foreground",
        "MenuItem.font");		
	}

}
