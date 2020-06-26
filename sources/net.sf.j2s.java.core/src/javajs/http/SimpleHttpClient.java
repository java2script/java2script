package javajs.http;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.function.Function;

/**
 * SwingJS implementation of javajs.http.HttpClient and associated classes.
 * 
 * Works in Java and JavaScript without any reference to org.apache.http classes.
 * 
 * Can be initialized either directly or via HttpClientFactory.getDefault().
 * 
 * For more details on HTTP methods see:
 * https://www.w3schools.com/tags/ref_httpmethods.asp
 * 
 * For more information about JavaScript FormData, see:
 * https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
 * 
 * The SimpleHttpClient is very light -- just a constructor and five methods,
 * providing limited access to HttpRequest and HttpResponse implementations.
 * 
 * 
 * @author Bob Hanson
 * @author Mateusz Warowny
 * 
 */
class SimpleHttpClient implements HttpClient {

	SimpleHttpClient() {
		// for reflection
	}

	// no OPTIONS, no TRACE

	@Override
	public HttpRequest get(URI uri) {
		return new Request(uri, "GET");
	}

	@Override
	public HttpRequest head(URI uri) {
		return new Request(uri, "HEAD");
	}

	@Override
	public HttpRequest post(URI uri) {
		return new Request(uri, "POST");

	}

	@Override
	public HttpRequest put(URI uri) {
		return new Request(uri, "PUT");
	}

	@Override
	public HttpRequest delete(URI uri) {
		return new Request(uri, "DELETE");
	}

	/**
	 * JavaScript only.
	 * 
	 * Template class implementing just two abstract methods.
	 * 
	 * Added here to allow this class to be placed in Java projects without the need
	 * to maintain the actual javajs.util.AjaxURLConnection class itself.
	 * 
	 * AjaxURLConneciton is an interface with all the body methods necessary to
	 * handle simple HTTP and HTTPS connectivity.
	 * 
	 * The AjaxURLConnection class handles all the necessary work of creating
	 * JavaScript blobs, adding them to a FormData object, and firing off a
	 * synchronous or asynchronous jQuery.ajax() call via j2sApplet.js.
	 * 
	 * @author hansonr
	 *
	 */
	abstract class AjaxURLConnection extends HttpURLConnection {

		protected AjaxURLConnection(URL u) {
			super(u);
		}

		public abstract void addFormData(String name, Object value, String contentType, String fileName);

		// not @Override, because that method is only in SwingJS, and this class is portable
		public abstract void getBytesAsync(Function<byte[], Void> whenDone);

	}

	class Request implements HttpRequest {

		 class FormData {

			private final String name;
			private final Object data;
			private final String contentType;
			private final String fileName;

			public FormData(String name, Object data, String contentType, String fileName) {
				this.name = name;
				this.data = data;
				this.contentType = contentType;
				this.fileName = fileName;
			}

			String getName() {
				return name;
			}

			Object getData() {
				return data;
			}

			String getContentType() {
				return contentType;
			}

			String getFileName() {
				return fileName;
			}

		}

		/**
		 * the source URI
		 */
		private URI uri;

		/**
		 * GET, HEAD, POST, PUT, or DELETE
		 */
		private String method;

		/**
		 * headers, mostly ignored in SwingJS and AJAX
		 * 
		 */
		private Map<String, String> htHeaders = new HashMap<>();

		/**
		 * GET and POST data
		 */
		private List<FormData> formData;

		/**
		 * when TRUE, all parameters and files are transmitted as binary data in
		 * multipart/form-data format
		 */
		private boolean hasFormBody = false;

		Request(URI uri, String method) {
			this.uri = uri;
			this.method = method.toUpperCase();
			switch (method) {
			case "GET":
			case "DELETE":
				hasFormBody = false;
				break;
			case "HEAD":
				hasFormBody = false;
				break;
			case "PUT":
			case "POST":
				hasFormBody = true;
				break;
			}
		}

		@Override
		public String getMethod() {
			return method;
		}

		@Override
		public URI getUri() {
			return uri;
		}

		@Override
		public HttpRequest addHeader(String name, String value) {
			htHeaders.put(name, value);
			return this;
		}

		@Override
		public HttpRequest addParameter(String name, String value) {
			return addFormField(name, value, null, null);
		}

		@Override
		public HttpRequest addFile(String name, File file) {
			return addFormField(name, toBytes(file), "application/octet-stream", file.getName());
		}


		@Override
		public HttpRequest addFile(String name, InputStream stream) {
			return addFormField(name, toBytes(stream), "application/octet-stream", null);
		}

