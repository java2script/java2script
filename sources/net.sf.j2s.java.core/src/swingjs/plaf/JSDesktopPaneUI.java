package swingjs.plaf;

import swingjs.JSUtil;
import swingjs.api.js.DOMNode;

public class JSDesktopPaneUI extends JSPanelUI {

	@Override
	public DOMNode updateDOMNode() {
	    boolean isNew = (domNode == null);
		super.updateDOMNode();
		if (isNew) {
			$(domNode).addClass("swingjs-desktop");
		}		
		return domNode;
	}

}
