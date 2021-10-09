package test;

import java.awt.BorderLayout;
//import java.awt.Button;
import java.awt.Color;
import java.awt.Component;
import java.awt.DefaultKeyboardFocusManager;
import java.awt.Dimension;
import java.awt.Font;
//import java.awt.TextArea;
import java.awt.datatransfer.DataFlavor;
import java.awt.datatransfer.Transferable;
import java.awt.dnd.DnDConstants;
import java.awt.dnd.DropTarget;
import java.awt.dnd.DropTargetDragEvent;
import java.awt.dnd.DropTargetDropEvent;
import java.awt.dnd.DropTargetEvent;
import java.awt.dnd.DropTargetListener;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;

import javax.swing.Box;
import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JDesktopPane;
import javax.swing.JFrame;
import javax.swing.JInternalFrame;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.JTextPane;
import javax.swing.KeyStroke;
import javax.swing.MenuElement;
import javax.swing.MenuSelectionManager;
import javax.swing.Timer;
import javax.swing.event.CaretEvent;
import javax.swing.event.CaretListener;
import javax.swing.event.MenuEvent;
import javax.swing.event.MenuListener;
import javax.swing.text.BadLocationException;
import javax.swing.text.DefaultCaret;
import javax.swing.text.Document;
import javax.swing.text.Element;
import javax.swing.text.JTextComponent;
import javax.swing.text.MutableAttributeSet;
import javax.swing.text.SimpleAttributeSet;
import javax.swing.text.Style;
import javax.swing.text.StyleConstants;

public class Test_Editor extends JFrame implements DropTargetListener {

	String test = "  345567890112345678903  345\n     ";

	private JTextArea area;

//	private static void logClass(String name) {
//		ConsoleHandler consoleHandler = new ConsoleHandler();
//		consoleHandler.setLevel(Level.ALL);
//		Logger logger = Logger.getLogger(name);
//		logger.setLevel(Level.ALL);
//		logger.addHandler(consoleHandler);
//	}
//
//	private static boolean allowLogging = false;
//	private static boolean allowEventInfo = false;
//
//	private void setLogging() {
//		if ((/** @j2sNative false || */
//		allowLogging)) {
//
//			Logger rootLogger = Logger.getLogger("");
//			rootLogger.setLevel(Level.ALL);
//			logClass("java.awt.EventDispatchThread");
//			logClass("java.awt.EventQueue");
//			logClass("java.awt.Component");
//			logClass("java.awt.focus.Component");
//			logClass("java.awt.focus.DefaultKeyboardFocusManager");
//
//		}
//
//	}

	public static void main(String[] args) {
//		KeyboardFocusManager.setCurrentKeyboardFocusManager(new DefaultKeyboardFocusManager() {
//			@Override
//			public boolean dispatchEvent(AWTEvent e) {
//				if (allowEventInfo && e.getID() != MouseEvent.MOUSE_MOVED) {
//					if (e.getID() == MouseEvent.MOUSE_PRESSED) { //
//						System.out.println("FocusMan mousepreseed event");
//					}
//					System.out.println(
//							"FocusMan dispatching activeElement=" + (/** @j2sNative document.activeElement.id	  || */
//					null));
//					System.out.println("FocusMan dispatching event Source " + e.getSource());
//					System.out.println("FocusMan dispatching event " + e);
//				}
//				return super.dispatchEvent(e);
//			}
//		});
		new Test_Editor();
	}

	public Test_Editor() {

//		setLogging();

		setTitle("testing editor");
		setLocation(100, 100);

		JPanel ptop = getTopPanel();
		// ptop.setFocusable(false);

		JTextPane editor = getEditor();
		JScrollPane js = new JScrollPane(editor);
		// js.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);

		area = getArea();
		area.addKeyListener(ka);
		JScrollPane js2 = new JScrollPane(area);
		js2.setPreferredSize(new Dimension(300, 300));
		js2.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);//_AS_NEEDED);
		js2.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);//NEVER);//VERTICAL_SCROLLBAR_AS_NEEDED);
		area.addPropertyChangeListener(new PropertyChangeListener() {

			@Override
			public void propertyChange(PropertyChangeEvent evt) {
				System.out.println("TA property " + evt.getPropertyName());
				
			}
			
		});
		JTextField field = getField();
		JTextField field2 = getField();

		JMenuBar mb = getMenuBar(ptop);

		JTextArea area1 = new JTextArea();	
		//area1.setPreferredSize(new Dimension(300, 300));

		JPanel panel = getButtonPanel(editor, area, area1, field);
		panel.add(field2);
		field2.addKeyListener(ka);
		//editor.addKeyListener(ka);
		new DropTarget(editor, this);
		new DropTarget(area, this);

		Box box = Box.createHorizontalBox();
		box.add(js);
		box.add(Box.createHorizontalStrut(1));
		box.add(js2);
		box.add(Box.createHorizontalStrut(1));
		box.add(area1);

		JPanel full = new JPanel(new BorderLayout());
		full.add(ptop, BorderLayout.NORTH);
		full.add(box);
		full.add(panel, BorderLayout.SOUTH);

