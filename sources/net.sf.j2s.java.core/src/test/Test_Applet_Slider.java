package test;

import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;

import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JPanel;
import javax.swing.JSlider;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

public class Test_Applet_Slider extends JApplet {

	static {MouseEvent m;
		/**
		 * @j2sNative
		 * 
		 * 	thisApplet.__Info.width = 500;
		 *  thisApplet.__Info.height = 100;
		 *  thisApplet.__Info.isResizable = true;
		 */
	}

	@Override
	public void init() {

		JPanel p = new JPanel();
        JSlider redSlider = new JSlider(JSlider.HORIZONTAL, 0, 200, 80);
        redSlider.setFont(new Font("Helvetica", Font.PLAIN, 10));
        redSlider.setMajorTickSpacing( 25 );
        redSlider.setMinorTickSpacing( 5 );
        redSlider.setPaintTicks( true );
        redSlider.setPaintLabels( true );
        redSlider.addChangeListener(new ChangeListener() {

        	@Override
        	public void stateChanged(ChangeEvent e) {
        		System.out.println("value=" + redSlider.getValue());
        	}

        	
        });
        redSlider.setValue(100);
		p.add(redSlider);
		JButton b = new JButton("+10");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				redSlider.setValue(redSlider.getValue() + 10);
			}
			
		});
		p.add(b);

		b = new JButton("+1");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				redSlider.setValue(redSlider.getValue() + 1);
			}
			
		});
		p.add(b);
		
		b = new JButton("-10");
		b.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				redSlider.setValue(redSlider.getValue() - 10);
			}
			
		});		
		p.add(b);
		
		add(p);
	}


}
