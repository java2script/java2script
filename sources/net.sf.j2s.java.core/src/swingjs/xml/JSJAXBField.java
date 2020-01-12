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
	List<JSJAXBField> listFields;
	List<Object> listValues;

	JSJAXBField listOwner;
	String defaultValue;

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

	final static int TYPE_NONE = 0;
	final static int TYPE_ROOT_ELEMENT = 1;
	final static int TYPE_XML_TYPE = 2;
	final static int TYPE_ATTRIBUTE = 3;
	final static int TYPE_ELEMENT = 4;

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
	boolean isNotPublic;
	
	boolean ignore;

	/// private only

	private Object methodSet;
	private Object methodGet;
	private boolean isMethod;

	/// debugging only

	private int index;
	private Object clazz; // for debugging only

	String methodName;


	JSJAXBField(JSJAXBField listOwner) {
		this.listOwner = listOwner;
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
				classNames[i] = stripJavaLang(classNames[i]);
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
		String[] attrs = (String[]) adata[1];
		if (adata[0].length == 4) {
			// new style has the full class name, not just @XmlRootElement
			String[] classes = (String[]) adata[0][3];
			for (int i = classes.length; --i >= 0;) {
				attrs[i] = "@" + classes[i] + "(" + attrs[i] + ")";
			}
		}
		readAnnotations(jaxbClass, attrs, propOrder, attr);

		// ensure that we have a qualified name if appropriate
		finalizeNames(index, jaxbClass);
	}

	private void finalizeNames(int index, JSJAXBClass jaxbClass) {
		if (xmlSchemaType == null && typeAdapter == null) {
			if (javaClassName.equals("byte[]"))
				xmlSchemaType = "base64Binary";
			if (javaClassName.equals("javax.xml.datatype.XMLGregorianCalendar")
					|| javaClassName.equals("java.util.Date"))
				xmlSchemaType = "dateTime";
		}
		if (index == 0) {
			qualifiedName = jaxbClass.finalizeFieldQName(qualifiedName, javaClassName, TYPE_ROOT_ELEMENT);
			qualifiedTypeName = jaxbClass.finalizeFieldQName(qualifiedTypeName, javaClassName, TYPE_XML_TYPE);
			jaxbClass.isAnonymous = (jaxbClass.qualifiedTypeName.getLocalPart().length() == 0);
		} else {
			if (javaName != null) {
				if (qualifiedWrapName != null) {
					qualifiedWrapName = jaxbClass.finalizeFieldQName(qualifiedWrapName, null, TYPE_ELEMENT);
				}
				qualifiedName = jaxbClass.finalizeFieldQName(qualifiedName, javaName,
						(isAttribute ? TYPE_ATTRIBUTE : TYPE_ELEMENT));
			}
		}
	}

	private static String stripJavaLang(String name) {
		return (name.startsWith("java.lang.")?  name.substring(10) : name);
	}

	/**
	 * prior to re-use in unmarshalling
	 * 
	 */
	@Override
	public JSJAXBField clone() {
		try {
			JSJAXBField f = (JSJAXBField) super.clone();
			// marshaller
			f.mapEntryValue = null;
			// unmarshaller
			f.boundNode = null;
			f.boundListNodes = null;
			f.xmlCharacterData = "";
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
		// <..../> will result in null for textContent
		xmlCharacterData = (ch == null ? "" : ch);
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

	private static boolean isObject(String javaClassName) {
		return javaClassName.equals("java.lang.Object") || javaClassName.equals("Object")
				|| javaClassName.equals("Object[]");
	}

	private void readAnnotations(JSJAXBClass jaxbClass, String[] javaAnnotations, List<String> propOrder,
			Map<String, String> attr) {
		for (int i = 0; i < javaAnnotations.length; i++) {
			String data = javaAnnotations[i];
			text += data + ";";
			int pt = data.indexOf("(");
			String tag = data.substring(0, (pt < 0 ? data.length() : pt));
			tag = tag.replace("@javax.xml.bind.annotation.", "@");
			data = (pt < 0 ? "" : data.substring(pt + 1, data.lastIndexOf(")")));
			if (pt >= 0 && !tag.equals("@XmlElements") && data.indexOf("=") >= 0)
				addXMLAttributes(tag, data, attr);
			if (javaName == null)
				processTypeAnnotation(jaxbClass, tag, data, propOrder, attr);
			else
				processFieldAnnotation(jaxbClass, tag, data, attr);
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
	 * @param attr      TODO
	 */
	private void processTypeAnnotation(JSJAXBClass jaxbClass, String tag, String data, List<String> propOrder,
			Map<String, String> attr) {
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
			jaxbClass.accessorType = JSJAXBClass.parseAccessorType(data);
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
		case "!XmlPublic":
			// transpiler has added this tag for each field and method because XmlAccessorType was not indicated in
			// the class file
			isNotPublic = data.equals("false");
			switch (jaxbClass.accessorType) {
			case JSJAXBClass.TYPE_PUBLIC_MEMBER:
				ignore = isNotPublic;
				break;
			case JSJAXBClass.TYPE_NONE:
				ignore = true;
				break;
			case JSJAXBClass.TYPE_FIELD:
				ignore = isMethod;
				break;
			case JSJAXBClass.TYPE_PROPERTY:
				ignore = !isMethod;
				break;
			}
			if (!ignore)
				javaName = null;
			break;
		case "!XmlInner":
			jaxbClass.addSeeAlso(javaClassName);
			javaName = null;
			return;
		case "@XmlTransient":
			isTransient = true;
			break;
		case "@XmlAttribute":
			isAttribute = true;
			if (isContainer)
				asList = true;
			qualifiedName = getName(tag, attr);
			break;
		case "@XmlElements":
			listFields = new ArrayList<JSJAXBField>();
			break;
		case "@XmlElement":
			if (listFields != null) {
				JSJAXBField f = new JSJAXBField(this);
				listFields.add(f);
				f.processFieldAnnotation(jaxbClass, tag, data, attr);
				f.javaClassName = stripJavaLang(f.javaClassName).replace(".class", "");
				f.javaName = javaName + "::" + f.javaClassName;
				f.finalizeNames(index, jaxbClass);
				break;
			}
			qualifiedName = getName(tag, attr);
			isNillable = "true".equals(attr.get("@XmlElement:nillable"));
			defaultValue = attr.get("@XmlElement:defaultValue");
			String type = attr.get("@XmlElement:type");
			if (type != null)
				javaClassName = type;
			break;
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
			break;
		case "@XmlJavaTypeAdapter":
			// typically CollapsedStringAdapter.class
			typeAdapter = attr.get("@XmlJavaTypeAdapter:name");
			if (typeAdapter == null)
				typeAdapter = data;
			typeAdapter = getQuotedClass(data);
			break;
		case "@XmlValue":
			jaxbClass.xmlValueField = this;
			isXmlValue = true;
			break;
		case "@XmlEnumValue":
			enumValue = data = PT.trim(data, "\"");
			jaxbClass.enumMap.put("/" + javaName, data); // for marshaller
			jaxbClass.enumMap.put("//" + data, javaName); // for unmarshaller
			jaxbClass.enumMap.put(data, this); // for unmarshaller
			break;
		case "@XmlList":
			asList = true;
			break;
		case "@XmlID":
			isXmlID = true;
			jaxbClass.xmlIDField = this;
			break;
		case "@XmlIDREF":
			isXmlIDREF = true;
			break;
		case "@XmlMimeType":
			mimeType = attr.get("@XmlMimeType:name");
			// e.g. @XmlMimeType("application/octet-stream")
			// @XmlMimeType("image/jpeg")
			// @XmlMimeType("text/xml; charset=iso-8859-1")
			break;
		case "@XmlElementWrapper":
			qualifiedWrapName = getName(tag, attr);
			break;
		default:
			System.out.println("JSJAXBField Unprocessed field annotation: " + text);
			ignore = true;
			break;
		}
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

	@Override
	public String toString() {
		return "{" + javaName + "}" + index;
	}

	// unmarshalling

	boolean isSimpleType(String javaClassName) {
		return (javaClassName != null ? simplePackages(javaClassName)
				: isNil || asList || isByteArray || isArray || qualifiedWrapName != null ? true
						: xmlType != null ? false : isAttribute || simplePackages(this.javaClassName));
	}

	static boolean simplePackages(String javaClassName) {
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
		methodName = javaName.substring(2);
		Object[] pm = /** @j2sNative clazz.$P$ || */
				null;
		Object[] jo = /** @j2sNative clazz.prototype || */
				null;
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
		if (!isDefined(javaObject, name = javaName) && !isDefined(javaObject, name = lcaseName)
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
		return /** @j2sNative a && a[methodName] || */
		null;
	}

	/**
	 * read the JavaScript type of this object -- array, etc.
	 * 
	 * @param javaName
	 * @return
	 */
	private boolean isDefined(Object javaObject, String fieldName) {
		return (/** @j2sNative javaObject && (typeof javaObject[fieldName] != "undefined") || */
		false);
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
		if (listOwner != null) {
			listOwner.addValue(value);
			return;
		}
		if (fieldType == LIST) {
			List<Object> l = (List<Object>) getObject(javaObject);
			if (l == null) {
				l = new ArrayList<Object>();
			} else {
				l.clear();
			}
			Object[] a = (Object[]) value;
			for (int i = 0, n = a.length; i < n; i++)
				l.add(a[i]);
			if (isMethod)
				return;
			value = l;
		}

		Object m = (isMethod ? methodSet : null);
		String j = javaName;
		/**
		 * @j2sNative
		 * 
		 * 			if(m) m.apply(javaObject, [value]); else javaObject[j] = value;
		 */
	}

	private void addValue(Object value) {
		if (listValues == null)
			listValues = new ArrayList<Object>();
		listValues.add(value);
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

// https://www.w3.org/TR/xmlschema11-2/
	
	public static final String XML_SCHEMA_TYPES = ""
// datetype:
			+ ";duration;dateTime;time;date;gYearMonth;gYear;gMonthDay;gDay;gMonth;yearMonthDuration;dayTimeDuration;dateTimeStamp"
//		    3.2 Special Built-in Datatypes
			+ ";anySimpleType;anyAtomicType"
			+ ";string;boolean;decimal;float;double;"// duration;dateTime;time
//		    3.3 Primitive Datatypes    	
			+ ";hexBinary;base64Binary;anyURI;QName;NOTATION" // date;gYearMonth;gYear;gMonthDay;gDay;gMonth;		
//		    3.4 Other Built-in Datatypes
			+ ";normalizedString;token;language;NMTOKEN;NMTOKENS;Name;NCName"
			+ ";ID;IDREF;IDREFS;ENTITY;ENTITIES;integer;nonPositiveInteger;negativeInteger"
			+ ";long;int;short;byte;nonNegativeInteger;unsignedLong;unsignedInt;unsignedShort"
			+ ";unsignedByte;positiveInteger;"; // ;yearMonthDuration;dayTimeDuration;dateTimeStamp;

//  see also https://docs.oracle.com/cd/E13222_01/wls/docs103/webserv/data_types.html

//	XML Schema Data Type

	public static boolean isknownSchemaType(String xmlSchemaType) {
		return PT.isOneOf(xmlSchemaType, XML_SCHEMA_TYPES);
	}

}
