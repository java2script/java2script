package swingjs.xml;

import java.io.IOException;
import java.io.OutputStream;
import java.io.Writer;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.annotation.adapters.XmlAdapter;
import javax.xml.bind.helpers.AbstractMarshallerImpl;
import javax.xml.namespace.QName;
import javax.xml.transform.Result;
import javax.xml.transform.stream.StreamResult;

import javajs.util.Base64;
import swingjs.JSUtil;
import swingjs.api.js.DOMNode;

/**
 * Relatively simple marshaller -- incomplete implementation
 * 
 * @author hansonr
 *
 */
public class JSJAXBMarshaller extends AbstractMarshallerImpl {

	// TODO: Transpiler needs to accurately indicate which fields and methods to use.
	//       As it is, we rely on @XmlAttribute and propOrder or explicit @XmlElement
	
	private Writer writer;
	private OutputStream outputStream;
	private JAXBContext context;
	private StreamResult result;
	private JAXBElement<?> jaxbElement;

	public JSJAXBMarshaller(JAXBContext context) {
		this.context = context;
	}

	@Override
	public void marshal(Object jaxbElement, Result result) throws JAXBException {
		Object javaObject;
		if (jaxbElement instanceof JAXBElement) {
			jaxbElement = (JAXBElement<?>) jaxbElement;
			javaObject = this.jaxbElement.getValue();
		} else {
			javaObject = jaxbElement;
		}
		this.result = (StreamResult) result;
		this.writer = this.result.getWriter();
		this.outputStream = this.result.getOutputStream();
		Class<?> javaClass = ((JSJAXBContext) context).getjavaClass();
		doMarshal(javaClass, javaObject, null, false);
	}

	/**
	 * The main entry point for all marshalling; iterates for embedded classes
	 * 
	 * @param javaClass    the class being marshalled
	 * @param javaObject   the object being marshalled
	 * @param a   the field for this class; null for the root
	 * @param isEntry TODO
	 * @throws JAXBException
	 */
	private void doMarshal(Class<?> javaClass, Object javaObject, JSJAXBField a, boolean isEntry) throws JAXBException {
		// at least for now we rely on fields that are designated.

		JSJAXBClass info = new JSJAXBClass(javaClass, javaObject);
		info.field = a;
		
		Map<String, Integer> oldMap = null;
		if (a == null) {
			clearQualifierMap();
		} else { 
			oldMap = newQualifierMap(null);
		}
		
		writeXML(info, a == null, isEntry);
		
		newQualifierMap(oldMap);
	}

	
	private static String defaultNamespace;

	private static Map<String, Integer> mapQualifierLevel = new Hashtable<String, Integer>();
	
	private static Map<String, Integer> newQualifierMap(Map<String, Integer> newMap) {
		if (newMap != null) {
			mapQualifierLevel = newMap;
			return null;
		}
		Map<String, Integer> oldMap = mapQualifierLevel;
		mapQualifierLevel = new Hashtable<String, Integer>(oldMap);
		return oldMap;
	}
	private static void clearQualifierMap() {
		// not thread safe
		mapQualifierLevel.clear();
		defaultNamespace = null;
	}
	
	private static String getXmlnsIfUnused(QName qname) {
		// TODO Q: Does this have to be hierarchical - first time within this group?
		String xmlns = qname.getNamespaceURI();
		if (xmlns.length() == 0)
			return null;
		if (!mapQualifierLevel.containsKey(xmlns)) {
			if (mapQualifierLevel.isEmpty())
				defaultNamespace = xmlns;
			mapQualifierLevel.put(xmlns, Integer.valueOf(1));
			return xmlns;
		}
		return null;
	}
	
	private static String getXMLQname(QName qname) {
		String l = qname.getLocalPart();
		String ns = qname.getNamespaceURI();
		return (ns == null || ns.length() == 0 || ns.equals(defaultNamespace) ? l : qname.getPrefix() + ":" + l);
	}

	private static boolean isArray(Object value) {
		if (value == null || value instanceof byte[])
			return false;
		/** @j2sNative return !!value.__ARRAYTYPE */
		{
			return false;
		}
	}

private static JSJAXBField getField(JSJAXBClass info, String javaName) {
		return info.getFieldFromJavaName(javaName);
	}

	private static DOMNode textarea;
	
