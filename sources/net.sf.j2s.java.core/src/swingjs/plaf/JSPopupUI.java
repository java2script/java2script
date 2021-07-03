package swingjs.plaf;

import java.awt.Color;
import java.awt.Component;
import java.awt.Insets;

import javax.swing.JComponent;

import swingjs.api.js.DOMNode;

public class JSPopupUI extends JSWindowUI {

	public JSPopupUI() {
		super();
		isPopup = true;
	}

	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			hasBeenVisible = false;
		}
		super.updateDOMNode();
		return domNode;
	}
	
	private Boolean isToolTip;
	
	boolean hasBeenVisible;

	private Component toolTip;

	@Override
	public void setVisible(boolean b) {
		super.setVisible(b);
		if (b && !hasBeenVisible && isToolTip()) {
			Color col = toolTip.getBackground();
			if (col != null) {
				jc.setOpaque(true);
				allowPaintedBackground = false;
				jc.setBackground(col);
				String cc = toCSSString(col);
				DOMNode.setStyle(outerNode, "background", cc);
			}
			$("body > .swingjs-tooltip").remove();
			$(outerNode).addClass("swingjs-tooltip");
			jc.setOpaque(true);
			setZ(Integer.MAX_VALUE);
		}
		hasBeenVisible = true;
	}

	@Override
	public void toFront() {
		if (isToolTip()) {
			setZ(Integer.MAX_VALUE);
		} else {
			super.toFront();
		}
	}
	
	private Boolean isToolTip() {
		if (isToolTip == null) {
			Component c = ((JComponent) window).getRootPane().getContentPane().getComponent(0);
			isToolTip = (c instanceof javax.swing.JToolTip);
			if (isToolTip)
				toolTip = c;
		}
		return isToolTip;
	}

	@Override
	public Insets getInsets() {
		return (isToolTip() ? new Insets(2,2,2,2) : zeroInsets);
	}

}
