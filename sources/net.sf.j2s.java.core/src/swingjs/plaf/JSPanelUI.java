package swingjs.plaf;


import java.awt.Dimension;
import java.awt.peer.ContainerPeer;

import javax.swing.JComponent;
import javax.swing.JRootPane;
import javax.swing.LookAndFeel;

import swingjs.api.js.DOMNode;

public class JSPanelUI extends JSLightweightUI implements ContainerPeer {

	int frameZ = 10000;
	public JSPanelUI() {
		isContainer = isPanel = true;
		setDoc();
	}
	
	@Override
	public DOMNode updateDOMNode() {
		JRootPane root = jc.getRootPane();
		if (domNode == null) {
			containerNode = domNode = newDOMObject("div", id);
			DOMNode.setStyles(domNode,  "outline", "none");
			if (root != null && root.getGlassPane() == c)
				DOMNode.setVisible(domNode,  false);
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
	
	@Override
	public Dimension getMinimumSize(JComponent jc) {
		return null;
//		// in our capacity as peer here, not UI.
//		LayoutManager man = jc.getLayout();
//		Dimension d = (man == null ? super.getMinimumSize(jc) : jc.getLayout().minimumLayoutSize(jc));
//		return d;
	}


}
