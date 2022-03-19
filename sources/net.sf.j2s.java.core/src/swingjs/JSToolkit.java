package swingjs;

import java.applet.AudioClip;
import java.awt.AWTEvent;
import java.awt.Color;
import java.awt.Component;
import java.awt.Cursor;
import java.awt.Dialog;
import java.awt.Dimension;
import java.awt.Event;
import java.awt.EventQueue;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Frame;
import java.awt.GraphicsConfiguration;
import java.awt.Image;
import java.awt.JSComponent;
import java.awt.JSFrame;
import java.awt.JobAttributes;
import java.awt.PageAttributes;
import java.awt.Point;
import java.awt.PrintJob;
import java.awt.Window;
import java.awt.datatransfer.Clipboard;
import java.awt.dnd.DragGestureEvent;
import java.awt.dnd.InvalidDnDOperationException;
import java.awt.dnd.peer.DragSourceContextPeer;
import java.awt.event.InputEvent;
import java.awt.event.MouseEvent;
import java.awt.im.InputMethodHighlight;
import java.awt.image.ColorModel;
import java.awt.image.ImageObserver;
import java.awt.image.ImageProducer;
import java.awt.peer.DialogPeer;
import java.awt.peer.FramePeer;
import java.awt.peer.KeyboardFocusManagerPeer;
import java.awt.peer.LightweightPeer;
import java.awt.peer.WindowPeer;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.AttributedCharacterIterator.Attribute;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;
import java.util.Properties;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.Line;
import javax.sound.sampled.UnsupportedAudioFileException;
import javax.swing.Icon;
import javax.swing.ImageIcon;
import javax.swing.JComponent;
import javax.swing.UIDefaults;
import javax.swing.UIManager;
import javax.swing.plaf.ComponentUI;

import swingjs.api.js.JSFunction;
import javajs.util.JSThread;
import javajs.util.PT;
import sun.awt.AppContext;
import sun.awt.SunToolkit;
import sun.awt.image.FileImageSource;
import sun.awt.image.ToolkitImage;
import swingjs.api.Interface;
import swingjs.api.JSFileHandler;
import swingjs.api.js.HTML5Applet;
import swingjs.api.js.HTML5CanvasContext2D;
import swingjs.api.js.JQuery;
import swingjs.plaf.JSComponentUI;


