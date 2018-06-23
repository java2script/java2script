package swingjs.plaf;

import swingjs.api.js.DOMNode;

public class JSAppletUI extends JSLightweightUI {

	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			containerNode = domNode = newDOMObject("div", id);
		}
		return domNode;
	}
	
}