		/**
		 * @param name
		 * @param data can be String, byte[], File, or InputStream
		 * @param contentType
		 * @param fileName
		 */
		@Override
		public HttpRequest addFormField(String name, Object data, String contentType, String fileName) {
			if (data == null) {
				removeFormField(name);
				return this;
			}
			if (formData == null)
				formData = new ArrayList<>();
			formData.add(new FormData(name, data instanceof String ? data : toBytes(data), contentType, fileName));
			return this;
		}

		@Override
		public boolean removeFormField(String name) {
			if (formData != null)
				for (int i = 0; i < formData.size(); i++)
					if (formData.get(i).getName().equals(name)) {
						return (formData.remove(i) != null);
					}
			return false;
		}
		
		private byte[] toBytes(Object data) {
			try {
				if (data == null || data instanceof byte[]) {
				} else if (data instanceof File) {
					FileInputStream fis = new FileInputStream((File) data);
					data = getBytes(fis);
					fis.close();
				} else if (data instanceof InputStream) {
					InputStream is = (InputStream) data;
					data = getBytes(is);
					is.close();
				} else {
					data = data.toString().getBytes();
				}
			} catch (IOException e) {
			}
			return (byte[]) data;
		}

		@Override
		public HttpResponse execute() throws IOException {
			return executeImpl(new Response(null, null, null));
		}

		@Override
		public void executeAsync(Consumer<HttpResponse> succeed,
				BiConsumer<HttpResponse, ? super IOException> fail, BiConsumer<HttpResponse, ? super IOException> always) {
			executeImpl(new Response(succeed, fail, always));
		}

		private HttpResponse executeImpl(Response r) {
			Runnable runner = new Runnable() {

				@Override
				public void run() {
					try {
						if (hasFormBody)
							fulfillPost(r);
						else
							fulfillGet(r);
					} catch (Throwable e) {
						r.handleError(e);
					}
				}

			};
			if (r.isAsync)
				new Thread(runner).start();
			else
				runner.run();
			return r;
		}

		private Response fulfillGet(Response r) throws IOException {
			URL url;
			String data = "";
			if (formData != null) {
				Map<String, String> htGetParams = new LinkedHashMap<>();
				for (int i = 0; i < formData.size(); i++) {
					FormData fd = formData.get(i);
					htGetParams.put(fd.getName(), fd.getData().toString());
				}
				for (Entry<String, String> e : htGetParams.entrySet()) {
					data += e.getKey() + "=" + encodeURI(e.getValue());
				}
			}
			if (data.length() > 0) {
				url = new URL(uri.toString() + "?" + data);
			} else {
				url = uri.toURL();
			}
			return r.getResponse(getConnection(url), this);
		}

		private String encodeURI(String value) {
			try {
				// convert " " to "%20", not "+"
				// based on https://stackoverflow.com/questions/2678551/when-to-encode-space-to-plus-or-20
				// Answer # 46. and "URI Generic Syntax " https://tools.ietf.org/html/rfc3986
				// This will be consistent, then, with JavaScript encodeURIComponent().
				return URLEncoder.encode(value.replace(' ', '\0'), "UTF-8").replaceAll("%00", "%20");
			} catch (UnsupportedEncodingException e) {
				// impossible
				return null;
			}
		}

		private Response fulfillPost(Response r) throws IOException {
			HttpURLConnection conn = getConnection(uri.toURL());
			sendFormData(conn, formData);
			return r.getResponse(conn, this);
		}
		
		@SuppressWarnings("unused")
		private void sendFormData(HttpURLConnection conn, List<FormData> formData) throws IOException {
			if (formData == null)
				return;
			/**
			 * @j2sIgnore
			 */
			{
				JavaHttpPoster.post(conn, formData);
				if (true)
					return;
			}
			for (int i = 0, n = formData.size(); i < n; i++) {
				FormData data = formData.get(i);
				((AjaxURLConnection) conn).addFormData(data.name, data.data, data.contentType, data.fileName);
			}
		}

		/**
		 * JavaScript only here.
		 * 
		 * Create a connection that will be a javajs.util.AjaxURLConnection.
		 * 
		 * @param uri
		 * @throws IOException
		 */
		private HttpURLConnection getConnection(URL url) throws IOException {
			try {
				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
				conn.setUseCaches(false);
				if (!method.equals("HEAD"))
					conn.setDoInput(true);
				if (hasFormBody)
					conn.setDoOutput(true);
				conn.setRequestMethod(method);
				for (Entry<String, String> e : htHeaders.entrySet()) {
					conn.addRequestProperty(e.getKey(), e.getValue());
				}
				return conn;
			} catch (MalformedURLException e) {
				throw new IOException(e + ": " + uri);
			}
		}

	}

	 class Response implements HttpResponse {

		private int state = 0;

		/**
		 * set TRUE whenever at least one of succeed, fail, or always, is non-null
		 */
		private boolean isAsync;

		private InputStream inputStream;


		/**
		 * the HTTP(S)URLConnection that will handle this request, actually
		 * javajs.util.AjaxURLConnection
		 */

