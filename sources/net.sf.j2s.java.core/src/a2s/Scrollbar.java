package a2s;

import java.awt.A2SEvent;
import java.awt.event.AdjustmentEvent;

import javax.swing.JScrollBar;

public class Scrollbar extends JScrollBar implements A2SContainer {

	public Scrollbar() {
		this(java.awt.Scrollbar.VERTICAL);
	}

	public Scrollbar(int direction) {
		this(direction, 0, 10, 0, 100);
	}
	public Scrollbar(int orientation, int value, int extent, int min, int max) {
		super(orientation, value, extent, min, max);
		setOpaque(true);
		A2SEvent.addListener(null, this);
	}

	protected void processAdjustmentEvent(AdjustmentEvent e) {
		// subclass only
	}

	@Override
	public void setValue(int n) {
		super.setValue(n);
	}

	@Override
	public int getMinimum() {
		return super.getMinimum();
	}

	@Override
	public int getMaximum() {
		return super.getMaximum();
	}

	@Override
	public int getValue() {
		return super.getValue();
	}

	// JCheckBox does not allow access to fireAdjustmentChanged.
	// It really does not matter who holds the listener, actually.
	A2SListener listener = null;

	@Override
	public A2SListener getA2SListener() {
		if (listener == null)
			listener = new A2SListener();
		return listener;
	}

	// public void addMouseListener(MouseListener c) {
	// //super.addMouseListener(c);
	//
	// }
	// public void addMouseMotionListener(MouseMotionListener c) {
	// //super.addMouseMotionListener(c);
	// }

}
