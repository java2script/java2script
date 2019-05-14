package swingjs;

import java.applet.AppletContext;
import java.applet.AppletStub;
import java.applet.AudioClip;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.JSFrame;
import java.awt.GraphicsConfiguration;
import java.awt.Image;
import java.awt.Insets;
import java.awt.Toolkit;
import java.awt.Window;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLStreamHandlerFactory;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Hashtable;

import javax.imageio.ImageIO;
import javax.swing.JApplet;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.SwingUtilities;
import javax.swing.WindowConstants;

import javajs.util.JSThread;
import javajs.util.Lst;
import javajs.util.PT;
import sun.applet.AppletEvent;
import sun.applet.AppletEventMulticaster;
import sun.applet.AppletListener;
import sun.awt.AppContext;
import swingjs.api.Interface;
import swingjs.plaf.Resizer;

/**
 * JSAppletViewer
 * 
 * SwingJS class to start an applet. Note that this must be a JApplet, not just
 * java.applet. The SwingJS implementation does not allow "mixed" contents
 * -- That is, no non-Swing Applet components are allowed.
 * 
 * However, the package a2s has adapter classes that have names of the AWT
 * components Label, Button, Applet, Frame, etc., which allow one to simply
 * change the imports from java.awt or java.applet to a2s and be done with
 * it. This may take some development along the way, as we have not fully
 * implemented all of the methods of AWT classes, and the JComponent does not
 * subclass its AWT counterpart.
 * 
 * 
 * 
 * The basic start up in JavaScript involves:
 * 
 * Clazz.loadClass("swingjs.JSAppletViewer"); var _appletViewer = new
 * JSAppletViewer(viewerOptions); _appletViewer.start();
 * 
 * where viewerOptions holds critical information needed to create this applet
 * 
 * 
 * @author Bob Hanson
 * 
 */
public class JSAppletViewer extends JSFrameViewer implements AppletStub, AppletContext {

	/*
	 * the JavaScript testApplet._applet object
	 */

	public int maximumSize = Integer.MAX_VALUE;

	// /// AppletViewer fields //////

	public GraphicsConfiguration graphicsConfig;
	public JSThreadGroup threadGroup;
	public JSThread myThread;
	public boolean haveFrames = false;

	/**
	 * The initial applet size.
	 */
	Dimension defaultAppletSize = new Dimension(10, 10);

	/**
	 * The current applet size.
	 */
	Dimension currentAppletSize = new Dimension(10, 10);

	private int nextStatus;

	/* applet event ids */
	public final static int APPLET_UNINITIALIZED = 0; // SwingJS
	public final static int APPLET_LOAD = 1;
	public final static int APPLET_INIT = 2;
	public final static int APPLET_START = 3;
	public final static int APPLET_READY = 35; // SwingJS
	public final static int APPLET_STOP = 4;
	public final static int APPLET_DESTROY = 5;
	public final static int APPLET_QUIT = 6;
	public final static int APPLET_ERROR = 7;
	public final static int APPLET_DISPOSE = 75; // SwingJS
	public final static int RUN_MAIN = 76; // SwingJS

	/* send to the parent to force relayout */
	public final static int APPLET_RESIZE = 51234;

	/*
	 * sent to a (distant) parent to indicate that the applet is being loaded or
	 * as completed loading
	 */
	public final static int APPLET_LOADING = 51235;
	public final static int APPLET_LOADING_COMPLETED = 51236;

	/**
	 * The current status. One of: APPLET_DISPOSE, APPLET_LOAD, APPLET_INIT,
	 * APPLET_START, APPLET_STOP, APPLET_DESTROY, APPLET_ERROR.
	 */
	private int status = APPLET_UNINITIALIZED;

	private AppletListener listeners;

	public Lst<Window> allWindows = new Lst<Window>();

	public void addWindow(Window window) {
		// not entirely clear why we are getting multiples here
		allWindows.removeObj(window);
		allWindows.addLast(window);
	}

	public JSFrame sharedOwnerFrame;

	public AppContext appContext;

	private ArrayList<Object> timerQueue;

	boolean isResizable, haveResizable;

	private boolean addFrame;

	private JFrame jAppletFrame;

	static {

		try {
			URL.setURLStreamHandlerFactory(
					(URLStreamHandlerFactory) Interface.getInstance("javajs.util.AjaxURLStreamHandlerFactory", false));
		} catch (Throwable e) {
			// that's fine -- already created
		}

	}

