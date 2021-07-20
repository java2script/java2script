package swingjs;


import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.font.FontRenderContext;
import java.awt.font.LineMetrics;
import java.awt.geom.AffineTransform;
import java.awt.geom.Point2D;
import java.text.CharacterIterator;

import sun.font.Font2D;
import sun.font.GlyphLayout.GVData;
import sun.font.TextRecord;

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
	 * Determines the <em>standard leading</em> of the <code>Font</code> described
	 * by this <code>FontMetrics</code> object. The standard leading, or interline
	 * spacing, is the logical amount of space to be reserved between the descent of
	 * one line of text and the ascent of the next line. The height metric is
	 * calculated to include this extra space.
	 * 
	 * @return the standard leading of the <code>Font</code>.
	 * @see #getHeight()
	 * @see #getAscent()
	 * @see #getDescent()
	 */
	@Override
	public int getLeading() {
		return (int) fontLeading(font);
	}

	private static float fontLeading(Font font) {
		return font.getSize() / 20f + 1;
	}

	/**
	 * Determines the <em>font ascent</em> of the <code>Font</code> described by
	 * this <code>FontMetrics</code> object. The font ascent is the distance from
	 * the font's baseline to the top of most alphanumeric characters. Some
	 * characters in the <code>Font</code> might extend above the font ascent line.
	 * 
	 * @return the font ascent of the <code>Font</code>.
	 * @see #getMaxAscent()
	 */
	@Override
	public int getAscent() {
		return (int) fontAscent(font);
	}

	private static float fontAscent(Font font) {
		return font.getSize();
	}

	/**
	 * Determines the <em>font descent</em> of the <code>Font</code> described by
	 * this <code>FontMetrics</code> object. The font descent is the distance from
	 * the font's baseline to the bottom of most alphanumeric characters with
	 * descenders. Some characters in the <code>Font</code> might extend below the
	 * font descent line.
	 * 
	 * @return the font descent of the <code>Font</code>.
	 * @see #getMaxDescent()
	 */
	@Override
	public int getDescent() {
		return (int) fontDescent(font);
	}

	private static float fontDescent(Font font) {
		return font.getSize() / 4f + 1;
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
		 * 			var spt; return ((pt + 0 == pt ? pt : (pt = (spt =
		 *            pt).charCodeAt(0))) < 256 ? (this.getWidthsFloat$()[pt] | 0) :
		 *            this.stringWidth$S(isChar ? spt : String.fromCharCode(pt)));
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
		for (int ch = FIRST_PRINTABLE; ch < 256; ch++) {
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

	public float getFloatWidth(int ch) {
		String s = (/** @j2sNative 1 ? String.fromCharCode(ch) : */"" );
		return JSToolkit.getStringWidth(null, font, s);
	}

	/**
	 * Returns the {@link LineMetrics} object for the specified <code>String</code>
	 * in the specified {@link Graphics} context.
	 * 
	 * @param str     the specified <code>String</code>
	 * @param context the specified <code>Graphics</code> context
	 * @return a <code>LineMetrics</code> object created with the specified
	 *         <code>String</code> and <code>Graphics</code> context.
	 * @see java.awt.Font#getLineMetrics(String, FontRenderContext)
	 */
	public LineMetrics getLineMetrics(String str, Graphics context) {
		return font.getLineMetrics(str, getFontRenderContext());
	}

	/**
	 * Returns the {@link LineMetrics} object for the specified <code>String</code>
	 * in the specified {@link Graphics} context.
	 * 
	 * @param str        the specified <code>String</code>
	 * @param beginIndex the initial offset of <code>str</code>
	 * @param limit      the end offset of <code>str</code>
	 * @param context    the specified <code>Graphics</code> context
	 * @return a <code>LineMetrics</code> object created with the specified
	 *         <code>String</code> and <code>Graphics</code> context.
	 * @see java.awt.Font#getLineMetrics(String, int, int, FontRenderContext)
	 */
	public LineMetrics getLineMetrics(String str, int beginIndex, int limit, Graphics context) {
		return font.getLineMetrics(str, beginIndex, limit, null);
	}

	/**
	 * Returns the {@link LineMetrics} object for the specified character array in
	 * the specified {@link Graphics} context.
	 * 
	 * @param chars      the specified character array
	 * @param beginIndex the initial offset of <code>chars</code>
	 * @param limit      the end offset of <code>chars</code>
	 * @param context    the specified <code>Graphics</code> context
	 * @return a <code>LineMetrics</code> object created with the specified
	 *         character array and <code>Graphics</code> context.
	 * @see java.awt.Font#getLineMetrics(char[], int, int, FontRenderContext)
	 */
	public LineMetrics getLineMetrics(char[] chars, int beginIndex, int limit, Graphics context) {
		return font.getLineMetrics(chars, beginIndex, limit, null);
	}

	/**
	 * Returns the {@link LineMetrics} object for the specified
	 * {@link CharacterIterator} in the specified {@link Graphics} context.
	 * 
	 * @param ci         the specified <code>CharacterIterator</code>
	 * @param beginIndex the initial offset in <code>ci</code>
	 * @param limit      the end index of <code>ci</code>
	 * @param context    the specified <code>Graphics</code> context
	 * @return a <code>LineMetrics</code> object created with the specified
	 *         arguments.
	 * @see java.awt.Font#getLineMetrics(CharacterIterator, int, int,
	 *      FontRenderContext)
	 */
	public LineMetrics getLineMetrics(CharacterIterator ci, int beginIndex, int limit, Graphics context) {
		return font.getLineMetrics(ci, beginIndex, limit, null);
	}

	/**
     * The length of the metrics array must be >= 8.  This method will
     * store the following elements in that array before returning:
     *    metrics[0]: ascent
     *    metrics[1]: descent
     *    metrics[2]: leading
     *    metrics[3]: max advance
     *    metrics[4]: strikethrough offset
     *    metrics[5]: strikethrough thickness
     *    metrics[6]: underline offset
     *    metrics[7]: underline thickness
     */
	public void getMetrics(AffineTransform identityTx, Object anRtiAliasingHint,
			Object fractionalMetricsHint, float[] metrics) {		
		metrics[0] = fontAscent(font);
		metrics[1] = fontDescent(font);
		metrics[2] = fontLeading(font);
		metrics[3] = 0;
		if (metrics.length >= 8) {
			metrics[4] = font.getSize2D() / -4f;
			metrics[5] = metrics[6] = metrics[7] = 1;
		}
	}

	public void getMetrics(FontRenderContext frc, float[] metrics) {
		getMetrics(null, null, null, metrics);
		
	}

	public static void charsToGlyphs(int count, char[] text, int[] glyphs) {
		for (int i = 0; i < count; i++)
			glyphs[i] = text[i];
	}

	/**
	 * Takes the place of nativeLayout in SunLayoutEngine
	 * 
	 * @param font2d
	 * @param mat
	 * @param gmask
	 * @param baseIndex
	 * @param tr
	 * @param typo_flags
	 * @param pt
	 * @param data
	 */
	public static void layout(Font2D font2d, float[] mat, int gmask, int baseIndex, TextRecord tr, int typo_flags,
			Point2D.Float pt, GVData data) {
		Font f = (Font) (Object) font2d;
		JSFontMetrics fm = (JSFontMetrics) f.getFontMetrics();
		// TODO: scaling? rotation?
		int g2 = 0;
		float x = 0, y = 0, w; // I suspect all fonts are laid out linearly in x. Maybe not?
		for (int g = 0, p=tr.start; p < tr.limit; p++, g++) {
            int ch = tr.text[p];
            if (Character.isHighSurrogate((char)ch) &&
                p < tr.limit - 1 &&
                Character.isLowSurrogate(tr.text[++p])) {
                // rare case
                ch = Character.toCodePoint((char)ch,tr.text[p]); // inc
                w = fm.getFloatWidth(ch);
            } else if (ch > 255){
            	// unicode value
                w = fm.getFloatWidth(ch);
            } else {
            	w = fm.getWidthsFloat()[ch];

            }

			data._indices[g] = p + baseIndex;
			data._positions[g2++] = x;
			data._positions[g2++] = y;
			data._glyphs[g] = ch;
			data._count++;
			x += w;
		}
		data._positions[g2++] = x; 
		data._positions[g2++] = y; 
		
	}


}
