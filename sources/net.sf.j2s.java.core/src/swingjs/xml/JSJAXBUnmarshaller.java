package swingjs.xml;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.xml.bind.DatatypeConverter;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.UnmarshallerHandler;
import javax.xml.bind.annotation.adapters.XmlAdapter;
import javax.xml.bind.helpers.AbstractUnmarshallerImpl;
import javax.xml.namespace.QName;
import javax.xml.stream.XMLStreamReader;

import org.w3c.dom.Node;
import org.xml.sax.Attributes;
import org.xml.sax.ContentHandler;
import org.xml.sax.InputSource;
import org.xml.sax.Locator;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;

import javajs.util.PT;
import swingjs.api.js.DOMNode;

/**
 * Simple marshaller/unmarshaller
 * 
 * @author hansonr
 *
 */
public class JSJAXBUnmarshaller extends AbstractUnmarshallerImpl implements ContentHandler {

	private static final int MODE_START = 0;
	private static final int MODE_RESTARTING = 1;
	private static final int MODE_RETURN_ELEMENT = 2;
	private static final int MODE_CONTINUE = 3;

//	<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
//	<employee id="1">
//	    <name>Vimal Jaiswal</name>
//	    <Salary>50000.0</Salary>
//	</employee>

	private JAXBContext context;
	private JSSAXParser parser;
	private InputSource xmlSource;

	private JSJAXBClass jaxbClass;
	private DOMNode doc;
	private Object javaObject;
	private String haventUnmarshalled = "";

//	Map<String, Object> properties = new HashMap<String, Object>();
//	private InputStream inputStream;
//	private Reader reader;

	public JSJAXBUnmarshaller(JAXBContext context) {
		this.context = context;
	}

	@Override
	public Object unmarshal(Node node) throws JAXBException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UnmarshallerHandler getUnmarshallerHandler() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> JAXBElement<T> unmarshal(XMLStreamReader reader, Class<T> expectedType) throws JAXBException {
		parser = new JSSAXParser();
		xmlSource = ((JSXMLStreamReader) reader).getSource();
		@SuppressWarnings("unchecked")
		JAXBElement<T> o = (JAXBElement<T>) doUnmarshal(null, expectedType, MODE_RETURN_ELEMENT);
		clearStatics();
		return o;
	}

	@Override
	protected Object unmarshal(XMLReader reader, InputSource source) throws JAXBException {
		parser = (JSSAXParser) reader;
		xmlSource = source;
		Class<?>[] classes = ((JSJAXBContext) context).getjavaClasses();
		Class<?> javaClass = null;
		doc = null;
		try {
			switch (classes.length) {
			case 0:
				return null;
			case 1:
				javaClass = classes[0];
				break;
			default:
				parser.setContentHandler(this);
				parser.parse(xmlSource, JSSAXParser.PARSE_GET_DOC_ONLY);
				doc = parser.getNode();
				javaClass = findClassForNode(doc, classes);
			}
		} catch (IOException | SAXException e) {
			e.printStackTrace();
		}

		if (javaClass == null)
			return null;
		Object o = doUnmarshal(doc, javaClass, classes.length > 1 ? MODE_RESTARTING : MODE_START);
		
		jaxbClass = null;
		doc = null;
		javaObject = null;
		clearStatics();
		return o;
	}

	private Class<?> findClassForNode(DOMNode doc, Class<?>[] classes) {

		DOMNode node = /** @j2sNative doc.children[0] || */
				null;
		String nodeName = (String) DOMNode.getAttr(node, "localName");
		for (int i = 0; i < classes.length; i++) {
			JSJAXBClass jaxbClass = new JSJAXBClass(classes[i], null, false, false, null);
			String name = jaxbClass.getQName().getLocalPart();
			if (nodeName.equals(name))
				return classes[i];
		}
		// TODO Auto-generated method stub
		return null;
	}

