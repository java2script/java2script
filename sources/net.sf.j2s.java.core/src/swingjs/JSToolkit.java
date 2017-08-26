package swingjs;

import java.awt.Toolkit;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Hashtable;
import java.util.Locale;
import java.util.Map;

import javajs.J2SIgnoreImport;
import javajs.api.JSFunction;
import javajs.util.AU;
import javajs.util.PT;
import javajs.util.Rdr;
import javajs.util.SB;
import javajs.util.ZipTools;

import swingjs.api.Interface;
import swingjs.api.js.JQuery;
import swingjs.api.js.DOMNode;
import swingjs.api.js.HTML5Applet;
import swingjs.api.js.HTML5CanvasContext2D;
import swingjs.api.js.J2SInterface;

@J2SIgnoreImport(URL.class)
public class JSToolkit {

	public static J2SInterface J2S;
	public static boolean isMac;

	private static Hashtable<String, Object> fileCache;
	private static boolean useCache = true;

	/**
	 * Derived from J2S._checkLoad, which can be set in html page
	 */
	public static boolean debugging;

	static {
		boolean j2sdebug = false;
		boolean j2sismac = false;
		J2SInterface j2sself = null;
		/**
		 * @j2sNative
		 * 
		 * 			j2sself = self.J2S; j2sismac = (J2S.featureDetection.os ==
		 *            "mac"); j2sdebug = J2S._checkLoad || J2S._debugCode
		 * 
		 */
		{
		}
		debugging = j2sdebug;
		isMac = j2sismac;
		J2S = j2sself;
	}

	/*
	 * NOTE: This class is constructed from
	 * jsjava.awt.Toolkit.getDefaultToolkit()
	 * 
	 */

	public JSToolkit() {
		super();
		System.out.println("JSToolkit initialized");
	}

	/**
	 * important warnings for TODO list
	 * 
	 * @param msg
	 */
	public static void warn(String msg) {
		alert(msg);
	}

	/**
	 * JavaScript alert
	 */
	public static void alert(Object object) {
		/**
		 * @j2sNative
		 * 
		 * 			console.log("[JSToolkit] " + object); alert("[JSToolkit] "
		 *            + object);
		 */
		{
			System.out.println(object);
		}
	}

	/**
	 * JavaScript console.log
	 */
	public static void log(String msg) {
		/**
		 * @j2sNative
		 * 
		 * 			System.out.println(msg); console.log(msg);
		 */
		{
		}
	}

	/**
	 * JavaScript confirm
	 * 
	 */
	public static boolean confirm(String msg) {
		/**
		 * @j2sNative
		 * 
		 * 			return confirm(msg);
		 */
		{
			return false;
		}
	}

	/**
	 * JavaScript confirm
	 * 
	 */
	public static String prompt(String msg, String defaultRet) {
		/**
		 * @j2sNative
		 * 
		 * 			return prompt(msg, defaultRet);
		 */
		{
			return null;
		}
	}

	// /**
	// * for SwingJS debugging
	// *
	// * @param isPost
	// * @return
	// */
	// public static Object getPostEventQueue(boolean isPost) {
	// return (isPost ? (PostEventQueue) AppContext.getAppContext().get(
	// POST_EVENT_QUEUE_KEY) : (EventQueue) AppContext.getAppContext().get(
	// AppContext.EVENT_QUEUE_KEY));
	// }
	//
	// public static void exit() {
	// getAppletViewer().exit();
	// }
	//
	// // ////// jsjava.awt.Toolkit /////////
	//
	// @Override
	// protected int getScreenWidth() {
	// @SuppressWarnings("unused")
	// JQuery jq = getJQuery();
	// int w = 0;
	// /**
	// * @j2sNative
	// *
	// * w = jq.$(window).width();
	// *
	// */
	// {
	// }
	// return w;
	// }
	//
	// @Override
	// protected int getScreenHeight() {
	// @SuppressWarnings("unused")
	// JQuery jq = getJQuery();
	// int h = 0;
	// /**
	// * @j2sNative
	// *
	// * h = jq.$(window).height();
	// *
	// */
	// {
	// }
	// return h;
	// }
	//
	//
	// @Override
	// public int getScreenResolution() {
	// // n/a
	// return 0;
	// }
	//
	// @Override
	// public ColorModel getColorModel() {
	// return ColorModel.getRGBdefault();
	// }
	//
	// @Override
	// public void sync() {
	// // n/a?
	// }
	//
	// // ////// sun.awt.SunToolkit /////////
	//
	// @Override
	// public boolean isModalExclusionTypeSupported(
	// ModalExclusionType modalExclusionType) {
	// return true;
	// }
	//
	// @Override
	// public boolean isModalityTypeSupported(ModalityType modalityType) {
	// // TODO Auto-generated method stub
	// return false;
	// }
	//
	// @Override
	// public boolean isTraySupported() {
	// // TODO Auto-generated method stub
	// return false;
	// }
	//
	//// @Override
	//// protected boolean syncNativeQueue(long timeout) {
	//// // TODO Auto-generated method stub
	//// return false;
	//// }
	////
	// @Override
	// public void grab(Window w) {
	// // TODO Auto-generated method stub
	//
	// }
	//
	// @Override
	// public void ungrab(Window w) {
	// // TODO Auto-generated method stub
	//
	// }