	private static String escapeString(String str, boolean isAttribute) {
		// JavaScript trick here to coerce HTML entities without 
		// having to code them. reading this.innerText gets reverse 
		if (textarea == null)
			textarea = DOMNode.createElement("textarea", null);
		/**
		 * @j2sNative str= (this.textarea.innerHTML=str,this.textarea.innerHTML);
		 */
		if (isAttribute)
			str = str.replace("\"", "&quot;");
		
		/**
		 * quick replacement 
		 * 
		 * @j2sNative
		 * 
		 * for (var i = str.length; --i >= 0;) {
		 *   var c = str.codePointAt(i);
		 * 	 if (c >= 127 || c < 32)
		 * 	   str = str.substring(0, i) + "&#" + c + ";" + str.substring(i + 1);
		 * }
		 * 
		 */
		return str;
	}

	
	/////////// output methods //////////////
	
	private void writeXML(JSJAXBClass info, boolean isRoot, boolean isEntry) throws JAXBException {
		QName qname = (info.field == null ? info.qname : info.field.qualifiedName);
		if (isRoot) {
			outputHeader();
			// sets default 
			getXmlnsIfUnused(qname);
		}
		writeTagOpen(qname);   
		if (isEntry) 
			outputInstanceType(getEntryType(info.qualifiedTypeName, info.field.getValue()));
		if (isRoot)
			addDefaultNameSpace();
		addAllNameSpaces(info);
		addFields(info, true);
		if (!info.hasElements()) {
			output(" />");
			return;
		}
		output(">");
		addFields(info, false);
		if (isRoot)
			output("\n");
		writeTagClose(qname);
	}
	
	private final static QName xsi = new QName("http://www.w3.org/2001/XMLSchema-instance", "xs", "xsi");
	private final static QName xs = new QName("http://www.w3.org/2001/XMLSchema", "_", "xs");

	private void addAllNameSpaces(JSJAXBClass info) throws JAXBException {
			for (int i = 0, n = info.fields.size(); i < n; i++)
				addNameSpaceIfNeeded(info.fields.get(i).qualifiedName);
		addNameSpaceIfNeeded(xsi);
		addNameSpaceIfNeeded(xs);
	}

	private void addFields(JSJAXBClass info, boolean isAttribute) throws JAXBException {
		// no ordering for attributes -- they must be designated explicitly
		JSJAXBField a;
		if (info.propOrder.size() == 0 || isAttribute) {
			for (int i = 0, n = info.fields.size(); i < n; i++)
				if (isAttribute == (a = info.fields.get(i)).isAttribute)
					addField(a);
		} else {
			for (int i = 0, n = info.propOrder.size(); i < n; i++) {
				a = getField(info, info.propOrder.get(i));
				if (!a.isAttribute)
					addField(a);
			}
 		}
	}

	private void addField(JSJAXBField a) throws JAXBException {
		if (a == null)
			return;
		Object value = a.getValue();
		addFieldListable(a, value, false);
	}

	private void addFieldListable(JSJAXBField a, Object value, boolean isEntry) throws JAXBException {
		if (value == null) {
			if (a.isNillable)
	 			writeField(a, value, isEntry);
			return;
		}
		if (value instanceof List) {
			writeFieldList(a, (List<?>) value);
		} else if (value instanceof Map) {
			writeFieldMap(a, (Map<?, ?>) value);
		} else if (isArray(value)) {
			writeFieldArray(a, value);
		} else {
			writeField(a, value, isEntry);
		}
	}

	private void writeField(JSJAXBField field, Object value, boolean isEntry) throws JAXBException {
		if (JSJAXBField.hasJSData(value)) {
			doMarshal(value.getClass(), value, field, isEntry);
			return;
		}
		if (field.isAttribute) {
			writeAttribute(field, value);
		} else if (field.isValue) {
			writeValue(field, value);
		} else {
			writeTagOpen(field.qualifiedName);
			if (value == null && field.isNillable) {
				outputNil();
				output(" />");
				return;
			}
			if (isEntry) {
				outputInstanceType(getEntryType(null, value));
			}
			output(">");
			writeValue(field, value);
			writeTagClose(field.qualifiedName);
		}
	}

//  <list1>
//  <list xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">TESTING</list>
//  <list xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">null</list>
//  <list xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="complex" ns2:cb="c&quot;&lt;&gt;b" bytes="ZGU=">
//      <ca>ca</ca>
//  </list>
//  <list xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:boolean">true</list>
//  <list xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:byte">1</list>
//  <list xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:short">2</list>
//  <list xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:int">3</list>
//  <list xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:long">4</list>
//  <list xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:float">6.6</list>
//  <list xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:double">8.8</list>
//  <list xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:integer">12345678910111213141516</list>
//  </list1>

