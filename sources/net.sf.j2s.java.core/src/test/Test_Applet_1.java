package test;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.AdjustmentEvent;
import java.awt.event.AdjustmentListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollBar;
import javax.swing.border.LineBorder;

/**
 * test of general button, label, scrollbar, BorderLayout, backgrounds,
 * adjustment, property, and action listeners, effectively final variables
 * 
 * @author hansonr
 *
 */
public class Test_Applet_1 extends JApplet implements AdjustmentListener, PropertyChangeListener, FocusListener {

	int ipt;

	int width = 300;
	
	public int getWidth() {
		return width;
	}
	@Override
	public void init() {
		setSize(500,500);
		System.out.println(getWidth());
		System.out.println(getSize());
		System.out.println(getBounds());
		System.out.println(getBounds(null));
		System.out.println(width);
		JScrollBar bar = new JScrollBar(JScrollBar.HORIZONTAL);
		bar.addAdjustmentListener(this);
		bar.addPropertyChangeListener(this);
		JLabel label = new JLabel("hello\ud83d\udd01");
		((JPanel) getContentPane()).setBorder(new LineBorder(Color.blue,2));
		label.setBorder(new LineBorder(Color.red, 3));
		label.setBounds(0, 60, 200, 60);
		label.setPreferredSize(new Dimension(80, 80));
		label.setBackground(Color.yellow);
		label.setForeground(Color.BLUE);
		// label.setOpaque(true);
		label.setHorizontalAlignment(JLabel.LEFT);
		label.setVerticalAlignment(JLabel.CENTER);
		label.addPropertyChangeListener(this);
		label.addFocusListener(this);
		/* final */ JButton button = new JButton("test");
		button.addPropertyChangeListener(this);
		button.addFocusListener(this);
		button.setBorder(new LineBorder(Color.yellow, 4));
		button.setSize(80, 40);
		button.setBackground(Color.red);
		/* final$ */Test_Applet_1 me = this;
		button.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent event) {
				boolean b = label.isOpaque();
				label.setOpaque(!b);
				System.out.println("this is " + this + "\nthis$0 is " + me);
				label.setBackground(Color.green);
				switch (++ipt % 3) {
				case 0:
					label.setHorizontalAlignment(JLabel.RIGHT);
					label.setVerticalAlignment(JLabel.TOP);
					button.setHorizontalAlignment(JLabel.RIGHT);
					button.setVerticalAlignment(JLabel.TOP);
					break;
				case 1:
					button.setHorizontalAlignment(JLabel.CENTER);
					button.setVerticalAlignment(JLabel.CENTER);
					label.setHorizontalAlignment(JLabel.CENTER);
					label.setVerticalAlignment(JLabel.CENTER);
					break;
				case 2:
					button.setHorizontalAlignment(JLabel.LEFT);
					button.setVerticalAlignment(JLabel.BOTTOM);
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

	@Override
	public void propertyChange(PropertyChangeEvent evt) {
		log(evt);
	}

	@Override
	public void adjustmentValueChanged(AdjustmentEvent e) {
		log(e);
	}

	@Override
	public void focusGained(FocusEvent e) {
		log(e);
	}

	private void log(Object e) {
		System.out.println(e.toString().replace("=,", ";").replace(',', '\n'));		
	}

	@Override
	public void focusLost(FocusEvent e) {
		log(e);
	}

}