package swingjs.xml;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.xml.bind.annotation.adapters.XmlAdapter;
import javax.xml.namespace.QName;

import org.xml.sax.Attributes;

import javajs.util.PT;
import swingjs.JSUtil;
import swingjs.api.js.DOMNode;

/**
 * A simplified class that acts as a repository for critical JAXB XML and Java
 * information, both for the marshaller and unmarshaller.
 * 
 * @author hansonr
 *
 */
class JSJAXBField {

	// Marshaller only

	Object entryValue = this;

	// Unmarshaller only

	DOMNode boundNode;
	List<Object> boundListNodes;
	String xmlCharacterData = "";
	String xmlAttributeData;
	Attributes xmlAttributes;
	String xmlType;

	/**
	 * prior to re-use in unmarshalling
	 * 
	 * @param javaObject
	 */
	void clear() {
		this.entryValue = null;
		this.boundNode = null;
		this.boundListNodes = null;
		this.xmlCharacterData = null;
		this.xmlAttributeData = null;
		this.xmlAttributes = null;
		this.xmlType = null;
	}

	void setCharacters(String ch) {
		xmlCharacterData = ch;
	}

	void setAttributeData(String val) {
		xmlAttributeData = val;
	}

	void setAttributes(Attributes attr) {
		xmlAttributes = attr;
		xmlType = attr.getValue("xsi:type");
	}

	void setNode(DOMNode node) {
		if (isContainer) {
			if (boundListNodes == null) {
				boundListNodes = new ArrayList<Object>();
			}
			boundListNodes.add(node);
		}
		boundNode = node;
	}

	// marshaller and unmarshaller

	int index;

	String text;
	String javaName;
	String javaClassName;

	boolean isTransient;
	boolean isAttribute;
	boolean isXmlID;
	boolean isXmlIDREF;
	boolean isXmlValue;
	boolean asList;
	boolean isNillable;
	boolean isArray;
	boolean isByteArray;
	boolean isContainer;
	boolean isEnum;
	boolean isEnumValue;

	QName qualifiedName = new QName("", "##default", "");
	QName qualifiedWrapName;
	Map<String, String> attr;

	String xmlSchemaType;
	String typeAdapter;
	String mimeType;

	private Object methodSet;
	private Object methodGet;

	String[] maplistClassNames;

	QName qualifiedTypeName;

	final static int SEE_ALSO = -1;
	final static int SIMPLE = 0;
	final static int LIST = 1;
	final static int MAP = 2;

	final static int NO_OBJECT = 0;
	final static int SIMPLE_OBJECT = 1;
	final static int ARRAY_OBJECT = 2;
	final static int LIST_OBJECT = 3;
	final static int MAP_KEY_OBJECT = 4;
	final static int MAP_VALUE_OBJECT = 8;
	final static int MAP_KEY_VALUE_OBJECT = 12;

	int fieldType = SIMPLE;

	int holdsObjects = NO_OBJECT;

	private boolean isMethod;

	private Object clazz;

	private Object[][] adata;

	/**
	 * @param jclass
	 * @param adata
	 * @param javaObject
	 * @param javaObject2 
	 * @param index
	 * @param propOrder
	 */
	JSJAXBField(JSJAXBClass jaxbClass, Object[][] adata, Object clazz, int index, List<String> propOrder) {
		this.clazz = clazz;
		this.index = index;
		this.adata = adata;
		javaName = (String) adata[0][0];
		isMethod = (javaName != null && javaName.charAt(1) == ':'); 
		javaClassName = (String) adata[0][1];
		holdsObjects = (isObject(javaClassName) ? SIMPLE_OBJECT : NO_OBJECT);
		int pt = javaClassName.indexOf("<");
		if (pt >= 0) {
			isContainer = true;
			maplistClassNames = javaClassName.substring(pt + 1, javaClassName.lastIndexOf(">")).split(",");
			fieldType = maplistClassNames.length;
			for (int i = 0; i < fieldType; i++)
				if (maplistClassNames[i].startsWith("java.lang."))
					maplistClassNames[i] = maplistClassNames[i].substring(10);
			// Map<String, Object>
			// List<Object>
			javaClassName = javaClassName.substring(0, pt);
			switch (fieldType) {
			case LIST:
				if (isObject(maplistClassNames[0]))
					holdsObjects = LIST_OBJECT;
				break;
			case MAP:
				if (isObject(maplistClassNames[0]))
					holdsObjects = MAP_KEY_OBJECT;
				if (isObject(maplistClassNames[1]))
					holdsObjects += MAP_VALUE_OBJECT;
				break;
			}
		}
		isByteArray = javaClassName.equals("byte[]");
		isArray = !isByteArray && javaClassName.indexOf("[]") >= 0;
		if (isArray && holdsObjects == SIMPLE_OBJECT)
			holdsObjects = ARRAY_OBJECT;
		isContainer |= isArray;
		if (isMethod)
			getMethods(jaxbClass.getJavaObject());
		attr = new Hashtable<String, String>();
		readAnnotations(jaxbClass, (String[]) adata[1], propOrder);
	}

