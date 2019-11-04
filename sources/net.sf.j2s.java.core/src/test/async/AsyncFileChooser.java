package test.async;

import java.awt.Component;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.io.File;

import javax.swing.JFileChooser;
import javax.swing.filechooser.FileSystemView;

/**
 * A simple Asynchronous file chooser for JavaScript; synchronous with Java.
 * 
 * Requires an OK runnable; JavaScript cannot return notification of cancel.
 * 
 * @author Bob Hanson
 */

public class AsyncFileChooser extends JFileChooser implements PropertyChangeListener {

	private int optionSelected;
	private Runnable ok; // sorry, no CANCEL in JavaScript
	private static boolean notified;

	public AsyncFileChooser() {
		super();
	}

	public AsyncFileChooser(File file) {
		super(file);
	}

	public AsyncFileChooser(File file, FileSystemView view) {
		super(file, view);
	}

	@Deprecated
	@Override
	public int showDialog(Component frame, String type) {
		// This one can come from JFileChooser
		return (ok == null ? err() : super.showDialog(frame, type));
	}

	private int err() {
		try {
			throw new java.lang.IllegalAccessException("Warning! AsyncFileChooser interface bypassed!");
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		return JFileChooser.ERROR_OPTION;
	}

	@Deprecated
	@Override
	public int showOpenDialog(Component frame) {
		return err();
	}

	@Deprecated
	@Override
	public int showSaveDialog(Component frame) {
		return err();
	}

	/**
	 * 
	 * @param frame
	 * @param type "open" or "save"
	 * @param ok
	 * @param cancel must be null; JavaScript cannot capture a cancel from a file dialog
	 */
	public void showDialog(Component frame, String type, Runnable ok, Runnable cancel) {
		this.ok = ok;
		if (cancel != null)
			notifyCancel();
		process(super.showDialog(frame, type));
	}

	/**
	 * 
	 * @param frame
	 * @param ok
	 * @param cancel must be null; JavaScript cannot capture a cancel from a file dialog
	 */
	public void showOpenDialog(Component frame, Runnable ok, Runnable cancel) {
		this.ok = ok;
		if (cancel != null)
			notifyCancel();
		process(super.showOpenDialog(frame));
	}

	/**
	 * 
	 * @param frame
	 * @param ok
	 * @param cancel must be null; JavaScript cannot capture a cancel from a file dialog
	 */
	public void showSaveDialog(Component frame, Runnable ok, Runnable cancel) {
		this.ok = ok;
		if (cancel != null)
			notifyCancel();
		process(super.showSaveDialog(frame));
	}

	private void notifyCancel() {
		if (!notified) {
			System.err.println("developer note: JavaScript cannot fire a FileChooser CANCEL action");
		}
		notified = true;
	}

	@Override
	public void propertyChange(PropertyChangeEvent evt) {
		switch (evt.getPropertyName()) {
		case "SelectedFile":
			process(optionSelected = (evt.getNewValue() == null ? CANCEL_OPTION : APPROVE_OPTION));
			break;
		}
	}

	private void process(int ret) {
		if (ret != -(-ret))
			return; // initial JavaScript return is NaN
		optionSelected = ret;
		File f = getSelectedFile();
		if (f == null) {
			return; // Sorry, JavaScript cannot do this, so we also do not do it in Java.
		}
		ok.run();
	}

	public int getSelectedOption() {
		return optionSelected;
	}

}
