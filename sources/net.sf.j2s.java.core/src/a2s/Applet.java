package a2s;

import java.awt.Graphics;
import java.awt.HeadlessException;
import java.net.MalformedURLException;
import java.net.URL;

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

	private boolean paintMeNotified;
	
	protected void paintMe(Graphics g) {
		if (!paintMeNotified) {
			System.out.println("paintMe has not been implemented for " + this);
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