		private HttpURLConnection conn;

		/**
		 * asynchronous callback functions
		 * 
		 */
		private Consumer<HttpResponse> succeed;
		private BiConsumer<HttpResponse, ? super IOException> fail;
		private BiConsumer<HttpResponse, ? super IOException> always;


		private String method;

		private URI uri;

		Response(Consumer<HttpResponse> succeed, BiConsumer<HttpResponse, ? super IOException> fail,
				BiConsumer<HttpResponse, ? super IOException> always) {
			this.succeed = succeed;
			this.fail = fail;
			this.always = always;
			isAsync = (succeed != null || fail != null || always != null);
		}

		/**
		 * The call to get the response code, initiating a connection and possibly
		 * throwing an UnknownHostException.
		 * 
		 * (Despite the fact that URL.openConnection() has already been issued, and
		 * despite what is in the Java JavaDoc, that call actually does not do anything
		 * for a URLConnection. It goes as far as to create an UNRESOLVED InetSocket,
		 * but no attempt to make an actual connection is made until getInputStream() or
		 * getResponseCode() is called.)
		 * 
		 * @param conn
		 * 
		 * @throws IOException
		 */
		Response getResponse(HttpURLConnection conn, Request request) throws IOException {
			this.conn = conn;
			this.method = request.method;
			this.uri = request.uri;
			state = 0;
			if (!isAsync) {
				// possibly throw an exception here such as UnknownHostException, but not
				// FileNotFound
				state = conn.getResponseCode();
				return this;
			}

			new Thread(new Runnable() {

				@Override
				public void run() {
					// asynchronous methods cannot throw an exception.
					IOException exception = null;
					if (method.equals("HEAD")) {
						try {
							state = conn.getResponseCode();
						} catch (IOException e) {
							exception = e;
						}
						doCallback(state == 0 || state >= 400, exception);
					} else {
						conn.getBytesAsync(new Function<byte[], Void>() {

							@Override
							public Void apply(byte[] t) {
								doCallback(t != null, null);
								return null;
							}

						});
					}
				}
			}).start();
			return this;
		}

		/**
		 * Make the proper callback, depending upon response code and exception state.
		 * 
		 * @param ok
		 */
		protected void doCallback(boolean ok, IOException e) {
			ok &= (e == null);
			if (ok && succeed != null)
				succeed.accept(this);
			else if (!ok && fail != null)
				fail.accept(this, e);
			if (always != null)
				always.accept(this, e);
		}

		/**
		 * Handle any errors that arise in the process of processing this request.
		 * 
		 * @param e
		 * @return true if aSynchronous and has been handled
		 */
		protected boolean handleError(Throwable e) {
						
			if (!(e instanceof IOException)) {
				e = new IOException(e);
			}
			IOException exception = (IOException) e;
			// setting e = null to indicated handled.
			if (isAsync) {
				if (fail != null) {
					fail.accept(this, exception);
					e = null;
				}
				if (always != null) {
					always.accept(this, exception);
					e = null;
				}
			}
			return e == null;
		}

		@Override
		public int getStatusCode() {
			try {
				return (state != 0 ? state : conn.getResponseCode());
			} catch (Throwable e) {
				handleError(e);
				return state;
			}
		}

		@Override
		public Map<String, String> getHeaders() {
			Map<String, String> headers = new LinkedHashMap<>();
			Map<String, List<String>> map = conn.getHeaderFields();
			for (Entry<String, List<String>> e : map.entrySet()) {
				String name = e.getKey();
				List<String> list = e.getValue();
				String val = null;
				for (int i = 0; i < list.size(); i++)
					val = (val == null ? "" : val + ",") + list.get(i);
				if (val != null)
					headers.put(name, val);
			}
			return headers;
		}

		@Override
		public String getText() throws IOException {
			return new String( getBytes(getContent()));
		}

		/**
		 * In SwingJS, this is always a ByteArrayInputStream.
		 */
		@Override
		public InputStream getContent() throws IOException {
			return (inputStream == null ? (inputStream = (InputStream) conn.getInputStream())
					: inputStream);
		}

		@Override
		public void close() {
			conn.disconnect();
		}

		@Override
		public String toString() {
			return "JSHttpClient " + method + " state=" + state + " uri=" + uri;
		}

	}

	public static String getBytes(InputStream is) throws IOException {
	
		// Java 9 version is better:
		//		 return new String(is.readAllBytes());

		ByteArrayOutputStream bos = new ByteArrayOutputStream(0x4000);
		byte[] buf = new byte[0x4000];
		int n = 0, ntotal = 0;
		while((n = is.read(buf)) >= 0) {
			ntotal += n;
			bos.write(buf, 0, n);
		} 
		is.close();
		return new String(bos.toByteArray(), 0, ntotal);

	}

}
