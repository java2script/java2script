package swingjs.plaf;


import java.awt.Dimension;
import java.beans.PropertyChangeEvent;

import javax.swing.JComponent;
import javax.swing.JMenuItem;
import javax.swing.event.MenuKeyListener;

import swingjs.api.js.DOMNode;
import swingjs.api.js.JSSwingMenu;

public class JSMenuItemUI extends JSButtonUI {
	
    protected MenuKeyListener menuKeyListener;

    /**
	 * Just a simple menu item -- not radio or checkbox
	 */
	public JSMenuItemUI() {
		super();
		isMenuItem = true;
		allowPaintedBackground = false;
	}

	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			domNode = createItem("_item", null);
			bindJQueryEvents(domNode, "mouseenter", -1);
		}
		// add code here for adjustments when changes in bounds or other properties occur.
		DOMNode.setVisible(domNode, jc.isVisible());
		setupButton();
		return domNode;
	}
	
	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		// we use == here because this will be JavaScript
		checkStopPopupMenuTimer(target, eventType, jQueryEvent);
		return super.handleJSEvent(target, eventType, jQueryEvent);
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
	}	

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		super.propertyChange(e);
		String prop = e.getPropertyName();
		if (jc.isVisible()) {
			if (prop == "ancestor") {
				if (jc.getParent() != null) {
 					((JSComponentUI) jc.getParent().getUI()).setHTMLElement();
				}
			}
		}
	}

	@Override
	protected String getPropertyPrefix() {
		return "MenuItem";
	}
	
	
	public void processJ2SMenuCmd(Object[] data) {
		JSPopupMenuUI.processJ2SMenuCmd(data);
	}

}
