package swingjs.a2s;

import java.awt.HeadlessException;
import java.awt.event.ActionEvent;

import javax.swing.ButtonGroup;
import javax.swing.DefaultButtonModel;
import javax.swing.Icon;
import javax.swing.JCheckBox;
import javax.swing.JRadioButton;

public class Checkbox extends JCheckBox {

	
	private static Boolean isRadioTemp;
	private boolean isRadio;


	public void isAWT() {}
	
	// added to (slightly) simplify converting code that uses Checkbox radio buttons
	public static JRadioButton newRadioButton(String string, ButtonGroup bg, boolean b) {
		JRadioButton rb = new JRadioButton(string, b);
		bg.add(rb);
		return rb;
	}
	
	public Checkbox(String string) {
		super(string, false);
	}

	public Checkbox(String string, boolean b) {
		super(string, b);
	}

	public Checkbox(String label, boolean state, java.awt.CheckboxGroup group) throws HeadlessException {
		super(label, setIsRadio(), false);
		setState(state);
		if (group != null)
			group.add(this);
		if (state && (group != null)) {
			super.setSelected(state);
		}
	}
    
	/**
	 * transiently flag this as a radio button
	 * @return
	 */
    private static Icon setIsRadio() {
    	isRadioTemp = true;
    	return null;
	}
    
    public boolean isRadio() {
    	boolean b = (isRadioTemp == null ? isRadio : isRadioTemp);
    	isRadio = b;
    	isRadioTemp = null;
    	return b;
    }

	public Checkbox(String label, java.awt.CheckboxGroup group, boolean state)
            throws HeadlessException {
            this(label, state, group);
        }	
    
    public Checkbox() {
		super();
	}

	public boolean getState() {
		return super.isSelected();
	}

	public void setState(boolean b) {
		if (((DefaultButtonModel) model).setStateNoFire(b))
			秘getUI().updateDOMNode();
	}   
	
	public void setCheckboxGroup(java.awt.CheckboxGroup group) throws HeadlessException {
            if (group != null)
            	group.add(this);
    }
    

    @Override
	protected void fireActionPerformed(ActionEvent event) {
    	A2SEvent.addListener(this);
    	super.fireActionPerformed(event);
    }

}
