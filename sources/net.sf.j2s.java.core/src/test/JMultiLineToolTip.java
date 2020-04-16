package test;

import java.awt.Color;

import javax.swing.JToolTip;
import javax.swing.border.EmptyBorder;

/**
 * A multi-line tool tip using simple HTML/BR.
 * 
 * Text can be set with br tags to indicate that this task is already done but
 * still needs wrapping within an html element.
 * 
 * Likewise, if text starts with &lt;html&gt;, then it is left unchanged.
 * 
 * Complex HTML text for JavaScript in particular should be wrapped with an html
 * element so as to bypass the addition of br tags inappropriately.
 * 
 * @author hansonr
 *
 */
@SuppressWarnings("serial")
public class JMultiLineToolTip extends JToolTip {

	private String lastText;
	private String lastWrapped;

	private int maxChar;

	private StringBuilder sb = new StringBuilder();

	/**
	 * default constructor for maxChar=40 and bgColor=YELLOW
	 */
	public JMultiLineToolTip() {
		this(40, Color.yellow);
	}

	/**
	 * @param maxChar simple character count for width
	 * @param bgColor just for convenience; background color
	 */
	public JMultiLineToolTip(int maxChar, Color bgColor) {
		super();
		this.maxChar = maxChar;
		setBorder(new EmptyBorder(0, 5, 0, 5));
		setBackground(bgColor);
	}

	@Override
	public void setTipText(String tipText) {
		super.setTipText(wrapToolTip(tipText));
	}

	/**
	 * Wrap the text using a simple maximum between-word character count.
	 * 
	 * Can be overridden.
	 * 
	 * @param text
	 * @return wrapped text with br tags
	 */
	protected String wrapToolTip(String text) {
		if (text.equals(lastText))
			return lastWrapped;
		lastText = text;
		text = text.trim();
		boolean enclose;
		if (text.startsWith("<html>")) {
			enclose = false;
		} else if (text.contains("<br") || text.contains("<BR")) {
			// allowing for <br> or <br/> here
			enclose = true;
		} else {
			enclose = (text.length() > maxChar);
			if (enclose) {
				String[] words = text.split(" ");
				sb.setLength(0);
				for (int i = 0, len = 0; i < words.length; i++) {
					if ((len = len + words[i].length()) > maxChar) {
						sb.append("<br>");
						len = 0;
					} else if (len > 0) {
						sb.append(" ");
					}
					sb.append(words[i]);
				}
				text = sb.toString();
			}
		}
		return lastWrapped = (enclose ? "<html>" + text + "</html>" : text);
	}

}