	private Object unmarshalField(JSJAXBField field, DOMNode node, String className) {
		if (field != null)
			try {
				return doUnmarshal(node, Class.forName(className == null ? field.javaClassName :className), MODE_CONTINUE);
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
		return null;
	}

	/**
	 * Optionally start with a DOMNode
	 * 
	 * @param doc
	 * @param javaClass
	 * @return an instance of this class
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private Object doUnmarshal(DOMNode node, Class<?> javaClass, int mode) {
		if (jaxbClass != null)
			addSeeAlso(javaClass);

		JSJAXBClass oldJaxbClass = jaxbClass;
		DOMNode oldDoc = doc;
		doc = null;
		boolean isEnum = javaClass.isEnum();
		Object oldObject = this.javaObject;
		Object javaObject = null;
		try {
			if (!isEnum)
				javaObject = javaClass.newInstance();
		} catch (InstantiationException | IllegalAccessException e) {
			e.printStackTrace();
			return null;
		}
		this.javaObject = javaObject;
		jaxbClass = newUnmarshalledInstance(javaClass, javaObject);
		try {
			parser.setContentHandler(this);
			switch (mode) {
			case MODE_RESTARTING:
				parser.parseDocument(oldDoc, JSSAXParser.PARSE_TOP_LEVEL_ONLY);
				break;
			case MODE_RETURN_ELEMENT:
			case MODE_START:
				// node == null
				parser.parse(xmlSource, JSSAXParser.PARSE_TOP_LEVEL_ONLY);
				break;
			case MODE_CONTINUE:
				parser.walkDOMTree(node, JSSAXParser.PARSE_TOP_LEVEL_ONLY);
				break;
			}
		} catch (IOException e) {
			e.printStackTrace();
		} catch (SAXException e) {
			e.printStackTrace();
		}
		processMaps();
		processArraysAndLists();
		if (jaxbClass.isEnum)
			javaObject = getEnumValue(jaxbClass, javaClass, JSSAXParser.getSimpleInnerText(node));

		QName qname = jaxbClass.getQName();

		jaxbClass = oldJaxbClass;
		doc = oldDoc;
		this.javaObject = oldObject;

		return (mode == MODE_RETURN_ELEMENT ? new JAXBElement(qname, javaClass, javaObject) : javaObject);
	}

	public Object getEnumValue(JSJAXBClass jaxbClass, Class<?> javaClass, String xmlName) {
		if (jaxbClass == null)
			jaxbClass = new JSJAXBClass(javaClass, null, false, false, null);
		@SuppressWarnings("unused")
		String name = (String) jaxbClass.enumMap.get("//" + xmlName);
		Object o = null;
		/**
		 * @j2sNative
		 * 
		 * 			o = Enum.valueOf$Class$S(javaClass, name);
		 */
		return o;
	}

	private void processArraysAndLists() {
		for (int j = jaxbClass.fields.size(); --j >= 0;) {
			JSJAXBField field = jaxbClass.fields.get(j);
			if (!field.isAttribute 
					&& (field.boundListNodes != null || field.listValues != null) 
					&& field.fieldType != JSJAXBField.MAP) {
				// unwrapped set - array or list or map?
//				System.out.println("Filling List " + field.javaName);
				String type = (field.isArray ? field.javaClassName.replace("[]", "") : field.listClassName);
				boolean holdsObject = (field.holdsObjects != JSJAXBField.NO_OBJECT);
				field.setValue(fillArrayData(field, null, null, (holdsObject ? null : type), !field.isArray), this.javaObject);
			}
			field.boundListNodes = null;
		}
	}

