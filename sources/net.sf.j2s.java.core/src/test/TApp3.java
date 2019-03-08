package test;

import java.awt.Color;
import java.awt.Font;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.JApplet;
import javax.swing.JLabel;
import javax.swing.JPanel;

/**
 * This class tests for background and foreground setting in Swing contexts.
 * 
 * @author hansonr
 *
 */
public class TApp3 extends JApplet {

	@Override
	public void init() {
		setSize(400, 400);
		setFont(new Font(Font.SERIF, Font.PLAIN, 20));
		setBackground(Color.yellow);
		setForeground(Color.yellow);
		setLayout(null);
		JPanel panelj = new JPanel();
		setPanel(panelj, 80);
	}

	private void setPanel(JPanel panel, int x) {
		panel.setBounds(x, 10, 100, 150);
		panel.setLayout(null);
		panel.setBackground(Color.red);
		JLabel label1 = new JLabel("yellow", JLabel.RIGHT){
			@Override
			public Color getForeground() {
				//System.out.println(JSUtil.getStackTrace());
				return super.getForeground();
			}
		};
		label1.setBounds(10, 10, 50, 20);
		JLabel label2 = new JLabel("yellow", JLabel.RIGHT);
		label2.setBounds(10, 30, 50, 20);
		JLabel label3 = new JLabel("white", JLabel.RIGHT);
		label3.setBounds(10, 50, 50, 20);
		JLabel label4 = new JLabel("green", JLabel.RIGHT);
		label4.setBounds(10, 70, 50, 20);
		JLabel label5 = new JLabel("green", JLabel.RIGHT);
		label5.setBounds(10, 90, 50, 20);
		label5.setFont(new Font(Font.DIALOG, Font.PLAIN, 12));
		panel.add(label5);
		
		
		label1.addMouseListener(new MouseListener() {

			@Override
			public void mouseClicked(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void mousePressed(MouseEvent e) {
				label2.setEnabled(!label2.isEnabled());
				label3.setForeground(label3.getForeground());
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

		
		System.out.println("adding label1");
		panel.add(label1);

		System.out.println("pfg null/false " + panel.getForeground() + " isset " + panel.isForegroundSet());

		System.out.println("fg1 null/false " + label1.getForeground() + " isset " + label1.isForegroundSet() + " " + label1.getFont());
		System.out.println("fg2 null/false " + label2.getForeground() + " isset " + label2.isForegroundSet() + " " + label2.getFont());
		System.out.println("fg3 null/false " + label3.getForeground() + " isset " + label3.isForegroundSet() + " " + label3.getFont());
		
		System.out.println("adding label2");
		panel.add(label2);

		System.out.println("panel white");

		panel.setForeground(Color.white);
		
		System.out.println("adding label3");
		panel.add(label3);
		
		System.out.println("fg1 white/false " + label1.getForeground() + " isset " + label1.isForegroundSet() + " " + label1.getFont());
		System.out.println("fg2 white/false " + label2.getForeground() + " isset " + label2.isForegroundSet() + " " + label2.getFont());
		System.out.println("fg3 white/false " + label3.getForeground() + " isset " + label3.isForegroundSet() + " " + label3.getFont());
		
		System.out.println("panel green");
		panel.setForeground(Color.green);
		

		System.out.println("adding label4");
		panel.add(label4);

		
		System.out.println("fg1 green/false " + label1.getForeground() + " isset " + label1.isForegroundSet() + " " + label1.getFont());
		System.out.println("fg2 green/false " + label2.getForeground() + " isset " + label2.isForegroundSet() + " " + label2.getFont());
		System.out.println("fg3 green/false " + label3.getForeground() + " isset " + label3.isForegroundSet() + " " + label3.getFont());
		System.out.println("fg4 green/false " + label4.getForeground() + " isset " + label4.isForegroundSet() + " " + label4.getFont());
		
		
		add(panel);
		
		System.out.println("pfg green/true " + panel.getForeground() + " isset " + panel.isForegroundSet());

		label2.setEnabled(false);
	}

}