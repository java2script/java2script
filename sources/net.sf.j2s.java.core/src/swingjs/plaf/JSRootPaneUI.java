package swingjs.plaf;

import java.awt.Dimension;
import javax.swing.JComponent;

import swingjs.api.js.DOMNode;

public class JSRootPaneUI extends JSLightweightUI {

	Resizer resizer;
	
	void setResizer(Resizer resizer) {
		this.resizer = resizer;
	}

	public JSRootPaneUI() {
		isRootPane = isContainer = true;
		setDoc();
	}

	@Override
	public DOMNode updateDOMNode() {
		if (domNode == null) {
			domNode = newDOMObject("div", id);
			addFocusHandler();
		}
		checkAllowDivOverflow();
		return domNode;
	}

	@Override
	public void installUI(JComponent jc) {
	}


	@Override
	public void uninstallUI(JComponent jc) {
	}

	@Override
	public Dimension getPreferredSize(JComponent jc) {
  	return null;
  }

	@Override
	protected void setInnerComponentBounds(int width, int height) {
		Resizer resizer = jc.getFrameViewer().getResizer();
		if (resizer != null)
			resizer.setPosition(0, 0);
	}
	
}
