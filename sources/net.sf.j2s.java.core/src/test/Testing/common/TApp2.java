package test.Testing.common;

import java.applet.Applet;
import java.awt.AlphaComposite;
import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GridLayout;
import java.awt.Label;
import java.awt.List;
import java.awt.Polygon;
import java.awt.Scrollbar;
import java.awt.TextArea;

import javax.swing.JLabel;
import javax.swing.JPanel;

import swingjs.JSGraphics2D;


public class TApp2 extends Applet {
	public void init() {
		List l = new List();
		l.add("Text");
		System.out.println(l.getItems());

		setBackground(Color.white);
		setLayout(null);
		JPanel panel = new JPanel();
		panel.setBounds(10, 10, 100, 150);
		add(panel);
		panel.setLayout(null);
		panel.setBackground(Color.red);
		JLabel label = new JLabel("OK");
		label.setBounds(10, 10, 50, 60);
		panel.add(label);
		
		JPanel panel2 = new JPanel();
		panel2.setLayout(new GridLayout(2, 1));
		Label label2 = new Label("1");
		label2.setAlignment(Label.CENTER);
		panel2.add(label2);
		panel2.add(new JLabel("2"));
		panel2.setBounds(200, 150, 100, 150);
//		add(panel2);
		
		TextArea ta = new TextArea("A text\nwith some\nlines and\n no content.");
		ta.setBounds(200, 70, 100, 80);
		add(ta);
//		ta.getSelectionEnd();
		ta.setBackground(Color.red);
		ta.appendText("A text\nwith some\nlines and\n no content.");
		
//		Scrollbar sb = new Scrollbar(0, 10, 0, 0, 1);
	}
	
	public void paint(Graphics g) {
		super.paint(g);
//		((Graphics2D) g).setStroke((new BasicStroke(0)));
//		g.drawRect(130, 150, 40, 60);
//		g.fillRect(140, 5, 1, 200);
//		g.drawLine(150, 150, 150, 350);
//
//		
//		
		
		
		
		
		
		g.setColor(Color.red);
		g.fillRect(10, 200, 100, 100);
		((Graphics2D)g).setComposite(AlphaComposite.Clear);
		g.setColor(Color.white);
		g.fillRect(10, 200, 100, 100);
	    g.setPaintMode();
		
		
//		
//		
//		Polygon poly = new Polygon();
//		poly.addPoint(10, 200);
//		poly.addPoint(110, 200);
//		poly.addPoint(110, 300);
//		poly.addPoint(10, 300);
//		g.setColor(Color.white);
//		g.fillPolygon(poly);
//		g.setColor(Color.blue);
//		g.fillPolygon(poly);
//

		
		
		
		
//		g.fillRect(10, 200, 100, 100);
//
//		
//		
//		
//		g.setColor(Color.red);
//		g.fillOval(200, 10, 10, 10);
//		g.setColor(Color.white);
//		g.fillOval(200, 10, 10, 10);
//
//		g.setColor(Color.red);
//		g.drawString("SwingJS", 200, 30);
//		g.setColor(Color.white);
//		g.drawString("SwingJS", 200, 30);
	}
}