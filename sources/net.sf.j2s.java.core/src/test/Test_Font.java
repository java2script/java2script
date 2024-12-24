package test;

import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.font.FontRenderContext;
import java.awt.font.TextLayout;

import javax.swing.JFrame;
import javax.swing.JLabel;

import sun.swing.SwingUtilities2;

import java.awt.font.GlyphVector;
import sun.font.StandardGlyphVector;

/**
 * Just produces a listing of font metrics
 * 
 * @author hansonr
 *
 */
public class Test_Font {//extends Test_ {
	public static void main(String[] args) {

		JLabel c = new JLabel("testing");
		Graphics2D g = (Graphics2D) c.getGraphics();
		assert (g == null);
		JFrame f = new JFrame();
		g = (Graphics2D) f.getGraphics();
		assert (g == null);
		f.pack();
		g = (Graphics2D) f.getGraphics();
		assert (g != null);
		FontRenderContext frc = g.getFontRenderContext();
		System.out.println(c.getFont().getStringBounds("testing", frc));
		FontMetrics gfm = g.getFontMetrics();
		int a = gfm.getAscent();
		System.out.println("ffm " + " A=" +  a + " D=" + gfm.getDescent() + " =" + gfm.getHeight());
		g.dispose();

		
		for (int i = 0; i < 1; i++) {
			test(frc, Font.DIALOG, i);
//			test(frc, Font.SERIF, i);
//			test(frc, Font.SANS_SERIF, i);
		}

		System.out.println("Test_Font OK");		
		System.exit(0);
	}
	private static void test(FontRenderContext frc, String name, int style) {
		for (int i = 6	; i < 50; i++) {
			show(frc, name, style, i);
		}
		System.out.println();
	}

	private static void show(FontRenderContext frc, String name, int style, int size) {
		Font f=new Font(name, style, size);//.deriveFont(style, size * 2);
		TextLayout tl = new TextLayout("X", f, frc);
		float leading = tl.getLeading();
		float ascent = tl.getAscent();
		float descent = tl.getDescent();

// not supported		
//		GlyphVector gv = new StandardGlyphVector(f, "test".toCharArray(), 0, 4, frc);
//		System.out.println(gv.getLogicalBounds());
//		System.out.println(f.getStringBounds("test", frc));

		FontMetrics fm = SwingUtilities2.getFontMetrics(null, f);
		System.out.println("fm " + size + " A=" +  fm.getAscent() + " D=" + fm.getDescent() + " h=" + fm.getHeight());

		System.out.println(size + "\t" + f.getSize() + "\t" + (name + "        ").substring(0, 5) 
				+ "\t" + style 
				+ "\t" + ascent + "   \t" + descent + "\t" + leading 
				 + "\t" + f.getStringBounds("X", frc));
//		LineMetrics lm = f.getLineMetrics("X", frc);
//		System.out.println(size + " so=" + lm.getStrikethroughOffset() 
//		+ " st="+ lm.getStrikethroughThickness() + "/" + (size/4f)
//		+ " uo=" + lm.getUnderlineOffset() 
//		+ " ut= " + lm.getUnderlineThickness()
//				);
	}

}
