package org.eclipse.swt.internal.xhtml;


public class document {
	public static Object onmousemove;
	public static Object onmousedown;
	public static Object onmouseup;
	public static Object ondblclick;
	public static Object onselectstart;
	public static Object onclick;
	public static Object onkeypress;
	public static Object onkeydown;
	public static Object onkeyup;
	
	public static Body body;
	public static Element createElement(String tag) {
		return new Element();
	}
	public static Element[] getElementsByTagName(String tag) {
		return new Element[0];
	}
	public static Element createTextNode(String string) {
		return null;
	}
	public void write(String html) {
		// TODO Auto-generated method stub
		
	}
	/**
	 * 
	 */
	public void close() {
		// TODO Auto-generated method stub
		
	}
}
