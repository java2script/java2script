package swingjs.plaf;

import swingjs.api.js.DOMNode;

/**
 * CheckboxUI implementation for BasicCheckboxUI
 * 
 * 
 */
public class JSCheckBoxUI extends JSRadioButtonUI {

	@Override
	public DOMNode updateDOMNode() {
		updateButton("checkBox");
		return updateDOMNodeCUI();
	}

	@Override
	protected String getPropertyPrefix() {
		return "CheckBox.";
	}

}
