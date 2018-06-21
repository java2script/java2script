package swingjs.plaf;

import javax.swing.JComponent;
import javax.swing.JToolTip;
import javax.swing.LookAndFeel;

public class JSToolTipUI extends JSLabelUI {

	// TODO: allow generic tool tip, not just text
	
	public JSToolTipUI() {
		super();
		allowTextAlignment = false;
	}
	
	protected JToolTip toolTip;

	@Override
	protected void getIconAndText() {		
		icon = null;
		gap = 0;
		text = toolTip.getTipText();
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
