package javajs.util;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javajs.api.js.J2SObjectInterface;

/**
 * 
 * A method to allow a JavaScript Ajax
 * 
 */
public class AjaxURLConnection extends HttpURLConnection {

	public static class AjaxHttpsURLConnection extends AjaxURLConnection {

		static {
			/**
			 * @j2sNative C$.implementz = [Clazz.load("javax.net.ssl.HttpsURLConnection")];
			 * 
			 */
		}

		protected AjaxHttpsURLConnection(URL url) {
			super(url);
		}

	}

	public static URLConnection newConnection(URL url) {
		return (url.getProtocol() == "https" ? new AjaxHttpsURLConnection(url) : new AjaxURLConnection(url));
	}

	protected AjaxURLConnection(URL url) {
		super(url);
		ajax = /** @j2sNative url.ajax || */
				null;
	}

	byte[] bytesOut;
	String postOut = "";
	ByteArrayOutputStream streamOut;

	private Object ajax;

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
	getBytesOut();
    J2SObjectInterface J2S = /** @j2sNative self.J2S || */ null;
    Object info = null;
    /** @j2sNative
     * 
     *  info = this.ajax || {};
     *  if (!info.dataType) {
     *    info.isBinary = !!isBinary;
     *  }
     */

    Map<String, List<String>> map = getRequestProperties();
    boolean isnocache = false;
    String type = null;
    if (map != null) {
    	// Unfortunately, AJAX now disallows just about all headers. 
    	// Even cache-control can be blocked.
    	// We could set this up to check if it is cross-domain CORS and
    	// then not do this. But for now just not allowing headers.
    	for (Entry<String, List<String>> e : map.entrySet()) {
    		String key = e.getKey();
    		switch (key.toLowerCase()) {
    		case "content-type":
    			type = e.getValue().get(0);
    			break;
    		case "cache-control":
    			isnocache = e.getValue().get(0).equalsIgnoreCase("no-cache");
    			break;
    		}
    		String s = "";
    		List<String>values = e.getValue();
    		for (int i = 0; i < values.size(); i++) {
    			s += (i == 0 ? "" : ", ") + values.get(i);
    		}
    		if (s.length() > 0) {
            	/**
            	 * For now we are not enabling this. Causes too 
            	 * much problem with CORS.
            	 * 
            	 * @j2sNative 
            	 *  
            	 * info.headers || (info.headers = {});
            	 *  //info.headers[key] = s; 
            	 */
    		}	
    	}
    }
    if ("application/json".equals(type)) {
    	// Hack here we are turning off the content type for CORS for VBRC
    	/**
    	 * @j2sNative 
    	 * 
    	 * info.contentType = false;
    	 */
    }
    String myURL = url.toString();
    
    
    Object result = J2S.doAjax(myURL, postOut, bytesOut, info);
    boolean isEmpty = false;
    // the problem is that jsmol.php is still returning crlf even if output is 0 bytes
    // and it is not passing through the not-found state, just 200
    /**
     * @j2sNative
     * 
     *    isEmpty = (!result || result.length == 2 && result[0] == 13 && result[1] == 10);
     *    if (isEmpty)
     *      result = new Int8Array;
     *    
     *     
     */
    responseCode = isEmpty ? HTTP_NOT_FOUND : /** @j2sNative info.xhr.status || */0;
    return result;
  }

	@Override
	public void connect() throws IOException {
		// not expected to be used.
	}

	public void outputBytes(byte[] bytes) {
		// type = "application/octet-stream;";
		bytesOut = bytes;
	}
	
	private byte[] getBytesOut() {
		if (streamOut != null) {
			bytesOut = streamOut.toByteArray();
			streamOut = null;
		}
		return bytesOut;
	}

	public void outputString(String post) {
		postOut = post;
		// type = "application/x-www-form-urlencoded";
	}

	@Override
	public OutputStream getOutputStream() throws IOException {
		return streamOut = new ByteArrayOutputStream();
	}

	@Override
	public InputStream getInputStream() throws FileNotFoundException {
		responseCode = -1;
		InputStream is = getInputStreamAndResponse(false);
		if (is == null)
			throw new FileNotFoundException("opening " + url);
		return is;
	}

	private InputStream getInputStreamAndResponse(boolean allowNWError) {
		BufferedInputStream is = getAttachedStreamData(url, false);
		if (is != null || doCache() 
				&& (is = getCachedStream(allowNWError)) != null) {
			return is;
		}
		is = attachStreamData(url, doAjax(ajax == null));
		if (doCache() && is != null) {
			isNetworkError(is);
			setCachedStream();
			return is;
		}
		if (!isNetworkError(is)) {
		}
		return is;
	}

	/**
	 * We have to consider that POST is not 
	 */
	private boolean doCache() {
		if (!useCaches || !getRequestMethod().equals("POST")) {
			return useCaches;
		}
		String cc = getRequestProperty("Cache-Control");
		return cc == null || !cc.equals("no-cache");
	}

	 static Map<String, Object> urlCache = new Hashtable<String, Object>();

	private BufferedInputStream getCachedStream(boolean allowNWError) {
		Object data = urlCache.get(getCacheKey());
		if (data == null)
			return null;
		URL url = this.url;
		boolean isAjax = /** @j2sNative url.ajax || */
				false;
		BufferedInputStream bis = getBIS(data, isAjax);
		return (!isNetworkError(bis) || allowNWError ? bis : null);
	}

	private static BufferedInputStream getBIS(Object data, boolean isJSON) {
		if (data == null)
			return null;
		BufferedInputStream bis = Rdr.toBIS(data);
		if (isJSON) {
		/**
		 * @j2sNative
		 * 
		 * 			bis._jsonData = data;
		 */
		}
		return bis;
	}

	@SuppressWarnings("unused")
	private void setCachedStream() {
		Object data = /** @j2sNative this.url._streamData || */
				null;
		if (data != null) {
			int code = this.responseCode;
			/**
			 * @j2sNative data._responseCode = code;
			 */
			urlCache.put(getCacheKey(), data);
		}
	}

	private String getCacheKey() {
		String key = url.toString();
		if (getRequestMethod().equals("POST")) {
			key += (postOut != null ? postOut.hashCode() : 0)
					| (getBytesOut() != null ? getBytesOut().hashCode() : 0);
		}
		return key;
	}

	@SuppressWarnings("unused")
	private boolean isNetworkError(BufferedInputStream is) {
		if (is != null) {
			responseCode = HTTP_OK;
			if (/** @j2sNative is._jsonData || */
			false)
				return false;
			is.mark(15);
			byte[] bytes = new byte[13];
			try {
				is.read(bytes);
				is.reset();
				for (int i = NETWORK_ERROR.length; --i >= 0;)
					if (bytes[i] != NETWORK_ERROR[i])
						return false;
			} catch (IOException e) {
			}
		}
		responseCode = HTTP_NOT_FOUND;
		return true;
	}

	final private static int[] NETWORK_ERROR = new int[] { 78, 101, 116, 119, 111, 114, 107, 69, 114, 114, 111, 114 };

	/**
	 * J2S will attach the data (String, SB, or byte[]) to any URL that is retrieved
	 * using a ClassLoader. This improves performance by not going back to the
	 * server every time a second time, since the first time in Java is usually just
	 * to see if it exists.
	 * 
	 * @param url
	 * @return String, SB, or byte[], or JSON data
	 */
	@SuppressWarnings("unused")
	public static BufferedInputStream getAttachedStreamData(URL url, boolean andDelete) {

		Object data = null;
		boolean isJSON = false;
		/**
		 * @j2sNative data = url._streamData; if (andDelete) url._streamData = null;
		 *            isJSON = (data && url.ajax && url.ajax.dataType == "json")
		 */
		return getBIS(data, isJSON);
	}

	/**
	 * 
	 * @param url
	 * @param o
	 * @return InputStream or possibly a wrapper for an empty string, but also with
	 *         JSON data.
	 */
	public static BufferedInputStream attachStreamData(URL url, Object o) {
		/**
		 * @j2sNative
		 * 
		 * 			url._streamData = o;
		 */

		return getBIS(o, /** @j2sNative url.ajax || */
				false);
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
		 * Check to see if have the response code already
		 */
		if (responseCode == -1) {
			/*
			 * Ensure that we have connected to the server. Record exception as we need to
			 * re-throw it if there isn't a status line.
			 */
			try {
				getInputStreamAndResponse(true);
			} catch (Exception e) {
			}
		}
		return responseCode;
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

	@Override
	public int getContentLength() {
		try {
			InputStream is = getInputStream();
			return is.available();
		} catch (IOException e) {
			return -1;
		}
	}

	@Override
	public String toString() {
		return (url == null ? "[AjaxURLConnection]" : url.toString());
	}
}