	/**
	 * SwingJS initialization is through a Hashtable provided by the page
	 * JavaScript
	 * 
	 * After the applet is instantiated is the opportunity to add a listener
	 * using setAppletListener(x), where x.appletStateChanged(AppletEvent evt)
	 * exists
	 * e
	 * next command on page should be 秘appletViewer.start();
	 * 
	 * @param params
	 */
	public JSAppletViewer(Hashtable<String, Object> params) {
		super(params);
		System.out.println("JSAppletViewer initializing2");
		isApplet = true;
		appletViewer = this;
		setDisplayParams(params);
	}

	private void setDisplayParams(Hashtable<String, Object> params) {
		display = params.get("display");
		String s = "" + params.get("isResizable");
		isResizable = "true".equalsIgnoreCase(s);
		haveResizable = (isResizable || "false".equalsIgnoreCase(s));
		
		addFrame = "true".equalsIgnoreCase("" + params.get("addFrame"));

		insets = new Insets(0, 0, 0, 0);

		threadGroup = new JSThreadGroup(appletName);
		myThread = new JSAppletThread(this, threadGroup, appletName);
//		JSToolkit.J2S.setAppletThread(appletName, myThread);
		java.lang.Thread.thisThread = (java.lang.Thread) ((Object) myThread);
		
		appContext = JSToolkit.createNewAppContext();
		// initialize toolkit and graphics configuration
		Toolkit.getDefaultToolkit();
		new JSGraphicsConfiguration().getDevice();
	}

	public void start() {
		if (status == APPLET_UNINITIALIZED)
			myThread.start();
		else
			showStatus("already started");
		// japplet.repaint();
	}

	synchronized public void addAppletListener(AppletListener l) {
		listeners = AppletEventMulticaster.add(listeners, l);
	}

	synchronized public void removeAppletListener(AppletListener l) {
		listeners = AppletEventMulticaster.remove(listeners, l);
	}

	/**
	 * Dispatch event to the listeners..
	 */
	public void dispatchAppletEvent(int id, Object argument) {
		if (listeners != null) {
			AppletEvent evt = new AppletEvent(this, id, argument);
			listeners.appletStateChanged(evt);
		}
	}

	// ///////// AppletStub ////////////////

	@Override
	public boolean isActive() {
		return true;
	}

	@Override
	/**
	 * Is called when the applet wants to be resized.
	 */
	public void appletResize(int width, int height) {
		final Dimension currentSize = new Dimension(currentAppletSize.width, currentAppletSize.height);
		currentAppletSize.width = width;
		currentAppletSize.height = height;
		applet.getRootPane().setBounds(0, 0, getWidth(), getHeight());
		applet.getContentPane().setBounds(0, 0, getWidth(), getHeight());
		applet.setBounds(0, 0, width, height);

		// this will trigger a SwingUtilities.invokeLater(revalidate()) on the event thread;
		((JComponent) applet.getContentPane()).revalidate();
		
		if (addFrame) {
			jAppletFrame = new JFrame("SwingJS Applet Viewer");
			Container pane = applet.getContentPane();
			jAppletFrame.setContentPane(pane);
			applet.setVisible(false);
			jAppletFrame.pack();
			jAppletFrame.setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
		}
		SwingUtilities.invokeLater(new Runnable() {
			@Override
			public void run() {
				applet.repaint(0, 0, getWidth(), getHeight());
				dispatchAppletEvent(APPLET_RESIZE, currentSize);
			}
		});

	}

	@Override
	public URL getDocumentBase() {
		try {
			return new URL((String) params.get("documentBase"));
		} catch (MalformedURLException e) {
			return null;
		}
	}

	@Override
	public URL getCodeBase() {
		try {
			return new URL((String) params.get("codePath"));
		} catch (MalformedURLException e) {
			return null;
		}
	}

	@Override
	public String getParameter(String name) {
		String s = (String) params.get(name);
		System.out.println("get parameter: " + name + " = " + s);
		return (s == null ? null : "" + s); // because it may not be a string in
											// JavaScript if inherited from Info
	}

	@Override
	public AppletContext getAppletContext() {
		return this;
	}

	public int getHeight() {
		return this.html5Applet._getHeight();
	}

	public int getWidth() {
		return this.html5Applet._getWidth();
	}

