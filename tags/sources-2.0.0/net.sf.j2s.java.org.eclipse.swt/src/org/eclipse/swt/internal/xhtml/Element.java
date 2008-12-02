package org.eclipse.swt.internal.xhtml;




	
public class Element {
	public ContentWindow contentWindow;
	
	public Element parentNode;
	public Element[] childNodes;
	public Element nextSibling;
	public int offsetLeft;
	public int offsetTop;
	public Element offsetParent;
	
	public CSSStyle style;
	public String id;
	public String innerHTML;
	public String innerText; // IE
	public String text; // Mozilla

	public String value;
	public String type;

	public String href;
	public String target;
	public String title;
	
	public Object onscroll;
	public Object onclick;
	public Object onkeypress;
	public Object onkeydown;
	public Object onkeyup;
	
	public Object oncontextmenu;

	public int size;

	public int selectedIndex;
	
	public Option[] options;

	public String nodeName;

	public String nodeValue;
	
	public String className;

	public Object onmousedown;

	public Object onmouseup;

	public Object ondblclick;

	public Object onselectstart;
	
	public boolean checked;

	public boolean readOnly;

	public boolean multiple;
	
	public Object onchange;

	public Object onselectchange;

	public int width;

	public int height;

	public int offsetWidth, clientWidth, scrollWidth, scrollLeft;
	
	public int offsetHeight, clientHeight, scrollHeight, scrollTop;
	
	public String src;

	public String alt;

	public boolean disabled;

	public Object onLoseCapture;

	public Object onfocusout;

	public Object onmousemove;

	public Object onmouseover;

	public Object onmouseout;

	public Object onfocus;

	public Object onblur;
	
	public Object onhelp;

	public String rel;

	public int tabIndex;

	public int nodeType;

	public boolean hasLayout;

	//private String
	
	public native void appendChild(Element child);

	public native void select();

	public native void focus();

	public native void removeChild(Element handle);
	
	public native void add(Object object);

	public native void insertBefore(Element el, Element afterEl);
	
	public native Element[] getElementsByTagName(String tag);
	
	public native Element cloneNode(boolean flag);

	public native Element getElementById(String id);
}
