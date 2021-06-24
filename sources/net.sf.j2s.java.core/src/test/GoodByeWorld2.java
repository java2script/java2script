package test;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;

import javax.swing.JApplet;
import javax.swing.JLabel;
import javax.swing.JTextField;

public class GoodByeWorld2 extends JApplet {
	
	private JLabel label;

	private static int n = 1;
	
	@Override
	public void init() {
		addMouseMotionListener(new MouseMotionListener() {

			@Override
			public void mouseDragged(MouseEvent e) {
//				System.out.println(Thread.currentThread().getName());
			}

			@Override
			public void mouseMoved(MouseEvent e) {
//				System.out.println(Thread.currentThread().getName());
			}
			
		});

		label = new JLabel("Goodbye, World"+ n++ +"!");
		label.addMouseListener(new MouseListener() {

			@Override
			public void mouseClicked(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void mousePressed(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void mouseReleased(MouseEvent e) {
				System.out.println(Thread.currentThread().getName());
				System.exit(0);
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
		label.setFont(new Font(Font.SANS_SERIF, Font.PLAIN, 20));
		add(label, BorderLayout.NORTH);
		JTextField tf = new JTextField("test");
		tf.setSize(new Dimension(100,30));
		tf.setPreferredSize(new Dimension(100,30));
		tf.addKeyListener(new KeyListener() {

			@Override
			public void keyTyped(KeyEvent e) {
				System.out.println(Thread.currentThread().getName());
			}

			@Override
			public void keyPressed(KeyEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void keyReleased(KeyEvent e) {
				// TODO Auto-generated method stub
				
			}
			
		});
		tf.addMouseListener(new MouseListener() {

			@Override
			public void mouseClicked(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void mousePressed(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void mouseReleased(MouseEvent e) {
				System.out.println(Thread.currentThread().getName());
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
		add(tf, BorderLayout.SOUTH);

	}
	
}


