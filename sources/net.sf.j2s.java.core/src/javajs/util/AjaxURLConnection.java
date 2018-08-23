package javajs.util;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

import javajs.api.js.J2SObjectInterface;

/**
 * 
 * A method to allow a JavaScript Ajax 
 * 
 */
public class AjaxURLConnection extends HttpURLConnection {

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
   * 
   * @param isBinary 
   * 
   * @return file data as a javajs.util.SB or byte[] depending upon the file
   *         type.
   * 
   * 
   */
  @SuppressWarnings("null")
  private Object doAjax(boolean isBinary) {
    J2SObjectInterface J2S = /** @j2sNative self.J2S || */ null;
    return J2S.doAjax(url.toString(), postOut, bytesOut, isBinary);
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
		BufferedInputStream is = getAttachedStreamData(url, false);
		return (is == null ? attachStreamData(url, doAjax(true)) : is);
	}

	/**
	 * J2S will attach the data (String, SB, or byte[]) to any URL that is 
	 * retrieved using a ClassLoader. This improves performance by
	 * not going back to the server every time a second time, since
	 * the first time in Java is usually just to see if it exists. 
	 * 
	 * @param url
	 * @return String, SB, or byte[]
	 */
	public static BufferedInputStream getAttachedStreamData(URL url, boolean andDelete) {
	
		Object data = null;
		/**
		 * @j2sNative
		 * 
		 *       data = url._streamData;
		 *       if (andDelete) url._streamData = null;
		 */
		return (data == null ? null : Rdr.toBIS(data));
	}

   public static BufferedInputStream attachStreamData(URL url, Object o) {
	   /**
	    * @j2sNative
	    * 
	    *   url._streamData = o;
	    */
	   
	    return (o == null ? null : Rdr.toBIS(o));
  }

  /**
   * @return javajs.util.SB or byte[], depending upon the file type
   */
  public Object getContents() {
    return doAjax(false);
  }

  @Override
  public int getResponseCode() throws IOException {
      /*
       * We're got the response code already
       */
      if (responseCode != -1) {
          return responseCode;
      }

      /*
       * Ensure that we have connected to the server. Record
       * exception as we need to re-throw it if there isn't
       * a status line.
       */
      Exception exc = null;
      try {
          BufferedInputStream is = (BufferedInputStream) getInputStream();
          if (is.available() > 40)
          	return responseCode = HTTP_OK;
          is.mark(15);
          byte[] bytes = new byte[13];
          is.read(bytes);
          is.reset();
          String s = new String(bytes);
          if (s.startsWith("Network Error"))
          	return responseCode = HTTP_NOT_FOUND;
      } catch (Exception e) {
          exc = e;
      }      
    	return responseCode = HTTP_INTERNAL_ERROR;
  }
@Override
public void disconnect() {
	// TODO Auto-generated method stub
	
}

@Override
public boolean usingProxy() {
	// TODO Auto-generated method stub
	return false;
}

}
