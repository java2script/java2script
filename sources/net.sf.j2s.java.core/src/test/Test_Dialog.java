package test;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Container;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.util.Map;

import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JColorChooser;
import javax.swing.JDialog;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.plaf.UIResource;

@SuppressWarnings("serial")
public class Test_Dialog extends JFrame implements PropertyChangeListener {

	public static int ii;
	
	public static Object o = new Object();
	public static Color c = new Color(1,2,3);

	
	// @Override
	public void propertyChange(PropertyChangeEvent event) {
		Object val = event.getNewValue();
		String name = event.getPropertyName();
		System.out.println(name);
		switch (event.getSource().getClass().getName()) {
		case "javax.swing.JOptionPane":
			switch (name) {
			case "inputValue":
				onDialogReturn(val);
				return;
			case "value":
				if (val instanceof Integer)
					onDialogReturn(((Integer) val).intValue());
				else
					onDialogReturn(val);
				return;
			}
			break;
		case "javax.swing.ColorChooserDialog":
			switch (name) {
			case "SelectedColor":
				onDialogReturn(val);
				return;
			}
			break;
		case "javax.swing.JFileChooser":
			switch (name) {
			case "SelectedFile":
				File file = (File) val;
				byte[] array = (val == null ? null : /** @j2sNative file._bytes || */ null);
				onDialogReturn("fileName is '" + file.getName() + "'\n\n" + new String(array));
				return;
			}
			break;
		}
		System.out.println(
				event.getSource().getClass().getName() + " " + event.getPropertyName() + ": " + event.getNewValue());
	}

	// JSCOmponent.DialogCaller interface
	public void onDialogReturn(int value) {
		if (value != Math.floor(value))
			return; // in JavaScript, this will be NaN
		System.out.println("int value is " + value);
	}

	// JSCOmponent.DialogCaller interface
	public void onDialogReturn(Object value) {
		if (value instanceof UIResource)
			return;
		System.out.println("object value is " + value);
	}

	
	
	public Test_Dialog() {
		super();
		this.setTitle("testing dialogs");
		Container contentPane = this.getContentPane();
		contentPane.setLayout(new BoxLayout(contentPane, BoxLayout.X_AXIS));
		this.setLocation(300, 300);
		JButton b;

		b = new JButton("ConfirmDialog");
		final JPanel content = new JPanel();
		content.setLayout(new BorderLayout());
		content.add(new JLabel("this is the option panel"), BorderLayout.CENTER);
		b.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				Test_Dialog.this.onDialogReturn(JOptionPane.showConfirmDialog(Test_Dialog.this, "OK"/* content */,
						"Testing JOptionPane", JOptionPane.OK_CANCEL_OPTION));
			}

		});
		this.add(b);

		b = new JButton("MessageDialog");
		final JPanel message = new JPanel();
		message.setLayout(new BorderLayout());
		message.add(new JLabel("this is the message panel"), BorderLayout.CENTER);
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				JOptionPane.showMessageDialog(Test_Dialog.this, message);
			}

		});
		this.add(b);

		b = new JButton("InputDialog");
		final JPanel input = new JPanel();
		input.setLayout(new BorderLayout());
		input.add(new JLabel("this is the input panel"), BorderLayout.CENTER);
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				Test_Dialog.this.onDialogReturn(JOptionPane.showInputDialog(Test_Dialog.this, input));
			}

		});
		this.add(b);

		
		
		b = new JButton("FileOpenDialog");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				JFileChooser fc = new JFileChooser();
				Test_Dialog.this.onDialogReturn(fc.showOpenDialog(Test_Dialog.this));
			}

		});
		this.add(b);

		b = new JButton("ColorDialog");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {

				Test_Dialog.this
						.onDialogReturn(JColorChooser.showDialog(Test_Dialog.this, "Testing JColorChooser", Color.RED));

			}

		});
		this.add(b);
		this.pack();
		this.setVisible(true);

	}

	public static void main(String[] args) {
		try {
			new Test_Dialog();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}


}
