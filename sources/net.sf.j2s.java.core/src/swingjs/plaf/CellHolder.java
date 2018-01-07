package swingjs.plaf;

import java.awt.JSComponent;

import swingjs.api.js.DOMNode;

/**
 * 
 * JTable and JTableHeader
 * 
 * @author Bob Hanson
 *
 */
public abstract class CellHolder extends JSLightweightUI {
	
    static String getRowColumnID(JSComponentUI holder, int row, int col) {
    	return holder.id + "_tab" + (row >= 0 ? "row" + row : "") + "_col" + col;
    }

	static DOMNode createCellNode(JSComponentUI holder, int row, int col) {
		String rcID = getRowColumnID(holder, row, col);
		DOMNode td = DOMNode.createElement("div", rcID);
		holder.$(td).addClass("swing-td");
		DOMNode.setAttrs(td, "data-table-ui", holder, "data-row", "" + row, "data-col", "" + col);
		return td;
	}

	static DOMNode findCellNode(JSComponentUI holder, int row, int col) {
		String rcID = getRowColumnID(holder, row, col);
		return holder.$("#" + rcID).get(0);
	}

    static void updateCellNode(DOMNode td, JSComponent renderer, int width, int height) {
		JSComponentUI ui;
		if (renderer != null && !(ui = (JSComponentUI) renderer.getUI()).isNull) {
			if (width > 0) // for table header, to center
				renderer.setSize(width, height);
				
			ui.outerNode = null;
			ui.reInit();
			ui.updateDOMNode();
			DOMNode.setAttr(ui.domNode, "data-source", renderer); // necessary for Firefox but not Chrome!??
			DOMNode.setAttr(ui.domNode, "data-ui", null); // necessary for Firefox but not Chrome!??
			DOMNode.setAttr(ui.domNode, "data-component", null); // necessary for Firefox but not Chrome!??
			DOMNode.removeAllChildren(td);
			td.appendChild(ui.domNode);
			DOMNode.setStyles(ui.domNode, "width", "unset");
			DOMNode.setStyles(ui.domNode, "height", "unset");
			ui.domNode = ui.outerNode = null;
		}
    }


}
