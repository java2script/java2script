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
import sun.font.FontDesignMetrics;
import sun.font.GlyphLayout.GVData;
import sun.font.TextRecord;

/**
 * This class holds a set of static float methods that are accessed by sun.font.FontDesignMetrics, 
 * sun.font.StandardGlyphVector, and 
 * and 
 * 
 * 
 * @author hanso
 *
 */
public class JSFontMetrics  {
	
	private JSFontMetrics() {}
	
	/**
	 * Use simple linear relationship found using Java and a range of fonts.
	 * 
	 * @param font
	 * @return
	 */
	public static float fontLeading(Font font) {
		// leading
		// is exact for sizes 6 to 50
		switch (font.getName()) {
		default:
		case "SansSerif":
		case "Dialog":
			return font.getSize2D() * 0.0327f;
		case "Serif":
			return font.getSize2D() * 0.0425f;
		case "Monospaced":
			return 0;
		}
	}

	/**
	 * Use simple linear relationship found using Java and a range of fonts.
	 * 
	 * @param font
	 * @return
	 */
	public static float fontAscent(Font font) {
		// is exact for 6-50
		return font.getSize2D() * 1.005371f;
	}

	/**
	 * Use simple linear relationship found using Java and a range of fonts.
	 * 
	 * @param font
	 * @return
	 */
	public static float fontDescent(Font font) {
		switch (font.getName()) {
		default:
			return font.getSize2D() * 0.2197f;
		case "Monospaced":
			return font.getSize2D() * 0.3003f;
		}
	}

	/**
	 * Just copy these over in JavaScript
	 * 
	 * @param count
	 * @param text
	 * @param glyphs
	 */
	public static void charsToGlyphs(int count, char[] text, int[] glyphs) {
		for (int i = 0; i < count; i++)
			glyphs[i] = text[i];
	}

}
