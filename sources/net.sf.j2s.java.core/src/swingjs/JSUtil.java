package swingjs;

import java.awt.Container;
import java.awt.JSComponent;
import java.awt.Toolkit;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Hashtable;
import java.util.Locale;
import java.util.Map;

import javajs.util.AU;
import javajs.util.AjaxURLConnection;
import javajs.util.PT;
import javajs.util.Rdr;
import javajs.util.SB;
import javajs.util.ZipTools;
import swingjs.api.Interface;
import swingjs.api.js.J2SInterface;
import swingjs.api.js.JQuery;

public class JSUtil {

	public JSUtil() {
		System.out.println("JSUtil initialized");
	}

	static {
		boolean j2sdebug = false;
		J2SInterface j2sself = null;
		/**
		 * @j2sNative
		 * 
		 * j2sself = self.J2S;
		 * j2sdebug = J2S._checkLoad || J2S._debugCode
		 * 
		 */
		{
		}
		debugging = j2sdebug;
		J2S = j2sself;
	}

	/**
	 * Derived from J2S._checkLoad, which can be set in html page
	 */
	public static boolean debugging;
	public static J2SInterface J2S;
	private static Hashtable<String, Object> fileCache;
	private static boolean useCache = true;

	
	private static Map<String, Object> getFileCache() {
		if (JSUtil.fileCache == null && (JSUtil.fileCache = JSUtil.J2S.getSetJavaFileCache(null)) == null) {
			JSUtil.fileCache = new Hashtable<String, Object>();
			JSUtil.J2S.getSetJavaFileCache(JSUtil.fileCache);
		}
		return JSUtil.fileCache;
	}

	private static Object getCachedFileData(String path) {
		return (JSUtil.useCache && JSUtil.fileCache != null ?
					JSUtil.fileCache.get(path) : null);
	}

	/**
	 * This could be a simple String, a javajs.util.SB, or unsigned or signed bytes
	 * depending upon the browser and the file type. 
	 * 
	 * It will not be cached, but it might come from a cache;
	 * 
	 * @param uriOrJSFile
	 * @return
	 */
	@SuppressWarnings("unused")
	private static Object getFileContents(Object uriOrJSFile) {
		if (uriOrJSFile instanceof File) {
		  byte[] bytes = /** @j2sNative uriOrJSFile.bytes ||*/ null;
		  if (bytes != null)
			  return bytes;
		}
		String uri = uriOrJSFile.toString();
		Object data = getCachedFileData(uri);
		if (data == null)  	{

			// for reference -- not used in JavaScript
			
			/**
			 * @j2sNative
			 * 
			 */
			try {
				data = Rdr.streamToUTF8String((BufferedInputStream) new URL(uri).getContent());
			} catch (Exception e) {
			}
			// bypasses AjaxURLConnection
			data = JSUtil.J2S.getFileData(uri, null, false, false);
		}
		return data;
	}

	/**
	 * Regardless of how returned by Jmol._getFileContents(), 
	 * this method ensures that we get a String.
	 * 
	 * @param filename
	 * @return
	 */
	public static String getFileAsString(String filename) {
		Object data = getFileContents(filename);
		return  JSUtil.ensureString(data);
	}

