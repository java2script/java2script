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

		/**
		 * Add parameter which will be appended to the url query.
		 */
		public HttpRequest addQueryParameter(String name, String value);

		/**
		 * Add parameter to the request form (either urlencoded or multipart).
		 */
		public HttpRequest addFormPart(String name, String value);

		/**
		 * Add file form parameter with specified content type and file name to the
		 * reqeust converting it into a multipart form .
		 */
		public HttpRequest addFilePart(String name, File file,
				String contentType, String fileName);

		/**
		 * Add file form parameter to the request converting it into a multipart
		 * form. Content type will be set to "application/octet-stream" and file
		 * name to the name of the file.
		 */
		public default HttpRequest addFilePart(String name, File file) {
			return addFile(name, file, "application/octet-stream", file.getName());
		}

		/**
		 * Add file form parameter to the request converting it into a multipart
		 * form.
		 */
		public HttpRequest addFilePart(String name, InputStream stream,
				String contentType, String fileName);

		/**
		 * Add file form parameter to the reqeust converting it into a multipart form.
		 * The content type will be set to "application/octet-stream" and file name to "file".
		 */
		public default HttpRequest addFilePart(String name, InputStream stream) {
			return addFileParameter(name, stream, "application/octet-stream", "file")
		}

		/**
		 * Remove all query parameters having the specified name from the request.
		 */
		public HttpRequest clearQueryParameters(String name);
		
		/**
		 * Remove all form parameters having the specified name.		
		 */
		public HttpRequest clearFormParts(String name);

		/**
		 * Send the request to the server and return the response.
		 */
		public HttpResponse execute() throws IOException;

		public void executeAsync(Consumer<HttpResponse> success,
				BiConsumer<HttpResponse, ? super IOException> failure,
				BiConsumer<HttpResponse, ? super IOException> always);
	}

	public interface HttpResponse extends Closeable {

		/**
		 * Get the status code of the response as per RFC 2616.
		 * 
		 * @return
		 */
		public int getStatusCode();

		/**
		 * Get the response headers, combining same-name headers with commas,
		 * preserving order, as per RFC 2616
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
	 * Creates a new GET request. They usually have no body and
	 * parameters are passed in the URL query.
	 */
	public HttpRequest get(URI uri);

	/**
	 * Creates a new HEAD request. They have no request body and
	 * parameters are passed in the URL query. They are identical to GET requests,
	 * except they receive no response body.
	 */
	public HttpRequest head(URI uri);

	/**
	 * Creates a new POST request. Usually they pass data in the
	 * request body either as a urlencoded form, a multipart form or raw bytes.
	 * Currently, we only care about the multipart and urlencoded forms.
	 */
	public HttpRequest post(URI uri);

	/**
	 * Creates a new PUT request which is constructed the same way as POST.
	 */
	public HttpRequest put(URI uri);

	/**
	 * Creates a new DELETE request. THey have have no body
	 * and parameters are passed in the URL query, just like GET.
	 */
	public HttpRequest delete(URI uri);

}
