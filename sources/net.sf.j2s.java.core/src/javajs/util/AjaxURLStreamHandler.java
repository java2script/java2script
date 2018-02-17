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
		return new AjaxURLConnection(url);
	}


  @Override
  protected String toExternalForm(URL u) {
    SB result = new SB();
    result.append(u.getProtocol());
    result.append(":");
    if (u.getAuthority() != null && u.getAuthority().length() > 0) {
      result.append("//");
      result.append(u.getAuthority());
    }
    if (u.getPath() != null) {
      result.append(u.getPath());
    }
    if (u.getQuery() != null) {
      result.append("?");
      result.append(u.getQuery());
    }
    if (u.getRef() != null) {
      result.append("#");
      result.append(u.getRef());
    }
    return result.toString();
  }

}
