package swingjs.plaf;

import java.awt.Dimension;
import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.LookAndFeel;
import swingjs.api.js.DOMNode;

/**
 * A JavaScript equivalent for a label.  
 * 
 * @author Bob Hanson
 *
 */
public class JSLabelUI extends JSLightweightUI {
	private JLabel label;

	public JSLabelUI() {
		setDoc();
	}

	@Override
	protected DOMNode updateDOMNode() {
		if (domNode == null) {
			domNode = newDOMObject("label", id);
			textNode = newDOMObject("span", id + "_text");
			iconNode = newDOMObject("span", id + "_icon");
			// labels are different from buttons, because we allow them to have
			// different centerings - left, top, middle, bottom, etc.
			centeringNode = newDOMObject("span", id + "_cntr");
			centeringNode.appendChild(iconNode);
			centeringNode.appendChild(textNode);
			domNode.appendChild(centeringNode);
		}
		setIconAndText("label", (ImageIcon) label.getIcon(),
				label.getIconTextGap(), label.getText());
		DOMNode.setStyles(domNode, "position", "absolute", "width", c.getWidth()
				+ "px", "height", c.getHeight() + "px");
		if (actualHeight > 0)
			DOMNode.setStyles(centeringNode, "position", "absolute", "height",
					actualHeight + "px");
		if (actualWidth > 0)
			DOMNode.setStyles(centeringNode, "position", "absolute", "width",
					actualWidth + "px");
		setCssFont(centeringNode, c.getFont());
		if (jc.isOpaque() && jc.isEnabled())
			setBackground(jc.getBackground());
		return domNode;

	}

	/**
	 * adding in outer styles for text alignment of a label
	 */
	@Override
	protected DOMNode setHTMLElement() {
		setHTMLElementCUI();
		return outerNode;
	}
	
	@Override
	protected void installUIImpl() {
		label = (JLabel) c;
    LookAndFeel.installColorsAndFont(jc, "Label.background", "Label.foreground",
        "Label.font");
	}

	@Override
	protected void uninstallUIImpl() {
		// TODO Auto-generated method stub
		
	}

}
