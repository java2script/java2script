package javajs.util;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

import javajs.api.ResettableStream;
import javajs.api.js.J2SObjectInterface;

/**
 * 
 * A method to allow a JavaScript Ajax 
 * 
 */
public class AjaxURLConnection extends URLConnection {

  protected AjaxURLConnection(URL url) {
    super(url);
  }

  byte[] bytesOut;
  String postOut = "";

  /**
   * 
   * doAjax() is where the synchronous call to AJAX is to happen. or at least
   * where we wait for the asynchronous call to return. This method should fill
   * the dataIn field with either a string or byte array, or null if you want to
   * throw an error.
   * 
   * url, bytesOut, and postOut are all available for use
   * 
   * the method is "private", but in JavaScript that can still be overloaded.
   * Just set something to org.jmol.awtjs.JmolURLConnection.prototype.doAjax
   * 
   * @return file data as a javajs.util.SB or byte[] depending upon the file
   *         type.
   * 
   * 
   */
  @SuppressWarnings("null")
  private Object doAjax(boolean isBinary) {
    J2SObjectInterface jmol = null;
    /**
     * @j2sNative
     * 
     *            jmol = J2S || Jmol;
     * 
     */
    {
    }
    return jmol._doAjax(url, postOut, bytesOut, isBinary);
  }

  @Override
  public void connect() throws IOException {
    // not expected to be used. 
  }

  public void outputBytes(byte[] bytes) {
    //      type = "application/octet-stream;";
    bytesOut = bytes;
  }

  public void outputString(String post) {
    postOut = post;
    //     type = "application/x-www-form-urlencoded";
  }

	@Override
	public InputStream getInputStream() {
		BufferedInputStream bis = getAttachedStreamData(url);
		if (bis != null)
			return bis;
		Object o = doAjax(true);
		return (
				AU.isAB(o) ? Rdr.getBIS((byte[]) o) 
				: o instanceof SB ? Rdr.getBIS(Rdr.getBytesFromSB((SB) o)) 
				: o instanceof String ? Rdr.getBIS(((String) o).getBytes()) 
				: bis
		);
	}
  @SuppressWarnings("unused")
	/**
	 * J2S will attach a BufferedInputStream to any URL that is 
	 * retrieved using a ClassLoader. This improves performance by
	 * not going back to the server every time a second time, since
	 * the first time in Java is usually just to see if it exists. 
	 * 
	 * This stream can be re-used, but it has to be reset. Java for some 
	 * reason does not allow  a BufferedInputStream to fully reset its 
	 * inner streams. We enable that by force-casting the stream as a 
	 * javax.io stream and then applying resetStream() to that. 
	 * 
	 * 
	 * @param url
	 * @return
	 */
	public static BufferedInputStream getAttachedStreamData(URL url) {
		BufferedInputStream bis = null;
		/**
		 * @j2sNative
		 * 
		 *            bis = url._streamData;
		 */
		{
		}
		if (bis != null)
			((ResettableStream) (Object) bis).resetStream();
		return bis;
	}

	/**
   * @return javajs.util.SB or byte[], depending upon the file type
   */
  public Object getContents() {
    return doAjax(false);
  }

}
