package test;

import java.applet.Applet;
import java.awt.AlphaComposite;
import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GridLayout;
import java.awt.Label;
import java.awt.Scrollbar;
import java.awt.TextArea;
import java.awt.TextField;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.JLabel;
import javax.swing.JPanel;

public class TApp2 extends Applet {
	
	TextArea ta;
	
	public void init() {
		setSize(400, 400);
		setFont(new Font(Font.MONOSPACED, Font.PLAIN, 14));
		setBackground(Color.yellow);
		setLayout(null);
		JPanel panel = new JPanel();
		panel.setBounds(10, 10, 100, 150);
		add(panel);
		panel.setLayout(null);
		panel.setBackground(Color.red);
		panel.setForeground(Color.green);
		TextField tf = new TextField("Text");
		tf.setBounds(5, 5, 50, 24);
		tf.setFont(new Font(Font.SANS_SERIF, Font.PLAIN, 20));
		panel.add(tf);
//		Label label = new Label("blue", Label.RIGHT);
//		label.setBounds(10, 10, 50, 60);
//		panel.add(label);
//		JPanel panel2 = new JPanel();
//		panel2.setLayout(new GridLayout(2, 1));
//		Label label2 = new Label("1");
//		label2.setAlignment(Label.CENTER);
//		panel2.add(label2);
//		panel2.add(new JLabel("2"));
//		panel2.setBounds(200, 150, 100, 150);
////		add(panel2);
//
//		// the scrolling to the bottom is only with TextArea, not JTextArea
		// and then only if the append is AFTER the add
		ta = new TextArea("A text\nwith some\nlines and\n no content.");
		add(ta);
		ta.setBounds(200, 70, 150, 150);
		ta.setFont(new Font(Font.DIALOG, Font.BOLD, 20));
		ta.appendText("A text\nwith some\nlines and\n no content.");

		
//		TextArea ta = new TextArea("A text\nwith some\nlines and\n no content.");
//		JScrollPane sp = new JScrollPane(ta);
//		sp.setBounds(200, 70, 100, 80);
//		add(sp);

		
		//		ta.getSelectionEnd();
		ta.setBackground(Color.red);
		Scrollbar sb = new Scrollbar(0, 30, 0, 0, 100);
		sb.setBounds(300, 20, 100, 20);
		add(sb);
		sb.addAdjustmentListener(new AdjustmentListener() {

			@Override
			public void adjustmentValueChanged(AdjustmentEvent e) {
				System.out.println("TApp2 sb value " + e.getValue());
			}
			
		});
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
		
		
		addMouseListener(new MouseListener() {

			@Override
			public void mouseClicked(MouseEvent e) {
				System.out.println(">>>>mouseClicked: " + e.getModifiers() + " " + e.getModifiersEx() + " " + e);
			}

			@Override
			public void mouseEntered(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void mouseExited(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void mousePressed(MouseEvent e) {
				System.out.println(">>>>mousePressed: " + e.getModifiers() + " " + e.getModifiersEx() + " " + e);
			}

			@Override
			public void mouseReleased(MouseEvent e) {
				System.out.println(">>>>mouseReleased: " + e.getModifiers() + " " + e.getModifiersEx() + " " + e);
			}
			
		});

	}
}