	private String getEntryType(QName qname, Object value) throws JAXBException {
		String className = value.getClass().getName();
		switch (className) {
		case "Boolean":
		case "Byte":
		case "Short":
		case "Integer":
		case "Long":
		case "Float":
		case "Double":
			return "xs:" + className.toLowerCase();
		case "java.lang.String":
			return "xs:string";
		case "java.math.BigInteger":
			return "xs:integer";
		default:
			if (qname != null)
				return getXMLQname(qname);
			className = JSJAXBClass.getXmlNameFromClassName(className);
			return className.substring(0, 1).toLowerCase() + className.substring(1);
		}
	}

	private void writeAttribute(JSJAXBField a, Object value) throws JAXBException {
		// null attributes are not allowed
		if (value == null)
			return;
		addNameSpaceIfNeeded(a.qualifiedName);
		output(" " + getXMLQname(a.qualifiedName) + "=\"");
		writeValue(a, value);
		output("\"");
	}

	private void writeTagOpen(QName qname) throws JAXBException {
		output("\n<" + getXMLQname(qname));
		addNameSpaceIfNeeded(qname);
	}

	private void addDefaultNameSpace() throws JAXBException {
		if (defaultNamespace != null)
			output(" xmlns=\"" + defaultNamespace + "\"");
			
	}
	private void addNameSpaceIfNeeded(QName qname) throws JAXBException {
		String ns = getXmlnsIfUnused(qname);
		if (ns != null)
			output(" xmlns:" + qname.getPrefix() + "=\"" + ns + "\"");
	}

	private void writeTagClose(QName qname) throws JAXBException {
		output("</" + getXMLQname(qname) + ">");
	}

	private void writeValue(JSJAXBField a, Object value) throws JAXBException {
		if (a.xmlSchema != null) {
			writeSchema(a, value);
		} else if (a.typeAdapter != null) {
			writeTypeAdapter(a, value);
		} else if (a.mimeType != null) {
			writeMimeType(a, value);
		} else {
			outputSimple(a, value);
		}
	}

	private void writeMimeType(JSJAXBField field, Object value) throws JAXBException {
		JSUtil.notImplemented(field.text);
		outputSimple(field, value);
	}

	private void writeTypeAdapter(JSJAXBField field, Object value) throws JAXBException {
		XmlAdapter adapter = field.getAdapter();
		if (adapter == null) {
			writeValue(field, value);
		} else {
			try {
				output((String) adapter.marshal(value));
			} catch (Exception e) {
				System.out.println(e + " trying to marshal " + field.text);
				outputSimple(field, value);				
			}
		}
			
		
	}

	private void writeSchema(JSJAXBField field, Object value) throws JAXBException {
		if (value instanceof JSXMLGregorianCalendarImpl){
			writeDate(field, value);
		} else {
			switch (field.xmlSchema) {
			case "base64Binary":
				byte[] bytes = (byte[]) value;
				output(Base64.getBase64(bytes).toString());
				break;
			default:
				System.out.println("schema not supported " + field.xmlSchema);
				// fall through //
			case "xsd:ID":
				outputSimple(field, value);
				break;
			}
		}
	}
	private void writeDate(JSJAXBField field, Object value) throws JAXBException {
		JSXMLGregorianCalendarImpl cal = ((JSXMLGregorianCalendarImpl) value);
		QName schema = cal.xmlSchema;
		if (field.xmlSchema != null)
			cal.setXMLSchemaType(field.xmlSchema);
		output(cal.toXMLFormat());
		cal.xmlSchema = schema;
	}
	
	private static final QName qnEntryValue = new QName("","value","");