	@SuppressWarnings("unchecked")
	private void processMaps() {
		for (int j = jaxbClass.fields.size(); --j >= 0;) {
			JSJAXBField field = jaxbClass.fields.get(j);
			if (field.fieldType != JSJAXBField.MAP)
				continue;
//			System.out.println("Filling Map " + field.javaName);
			List<Object> nodes = field.boundListNodes;
			Map<Object, Object> map = (Map<Object, Object>) field.getObject(javaObject);
			if (map == null) {
				field.setValue(map = new HashMap<Object, Object>(), javaObject);
			}
			map.clear();
			if (nodes != null) {
				String keyType = ((field.holdsObjects & JSJAXBField.MAP_KEY_OBJECT) != 0 ? null
						: field.mapClassNameKey);
				String valueType = ((field.holdsObjects & JSJAXBField.MAP_VALUE_OBJECT) != 0 ? null
						: field.mapClassNameValue);
				String className = needsUnmarshalling(field, keyType);
				if (className != null)
					keyType = className;
				JSJAXBField keyFieldToUnmarshal = (className == null ? null : field);
				className = needsUnmarshalling(field, valueType);
				if (className != null)
					valueType = className;
				JSJAXBField valueFieldToUnmarshal = (className == null ? null : field);
				for (int i = 1, n = nodes.size(); i < n;) {
					Object key = getNodeObject(keyFieldToUnmarshal, (DOMNode) nodes.get(i++), keyType, null, true);
					Object value = getNodeObject(valueFieldToUnmarshal, (DOMNode) nodes.get(i++), valueType, null, true);
//					System.out.println("map.put " + key + " = " + value);
					map.put(key, value);
				}
			}
			field.boundListNodes = null;
		}
	}

	private Object[] getArrayOfType(JSJAXBField field, String type, int len) {
		// JavaScript will return the appropriate type of array,
		// even if it is primitive.

		Object[] a = (Object[]) field.getObject(javaObject);
		if (a != null)
			return a;
		if (type != null) {
			if (isPrimitive(type)) {
				type = (type == "int" ? "Integer" : type.substring(0, 1).toUpperCase() + type.substring(1)) + ".TYPE";
				/**
				 * @j2sNative
				 * 
				 * 			a = Clazz.array(eval(type),len);
				 * 
				 */
			} else {
				try {
					a = (Object[]) Array.newInstance(Class.forName(type), len);
				} catch (NegativeArraySizeException | ClassNotFoundException e) {
					e.printStackTrace();
				}
			}
			return a;
		}
		return new Object[len];
	}

	private Object[] fillArrayData(JSJAXBField field, DOMNode node, Object[] data, String arrayType, boolean asObject) {
		boolean haveData = (data != null);
		int n = (haveData ? data.length : field.boundListNodes != null ? field.boundListNodes.size() : field.listValues.size());
		Object[] a = getArrayOfType(field, arrayType, n);
		if (!haveData)
			data = a; // nulls
		// TODO: what if arrayType is Object?
		String className = needsUnmarshalling(field, arrayType);
		JSJAXBField fieldToUnmarshal = (className == null ? null : field);
		if (className != null)
			arrayType = className;
		for (int i = 0; i < n; i++)
			a[i] = (field.listValues != null ? field.listValues.get(i) : getNodeObject(fieldToUnmarshal, (node == null ? (DOMNode) field.boundListNodes.get(i) : node), arrayType, data[i],
					asObject));
		return a;
	}

	private Object getNodeObject(JSJAXBField fieldToUnmarshal, DOMNode node, String type, Object data, boolean asObject) {
		if (fieldToUnmarshal != null) {
			return unmarshalField(fieldToUnmarshal, node, type);
		}
		if (node == null)
			return null;
		if (data == null)
			data = JSSAXParser.getSimpleInnerText(node);
		if (type == null) {
			type = JSSAXParser.getAttribute(node, "xsi:type");
			if (type == null)
				return null;
			if (type.indexOf(":") >= 0 && !type.startsWith("xs:")) {
				// this is a SeeAlso entry
				QName qname = getQnameForAttribute(null, null, type);
				JSJAXBField field = getFieldFromQName(qname);
				return unmarshalField(field, node, null);
			}
		}
		return convertFromType(null, data, type, asObject);
	}

