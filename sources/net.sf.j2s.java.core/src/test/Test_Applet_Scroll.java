package test;

//web_Ready
//web_AppletName= MyTest1
//web_Description= A test
//web_JavaVersion= http://www.dmitry
//web_AppletImage= dddd
//web_Category= test
//web_Date= $Date$
//web_Features= graphics, AWT-to-Swing

import java.awt.Adjustable;
import java.awt.Color;
import java.awt.Cursor;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.ActionEvent;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.awt.event.MouseWheelEvent;
import java.awt.event.MouseWheelListener;
import java.awt.font.TextAttribute;
import java.text.DecimalFormat;
import java.util.EventListener;

import javax.swing.ButtonGroup;
import javax.swing.JApplet;
import javax.swing.JComboBox;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollBar;
import javax.swing.JScrollPane;
import javax.swing.JSlider;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.JToggleButton;
import javax.swing.SwingConstants;
import javax.swing.border.EmptyBorder;
import javax.swing.border.LineBorder;
import javax.swing.border.TitledBorder;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;
import javax.swing.event.EventListenerList;
import javax.swing.event.UndoableEditListener;
import javax.swing.text.AttributeSet;
import javax.swing.text.BadLocationException;
import javax.swing.text.Document;
import javax.swing.text.Element;
import javax.swing.text.PlainDocument;
import javax.swing.text.Position;
import javax.swing.text.Segment;

import swingjs.plaf.JSPanelUI;

