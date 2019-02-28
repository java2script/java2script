package test;

import java.awt.AWTEvent;
import java.awt.BorderLayout;
import java.awt.Button;
import java.awt.Color;
import java.awt.Component;
import java.awt.DefaultKeyboardFocusManager;
import java.awt.Dimension;
import java.awt.Event;
import java.awt.KeyboardFocusManager;
import java.awt.TextArea;
import java.awt.TextField;
import java.awt.Toolkit;
import java.awt.event.AWTEventListener;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.InputEvent;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.logging.ConsoleHandler;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JDesktopPane;
import javax.swing.JFrame;
import javax.swing.JInternalFrame;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.KeyStroke;
import javax.swing.MenuElement;
import javax.swing.MenuSelectionManager;
import javax.swing.Timer;

import swingjs.plaf.JSInternalFrameUI;

public class Test_Event extends JFrame {

	static {
		System.out.println("os:" + System.getProperty("os.name"));
		System.out.println("dpr:" + Toolkit.getDefaultToolkit().getScreenResolution());
	}

	String test = "  34567890\n1234567890\n  345\n     ";

	private static void logClass(String name) {
		ConsoleHandler consoleHandler = new ConsoleHandler();
		consoleHandler.setLevel(Level.ALL);
		Logger logger = Logger.getLogger(name);
		logger.setLevel(Level.ALL);
		logger.addHandler(consoleHandler);
	}

	private static boolean allowLogging = false;
	private static boolean allowEventInfo = false;

	private void setLogging() {
		if ((/** @j2sNative false && */
		allowLogging)) {

			Logger rootLogger = Logger.getLogger("");
			rootLogger.setLevel(Level.ALL);
			logClass("java.awt.EventDispatchThread");
			logClass("java.awt.EventQueue");
			logClass("java.awt.Component");
			logClass("java.awt.focus.Component");
			logClass("java.awt.focus.DefaultKeyboardFocusManager");

		}

	}

	public static void main(String[] args) {
		KeyboardFocusManager.setCurrentKeyboardFocusManager(new DefaultKeyboardFocusManager() {
			@Override
			public boolean dispatchEvent(AWTEvent e) {
				if (allowEventInfo && e.getID() != MouseEvent.MOUSE_MOVED) {
					if (e.getID() == MouseEvent.MOUSE_PRESSED) { //
						System.out.println("FocusMan mousepreseed event");
					}
					System.out.println(
							"FocusMan dispatching activeElement=" + (/** @j2sNative document.activeElement.id || */
					getFocusOwner()));
					System.out.println("FocusMan dispatching event Source " + e.getSource());
//					if (e.toString().indexOf("GAINED") >= 0)
						System.out.println("FocusMan dispatching event " + e);
				}
				return super.dispatchEvent(e);
			}
		});
		new Test_Event();
	}