	// /////////////////// Special SwingJS calls /////////////////////////

	/**
	 * get a property that is not just a String (not implemented)
	 * 
	 * @param t
	 * @param key
	 * @param def
	 * @return
	 */
	public static Object getPropertyObject(Object t, String key, Object def) {
		return def;
	}

	/**
	 * Load a class that has a () constructor.
	 * 
	 * @param className
	 * @return may be null
	 */
	public static Object getInstance(String className) {
		return swingjs.api.Interface.getInstance(className, false);
	}

	// /**
	// * There is one and only one graphics configuration for a given Applet.
	// * It is available through Thread.currentThread
	// * @return
	// */
	// public static GraphicsConfiguration getGraphicsConfiguration() {
	// JSAppletViewer ap = getAppletViewer();
	// GraphicsConfiguration gc = ap.graphicsConfig;
	// return (gc == null ? (gc = ap.graphicsConfig = (GraphicsConfiguration)
	// getInstance("swingjs.JSGraphicsConfiguration")) : gc);
	// }
	//
	// public static JSAppletViewer getAppletViewer() {
	// return ((JSAppletThread) Thread.currentThread()).appletViewer;
	// }
	//
	// public static boolean isFocused(Window window) {
	// // TODO Auto-generated method stub
	// return false;
	// }
	//
	// /**
	// * generates proper font name for JSGraphics2d Apparently Java sizes are
	// * pixels, not points. Not sure on this...
	// *
	// * @param font
	// * @return "italic bold 10pt Helvetica"
	// */
	// public static String getCSSFont(Font font) {
	// String css = "";
	// if (font.isItalic())
	// css += "font-style:italic;";
	// if (font.isBold())
	// css += "font-weight:bold;";
	// css += "font-size:" + font.getSize() + "px;";
	// css += "font-family:" + font.getFamily() + ";";
	// return css;
	// }
	//
	// private static HTML5CanvasContext2D defaultContext;
	//
	// public static float getStringWidth(HTML5CanvasContext2D context, Font
	// font,
	// String text) {
	// if (text == null || text.length() == 0)
	// return 0;
	// @SuppressWarnings("unused")
	// String fontInfo = getCanvasFont(font);
	// if (context == null)
	// context = getDefaultCanvasContext2d();
	// int w = 0;
	// /**
	// * @j2sNative
	// * context.font = fontInfo;
	// * w = Math.ceil(context.measureText(text).width);
	// */
	// {
	// }
	// return w;
	// }
	//
	// /**
	// * Used as a stratch pad for determining text string dimensions.
	// *
	// * @return
	// */
	// private static HTML5CanvasContext2D getDefaultCanvasContext2d() {
	// /**
	// * @j2sNative
	// *
	// * if (this.defaultContext == null) this.defaultContext =
	// * document.createElement( 'canvas' ).getContext('2d');
	// */
	// {}
	// return defaultContext;
	// }
	//
	//
	// public static String getCSSColor(Color c) {
	// String s = "000000" + Integer.toHexString(c.getRGB() & 0xFFFFFF);
	// return "#" + s.substring(s.length() - 6);
	// }
	//
	// private static UIDefaults uid;
	//
	// public static UIDefaults getLookAndFeelDefaults() {
	// if (uid == null)
	// uid = UIManager.getLookAndFeel().getDefaults();
	// return uid;
	// }
	//
	// public static JSComponentUI getComponentUI(JComponent target) {
	// JSComponentUI ui = (JSComponentUI)
	// Interface.getInstance("swingjs.plaf.JS"
	// + ((jsjava.awt.JSComponent) target).getUIClassID(), true);
	// if (ui != null)
	// ui.set(target);
	// return ui;
	// }
	//
	private static Map<String, Boolean> mapNotImpl;

	/**
	 * report ONCE to System.out; can check in JavaScript
	 * 
	 * @param msg
	 *            TODO
	 * 
	 */
	public static void notImplemented(String msg) {
		String s = null;
		if (mapNotImpl == null)
			mapNotImpl = new Hashtable<String, Boolean>();
		/**
		 * @j2sNative
		 * 
		 * 			s = arguments.callee.caller; var cl = s.claxxOwner ||
		 *            s.exClazz; s = (cl ? cl.__CLASS_NAME__ + "." : "") +
		 *            arguments.callee.caller.exName;
		 */
		{
		}
		if (mapNotImpl.containsKey(s))
			return;
		mapNotImpl.put(s, Boolean.TRUE);
		System.out.println(s + " has not been implemented in SwingJS. "
				+ (msg == "" ? "" : (msg == null ? "" : msg) + getStackTrace(-5)));

	}

	public static String getStackTrace() {
		/**
		 * @j2sNative
		 * 
		 * 			return Clazz.getStackTrace();
		 */
		{
			return null;
		}
	}

	public static String getStackTrace(int n) {
		/**
		 * @j2sNative
		 * 
		 * 			return Clazz.getStackTrace(n);
		 */
		{
			return null;
		}
	}

