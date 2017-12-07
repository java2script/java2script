package test;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.event.ActionEvent;

import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JScrollBar;

@SuppressWarnings("serial")
public class Test_Applet_1 extends JApplet {
	
  int ipt;

  int test2 = 0;
  
  int[][] itest = new int[66][]; // transpiler needs to make this newIntArray(3,null)
  
  public void testing(String[] s, int[] i, float[] f) {
	
	  
  }
  
	@Override
	public void init() {
		testing(new String[] {}, new int[] {1,2,3}, new float[] {1,2,3});
    JScrollBar bar = new JScrollBar(JScrollBar.HORIZONTAL);
    final JLabel label = new JLabel("hello");
    label.setBounds(0, 60, 200, 60);
    label.setPreferredSize(new Dimension(80, 80));
    label.setBackground(Color.yellow);
    label.setForeground(Color.BLUE);
    //label.setOpaque(true);
    label.setHorizontalAlignment(JLabel.LEFT);
    label.setVerticalAlignment(JLabel.CENTER);
    final JButton button = new JButton("test");
    button.setSize(80,40);
    button.setBackground(Color.orange);
    final Object xthis = this;
    button.addActionListener(new java.awt.event.ActionListener() {
			@Override
			public void actionPerformed(ActionEvent event) {
				boolean b = label.isOpaque();
				label.setOpaque(!b);
				System.out.println("this is " + this + " xthis is " + xthis + " " + (this == xthis));
		    label.setBackground(Color.green);
				switch (++ipt % 3) {
				case 0:
			    label.setHorizontalAlignment(JLabel.RIGHT);
			    label.setVerticalAlignment(JLabel.TOP);
			    button.setText(button.getText() + 1);
			    break;					
				case 1:
			    label.setHorizontalAlignment(JLabel.CENTER);
			    label.setVerticalAlignment(JLabel.CENTER);
			    break;					
				case 2:
			    label.setHorizontalAlignment(JLabel.LEFT);
			    label.setVerticalAlignment(JLabel.BOTTOM);
			    break;					
				}
				repaint();
			}
    	
    });
    bar.setBounds(0, 0, 100, 20);
    getContentPane().add(bar, BorderLayout.NORTH);
    getContentPane().add(label, BorderLayout.SOUTH);
    getContentPane().add(button, BorderLayout.CENTER);
	}

} 