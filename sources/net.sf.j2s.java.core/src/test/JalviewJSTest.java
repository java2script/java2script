package test;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.ComponentOrientation;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.MediaTracker;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.AbstractButton;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JCheckBoxMenuItem;
import javax.swing.JDesktopPane;
import javax.swing.JFrame;
import javax.swing.JInternalFrame;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JRadioButton;
import javax.swing.JRadioButtonMenuItem;
import javax.swing.KeyStroke;
import javax.swing.MenuElement;
import javax.swing.MenuSelectionManager;
import javax.swing.SwingConstants;
import javax.swing.WindowConstants;
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
	public static void main(String[] args) {
		new JalviewJSTest().doTest();
	}

	private JMenuItem mb5;
	private JMenuItem testbtn;

	JMenuBar mb = new JMenuBar();
	JFrame frame = new JFrame();

	JMenu mRight = new JMenu("right") 		{
		@Override
		public void processKeyEvent(KeyEvent e, MenuElement[] path, MenuSelectionManager m) {
			System.out.println("RIGHT JMenu path length=" + path.length + " key=" + e.getKeyCode()); 	
			for (int i = 0; i < path.length; i++)
				System.out.println("[" + i + "]" + path[i].getClass().getName()  + "  "+ (path[i] instanceof JMenuItem ? ((JMenuItem) path[i]).getText() : ""));
			super.processKeyEvent(e, path, m);
		}
	}
