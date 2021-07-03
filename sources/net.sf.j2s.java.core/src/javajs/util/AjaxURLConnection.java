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
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.function.Function;

import javajs.api.js.J2SObjectInterface;
import swingjs.api.JSUtilI;

/**
 * 
 * A method to allow a JavaScript Ajax
 * 
 */
public class AjaxURLConnection extends HttpURLConnection {

	static private JSUtilI jsutil = null;
	static {
		try {
			jsutil = (JSUtilI) Class.forName("swingjs.JSUtil").newInstance();
		} catch (InstantiationException | IllegalAccessException | ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

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
	Object info;
	private String statusText;

	@Override
	public String getHeaderField(String name) {
		try {
			if (getResponseCode() != -1) {
				@SuppressWarnings("unused")
				Object info = this.info;
				return /**
						 * @j2sNative info && info.xhr &&
						 *            info.xhr.getResponseHeader(name) ||
						 */
				null;
			}
		} catch (IOException e) {
		}
		return null;
	}

	@SuppressWarnings("unused")
	@Override
	public Map<String, List<String>> getHeaderFields() {
		Map<String, List<String>> map = new HashMap<>();
		try {
			if (getResponseCode() != -1) {
				String[] data = null;
				Object info = this.info;
				/**
				 * @j2sNative data = info && info.xhr &&
				 *            info.xhr.getAllResponseHeaders(); data && (data =
				 *            data.trim().split("\n"));
				 */
				// ["content-length: 996"
				// , "content-type: text/plain; charset=x-user-defined"
				// , "last-modified: Fri, 01 May 2020 11:54:13 GMT"]
				if (data != null) {
					for (int i = 0; i < data.length; i++) {
						String[] parts = data[i].split(":");
						String key = parts[0].trim();
						List<String> list = map.get(key);
						if (list == null)
							map.put(key, list = new ArrayList<>());
						list.add(parts[1].trim());
					}
				}
			}
		} catch (IOException e) {
		}
		return map;
	}

	/**
	 * 
	 * doAjax() is where the synchronous call to AJAX is to happen. or at least
	 * where we wait for the asynchronous call to return. This method should fill
	 * the dataIn field with either a string or byte array, or null if you want to
	 * throw an error.
	 * 
	 * url, bytesOut, and postOut are all available for use
	 * 
	 * the method is "private", but in JavaScript that can still be overloaded. Just
	 * set something to org.jmol.awtjs.JmolURLConnection.prototype.doAjax
	 * 
	 * 
	 * @param isBinary
	 * 
	 * @return file data as a javajs.util.SB or byte[] depending upon the file type.
	 * 
	 * 
	 */
	@SuppressWarnings("null")
	private Object doAjax(boolean isBinary, Function<Object, Void> whenDone) {
		getBytesOut();
		J2SObjectInterface J2S = /** @j2sNative self.J2S || */
				null;
		Object info = ajax;
		/**
		 * @j2sNative
		 * 
		 * 			info = info || {}; if (!info.dataType) { info.isBinary =
		 *            !!isBinary; }
		 * 
		 *            info.type = this.method;
		 * 
		 *            whenDone && (info.fWhenDone =
		 *            function(data){whenDone.apply$O(data)});
		 * 
		 */
		this.info = info;
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
				List<String> values = e.getValue();
				for (int i = 0; i < values.size(); i++) {
					s += (i == 0 ? "" : ", ") + values.get(i);
				}
				if (s.length() > 0) {
					/**
					 * For now we are not enabling this. Causes too much problem with CORS.
					 * 
					 * @j2sNative
					 * 
					 * 			info.headers || (info.headers = {}); //info.headers[key] = s;
					 */
				}
			}
		}
		if ("application/json".equals(type)) {
			// Hack here we are turning off the content type for CORS for VBRC
			/**
			 * @j2sNative
			 * 
			 * 			info.contentType = false;
			 */
		}

		Object result;
		String myURL = url.toString();
		if (myURL.startsWith("file:/TEMP/")) {
			result = jsutil.getCachedBytes(myURL);
			boolean isEmpty = (result == null);
			if (whenDone != null) {
				whenDone.apply(isEmpty ? null : result);
				return null;
			}
			responseCode = (isEmpty ? HTTP_NOT_FOUND : HTTP_ACCEPTED);
			return result;
		}
		if (myURL.startsWith("file:")) {
			String j2s = /** @j2sNative Clazz._Loader.getJ2SLibBase() || */
					null;
			if (myURL.startsWith("file:/./")) {
				// file:/./xxxx
				myURL = j2s + myURL.substring(7);
			} else if (myURL.startsWith("file:/" + j2s)) {
				// from classLoader
				myURL = myURL.substring(6);
			} else {
				String base = getFileDocumentDir();
				if (base != null && myURL.indexOf(base) == 0) {
					myURL = myURL.substring(base.length());
				} else {
					URL path = jsutil.getCodeBase();
					if (path != null) {
						j2s = path.toString();
						if (myURL.indexOf(j2s) >= 0)
							myURL = path + myURL.split(j2s)[1];
						else
							myURL = path + myURL.substring(5);
					}
				}
			}
		}
		result = J2S.doAjax(myURL, postOut, bytesOut, info);
		if (whenDone != null)
			return null;
		setJQueryResponseCodeFromJQuery(result);
		return result;
	}