	@SuppressWarnings("deprecation")
	public void setBounds(int x, int y, int width, int height) {
		applet.reshape(x, y, width, height); // straight to component
		currentAppletSize.width = width;
		currentAppletSize.height = height;
	}

	// /// AppletContext /////

	@Override
	public Image getImage(URL url) {
		try {
			return ImageIO.read(url);
		} catch (Throwable t) {
			return null;
		}
	}

	@Override
	public java.applet.JSApplet getApplet(String name) {
		JApplet applet = null;
		/**
		 * @j2sNative
		 * 
		 * 			applet = SwingJS._applets[name]; applet && (applet =
		 *            applet._applet);
		 */
		{

		}
		return applet;
	}

	@Override
	public Enumeration<java.applet.JSApplet> getApplets() {
		// not supported for now
		return null;
	}

	@Override
	public void showDocument(URL url) {
		// note that JavaScript will overwrite this one because names will not
		// be qualified here
		JSUtil.showWebPage(url, null);
	}

	@Override
	public void showDocument(URL url, String target) {
		JSUtil.showWebPage(url, target);
	}

	@Override
	public void showStatus(String status) {
		JSUtil.log(status);
		/**
		 * @j2sNative
		 * 
		 * 			Clazz._LoaderProgressMonitor.showStatus(status, true);
		 */
		{
			System.out.println(status);
		}
	}

	private void showAppletStatus(String status) {
		getAppletContext().showStatus(htmlName + " " + status);
	}

	private void showAppletException(Throwable t) {
		/**
		 * @j2sNative
		 * 
		 * 			this.showAppletStatus$S("error " + (t.getMessage ?
		 *            t.getMessage$() : t)); 
		 *            if (t.printStackTrace$) t.printStackTrace$();
		 *            else System.out.println(t.stack);
		 */
		{
		}
		// repaint();
	}

	/**
	 * 
	 * @param mode
	 * @return LOOP or DONE
	 */
	public int run1(int mode) {
		System.out.println("JSAppletViewer thread run1 mode=" + mode + " status=" + nextStatus);
		boolean ok = false;
		switch (mode) {
		case JSThread.INIT:
			currentAppletSize.width = defaultAppletSize.width = getWidth();
			currentAppletSize.height = defaultAppletSize.height = getHeight();
			nextStatus = APPLET_LOAD;
			ok = true;
			break;
		case JSThread.LOOP:
			switch (nextStatus) {
			case APPLET_LOAD:
				if (status != APPLET_UNINITIALIZED) {
					showAppletStatus("notdisposed");
					status = APPLET_ERROR;
					break;
				}
				System.out.println("JSAppletViewer runloader");
				runLoader(); // applet created here
				nextStatus = (main == null ? APPLET_INIT : RUN_MAIN);
				ok = true;
				break;
			case APPLET_INIT:
				// AppletViewer "Restart" will jump from destroy method to
				// init, that is why we need to check status w/ APPLET_DESTROY
				if (status != APPLET_LOAD && status != APPLET_DESTROY) {
					showAppletStatus("notloaded");
					break;
				}
				System.out.println("JSAppletViewer init");
				applet.setFont(new Font(Font.DIALOG, Font.PLAIN, 12));
				applet.秘resizeOriginal(defaultAppletSize.width, defaultAppletSize.height);
				applet.init();
				// Need the default(fallback) font to be created in this
				// AppContext
				applet.validate(); // SwingJS
				status = APPLET_INIT;
				showAppletStatus("initialized");
				nextStatus = APPLET_START;
				ok = true;
				break;
			case APPLET_START:
				if (status != APPLET_INIT && status != APPLET_STOP) {
					showAppletStatus("notstarted");
					status = APPLET_ERROR;
					break;
				}
				applet.getRootPane().addNotify();
				// force peer creation now
				System.out.println("JSAppletViewer start" + currentAppletSize);
				applet.秘resizeOriginal(currentAppletSize.width, currentAppletSize.height);
				applet.start();
				// applet.repaint();
				status = APPLET_START;
				showAppletStatus("started");
				nextStatus = APPLET_READY;
				ok = true;
				break;
			case APPLET_READY:
				applet.getContentPane().setBounds(applet.getBounds()); // added
																			// 7/13/17;
																			// applet
																			// background
																			// was
																			// not
																			// painting
																			// if
																			// setContentPane()
																			// was
																			// used
				applet.setVisible(true); 
				applet.validate(); // one last validation necessary for PolyhedronApplet
				showAppletStatus("ready");
				JSUtil.readyCallback(appletName, fullName, applet, this);
				if (isResizable && !addFrame && resizer == null) {
					resizer = ((Resizer) JSUtil.getInstance("swingjs.plaf.Resizer")).set(this, top);
					if (resizer != null)
						resizer.show();
				}
				JSFocusPeer.setFocusLast(applet);
				applet.repaint();
				break;
			case APPLET_STOP:
				if (status == APPLET_START) {
					status = APPLET_STOP;
					applet.setVisible(false);
					applet.stop();
					showAppletStatus("stopped");
				} else {
					showAppletStatus("notstopped");
					status = APPLET_ERROR;
				}
				break;
			case APPLET_DESTROY:
				if (status == APPLET_STOP || status == APPLET_INIT) {
					status = APPLET_DESTROY;
					applet.destroy();
					showAppletStatus("destroyed");
				} else {
					showAppletStatus("notdestroyed");
					status = APPLET_ERROR;
				}
				break;
			case APPLET_DISPOSE:
				if (status == APPLET_DESTROY || status == APPLET_LOAD) {
					showAppletStatus("notdisposed");
					status = APPLET_ERROR;
				} else {
					status = APPLET_UNINITIALIZED;
					// removeChild(applet);
					applet = null;
					showAppletStatus("disposed");
				}
				break;
			case RUN_MAIN:
				showAppletStatus("running " + main);
				// we still have an applet context for a variety of reasons
				// but main(String[] args) is run as a static method.
				Object args = params.get("args");
				if (args instanceof String)
					args = PT.split((String) args, " ");
				((JSDummyApplet) applet).runMain(main, (String[]) args);
				JSUtil.readyCallback(appletName, fullName, applet, this);
				break;
			case APPLET_QUIT:
				break;
			default:
				System.out.println("unrecognized JSAppletViewer status: " + nextStatus);
				break;
			}
			break;
		default:
			System.out.println("unrecognized JSAppletThread mode: " + mode);
			break;
		}
		return (ok ? JSThread.LOOP : JSThread.DONE);
	}