//		full.addKeyListener(ka);
//		full.addFocusListener(fl);
//
//		this.getRootPane().addKeyListener(ka);
//		this.addKeyListener(ka);
//		this.getContentPane().addKeyListener(ka);
//
//		ptop.addKeyListener(ka);
//		ptop.addFocusListener(fl);
//		editor.addFocusListener(fl);
//		area.addFocusListener(fl);

		boolean asInternalFrame = false;

		if (asInternalFrame) {
			JDesktopPane d = new JDesktopPane();
			d.setPreferredSize(new Dimension(1210, 600));

			JInternalFrame main = new JInternalFrame();
			
			main.addMouseListener(new MouseListener() {

				@Override
				public void mouseClicked(MouseEvent e) {
					// TODO Auto-generated method stub
					
				}

				@Override
				public void mousePressed(MouseEvent e) {
//					main.requestFocus();
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
				
			});
			main.addKeyListener(ka);

			
			KeyStroke[] a = ((JComponent) mb.getComponent(0)).getRegisteredKeyStrokes();
			System.out.println("menubar menu registration: " + a.length);

			main.setJMenuBar(mb);

			a = ((JComponent) mb.getComponent(0)).getRegisteredKeyStrokes();
			System.out.println("menubar menu registration: " + a.length);

			main.add(full);
			main.addFocusListener(fl);
			main.setTitle("main");
			main.pack();
			main.setVisible(true);
			d.add(main);

			JInternalFrame main2 = new JInternalFrame();
			main.add(new JPanel() {
				public Dimension getPreferredSize() {
					return new Dimension(100,300);
				}
			});
			
			main2.setTitle("main2");
			main2.pack();
			main2.setVisible(true);
			d.add(main2);
			

			setContentPane(d);
			// these next two allow floating frames outside the JDesktopPane
			getRootPane().putClientProperty("swingjs.overflow.hidden", "false");
			pack();
			setVisible(true);

			main.getRootPane().addKeyListener(ka);
			main.addKeyListener(ka);
			main.getContentPane().addKeyListener(ka);
			ptop.addKeyListener(ka);
			// ptop.setFocusable(false);

		} else {
			setJMenuBar(mb);
			add(full);
			pack();
			setVisible(true);
//			ptop.setFocusable(false);
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

	private JPanel getButtonPanel(JTextPane editor, JTextArea area, JTextArea area1, JTextField field) {
		JPanel panel = new JPanel();

		panel.setLayout(new BoxLayout(panel, BoxLayout.X_AXIS));

		JButton btop = new JButton("top");
		btop.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				editor.setCaretPosition(0);
				area.setCaretPosition(0);
				area.requestFocus();
				editor.requestFocus();
				//area1.setCaretPosition(0);
				//area1.requestFocus();
			}

		});

		JButton b;
 
		b = new JButton("clear");
		JButton finalB = b;	
		b.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				editor.setText("");
//				JFrame frame1 = new JFrame();
//				frame1.setLocationRelativeTo(finalB);
//				JPanel jp = new JPanel();
//				jp.setPreferredSize(new Dimension(150,150));
//				frame1.add(jp);
//				frame1.pack();
//				frame1.setVisible(true);

