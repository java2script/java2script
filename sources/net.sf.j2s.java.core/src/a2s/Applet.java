package a2s;

import java.awt.Graphics;
import java.awt.HeadlessException;
import java.net.MalformedURLException;
import java.net.URL;

import javax.swing.JApplet;
import javax.swing.JPanel;

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
					// The content pane's paintComponent method has not been overridden. 
					// There may be no problem, but it also could mean that the applet
					// is not painting properly. 
					if (this.getWidth() > 0)
						paintComponent_(g);
				} catch (Throwable e) {
					System.out.println("There was a problem in Applet.paintComponent(g) " + e);
					e.printStackTrace();
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

	private boolean paintMeNotified;
	
	protected void paintComponent_(Graphics g) {
		if (!paintMeNotified) {
			System.out.println("JComponent.paintComponent(g) has not been overridden (including a super.paintComponent(g)) \nfor the " + this.getClass().getName() + " AWT applet.\nThis many be no problem, or it may mean the applet is not displaying properly.\n See https://docs.oracle.com/javase/tutorial/uiswing/painting/refining.html\n and https://docs.oracle.com/javase/tutorial/uiswing/painting/closer.html");
			paintMeNotified = true;
		}
	}

	
	/**
	 * fix for applet running in Eclipse, which unfortunately uses /bin/ for the codeBase
	 * 
	 */
	@Override
	public URL getCodeBase() {
		String codeBase = super.getCodeBase().toString();
		if (codeBase.endsWith("/bin/"))  {
			String appletPath = this.getClass().getName();
			codeBase += appletPath.substring(0, appletPath.lastIndexOf(".") + 1).replace('.', '/');
		}
		try {
			return new URL(codeBase);
		} catch (MalformedURLException e) {
			return null;
		}
		
	}
}
