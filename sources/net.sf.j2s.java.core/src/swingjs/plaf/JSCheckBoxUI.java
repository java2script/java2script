package swingjs.plaf;

/**
 * CheckboxUI implementation for BasicCheckboxUI
 * 
 * 
 */
public class JSCheckBoxUI extends JSRadioButtonUI {
	
	@Override
	protected String getPropertyPrefix() {
		return (isAWT && ((swingjs.a2s.Checkbox) jc).isRadio() ? "RadioButton" : "CheckBox");
	}

}