	private void start(DOMNode node, QName qName, Attributes atts) {
		//System.out.println(">>JSJAXBUnmarshaller start:" + qName);
		String text = JSSAXParser.getSimpleInnerText(node);
		if (doc == null) {
			doc = node;
			setDocAttributes(qName, text, atts);
			return;
		}
//		/**
//		 * @j2sNative
//		System.out.println("start:" +node.outerHTML);
//		 */
		JSJAXBField field = getFieldFromQName(qName);
		if (field != null) {
			bindNode(node, field, atts);
			field.setCharacters(text);
			setFieldValue(field);
		}
	}

	private void setDocAttributes(QName qName, String value, Attributes atts) {
		if (jaxbClass.xmlValueField != null) {
			jaxbClass.xmlValueField.setCharacters(value);
			jaxbClass.xmlValueField.setNode(doc);
			setFieldValue(jaxbClass.xmlValueField);
		}
		prepareForUnmarshalling(atts.getValue("xmlns"));
		for (int i = atts.getLength(); --i >= 0;) {
			String uri = atts.getURI(i);
			String localName = atts.getLocalName(i);
			String qname = atts.getQName(i);
			if (qname.equals("xmlns") || qname.startsWith("xmlns:") || qname.startsWith("xsi:")) {
				continue;
			}
			// attribute assumes uri of tag if "" -- NO!
//			if (uri.length() == 0)
//				uri = qName.getNamespaceURI();
			QName qn = getQnameForAttribute(uri, localName, qname);
			JSJAXBField field = getFieldFromQName(qn);
			if (field != null) {
				field.setNode(doc);
				field.setAttributeData(atts.getValue(i));
				setFieldValue(field);
			}
		}
	}

	private QName getQnameForAttribute(String uri, String localName, String qname) {
		if (qname.indexOf(":") >= 0) {
			uri = parser.getNamespaceForAttributeName(qname);
			localName = qname.substring(qname.indexOf(":") + 1);
		}
		return new QName(uri, localName, "");
	}

	private void bindNode(DOMNode node, JSJAXBField field, Attributes atts) {
		if (field != null) {
			field.setNode(node);
			field.setAttributes(atts);
		}
	}

	///////////////////////// class and field checks ///////////////////

	private final static Map<String, Boolean> knownJavaClasses = new Hashtable<>();
	private final static Map<String, JSJAXBField> seeAlsoMap = new Hashtable<>();
	private final static Map<String, JSJAXBClass> knownJAXBClasses = new Hashtable<>();

	static void clearStatics() {
		knownJavaClasses.clear();
		knownJAXBClasses.clear();
		seeAlsoMap.clear();
		JSJAXBClass.clearStatics();
	}

	static JSJAXBClass newUnmarshalledInstance(Class<?> javaClass, Object javaObject) {
		String name = javaClass.getCanonicalName();
		JSJAXBClass jjc = knownJAXBClasses.get(name);
		if (jjc == null) {
			jjc = new JSJAXBClass(javaClass, javaObject, false, false, null);
			knownJAXBClasses.put(name, jjc);
			return jjc;
		}
		return jjc.clone();
	}

	public String needsUnmarshalling(JSJAXBField field, String javaClassName) {
		if (field.isSimpleType(javaClassName))
			return null;
		boolean isMarshalled = false;
		if (javaClassName == null)
			javaClassName = field.javaClassName;
		if (field.xmlType != null) {
			String typeClassName = getXMLTypeClassName(field);
			if (typeClassName == null)
				return null;
			javaClassName = typeClassName;
		}		
		try {
			isMarshalled = (knownJavaClasses.containsKey(javaClassName)
					? knownJavaClasses.get(javaClassName).booleanValue()
					: JSJAXBClass.checkC$__ANN__(null, Class.forName(javaClassName), false, false));
		} catch (ClassNotFoundException e) {
			System.out.println("JSJAXBClass: class was not found: " + javaClassName);
			e.printStackTrace();
		} finally {
			knownJavaClasses.put(javaClassName, Boolean.valueOf(isMarshalled));
		}
		return (isMarshalled ? javaClassName : null);
	}

