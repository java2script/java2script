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
	
	public static Element body;
	
	public native static Element createElement(String tag);
	public native static Element[] getElementsByTagName(String tag);
	public native static Element createTextNode(String string);
	
	public native static Element getElementById(String id);
	
	public native void write(String html);
	public native void close();
}
