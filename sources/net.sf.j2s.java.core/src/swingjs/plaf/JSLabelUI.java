package swingjs.plaf;

import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Rectangle;

import javax.swing.AbstractButton;
import javax.swing.ImageIcon;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.LookAndFeel;
import javax.swing.SwingConstants;

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
	protected int gap;
	protected String text;

	/**
	 * label for JLabel; null for JSTooltipUI subclass of JSLabelUI 
	 */
	private boolean isImageIcon;


	public JSLabelUI() {
		setDoc();
		isLabel = true;
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
		getIconAndText(); // could be ToolTip
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
		if (allowTextAlignment) {
			// not for JToolTip
			setHorizontalButtonAlignments((AbstractButton) (JComponent) label, label.getHorizontalTextPosition(),
						label.getHorizontalAlignment());
			vCenter(textNode, -50, 0);
		}
		if (jc.isEnabled())
			setBackground(jc.isOpaque() ? jc.getBackground() : null);
		return updateDOMNodeCUI();
	}

	protected void getIconAndText() {	
		// overridden in JSToolTipUI
		label = (JLabel) jc;
		
		
		icon = label.getIcon();
		isImageIcon = (icon != null && icon instanceof ImageIcon);
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

	@Override
	public void paint(Graphics g, JComponent c) {
		super.paint(g, c);
		// TODO: implement this for buttons?
		DOMNode.setStyles(textNode, "overflow", "hidden", "white-space", "nowrap");
		if (icon != null) {
			// The graphics object is translated to the label, 
			// not the image, at this point. In order to get
			// a clientRectangle, the node must be visible, even for just
			// an instant.
			DOMNode.setStyles(imageNode, "visibility", null);
			Rectangle r = imageNode.getBoundingClientRect();
			DOMNode parent = null;
			boolean isHidden = (r.width == 0);
			if (isHidden) {
				parent = DOMNode.getParent(domNode);
				$("body").append(domNode);
				r = imageNode.getBoundingClientRect();
			}
			Rectangle r0 = domNode.getBoundingClientRect();
			if (isHidden)
				DOMNode.transferTo(domNode,  parent);				
			DOMNode.setStyles(imageNode, "visibility", "hidden");
			icon.paintIcon(c, g, (int) (r.x - r0.x), (int) (r.y - r0.y));
		}
	}

	@Override
	Dimension getPreferredSize(JComponent jc) {
		return (label == null ? super.getPreferredSize(jc) : JSGraphicsUtils.getPreferredButtonSize(((AbstractButton) jc), ((AbstractButton) jc).getIconTextGap()));
	}

}
