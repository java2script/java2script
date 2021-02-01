package test;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.ComponentOrientation;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.Insets;
import java.awt.Label;
import java.awt.MediaTracker;
import java.awt.MenuItem;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.InputEvent;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseWheelEvent;
import java.awt.event.MouseWheelListener;
import java.lang.reflect.InvocationTargetException;
import java.net.URL;

import javax.swing.AbstractButton;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JCheckBoxMenuItem;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JRadioButton;
import javax.swing.JRadioButtonMenuItem;
import javax.swing.JTextField;
import javax.swing.KeyStroke;
import javax.swing.MenuElement;
import javax.swing.MenuSelectionManager;
import javax.swing.SwingConstants;
import javax.swing.WindowConstants;
import javax.swing.border.CompoundBorder;
import javax.swing.border.LineBorder;
import javax.swing.border.TitledBorder;
import javax.swing.event.MenuEvent;
import javax.swing.event.MenuListener;

/**
 * A class with a main method entry point for ad hoc tests of JalviewJS
 * behaviour. The J2S transpiler should generate an html entry point for this
 * class, allowing comparison between Java and Javascript execution.
 */
public class JalviewJSTest extends JPanel implements MenuListener, ItemListener {

	public static final int SHIFT_DOWN_MASK;
	public static final int ALT_DOWN_MASK;
	public static final int SHORTCUT_MASK;

	boolean isAll = true;

	static {
		float modern = 11;

		float specversion = /** @j2sNative 1.8 || */
				Float.parseFloat(System.getProperty("java.specification.version"));

		// BH technically, these are not masks; they are bits.
		if (specversion >= modern) {
			SHIFT_DOWN_MASK = 0x040; // KeyEvent.SHIFT_DOWN_MASK;
			ALT_DOWN_MASK = 0x200; // KeyEvent.ALT_DOWN_MASK;

		} else {
			SHIFT_DOWN_MASK = 0x01; // KeyEvent.SHIFT_MASK;
			ALT_DOWN_MASK = 0x08; // KeyEvent.ALT_MASK;
		}

		int mask = 0;
		try {
			Toolkit tk = Toolkit.getDefaultToolkit();
			mask = (int) tk.getClass()
					.getMethod(specversion >= modern ? "getMenuShortcutKeyMaskEx" : "getMenuShortcutKeyMask",
							new Class<?>[0])
					.invoke(tk);
		} catch (Exception e) {
			System.out.println(e);
		}

		SHORTCUT_MASK = mask;

		System.out.println("ShortcutKey: " + specversion + " " + SHIFT_DOWN_MASK + " " + ALT_DOWN_MASK + " "
				+ SHORTCUT_MASK + " " + Toolkit.getDefaultToolkit().getMenuShortcutKeyMask());
	}

	public static void main(String[] args) {
		new JalviewJSTest().doTest();
	}

	private JMenuItem mb5;
	private JMenuItem testbtn;

	JMenuBar mb = new JMenuBar();
	JFrame frame = new JFrame("JalviewJSTest") {

		public void invalidate() {
			System.out.println("frame invalidate");
			super.invalidate();
		}

	};
	JMenu mRight = new JMenu("right") {
		@Override
		// TODO NOT WORKING IN JAVASCRIPT
		public void processKeyEvent(KeyEvent e, MenuElement[] path, MenuSelectionManager m) {
			System.out.println("RIGHT JMenu path length=" + path.length + " key=" + e.getKeyCode());
			for (int i = 0; i < path.length; i++)
				System.out.println("[" + i + "]" + path[i].getClass().getName() + "  "
						+ (path[i] instanceof JMenuItem ? ((JMenuItem) path[i]).getText() : ""));
			super.processKeyEvent(e, path, m);
		}
	};

	int nAction = 0;

	ActionListener listener = new ActionListener() {

		@Override
		public void actionPerformed(ActionEvent e) {
			System.err.println("actionPerformed: " + (++nAction) + " " + e);
			status.setText(status.getText() == "" ? "OK" : "");
		}

	};

	MouseListener mlistener = new MouseListener() {

		@Override
		public void mouseClicked(MouseEvent e) {
			System.out.println("mouseEvent: " + e);
		}

		@Override
		public void mousePressed(MouseEvent e) {
			System.out.println("mouseEvent: " + e);
		}

		@Override
		public void mouseReleased(MouseEvent e) {
			System.out.println("mouseEvent: " + e);
		}

		@Override
		public void mouseEntered(MouseEvent e) {
			// TODO Auto-generated method stub

		}

		@Override
		public void mouseExited(MouseEvent e) {
			// TODO Auto-generated method stub

		}

	};
	
