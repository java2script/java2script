package swingjs;

import java.awt.Container;
import java.awt.Graphics;
import java.awt.Insets;
import java.util.Hashtable;

import javax.swing.JApplet;
import javax.swing.JRootPane;
import javax.swing.RootPaneContainer;

import swingjs.api.js.DOMNode;
import swingjs.api.js.HTML5Canvas;
import swingjs.api.js.JSInterface;
import swingjs.plaf.JSComponentUI;
import swingjs.plaf.Resizer;

/**
 * JSFrameViewer 
 * 
 * SwingJS class to support an independent Window, either from using Main() 
 * or one created from a JApplet. Each viewer has an independent mouse event processor. 
 *
 * This "Panel" is never viewed.
 * 
 * @author Bob Hanson
 * 
 */
public class JSFrameViewer extends JSApp implements JSInterface {

	protected JSGraphics2D jsgraphics;

	public Container top; // JApplet or JFrame

	public JSAppletViewer appletViewer;
	public Resizer resizer;
  

	protected Insets insets;

	public Insets getInsets() {
		return insets;
	}

	public JSFrameViewer(Hashtable<String, Object> params) {
		super(params);
	}
	
	public JSFrameViewer() {
		super();
	}

	public JSFrameViewer setForWindow(Container window) {
		isFrame = true;
		appletViewer = window.appletViewer;
		this.top = window;
		applet = window;
		this.fullName = appletViewer.fullName;
		canvas = null;
		jsgraphics = null;
		insets = new Insets(20, 0, 0, 0);
		getGraphics(0, 0);
		return this;
	}
	
	
	public Container getTop() {
		return top;
	}
	
	public Object display;
	
	public Container applet;  // really just for JSmolCore 
	public JApplet japplet;
	              // SwingJS core library uses.

	protected JSMouse mouse;

	public HTML5Canvas canvas;

  // ///////// javajs.api.JSInterface ///////////
	//
	// methods called by page JavaScript
	//
	//

	@Override
	public int cacheFileByName(String fileName, boolean isAdd) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void cachePut(String key, Object data) {
		// TODO Auto-generated method stub
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
	}

	@Override
	public String getFullName() {
		return fullName;
	}

	@Override
	public void openFileAsyncSpecial(String fileName, int flags) {
		// TODO Auto-generated method stub
	}

	@Override
	public boolean processMouseEvent(int id, int x, int y, int modifiers,
			long time, Object jqevent, int scroll) {
		getMouse().processEvent(id, x, y, modifiers, time, jqevent, scroll);
		return false;
	}

	private JSMouse getMouse() {	
		return (mouse == null ? mouse = new JSMouse(this) : mouse);
	}

	@Override
	public void processTwoPointGesture(float[][][] touches) {
		getMouse().processTwoPointGesture(touches);
	}

	/** 
	 * Page can define a canvas to use or to clear it with null
	 */
	@Override
	public void setDisplay(HTML5Canvas canvas) {
		this.canvas = canvas;
		jsgraphics = null;
	}

	@SuppressWarnings("deprecation")
	@Override
	public void setScreenDimension(int width, int height) {
		setGraphics((Graphics) (Object)(jsgraphics = null), width, height);
		//resize(width, height);
		if (top != null)
			top.resize(width, height);
	}

	/**
	 * SwingJS will deliver a null graphics here.
	 * 
	 * @param g
	 * @return
	 */
	protected Graphics setGraphics(Graphics g, int width, int height) {
		return (g == null ? getGraphics(width, height) : g);
	}
		

	@Override
	public boolean setStatusDragDropped(int mode, int x, int y, String fileName) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void startHoverWatcher(boolean enable) {
		// TODO Auto-generated method stub

	}
	
	
	public String frameID;

	private String canvasId;

	private static int canvasCount;