	public Test_Event() {

		Toolkit.getDefaultToolkit().addAWTEventListener(new AWTEventListener() {

			@Override
			public void eventDispatched(AWTEvent event) {
				//System.out.println("AWTEVEnt dispatched " + event);
			}
			
		}, -1);
		this.setContentPane(new JPanel() {

		});

		setLogging();

		this.setName("Test_Event_Frame");
		setTitle("testing editor");
		setLocation(100, 100);

		JPanel ptop = getTopPanel();

		JMenuBar mb = getMenuBar(ptop);

		JPanel full = new JPanel(new BorderLayout());
		full.setPreferredSize(new Dimension(300, 300));
		full.setBackground(Color.green);
		full.add(ptop, BorderLayout.NORTH);
		ptop.setBackground(Color.orange);

		full.setName("full");
		ptop.setName("ptop");

		boolean asInternalFrame = true;

		if (asInternalFrame) {
			JDesktopPane d = new JDesktopPane();
			// this next allows floating frames outside the JDesktopPane in SwingJS
			getRootPane().putClientProperty("swingjs.overflow.hidden", "false");

			d.setPreferredSize(new Dimension(800, 600));

			JInternalFrame main = new JInternalFrame();

			main.setContentPane(new JPanel() {

			});

			main.setBackground(Color.blue);
			main.getRootPane().setBackground(Color.RED);
			main.getContentPane().setBackground(Color.CYAN);
			main.getContentPane().setName("main.content");
			main.getRootPane().setName("main.root");

			MouseListener mlmain = new MouseListener() {

				@Override
				public void mouseClicked(MouseEvent e) {
					// TODO Auto-generated method stub

				}

				@Override
				public void mousePressed(MouseEvent e) {
					System.out.println("main listener mousePressed " + e);
					Component c = getComponentAt(e.getX(), e.getY());
					System.out.println("requesting focus for " + c);
					if (c != null)
						c.requestFocus();
				}

				@Override
				public void mouseReleased(MouseEvent e) {
					// TODO Auto-generated method stub

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

			KeyStroke[] a = ((JComponent) mb.getComponent(0)).getRegisteredKeyStrokes();
			System.out.println("menubar menu registration: " + a.length);

			main.setJMenuBar(mb);

			a = ((JComponent) mb.getComponent(0)).getRegisteredKeyStrokes();
			System.out.println("menubar menu registration: " + a.length);

			main.add(full);
			main.setTitle("main");
			main.pack();
			System.out.print("full size:" + full.getSize());
			main.setVisible(true);
			d.add(main);

			JInternalFrame main2 = new JInternalFrame();
			JPanel p = new JPanel();
			p.setPreferredSize(new Dimension(100, 300));
			p.setMinimumSize(new Dimension(100, 300));

			main2.add(p);
			main2.setTitle("main2");
			main2.pack();
			main2.setVisible(true);
			d.add(main2);

			add(d);
			pack();
			setVisible(true);
			tarea.append("this \n\nis a test");
			tarea.requestFocus();


		} else {
			setJMenuBar(mb);
			add(full);
			pack();
			setVisible(true);
		}

		showFocusTimer();
	}

	private void showFocusTimer() {
		Timer t = new Timer(100, new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				String s = /** @j2sNative document.activeElement.id || */
						null;

				s += " " + (++n);

//				System.out.println(s);
				/** @j2sNative document.title = s; */
			}

		});

		t.setRepeats(true);
		if (/** @j2sNative true || */
		false)
			t.start();
	}

	int n;

	protected void showKeyEvent(KeyEvent e) {
		String source = /** @j2sNative (xxx = e).bdata.jqevent.originalEvent.target.id || */
				"";
		System.out.println("Test_Editor keyEvent id=" + e.getID() + " " + " src="
				+ ((Component) e.getSource()).getName() + " " + ((Component) e.getSource()).getClass().getName() + " "
				+ source + " char=" + e.getKeyChar() + " code=" + e.getKeyCode() + " loc=" + e.getKeyLocation()
				+ "\n mod=" + e.getModifiers() + " " + KeyEvent.getKeyModifiersText(e.getModifiers()) + " modx="
				+ e.getModifiersEx() + " " + KeyEvent.getKeyModifiersText(e.getModifiersEx()));
	}

	protected void showMouseEvent(MouseEvent e) {
		Component c = DefaultKeyboardFocusManager.getCurrentKeyboardFocusManager().getFocusOwner();
		System.out.println("Test_Editor " + " mouse event " + getIdString(e.getID()) + " " + e.getX() + "," + e.getY()
				+ " " + Integer.toHexString(e.getModifiers()) + " " + MouseEvent.getMouseModifiersText(e.getModifiers())
				+ " " + InputEvent.getModifiersExText(e.getModifiersEx()) + "\n  trigger? " + e.isPopupTrigger()
				+ " focus owner was " + (c == null ? null : c.getName() + " " + c.getClass().getName()));

	}

