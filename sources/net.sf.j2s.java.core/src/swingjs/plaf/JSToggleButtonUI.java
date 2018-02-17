package swingjs.plaf;

import javax.swing.ButtonModel;
import javax.swing.UIManager;
import javax.swing.event.ChangeEvent;


public class JSToggleButtonUI extends JSButtonUI {

	@Override
	protected String getPropertyPrefix() {
		return "ToggleButton.";
	}
	
	
	@Override
	public void stateChanged(ChangeEvent e) {
		if (debugging) 
			System.out.println(id + " stateChange " + dumpEvent(e));
		ButtonModel model = button.getModel();
	  setBackground(model.isArmed() && model.isPressed() || model.isSelected() ? UIManager.getColor(getPropertyPrefix() + "highlight")
	  		: button.getBackground());
	}

}
