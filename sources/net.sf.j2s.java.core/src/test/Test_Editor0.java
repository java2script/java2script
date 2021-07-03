package test;

import java.awt.Component;
import java.awt.DefaultKeyboardFocusManager;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.JApplet;
import javax.swing.JComponent;
import javax.swing.JEditorPane;
import javax.swing.JFrame;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.event.CaretEvent;
import javax.swing.event.CaretListener;
import javax.swing.text.Document;
import javax.swing.text.EditorKit;
import javax.swing.text.StyledEditorKit;

public class Test_Editor0 extends JApplet {

	static String test = "123\n\n678\n\n123\n";

	public static void main(String[] args) {
		new Test_EditorFrame();
	}

	static class Test_EditorFrame  extends JFrame {

		Test_EditorFrame() {
		//JTextField field = getField();
		JEditorPane area = getEditor();
		System.out.println(area.getDocument());
		area.setPreferredSize(new Dimension(300,300));
		//area.addKeyListener(ka);s
		JScrollPane js2 = new JScrollPane(area);
		js2.setPreferredSize(new Dimension(300, 300));
		js2.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
		js2.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);

		add(js2);
		pack();
		setVisible(true);
		//field.addKeyListener(ka);
		//getContentPane().addKeyListener(ka);
		}
	}
	
	
	
	public Test_Editor0() {

	//	setTitle("testing editor");
		setLocation(100, 100);
		//JTextArea area = getArea();
//		
//		JScrollPane js2 = new JScrollPane(area);
//		js2.setPreferredSize(new Dimension(300, 300));
//		js2.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
//		js2.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);

		JTextField field = getField();

		add(field);
	//	pack();
		setVisible(true);
		field.addKeyListener(ka);
	}

	int n;

	static private JTextField getField() {

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

	private static JTextArea getArea() {
		JTextArea area = new JTextArea() {
		};

//		DefaultCaret c = new DefaultCaret() {
//			@Override
//			protected void fireStateChanged() {
//				System.out.println("Test_Editor area caret firestatechanged " + area.getCaretPosition());
//				super.fireStateChanged();
//			}
//
//		};
//		c.install(area);
//		area.setCaret(c);
//		System.out.println(area.getCaret().getClass().getName());

		area.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 16));
		area.setText(test);
		//area.setBackground(new Color(200, 200, 180));
//		// area.setEditable(false);
//		area.addCaretListener(new CaretListener() {
//
//			@Override
//			public void caretUpdate(CaretEvent e) {
//				System.out.println("Test_Editor JTextArea  caret:" + e);
//			}
//
//		});
//
//		area.addMouseListener(ml);

		return area;
	}

	private static JEditorPane area;
	
	private static JEditorPane getEditor() {
		area = new JEditorPane() {
			@Override
			public EditorKit getEditorKit() {
				return super.getEditorKit();
			}
		    @Override
			public void setDocument(Document doc) {
		    	super.setDocument(doc);
		    }
		};
		area.setEditorKit(new StyledEditorKit());
		area.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 16));
		area.setText(test);
		area.addKeyListener(ka);
		area.addKeyListener(kb);
		area.addKeyListener(kc);
		area.removeKeyListener(ka);
		area.addKeyListener(ka);
		//area.setBackground(new Color(200, 200, 180));
	return area;
	}
	
	
	static KeyListener kc = new KeyAdapter() {
		public void keyPressed(KeyEvent e) {
			System.out.println("kc");
		}
		
	};

	static KeyListener kb = new KeyAdapter() {
		public void keyPressed(KeyEvent e) {
			System.out.println("kb");
		}
	};
	

	static KeyListener ka = new KeyAdapter() {
		@Override
		public void keyPressed(KeyEvent e) {
			//e.consume();
			showKeyEvent("PRESSED",e);
			// Tab only consumed on press
			if (e.getKeyCode() == KeyEvent.VK_TAB)
				e.consume();
//			System.out.println(area.getFont());
//			if (e.getKeyChar() == 'X')
//				setFontTo(new Font(Font.MONOSPACED, Font.PLAIN, area.getFont().getSize() * 2));
		}

		@Override
		public void keyTyped(KeyEvent e) {
			//e.consume();
			showKeyEvent("TYPED", e);
			// regular keys only consumed on typed
			if (e.getKeyChar() == '6')
				e.consume();
		}

		@Override
		public void keyReleased(KeyEvent e) {
			//e.consume();
			showKeyEvent("RELEASED", e);
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

	static protected String getID(Object jc) {
		return (jc == null ? null : jc instanceof JComponent ? /** @j2sNative jc.ui.id || */
				((JComponent) jc).getUIClassID() : jc.getClass().getName());
	}

	protected static void setFontTo(Font font) {
		
		area.setFont(font);
//	    JEditorPane jtp;
//	    
//	        // Start with the current input attributes for the JTextPane. This
//	        // should ensure that we do not wipe out any existing attributes
//	        // (such as alignment or other paragraph attributes) currently
//	        // set on the text area.
//	        MutableAttributeSet attrs = jtp.getInputAttributes();
//
//	        // Set the font family, size, and style, based on properties of
//	        // the Font object. Note that JTextPane supports a number of
//	        // character attributes beyond those supported by the Font class.
//	        // For example, underline, strike-through, super- and sub-script.
//	        StyleConstants.setFontFamily(attrs, font.getFamily());
//	        StyleConstants.setFontSize(attrs, font.getSize());
//	        StyleConstants.setItalic(attrs, (font.getStyle() & Font.ITALIC) != 0);
//	        StyleConstants.setBold(attrs, (font.getStyle() & Font.BOLD) != 0);
//
//	        // Set the font color
//	        StyleConstants.setForeground(attrs, c);
//
//	        // Retrieve the pane's document object
//	        StyledDocument doc = jtp.getStyledDocument();
//
//	        // Replace the style for the entire document. We exceed the length
//	        // of the document by 1 so that text entered at the end of the
//	        // document uses the attributes.
//	        doc.setCharacterAttributes(0, doc.getLength() + 1, attrs, false);
//		// TODO Auto-generated method stub
//		
	}

	protected static void showKeyEvent(String msg, KeyEvent e) {
		String source = /** @j2sNative (xxx = e).bdata.jqevent.originalEvent.target.id || */
				"";
		System.out.println(
				"Test_Editor keyEvent " + msg + " id=" + e.getID() + " " + ((JComponent) e.getSource()).getClass().getName() + " "
						+ source + " char=" + e.getKeyChar() + " code=" + e.getKeyCode() + " loc=" + e.getKeyLocation()
						+ "\n mod=" + e.getModifiers() + " " + KeyEvent.getKeyModifiersText(e.getModifiers()) + " modx="
						+ e.getModifiersEx() + " " + KeyEvent.getKeyModifiersText(e.getModifiersEx()));
	}


}
