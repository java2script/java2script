package swingjs.plaf;

import java.awt.Insets;
import java.beans.PropertyChangeEvent;

import javax.swing.JComponent;
import javax.swing.JToolTip;
import javax.swing.LookAndFeel;

public class JSToolTipUI extends JSLabelUI {

	// TODO: allow generic tool tip, not just text
	
	// note that, however, JSToolTip is not a label. 

	
	// TODO: z-index?
	
	public JSToolTipUI() {
		super();
		allowTextAlignment = false;
	}
	
	protected JToolTip toolTip;

	
	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		if (prop == "component") {
			return;
		}
		super.propertyChangedCUI(e, prop);
	}

	@Override
	protected void getIconAndText() {		
		icon = null;
		iconNode = null; // not an Abstract Button
		gap = 0;
		text = toolTip.getTipText();	
		
	}

	@Override
	public Insets getInsets() {
		// a ComponentPeer method
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
	}

}
