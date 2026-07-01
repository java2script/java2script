package test;

import java.awt.Dimension;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.util.Hashtable;

import javax.swing.BoundedRangeModel;
import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSlider;
import javax.swing.JTextField;
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

	private boolean paintTicks;

	BoundedRangeModel vis1, vis2;
	
	@Override
	public void init() {

		paintTicks = false;
		JPanel p = new JPanel();
	    JTextField text1 = new JTextField("1         2         3         4         5         6         7         ");
		JTextField text2 = new JTextField("0123456789012345678901234567890123456789012345678901234567890123456789");
		text1.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 10));
		text2.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 10));
		text1.setName("text1");
		text2.setName("text2");
		vis1 = text1.getHorizontalVisibility();
		vis2 = text2.getHorizontalVisibility();
		vis1.addChangeListener((e)->{
			System.out.println("setting vis2 from vis1");
			int offset = vis1.getValue();
			vis2.setValue(offset);		
		});
		vis2.addChangeListener((e)->{
			System.out.println("setting vis1 from vis2");
			int offset = vis2.getValue();
			vis1.setValue(offset);		
		});
		text1.setPreferredSize(new Dimension(160,20));
		text2.setPreferredSize(new Dimension(160,20));
		JPanel textPanel = new JPanel(new GridLayout(2,0));
		textPanel.add(text1);
		textPanel.add(text2);
		p.add(textPanel);
		
        JSlider redSlider = new JSlider(JSlider.HORIZONTAL, 0, 200, 80);
        redSlider.setFont(new Font("Helvetica", Font.PLAIN, 10));
        if (paintTicks) { 
            redSlider.setMajorTickSpacing( 25 );
            redSlider.setMinorTickSpacing( 5 );
            redSlider.setPaintTicks( true );
        	
        } else {
        	Hashtable<Integer, JLabel> sliderLabels = new Hashtable<>();
        	sliderLabels.put(Integer.valueOf(0),  new JLabel("0"));
        	sliderLabels.put(Integer.valueOf(200),  new JLabel("200"));
        	
            redSlider.setMajorTickSpacing( 0 );
            redSlider.setMinorTickSpacing( 0 );
            redSlider.setPaintTicks( false );
            redSlider.setLabelTable(sliderLabels);
        }
        redSlider.setPaintLabels( true );
        redSlider.addChangeListener(new ChangeListener() {

        	@Override
        	public void stateChanged(ChangeEvent e) {
        		int val = redSlider.getValue();
        		System.out.println("value=" + val);
        		setTextOffset(val);
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

	protected void setTextOffset(int val) {
		vis1.setValue(val);
		vis2.setValue(val);
	}


}
