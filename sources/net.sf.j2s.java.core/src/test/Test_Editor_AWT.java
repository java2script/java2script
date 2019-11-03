package test;

import java.awt.BorderLayout;
import java.awt.Button;
//import java.awt.Button;
import java.awt.Color;
import java.awt.Component;
import java.awt.DefaultKeyboardFocusManager;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Frame;
import java.awt.Panel;
import java.awt.TextArea;
import java.awt.TextField;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.util.Arrays;

import javax.swing.JComponent;

public class Test_Editor_AWT extends Frame {

	String test = "  34567890\n1234567890\n  345\n     ";

	private TextArea area;

	public static void main(String[] args) {
		new Test_Editor_AWT();
	}

	public Test_Editor_AWT() {

		setSize(800,400);
		Panel ptop = getTopPanel();
		// ptop.setFocusable(false);

		TextArea editor = getArea();
		area = getArea();

		TextField field = getField();

		TextArea area1 = new TextArea();
		// area1.setPreferredSize(new Dimension(300, 300));

		Panel panel = getButtonPanel(editor, area, area1, field);

		ptop.setLayout(new BorderLayout());
		ptop.add(editor, BorderLayout.WEST);
		ptop.add(area, BorderLayout.CENTER);
		ptop.add(area1, BorderLayout.EAST);
		Panel full = new Panel(new BorderLayout());
		full.add(ptop, BorderLayout.NORTH);
		full.add(panel, BorderLayout.SOUTH);

		add(full);
		pack();
		setVisible(true);

	}

	int n;

	private Panel getButtonPanel(TextArea editor, TextArea area, TextArea area1, TextField field) {
		Panel panel = new Panel();

		Button btop = new Button("top");
		btop.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				editor.setCaretPosition(0);
				area.setCaretPosition(0);
				area.requestFocus();
				editor.requestFocus();
				area1.setCaretPosition(0);
				area1.requestFocus();
			}

		});

		Button b;

		b = new Button("clear");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				editor.setText("");
//				btop.setEnabled(!btop.isEnabled());
			}

		});
		b.addFocusListener(fl);
		panel.add(b);

		b = new Button("caret+1");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				editor.setCaretPosition(editor.getCaretPosition() + 1);
				editor.requestFocus();
			}

		});
		b.addFocusListener(fl);
		panel.add(b);
		b = new Button("caret+1(r)");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				editor.setCaretPosition(editor.getCaretPosition() + 1);
				area.requestFocus();
			}

		});
		b.addFocusListener(fl);
		panel.add(b);

		b = new Button("sel7-10");
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

		b = new Button("end1");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
//				editor.setCaretPosition(editor.getDocument().getLength());
				area.setCaretPosition(area.getDocument().getLength());
				area.requestFocus();
//				editor.requestFocus();
			}

		});
		b.addFocusListener(fl);
		panel.add(b);

		b = new Button("end2");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				area1.setCaretPosition(area1.getText().length());
				area1.requestFocus();
			}

		});
		b.addFocusListener(fl);
		panel.add(b);

		b = new Button("sel7-10-area");
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

		b = new Button("app1");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action 1 " + e.getSource() + " " + getID(e.getSource()));
				area.append("\ntesting" + ++n);
//				area.requestFocus();
			}

		});
		b.addFocusListener(fl);
		panel.add(b);

		b = new Button("app2");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_Editor action " + getID(e.getSource()));
				area1.requestFocus();
				area1.append("\ntesting" + ++n);
			}

		});
		b.addFocusListener(fl);
		panel.add(b);

		b = new Button("sel3-5-field");
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
		panel.add(field);
		return panel;
	}

	private TextField getField() {

		TextField field = new TextField("testing");
		field.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("Test_field action " + getID(e.getSource()));

				TextArea a = area;
				int n = Integer.valueOf(field.getText());
				TextField f = field;
				/**
				 * @j2sNative 
				 * 
				  aa = a; 
				  d = aa.ui.domNode; 
				  d.style.overflowY = "auto";
				  setTimeout(function() {
				  
				  aa.setCaretPosition$I(n);
				  ttop = -1;
var ff = function() {ttop = d.scrollTop;d.style.overflowY = "hidden"; 
				 System.out.println("ttop is " + ttop);
				 setTimeout(function(){d.scrollTop = ttop;},0)};
				   setTimeout(ff,50);
				   
				   },0)
				   
				 */
				
				
			}

		});

		return field;
	}

	private TextArea getArea() {
		TextArea area = new TextArea("testing", 30,30,TextArea.SCROLLBARS_NONE) {
			@Override
			public void setCaretPosition(int i) {
				System.out.println("Test_Editor JTextArea setCP " + i);
				super.setCaretPosition(i);
			}
		};

		/**
		 * @j2sNative self.xxa || (xxa = area)
		 */

		area.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 16));
		area.setText(test);
		area.setBackground(new Color(200, 200, 180));
		area.addMouseListener(ml);
		return area;
	}

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

	protected String getID(Object jc) {
		return (jc == null ? null : jc instanceof JComponent ? /** @j2sNative jc.ui.id || */
				((JComponent) jc).getUIClassID() : jc.getClass().getName());
	}

	private Panel getTopPanel() {
		Panel ptop = new Panel();
		ptop.setPreferredSize(new Dimension(300, 100));
		ptop.setMaximumSize(new Dimension(400, 100));
		ptop.setBackground(Color.LIGHT_GRAY);
		return ptop;
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
