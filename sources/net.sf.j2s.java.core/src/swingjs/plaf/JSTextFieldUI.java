package swingjs.plaf;

//import java.awt.FontMetrics;
import java.awt.Event;
import java.awt.event.KeyEvent;

import java.awt.Dimension;
import java.awt.event.ActionEvent;
import javax.swing.Action;
import javax.swing.JTextField;
import swingjs.api.js.DOMNode;

/**
 * A minimal implementation of a test field ui/peer
 * 
 * @author Bob Hanson
 * 
 */
public class JSTextFieldUI extends JSTextUI {

	protected String inputType = "text";
	private JTextField textField;

	@Override
	protected DOMNode updateDOMNode() {
		if (domNode == null) {
			allowPaintedBackground = false;
			// no textNode here, because in input does not have that.
			focusNode = enableNode = valueNode = domNode = DOMNode.setStyles(
					newDOMObject("input", id, "type", inputType),
					"lineHeight", "0.8", "box-sizing", "border-box");
			DOMNode.setAttrs(focusNode, "ui", this);
			// not active; requires position:absolute; wrong for standard text box
			// vCenter(domNode, -10);
			setDataComponent(domNode);
			bindJSKeyEvents(domNode, false);
			addJQueryFocusCallbacks();
		}
		setPadding(editor.getMargin());
		textListener.checkDocument();
		setCssFont(setProp(domNode, "value", getComponentText()), c.getFont());
		// setTextAlignment();
		setEditable(editable);
		if (jc.isOpaque() && jc.isEnabled())
			setBackground(jc.getBackground());
		return domNode;
	}

	@Override
	protected Dimension getCSSAdjustment(boolean addingCSS) {
		return new Dimension(0, addingCSS ? 0 : -2);
	}

	@Override
	protected void installUIImpl() {
		textField = (JTextField) c;
		super.installUIImpl();
	}

	@Override
	boolean handleEnter(int eventType) {
		if (eventType == KeyEvent.KEY_PRESSED) {
			Action a = getActionMap().get(JTextField.notifyAction);
			if (a != null)
				a.actionPerformed(new ActionEvent(c, ActionEvent.ACTION_PERFORMED,
						JTextField.notifyAction, System.currentTimeMillis(), 0));
		}
		return true;
	}

	@Override
	protected String getPropertyPrefix() {
		return "TextField.";
	}

}
