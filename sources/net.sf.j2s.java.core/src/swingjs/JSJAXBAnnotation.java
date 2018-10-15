package swingjs;

import java.util.Hashtable;
import java.util.Map;

import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.namespace.QName;

import swingjs.api.js.DOMNode;

class JSJAXBAnnotation {
	
	private Object javaObject;

	int index;
	
	String tagName;
	String data;
	String text;
	String javaName;
	String javaClass;
	String methodName;

	boolean isAttribute;
	boolean isID;
	boolean isIDREF;
	boolean isValue;
	boolean asList;

	QName qualifiedName;	
	QName qualifiedWrapName;
	Map<String, String> attr;

    String xmlSchema;
	String typeAdapter;
	String mimeType;

	Object entryValue;

	private static final Map<String, String> namespacePrefixes = new Hashtable<String, String>();
	private static int prefixIndex = 1;

	private static String getPrefixFor(String namespace) {
		String prefix = namespacePrefixes.get(namespace);
		if (prefix == null)
			namespacePrefixes.put(namespace, prefix = "ns" + (++prefixIndex));
		return prefix;
	}

	JSJAXBAnnotation(String[] adata, Object javaObject, int index) {
		this.javaObject = javaObject;
		this.index = index;
		javaClass = adata[1];
		text = adata[2];
		data = text;
		int pt = data.indexOf("(");
		String tag = data.substring(0, (pt < 0 ? data.length() : pt));
		data = (pt < 0 ? "" : data.substring(pt + 1, data.lastIndexOf(")")));
		attr = new Hashtable<String, String>();
		if (pt >= 0 && data.indexOf("=") >= 0)
			getXMLAttributes(data);
		if (adata[0] != null && adata[0].startsWith("M:")) {
			methodName = javaName.substring(2);
			// annotation can be on set... or get... or is...
			if (methodName.startsWith("set")) {
				methodName = "get" + methodName.substring(3);
			}
			javaName = getJavaNameFromMethodName(methodName);
		} else {
			javaName = adata[0];
		}
		String namespace = attr.get("namespace");
		String prefix = (namespace == null ? "" : getPrefixFor(namespace));
		qualifiedName = new QName(namespace, (attr.containsKey("name") ? attr.get("name") 
				: javaName == null ? "" : javaName), prefix);
		if (tag.equals("@XmlElementWrapper")) {
			qualifiedWrapName = qualifiedName;
			qualifiedName = new QName(namespace, (javaName == null ? "" : javaName), prefix);
			
		} 
		tagName = tag;
		processTagName(tag, this);
	}

	void addAnnotation(JSJAXBAnnotation a) {
		processTagName(a.tagName, a);
		
	}

	boolean isNillable() {
		return "true".equals(attr.get("nillable"));
	}

	private String getJavaNameFromMethodName(String methodName) {
		String javaName = methodName.substring(methodName.startsWith("is") ? 2 : 3);
		String lcaseName = javaName.substring(0, 1).toLowerCase() + javaName.substring(1);
		String name = null;
		if (getJSType(name = javaName).equals("undefined") && getJSType(name = lcaseName).equals("undefined")
				&& methodName.endsWith("Property")) {
			if (getJSType(name = javaName.substring(javaName.length() - 8)).equals("undefined")
					&& getJSType(name = lcaseName.substring(javaName.length() - 8)).equals("undefined")) {
				System.out.println("JSJAXBMarshaller cannot find field for " + methodName);
				name = methodName;
			}
		}
		return name;
	}

	private String getJSType(String javaName) {
		return (/** @j2sNative ( typeof this.javaObject[javaName]) || */
		null);
	}

	private Map<String, String> getXMLAttributes(String data) {
		data = "<__ " + removeCommas(data) + " />";
		//System.out.println(data);
		DOMNode doc = JSUtil.jQuery.parseXML(data);
		DOMNode node = DOMNode.firstChild(doc);
		String[] names = node.getAttributeNames();
		for (int i = 0; i < names.length; i++)
			attr.put(names[i], node.getAttribute(names[i]));
		return attr;
	}

