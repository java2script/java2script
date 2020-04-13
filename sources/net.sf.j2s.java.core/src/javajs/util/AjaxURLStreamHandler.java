package javajs.util;

import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLStreamHandler;



/**
 * 
 * A method to allow a JavaScript AJAX adapter to 
 * deliver web content to JSmol. This handler is just a formality.
 * 
 */
public class AjaxURLStreamHandler extends URLStreamHandler {

	String protocol;

	public AjaxURLStreamHandler(String protocol) {
		this.protocol = protocol;
	}

	@Override
	protected URLConnection openConnection(URL url) throws IOException {
		return AjaxURLConnection.newConnection(url);
	}
}