	private String getXMLTypeClassName(JSJAXBField field) {
		if (field.xmlType.indexOf(":") >= 0 && !field.xmlType.startsWith("xs:")) {
			QName qname = getQnameForAttribute(null, null, field.xmlType);
			field = getFieldFromQName(qname);
			return (field == null ? null : field.javaClassName);
		}
		return null;
	}

	void prepareForUnmarshalling(String defaultNamespace) {
		jaxbClass.setUnmarshallerDefaultNamespace(defaultNamespace);
		List<String> seeAlso = jaxbClass.seeAlso;
		if (seeAlso != null) {
			for (int i = 0; i < seeAlso.size(); i++) {
				String cl = seeAlso.get(i);
				try {
					addSeeAlso(Class.forName(cl));
					//System.out.println("JSJAXBClass seeAlso: " + cl);
				} catch (ClassNotFoundException e) {
					System.out.println("JSJAXBClass seeAlso[" + i + "] not found: " + cl);
				}
			}
		}
		for (int i = jaxbClass.fields.size(); --i >= 0;) {
			JSJAXBField field = jaxbClass.fields.get(i);
			bindQName(field.qualifiedName, field, false);
			bindQName(field.qualifiedWrapName, field, false);
			bindQName(field.qualifiedTypeName, field, false);
		}
	}

	void addSeeAlso(Class<?> cl) {
		JSJAXBClass jaxbClass = new JSJAXBClass(cl, null, false, false, null);
		JSJAXBField field = jaxbClass.fields.get(0);
		bindQName(field.qualifiedName, field, true);
		bindQName(field.qualifiedWrapName, field, true);
		bindQName(field.qualifiedTypeName, field, true);
	}

	private void bindQName(QName q, JSJAXBField field, boolean isSeeAlso) {
		if (q == null)
			return;
		Map<String, JSJAXBField> map = (isSeeAlso ? seeAlsoMap : jaxbClass.unmarshallerFieldMap);
		map.put(q.getLocalPart(), field);
//		if (namespace.length() == 0)
//			namespace = jaxbClass.getUnmarshallerDefaultNamespace();
//		if (namespace != null)
		String qn = q.getNamespaceURI() + ":" + q.getLocalPart();
		map.put(qn, field);
		map.put("/lc/" + qn.toLowerCase(), field);
		// System.out.println("JSJAXBClass#binding " + namespace + ":" +
		// q.getLocalPart() + "->" + field.javaName);
	}

	JSJAXBField getFieldFromQName(QName qName) {
		String key = qName.getNamespaceURI() + ":" + qName.getLocalPart();
		JSJAXBField f = jaxbClass.unmarshallerFieldMap.get(key);
//		if (f == null)
//			f = jaxbClass.unmarshallerFieldMap.get(qName.getLocalPart());
		if (f == null)
			f = seeAlsoMap.get(key);
//		if (f == null)
//			f = seeAlsoMap.get(qName.getLocalPart());

		// desparately doing this because I cannot find the capitalization algorithm in JAXB!
		if (f == null)
			f = jaxbClass.unmarshallerFieldMap.get("/lc/" + key.toLowerCase());		
		if (f == null)
			System.out.println("JSJAXBUnmarshaller could not associate a field with " + qName);
		return f;
	}

	///////////////////////// converting and assigning /////////////////

