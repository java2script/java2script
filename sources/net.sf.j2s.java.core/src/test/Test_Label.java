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
import javax.swing.border.LineBorder;
import javax.swing.border.TitledBorder;
import javax.swing.event.MenuEvent;
import javax.swing.event.MenuListener;

/**
 * A class with a main method entry point for ad hoc tests of JalviewJS
 * behaviour. The J2S transpiler should generate an html entry point for this
 * class, allowing comparison between Java and Javascript execution.
 */
public class Test_Label extends JPanel implements MenuListener, ItemListener {
	public static void main(String[] args) {
		new Test_Label().doTest();
	}

	/**
	 * Put some content in a JFrame and show it
	 */
	void doTest() {
		JFrame main = new JFrame();
		main.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

		main.setContentPane(getVisualPaneContent());
		main.pack();
		main.setVisible(true);

	}

	/**
	 * Builds a cut-down 'Preferences Visual tab' for a minimal test of layout
	 * problems
	 * 
	 * @param menu
	 */
	Container getVisualPaneContent() {

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

			int test;
			@Override
			public void paintIcon(Component c, Graphics g, int x, int y) {
				g.setColor((test = 1 - test) == 1 ? Color.green: Color.yellow);
				g.fillRect(x, y, 20, 20);
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
		l3.setVerticalAlignment(SwingConstants.CENTER);

		JLabel l4 = new JLabel(icon);
		l4.setOpaque(true);
		l4.setText("center");
		l4.setBackground(Color.blue);
		l4.setFont(font);
		l4.setBorder(new LineBorder(Color.white, 10));
		l4.setHorizontalTextPosition(SwingConstants.CENTER);
		l4.setHorizontalAlignment(SwingConstants.CENTER);
		l4.setVerticalAlignment(SwingConstants.CENTER);

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

//		firstColumn.add(l1);
//		firstColumn.add(l2);
//		firstColumn.add(l3);
		firstColumn.add(l4);
//		firstColumn.add(b1);
//
//		firstColumn.add(cb3);
//		firstColumn.add(cb4);
//		firstColumn.add(cb5);
//		firstColumn.add(rb1);
//		firstColumn.add(rb2);
//		firstColumn.add(rb3);
		firstColumn.setBounds(100, 20, 200, 700);


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
//		menu.add(mb5);
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
