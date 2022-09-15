package test;

import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.JDesktopPane;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.SwingUtilities;

import javajs.async.SwingJSUtils;

public class DialogsTest extends JFrame {

	private class PCLPane extends JDesktopPane implements PropertyChangeListener {
		@Override
		public void propertyChange(PropertyChangeEvent evt) {
			String name = evt.getPropertyName();
			System.out.println(name);
			if (name.equals("value")) {
				handlePropEvent(evt.getNewValue());
			}
		}
	}

	DialogsTest() {
		setDefaultCloseOperation(EXIT_ON_CLOSE);
		setBounds(0, 0, 800, 600);
		setVisible(true);
		// For JavaScript, we need a property change listener.
		setContentPane(new PCLPane());

		JOptionPane pane = new JOptionPane("I'm a banana");
		JDialog dialog = pane.createDialog(getContentPane(), "Hello!");
		dialog.setVisible(true);
		if (/** @j2sNative false && */
		true)
			report("done");
		// JavaScript continues....
	}

	public void handlePropEvent(Object newValue) {
		System.out.println("value was " + newValue);
		report("done");
	}

	private void report(String string) {
		System.out.println(string);
		JOptionPane.showMessageDialog(this, "I'm a Banana");
		System.out.println("ok");

	}

	public static void main(String[] args) {
		SwingUtilities.invokeLater(DialogsTest::new);
	}

}