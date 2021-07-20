package javajs.http;

import java.io.ByteArrayInputStream;
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
 * Java or javajs.http.JSHttpClient for Java and SwingJS.
 * 
 * @author Mateusz Warowny
 *
 */
public interface HttpClient {

	public interface HttpRequest {

		public final static String METHOD_GET = "GET";
		public final static String METHOD_POST = "POST";
		public final static String METHOD_PUT = "PUT";
		public final static String METHOD_HEAD = "HEAD";
		public final static String METHOD_DELETE = "DELETE";

		/**
		 * Retrieve the method name for this request.
		 * 
		 * @return one of {GET, POST, PUT, DELETE, or HEAD}
		 */
		public String getMethod();

		/**
		 * Get the URI associated with this request. Includes only those query
		 * parameters provided in the original URI, not those added using
		 * addQueryParameter(String, String).
		 * 
		 * @return URI for this request
		 */
		public URI getUri();

		/**
		 * Add a header field to this request; may be ignored in some implementations.
		 * 
		 * @param name
		 * @param value
		 * @return
		 */
		public HttpRequest addHeader(String name, String value);

		/**
		 * Add a key/value pair to the url query. The value will be encoded 
		 * according to rfc 3986, using "%20" (rather than "+") for " " (space),
		 * thus consistent with JavaScript's encodeURIComponent(), not Java's URLEncoder.encode().
		 * 
		 * Can be used with either GET or POST.
		 */
		public HttpRequest addQueryParameter(String name, String value);

		/**
		 * Add a key/value multipart/form-data to a PUT or POST request.
		 */
		public HttpRequest addFormPart(String name, String value);

		/**
		 * Add a file-type multipart/form-data from a File object, with specified content
		 * type and file name.
		 * 
		 * @param name        form field name
		 * @param file        File object source
		 * @param contentType media type for this file
		 * @param fileName    server-side file name to associate with this file,
		 *                    overriding file.getName()
		 * @return
		 */
		public HttpRequest addFilePart(String name, File file, String contentType, String fileName);

		/**
		 * Add a file-type multipart/form-data from a String, with specified content type
		 * and file name.
		 * 
		 * @param name        form field name
		 * @param data        String data for this part
		 * @param contentType media type for this file
		 * @param fileName    server-side fileName to associate with this file
		 * @return
		 */
		public default HttpRequest addFilePart(String name, String data, String contentType, String fileName) {
		    ByteArrayInputStream stream = new ByteArrayInputStream(data.getBytes());
			return addFilePart(name, stream, contentType, fileName);
		}

		/**
		 * Add a file-type multipart/form-data derived from a File object, using
		 * "application/octet-stream" media type and file.getName() for the filename
		 * attibute.
		 * 
		 * @param name     form field name
		 * @param file     File source for this part
		 * @param fileName server-side fileName to associate with this file
		 * @return
		 */
		public default HttpRequest addFilePart(String name, File file) {
			return addFilePart(name, file, "application/octet-stream", file.getName());
		}

		/**
		 * Add a file-type multipart/form-data from an InputStream, using
		 * "application/octet-stream" for the media type and "file" for the filename
		 * attribute.
		 * 
		 * @param name form field name
		 * @param data String data for this part
		 * @return
		 */
		public default HttpRequest addFilePart(String name, InputStream stream) {
			return addFilePart(name, stream, "application/octet-stream", "file");
		}

		/**
		 * Add a generic file-type multipart/form-data using an inputStream for data,
		 * with the specified content type and file name.
		 * 
		 * @param name        form field name
		 * @param stream      InputStream source of bytes for this part
		 * @param contentType media type for this file
		 * @param fileName    server-side fileName to associate with this file
		 * @return
		 */
		public HttpRequest addFilePart(String name, InputStream stream, String contentType, String fileName);

		/**
		 * Remove all or some of the query parameters from the request.
		 * 
		 * @param name parameter name; null to remove all parameter from the request
		 * 
		 * @return
		 */
		public HttpRequest clearQueryParameters(String name);

		/**
		 * Remove all or some of the form parts from the request.
		 * 
		 * @param name form part name; null to remove all form parts from the request
		 * 
		 * @return
		 */
		public HttpRequest clearFormParts(String name);

