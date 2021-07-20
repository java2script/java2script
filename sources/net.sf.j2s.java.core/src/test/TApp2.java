package test;

import java.applet.Applet;
import java.awt.AlphaComposite;
import java.awt.BasicStroke;
import java.awt.Button;
import java.awt.Color;
import java.awt.Component;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Label;
import java.awt.Scrollbar;
import java.awt.TextArea;
import java.awt.TextField;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.TextEvent;
import java.awt.event.TextListener;
import javax.swing.JPanel;

public class TApp2 extends Applet {

	TextArea ta;

	private void addButtonTest() {
		for (int i = 0; i < 4; i++) {
			for (int j = 0; j < 4; j++) {
				Button b = new Button("XyX");
				Label l = new Label("XyX", Label.CENTER);
				TextField tf = new TextField("XyX");
				setLBBounds(b, l, tf, i, j);
			}
		}
	}

	private void setLBBounds(Component b, Component l, Component tf, int i, int j) {
		int x = 40 + i * 260;
		int y = 350 + j * 40;
		int w = 70 + i * 10;
		int h = 25 + j * 4;
		b.setFont(new Font(Font.SANS_SERIF, Font.PLAIN, 10 + i * 3));
		l.setFont(new Font(Font.SANS_SERIF, Font.PLAIN, 10 + i * 3));
		tf.setFont(new Font(Font.SANS_SERIF, Font.PLAIN, 10 + i * 3));
		add(b);
		add(l);
		add(tf);
		w = b.getPeer().getMinimumSize().width;
		h = b.getPeer().getMinimumSize().height;
		b.setBounds(x, y,w , h);
		w = l.getPeer().getMinimumSize().width;
		h = l.getPeer().getMinimumSize().height;
		l.setBounds(x + 105, y, w, h);
		w = tf.getMinimumSize().width;
		h = tf.getMinimumSize().height;
		tf.setBounds(x + 200, y, w, h);
		l.setBackground(Color.cyan);
	}

	long t;
	
	public void init() {
		setSize(800, 600);
		setFont(new Font(Font.MONOSPACED, Font.PLAIN, 14));
		setBackground(Color.yellow);
		setLayout(null);

		addButtonTest();

		JPanel panel = new JPanel();
		panel.setBounds(10, 10, 100, 150);
		add(panel);
		panel.setLayout(null);
		panel.setBackground(Color.red);
		panel.setForeground(Color.green);
		TextField tf = new TextField("Text");
		tf.setBounds(5, 5, 50, 24);
		tf.setFont(new Font(Font.SANS_SERIF, Font.PLAIN, 20));
		tf.addFocusListener(new FocusListener() {

			@Override
			public void focusGained(FocusEvent e) {
				System.out.println("tf " + e.paramString());
			}

			@Override
			public void focusLost(FocusEvent e) {
				System.out.println("tf " + e.paramString());
			}

		});
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
		ta = new TextArea("Averyveryveryveryveryveryveryverylongword\n" + "Averyveryveryveryveryveryveryverylongword\n"
				+ "Averyveryveryveryveryveryveryverylongword\n" + "Averyveryveryveryveryveryveryverylongword\n"
				+ "A text\nwith some\nlines and\n no content.", 40, 40, TextArea.SCROLLBARS_VERTICAL_ONLY);
		add(ta);
		ta.addTextListener(new TextListener(){

			@Override
			public void textValueChanged(TextEvent e) {
				System.out.println("value changed" + e);
			}
			
		});
		ta.setBounds(200, 70, 200, 200);
		ta.setFont(new Font(Font.DIALOG, Font.BOLD, 20));
		ta.appendText("A text\nwith some\nlines and\n no content.");
		ta.addKeyListener(new KeyListener() {

			@Override
			public void keyTyped(KeyEvent e) {
				System.out.println("keyTyped");
			}

			@Override
			public void keyPressed(KeyEvent e) {
				System.out.println("keypressed " + e);
			}

			@Override
			public void keyReleased(KeyEvent e) {
				System.out.println("keyReleased");
				
			}
			
		});
		ta.addFocusListener(new FocusListener() {

			@Override
			public void focusGained(FocusEvent e) {
				System.out.println("ta " + e.paramString());
			}

			@Override
			public void focusLost(FocusEvent e) {
				System.out.println("ta " + e.paramString());
			}

		});

//		TextArea ta = new TextArea("A text\nwith some\nlines and\n no content.");
//		JScrollPane sp = new JScrollPane(ta);
//		sp.setBounds(200, 70, 100, 80);
//		add(sp);

		// ta.getSelectionEnd();
		ta.setBackground(Color.red);
		Scrollbar sb = new Scrollbar(0, 30, 0, 0, 100);
		sb.setBounds(300, 20, 100, 20);
		add(sb);
		sb.setBackground(Color.white); // can be set after!
		sb.addAdjustmentListener(new AdjustmentListener() {

			@Override
			public void adjustmentValueChanged(AdjustmentEvent e) {
				long time = System.currentTimeMillis();
				System.out.println("TApp2 sb value " + e.getValue() + " " + (time - t));
				t = time;
			}

		});

		sb.setForeground(Color.red);
		
		
		
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

		new TestGraphic(this).testGraphic();
	}

	static class TestGraphic {
		private TApp2 tApp2;

		public TestGraphic(TApp2 tApp2) {
			this.tApp2 = tApp2;
		}

		static {
			ClassLoader.getSystemClassLoader().setDefaultAssertionStatus(true);
		}

		void testGraphic() {
			Button b = new Button("MyM");
			b.setBounds(300, 300, 40, 20);
			// images are created only when a button is displayable
			Image i1 = b.createImage(100, 100);
			System.out.println("b.isDisplayable " + b.isDisplayable() + " " + i1);
			assert (i1 == null);
			tApp2.add(b);
			i1 = b.createImage(100, 100);
			System.out.println("b.isDisplayable " + b.isDisplayable() + " " + i1);
			b.setFont(new Font(Font.SERIF, Font.BOLD, 10));
			Graphics g = i1.getGraphics();
			Font f = g.getFont();
			System.out.println(f);

			
			// font/background/foreground are set when the graphic is created
			Font f0 = new Font(Font.DIALOG, Font.PLAIN, 30);
			b.setFont(f0);
			b.setBackground(Color.red);
			b.setForeground(Color.green);
			g = i1.getGraphics();
			b.setFont(new Font(Font.SERIF, Font.BOLD, 10));
			b.setBackground(Color.white);
			b.setForeground(Color.black);
			System.out.println("img font=" + g.getFont());
			System.out.println("img bg=" + ((Graphics2D) g).getBackground());
			System.out.println("img fg=" + g.getColor());
			assert (g.getFont().equals(f0));
			assert (g.getColor() == Color.green);
			assert (((Graphics2D) g).getBackground() == Color.red);
			
			
			b = new Button("XXX");
			b.setBounds(500, 100, 100, 100);
			tApp2.add(b);
			b.addActionListener(new ActionListener() {

				@Override
				public void actionPerformed(ActionEvent e) {
					System.out.println("caret before: " + tApp2.ta.getCaretPosition());
					tApp2.ta.appendText("XXXXXXXXXXXXX ");
					System.out.println("caret after: " + tApp2.ta.getCaretPosition());
				}
				
			});

			System.out.println("Tapp2 OK");
		}
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
