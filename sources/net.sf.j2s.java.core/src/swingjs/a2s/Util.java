package swingjs.a2s;

import java.awt.Color;
import java.awt.Component;
import java.awt.Font;

public class Util {
//	public int junk =1;
//	static Color CONTROL = new Color(238,238,238); // #EEEEEE
//	static Color CONTROL_TEXT = new Color(51,51,51); // #333333
	static void setAWTWindowDefaults(Component c) {
		c.setBackground(Color.white);
		c.setForeground(Color.black);
		c.setFont(new Font(Font.DIALOG, Font.PLAIN, 12));
	}
//	
//	public static void drawString(Graphics g, String text, int x, int y) {
//		g.drawString(text,  x,  y);
//	}
}
