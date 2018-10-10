package test;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Container;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GridLayout;
import java.awt.Label;

import javax.swing.JApplet;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JPanel;


public class TApp2 extends JApplet {
	public void init() {
		setSize(500,500);
		getContentPane().setBackground(Color.yellow);
		setLayout(null);
		JPanel panel = new JPanel();
		panel.setBounds(10, 10, 100, 150);
		add(panel);
		panel.setLayout(null);
		panel.setBackground(Color.red);
		JLabel label = new JLabel("OK-netTapp2");
		label.setBounds(10, 10, 50, 60);
		panel.add(label);
		
		JPanel panel2 = new JPanel();
		panel2.setLayout(new GridLayout(2, 1));
		Label label1 = new Label("1");
		label1.setAlignment(Label.CENTER);
		panel2.add(label1);
		label1.setSize(50,15);		
		panel2.add(new JLabel("2"));
		panel2.setBounds(200, 150, 100, 150);
		add(panel2);
	}
	
	public void paint(Graphics g) {
		super.paint(g);
		((Graphics2D) g).setStroke((new BasicStroke(0)));
		g.drawRect(130, 150, 40, 60);
		g.fillRect(140, 5, 1, 200);
		g.drawRect(160, 5, 1, 200);
		g.drawLine(150, 150, 150, 350);
		g.drawString("testing123", 50, 200);
	}
}
