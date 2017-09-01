package swingjs.plaf;


import swingjs.api.js.DOMNode;

public class JSLayeredPaneUI extends JSLightweightUI {

	public JSLayeredPaneUI() {
		isContainer = true;
	}
	
	@Override
	protected DOMNode updateDOMNode() {
		if (domNode == null) {
			domNode = newDOMObject("div", id);
		}
		// add code here for adjustments when changes in bounds or other properties occur.
    return domNode;
	}

	@Override
	protected void installUIImpl() {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void uninstallUIImpl() {
		// TODO Auto-generated method stub
		
	}


}