;

	ActionListener listener = new ActionListener() {

		@Override
		public void actionPerformed(ActionEvent e) {
			System.out.println("actionPerformed: " + e);
		}

	};

	/**
	 * Put some content in a JFrame and show it
	 */
	void doTest() {

		// JInternalFrame main = new JInternalFrame();

		frame.addKeyListener(new KeyListener() {

			@Override
			public void keyTyped(KeyEvent e) {
				System.out.println(e);
			}

			@Override
			public void keyPressed(KeyEvent e) {
				System.out.println(e);
			}

			@Override
			public void keyReleased(KeyEvent e) {
				System.out.println(e);
			}

		});

		frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

		JMenu menu = new JMenu("testing");
		JMenu menu1 = new JMenu("testing1");
		JMenu menu2 = new JMenu("testing2");
		menu.setHorizontalAlignment(SwingConstants.RIGHT);

		frame.setJMenuBar(mb);
		mb.add(menu);
		mb.add(menu1);
		mb.add(menu2);
		frame.setContentPane(getVisualPaneContent(menu, menu1, menu2));
		frame.pack();

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

		frame.addMouseListener(new MouseListener() {

			@Override
			public void mouseClicked(MouseEvent e) {
			}

			@Override
			public void mousePressed(MouseEvent e) {
				// TODO Auto-generated method stub

			}

			@Override
			public void mouseReleased(MouseEvent e) {
				System.out.println(e.getButton());
				if (e.getButton() != MouseEvent.BUTTON3)
					return;
				int n = pmenu.getComponentCount();
				if (n > 1)
					pmenu.remove(n - 1);
				pmenu.show(frame, 100, 100);
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

		frame.setVisible(true);

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
		panel.setPreferredSize(new Dimension(400, 500));
		panel.setOpaque(true);
		panel.setLayout(new BorderLayout());

		JPanel firstColumn = new JPanel();
		firstColumn.setLayout(new GridLayout(13, 1));
		firstColumn.setBorder(new TitledBorder("column 1"));

		JLabel l1 = new JLabel(getImage("test2.png"));
		l1.setText("trailing right");
		l1.setHorizontalTextPosition(SwingConstants.TRAILING);
		l1.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
		l1.setHorizontalAlignment(SwingConstants.RIGHT);

		JLabel l2 = new JLabel(getImage("test2.png"));
		l2.setText("leading left");
		l2.setFont(font);
		l2.setHorizontalTextPosition(SwingConstants.LEADING);
		l2.setHorizontalAlignment(SwingConstants.LEFT);

		JButton b1 = new JButton("right left");
		b1.setIcon(getImage("test2.png"));
		b1.setFont(font);
		b1.setBorder(new LineBorder(Color.red, 5));
		b1.setHorizontalTextPosition(SwingConstants.RIGHT);
		b1.setHorizontalAlignment(SwingConstants.LEFT);

		JCheckBox cb3 = new JCheckBox("leading,left-to-right,rt");
		cb3.setFont(font);
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

		JRadioButton rb1 = new JRadioButton("trailing,right-to-left");
		rb1.setFont(font);
		rb1.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		rb1.setHorizontalTextPosition(SwingConstants.TRAILING);

		JRadioButton rb2 = new JRadioButton("right,left-to-right");
		rb2.setFont(font);
		rb2.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
		rb2.setHorizontalTextPosition(SwingConstants.RIGHT);

		JRadioButton rb3 = new JRadioButton("right,r2l");
		rb3.setFont(font);
		rb3.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		rb3.setHorizontalTextPosition(SwingConstants.RIGHT);

		firstColumn.add(l1);
		firstColumn.add(l2);
		firstColumn.add(b1);
		firstColumn.add(cb3);
		firstColumn.add(cb4);
		firstColumn.add(cb5);
		firstColumn.add(rb1);
		firstColumn.add(rb2);
		firstColumn.add(rb3);
		firstColumn.setBounds(100, 40, 200, 300);

		JMenuItem cb3m = new JMenuItem("XXleading,left-to-rightXX");
		cb3m.setFont(font);
		cb3m.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
		cb3m.setHorizontalTextPosition(SwingConstants.LEADING);
		cb3m.addActionListener(listener);

		JCheckBoxMenuItem cb4m = new JCheckBoxMenuItem("XXleading,right-to-leftXX");
		cb4m.setFont(font);
		cb4m.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		cb4m.setHorizontalTextPosition(SwingConstants.LEADING);
		cb4m.addActionListener(listener);

		JCheckBoxMenuItem cb5m = new JCheckBoxMenuItem("XXCb5mtrailing,left-to-rightXX"){
			@Override
			public void processKeyEvent(KeyEvent e, MenuElement[] path, MenuSelectionManager m) {
				System.out.println("CB5M JMenu path length=" + path.length + " key=" + e.getKeyCode()); 	
				for (int i = 0; i < path.length; i++)
					System.out.println("[" + i + "]" + path[i].getClass().getName()  + "  "+ (path[i] instanceof JMenuItem ? ((JMenuItem) path[i]).getText() : ""));
				super.processKeyEvent(e, path, m);
			}
		};
		cb5m.setFont(font);
		cb5m.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
		cb5m.setHorizontalTextPosition(SwingConstants.TRAILING);
		cb5m.addActionListener(listener);

		JCheckBoxMenuItem cb6m = new JCheckBoxMenuItem("XXtrailing,r2l1XX");
		cb6m.setFont(font);
		cb6m.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		cb6m.setHorizontalTextPosition(SwingConstants.TRAILING);
		cb6m.addActionListener(listener);

		JRadioButtonMenuItem rb1m = new JRadioButtonMenuItem("XXtrailing,r2l2XX");
		rb1m.setFont(font);
		rb1m.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		rb1m.setHorizontalTextPosition(SwingConstants.TRAILING);
		rb1m.addActionListener(listener);

		JRadioButtonMenuItem rb2m = new JRadioButtonMenuItem("XXright,left-to-rightXX");
		rb2m.setFont(font);
		rb2m.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
		rb2m.setHorizontalTextPosition(SwingConstants.RIGHT);
		rb2m.addActionListener(listener);
		rb2m.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_B, ActionEvent.CTRL_MASK));

		JRadioButtonMenuItem rb3m = new JRadioButtonMenuItem("XXright,r21XX");
		rb3m.setFont(font);
		rb3m.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		rb3m.setHorizontalTextPosition(SwingConstants.RIGHT);
		rb3m.addActionListener(listener);

		JMenuItem mb3 = new JMenuItem("XXright,right-2-left2XX");
		mb3.setFont(font);
		mb3.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		mb3.setHorizontalTextPosition(SwingConstants.RIGHT);

		JMenuItem mb4 = new JMenuItem("XXright,right-to-left3XX");
		mb4.setFont(font);
		mb4.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		mb4.setHorizontalTextPosition(SwingConstants.RIGHT);
		mb4.addItemListener(this);

		mb5 = new JMenuItem("XXadded r2l,rXX");
		mb5.addActionListener(listener);
		mb5.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_M, ActionEvent.ALT_MASK));
		mb5.setFont(font);
		mb5.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		mb5.setHorizontalTextPosition(SwingConstants.RIGHT);

		cb4m.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("actionPerformed: " + e);
			}

		});
		cb3m.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("actionPerformed: " + e);
			}

		});
		cb4m.setAccelerator(KeyStroke.getKeyStroke(KeyEvent.VK_N, ActionEvent.ALT_MASK | ActionEvent.CTRL_MASK | ActionEvent.SHIFT_MASK));

		JMenu m1 = new JMenu("left")
 		{
			@Override
			public void processKeyEvent(KeyEvent e, MenuElement[] path, MenuSelectionManager m) {
				System.out.println("LEFT JMenu path length=" + path.length + " key=" + e.getKeyCode()); 	
				for (int i = 0; i < path.length; i++)
					System.out.println("[" + i + "]" + path[i].getClass().getName()  + "  "+ (path[i] instanceof JMenuItem ? ((JMenuItem) path[i]).getText() : ""));
				// consuming the event preclude any further key processing. 
				// other than that, I don't see the use of this.
				// path[] is to this 
				//e.consume();
				super.processKeyEvent(e, path, m);
			}
		}
		;
		m1.setMnemonic('l');
		m1.setFont(font);
		m1.addMenuListener(this);
		m1.add(rb2m);
		menu.add(m1);

		menu1.add(cb4m);
		menu1.add(cb3m);

		menu2.add(cb5m);

		JMenuItem btn = new JMenuItem("-");
		btn.setFont(font);
		menu.add(btn);
		testbtn = new JMenuItem("testing");
		testbtn.setFont(font); 
		testbtn.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				System.out.println("You pressed button " + ((JMenuItem)e.getSource()).getText());
			}
			
		});
		menu.add(testbtn);

		menu.add(mRight);
		mRight.setMnemonic('r');
		mRight.setFont(font);
		mRight.addMenuListener(this);
		mRight.add(cb6m);
		mRight.add(rb1m);
		btn = new JMenuItem("-");
		btn.setFont(font);
		mRight.add(btn);
		mRight.add(rb3m);
		btn = new JMenuItem("-");
		btn.setFont(font);
		mRight.add(btn);
		mRight.add(mb3);
		mRight.add(mb4);

		JPanel theTab = new JPanel();

		firstColumn.add(new JButton("<html>remove <i>testbtn</i></html>") {
			{
				this.addActionListener(new ActionListener() {

					@Override
					public void actionPerformed(ActionEvent e) {
						menu.remove(testbtn);
						System.out.println("removing testbtn");
					}

				});
			}
		});
		firstColumn.add(new JButton("add 'testbtn'") {
			{
				this.addActionListener(new ActionListener() {

					@Override
					public void actionPerformed(ActionEvent e) {
						testbtn.setText("test" + ++ntest);
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
		theTab.setLayout(null);
		theTab.setBackground(Color.white);
		theTab.add(firstColumn);
		panel.add(theTab);

		return panel;
	}

	int ntest = 0;

	private ImageIcon getImage(String name) {
		ImageIcon icon = new ImageIcon(getClass().getResource(name));

		while (icon.getImageLoadStatus() == MediaTracker.LOADING)
			try {
				Thread.sleep(10);
			} catch (InterruptedException e) {
			}
		return icon;
	}

	@Override
	public void menuSelected(MenuEvent e) {
		System.out.println("menuSelected " + e.getSource().toString());
		JMenu menu = (JMenu) e.getSource();
		System.out.println("adding mb5");
		menu.add(mb5);
		System.out.println("mb5 added");
	}

	@Override
	public void menuDeselected(MenuEvent e) {
		System.out.println("menuDeselected " + e.getSource().toString());

	}

	@Override
	public void menuCanceled(MenuEvent e) {
		System.out.println("menuCanceled " + e.getSource().toString());

	}

	@Override
	public void itemStateChanged(ItemEvent e) {
		System.out.println("itemStateChanged " + e.getItem());

	}
}