	private static boolean isObject(String javaClassName) {
		return javaClassName.equals("java.lang.Object") || javaClassName.equals("Object")
				|| javaClassName.equals("Object[]");
	}

	private void readAnnotations(JSJAXBClass jaxbClass, String[] javaAnnotations, List<String> propOrder) {
		text = "";
		for (int i = 0; i < javaAnnotations.length; i++) {
			String data = javaAnnotations[i];
			text += data + ";";
			int pt = data.indexOf("(");
			String tag = data.substring(0, (pt < 0 ? data.length() : pt));
			tag = tag.replace("@javax.xml.bind.annotation.", "@");
			data = (pt < 0 ? "" : data.substring(pt + 1, data.lastIndexOf(")")));
			if (pt >= 0 && data.indexOf("=") >= 0)
				addXMLAttributes(tag, data, attr);
			if (javaName == null)
				processTypeAnnotation(jaxbClass, tag, data, propOrder);
			else
				processFieldAnnotation(jaxbClass, tag, data);
		}
		// ensure that we have a qualified name if appropriate
		setDefaults();
		qualifiedName = finalizeName(qualifiedName, false);
		if (javaName == null) {
			jaxbClass.setQNameFromField0(qualifiedName);
			if (qualifiedTypeName == null)
				qualifiedTypeName = new QName("", "##default", "");
			jaxbClass.qualifiedTypeName = finalizeName(qualifiedTypeName, true);
			jaxbClass.isAnonymous = (qualifiedTypeName.getLocalPart().length() == 0);
		}
	}

	private QName finalizeName(QName qName, boolean isTypeName) {
		// System.out.println("finalizing " + isTypeName + " qName " + qName + " for " +
		// javaName + " " + javaClassName + " " + text);
		if (qName.getLocalPart().equals("##default"))
			qName = new QName(qName.getNamespaceURI(),
					JSJAXBClass.getXmlNameFromClassName(javaName == null ? javaClassName : javaName),
					qName.getPrefix());
		// System.out.println("finalized as ----" + qName );
		return qName;
	}

	/**
	 * Set a few defaults. The xmlSchema "hexBinary" does not work.
	 */
	private void setDefaults() {
		if (xmlSchemaType == null && typeAdapter == null) {
			if (javaClassName.equals("byte[]"))
				xmlSchemaType = "base64Binary";
			if (javaClassName.equals("javax.xml.datatype.XMLGregorianCalendar")
					|| javaClassName.equals("java.util.Date"))
				xmlSchemaType = "dateTime";
		}
	}

