package swingjs.plaf;


import java.awt.Container; 
import java.awt.Dimension;
import java.beans.PropertyChangeEvent;

import javax.swing.JComponent;
import javax.swing.JMenu;
import javax.swing.JMenuItem;
import javax.swing.LookAndFeel;
import javax.swing.plaf.ComponentUI;

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
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			domNode = createItem("_item", null);
			DOMNode.addJqueryHandledEvent(this, domNode, "mouseenter");
		}
		// add code here for adjustments when changes in bounds or other properties occur.
		DOMNode.setVisible(domNode, jc.isVisible());
		setupButton();
		return domNode;
	}

	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		String type = "";
		// we use == here because this will be JavaScript
		if (target == domNode) {
			/**
			 * @j2sNative
			 * 
			 * 			type = jQueryEvent.type;
			 * 
			 */
			{
			}
			if (eventType == -1) {
				if (type.equals("mouseenter")) {
						stopPopupTimer();
			 }
			}
		}
		return super.handleJSEvent(target, eventType, jQueryEvent);
	}

	protected void startPopupTimer() {
		JSPopupMenuUI ui = (JSPopupMenuUI) ((JMenu) jc).getPopupMenu().getUI();
		((JSPopupMenuUI) ui).startTimer();
	}

	protected void stopPopupTimer() {
		JSComponentUI ui = (JSComponentUI) ((JComponent) jc.getParent()).getUI();
			((JSPopupMenuUI) ui).stopTimer();
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

}
