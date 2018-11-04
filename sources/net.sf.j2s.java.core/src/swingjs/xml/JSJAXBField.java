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
class JSJAXBField implements Cloneable {

	// Marshaller only

	// used immediately and nulled out.
	transient Object mapEntryValue = this;

	// Unmarshaller only

	final static int SIMPLE = 0;
	final static int LIST = 1;
	final static int MAP = 2;

	int fieldType = SIMPLE;

	DOMNode boundNode;
	List<Object> boundListNodes;
	QName qualifiedTypeName;

	String xmlCharacterData = "";
	String xmlAttributeData;
//	Attributes xmlAttributes;
	String xmlType;
	boolean isNil;

	// marshaller and unmarshaller

	final static int NO_OBJECT = 0;
	final static int SIMPLE_OBJECT = 1;
	final static int ARRAY_OBJECT = 2;
	final static int LIST_OBJECT = 3;
	final static int MAP_KEY_OBJECT = 4;
	final static int MAP_VALUE_OBJECT = 8;

	int holdsObjects = NO_OBJECT;

	QName qualifiedName;
	QName qualifiedWrapName;

	String text;
	String javaName;
	String javaClassName;
	String xmlSchemaType;
	String typeAdapter;
	String mimeType;
    String enumValue;
	String mapClassNameKey;
	String mapClassNameValue;
	String listClassName;


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

	/// private only
	
	private Object methodSet;
	private Object methodGet;
	private boolean isMethod;

	/// debugging only
	
	private int index;
    private Object clazz; // for debugging only


	/**
	 * prior to re-use in unmarshalling
	 * 
	 */
	public JSJAXBField clone() {		
		try {
			JSJAXBField f = (JSJAXBField) super.clone();
		// marshaller
		f.mapEntryValue = null;
		// unmarshaller
		f.boundNode = null;
		f.boundListNodes = null;
		f.xmlCharacterData = null;
		f.xmlAttributeData = null;
//		f.xmlAttributes = null;
		f.xmlType = null;
		f.isNil = false;
		return f;
		} catch (CloneNotSupportedException e) {
			return null;
		}
	}

	void setCharacters(String ch) {
		xmlCharacterData = ch;
	}

	void setAttributeData(String val) {
		xmlAttributeData = val;
	}

