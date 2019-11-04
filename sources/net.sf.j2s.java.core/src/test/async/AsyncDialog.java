package test.async;

import java.awt.Component;
import java.awt.Window;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.Icon;
import javax.swing.JOptionPane;

/**
 * A class to manage asynchronous input, option, and confirmation dialogs.
 * 
 * @author Bob Hanson hansonr
 *
 */
@SuppressWarnings("serial")
public class AsyncDialog extends Window implements PropertyChangeListener {

	private ActionListener actionListener;
	private Object choice;
	private String[] options;

	public AsyncDialog(ActionListener a) {
		super(null);
		actionListener = a;
	}

	/**
	 * Switch from property change to action.
	 * 
	 */
	@Override
	public void propertyChange(PropertyChangeEvent evt) {
		switch (evt.getPropertyName()) {
		case "value":
			Object val = evt.getNewValue();
			if (options != null) {
				int i;
				for (i = 0; i < options.length; i++) {
					if (options[i] == val) 
						break;
				}
				val = Integer.valueOf(i < options.length ? i : JOptionPane.CLOSED_OPTION);
			}
			process(val);
		}
	}

	// These options can be supplemented as desired.

	public void showInputDialog(Component frame, String message, String title, int type, Icon icon, Integer[] choices,
			Integer initialChoice) {
		setFrame(frame);
		process(JOptionPane.showInputDialog(this, message, title, type, icon, choices, initialChoice));
	}

	public void showOptionDialog(Component frame, String message, String title, int optionType, int messageType,
			Icon icon, String[] options, String initialValue) {
		setFrame(frame);
		this.options = options;
		process(JOptionPane.showOptionDialog(this, message, title, optionType, messageType, icon, options,
				initialValue));
	}

	public void showConfirmDialog(Component frame, String message, String title, int optionType) {
		showConfirmDialog(frame, message, title, optionType, JOptionPane.QUESTION_MESSAGE);
	}

	public void showConfirmDialog(Component frame, String message, String title, int optionType, int messageType) {
		setFrame(frame);
		process(JOptionPane.showConfirmDialog(this, message, title, optionType, messageType));
	}

	private void setFrame(Component frame) {
		if (frame != null) {
			setBounds(frame.getBounds());
		}
	}

	private boolean processed;

	/**
	 * Return for confirm dialog.
	 * 
	 * @param ret may be JavaScript NaN, testable as ret != ret or ret != - -ret
	 */
	private void process(int ret) {
		if (ret != - -ret || processed)
			return;
		process(new Integer(ret));
	}

	private void process(Object ret) {
		if (ret instanceof javax.swing.plaf.UIResource || processed)
			return;
		processed = true;
		choice = ret;
		actionListener.actionPerformed(new ActionEvent(this, 0, "SelectedOption"));
		dispose();
	}

	/**
	 * retrieve selection from the ActionEvent, for which "this" is getSource()
	 * 
	 * @return
	 */
	public Object getChoice() {
		return choice;
	}

	public int getOption() {
		if (!(choice instanceof Integer)) {
			throw new java.lang.IllegalArgumentException("AsyncDialog.getOption called for non-Integer choice");
		}
		return ((Integer) choice).intValue();
	}

}
