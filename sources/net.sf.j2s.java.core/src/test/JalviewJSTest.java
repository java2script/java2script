package test;
import java.awt.BorderLayout;
import java.awt.ComponentOrientation;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.GridLayout;

import javax.swing.ImageIcon;
import javax.swing.JCheckBox;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JRadioButton;
import javax.swing.SwingConstants;
import javax.swing.border.TitledBorder;

/**
 * A class with a main method entry point for ad hoc tests of JalviewJS
 * behaviour. The J2S transpiler should generate an html entry point for this
 * class, allowing comparison between Java and Javascript execution.
 */
public class JalviewJSTest extends JPanel
{
  public static void main(String[] args)
  {
    new JalviewJSTest().doTest();
  }

  /**
   * Put some content in a JFrame and show it
   */
  void doTest()
  {
    JFrame main = new JFrame();
    main.setContentPane(getVisualPaneContent());
    main.pack();
    main.setVisible(true);
  }

  /**
   * Builds a cut-down 'Preferences Visual tab' for a minimal test of layout
   * problems
   */
  Container getVisualPaneContent()
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
    JCheckBox cb1 = new JCheckBox();
    Font font = new Font("Verdana", Font.PLAIN, 11);
    cb1.setFont(font);
    cb1.setText("Maximise Window");
    cb1.setHorizontalTextPosition(SwingConstants.LEADING);
    cb1.setHorizontalAlignment(SwingConstants.LEFT);

    /*
     * bug 21/08/18:
     * - label should precede checkbox, but it doesn't
     */
    JCheckBox cb2 = new JCheckBox("Open Overview");
    cb2.setFont(font);
    cb2.setHorizontalTextPosition(SwingConstants.LEADING);
    // uncommenting this line gives 'leading text', but
    // also results in label and checkbox outside container
    //cb2.setHorizontalAlignment(SwingConstants.RIGHT);

    
//    ImageIcon icon =  new ImageIcon(getClass()
//            .getClassLoader()
//            .getResource("test2.png"), "test");
//    
    JCheckBox cb3 = new JCheckBox("leading,left-to-right");
    cb3.setFont(font);
    cb3.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
    cb3.setHorizontalTextPosition(SwingConstants.LEADING);

    JCheckBox cb4 = new JCheckBox("leading,right-to-left");
    cb4.setFont(font);
    cb4.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
    cb4.setHorizontalTextPosition(SwingConstants.LEADING);

    JCheckBox cb5 = new JCheckBox("trailing,left-to-right");
    cb5.setFont(font);
    cb5.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
    cb5.setHorizontalTextPosition(SwingConstants.TRAILING);

    JCheckBox cb6 = new JCheckBox("trailing,right-to-left");
    cb6.setFont(font);
    cb6.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
    cb6.setHorizontalTextPosition(SwingConstants.TRAILING);

    JRadioButton rb1 = new JRadioButton("trailing,right-to-left");
    rb1.setFont(font);
    rb1.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
    rb1.setHorizontalTextPosition(SwingConstants.TRAILING);

    JRadioButton rb2 = new JRadioButton("right,left-to-right");
    rb2.setFont(font);
    rb2.setComponentOrientation(ComponentOrientation.LEFT_TO_RIGHT);
    rb2.setHorizontalTextPosition(SwingConstants.RIGHT);

    JRadioButton rb3 = new JRadioButton("right,right-to-left");
    rb3.setFont(font);
    rb3.setComponentOrientation(ComponentOrientation.RIGHT_TO_LEFT);
    rb3.setHorizontalTextPosition(SwingConstants.RIGHT);


    
    firstColumn.add(cb1);
    firstColumn.add(cb2);
    firstColumn.add(cb3);
    firstColumn.add(cb4);
    firstColumn.add(cb5);
    firstColumn.add(cb6);
    firstColumn.add(rb1);
    firstColumn.add(rb2);
    firstColumn.add(rb3);
    firstColumn.setBounds(20, 20, 200, 500);

    JPanel theTab = new JPanel();
    theTab.setLayout(null);
    theTab.add(firstColumn);
    panel.add(theTab);

    return panel;
  }
}