	/**
	 * The first element of the annotation entry is null:
	 * 
	 * Process a type or package annotation. Note that we are not checking for
	 * JAXBExceptions here.
	 * 
	 * @param jaxbClass
	 * @param tag
	 * @param data
	 * @param propOrder
	 */
	private void processTypeAnnotation(JSJAXBClass jaxbClass, String tag, String data, List<String> propOrder) {
		// check package annotations
		switch (tag) {
		case "@XmlSchema":
			return;
		}

		// check type annotations:
		switch (tag) {
		case "@XmlRootElement":
			qualifiedName = getName(tag);
			return;
		case "@XmlType":
			qualifiedTypeName = getName(tag);
			String order = attr.get("@XmlType:propOrder");
			if (order != null) {
				int[] pt = new int[1];
				while (pt[0] >= 0) {
					String prop = PT.getQuotedStringNext(order, pt).trim();
					if (prop.length() == 0)
						break;
					propOrder.add(prop);
				}
			}
			return;
		case "@XmlAccessorType":
			if (data.indexOf("FIELD") >= 0)
				jaxbClass.accessorType = JSJAXBClass.TYPE_FIELD;
			else if (data.indexOf("MEMBER") >= 0)
				jaxbClass.accessorType = JSJAXBClass.TYPE_PUBLIC_MEMBER;
			else if (data.indexOf("PROPERTY") >= 0)
				jaxbClass.accessorType = JSJAXBClass.TYPE_PROPERTY;
			return;
		case "@XmlSeeAlso":
			// @XmlSeeAlso({Dog.class,Cat.class})
			// allows these classes to be identified even though not
			// part of the context of the given class, for example
			// an instance-only class referenced by this class, as
			// in an Object, Object[], List<Object>, or Map<Object,Object>
			jaxbClass.seeAlso = getSeeAlso(data);
			return;
		case "@XmlEnum":
			jaxbClass.enumClassType = data;
			jaxbClass.isEnum = true;
			jaxbClass.enumMap = new Hashtable<Object, Object>();
			return;
		}
		System.out.println("JSJAXBField Unprocessed type annotation: " + text);
	}

	/**
	 * Process a field or method annotation. Note that we are not checking for
	 * JAXBExceptions here.
	 * 
	 * @param jaxbClass
	 * @param tag
	 * @param data      what is in the (...)
	 */
	private void processFieldAnnotation(JSJAXBClass jaxbClass, String tag, String data) {
		switch (tag) {
		case "@XmlTransient":
			isTransient = true;
			return;
		case "@XmlAttribute":
			isAttribute = true;
			qualifiedName = getName(tag);
			return;
		case "@XmlElement":
			qualifiedName = getName(tag);
			isNillable = "true".equals(attr.get("@XmlElement:nillable"));
			return;
		case "@XmlSchemaType":
			xmlSchemaType = attr.get("@XmlSchemaType:name");
			if (xmlSchemaType.equals("hexBinary")) {
				xmlSchemaType = null;
				typeAdapter = "javax.xml.bind.annotation.adapters.HexBinaryAdapter";
			}
			// e.g.
			// @XmlSchemaType(name="date")
			// XMLGregorianCalendar cal;
			//
			// @XmlSchemaType(name="hexBinary") <-- does not work with JAXB
			// https://jinahya.wordpress.com/2012/11/08/printing-binary-as-hexbinary-not-base64binary-with-jaxb/
			// public byte[] hexBytes;
			//
			// @XmlSchemaType(name="base64Binary")
			// public byte[] base64Bytes;
			return;
		case "@XmlJavaTypeAdapter":
			// typically CollapsedStringAdapter.class
			typeAdapter = attr.get("@XmlJavaTypeAdapter:name");
			if (typeAdapter == null)
				typeAdapter = data;
			typeAdapter = typeAdapter.substring(0, data.length() - 6);
			return;
		case "@XmlValue":
			jaxbClass.xmlValueField = this;
			isXmlValue = true;
			return;
		case "@XmlEnumValue":
			data = PT.trim(data, "\"");
			jaxbClass.enumMap.put("/" + javaName, data); // for marshaller
			jaxbClass.enumMap.put(data, this); // for unmarshaller
			isEnumValue = true;
			return;
		case "@XmlList":
			asList = true;
			return;
		case "@XmlID":
			isXmlID = true;
			jaxbClass.xmlIDField = this;
			return;
		case "@XmlIDREF":
			isXmlIDREF = true;
			return;
		case "@XmlMimeType":
			mimeType = attr.get("@XmlMimeType:name");
			// e.g. @XmlMimeType("application/octet-stream")
			// @XmlMimeType("image/jpeg")
			// @XmlMimeType("text/xml; charset=iso-8859-1")
			return;
		case "@XmlElementWrapper":
			qualifiedWrapName = getName(tag);
			return;
		}
		System.out.println("JSJAXBField Unprocessed field annotation: " + text);
	}

