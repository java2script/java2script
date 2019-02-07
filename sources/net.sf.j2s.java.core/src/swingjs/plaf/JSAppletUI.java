package swingjs.plaf;

import javax.swing.JComponent;
import javax.swing.LookAndFeel;

import swingjs.api.js.DOMNode;

public class JSAppletUI extends JSLightweightUI {

	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			containerNode = domNode = newDOMObject("div", id);
		}
		return updateDOMNodeCUI();
	}
	
	@Override
	public void installUI(JComponent jc) {
    LookAndFeel.installColorsAndFont(jc,
        null, null, "Panel.font");
	}

	
}
