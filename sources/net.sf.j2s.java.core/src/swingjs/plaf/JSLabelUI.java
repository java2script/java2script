package swingjs.plaf;

import java.awt.Dimension;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Rectangle;

import javax.swing.AbstractButton;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JMenuBar;
import javax.swing.JPopupMenu;
import javax.swing.LookAndFeel;

import swingjs.api.js.DOMNode;

/**
 * A JavaScript equivalent for a label.
 * 
 * Also used for ToolTip
 * 
 * @author Bob Hanson
 *
 */
public class JSLabelUI extends JSLightweightUI {
	protected int gap;
	protected String text;

	public JSLabelUI() {
		setDoc();
		isLabel = true;
	}

	@Override
	public DOMNode updateDOMNode() {
//		if (jc.getTopLevelAncestor() == null)
//			return domNode;
		isMenuItem = jc.getParent() instanceof JPopupMenu;
		isMenuBarLabel = jc.getParent() instanceof JMenuBar;
		if (domNode == null) {
			if (isMenuItem) {
				createItemNode("_item", icon, 4, label.getText(), null);
				domNode = itemNode;
				// TODO -- still not positioned correctly
			} else {
				enableNode = domNode = newDOMObject("label", id);
				textNode = iconNode = null;
				addCentering(domNode);
			}
		}
		getIconAndText(); // could be ToolTip
		setIconAndText("label", icon, gap, text);
		if (isMenuItem) {
		} else {
			DOMNode.setStyles(domNode, "position", "absolute", "width", c.getWidth() + "px", "height",
					c.getHeight() + "px");
		}
		updateCenteringNode();
		if (allowTextAlignment) {
			// not for JToolTip
			setAlignments((AbstractButton) (JComponent) label, false);
		}
		if (jc.isEnabled())
			setBackgroundImpl(jc.isOpaque() ? getBackground() : null);
		return updateDOMNodeCUI();
	}

	protected void getIconAndText() {
		// overridden in JSToolTipUI
		label = (JLabel) jc;
		icon = label.getIcon();
		gap = label.getIconTextGap();
		text = label.getText();
	}

	@Override
	public void installUI(JComponent jc) {
		label = (JLabel) jc;
		LookAndFeel.installColorsAndFont(jc, "Label.background", "Label.foreground", "Label.font");
	}

	@Override
	public void uninstallUI(JComponent jc) {
		// TODO Auto-generated method stub

	}

	@Override
	public Dimension getMaximumSize(JComponent jc) {
		return getPreferredSize(jc);
	}

	@Override
	public void paint(Graphics g, JComponent c) {
		if (jc.秘paintsSelfEntirely())
			DOMNode.setStyle(centeringNode, "visibility", "visible");
		super.paint(g, c);
		// TODO: implement this for buttons?
		if (isHTML)
			DOMNode.setStyles(textNode, "overflow", null, "white-space", null);
		else
			DOMNode.setStyles(textNode, "overflow", "hidden", "white-space", "nowrap");
		if (icon != null && imageNode != null && !isVideoIcon) { // Tree node?
			// The graphics object is translated to the label,
			// not the image, at this point. In order to get
			// a clientRectangle, the node must be visible, even for just
			// an instant.
			DOMNode.setStyle(imageNode, "visibility", null);
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
				DOMNode.transferTo(domNode, parent);
			DOMNode.setStyle(imageNode, "visibility", "hidden");
			icon.paintIcon(c, g, (int) (r.x - r0.x), (int) (r.y - r0.y));
		}
	}

	@Override
	public Dimension getPreferredSize(JComponent jc) {
		c = this.jc = jc; // renderer issue 
		updateDOMNode();
		return (isAWT ? getMinimumSizePeer(jc, label)
				: label == null ? super.getPreferredSize(jc)
						: JSGraphicsUtils.getPreferredButtonSize(((AbstractButton) jc),
								((AbstractButton) jc).getIconTextGap()));
	}

	final static int[] htAdj = { 0, 7, 6, 7, 6, 6, 5, 5, 6, 7, 7, 7, 6, 6, 5, 5, 5, 5, 6, 6, 4, 4, 4, 4, 3, 3, 5, 5,
			3, 3, 4, 3, 2, 3, 3, 3, 2, 2, 2, 2, 0, };

	static Dimension getMinimumSizePeer(JComponent jc, Object label) {
		Font f = jc.getFont();
		String s = null;
		if (f == null)
			return new Dimension(14, 8);
		FontMetrics fm = f.getFontMetrics();
		s = ((JLabel) label).getText();
		if (s == null)
			s = "";
		int sz = f.getSize();
		int adj = (sz <= 40 ? htAdj[sz] : 0);
		return new Dimension(fm.stringWidth(s) + 14, fm.getHeight() + adj);
	}

}
