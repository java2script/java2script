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
		adjustCanvasForMenuBar();
		return updateDOMNodeCUI();
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
		// Don't pass these on
//		Object value = e.getNewValue();
//		String prop = e.getPropertyName();
		//System.out.println("JSAPpletUI prop val " + prop + " " + value);
	}

	/**
	 * The JMenuBar on an applet pushes its canvas down typically about 20 pixels.
	 */
	public void adjustCanvasForMenuBar() {
		JMenuBar mb = ((JApplet) c).getJMenuBar();
		int h = (mb == null || !mb.isVisible() ? 0 : ((JSMenuBarUI) mb.getUI()).height);
		DOMNode.setStyles(getCanvas(), "top", h + "px", "position", "absolute");
	}

	public HTML5Canvas getCanvas() {
		Object canvas = this.c.getAppContext().getThreadGroup().秘html5Applet._getHtml5Canvas();
		focusNode = (DOMNode) canvas;
		return (HTML5Canvas) canvas;
	}


//	@Override
//	public boolean isFocusable() {
//		return true;
//	}

}
