package a2s;

import java.awt.A2SEvent;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.awt.event.TextEvent;
import java.awt.event.TextListener;

import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

public class A2SListener  implements AdjustmentListener, ActionListener, KeyListener, MouseListener, MouseMotionListener, TextListener, ChangeListener {

	@Override
	public void actionPerformed(ActionEvent e) {
		new A2SEvent(e).run();
	}

	@Override
	public void mouseDragged(MouseEvent e) {
		new A2SEvent(e).run();		
	}

	@Override
	public void mouseMoved(MouseEvent e) {
		new A2SEvent(e).run();
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		new A2SEvent(e).run();
	}

	@Override
	public void mousePressed(MouseEvent e) {
		new A2SEvent(e).run();
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		new A2SEvent(e).run();
	}

	@Override
	public void mouseEntered(MouseEvent e) {
		new A2SEvent(e).run();
	}

	@Override
	public void mouseExited(MouseEvent e) {
		new A2SEvent(e).run();
	}

	@Override
	public void keyTyped(KeyEvent e) {
		new A2SEvent(e).run();	
	}

	@Override
	public void keyPressed(KeyEvent e) {
		new A2SEvent(e).run();	
	}

	@Override
	public void keyReleased(KeyEvent e) {
		new A2SEvent(e).run();	
	}

	@Override
	public void adjustmentValueChanged(AdjustmentEvent e) {
		new A2SEvent(e).run();
		if (e.getSource() instanceof Scrollbar)
			((Scrollbar) e.getSource()).processAdjustmentEvent(e);
	}

	@Override
	public void textValueChanged(TextEvent e) {
		System.out.println("AHAH! a2sListener textvalue changed " + e);
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		System.out.println("Ahah a2slistener state changed " + e.getSource());
	}

}
