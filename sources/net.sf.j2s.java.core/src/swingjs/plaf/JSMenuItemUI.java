package swingjs.plaf;


import java.awt.Dimension;
import java.beans.PropertyChangeEvent;

import javax.swing.JComponent;
import javax.swing.JMenuItem;
import javax.swing.event.MenuKeyListener;

import swingjs.api.js.DOMNode;

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
			bindJQueryEvents(domNode, "mouseenter", SOME_MOUSE_EVENT);
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
	protected Dimension getCSSAdjustment(boolean addingCSS, boolean mutable) {
		return mutable || !isMenu || containerNode != null ? new Dimension(isMenu && containerNode == null ? 0 : 5, 0) : ZERO_SIZE;
	}
	
	@Override
	public void installUI(JComponent jc) {
		menuItem = (JMenuItem) jc;
		super.installUI(jc);
	}	

	
	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		if (!jc.isVisible() && prop != "ancestor" && jc.getParent() == null)
			return;
		switch (prop) {
		case "focusPainted":
		case "focusable":
		case "borderPainted":
		case "opaque":
			return;
		}
		super.propertyChange(e);
		if (prop == "ancestor") {
			if (jc.getParent() != null) {
				jc.getParent().秘getUI().setHTMLElement();
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

	@Override
	public boolean isFocusable() {
		return false;
	}


}
