package swingjs.plaf;


import java.awt.Dimension;
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
	protected void installUIImpl() {
		menuItem = (JMenuItem) c;
		super.installUIImpl();
    LookAndFeel.installColorsAndFont(jc, "MenuItem.background", "MenuItem.foreground",
        "MenuItem.font");		
	}

}
