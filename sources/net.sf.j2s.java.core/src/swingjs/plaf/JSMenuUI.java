package swingjs.plaf;

import java.awt.Component;
import java.awt.Dimension;
import java.beans.PropertyChangeEvent;

import javax.swing.JComponent;
import javax.swing.JMenu;

import swingjs.api.js.DOMNode;
public class JSMenuUI extends JSMenuItemUI {
	
	private JMenu jm;

	public JSMenuUI() {
		isMenu = true;
		setDoc();
	}

	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			isMenuItem = !jm.isTopLevelMenu();
			if (isMenuItem) {
				containerNode = domNode = createItem("_menu", null);
			} else {
				domNode = createItem("_item", null);
			}
			DOMNode.addJqueryHandledEvent(this, domNode, "mouseenter mouseleave");			
		}
		setCssFont(domNode, c.getFont()); 
		DOMNode.setVisible(domNode, jc.isVisible());
		return domNode;
	}

	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		// we use == here because this will be JavaScript
		if (target == domNode && eventType == -1) {
			String type = (/** @j2sNative jQueryEvent.type || */ "");
			if (type.equals("mouseenter")) {
				if (!jm.getParent().getUIClassID().equals("MenuBarUI"))
					stopPopupMenuTimer();
				jm.setSelected(true);
				return true;
			}
			if (type.equals("mouseleave")) {
				jm.setSelected(false);
				if (jm.getParent().getUIClassID().equals("MenuBarUI"))
					startPopupMenuTimer();
				return true;
			}
		}
		return super.handleJSEvent(target, eventType, jQueryEvent);
	}

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		if (jc.isVisible()) {
			if (prop == "ancestor") {
				if (jc.getParent() != null) {
					if (domNode != null && isMenuItem == jm.isTopLevelMenu()) {
						reInit();
						outerNode = null;
						updateDOMNode();
						return;
					}
				}
			}
		}
		super.propertyChange(e);
	}
	
	@Override
	public void installUI(JComponent jc) {
		jm = (JMenu) jc;
		super.installUI(jc);
	}

	@Override
	public void uninstallUI(JComponent jc) {
		super.uninstallUI(jc);
	}

	
	@Override
	protected Component[] getChildren() {
		return (isMenuItem ? new Component[] { jm.getPopupMenu() } : jm
				.getComponents());
	}

	@Override
	public Dimension getMaximumSize() {
		return getPreferredSize();
	}

}
