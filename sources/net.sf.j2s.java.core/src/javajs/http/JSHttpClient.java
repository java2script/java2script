package javajs.http;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InvalidObjectException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.function.Consumer;

/**
 * SwingJS implementation of javajs.http.HttpClient and associated classes.
 * 
 * Note that none of this code should ever be run in Java.
 * Java implementations should use their own implementations.
 * 
 * 
 * For more details on HTTP methods see:
 * https://www.w3schools.com/tags/ref_httpmethods.asp
 */
public class JSHttpClient implements HttpClient {

	/**
	 * Template class implementing addFormData. Added here to allow this class to be
	 * placed in Java projects without There is no need to maintain the
	 * actual javajs.util.AjaxURLConnection class. Basically an interface with all
	 * the body methods of an HttpURLConnection or HttpsURLConnection.
	 * 
	 * Can be initialized either directly or via HttpClientFactory.getDefault().
	 * 
	 * @author hansonr
	 *
	 */
	public abstract class AjaxURLConnection extends HttpURLConnection {

		protected AjaxURLConnection(URL u) {
			super(u);
		}

		public abstract void addFormData(String name, Object value, String contentType, String fileName);

	}

	public static HttpClient create() {
		return new JSHttpClient();
	}

	public JSHttpClient() {
	}
	
	// no OPTIONS, no TRACE
	
	@Override
	public HttpRequestBuilder get(URI uri) {
		return new RequestBuilder(uri, "GET");
	}

	@Override
	public HttpRequestBuilder head(URI uri) {
		return new RequestBuilder(uri, "HEAD");
	}

	@Override
	public HttpRequestBuilder post(URI uri) {
		return new RequestBuilder(uri, "POST");

	}

	@Override
	public HttpRequestBuilder put(URI uri) {
		return new RequestBuilder(uri, "PUT");
	}

	@Override
	public HttpRequestBuilder delete(URI uri) {
		return new RequestBuilder(uri, "DELETE");
	}

	public class RequestBuilder implements HttpRequestBuilder {

		private URI uri;
		private String method;
		private int mode;
		private Map<String, String> htHeaders = new HashMap<>();
		private Map<String, String> htGetParams = new HashMap<>();
		private List<Object[]> listPostFiles = new ArrayList<>();
		private Consumer<? super HttpResponse> done;
		private Consumer<? super HttpResponse> fail;
		private Consumer<? super HttpResponse> always;

		private boolean hasBody = false;
		private boolean isAsync;

		public RequestBuilder(URI uri, String method) {
			this.uri = uri;
			this.method = method.toUpperCase();
			switch (method) {
			case "GET":
			case "DELETE":
			case "HEAD":
				hasBody = false;
				break;
			case "PUT":
			case "POST":
				hasBody = true;
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
		public HttpRequestBuilder addHeader(String name, String value) {
			htHeaders.put(name, value);
			return this;
		}

		@Override
		public HttpRequestBuilder addParameter(String name, String value) {
			htGetParams.put(name, value);
			return this;
		}

		@Override
		public HttpRequestBuilder addFile(String name, File file) {
			listPostFiles.add(new Object[] { name, file });
			return this;
		}

		@Override
		public HttpRequestBuilder addFile(String name, InputStream stream) {
			listPostFiles.add(new Object[] { name, stream });
			return this;
		}

		@SuppressWarnings("resource")
		@Override
		public HttpResponse execute() throws IOException {
			return (hasBody ? new Response().fulfillPost() :  new Response().fulfillGet());
		}

		@Override
		public HttpResponse executeAsync(Consumer<? super HttpResponse> done, Consumer<? super HttpResponse> fail, Consumer<? super HttpResponse> always) {
			this.done = done;
			this.fail = fail;
			this.always = always;
			Response r = new Response();
			try {
				return (hasBody ? r.fulfillPost() : r.fulfillGet());
			} catch (IOException e) {
				r.handleError(e);
			}
			return r;
		}

		public class Response implements HttpResponse {

			AjaxURLConnection conn;
			ByteArrayInputStream inputStream;
			private Throwable exception;
			private int state;
			private boolean isAsync;
			
			public Response() {
				isAsync = (done != null || fail != null || always != null);
			}

			public Response fulfillGet() throws IOException {
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
					try {
						uri = new URI(uri.toString() + "?" + data);
					} catch (URISyntaxException e1) {
						// unlikely; we already have a URI
						e1.printStackTrace();
					}
				}
				getConnection(uri);
				getResponse();
				return this;
			}

			public Response fulfillPost() throws IOException {
				getConnection(uri);
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
						state = HttpURLConnection.HTTP_BAD_REQUEST;
						if (!handleError(
								new java.io.InvalidObjectException("JSHttpClient file data type error for: " + name)))
							return null;
					}
					conn.addFormData(name, data, null, fileName);
				}
				for (Entry<String, String> e : htGetParams.entrySet()) {
					conn.addFormData(e.getKey(), e.getValue(), null, null);
				}
				getResponse();
				return this;
			}

			private void getResponse() throws IOException {
				if (done != null || fail != null || always != null) {
					conn.getResponseCode();
				}
				// TODO Auto-generated method stub
				
			}

			/**
			 * JavaScript only here.
			 * 
			 * Create a connection that will be a javajs.util.AjaxURLConnection.
			 * 
			 * @param uri
			 * @throws IOException
			 */
			private void getConnection(URI uri) throws IOException {
				try {
					conn = (AjaxURLConnection) uri.toURL().openConnection();
					conn.setUseCaches(false);
					conn.setDoInput(true);
					if (hasBody)	
						conn.setDoOutput(true);
					conn.setRequestMethod(method);
					for (Entry<String, String> e : htHeaders.entrySet()) {
						conn.addRequestProperty(e.getKey(), e.getValue());
					}
				} catch (MalformedURLException e) {
					throw new IOException(e + ": " + uri);
				}
			}

			@Override
			public int getStatusCode() {
				try {
					return (state != 0 ? state : conn.getResponseCode());
				} catch (Throwable e) {
					state = HttpURLConnection.HTTP_INTERNAL_ERROR;
					handleError(e);
					return state;
				}
			}

			private boolean handleError(Throwable e) {
				exception = e;
				if (fail != null) {
					fail.accept(this);
					return true;
				}
				return false;
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
				for (int i = 0; i < listPostFiles.size(); i++) {
					Object[] name_data = listPostFiles.get(i);
					if (name_data[1] instanceof InputStream) {
						InputStream is = (InputStream) name_data[1];
						try {
							is.close();
						} catch (Throwable t) {
							// ignore
						}
					}
				}
			}

		}

	}

}
