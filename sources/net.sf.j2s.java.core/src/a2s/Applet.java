package a2s;

import java.awt.Component;
import java.awt.Graphics;

import javax.swing.JApplet;
import javax.swing.JPanel;

@SuppressWarnings("serial")
public class Applet extends JApplet {

	private A2SListener listener;

	// Note: applet.paint(g) needs to include super.paint(g), or buttons will not
	// show.

	@Override
	public void init() {
		listener = new A2SListener(this);
    addMouseListener(listener);
	  addMouseMotionListener(listener);
		setContentPane(new JPanel() {
			@Override
			public void paintComponent(Graphics g) {
				super.paintComponent(g);
				//System.out.println("init " + this.getSize());
				try {
				if (this.getWidth() > 0)
					paintMe(g);
				} catch (Throwable e) {
					System.out.println(e);
					e.printStackTrace();
					/**
					 * @j2sNative
					 * 
					 * debugger;
					 */
					{}
				}
			}
		});
	}

	protected void paintMe(Graphics g) {
		System.out.println("paintMe has not been implemented!");
	}

	@Override
	public Component add(Component comp) {
		super.add(comp);
		return A2SEvent.addComponent(listener, comp);
	}

}
