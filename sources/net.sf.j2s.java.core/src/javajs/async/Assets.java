package javajs.async;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import swingjs.api.JSUtilI;

/**
 * The Assets class allows assets such as images and property files to be
 * combined into zip files rather than delivered individually. The Assets
 * instance is a singleton served by a set of static methods. In particular, the
 * three add(...) methods are used to create asset references, which include an
 * arbitrary name, a path to a zip file asset, and one or more class paths that
 * are covered by this zip file asset.
 * 
 * For example:
 * 
 * <code>
	static {
		try {
			Assets.add(new Assets.Asset("osp", "osp-assets.zip", "org/opensourcephysics/resources"));
			Assets.add(new Assets.Asset("tracker", "tracker-assets.zip",
					"org/opensourcephysics/cabrillo/tracker/resources"));
			Assets.add(new Assets.Asset("physlets", "physlet-assets.zip", new String[] { "opticsimages", "images" }));
			// add the Info.assets last so that it can override these defaults
			if (OSPRuntime.isJS) {
				Assets.add(OSPRuntime.jsutil.getAppletInfo("assets"));
			}
		} catch (Exception e) {
			OSPLog.warning("Error reading assets path. ");
		}

	}
	
 * </code>
 * 
 * In the Info object, these would be defined using objects:
 * 
 * <code>
 * assets: [{name:"osp", zipPath:"osp-assets.zip", classPath:"org/opensourcephysics/resources"},
 * 	        {name:"tracker",zipPath:"tracker-assets.zip",classPath:"org/opensourcephysics/cabrillo/tracker/resources"},
 *          {name:"physlets", zipPath:"physlet-assets.zip", classPaths: ["opticsimages", "images"]}],
 * </code>
 * 
 * Note the use of "classPaths" not "classPath" when an array is used to indicate multiple paths
 * 
 * It is not clear that Java is well-served by this zip-file loading, but
 * certainly JavaScript is. What could be 100 downloads is just one, and SwingJS
 * (but not Java) can cache individual ZipEntry instances in order to unzip them
 * independently only when needed. This is potentially a huge savings.
 * 
 * Several static methods can be used to retrieve assets. Principal among those
 * are:
 * 
 * <code>
 * getAssetBytes(String fullPath)
 * getAssetString(String fullPath)
 * getAssetStream(String fullPath)
 * </code>
 * 
 * If an asset is not found in a zip file, then it will be loaded from its fullPath. 
 * 
 * 
 * 
 * @author hansonr
 *
 */

public class Assets {

	public static boolean isJS = /** @j2sNative true || */
			false;

	public static JSUtilI jsutil;

	static {
		try {
			if (isJS) {
				jsutil = ((JSUtilI) Class.forName("swingjs.JSUtil").newInstance());
			}

		} catch (Exception e) {
			System.err.println("Assets could not create swinjs.JSUtil instance");
		}
	}

	/**
	 * track not-found resources
	 * 
	 */
	private static HashSet<String> nullResources;

	private Map<String, Map<String, ZipEntry>> htZipContents = new HashMap<>();

	private static boolean doCacheZipContents = true;

	private static Assets instance = new Assets();

	private Assets() {
	}

	private Map<String, Asset> assetsByPath = new HashMap<>();

	private String[] sortedList = new String[0];

	/**
	 * If this object has been cached by SwingJS, add its bytes to the URL, URI, or
	 * File
	 * 
	 * @param URLorURIorFile
	 * @return
	 */
	public static byte[] addJSCachedBytes(Object URLorURIorFile) {
		return (isJS ? jsutil.addJSCachedBytes(URLorURIorFile) : null);
	}

	public static class Asset {
		String name;
		URI uri;
		String classPath;
		String zipPath;
		String[] classPaths;

		public Asset(String name, String zipPath, String[] classPaths) {
			this.name = name;
			this.zipPath = zipPath;
			this.classPaths = classPaths;
		}