	KeyListener keyListener = new KeyListener() {

		@Override
		public void keyTyped(KeyEvent e) {
			System.out.println(e);
			System.out.println(0 + e.getKeyChar());
		}

		@Override
		public void keyPressed(KeyEvent e) {
			System.out.println(e);
		}

		@Override
		public void keyReleased(KeyEvent e) {
			System.out.println(e);
		}
		
	};
	
	private JLabel status;
	private JMenu menu, menu1, menu2;
	private JCheckBoxMenuItem cb4m, cb1m, cb2m;

	/**
	 * Put some content in a JFrame and show it
	 */
	void doTest() {
		if (isAll) {
			// JInternalFrame main = new JInternalFrame();

			frame.addKeyListener(keyListener);

			frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

			menu = new JMenu("TESTING");

			menu.addMenuListener(new MenuListener() {

				@Override
				public void menuSelected(MenuEvent e) {
					System.out.println("menu MenuListener sel " + e);
				}

				@Override
				public void menuDeselected(MenuEvent e) {
					System.out.println("menu MenuListener des " + e);
				}

				@Override
				public void menuCanceled(MenuEvent e) {
					System.out.println("menu MenuListener can " + e);
				}

			});

			menu1 = new JMenu("testing1");
			menu2 = new JMenu("testing2");
			menu.setHorizontalAlignment(SwingConstants.RIGHT);

			frame.setJMenuBar(mb);
			mb.add(menu);
			mb.add(menu1);
			mb.add(menu2);
			frame.setContentPane(getVisualPaneContent(menu, menu1, menu2));
			frame.pack();
			System.out.println(frame.getContentPane());
			// frame.setBackground(Color.blue);
			// note -- this blue color is never seen
			JPopupMenu pmenu = new JPopupMenu();
			JMenuItem b = new JMenuItem("testing1");
			b.addActionListener(listener);
			pmenu.add(b);
			b = new JMenuItem("testing2");
			b.addActionListener(listener);
			pmenu.add(b);
			b = new JMenuItem("testing3");
			b.addActionListener(listener);
			pmenu.add(b);
			final JMenuItem bb = b;

			frame.addMouseListener(new MouseListener() {

				@Override
				public void mouseClicked(MouseEvent e) {

//				frame.dispose();
//				System.out.println("frame after dispose " + frame.isValid());
//				frame.show();
//				
				}

				@Override
				public void mousePressed(MouseEvent e) {
					System.out.println(frame.getContentPane().getSize());
					frame.getContentPane().setBackground(Color.yellow);
					System.out.println(frame.getContentPane());
					System.out.println(frame.getContentPane().getComponent(0));
					System.out.println(frame.getContentPane().getComponent(0).getBackground());

					((JPanel) frame.getContentPane()).setOpaque(true);

					invalidate();
					repaint();
					// System.out.println(e.getButton());
					if (e.getButton() != MouseEvent.BUTTON3)
						return;
					int n = pmenu.getComponentCount();
					if (n > 1)
						pmenu.remove(n - 1);
					pmenu.show(frame, e.getX(), e.getY() - 10);
				}

				@Override
				public void mouseReleased(MouseEvent e) {
					// System.out.println(e.getButton());
					if (e.getButton() != MouseEvent.BUTTON3)
						return;
					int n = pmenu.getComponentCount();
					if (n > 1)
						pmenu.remove(n - 1);
					pmenu.show(frame, e.getX(), e.getY() - 10);
				}

				@Override
				public void mouseEntered(MouseEvent e) {
					// TODO Auto-generated method stub

				}

				@Override
				public void mouseExited(MouseEvent e) {
					// TODO Auto-generated method stub

				}

			});

			frame.addMouseWheelListener(new MouseWheelListener() {

				@Override
				public void mouseWheelMoved(MouseWheelEvent e) {

					System.out.println("mouse wheel " + e.getModifiers() + " " + e.isShiftDown());
				}
			});

			frame.setVisible(true);
		}
//		JDesktopPane d = new JDesktopPane();
//		d.setPreferredSize(new Dimension(600,300));
//		d.add(main);
//		JFrame top = new JFrame();
//		top.setContentPane(d);
//		top.setBounds(100,100, 600, 600);
//		top.pack();
//		top.setVisible(true);

	}

