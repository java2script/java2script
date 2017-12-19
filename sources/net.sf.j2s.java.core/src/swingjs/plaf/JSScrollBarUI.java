package swingjs.plaf;

import java.awt.Dimension;
import java.beans.PropertyChangeEvent;
import javax.swing.event.ChangeEvent;
import swingjs.api.js.DOMNode;

public class JSScrollBarUI extends JSSliderUI {
	// not a perfect solution
	// TODO -- tie in setHorizontal/setVertical

	JSScrollPaneUI myScrollPaneUI;
	
	private boolean isInvisible;

	public JSScrollBarUI() {
		super();
		isScrollBar = true;
	}

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		super.propertyChange(e);
		if (debugging) 
					System.out.println(id + " propertyChange " + dumpEvent(e));
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		super.stateChanged(e);
		if (debugging) 
					System.out.println(id + " stateChange " + dumpEvent(e));
	}


	@Override
	public Dimension getPreferredSize() {
		// thin because we are implementing jquery slider here
		int wh = (myScrollPaneUI == null ? 15 : myScrollPaneUI.scrollBarUIDisabled ? 0 : 15);
		// just used for width or height, but not both. I think.... 
		return new Dimension(wh, wh);
	}
	
	@Override
	public void setVisible(boolean b) {
		isInvisible = (myScrollPaneUI != null && myScrollPaneUI.scrollBarUIDisabled);
		b &= !isInvisible;
		DOMNode.setStyles(getOuterNode(), "display", b ? "block" : "none");
		DOMNode.setStyles(jqSlider, "display", b ? "block" : "none");
	}
	

}



