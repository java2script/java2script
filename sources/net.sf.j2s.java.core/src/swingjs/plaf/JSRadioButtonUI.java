package swingjs.plaf;

import java.awt.Dimension;

import javax.swing.AbstractButton;
import javax.swing.ImageIcon;
import javax.swing.JToggleButton;

import swingjs.api.js.DOMNode;

public class JSRadioButtonUI extends JSButtonUI {

//	includes CheckboxUI and menu-item equivalents


	@Override
	public DOMNode updateDOMNode() {
		return updateButton("radio");
	}

	@Override
	protected String getPropertyPrefix() {
		return "RadioButton.";
	}

	protected void createButton(JToggleButton b, String myType) {
		buttonNode = newDOMObject("label", id + "btn");
		if (b.getIcon() == null) {
			iconNode = actionNode = newDOMObject("input", id, "type", myType, "name", id);
			DOMNode.setAttr(buttonNode, "htmlFor", id);
		} else {
			if (actionNode != null)
				DOMNode.remove(actionNode);
		}
		enableNodes = new DOMNode[] { actionNode, buttonNode };
		setDataComponent(actionNode);
		createButton();
	}
	
	protected void createButton() {
		textNode = newDOMObject("span", id + "_txt");
		setDataComponent(buttonNode);
		setDataComponent(iconNode); // needed for mac safari/chrome
		setDataComponent(textNode); // needed for mac safari/chrome
		setEnabled(c.isEnabled());
		if (isMenuItem) {
			domNode = createItem("_item", buttonNode);
		} else {
			domNode = newDOMObject("div", id + "_dom");
//			centeringNode = newDOMObject("div", id + "_ctr");
//			domNode.appendChild(centeringNode);
//			centeringNode.appendChild(buttonNode);
			domNode.appendChild(buttonNode);
			centeringNode = buttonNode;
			centeringNode.appendChild(textNode);
			centeringNode.appendChild(iconNode);
		}
	}

	/**
	 * 
	 * 
	 * @param myType "radio" or "checkbox"
	 * 
	 * @return
	 */
	protected DOMNode updateButton(String myType) {
		JToggleButton b = (JToggleButton) jc;
		boolean doAll = false;
		if (domNode == null) {
			doAll = true;
			createButton(b, myType);
		}
		setupButton(b, doAll);
		return domNode;
	}
	
	protected void setupButton(JToggleButton b, boolean doAll) {
		if (b.isSelected())
			DOMNode.setAttr(actionNode, "checked", "true");
		else
			DOMNode.setAttr(actionNode, "checked",  null);
		
		setCssFont(textNode, c.getFont());
		setIconAndText("radio", (ImageIcon) null/* button.getIcon() */, button.getIconTextGap(), button.getText());

		// Get the dimensions of the radio button by itself.

		// We have to remove any position:absolute because if that
		// is there, it messes up the width and height calculation.
		DOMNode.setStyles(centeringNode, "position", null);
		DOMNode.setStyles(iconNode, "position", null);
		DOMNode.setStyles(textNode, "position", null);
		Dimension dim = null;
		dim = setHTMLSize1(wrap("div", "", iconNode, textNode), false, false);
		setHorizontalButtonAlignments(b, b.getHorizontalTextPosition(), b.getHorizontalAlignment());
		vCenter(iconNode, (actionNode == null ? -15 : -75));
		vCenter(textNode, -50);
		if (!isMenuItem) { // only problem here is menu width 
		}
		buttonNode.appendChild(textNode);
		buttonNode.appendChild(iconNode);
		if (doAll && !isMenuItem)
			DOMNode.setPositionAbsolute(domNode);
		if (dim != null) {
			DOMNode.setSize(buttonNode, dim.width, dim.height);
			DOMNode.setSize(centeringNode, dim.width, dim.height);
		}
	}

	@Override
	protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		// "absolute" is required for positioning of button, but must not be there
		// for setting the size.
		DOMNode.setStyles(buttonNode, "position", null, "width", null, "height", null);
		DOMNode.setStyles(iconNode, "position", null, "width", null, "height", null);
		DOMNode.setStyles(textNode, "position", null, "width", null, "height", null);
		Dimension d;
		if (isMenuItem) {
			d = new Dimension(20, 20);
		} else {
			d = setHTMLSize1(obj, addCSS, false);
			DOMNode.setPositionAbsolute(textNode);
			DOMNode.setPositionAbsolute(buttonNode);
//			if (centeringNode != null) problems with vertical offset
//				DOMNode.setPositionAbsolute(centeringNode);
			DOMNode.setStyles(buttonNode, "width", d.width + "px", "height", d.height + "px");
		}
		return d;
	}

	public void handleDOMEvent(Object e) {
		// not implemented -- see ButtonListener
		((AbstractButton) c).doClick(0);
	}

	@Override
	protected int getDefaultIconTextGap() {
		return 4;
	}

}
