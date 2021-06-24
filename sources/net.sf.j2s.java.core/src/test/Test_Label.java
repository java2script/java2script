package test;

import java.awt.Color;
import java.awt.ComponentOrientation;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.MediaTracker;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import javax.swing.BoxLayout;
import javax.swing.Icon;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JPanel;
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
		panel.setPreferredSize(new Dimension(400, 500));
		panel.setOpaque(true);
//		panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));//BorderLayout());

		JPanel firstColumn = new JPanel();
		firstColumn.setLayout(new BoxLayout(firstColumn, BoxLayout.Y_AXIS));
		firstColumn.setBorder(new TitledBorder("column 1"));

		/*
		 * bug 21/08/18: - checkbox label and text extend outside the enclosing panel in
		 * JS
		 */
		Font font = new Font("Verdana", Font.PLAIN, 11);

//		JLabel l1 = new JLabel(getImage("test2.png"));
//		l1.setText("ltrailing right");
//		l1.setHorizontalTextPosition(SwingConstants.TRAILING);
//		l1.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
//		l1.setHorizontalAlignment(SwingConstants.RIGHT);
//
//		JLabel l2 = new JLabel(getImage("test2.png"));
//		l2.setText("lleading left");
//		l2.setFont(font);
//		l2.setHorizontalTextPosition(SwingConstants.LEADING);
//		l2.setHorizontalAlignment(SwingConstants.LEFT);
//		Icon icon = new Icon() {
//
//			int test;
//			@Override
//			public void paintIcon(Component c, Graphics g, int x, int y) {
//				g.setColor((test = 1 - test) == 1 ? Color.green: Color.yellow);
//				g.fillRect(x, y, 20, 20);
//			}
//
//			@Override
//			public int getIconWidth() {
//				return 20;
//			}
//
//			@Override
//			public int getIconHeight() {
//				return 20;
//			}
//		};
//		
		

		Icon icon = getImage("zoom.gif");
		JLabel l3 = new JLabel(icon); 
		l3.setOpaque(true);
		l3.setBackground(Color.red);
		l3.setText("lleading left");
		l3.setFont(font);
		l3.setHorizontalTextPosition(SwingConstants.LEADING);
		l3.setHorizontalAlignment(SwingConstants.LEFT);
		l3.setVerticalAlignment(SwingConstants.CENTER);
//		l3.setBounds(80,0,70,40);

		JLabel l4 = new JLabel();
		l4.setIcon(icon);
		l4.setOpaque(true);
		l4.setText("4");
		l4.setBackground(Color.white);
		l4.setFont(font);
//		l4.setPreferredSize(new Dimension(180, 30)); // not relevant for label?
		l4.setBorder(new LineBorder(Color.black, 1));
		l4.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
		l4.setHorizontalTextPosition(SwingConstants.TRAILING);
		l4.setVerticalTextPosition(SwingConstants.CENTER);
		l4.setIconTextGap(10);
		l4.setHorizontalAlignment(SwingConstants.CENTER);
		l4.setVerticalAlignment(SwingConstants.CENTER);
//		l4.setBounds(0,0,70,40);

		JButton b1 = new JButton("X");
//		b1.setBounds(0,60,70,40);
//		b1.setIcon(getImage("test2.png"));
		b1.setFont(font);
//		b1.setHorizontalTextPosition(SwingConstants.LEFT);
//		b1.setHorizontalAlignment(SwingConstants.LEFT);

		JButton b2 = new JButton("2");
//		b2.setBounds(0,120,70,40);
		b2.setIcon(getImage("test2.png"));
		b2.setFont(font);
		b2.setIconTextGap(2);
		b2.setHorizontalTextPosition(SwingConstants.RIGHT);
		b2.setHorizontalAlignment(SwingConstants.LEFT);
		b2.setVerticalAlignment(SwingConstants.CENTER);

//		JCheckBox cb3 = new JCheckBox("leading,left-to-right,rt");
//		cb3.setFont(font);
//		cb3.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
//		cb3.setHorizontalTextPosition(SwingConstants.LEADING);
//		cb3.setHorizontalAlignment(SwingConstants.TRAILING);
//
//		JCheckBox cb4 = new JCheckBox("leading,right-to-left");
//		cb4.setFont(font);
//		cb4.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
//		cb4.setHorizontalTextPosition(SwingConstants.LEADING);
//
//		JCheckBox cb5 = new JCheckBox("trailing,left-to-right");
//		cb5.setFont(font);
//		cb5.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
//		cb5.setHorizontalTextPosition(SwingConstants.TRAILING);
//
//		JRadioButton rb1 = new JRadioButton("trailing,right-to-left");
//		rb1.setFont(font);
//		rb1.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
//		rb1.setHorizontalTextPosition(SwingConstants.TRAILING);
//
//		JRadioButton rb2 = new JRadioButton("right,left-to-right");
//		rb2.setFont(font);
//		rb2.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
//		rb2.setHorizontalTextPosition(SwingConstants.RIGHT);
//
//		JRadioButton rb3 = new JRadioButton("right,r2l");
//		rb3.setFont(font);
//		rb3.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
//		rb3.setHorizontalTextPosition(SwingConstants.RIGHT);

		ImageIcon icon1 = new ImageIcon("test/zoom.gif");
		// either <br> or <br/> is fine.
		JLabel l = new JLabel("<html>this is<br/>a<br> t<sub>e</sub>st</html>", null, SwingConstants.LEADING);
		l.setBounds(300,300,20,20);
		add(l);
//
//		l = new JLabel("<html>this is<br>a test</html>", null, SwingConstants.LEADING);
//		l.setBounds(300,400,20,20);
//		add(l);

		ImageIcon icon2 = new ImageIcon("test/zoom.gif");
		JButton ib = new JButton(icon2);
		ib.setPreferredSize(new Dimension(50,20));
		ib.setBounds(300,360,20,20);
		add(ib);
		ib.setBackground(null);
		ib.setOpaque(false);

		firstColumn.add(l);
		firstColumn.add(ib);

		firstColumn.add(l3);
		firstColumn.add(l4);
		firstColumn.add(b1);
//		firstColumn.add(b2);
//
//		firstColumn.add(cb3);
//		firstColumn.add(cb4);
//		firstColumn.add(cb5);
//		firstColumn.add(rb1);
//		firstColumn.add(rb2);
//		firstColumn.add(rb3);
//		firstColumn.setBounds(100, 20, 200, 350);


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
//		theTab.setLayout(new BoxLayout(theTab, BoxLayout.Y_AXIS));
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
		System.out.println("getImage " + name + " status=" + icon.getImageLoadStatus());
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
