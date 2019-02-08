package test;

import java.applet.Applet;
import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GridLayout;
import java.awt.Label;
import java.awt.List;
import java.awt.Polygon;
import java.awt.TextArea;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.event.CaretEvent;
import javax.swing.event.CaretListener;
import javax.swing.event.ChangeListener;
import javax.swing.text.DefaultCaret;

public class TApp2a extends Applet {
	public void init() {
		setSize(500,400);
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
		
		TextArea ta = new TextArea("This one is not scrolling down to the bottom\nA text\nwithsomeverylongline\nlines and\n no content.") {
			
		};
		ta.setBounds(200, 70, 100, 80);
		
		/**
		 * @j2sNative xxta = ta;
		 */
		add(ta);
//		ta.getSelectionEnd();
		ta.setBackground(Color.red);
		ta.appendText("A text\nwith some\nlines and\n no content.");
		
		
		JTextArea tb = new JTextArea("Jtextarea") {
			
		};
		tb.setBounds(200, 150, 100, 80);
		
		/**
		 * @j2sNative xxtb = tb;
		 */
		add(tb);
//		tb.getSelectionEnd();
		tb.setBackground(Color.yellow);
		tb.append(" a jtextarea ");
		tb.addCaretListener(new CaretListener() {

			@Override
			public void caretUpdate(CaretEvent e) {
				System.out.println("caret updated!");
				
			}
			
		});
		
		
		TextArea ta1 = new TextArea("A text\nwith some\nlines and\n no content.");
		ta1.setBounds(300, 70, 100, 80);
		add(ta1);
//		ta.getSelectionEnd();
		ta1.setBackground(Color.green);
		ta1.appendText("A text\nwith some\nlines and\n no content.This one is OK vertically, but not horizontally.");

		/**
		 * @j2sNative xxta1 = ta1;
		 */

		JButton bb = new JButton("move caret") {
			
		};
		bb.setBounds(300, 150, 100, 80);
		bb.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				ta1.setCaretPosition(Math.random()  > 0.5 ? ta1.getText().length() : 0);
				//	tb.requestFocus();
			}
			
		});
		add(bb);
//		tb.getSelectionEnd();
		tb.setBackground(Color.yellow);
		tb.append(" a jtextarea and a lot\n more text here to see what happens");
		tb.addCaretListener(new CaretListener() {

			@Override
			public void caretUpdate(CaretEvent e) {
				System.out.println("caret updated!");
				
			}
			
		});

		
		
		//		Scrollbar sb = new Scrollbar(0, 10, 0, 0, 1);
//		System.out.println(hexValueOf("01ab01cd8901ef23"));
		addMouseListener(new MouseListener() {

			@Override
			public void mouseClicked(MouseEvent arg0) {
				System.out.println("mouseClicked: " + arg0);
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
				System.out.println("mousePressed: " + e);
			}

			@Override
			public void mouseReleased(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}
			
		});
	}
	
    static String hexValueOf(String hex)  {   // converts hex format into BitSeq
        String s = "";
        String s1="";
        int l = hex.length();
        for (int i = 0; i<l;) {
           s1=Integer.toBinaryString(Integer.parseInt(hex.substring(i, ++i), 16));//Integer.valueOf(""+hex.charAt(i),16)).intValue());
           for ( int j = s1.length(); j<4; j++) {
              s1 = "0"+s1;
           }
        s=s+s1;
        }
        return s;
    }

    public void paint(Graphics g) {
		super.paint(g);
		((Graphics2D) g).setStroke((new BasicStroke(0)));
		g.drawRect(130, 150, 40, 60);
		g.fillRect(140, 5, 1, 200);
		g.drawLine(150, 150, 150, 350);
		
		g.setColor(Color.green);
		g.fillRect(10, 200, 100, 100);
		
		
		Polygon poly = new Polygon();
		poly.addPoint(10, 200);
		poly.addPoint(110, 200);
		poly.addPoint(110, 300);
		poly.addPoint(10, 300);
		g.setColor(Color.white);
		g.fillPolygon(poly);
		
		g.setColor(Color.blue);
		g.fillOval(200, 10, 10, 10);
		g.setColor(Color.white);
		g.fillOval(200, 10, 10, 10);

		g.setColor(Color.red);
		g.drawString("SwingJS", 200, 30);
		g.setColor(Color.white);
		g.drawString("SwingJS", 200, 30);
	}
}