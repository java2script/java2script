package java.net;

/**
 * A very minimal implementation
 * 
 * @author Bob Hanson
 *
 */
public class URI extends URL {
	
	public URI(String str) throws MalformedURLException {
		super(str);
	}
	
	public URL toURL() {
		return this;
	}
	
}

