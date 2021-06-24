package test;

//web_Ready
//web_AppletName= MyTest1
//web_Description= A test
//web_JavaVersion= http://www.dmitry
//web_AppletImage= dddd
//web_Category= test
//web_Date= $Date$
//web_Features= graphics, AWT-to-Swing

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.ScrollPane;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import javax.swing.JApplet;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JViewport;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

@SuppressWarnings("serial")
public class Test_Applet_Scroll2 extends JApplet implements ChangeListener {

	static {
		/**
		 * @j2sNative
		 * 
		 * 	thisApplet.__Info.width = 500;
		 *  thisApplet.__Info.height = 400;
		 *  thisApplet.__Info.isResizable = true;
		 */
	}

	private JScrollPane sp;
	@Override
	public void init() {
		setSize(500, 400);
		setBackground(Color.green);
		JPanel p = new JPanel();
		p.setLayout(new BorderLayout());
		p.setBackground(Color.yellow);
		p.setPreferredSize(new Dimension(120,120)); // this changes
		JPanel p2 = new JPanel();
		p2.setPreferredSize(new Dimension(50,50));
		p2.setBackground(Color.blue);
		p.add(p2, BorderLayout.NORTH);
		p2 = new JPanel();
		p2.setPreferredSize(new Dimension(50,50));
		p2.setBackground(Color.red);
		p.add(p2, BorderLayout.SOUTH);
		sp = new JScrollPane();
		sp.getViewport().add(p);
		sp.setHorizontalScrollBarPolicy(ScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
		sp.setVerticalScrollBarPolicy(ScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
		add(sp);
		sp.getViewport().addChangeListener(this);
		p.addMouseListener(new MouseListener() {

			@Override
			public void mouseClicked(MouseEvent e) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void mousePressed(MouseEvent e) {
				// TODO Auto-generated method stub
				
				System.out.println("dim " + getSize());
				System.out.println("p.dim " + sp.getViewport().getView().getSize());
				System.out.println("sp.dim " + sp.getSize() + " " + sp.getBorder());
				System.out.println("sp.insets " + sp.getInsets() + sp.getBorder().getBorderInsets(sp));
				System.out.println("vp.visiblerect " + sp.getViewport().getViewRect());
				System.out.println("vp. " + sp.getViewport().getViewRect());
				
				
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
	}

	@Override
	public void stateChanged(ChangeEvent e) {
		// Viewport has scrolled
		JViewport v = (JViewport) e.getSource();
		System.out.println("extent " +v.getExtentSize() + " " + v.getViewPosition());
		if (v.getViewRect().x > 0)
			System.out.println("view change: " + v.getViewRect());
		System.out.println(v.getWidth() + " " + v.getHeight() + " " + v.getView().getBounds());
	}

}
