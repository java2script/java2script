package swingjs.plaf;


import java.awt.Dimension;

import javax.swing.JComponent;
import javax.swing.JRootPane;
import javax.swing.LookAndFeel;
import swingjs.api.js.DOMNode;

public class JSTabbedPaneUI extends JSPanelUI {


	int frameZ = 10000;
	public JSTabbedPaneUI() {
		isContainer = true;
		setDoc();
		
		
System.out.println("JSTabbedPaneUI SURRAGATE -- NOT IMPLEMENTED YET! ");		
		
	}
	
	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			JRootPane root = jc.getRootPane();
			isContentPane = (root != null && jc == root.getContentPane());
			domNode = newDOMObject("div", id);
			if (root != null && root.getGlassPane() == c)
				DOMNode.setVisible(domNode,  false);
		}
    return domNode;
	}

	@Override
  protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
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
	public Dimension getPreferredSize() {
  	return null;
  }


}
