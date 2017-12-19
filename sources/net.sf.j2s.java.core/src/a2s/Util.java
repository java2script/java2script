package a2s;

import java.awt.Graphics;


public class Util {

	public static void drawString(Graphics g, String text, int x, int y) {
		/**
		 * @j2sNative
		 * 
		 * g.drawStringUnique(text, x, y);
		 * 
		 */
		{
		g.drawString(text,  x,  y);
		return;
		}
	}
}
