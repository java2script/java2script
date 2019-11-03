package test.async;

import java.awt.Component;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.io.File;

import javax.swing.JFileChooser;
import javax.swing.filechooser.FileSystemView;

/**
 * A simple Asynchronous file chooser for JavaScript; synchronous with Java
 * 
 * @author Bob Hanson
 */

@SuppressWarnings("serial")
public class AsyncFileChooser extends JFileChooser implements PropertyChangeListener {

	private Runnable ok, cancel;
	private int optionSelected;

	public AsyncFileChooser() {
		super();
	}

	public AsyncFileChooser(File file) {
		super(file);
	}

	public AsyncFileChooser(File file, FileSystemView view) {
		super(file, view);
	}

	/**
	 * 
	 * @param frame
	 * @param type
	 * @param ok     a Runnable for success
	 * @param cancel a Runnable for failure
	 * @return
	 */
	public int showDialog(Component frame, String type, Runnable ok, Runnable cancel) {
		this.ok = ok;
		this.cancel = cancel;
		return process(showDialog(frame, type));
	}

	public void showOpenDialog(Component frame, Runnable ok, Runnable cancel) {
		this.ok = ok;
		this.cancel = cancel;
		process(showOpenDialog(frame));
	}

	public void showSaveDialog(Component frame, Runnable ok, Runnable cancel) {
		this.ok = ok;
		this.cancel = cancel;
		process(showSaveDialog(frame));
	}

	@Override
	public void propertyChange(PropertyChangeEvent evt) {
		switch (evt.getPropertyName()) {
		case "SelectedFile":
			process(evt.getNewValue() == null ? CANCEL_OPTION : APPROVE_OPTION);
			break;
		}
	}

	private int process(int ret) {
		optionSelected = ret;
		switch (ret) {
		case APPROVE_OPTION:
			ok.run();
			break;
		case CANCEL_OPTION:
			if (cancel != null)
				cancel.run();
			break;
		default:
			// asynchronous return -- ignore
		}
		return ret;
	}

	public int getSelectedOption() {
		return optionSelected;
	}

}
