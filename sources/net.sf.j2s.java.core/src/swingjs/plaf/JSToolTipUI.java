package swingjs.plaf;

import java.beans.PropertyChangeEvent;

import javax.swing.JComponent;
import javax.swing.LookAndFeel;

public class JSToolTipUI extends JSLabelUI {

	// TODO: allow generic tool tip, not just text

	// TODO: z-index?

	@Override
	protected String getPropertyPrefix() {
		return "ToolTipUI";
	}
	
	public JSToolTipUI() {
		super();
		//allowTextAlignment = false;
	}

	@Override
	public void propertyChange(PropertyChangeEvent e) {
		String prop = e.getPropertyName();
		if (prop == "component") {
			return;
		}
		super.propertyChangedCUI(e, prop);
	}

//	@Override
//	protected void getIconAndText() {
//		icon = null;
//		iconNode = null; // not an Abstract Button
//		gap = 0;
//		text = toolTip.getTipText();
//	}
//	

	@Override
	public void installUI(JComponent jc) {
		super.installUI(jc);
		LookAndFeel.installColorsAndFont(jc, "ToolTip.background", "ToolTip.foreground", "ToolTip.font");
		// LookAndFeel.installBorder(toolTip, "ToolTip.border");
	}


	@Override
	public void setVisible(boolean b) {
		super.setVisible(b);
		//SwingUtilities.windowForComponent(jc).setBackground(jc.getBackground());
	}
	
	
}