	public static String getSwingDivId() {
		return Thread.currentThread().getName() + "_swingdiv";
	}

	/**
	 * Sets window.jQuery.$ = window.jQuery, so that we can call jQuery.$
	 * 
	 * @return an object with $ as a method
	 */
	public static JQuery getJQuery() {
		/**
		 * @j2sNative
		 * 
		 * 			if (!window.jQuery) alert( "jQuery is required for SwingJS, but window.jQuery is not defined." ); jQuery.$ ||
		 *            (jQuery.$ = jQuery); return(jQuery);
		 */
		{
			return null;
		}
	}

	private static void cacheFileData(String path, Object data) {
		getFileCache().put(path, data);
	}

	private static Map<String, Object> getFileCache() {
		if (fileCache == null && (fileCache = J2S._getSetJavaFileCache(null)) == null) {
			fileCache = new Hashtable<String, Object>();
			J2S._getSetJavaFileCache(fileCache);
		}
		return fileCache;
	}

	/**
	 * Load a Hashtable with resource files, which may be binary; called by
	 * JSAppletViewer upon loading and finding Info.resourceZip not null.
	 * 
	 * @param zipFileName
	 *            originating file
	 * @param mapByteData
	 *            map to fill or null for the default file cache
	 */
	@SuppressWarnings("static-access")
	public static void loadJavaResourcesFromZip(ClassLoader cl, String zipFileName, Map<String, Object> mapByteData) {
		if (mapByteData == null)
			mapByteData = getFileCache();
		String fileList = "";
		try {
			BufferedInputStream bis = new BufferedInputStream(cl.getResourceAsStream(zipFileName));
			String prefix = J2S._getResourcePath(null, true); // will end with /
			fileList = getZipTools().cacheZipContentsStatic(bis, prefix, mapByteData, false);
		} catch (Exception e) {
			System.out.println("JSToolkit could not cache files from " + zipFileName);
			return;
		}
		if (debugging)
			System.out.println("JSToolkit loaded resources from " + zipFileName + ":\n" + fileList);
	}

	private static ZipTools zipTools;

	private static ZipTools getZipTools() {
		return (zipTools == null ? (zipTools = (ZipTools) Interface.getInstance("javajs.util.ZipTools", true))
				: zipTools); // TODO Auto-generated method stub
	}

	/**
	 * Load a static JavaScript or CSS resource only once; no need to cache it
	 * if it is not there.
	 * 
	 * @param file
	 */
	public static String loadStaticResource(String file) {
		String s = "alert('" + file + "' was not found)";
		if (!J2S._isResourceLoaded(file, false)) {
			s = getJavaResource(file, true, false, true);
			J2S._isResourceLoaded(file, true);
		}
		return s;
	}

	/**
	 * a String-based file such as .js, .css, or .property
	 * 
	 * .js and .css files will be processed appropriately
	 * 
	 * @param resourceName
	 * @param isJavaPath
	 * @param doProcess
	 *            evaluate JS or load CSS
	 * @return the resource as a string
	 */
	public static String getJavaResource(String resourceName, boolean isJavaPath, boolean doCache, boolean doProcess) {
		System.out.println("JSToolkit getting Java resource " + resourceName);
		String path = J2S._getResourcePath(resourceName, isJavaPath);
		if (path == null)
			return null;
		Object data = getCachedFileData(path);
		if (data == null && (data = J2S._getFileData(path, null, false, false)) != null && useCache && doCache)
			cacheFileData(path, data);
		String sdata = ensureString(data);
		boolean ok = (sdata != null && sdata.indexOf("[Exception") != 0);
		System.out.println("Processing " + path + " [" + (ok ? "" + sdata.length() : sdata) + "]");
		return (!ok ? null
				: !doProcess ? sdata
						: path.endsWith(".css") ? processCSS(sdata, path)
								: path.endsWith(".js") ? processJS(sdata) : sdata);
	}

	public static boolean haveCachedResource(String resourceName, boolean isJavaPath) {
		String path = J2S._getResourcePath(resourceName, isJavaPath);
		return (path != null && getCachedFileData(path) != null);
	}

	private static String processCSS(String css, String path) {
		if (path != null && css.indexOf("images/") >= 0) {
			path = path.substring(0, path.lastIndexOf("/") + 1) + "images/";
			css = PT.rep(css, "images/", path);
		}
		JQuery jq = getJQuery();
		jq.$("head").append(jq.$("<style type='text/css'>" + css + "</style>"));
		return css;
	}

	private static String processJS(String js) {
		try {
			/**
			 * @j2sNative
			 * 
			 * 			eval(js);
			 * 
			 */
			{
			}
		} catch (Throwable e) {
			alert("error processing " + js);
			return null;
		}
		return js;
	}

	private static String ensureString(Object data) {
		if (data == null)
			return null;
		if (AU.isAB(data))
			return Rdr.bytesToUTF8String((byte[]) data);
		if (data instanceof String || data instanceof SB)
			return data.toString();
		if (data instanceof InputStream)
			return Rdr.streamToUTF8String(new BufferedInputStream((InputStream) data));
		return null;
	}