	private void writeFieldArray(JSJAXBField field, Object values) throws JAXBException {
		Object[] list = (Object[]) values;
		boolean asList = field.asList;
		boolean isNillable = !asList && field.isNillable;
		QName wrapName = field.qualifiedWrapName;
		boolean isNull = (values == null);
		boolean isEmpty = (!isNull && list.length == 0);
		if (asList)
			wrapName = field.qualifiedName;
		if (wrapName != null) {
 			writeTagOpen(wrapName);
			output(">");
		} else 	if (isEmpty && !isNillable) {
			return;
		}
		for (int i = 0, pt = 0, n = list.length; i < n; i++) {
			Object value = list[i];
			if (asList) {
				if (value == null)
					continue;
				if (pt++ > 0)
					output(" ");
				outputSimple(field, value);
			} else {
				if (value == null && !isNillable)
					continue;
				addFieldListable(field, value, true);
			}
		}
		if (wrapName != null) {
			if (!asList)
				output("\n");
			writeTagClose(wrapName);
		}
	}

	private void writeFieldList(JSJAXBField field, List<?> list) throws JAXBException {
		boolean asList = field.asList;
		boolean isNillable = !asList && field.isNillable;
		QName wrapName = field.qualifiedWrapName;
		boolean isNull = (list == null);
		boolean isEmpty = (!isNull && list.isEmpty());
		if (asList)
			wrapName = field.qualifiedName;
		if (wrapName != null) {
 			writeTagOpen(wrapName);
			output(">");
		} else 	if (isEmpty && !isNillable) {
			return;
		}
		for (int i = 0, pt = 0, n = list.size(); i < n; i++) {
			Object value = list.get(i);
			if (asList) {
				if (value == null)
					continue;
				if (pt++ > 0)
					output(" ");
				outputSimple(field, value);
			} else {
				if (value == null && !isNillable)
					continue;
				addFieldListable(field, value, true);
			}
		}
		if (wrapName != null) {
			if (!asList)
				output("\n");
			writeTagClose(wrapName);
		}
	}

	private void writeFieldMap(JSJAXBField field, Map<?, ?> map) throws JAXBException {
//	    <hm>
//        <entry>
//            <key>null</key>
//        </entry>
//        <entry>
//            <key>testing</key>
//            <value>TESTING</value>
//        </entry>
//    </hm>
		boolean isNillable = field.isNillable;
		QName wrapName = field.qualifiedWrapName;
		if (wrapName == null)
			wrapName = field.qualifiedName;
		boolean isNull = (map == null);
		boolean isEmpty = (!isNull && map.isEmpty());
		writeTagOpen(wrapName);
		output(">\n");
		QName qn = field.qualifiedName;
		field.qualifiedName = qnEntryValue;
		for (Entry<?, ?> e : map.entrySet()) {
			String key = (String) e.getKey();
			output("<entry>\n");
			output("<key>" + key + "</key>");
			Object value = e.getValue();
			if (value != null || isNillable) {
				field.entryValue = value;
				addFieldListable(field, value, true);				
				field.entryValue = null;
			}
			output("\n</entry>\n");
		}
		field.entryValue = null;
		field.qualifiedName = qn;
		writeTagClose(wrapName);
    }

	private void outputHeader() throws JAXBException {
		output("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");
	}

	private void outputSimple(JSJAXBField a, Object value) throws JAXBException {
		if (value == null)
			return;
		String sval = null;
		/**
		 * @j2sNative sval = (value.toString ? value.toString() : "" + value);
		 */
		output(escapeString(sval, a.isAttribute));
	}

	private void outputNil() throws JAXBException {
			output(" xsi:nil=\"true\"");
	}

	private void outputInstanceType(String type) throws JAXBException {
		output(" xsi:type=\""+type+"\"");
	}

	/**
	 * Every write ends up here.
	 * 
	 * @param s
	 * @throws JAXBException
	 */
	private void output(String s) throws JAXBException {
		try {
			if (writer != null) {
				writer.write(s);
			} else if (outputStream != null) {
				outputStream.write(s.getBytes());
			}
		} catch (IOException e) {
			throw new JAXBException("Error writing string " + s);
		}
	}

	// general findings:
	//
	//                 PROPERTY         FIELD           PUBLIC_MEMBER    NONE
	//
	// field default   @XmlTransient    @XmlElement     @XmlTransient    @XmlTransient
	//                                                   if not public
	//                                                  @XmlElement
	//                                                   otherwise
	//
	// method default @XmlTransient     @XmlTransient    same as above;  @XmlTransient
	//                 unless there                      if both field
	//                 are matching                      and method are
	//                 get/is and set                    public, ONE must
    //                                                   be explicitly
	//                                                   @XmlElement
	

	
}