		/**
		 * Send the request to the server and synchronously block while waiting for the
		 * response.
		 * 
		 * @return the response
		 */
		public HttpResponse execute() throws IOException;

		/**
		 * Execute the request (optionally) asynchronously, calling back using one or
		 * two callback BiConsumers. If all three callbacks are null, this method is
		 * equivalent to execute(), running synchronously and blocking until the result
		 * is returned from the server.
		 * 
		 * @param success first callback if successful (optionally null)
		 * @param failure first callback if not successful (optionally null)
		 * @param always  second callback if successful or not successful (optionally
		 *                null)
		 */
		public void executeAsync(Consumer<HttpResponse> success, BiConsumer<HttpResponse, ? super IOException> failure,
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
		 * Get the reason phrase for the response code.
		 * Implementations should use the reason returned by the server.
		 * Default implementation uses phrases defined by RFC 2616 and RFC 4918
		 *
		 * @return status line reason phrase
		 */
		public default String getReasonPhrase() {
			switch (getStatusCode()) {
			case 100: return "Continue";
			case 101: return "Switching Protocols";
			case 200: return "OK";
			case 201: return "Created";
			case 202: return "Accepted";
			case 203: return "Non-Authoritative Information";
			case 204: return "No Content";
			case 205: return "Reset Content";
			case 206: return "Partial Content";
			case 207: return "Multi-status";
			case 300: return "Multiple Choices";
			case 301: return "Moved Permanently";
			case 302: return "Found";
			case 303: return "See Other";
			case 304: return "Not Modified";
			case 305: return "Use Proxy";
			case 307: return "Temporary Redirect";
			case 400: return "Bad Request";
			case 401: return "Unauthorized";
			case 402: return "Payment Required";
			case 403: return "Forbidden";
			case 404: return "Not Found";
			case 405: return "Method Not Allowed";
			case 406: return "Not Acceptable";
			case 407: return "Proxy Authentication Required";
			case 408: return "Request Timeout";
			case 409: return "Conflict";
			case 410: return "Gone";
			case 411: return "Length Required";
			case 412: return "Precondition Failed";
			case 413: return "Request Entity Too Large";
			case 414: return "Request-URI Too Long";
			case 415: return "Unsupported Media Type";
			case 416: return "Requested Range Not Satisfiable";
			case 417: return "Expectation Failed";
			case 422: return "Unprocessable Entity";
			case 423: return "Locked";
			case 424: return "Failed Dependency";
			case 500: return "Internal Server Error";
			case 501: return "Not Implemented";
			case 502: return "Bad Gateway";
			case 503: return "Service Unavailable";
			case 504: return "Gateway Timeout";
			case 505: return "HTTP Version Not Supported";
			case 507: return "Insufficient Storage";
			default: return "";
			}
		}

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
	 * Create a new GET request. These requests will have no body. Any data added
	 * via addFormPart(String, String) or its related add...Part(...) methods will
	 * be ignored. All query parameters should be included in the specified URI or
	 * added via addQueryParameter(String, String) and will be added to the URI to
	 * create the final URL used for the transfer.
	 */
	public HttpRequest get(URI uri);

	/**
	 * Create a new HEAD request, having no request body and no parameters in the
	 * form of a URL query. Otherwise identical to a GET request, there will be no
	 * response body. Only the response headers can be checked.
	 */
	public HttpRequest head(URI uri);

	/**
	 * Create a new POST request. URL-encoded key/value pairs may be added using
	 * addQueryParmeter(String, String) and will be added the URI, as for GET; data
	 * added using add...Part(...) methods will use multipart/Usually they pass data
	 * in the request body either as a urlencoded form, a multipart form or raw
	 * bytes. Currently, we only care about the multipart and urlencoded forms.
	 */
	public HttpRequest post(URI uri);

	/**
	 * Create a new PUT request, which is constructed as for POST.
	 */
	public HttpRequest put(URI uri);

	/**
	 * Create a new DELETE request, which has no body. Parameters are passed in the
	 * URL query, as for GET.
	 */
	public HttpRequest delete(URI uri);

}
