package swingjs.plaf;

import java.awt.Component;
import java.awt.Dimension;
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
				domNode = newDOMObject("label", id);
				// TODO implement icons for menuBar?
				setCssFont(DOMNode.setAttr(domNode, "innerHTML", menuItem.getText()),
						c.getFont());
				setDataComponent(domNode);
			}
		}
		setCssFont(domNode, c.getFont());
		return domNode;
	}

	@Override
	protected void installUIImpl() {
		jm = (JMenu) jc;
		super.installUIImpl();
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
