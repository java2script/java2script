package test;

import java.awt.BorderLayout;
import java.awt.Color;
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
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.JTextPane;
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

	public Test_Editor() {

		String test = "  34567890\n1234567890\n  345\n     ";

		setTitle("testing editor");
		setLocation(100, 100);
		JTextPane editor = new JTextPane() {
		};
		
		editor.setPreferredSize(new Dimension(400,300));
		System.out.println("Test_Editor " + editor.getDocument());
		System.out.println("Test_Editor " + editor.getEditorKit());
		editor.setText(test);
		//editor.setEditable(false);
		
		System.out.println("Test_Editor Element count = " + editor.getDocument().getRootElements()[0].getElementCount());
		editor.setBackground(new Color(200, 200, 200));
		editor.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 16));
		System.out.println(editor.getPreferredSize());
		
		JScrollPane js = new JScrollPane(editor);
		js.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
	
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
				System.out.println("JTextPane caret:" + e);
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
				System.out.println("editor mouse pressed");
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
		
		JTextArea area = new JTextArea();
		
		
		c = new DefaultCaret() {
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
				System.out.println("JTextArea  caret:" + e);
			}

		});

		area.addMouseListener(new MouseListener() {

			@Override
			public void mouseClicked(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void mousePressed(MouseEvent e) {
				System.out.println("JTextArea mouse pressed" + e.getX() + " " + e.getY());
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

		JTextField field = new JTextField("testing");
		field.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("JTextField action");
			}
			
		});
		
		field.addCaretListener(new CaretListener() {

			@Override
			public void caretUpdate(CaretEvent e) {
				System.out.println("JTextField  caret:" + e);
			}

		});
		
		JScrollPane js2 = new JScrollPane(area);
		js2.setPreferredSize(new Dimension(300, 300));
		js2.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
		js2.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);


		Box box = Box.createHorizontalBox();
		box.add(js);
		box.add(Box.createHorizontalStrut(20));
		box.add(js2);
		add(box);

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
				System.out.println("caret now " + editor.getCaretPosition() + " " + editor.getSelectedText());
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

		add(panel, BorderLayout.SOUTH);
		pack();
		setVisible(true);
		
		new DropTarget(editor, this);
		new DropTarget(area, this);
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