	private static Object getCachedFileData(String path) {
		return (useCache && fileCache != null ? fileCache.get(path) : null);
	}

	private static int dispatchID = 0;

	public static void dispatchSystemEvent(Runnable runnable) {
		JSFunction f = null;
		/**
		 * @param eventQueue
		 * @j2sNative
		 * 
		 * 			System.out.println("JST dispatchSystemEvent " +
		 *            runnable.run.toString()); f =
		 *            function(_JSToolkit_dispatchSystemEvent) {
		 *            System.out.println("JST running " +
		 *            runnable.run.toString());runnable.run()};
		 */
		{
		}
		dispatch(f, 0, 0);
	}

	// /**
	// * dispatch an event "on the event thread"
	// * @param event
	// * @param src
	// * @param andWait
	// */
	// public static void dispatchEvent(AWTEvent event, Object src, boolean
	// andWait) {
	// JSFunction f = null;
	// int id = ++dispatchID;
	//
	//// * System.out.println("JST dispatchAWTEvent andWait=" + andWait +
	//// * "," + event + " src=" + src);
	//// * System.out.println("JST dispatching AWTEvent " + event);
	//
	// /**
	// * @j2sNative
	// *
	// * f = function()
	// * {
	// * if
	// * (src == null) event.dispatch(); else src.dispatchEvent(event);
	// * };
	// *
	// */
	// {
	// }
	// if (andWait)
	// invokeAndWait(f, id);
	// else
	// dispatch(f, 0, id);
	// }

	/**
	 * encapsulate timeout with an anonymous function that re-instates the
	 * "current thread" prior to execution. This is in case of multiple applets.
	 * 
	 * @param f
	 *            a function or Runnable
	 * @param msDelay
	 *            a time to wait for, in milliseconds. If this is < 0, just run
	 *            without the dispatch (debugging)
	 * @param id
	 *            an event id or 0 if not via EventQueue
	 */
	public static int dispatch(Object f, int msDelay, int id) {

		/**
		 * @j2sNative
		 * 
		 * 			var thread = java.lang.Thread.thisThread; var thread0 =
		 *            thread; var id0 = SwingJS.eventID || 0; var ff =
		 *            function(_JSToolkit_setTimeout) { SwingJS.eventID = id;
		 *            java.lang.Thread.thisThread = thread; try { if (f.run)
		 *            f.run(); else f(); } catch (e) { var s =
		 *            "JSToolkit.dispatch(" + id +"): " + e + (e.getStackTrace ?
		 *            e.getStackTrace() : e.stack ? "\n" + e.stack : "");
		 *            System.out.println(s); alert(s)} SwingJS.eventID = id0;
		 *            java.lang.Thread.thisThread = thread0; }; return (msDelay
		 *            == -1 ? ff() : setTimeout(ff, msDelay));
		 * 
		 * 
		 * 
		 */
		{
			return 0;
		}
	}

	/**
	 * encapsulate timeout with an anonymous function that re-instates the
	 * "current thread" prior to execution. This is in case of multiple applets.
	 * 
	 * 
	 * @param f
	 *            a function or Runnable
	 * @param id
	 *            an event id or 0 if not via EventQueue
	 */
	private static void invokeAndWait(JSFunction f, int id) {
		/**
		 * @j2sNative
		 * 
		 * 			var thread = java.lang.Thread.thisThread; var thread0 =
		 *            thread; (function(_JSToolkit_setTimeout) { var id0 =
		 *            SwingJS.eventID || 0; SwingJS.eventID = id;
		 *            java.lang.Thread.thisThread = thread; if (f.run) f.run();
		 *            else f(); SwingJS.eventID = id0;
		 *            java.lang.Thread.thisThread = thread0; })();
		 * 
		 * 
		 * 
		 */
		{
		}
	}

	public static boolean isDispatchThread() {
		// * System.out.println("checking dispatch thread " +
		// * SwingJS.eventID);
		// *
		/**
		 * @j2sNative
		 * 
		 * 			return (!!SwingJS.eventID);
		 * 
		 */
		{
			return false;
		}
	}