	/**
	 * SwingJS convenience for debugging
	 * 
	 * @param id
	 * @return
	 */
	public static String getIdString(int id) {
		switch (id) {
		case MouseEvent.MOUSE_PRESSED:
			return "MOUSE_PRESSED";

		case MouseEvent.MOUSE_RELEASED:
			return "MOUSE_RELEASED";

		case MouseEvent.MOUSE_CLICKED:
			return "MOUSE_CLICKED";

		case MouseEvent.MOUSE_ENTERED:
			return "MOUSE_ENTERED";

		case MouseEvent.MOUSE_EXITED:
			return "MOUSE_EXITED";

		case MouseEvent.MOUSE_MOVED:
			return "MOUSE_MOVED";

		case MouseEvent.MOUSE_DRAGGED:
			return "MOUSE_DRAGGED";

		case MouseEvent.MOUSE_WHEEL:
			return "MOUSE_WHEEL";

		default:
			return "unknown type";
		}

	}

	KeyListener kl = new KeyAdapter() {
		@Override
		public void keyPressed(KeyEvent e) {
			showKeyEvent(e);
		}

		@Override
		public void keyTyped(KeyEvent e) {
			showKeyEvent(e);
		}

		@Override
		public void keyReleased(KeyEvent e) {
			showKeyEvent(e);
		}
	};

	ActionListener al = new ActionListener() {

		@Override
		public void actionPerformed(ActionEvent e) {
			System.out.println("Test_Event action for " + e.getActionCommand() + " " + e.getSource());
			if (e.getSource() == btnj) {
				//tarea.requestFocus();
				tarea.setCaretPosition((int)(Math.random() * tarea.getText().length()));
			}
		}

	};

	public boolean action(Event ae, Object s) {
		System.out.println("AWT action " + s + " " +ae);
		return false;
	}

	protected JButton btnj;
	protected Button btn;
	TextArea tarea;
	
	protected TextField field;
	protected JTextField fieldj;

	MouseListener ml = new MouseListener() {

		@Override
		public void mouseClicked(MouseEvent e) {
			showMouseEvent(e);
		}

		@Override
		public void mousePressed(MouseEvent e) {
			showMouseEvent(e);
//			System.out.println("requesting focus for " + e.getSource());
//			((Component) e.getSource()).requestFocus();
//			e.consume();
		}

		@Override
		public void mouseReleased(MouseEvent e) {
			showMouseEvent(e);

		}

		@Override
		public void mouseEntered(MouseEvent e) {
			showMouseEvent(e);
		}

		@Override
		public void mouseExited(MouseEvent e) {
			showMouseEvent(e);
		}

	};

	private FocusListener fl = new FocusListener() {

		@Override
		public void focusGained(FocusEvent e) {
			System.out.println(
					"Test_Editor focus GAINED " + getID(e.getSource()) + " opp:" + getID(e.getOppositeComponent()));
			// ptop.setBackground(Color.LIGHT_GRAY);

			System.out.println(
					"Test_Editor Active = " + KeyboardFocusManager.getCurrentKeyboardFocusManager().getActiveWindow());
			System.out.println("Test_Editor Focused = "
					+ KeyboardFocusManager.getCurrentKeyboardFocusManager().getFocusedWindow());
		}

		@Override
		public void focusLost(FocusEvent e) {
			System.out.println(
					"Test_Editor focus LOST " + getID(e.getSource()) + " opp:" + getID(e.getOppositeComponent()));
			// ptop.setBackground(Color.MAGENTA);
		}

	};

