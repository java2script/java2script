package javajs.http;

import java.io.Closeable;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.Map;
import java.util.function.BiConsumer;
import java.util.function.Consumer;

/**
 * A generic HttpClient interface that can work with org.apache.http classes for
 * Java or javajs.http.JSHttpClient for SwingJS.
 * 
 * @author Mateusz Warowny
 *
 */
public interface HttpClient {

	public interface HttpRequest {

		public String getMethod();

		public URI getUri();

		public HttpRequest addHeader(String name, String value);

		public HttpRequest addParameter(String name, String value);

		public HttpRequest addFile(String name, File file);

		public HttpRequest addFile(String name, InputStream stream);

		/**
		 * Send the request to the server and return the response.
		 */
		public HttpResponse execute() throws IOException;

		public void executeAsync(Consumer<HttpResponse> success, 
				BiConsumer<HttpResponse, ? super IOException> failure,
				BiConsumer<HttpResponse, ? super IOException> always);
	}

	public interface HttpResponse extends Closeable {
		public int getStatusCode();

		/**
		 * Get the response headers, combining same-name headers with commas, preserving
		 * order, as per RFC 2616
		 * 
		 * @return
		 */
		public Map<String, String> getHeaders();

		/**
		 * Get the reply in the form of an InputStream.
		 * 
		 * @return
		 * @throws IOException
		 */
		public InputStream getContent() throws IOException;

		/**
		 * Get the reply in the form of a String.
		 * 
		 * @return
		 * @throws IOException
		 */
		public String getText() throws IOException;

		/**
		 * Close any open streams.
		 * 
		 */
		@Override
		public default void close() throws IOException {
		}
	}

	/**
	 * Initialises the GET request builder. Usually they have no request body and
	 * parameters are passed in the URL query.
	 */
	public HttpRequest get(URI uri);

	/**
	 * Initialises the GET request builder. They have no request body and parameters
	 * are passed in the URL query. They are identical to GET requests, the only
	 * difference is that the returned response contains headers only.
	 */
	public HttpRequest head(URI uri);

	/**
	 * Initialises the POST request builder. Usually they contain data in the
	 * request body either as a urlencoded form, a multipart form or raw bytes.
	 * Currently, we only care about the multipart form.
	 */
	public HttpRequest post(URI uri);

	/**
	 * Initialises the PUT request builder which construct the same way as POST. The
	 * only difference is the request method.
	 */
	public HttpRequest put(URI uri);

	/**
	 * Initialises the DELETE request builder. The DELETE requests have no body and
	 * parameters are passed in the URL query, just like GET.
	 */
	public HttpRequest delete(URI uri);

}
