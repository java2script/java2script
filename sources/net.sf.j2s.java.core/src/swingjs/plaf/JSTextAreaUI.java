package swingjs.plaf;

import java.awt.Dimension;
import java.awt.Insets;
import java.beans.PropertyChangeEvent;

import javax.swing.JTextArea;

import swingjs.api.js.DOMNode;

/**
 * Note that java.awt.TextArea is a JScrollPane, NOT a JTextArea.
 * 
 * @author Bob Hanson
 *
 */
public class JSTextAreaUI extends JSTextUI {

	protected DOMNode domBtn;

	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			allowPaintedBackground = false;
			domBtn = focusNode = enableNode = textNode = valueNode = domNode = newDOMObject("textarea", id);
			DOMNode.setStyles(domNode, "resize", "none");
			bindJSKeyEvents(domNode, true);
		}
		if (((JTextArea) jc).getLineWrap())
			domNode.removeAttribute("wrap");
		else
			DOMNode.setAttr(domNode, "wrap", "off");
		textListener.checkDocument();
		setCssFont(
				DOMNode.setAttr(domNode, "innerHTML", getComponentText()),
				c.getFont());
		if (!editable)
			DOMNode.setAttr(domNode, "readOnly", "true");		
		return updateDOMNodeCUI();
	}

	/**
	 * Get the real height and width of the text in a JavaScript textarea
	 * Used by JSScrollPaneUI
	 * 
	 * @return
	 */
	void getTextAreaTextSize(Dimension d) {
		int sh = 0;
		int sw = 0;
		/**
		 * @j2sNative 
		 * 
		 * var h = this.domNode.style.height; 
		 * this.domNode.style.height = null;
		 * sh = this.domNode.scrollHeight; 
		 * this.domNode.style.height = h;
		 * 		 
		 * var w = this.domNode.style.width; 
		 * this.domNode.style.width = null;
		 * sw = this.domNode.scrollWidth; 
		 * this.domNode.style.width = w;

		 * 
		 */
			{
			}
			
			d.width = sw;
			d.height = sh;
	}

	private Insets myInsets = new Insets(0, 0, 5, 5); 
	@Override
	public Insets getInsets() {
		return myInsets;
	}
	
	@Override
	protected Dimension getCSSAdjustment(boolean addingCSS) {
		return (addingCSS ? new Dimension(-5, -12) : new Dimension(0, 0)); 
		// total hack -12 is to see full vertical scrollbar (Boltzmann)
	}

	@Override
	protected String getPropertyPrefix() {
		return "TextArea.";
	}

	@Override
	protected DOMNode setHTMLElement() {
		// handled by JScrollPane
		return DOMNode.setStyles(setHTMLElementCUI(), 
				"overflow", "hidden",
				"position", "absolute");
	}


}
