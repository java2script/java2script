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

	protected void setupViewNode() {
		allowPaintedBackground = false;
		focusNode = enableNode = textNode = domNode;
		DOMNode.setStyles(domNode, "resize", "none", "padding", "0px","scrollbar-width", "thin"); // otherwise it overflows
		DOMNode.setAttr(domNode, "tabindex", "0");
		bindJSKeyEvents(domNode, true);
		addJQueryFocusCallbacks();
	}

	/**
	 * Enable only the keys that are appropriate for this component, editable or not
	 * editable.
	 * 
	 * @param jQueryEvent
	 * @return null to continue processing, CONSUMED(false) to stop propagation, UNCONSUME(true) to ignore
	 */
	@SuppressWarnings("unused")
	protected Boolean checkAllowKey(Object jQueryEvent) {
		boolean b = UNHANDLED;
		boolean checkEditable = false;
		// note: all options are set in JSComponentUI.bindJSKeyEvents
		switch (/** @j2sNative jQueryEvent.type || */
		"") {
		case "focusout":
		case "dragover":
			// ignore
			break;
		case "drop":
			// accept if editable
			checkEditable = true;
			break;
		case "keydown":
		case "keypress":
		case "keyup":
			switch (/** @j2sNative jQueryEvent.keyCode || */
			0) {
			case KeyEvent.VK_UP:
			case KeyEvent.VK_DOWN:
			case KeyEvent.VK_LEFT:
			case KeyEvent.VK_RIGHT:
			case KeyEvent.VK_PAGE_UP:
			case KeyEvent.VK_PAGE_DOWN:
				// accept only if neither ALT nor CTRL is down
				if (/** @j2sNative !jQueryEvent.altKey && !jQueryEvent.ctrlKey || */
				false)
					return null;
				b = CONSUMED;
				break;
			default:
				// accept all others only if editable
				checkEditable = true;
				break;
			}
			break;
		default:
			return null;
		}
		if (checkEditable) {
			if (editor.isEditable())
				return null;
			b = CONSUMED;
		}
		System.out.println("checkallow " + (/** @j2sNative jQueryEvent.type || */
		"") + " " + b);
		return Boolean.valueOf(b);
	}

//	@SuppressWarnings("unused")
//	void setJavaTextDelayed() {
//		// this timeout is critical and did not work with invokeLater
//		JSTextUI u = this;
//		/** 
//		 * @j2sNative
//		 * 
//		 *  setTimeout(function(){u.checkEditorTextValue$I(-1);},50);
//		 */
//	}
//
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
//		if (!mustWrap)
			DOMNode.setStyles(domNode, "overflow-x", overflows[sp.getHorizontalScrollBarPolicy() % 10]);
		//no - this turns entry of <CR> to <space> , "white-space", "nowrap");
		DOMNode.setStyles(domNode, "overflow-y", overflows[sp.getVerticalScrollBarPolicy() % 10]);
	}
	

}
