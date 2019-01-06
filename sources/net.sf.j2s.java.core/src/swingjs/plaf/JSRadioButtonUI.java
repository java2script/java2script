package swingjs.plaf;

import javax.swing.AbstractButton;
import javax.swing.ImageIcon;
import javax.swing.JToggleButton;

import swingjs.api.js.DOMNode;

public class JSRadioButtonUI extends JSButtonUI {

//	includes CheckboxUI and menu-item equivalents


	@Override
	public DOMNode updateDOMNode() {
		updateButton("radio");
		return updateDOMNodeCUI();
	}

	@Override
	protected String getPropertyPrefix() {
		return "RadioButton.";
	}

	protected void createButton(JToggleButton b, String myType) {
		buttonNode = newDOMObject("label", id + "btn");
		iconNode = null;
		if (b.getIcon() == null) {
			iconNode = actionNode = newDOMObject("input", id, "type", myType, "name", id);
			DOMNode.setAttr(buttonNode, "htmlFor", id);
		} else {
			// don't we need an icon node here??
			if (actionNode != null)
				DOMNode.dispose(actionNode);
		}
		enableNodes = new DOMNode[] { actionNode, buttonNode, null };
		setDataComponent(actionNode);
		createButton();
	}
	
	@Override
	protected void createButton() {
		setDataComponent(buttonNode);
		setEnabled(c.isEnabled());
		if (isMenuItem) {
			domNode = createItem("_item", buttonNode);
			bindJQueryEvents(domNode, "mouseenter", -1);			
		} else {
			domNode = newDOMObject("div", id + "_dom");
			domNode.appendChild(buttonNode);
		}
		addCentering(buttonNode);
		setDataComponent(iconNode); // needed for mac safari/chrome
		setDataComponent(textNode); // needed for mac safari/chrome
	}
	
	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		// we use == here because this will be JavaScript
		checkStopPopupMenuTimer(target, eventType, jQueryEvent);
		return super.handleJSEvent(target, eventType, jQueryEvent);
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
		// actionNode, iconNode, textNode, centeringNode, buttonNode
				
		if (b.isSelected())
			DOMNode.setAttr(actionNode, "checked", "true");
		else
			DOMNode.setAttr(actionNode, "checked",  null);
		
		setCssFont(textNode, c.getFont());
		// TODO: not allowing radio/checkbox icons (custom buttons)
		setIconAndText("radio", (ImageIcon) null/* button.getIcon() */, button.getIconTextGap(), button.getText());
		setAlignments(b);

		if (doAll && !isMenuItem)
			DOMNode.setPositionAbsolute(domNode);
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
