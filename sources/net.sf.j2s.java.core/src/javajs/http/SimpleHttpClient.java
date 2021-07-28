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
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLEncoder;
import java.net.UnknownHostException;
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
public class SimpleHttpClient implements HttpClient {

	SimpleHttpClient() {
		// for reflection
	}

	// no OPTIONS, no TRACE

	@Override
	public HttpRequest get(URI uri) {
		return new Request(uri, HttpRequest.METHOD_GET);
	}

	@Override
	public HttpRequest head(URI uri) {
		return new Request(uri, HttpRequest.METHOD_HEAD);
	}

	@Override
	public HttpRequest post(URI uri) {
		return new Request(uri, HttpRequest.METHOD_POST);

	}

	@Override
	public HttpRequest put(URI uri) {
		return new Request(uri, HttpRequest.METHOD_PUT);
	}

	@Override
	public HttpRequest delete(URI uri) {
		return new Request(uri, HttpRequest.METHOD_DELETE);
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

		/**
		 * Generic method of adding form data.
		 * @param name  form field name
		 * @param value  String or byte[]
		 * @param contentType recognized media type
		 * @param fileName server-side-specific file name
		 */
		public abstract void addFormData(String name, Object value, String contentType, String fileName);

		/**
		 * JavaScript SwingJS-only method, not available in Java, only JavaScript
		 * @param whenDone 
		 */
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
		URI uri;

		/**
		 * GET, HEAD, POST, PUT, or DELETE
		 */
		String method;

		/**
		 * headers, mostly ignored in SwingJS and AJAX
		 * 
		 */
		private Map<String, String> htHeaders = new HashMap<>();

		/**
		 * GET data
		 */
		private List<FormData> queryData;

		/**
		 * POST data
		 */
		private List<FormData> formData;

		/**
		 * when TRUE, all parameters and files are transmitted as binary data in
		 * multipart/form-data format
		 */
		boolean hasFormBody = false;

		Request(URI uri, String method) {
			this.uri = uri;
			this.method = method.toUpperCase();
			switch (method) {
			case METHOD_GET:
			case METHOD_DELETE:
				hasFormBody = false;
				break;
			case METHOD_HEAD:
				hasFormBody = false;
				break;
			case METHOD_PUT:
			case METHOD_POST:
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
		public HttpRequest addQueryParameter(String name, String value) {
			if (name == null) {
				clearFormParts(name);
				return this;
			}
			if (queryData == null)
				queryData = new ArrayList<>();
			queryData.add(new FormData(name, value, null, null));
			return this;
		}
		
		@Override
		public HttpRequest addFormPart(String name, String value) {
			return addFormField(name, value, null, null);
		}

		@Override
		public HttpRequest addFilePart(String name, String fileData, String contentType, String fileName) {
			return addFormField(name, fileData.getBytes(), contentType, fileName);
		}

		@Override
		public HttpRequest addFilePart(String name, File file, String contentType, String fileName) {
			return addFormField(name, toBytes(file), contentType, fileName);
		}


		@Override
		public HttpRequest addFilePart(String name, InputStream stream, String contentType, String fileName) {
			return addFormField(name, toBytes(stream), contentType, fileName);
		}

		private HttpRequest addFormField(String name, Object data, String contentType, String fileName) {
			if (data == null) {
				clearFormParts(name);
				return this;
			}
			if (formData == null)
				formData = new ArrayList<>();
			formData.add(new FormData(name, data instanceof String ? data : toBytes(data), contentType, fileName));
			return this;
		}

		@Override
		public HttpRequest clearQueryParameters(String name) {
			if (queryData != null) {
				for (int i = 0; i < queryData.size(); i++)
					if (name == null || queryData.get(i).getName().equals(name)) {
						queryData.remove(i);
					}
			}
			return this;
		}
		
		@Override
		public HttpRequest clearFormParts(String name) {
			if (formData != null) {
				for (int i = 0; i < formData.size(); i++)
					if (name == null || formData.get(i).getName().equals(name)) {
						formData.remove(i);
					}
			}
			return this;
		}

		private byte[] toBytes(Object data) {
			if (data == null || data instanceof byte[]) {
				return (byte[]) data;
			} 
			if (data instanceof File) {
				try (FileInputStream fis = new FileInputStream((File) data)) {
					return getBytes(fis);
				}
				catch (IOException e) {
					e.printStackTrace();
					return null;
				}
			} 
			if (data instanceof InputStream) {
				try (InputStream is = (InputStream) data) {
					return getBytes(is);
				}
				catch (IOException e) {
					e.printStackTrace();
					return null;
				}
			}
			return data.toString().getBytes();
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

		Response fulfillGet(Response r) throws IOException {
			return r.getResponse(getConnection(createURL()), this);
		}

		private URL createURL() throws MalformedURLException {
			String data = "";
			if (queryData != null) {
				Map<String, String> htGetParams = new LinkedHashMap<>();
				for (int i = 0; i < queryData.size(); i++) {
					FormData fd = queryData.get(i);
					htGetParams.put(fd.getName(), fd.getData().toString());
				}
				for (Entry<String, String> e : htGetParams.entrySet()) {
					data += e.getKey() + "=" + encodeURI(e.getValue());
				}
			}
			return (data.length() > 0 ? new URL(uri.toString() + "?" + data) : uri.toURL());
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

		Response fulfillPost(Response r) throws IOException {
			HttpURLConnection conn = getConnection(createURL());
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
		 * @param url
		 * @return connection
		 * @throws IOException
		 */
		private HttpURLConnection getConnection(URL url) throws IOException {
			try {
				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
				conn.setUseCaches(false);
				if (!method.equals(METHOD_HEAD))
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

		private final static int BAD_REQUEST = 400;
		
		int state = 0;

		/**
		 * set TRUE whenever at least one of succeed, fail, or always, is non-null
		 */
		boolean isAsync;

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


		String method;

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
		 * @param request
		 * @return Response
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

			new Thread(() -> {
				// asynchronous methods cannot throw an exception.
				IOException exception = null;
				try {
					if (method.equals(HttpRequest.METHOD_HEAD)) {
						state = conn.getResponseCode();
					} else {
						@SuppressWarnings("unused")
						Function<byte[], Void> f = new Function<byte[], Void>() {

							@Override
							public Void apply(byte[] t) {
								state = 400; // Bad Request?
								try {
									state = SimpleHttpClient.Response.this.conn.getResponseCode();
									doCallback(null);
								} catch (IOException e) {
									doCallback(e);
								}
								return null;
							}

						};
						/** @j2sNative return conn.getBytesAsync$java_util_function_Function(f); */
						{
							f.apply(null);
							return;
						}
					}
				} catch (IOException e) {
					exception = e;
				}
				doCallback(exception);

			}).start();
			return this;
		}

		/**
		 * Make the proper callback, depending upon response code and exception state.
		 * 
		 * @param ok
		 * @param e 
		 */
		protected void doCallback(IOException e) {
			boolean ok = (e == null && state < 400);
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
			if (e instanceof UnknownHostException)
				state = BAD_REQUEST;
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
			return new String(getBytes(getContent()));
		}

		/**
		 * In SwingJS, this is always a ByteArrayInputStream.
		 * @throws IOException 
		 */
		@Override
		public InputStream getContent() throws IOException {
			if (conn == null)
				throw new IOException("Connection could not be opened");
			try {
				return (inputStream == null ? (inputStream = conn.getInputStream())
						: inputStream);
			} catch (IOException e) {
				if (state < 400)
					state = decodeServerException(e.toString());
				throw new IOException(e);
			}
		}

		private int decodeServerException(String msg) {
			try {
				return Integer.parseInt(msg.substring(msg.indexOf("code:") + 5));
			} catch (Exception e) {
			}
			return 404;
		}

		@Override
		public void close() {
			conn.disconnect();
		}

		@Override
		public String toString() {
			return "SimpleHttpClient " + method + " state=" + state + " uri=" + uri;
		}

	}

	public static byte[] getBytes(InputStream is) throws IOException {
	
		// Java 9 version is better:
		//		 return is.readAllBytes();

		ByteArrayOutputStream bos = new ByteArrayOutputStream(0x4000);
		byte[] buf = new byte[0x4000];
		int n = 0;
		while((n = is.read(buf)) >= 0) {
			bos.write(buf, 0, n);
		} 
		is.close();
		return bos.toByteArray();

	}

	public static HttpRequest createRequest(HttpClient client, String method, String url) throws IOException {
		
		URI uri = null;
		try {
			uri = new URI(url);
		} catch (URISyntaxException e) {
			throw new IOException(e);
		}
		switch (method.toUpperCase()) {
		case "HEAD":
			return client.head(uri);
		case "GET":
			return client.get(uri);
		case "POST":
			return client.post(uri);
		case "PUT":
			return client.put(uri);
		case "DELETE":
			return client.delete(uri);
		default:
			throw new IOException("Unknown method:" + method);
		}
	}

}