	private String removeCommas(String s) {
		boolean escaped = false;
		for (int i = 0; i < s.length(); i++) {
			switch (s.charAt(i)) {
			case '"':
				escaped = !escaped;
				break;
			case '}':
			case '{':
				if (!escaped)
					s = s.substring(0, i) + "'" + s.substring(i + 1);
				break;
			case ',':
				if (!escaped)
					s = s.substring(0, i) + " " + s.substring(i + 1);
				break;
			case '\\':
				i++;
				break;
			}
		}
		s = s.replace("=true", "=\"true\"").replace("=false", "=\"false\"");
		return s;
	}

	@SuppressWarnings("unused")
	public Object getValue() {
		if (entryValue != null)
			return entryValue;
		String javaName = this.javaName;
		Object obj = this.javaObject;
		boolean isMethod = (this.methodName != null);
		/**
		 *  @j2sNative 
		 *
		 * obj = (isMethod ? obj[this.methodName]() : obj[javaName]) 
		 * 
		 */
		if (obj instanceof byte[] && xmlSchema == null)
			xmlSchema = "base64Binary";
		return obj;
	}

	public String toString() {
		return "{" + javaName + "}" + index;
	}

	
	/**
	 * Process the tag name for critical information, possibly updating the main
	 * reference tag.
	 * 
	 * @param tag
	 * @param a
	 */
	private void processTagName(String tag, JSJAXBAnnotation a) {
		// note that we are not checking for JAXBExceptions here
		if (tag.equals("@XmlValue")) {
			a.isValue = true;
			tag = a.tagName = "@XmlElement";		
		}
		switch (tag) {
		case "@XmlSchemaType":
			xmlSchema = a.attr.get("name");
			if (xmlSchema.equals("hexBinary")) {
				xmlSchema = null;
				typeAdapter = "HexBinaryAdapter";
			}
// e.g. 
//			   @XmlSchemaType(name="date")
//			   public XMLGregorianCalendar cal;
//			
//			   @XmlSchemaType(name="hexBinary") <-- does not work with JAXB
			// https://jinahya.wordpress.com/2012/11/08/printing-binary-as-hexbinary-not-base64binary-with-jaxb/
//			   public byte[] hexBytes;
//			 
//			   @XmlSchemaType(name="base64Binary")
//			   public byte[] base64Bytes;
			break;
		case "@XmlJavaTypeAdapter":
			// typically CollapsedStringAdapter.class
			typeAdapter = a.data.substring(0, a.data.length() - 6);
			break;
		case "@XmlID":
			isID = true;
			break;
		case "@XmlIDREF":
			isIDREF = true;
			break;
		case "@XmlList":
			asList = true;
			break;
		case "@XmlMimeType":
			mimeType = a.attr.get("name");
			// e.g. @XmlMimeType("application/octet-stream")
			// @XmlMimeType("image/jpeg")
			// @XmlMimeType("text/xml; charset=iso-8859-1")
			break;
		case "@XmlElementWrapper":
			qualifiedWrapName = a.qualifiedWrapName;			
			break;
		case "@XmlAttribute":
			isAttribute = a.isAttribute = true;
		    // fall through //
		case "@XmlElement":
			if (this != a) {
				a.xmlSchema = xmlSchema;
				a.typeAdapter = typeAdapter;
				a.isID = isID;
				a.isIDREF = isIDREF;
				a.asList = asList;
				a.isValue = isValue;
				a.mimeType = mimeType;
				a.qualifiedWrapName = qualifiedWrapName;
			}
			break;
		}
	}

	
	/*
	 * notes
	 * 
	 * @XmlAttribute
	 * 
	 * https://docs.oracle.com/javase/8/docs/api/javax/xml/bind/annotation/XmlAttribute.html
	 * 
	 * This annotation can be used with the following annotations: XmlID, XmlIDREF,
	 * XmlList, 
	 * XmlSchemaType, 
	 * XmlValue,      <--- NOT for XmlAttribute
	 * XmlAttachmentRef, <--- not relevant?
	 * XmlMimeType,   <--- BASE64
	 * XmlInlineBinaryData <--- not relevant? 
	 * XmlJavaTypeAdapter
	 * 
	 * @XmlElement
	 * 
	 * This annotation can be used with following annotations: XmlID, XmlIDREF,
	 * XmlList, 
	 * XmlSchemaType, 
	 * XmlValue, 
	 * XmlAttachmentRef, <--- not relevant
	 * XmlMimeType,  <--- BASE64
	 * XmlInlineBinaryData,  <--- not relevant 
	 * XmlElementWrapper, 
	 * XmlJavaTypeAdapter.
	 * 
	 */
}