public class Test_Applet_Scroll extends JApplet implements ChangeListener, MouseListener, MouseMotionListener {


//	class SimpleDocument implements Document {
//
//		public class DocEvent implements DocumentEvent {
//
//			private EventType type;
//			private int offset;
//			private int length;
//
//			public DocEvent(int offset, int length, EventType type) {
//				this.type = type;
//				this.offset = offset;
//				this.length = length;
//			}
//
//			@Override
//			public int getOffset() {return offset;}
//
//			@Override
//			public int getLength() {return length;}
//
//			@Override
//			public Document getDocument() {
//				return SimpleDocument.this;
//			}
//
//			@Override
//			public EventType getType() {
//				return type;
//			}
//
//			@Override
//			public ElementChange getChange(Element elem) {
//				return null;
//			}
//
//		}
//
//		private StringBuffer myText = new StringBuffer();
//
////		Element root = new Element() {
////
////		
////			@Override
////			public Document getDocument() {
////				return SimpleDocument.this;
////			}
////
////			@Override
////			public Element getParentElement() {
////				return null;
////			}
////
////			@Override
////			public String getName() {
////				return "root";					}
////
////			@Override
////			public AttributeSet getAttributes() {
////				return null;
////			}
////
////			@Override
////			public int getStartOffset() {
////				return 0;
////			}
////
////			@Override
////			public int getEndOffset() {
////				return myText.length();
////			}
////
////			@Override
////			public int getElementIndex(int offset) {
////				return 0;
////			}
////
////			@Override
////			public int getElementCount() {
////				return 0;
////			}
////
////			@Override
////			public Element getElement(int index) {
////				return null;
////			}
////
////			@Override
////			public boolean isLeaf() {
////				return true;
////			}
////			
////		};
//
//		@Override
//		public int getLength() {
//			return myText.length();
//		}
//
//		@Override
//		public void addDocumentListener(DocumentListener listener) {
//			listenerList.add(DocumentListener.class, listener);
//		}
//
//		@Override
//		public void removeDocumentListener(DocumentListener listener) {
//			listenerList.remove(DocumentListener.class, listener);
//		}
//
//		@Override
//		public void addUndoableEditListener(UndoableEditListener listener) {
//			System.out.println(listener);
//		}
//
//		@Override
//		public void removeUndoableEditListener(UndoableEditListener listener) {
//			System.out.println(listener);
//		}
//
//		@Override
//		public Object getProperty(Object key) {
////			if (key == TextAttribute.RUN_DIRECTION)
////				return TextAttribute.RUN_DIRECTION_LTR;
////			if (key.toString().equals("tabSize"))
////				return  new Integer(8);
//			return null;
//		}
//
//		@Override
//		public void putProperty(Object key, Object value) {
////			System.out.println("putprop " + key + " " + value);
//		}
//
//		@Override
//		public void remove(int offs, int len) throws BadLocationException {
//			if (len <= 0)
//				return;
//			if (offs < 0 || (offs + len) > getLength()) {
//				throw new BadLocationException("Invalid remove", getLength() + 1);
//			}
//			myText.replace(offs,  len,  "");
//			
//				DocEvent chng = new DocEvent(offs, len, DocumentEvent.EventType.REMOVE);
//
//				//postRemoveUpdate(chng);
//				fireRemoveUpdate(chng);
//		}
//
//		@Override
//		public void insertString(int offset, String str, AttributeSet a) throws BadLocationException {
//			if ((str == null) || (str.length() == 0)) {
//				return;
//			}
//			myText.insert(offset, str);
//			DocEvent e = new DocEvent(offset, str.length(), DocumentEvent.EventType.INSERT);
//			fireInsertUpdate(e);
//		}
//
//		@Override
//		public String getText(int offset, int length) throws BadLocationException {
//			return myText.substring(offset, offset + length);
//		}
//
//		char[] achar = new char[0];
//		@Override
//		public void getText(int offset, int length, Segment txt) throws BadLocationException {
//			System.out.println("getText");
//			if (length > 0) {
//				if (achar.length < offset + length) 
//					achar = new char[offset + length * 2];
//				if (txt.array != achar)
//					txt.array = achar;
//				myText.getChars(offset, offset + length, achar, offset);
//			}
//			txt.offset = offset;
//			txt.count = length;
//		}
//
//		@Override
//		public Position getStartPosition() {
//			return null;
////			System.out.println("getstartpos");
////			return new Position() {
////
////				@Override
////				public int getOffset() {
////					return 0;
////				}
////				
////			};
//		}
//
//		@Override
//		public Position getEndPosition() {
//			System.out.println("getendpos");
//			return null;
////			return new Position() {
////
////				@Override
////				public int getOffset() {
////					return myText.length();
////				}
////				
////			};
//		}
//
//		@Override
//		public Position createPosition(int offs) throws BadLocationException {
//			return null;
////			return new Position() {
////
////				@Override
////				public int getOffset() {
////					return offs;
////				}
////				
////			};
//		}
//
//		@Override
//		public Element[] getRootElements() {
//			return null;
////			return new Element[] {root};
//		}
//
//		@Override
//		public Element getDefaultRootElement() {
//			return null;
////			return root;
//		}
//
//
//
//		@Override
//		public void render(Runnable r) {
//		}
//
//		protected void fireInsertUpdate(DocumentEvent e) {
//			try {
//				Object[] listeners = listenerList.getListenerList();
//				for (int i = listeners.length - 2; i >= 0; i -= 2) {
//					if (listeners[i] == DocumentListener.class) {
//						((DocumentListener) listeners[i + 1]).insertUpdate(e);
//					}
//				}
//			} finally {
////	            notifyingListeners = false;
//			}
//		}
//		protected void fireRemoveUpdate(DocumentEvent e) {
//			try {
//				Object[] listeners = listenerList.getListenerList();
//				for (int i = listeners.length - 2; i >= 0; i -= 2) {
//					if (listeners[i] == DocumentListener.class) {
//						((DocumentListener) listeners[i + 1]).removeUpdate(e);
//					}
//				}
//			} finally {
////	            notifyingListeners = false;
//			}
//		}
//		protected EventListenerList listenerList = new EventListenerList();
//		public <T extends EventListener> T[] getListeners(Class<T> listenerType) {
//			return listenerList.getListeners(listenerType);
//		}
//
//
//}

	
	static {
		/**
		 * @j2sNative
		 * 
		 * 	J2S.thisApplet.__Info.width = 800;
		 *  J2S.thisApplet.__Info.height = 400;
		 *  J2S.thisApplet.__Info.isResizable = true;
		 */
	}
	static DecimalFormat df = new DecimalFormat("0.00");