	/**
	 * Builds a cut-down 'Preferences Visual tab' for a minimal test of layout
	 * problems
	 * 
	 * @param menu
	 */
	Container getVisualPaneContent(JMenu menu, JMenu menu1, JMenu menu2) {

		Font font = new Font("Verdana", Font.PLAIN, 12);

		JPanel panel = new JPanel();
		panel.setName("top-blue");
		panel.setPreferredSize(new Dimension(600, 600));
		panel.setMaximumSize(new Dimension(600, 600));
		panel.setOpaque(true);
		panel.setBackground(Color.blue);
		panel.setLayout(new BorderLayout());
		panel.add(status = new JLabel("ok"), BorderLayout.SOUTH);
		
		
		JPanel firstColumn = new JPanel();
		firstColumn.setLayout(new GridLayout(14, 1));
		firstColumn.setBorder(new TitledBorder("column 1"));
		firstColumn.setBounds(100, 40, 200, 500);
		JPanel theTab = new JPanel();

		if (isAll) {
			panel.add(status = new JLabel("ok"), BorderLayout.SOUTH);
			getAllbuttons(font, firstColumn);
		} else {
			getAlignmentButtons(font, firstColumn);
		}
		theTab.setLayout(null);
		theTab.setBackground(Color.GREEN);
		theTab.add(firstColumn);
		panel.add(theTab);
		return panel;
	}

	private void getAlignmentButtons(Font font, JPanel firstColumn) {
		// all combinations of text position work with valign center and top
		addButton(font, firstColumn, "cclc", SwingConstants.CENTER , SwingConstants.CENTER,
				SwingConstants.LEFT, SwingConstants.TOP);
		//............................................. vAlign.................hAlign
		addButton(font, firstColumn, "bccc", SwingConstants.BOTTOM , SwingConstants.CENTER,
				//......hPos.................vPos
				SwingConstants.CENTER, SwingConstants.CENTER);
		addButton(font, firstColumn, "bclc", SwingConstants.BOTTOM , SwingConstants.CENTER,
				SwingConstants.LEFT, SwingConstants.CENTER);
		addButton(font, firstColumn, "bcrc", SwingConstants.BOTTOM , SwingConstants.CENTER,
				SwingConstants.RIGHT, SwingConstants.CENTER);
		
		addButton(font, firstColumn, "bcct", SwingConstants.BOTTOM , SwingConstants.CENTER,
				SwingConstants.CENTER, SwingConstants.TOP);
		addButton(font, firstColumn, "bccb", SwingConstants.BOTTOM , SwingConstants.CENTER,
				SwingConstants.CENTER, SwingConstants.BOTTOM);
		
		addButton(font, firstColumn, "bclt", SwingConstants.BOTTOM , SwingConstants.CENTER,
				SwingConstants.LEFT, SwingConstants.TOP);
		addButton(font, firstColumn, "bclb", SwingConstants.BOTTOM , SwingConstants.CENTER,
				SwingConstants.LEFT, SwingConstants.BOTTOM);
		
		addButton(font, firstColumn, "bcrt", SwingConstants.BOTTOM , SwingConstants.CENTER,
				SwingConstants.RIGHT, SwingConstants.TOP);
		addButton(font, firstColumn, "bcrb", SwingConstants.BOTTOM , SwingConstants.CENTER,
				SwingConstants.RIGHT, SwingConstants.BOTTOM);
	}

	private void addButton(Font font, JPanel firstColumn, String label, int vAlign, int hAlign, int hTextPos, int vTextPos) {
		JButton c = new JButton(getImage("triangle_down.gif"));
		c.setText(label);
		c.setFont(font);
		c.setVerticalAlignment(vAlign);
		c.setHorizontalAlignment(hAlign);
		c.setHorizontalTextPosition(hTextPos);
		c.setVerticalTextPosition(vTextPos);
//		c.setMargin(new Insets(3,15,3,15));
		c.setBorder(new LineBorder(Color.red, 1));
		c.setIconTextGap(1);
		firstColumn.add(c);
	}

