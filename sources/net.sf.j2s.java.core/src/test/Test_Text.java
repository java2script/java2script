package test;

import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.font.FontRenderContext;
import java.awt.font.TextLayout;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;

import javax.swing.JFrame;

/**
 * Just produces a listing of font metrics
 * 
 * @author hansonr
 *
 */
public class Test_Text extends JFrame {

	
	Test_Text() {
		
		setPreferredSize(new Dimension(300,300));
		pack();
		setVisible(true);
	}
	
	public void paint(Graphics g) {

		Graphics2D g2 = (Graphics2D) g;
		
		Point2D loc = new Point2D.Double();
	    Font font = getFont();//Font.getFont("Helvetica-bold-italic");
	    FontRenderContext frc = g2.getFontRenderContext();
	    TextLayout layout = new TextLayout("This is a string", font, frc);
	    layout.draw(g2, (float)loc.getX(), (float)loc.getY());
	    Rectangle2D bounds = layout.getBounds();
	    System.out.println(bounds);
	    System.exit(0);
	  		
	}
	
	public static void main(String[] args) {


		new Test_Text().repaint();

	}
}
