package a2s;

import java.awt.Graphics;
import java.awt.HeadlessException;

import javax.swing.JApplet;
import javax.swing.JPanel;

@SuppressWarnings("serial")
public class Applet extends JApplet implements A2SContainer {

	
    public Applet() throws HeadlessException {
    	super();
		listener = new A2SListener();
		addMouseListener(listener);
		addMouseMotionListener(listener);
		setContentPane(new JPanel() {
			@Override
			public void paintComponent(Graphics g) {
	 			super.paintComponent(g);
				// System.out.println("init " + this.getSize());
				try {
					if (this.getWidth() > 0)
						paintMe(g);
				} catch (Throwable e) {
					System.out.println(e);
					e.printStackTrace();
					/**
					 * @j2sNative
					 * 
					 * 			debugger;
					 */
					{
					}
				}
			}
		});    	
    }

	protected A2SListener listener;

	@Override
	public A2SListener getA2SListener() {
		return listener;
	}

	// Note: applet.paint(g) needs to include super.paint(g), or buttons will
	// not
	// show.

//	@Override
//	public void init() {
//	}

	protected void paintMe(Graphics g) {
		System.out.println("paintMe has not been implemented!");
	}

}
