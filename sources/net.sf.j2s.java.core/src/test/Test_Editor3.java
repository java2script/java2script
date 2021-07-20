package test;

//import java.awt.Button;
import java.awt.Color;
import java.awt.Component;
import java.awt.DefaultKeyboardFocusManager;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Frame;
import java.awt.TextArea;
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
import javax.swing.JTextField;
import javax.swing.JTextPane;
import javax.swing.event.CaretEvent;
import javax.swing.event.CaretListener;
import javax.swing.text.Document;
import javax.swing.text.EditorKit;

public class Test_Editor3 extends JApplet {

	static String test = "1234567890";

	public static void main(String[] args) {
		new Test_EditorFrame();
	}

	static class Test_EditorFrame  extends Frame {

		Test_EditorFrame() {
		//JTextField field = getField();
		TextArea area = getArea();
		area.setPreferredSize(new Dimension(300,300));
		add(area);
		pack();
		setVisible(true);
		//field.addKeyListener(ka);
		//getContentPane().addKeyListener(ka);
		}
	}
	
	
	
	public Test_Editor3() {

	//	setTitle("testing editor");
		setLocation(100, 100);
		//JTextArea area = getArea();
		
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

	private static TextArea getArea() {
		TextArea area = new TextArea() {
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
		area.setBackground(new Color(200, 200, 180));
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

	private static JEditorPane getEditor() {
		JEditorPane area = new JTextPane() {
			@Override
			public EditorKit getEditorKit() {
				return super.getEditorKit();
			}
		    @Override
			public void setDocument(Document doc) {
		    	super.setDocument(doc);
		    }
		};

		area.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 16));
		area.setText(test);
		area.setBackground(new Color(200, 200, 180));
	return area;
	}

	static KeyListener ka = new KeyAdapter() {
		@Override
		public void keyPressed(KeyEvent e) {
			//e.consume();
			showKeyEvent(e);
		}

		@Override
		public void keyTyped(KeyEvent e) {
			//e.consume();
			showKeyEvent(e);
		}

		@Override
		public void keyReleased(KeyEvent e) {
			//e.consume();
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

	static protected String getID(Object jc) {
		return (jc == null ? null : jc instanceof JComponent ? /** @j2sNative jc.ui.id || */
				((JComponent) jc).getUIClassID() : jc.getClass().getName());
	}

	protected static void showKeyEvent(KeyEvent e) {
		String source = /** @j2sNative (xxx = e).bdata.jqevent.originalEvent.target.id || */
				"";
		System.out.println(
				"Test_Editor keyEvent id=" + e.getID() + " " + ((JComponent) e.getSource()).getClass().getName() + " "
						+ source + " char=" + e.getKeyChar() + " code=" + e.getKeyCode() + " loc=" + e.getKeyLocation()
						+ "\n mod=" + e.getModifiers() + " " + KeyEvent.getKeyModifiersText(e.getModifiers()) + " modx="
						+ e.getModifiersEx() + " " + KeyEvent.getKeyModifiersText(e.getModifiersEx()));
	}


}
