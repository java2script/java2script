package swingjs.plaf;

import java.awt.Component;
import java.awt.Dimension;

import javax.swing.JComponent;
import javax.swing.JMenu;
import swingjs.api.js.DOMNode;
//import javajs.J2SRequireImport;

//@J2SRequireImport(swingjs.jquery.JQueryUI.class)
public class JSMenuUI extends JSMenuItemUI {

	private JMenu jm;

	public JSMenuUI() {
		isMenu = true;
		setDoc();
	}

	@Override
	protected DOMNode updateDOMNode() {
		if (domNode == null) {
			isMenuItem = !((JMenu) jc).isTopLevelMenu();
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
		}
		setCssFont(domNode, c.getFont());
		DOMNode.setVisible(domNode, jc.isVisible());
		return domNode;
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
