package swingjs.api;

import java.awt.Component;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import javax.swing.JComponent;
import javax.swing.TransferHandler;

import swingjs.api.js.DOMNode.Promise;
import swingjs.api.js.HTML5Applet;

public interface JSUtilI {

  /**
   * The HTML5 canvas delivers [r g b a r g b a ...] which is not a Java option.
   * The closest Java option is TYPE_4BYTE_ABGR, but that is not quite what we
   * need. SwingJS decodes TYPE_4BYTE_HTML5 as TYPE_4BYTE_RGBA"
   * 
   * ColorSpace cs = ColorSpace.getInstance(ColorSpace.CS_sRGB);
   * 
   * int[] nBits = { 8, 8, 8, 8 };
   * 
   * int[] bOffs = { 0, 1, 2, 3 };
   * 
   * colorModel = new ComponentColorModel(cs, nBits, true, false,
   * Transparency.TRANSLUCENT, DataBuffer.TYPE_BYTE);
   * 
   * raster = Raster.createInterleavedRaster(DataBuffer.TYPE_BYTE, width, height,
   * width * 4, 4, bOffs, null);
   * 
   * Note, however, that this buffer type should only be used for direct buffer access
   * using
   * 
   * 
   * 
   */
  public static final int TYPE_4BYTE_HTML5 = -6;
  
  /**
   * The HTML5 VIDEO element wrapped in a BufferedImage. 
   * 
   * To be extended to allow video capture?
   */
  public static final int TYPE_HTML5_VIDEO = Integer.MIN_VALUE;

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
   * Get the applet's __Info map or an attribute of that map for the applet found using
   * getApplet(null). That is, applet.__Info or applet.__Info[InfoKey].
   * 
   * @param infoKey if null, return the full __Info map
   */
  Object getAppletInfo(String infoKey);

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
   * @param type "name", "node", "init", "dim", or any DOM attribute, such as "id"
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

  Promise importModule(String resource, Function<Object, Object> resolve, Function<Object, Object> reject);

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
   * Set the given URL object's _streamData field from an InputStream or a byte[] array.
   * 
   * @param f
   * @param isOrBytes BufferedInputStream, ByteArrayInputStream, FileInputStream, or byte[]
   * @return
   */
  boolean setURLBytes(URL url, Object isOrBytes);

  /**
   * Same as setFileBytes.
   * 
   * @param is
   * @param outFile
   * @return
   */
  boolean streamToFile(InputStream is, File outFile);

    /**
     * Switch the flag in SwingJS to use or not use the JavaScript Map object in
     * Hashtable, HashMap, and HashSet. Default is enabled.
     *     * 
     */
  void setJavaScriptMapObjectEnabled(boolean enabled);


  /**
   * Open a URL in a browser tab.
   * 
   * @param url
   * @param target null or specific tab, such as "_blank"
   */
  void displayURL(String url, String target);

  /**
   * Retrieve cached bytes for a path (with unnormalized name)
   * from J2S._javaFileCache.
   * 
   * @param path
   * 
   * @return byte[] or null
   */
  byte[] getCachedBytes(String path);
  
  /**
   * Attach cached bytes to a file-like object, including URL,
   * or anything having a 秘bytes field (File, URI, Path)
   * from J2S._javaFileCache. That is, allow two such objects
   * to share the same underlying byte[ ] array.
   * 
   * 
   * @param URLorURIorFile
   * @return byte[] or null
   */
  byte[] addJSCachedBytes(Object URLorURIorFile);

  /**
   * Seek an open ZipInputStream to the supplied ZipEntry, if possible.
   * 
   * @param zis the ZipInputStream
   * @param ze  the ZipEntry
   * @return the length of this entry, or -1 if, for whatever reason, this was not possible
   */
  long seekZipEntry(ZipInputStream zis, ZipEntry ze);

  /**
   * Retrieve the byte array associated with a ZipEntry.
   * 
   * @param ze
   * @return
   */
  byte[] getZipBytes(ZipEntry ze);

  /**
   * Java 9 method to read all (remaining) bytes from an InputStream. In SwingJS,
   * this may just create a new reference to an underlying Int8Array without
   * copying it.
   * 
   * @param zis
   * @return
   * @throws IOException 
   */
  byte[] readAllBytes(InputStream zis) throws IOException;

  /**
   * Java 9 method to transfer all (remaining) bytes from an InputStream to an OutputStream.
   * 
   * @param is
   * @param out
   * @return
   * @throws IOException
   */
  long transferTo(InputStream is, OutputStream out) throws IOException;

  /**
   * Retrieve any bytes already attached to this URL.
   * 
   * @param url
   * @return
   */
  byte[] getURLBytes(URL url);

  /**
   * Set a message in the lower-left-hand corner SwingJS status block.
   * 
   * @param msg
   * @param doFadeOut
   */
  void showStatus(String msg, boolean doFadeOut);

  /**
   * Asynchronously retrieve the byte[] for a URL.
   * 
   * @param url
   * @param whenDone
   */
  void getURLBytesAsync(URL url, Function<byte[], Void> whenDone);

  /**
   * Experimental method to completely disable a Swing Component's user interface.
   * 
   * @param jc
   * @param enabled
   */
  void setUIEnabled(JComponent jc, boolean enabled);


  /**
   * Play an audio
   * @param buffer
   * @param format a javax.sound.sampled.AudioFormat
   * @throws Exception 
   */
  void playAudio(byte[] buffer, Object format) throws Exception;

  /**
   * For either an applet or an application, get the ORIGINAL __Info as a Map that
   * has a full set up lower-case keys along with whatever non-all-lower-case keys
   * provided at start-up.
   * 
   * @return
   */
  Map<String, Object> getAppletInfoAsMap();

  
  /**
   * Set the HTML5 applet.getApp() method to this object, for example, This will
   * be the method that page developers use that is similar to the original Java
   * applet object that was accessed via LiveConnect.
   * 
   * @param app
   */
  void setAppClass(Object app);

  /** As of v. 73, not available in Firefox -- will alert the user and return null
   * 
   * @param whenDone  method to capture return asynchronously, returning null only if the 
   * browser does not allow reading the clipboard.
   */
  void getClipboardText(Consumer<String> whenDone);

  /**
   * A more reliable paste listener sets the component's ui.domNode to contentEditable="true",
   * sets an onpaste listener, and converts the JavaScript event's clipboardData.getData()
   * DataTransfer data to a Java Transferable using JSDnD.JSTransferable.
   * 
   * @param c
   * @param handler
   */
  void setPasteListener(Component c, TransferHandler handler);

  /**
   * Get the absolute path to j2s/
   * 
   */
    String getJ2SPath();

}
