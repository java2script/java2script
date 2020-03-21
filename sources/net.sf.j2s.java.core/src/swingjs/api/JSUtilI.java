package swingjs.api;

import java.awt.Component;
import java.io.File;
import java.io.InputStream;
import java.net.URL;
import java.util.HashMap;
import java.util.Properties;

import swingjs.api.js.HTML5Applet;

public interface JSUtilI {

	/**
	 * Indicate to SwingJS that the given file type is binary.
	 * 
	 * @param ext
	 */
	void addBinaryFileType(String ext);

	/**
	 * Indicate to SwingJS that we can load files using AJAX from the given domain,
	 * such as "www.stolaf.edu", because we know that CORS access has been provided.
	 * 
	 * @param domain
	 */
	void addDirectDatabaseCall(String domain);

	/**
	 * Cache or uncache data under the given path name.
	 * 
	 * @param path
	 * @param data null to remove from the cache
	 */
	void cachePathData(String path, Object data);

	/**
	 * Get the HTML5 object corresponding to the specified Component, or the current thread if null.
	 * 
	 * @param c  the associated component, or null for the current thread
	 * @return HTML5 applet object
	 */
	HTML5Applet getAppletForComponent(Component c);

	/**
	 * Get an attribute applet.foo for the applet found using getApplet(null).
	 * 
	 * @param key
	 * @return
	 */
	Object getAppletAttribute(String key);

	/**
	 * Get the code base (swingjs/j2s, probably) for the applet found using
	 * getApplet(null).
	 * 
	 * @return
	 */
	URL getCodeBase();

	/**
	 * Get the document base (wherever the page is) for the applet found using
	 * getApplet(null).
	 * 
	 * @return
	 */

	URL getDocumentBase();

	/**
	 * Get an attribute from the div on the page that is associated with this frame,
	 * i.e. with id frame.getName() + "-div".
	 * 
	 * @param frame
	 * @param type  "node" or "dim"
	 * @return
	 */
	Object getEmbeddedAttribute(Component frame, String type);

	/**
	 * Get a file synchronously.
	 * 
	 * @param path
	 * @param asString true for String; false for byte[]
	 * @return byte[] or String
	 */
	Object getFile(String path, boolean asString);

	/**
	 * Get the 秘bytes field associated with a file, but only if the File object itself has
	 * them attached, not downloading them.
	 * 
	 * @param f
	 * @return
	 */
	byte[] getBytes(File f);

	/**
	 * Retrieve a HashMap consisting of whatever the application wants, but
	 * guaranteed to be unique to this app context, that is, for the applet found using
	 * getApplet(null).
	 * 
	 * @param contextKey
	 * @return
	 */
	HashMap<?, ?> getJSContext(Object contextKey);

	/**
	 * Load a resource -- probably a core file -- if and only if a particular class
	 * has not been instantialized. We use a String here because if we used a .class
	 * object, that reference itself would simply load the class, and we want the
	 * core package to include that as well.
	 * 
	 * @param resourcePath
	 * @param className
	 */
	void loadResourceIfClassUnknown(String resource, String className);

	/**
	 * Read all applet.__Info properties  for the applet found using
	 * getApplet(null) that start with the given prefix, such as "jalview_".
	 * A null prefix retrieves all properties. Note that non-string properties will be
	 * stringified.
	 * 
	 * @param prefix an application prefix, or null for all properties
	 * @param p      properties to be appended to
	 */
	void readInfoProperties(String prefix, Properties p);

	/**
	 * Set an attribute for the applet found using
	 * getApplet(null). That is, applet[key] = val.
	 * 
	 * @param key
	 * @param val
	 */
	void setAppletAttribute(String key, Object val);

	/**
	 * Set an attribute of applet's Info map for the applet found using
	 * getApplet(null). That is, applet.__Info[key] = val.
	 * 
	 * @param infoKey
	 * @param val
	 */
	void setAppletInfo(String infoKey, Object val);

	/**
	 * Set the given File object's 秘bytes field from an InputStream or a byte[] array.
	 * If the file is a JSTempFile, then also cache those bytes.
	 * 
	 * @param f
	 * @param isOrBytes BufferedInputStream, ByteArrayInputStream, FileInputStream, or byte[]
	 * @return
	 */
	boolean setFileBytes(File f, Object isOrBytes);

	/**
	 * Same as setFileBytes, but also caches the data if it is a JSTempFile.
	 * 
	 * @param is
	 * @param outFile
	 * @return
	 */
	boolean streamToFile(InputStream is, File outFile);

	  /**
	   * Switch the flag in SwingJS to use or not use the JavaScript Map object in
	   * Hashtable, HashMap, and HashSet. Default is enabled.
	   * 	   * 
	   */
	void setJavaScriptMapObjectEnabled(boolean enabled);

}
