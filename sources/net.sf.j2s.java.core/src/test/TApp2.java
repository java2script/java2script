package test;

import java.applet.Applet;
import java.awt.AlphaComposite;
import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GridLayout;
import java.awt.Label;
import java.awt.TextArea;

import javax.swing.JLabel;
import javax.swing.JPanel;

public class TApp2 extends Applet {
	
	TextArea ta;
	
	public void init() {
		setSize(400, 400);
		setBackground(Color.yellow);
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

//		// the scrolling to the bottom is only with TextArea, not JTextArea
		// and then only if the append is AFTER the add
		ta = new TextArea("A text\nwith some\nlines and\n no content.");
		add(ta);
		ta.setBounds(200, 70, 100, 80);
		ta.appendText("A text\nwith some\nlines and\n no content.");

		
//		TextArea ta = new TextArea("A text\nwith some\nlines and\n no content.");
//		JScrollPane sp = new JScrollPane(ta);
//		sp.setBounds(200, 70, 100, 80);
//		add(sp);

		
		//		ta.getSelectionEnd();
		ta.setBackground(Color.red);
//		Scrollbar sb = new Scrollbar(0, 10, 0, 0, 1);
	}

	public void paint(Graphics g) {
		super.paint(g);
		g.fillRect(20, 330, 100, 10);
		((Graphics2D) g).setStroke((new BasicStroke(0)));
		g.drawRect(130, 150, 40, 60);
		g.fillRect(140, 5, 1, 200);
		g.drawLine(150, 150, 150, 350);

		g.setColor(Color.blue);
		g.drawRoundRect(120, 200, 80, 150, 20, 20);

		g.fillRoundRect(210, 200, 80, 150, 20, 20);

		// test AlphaComposite.Clear

		g.setColor(Color.red);
		g.fillRect(10, 200, 100, 100);
		((Graphics2D) g).setComposite(AlphaComposite.Clear);
		// save the foreground color, but don't use it.
		g.setColor(Color.orange);
		// paints a black rectangle
		g.fillRect(10, 200, 100, 100);
		g.setPaintMode();
		g.fillRect(20, 220, 100, 100);

		// test g.clearRect();

		g.clearRect(0, 240, 150, 20);

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