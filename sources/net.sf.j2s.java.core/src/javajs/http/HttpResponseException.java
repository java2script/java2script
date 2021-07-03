package javajs.http;

/**
 * Exception that can be raised by the application to indicate
 * a non 2xx server response. The http client will not raise
 * this exception implicitly. A typical use case is to throw
 * this exception if the response status code indicate failure.
 * The status code and the reason phrase should be populated from
 * the {@link HttpClient.HttpResponse#getStatusCode()} and
 * {@link HttpClient.HttpResponse#getReasonPhrase()} respectively.
 */
public class HttpResponseException extends ClientProtocolException {

	private static final long serialVersionUID = -8481868921105838666L;

	private final int statusCode;
	private final String reasonPhrase;

	public HttpResponseException(int statusCode, String reasonPhrase, String message) {
		super(message);
		this.statusCode = statusCode;
		this.reasonPhrase = reasonPhrase;
	}

	public HttpResponseException(int statusCode, String reasonPhrase) {
		this(statusCode, reasonPhrase, String.format("%d %s", statusCode, reasonPhrase));
	}

	/**
	 * Get status code of the response which caused this exception.
	 *
	 * @return status code
	 */
	public int getStatusCode() {
		return statusCode;
	}

	/**
	 * Get reason phrase complementing the error's status code.
	 */
	public String getReasonPhrase() {
		return reasonPhrase;
	}

}
