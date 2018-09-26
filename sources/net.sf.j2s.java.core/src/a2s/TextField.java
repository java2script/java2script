package a2s;

import java.awt.event.TextEvent;
import java.awt.event.TextListener;

import javax.swing.JTextField;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;

public class TextField extends JTextField {

	public TextField() {
		this("", 0);
	}

	public TextField(String text) {
        this(text, (text != null) ? text.length() : 0);
	}

	public TextField(int width) {
		this("", width);
	}

    public TextField(String text, int width) {
		super(text, width);
	}

	public void addTextListener(final TextListener textListener) {
		getDocument().addDocumentListener(new DocumentListener() {

			@Override
			public void insertUpdate(DocumentEvent e) {
				textListener.textValueChanged(new TextEvent(this, 0));
			}

			@Override
			public void removeUpdate(DocumentEvent e) {
				textListener.textValueChanged(new TextEvent(this, 0));
			}

			@Override
			public void changedUpdate(DocumentEvent e) {
				// not what you think. -- only when the style changes
				textListener.textValueChanged(new TextEvent(this, 0));
			}
		});
	}

}