	private void setFieldValue(JSJAXBField field) {

		// nil object - ignore

		if (field.isNil)
			return;

		String data = (field.isAttribute ? field.xmlAttributeData : field.xmlCharacterData.trim());
		if (!field.isAttribute && data.length() == 0 && field.defaultValue != null)
			data = field.defaultValue;

		// char data for field
		if (field.asList) {
			field.setValue(fillArrayData(field, field.boundNode, data.split(" "),
					getArrayType(field), false), javaObject);
			return;
		}

		if (field.fieldType == JSJAXBField.MAP) {
			DOMNode[] children = JSSAXParser.getChildren(field.boundNode);
			for (int i = 0; i < children.length; i++) {
				// Entry<K,V>
				DOMNode[] entry = JSSAXParser.getChildren(children[i]);
				field.setNode(addXmlns(entry[0]));
				field.setNode(entry.length > 1 ? addXmlns(entry[1]) : null);
			}
			return;
		}

		if (field.qualifiedWrapName != null) {
			DOMNode[] children = JSSAXParser.getChildren(field.boundNode);
			for (int i = 0; i < children.length; i++)
				field.setNode(addXmlns(children[i]));
			return;
		}

		// unwrapped List or array

		if (field.boundListNodes != null) {
			return;
		}

		// qualifiedWrapName is null;

		String className = needsUnmarshalling(field, null);
		if (className != null) {

			// complex object -- unmarshal directly

			field.setValue(unmarshalField(field, field.boundNode, className), javaObject);
			return;
		}

		String dataType = (field.xmlType == null ? field.javaClassName : field.xmlType);
		field.setValue(convertFromType(field, data, dataType, field.xmlType != null), javaObject);
	}

	private DOMNode addXmlns(DOMNode node) {
		parser.registerPrefixes(node);
		return node;
	}

	private String getArrayType(JSJAXBField field) {
		return (field.isArray ? field.javaClassName.replace("[]", "") : field.listClassName);
	}

	private boolean isPrimitive(String type) {
		return PT.isOneOf(type, ";byte;short;int;long;float;double;boolean;");
	}

