package test;

import java.awt.AlphaComposite;
import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Component;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.geom.Line2D;

import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JScrollBar;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;

public class TApp2_Swing extends JApplet {

	JTextArea ta;

	JButton b;
	private void addButtonTest() {
		for (int i = 0; i < 4; i++) {
			for (int j = 0; j < 4; j++) {
				b = new JButton("XyX");
				b.addFocusListener(new FocusListener() {

					@Override
					public void focusGained(FocusEvent e) {
						System.out.println("b " + e.paramString());
					}

					@Override
					public void focusLost(FocusEvent e) {
						System.out.println("b " + e.paramString());
					}

				});
				b.addActionListener(new ActionListener() {

					@Override
					public void actionPerformed(ActionEvent e) {
						System.out.println("action performed " + e.getSource());
					}
					
				});


				JLabel l = new JLabel("XyX", JLabel.CENTER);
				setLBBounds((Component) b, (Component) l, i, j);
			}
		}
	}

	private void setLBBounds(Component b, Component l, int i, int j) {
		int x = 40 + i * 170;
		int y = 350 + j * 40;
		int w = 70 + i * 10;
		int h = 25 + j * 4;
		b.setBounds(x, y, w, h);
		l.setBounds(x + 105, y, w - 30, h);
		b.setFont(new Font(Font.SANS_SERIF, Font.PLAIN, 10 + i * 3));
		l.setFont(new Font(Font.SANS_SERIF, Font.PLAIN, 10 + i * 3));
		l.setBackground(Color.cyan);
		((JComponent) l).setOpaque(true);
		add(b);
		add(l);
	}

	@Override
	public void init() {
		this.setLayout(null);
		getContentPane().setBackground(Color.red);
		setSize(800, 600);
		addButtonTest();

		setFont(new Font(Font.MONOSPACED, Font.PLAIN, 14));
		setBackground(Color.yellow);
		setLayout(null);
		JPanel panel = new JPanel();
		panel.setBounds(10, 10, 100, 150);
		add(panel);
		panel.setLayout(null);
		panel.setBackground(Color.red);
		panel.setForeground(Color.green);

		JComponent jc = new JComponent() {
	  		private static final long serialVersionUID = 1L;

				@Override
				public void paintComponent(Graphics g) {
	                Graphics2D g2 = (Graphics2D) g;
	                g2.setColor(Color.white);
//	                g2.setStroke(new BasicStroke(10));
	                g2.draw(new Line2D.Float(30, 20, 80, 90));
	                g2.fillRect(30, 20, 10, 100);
	            }
	        };
		jc.setBounds(50,50,150,150);
		jc.setBackground(Color.blue);
		jc.setOpaque(true);
		panel.add(jc);

		JPasswordField tf = new JPasswordField("Text");
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
		ta = new JTextArea("Averyvery\tvery\tveryveryveryveryverylongword\n" + "Averyveryveryveryveryveryveryverylongword\n"
				+ "Averyveryveryveryveryveryveryverylongword\n" + "Averyveryveryveryveryveryveryverylongword\n"
				+ "A text\nwith some\nlines and\n no content.") {
		};
		JScrollPane jsp = new JScrollPane(ta);
		Insets insets = jsp.getInsets();
		System.out.println("jsp offsets " + insets + jsp.getPeer());
		add(jsp);
		jsp.setBounds(200, 70, 200, 200);
		ta.setWrapStyleWord(true);
		// add(ta);
		// ta.setBounds(200, 70, 200,200);
		ta.setFont(new Font(Font.DIALOG, Font.BOLD, 20));
		//ta.setLineWrap(true);
		ta.setWrapStyleWord(false);
		jsp.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS);
		ta.append("A text\nwith some\nlines and\n no content.");
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
		JScrollBar sb = new JScrollBar(0, 30, 0, 0, 100);
		sb.setBounds(300, 20, 100, 20);
		add(sb);
		sb.addAdjustmentListener(new AdjustmentListener() {

			@Override
			public void adjustmentValueChanged(AdjustmentEvent e) {
				System.out.println("TApp2 sb value " + e.getValue());
			}

		});

		TApp2_Swing me = this;
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
				
				
				System.out.println(me.getFocusTraversalPolicy()); // javax.swing.LayoutFocusTraversalPolicy

				
				class f extends javax.swing.LayoutFocusTraversalPolicy {
					@Override
					public boolean accept(Component c) {
						return super.accept(c);
					}
				};
			
				class fd extends java.awt.DefaultFocusTraversalPolicy {
					@Override
					public boolean accept(Component c) {
						return super.accept(c);
					}
				};
			
				
				Component cc = ta;
				System.out.println(cc.isEnabled());
				System.out.println(cc.isVisible());
				System.out.println(cc.isDisplayable());
				System.out.println(cc.isFocusTraversable());
				System.out.println(cc.getPeer().isFocusable());

//	            JComponent jComponent = (JComponent)cc;
//	            InputMap inputMap = jComponent.getInp utMap(JComponent.WHEN_FOCUSED,
//	                                                       false);
//	            while (inputMap != null && inputMap.size() == 0) {
//	                inputMap = inputMap.getParent();
//	            }
//	            if (inputMap != null) {
//	                return true;
//	            }
//
//				
				
				System.out.println(me.getFocusTraversalPolicy());
		System.out.println("I am a focusRoot " + me.isFocusCycleRoot());
				System.out.println("acceptb " + new f().accept(b));
				System.out.println("acceptf " + new f().accept(getRootPane()));
				System.out.println("acceptfd " + new fd().accept(getRootPane()));
				Component c = me.getFocusTraversalPolicy().getFirstComponent(me);
				Component c0 = c;
				while (c != null) {
					System.out.println(c);
					c = me.getFocusTraversalPolicy().getComponentAfter(me, c);
					if (c == c0)
						break;
				}
				System.out.println("testing");
				
			}
			
		});

		new TestGraphic2(this).testGraphic();
	}

	static class TestGraphic2 {
		private TApp2_Swing tApp2;

		public TestGraphic2(TApp2_Swing tApp2) {
			this.tApp2 = tApp2;
		}

		static {
			ClassLoader.getSystemClassLoader().setDefaultAssertionStatus(true);
		}

		void testGraphic() {
			JButton b = new JButton("g");
			b.setBounds(300, 300, 40, 20);
			// images are created only when a button is displayable
			Image i1 = b.createImage(100, 100);
			System.out.println("b.isDisplayable " + b.isDisplayable() + " " + i1);
			b.addActionListener(new ActionListener() {

				@Override
				public void actionPerformed(ActionEvent e) {
					System.out.println("action performed " + e.getSource());
				}
				
			});
			b.addFocusListener(new FocusListener() {

				@Override
				public void focusGained(FocusEvent e) {
					System.out.println("b1 " + e.paramString());
				}

				@Override
				public void focusLost(FocusEvent e) {
					System.out.println("b1 " + e.paramString());
				}

			});
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
			System.out.println("Tapp2 OK");
		}
	}

	@Override
	public void paint(Graphics g) {
		super.paint(g);
		g.fillRect(20, 330, 100, 10);
		((Graphics2D) g).setStroke((new BasicStroke(0)));
		g.drawRect(130, 150, 40, 60);
		g.fillRect(140, 5, 1, 200);
		g.drawLine(150, 150, 150, 350);

		g.setColor(Color.blue);
		g.drawRoundRect(120, 200, 80, 150, 20, 20);

		g.fillRoundRect(510, 200, 80, 150, 20, 20);

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