//				btop.setEnabled(!btop.isEnabled());
			}

		});
		b.addFocusListener(fl);
		panel.add(b);

		b = new JButton("caret+1");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				editor.getCaret().setDot(editor.getCaret().getDot() + 1);
				editor.requestFocus();
			}

		});
		b.addFocusListener(fl);
		panel.add(b);
		b = new JButton("caret+1(r)");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				area.getCaret().setDot(area.getCaret().getDot() + 1);
				area.requestFocus();
			}

		});
		b.addFocusListener(fl);
		panel.add(b);

		b = new JButton("sel7-10");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				editor.getCaret().setDot(7);
				editor.getCaret().moveDot(10);
				editor.getCaret().setSelectionVisible(true);
				editor.setSelectionColor(Color.red);
				editor.requestFocus();
			}

		});
		b.addFocusListener(fl);
		panel.add(b);

		btop.addFocusListener(fl);
		panel.add(btop);

		b = new JButton("end1");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				editor.setCaretPosition(editor.getDocument().getLength());
				//area.setCaretPosition(area.getDocument().getLength());
				//area.requestFocus();
				editor.requestFocus();
			}

		});
		b.addFocusListener(fl);
		panel.add(b);

		b = new JButton("end2");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				area.setCaretPosition(area.getText().length());
				area.requestFocus();
			}

		});
		b.addFocusListener(fl);
		panel.add(b);

		b = new JButton("sel7-10-area");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				area.getCaret().setDot(7);
				area.getCaret().moveDot(10);
				area.getCaret().setSelectionVisible(true);
				area.setSelectionColor(Color.blue);
				area.requestFocus();
			}

		});
		b.addFocusListener(fl);
		panel.add(b);

		b = new JButton("app1");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				try {
					editor.getDocument().insertString(editor.getDocument().getLength(),"\ntesting" + ++n, null);
				} catch (BadLocationException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				} 
				editor.requestFocus();
			}

		});
		b.addFocusListener(fl);
		panel.add(b);

		b = new JButton("app2");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				area.requestFocus();
				area.append("\ntesting" + ++n); 
			}

		});
		b.addFocusListener(fl);
		panel.add(b);


		
		
		b = new JButton("sel3-5-field");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				field.setCaretPosition(3);
				field.getCaret().moveDot(5);
				field.getCaret().setSelectionVisible(true);
				field.setSelectionColor(Color.blue);
				field.requestFocus();
			}

		});
		b.addFocusListener(fl);
		panel.add(b);

		b = new JButton("bold");
		b.setMnemonic('b');

		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				int start = editor.getSelectionStart();
				int end = editor.getSelectionEnd();
				if (end == start)
					return;
				Element ch = editor.getStyledDocument().getCharacterElement(start);
				boolean isBold = !StyleConstants.isBold(ch.getAttributes());
				MutableAttributeSet attrs = new SimpleAttributeSet();
				StyleConstants.setForeground(attrs, isBold ? Color.red : Color.black);
				StyleConstants.setBold(attrs, isBold);
				editor.getStyledDocument().setCharacterAttributes(start, end - start, attrs, false);
				// note that text selection now disappears
				System.out
						.println("Test_Editor caret now " + editor.getCaretPosition() + " " + editor.getSelectedText());
			}

		});
		b.addFocusListener(fl);
		panel.add(b);

		b = new JButton("ital");
		b.setMnemonic('i');
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				int start = editor.getSelectionStart();
				int end = editor.getSelectionEnd();
				if (end == start)
					return;
				MutableAttributeSet attrs = new SimpleAttributeSet();
				Element ch = editor.getStyledDocument().getCharacterElement(start);
				StyleConstants.setItalic(attrs, !StyleConstants.isItalic(ch.getAttributes()));
				editor.getStyledDocument().setCharacterAttributes(start, end - start, attrs, false);
			}

		});
		b.addFocusListener(fl);
		panel.add(b);
		panel.add(field);
		return panel;
	}

	private JTextField getField() {

		JTextField field = new JTextField("testing");
		field.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
			}

		});

		field.addCaretListener(new CaretListener() {

			@Override
			public void caretUpdate(CaretEvent e) {
				System.out.println("Test_Editor JTextField  caret:" + e);
			}

		});
		return field;
	}

	private JTextArea getArea() {
		JTextArea area = new JTextArea() {
public void setCarentPosition(int i) {
	System.out.println("Test_Editor JTextArea setCP " + i);
	super.setCaretPosition(i);
}
		};

		
		DefaultCaret c = new DefaultCaret() {
			@Override
			protected void fireStateChanged() {
				System.out.println("Test_Editor area caret firestatechanged " + area.getCaretPosition());
				super.fireStateChanged();
			}

		};
//		c.install(area);
		area.setCaret(c);

		area.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 16));
		area.setText(test);
		area.setBackground(new Color(200, 200, 180));
		// area.setEditable(false);
		area.addCaretListener(new CaretListener() {

			@Override
			public void caretUpdate(CaretEvent e) {
				System.out.println("Test_Editor JTextArea  caret:" + e);
			}

		});

		area.addMouseListener(ml);

		return area;
	}

	private JTextPane getEditor() {
		JTextPane editor = new JTextPane();
		editor.setPreferredSize(new Dimension(400, 300));
		System.out.println("Test_Editor " + editor.getDocument());
		System.out.println("Test_Editor " + editor.getEditorKit());
		editor.setText(test);
		// editor.setEditable(false);

		System.out
				.println("Test_Editor Element count = " + editor.getDocument().getRootElements()[0].getElementCount());
		editor.setBackground(new Color(200, 200, 200));
		editor.setFont(new Font(Font.SANS_SERIF, Font.PLAIN, 16));
		System.out.println("Test_Editor editor pref size " + editor.getPreferredSize());

		Style style = editor.addStyle("Red", null);
		StyleConstants.setForeground(style, Color.red);

		editor.addPropertyChangeListener(new PropertyChangeListener() {

			@Override
			public void propertyChange(PropertyChangeEvent evt) {
				System.out.println("Test_Editor prop change " + evt.getPropertyName() + " " + evt);
			}

		});

		editor.addCaretListener(new CaretListener() {

			@Override
			public void caretUpdate(CaretEvent e) {
				System.out.println("Test_Editor JTextPane caret:" + e);
				// dumpRoot(editor.getDocument());
			}

		});

		editor.addMouseListener(ml);

		DefaultCaret c = new DefaultCaret() {
		};
//		c.install(editor);
		editor.setCaret(c);

		return editor;
	}

	KeyListener ka = new KeyAdapter() {
		@Override
		public void keyPressed(KeyEvent e) {
			if (e.getKeyCode() == 17)
				return;
			showKeyEvent(e);
		}

		@Override
		public void keyTyped(KeyEvent e) {
			if (e.getKeyCode() == 17)
				return;
			showKeyEvent(e);
		}

		@Override
		public void keyReleased(KeyEvent e) {
			if (e.getKeyCode() == 17)
				return;
			showKeyEvent(e);
		}
	};

	MouseListener ml = new MouseListener() {

		@Override
		public void mouseClicked(MouseEvent e) {
			// TODO Auto-generated method stub

		}

		@Override
		public void mousePressed(MouseEvent e) {

			Component c = DefaultKeyboardFocusManager.getCurrentKeyboardFocusManager().getFocusOwner();

			System.out.println("Test_Editor " + e.getSource() + " mouse pressed " + e.getX() + " " + e.getY()
					+ " focus owner is " + (c == null ? null : c.getClass().getName()));
		}

		@Override
		public void mouseReleased(MouseEvent e) {
			// TODO Auto-generated method stub
			System.out.println("Test_Editor  mouse released" + e.getX() + " " + e.getY());

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

	private FocusListener fl = new FocusListener() {

		@Override
		public void focusGained(FocusEvent e) {
			System.out.println(
					"Test_Editor focus GAINED " + getID(e.getSource()) + " opp:" + getID(e.getOppositeComponent()));
			// ptop.setBackground(Color.LIGHT_GRAY);
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
		mb1a.addActionListener((e)->{
			System.out.println("test-1 clicked");
		});
		
		JMenuItem mb1b = new JMenuItem("test-2");
		JMenuItem mb1c = new JMenuItem("test-3");
		JMenuItem mb1d = new JMenuItem("test-4");
		JMenuItem mb1e = new JMenuItem("test-5");

		mb1.setMnemonic('t');
		mb1a.setMnemonic('1');
		mb1b.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_Y, KeyEvent.CTRL_MASK));
		mb1c.setMnemonic('3');
		mb1d.setMnemonic('4');
		mb1d.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_C, KeyEvent.CTRL_MASK));
		mb1e.setMnemonic('5');
		mb1e.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_W, KeyEvent.CTRL_MASK));

		mb1.add(mb1a);
