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

	static DOMNode createCellNode(JSComponentUI holder, int row, int col, int x, int y, int w, int h) {

		String rcID = getRowColumnID(holder, row, col);
		DOMNode td = DOMNode.createElement("div", rcID);
		DOMNode.setStyles(td, "overflow", "hidden", "background", "transparent");
		holder.$(td).addClass("swing-td");
		DOMNode.setAttrs(td, "data-table-ui", holder, "data-row", "" + row, "data-col", "" + col);
		DOMNode.setStyles(td, "width", w + "px", "height", h + "px", "left", x + "px", "top", y + "px");
		DOMNode.setStyles(td, "position", "absolute", "overflow", "hidden", "background", "transparent");
		return td;
	}

	static DOMNode findCellNode(JSComponentUI holder, int row, int col) {
		String rcID = getRowColumnID(holder, row, col);
		return holder.$("#" + rcID).get(0);
	}

    static void updateCellNode(DOMNode td, JSComponent renderer, int width, int height) {
		JSComponentUI ui;
		if (renderer != null && !(ui = (JSComponentUI) renderer.getUI()).isNull) {
			if (width > 0) {
				// for table header, to center
				renderer.setSize(width, height);
			} else {
				width  = DOMNode.getWidth(td);
				height = DOMNode.getHeight(td);
			}
			ui.outerNode = null;
			ui.reInit();
			ui.updateDOMNode();
			DOMNode.setStyles(ui.domNode, "width", "100%", "height", "100%", "background", "transparent");
			if (renderer instanceof AbstractButton) {
				if (renderer instanceof BooleanRenderer) {
					DOMNode.setStyles(ui.centeringNode,  "width", "100%", "height", "100%");
					DOMNode.setStyles(ui.buttonNode, "width", "100%", "height", "100%");
					DOMNode.setStyles(ui.actionNode, "position", "absolute", "width", "14px", "height", "14px", "top", (height/2) + "px");
					int textAlign = ((BooleanRenderer) renderer).getHorizontalAlignment();
					switch (textAlign) {
					case SwingConstants.RIGHT:
					case SwingConstants.TRAILING:
						DOMNode.setStyles(ui.actionNode, "left", width + "px", "transform", "translate(-18.5px,-10px)");
						break;
					case SwingConstants.LEFT:
					case SwingConstants.LEADING:
						DOMNode.setStyles(ui.actionNode, "left", "0px", "top", "transform", "translate(-2.5px,-10px)");
						break;
					case SwingConstants.CENTER:
						DOMNode.setStyles(ui.actionNode, "left",(width/2)+"px","transform", "translate(-10.5px,-10px)");
						break;				
					}
				}
			}
			//DOMNode.setAttr(ui.domNode, "data-source", renderer); // necessary for Firefox but not Chrome!??
			//DOMNode.setAttr(ui.domNode, "data-ui", null); // necessary for Firefox but not Chrome!??
			//DOMNode.setAttr(ui.domNode, "data-component", null); // necessary for Firefox but not Chrome!??
			ui.$(td).empty();
			td.appendChild(ui.domNode);
			ui.domNode = ui.outerNode = null;
		}
    }


}