	// /**
	// *
	// * check if a J2S class implements a specific method with a specific
	// signature
	// *
	// * @param component
	// * @param fname
	// * "coalesceEvents
	// * @param signature
	// * "\\jsjava.awt.AWTEvent\\jsjava.awt.AWTEvent"
	// * @return
	// */
	// public static boolean checkClassMethod(Component component, String fname,
	// String signature) {
	// /**
	// * @j2sNative
	// *
	// * return component[fname] && component[fname][signature];
	// *
	// */
	// {
	// return false;
	// }
	// }
	//
	// public static void readyCallback(String aname, String fname, Container
	// applet,
	// JSAppletViewer appletPanel) {
	// try {
	// J2S._readyCallback(aname, fname, true, applet, appletPanel);
	// } catch (Throwable e) {
	// System.out.println("JSToolkit Error running readyCallback method for " +
	// fname + " -- check your page JavaScript");
	// }
	// }
	//
	//
	// public static void forceRepaint(Component c) {
	// // NO LONGER NECESSARY :)
	// }
	//
	// public static HTML5Applet getHTML5Applet(Component c) {
	// return ((JSThreadGroup)
	// c.getAppContext().getThreadGroup()).getHtmlApplet();
	// }
	//
	// public static void taintUI(Component c) {
	// // JApplet is a JComponent, but it does not have a getUI
	// // some components may have getUI but currently no UI
	//
	// /**
	// * @j2sNative
	// *
	// * c.getUI && c.getUI() && c.getUI().setTainted();
	// *
	// */
	// {}
	// }
	//
	// /**
	// * Provides a Peer for all Components. The JSComponentUI itself
	// * serves as a peer for all JComponents, including heavy-weight peers
	// * JFrame, JWindow, and JPopupMenu and JDialog. Although those are not
	// * lightweight, we return them as such. JavaScript will not care if
	// * do this, and they will still be discernable as not lightweight using
	// instanceof
	// *
	// * @author Bob Hanson
	// *
	// */
	// @Override
	// protected LightweightPeer createComponent(Component target) {
	// LightweightPeer peer = (LightweightPeer) getUI(target, true);
	// if (debugging)
	// System.out.println("JSToolkit creating UI-Peer for " +
	// target.getClass().getName() + ": " + peer.getClass().getName());
	// return peer;
	// }
	//
	// @Override
	// protected DialogPeer createDialog(Dialog target) {
	// ComponentUI ui = target.getUI();
	// if (ui == null)
	// return null;
	// if (debugging)
	// System.out.println("JSToolkit creating Dialog Peer for " +
	// target.getClass().getName() + ": " + target.getClass().getName());
	// return (DialogPeer) ((WindowPeer) ui).setFrame(target, true);
	// }
	//
	// @Override
	// protected FramePeer createFrame(Frame target) {
	// ComponentUI ui = target.getUI();
	// if (ui == null)
	// return null;
	// if (debugging)
	// System.out.println("JSToolkit creating Frame Peer for " +
	// target.getClass().getName() + ": " + target.getClass().getName());
	// return (FramePeer) ((WindowPeer) ui).setFrame(target, true);
	// }
	//
	// @Override
	// protected WindowPeer createWindow(Window target) {
	// ComponentUI ui = target.getUI();
	// if (ui == null)
	// return null;
	// if (debugging)
	// System.out.println("JSToolkit creating Window Peer for " +
	// target.getClass().getName() + ": " + target.getClass().getName());
	// return ((WindowPeer) ui).setFrame(target, false);
	// }
	//
	// public static JSComponentUI getUI(Component c, boolean isQuiet) {
	// JSComponentUI ui = null;
	// /**
	// * @j2sNative
	// *
	// * ui = c.getUI && c.getUI();
	// */
	// {
	// ui = (JSComponentUI) ((JComponent) c).getUI();
	// }
	// if (ui == null) {
	//
	// String s = c.getClass().getName();
	// if (!PT.isOneOf(s, ";javax.swing.Box.Filler;swingjs.JSApplet;"))
	// System.out.println("[JSToolkit] Component " + s
	// + " has no corresponding JSComponentUI.");
	// // Coerce JSComponentUI for this peer.
	// // This is a JavaScript-only trick that would be
	// // problematic in Java as well as in JavaScript.
	// ui = (JSComponentUI) (Object) new JSNullComponentPeer(c);
	// }
	// return ui;
	// }
	//
	// public static Document getPlainDocument(JComponent c) {
	// return (Document) getInstance("swingjs.JSPlainDocument");
	// }

	public static String getClassName(Object c) {
		/**
		 * @j2sNative
		 * 
		 * 			return c.__CLASS_NAME__;
		 * 
		 */
		{
			return null;
		}
	}

	/**
	 * A protected version of Rdr.getStreamAsBytes
	 * 
	 * @param bis
	 * @return
	 */
	public static byte[] getSignedStreamBytes(BufferedInputStream bis) {
		try {
			return AU.ensureSignedBytes((byte[]) Rdr.getStreamAsBytes(bis, null));
		} catch (IOException e) {
			return null;
		}
	}

	/**
	 * This could be a simple String, a javajs.util.SB, or unsigned or signed
	 * bytes depending upon the browser and the file type.
	 * 
	 * It will not be cached, but it might come from a cache;
	 * 
	 * @param uri
	 * @return
	 */
	private static Object getFileContents(String uri) {
		Object data = getCachedFileData(uri);
		if (data == null)
		/**
		 * @j2sNative
		 * 
		 */
		{
			// for reference -- not used in JavaScript
			try {
				data = Rdr.streamToUTF8String(new BufferedInputStream((InputStream) new URL(uri).getContent()));
			} catch (Exception e) {
			}
		} else {
			data = J2S._getFileData(uri, null, false, false);
		}
		return data;
	}

	/**
	 * Regardless of how returned by Jmol._getFileContents(), this method
	 * ensures that we get signed bytes.
	 * 
	 * @param filename
	 * @return
	 */
	public static byte[] getFileAsBytes(String filename) {
		Object data = getFileContents(filename);
		byte[] b = null;
		if (AU.isAB(data))
			b = (byte[]) data;
		else if (data instanceof String)
			b = ((String) data).getBytes();
		else if (data instanceof SB)
			b = Rdr.getBytesFromSB((SB) data);
		else if (data instanceof InputStream)
			try {
				b = Rdr.getLimitedStreamBytes((InputStream) data, -1);
			} catch (IOException e) {
			}
		return AU.ensureSignedBytes(b);
	}