	private void getAllbuttons(Font font, JPanel firstColumn) {
		JTextField t1 = new JTextField("testing");
		t1.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("t1 is " + t1.getText());
			}

		});
		t1.addKeyListener(keyListener);
		JLabel l1 = new JLabel(getImage("test3.png"));
		l1.setText("trailing right");
		l1.setHorizontalTextPosition(SwingConstants.TRAILING);
		l1.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
		l1.setHorizontalAlignment(SwingConstants.RIGHT);
		firstColumn.add(t1);
		firstColumn.add(l1);
		Label awtlabel = new Label("AWT");
		awtlabel.setFont(font);
		awtlabel.setAlignment(Label.LEFT);
//	firstColumn.add(awtlabel);
		awtlabel.setBackground(Color.white);

		JButton b1 = new JButton("right left");
		b1.setIcon(getImage("test2.png"));
		b1.setFont(font);
		// totally ignored
		// b1.setMargin(new Insets(5,35,5,5));
		// b1.setBorder(null);
		b1.setHorizontalTextPosition(SwingConstants.RIGHT);
		b1.setHorizontalAlignment(SwingConstants.LEFT);
		
		Insets i = (b1.getBorder() instanceof CompoundBorder
				? ((CompoundBorder) b1.getBorder()).getOutsideBorder().getBorderInsets(b1)
				: b1.getInsets());

		Insets ii = (b1.getBorder() instanceof CompoundBorder
				? ((CompoundBorder) b1.getBorder()).getInsideBorder().getBorderInsets(b1)
				: null);

		System.out.println(b1.getBorder() + "\n" +

				i + "\n" + ii + "\n" + b1.getInsets() + "\n" + b1.getMargin());

		System.out.println(b1.getPreferredSize());
		JCheckBox cb3 = new JCheckBox("leading,left-to-right,rt"
		// , getImage("test2.png"));
//TODO -- this did not update the button properly
		);
		cb3.setIcon(getImage("test2.png"));
		cb3.setFont(font);
		cb3.addActionListener((e) -> {
			System.out.println("cb3 checked " + cb3.isSelected());

		});
		cb3.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
		cb3.setHorizontalTextPosition(SwingConstants.LEADING);
		cb3.setHorizontalAlignment(SwingConstants.TRAILING);

		JCheckBox cb4 = new JCheckBox("leading,right-to-left");
		cb4.setFont(font);
		cb4.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		cb4.setHorizontalTextPosition(SwingConstants.LEADING);

		JCheckBox cb5 = new JCheckBox("trailing,left-to-right");
		cb5.setFont(font);
		cb5.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
		cb5.setHorizontalTextPosition(SwingConstants.TRAILING);

		JRadioButton rb1 = new JRadioButton("rb1");
		rb1.addKeyListener(keyListener);

		rb1.setFont(font);
//	rb1.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
//	rb1.setHorizontalTextPosition(SwingConstants.TRAILING);

		JRadioButton rb2 = new JRadioButton("rb2");
		rb2.setFont(font);
//	rb2.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
//	rb2.setHorizontalTextPosition(SwingConstants.RIGHT);

		JRadioButton rb3 = new JRadioButton("right,r2l");
		rb3.setFont(font);
		rb3.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		rb3.setHorizontalTextPosition(SwingConstants.RIGHT);
		firstColumn.add(b1);
		firstColumn.add(cb3);
		firstColumn.add(cb4);
		firstColumn.add(cb5);
		firstColumn.add(rb1);
		firstColumn.add(rb2);
		firstColumn.add(rb3);
		JMenuItem cb3m = new JMenuItem("tooltiptest");// XXleading,left-to-rightXX");
		cb3m.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_A, InputEvent.CTRL_DOWN_MASK));
		cb3m.setToolTipText("THIS IS A TEST");
		cb3m.setFont(font);
		cb3m.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
		cb3m.setHorizontalTextPosition(SwingConstants.LEADING);
		cb3m.addActionListener(listener);

		cb4m = new JCheckBoxMenuItem("CB4XXleading,right-to-leftXX", getImage("test2.png")) {

			@Override
			public void doClick() {
				super.doClick();
				System.out.println("JalviewJSTest checkbox Clicked!" + getState());
			}
		};
		cb4m.setMnemonic('X');
		cb4m.setDisplayedMnemonicIndex(1);
		cb4m.setFont(font);
		cb4m.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		cb4m.setHorizontalTextPosition(SwingConstants.LEADING);
		cb4m.addActionListener(listener);
