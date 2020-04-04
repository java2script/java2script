package swingjs;

import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.JSComponent;
import java.awt.Toolkit;
import java.awt.datatransfer.UnsupportedFlavorException;
import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;

import javax.swing.JComponent;
import javax.swing.plaf.ComponentUI;

import javajs.util.AU;
import javajs.util.AjaxURLConnection;
import javajs.util.PT;
import javajs.util.Rdr;
import javajs.util.SB;
import javajs.util.ZipTools;
import sun.awt.AppContext;
import swingjs.api.Interface;
import swingjs.api.JSUtilI;
import swingjs.api.js.DOMNode;
import swingjs.api.js.HTML5Applet;
import swingjs.api.js.J2SInterface;
import swingjs.api.js.JQuery;
import swingjs.json.JSON;
import swingjs.plaf.JSFrameUI;

public class JSUtil implements JSUtilI {

	public JSUtil() {}
	
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
		System.out.println("swingjs.JSUtil initialized;debug=" + j2sdebug);
	}

	/**
	 * Derived from J2S._checkLoad, which can be set in html page
	 */
	public static boolean debugging;
	public static J2SInterface J2S;
	private static Hashtable<String, Object> fileCache;
	private static boolean useCache = true;

	
	private static Map<String, Object> getFileCache() {
		if (fileCache == null && (fileCache = J2S.getSetJavaFileCache(null)) == null) {
			fileCache = new Hashtable<String, Object>();
			J2S.getSetJavaFileCache(fileCache);
		}
		return fileCache;
	}

	public static Object getCachedFileData(String path) {
		return (useCache && fileCache != null ?
					fileCache.get(fixCachePath(path)) : null);
	}

	/**
	 * Set the cache to Boolean.FALSE to indicate that we have checked this
	 * @param path
	 * @return
	 */
	public static Object removeCachedFileData(String path) {
		return (useCache && fileCache != null ?
					fileCache.put(fixCachePath(path), Boolean.FALSE) : null);
	}


	/**
	 * This could be a simple String, a javajs.util.SB, or unsigned or signed bytes
	 * depending upon the browser and the file type.
	 * 
	 * It will not be cached, but it might come from a cache; 
	 * 
	 * @param uriOrJSFile File or URL or URI or String
	 * 
	 * @return may be byte[], String, or javajs.util.SB if found; Boolean FALSE if not found
	 */
	@SuppressWarnings("unused")
	private static Object getFileContents(Object uriOrJSFile, boolean asBytes) {
		if (uriOrJSFile instanceof File) {
			byte[] bytes = /** @j2sNative uriOrJSFile.秘bytes || */
					null;
			if (bytes != null)
				return bytes;
		}
		String uri = uriOrJSFile.toString();
		Object data = null;
		if (asBytes && uri.indexOf(":/") < 0) {
			data = getCachedFileData(uri);
			if (data != null)
				return data;
			// looking for "examples/xxxx.xxx" --> "./examples/xxxx.xxx"
			if (!uri.startsWith("/"))
				uri = "/" + uri;
			uri = "http://." + uri;
			// Note that SwingJS will convert this to https if necessary.
		}
		if (data == null) {
			data = getCachedFileData(uri);
		}
		if (data == null && !uri.startsWith("./")) {
			// Java applications may use "./" here
			try {
				BufferedInputStream stream = (BufferedInputStream) new URL(uri).getContent();
				data = (asBytes ? Rdr.getStreamAsBytes(stream, null) : Rdr.streamToUTF8String(stream));
			} catch (Exception e) {
				// bypasses AjaxURLConnection
				data = J2S.getFileData(uri, null, false, asBytes);
				if (data == null)
					removeCachedFileData(uri);
			}
		}
		return data;
	}

	private static String fixCachePath(String uri) {
		int pt;
		if (uri.startsWith("./"))
			uri = "/" + uri;
		if (uri.startsWith("https:/"))
			uri = uri.substring(7);
		if (uri.startsWith("http:/"))
			uri = uri.substring(6);
		uri = uri.replace("//", "/");
		while ((pt = uri.indexOf("/././")) >= 0) {
			// https://././xxx --> /./xxx
			uri = uri.substring(0, pt) + uri.substring(pt + 2);
		}
		if (uri.startsWith("/"))
			uri = uri.substring(1);
		if (uri.startsWith("./"))
			uri = uri.substring(2);
		return uri;
	}

	/**
	 * Regardless of how returned by Jmol._getFileContents(), 
	 * this method ensures that we get a String.
	 * 
	 * @param filename
	 * @return
	 */
	public static String getFileAsString(String filename) {
		Object data = getFileContents(filename, false);
		return ensureString(data);
	}

	/**
	 * Transform byte[], SB, or InputStream data to String
	 * @param data
	 * @return String data or null
	 */
	static String ensureString(Object data) {
		if (data == null)
			return null;
		if (data instanceof byte[])
			return Rdr.bytesToUTF8String((byte[]) data);
		if (data instanceof String || data instanceof SB)
			return data.toString();
		if (data instanceof InputStream)
			return Rdr.streamToUTF8String(new BufferedInputStream((InputStream) data));
		return null;
	}

	/**
	 * Ensure byte[] or null
	 * 
	 * @param file
	 * @param checkNotFound
	 * @return
	 */
	public static byte[] getFileAsBytes(Object file, boolean checkNotFound) {
		byte[] data = getFileAsBytes(file);
		if (data == null)
			return null;
		if (checkNotFound) {
			if (data.length == 0) 
				return null;
			if (data.length == 2) {
				// one empty line, from chemapps relay - not found 
				if (data[0] == 13 && data[1] == 10)
					return null;
			}
			if (data.length == 39) {
				if (new String(data).equals("NetworkError: A network error occurred."))
						return null;
			}
			System.out.println(new String(data));
		}
		return data;
	}

	/**
	 * Standard call for getting file contents. 
	 * 
	 * Regardless of how returned by Jmol.getFileContents(), 
	 * this method ensures that we get signed bytes.
	 * 
	 * @param filename
	 * @return byte[] or null
	 */
	public static byte[] getFileAsBytes(Object file) {
		Object data = getFileContents(file, true);
		if (data == null || data == Boolean.FALSE)
			return null;
		byte[] b = null;
		if (data instanceof byte[])
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
		String path = J2S.getResourcePath(resourceName, isJavaPath);
		return (path != null && getCachedFileData(path) != null);
	}

	/**
	 * a String-based file such as .js, .css, or .property
	 * 
	 * .js and .css files will be processed appropriately
	 * 
	 * @param resourceName
	 * @param isJavaPath
	 * @param doProcess    evaluate JS or load CSS
	 * @return the resource as a string
	 */
	public static String getJavaResource(String resourceName, boolean isJavaPath, boolean doCache, boolean doProcess) {
		System.out.println("JSUtil getting Java resource " + resourceName);
		String path = J2S.getResourcePath(resourceName, isJavaPath);
		if (path == null)
			return null;
		Object data = getCachedFileData(path);
		if (data == Boolean.FALSE)
			return null;
		if (data == null) {
			data = J2S.getFileData(path, null, false, false);
			if (data == null) {
				if (useCache && doCache) {
					removeCachedFileData(path);
				}
			} else if (useCache && doCache) {
				cacheFileData(path, data);
			}
		}
		String sdata = ensureString(data);
		boolean ok = (sdata != null && sdata.indexOf("[Exception") != 0);
		System.out.println("Processing " + path + " [" + (ok ? "" + sdata.length() : sdata) + "]");
		return (!ok ? null
				: !doProcess ? sdata
						: path.endsWith(".css") ? processCSS(sdata, path)
								: path.endsWith(".js") ? processJS(sdata, resourceName) : sdata);
	}
	
	public static InputStream getCachedResourceAsStream(String name) {
		
		
//		, isjavapath false, docachetrue, doprocefalse)
		
		System.out.println("JSUtil getting Java resource " + name);
		String path = J2S.getResourcePath(name, false);
		if (path == null)
			return null;
		InputStream stream;
		Object data = getCachedFileData(path);
		if (data == null) {
			stream = getResourceAsStream(name);
			data = /** @j2sNative stream && stream.$in.buf ||*/null;
		} else {
			stream = new BufferedInputStream(new ByteArrayInputStream((byte[]) data));
		}
		if (stream != null && useCache)
			cacheFileData(path, data);
		return stream;
	}

	public static void cacheFileData(String path, Object data) {
		if (data == null) {
			System.out.println("JSUtil releasing cached bytes for " + path);
			getFileCache().remove(path);
		} else {
			String count = "?";
			if (data instanceof byte[])
				count = ""+ ((byte[]) data).length;
			else if (data instanceof String)
				count = "" + ((String) data).length();
			path = fixCachePath(path);
			if (!getFileCache().containsKey(path))
				System.out.println("JSUtil caching " + count + " bytes for " + path);
			getFileCache().put(path, data);
		}
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
			fileList = getZipTools().cacheZipContentsStatic(bis, prefix, mapByteData, false);
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

	public static boolean isClassLoaded(String className) {
		return (/** @j2sNative Clazz._isClassDefined(className) || */false);		
	}
	
	static String processCSS(String css, String path) {
		if (path != null && css.indexOf("images/") >= 0) {
			path = path.substring(0, path.lastIndexOf("/") + 1) + "images/";
			css = PT.rep(css, "images/", path);
		}
		jQuery.$("head").append(jQuery.$("<style type='text/css'>" + css + "</style>"));
	return css;
	}

	static String processJS(String js, String resourceName) {
	try {
		/**
		 * @j2sNative
		 * 
		 * 
		 * if (js.indexOf(";//# sourceURL=") < 0) js += ";//# sourceURL=" + J2S.thisApplet._j2sPath + "/" + resourceName;
		 * eval(js);
		 * 
		 */
		{}
	} catch (Throwable e) {
		alert("error processing " + js);
	  return null;
	}
	return js;
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

	public static Object parseJSONRaw(String json) {
		return getJQuery().parseJSON(json);
	}
	
	public static String getStackTrace(int n) {
		return /** @j2sNative Clazz._getStackTrace(n) || */null;
	}

	public static String getStackTrace() {
		/**
		 * @j2sNative return Clazz._getStackTrace();
		 * 
		 */
		{
			try {
				throw new NullPointerException();
			} catch (Exception e) {
				e.printStackTrace();
				return e.getStackTrace().toString();
			}
		}
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
		if (mapNotImpl == null)
			mapNotImpl = new Hashtable<String, Boolean>();
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
		if (mapNotImpl.containsKey(s + msg))
			return;
		mapNotImpl.put(s + msg, Boolean.TRUE);
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
		alert(msg);
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

	public static void setAjax(URL url) {
		JSON.setAjax(url);	
	}

	public static Object setAjax(Object... params) {
		return params.length == 1 ? JSON.setAjax((URL) params[0]) : JSON.setAjax(params);
	}
	
	public static Object parseJSON(Object o) {
		return JSON.parse(o);
	}

	public static BufferedReader getJSONReader(Object is) {
		return JSON.getJSONReader((InputStream) is);
	}

	/**
	 * Retrieve the JavaScript method or field aliasing this component's method or field
	 * @param c the component
	 * @param name the method's fully qualified name, such as paint$java_awt_Graphics
	 * @return the JavaScript function backing this method name
	 */
	public static Object getJ2SAlias(Object c, String name) {
		return (/** @j2sNative c && c[name] || */null);
	}

	/**
	 * Determine whether a method is defined in a given class.
	 * 
	 * @param f  the JavaScript function aliasing the Java method
	 * @param cl can be a Class object or a JavaScript C$ object
	 * @return
	 */
	public static boolean isForClass(Object f, Class<?> cl) {
		return cl != null && (/** @j2sNative !f || f.exClazz == (cl.$clazz$ || cl) || */false);
	}

	public static boolean isOverridden(Object c, String name, Class<?> cl) {
		return cl == null || c != null && !isForClass(getJ2SAlias(c, name), cl);
	}

	static Object ctxTemp;

	/**
	 * A great trick to get a Java Color from a name using JavaScript.
	 * https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes
	 *  
	 * @param c
	 * @return
	 */
	@SuppressWarnings({ "null" })
	public static Color getColorFromName(String c) {
		int[] rgb = null;
		/**
		 * @j2sNative
		 * 
		 * 	if (C$.ctxTemp == null) { 
		 *    var d = document.createElement("canvas"); 
		 *    d.height = d.width = 1;
		 *    C$.ctxTemp = d.getContext("2d"); 
		 *  } 
		 *  C$.ctxTemp.fillStyle = c;
		 *  C$.ctxTemp.fillRect(0, 0, 1, 1); 
		 *  rgb = C$.ctxTemp.getImageData(0, 0, 1, 1).data;
		 */		
		return new Color(rgb[0], rgb[1], rgb[2]);
	}

	public static byte[] getFileBytes(File f) {
		return f.秘bytes;
	}
	
	@Override
	public byte[] getBytes(File f) {
		return f.秘bytes;
	}
	
	@Override
	public HTML5Applet getAppletForComponent(Component c) {
		return getHTML5Applet(c);
	}

	public static HTML5Applet getApplet() {
		return getHTML5Applet(null);
	}

	public static String getJSClassName(Object o) {
		return /** @j2sNative o && o.__CLASS_NAME__ ||*/"";
	}
	
	public static String getJSID(Object o) {
		
		/** @j2sNative 
		 * 
		 * var t = typeof o;
		 *  return (t == "string" ? o : (o.__CLASS_NAME__ == "java.lang.Class" ? o.getName$() : o.__CLASS_NAME__ || t)+ "_" + (o.__JSID__ || (o.hashCode$ ? o.hashCode$() : o.toString())));
		 */
		 {
			 return null;
		 }
	}

	public static HTML5Applet getHTML5Applet(Component c) {
		ThreadGroup g = (c == null ? Thread.currentThread().getThreadGroup() : c.getAppContext().getThreadGroup());
		return ((JSThreadGroup) g).getHtmlApplet();
	}

	public static boolean setFileBytesStatic(File f, Object isOrBytes) {
		// Used in JalviewJS
		if (isOrBytes instanceof InputStream) {
			f.秘bytes = /**
						 * @j2sNative (isOrBytes.$in.$in || isOrBytes.$in).buf ||
						 */
					null;
		} else if (isOrBytes instanceof byte[]) {
			f.秘bytes = /**
						 * @j2sNative isOrBytes ||
						 */
				null;
		} else {
			f.秘bytes = null;
		}
		return (f.秘bytes != null);
	} 

	@Override
	public HashMap<?,?> getJSContext(Object key) {
	    HashMap<?,?> map = (HashMap<?, ?>) AppContext.getAppContext().get(key);
	    if (map == null)
	    	AppContext.getAppContext().put(key, map = new HashMap<Object, Object>());
	    return map;
	}

	@Override
	public void addBinaryFileType(String ext) {
		J2S.addBinaryFileType(ext);
	}
	
	@Override
	public void readInfoProperties(String prefix, Properties p) {
		Object info = DOMNode.getAttr(getApplet(), "__Info");
		if (info == null)
			return;
		String key = "";
		String value = "";
		/**
		 * @j2sNative for (var key in info) { if (prefix == null || key.indexOf(prefix) == 0) { value = ""
		 *            + info[key];
		 */
		System.out.println("Platform reading Info." + key + " = " + value);
		p.put(key, value);

		/**
		 * @j2sNative } }
		 */

	}

	@Override
	public void loadResourceIfClassUnknown(String resource, String className) {
		if (!isClassLoaded(className))
			loadStaticResource(resource);		
	}
	
	@Override
	public void setAppletAttribute(String key, Object val) {
	    @SuppressWarnings("unused")
	    HTML5Applet applet = getApplet();
	    /**
	     * 
	     * @j2sNative
	     *   applet[key] = val;
	     */

	}

	@Override
	public Object getAppletAttribute(String key) {
	    @SuppressWarnings("unused")
	    HTML5Applet applet = getApplet();
	    /**
	     * 
	     * @j2sNative
	     *   return applet[key];
	     */ 
	    {
	    	return null;
	    }
	}

	@Override
	public Object getEmbeddedAttribute(Component frame, String type) {
		ComponentUI ui = ((JComponent)frame).getUI();
		return (ui instanceof JSFrameUI ? (Dimension) ((JSFrameUI) ui).getEmbedded(type) : null);
	}

	@Override
	public boolean streamToFile(InputStream is, File outFile) {
		return (outFile instanceof JSTempFile ? ((JSTempFile) outFile).setBytes(is) : setFileBytes(outFile, is));
	}

	@Override
	public boolean setFileBytes(File f, Object isOrBytes) {
		return setFileBytesStatic(f, isOrBytes);
	}
	
	/**
	 * Add a known domain that implements access-control-allow-origin:*
	 * 
	 * These should be reviewed periodically.
	 * 
	 * @param domain for a service that is not allowing ajax
	 * 
	 * @author hansonr@stolaf.edu
	 * 
	 */
	@Override
	public void addDirectDatabaseCall(String domain) {

		System.out.println("JSUtil adding known access-control-allow-origin * for domain " + domain);
		J2S.addDirectDatabaseCall(domain);

	}

	@Override
	public void cachePathData(String path, Object data) {
		cacheFileData(path, data);
	}

	@Override
	public Object getFile(String path, boolean asString) {
		return (asString ? getFileAsString(path) : getFileAsBytes(path));
	}

	@Override
	public void setAppletInfo(String infoKey, Object val) {
		HTML5Applet applet = getApplet();
		/** @j2sNative
		 * 
		 * applet.__Info[infoKey] = val;
		 */
	}

	@Override
	public URL getDocumentBase() {
		JSFrameViewer ap = (JSFrameViewer) this.getAppletAttribute("_appletPanel");
		try {
			return new URL(ap.appletDocumentBase);
		} catch (MalformedURLException e) {
			return null;
		}
	}

	@Override
	public URL getCodeBase() {
		JSFrameViewer ap = (JSFrameViewer) this.getAppletAttribute("_appletPanel");
		try {
			return new URL(ap.appletCodeBase);
		} catch (MalformedURLException e) {
			return null;
		}
	}

	  /**
	   * Switch the flag in SwingJS to use or not use the JavaScript Map object in
	   * Hashtable, HashMap, and HashSet. Default is enabled.
	   * 	   * 
	   */
	@Override
	  public void setJavaScriptMapObjectEnabled(boolean enabled)
	  {
	    /**
	     * @j2sNative Clazz.loadClass("java.util.HashMap").USE_SIMPLE = enabled;
	     */
	  }

	public static void setClipboardContents(String data) {
		try {
			/**
			 * @j2sNative
			 * 
			 * navigator.clipboard.writeText(data);
			 * 
			 */
		} catch (Throwable t) {
			alert(data);
		}
	}

}