		public Asset(String name, String zipPath, String classPath) {
			this.name = name;
			this.zipPath = zipPath;
			uri = getAbsoluteURI(zipPath); // no spaces expected here.
			this.classPath = classPath.endsWith("/") ? classPath : classPath + "/";
		}

		public URL getURL(String fullPath) throws MalformedURLException {
			return (fullPath.indexOf(classPath) < 0 ? null
					: new URL("jar", null, uri + "!/" + fullPath));//.replaceAll(" ", "%20")));
		}

		@Override
		public String toString() {
			return "{" + "\"name\":" + "\"" + name + "\"," + "\"zipPath\":" + "\"" + zipPath + "\"," + "\"classPath\":"
					+ "\"" + classPath + "\"" + "}";
		}

	}

	public static Assets getInstance() {
		return instance;
	}

	/**
	 * The difference here is that URL will not insert the %20 for space that URI will.
	 * 
	 * @param path
	 * @return
	 */
	public static URL getAbsoluteURL(String path) {
		URL url = null;
		try {
			url = (path.indexOf("file:") == 0 ? new URL(path) : new File(new File(path).getAbsolutePath()).toURI().toURL());
			if (path.indexOf("!/")>=0)
				url = new URL("jar", null, url.toString());
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		return url;
	}

	public static URI getAbsoluteURI(String path) {
		URI uri = null;
		try {
			uri = (path.indexOf(":/") < 0 ? new File(new File(path).getAbsolutePath()).toURI() : new URI(path));
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
		return uri;
	}

	/**
	 * Allows passing a Java Asset or array of Assets or a JavaScript Object or
	 * Object array that contains name, zipPath, and classPath keys; in JavaScript,
	 * the keys can have multiple .
	 * 
	 * @param o
	 */
	public static void add(Object o) {
		if (o == null)
			return;
		try {
			if (o instanceof Object[]) {
				Object[] a = (Object[]) o;
				for (int i = 0; i < a.length; i++)
					add(a[i]);
				return;
			}
			// In JavaScript this may not actually be an Asset, only a proxy for that.
			// Just testing for keys. Only one of classPath and classPaths is allowed.
			Asset a = (Asset) o;
			if (a.name == null || a.zipPath == null || a.classPath == null && a.classPaths == null
					|| a.classPath != null && a.classPaths != null) {
				throw new NullPointerException("Assets could not parse " + o);
			}
			if (a.classPaths == null) {
				// not possible in Java, but JavaScript may be passing an array of class paths
				add(a.name, a.zipPath, a.classPath);
			} else {
				add(a.name, a.zipPath, a.classPaths);
			}
		} catch (Throwable t) {
			throw new IllegalArgumentException(t.getMessage());
		}
	}

	public static void add(String name, String zipFile, String path) {
		add(name, zipFile, new String[] { path });
	}

	private static HashSet<String> loadedAssets = new HashSet<>();

	private static boolean debugging;
	
	public static boolean hasLoaded(String name) {
		return loadedAssets.contains(name);
	}

	public static void setDebugging(boolean tf) {
		debugging = tf;
	}
	/**
	 * Completely reset the assets data.
	 * 
	 */
	public static void reset() {
		nullResources = null;
		getInstance().htZipContents.clear();
		getInstance().assetsByPath.clear();
		getInstance().sortedList = new String[0];
	}

	public static void add(String name, String zipFile, String[] paths) {
		getInstance()._add(name, zipFile, paths);
	}

	private void _add(String name, String zipFile, String[] paths) {
		if (hasLoaded(name)) {
			System.err.println("Assets warning: Asset " + name + " already exists");
			List<String> toRemove = new ArrayList<>();
			for (String key: assetsByPath.keySet()) {
				if (assetsByPath.get(key).name.equals(name)) {
					toRemove.add(key);					
				}
			}
			for (int i = 0; i < toRemove.size(); i++) {
				System.err.println("Assets warning: removing " + assetsByPath.get(toRemove.get(i)));
				assetsByPath.remove(toRemove.get(i));
			}
		}
		loadedAssets.add(name);
		for (int i = paths.length; --i >= 0;) {
			assetsByPath.put(paths[i], new Asset(name, zipFile, paths[i]));
			System.out.println("Assets: adding " + assetsByPath.get(paths[i]));
		}
		resort();
	}
	

	/**
	 * Gets the asset, preferably from a zip file asset, but not necessarily.
	 * 
	 * @param assetPath
	 * @return
	 */
	public static byte[] getAssetBytes(String assetPath) {
		return getAssetBytes(assetPath, false);
	}

	/**
	 * Gets the asset, preferably from a zip file asset, but not necessarily.
	 * 
	 * @param assetPath
	 * @return
	 */
	public static String getAssetString(String assetPath) {
		return getAssetString(assetPath, false);
	}

	/**
	 * Gets the asset, preferably from a zip file asset, but not necessarily.
	 * 
	 * @param assetPath
	 * @return
	 */
	public static InputStream getAssetStream(String assetPath) {
		return getAssetStream(assetPath, false);
	}

	/**
	 * Gets the asset from a zip file.
	 * 
	 * @param assetPath
	 * @return
	 */
	public static byte[] getAssetBytesFromZip(String assetPath) {
		return getAssetBytes(assetPath, true);
	}

	/**
	 * Gets the asset from a zip file.
	 * 
	 * @param assetPath
	 * @return
	 */
	public static String getAssetStringFromZip(String assetPath) {
		return getAssetString(assetPath, true);
	}

	/**
	 * Gets the asset from a zip file.
	 * 
	 * @param assetPath
	 * @return
	 */
	public static InputStream getAssetStreamFromZip(String assetPath) {
		return getAssetStream(assetPath, true);
	}


	/**
	 * Get the contents of a path from a zip file asset as byte[], optionally
	 * loading the resource directly using a class loader.
	 * 
	 * @param path
	 * @param zipOnly
	 * @return
	 */
	private static byte[] getAssetBytes(String path, boolean zipOnly) {
		byte[] bytes = null;
		URL url = null;
		try {
			url = getInstance()._getURLFromPath(path, true);
			if (url == null && !zipOnly) {
				url = getAbsoluteURL(path);
				// url = Assets.class.getResource(path);
			}
			if (url != null) {
				if (isJS) {
					bytes = jsutil.getURLBytes(url);
					if (bytes == null) {
						url.openStream();
						bytes = jsutil.getURLBytes(url);
					}
				} else {
					bytes = getLimitedStreamBytes(url.openStream(), -1, null);
				}
			}
		} catch (Throwable t) {
			t.printStackTrace();
		}
		if (debugging) {
			System.out.println("Assets.getAssetBytes " + path + " " + url + (bytes == null ? " null" : " " + bytes.length + " bytes"));
		}
		return bytes;
	}

	/**
	 * Get the contents of a path from a zip file asset as a String, optionally
	 * loading the resource directly using a class loader.
	 * 
	 * @param path
	 * @param zipOnly
	 * @return
	 */
	private static String getAssetString(String path, boolean zipOnly) {
		byte[] bytes = getAssetBytes(path, zipOnly);
		return (bytes == null ? null : new String(bytes));
	}

	/**
	 * Get the contents of a path from a zip file asset as an InputStream,
	 * optionally loading the resource directly using a class loader.
	 * 
	 * @param path
	 * @param zipOnly
	 * @return
	 */
	private static InputStream getAssetStream(String path, boolean zipOnly) {
		URL url = null;
		url = getInstance()._getURLFromPath(path, true);
		if (url == null && !zipOnly) {
			url = Assets.class.getClassLoader().getResource(path);
		}
		try {
			return (url == null ? null : url.openStream());
		} catch (Throwable t) {
		}
		return null;
	}
	/**
	 * Determine the path to an asset. If not found in a zip file asset, return the
	 * absolute path to this resource.
	 * 
	 * @param fullPath
	 * @return
	 */
	public static URL getURLFromPath(String fullPath) {
		return getInstance()._getURLFromPath(fullPath, false);
	}

	/**
	 * Determine the path to an asset. If not found in a zip file asset, optionally
	 * return null or the absolute path to this resource.
	 * 
	 * @param fullPath
	 * @param zipOnly
	 * @return the URL to this asset, or null if not found.
	 */
	public static URL getURLFromPath(String fullPath, boolean zipOnly) {
		return getInstance()._getURLFromPath(fullPath, zipOnly);
	}

	private URL _getURLFromPath(String fullPath, boolean zipOnly) {
		URL url = null;
		try {
			if (!fullPath.startsWith("/TEMP/")) {
				if (fullPath.startsWith("/"))
					fullPath = fullPath.substring(1);
				for (int i = sortedList.length; --i >= 0;) {
					if (fullPath.startsWith(sortedList[i])) {
						url = assetsByPath.get(sortedList[i]).getURL(fullPath);
						ZipEntry ze = findZipEntry(url);
						if (ze == null) {
							url = null;
							break;
						}
						if (isJS) {
							jsutil.setURLBytes(url, jsutil.getZipBytes(ze));
						}
						break;
					}
				}
			}
			if (url == null && !zipOnly)
				url = getAbsoluteURL((fullPath.startsWith("TEMP/") ? "/" + fullPath : fullPath));
		} catch (MalformedURLException e) {
		}
		if (debugging) {
			System.out.println("Assets.getURLFromPath " + url);
		}
		return url;
	}

	public static ZipEntry findZipEntry(URL url) {
		if (url == null)
			return null;
		String[] parts = getJarURLParts(url.toString());
		if (parts == null || parts[0] == null || parts[1].length() == 0)
			return null;
		return findZipEntry(parts[0], parts[1]);
	}

	public static ZipEntry findZipEntry(String zipFile, String fileName) {
		Map<String, ZipEntry> map = getZipContents(zipFile);
		return (map == null ? null : map.get(fileName));
	}

	/**
	 * Gets the contents of a zip file.
	 * 
	 * @param zipPath the path to the zip file
	 * @return a set of file names in alphabetical order
	 */
	public static Map<String, ZipEntry> getZipContents(String zipPath) {
		return getInstance()._getZipContents(zipPath);
	}

	public static boolean notFound(String zipPath) {
		return (nullResources != null && nullResources.contains(zipPath));
	}
	
	public static void setNotFound(String zipPath) {
		if (nullResources == null) {
			nullResources = new HashSet<>();
		}		
		nullResources.add(zipPath);
	}

	private Map<String, ZipEntry> _getZipContents(String zipPath) {
		if (notFound(zipPath))
			return null;
		URL url = getURLWithCachedBytes(zipPath); // BH carry over bytes if we have them already
		Map<String, ZipEntry> fileNames = htZipContents.get(url.toString());
		if (fileNames != null)
			return fileNames;
		try {
			// Scan URL zip stream for files.
			return readZipContents(url.openStream(), url);
		} catch (Exception ex) {
			System.err.println("Assets: " + zipPath + " could not be opened");
			setNotFound(zipPath);
			return null;
		}
	}

	/**
	 * Deconstruct a jar URL into two parts, before and after "!/".
	 * 
	 * @param source
	 * @return
	 */
	public static String[] getJarURLParts(String source) {
		int n = source.indexOf("!/");
		if (n < 0)
			return null;
		String jarfile = source.substring(0, n).replace("jar:", "");
		while (jarfile.startsWith("//"))
			jarfile = jarfile.substring(1);
		return new String[] { jarfile, (n == source.length() - 2 ? null : source.substring(n + 2)) };
	}

	/**
	 * Get the contents of any URL as a byte array. This method does not do any asset check. It just gets the url data as a byte array.
	 * 
	 * @param url
	 * @return byte[]
	 * 
	 * @author hansonr
	 */
	public static byte[] getURLContents(URL url) {
		if (url == null)
			return null;
		try {
			if (isJS) {
				// Java 9! return new String(url.openStream().readAllBytes());
				return jsutil.readAllBytes(url.openStream());
			}
			return getLimitedStreamBytes(url.openStream(), -1, null);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 
	 * Convert a file path to a URL, retrieving any cached file data, as from DnD.
	 * Do not do any actual data transfer. This is a swingjs.JSUtil service.
	 * 
	 * @param path
	 * @return
	 */
	private static URL getURLWithCachedBytes(String path) {
		URL url = getAbsoluteURL(path);
		if (url != null)
			addJSCachedBytes(url);
		return url;
	}

	private Map<String, ZipEntry> readZipContents(InputStream is, URL url) throws IOException {
		HashMap<String, ZipEntry> fileNames = new HashMap<String, ZipEntry>();
		if (doCacheZipContents)
			htZipContents.put(url.toString(), fileNames);
		ZipInputStream input = new ZipInputStream(is);
		ZipEntry zipEntry = null;
		int n = 0;
		while ((zipEntry = input.getNextEntry()) != null) {
			if (zipEntry.isDirectory() || zipEntry.getSize() == 0)
				continue;
			n++;
			String fileName = zipEntry.getName();
			fileNames.put(fileName, zipEntry); // Java has no use for the ZipEntry, but JavaScript can read it.
		}
		input.close();
		System.out.println("Assets: " + n + " zip entries found in " + url); //$NON-NLS-1$
		return fileNames;
	}

	private void resort() {
		sortedList = new String[assetsByPath.size()];
		int i = 0;
		for (String path : assetsByPath.keySet()) {
			sortedList[i++] = path;
		}
		Arrays.sort(sortedList);
	}


	/**
	 * Only needed for Java
	 * 
	 * @param is
	 * @param n
	 * @param out
	 * @return
	 * @throws IOException
	 */
	private static byte[] getLimitedStreamBytes(InputStream is, int n, OutputStream out) throws IOException {

		// Note: You cannot use InputStream.available() to reliably read
		// zip data from the web.

		boolean toOut = (out != null);
		int buflen = (n > 0 && n < 1024 ? (int) n : 1024);
		byte[] buf = new byte[buflen];
		byte[] bytes = (out == null ? new byte[n < 0 ? 4096 : (int) n] : null);
		int len = 0;
		int totalLen = 0;
		if (n < 0)
			n = Integer.MAX_VALUE;
		while (totalLen < n && (len = is.read(buf, 0, buflen)) > 0) {
			totalLen += len;
			if (toOut) {
				out.write(buf, 0, len);
			} else {
				if (totalLen > bytes.length)
					bytes = Arrays.copyOf(bytes, totalLen * 2);
				System.arraycopy(buf, 0, bytes, totalLen - len, len);
				if (n != Integer.MAX_VALUE && totalLen + buflen > bytes.length)
					buflen = bytes.length - totalLen;
			}
		}
		if (toOut)
			return null;
		if (totalLen == bytes.length)
			return bytes;
		buf = new byte[totalLen];
		System.arraycopy(bytes, 0, buf, 0, totalLen);
		return buf;
	}

	/**
	 * Return all assets in the form that is appropriate for the Info.assets value in SwingJS.
	 * 
	 */
	@Override
	public String toString() {
		String s = "[";
		for (int i = 0; i < sortedList.length; i++) {
			Asset a = assetsByPath.get(sortedList[i]);
			s += (i == 0 ? "" : ",") + a;
		}
		return s + "]";
	}

}
