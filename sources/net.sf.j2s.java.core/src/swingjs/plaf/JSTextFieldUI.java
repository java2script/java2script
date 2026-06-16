package swingjs.plaf;

import java.awt.Dimension;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;

import javax.swing.Action;
import javax.swing.BoundedRangeModel;
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
	private boolean isAdjustingScroll;

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

	public void updateDOMFromModel() {
		addScrollListeners();
		BoundedRangeModel model = textField.getHorizontalVisibility();
		int value = model.getValue();
		int extent = Math.round(DOMNode.getAttrInt(domNode, "clientWidth"));
		int max = Math.round(DOMNode.getAttrInt(domNode, "scrollWidth"));
		DOMNode.setAttrInt(domNode, "scrollLeft", value);
	}
	
	public int lastScrollLeft = Integer.MAX_VALUE;

	public void notifyDomNodeScrolled() {
		updateVisibilityModel(textField.getHorizontalVisibility());
	}
	
	public void addScrollListeners() {
		Object me = this;
		DOMNode node = domNode;
		if (lastScrollLeft != Integer.MAX_VALUE)
			return;
		lastScrollLeft = 0;
		/** @j2sNative
			var listener = function() {
	        	if (node.scrollLeft !== me.lastScrollLeft) {
        			me.lastScrollLeft = node.scrollLeft;
        			me.notifyDomNodeScrolled$();
    			}
    		};
    		node.addEventListener('input', listener);
    		node.addEventListener('keydown', listener);
    		node.addEventListener('keyup', listener);
    		node.addEventListener('wheel', listener);
    		node.addEventListener('mousemove', listener);
    		node.addEventListener('mouseup', listener);
		    // selectionchange needs to be on document for some browsers
		 */
		{}	
	}
	
	/**
	 * direct assignment of values
	 * @param model
	 * @return
	 */
	public BoundedRangeModel updateVisibilityModelPrivate(BoundedRangeModel model) {
		int extent = Math.round(DOMNode.getAttrInt(domNode, "clientWidth"));
		int max = Math.round(DOMNode.getAttrInt(domNode, "scrollWidth"));
		if (max == 0)
			return model;
		/**
		 * @j2sNative
		 * 
		 * model.extent = extent;
		 * model.max = max;
		 */
		return model;
	}
	
	public BoundedRangeModel updateVisibilityModel(BoundedRangeModel model) {
		if (isAdjustingScroll)
			return model;
		// How much text is hidden to the left		  
		int value = Math.round(DOMNode.getAttrInt(domNode, "scrollLeft"));
	    // Width of the text that is actually visible
		int extent = Math.round(DOMNode.getAttrInt(domNode, "clientWidth"));
	    // Total width of the text content
		int max = Math.round(DOMNode.getAttrInt(domNode, "scrollWidth"));
//	    value: inputElement.scrollLeft,
//	    extent: inputElement.clientWidth,
//	    maximum: inputElement.scrollWidth,
		isAdjustingScroll = true;
		model.setRangeProperties(value, extent, 0, max, false);
		isAdjustingScroll = false;
		return model;
	}	
	

}
