package test;

import java.applet.Applet;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Panel;
import java.awt.ScrollPane;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

@SuppressWarnings("serial")
public class Test_Applet_Scroll2_AWT extends Applet implements ChangeListener {

	static {
		/**
		 * @j2sNative
		 * 
		 * 	thisApplet.__Info.width = 500;
		 *  thisApplet.__Info.height = 400;
		 *  thisApplet.__Info.isResizable = true;
		 */
	}

	private ScrollPane sp;
	@Override
	public void init() {
		setSize(500, 400);
		setBackground(Color.green);
		Panel p = new Panel();
		p.setLayout(new BorderLayout());
		p.setBackground(Color.yellow);
		Panel p2 = new Panel();
		p2.setPreferredSize(new Dimension(150,150));
		p2.setBackground(Color.blue);
		p.add(p2, BorderLayout.NORTH);
		p2.addMouseListener(new MouseListener() {

			@Override
			public void mouseClicked(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void mousePressed(MouseEvent e) {
				
				System.out.println("dim          " + getSize());
				System.out.println("p.dim        " + sp.getViewportSize());
				System.out.println("sp.dim       " + sp.getSize());
				System.out.println("sp.insets    " + sp.getInsets());
				System.out.println("sp.scrollPos " + sp.getScrollPosition());
				
				
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
		p2 = new Panel();
		p2.setPreferredSize(new Dimension(150,150));
		p2.setBackground(Color.red);
		p.add(p2, BorderLayout.SOUTH);
		p.setSize(new Dimension(300,300));
		sp = new ScrollPane(ScrollPane.SCROLLBARS_AS_NEEDED);
		sp.setSize(new Dimension(100,250));
		sp.add(p);
		add(sp);
	}

	@Override
	public void stateChanged(ChangeEvent e) {
//		// Viewport has scrolled
//		JViewport v = (JViewport) e.getSource();
//		System.out.println("extent " +v.getExtentSize() + " " + v.getViewPosition());
//		if (v.getViewRect().x > 0)
//			System.out.println("view change: " + v.getViewRect());
//		System.out.println(v.getWidth() + " " + v.getHeight() + " " + v.getView().getBounds());
	}

}
