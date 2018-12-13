package swingjs.plaf;

import java.awt.Dimension;
import java.awt.Graphics;

import javax.swing.Icon;
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

	protected Icon icon;
	protected int gap;
	protected String text;

	/**
	 * label for JLabel; null for JSTooltipUI subclass of JSLabelUI 
	 */
	private boolean isImageIcon;


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
		if (icon != null) {
			System.out.println("JSLabelUI " + currentIcon.getIconWidth() + " " + currentIcon.getIconHeight());
			debugDump(iconNode);
			int w = icon.getIconWidth();
			int h = icon.getIconHeight();
			//getJSInsets();
			int x=0, y=0;
//			switch (label.getVerticalAlignment()) {
//			default:
//			case SwingConstants.TOP:
//				y = 0 + insets.top;
//				break;
//			case SwingConstants.BOTTOM:
//				y = height - h - insets.bottom;
//				break;
//			case SwingConstants.CENTER:
//				y = (height - h - insets.bottom + insets.top) / 2;
//				break;
//			}
//			x = iconX;
//			y = iconY + insets.top + insets.top + insets.top/2;
//			switch (label.getHorizontalAlignment()) {
			icon.paintIcon(c, g, x, y);
		}
	}

}
