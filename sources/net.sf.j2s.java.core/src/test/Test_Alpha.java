package test;

import java.applet.Applet;
import java.awt.AlphaComposite;
import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;


public class Test_Alpha extends Applet {
	public void init() {
		setBackground(Color.gray);
		setLayout(null);
	}
	
	public void paint(Graphics g) {
		super.paint(g);
		Graphics2D g2 = ((Graphics2D) g);
		g2.setStroke((new BasicStroke(0)));
		g.setColor(Color.blue);
		g.fillRect(20, 150, 340, 100);
		g2.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, 0.5f));
		g.setColor(Color.yellow);
		g.fillRect(100, 5, 50, 220);
		g.setColor(Color.red);
		g.fillRect(10, 80, 100, 100);
		
	}
}