package swingjs.plaf;

import java.awt.Dimension;

import javax.swing.ImageIcon;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.LookAndFeel;

import swingjs.api.js.DOMNode;

/**
 * A JavaScript equivalent for a label.
 * 
 *   Also used for ToolTip
 * 
 * @author Bob Hanson
 *
 */
public class JSLabelUI extends JSLightweightUI {

	protected ImageIcon icon;
	protected int gap;
	protected String text;

	public JSLabelUI() {
		setDoc();
	}

	@Override
	public DOMNode updateDOMNode() {
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
		getIconAndText(); 
		setIconAndText("label", icon, gap, text);
		DOMNode.setStyles(domNode, "position", "absolute", "width", c.getWidth()
				+ "px", "height", c.getHeight() + "px");
		if (actualHeight > 0)
			DOMNode.setStyles(centeringNode, "position", "absolute", "height",
					actualHeight + "px");
		if (actualWidth > 0)
			DOMNode.setStyles(centeringNode, "position", "absolute", "width",
					actualWidth + "px");
		setCssFont(centeringNode, c.getFont());
		if (label != null) {
			// not for JToolTip
			setHorizontalButtonAlignments(label, label.getHorizontalTextPosition(),
						label.getHorizontalAlignment());
		}
		if (jc.isEnabled())
			setBackground(jc.isOpaque() ? jc.getBackground() : null);
		return updateDOMNodeCUI();
	}

	protected void getIconAndText() {	
		// overridden in JSToolTipUI
		label = (JLabel) jc;
		icon = (ImageIcon) label.getIcon();
		gap = label.getIconTextGap();
		text = label.getText();
	}


//	/**
//	 * adding in outer styles for text alignment of a label
//	 */
//	@Override
//	protected DOMNode setHTMLElement() {
//		setHTMLElementCUI();
//		return outerNode;
//	}
	
	@Override
	public void installUI(JComponent jc) {
		label = (JLabel) jc;
    LookAndFeel.installColorsAndFont(jc, "Label.background", "Label.foreground",
        "Label.font");
	}

	@Override
	public void uninstallUI(JComponent jc) {
		// TODO Auto-generated method stub
		
	}

	@Override
	Dimension getMaximumSize(JComponent jc) {
		return getPreferredSize();
	}

}
