package swingjs.xml;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.UnmarshallerHandler;
import javax.xml.bind.annotation.adapters.XmlAdapter;
import javax.xml.bind.helpers.AbstractUnmarshallerImpl;

import org.w3c.dom.Node;
import org.xml.sax.Attributes;
import org.xml.sax.ContentHandler;
import org.xml.sax.InputSource;
import org.xml.sax.Locator;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;

import javajs.util.Base64;
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

	private Object unmarshalField(JSJAXBField field) {
		Class<?> cl;
		try {
			cl = field.getJavaClassForUnmarshaling();
			return doUnmarshal(field.boundNode, cl);
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
		jaxbClass.prepareForUnmarshalling();

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
		
		processFields();
		
		jaxbClass = oldJaxbClass;
		doc = oldDoc;
		return javaObject;
	}

	private void bindDocAttributes(DOMNode doc, Attributes atts) {
		for (int i = atts.getLength(); --i >= 0;) {
			String qName = atts.getQName(i);
			String val = atts.getValue(i);
			JSJAXBField ann = jaxbClass.getFieldFromQName(qName);
			if (ann != null) {
				ann.setNode(doc);
				ann.setAttributeData(val);
			}
		}
	}

	private void bindNode(DOMNode node, JSJAXBField ann, String qName, Attributes atts) {
		DOMNode.setAttrs(node, 
				"data-swingjsbinding", ann, 
				"data-swingjsatts", atts,
				"data-swingjsqname", qName
				);
		if (ann != null) {
			ann.setNode(node);
			ann.setAttributes(atts);
		}
	}
	
	private void processFields() {
		/**
		 * We start here with just the top fields
		 */
		List<JSJAXBField> fields = jaxbClass.fields;
		int missing = 0;
		for (int i = 0; i < fields.size(); i++) {
			JSJAXBField field = fields.get(i);
			if (field.boundNode == null) {
				System.out.println("unbound field: " + field.javaName);
				missing++;
			} else {
				setFieldValue(field);
			}
		}
		System.out.println(missing + " fields missing");
	}

	private DOMNode getParent(DOMNode node) {
		return (DOMNode) DOMNode.getAttr(node, "parentElement");
	}

	private JSJAXBField getBoundField(DOMNode node) {
		return (JSJAXBField) DOMNode.getAttr(node, "data-swingjsbinding");
	}
	
	/////////// JSSAXParser callbacks //////// 
	
	@Override
	public void startElement(String uri, String localName, String qName, Attributes atts) throws SAXException {
		DOMNode node = parser.getNode();
		if (doc == null) {
			doc = node;
			bindDocAttributes(doc, atts);
			bindNode(node, jaxbClass.valueField, qName, atts);
			return;
		}
		if (getParent(node) == doc) {
			JSJAXBField ann = jaxbClass.getFieldFromQName(qName);
			if (ann != null) {
				bindNode(node, ann, qName, atts);
			}
			System.out.println("startElement " + qName + " " + ann);
		} else {
			bindNode(node, null, qName, atts);			
		}
	}

	@Override
	public void characters(char[] ch, int start, int length) throws SAXException {
		DOMNode node = getParent(parser.getNode());
		String s = new String(ch, start, length);
		JSJAXBField ann = getBoundField(node);
		if (ann == null) {
			DOMNode.setAttr(node, "data-swingjschar", s);
		} else {
			ann.setCharacters(s);
		}
	}

	/////////// unused /////////
	
	
	@Override
	public void startDocument() throws SAXException {
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
	
	///////////////////////// converting and assigning /////////////////

	private void setFieldValue(JSJAXBField field) {

		// nil object - ignore

		if (field.isNil())
			return;

		// complex object -- unmarshal directly

		if (field.mustUnmarshal()) {
			field.setValue(unmarshalField(field));
			return;
		}

		Object v = null;

		// char data for field
		if (field.asList) {
			String[] data = field.xmlCharacterData.trim().split(" ");
			field.setValue(fillArrayData(field, data));
			return;
		}
		
		// unwrapped List or array

		if (field.boundListNodes != null) {
			// unwrapped set - array or list
			List<Object> nodes = field.boundListNodes;
			int n = nodes.size();
			Object[] a = getArrayOfType(field, n);
			for (int i = 0; i < n; i++) {
				a[i] = getNodeString((DOMNode) nodes.get(i));
			}
			a = fillArrayData(field, a);
			if (field.isArray) {
				v = a;
			} else {
				List<Object> l = (List<Object>) field.getObject();
				if (l == null)
					l = new ArrayList<Object>();
				for (int i = 0; i < n; i++)
					l.add(a[i]);
				v = l;
			}
			field.setValue(v);
			return;
		}

		if (field.qualifiedWrapName != null) {
			// could be a list or a map. 			
			List<Object> l = new ArrayList<Object>();
			return;
		}

		String data = (field.isAttribute ? field.xmlAttributeData : field.xmlCharacterData.trim());

		field.setValue(convertFromXML(field, data, field.javaClassName));
	}

	private Object convertFromXML(JSJAXBField field, Object object, String type) {

		if (!(object instanceof String))
			return object;

		if (field != null) {
			if (field.typeAdapter != null) {
				XmlAdapter adapter = field.getAdapter();
				try {
					return adapter.unmarshal(object);
				} catch (Exception e) {
					e.printStackTrace();
					return null;
				}	
			}

 			if (type.contains("XMLGregorianCalendar")) {
				return new JSXMLGregorianCalendarImpl((String) object);
			}
			if (field.xmlSchema != null) {
				switch (field.xmlSchema) {
				case "base64Binary":
					return Base64.decodeBase64((String) object);
				default:
					System.out.println("schema not supported " + field.xmlSchema);
					// fall through //
				case "xsd:ID":
					break;
				}
			}
		}

		// all primitives

		switch (type) {
		case "String":
			return (String) object;
		case "boolean":
			/**
			 * @j2sNative return(object=="true");
			 * 
			 */
			break;
		case "byte":
		case "short":
		case "int":
		case "long":
		case "double":
		case "float":
			/**
			 * @j2sNative return +object;
			 * 
			 */
			break;
		}
		try {
			Class<?> cl = Class.forName(type);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return null;
		}
		// all Numbers
		/**
		 * @j2sNative if (cl.$clazz$.valueOf$S) return cl.$clazz$.valueOf$S(object);
		 */

		// BigInteger, BigDecimal
		/**
		 * @j2sNative if (cl.$clazz$.c$$S) return Clazz.new_(cl.$clazz$.c$$S,[object]);
		 */

		return null;
	}


	private String getNodeString(DOMNode node) {
		return (String) DOMNode.getAttr(node, "innerHTML");
	}

	private Object[] fillArrayData(JSJAXBField field, Object[] data) {
		int n = data.length;
		String type = field.javaClassName.replace("[]", "");
		Object[] a = getArrayOfType(field, n);
		for (int i = 0; i < n; i++) {
			a[i] = convertFromXML(null, data[i], type);
		}
		return a;
	}

	private Object[] getArrayOfType(JSJAXBField field, int len) {
		// JavaScript will return the appropriate type of array, 
		// even if it is primitive.
		
		Object[] a = (Object[]) field.getObject();
		if (a != null)
			return a;
		String type = field.javaClassName.replace("[]", "");
		if (type.indexOf(".") < 0) {
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
					return null;
				}
			}
		}
		return a;
	}
	
	private boolean isPrimitive(String type) {
		return PT.isOneOf(type,";byte;short;int;long;float;double;boolean;");
	}
		
		
//		
//		
//		
//		
//		
//		
//		
//		
//		value instanceof List) {
//				writeFieldList(a, (List<?>) value);
//			} else if (value instanceof Map) {
//				writeFieldMap(a, (Map<?, ?>) value);
//			} else if (isArray(value)) {
//				writeFieldArray(a, value);
//			} else {
//				writeField(a, value, isEntry);
//			}
//		}
//
//		if (v != null)
//			field.setValue(v);
//		
//		if (field.xmlSchema != null) {
//			v = readSchema(field);
//		} else if (v =.typeAdapter != null) {
//			writeTypeAdapter(a, value);
//		} else if (a.mimeType != null) {
//			writeMimeType(a, value);
//		} else {
//			outputSimple(a, value);
//		}
//
//		Object v = field.getXMLValue();
//	
//		if (field.typeAdapter != null) {
//			XmlAdapter adapter = field.getAdapter();
//			
//			field.setValue(adapter.unmarshal(v));			
//		}
//	}
//


	

}