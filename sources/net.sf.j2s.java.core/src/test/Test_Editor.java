package test;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.DefaultKeyboardFocusManager;
import java.awt.Dimension;
import java.awt.Font;
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
import java.awt.event.MouseAdapter;
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
import java.util.logging.ConsoleHandler;
import java.util.logging.Level;
import java.util.logging.Logger;

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
import javax.swing.event.CaretEvent;
import javax.swing.event.CaretListener;
import javax.swing.text.DefaultCaret;
import javax.swing.text.Document;
import javax.swing.text.Element;
import javax.swing.text.JTextComponent;
import javax.swing.text.MutableAttributeSet;
import javax.swing.text.SimpleAttributeSet;
import javax.swing.text.Style;
import javax.swing.text.StyleConstants;

public class Test_Editor extends JFrame implements DropTargetListener {

	String test = "  34567890\n1234567890\n  345\n     ";
    

	  private static void logClass(String name) {
	      ConsoleHandler consoleHandler = new ConsoleHandler();
	      consoleHandler.setLevel(Level.ALL);
	      Logger logger = Logger.getLogger(name);
	      logger.setLevel(Level.ALL);
	      logger.addHandler(consoleHandler);
	  }

	  private void setLogging() {
	  	if ((/** @j2sNative false ||*/false)) {

	  		Logger rootLogger = Logger.getLogger("");
		        rootLogger.setLevel(Level.ALL);
		        logClass("java.awt.EventDispatchThread");
		        logClass("java.awt.EventQueue");
		        logClass("java.awt.Component");
		        logClass("java.awt.focus.Component");
		        logClass("java.awt.focus.DefaultKeyboardFocusManager");
	      
	  	}
			

	  }

	  public Test_Editor() {

		
		setLogging();
		
    	setTitle("testing editor");
    	setLocation(100, 100);

    	addFocusListener(); 
    	

	    JPanel ptop = getTopPanel();
    	JTextPane editor = getEditor();
		JScrollPane js = new JScrollPane(editor);
		//js.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
    	
    	JTextArea area = getArea();
		JScrollPane js2 = new JScrollPane(area);
		js2.setPreferredSize(new Dimension(300, 300));
		js2.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
		js2.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
    	
    	JTextField field = getField();		

    	JMenuBar mb = getMenuBar(ptop);
    	
		JPanel panel = getButtonPanel(editor, area, field);

		new DropTarget(editor, this);
		new DropTarget(area, this);
		
		
		Box box = Box.createHorizontalBox();		
		box.add(js);
		box.add(Box.createHorizontalStrut(1));
		box.add(js2);

		
    	JPanel full = new JPanel(new BorderLayout());
		full.add(ptop, BorderLayout.NORTH);
		full.add(box);
		full.add(panel, BorderLayout.SOUTH);


		boolean asInternalFrame = true;
		
		
		if (asInternalFrame) {
			JInternalFrame main = new JInternalFrame();
			main.setJMenuBar(mb);
			main.add(full);
			main.pack();
			main.setVisible(true);
			JDesktopPane d = new JDesktopPane();
			d.setPreferredSize(new Dimension(800,600));
			d.add(main);
			setContentPane(d);
			// these next two allow floating frames outside the JDesktopPane
			getRootPane().putClientProperty("swingjs.overflow.hidden", "false");
			pack();
			setVisible(true);
			
			main.getRootPane().addKeyListener(ka);
			main.addKeyListener(ka);
			main.getContentPane().addKeyListener(ka);
			full.addKeyListener(ka);
			full.getRootPane().addKeyListener(ka);
			full.setFocusable(true);
			//ptop.setFocusable(false);

		} else {
			setJMenuBar(mb);
			add(full);
			pack();
			setVisible(true);
			this.getRootPane().addKeyListener(ka);
			this.addKeyListener(ka);
			this.getContentPane().addKeyListener(ka);
			full.addKeyListener(ka);
			full.setFocusable(true);
//			ptop.setFocusable(false);
		}		
		
	}

	private JPanel getButtonPanel(JTextPane editor, JTextArea area, JTextField field) {
		JPanel panel = new JPanel();
		
		panel.setLayout(new BoxLayout(panel, BoxLayout.X_AXIS));

		
		JButton btop = new JButton("top");
		btop.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				editor.setCaretPosition(0);
				area.setCaretPosition(0);
				area.requestFocus();
				editor.requestFocus();
			}

		});

		JButton b;
		
		b = new JButton("clear");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				editor.setText("");
