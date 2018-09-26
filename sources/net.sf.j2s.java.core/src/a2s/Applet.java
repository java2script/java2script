package a2s;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.HeadlessException;
import java.net.MalformedURLException;
import java.net.URL;

import javax.swing.JApplet;

public class Applet extends JApplet implements A2SContainer {
	

	// Note: applet.paint(g) needs to include super.paint(g), 
	// or buttons will not show.

    public Applet() throws HeadlessException {
    	super();
		// Note: applet.paint(g) needs to include super.paint(g), or buttons will not
		// show. So we do that in fixAppletPaint().
		fixAppletPaint();
		listener = new A2SListener();
		addMouseListener(listener);
		addMouseMotionListener(listener);
    }

	public void setBackground(Color c) {
		super.setBackground(c);
		getContentPane().setBackground(c);
	}
	
	/**
	 * Effectively add "super.paint(g)" the user's method.
	 * 
	 */
	private void fixAppletPaint() {
    	
		/**@j2sNative
		 * 
		 * try{
		 * if (this.paint$java_awt_Graphics.exClazz != C$
		 *   && this.paint$java_awt_Graphics.toString().indexOf("C$.superclazz.prototype.paint$java_awt_Graphics.apply(this") < 0) {
		 *      var oldPaint = this.paint$java_awt_Graphics;
		 *      this.paint$java_awt_Graphics = function(g) {
		 *        C$.prototype.paint$java_awt_Graphics.apply(this,[g]);
		 *        oldPaint.apply(this,[g]);
		 *      };
		 * }
		 * } catch(e) {
		 * System.out.println("a2s.Applet.fixAppletPaint() exception: " + e);
		 * }
		 */
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
