package swingjs;

import java.awt.AWTEvent;
import java.awt.Color;
import java.awt.Component;
import java.awt.Cursor;
import java.awt.Dialog;
import java.awt.Dialog.ModalExclusionType;
import java.awt.Dialog.ModalityType;
import java.awt.EventQueue;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Frame;
import java.awt.GraphicsConfiguration;
import java.awt.Image;
import java.awt.Window;
import java.awt.datatransfer.Clipboard;
import java.awt.dnd.DragGestureEvent;
import java.awt.dnd.InvalidDnDOperationException;
import java.awt.dnd.peer.DragSourceContextPeer;
import java.awt.image.BufferedImage;
import java.awt.image.BufferedImageOp;
import java.awt.image.ColorModel;
import java.awt.image.ImageObserver;
import java.awt.image.ImageProducer;
import java.awt.image.Raster;
import java.awt.image.RasterOp;
import java.awt.image.WritableRaster;
import java.awt.peer.DialogPeer;
import java.awt.peer.FramePeer;
import java.awt.peer.LightweightPeer;
import java.awt.peer.WindowPeer;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.Line;
import javax.sound.sampled.UnsupportedAudioFileException;
import javax.swing.JComponent;
import javax.swing.UIDefaults;
import javax.swing.UIManager;
import javax.swing.plaf.ComponentUI;
import javax.swing.text.Document;

import javajs.J2SIgnoreImport;
import javajs.api.JSFunction;
import javajs.util.PT;
import sun.awt.AppContext;
import sun.awt.SunToolkit;
import swingjs.api.Interface;
import swingjs.api.JSFileHandler;
import swingjs.api.js.DOMNode;
import swingjs.api.js.HTML5Applet;
import swingjs.api.js.HTML5CanvasContext2D;
import swingjs.api.js.JQuery;
import swingjs.plaf.JSComponentUI;


@J2SIgnoreImport(URL.class)
public class JSToolkit extends SunToolkit {

	/**
	 * for JSMouse only
	 */
	public static boolean isMac;
		
	static {
		/**
		 * @j2sNative
		 * 
		 * swingjs.JSToolkit.isMac = (J2S.featureDetection.os == "mac");
		 * 
		 */
		{
		}
	}
	

