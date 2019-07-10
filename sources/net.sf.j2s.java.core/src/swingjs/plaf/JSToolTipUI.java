package swingjs.plaf;

import java.beans.PropertyChangeEvent;

import javax.swing.JComponent;
import javax.swing.JToolTip;
import javax.swing.LookAndFeel;
import javax.swing.SwingUtilities;

import swingjs.api.js.DOMNode;

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
	public DOMNode updateDOMNode() {
		boolean isNew = (domNode == null);
		super.updateDOMNode();
		if (isNew) {
		}
		return domNode;
	}

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
	public void installUI(JComponent jc) {
		toolTip = (JToolTip) jc;
		LookAndFeel.installColorsAndFont(jc, "ToolTip.background", "ToolTip.foreground", "ToolTip.font");

		// LookAndFeel.installBorder(toolTip, "ToolTip.border");
	}

	@Override
	public void uninstallUI(JComponent jc) {
		System.out.println("Uninstalling ToolTipUI");
	}

	@Override
	public void setVisible(boolean b) {
		super.setVisible(b);
		SwingUtilities.windowForComponent(toolTip).setBackground(toolTip.getBackground());
	}
}
