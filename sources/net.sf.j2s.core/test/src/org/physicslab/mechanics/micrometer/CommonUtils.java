package org.physicslab.mechanics.micrometer;

import java.awt.Graphics;
import java.awt.Label;

public class CommonUtils {
	   // constants
		private static final int TOP = 0;
		private static final int CENTER = 1;
		private static final int BOTTOM = 2;
		
		  /**
		 * Draws string at the specified coordinates with the specified alignment.
		 * 
		 * @param g
		 *            graphics context to draw
		 * @param x
		 *            the x coordinate
		 * @param y
		 *            the y coordinate
		 * @param s
		 *            the string to draw
		 * @param x_align
		 *            the alignment in x direction (left=0, centre=1 right=2)
		 * @param y_align
		 *            the alignment in y direction (top=0, centre =1)
		 */

		public static final void outString(Graphics g, int x, int y, String s, int x_align, int y_align) {
			switch (y_align) {
			case TOP:
				y += g.getFontMetrics(g.getFont()).getAscent();
				break;
			case CENTER:
				y += g.getFontMetrics(g.getFont()).getAscent() / 2;
				break;
			case BOTTOM:
				break;
			}
			switch (x_align) {
			case Label.LEFT:
				g.drawString(s, x+3, y);
				break;
			case Label.RIGHT:
				g.drawString(s, x - g.getFontMetrics(g.getFont()).stringWidth(s)-3, y);
				break;
			case Label.CENTER:
				g.drawString(s, x - g.getFontMetrics(g.getFont()).stringWidth(s) / 2, y);
				break;
			}
		}
}