	void setAttributes(Attributes attr) {
//		xmlAttributes = attr;
		xmlType = attr.getValue("xsi:type");
		isNil = (attr.getIndex("xsi:nil") >= 0);
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
		javaName = (String) adata[0][0];
		isMethod = (javaName != null && javaName.charAt(1) == ':');
		javaClassName = (String) adata[0][1];
		holdsObjects = (isObject(javaClassName) ? SIMPLE_OBJECT : NO_OBJECT);
		int pt = javaClassName.indexOf("<");
		if (pt >= 0) {
			isContainer = true;
			String[] classNames = javaClassName.substring(pt + 1, javaClassName.lastIndexOf(">")).split(",");
			fieldType = classNames.length;
			for (int i = 0; i < fieldType; i++)
				if (classNames[i].startsWith("java.lang."))
					classNames[i] = classNames[i].substring(10);
			// Map<String, Object>
			// List<Object>
			javaClassName = javaClassName.substring(0, pt);
			switch (fieldType) {
			case LIST:
				if (isObject(listClassName = classNames[0]))
					holdsObjects = LIST_OBJECT;

				break;
			case MAP:
				if (isObject(mapClassNameKey = classNames[0]))
					holdsObjects = MAP_KEY_OBJECT;
				if (isObject(mapClassNameValue = classNames[1]))
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
			getMethods(jaxbClass.getJavaObject(), clazz);
		Map<String, String> attr = new Hashtable<String, String>();
		text = "";
		readAnnotations(jaxbClass, (String[]) adata[1], propOrder, attr);
		// ensure that we have a qualified name if appropriate
		setDefaults();
		if (qualifiedWrapName != null) {
			qualifiedWrapName = jaxbClass.finalizeFieldQName(qualifiedWrapName, null);
		}
		if (index == 0) {
			qualifiedName = jaxbClass.finalizeFieldQName(qualifiedName, javaClassName);
			jaxbClass.setQName(qualifiedName);
			jaxbClass.qualifiedTypeName = jaxbClass.finalizeFieldQName(qualifiedTypeName, javaClassName);
			jaxbClass.isAnonymous = (jaxbClass.qualifiedTypeName.getLocalPart().length() == 0);
		} else {
			if (javaName != null)
				qualifiedName = jaxbClass.finalizeFieldQName(qualifiedName, javaName);
		}
	}

	private static boolean isObject(String javaClassName) {
		return javaClassName.equals("java.lang.Object") || javaClassName.equals("Object")
				|| javaClassName.equals("Object[]");
	}

	private void readAnnotations(JSJAXBClass jaxbClass, String[] javaAnnotations, List<String> propOrder, Map<String, String> attr) {
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
				processTypeAnnotation(jaxbClass, tag, data, propOrder, attr);
			else
				processFieldAnnotation(jaxbClass, tag, data, attr);
		}
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
	 * @param attr TODO
	 */
	private void processTypeAnnotation(JSJAXBClass jaxbClass, String tag, String data, List<String> propOrder, Map<String, String> attr) {
		// check package annotations
		switch (tag) {
		case "@XmlSchema": 
			return;
		}

		// check type annotations:
		switch (tag) {
		case "@XmlRootElement":
			qualifiedName = getName(tag, attr);
			return;
		case "@XmlType":
			qualifiedTypeName = getName(tag, attr);
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
			jaxbClass.accessorType = (data.indexOf("FIELD") >= 0 ? JSJAXBClass.TYPE_FIELD
					: data.indexOf("MEMBER") >= 0 ? JSJAXBClass.TYPE_PUBLIC_MEMBER
					: data.indexOf("PROPERTY") >= 0 ? JSJAXBClass.TYPE_PROPERTY
					: JSJAXBClass.TYPE_NONE);
			return;
		case "@XmlSeeAlso":
			// @XmlSeeAlso({Dog.class,Cat.class})
			// allows these classes to be identified even though not
			// part of the context of the given class, for example
			// an instance-only class referenced by this class, as
			// in an Object, Object[], List<Object>, or Map<Object,Object>
			jaxbClass.addSeeAlso(getSeeAlso(data));
			return;
		case "@XmlEnum":
			jaxbClass.initEnum(data);
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
	 * @param attr 
	 */
	private void processFieldAnnotation(JSJAXBClass jaxbClass, String tag, String data, Map<String, String> attr) {
		switch (tag) {
		case "!XmlInner":
			jaxbClass.addSeeAlso(javaClassName);
			javaName = null;
			return;
		case "@XmlTransient":
			isTransient = true;
			return;
		case "@XmlAttribute":
			isAttribute = true;
			qualifiedName = getName(tag, attr);
			return;
		case "@XmlElement":
			qualifiedName = getName(tag, attr);
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
			typeAdapter = getQuotedClass(data);
			return;
		case "@XmlValue":
			jaxbClass.xmlValueField = this;
			isXmlValue = true;
			return;
		case "@XmlEnumValue":
			enumValue = data = PT.trim(data, "\"");
			jaxbClass.enumMap.put("/" + javaName, data); // for marshaller
			jaxbClass.enumMap.put("//" + data, javaName); // for unmarshaller
			jaxbClass.enumMap.put(data, this); // for unmarshaller
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
			qualifiedWrapName = getName(tag, attr);
			return;
		}
		System.out.println("JSJAXBField Unprocessed field annotation: " + text);
	}

	private static String[] getSeeAlso(String data) {
		// @XmlSeeAlso(test.jaxb2.Obj.class)
		// @XmlSeeAlso({"test.jaxb2.Obj.class","test.jaxb.Obj.class"})
		// --> ["test.jaxb.Obj.class"]
		String[] a = data.split(",");
		for (int i = a.length; --i >= 0;)
			a[i] = getQuotedClass(a[i]);
		return a;
	}

	private static String getQuotedClass(String s) {
		s = PT.getQuotedStringAt(s, 0);
		return s.substring(0, s.length() - 6);
	}

	/**
	 * Prepend @Xml......: to the tag name to avoid internal collision when
	 * combining all annotations into one.
	 * 
	 * @param tag
	 * @param attr TODO
	 * @return
	 */
	private QName getName(String tag, Map<String, String> attr) {
		String name, namespace;
		name = attr.get(tag + ":name");
		namespace = attr.get(tag + ":namespace");
		return new QName(namespace == null ? "##default" : namespace, name == null ? "##default" : name, "");
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
		data = "<__ " + data.replace('{', '\'').replace('}', '\'') + " />";
		// System.out.println(data);
		DOMNode doc = JSUtil.jQuery.parseXML(data);
		DOMNode node = DOMNode.firstChild(doc);
		String[] names = node.getAttributeNames();
		for (int i = 0; i < names.length; i++)
			attr.put(tag + ":" + names[i], node.getAttribute(names[i]));
	}

//	private static String removeCommas(String data) {
//		return data.replace('{', '\'').replace('}', '\'');
//		boolean quoted = false;
//		boolean needQuote = false;
//		boolean needQuote2 = false;
//		for (int i = 0; i < s.length(); i++) {
//			char c = s.charAt(i);
//			if (c == '"') {
//				quoted = !quoted;
//				needQuote = false;
//				continue;
//			}
//			if (needQuote) {
//				if (c != '{') {
//					s = s.substring(0, i) + "\"" + s.substring(i++);
//					needQuote = false;
//					needQuote2 = true;
//					continue;
//				}
//				needQuote = false;
//			}
//			if (quoted)
//				continue;
//			switch (c) { 	
//			case '=':
//				needQuote = true;
//				break;
//			case '\\':
//				i++;
//				break;
//			case ',':
//				s = s.substring(0, i) + (needQuote2 ? "\" " : " ") + s.substring(++i);
//				needQuote2 = false;
//				break;
//			case '{':
//			case '}':
//				s = s.substring(0, i) + "'" + s.substring(i + 1);
//				break;
//			}
//		}
//		if (needQuote2)
//			s += '"';
//		return s;
//	}

	public String toString() {
		return "{" + javaName + "}" + index;
	}

	// unmarshalling

	boolean isSimpleType() {
		return (isAttribute || asList || isByteArray || isArray || qualifiedWrapName != null || isNil
				|| simplePackages());
	}

	private boolean simplePackages() {
		return (javaClassName.indexOf(".") < 0 || javaClassName.startsWith("java.")
				|| javaClassName.startsWith("javax.") || javaClassName.startsWith("javajs."));
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
	private void getMethods(Object javaObject, Object clazz) {
		String methodName = javaName.substring(2);
		Object[] pm = /** @j2sNative clazz.$P$ || */null;
		Object[] jo = /** @j2sNative clazz.prototype || */null;
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
	Object getValue(Object javaObject) {
		Object o = mapEntryValue;
		if (o == this)
			return getObject(javaObject);
		mapEntryValue = this;
		return o;
	}

	@SuppressWarnings("unused")
	Object getObject(Object javaObject) {
		if (enumValue != null) {
			return enumValue;
		}
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
	void setValue(Object value, Object javaObject) {
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
