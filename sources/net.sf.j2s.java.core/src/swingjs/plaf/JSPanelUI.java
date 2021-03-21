package swingjs.plaf;


import java.awt.Dimension;
import java.awt.peer.ContainerPeer;

import javax.swing.JComponent;
import javax.swing.JRootPane;
import javax.swing.LookAndFeel;

import swingjs.api.js.DOMNode;
import swingjs.api.js.JSFunction;

public class JSPanelUI extends JSLightweightUI implements ContainerPeer {

	int frameZ = 10000;
	public JSPanelUI() {
		isContainer = isPanel = true;
		setDoc();
	}

	@Override
	public DOMNode updateDOMNode() {
		JRootPane root = jc.getRootPane();
		boolean isGlassPane = (root != null && root.getGlassPane() == c);
		boolean isNew = (domNode == null);
		if (isNew) {
			containerNode = domNode = newDOMObject("div", id);
			DOMNode.setStyle(domNode,  "outline", "none");
			if (isGlassPane) {
				DOMNode.setVisible(domNode,  false);
			}
		}
		if (isGlassPane) {
			addLocalCanvas(false);
			DOMNode.setZ(domNode, 1);
		}
		isContentPane = (root != null && jc == root.getContentPane());
		if (isContentPane)
			checkAllowDivOverflow();
		return updateDOMNodeCUI();
	}

	@Override
  protected Dimension getHTMLSizePreferred(DOMNode obj, boolean addCSS) {
		// SwingJS for now: just designated container width/height 
		return new Dimension(c.getWidth(), c.getHeight());
	}
	

	@Override
	public void installUI(JComponent jc) {
    LookAndFeel.installColorsAndFont(jc,
        "Panel.background",
        "Panel.foreground",
        "Panel.font");
	}

	@Override
	public void uninstallUI(JComponent jc) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Dimension getPreferredSize(JComponent jc) {
		return null;
  }
	
}
