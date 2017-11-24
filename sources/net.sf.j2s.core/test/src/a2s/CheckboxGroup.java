package a2s;

import java.util.Enumeration;

import javax.swing.AbstractButton;
import javax.swing.ButtonGroup;
import javax.swing.JRadioButton;

public class CheckboxGroup extends ButtonGroup {

	public CheckboxGroup() {
	}

	public JRadioButton getSelectedCheckbox() {
	    for (Enumeration<AbstractButton> e = getElements(); e.hasMoreElements(); ) {
		JRadioButton ab = (JRadioButton) e.nextElement();
		if (ab.isSelected())
		    return ab;
	    }
	    return null;
	}
}
