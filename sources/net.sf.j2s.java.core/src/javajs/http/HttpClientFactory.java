package javajs.http;

/**
 * A class with just one method, which allows implementation in Java or
 * JavaScript. You should probably copy this factory to your code base and add
 * your own Java implementation class name there.
 * 
 * Optionally, you can just use this one and call it with your desired 
 * class name or set the static default to what you want generally.
 * 
 * 
 * @author hansonr
 *
 */
public class HttpClientFactory {
	
	private static String defaultClassName = "javajs.http.SimpleHttpClient";
	
	public static void setDefaultClassName(String className) {
		if (className != null)
			defaultClassName = className;
	}
	public static HttpClient getClient(String className) {
		if (className == null)
			className = defaultClassName;
		try {
			return (HttpClient) Class.forName(className).getDeclaredConstructor().newInstance();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
