package test;
import java.awt.BorderLayout;
import java.awt.ComponentOrientation;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.MediaTracker;
import java.awt.MenuItem;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;

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
public class JalviewJSTest extends JPanel implements MenuListener, ItemListener
{
  public static void main(String[] args)
  {
    new JalviewJSTest().doTest();
  }

private JMenuItem mb5;

  /**
   * Put some content in a JFrame and show it
   */
  void doTest()
  {
    JFrame main = new JFrame();
    main.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
    JMenu menu = new JMenu("testing");
    menu.setHorizontalAlignment(SwingConstants.RIGHT);
    main.setContentPane(getVisualPaneContent(menu));
    main.setJMenuBar(new JMenuBar());
    main.getJMenuBar().add(menu);
    main.pack();
    main.setVisible(true);
  }

  /**
   * Builds a cut-down 'Preferences Visual tab' for a minimal test of layout
   * problems
 * @param menu 
   */
  Container getVisualPaneContent(JMenu menu)
  {
    JPanel panel = new JPanel();
    panel.setPreferredSize(new Dimension(400, 500));
    panel.setOpaque(true);
    panel.setLayout(new BorderLayout());

    
    JPanel firstColumn = new JPanel();
    firstColumn.setLayout(new GridLayout(10, 1));
    firstColumn.setBorder(new TitledBorder("column 1"));

    /*
     * bug 21/08/18:
     * - checkbox label and text extend outside the enclosing panel in JS
     */
    Font font = new Font("Verdana", Font.PLAIN, 11);

    JLabel l1 = new JLabel(getImage("test2.png"));
    l1.setText("Xtrailling right");
    l1.setHorizontalTextPosition(SwingConstants.TRAILING);
    l1.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
    l1.setHorizontalAlignment(SwingConstants.RIGHT);

    JLabel l2 = new JLabel(getImage("test2.png"));
    l2.setText("Xleading left");
    l2.setFont(font);
    l2.setHorizontalTextPosition(SwingConstants.LEADING);
    l2.setHorizontalAlignment(SwingConstants.LEFT);

    JButton b1 = new JButton("right left");
    b1.setIcon(getImage("test2.png"));
    b1.setFont(font);
    b1.setHorizontalTextPosition(SwingConstants.RIGHT);
    b1.setHorizontalAlignment(SwingConstants.LEFT);

    firstColumn.add(l1);
    firstColumn.add(l2);
    firstColumn.add(b1);

    
    JCheckBox cb3 = new JCheckBox("Xleading,left-to-right,rt");
    cb3.setFont(font);
    cb3.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
    cb3.setHorizontalTextPosition(SwingConstants.LEADING);
    cb3.setHorizontalAlignment(SwingConstants.TRAILING);

    JCheckBox cb4 = new JCheckBox("Xleading,right-to-left");
    cb4.setFont(font);
    cb4.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
    cb4.setHorizontalTextPosition(SwingConstants.LEADING);

    JCheckBox cb5 = new JCheckBox("Xtrailling,left-to-right");
    cb5.setFont(font);
    cb5.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
    cb5.setHorizontalTextPosition(SwingConstants.TRAILING);

    JRadioButton rb1 = new JRadioButton("Xtrailling,right-to-left");
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


    
    firstColumn.add(cb3);
    firstColumn.add(cb4);
    firstColumn.add(cb5);
    firstColumn.add(rb1);
    firstColumn.add(rb2);
    firstColumn.add(rb3);
    firstColumn.setBounds(200, 20, 200, 500);

    
    font = new Font("Verdana", Font.PLAIN, 11);

    JMenuItem cb3m = new JMenuItem("Xleading,left-to-right");
    cb3m.setFont(font);
    cb3m.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
    cb3m.setHorizontalTextPosition(SwingConstants.LEADING);

    JCheckBoxMenuItem cb4m = new JCheckBoxMenuItem("Xleading,right-to-left");
    cb4m.setFont(font);    
    cb4m.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
    cb4m.setHorizontalTextPosition(SwingConstants.LEADING);

    JCheckBoxMenuItem cb5m = new JCheckBoxMenuItem("Xtrailling,left-to-right");
    cb5m.setFont(font);
    cb5m.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
    cb5m.setHorizontalTextPosition(SwingConstants.TRAILING);

    JCheckBoxMenuItem cb6m = new JCheckBoxMenuItem("Xtrailling,right-to-left");
    cb6m.setFont(font);
    cb6m.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
    cb6m.setHorizontalTextPosition(SwingConstants.TRAILING);

    JRadioButtonMenuItem rb1m = new JRadioButtonMenuItem("Xtrailing,right-to-left");
    rb1m.setFont(font);
    rb1m.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
    rb1m.setHorizontalTextPosition(SwingConstants.TRAILING);

    JRadioButtonMenuItem rb2m = new JRadioButtonMenuItem("Xright,left-to-right");
    rb2m.setFont(font);
    rb2m.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
    rb2m.setHorizontalTextPosition(SwingConstants.RIGHT);

    JRadioButtonMenuItem rb3m = new JRadioButtonMenuItem("Xrr2l");
    rb3m.setFont(font);
    rb3m.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
    rb3m.setHorizontalTextPosition(SwingConstants.RIGHT);

    JMenuItem mb3 = new JMenuItem("Xrtf");
    mb3.setFont(font);
    mb3.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
    mb3.setHorizontalTextPosition(SwingConstants.RIGHT);

    JMenuItem mb4 = new JMenuItem("Xright,right-to-left");
    mb4.setFont(font);
    mb4.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
    mb4.setHorizontalTextPosition(SwingConstants.RIGHT);

    mb5 = new JMenuItem("Xadded");
    mb5.addActionListener(new ActionListener() {

		@Override
		public void actionPerformed(ActionEvent e) {
			System.out.println("actionPerformed: " + e);
	}
    	
    });
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
    JMenu m2 = new JMenu("right");
    m2.setFont(font);
    m2.addMenuListener(this);
    m1.add(cb4m);
    m1.add(cb3m);
    m1.add(cb5m);
    m2.add(cb6m);
    m2.add(rb1m);
    m1.add(rb2m);
    m2.add(rb3m);
    m2.add(mb3);
    m2.add(mb4);

    
    mb4.addItemListener(this);
    menu.add(m1);
    JMenuItem btn = new JMenuItem("-");
    btn.setFont(font);
    menu.add(btn);
    btn=new JMenuItem("testing");
    btn.setFont(font);
    menu.add(btn);
    menu.add(m2);


    JPanel theTab = new JPanel();
    
    theTab.setLayout(null);
    theTab.add(firstColumn);
    panel.add(theTab);

    return panel;
  }

private ImageIcon getImage(String name) {
    ImageIcon icon = new ImageIcon(getClass().getResource(name));

    while(icon.getImageLoadStatus() == MediaTracker.LOADING)
		try {
			Thread.sleep(10);
		} catch (InterruptedException e) {
		}
    return icon;
}

private boolean hasmb5 = false;

@Override
public void menuSelected(MenuEvent e) {
	System.out.println("menuSelected " + e.getSource().toString());
	JMenu menu = (JMenu) e.getSource();
//	if (!hasmb5) {
		hasmb5 = true;
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