	private void setJQueryResponseCodeFromJQuery(Object result) {
		// the problem is that jsmol.php is still returning crlf even if output is 0
		// bytes
		// and it is not passing through the not-found state, just 200
		Object info = this.info;
		boolean isEmpty = false;
		/**
		 * @j2sNative
		 * 
		 * 			isEmpty = (!result || result.length == 2 && result[0] == 13 &&
		 *            result[1] == 10); if (isEmpty) result = new Int8Array;
		 */

		statusText = /** @j2sNative info.xhr.statusText || */"";
		responseCode = (!isEmpty ? /** @j2sNative info.xhr.status || */
				0 : getAJAXStatusError());
	}

	private int getAJAXStatusError() {
		@SuppressWarnings("unused")
		Object info = this.info;
		// AJAX cannot distinguish among a network connection error, a method (PUT) error, or a file not found
		return /** @j2sNative info.xhr.status > 0 ? info.xhr.status : !info.xhr.statusText || (info.xhr.statusText+"").indexOf("NetworkError:") == 0 ? 400 : */HTTP_NOT_FOUND;
	}

	private String getFileDocumentDir() {
		String base = jsutil.getDocumentBase().getPath();
		int pt = base.lastIndexOf("/");
		return "file:" + base.substring(0, pt + 1);
	}

	@Override
	public void connect() throws IOException {
		// not expected to be used.
	}

	public void outputBytes(byte[] bytes) {
		// type = "application/octet-stream;";
		bytesOut = bytes;
	}

	private Object formData;

	public void setFormData(Map<String, Object> map) {
		formData = map;
	}

	/**
	 * @j2sAlias addFormData
	 * 
	 * @param name
	 * @param value
	 * @param contentType
	 * @param fileName
	 */
	public void addFormData(String name, Object value, String contentType, String fileName) {
		if (formData == null)
			formData = new Object[0][];
		/**
		 * @j2sNative this.formData.push([name, value, contentType, fileName]);
		 */
	}

	/**
	 * a map of key/value pairs where values are either String or byte[].
	 * 
	 */
	@SuppressWarnings("unused")
	private byte[] getBytesOut() {
		if (streamOut != null) {
			if (formData == null)
				formData = /** @j2sNative this.streamOut._form_data || */
						null;
			if (formData == null) {
				bytesOut = streamOut.toByteArray();
			}
			streamOut = null;
		}

// JavaScript (use ptsv2.com to get a valid toilet)
//
//		fd = new FormData();
//		fd.append("testing", "here");
//		fd.append("andbytes", new Blob([new Int8Array([65,66,67])]));
//
//		                  $.ajax({
//		                      url: 'https://ptsv2.com/t/j1gqe-1592433958/post',
//		                      data: fd,
//		                      processData: false,
//		                      contentType: false,
//		                      type: 'POST',
//		                      success: function(data){
//		                        console.log('upload success!');
//		                      }
//		                    }); 
//

		if (formData != null) {
			String method = ("GET".equals(this.method) ? "POST" : this.method);
			Object map = ajax = (/**
									 * @j2sNative 1 ? { data:new FormData(), processData:false, contentType:false,
									 *            type:method, j2sNoProxy:true } :
									 */
			null);
			if (formData instanceof Map<?, ?>) {
				Map<String, Object> data = (Map<String, Object>) formData;
				for (Entry<String, Object> e : data.entrySet()) {
					String key = e.getKey();
					Object val = e.getValue();
					if (val instanceof byte[]) {
						val = toBlob((byte[]) val, null);
					}
					/** @j2sNative map.data.append(key, val); */
				}
			} else {
				Object[][] adata = (Object[][]) formData;
				for (int i = 0; i < adata.length; i++) {
					Object[] d = adata[i];
					String name = (String) d[0];
					Object value = d[1];
					String contentType = (String) d[2];
					String filename = (String) d[3];
					if (value instanceof String && (contentType != null || filename != null)) {
						value = ((String) value).getBytes();
					}
					if (value instanceof byte[]) {
						value = toBlob((byte[]) value, contentType);
					}
					/**
					 * @j2sNative (filename ? map.data.append(name, value, filename) :
					 *            map.data.append(name, value));
					 */
				}
			}
			formData = null;
			bytesOut = null;
			useCaches = false;
		}
		return bytesOut;
	}

