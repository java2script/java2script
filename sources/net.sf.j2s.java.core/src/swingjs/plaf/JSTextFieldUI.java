package swingjs.plaf;

import java.awt.Dimension;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;

import javax.swing.Action;
import javax.swing.InputMap;
import javax.swing.JComponent;
import javax.swing.JTextField;
import javax.swing.KeyStroke;

import swingjs.JSToolkit;
import swingjs.api.js.DOMNode;

/**
 * A minimal implementation of a test field ui/peer
 * 
 * @author Bob Hanson
 * 
 */
@SuppressWarnings({"unused"})
public class JSTextFieldUI extends JSTextUI {

	protected String inputType = "text";
	protected JTextField textField;

	@Override
	public DOMNode updateDOMNode() {
		textField = (JTextField) editor;
		if (domNode == null) {
			allowPaintedBackground = false;
			// no textNode here, because in input does not have that.
			focusNode = enableNode = valueNode = domNode = DOMNode.setStyles(
					newDOMObject("input", id, "size", "1", "type", inputType, "spellcheck", FALSE),
					"lineHeight", "0.8", "box-sizing", "border-box");
			bindJSKeyEvents(focusNode, true);
		}
		textListener.checkDocument();
		setCssFont(setJSText(focusNode, "value", setCurrentText()), getFont());
		// setTextAlignment();
		return super.updateDOMNode();
	}

	@Override
	protected Dimension getCSSAdjustment(boolean addingCSS, boolean mutable) {
		return mutable || !addingCSS ? new Dimension(0, addingCSS ? 0 : -2) : ZERO_SIZE;
	}

	@Override
	public void installUI(JComponent jc) {
		textField = (JTextField) jc;
		super.installUI(jc);
	}

	@Override
	boolean handleEnter() {
		Action a = getActionMap().get(JTextField.notifyAction);
		if (a != null) {
			JSToolkit.setIsDispatchThread(true);
			a.actionPerformed(new ActionEvent(c, ActionEvent.ACTION_PERFORMED,
					JTextField.notifyAction, System.currentTimeMillis(), 0));
			JSToolkit.setIsDispatchThread(false);
		}
		return true;
	}

	/**
	 * ENTER :: JtextField.notifyAction
	 */
	private InputMap jsmap;

	/**
	 * Get the InputMap to use for the UI.
	 */
	@Override
	InputMap getInputMap() {
		InputMap map = super.getInputMap();
		if (!isAWT) {
			if (jsmap == null) {
				// we need ENTER to fire the action listener for JTextField upon PRESSED, just
				// after the KeyEvent is processed
				jsmap = new InputMap();
				jsmap.put(KeyStroke.getKeyStroke(KeyEvent.VK_ENTER, 0, false), JTextField.notifyAction);
			}
			map.getParent().setParent(jsmap);
		}
		return map;
	}

	@Override
	protected String getPropertyPrefix() {
		return "TextField";
	}

	@Override
	public Dimension getPreferredSize(JComponent c) {
		return (isAWT ? getMinimumSize(c) : super.getPreferredSize(c));
    }

	@Override
	protected String getSizingWidth() {
		String text = editor.getText();
		return (text == null ? null : text.length() + "ch");
	}


    

	@Override
	public Dimension getMinimumSize(JComponent jc) {
		return JSLabelUI.getMinimumSizePeer(jc, editor, false);
	}

	@Override
	public Dimension getMaximumSize(JComponent jc) {
		Dimension d = super.getMaximumSize(jc);
		if (!isAWT)
			d.width = Integer.MAX_VALUE;
		return d; 
	}

}
