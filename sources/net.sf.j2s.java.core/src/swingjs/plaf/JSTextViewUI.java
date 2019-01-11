package swingjs.plaf;

import java.awt.Container;

import javax.swing.JScrollPane;
import javax.swing.JViewport;

import com.sun.glass.events.KeyEvent;

import swingjs.api.js.DOMNode;

/**
 * Abstract class for JTextPane, JEditorPane, and JTextArea
 * 
 * @author hansonr
 *
 */
public abstract class JSTextViewUI extends JSTextUI {

	/**
	 * set true for JEditorPane
	 */
	protected boolean mustWrap = false;

	public JSTextViewUI() {
		// make sure standard HTML5 event is passed even if the Java event is consumed.
		setDoPropagate();
	}
	
	protected void setupViewNode() {
		allowPaintedBackground = false;
		focusNode = enableNode = textNode = domNode;
		DOMNode.setStyles(domNode, "resize", "none", "padding", "0px","scrollbar-width", "thin"); // otherwise it overflows
		bindJSKeyEvents(domNode, true);
	}

	//                                               AS_NEEDED  NEVER    ALWAYS
	private final String[] overflows = new String[] { "auto", "hidden", "scroll" };
	
	@Override
	protected void setOverflow() {
		Container parent = jc.getParent();
		if (!(parent instanceof JViewport) || !((parent = parent.getParent()) instanceof JScrollPane)) {
			super.setOverflow();
			return;
		}
		JScrollPane sp = (JScrollPane) parent;
		DOMNode.setStyles(domNode, "overflow", null);
			DOMNode.setStyles(domNode, "overflow-x", overflows[sp.getHorizontalScrollBarPolicy() % 10]);
		//no - this turns entry of <CR> to <space> , "white-space", "nowrap");
		DOMNode.setStyles(domNode, "overflow-y", overflows[sp.getVerticalScrollBarPolicy() % 10]);
	}
	

}