	boolean preferred = true;

//	private JScrollBar hsb;
//
//	private JScrollBar sbar;

	private JPanel panel2;

	private JSlider vslider;

	private JPanel vp;

	private JScrollPane sp;

	void setSize(JComponent c, int x, int y) {
		if (preferred)
			c.setPreferredSize(new Dimension(x, y));
		else
			c.setSize(x, y);
	}

	@Override 
	public void paint(Graphics g) {
		System.out.println("appletPaint");
		super.paint(g);
	}
	
	@Override 
	public void update(Graphics g) {
		System.out.println("appletUpdate");
		super.update(g);
	}
	
	
	@Override
	public void init() {
		final JLabel label = new JLabel("hello") {
			@Override
			public void paintComponent(Graphics g) {
				super.paintComponent(g);
//				/**@j2sNative g.unclip$I(-4);*/
//				Graphics2D g2 = (Graphics2D) g.create();
//				g2.setColor(Color.red);
//				g2.setClip(-60,-60, 70,70);
//				g2.fillRect(-60,-60,70,70);
//				//g2.dispose();
//				/**@j2sNative g.unclip$I(4);*/
//				
				
			}
		};
		// label.setBounds(0, 60, 200, 60);
		setSize(label, 80, 50);
		label.setBackground(Color.yellow);
		label.setForeground(Color.BLUE);
		label.setOpaque(true);
		label.setHorizontalAlignment(SwingConstants.RIGHT);
		label.setVerticalAlignment(SwingConstants.CENTER);

		final JTextField tf = new JTextField(/** @j2sNative "null" ||*/null, "12.5", 8);
//		tf.setCursor(Cursor.getPredefinedCursor(Cursor.CROSSHAIR_CURSOR));
//		final JTextField tf = new JTextField(new PlainDocument() {
//			@Override
//			public void getText(int offset, int length, Segment txt) throws BadLocationException {
//				System.out.println("getText");
//				super.getText(offset, length, txt);
//				System.out.println(txt);
//			}
//			
//		}, "12.5", 8);
		
		JPanel p = new JPanel();

//
//		tf.setBackground(Color.orange);
//		tf.setForeground(Color.yellow);
//		tf.setOpaque(true);
		setSize(tf, 80, 40);
		tf.addActionListener(new java.awt.event.ActionListener() {
			@Override
			public void actionPerformed(ActionEvent event) {
				label.setBackground(Color.white);
				label.setText(tf.getText());
				panel2.removeAll();
			   repaint();
			}
		});
		tf.addFocusListener(new FocusListener() {

			@Override
			public void focusGained(FocusEvent e) {
				tf.setBackground(Color.BLUE);
				System.out.println(p.isFocusable());
			}

			@Override
			public void focusLost(FocusEvent e) {
				tf.setBackground(Color.BLACK);
			}

		});
		tf.addMouseWheelListener(new MouseWheelListener() {
			@Override
			public void mouseWheelMoved(MouseWheelEvent e) {
				int n = e.getWheelRotation();
				tf.setText("" + (Float.parseFloat(tf.getText()) + n));
				// e.consume(); not necessary for scrollbars
			}
		});
		final JToggleButton button = new JToggleButton("ytesty");
		// BasicToggleButtonUI us; just using this to get access to code for
		// BasicToggleButtonUI
		setSize(button, 80, 20);
		button.setBackground(Color.orange);
		button.addActionListener(new java.awt.event.ActionListener() {
			@Override
			public void actionPerformed(ActionEvent event) {
				label.setBackground(button.isSelected() ? Color.green : Color.yellow);
				tf.setBackground(Color.black);
				label.setText("test");
				// repaint();
			}
		});
		final JToggleButton button2 = new JToggleButton("btn2");
		// BasicToggleButtonUI us; just using this to get access to code for
		// BasicToggleButtonUI
		setSize(button2, 80, 20);
		button2.setBackground(Color.orange);
		Test_Applet_Scroll me = this;
		button2.addActionListener(new java.awt.event.ActionListener() {
			@Override
			public void actionPerformed(ActionEvent event) {
				label.setBackground(button2.isSelected() ? Color.green : Color.yellow);
//				tf.setBackground(Color.green);
//				label.setText("btn2");
//				vp.remove(vslider);
//				vp.add(vslider);
//				JFrame frame1 = new JFrame();
//				frame1.setLocationRelativeTo(button2);
//				JPanel jp = new JPanel();
//				jp.setPreferredSize(new Dimension(150,150));
//				frame1.add(jp);
//				frame1.pack();
//				frame1.setVisible(true);
			}
		});

		// the first two buttons act like radio buttons; only one is ever ON
		
		ButtonGroup bg = new ButtonGroup();
		bg.add(button);
		bg.add(button2);

		// the third button is not part of the group
		// note that JButtonUI does not need to know anything about the groups

		final JToggleButton button3 = new JToggleButton("btn3");
		// BasicToggleButtonUI us; just using this to get access to code for
		// BasicToggleButtonUI
		setSize(button3, 80, 20);
		button3.setBackground(Color.red);
		button3.addActionListener(new java.awt.event.ActionListener() {
			@Override
			public void actionPerformed(ActionEvent event) {
				label.setBackground(button3.isSelected() ? Color.green : Color.yellow);
				tf.setBackground(Color.black);
				label.setText("btn3");
				// repaint();
			}
		});

		

		// p.setLayout(new GridLayout(2, 2, 2, 2));
		sp = new JScrollPane();
		sp.setBorder(new LineBorder(Color.GREEN,5));
		sp.setViewportBorder(new EmptyBorder(5,5,5,5));
		sp.addMouseMotionListener(this);
		sp.addMouseListener(this);
		panel2 = new JPanel();
		panel2.add(new JTextArea(10,10));
		panel2.setSize(100,100);
		p.add(panel2);
		p.addMouseListener(new MouseListener() {

			@Override
			public void mouseClicked(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void mousePressed(MouseEvent e) {
				p.requestFocus();
				System.out.println("mp" + p.hasFocus());
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

		if (/** @j2sNative 1? true : */false) {
			((JSPanelUI) p.getUI()).setPasteHandler(/** @j2sNative (function(e) { xxa = e; e.preventDefault();alert("Testing" + e.clipboardData.getData('text/plain'));}) || */null);
		}
		sp.getViewport().add(p);
		add(sp);
		sp.getViewport().addChangeListener(this);
//		hsb = sp.getHorizontalScrollBar();

		sp.getViewport().setBackground(Color.blue);
		p.setOpaque(false);
		mkBar(p, tf, Adjustable.VERTICAL, 20, 200);
		mkSlider(p, tf, Adjustable.VERTICAL, 20, 200);
		JSlider slider = mkSlider(p, tf, Adjustable.VERTICAL, 70, 200);
		vslider = slider;
		vp = p;
		slider.setInverted(false);
        slider.setPaintTicks(true);
        slider.setPaintLabels(true);
        slider.setMajorTickSpacing(100);
        p.add(label);
		p.add(tf);
		p.add(button);
		p.add(button2);
		p.add(button3);
	    JComboBox formatChoice = new JComboBox();
	    formatChoice.setName("formatChoice");
	    formatChoice.insertItemAt("bin\u00e4r", 0);
	    formatChoice.insertItemAt("hex", 1);
	    p.add(formatChoice);
		mkBar(p, tf, Adjustable.HORIZONTAL, 100, 20);
		
		
		slider = mkSlider(p, tf, Adjustable.HORIZONTAL, 100, 20);
		slider.setBorder(new TitledBorder("testing"));
        slider.setPaintTicks(true);
        slider.setPaintLabels(true);
        slider.setMajorTickSpacing(200);
        slider.setPreferredSize(new Dimension(100, 100));
        slider.setBackground(Color.YELLOW);
        slider.setForeground(Color.BLUE);
        //slider.setBorder(new LineBorder(Color.black,10));

		mkSlider(p, tf, Adjustable.HORIZONTAL, 100, 20).setInverted(true);
		System.out.println("Test_AppletScroll sp pref size " + sp.getPreferredSize());

	}

	JScrollBar mkBar(JPanel p, final JTextField tf, int orient, int x, int y) {
		final JScrollBar bar = new JScrollBar(orient, 500, 10, 300, 1000);
		bar.addAdjustmentListener(new AdjustmentListener() {

			@Override
			public void adjustmentValueChanged(AdjustmentEvent e) {
				tf.setText(df.format(e.getValue() / 100.0));
			}

		});
		bar.addMouseWheelListener(new MouseWheelListener() {
			@Override
			public void mouseWheelMoved(MouseWheelEvent e) {
				int n = e.getWheelRotation();
				bar.setValue(bar.getValue() + n * 5);
				// e.consume(); not necessary for scrollbars
			}
		});
		setSize(bar, x, y);
		bar.setBackground(Color.orange);
		bar.setForeground(Color.green);
		bar.setOpaque(true);
		p.add(bar);
//		sbar = bar;
		bar.setVisibleAmount(80);
		return bar;
	}

	JSlider mkSlider(JPanel p, final JTextField tf, int orient, int x, int y) {
		final JSlider bar = new JSlider(orient, 300, 1000, 500) 
//		{
//		    @SuppressWarnings("deprecation")
//			@Override
//				public void reshape(int x, int y, int w, int h) {
//				System.out.println("??reshape " + x + " " + y + " " + w + " " + h);
//				super.reshape(x,  y, w, h);
// 				
//			}
//		}
		;
		bar.addChangeListener(new ChangeListener() {
			@Override
			public void stateChanged(ChangeEvent e) {
				tf.setText(df.format(((JSlider) e.getSource()).getValue() / 100.0));
				doRepaint();

			}
		});
		bar.addMouseWheelListener(new MouseWheelListener() {
			@Override
			public void mouseWheelMoved(MouseWheelEvent e) {
				int n = e.getWheelRotation();
				bar.setValue(bar.getValue() + n * 5);
				// e.consume(); not necessary for sliders
			}
		});
		setSize(bar, x, y);
		bar.setBackground(Color.orange);
//		bar.setForeground(Color.green);
		bar.setOpaque(true);
		p.add(bar);
		return bar;
	}

	protected void doRepaint() {
		repaint();
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		// Viewport has scrolled
//		JViewport v = (JViewport) e.getSource();
//		System.out.println("extent " +v.getExtentSize() + " " + v.getViewPosition());
//		if (v.getViewRect().x > 0)
//			System.out.println("view change: " + v.getViewRect());
//		System.out.println(v.getWidth() + " " + v.getHeight() + " " + v.getView().getBounds());
//		System.out.println(sbar.getValue() + "  "+ sbar.getVisibleAmount() + " " + sbar.getMaximum());

	}

	@Override
	public void mouseDragged(MouseEvent e) {
		System.out.println("Test_Applet_Scroll mouseDragged " + e);
	}

	@Override
	public void mouseMoved(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mousePressed(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseEntered(MouseEvent e) {
//		System.out.println("Test_AppletScroll sp size " + sp.getSize());
//		System.out.println("Test_Applet_Scroll mouseEntered " + e);
//		
	}

	@Override
	public void mouseExited(MouseEvent e) {
	//	System.out.println("Test_Applet_Scroll mouseExited " + e);
		
	}

}
