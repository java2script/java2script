package swingjs.a2s;

import java.awt.GraphicsConfiguration;
import java.awt.Window;

import javax.swing.JDialog;

public class Dialog extends JDialog implements A2SContainer {

	public Dialog(java.awt.Frame owner) {
		super(owner);
		setListener();
	}

	private void setListener() {
		listener = new A2SListener();
		addMouseListener(listener);
		addMouseMotionListener(listener);
		//Util.setAWTWindowDefaults(this);
	}

	public Dialog(Frame owner) {
		super(owner);
		setListener();
	}

	public Dialog(java.awt.Frame owner, boolean modal) {
		super(owner, modal);
		setListener();
	}

	public Dialog(Frame owner, boolean modal) {
		super(owner, modal);
		setListener();
	}

	public Dialog(java.awt.Frame owner, String title) {
		super(owner, title);
		setListener();
	}

	public Dialog(Frame owner, String title) {
		super(owner, title);
		setListener();
	}

	public Dialog(java.awt.Frame owner, String title, boolean modal) {
		super(owner, title, modal);
		setListener();
	}

	public Dialog(Frame owner, String title, boolean modal) {
		super(owner, title, modal);
		setListener();
	}

	public Dialog(java.awt.Frame owner, String title, boolean modal, GraphicsConfiguration gc) {
		super(owner, title, modal, gc);
		setListener();
	}

	public Dialog(Frame owner, String title, boolean modal, GraphicsConfiguration gc) {
		super(owner, title, modal, gc);
		setListener();
	}

	public Dialog(java.awt.Dialog owner) {
		super(owner);
		setListener();
	}

	public Dialog(Dialog owner) {
		super(owner);
		setListener();
	}

	public Dialog(java.awt.Dialog owner, String title) {
		super(owner, title, false);
		setListener();
	}

	public Dialog(Dialog owner, String title) {
		super(owner, title, false);
		setListener();
	}

	public Dialog(java.awt.Dialog owner, String title, boolean modal) {
		super(owner, title, modal);
		setListener();
	}

	public Dialog(Dialog owner, String title, boolean modal) {
		super(owner, title, modal);
		setListener();
	}

	public Dialog(java.awt.Dialog owner, String title, boolean modal, GraphicsConfiguration gc) {
		super(owner, title, modal, gc);
		setListener();
	}

	public Dialog(Dialog owner, String title, boolean modal, GraphicsConfiguration gc) {
		super(owner, title, modal, gc);
		setListener();
	}

	public Dialog(Window owner) {
		super(owner);
		setListener();
	}

	public Dialog(Window owner, String title) {
		super(owner, title);
		setListener();
	}

	public Dialog(Window owner, java.awt.Dialog.ModalityType modalityType) {
		super(owner, modalityType);
		setListener();
	}

	public Dialog(Window owner, String title, java.awt.Dialog.ModalityType modalityType) {
		super(owner, title, modalityType);
		setListener();
	}

	public Dialog(Window owner, String title, java.awt.Dialog.ModalityType modalityType, GraphicsConfiguration gc) {
		super(owner, title, modalityType, gc);
		setListener();
	}

	A2SListener listener;

	@Override
	public A2SListener getA2SListener() {
		return listener;
	}

}
