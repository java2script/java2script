package test;

import java.awt.Dimension;
import java.awt.Graphics;

import javax.swing.BorderFactory;
import javax.swing.JComponent;
import javax.swing.JTextArea;
import javax.swing.JToolTip;
import javax.swing.ToolTipManager;

/**
 * A multiline tooltip based on open source code from http://code.ohloh.net.
 * 
 * SwingJS abandons the UI idea in favor of simple HTML BR. Code borrowed from
 * Jalview-JS development.
 *
 */
public class JMultiLineToolTip extends JToolTip {

	private static final String HTML_DIV_PREFIX = "<html><div style=\"width:250px;white-space:pre-wrap;padding:2px;overflow-wrap:break-word;\">";
	private static final String DIV_HTML_SUFFIX = "</div></html>";
	private static final int MAX_LEN = 40;

	private boolean enclose = false;
	private String lastText = null;
	private String lastWrapped = null;

	private JTextArea textArea;

	private int maxChar = MAX_LEN;

	private boolean asTextArea;

	private static Dimension ZERO_DIM = new Dimension();

	private static Dimension MAX_DIM = new Dimension(250, 1000);

	/**
	 * Allow for two options - a JTextArea or HTML-formatted text
	 * 
	 * @param maxChar
	 * @param asTextArea
	 */
	public JMultiLineToolTip(int maxChar, boolean asTextArea) {
		super();
		this.maxChar = maxChar;
		this.asTextArea = asTextArea;

		if (asTextArea) {
			textArea = new JTextArea() {
				@Override
				public Dimension getMaximumSize() {
					return MAX_DIM;
				}
			};
			add(textArea);
			textArea.setBorder(BorderFactory.createEmptyBorder(0, 2, 2, 2));
			textArea.setWrapStyleWord(true);
			textArea.setLineWrap(true);
		} else {

		}

	}

	@Override
	public Dimension getPreferredSize() {
		if (asTextArea) {
			String tipText = getTipText();
			if (tipText == null || tipText.length() == 0)
				return ZERO_DIM;
			return textArea.getPreferredSize();
		}
		return super.getPreferredSize();
	}

	@Override
	public void setTipText(String tipText) {
		if (asTextArea) {
			textArea.setText(tipText);
		} else {
			tipText = wrapToolTip(tipText);
		}
		super.setTipText(tipText);
	}

	@Override
	public void paintComponent(Graphics g) {
		if (asTextArea) {
			System.out.println(textArea.getText());
			textArea.paintComponents(g);
		} else {
			System.out.println("text=" + this.getTipText());
			super.paintComponent(g);
		}
	}

	private StringBuilder sb = new StringBuilder();

	private String wrapToolTip(String ttext) {
		if (ttext.equals(lastText))
			return lastWrapped;

		ttext = ttext.trim();
		boolean addDiv = false;

		if (ttext.contains("<br>")) {
			enclose = true;
			asTextArea = false;
//			String[] htmllines = ttext.split("<br>");
//			for (String line : htmllines) {
//				addDiv = line.length() > maxChar;
//				if (addDiv) {
//					break;
//				}
//			}
		} else {
			enclose = ttext.length() > maxChar;
			if (enclose) {
				String[] words = ttext.split(" ");
				sb.setLength(0);
				for (int i = 0, len = 0; i < words.length; i++) {
					if (len > 0)
						sb.append(" ");
					if ((len = len + words[i].length()) > maxChar) {
						sb.append("<br>");
						len = 0;
					}
					sb.append(words[i]);
				}
				ttext = sb.toString();
			}
		}
		lastText = ttext;
		lastWrapped = (!enclose ? ttext
				: addDiv ? HTML_DIV_PREFIX + ttext + DIV_HTML_SUFFIX : "<html>" + ttext + "</html>");
		System.out.println(lastWrapped);
		return lastWrapped;
	}

}