package a2s;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;

public class A2SListener  implements AdjustmentListener, ActionListener, KeyListener, MouseListener, MouseMotionListener {

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
	}

}
