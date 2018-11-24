package swingjs.plaf;

import java.awt.Component;
import java.awt.Dimension;
import java.awt.event.ContainerEvent;
import java.awt.event.ContainerListener;
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
//				DOMNode labelNode = newDOMObject("label", id);
				domNode = createItem("_item", null);
//
//				// TODO implement icons for menuBar?
//				setCssFont(DOMNode.setAttr(labelNode, "innerHTML", menuItem.getText()),
//						c.getFont());
//				setDataComponent(labelNode);
			}
			DOMNode.addJqueryHandledEvent(this, domNode, "mouseenter mouseleave");			
		}
		setCssFont(domNode, c.getFont()); 
		DOMNode.setVisible(domNode, jc.isVisible());
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
					if(!jm.getParent().getUIClassID().equals("MenuBarUI"))
						stopPopupTimer();
					jm.setSelected(true);
					return true;
				}
				if (type.equals("mouseleave")) {
					jm.setSelected(false);
					System.out.println("menubar leaving");
					if(jm.getParent().getUIClassID().equals("MenuBarUI"))
						startPopupTimer();
					return true;
				}
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
						dispose();
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
