package swingjs.plaf;

import java.awt.JSComponent;

import javax.swing.AbstractButton;
import javax.swing.SwingConstants;
import javax.swing.JTable.BooleanRenderer;
import javax.swing.table.TableCellRenderer;

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
    	return holder.id + "_tab" + (row >= 0 ? "_row" + row : "") + "_col" + col;
    }

	static DOMNode getCellOuterNode(JSComponentUI tableOrHeader, int row, int col) {
		String rcID = getRowColumnID(tableOrHeader, row, col);
		DOMNode td = findCellNode(null, rcID, row, col);
		if (td == null) {
			td = DOMNode.createElement("div", rcID);
			DOMNode.setStyles(td, "overflow", "hidden", "background", "transparent");
			tableOrHeader.$(td).addClass("swing-td");
			DOMNode.setAttrs(td, "data-table-ui", tableOrHeader, "data-row", "" + row, "data-col", "" + col);
			DOMNode.setStyles(td, "position", "absolute", "overflow", "hidden", "background", "transparent");
		}
		return td;
	}

	static DOMNode findCellNode(JSComponentUI tableOrHolder, String rcID, int row, int col) {
		if (tableOrHolder != null)
			rcID = getRowColumnID(tableOrHolder, row, col);
		return DOMNode.getElement(rcID);
	}

	static void updateCellNode(DOMNode td, JSComponent c, int width, int height, boolean forceNew) {
		JSComponentUI ui;
		if (c == null || (ui = (JSComponentUI) c.getUI()).isNull)
			return;
		if (width > 0) {
			// for table header, to center
			c.setSize(width, height);
		} else {
			width = DOMNode.getWidth(td);
			height = DOMNode.getHeight(td);
		}
		ui.setRenderer(c, width, height);
		if (forceNew) {
			ui.outerNode = null;
			ui.reInit();
			ui.updateDOMNode();
			ui.$(td).empty();
			td.appendChild(ui.domNode);
		} else {
			ui.domNode = DOMNode.firstChild(ui.outerNode);
			ui.updateDOMNode();
		}
		ui.domNode = ui.outerNode = null;
	}


}
