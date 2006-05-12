package org.eclipse.swt.internal.xhtml;



public class Element {
	
	public ContentWindow contentWindow;
	
	public Element parentNode;
	public Element[] childNodes;
	public Element nextSibling;
	
	public CSSStyle style;
	public String id;
	public String innerHTML;
	public String innerText;

	public String value;
	public String type;

	public Object onclick;
	public Object onkeypress;
	public Object onkeydown;
	public Object onkeyup;
	
	public Object oncontextmenu;

	public int size;

	public int selectedIndex;
	
	public Option[] options;

	public String nodeName;

	public String className;

	public Object onmousedown;

	public Object onmouseup;

	public Object ondblclick;

	public Object onselectstart;
	
	public boolean checked;

	public boolean readOnly;

	public Object onchange;

	public Object onselectchange;

	public int width;

	public int height;

	public String src;

	public String alt;

	public boolean disabled;

	
	//private String
	
	public void appendChild(Element child) {
		//
	}

	public void select() {
		// TODO Auto-generated method stub
		
	}

	public void focus() {
		// TODO Auto-generated method stub
		
	}

	public void removeChild(Element handle) {
		// TODO Auto-generated method stub
		
	}

	public void add(Object object) {
		// TODO Auto-generated method stub
		
	}

	public void insertBefore(Element newTR, Element tbodyTR) {
		// TODO Auto-generated method stub
		
	}
	
	public Element[] getElementsByTagName(String tag) {
		return new Element[0];
	}

//	public void write(String html) {
//		
//	}
}
