package swingjs;

import java.awt.Font;
import java.awt.FontMetrics;

public class JSFontMetrics extends FontMetrics {
	
	private float[] fwidths;
	private int[] iwidths;
	private int FIRST_PRINTABLE = 32;

	public JSFontMetrics() {
		super(null);
	}
	
	public void setFont(Font f) {
	  font = f;
	}

  /**
   * Determines the <em>standard leading</em> of the
   * <code>Font</code> described by this <code>FontMetrics</code>
   * object.  The standard leading, or
   * interline spacing, is the logical amount of space to be reserved
   * between the descent of one line of text and the ascent of the next
   * line. The height metric is calculated to include this extra space.
   * @return    the standard leading of the <code>Font</code>.
   * @see   #getHeight()
   * @see   #getAscent()
   * @see   #getDescent()
   */
  @Override
	public int getLeading() {
      return font.getSize() / 20 + 1;
  }

  /**
   * Determines the <em>font ascent</em> of the <code>Font</code>
   * described by this <code>FontMetrics</code> object. The font ascent
   * is the distance from the font's baseline to the top of most
   * alphanumeric characters. Some characters in the <code>Font</code>
   * might extend above the font ascent line.
   * @return     the font ascent of the <code>Font</code>.
   * @see        #getMaxAscent()
   */
  @Override
	public int getAscent() {
      return font.getSize();
  }

  /**
   * Determines the <em>font descent</em> of the <code>Font</code>
   * described by this
   * <code>FontMetrics</code> object. The font descent is the distance
   * from the font's baseline to the bottom of most alphanumeric
   * characters with descenders. Some characters in the
   * <code>Font</code> might extend
   * below the font descent line.
   * @return     the font descent of the <code>Font</code>.
   * @see        #getMaxDescent()
   */
  @Override
	public int getDescent() {
      return font.getSize() / 4 + 1;
  }
  
  @Override
	public int charWidth(char pt) {
  	return (pt < 256 ? (int) getWidthsFloat()[pt] : stringWidth("" + pt));
  }
  
  @Override
	public int charWidth(int pt) {
  	/**
  	 * could be a character 
  	 * 
  	 * @j2sNative 
  	 * 
  	 * var spt;
  	 * return ((pt + 0 == pt ? pt : (pt = (spt = pt).charCodeAt(0))) < 256 ? 
  	 *       Clazz.floatToInt(this.getWidthsFloat()[pt])
  	 *     : this.stringWidth$S(isChar ? spt : String.fromCharCode (pt)));
  	 */
  	{
  		return (pt < 256 ? (int) getWidthsFloat()[pt] : stringWidth("" + (char) pt));
  	}
  }
  
	@Override
	public int stringWidth(String s) {
  	return (int) JSToolkit.getStringWidth(null, font, s);
  }

	@Override
	public int[] getWidths() {
		if (iwidths != null)
			return iwidths;
		iwidths = new int[256];
		getWidthsFloat();
		for (int ch = FIRST_PRINTABLE ; ch < 256; ch++) {
			iwidths[ch] = (int) fwidths[ch];
		}
		return iwidths;
	}

	public float[] getWidthsFloat() {
		if (fwidths != null)
			return fwidths;
		fwidths = new float[256];
		for (int ch = FIRST_PRINTABLE; ch < 256; ch++) {
			fwidths[ch] = JSToolkit.getStringWidth(null, font, "" + (char) ch);
		}
		return fwidths;
	}

}