	private static Object toBlob(byte[] val, String contentType) {
		return /**
				 * @j2sNative (contentType == null ? new Blob([val]) : new Blob([val],{type:
				 *            contentType})) ||
				 */
		null;
	}

	public void outputString(String post) {
		postOut = post;
	}

	@Override
	public OutputStream getOutputStream() throws IOException {
		return streamOut = new ByteArrayOutputStream();
	}

	@SuppressWarnings({ "null", "unused" })
  @Override
	public InputStream getInputStream() throws IOException {
	  BufferedInputStream is = /** @j2sNative this.is || */null;
		if (is != null)
			return is;
		responseCode = -1;
		is = getInputStreamAndResponse(false);
		switch (responseCode) {
		
		}
		if (responseCode == HTTP_BAD_REQUEST) {
			throw new java.net.UnknownHostException(url.toString());
		} else if (responseCode > HTTP_BAD_REQUEST && responseCode != 404) {
			throw new IOException("Server returned HTTP response code: " + responseCode + " for URL: " + url); 
		}
		if (is == null)
			throw new FileNotFoundException("opening " + url);
		return is;
	}

	// dont @Override
	public void getBytesAsync(Function<byte[], Void> whenDone) {
		getInputStreamAsync(new Function<InputStream, Void>() {

			@Override
			public Void apply(InputStream is) {
				try {
					if (is != null) {
						whenDone.apply(/** @j2sNative is.readAllBytes$() || */null);
						return null;
					}
				} catch (Exception e) {
				}
				whenDone.apply(null);
				return null;
			}

		});

	}

	@SuppressWarnings({ "null", "unused" })
  private void getInputStreamAsync(Function<InputStream, Void> whenDone) {
	  BufferedInputStream is = /** @j2sNative is = this.is || */null;
		if (is != null) {
			isNetworkError(is);
			whenDone.apply(is);
			return;
		}
		responseCode = -1;
		getInputStreamAndResponseAsync(whenDone);
	}

	private void getInputStreamAndResponseAsync(Function<InputStream, Void> whenDone) {
		BufferedInputStream is = getAttachedStreamData(url, false);
		if (is != null || doCache() && (is = getCachedStream(false)) != null) {
			whenDone.apply(is);
			return;
		}
		doAjax(true, new Function<Object, Void>() {

			@Override
			public Void apply(Object response) {
				if (response instanceof String) {
					whenDone.apply(null);
					return null;
				}
				setJQueryResponseCodeFromJQuery(response);
				BufferedInputStream is = attachStreamData(url, response);
				if (doCache() && is != null) {
					isNetworkError(is);
					setCachedStream();
				} else if (isNetworkError(is)) {
					is = null;
				}
				whenDone.apply(is);
				return null;
			}

		});
	}

	private BufferedInputStream getInputStreamAndResponse(boolean allowNWError) {
		BufferedInputStream is = getAttachedStreamData(url, false);
		if (is != null || doCache() && (is = getCachedStream(allowNWError)) != null) {
			return is;
		}
		is = attachStreamData(url, doAjax(ajax == null, null));
		if (doCache() && is != null) {
			isNetworkError(is);
			setCachedStream();
			return is;
		}
		isNetworkError(is);
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
		@SuppressWarnings("unused")
		URL url = this.url;
		if (data instanceof byte[]) {
			/** @j2sNative url._streamData = data */;
		}
		boolean isAjax = /** @j2sNative url.ajax || */
				false;
		BufferedInputStream bis = getBIS(data, isAjax);
		return (!isNetworkError(bis) || allowNWError ? bis : null);
	}

	private static BufferedInputStream getBIS(Object data, boolean isJSON) {
		if (data == null)
			return null;
		@SuppressWarnings("unused")
		Object jsonData = (isJSON ? data : null);
		if (isJSON) {
			/**
			 * @j2sNative
			 * 
			 * 			data = JSON.stringify(data);
			 */
		}
		BufferedInputStream bis = Rdr.toBIS(data);
		if (isJSON) {
			/**
			 * @j2sNative
			 * 
			 * 			bis._jsonData = jsonData;
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
			key += (postOut != null ? postOut.hashCode() : 0) | (getBytesOut() != null ? getBytesOut().hashCode() : 0);
		}
		return key;
	}

	@SuppressWarnings("unused")
	private boolean isNetworkError(BufferedInputStream is) {
		if (responseCode > 0) {
			return (responseCode >= HTTP_BAD_REQUEST);
		}
		if (is == null) {
			if (ajax != null) {
				responseCode = getAJAXStatusError();
			}
		} else {
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
		return doAjax(false, null);
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
				responseCode = HTTP_BAD_REQUEST;
			}
		} 
		if (responseCode == HTTP_BAD_REQUEST) {
			throw new UnknownHostException(url.toString());
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
