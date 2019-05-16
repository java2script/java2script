package swingjs;

import javajs.util.JSThread;
import javax.swing.SwingUtilities;

/**
 * 
 * JSAppletThread maintains connection with the originating HTML5Applet, regardless of
 * the class. So one can retrieve the graphics context, for example, using
 * 
 * Thread.getCurrentThread().viewer.getGraphics()
 * 
 * a JDialog or JFrame can retrieve the current graphics.  
 * 
 * @author Bob Hanson
 *
 */
public class JSAppletThread extends JSThread {

	public JSAppletViewer 秘appletViewer;

	public JSAppletThread(JSAppletViewer ap, ThreadGroup group, String name) {
		super(group, name);
		秘appletViewer = ap;
	}

	@Override
	public void run1(int mode) {
		mode = 秘appletViewer.run1(mode);
		if (mode != DONE)
			dispatchAndReturn(null, mode);
	}
	
	/**
	 * dispatch applet threads on the main EventQueue
	 */
	protected void dispatchAndReturn(Runnable r, int mode) {
		final int m = mode;
		SwingUtilities.invokeLater(new Runnable() {
			@Override
			public void run() {
				run1(m);
			}
		});
	}

	// the rest of these are not used by JSAppletThread because we are 
	// overwriting run() completely
	
	@Override
	protected boolean myInit() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	protected boolean isLooping() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	protected boolean myLoop() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	protected void whenDone() {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected int getDelayMillis() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	protected void onException(Exception e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void doFinally() {
		// TODO Auto-generated method stub
		
	}

}
