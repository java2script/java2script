package swingjs.plaf;

import java.awt.Component;
import java.awt.Dimension;

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
			isMenuItem = !((JMenu) jc).isTopLevelMenu();
			if (isMenuItem) {
				containerNode = domNode = createItem("_menu", null);
				DOMNode.addJqueryHandledEvent(this, domNode, "mouseenter mouseleave");			
			} else {
//				DOMNode labelNode = newDOMObject("label", id);
				domNode = createItem("_item", null);
//
//				// TODO implement icons for menuBar?
//				setCssFont(DOMNode.setAttr(labelNode, "innerHTML", menuItem.getText()),
//						c.getFont());
//				setDataComponent(labelNode);
			}
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
					((JMenu) jc).setSelected(true);
					return true;
				}
				if (type.equals("mouseleave")) {
					((JMenu) jc).setSelected(false);
					return true;
				}
			}
		}
		return false;
	}


	@Override
	public void installUI(JComponent jc) {
		jm = (JMenu) jc;
		super.installUI(jc);
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
