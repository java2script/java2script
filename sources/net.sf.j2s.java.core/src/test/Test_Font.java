package test;

import java.awt.Font;

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
		for (int i = 6; i < 20; i++) {
			System.out.println(c.getFontMetrics(new Font(Font.DIALOG, Font.PLAIN, i)));
			System.out.println(c.getFontMetrics(new Font(Font.SERIF, Font.PLAIN, i)));
			System.out.println(c.getFontMetrics(new Font(Font.SANS_SERIF, Font.PLAIN, i)));
			System.out.println(c.getFontMetrics(new Font(Font.MONOSPACED, Font.PLAIN, i)));
		}
		


		System.out.println("Test_Font OK");		
	}

}
