package swingjs.plaf;


import javax.swing.JComponent;

import swingjs.api.js.DOMNode;

public class JSLayeredPaneUI extends JSLightweightUI {

	public JSLayeredPaneUI() {
		isContainer = true;
	}
	
	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			containerNode = domNode = newDOMObject("div", id);
		}
		// add code here for adjustments when changes in bounds or other properties occur.
    return domNode;
	}

	@Override
	public void installUI(JComponent jc) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void uninstallUI(JComponent jc) {
		// TODO Auto-generated method stub
		
	}


}