	private String[] getSeeAlso(String data) {
		// @XmlSeeAlso(test.jaxb2.Obj.class)
		// @XmlSeeAlso({test.jaxb2.Obj.class,test.jaxb.Obj.class})
		// --> ["test.jaxb.Obj.class"]
		if (data.startsWith("{"))
			data = data.substring(1, data.length() - 1);
		String[] a = data.split(",");
		for (int i = a.length; --i >= 0;) {
			a[i] = a[i].trim();
			a[i] = a[i].substring(0, a[i].length() - 6);
		}
		return a;
	}

	/**
	 * Prepend @Xml......: to the tag name to avoid internal collision when
	 * combining all annotations into one.
	 * 
	 * @param tag
	 * @return
	 */
	private QName getName(String tag) {
		String name, namespace;
		name = attr.get(tag + ":name");
		namespace = attr.get(tag + ":namespace");
		return new QName(namespace, name == null ? "##default" : name,
				namespace == null ? "" : JSJAXBClass.getPrefixFor(namespace));
	}

	/**
	 * Use the built-in jQuery XML parser here (as well as in JSSAXParser) to do the
	 * simple conversion of annotation expressions.
	 * 
	 * @param tag
	 * @param data
	 * @param attr
	 */
	private void addXMLAttributes(String tag, String data, Map<String, String> attr) {
		data = "<__ " + removeCommas(data) + " />";
		// System.out.println(data);
		DOMNode doc = JSUtil.jQuery.parseXML(data);
		DOMNode node = DOMNode.firstChild(doc);
		String[] names = node.getAttributeNames();
		for (int i = 0; i < names.length; i++)
			attr.put(tag + ":" + names[i], node.getAttribute(names[i]));
	}

