package a2s;

import java.awt.event.TextEvent;
import java.awt.event.TextListener;

import javax.swing.JTextField;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;

public class TextField extends JTextField {

	public TextField(int width) {
		super(width);
	}

	public TextField() {
		super();
	}

	public TextField(String text) {
		super(text);
	}

	public TextField(String text, int width) {
		super(text, width);
	}

	public void addTextListener(final TextListener textListener) {
		getDocument().addDocumentListener(new DocumentListener() {

			@Override
			public void insertUpdate(DocumentEvent e) {
			}

			@Override
			public void removeUpdate(DocumentEvent e) {
				// TODO Auto-generated method stub

			}

			@Override
			public void changedUpdate(DocumentEvent e) {
				textListener.textValueChanged(new TextEvent(this, 0));
			}
		});
	}

}
