package swingjs.plaf;

import java.awt.Dimension;
import java.awt.Point;
import java.awt.Rectangle;
import java.beans.PropertyChangeEvent;

import javax.swing.JComponent;
import javax.swing.JTextArea;
import javax.swing.event.CaretEvent;
import javax.swing.text.Element;
import javax.swing.text.PlainView;
import javax.swing.text.View;
import javax.swing.text.WrappedPlainView;

import swingjs.api.js.DOMNode;

/**
 * Note that java.awt.TextArea is a JScrollPane, NOT a JTextArea.
 * 
 * @author Bob Hanson
 *
 */
public class JSTextAreaUI extends JSTextUI {

	public JSTextAreaUI() {
		isTextView = true;
		// make sure standard HTML5 event is passed even if the Java event is consumed.
		setDoPropagate();
	}
	@Override
	public DOMNode updateDOMNode() {

		if (domNode == null) {
			valueNode = domNode = newDOMObject("textarea", id, "spellcheck", FALSE, "autocomplete", "off");
			allowPaintedBackground = false;
			focusNode = enableNode = textNode = domNode;
			DOMNode.setStyles(domNode, "box-sizing", "border-box", "resize", "none", "border", "none", "margin", "0px", "padding", "1px","scrollbar-width", "thin"); 
			// otherwise it overflows
			bindJSKeyEvents(focusNode, true);
		}
		JTextArea area = (JTextArea) jc;
// Q: Why did I have this 240,240,240?
//		if (isAWT && !area.isBackgroundSet())
//			area.setBackground(Color.white);
		DOMNode.setStyles(domNode, "white-space", null, "overflow-wrap", null);
		if (area.getLineWrap()) {
			DOMNode.setStyle(domNode, "overflow-wrap", area.getWrapStyleWord() ? null : "anywhere");
		} else {
			DOMNode.setStyle(domNode, "white-space", "pre");
		}
		textListener.checkDocument();
		setCssFont(DOMNode.setAttr(domNode, "value", setCurrentText()), c.getFont());
		updateJSCursor("areaupdate");
		return super.updateDOMNode();
	}


//	@Override
//	protected void setBorder(String prefix) {
//		 Border b = editor.getBorder();
//		 if ((b == null) || (b instanceof UIResource)) {
//		 editor.setBorder(UIManager.getBorder(prefix + ".border"));
//		 }		
//	}
	
	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		switch(prop) {
		case "ancestor":
			setJ2sMouseHandler();
			break;
		case "JSToEnd":
			toEnd();
			break;
		} 
		super.propertyChange(e);
	}

	private void toEnd() {
		DOMNode node = domNode;
		if (node == null)
			return;
		/**
		 * @j2sNative node.scrollTop = node.scrollHeight;
		 */		
	}

	@Override
	protected void updateRootView() {
		useRootView = true;
        rootView.setView(create(editor.getDocument().getDefaultRootElement()));// does not take into account nested documents like HTML (I guess)		
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

//	@Override
//	protected Dimension getCSSAdjustment(boolean addingCSS) {
//		return (
//			//	addingCSS ? new Dimension(-5, -12) : 
//			new Dimension(0, 0)); 
//		// total hack -12 is to see full vertical scrollbar (Boltzmann)
//	}

	@Override
	protected String getPropertyPrefix() {
		return "TextArea";
	}

	@Override
	protected DOMNode setHTMLElement() {
		// handled by JScrollPane
		return DOMNode.setStyles(setHTMLElementCUI(), 
//				"overflow", "hidden",
				"position", "absolute");
	}

    /**
	 * Creates the view for an element. Returns a WrappedPlainView or PlainView.
	 *
	 * @param elem the element
	 * @return the view
	 */
	@Override
	public View create(Element elem) {
		JTextArea area = (JTextArea) c;
		View v;
		if (area.getLineWrap()) {
			v = new WrappedPlainView(elem, area.getWrapStyleWord());
		} else {
			v = new PlainView(elem);
		}
		return v;
	}

	@Override
	public boolean isFocusable() {
		return false;
	}


	@Override
	public Dimension getMaximumSize(JComponent jc) {
		return ANY_SIZE;
	}
	
	@Override
	protected Boolean handleTab(Object jqEvent, String type) {
		if (type != "keydown")
			return CONSUMED;
		String val = getJSTextValue();
		Point pt = new Point();
		getJSMarkAndDot(pt, 0);
		int x = Math.min(pt.x,  pt.y);
		int y = Math.max(pt.x,  pt.y);
		val = val.substring(0, x) + "\t" + val.substring(y);
		editor.setTextFromUI(val);
		pt.x = pt.y = ++x;		
		setJSMarkAndDot(x, x, false);
		checkNewEditorTextValue();
		setJavaMarkAndDot(pt);
		//System.out.println("JSTextAreaUI " + editor.getCaretPosition() + " "  + pt);
		return CONSUMED;
	}


	@Override
	public void caretUpdatedByProgram(CaretEvent e) {
		if (!jc.isVisible() || !isAWT || domNode == null) // for now, AWT only
			return;
		@SuppressWarnings("unused")
		int pt = e.getDot();
		// Unfortunately, not MacOS, Edge, or MS Explorer
		/**
		 * @j2sNative this.domNode.scrollTo && this.domNode.scrollTo(0, pt);
		 */
	}
	public void scrollToVisible(Rectangle aRect) {
		DOMNode.setAttrInt(domNode, "scrollLeft", aRect.x);
		DOMNode.setAttrInt(domNode, "scrollTop", aRect.y);
	}

}
