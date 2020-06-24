package javajs.http;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
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
 * Note that none of this code should ever be run in Java. Java implementations
 * should use their own implementations.
 * 
 * Can be initialized either directly or via HttpClientFactory.getDefault().
 * 
 * For more details on HTTP methods see:
 * https://www.w3schools.com/tags/ref_httpmethods.asp
 * 
 * For more information about FormData, see:
 * https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
 * 
 * The JSHttpClient is very light -- just a constructor and five methods,
 * providing limited access to HttpRequest and HttpResponse implementations.
 * 
 * 
 * @author Bob Hanson
 * @author Mateusz Warowny
 * 
 */
public class JSHttpClient implements HttpClient {

	public JSHttpClient() {
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
	 * Template class implementing just two abstract methods.
	 * 
	 * Added here to allow this class to be placed in Java projects without the need
	 * to maintain the actual javajs.util.AjaxURLConnection class itself.
	 * 
	 * Basically an interface with all the body methods of an HttpURLConnection or
	 * HttpsURLConnection.
	 * 
	 * The AjaxURLConnection class handles all the necessary work of creating blobs,
	 * adding them to a FormData object, and firing off a synchronous or
	 * asynchronous jQuery.ajax() call.
	 * 
	 * @author hansonr
	 *
	 */
	public abstract class AjaxURLConnection extends HttpURLConnection {

		protected AjaxURLConnection(URL u) {
			super(u);
		}

		public abstract void addFormData(String name, Object value, String contentType, String fileName);

		public abstract void getBytesAsync(Function<byte[], Void> whenDone);

	}

	public class Request implements HttpRequest {

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
		private Map<String, String> htGetParams = new HashMap<>();
		private List<Object[]> listPostFiles = new ArrayList<>();

		/**
		 * when TRUE, all parameters and files are transmitted as binary data in
		 * multipart/form-data format
		 */
		private boolean hasFormBody = false;

		public Request(URI uri, String method) {
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
			htGetParams.put(name, value);
			return this;
		}

		@Override
		public HttpRequest addFile(String name, File file) {
			listPostFiles.add(new Object[] { name, file });
			return this;
		}

		@Override
		public HttpRequest addFile(String name, InputStream stream) {
			listPostFiles.add(new Object[] { name, stream });
			return this;
		}

		@Override
		public HttpResponse execute() throws IOException {
			return executeAsync(null, null, null);
		}

		@Override
		public HttpResponse executeAsync(Consumer<? super HttpResponse> succeed,
				BiConsumer<? super HttpResponse, Throwable> fail, BiConsumer<? super HttpResponse, Throwable> always) {
			Response r = new Response(succeed, fail, always);
			Runnable runner = new Runnable() {

				@Override
				public void run() {
					try {
						if (hasFormBody)
							fulfillPost(r);
						else
							fulfillGet(r);
					} catch (Exception e) {
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

		@SuppressWarnings("resource")
		public Response fulfillGet(Response r) throws Exception {
			URI uri = getUri();
			String data = "";
			for (Entry<String, String> e : htGetParams.entrySet()) {
				String val = e.getValue();
				/**
				 * @j2sNative val = encodeURIComponent(val);
				 */
				data += e.getKey() + "=" + val;
			}
			if (data.length() > 0) {
				uri = new URI(uri.toString() + "?" + data);
			}
			return r.getResponse(getConnection(uri), this);
		}

		public Response fulfillPost(Response r) throws IOException {
			AjaxURLConnection conn = getConnection(uri);
			for (int i = 0; i < listPostFiles.size(); i++) {
				Object[] name_data = listPostFiles.get(i);
				String name = (String) name_data[0];
				byte[] data = null;
				String fileName = null;
				if (name_data[1] instanceof File) {
					FileInputStream fis = new FileInputStream((File) name_data[1]);
					fileName = ((File) name_data[1]).getName();
					data = fis.readAllBytes();
					fis.close();
				} else if (name_data[1] instanceof byte[]) {
					data = (byte[]) name_data[1];
				} else if (name_data[1] instanceof InputStream) {
					InputStream is = (InputStream) name_data[1];
					data = is.readAllBytes();
					is.close();
				} else {
					// unlikely, since we only allowed only File and InputStream formats!
					if (!r.handleError(
							new java.io.InvalidObjectException("JSHttpClient file data type error for: " + name)))
						return r;
				}
				conn.addFormData(name, data, null, fileName);
			}
			for (Entry<String, String> e : htGetParams.entrySet()) {
				conn.addFormData(e.getKey(), e.getValue(), null, null);
			}
			return r.getResponse(conn, this);
		}

		/**
		 * JavaScript only here.
		 * 
		 * Create a connection that will be a javajs.util.AjaxURLConnection.
		 * 
		 * @param uri
		 * @throws IOException
		 */
		private AjaxURLConnection getConnection(URI uri) throws IOException {
			try {
				AjaxURLConnection conn = (AjaxURLConnection) uri.toURL().openConnection();
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

	public class Response implements HttpResponse {

		private int state = 0;

		/**
		 * set TRUE whenever at least one of succeed, fail, or always, is non-null
		 */
		private boolean isAsync;

		ByteArrayInputStream inputStream;

		private Throwable exception;

		/**
		 * the HTTP(S)URLConnection that will handle this request, actually
		 * javajs.util.AjaxURLConnection
		 */

		AjaxURLConnection conn;

		/**
		 * asynchronous callback functions
		 * 
		 */
		private Consumer<? super HttpResponse> succeed;
		private BiConsumer<? super HttpResponse, Throwable> fail;
		private BiConsumer<? super HttpResponse, Throwable> always;

		private String method;

		private URI uri;

		public Response(Consumer<? super HttpResponse> succeed, BiConsumer<? super HttpResponse, Throwable> fail,
				BiConsumer<? super HttpResponse, Throwable> always) {
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
		Response getResponse(AjaxURLConnection conn, Request request) throws IOException {
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
					if (method.equals("HEAD")) {
						try {
							state = conn.getResponseCode();
						} catch (IOException e) {
							exception = e;
						}
						doCallback(state == 0 || state >= 400);
					} else {
						conn.getBytesAsync(new Function<byte[], Void>() {

							@Override
							public Void apply(byte[] t) {
								doCallback(t != null);
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
		protected void doCallback(boolean ok) {
			ok &= (exception == null);
			if (ok && succeed != null)
				succeed.accept(this);
			else if (!ok && fail != null)
				fail.accept(this, exception);
			if (always != null)
				always.accept(this, exception);
		}

		/**
		 * Handle any errors that arise in the process of processing this request.
		 * 
		 * @param e
		 * @return true if aSynchronous and has been handled
		 */
		protected boolean handleError(Throwable e) {
			exception = e;
			// setting e = null to indicated handled.
			if (isAsync) {
				if (fail != null) {
					fail.accept(this, e);
					e = null;
				}
				if (always != null) {
					always.accept(this, e);
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
			return new String(getContent().readAllBytes());
		}

		/**
		 * In SwingJS, this is always a ByteArrayInputStream.
		 */
		@Override
		public InputStream getContent() throws IOException {
			return (inputStream == null ? (inputStream = (ByteArrayInputStream) conn.getInputStream())
					: inputStream);
		}

		@Override
		public void close() {
			try {
				conn.disconnect();
			} catch (Throwable t) {
				// ignore
			}
		}

		@Override
		public String toString() {
			return "JSHttpClient " + method + " state=" + state + " uri=" + uri;
		}

	}

}