	private JMenuBar getMenuBar(JPanel ptop) {
		JMenuBar mb = new JMenuBar() {
			@Override
			public void processKeyEvent(KeyEvent e, MenuElement[] path, MenuSelectionManager m) {
				System.out.println("Test_Editor path length=" + path.length);
				super.processKeyEvent(e, path, m);
			}
		};
		JMenu mb1 = new JMenu("Test") {
			@Override
			public void processKeyEvent(KeyEvent e, MenuElement[] path, MenuSelectionManager m) {
				System.out.println("Test_Editor JMenu path length=" + path.length);
				super.processKeyEvent(e, path, m);
			}

			@Override
			public void addNotify() {
				System.out.println("Test_Editor JMenu addNotify");
				super.addNotify();
			}

		};

		JMenuItem mb1a = new JMenuItem("test-1");
		JMenuItem mb1b = new JMenuItem("test-2");
		JMenu mb1c = new JMenu("test-3");
		JMenuItem mb1c1 = new JMenuItem("test-4");
		JMenuItem mb1c2 = new JMenuItem("test-5");

		mb1.setMnemonic('t');

		mb1.add(mb1a);
		mb1.add(mb1b);
		mb1.add(mb1c);
		mb1c.add(mb1c1);
		mb1c.add(mb1c2);

		KeyStroke[] a = mb1.getRegisteredKeyStrokes();
		System.out.println("menubar menu registration: " + a.length);
		for (int i = 0; i < a.length; i++)
			System.out.println(a[i]);

		mb.add(mb1);

		a = mb1.getRegisteredKeyStrokes();
		System.out.println("menubar menu registration: " + a.length);

		ActionListener al = new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				ptop.setBackground(Color.red);
				btnj.setText(e.getActionCommand());
			}

		};

		mb1a.addActionListener(al);
		mb1a.setMnemonic('1');
		mb1a.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_R, KeyEvent.ALT_MASK));

		mb1b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				ptop.setBackground(Color.YELLOW);
				btnj.setText(e.getActionCommand());
			}

		});
		mb1b.setAccelerator(
				KeyStroke.getKeyStroke(KeyEvent.VK_Y, KeyEvent.CTRL_MASK | KeyEvent.ALT_MASK | KeyEvent.SHIFT_MASK));

		ActionListener a2 = new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				ptop.setBackground(Color.white);
				btnj.setText(e.getActionCommand());
			}

		};

		mb1c.addActionListener(al);
		mb1c.setMnemonic('3');

		mb1c1.addActionListener(al);
		mb1c1.setMnemonic('4');
		mb1c1.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_C, KeyEvent.CTRL_MASK));
		mb1c2.addActionListener(a2);
		mb1c2.setMnemonic('5');
		mb1c2.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_V, KeyEvent.CTRL_MASK));

		return mb;
	}

	protected String getID(Object jc) {
		return (jc == null ? null : jc instanceof JComponent ? /** @j2sNative jc.ui.id || */
				((JComponent) jc).getUIClassID() : jc.getClass().getName());
	}

	private JPanel getTopPanel() {
		JPanel ptop = new JPanel();
		ptop.setPreferredSize(new Dimension(300, 300));
		ptop.setMaximumSize(new Dimension(400, 400));
		ptop.setBackground(Color.LIGHT_GRAY);
		ptop.setOpaque(true);
		
		tarea = new TextArea(2,15);
		tarea.addFocusListener(fl);
		ptop.add(tarea);
		

		btnj = new JButton("btnj");
		btnj.setName("btnj");
		btnj.setOpaque(true);
		btnj.setBackground(Color.white);
		btnj.addMouseListener(ml);
		btnj.addActionListener(al);
		btnj.addKeyListener(kl);
		ptop.add(btnj);
		field = new TextField("field");
		field.setName("field");
		field.addMouseListener(ml);
		field.addActionListener(al);
		field.addKeyListener(kl);
		btn = new Button("test");
		btn.setName("btn");
		btn.setBackground(Color.orange);
		btn.addMouseListener(ml);
		btn.addActionListener(al);
		btn.addKeyListener(kl);
		ptop.add(btn);
		ptop.add(field);
		fieldj = new JTextField("fieldj");
		fieldj.setName("fieldj");
		fieldj.addMouseListener(ml);
		fieldj.addActionListener(al);
		fieldj.addKeyListener(kl);
		ptop.add(fieldj);

		return ptop;
	}

	protected void updateTitle() {
		Component c = DefaultKeyboardFocusManager.getCurrentKeyboardFocusManager().getFocusOwner();

		System.out.println("Test_Editor focus owner is " + (c == null ? null : c.getClass().getName()));
		setTitle((++n) + "  " + (c == null ? null : c.getClass().getName()));
	}

}