	/**
	 * Regardless of how returned by Jmol.getFileContents(), 
	 * this method ensures that we get signed bytes.
	 * 
	 * @param filename
	 * @return
	 */
	public static byte[] getFileAsBytes(Object file) {
		Object data = getFileContents(file);
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

	public static boolean haveCachedResource(String resourceName, boolean isJavaPath) {
		String path = JSUtil.J2S.getResourcePath(resourceName, isJavaPath);
		return (path != null && getCachedFileData(path) != null);
	}

	/**
	 * a String-based file such as .js, .css, or .property
	 * 
	 * .js and .css files will be processed appropriately
	 * 
	 * @param resourceName
	 * @param isJavaPath
	 * @param doProcess
	 *          evaluate JS or load CSS
	 * @return the resource as a string
	 */
	public static String getJavaResource(String resourceName, boolean isJavaPath,
			boolean doCache, boolean doProcess) {
		System.out.println("JSUtil getting Java resource " + resourceName);
		String path = J2S.getResourcePath(resourceName, isJavaPath);
		if (path == null)
			return null;
		Object data = getCachedFileData(path);
		if (data == null
				&& (data = J2S.getFileData(path, null, false, false)) != null
				&& useCache && doCache)
			JSUtil.cacheFileData(path, data);
		String sdata = JSUtil.ensureString(data);
		boolean ok = (sdata != null && sdata.indexOf("[Exception") != 0);
		System.out.println("Processing " + path + " ["
				+ (ok ? "" + sdata.length() : sdata) + "]");
		return (!ok ? null : !doProcess ? sdata
				: path.endsWith(".css") ? JSUtil.processCSS(sdata, path) : path
						.endsWith(".js") ? JSUtil.processJS(sdata, resourceName) : sdata);
	}

	static void cacheFileData(String path, Object data) {		
		getFileCache().put(path, data);
	}

	/**
	 * Load a Hashtable with resource files, which may be binary;
	 * called by JSAppletViewer upon loading and finding Info.resourceZip not null.
	 * 
	 * @param zipFileName originating file
	 * @param mapByteData map to fill or null for the default file cache
	 */
	@SuppressWarnings("static-access")
	public static void loadJavaResourcesFromZip(ClassLoader cl, String zipFileName, Map<String, Object>  mapByteData) {
		if (mapByteData == null)
			mapByteData = getFileCache();
		String fileList = "";
		try {
			BufferedInputStream bis = new BufferedInputStream(cl.getResourceAsStream(zipFileName));
			String prefix = J2S.getResourcePath(null, true); // will end with /
			fileList = JSUtil.getZipTools().cacheZipContentsStatic(bis, prefix, mapByteData, false);
		} catch (Exception e) {
			System.out.println("JSUtil could not cache files from " + zipFileName);
			return;
		}
		if (debugging)
			System.out.println("JSUtil loaded resources from " + zipFileName + ":\n" + fileList);
	}
	
	private static ZipTools zipTools;


	static ZipTools getZipTools() {
		return (zipTools == null ? (zipTools = (ZipTools) Interface.getInstance("javajs.util.ZipTools", true)) : zipTools);		// TODO Auto-generated method stub
	}

	/**
	 * Load a static JavaScript or CSS resource only once; no need to cache it if
	 * it is not there.
	 * 
	 * @param file
	 */
	public static String loadStaticResource(String file) {
		String s = "alert('" + file + "' was not found)";
		if (!J2S.isResourceLoaded(file, false)) {
			s = getJavaResource(file, true, false, true);
			J2S.isResourceLoaded(file, true);
		}
		return s;
	}

	static String processCSS(String css, String path) {
		if (path != null && css.indexOf("images/") >= 0) {
			path = path.substring(0, path.lastIndexOf("/") + 1) + "images/";
			css = PT.rep(css, "images/", path);
		}
		JSUtil.jQuery.$("head").append(JSUtil.jQuery.$("<style type='text/css'>" + css + "</style>"));
	return css;
	}

	static String processJS(String js, String resourceName) {
	try {
		/**
		 * @j2sNative
		 * 
		 * 
		 * if (js.indexOf(";//# sourceURL=") < 0) js += ";//# sourceURL=" + thisApplet._j2sPath + "/" + resourceName;
		 * eval(js);
		 * 
		 */
		{}
	} catch (Throwable e) {
		JSUtil.alert("error processing " + js);
	  return null;
	}
	return js;
	}

	static String ensureString(Object data) {
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

	/**
	 * Sets window.jQuery.$ = window.jQuery, so that we can call jQuery.$
	 * 
	 * @return an object with $ as a method
	 */
	public static JQuery getJQuery() {
		if (jQuery != null)
			return jQuery;
		/**
		 * @j2sNative
		 * 
		 *            if (!window.jQuery) alert(
		 *            "jQuery is required for SwingJS, but window.jQuery is not defined."
		 *            ); jQuery.$ || (jQuery.$ = jQuery); return(jQuery);
		 */
		{
			return null;
		}
	}
	
	public static JQuery jQuery = getJQuery();

	public static String getStackTrace(int n) {
		return /** @j2sNative Clazz._getStackTrace(n) || */null;
	}

	public static String getStackTrace() {
		return /** @j2sNative Clazz._getStackTrace() || */null;
	}

	/**
	 * report ONCE to System.out; can check in JavaScript
	 * 
	 * @param msg
	 *          TODO
	 * 
	 */
	public static void notImplemented(String msg) {
		String s = null;
		if (JSUtil.mapNotImpl == null)
			JSUtil.mapNotImpl = new Hashtable<String, Boolean>();
		/**
		 * @j2sNative
		 * 
		 *            s = arguments.callee.caller;
		 *            var cl = s.claxxOwner || s.exClazz;
		 *            s = (cl ? cl.__CLASS_NAME__ + "." : "") +
		 *            arguments.callee.caller.exName;
		 */
		{
		}
		if (JSUtil.mapNotImpl.containsKey(s))
			return;
		JSUtil.mapNotImpl.put(s, Boolean.TRUE);
		System.out.println(s + " has not been implemented in SwingJS. "
				+ (msg == "" ? "" : (msg == null ? "" : msg) + getStackTrace(-5)));
	
	}

	static Map<String, Boolean> mapNotImpl;


	/**
	 * JavaScript console.log
	 */
	public static void log(String msg) {
		/**
		 * @j2sNative
		 * 
		 * System.out.println(msg);
		 * console.log(msg);
		 */
		{}
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

	public static JSAppletViewer getAppletViewer() {
		return ((JSAppletThread) Thread.currentThread()).appletViewer;
	}

	public static void readyCallback(String aname, String fname, JSComponent applet,
			JSAppletViewer appletPanel) {
		try {
			J2S.readyCallback(aname, fname, true, applet, appletPanel);
		} catch (Throwable e) {
			System.out.println("JSUtil Error running readyCallback method for " + fname + " -- check your page JavaScript");
		}
	}

	/**
	 * A protected version of Rdr.getStreamAsBytes
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

	public static void saveFile(String fileName, Object data, String mimeType, String encoding) {
		J2S.saveFile(fileName, data, mimeType, encoding);
	}

	/**
	 * All classes created by Clazz have static class loaders which are just minimal
	 * objects in Clazz var inF.
	 * 
	 * @param name
	 * @return the object as a stream
	 */
	public static InputStream getResourceAsStream(String name) {
		return Toolkit.getDefaultToolkit().getClass().getClassLoader().getResourceAsStream(name);
	}

	/**
	 * All classes created by Clazz have static class loaders which are just minimal
	 * objects in Clazz var inF.
	 * 
	 * @param name
	 * @return a URL for this object
	 */
	public static URL getResource(String name) {
		return Toolkit.getDefaultToolkit().getClass().getClassLoader().getResource(name);
	}

	/**
	 * Get a default Locale. Called by Locale.getDefault(), but also
	 * called by JSAppletViewer, which will pass Info.language to this method.
	 * 
	 * @param language
	 *          null to use J2S default language based on (1) setting of J2S._lang
	 *          (2) setting of j2sLang=xx_XX in URI (3) navigator.language (4)
	 *          navigator.userLanguage (5) "en-US"
	 * 
	 * 
	 * 
	 * @return
	 */
	public static Locale getDefaultLocale(String language) {
		String region, country, variant;
		if (language == null)
			language = J2S.getDefaultLanguage(true);
		language = language.replace('-','_');
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

	public static BufferedInputStream getURLInputStream(URL url, boolean andDelete) {
		try {
			BufferedInputStream bis = AjaxURLConnection.getAttachedStreamData(url, andDelete);
			return  (bis == null ?  (BufferedInputStream) url.openStream() : bis);
		} catch (IOException e) {
		}
		return null;
	}

	public static void showWebPage(URL url, Object target) {
			/**
			 * @j2sNative
			 * 
			 * 			if (target) window.open(url.toString(), target); else
			 *            window.open(url.toString());
			 */
	  }

	/**
	 * important warnings for TODO list
	 *  
	 * @param msg
	 */
	public static void warn(String msg) {
		JSUtil.alert(msg);
	}

	/**
	 * JavaScript alert
	 */
	public static void alert(Object object) {
		/**
		 * @j2sNative
		 * 
		 * console.log("[JSUtil] " + object);
		 * alert(object);
		 */
		{
			System.out.println(object);
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
		 * return confirm(msg);
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
		 * return prompt(msg, defaultRet);
		 */
		{
			return null;
		}
	}

}
