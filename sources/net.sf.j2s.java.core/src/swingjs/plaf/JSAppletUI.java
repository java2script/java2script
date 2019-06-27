package swingjs.plaf;

import java.beans.PropertyChangeEvent;

import javax.swing.JComponent;
import javax.swing.LookAndFeel;

import swingjs.api.js.DOMNode;

public class JSAppletUI extends JSLightweightUI {

	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			containerNode = domNode = newDOMObject("div", id);
			addClass(domNode, "swingjs-window");
		}
		return updateDOMNodeCUI();
	}
	
	@Override
	public void installUI(JComponent jc) {
    LookAndFeel.installColorsAndFont(jc,
        null, null, "Panel.font");
	}

	public void setVisible(boolean b) {
		super.setVisible(b);
		if (b) {
			setComponentFocus();
		}
//		System.out.println("JSAppletUI visible " + b);
	}
	
	@Override
	public void propertyChange(PropertyChangeEvent e) {
		Object value = e.getNewValue();
		String prop = e.getPropertyName();
//		System.out.println("JSAPpletUI prop val " + prop + " " + value);
	}

//	@Override
//	public boolean isFocusable() {
//		return true;
//	}

}