	/**
	 * Regardless of how returned by Jmol._getFileContents(), this method
	 * ensures that we get a String.
	 * 
	 * @param filename
	 * @return
	 */
	public static String getFileAsString(String filename) {
		Object data = getFileContents(filename);
		return ensureString(data);
	}

	// //////////////// images ///////////////
	//
	// private JSImagekit imageKit;
	//
	// private JSImagekit getImagekit() {
	// return (imageKit == null ? imageKit = (JSImagekit)
	// Interface.getInstance("swingjs.JSImagekit", false) : imageKit);
	// }
	//
	// @Override
	// public Image getImage(String filename) {
	// return createImage(filename);
	// }
	//
	// @Override
	// public Image getImage(URL url) {
	// return createImage(url);
	// }
	//
	//
	// @Override
	// public Image createImage(ImageProducer producer) {
	// JSImagekit kit = (JSImagekit) Interface.getInstance("swingjs.JSImagekit",
	// true);
	// producer.startProduction(kit); // JSImageKit is the ImageConsumer here
	// // we may create an image, but then later generate its pixels
	// // and then also draw to it using img._g
	// // If we are drawing to it and it has pixels, then we need to
	// // "fix" those pixels to the image.
	// return kit.getCreatedImage();
	// }
	//
	// @Override
	// public Image createImage(String filename) {
	// return getImagekit().createImageFromBytes(getSignedStreamBytes(new
	// BufferedInputStream ( new
	// ByteArrayInputStream(getFileAsBytes(filename)))), 0, -1, filename);
	// }
	//
	// /**
	// * We allow for url to be modified by Clazz to already have image data in
	// it as a BufferedInputStream
	// */
	// @Override
	// public Image createImage(URL url) {
	// BufferedInputStream b = getURLInputStream(url, true);
	// return (b == null ? null :
	// getImagekit().createImageFromBytes(getSignedStreamBytes(b), 0, -1,
	// url.toString()));
	// }
	//
	// @Override
	// public Image createImage(byte[] data, int imageoffset, int imagelength) {
	// return getImagekit().createImageFromBytes(data, imageoffset, imagelength,
	// null);
	// }
	//
	// @Override
	// public int checkImage(Image image, int width, int height,
	// ImageObserver observer) {
	// return 63; // everything is here -- always has been - images are loaded
	// asynchronously
	// }
	//
	// @Override
	// public boolean prepareImage(Image image, int width, int height,
	// ImageObserver observer) {
	// // It's all synchronous
	// return true;
	// }
	//
	// public static boolean hasFocus(Component c) {
	// JSComponentUI ui = getUI(c, false);
	// return (ui != null && !ui.isNull && ui.hasFocus());
	// }
	//
	// public static boolean requestFocus(Component c) {
	// final JSComponentUI ui = getUI(c, false);
	// if (ui == null || ui.isNull || !ui.isFocusable())
	// return false;
	// Runnable r = new Runnable() {
	//
	// @Override
	// public void run() {
	// ui.requestFocus(null, false, false, 0, null);
	// }
	//
	// };
	// dispatch(r, 50, 0);
	// return true;
	// }
	//
	// private static JSGraphicsCompositor compositor;
	//
	// static JSGraphicsCompositor getCompositor() {
	// return (compositor == null ? compositor = (JSGraphicsCompositor)
	// Interface
	// .getInstance("swingjs.JSGraphicsCompositor", false) : compositor);
	// }
	//
	// public static boolean setGraphicsCompositeAlpha(JSGraphics2D g, int rule)
	// {
	// return getCompositor().setGraphicsCompositeAlpha(g, rule);
	// }
	//
	// public static boolean drawImageOp(JSGraphics2D g,
	// BufferedImage img, BufferedImageOp op, int x, int y) {
	// return getCompositor().drawImageOp(g, img, op, x, y);
	// }
	//
	// public static WritableRaster filterRaster(Raster src, WritableRaster dst,
	// RasterOp op) {
	// return getCompositor().filterRaster(src, dst, op);
	// }
	//
	// public static BufferedImage filterImage(BufferedImage src, BufferedImage
	// dst,
	// BufferedImageOp op) {
	// return getCompositor().filterImage(src, dst, op);
	// }
	//
	// private static JSAudio audioPlayer;
	//
	// private static JSAudio getAudioPlayer() {
	// return (audioPlayer == null ? audioPlayer = (JSAudio)
	// getInstance("swingjs.JSAudio")
	// : audioPlayer);
	// }
	// /**
	// *
	// * @param data
	// * @param audioFormat
	// * may have property "fileFormat" describing full file format to use
	// * in "data:audio/" + format.toLowerCase() + ";base64, in which case
	// * all other information in audioFormat is ignored.
	// * @throws UnsupportedAudioFileException
	// * @throws UnsupportedAudioFileException
	// */
	// public static void playAudio(byte[] data, AudioFormat audioFormat) throws
	// UnsupportedAudioFileException {
	// getAudioPlayer().playAudio(data, audioFormat);
	// }
	//
	//
	// /**
	// * Simple way to play any audio file
	// *
	// * @param url URL for data; if created using a class loader, will have
	// attached ._streamData and not opened again.
	// *
	// * @throws IOException
	// * @throws UnsupportedAudioFileException
	// */
	// public static void playAudioFile(URL url) throws IOException,
	// UnsupportedAudioFileException {
	// getAudioPlayer().playAudioFileURL(url);
	// }
	//
	// public static Line getAudioLine(Line.Info info) {
	// return getAudioPlayer().getAudioLine(info);
	// }
	//
	// public static ArrayList<Object> getTimerQueue() {
	// return getAppletViewer().getTimerQueue();
	// }
	//
	// public static void getFileFromDialog(JSFileHandler jsFileHandler, String
	// type) {
	// JSFunction f = null;
	// /**
	// * @j2sNative
	// *
	// * f = function(data, fileName) { jsFileHandler.handleFileLoaded(data,
	// fileName) };
	// *
	// */
	// {}
	// J2S._getFileFromDialog(f, type);
	// }
	//
	// public static void saveFile(String fileName, Object data, String
	// mimeType, String encoding) {
	// J2S._saveFile(fileName, data, mimeType, encoding);
	// }
	//
	// public static void killDispatched(int html5Id) {
	// /**
	// * @j2sNative
	// *
	// * clearTimeout(html5Id);
	// *
	// */
	// {}
	// }
	//
	// static Clipboard systemClipboard;
	// @Override
	// public Clipboard getSystemClipboard() {
	// if (systemClipboard == null)
	// systemClipboard = (Clipboard)
	// getInstance("jsjava.awt.datatransfer.Clipboard");
	// return systemClipboard;
	// }
	//
	// @Override
	// public DragSourceContextPeer createDragSourceContextPeer(DragGestureEvent
	// dge)
	// throws InvalidDnDOperationException {
	// // TODO Auto-generated method stub
	// return null;
	// }
	//
	// public static void setCursor(Cursor c) {
	// String curs = null;
	// switch(c == null ? Cursor.DEFAULT_CURSOR : c.getType()) {
	// case Cursor.CROSSHAIR_CURSOR:
	// curs = "crosshair";
	// break;
	// case Cursor.WAIT_CURSOR:
	// curs = "wait";
	// break;
	// case Cursor.TEXT_CURSOR:
	// curs = "text";
	// break;
	// case Cursor.N_RESIZE_CURSOR:
	// case Cursor.S_RESIZE_CURSOR:
	// curs = "ns-resize";
	// break;
	// case Cursor.HAND_CURSOR:
	// curs = "grab";
	// break;
	// case Cursor.MOVE_CURSOR:
	// curs = "move";
	// break;
	// case Cursor.NE_RESIZE_CURSOR:
	// case Cursor.SW_RESIZE_CURSOR:
	// curs = "nesw-resize";
	// break;
	// case Cursor.SE_RESIZE_CURSOR:
	// case Cursor.NW_RESIZE_CURSOR:
	// curs = "nwse-resize";
	// break;
	// case Cursor.E_RESIZE_CURSOR:
	// case Cursor.W_RESIZE_CURSOR:
	// curs = "ew-resize";
	// break;
	// case Cursor.DEFAULT_CURSOR:
	// default:
	// curs = "default";
	// break;
	// }
	// DOMNode.setCursor(curs);
	// }

