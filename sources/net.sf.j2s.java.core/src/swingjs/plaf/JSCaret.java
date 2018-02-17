package swingjs.plaf;

import java.awt.Graphics;
import java.awt.Point;
import javax.swing.event.ChangeListener;
import javax.swing.plaf.UIResource;
import javax.swing.text.Caret;
import javax.swing.text.JTextComponent;


class JSCaret implements Caret, UIResource {

	@SuppressWarnings("unused")
	private JTextComponent c;
	private int dot;
	private int mark;

	@Override
	public void install(JTextComponent c) {
		this.c = c;
	}

	@Override
	public void deinstall(JTextComponent c) {
		this.c = null;
	}

	@Override
	public void paint(Graphics g) {
		// ignore
	}

	@Override
	public void addChangeListener(ChangeListener l) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeChangeListener(ChangeListener l) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean isVisible() {
		return true;
	}

	@Override
	public void setVisible(boolean v) {
	}

	@Override
	public boolean isSelectionVisible() {
		return true;
	}

	@Override
	public void setSelectionVisible(boolean v) {
	}

	@Override
	public void setMagicCaretPosition(Point p) {
	}

	@Override
	public Point getMagicCaretPosition() {
		return null;
	}

	@Override
	public void setBlinkRate(int rate) {
	}

	@Override
	public int getBlinkRate() {
		return 0;
	}

	@Override
	public int getDot() {
		return dot;
	}

	@Override
	public int getMark() {
		return mark;
	}

	@Override
	public void setDot(int dot) {
		this.dot = this.mark = dot;
	}

	@Override
	public void moveDot(int dot) {
		this.mark = this.dot;
		this.dot = dot;
	}

	@Override
	public String toString() {
		return "caret[" + dot + "," + mark + "]";
	}
}