package swingjs.plaf;


import java.awt.Dimension;

import javax.swing.JComponent;

import swingjs.api.js.DOMNode;

public class JSLayeredPaneUI extends JSPanelUI {

	public JSLayeredPaneUI() {
		isContainer = isLayeredPane = true;
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
	  protected Dimension getHTMLSizePreferred(DOMNode obj, boolean addCSS) {
		return super.getHTMLSizePreferred(obj, addCSS);
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