	/**
	 * All classes created by Clazz have static class loaders which are just
	 * minimal objects in Clazz var inF.
	 * 
	 * @param name
	 * @return the object as a stream
	 */
	public static InputStream getResourceAsStream(String name) {
		return JSToolkit.class.getClassLoader().getResourceAsStream(name);
	}

	/**
	 * All classes created by Clazz have static class loaders which are just
	 * minimal objects in Clazz var inF.
	 * 
	 * @param name
	 * @return a URL for this object
	 */
	public static URL getResource(String name) {
		return JSToolkit.class.getClassLoader().getResource(name);
	}

	//////// FONTS ///////

	/**
	 * Get a default Locale. Called by Locale.getDefault(), but also called by
	 * JSAppletViewer, which will pass Info.language to this method.
	 * 
	 * @param language
	 *            null to use J2S default language based on (1) setting of
	 *            J2S._lang (2) setting of j2sLang=xx_XX in URI (3)
	 *            navigator.language (4) navigator.userLanguage (5) "en-US"
	 * 
	 * 
	 * 
	 * @return
	 */
	public static Locale getDefaultLocale(String language) {
		String region, country, variant;
		if (language == null)
			language = J2S._getDefaultLanguage(true);
		language = language.replace('-', '_');
		if (language == null || language.length() == 0 || language.equalsIgnoreCase("en"))
			language = "en_US";
		int i = language.indexOf('_');
		if (i > 0) {
			region = language.substring(i + 1);
			language = language.substring(0, i);
		} else {
			region = "";
		}
		region = region.toUpperCase();
		i = region.indexOf('_');
		if (i > 0) {
			country = region.substring(0, i);
			variant = region.substring(i + 1);
		} else {
			country = region;
			variant = "";
		}
		return new Locale(language, country, variant);
	}