	/*
	 * NOTE: This class is constructed from java.awt.Toolkit.getDefaultToolkit()
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

	public static void exit() {
		JSUtil.getAppletViewer().exit();
	}

	// ////// java.awt.Toolkit /////////

	@Override
	protected int getScreenWidth() {
		@SuppressWarnings("unused")
		JQuery jq = JSUtil.getJQuery();
		int w = 0;
		/**
		 * @j2sNative
		 * 
		 * w = jq.$(window).width(); 
		 * 
		 */
		{
		}
		return w;
	}

	@Override
	protected int getScreenHeight() {
		@SuppressWarnings("unused")
		JQuery jq = JSUtil.getJQuery();
		int h = 0;
		/**
		 * @j2sNative
		 * 
		 * h = jq.$(window).height();
		 * 
		 */
		{
		}
		return h;
	}


	@Override
	public int getScreenResolution() {
		// n/a
		return 0;
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
			ModalExclusionType modalExclusionType) {
		return true;
	}

	@Override
	public boolean isModalityTypeSupported(ModalityType modalityType) {
		// TODO Auto-generated method stub
		return false;
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
		JSAppletViewer ap = JSUtil.getAppletViewer();
		GraphicsConfiguration gc = ap.graphicsConfig;
		return (gc == null ? (gc = ap.graphicsConfig = (GraphicsConfiguration) JSUtil.getInstance("swingjs.JSGraphicsConfiguration")) : gc);
	}

	public static boolean isFocused(Window window) {
		// TODO Auto-generated method stub
		return false;
	}

	/**
	 * generates proper font name for JSGraphics2d Apparently Java sizes are
	 * pixels, not points. Not sure on this...
	 * 
	 * @param font
	 * @return "italic bold 10pt Helvetica"
	 */
	public static String getCSSFont(Font font) {
		String css = "";
		if (font.isItalic())
			css += "font-style:italic;";
		if (font.isBold())
			css += "font-weight:bold;";
		css += "font-size:" + font.getSize() + "px;";
		css += "font-family:" + font.getFamily() + ";";
		return css;
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


	public static String getCSSColor(Color c) {
		String s = "000000" + Integer.toHexString(c.getRGB() & 0xFFFFFF);
		return "#" + s.substring(s.length() - 6);
	}

	private static UIDefaults uid;

	public static UIDefaults getLookAndFeelDefaults() {
		if (uid == null)
			uid = UIManager.getLookAndFeel().getDefaults();
		return uid;
	}

	public static JSComponentUI getComponentUI(JComponent target) {
		JSComponentUI ui = (JSComponentUI) Interface.getInstance("swingjs.plaf.JS"
				+ ((java.awt.JSComponent) target).getUIClassID(), true);
		if (ui != null)
			ui.set(target);
		return ui;
	}

	public static String getSwingDivId() {
		return Thread.currentThread().getName() + "_swingdiv";
	}

	private static int dispatchID = 0;

	public static void dispatchSystemEvent(Runnable runnable) {
		JSFunction f = null;
		/**
		 * @param eventQueue
		 * @j2sNative
		 * 
		 *            System.out.println("JST dispatchSystemEvent " +
		 *            runnable.run.toString()); f =
		 *            function(_JSToolkit_dispatchSystemEvent) {
		 *            System.out.println("JST running " +
		 *            runnable.run.toString());runnable.run()};
		 */
		{
		}
		dispatch(f, 0, 0);
	}

	/**
	 * dispatch an event "on the event thread"
	 * @param event
	 * @param src
	 * @param andWait
	 */
	public static void dispatchEvent(AWTEvent event, Object src, boolean andWait) {
		JSFunction f = null;
		int id = ++dispatchID;
		
//		 *            System.out.println("JST dispatchAWTEvent andWait=" + andWait +
//		 *            "," + event + " src=" + src); 
//		 *            System.out.println("JST dispatching AWTEvent " + event); 

		/**
		 * @j2sNative
		 * 
		 *            f = function()
		 *            {
		 *            if
		 *            (src == null) event.dispatch(); else src.dispatchEvent$java_awt_AWTEvent(event);
		 *            };
		 * 
		 */
		{
		}
		if (andWait)
			invokeAndWait(f, id);
		else
			dispatch(f, 0, id);
	}

	/**
	 * encapsulate timeout with an anonymous function that re-instates the
	 * "current thread" prior to execution. This is in case of multiple applets.
	 * 
	 * @param f a function or Runnable
	 * @param msDelay a time to wait for, in milliseconds. If this is < 0, just run without the dispatch (debugging)
	 * @param id an event id or 0 if not via EventQueue 
	 */
	public static int dispatch(Object f, int msDelay, int id) {

		/**
		 * @j2sNative
		 * 
		 *            var thread = java.lang.Thread.thisThread;
		 *            var thread0 = thread;
		 *            var id0 = SwingJS.eventID || 0;
		 *            var ff = function(_JSToolkit_setTimeout) {
		 *            SwingJS.eventID = id;
		 *            java.lang.Thread.thisThread = thread; 
		 *            try {
		 *            if (f.run)
		 *             f.run();
		 *            else
		 *             f();
		 *             } catch (e) {
		 *             var s = "JSToolkit.dispatch(" + id +"): " + e + (e.getStackTrace ? e.getStackTrace() : e.stack ? "\n" + e.stack : "");
		 *             System.out.println(s);
		 *             alert(s)}
		 *            SwingJS.eventID = id0; 
		 *            java.lang.Thread.thisThread = thread0; 
		 *            };
		 *            return (msDelay == -1 ? ff() : setTimeout(ff, msDelay));
		 * 
		 * 
		 * 
		 */
		{
			return  0;
		}
	}

	/**
	 * encapsulate timeout with an anonymous function that re-instates the
	 * "current thread" prior to execution. This is in case of multiple applets.
	 * 
	 * 
	 * @param f a function or Runnable
	 * @param id an event id or 0 if not via EventQueue 
	 */
	private static void invokeAndWait(JSFunction f, int id) {
		/**
		 * @j2sNative
		 * 
		 *            var thread = java.lang.Thread.thisThread;
		 *            var thread0 = thread;
		 *            (function(_JSToolkit_setTimeout) {
		 *              var id0 = SwingJS.eventID || 0;
		 *              SwingJS.eventID = id;
		 *              java.lang.Thread.thisThread = thread; 
		 *              if (f.run)
		 *                f.run();
		 *              else
		 *                f();
		 *              SwingJS.eventID = id0;
		 *              java.lang.Thread.thisThread = thread0; 
		 *            })();
		 * 
		 * 
		 * 
		 */
		{
		}
	}

	public static boolean isDispatchThread() {
//		 *            System.out.println("checking dispatch thread " +
//		 *            SwingJS.eventID); 
//		 *            
		/**
		 * @j2sNative
		 * 
		 *            return (!!SwingJS.eventID);
		 * 
		 */
		{
			return false;
		}
	}

//	public static void forceRepaint(Component c) {
//		// NO LONGER NECESSARY :)
//	}
	
	public static HTML5Applet getHTML5Applet(Component c) {
		return ((JSThreadGroup) c.getAppContext().getThreadGroup()).getHtmlApplet();
	}

	public static void taintUI(Component c) {
		// JApplet is a JComponent, but it does not have a getUI
		// some components may have getUI but currently no UI
		
		/**
		 * @j2sNative
		 * 
		 * c.getUI && c.getUI() && c.getUI().setTainted(); 
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
  	if (JSUtil.debugging)
  		System.out.println("JSToolkit creating UI-Peer for " +  target.getClass().getName() + ": " + peer.getClass().getName());
  	return peer;
  }

	@Override
	public DialogPeer createDialog(Dialog target) {
		ComponentUI ui = target.getUI();
		if (ui == null)
			return null;
  	if (JSUtil.debugging)
  		System.out.println("JSToolkit creating Dialog Peer for " +  target.getClass().getName() + ": " + target.getClass().getName());
		return (DialogPeer) ((WindowPeer) ui).setFrame(target, true);
	}

	@Override
	public FramePeer createFrame(Frame target) {
		ComponentUI ui = target.getUI();
		if (ui == null)
			return null;
  	if (JSUtil.debugging)
  		System.out.println("JSToolkit creating Frame Peer for " +  target.getClass().getName() + ": " + target.getClass().getName());
		return (FramePeer) ((WindowPeer) ui).setFrame(target, true);
	}

	@Override
	public WindowPeer createWindow(Window target) {
		ComponentUI ui = target.getUI();
		if (ui == null)
			return null;
  	if (JSUtil.debugging)
  		System.out.println("JSToolkit creating Window Peer for " +  target.getClass().getName() + ": " + target.getClass().getName());
		return ((WindowPeer) ui).setFrame(target, false);
	}

	public static JSComponentUI getUI(Component c, boolean isQuiet) {
		JSComponentUI ui = null;
		/**
		 * @j2sNative
		 * 
		 *            ui = c.getUI && c.getUI();
		 */
		{
			ui = (JSComponentUI) ((JComponent) c).getUI();
		}
		if (ui == null) {
			
			String s = c.getClass().getName();
			if (!PT.isOneOf(s, ";javax.swing.Box.Filler;swingjs.JSApplet;")) 
				System.out.println("[JSToolkit] Component " + s  
					+ " has no corresponding JSComponentUI.");
			// Coerce JSComponentUI for this peer.
			// This is a JavaScript-only trick that would be
			// problematic in Java as well as in JavaScript.
			ui = (JSComponentUI) (Object) new JSNullComponentPeer(c);
		}
		return ui;
	}

	public static Document getPlainDocument(JComponent c) {
		return (Document) JSUtil.getInstance("swingjs.JSPlainDocument");
	}

	public static String getClassNameForObject(Object c) {
		/**
		 * @j2sNative
		 * 
		 *            return c.__CLASS_NAME__;
		 * 
		 */
		{
			return null;
		}
	}

	

	

	



	//////////////// images ///////////////
	
	private JSImagekit imageKit;
	
	private JSImagekit getImagekit() {
		return (imageKit == null ? imageKit = (JSImagekit) Interface.getInstance("swingjs.JSImagekit", false) : imageKit);
	}

	@Override
	public Image getImage(String filename) {
		return createImage(filename);
	}

	@Override
	public Image getImage(URL url) {
		return createImage(url);
	}
	
	
	@Override
	public Image createImage(ImageProducer producer) {
		JSImagekit kit = (JSImagekit) Interface.getInstance("swingjs.JSImagekit", true);
		producer.startProduction(kit); // JSImageKit is the ImageConsumer here
		// we may create an image, but then later generate its pixels
		// and then also draw to it using img._g
		// If we are drawing to it and it has pixels, then we need to 
		// "fix" those pixels to the image. 
		return kit.getCreatedImage();
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

	public static boolean hasFocus(Component c) {
	  JSComponentUI ui = getUI(c, false);
		return (ui != null && !ui.isNull && ui.hasFocus());
	}

	public static boolean requestFocus(Component c) {
		final JSComponentUI ui = getUI(c, false);
		if (ui == null || ui.isNull || !ui.isFocusable())
			return  false;
		Runnable r = new Runnable() {

			@Override
			public void run() {
				ui.requestFocus(null, false, false, 0, null);
			}
			
		};
		dispatch(r, 50, 0);
		return true;
	}

	private static JSGraphicsCompositor compositor;

  static JSGraphicsCompositor getCompositor() {
		return (compositor == null ? compositor = (JSGraphicsCompositor) Interface
				.getInstance("swingjs.JSGraphicsCompositor", false) : compositor);
	}

	public static boolean setGraphicsCompositeAlpha(JSGraphics2D g, int rule) {
		return getCompositor().setGraphicsCompositeAlpha(g, rule);
	}

	public static boolean drawImageOp(JSGraphics2D g,
			BufferedImage img, BufferedImageOp op, int x, int y) {
		return getCompositor().drawImageOp(g, img, op, x, y);
	}

	public static WritableRaster filterRaster(Raster src, WritableRaster dst,
			RasterOp op) {
		return getCompositor().filterRaster(src, dst, op);
	}

	public static BufferedImage filterImage(BufferedImage src, BufferedImage dst,
			BufferedImageOp op) {
		return getCompositor().filterImage(src, dst, op);
	}

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
		getAudioPlayer().playAudio(data, audioFormat);
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
		getAudioPlayer().playAudioFileURL(url);
	}

	public static Line getAudioLine(Line.Info info) {
		return getAudioPlayer().getAudioLine(info);
	}

	public static ArrayList<Object> getTimerQueue() {
		return JSUtil.getAppletViewer().getTimerQueue();
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
		JSUtil.J2S._getFileFromDialog(f, type);
	}

	public static void killDispatched(int html5Id) {
		/**
		 * @j2sNative
		 * 
		 * clearTimeout(html5Id);
		 * 
		 */		
		{}
	}

	static Clipboard systemClipboard;
	@Override
	public Clipboard getSystemClipboard() {
		if (systemClipboard == null)
			systemClipboard = (Clipboard) JSUtil.getInstance("java.awt.datatransfer.Clipboard");
		return systemClipboard;
	}

	@Override
	public DragSourceContextPeer createDragSourceContextPeer(DragGestureEvent dge)
			throws InvalidDnDOperationException {
		// TODO Auto-generated method stub
		return null;
	}

	public static void setCursor(Cursor c) {
		String curs = null;
    switch(c == null ? Cursor.DEFAULT_CURSOR : c.getType()) {
    case Cursor.CROSSHAIR_CURSOR: 
      curs = "crosshair";
      break;
    case Cursor.WAIT_CURSOR:
      curs = "wait";
      break;
    case Cursor.TEXT_CURSOR:     
    	curs = "text";
    	break;
    case Cursor.N_RESIZE_CURSOR:
    case Cursor.S_RESIZE_CURSOR: 
      curs = "ns-resize"; 
      break;
    case Cursor.HAND_CURSOR:
      curs = "grab"; 
      break;
    case Cursor.MOVE_CURSOR: 
    	curs = "move";
      break;
    case Cursor.NE_RESIZE_CURSOR:
    case Cursor.SW_RESIZE_CURSOR:
      curs = "nesw-resize";
      break;
    case Cursor.SE_RESIZE_CURSOR:
    case Cursor.NW_RESIZE_CURSOR:
      curs = "nwse-resize";
      break;
    case Cursor.E_RESIZE_CURSOR:
    case Cursor.W_RESIZE_CURSOR:
      curs = "ew-resize";
      break;
    case Cursor.DEFAULT_CURSOR:
    default:
      curs = "default";
      break;
    }		
		DOMNode.setCursor(curs);
	}

	

//////// FONTS ///////
	
	
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
	 * @return "italic bold 10pt Helvetica"
	 */
	public static String getCanvasFont(Font font) {
		String strStyle = "";
		if (font.isItalic())
			strStyle += "italic ";
		if (font.isBold())
			strStyle += "bold ";
		String family = font.getFamily();
		if (family.equals("SansSerif") || family.equals("Dialog")
				|| family.equals("DialogInput"))
			family = "Arial";
		// for whatever reason, Java font points are much larger than HTML5 canvas
		// points
		return strStyle + font.getSize() + "px " + family;
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

  public void beep() {
  	System.out.println("JSToolkit.beep");
  }
}
