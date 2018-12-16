package test;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.ComponentOrientation;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.GridLayout;
import java.awt.MediaTracker;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.Icon;
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
import javax.swing.SwingConstants;
import javax.swing.WindowConstants;
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
		JFrame main = new JFrame();
		main.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

		JMenu menu = new JMenu("testing");
		JMenu menu1 = new JMenu("testing1");
		JMenu menu2 = new JMenu("testing2");

		menu.setHorizontalAlignment(SwingConstants.RIGHT);
		main.setJMenuBar(new JMenuBar());
		main.getJMenuBar().add(menu);
		main.setContentPane(getVisualPaneContent(menu, menu1, menu2));
		main.getJMenuBar().add(menu1);
		main.getJMenuBar().add(menu2);
		main.pack();
		main.setVisible(true);

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

		main.addMouseListener(new MouseListener() {

			@Override
			public void mouseClicked(MouseEvent e) {
				int n = pmenu.getComponentCount();
				if (n > 1)
					pmenu.remove(n - 1);
				pmenu.show(main, 100, 100);
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
				// TODO Auto-generated method stub

			}

			@Override
			public void mouseExited(MouseEvent e) {
				// TODO Auto-generated method stub

			}

		});
	}

	/**
	 * Builds a cut-down 'Preferences Visual tab' for a minimal test of layout
	 * problems
	 * 
	 * @param menu
	 */
	Container getVisualPaneContent(JMenu menu, JMenu menu1, JMenu menu2) {

		JPanel panel = new JPanel();
		panel.setPreferredSize(new Dimension(400, 700));
		panel.setOpaque(true);
		panel.setLayout(new BorderLayout());

		JPanel firstColumn = new JPanel();
		firstColumn.setLayout(new GridLayout(20, 1));
		firstColumn.setBorder(new TitledBorder("column 1"));

		/*
		 * bug 21/08/18: - checkbox label and text extend outside the enclosing panel in
		 * JS
		 */
		Font font = new Font("Verdana", Font.PLAIN, 11);

		JLabel l1 = new JLabel(getImage("test2.png"));
		l1.setText("ltrailing right");
		l1.setHorizontalTextPosition(SwingConstants.TRAILING);
		l1.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
		l1.setHorizontalAlignment(SwingConstants.RIGHT);

		JLabel l2 = new JLabel(getImage("test2.png"));
		l2.setText("lleading left");
		l2.setFont(font);
		l2.setHorizontalTextPosition(SwingConstants.LEADING);
		l2.setHorizontalAlignment(SwingConstants.LEFT);
		Icon icon = new Icon() {

			@Override
			public void paintIcon(Component c, Graphics g, int x, int y) {
				g.setColor(Color.white);
				g.fillRect(x+2, y+2, 16, 16);
			}

			@Override
			public int getIconWidth() {
				return 20;
			}

			@Override
			public int getIconHeight() {
				return 20;
			}
		};
		JLabel l3 = new JLabel(icon);
		l3.setOpaque(true);
		l3.setBackground(Color.red);
		l3.setText("lleading left");
		l3.setFont(font);
		l3.setHorizontalTextPosition(SwingConstants.LEADING);
		l3.setHorizontalAlignment(SwingConstants.LEFT);

		JLabel l4 = new JLabel(icon);
		l4.setOpaque(true);
		l4.setText("lleading left");
		l4.setBackground(Color.blue);
		l4.setFont(font);
		l4.setHorizontalTextPosition(SwingConstants.CENTER);
		l4.setHorizontalAlignment(SwingConstants.CENTER);

		JButton b1 = new JButton("right left");
		b1.setIcon(getImage("test2.png"));
		b1.setFont(font);
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
//		firstColumn.add(l2);
//		firstColumn.add(l3);
//		firstColumn.add(l4);
//		firstColumn.add(b1);
//
//		firstColumn.add(cb3);
//		firstColumn.add(cb4);
//		firstColumn.add(cb5);
//		firstColumn.add(rb1);
//		firstColumn.add(rb2);
//		firstColumn.add(rb3);
		firstColumn.setBounds(100, 20, 200, 700);

		font = new Font("Verdana", Font.PLAIN, 11);

		JMenuItem cb3m = new JMenuItem("leading,left-to-right");
		cb3m.setFont(font);
		cb3m.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
		cb3m.setHorizontalTextPosition(SwingConstants.LEADING);
		cb3m.addActionListener(listener);

		JCheckBoxMenuItem cb4m = new JCheckBoxMenuItem("leading,right-to-left");
		cb4m.setFont(font);
		cb4m.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		cb4m.setHorizontalTextPosition(SwingConstants.LEADING);
		cb4m.addActionListener(listener);

		JCheckBoxMenuItem cb5m = new JCheckBoxMenuItem("trailing,left-to-right");
		cb5m.setFont(font);
		cb5m.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
		cb5m.setHorizontalTextPosition(SwingConstants.TRAILING);
		cb5m.addActionListener(listener);

		JCheckBoxMenuItem cb6m = new JCheckBoxMenuItem("trailing,right-to-left");
		cb6m.setFont(font);
		cb6m.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		cb6m.setHorizontalTextPosition(SwingConstants.TRAILING);
		cb6m.addActionListener(listener);

		JRadioButtonMenuItem rb1m = new JRadioButtonMenuItem("trailing,right-to-left");
		rb1m.setFont(font);
		rb1m.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		rb1m.setHorizontalTextPosition(SwingConstants.TRAILING);
		rb1m.addActionListener(listener);

		JRadioButtonMenuItem rb2m = new JRadioButtonMenuItem("right,left-to-right");
		rb2m.setFont(font);
		rb2m.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
		rb2m.setHorizontalTextPosition(SwingConstants.RIGHT);
		rb2m.addActionListener(listener);

		JRadioButtonMenuItem rb3m = new JRadioButtonMenuItem("rr2l");
		rb3m.setFont(font);
		rb3m.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		rb3m.setHorizontalTextPosition(SwingConstants.RIGHT);
		rb3m.addActionListener(listener);

		JMenuItem mb3 = new JMenuItem("rtf");
		mb3.setFont(font);
		mb3.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		mb3.setHorizontalTextPosition(SwingConstants.RIGHT);

		JMenuItem mb4 = new JMenuItem("right,right-to-left");
		mb4.setFont(font);
		mb4.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		mb4.setHorizontalTextPosition(SwingConstants.RIGHT);

		mb5 = new JMenuItem("added");
		mb5.addActionListener(listener);
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

		JMenu m1 = new JMenu("left");
		m1.setFont(font);
		m1.addMenuListener(this);
		m1.add(rb2m);

		menu1.add(cb4m);
		menu1.add(cb3m);
		menu2.add(cb5m);

		mb4.addItemListener(this);
		menu.add(m1);
		JMenuItem btn = new JMenuItem("-");
		btn.setFont(font);
		menu.add(btn);
		testbtn = new JMenuItem("testing");
		testbtn.setFont(font);
		menu.add(testbtn);

		JMenu m2 = new JMenu("right");
		menu.add(m2);
		m2.setFont(font);
		m2.addMenuListener(this);
		m2.add(cb6m);
		m2.add(rb1m);

		m2.add(rb3m);
		m2.add(mb3);
		m2.add(mb4);

		JPanel theTab = new JPanel();

//		firstColumn.add(new JButton("remove 'testbtn'") {
//			{
//				this.addActionListener(new ActionListener() {
//
//					@Override
//					public void actionPerformed(ActionEvent e) {
//						menu.remove(testbtn);
//					}
//
//				});
//			}
//		});
//		firstColumn.add(new JButton("add 'testbtn'") {
//			{
//				this.addActionListener(new ActionListener() {
//
//					@Override
//					public void actionPerformed(ActionEvent e) {
//						testbtn.setText("testbtn");
//						menu.add(testbtn);
//
//					}
//
//				});
//			}
//		});
		theTab.setLayout(null);
		theTab.add(firstColumn);
		panel.add(theTab);

		return panel;
	}

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
		menu.add(mb5);
//	}
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
