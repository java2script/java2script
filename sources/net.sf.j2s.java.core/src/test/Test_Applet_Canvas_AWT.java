package test;

import java.applet.Applet;
import java.awt.Canvas;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Panel;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

/**
 * Creates a ScrollPane with a mix of SwingJS and AWT components. 
 * 
 * @author hansonr
 *
 */

@SuppressWarnings("serial")
public class Test_Applet_Canvas_AWT extends Applet implements MouseListener {

	static {
	
	/**
	 * @j2sNative
	 * 
	 * J2S.thisApplet.__Info.isResizable=true;
	 * 
	 */
	}
	int ipt = 0;
	private Panel p;
	private Canvas c;
	public void init() {
		
		setSize(300,300);
		c = new Canvas() {
			public void paint(Graphics g) {
				System.out.println("canvas paint");
				g.setColor(Color.yellow);
				g.fillRect(10 + ipt++,10 + ipt++, 50 + ipt++, 50 + ipt++);
			}
			
			public void update(Graphics g) {
				System.out.println("canvas update");
				
			}
		};
		c.setSize(200,200);
		c.setBackground(Color.blue);
		
		p = new Panel() {
			public void paint(Graphics g) {
				System.out.println("Panel paint called");
				super.paint(g);
			}
			
			
			public void update(Graphics g) {
				System.out.println("Panel update called");
				super.update(g);
			}
			
			
		};
		p.add(c);
		p.setBackground(null);
		add(p);		
		System.out.println(p.getBackground());
		addMouseListener(this);
	}
	
	public void paint(Graphics g) {
		System.out.println("Applet paint called");
		super.paint(g);
	}
	
	
	public void update(Graphics g) {
		System.out.println("Applet update called");
		super.update(g);
	}
	
	@Override
	public void mouseClicked(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void mousePressed(MouseEvent e) {
		System.out.println("removing all");
		p.removeAll();		
	}
	@Override
	public void mouseReleased(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void mouseEntered(MouseEvent e) {
		repaint();
		//c.repaint();
	}
	@Override
	public void mouseExited(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}
}
