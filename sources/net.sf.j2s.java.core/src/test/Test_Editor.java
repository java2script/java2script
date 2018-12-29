package test;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.JTextPane;
import javax.swing.event.CaretEvent;
import javax.swing.event.CaretListener;
import javax.swing.text.Document;
import javax.swing.text.Element;
import javax.swing.text.MutableAttributeSet;
import javax.swing.text.SimpleAttributeSet;
import javax.swing.text.Style;
import javax.swing.text.StyleConstants;

public class Test_Editor extends JFrame {

	public Test_Editor() {

		String test = "line1\nline2\nline3\n\nline5\n";

		setTitle("testing editor");
		setLocation(100, 100);
		JTextPane editor = new JTextPane();
		System.out.println(editor.getDocument());
		editor.setText(test);
		System.out.println("count = " + editor.getDocument().getRootElements()[0].getElementCount());
		editor.setBackground(new Color(200, 200, 200));
		editor.setPreferredSize(new Dimension(300, 300));
		editor.setFont(new Font(Font.SANS_SERIF, Font.PLAIN, 16));

		Style style = editor.addStyle("Red", null);
		StyleConstants.setForeground(style, Color.red);

		editor.addPropertyChangeListener(new PropertyChangeListener() {

			@Override
			public void propertyChange(PropertyChangeEvent evt) {
				System.out.println(evt.getPropertyName() + " " + evt);
			}

		});

		editor.addCaretListener(new CaretListener() {

			@Override
			public void caretUpdate(CaretEvent e) {
				System.out.println("JTextPane caret:" + e);
				// dumpRoot(editor.getDocument());
			}

		});

		JTextArea area = new JTextArea();
		area.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 16));
		area.setText(test);
		area.setBackground(new Color(200, 200, 180));
		area.setPreferredSize(new Dimension(300, 300));
		area.addCaretListener(new CaretListener() {

			@Override
			public void caretUpdate(CaretEvent e) {
				System.out.println("JTextArea  caret:" + e);
			}

		});

		JTextField field = new JTextField("testing");
		field.addCaretListener(new CaretListener() {

			@Override
			public void caretUpdate(CaretEvent e) {
				System.out.println("JTextField  caret:" + e);
			}

		});

		add(editor);
		add(BorderLayout.EAST, area);

		JPanel panel = new JPanel();
		panel.setLayout(new BoxLayout(panel, BoxLayout.X_AXIS));
		JButton b = new JButton("caret+1");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				editor.getCaret().setDot(editor.getCaret().getDot() + 1);
				editor.requestFocus();
			}

		});
		panel.add(b);
		b = new JButton("sel7-10");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				editor.getCaret().setDot(7);
				editor.getCaret().moveDot(10);
				editor.getCaret().setSelectionVisible(true);
				editor.setSelectionColor(Color.red);
				editor.requestFocus();
			}

		});
		panel.add(b);
		b = new JButton("sel7-10-area");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				area.getCaret().setDot(7);
				area.getCaret().moveDot(10);
				area.getCaret().setSelectionVisible(true);
				area.setSelectionColor(Color.blue);
				area.requestFocus();
			}

		});
		panel.add(b);

		b = new JButton("sel3-5-field");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				field.setCaretPosition(3);
				field.getCaret().moveDot(5);
				field.getCaret().setSelectionVisible(true);
				field.setSelectionColor(Color.blue);
				field.requestFocus();
			}

		});
		panel.add(b);

		b = new JButton("bold");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				int start = editor.getSelectionStart();
				int end = editor.getSelectionEnd();
				if (end == start)
					return;
				Element ch = editor.getStyledDocument().getCharacterElement(start);
				boolean isBold = !StyleConstants.isBold(ch.getAttributes());
				MutableAttributeSet attrs = new SimpleAttributeSet();
				StyleConstants.setForeground(attrs, isBold ? Color.red : Color.black);
				StyleConstants.setBold(attrs, isBold);
				editor.getStyledDocument().setCharacterAttributes(start, end - start, attrs, false);
			}

		});
		panel.add(b);

		b = new JButton("ital");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				int start = editor.getSelectionStart();
				int end = editor.getSelectionEnd();
				if (end == start)
					return;
				MutableAttributeSet attrs = new SimpleAttributeSet();
				Element ch = editor.getStyledDocument().getCharacterElement(start);
				StyleConstants.setItalic(attrs, !StyleConstants.isItalic(ch.getAttributes()));
				editor.getStyledDocument().setCharacterAttributes(start, end - start, attrs, false);
			}

		});
		panel.add(b);

		panel.add(field);

		add(panel, BorderLayout.SOUTH);
		pack();
		setVisible(true);
	}

	protected void dumpRoot(Document document) {
		dumpElement(0, document.getRootElements()[0]);
	}

	private void dumpElement(int index, Element element) {
		System.out.println("Test_Editor i=" + index + " e=" + element.toString());
		for (int i = 0, n = element.getElementCount(); i < n; i++)
			dumpElement((index + 1) * 100, element.getElement(i));

	}

	public static void main(String[] args) {
		new Test_Editor();
	}
}