//				btop.setEnabled(!btop.isEnabled());
			}

		});
		panel.add(b);
		
		b = new JButton("caret+1");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				editor.getCaret().setDot(editor.getCaret().getDot() + 1);
				editor.requestFocus();
			}

		});
		panel.add(b);

		
		b = new JButton("sel7-10");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				editor.getCaret().setDot(7);
				editor.getCaret().moveDot(10);
				editor.getCaret().setSelectionVisible(true);
				editor.setSelectionColor(Color.red);
				editor.requestFocus();
			}

		});
		panel.add(b);

		
		panel.add(btop);

		
		b = new JButton("end");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				editor.setCaretPosition(editor.getDocument().getLength());
				area.setCaretPosition(area.getDocument().getLength());
				area.requestFocus();
				editor.requestFocus();
			}

		});
		panel.add(b);


		b = new JButton("sel7-10-area");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				area.getCaret().setDot(7);
				area.getCaret().moveDot(10);
				area.getCaret().setSelectionVisible(true);
				area.setSelectionColor(Color.blue);
				area.requestFocus();
			}

		});
		panel.add(b);

		b = new JButton("sel3-5-field");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				field.setCaretPosition(3);
				field.getCaret().moveDot(5);
				field.getCaret().setSelectionVisible(true);
				field.setSelectionColor(Color.blue);
				field.requestFocus();
			}

		});
		panel.add(b);

		b = new JButton("bold");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
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
				System.out.println("Test_Editor caret now " + editor.getCaretPosition() + " " + editor.getSelectedText());
			}

		});
		panel.add(b);

		b = new JButton("ital");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
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
		panel.add(b);
		panel.add(field);
		return panel;
	}

	private JTextField getField() {

		JTextField field = new JTextField("testing");
		field.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor JTextField action");
			}
			
		});
		
		field.addCaretListener(new CaretListener() {

			@Override
			public void caretUpdate(CaretEvent e) {
				System.out.println("Test_Editor JTextField  caret:" + e);
			}

		});

		field.addFocusListener(new FocusListener() {

			@Override
			public void focusGained(FocusEvent e) {
				System.out.println("Text_Editor field focus gained");
			}

			@Override
			public void focusLost(FocusEvent e) {
				System.out.println("Text_Editor focus lost");
			}
			
		});

		return field;
	}

	private JTextArea getArea() {
		JTextArea area = new JTextArea();
		
		
		DefaultCaret c = new DefaultCaret() {
		    @Override
			protected void fireStateChanged() {
		    	System.out.println("Test_Editor area caret firestatechanged " + area.getCaretPosition());
		    	super.fireStateChanged();
		    }
			
		};
		c.install(area);
		area.setCaret(c);
		
		
		
		area.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 16));
		area.setText(test);
		area.setBackground(new Color(200, 200, 180));
		//area.setEditable(false);
		area.addCaretListener(new CaretListener() {

			@Override
			public void caretUpdate(CaretEvent e) {
				System.out.println("Test_Editor JTextArea  caret:" + e);
			}

		});

		area.addMouseListener(new MouseListener() {

			@Override
			public void mouseClicked(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void mousePressed(MouseEvent e) {
				if (!/** @j2sNative true || */false)
				System.out.println("Test_Editor JTextarea focus owner is \n" + DefaultKeyboardFocusManager.getCurrentKeyboardFocusManager().getFocusOwner().getClass().getName());
				System.out.println("Test_Editor JTextArea mouse pressed" + e.getX() + " " + e.getY());
			}

			@Override
			public void mouseReleased(MouseEvent e) {
				// TODO Auto-generated method stub
				System.out.println("Test_Editor JTextArea mouse released" + e.getX() + " " + e.getY());
				
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

		area.addFocusListener(new FocusListener() {

			@Override
			public void focusGained(FocusEvent e) {
				System.out.println("Text_Editor area focus gained");
			}

			@Override
			public void focusLost(FocusEvent e) {
				System.out.println("Text_Editor area focus lost");
			}
			
		});
		return area;
	}

	private JTextPane getEditor() {
		JTextPane editor = new JTextPane();

		
		editor.addFocusListener(new FocusListener() {

			@Override
			public void focusGained(FocusEvent e) {
				System.out.println("Text_Editor editor focus gained");
			}

			@Override
			public void focusLost(FocusEvent e) {
				System.out.println("Text_Editor editor focus lost");
			}
			
		});

		editor.setPreferredSize(new Dimension(400,300));
		System.out.println("Test_Editor " + editor.getDocument());
		System.out.println("Test_Editor " + editor.getEditorKit());
		editor.setText(test);
		//editor.setEditable(false);
		
		System.out.println("Test_Editor Element count = " + editor.getDocument().getRootElements()[0].getElementCount());
		editor.setBackground(new Color(200, 200, 200));
		editor.setFont(new Font(Font.SANS_SERIF, Font.PLAIN, 16));
		System.out.println(editor.getPreferredSize());
		
		Style style = editor.addStyle("Red", null);
		StyleConstants.setForeground(style, Color.red);

		editor.addPropertyChangeListener(new PropertyChangeListener() {

			@Override
			public void propertyChange(PropertyChangeEvent evt) {
				System.out.println(evt.getPropertyName() + " " + evt);
			}

		});

		editor.addCaretListener(new CaretListener() {

			@Override
			public void caretUpdate(CaretEvent e) {
				System.out.println("Test_Editor JTextPane caret:" + e);
				// dumpRoot(editor.getDocument());
			}

		});
		
		editor.addMouseListener(new MouseListener() {

			@Override
			public void mouseClicked(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void mousePressed(MouseEvent e) {
				System.out.println("Test_Editor editor mouse pressed");
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

		
		DefaultCaret c = new DefaultCaret() {
		};
		c.install(editor);
		editor.setCaret(c);

		return editor;
	}

	KeyListener ka = new KeyAdapter() {
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
	
	private JMenuBar getMenuBar(JPanel ptop) {
		JMenuBar mb = new JMenuBar();
		JMenu mb1 = new JMenu("Test");
		mb1.setMnemonic('t');
		JMenuItem mb1a = new JMenuItem("test-1");
		JMenuItem mb1b = new JMenuItem("test-2");
		JMenuItem mb1c = new JMenuItem("test-3");
		JMenuItem mb1d = new JMenuItem("test-4");
		JMenuItem mb1e = new JMenuItem("test-5");
		mb1a.setMnemonic('1');
		mb1b.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_C, KeyEvent.CTRL_MASK));
		mb1c.setMnemonic('3');
		mb1d.setMnemonic('4');
		mb1e.setMnemonic('5');
		mb1.add(mb1a);
		mb1.add(mb1b);
		mb1.add(mb1c);
		mb1.add(mb1d);
		mb1.add(mb1e);
		mb.add(mb1);
		setJMenuBar(mb);
		
		ActionListener al = new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				ptop.setBackground(Color.cyan);
			}
			
		};
		
		mb1a.addActionListener(al);

		mb1b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				ptop.setBackground(Color.YELLOW);
			}
			
		});

		mb1c.addActionListener(al);
		mb1d.addActionListener(al);
		mb1e.addActionListener(al);

		return mb;
	}
	private JPanel getTopPanel() {
	    JPanel ptop = new JPanel();
		ptop.setPreferredSize(new Dimension(300,100));
		ptop.setMaximumSize(new Dimension(400, 100));
		ptop.setBackground(Color.LIGHT_GRAY);
		ptop.setOpaque(true);
		
		ptop.addMouseListener(new MouseAdapter() {
			@Override
			public void mousePressed(MouseEvent e) {
				System.out.println("Test_Editor ptop mouse pressed");
				ptop.requestFocusInWindow();
			}
			
		});
		ptop.addFocusListener(new FocusListener() {

			@Override
			public void focusGained(FocusEvent e) {
				System.out.println("ptop focus gained");
				//ptop.setBackground(Color.LIGHT_GRAY);
			}

			@Override
			public void focusLost(FocusEvent e) {
				System.out.println("ptop focus lost");
				//ptop.setBackground(Color.MAGENTA);
			}
			
		});
		return ptop;
	}

	private void addFocusListener() {
	   	
		addFocusListener(new FocusListener() {

			@Override
			public void focusGained(FocusEvent e) {
				System.out.println("frame focus gained");
				//ptop.setBackground(Color.LIGHT_GRAY);
			}

			@Override
			public void focusLost(FocusEvent e) {
				System.out.println("frame focus lost");
				//ptop.setBackground(Color.MAGENTA);
			}
			
		});


		getRootPane().addFocusListener(new FocusListener() {

			@Override
			public void focusGained(FocusEvent e) {
				System.out.println("frame RP focus gained");
				//ptop.setBackground(Color.LIGHT_GRAY);
			}

			@Override
			public void focusLost(FocusEvent e) {
				System.out.println("frame RP focus lost");
				//ptop.setBackground(Color.MAGENTA);
			}
			
		});
	}

	protected void showKeyEvent(KeyEvent e) {		
		System.out.println("Test_Editor keyEvent id=" + e.getID() 
				+ " " + ((JComponent) e.getSource()).getUIClassID() 
				+ " char=" + e.getKeyChar() 
				+ " code=" + e.getKeyCode() 
				+ " loc=" + e.getKeyLocation()
				+ "\n mod=" + e.getModifiers()
				+ " " + KeyEvent.getKeyModifiersText(e.getModifiers())
				+ " modx=" + e.getModifiersEx()
				+ " " + KeyEvent.getKeyModifiersText(e.getModifiersEx())
		);
	}

	protected void dumpRoot(Document document) {
		dumpElement(0, document.getRootElements()[0]);
	}

	private void dumpElement(int index, Element element) {
		System.out.println("Test_Editor i=" + index + " e=" + element.toString());
		for (int i = 0, n = element.getElementCount(); i < n; i++)
			dumpElement((index + 1) * 100, element.getElement(i));

	}

	public static void main(String[] args) {
		new Test_Editor();
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
