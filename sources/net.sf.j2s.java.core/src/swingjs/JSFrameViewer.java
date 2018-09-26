package swingjs;

import java.awt.Component;
import java.awt.Container;
import java.awt.Graphics;
import java.awt.Insets;
import java.awt.JSComponent;
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
 * SwingJS class to support an independent Window, either from using Main() or
 * one created from a JApplet. Each viewer has an independent mouse event
 * processor.
 *
 * This "Panel" is never viewed.
 * 
 * @author Bob Hanson
 * 
 */
public class JSFrameViewer extends JSApp implements JSInterface {

	protected JSGraphics2D jsgraphics;

	protected RootPaneContainer top; // JApplet or JFrame, also a JSComponent

	public JSComponent getTopComponent() {
		return (JSComponent) top;
	}

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

	public JSFrameViewer setForWindow(RootPaneContainer c) {
		// JApplet, JDialog, JFrame (including JInternalFrame), JRootPane, JWindow
		isFrame = true;
		top = c;
		appletViewer = ((JSComponent)top).appletViewer;
		if (c instanceof JApplet)
			applet = (JApplet) c;
		fullName = appletViewer.fullName;
		canvas = null;
		jsgraphics = null;
		insets = new Insets(20, 0, 0, 0);
		getGraphics(0, 0, c);
		return this;
	}

	public Object display;

	public JApplet applet;

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
	public boolean processMouseEvent(int id, int x, int y, int modifiers, long time, Object jqevent, int scroll) {
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

	@Override
	public void setScreenDimension(int width, int height) {
		setGraphics((Graphics) (Object) (jsgraphics = null), width, height, top);
		if (top != null)
			((JSComponent) top).resizeOriginal(width, height);
	}

	/**
	 * SwingJS will deliver a null graphics here.
	 * 
	 * @param g
	 * @return
	 */
	protected Graphics setGraphics(Graphics g, int width, int height, RootPaneContainer window) {
		return (g == null ? getGraphics(width, height, window) : g);
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

	public Graphics getGraphics() {
		return getGraphics(0, 0, top);
	}

	public String frameID;

	private String canvasId;

	private static int canvasCount;
	
	private static HTML5Canvas canvas00;

	
	public Graphics getGraphics(int wNew, int hNew, RootPaneContainer window) {
		if (window == null) // from, for example, a resize of the browser page
			window = top;
		// technically, a JApplet is not a Window, but it is a Container and it is a
		// RootPaneContainer
		JSComponent c = (JSComponent) window; // will be null from j2sApplet.js
		if (wNew == 0) {
			wNew = Math.max(0, window.getContentPane().getWidth());
			hNew = Math.max(0, window.getContentPane().getHeight());
		}
		int wOld = 0, hOld = 0;
		if (c._canvas != null) {
			/**
			 * @j2sNative
			 * 
			 * 			wOld = c._canvas.width; hOld = c._canvas.height;
			 * 
			 */
		}
		if (wNew >= 0 && hNew >= 0 && (wOld != wNew || hOld != hNew || c._canvas == null || jsgraphics == null)) {
			jsgraphics = new JSGraphics2D(c._canvas = newCanvas(wNew, hNew, window));
		}
		// coerse jsgraphics to Graphics
		return (Graphics) (Object) jsgraphics;
	}

	private HTML5Canvas newCanvas(int width, int height, RootPaneContainer window) {
		if (isApplet) {
			// applets create their own canvas
			HTML5Canvas c = html5Applet._getHtml5Canvas();
			if (c != null) {
				return canvas = c;
			}
		}
		if (width == 0 || height == 0) {
			width = height = 0;
			if (canvas00 != null)
				return canvas00;
		}
		JApplet userFramedApplet = null;
		JRootPane root = (JRootPane) window.getRootPane();
		Container contentPane = window.getContentPane();
		if (contentPane.getComponentCount() > 0) {
			// check for applet in a frame, and if present, switch to its root pane
			Component app = contentPane.getComponent(0);
			if (app instanceof JApplet)
				root = (userFramedApplet = (JApplet) app).getRootPane();
		}
		DOMNode rootNode = (root == null ? null : ((JSComponentUI) root.getUI()).domNode);
		if (rootNode != null)
			DOMNode.remove(canvas);
		display = canvasId = appletViewer.appletName + "_canvas" + ++canvasCount;
		canvas = (HTML5Canvas) DOMNode.createElement("canvas", canvasId);
		if (userFramedApplet != null) {
			JSFrameViewer appViewer = userFramedApplet.getFrameViewer();
			appViewer.setDisplay(canvas);
		}
		int iTop = (root == null ? 0 : root.getContentPane().getY());
		DOMNode.setTopLeftAbsolute(canvas, iTop, 0);
		DOMNode.setStyles(canvas, "width", width + "px", "height", height + "px");
		if (width > 0) {
			System.out.println("JSFrameViewer creating new canvas " + canvasId + ": " + width + "  " + height);
			// ensures one last update for a frame
			JSComponentUI ui = (JSComponentUI) root.getParent().getUI();
			if (ui != null)
				ui.updateDOMNode();
			if (resizer != null)
				resizer.setPosition(0, 0);

			if (rootNode != null) {
				rootNode.appendChild(canvas);
			}
		} else {
			canvas00 = canvas;
		}
		// this next call to j2sApplet binds mouse actions to this canvas. When the
		// content pane is created, this canvas will be placed appropriately and used
		// to transfer mouse and button actions to the right FrameViewer
		/**
		 * @j2sNative
		 * 
		 * 			this.canvas.width = width; this.canvas.height = height;
		 */
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
		resizer = new Resizer().set(this, top);
		if (resizer != null)
			resizer.show();
		return resizer;
	}

	public DOMNode getDiv(String id) {
		/**
		 * @j2sNative
		 * 
		 * 			return J2S.$(this.html5Applet, id)[0];
		 */
		{
			return null;
		}
	}

//	public void paint(Graphics g) {
//		// Note that the applet "Panel" is never painted.
//		// This class simply maintains valuable information for applet loading.
//		// Here we go straight to the contentPane and paint that.
//		((JSComponent)top).paint(setGraphics(g, 0, 0, null));
//	}
//

}