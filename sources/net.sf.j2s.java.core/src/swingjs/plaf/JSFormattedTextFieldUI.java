package swingjs.plaf;

import swingjs.api.js.DOMNode;

/**
 * SWingJS implementation of stateful user interface for buttons. 
 * Modeled after javax.swing.plaf.basic.BasicButtonUI.java (commented out below).
 * 
 * @author Bob Hanson
 *
 */
public class JSFormattedTextFieldUI extends JSTextFieldUI {

	/**
	 * override JSComponentUI; check for currency and implied ( )
	 */
	@Override
	protected DOMNode setProp(DOMNode obj, String prop, String val) {
		if(prop == "value" && val != null && val.length() >= 2) {
			if (val.charAt(0) == 164)
				val = "$" + val.substring(1);
			else if (val.charAt(0) == '-' && val.charAt(1) == 164)
				val = "($" + val.substring(2) + ")";
		}
		return DOMNode.setAttr(obj, prop, val);
	}

}