	private void runLoader() {
		dispatchAppletEvent(APPLET_LOADING, null);
		status = APPLET_LOAD;
		main = getParameter("main");
		String code = (main == null ? getParameter("code") : null);

		try {
			if (code == null && main == null) {
				System.err.println("runloader.err-- \"code\" or \"main\" must be specified.");
				throw new InstantiationException("\"code\" or \"main\" must be specified.");
			}
			if (code == null)
				code = "swingjs.JSApplet";
			else if (code.indexOf(".") < 0)
				code = "_." + code;
			top = applet = (JApplet) JSUtil.getInstance(code);
			if (applet == null) {
				System.out.println(code + " could not be launched");
				status = APPLET_ERROR;
			} else if (!(applet instanceof JApplet)) {
				JSUtil.alert(code + " is not a JApplet!?");
				status = APPLET_ERROR;
			}
		} catch (InstantiationException e) {
			status = APPLET_ERROR;
			showAppletException(e);
			return;
		} catch (Exception e) {
			status = APPLET_ERROR;
			showAppletException(e);
			return;
		} catch (ThreadDeath e) {
			status = APPLET_ERROR;
			showAppletStatus("death");
			return;
		} catch (Error e) {
			status = APPLET_ERROR;
			showAppletException(e);
			return;
		} finally {
			// notify that loading is no longer going on
			dispatchAppletEvent(APPLET_LOADING_COMPLETED, null);
		}
		if (applet != null) {
			applet.setStub(this);
			applet.setVisible(false);
			applet.setDispatcher();
			// japplet.addNotify(); // we need this here because there is no
			// frame
			showAppletStatus("loaded");
		}
	}

	/**
	 * Not used?
	 * 
	 * @param forceNew
	 * @return
	 */
	public JSFrameViewer newFrameViewer(boolean forceNew) {
		return (haveFrames || forceNew ? new JSFrameViewer() : null);
	}

	public ArrayList<Object> getTimerQueue() {
		return (timerQueue == null ? (timerQueue = new ArrayList<Object>()) : timerQueue);
	}

	public void exit() {
		for (int i = allWindows.size(); --i >= 0;)
			try {
				allWindows.get(i).dispose();
			} catch (Throwable e) {
			}
	}

	@Override
	public AudioClip getAudioClip(URL url) {
		return JSToolkit.getAudioClip(url);
	}

}