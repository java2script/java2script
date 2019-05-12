package swingjs;

import java.util.Hashtable;

import javajs.util.SB;
import javax.swing.text.BadLocationException;
import javax.swing.text.Element;
import javax.swing.text.Position;
import javax.swing.text.Segment;

/**
 * A very crude implementation of javax.swing.text.PlainDocument. 
 * Adapted from PlainDocument and AbstractDocument
 * 
 * Needs to be adapted further, with final moving to javax.swing
 * and no "JS" 
 * 
 * Currently used only for TextFields
 * 
 * 
 * @author Bob Hanson
 * 
 */
public class JSPlainDocument extends JSAbstractDocument {


  /**
   * Name of the attribute that specifies the tab
   * size for tabs contained in the content.  The
   * type for the value is Integer.
   */
  public static final String tabSizeAttribute = "tabSize";

  /**
   * Name of the attribute that specifies the maximum
   * length of a line, if there is a maximum length.
   * The type for the value is Integer.
   */
  public static final String lineLimitAttribute = "lineLimit";

	public JSPlainDocument() {
		super();
		sb = new SB();
		root = new JSElement();
	}

	@Override
	public int getLength() {
		return sb.length();
	}

	@Override
	public String getText(int offset, int length) throws BadLocationException {
		checkLoc(offset, offset + length);
		return sb.substring2(offset, offset + length);
	}

	@Override
	public void getText(int offset, int length, Segment chars)
			throws BadLocationException {
		checkLoc(offset, offset + length);
		if (tempChar == null) {
			tempChar = new char[sb.length()];
			for (int i = tempChar.length; --i >= 0;)
				tempChar[i] = sb.charAt(i);
		}
		chars.array = tempChar;
		chars.offset = offset;
		chars.count = length;
	}

	@Override
	public Position getStartPosition() {
		return new JSPosition(0);
	}

	@Override
	public Position getEndPosition() {
		return new JSPosition(sb.length());
	}

	@Override
	public Position createPosition(int offs) throws BadLocationException {
		checkLoc(offs, offs);
		Integer i = Integer.valueOf(offs);
		if (positions == null)
			positions = new Hashtable<Integer, JSPosition>();
		JSPosition p = positions.get(i);
		if (p == null)
			positions.put(i, p = new JSPosition(offs));
		return p;
	}

	@Override
	public Element getDefaultRootElement() {
		return root;
	}

	@Override
	public void render(Runnable r) {
		// no idea!
		// TODO Auto-generated method stub
	}

}
