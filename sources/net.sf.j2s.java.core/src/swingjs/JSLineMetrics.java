package swingjs;

import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.font.LineMetrics;

public class JSLineMetrics extends LineMetrics {
	
	private FontMetrics fm;
	private String s;

	public JSLineMetrics() {
	}
	
	public JSLineMetrics(Font font, String s) {
		fm = font.getFontMetrics();
	}

	@Override
	public int getNumChars() {
		return s.length();
	}

	@Override
	public float getHeight() {
		return fm.getHeight();
	}

	@Override
	public int getBaselineIndex() {
		return Font.ROMAN_BASELINE;
	}

	@Override
	public float[] getBaselineOffsets() {
		return new float[s.length()];
	}

	@Override
	public float getStrikethroughOffset() {
		return fm.getAscent()/2f;
	}

	@Override
	public float getStrikethroughThickness() {
		return 1;
	}

	@Override
	public float getUnderlineOffset() {
		return 2;
	}

	@Override
	public float getUnderlineThickness() {
		return 1;
	}

	@Override
	public float getAscent() {
		return fm.getAscent();
	}

	@Override
	public float getDescent() {
		return fm.getDescent();
	}

	@Override
	public float getLeading() {
		return fm.getLeading();
	}

}
