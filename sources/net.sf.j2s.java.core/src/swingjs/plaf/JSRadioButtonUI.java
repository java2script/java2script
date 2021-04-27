package swingjs.plaf;

import javax.swing.AbstractButton;
import javax.swing.Icon;
import javax.swing.ImageIcon;
import javax.swing.JComponent;
import javax.swing.JToggleButton;

import swingjs.api.js.DOMNode;

public class JSRadioButtonUI extends JSButtonUI {

//	includes CheckboxUI and menu-item equivalents


	@Override
	public DOMNode updateDOMNode() {
		JToggleButton b = (JToggleButton) jc;
		boolean doAll = false;
		if (domNode == null) {
			imagePersists = true;
			//System.out.println("JSRadioButton new dom node for " + id + " " + tableID);
			doAll = true;
			buttonNode = newDOMObject("label", id + "btn");
			if (isMenuItem) {
				domNode = createItem("_item", buttonNode);
				bindJQueryEvents(domNode, "mouseenter", SOME_MOUSE_EVENT);			
			} else {
				domNode = newDOMObject("div", id + "_dom");
				domNode.appendChild(buttonNode);
				focusNode = buttonNode;
			}
			iconNode = null;
			if (b.getIcon() == null || isMenuItem) {
				actionNode = newDOMObject("input", id + "_inp", "type", (getPropertyPrefix() == "RadioButton" ? "radio" : "checkbox"), "name", id);
				if (!isMenuItem)
					iconNode = actionNode;
				DOMNode.setAttr(buttonNode, "htmlFor", id);
			} else {
				// don't we need an icon node here??
				if (actionNode != null)
					DOMNode.dispose(actionNode);
				actionNode = null;
			}
			enableNodes = new DOMNode[] { actionNode, buttonNode, (iconNode == actionNode ? null : iconNode) };
			createButton();
			if (isMenuItem)
				setMenuItem();
		}
		setupButton(b, doAll);
		return updateDOMNodeCUI();
	}

	@Override
	protected void updateIcon() {
		if (!isMenuItem) {
			setTainted();
			if (domNode != null) {
				domNode = null;
				getDOMNode();
			}
		} else {
			super.updateIcon();
		}
	}

	@Override
	protected String getPropertyPrefix() {
		return "RadioButton";
	}

	@Override
	public void installUI(JComponent jc) {
		getPropertyPrefix();
		super.installUI(jc);	
	}

//	@Override
//	protected void createButton() {
//		addCentering(buttonNode);
//		setDataComponent(iconNode); // needed for mac safari/chrome
//		setDataComponent(textNode); // needed for mac safari/chrome
//		setDataComponent(buttonNode);
//		setEnabled(c.isEnabled());
//	}
//	
	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
		// we use == here because this will be JavaScript
		checkStopPopupMenuTimer(target, eventType, jQueryEvent);
		return super.handleJSEvent(target, eventType, jQueryEvent);
	}



	protected void setupButton(JToggleButton b, boolean doAll) {
		// actionNode, iconNode, textNode, centeringNode, buttonNode
		if (actionNode != null)
			DOMNode.setAttr(actionNode, "checked", b.isSelected() ? TRUE : NULL);
		setCssFont(textNode, c.getFont());
		// TODO: not allowing radio/checkbox icons (custom buttons)
		setIconAndText("radio", (ImageIcon) null/* button.getIcon() */, button.getIconTextGap(), button.getText());
		setAlignments(b, false);

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