	private static String[] hardwiredFontList;

//	// -- Obsolete font names from 1.0.2. It was decided that
//	// -- getFontList should not return these old names:
//	// "Helvetica", "TimesRoman", "Courier", "ZapfDingbats"
//
//	@Override
//	public String[] getFontList() {
//		if (hardwiredFontList == null)
//			hardwiredFontList = new String[] { Font.DIALOG, Font.SANS_SERIF, Font.SERIF, Font.MONOSPACED,
//					Font.DIALOG_INPUT };
//		return hardwiredFontList;
//	}
//
//	/**
//	 * Just using name, not family name, here for now
//	 * 
//	 * @param font
//	 * @return CSS family name
//	 */
//	public static String getFontFamily(Font font) {
//		return font.getName();
//	}
//
//	/**
//	 * In JavaScript we only have one font metric, so we can just save it with
//	 * the font itself
//	 */
//	@Override
//	public FontMetrics getFontMetrics(Font font) {
//		return font.getFontMetrics();
//	}
//
//	/**
//	 * generates proper font name for JSGraphics2d Apparently Java sizes are
//	 * pixels, not points. Not sure on this...
//	 * 
//	 * @param font
//	 * @return "italic bold 10pt Helvetica"
//	 */
//	public static String getCanvasFont(Font font) {
//		String strStyle = "";
//		if (font.isItalic())
//			strStyle += "italic ";
//		if (font.isBold())
//			strStyle += "bold ";
//		String family = font.getFamily();
//		if (family.equals("SansSerif") || family.equals("Dialog") || family.equals("DialogInput"))
//			family = "Arial";
//		// for whatever reason, Java font points are much larger than HTML5
//		// canvas
//		// points
//		return strStyle + font.getSize() + "px " + family;
//	}

	@SuppressWarnings("unused")
	public static BufferedInputStream getURLInputStream(URL url, boolean andDelete) {

		BufferedInputStream bis = null;
		/**
		 * @j2sNative
		 * 
		 * 			bis = url._streamData; if (andDelete) url._streamData =
		 *            null;
		 * 
		 */
		{
		}

		if (bis == null)
			try {
				return (BufferedInputStream) (Object) url.openStream();
			} catch (IOException e) {
				return null;
			}
		((java.io.BufferedInputStream) (Object) bis).resetStream();
		return bis;
	}

	/**
	 * Generate a date in a specific format.
	 * 
	 * @param isoType
	 *            null, 8824, or 8601, or a standard SimpleDataFormat format
	 * @return formatted date
	 */
	public static String getDateFormat(String isoType) {
		String prefix = "";
		String suffix = "";
	    /**
	     * 
	     * Mon Jan 07 2013 19:54:39 GMT-0600
	     * or YYYYMMDDHHmmssOHH'mm'
	     * 
	     * @j2sNative
	     * 
	     * if (isoType == null) {
	     *   return ("" + (new Date())).split(" (")[0];
	     * } 
	     * if (isoType.indexOf("8824") >= 0) {
	     *   var d = new Date();
	     *   var x = d.toString().split(" ");
	     *   var MM = "0" + (1 + d.getMonth()); MM = MM.substring(MM.length - 2);
	     *   var dd = "0" + d.getDate(); dd = dd.substring(dd.length - 2);
	     *   return x[3] + MM + dd + x[4].replace(/\:/g,"") + x[5].substring(3,6) + "'" + x[5].substring(6,8) + "'"   
	     * }
	     * if (isoType.indexOf("8601") >= 0){
	     *   var d = new Date();
	     *   var x = d.toString().split(" ");
	     *   // Firefox now doing this?
	     *   if (x.length == 1)
	     *     return x;
	     *   var MM = "0" + (1 + d.getMonth()); MM = MM.substring(MM.length - 2);
	     *   var dd = "0" + d.getDate(); dd = dd.substring(dd.length - 2);
	     *   return x[3] + '-' + MM + '-' + dd + 'T' + x[4]   
	     * }
	     * 
	     */
		{
			// if (isoType == null) {
			// isoType = "EEE dd MMM yyyy HH:mm:ss 'GMT'Z";
			// } else if (isoType.contains("8824")) {
			// prefix = "D:";
			// suffix = "'00'";
			// isoType = "YYYYMMddHHmmssX";
			// } else if (isoType.contains("8601")) {
			// isoType = "yyyy-MM-dd'T'HH:mm:ss";
			// }
			Date date = (Date) Interface.getInstance("java.util.Date", true);
			SimpleDateFormat format = (SimpleDateFormat) Interface.getInstanceWithParams("java.text.SimpleDateFormat",
					new Class<?>[] { String.class }, new Object[] { isoType });
			return prefix + format.format(date) + suffix;
		}
	}

	public static void showWebPage(URL url) {
		/**
		 * @j2sNative window.open(url.toString());
		 */
		{
			System.out.println(url);
		}

	}

	public static void beep() {
		System.out.println("JSToolkit.beep");
	}
}