public class JSToolkit extends SunToolkit 
//implements KeyboardFocusManagerPeerProvider
{

	/**
	 * for JSMouse only
	 */
	public static boolean isMac, isLinux, isUnix, isWin;
		
	static {
		/**
		 * @j2sNative
		 * 
		 * C$.isMac = (J2S.featureDetection.os == "mac");
		 * C$.isLinux = (J2S.featureDetection.os == "linux");
		 * C$.isUnix = (J2S.featureDetection.os == "unix");
		 * C$.isWin = (J2S.featureDetection.os == "win");
		 * 
		 */
		{
		}
	}
	
    private static SwingJS SwingJS = /**@j2sNative SwingJS || */null;
	
	/*
	 * NOTE: This class is constructed from java.awt.Toolkit.getDefaultToolkit$()
	 * 
	 */

	public JSToolkit() {
		super();
		System.out.println("JSToolkit initialized");
	}

	/**
	 * for SwingJS debugging
	 * 
	 * @param isPost
	 * @return
	 */
	public static Object getPostEventQueue(boolean isPost) {
		return (isPost ? (EventQueue) AppContext.getAppContext().get("PostEventQueue") : (EventQueue) AppContext.getAppContext().get(
				AppContext.EVENT_QUEUE_KEY));
	}

	public static JSAppletViewer getAppletViewer() {
		return Thread.currentThread().getThreadGroup().秘appletViewer;
	}

	// ////// java.awt.Toolkit /////////

	public static void getScreenSize(Dimension d) {
		@SuppressWarnings("unused")
		JQuery jq = JSUtil.jQuery;
		d.width = /** @j2sNative window.innerWidth || */0;
		d.height = /** @j2sNative window.innerHeight || */0;
	}

	@Override
	protected int getScreenWidth() {
		@SuppressWarnings("unused")
		JQuery jq = JSUtil.jQuery;
		return /** @j2sNative jq.$(window).width() || */0;
	}

	@Override
	protected int getScreenHeight() {
		@SuppressWarnings("unused")
		JQuery jq = JSUtil.jQuery;
		return /** @j2sNative jq.$(window).height() || */0;
	}


	@Override
	public int getScreenResolution() {
		// n/a
		return 96;
	}

	@Override
	public ColorModel getColorModel() {
		return ColorModel.getRGBdefault();
	}
	
	@Override
	public void sync() {
		// n/a?
	}

	// ////// sun.awt.SunToolkit /////////

	@Override
	public boolean isModalExclusionTypeSupported(
			Dialog.ModalExclusionType modalExclusionType) {
		return true;
	}

	@Override
	public boolean isModalityTypeSupported(Dialog.ModalityType modalityType) {
		return true;
	}

	@Override
	public boolean isTraySupported() {
		// TODO Auto-generated method stub
		return false;
	}

//	@Override
//	protected boolean syncNativeQueue(long timeout) {
//		// TODO Auto-generated method stub
//		return false;
//	}
//
	@Override
	public void grab(Window w) {
		// TODO Auto-generated method stub

	}

	@Override
	public void ungrab(Window w) {
		// TODO Auto-generated method stub

	}

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
	 * There is one and only one graphics configuration for a given Applet. 
	 * It is available through Thread.currentThread
	 * @return
	 */
	public static GraphicsConfiguration getGraphicsConfiguration() {
		JSAppletViewer ap = JSToolkit.getAppletViewer();
		GraphicsConfiguration gc = (ap == null ? null : ap.graphicsConfig);
		return (gc == null ? (gc = ap.graphicsConfig = (GraphicsConfiguration) JSUtil.getInstance("swingjs.JSGraphicsConfiguration")) : gc);
	}

	public static boolean isFocused(Window window) {
		// TODO Auto-generated method stub
		return false;
	}

	private static HTML5CanvasContext2D defaultContext;

	public static float getStringWidth(HTML5CanvasContext2D context, Font font,
			String text) {
		if (text == null || text.length() == 0)
			return 0;
		@SuppressWarnings("unused")
		String fontInfo = getCanvasFont(font);
		if (context == null)
			context = getDefaultCanvasContext2d();
		int w = 0;
		/**
		 * @j2sNative
		 * context.font = fontInfo; 
		 * w = Math.ceil(context.measureText(text).width);
		 */
		{
		}
		return w;
	}

	/**
	 * Used as a stratch pad for determining text string dimensions.
	 *  
	 * @return
	 */
	private static HTML5CanvasContext2D getDefaultCanvasContext2d() {
		/**
		 * @j2sNative
		 * 
		 *            if (this.defaultContext == null) this.defaultContext =
		 *            document.createElement( 'canvas' ).getContext('2d');
		 */
		{}
		return defaultContext;
	}


	public static String getCSSColor(Color c, boolean asHex) {
		int i = c.getRGB() & 0xFFFFFF;
		if (asHex) {
			String s = (i == 0 ? "000" : "000000" + Integer.toHexString(i));
			return "#" + s.substring(s.length() - 6);
		} else {
			int opacity = c.getAlpha();
			int rgb = c.getRGB();
			String s = ((rgb >> 16) & 0xFF) + ", " + ((rgb >> 8) & 0xff) + ", " + (rgb & 0xff);
			return (opacity == 255 ? "rgb(" + s + ")" : "rgba(" + s + ", " + opacity / 255f + ")");
		}
	}

	private static UIDefaults uid;

	public static UIDefaults getLookAndFeelDefaults() {
		if (uid == null)
			uid = UIManager.getLookAndFeel().getDefaults();
		return uid;
	}

	public static JSComponentUI getComponentUI(JComponent target) {
		String id = ((JSComponent) target).getUIClassID();
		JSComponentUI ui = (JSComponentUI) Interface.getInstance("swingjs.plaf.JS"
				+ id, true);
		if (ui != null)
			ui.set(target);
		return ui;
	}

	private static int dispatchID = 0;

	/**
	 * dispatch an event "on the event thread". ActiveEvent has no src but instead a
	 * dispatch() method.
	 * 
	 * @param event
	 * @param src
	 * @param andWait
	 */
	public static void dispatchEvent(AWTEvent event, Object src, boolean andWait) {
		int id = ++dispatchID;

		JSFunction f = /**
						 * @j2sNative
						 * 
						 * 			function() { if (src == null) event.dispatch$(); else
						 *            src.dispatchEvent$java_awt_AWTEvent(event); } ||
						 */
				null;
		if (andWait) {
			invokeAndWait(f, id);
		} else {
			int ms = (isMouseEvent(event.getID()) ? -1 : 0);
			dispatch(f, ms, id);
		}
	}

	public static boolean isMouseEvent(int id) {
		return (id >= MouseEvent.MOUSE_FIRST && id <= MouseEvent.MOUSE_LAST);
	}
	
	public static void killDispatched(int html5Id) {
		/**
		 * @j2sNative
		 * 
		 * clearTimeout(html5Id);
		 * 
		 */		
	}

	/**
	 * Set Thread.秘thisThread to be associated with the appropriate
	 * app before processing a system event. 
	 * 
	 * @param t
	 * @return
	 */
	private static JSThread getCurrentThread(JSThread t) {
		boolean setCurrent = (t != null);
		if (t == null)
			t = Thread.秘thisThread;
		t = (/** @j2sNative !self.java || */
		t.getThreadGroup().秘systemExited ? null : t);
		if (setCurrent && t != null)
			Thread.秘thisThread = t;
		return t;
	}

	public static void startThread(Thread t) {
		JSThread thread = (JSThread) t;
		JSThread thread0 = getCurrentThread(null);
		if (thread0 == null)
			return;
		int id0 = SwingJS.eventID;
		/**
		 * @j2sNative var ff = function() {
		 */		
		SwingJS.eventID = 0;
		thread = getCurrentThread(thread);
		if (thread == null)
			return;
		try {
			/**
			 * @j2sNative thread.run$();
			 */
		} catch (Throwable e) {
			String s = "JSToolkit.dispatch$I(thread): " + thread.getName() + ": " + e + "\n"
					+ /**
						 * @j2sNative (e.getStackTrace$ ? e.getStackTrace$() + "\n" : "") + (!!e.stack ?
						 *            e.stack : "") +
						 */
					"";
			System.out.println(s);
		}
		if (getCurrentThread(null) == t)
			getCurrentThread(thread0);
		SwingJS.eventID = id0;
		/**
		 * @j2sNative }; setTimeout(ff, 0);
		 */
	}

	/**
	 * encapsulate timeout with an anonymous function that re-instates the "current
	 * thread" prior to execution. This is in case of multiple applets.
	 * 
	 * @param f       a function or Runnable
	 * @param msDelay a time to wait for, in milliseconds. If this is < 0, just run
	 *                without the dispatch (debugging)
	 * @param id      an event id or 0 if not via EventQueue
	 */
	public static int dispatch(Object f, int msDelay, int id) {
		JSThread thread0 = getCurrentThread(null);
		if (thread0 == null)
			return 0;
		int ret = 0;
		int id0 = SwingJS.eventID;
		/**
		 * @j2sNative var ff = function() {
		 */		
		SwingJS.eventID = id;
		thread0 = getCurrentThread(thread0);
		if (thread0 == null)
			return 0;
		try {
			/**
			 * @j2sNative if (f.run$) f.run$(); else f();
			 */
		} catch (Throwable e) {
			String s = "JSToolkit.dispatch$I(" + id + "): " + e + "\n"
					+ /**
						 * @j2sNative (e.getStackTrace$ ? e.getStackTrace$() + "\n" : "") + (!!e.stack ?
						 *            e.stack : "") +
						 */
					"";
			System.out.println(s);
			JSUtil.warn(s);
		}
		getCurrentThread(thread0);
		SwingJS.eventID = id0;
		/**
		 * @j2sNative }; ret = (msDelay == -1 ? ff() :
		 *            setTimeout(ff, msDelay));
		 */
		return ret;
	}

	/**
	 * encapsulate timeout with an anonymous function that re-instates the "current
	 * thread" prior to execution. This is in case of multiple applets.
	 * 
	 * 
	 * @param f  a function or Runnable
	 * @param id an event id or 0 if not via EventQueue
	 */
	private static void invokeAndWait(JSFunction f, int id) {
		JSThread thread0 = getCurrentThread(null);
		if (thread0 == null)
			return;
		/**
		 * @j2sNative (function() { */
		
		int id0 = SwingJS.eventID;
		SwingJS.eventID = id;
		thread0 = getCurrentThread(thread0);
		if (thread0 == null)
			return;
		/**
		 * @j2sNative if (f.run$) f.run$(); else f();
		 */
		thread0 = getCurrentThread(thread0);
		if (thread0 == null)
			return;
		SwingJS.eventID = id0;
		/**
		 * @j2sNative })();
		 */
	}

	public static boolean isDispatchThread() {
		return (SwingJS.eventID != 0);
	}

	/**
	 * Fake a dispatch thread -- see JSTextUI
	 * 
	 * @param b
	 */
	public static void setIsDispatchThread(boolean b) {
		SwingJS.eventID = (b ? 1 : 0);
	}

//	public static void forceRepaint(Component c) {
//		// NO LONGER NECESSARY :)
//	}
	
	/**
	 * Get the applet associated with the specified component or, if that is null,
	 * the current thread. This could be an important issue if one applet is running
	 * code in a different applet.
	 * 
	 * @param c
	 * @return
	 */
	public static HTML5Applet getHTML5Applet(Component c) {
		return JSUtil.getHTML5Applet(c);
	}

	public static void taintUI(Component c) {
		// JApplet is a JComponent, but it does not have a getUI
		// some components may have getUI but currently no UI
		
		/**
		 * @j2sNative
		 * 
		 * c.getUI$ && c.getUI$() && c.getUI$().setTainted$(); 
		 * 
		 */
		{}
	}

	/**
	 * Provides a Peer for all Components. The JSComponentUI itself
	 * serves as a peer for all JComponents, including heavy-weight peers 
	 * JFrame, JWindow, and JPopupMenu and JDialog. Although those are not
	 * lightweight, we return them as such. JavaScript will not care if
	 * do this, and they will still be discernable as not lightweight using instanceof
	 * 
	 * @author Bob Hanson
	 *  
	 */
	@Override
  protected LightweightPeer createComponent(Component target) {
  	LightweightPeer peer = (LightweightPeer) getUI(target, true);
  	return peer;
  }

	@Override
	public DialogPeer createDialog(Dialog target) {
		ComponentUI ui = target.getUI();
		if (ui == null)
			return null;
		return (DialogPeer) ((WindowPeer) ui).setFrame(target, true);
	}

	@Override
	public FramePeer createFrame(JSFrame target) {
		ComponentUI ui = target.getUI();
		if (ui == null)
			return null;
		return (FramePeer) ((WindowPeer) ui).setFrame(target, true);
	}

	@Override
	protected FramePeer createFrame(Frame target) {
		ComponentUI ui = target.getUI();
		if (ui == null)
			return null;
		return (FramePeer) ((WindowPeer) ui).setFrame(target, true);
	}

	@Override
	public WindowPeer createWindow(Window target) {
		ComponentUI ui = target.getUI();
		if (ui == null)
			return null;
		return ((WindowPeer) ui).setFrame(target, false);
	}

	public static JSComponentUI getUI(Component c, boolean isQuiet) {
		JSComponentUI ui = ((JComponent) c).秘getUI();
		if (ui == null) {
			((JComponent) c).updateUI();
			ui = ((JComponent) c).秘getUI();
		}
		if (ui == null) {
			String s = c.getClass().getName();
			if (!PT.isOneOf(s, ";javax.swing.Box$Filler;")) 
				System.out.println("[JSToolkit] Component " + s  
					+ " has no corresponding JSComponentUI, class " + c.getClass().getName());
			// Coerce JSComponentUI for this peer.
			// This is a JavaScript-only trick that would be
			// problematic in Java as well as in JavaScript.
			ui = (JSComponentUI) (Object) new JSNullComponentPeer(c);
		}
		return ui;
	}

//	public static Document getPlainDocument() {
//		return (Document) JSUtil.getInstance("swingjs.JSPlainDocument");
//	}
//

	//////////////// images ///////////////
	
	private JSImagekit imageKit;
	
	private JSImagekit getImagekit() {
		return (imageKit == null ? imageKit = (JSImagekit) Interface.getInstance("swingjs.JSImagekit", false) : imageKit);
	}

	@Override
	public Image getImage(String filename) {
		if (filename.indexOf("/") != 0)
			filename = "../" + filename;
		Image img = null;
		try {
			img = createImage(JSToolkit.class.getResource(filename));
		} catch (Exception e) {
		}
		if (img == null)
			img = new ToolkitImage(new FileImageSource(filename));
		return img;
		
	}


	@Override
	public Image getImage(URL url) {
		return createImage(url);
	}
		
	/**
	 * From, for example, MemoryImageSource
	 */
	@Override
	public Image createImage(ImageProducer producer) {
		JSImagekit kit = new JSImagekit();
		try {
		producer.startProduction(kit); // JSImageKit is the ImageConsumer here
		// we may create an image, but then later generate its pixels
		// and then also draw to it using img.秘g
		// If we are drawing to it and it has pixels, then we need to 
		// "fix" those pixels to the image. 
		} catch (Exception e) {
			// will return empty image
		}
		return kit.getCreatedImage();
	}

	public Image createImage(Component c, ImageProducer producer) {
		return ((JSImage) createImage(producer)).setComponent(c);
	}


	public static ImageIcon createImageIcon(Component c, Icon icon, String id) {
		return JSImagekit.createImageIcon(c, icon, id);
	}
	
	@Override
	public Image createImage(String filename) {
		return getImagekit().createImageFromBytes(JSUtil.getSignedStreamBytes(new BufferedInputStream ( new ByteArrayInputStream(JSUtil.getFileAsBytes(filename)))), 0, -1, filename);
	}

	/**
	 * We allow for url to be modified by Clazz to already have image data in it as a BufferedInputStream
	 */
	@Override
	public Image createImage(URL url) {
		BufferedInputStream b = JSUtil.getURLInputStream(url, true);
		return (b == null ? null : getImagekit().createImageFromBytes(JSUtil.getSignedStreamBytes(b), 0, -1, url.toString()));
	}
	
	@Override
	public Image createImage(byte[] data, int imageoffset, int imagelength) {
		return getImagekit().createImageFromBytes(data, imageoffset, imagelength, null);
	}
	
	public Image createImage(Component c, int width, int height) {
		return ((JSImage) createImage((byte[]) null, width, height)).setComponent(c);
	}

	@Override
	public int checkImage(Image image, int width, int height,
			ImageObserver observer) {
		return 63; // everything is here -- always has been - images are loaded asynchronously
	}

	@Override
	public boolean prepareImage(Image image, int width, int height,
			ImageObserver observer) {
		// It's all synchronous
		return true;
	}

	//// video ////

	public Image getVideo(String filename) {
		return createVideo(new File(filename).toPath());
	}

	public Image getVideo(URL url) {
		try {
			if (url.getProtocol() == "jar") {
				return createVideo(JSUtil.getFileAsBytes(url));
			}
			if (url.getProtocol().equals("file"))
				return getVideo(url.getFile());
			return createVideo(Paths.get(url.toURI()));
		} catch (URISyntaxException e) {
			return null;
		}
	}

	public Image createVideo(Path path) {
		return getImagekit().createVideo(path);
	}

	public Image createVideo(byte[] bytes) {
		return getImagekit().createVideo(bytes);
	}

	
	///// audio ////

	private static JSAudio audioPlayer;

	private static JSAudio getAudioPlayer() {
		return (audioPlayer == null ? audioPlayer = (JSAudio) JSUtil.getInstance("swingjs.JSAudio")
				: audioPlayer);
	}
	/**
	 * 
	 * @param data
	 * @param audioFormat
	 *          may have property "fileFormat" describing full file format to use
	 *          in "data:audio/" + format.toLowerCase() + ";base64, in which case
	 *          all other information in audioFormat is ignored.
	 * @throws UnsupportedAudioFileException 
	 * @throws UnsupportedAudioFileException
	 */
	public static void playAudio(byte[] data, AudioFormat audioFormat) throws UnsupportedAudioFileException {
		getAudioPlayer().getAudio(data, audioFormat).play();
	}
	
	public static AudioClip getAudioClip(URL url) {
		return getAudioPlayer().getAudioClip(url);
	}

	/**
	 * Simple way to play any audio file
	 * 
	 * @param url URL for data; if created using a class loader, will have attached ._streamData and not opened again.
	 * 
	 * @throws IOException
	 * @throws UnsupportedAudioFileException
	 */
	public static void playAudioFile(URL url) throws IOException, UnsupportedAudioFileException {
		getAudioPlayer().getAudioFileFromURL(url).play();
	}

	public static Line getAudioLine(Line.Info info) {
		return getAudioPlayer().getAudioLine(info);
	}

	public static ArrayList<Object> getTimerQueue() {
		return Thread.currentThread().getThreadGroup().秘getTimerQueue();
	}

	/**
	 * not implemented?
	 * 
	 * @param jsFileHandler
	 * @param type
	 */
	public static void getFileFromDialog(JSFileHandler jsFileHandler, String type) {
		JSFunction f = null;
		/**
		 * @j2sNative
	   *   
	   *   f = function(data, fileName) { jsFileHandler.handleFileLoaded$BA$S(data, fileName) };
	   * 
	   */
		{}
		JSUtil.J2S.getFileFromDialog(f, type);
	}

	static Clipboard systemClipboard;
	@Override
	public Clipboard getSystemClipboard() {
		if (systemClipboard == null)
			systemClipboard = new Clipboard("System");
		return systemClipboard;
	}

	@Override
	public DragSourceContextPeer createDragSourceContextPeer(DragGestureEvent dge)
			throws InvalidDnDOperationException {
		// TODO Auto-generated method stub
		return null;
	}


//////// FONTS and CURSORS ///////
	
//	public static void setCursor(Component comp, Cursor c) {
//		DOMNode.setCursor(getCursorName(c), comp);
//	}
	
	public static String getCursorName(Cursor c) {
		switch (c == null ? Cursor.DEFAULT_CURSOR : c.getType()) {
		case Cursor.CROSSHAIR_CURSOR:
			return "crosshair";
		case Cursor.WAIT_CURSOR:
			return "wait";
		case Cursor.TEXT_CURSOR:
			return "text";
		case Cursor.HAND_CURSOR:
			return "pointer";
		case Cursor.MOVE_CURSOR:
			return "move";
		case Cursor.N_RESIZE_CURSOR:
		case Cursor.S_RESIZE_CURSOR:
			return "ns-resize";
		case Cursor.NE_RESIZE_CURSOR:
		case Cursor.SW_RESIZE_CURSOR:
			return "nesw-resize";
		case Cursor.SE_RESIZE_CURSOR:
		case Cursor.NW_RESIZE_CURSOR:
			return "nwse-resize";
		case Cursor.E_RESIZE_CURSOR:
		case Cursor.W_RESIZE_CURSOR:
			return "ew-resize";
		case Cursor.CUSTOM_CURSOR:
			return c.getName();
		case Cursor.DEFAULT_CURSOR:
		default:
			return "default";
		}
	}

	private static String[] hardwiredFontList; 

	// -- Obsolete font names from 1.0.2. It was decided that
	// -- getFontList should not return these old names:
	// "Helvetica", "TimesRoman", "Courier", "ZapfDingbats"

	@Override
	public String[] getFontList() {
		if (hardwiredFontList == null)
			hardwiredFontList = new String[] { Font.DIALOG, Font.SANS_SERIF,
					Font.SERIF, Font.MONOSPACED, Font.DIALOG_INPUT };
		return hardwiredFontList;
	}


	/**
	 * Just using name, not family name, here for now
	 * 
	 * @param font
	 * @return CSS family name
	 */
	public static String getFontFamily(Font font) {
		return font.getName();
	}

	/**
	 * In JavaScript we only have one font metric, so we can just save it with the font itself
	 */
	@Override
	public FontMetrics getFontMetrics(Font font) {
		return font.getFontMetrics();
	}

	/**
	 * generates proper font name for JSGraphics2d Apparently Java sizes are
	 * pixels, not points. Not sure on this...
	 * 
	 * @param font
	 * @return "italic bold 10pt Arial"
	 */
	public static String getCanvasFont(Font font) {
		String strStyle = "";
		if (font.isItalic())
			strStyle += "italic ";
		if (font.isBold())
			strStyle += "bold ";
		String family = getCSSFontFamilyName(font.getFamily());
		// for whatever reason, Java font points are much larger than HTML5 canvas
		// points
		return strStyle + font.getSize() + "px " + family;
	}

	public static String getCSSFontFamilyName(String family) {
		family = family.toLowerCase();
		if (family.equals("sansserif") 
				|| family.equals("helvetica") 
				|| family.equals("dialog")
				|| family.equals("dialoginput"))
			family = "Arial";
		else if (family.equals("monospaced"))
			family = "monospace";
		return family;
	}

	/**
	 * Generate a date in a specific format.
	 * 
	 * @param isoType null, 8824, or 8601, or a standard SimpleDataFormat format 
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
//      if (isoType == null) {
//        isoType = "EEE dd MMM yyyy HH:mm:ss 'GMT'Z";
//      } else if (isoType.contains("8824")) {
//      	prefix = "D:";
//      	suffix = "'00'";
//      	isoType = "YYYYMMddHHmmssX";
//      } else if (isoType.contains("8601")) {
//        isoType = "yyyy-MM-dd'T'HH:mm:ss";
//      }
    	Date date = (Date) Interface.getInstance("java.util.Date", true);
    	SimpleDateFormat format = (SimpleDateFormat) Interface.getInstanceWithParams("java.text.SimpleDateFormat", new Class<?>[] { String.class }, new Object[]  { isoType});
      return prefix + format.format(date) + suffix;
    }
  }

  @Override
  public void beep() {
  	System.out.println("JSToolkit.beep");
  }

	/**
	 * Get a gnu.jpdf.PDFJob.
	 * 
	 * for now we are ignoring props
	 */
	@Override
	public PrintJob getPrintJob(JSFrame frame, String jobtitle, Properties props) {
		JSPrintJob job = (JSPrintJob) JSUtil.getInstance("swingjs.JSPrintJob");
		job.setProperties(jobtitle, props);
		return (PrintJob) (Object) job;
	}
	
	@Override
	public PrintJob getPrintJob(Frame frame, String jobtitle, Properties props) {
		JSPrintJob job = (JSPrintJob) JSUtil.getInstance("swingjs.JSPrintJob");
		job.setProperties(jobtitle, props);
		return (PrintJob) (Object) job;
	}

	/**
	 * Get a gnu.jpdf.PDFJob.
	 * 
	 * for now we are ignoring jobAttributes and pageAttributes
	 */
	@Override
	public PrintJob getPrintJob(JSFrame frame, String jobtitle,
			JobAttributes jobAttributes, PageAttributes pageAttributes) {
		JSPrintJob job = (JSPrintJob) JSUtil.getInstance("swingjs.JSPrintJob");
		job.setAttributes(jobtitle, jobAttributes, pageAttributes);
		return (PrintJob) (Object) job;
	}

	@Override
	public PrintJob getPrintJob(Frame frame, String jobtitle,
			JobAttributes jobAttributes, PageAttributes pageAttributes) {
		JSPrintJob job = (JSPrintJob) JSUtil.getInstance("swingjs.JSPrintJob");
		job.setAttributes(jobtitle, jobAttributes, pageAttributes);
		return (PrintJob) (Object) job;
	}

	@Override
	public Map<? extends Attribute, ?> mapInputMethodHighlight(InputMethodHighlight hl) {
	    JSUtil.notImplemented(null);
		return null;
	}

	private static KeyboardFocusManagerPeer focusManager;
	
	private static KeyboardFocusManagerPeer getFocusPeer() {
		return (focusManager == null ? focusManager = new JSFocusPeer() : focusManager);
	}
	
	public static boolean hasFocus(Component c) {
	  JSComponentUI ui = getUI(c, false);
		return (ui != null && !ui.isNull && ui.hasFocus());
	}

//	@Override
	public KeyboardFocusManagerPeer getKeyboardFocusManagerPeer() {
		return getFocusPeer();
	}

	public static JComponent getCurrentFocusOwner(Object related) {
		return  (JComponent) ((JSFocusPeer) getFocusPeer()).getCurrentFocusOwner(related);
	}

	public static void consumeEvent(Object e) {
		// SwingJS stop any further processing at all within the browser
		Object jqevent = null;
		if (e instanceof InputEvent) {
			jqevent = /** @j2sNative e.bdata && e.bdata.jqevent || */null; 
		} else {
			jqevent = e;
		}
		if (jqevent == null)
			return;
		
		/**
		 * @j2sNative 
		 * 		jqevent.stopPropagation();
		 *      jqevent.preventDefault(); 
		 * 
		 */
	}

	public static Point getMouseLocation() {
		return JSUtil.J2S.getMousePosition(new Point());
	}

	public static boolean isOverWritten(JComponent jc, String method) {
		String s = /** @j2sNative jc[method].exClazz.__CLASS_NAME__ || */"";
	    return s.indexOf("java") != 0 && s.indexOf("swingjs") != 0;
	}

	public static boolean checkJ2SFlag(String flag) {
	    return (/** @j2sNative J2S[flag] || */ false);
	}

    @Override
	public int getMenuShortcutKeyMask()  {
        return (isMac ? Event.META_MASK : Event.CTRL_MASK);
    }

    /**
     * The appropriate thread for an applet is considered to be the first
     * thread that it was created with. This thread is saved in the
     * JSAppletViewer instance as myThread.
     * 
     * @param viewer
     */
	public static void setThreadForViewer(JSFrameViewer viewer) {
		if (viewer != null && viewer.appletViewer != null 
				&& viewer.appletViewer != Thread.currentThread().getThreadGroup().秘appletViewer) {
			getCurrentThread(viewer.appletViewer.myThread);
		}

	}

}
