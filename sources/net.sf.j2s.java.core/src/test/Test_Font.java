package test;

import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.font.FontRenderContext;
import java.awt.font.LineMetrics;

import javax.swing.JFrame;
import javax.swing.JLabel;

/**
 * Just produces a listing of font metrics
 * 
 * @author hansonr
 *
 */
public class Test_Font extends Test_ {
	public static void main(String[] args) {

		JLabel c = new JLabel("testing");
		JFrame f = new JFrame();
		f.pack();
		Graphics2D g = (Graphics2D) f.getGraphics();
		FontRenderContext frc = g.getFontRenderContext();
		g.dispose();
		for (int i = 6; i < 20; i++) {
			show(frc, Font.DIALOG, Font.PLAIN, i);
			show(frc, Font.SERIF, Font.PLAIN, i);
			show(frc, Font.SANS_SERIF, Font.PLAIN, i);
			show(frc, Font.MONOSPACED, Font.PLAIN, i);
		}
		


		System.out.println("Test_Font OK");		
	}

	private static void show(FontRenderContext frc, String name, int style, int size) {
		Font f=new Font(name, style, size);
		LineMetrics lm = f.getLineMetrics("X", frc);
		
		System.out.println(size + " so=" + lm.getStrikethroughOffset() 
		+ " st="+ lm.getStrikethroughThickness() + "/" + (size/4f)
		+ " uo=" + lm.getUnderlineOffset() 
		+ " ut= " + lm.getUnderlineThickness()
				);
	}

}
