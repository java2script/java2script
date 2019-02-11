package swingjs.a2s;

import java.awt.event.AdjustmentEvent;

import javax.swing.JScrollBar;

public class Scrollbar extends JScrollBar {

	private boolean fromUI;

	public void isAWT() {}
	
	public Scrollbar() {
		this(java.awt.Scrollbar.VERTICAL);
	}

	public Scrollbar(int direction) {
		this(direction, 0, 10, 0, 100);
	}
	public Scrollbar(int orientation, int value, int extent, int min, int max) {
		super(orientation, Math.max(Math.min(value,  max), min), extent, min, max);
		setOpaque(true);
//		A2SEvent.addListener(this);
	}

//	@Override
//	public void setValue(int n) {
//		super.setValue(n);
//	}
//
//	@Override
//	public int getMinimum() {
//		return super.getMinimum();
//	}
//
//	@Override
//	public int getMaximum() {
//		return super.getMaximum();
//	}
//
//	@Override
//	public int getValue() {
//		return super.getValue();
//	}

	@Override
	protected void fireAdjustmentValueChanged(int id, int type, int value, boolean adjusting) {
		A2SEvent.addListener(this);
		if (!fromUI)
			return;
		System.out.println("a2sscrollbar adjusting " + adjusting);
		super.fireAdjustmentValueChanged(id, type, value, adjusting);
	}

	public void setValueFromUI(int val) {
		fromUI = true;
		setValue(val);
		fromUI = false;
	}

	public void processAdjustmentEventA2S(AdjustmentEvent e) {
		if (fromUI)
			processAdjustmentEvent(e);
	}
    
	protected void processAdjustmentEvent(AdjustmentEvent e) {
		// subclass only
	}

	public void setValueIsAdjustingFromUI(boolean b) {
		fromUI = true;
		setValueIsAdjusting(b);
		fromUI = false;
	}


}