	private Container topApp;
	public Graphics getGraphics(int wNew, int hNew) {
		if (wNew == 0 && top != null) {
			if (topApp == null)
				topApp = top;
			wNew = Math.max (0, ((RootPaneContainer)topApp).getContentPane().getWidth());
			hNew = Math.max (0, ((RootPaneContainer)topApp).getContentPane().getHeight());
		}
		int wOld = 0, hOld = 0;
		/**
		 * @j2sNative
		 * 
		 *            wOld = (this.canvas == null ? 0 : this.canvas.width); hOld =
		 *            (this.canvas == null ? 0 : this.canvas.height)
		 * 
		 */
		{
		}
		if (wNew >= 0
				&& hNew >= 0
				&& (wOld != wNew || hOld != hNew || canvas == null || 	jsgraphics == null)) {
			jsgraphics = new JSGraphics2D(canvas = newCanvas(wNew, hNew));
			//top.repaint(0, 0, wNew, hNew);
		}
		return (Graphics)(Object)jsgraphics;
	}


	public HTML5Canvas newCanvas(int width, int height) {
		if (isApplet) {
			// applets create their own canvas
			HTML5Canvas c = html5Applet._getHtml5Canvas();
			if (c != null) {
				return canvas = c;
			}
		}
		if (topApp ==  null)
			topApp = top;
		JRootPane root = (JRootPane) (topApp.getComponentCount() > 0 ? topApp.getComponent(0) : null);
		Container userFramedApplet = null, app = null;
		if (root != null && root.getContentPane().getComponentCount() > 0) {
			// check for applet in a frame
			boolean appletInFrame = false;
			app = (Container) root.getContentPane().getComponent(0);
			/**
			 * @j2sNative
			 * 
			 * appletInFrame = (app.uiClassID == "AppletUI");
			 */
			if (appletInFrame) {
				userFramedApplet = app;
				root = (JRootPane) userFramedApplet.getComponent(0);				
			}
		}
		DOMNode parent = (root == null ? null : ((JSComponentUI) root.getUI()).domNode);
		if (parent != null)
			DOMNode.remove(canvas);
		display = canvasId = appletViewer.appletName + "_canvas" + ++canvasCount;
		System.out.println("JSFrameViewer creating new canvas " + canvasId + ": "
				+ width + "  " + height);
		canvas = (HTML5Canvas) DOMNode.createElement("canvas", canvasId);
		if (userFramedApplet != null) {
			JSFrameViewer appViewer = 
			userFramedApplet.getFrameViewer();
			appViewer.setDisplay(canvas);
			appViewer.topApp = app;
			
		}
		int iTop = (root == null ? 0 : root.getContentPane().getY()); 
		DOMNode.setPositionAbsolute(canvas, iTop, 0);
		DOMNode.setStyles(canvas, "width", width + "px", "height", height + "px");
		if (resizer != null)
			resizer.setPosition(0, 0);
			
		if (parent != null) {
			parent.appendChild(canvas);
		}
		// this next call to j2sApplet binds mouse actions to this canvas. When the
		// content pane is created, this canvas will be placed appropriately and used
		// to transfer mouse and button actions to the right FrameViewer
		/**
		 * @j2sNative
		 * 
		 *            this.canvas.width = width; this.canvas.height = height;
		 */
		{}	
		return canvas;
	}

	boolean resizable = true;

	public void setResizable(boolean tf) {
		resizable = tf;
		if (!isResizable())
			resizable = false;
		if (resizer != null)
			resizer.setEnabled(resizable);
		else if (resizable && newResizer() != null)
			resizer.setPosition(0, 0);
	}
	
	public boolean isResizable() {
		// default is for a frame to be resizable, but we can override this either
		// by setting JFrame.setResizable(false). 
		
		return resizable && (!appletViewer.haveResizable || appletViewer.isResizable);
	}

	public Resizer getResizer() {
		return (resizer != null || !isResizable() ? resizer : newResizer());
	}

	private Resizer newResizer() {
		resizer = new Resizer().set(this);
		if (resizer != null)
			resizer.show();
		return resizer;
	}

	public DOMNode getDiv(String id) {
		/**
		 * @j2sNative
		 * 
		 * return J2S.$(this.html5Applet, id)[0];
		 */
		{
			return null;
		}
	}

	public void paint(Graphics g) {
		// Note that the applet "Panel" is never painted.
		// This class simply maintains valuable information for applet loading.
		// Here we go straight to the contentPane and paint that.
		top.paint(setGraphics(g, 0, 0));
	}


}