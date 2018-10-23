package swingjs.xml;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.DatatypeConverter;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.UnmarshallerHandler;
import javax.xml.bind.annotation.adapters.XmlAdapter;
import javax.xml.bind.helpers.AbstractUnmarshallerImpl;
import javax.xml.namespace.QName;

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
	protected Object unmarshal(XMLReader reader, InputSource source) throws JAXBException {
		parser = (JSSAXParser) reader;
		xmlSource = source;		
		return doUnmarshal(null, ((JSJAXBContext) context).getjavaClass());
	}

	private Object unmarshal(DOMNode node, Class<?> cl) throws JAXBException {
		return doUnmarshal(node, cl);
	}

	private Object unmarshalField(JSJAXBField field, DOMNode node) {
		Class<?> cl;
		try {
			cl = field.getJavaClassForUnmarshaling();
			return doUnmarshal(node, cl);
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
	private Object doUnmarshal(DOMNode node, Class<?> javaClass) {
		Object javaObject;
		try {
			javaObject = javaClass.newInstance();
		} catch (InstantiationException | IllegalAccessException e) {
			e.printStackTrace();
			return null;
		}

		JSJAXBClass oldJaxbClass = jaxbClass;
		DOMNode oldDoc = doc;
		doc = null;
		jaxbClass = JSJAXBClass.newInstance(javaClass, javaObject);
		boolean topOnly = true;
		try {
			parser.setContentHandler(this);
			if (node == null)
				parser.parse(xmlSource, topOnly);
			else
				parser.walkDOMTree(node, topOnly);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (SAXException e) {
			e.printStackTrace();
		}
		processArraysAndLists();
		processMaps();
		jaxbClass = oldJaxbClass;
		doc = oldDoc;
		return javaObject;
	}

	@SuppressWarnings("unchecked")
	private void processArraysAndLists() {
		for (int j = jaxbClass.fields.size(); --j >= 0;) {
			JSJAXBField field = jaxbClass.fields.get(j);
			if (field.boundListNodes != null && field.fieldType != JSJAXBField.MAP) {
				// unwrapped set - array or list or map?
//				System.out.println("Filling List " + field.javaName);
				String type = (field.isArray ? field.javaClassName.replace("[]", "") : field.maplistClassNames[0]);
				List<Object> nodes = field.boundListNodes;
				int n = nodes.size();
				boolean holdsObject = (field.holdsObjects != JSJAXBField.NO_OBJECT);
				Object[] a = fillArrayData(field, null, null, (holdsObject ? null : type), !field.isArray);
				if (field.isArray) {
					field.setValue(a);
				} else {
					List<Object> l = (List<Object>) field.getObject();
					if (l == null) {
						l = new ArrayList<Object>();
						field.setValue(l);
					}
					l.clear();
					for (int i = 0; i < n; i++)
						l.add(a[i]);
				}
			}
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
			Map<Object,Object> map = (Map<Object,Object>) field.getObject();
			if (map == null) {
				field.setValue(map = new HashMap<Object, Object>());
			}
			map.clear();
			if (nodes != null) {
				String keyType = ((field.holdsObjects & JSJAXBField.MAP_KEY_OBJECT) != 0 ? null : field.maplistClassNames[0]);
				String valueType = ((field.holdsObjects & JSJAXBField.MAP_VALUE_OBJECT) != 0 ? null : field.maplistClassNames[1]);
				for (int i = 1, n = nodes.size(); i < n;) {
					Object key = getNodeObject((DOMNode) nodes.get(i++), keyType, null, true);
					Object value = getNodeObject((DOMNode) nodes.get(i++), valueType, null, true);
//					System.out.println("map.put " + key + " = " + value);
					map.put(key, value);
				}
			}
		}
	}
	
	private Object[] getArrayOfType(JSJAXBField field, String type, int len) {
		// JavaScript will return the appropriate type of array, 
		// even if it is primitive.
		
		Object[] a = (Object[]) field.getObject();
		if (a != null)
			return a;
		if (type != null) {
			if (isPrimitive(type)) {
				type = (type == "int" ? "Integer" 
						: type.substring(0, 1).toUpperCase() + type.substring(1)) + ".TYPE";
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
		int n = (haveData ? data.length : field.boundListNodes.size());
		Object[] a = getArrayOfType(field, arrayType, n);
		if (!haveData)
			data = a; // nulls
		for (int i = 0; i < n; i++)
			a[i] = getNodeObject((node == null ? (DOMNode) field.boundListNodes.get(i) : node), 
			arrayType, data[i], asObject);
		return a;
 	}
	
	private Object getNodeObject(DOMNode node, String definedType, Object data, boolean asObject) {
		if (node == null)
			return null;
		if (data == null)
			data = JSSAXParser.getSimpleInnerText(node);
		if (definedType != null)
			return convertFromType(null, data, definedType, asObject);
		String type = JSSAXParser.getAttribute(node, "xsi:type");
		if (type == null)
			return null;
		if (type.indexOf(":") >= 0 && !type.startsWith("xs:")) {
			// this is a SeeAlso entry
			return unmarshalField(jaxbClass.getFieldFromQName(getQnameForAttribute(null, null, type)), node);
		}
		return convertFromType(null, data, type, asObject);
	}

	private void start(DOMNode node, QName qName, Attributes atts) {
		String text = JSSAXParser.getSimpleInnerText(node);
		if (doc == null) {
			doc = node;
			setDocAttributes(text, atts);
			return;
		}
		JSJAXBField field = jaxbClass.getFieldFromQName(qName);
		bindNode(node, field, atts);
		field.setCharacters(text);
		setFieldValue(field); 
	}

	private void setDocAttributes(String value, Attributes atts) {
		if (jaxbClass.valueField != null) {
			jaxbClass.valueField.setCharacters(value);
			jaxbClass.valueField.setNode(doc);
			setFieldValue(jaxbClass.valueField);
		}
		jaxbClass.prepareForUnmarshalling(atts.getValue("xmlns"));
		for (int i = atts.getLength(); --i >= 0;) {
			String uri = atts.getURI(i);
			String localName = atts.getURI(i);
			String qname = atts.getQName(i);
			if (qname.equals("xmlns") || qname.startsWith("xmlns:")) {
				continue;
			}
			QName qn = getQnameForAttribute(uri, localName, qname);
			JSJAXBField field = jaxbClass.getFieldFromQName(qn);
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

	///////////////////////// converting and assigning /////////////////

	private void setFieldValue(JSJAXBField field) {

		// nil object - ignore

		if (field.isNil())
			return;

		// complex object -- unmarshal directly

		if (jaxbClass.mustUnmarshal(field)) {
			field.setValue(unmarshalField(field, field.boundNode));
			return;
		}

		// char data for field
		if (field.asList) {
			field.setValue(fillArrayData(field, field.boundNode, field.xmlCharacterData.trim().split(" "),
					getArrayType(field), false));
			return;
		}
		if (field.qualifiedWrapName != null) {
			DOMNode[] children = JSSAXParser.getChildren(field.boundNode);
			switch (field.fieldType) {
			case JSJAXBField.MAP:
				for (int i = 0; i < children.length; i++) {
					// Entry<K,V>
					DOMNode[] entry = JSSAXParser.getChildren(children[i]);
					field.setNode(addXmlns(entry[0]));
					field.setNode(entry.length > 1 ? addXmlns(entry[1]) : null);
				}
				break;
			default:
				for (int i = 0; i < children.length; i++)
					field.setNode(addXmlns(children[i]));
				break;
			}
			return;
		}

		if (field.boundListNodes != null) {
			return;
		}

		// unwrapped List or array

		// qualifiedWrapName is null;

		String data = (field.isAttribute ? field.xmlAttributeData : field.xmlCharacterData.trim());
		String dataType = (field.xmlType == null ? field.javaClassName : field.xmlType);
		field.setValue(convertFromType(field, data, dataType, field.xmlType != null));
	}

	private DOMNode addXmlns(DOMNode node) {
		parser.registerPrefixes(node);
		return node;
	}

	private String getArrayType(JSJAXBField field) { 
		return (field.isArray ? field.javaClassName.replace("[]", "") : field.maplistClassNames[0]);
	}

	private boolean isPrimitive(String type) {
		return PT.isOneOf(type,";byte;short;int;long;float;double;boolean;");
	}
	
	/**
	 * This could be a field with a Java type or an xsi:type=xs.xxxxxx type (Object,
	 * List<Object>, or Map<String, Object>). JavaScript will return either an Object
	 * or a primitive, as appropriate.
	 * 
	 * 
	 * @param field
	 * @param objVal
	 * @param type
	 * @param asObject TODO
	 * @return
	 */
	private Object convertFromType(JSJAXBField field, Object objVal, String type, boolean asObject) {
		Object newVal = null;
		try { 

		if (!(objVal instanceof String))
			return newVal = objVal;

		String val = (String) objVal;
				
		if (field != null) {
			if (field.typeAdapter != null) {
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
			if (field.xmlSchema != null) {
				switch (field.xmlSchema) {
				case "base64Binary":
					return newVal = DatatypeConverter.parseBase64Binary(val);
				case "hexBinary":
					return newVal = DatatypeConverter.parseHexBinary(val);
				default:
					System.out.println("schema not supported " + field.xmlSchema);
					// fall through //
				case "xsd:ID":
					break;
				}
			}
		}
		
		if (type.startsWith("xs:")) {
			String lctype = type.substring(3);
			// must be an OBJECT for a List, Map, or Object field
			type = type.substring(3,4).toUpperCase() + lctype.substring(1);
			switch (type) {
			case "Decimal":
				type = "java.math.BigDecimal";
				break;
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
			return newVal = nan;  // also INF and -INF

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
		}
		try {
			Class<?> cl = Class.forName(type);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return null;
		}
		// all Numbers
		/**
		 * @j2sNative if (cl.$clazz$.valueOf$S) return newVal = cl.$clazz$.valueOf$S(objVal);
		 */

		// BigInteger, BigDecimal
		/**
		 * @j2sNative if (cl.$clazz$.c$$S) return newVal = Clazz.new_(cl.$clazz$.c$$S,[objVal]);
		 */

		return null;
		
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