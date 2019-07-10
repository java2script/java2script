package swingjs.plaf;

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
		return super.updateDOMNode();
	}
	
	private Boolean isToolTip;
	
	boolean hasBeenVisible;

	@Override
	public void setVisible(boolean b) {
		super.setVisible(b);
		if (b && !hasBeenVisible && isToolTip()) {
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
	
	private boolean isToolTip() {
		if (isToolTip == null)
			isToolTip = (((JComponent) window).getRootPane().getContentPane()
				.getComponent(0) instanceof javax.swing.JToolTip);
		return isToolTip;
	}

	@Override
	public Insets getInsets() {
		return (isToolTip() ? new Insets(5, 5, 5, 5) : zeroInsets);
	}

}
