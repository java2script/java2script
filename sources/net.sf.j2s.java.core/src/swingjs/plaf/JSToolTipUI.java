package swingjs.plaf;

import java.awt.Dimension;
import java.awt.Insets;

import javax.swing.JComponent;
import javax.swing.JToolTip;
import javax.swing.LookAndFeel;

import swingjs.api.js.DOMNode;

public class JSToolTipUI extends JSLabelUI {

	// TODO: allow generic tool tip, not just text
	
	// note that, however, JSToolTip is not an AbstractButton.
	
	public JSToolTipUI() {
		super();
		allowTextAlignment = false;
	}
	
	protected JToolTip toolTip;

	@Override
	protected void getIconAndText() {		
		icon = null;
		iconNode = null; // not an Abstract Button
		gap = 0;
		text = toolTip.getTipText();		
	}

	@Override
	public Insets getInsets() {
		return new Insets(2,2,2,2);
	}

	@Override
	public void installUI(JComponent jc) {
		toolTip = (JToolTip) jc;		
		LookAndFeel.installColorsAndFont(jc, "ToolTip.background", "ToolTip.foreground",
        "Tooltip.font");
	}


	@Override
	public void uninstallUI(JComponent jc) {
		System.out.println("Uninstalling ToolTipUI");
		// should remove dom node?
		// TODO Auto-generated method stub
	}

}