//		cb4m.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_N,
//				ActionEvent.ALT_MASK | ActionEvent.CTRL_MASK | ActionEvent.SHIFT_MASK));

		cb4m.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_C, InputEvent.CTRL_DOWN_MASK));

		

		JCheckBoxMenuItem cb5m = new JCheckBoxMenuItem("XXCb5mtrailing,left-to-rightXX"
		// ) {
				, getImage("test2.png")) {
			@Override
			public void processKeyEvent(KeyEvent e, MenuElement[] path, MenuSelectionManager m) {
				System.out.println("CB5M JMenu path length=" + path.length + " key=" + e.getKeyCode());
				for (int i = 0; i < path.length; i++)
					System.out.println("[" + i + "]" + path[i].getClass().getName() + "  "
							+ (path[i] instanceof JMenuItem ? ((JMenuItem) path[i]).getText() : ""));
				super.processKeyEvent(e, path, m);
			}
		};

		cb5m.setFont(font);
		cb5m.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
		cb5m.setHorizontalTextPosition(SwingConstants.TRAILING);
		addListeners(cb5m);

		JCheckBoxMenuItem cb6m = new JCheckBoxMenuItem("XXtrailing,r2l1XX");
		cb6m.setFont(font);
		cb6m.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		cb6m.setHorizontalTextPosition(SwingConstants.TRAILING);
		addListeners(cb6m);

		JRadioButtonMenuItem rb1m = new JRadioButtonMenuItem("XXtrailing,r2l2XX");
		rb1m.setFont(font);
		rb1m.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		rb1m.setHorizontalTextPosition(SwingConstants.TRAILING);
		addListeners(rb1m);

		JRadioButtonMenuItem rb2m = new JRadioButtonMenuItem("XXright,left-to-rightXX");
		rb2m.setFont(font);
		rb2m.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
		rb2m.setHorizontalTextPosition(SwingConstants.RIGHT);
		addListeners(rb2m);
		rb2m.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_B, ActionEvent.CTRL_MASK));

		JRadioButtonMenuItem rb3m = new JRadioButtonMenuItem("XXright,r21XX");
		rb3m.setFont(font);
		rb3m.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		rb3m.setHorizontalTextPosition(SwingConstants.RIGHT);
		addListeners(rb3m);

		JMenuItem mb3 = new JMenuItem("XXright,right-2-left2XX");
		mb3.setFont(font);
		mb3.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		mb3.setHorizontalTextPosition(SwingConstants.RIGHT);
		addListeners(mb3);

		JMenuItem mb4 = new JMenuItem("XXright,right-to-left3XX");
		mb4.setFont(font);
		mb4.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		mb4.setHorizontalTextPosition(SwingConstants.RIGHT);
		addListeners(mb4);

		mb5 = new JMenuItem("XXadded r2l,rXX");
		mb5.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_M, ActionEvent.ALT_MASK));
		mb5.setFont(font);
		mb5.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		mb5.setHorizontalTextPosition(SwingConstants.RIGHT);
		addListeners(mb5);

		JMenu m1 = new JMenu("left") {
			@Override
			public void processKeyEvent(KeyEvent e, MenuElement[] path, MenuSelectionManager m) {
				System.out.println("LEFT JMenu path length=" + path.length + " key=" + e.getKeyCode());
				for (int i = 0; i < path.length; i++)
					System.out.println("[" + i + "]" + path[i].getClass().getName() + "  "
							+ (path[i] instanceof JMenuItem ? ((JMenuItem) path[i]).getText() : ""));
				// consuming the event preclude any further key processing.
				// other than that, I don't see the use of this.
				// path[] is to this
				// e.consume();
				super.processKeyEvent(e, path, m);
			}
		};
		m1.addMenuListener(new MenuListener() {

			private boolean haveCb4m;
			private JMenuItem cb4m2;

			@Override
			public void menuSelected(MenuEvent e) {
				JMenu m = (JMenu) e.getSource();
				if (haveCb4m) {
					m.remove(cb4m);
				} else {
					m.add(cb4m);
					m.add(cb4m);
					if (cb4m2 == null)
						cb4m2 = new JMenuItem("testing");
					m.add(cb4m2);
				}
				haveCb4m = !haveCb4m;

			}

			@Override
			public void menuDeselected(MenuEvent e) {
			}

			@Override
			public void menuCanceled(MenuEvent e) {
			}

		});

		m1.setMnemonic('l');
		m1.setFont(font);
		m1.addMenuListener(this);
		m1.add(rb2m);
		menu.add(m1);

		menu1.add(cb4m);
		menu1.add(cb3m);
		menu1.add(new JCheckBoxMenuItem("cb2a"));
		menu1.add(new JCheckBoxMenuItem("cb2b"));
		menu2.add(cb5m);

		JMenuItem sep = new JMenuItem("-");
		JMenuItem btn;
		sep.setFont(font);
		menu.addSeparator();
		testbtn = new JMenuItem("testbtn");
		testbtn.setFont(font);
		testbtn.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("You pressed button " + ((JMenuItem) e.getSource()).getText());
			}

		});

		addMenuActionAndAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_ESCAPE, 0, false), testbtn,
				new ActionListener() {
					@Override
					public void actionPerformed(ActionEvent e) {
						System.out.println("testbtn via ESC");
						frame.setBackground(Color.yellow);
					}
				});

		menu.add(testbtn);
		menu.add(mRight);
		mRight.setMnemonic('r');
		mRight.setFont(font);
		mRight.add(cb6m);
		mRight.add(rb1m);
		mRight.addMenuListener(this);
	
		mRight.addMenuListener(new MenuListener() {

			@Override
			public void menuSelected(MenuEvent e) {
				System.out.println("mRight MenuListener sel " + e);
			}

			@Override
			public void menuDeselected(MenuEvent e) {
				System.out.println("mRight MenuListener des " + e);
			}

			@Override
			public void menuCanceled(MenuEvent e) {
				System.out.println("mRight MenuListener can " + e);
			}

		});

		btn = new JMenuItem("-");
		btn.setFont(font);
		mRight.add(btn);
		mRight.add(rb3m);
		btn = new JMenuItem("-");
		btn.setFont(font);
		mRight.add(btn);

		JMenu mRight2 = new JMenu("right2");

		mRight.add(mRight2);
		mRight.addMenuListener(this);
		mRight2.add(mb3);
		mRight2.add(mb4);
		mRight2.addMenuListener(this);

		JPanel theTab = new JPanel();

		JButton bh = new JButton("<html>remove <i>testbtn</i></html>") {
			{
				this.addActionListener(new ActionListener() {

					@Override
					public void actionPerformed(ActionEvent e) {
						menu.remove(testbtn);
						System.out.println("JalviewJSTest removing testbtn");
					}

				});
			}
		};
		bh.setBorder(new LineBorder(Color.red, 10));
		firstColumn.add(bh);
		firstColumn.add(new JButton("add 'testbtn'") {
			{
				this.addActionListener(new ActionListener() {

					@Override
					public void actionPerformed(ActionEvent e) {
						testbtn.setText("test" + ++ntest);
						System.out.println("JalviewJSTest adding testbtn");

						menu.add(testbtn);

					}

				});
			}
		});
		firstColumn.add(new JButton("menu bar add 'right'") {
			{
				this.addActionListener(new ActionListener() {

					@Override
					public void actionPerformed(ActionEvent e) {
						mb.add(mRight);
						mb.invalidate();
						frame.pack();
					}

				});
			}
		});
	}

	protected void addMenuActionAndAccelerator(KeyStroke keyStroke, JMenuItem menuItem, ActionListener actionListener) {
		menuItem.setAccelerator(keyStroke);
		menuItem.addActionListener(actionListener);
	}

	private void addListeners(AbstractButton c) {
		c.addActionListener(listener);
		c.addMouseListener(mlistener);
	}

	int ntest = 0;

	private ImageIcon getImage(String name) {
		URL file = getClass().getResource(name);
		System.out.println(file.toString());
		ImageIcon icon = new ImageIcon(file);

		while (icon.getImageLoadStatus() == MediaTracker.LOADING)
			try {
				Thread.sleep(10);
			} catch (InterruptedException e) {
			}
		return icon;
	}

	@Override
	public void menuSelected(MenuEvent e) {
		System.err.println("JalviewJSTest menuSelected " + ((JMenu) e.getSource()).getText());
//		JMenu menu = (JMenu) e.getSource();
//		System.out.println("adding mb5");
//		menu.add(mb5);
//		System.out.println("mb5 added");
	}

	@Override
	public void menuDeselected(MenuEvent e) {
		System.err.println("JalviewJSTest menuDeselected " + ((JMenu) e.getSource()).getText());

	}

	@Override
	public void menuCanceled(MenuEvent e) {
		System.err.println("menuCanceled " + e.getSource().toString());

	}

	@Override
	public void itemStateChanged(ItemEvent e) {
		System.out.println("itemStateChanged " + e.getItem());

	}
}