//		mb1.add(mb1b);
//		mb1.add(mb1c);
//		mb1.add(mb1d);
//		mb1.add(mb1e);
		mb1.addMenuListener(new MenuListener() {

			@Override
			public void menuSelected(MenuEvent e) {
				mb1.removeAll();
				mb1.add(mb1a);
				// TODO Auto-generated method stub
				
			}

			@Override
			public void menuDeselected(MenuEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void menuCanceled(MenuEvent e) {
				// TODO Auto-generated method stub
				
			}
			
		});

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
				ptop.setBackground(Color.cyan);
			}

		};

		mb1a.addActionListener(al);

		mb1b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				ptop.setBackground(Color.YELLOW);
			}

		});

		ActionListener a2 = new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				ptop.setBackground(Color.white);
			}

		};

		mb1c.addActionListener(al);
		mb1d.addActionListener(al);
		mb1e.addActionListener(a2);

		return mb;
	}

	protected String getID(Object jc) {
		return (jc == null ? null : jc instanceof JComponent ? /** @j2sNative jc.ui.id || */
				((JComponent) jc).getUIClassID() : jc.getClass().getName());
	}

	private JPanel getTopPanel() {
		JPanel ptop = new JPanel();
		ptop.setPreferredSize(new Dimension(300, 100));
		ptop.setMaximumSize(new Dimension(400, 100));
		ptop.setBackground(Color.LIGHT_GRAY);
		ptop.setOpaque(true);
//
//		ptop.addMouseListener(new MouseAdapter() {
//			@Override
//			public void mousePressed(MouseEvent e) {
//				System.out.println("Test_Editor ptop mouse pressed");
//				ptop.requestFocusInWindow();
//				updateTitle();
//			}
//
//		});
//
		return ptop;
	}

	protected void updateTitle() {
		Component c = DefaultKeyboardFocusManager.getCurrentKeyboardFocusManager().getFocusOwner();

		System.out.println("Test_Editor focus owner is " + (c == null ? null : c.getClass().getName()));
		setTitle((++n) + "  " + (c == null ? null : c.getClass().getName()));
	}

	protected void showKeyEvent(KeyEvent e) {
		String source = /** @j2sNative (xxx = e).bdata.jqevent.originalEvent.target.id || */
				"";
		System.out.println(
				"Test_Editor keyEvent id=" + e.getID() + "\n'" + ((JTextComponent) e.getSource()).getText() + "'\n "
						+ source + " char=" + e.getKeyChar() + " code=" + e.getKeyCode() + " loc=" + e.getKeyLocation()
						+ "\n mod=" + e.getModifiers() + " " + KeyEvent.getKeyModifiersText(e.getModifiers()) + " modx="
						+ e.getModifiersEx() + " " + KeyEvent.getKeyModifiersText(e.getModifiersEx()));
	}

	protected void dumpRoot(Document document) {
		dumpElement(0, document.getRootElements()[0]);
	}

	private void dumpElement(int index, Element element) {
		System.out.println("Test_Editor i=" + index + " e=" + element.toString());
		for (int i = 0, n = element.getElementCount(); i < n; i++)
			dumpElement((index + 1) * 100, element.getElement(i));

	}

	@Override
	public void dragEnter(DropTargetDragEvent dtde) {
		// TODO Auto-generated method stub

	}

	@Override
	public void dragOver(DropTargetDragEvent dtde) {
		// TODO Auto-generated method stub

	}

	@Override
	public void dropActionChanged(DropTargetDragEvent dtde) {
		// TODO Auto-generated method stub

	}

	@Override
	public void dragExit(DropTargetEvent dte) {
		// TODO Auto-generated method stub

	}

	@Override
	public void drop(DropTargetDropEvent dtde) {
		// TODO Auto-generated method stub

		try {
			Transferable tr = dtde.getTransferable();
			DataFlavor[] flavors = tr.getTransferDataFlavors();
			for (int i = 0; i < flavors.length; i++) {
				if (flavors[i].isFlavorJavaFileListType()) {
					dtde.acceptDrop(DnDConstants.ACTION_COPY_OR_MOVE);
					List<File> list = (List<File>) tr.getTransferData(flavors[i]);
					for (int j = 0; j < list.size(); j++) {
						File file = (File) list.get(j);
						byte[] data = getDroppedFileBytes(file);
						JTextComponent target = (JTextComponent) ((DropTarget) dtde.getSource()).getComponent();
						target.setText(new String(data));
						break; // just first indicated file
					}
					dtde.dropComplete(true);
					return;
				} else if (flavors[i].isFlavorTextType()) {
					dtde.acceptDrop(DnDConstants.ACTION_COPY_OR_MOVE);
					String data = (String) tr.getTransferData(flavors[i]);
					JTextComponent target = (JTextComponent) ((DropTarget) dtde.getSource()).getComponent();
					target.setText(data);
					dtde.dropComplete(true);
				}
			}
			dtde.rejectDrop();
		} catch (Exception e) {
			e.printStackTrace();
			dtde.rejectDrop();
		}

	}

	private byte[] getDroppedFileBytes(File file) {
		Path p = file.toPath();

		try {
			return (byte[]) getStreamAsBytes(new BufferedInputStream(new FileInputStream(file)));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public static byte[] getStreamAsBytes(BufferedInputStream bis) throws IOException {
		byte[] buf = new byte[1024];
		byte[] bytes = new byte[4096];
		int len = 0;
		int totalLen = 0;
		while ((len = bis.read(buf, 0, 1024)) > 0) {
			totalLen += len;
			if (totalLen >= bytes.length)
				bytes = Arrays.copyOf(bytes, totalLen * 2);
			System.arraycopy(buf, 0, bytes, totalLen - len, len);
		}
		bis.close();
		return (totalLen < bytes.length ? Arrays.copyOf(bytes, totalLen) : bytes);
	}

}
