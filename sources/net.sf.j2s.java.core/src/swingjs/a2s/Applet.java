package swingjs.a2s;

import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.HeadlessException;
import java.net.MalformedURLException;
import java.net.URL;

import javax.swing.JApplet;
import javax.swing.JComponent;

public class Applet extends JApplet implements A2SContainer {
	

	public void isAWT() {}

	// Note: applet.paint(g) needs to include super.paint(g), 
	// or buttons will not show.

    public Applet() throws HeadlessException {
    	super();
		// Note: applet.paint(g) needs to include super.paint(g), or buttons will not
		// show. So we do that in fixAWTPaint().
		A2SContainer.fixAWTPaint(this, JApplet.class);
		listener = new A2SListener();
		addMouseListener(listener);
		addMouseMotionListener(listener);
		setLayout(new FlowLayout());
		//getRootPane().setOpaque(false);
		((JComponent) getContentPane()).setOpaque(false);
    }

	@Override
	public Font getFont() {
		if (font == null && parent == null)
	    	font = new Font(Font.DIALOG, Font.PLAIN, 12);
		return super.getFont();
	}
	
	@Override
	public void setBackground(Color c) {
		super.setBackground(c);
		getRootPane().setBackground(c);
		getContentPane().setBackground(c);
	}
	
	protected A2SListener listener;

	@Override
	public A2SListener getA2SListener() {
		return listener;
	}

//	@Override
//	public void init() {
//	}

//	private boolean paintMeNotified;
//	
//	protected void paintComponent_(Graphics g) {
//		if (!paintMeNotified) {
//			System.out.println("JComponent.paintComponent(g) has not been overridden (including a super.paintComponent(g)) \nfor the " + this.getClass().getName() + " AWT applet.\nThis many be no problem, or it may mean the applet is not displaying properly.\n See https://docs.oracle.com/javase/tutorial/uiswing/painting/refining.html\n and https://docs.oracle.com/javase/tutorial/uiswing/painting/closer.html");
//			paintMeNotified = true;
//		}
//	}

	
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
