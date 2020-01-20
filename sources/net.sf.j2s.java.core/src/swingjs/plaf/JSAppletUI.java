package swingjs.plaf;

import java.beans.PropertyChangeEvent;

import javax.swing.JApplet;
import javax.swing.JComponent;
import javax.swing.JMenuBar;
import javax.swing.LookAndFeel;

import swingjs.api.js.DOMNode;
import swingjs.api.js.HTML5Canvas;

public class JSAppletUI extends JSLightweightUI {

	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			containerNode = domNode = newDOMObject("div", id);
			addClass(domNode, "swingjs-window");
		}
		return updateDOMNodeCUI();
	}
	
	void checkMenuBar(int h) {
		JMenuBar mb = ((JApplet) c).getJMenuBar();
		HTML5Canvas canvas = c.getAppContext().getThreadGroup().秘html5Applet._getHtml5Canvas();
		DOMNode.setStyles(canvas, "top", h + "px", "position", "absolute");
	}

	@Override
	public void installUI(JComponent jc) {
    LookAndFeel.installColorsAndFont(jc,
        null, null, "Panel.font");
	}

	@Override
	public void setVisible(boolean b) {
		super.setVisible(b);
// No - frames accept focus when made visible, but applets do not, 
		// since they are visible from the beginning.
//		if (b) {
//			setComponentFocus();
//		}
//		System.out.println("JSAppletUI visible " + b);
	}
	
	@Override
	public void propertyChange(PropertyChangeEvent e) {
		Object value = e.getNewValue();
		String prop = e.getPropertyName();
		System.out.println("JSAPpletUI prop val " + prop + " " + value);
	}

//	@Override
//	public boolean isFocusable() {
//		return true;
//	}

}