	private static String removeCommas(String s) {
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

	public String toString() {
		return "{" + javaName + "}" + index;
	}

	// unmarshalling

	boolean isNil() {
		return (xmlAttributes != null && xmlAttributes.getIndex("xsi:nil") >= 0);
	}

	boolean isSimpleType() {
		return (isAttribute || asList || isByteArray || isArray || qualifiedWrapName != null || isNil()
				|| simplePackages());
	}

	private boolean simplePackages() {
		return (javaClassName.indexOf(".") < 0 || javaClassName.startsWith("java.")
				|| javaClassName.startsWith("javax.") || javaClassName.startsWith("javajs."));
	}

	public Class<?> getJavaClassForUnmarshaling() throws ClassNotFoundException {
		return Class.forName(javaClassName);
	}

	private Object findSetMethod(String m, Object[] pm, Object[] jo) {
		if (m.indexOf("$") < 0)
			m += "$";
		for (int i = 0; i < 2; i++) {
			if (pm != null) {
				/**
				 * Looking here for a match to the first $
				 * 
				 * @j2sNative for (var a in pm){if (a.startsWith(m)) { return(pm[a]); } }
				 */
			}
			pm = jo;
		}
		return null;
	}
	/**
	 * Check for methods in C$.$P$[] (private) and object[] (all others) 
	 */
	private void getMethods(Object javaObject) {
		String methodName = javaName.substring(2);
		Object[] pm = /** @j2sNative this.clazz.$P$ || */null;
		Object[] jo = /** @j2sNative this.clazz.prototype || */null;
		// annotation can be on set... or get... or is...
		// so we start by using get instead of set
		// qualifications getXxxx$() and setXxxx$mytype_escaped(xxx)
		methodGet = getMethod(methodName, pm, jo);
		javaName = getJavaNameFromMethodName(methodName, javaObject);
		if (methodGet == null && !isContainer)
			methodGet = getMethod("is" + methodName.substring(3), pm, jo);
		if (methodGet == null) {
			isMethod = false;
			System.out.println("JSJAXBField cannot find getter for " + text);
			return;
		}
		if (isContainer)
			return;		
		methodName = "set" + methodName.substring(methodName.startsWith("is") ? 2 : 3);
		methodSet = findSetMethod(methodName, pm, jo);
		if (methodSet == null) {
			isMethod = false;
			System.out.println("JSJAXBField cannot find setter for " + text);
		}
	}

	/**
	 * There are rules here...
	 * 
	 * @param methodName
	 * @param javaObject 
	 * @return
	 */
	private String getJavaNameFromMethodName(String methodName, Object javaObject) {
		String javaName = methodName.substring(methodName.startsWith("is") ? 2 : 3, methodName.length());
		String lcaseName = javaName.substring(0, 1).toLowerCase() + javaName.substring(1);
		String name = null;
		if (!isDefined(javaObject, name = javaName)
				&& !isDefined(javaObject, name = lcaseName)
				&& methodName.endsWith("Property")) {
			if (!isDefined(javaObject, name = javaName.substring(javaName.length() - 8))
					&& isDefined(javaObject, name = lcaseName.substring(javaName.length() - 8))) {
				System.out.println("JSJAXBMarshaller cannot find field for " + methodName);
				name = methodName;
			}
		}
		return name;
	}

	private Object getMethod(String methodName, Object[] pm, Object[] jo) {
		Object m = getMethodI(methodName, pm);
		return (m != null || jo == null ? m 
				: getMethodI(methodName.indexOf("$") < 0 ? methodName + "$" : methodName, jo));
	}

	private Object getMethodI(String methodName, Object[] a) {
		return /** @j2sNative a && a[methodName] || */ null;
	}

	/**
	 * read the JavaScript type of this object -- array, etc.
	 * 
	 * @param javaName
	 * @return
	 */
	private boolean isDefined(Object javaObject, String fieldName) {
		return (/** @j2sNative javaObject && (typeof javaObject[fieldName] != "undefined") || */ false);
	}

	/**
	 * Retrieve the Java value using the method or directly
	 * 
	 * @return
	 */
	public Object getValue(Object javaObject) {
		return (entryValue == this ? getObject(javaObject) : entryValue);
	}

	@SuppressWarnings("unused")
	public Object getObject(Object javaObject) {
		String n = javaName;
		Object m = (isMethod ? methodGet : null);

		/** @j2sNative return (m ? m.apply(javaObject, []) : javaObject[n]) */
		{
			return null;
		}
	}

	/**
	 * @param value
	 */
	@SuppressWarnings("unused")
	public void setValue(Object value, Object javaObject) {
		Object m = (isMethod ? methodSet : null);
		String j = javaName;
		/**
		 * @j2sNative
		 * 
		 * 			if(m) m.apply(javaObject, [value]); else javaObject[j] = value;
		 */
	}

	XmlAdapter getAdapter() {
		if (typeAdapter == null)
			return null;
		return JSJAXBClass.getAdapter(typeAdapter);
	}

	/*
	 * notes
	 * 
	 * @XmlAttribute
	 * 
	 * https://docs.oracle.com/javase/8/docs/api/javax/xml/bind/annotation/
	 * XmlAttribute.html
	 * 
	 * This annotation can be used with the following annotations: XmlID, XmlIDREF,
	 * XmlList, XmlSchemaType, XmlValue, <--- NOT for XmlAttribute XmlAttachmentRef,
	 * <--- not relevant? XmlMimeType, <--- BASE64 XmlInlineBinaryData <--- not
	 * relevant? XmlJavaTypeAdapter
	 * 
	 * @XmlElement
	 * 
	 * This annotation can be used with following annotations: XmlID, XmlIDREF,
	 * XmlList, XmlSchemaType, XmlValue, XmlAttachmentRef, <--- not relevant
	 * XmlMimeType, <--- BASE64 XmlInlineBinaryData, <--- not relevant
	 * XmlElementWrapper, XmlJavaTypeAdapter.
	 * 
	 */

//  https://docs.oracle.com/cd/E13222_01/wls/docs103/webserv/data_types.html

//	XML Schema Data Type

//	anySimpleType 		java.lang.Object (for xsd:element of this type)
//	anySimpleType 		java.lang.String (for xsd:attribute of this type)
//	base64Binary		byte[]
//	boolean				boolean
//	byte				byte
//	date				javax.xml.datatype.XMLGregorianCalendar
//	dateTime			javax.xml.datatype.XMLGregorianCalendar
//	decimal				java.math.BigDecimal
//	double				double
//	duration			javax.xml.datatype.Duration
//	float				float
//	g					java.xml.datatype.XMLGregorianCalendar
//	hexBinary			byte[]
//	int					int
//	integer				java.math.BigInteger
//	long				long
//	NOTATION			javax.xml.namespace.QName
//	Qname				javax.xml.namespace.QName
//	short				short
//	string				java.lang.String
//	time				java.xml.datatype.XMLGregorianCalendar
//	unsignedByte		short
//	unsignedInt			long	
//	unsignedShort		int 
}