	/**
	 * This could be a field with a Java type or an xsi:type=xs.xxxxxx type (Object,
	 * List<Object>, or Map<String, Object>). JavaScript will return either an
	 * Object or a primitive, as appropriate.
	 * 
	 * 
	 * @param field
	 * @param objVal
	 * @param type
	 * @param asObject TODO
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "deprecation" })
	private Object convertFromType(JSJAXBField field, Object objVal, String type, boolean asObject) {
		@SuppressWarnings("unused")
		Object newVal = null;
		try {

			if (!(objVal instanceof String))
				return newVal = objVal;

			String val = (String) objVal;

			if (field != null) {
				if (field.typeAdapter != null) {
					@SuppressWarnings("rawtypes")
					XmlAdapter adapter = field.getAdapter();
					try {
						return newVal = adapter.unmarshal(val);
					} catch (Exception e) {
						e.printStackTrace();
						return null;
					}
				}

				if (type.contains("XMLGregorianCalendar")) {
					return newVal = new JSXMLGregorianCalendarImpl(val);
				}
				if (field.xmlSchemaType != null) {
					switch (field.xmlSchemaType) {
					case "base64Binary":
						return newVal = DatatypeConverter.parseBase64Binary(val);
					case "hexBinary":
						return newVal = DatatypeConverter.parseHexBinary(val);
					case "dateTime":
						return newVal = new Date(/** @j2sNative +Date.parse(val) || */
								null);
					default:
						if (haventUnmarshalled.indexOf(field.xmlSchemaType) < 0) {
							haventUnmarshalled  += ";" + field.xmlSchemaType;
							System.out.println("JSJAXBUnmarhsaller using target type " + type + " for " + field.xmlSchemaType);
						}
						// fall through //
					case "xsd:ID":
						break;
					}
				}
			}

			if (type.startsWith("xs:")) {
				String lctype = type.substring(3);
				// must be an OBJECT for a List, Map, or Object field
				type = type.substring(3, 4).toUpperCase() + lctype.substring(1);
				switch (type) {
				case "Decimal":
					type = "java.math.BigDecimal";
					break;
				case "Unsignedlong": 
				case "Integer":
					type = "java.math.BigInteger";
					break;
				case "Int":
				case "Unsignedshort":
					type = "Integer";
					break;
				case "Unsignedbyte":
					type = "Short";
					break;
				case "Unsignedint":
					type = "Long";
					break;
				default:
					if (isPrimitive(lctype)) {
						/**
						 * return newVal = eval(type + ".valueOf$S(" + objVal + ")");
						 */
					}
					break;
				}
			}

			if (type.equals("Anysimpletype") || type.equals("String")) {
				// jQuery's xml parser will already have converted HTML5 entities
				return newVal = val;
			}

			// switch to Java notation for NaN,
			Object nan = getNanInf(objVal);
			if (nan != null)
				return newVal = nan; // also INF and -INF

			// all primitives

			switch (type) {
			case "boolean":
				/**
				 * @j2sNative return newVal = (objVal=="true");
				 * 
				 */
			case "byte":
			case "short":
			case "int":
			case "unsigngedshort":
			case "unsignedbyte":
			case "unsignedint":
			case "long":
			case "double":
			case "float":
				/**
				 * @j2sNative return newVal = +objVal;
				 * 
				 */
			case "G":
			case "Date":
			case "Datetime":
			case "Time":
				return newVal = new JSXMLGregorianCalendarImpl(val);
			case "Duration":
//			return new 		//		duration			javax.xml.datatype.Duration
				return null; // not implemented
			case "Notation":
			case "Qname":
				// probably fail without a NameSpaceContext
				return newVal = DatatypeConverter.parseQName(val, null);
			case "unsignedlong":
				type = "java.math.BigInteger";
				break;				
			}
			Class<?> cl = null;
			try {
				cl = Class.forName(type);
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
				return null;
			}

			if (cl.isEnum()) {
				if (JSJAXBClass.hasAnnotations(cl)) {
					return getEnumValue(null, cl, val);
				}
			}

			// all Numbers and Enum
			/**
			 * @j2sNative if (cl.$clazz$.valueOf$S) return newVal =
			 *            cl.$clazz$.valueOf$S(objVal);
			 */

			// BigInteger, BigDecimal
			/**
			 * @j2sNative if (cl.$clazz$.c$$S) return newVal =
			 *            Clazz.new_(cl.$clazz$.c$$S,[objVal]);
			 */

			return null;
		} catch (NumberFormatException e) {
			return null;
			// ok, probably ""
		} finally {
//			System.out.println("converting " + objVal + " -> " + newVal);
		}

	}

	private Object getNanInf(Object objVal) {
		if (objVal.equals("NaN")) {
			/**
			 * @j2sNative return NaN;
			 */
		} else if (objVal.equals("INF")) {
			/**
			 * @j2sNative return Infinity;
			 */
		} else if (objVal.equals("-INF")) {
			/**
			 * @j2sNative return -Infinity;
			 */
		}
		return null;
	}

	/////////// JSSAXParser callbacks ////////

	@Override
	public void startElement(String uri, String localName, String qName, Attributes atts) throws SAXException {
		start(parser.getNode(), new QName(uri, localName, ""), atts);
	}

	/////////// unused XMLReader /////////

	@Override
	public void startDocument() throws SAXException {
	}

	@Override
	public void characters(char[] ch, int start, int length) throws SAXException {
		// TODO Auto-generated method stub

	}

	@Override
	public void endElement(String uri, String localName, String qName) throws SAXException {
	}

	@Override
	public void endDocument() throws SAXException {
	}

	@Override
	public void setDocumentLocator(Locator locator) {
		// TODO Auto-generated method stub

	}

	@Override
	public void startPrefixMapping(String prefix, String uri) throws SAXException {
		// TODO Auto-generated method stub

	}

	@Override
	public void endPrefixMapping(String prefix) throws SAXException {
		// TODO Auto-generated method stub

	}

	@Override
	public void ignorableWhitespace(char[] ch, int start, int length) throws SAXException {
		// TODO Auto-generated method stub

	}

	@Override
	public void processingInstruction(String target, String data) throws SAXException {
		// TODO Auto-generated method stub

	}

	@Override
	public void skippedEntity(String name) throws SAXException {
		// TODO Auto-generated method stub

	}

}