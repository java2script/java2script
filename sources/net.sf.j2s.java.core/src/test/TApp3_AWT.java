package test;

import java.applet.Applet;
import java.awt.Color;
import java.awt.Font;
import java.awt.Label;
import java.awt.Panel;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

/**
 * This class tests for background and foreground setting in AWT contexts.
 * 
 * @author hansonr
 *
 */
public class TApp3_AWT extends Applet {
		
	@Override
	public void init() {
		setSize(400, 400);
		setFont(new Font(Font.MONOSPACED, Font.PLAIN, 20));
		setBackground(Color.yellow);
		setForeground(Color.yellow);
		setLayout(null);
		Panel panel = new Panel();
		setPanel(panel, 10);

	}

	private void setPanel(Panel panel, int x) {
		panel.setBounds(x, 10, 100, 150);
		panel.setLayout(null);
		panel.setBackground(Color.red);
		Label label1 = new Label("yellow", Label.RIGHT) {
			@Override
			public Color getForeground() {
//				System.out.println(JSUtil.getStackTrace());
				return super.getForeground();
			}
		};
		label1.setBounds(10, 10, 50, 20);
		Label label2 = new Label("yellow", Label.RIGHT);
		label2.setBounds(10, 30, 50, 20);
		Label label3 = new Label("white", Label.RIGHT);
		label3.setBounds(10, 50, 50, 20);
		Label label4 = new Label("green", Label.RIGHT);
		label4.setBounds(10, 70, 50, 20);
		
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
		
//		label2.setEnabled(false);

		System.out.println("adding label2");
		panel.add(label2);

		System.out.println("adding panel");
		add(panel);
		// now label1 and label2 color are set to Applet color
		
		System.out.println("panel white");
		panel.setForeground(Color.white);

		System.out.println("adding label3");
		panel.add(label3);
		// label3 color are set to panel color
		
		System.out.println("fg1 yellow/false " + label1.getForeground() + " isset " + label1.isForegroundSet() + " " + label1.getFont());
		System.out.println("fg2 yellow/false " + label2.getForeground() + " isset " + label2.isForegroundSet() + " " + label2.getFont());
		System.out.println("fg3 white/false " + label3.getForeground() + " isset " + label3.isForegroundSet() + " " + label3.getFont());

		System.out.println("panel green");
		panel.setForeground(Color.green);
		

		System.out.println("adding label4");
		panel.add(label4);
		// label4 color is set to panel color

		System.out.println("fg1 yellow/false " + label1.getForeground() + " isset " + label1.isForegroundSet() + " " + label1.getFont());
		System.out.println("fg2 yellow/false " + label2.getForeground() + " isset " + label2.isForegroundSet() + " " + label2.getFont());
		System.out.println("fg3 white/false " + label3.getForeground() + " isset " + label3.isForegroundSet() + " " + label3.getFont());
		System.out.println("fg4 green/false " + label4.getForeground() + " isset " + label4.isForegroundSet() + " " + label4.getFont());
		
		
		System.out.println("pfg green/true " + panel.getForeground() + " isset " + panel.isForegroundSet());

		
	//	panel.remove(label2);
		System.out.println("enabling label2");
	//	panel.add(label2);
		label2.setEnabled(false);
	}

}