package swingjs;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Reader;
import java.io.Writer;
import java.util.BitSet;
import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.PropertyException;
import javax.xml.bind.ValidationEventHandler;
import javax.xml.bind.annotation.adapters.XmlAdapter;
import javax.xml.bind.attachment.AttachmentMarshaller;
import javax.xml.bind.helpers.AbstractMarshallerImpl;
import javax.xml.stream.XMLEventWriter;
import javax.xml.stream.XMLStreamWriter;
import javax.xml.transform.Result;
import javax.xml.transform.stream.StreamResult;
import javax.xml.validation.Schema;

import org.w3c.dom.Node;
import org.xml.sax.ContentHandler;

import javajs.util.PT;

/**
 * Simple marshaller/unmarshaller
 * 
 * @author hansonr
 *
 */
public class JSJAXBMarshaller extends AbstractMarshallerImpl {

// arrays:     <sa xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:nil="true"/>
	
	
//	<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
//	<employee id="1">
//	    <name>Vimal Jaiswal</name>
//	    <Salary>50000.0</Salary>

//  <hm>
//    <entry>
//        <key xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">null</key>
//    </entry>
//    <entry>
//        <key xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">testing</key>
//        <value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">TESTING</value>
//    </entry>
//  </hm>

//	</employee>

	private Writer writer;
	private OutputStream outputStream;
	private Object javaObject;
	private JAXBContext context;
	private StreamResult result;
	private JAXBElement<?> jaxbElement;

	public JSJAXBMarshaller(JAXBContext context) {
		this.context = context;
	}

	@Override
	public void marshal(Object jaxbElement, Result result) throws JAXBException {
		if (jaxbElement instanceof JAXBElement) {
			jaxbElement = (JAXBElement<?>) jaxbElement;
			javaObject = this.jaxbElement.getValue();

			// here we get default name and namespace information
			
		} else {
			javaObject = jaxbElement;
		}
		this.result = (StreamResult) result;
		this.writer = this.result.getWriter();
		this.outputStream = this.result.getOutputStream();
	}

	@SuppressWarnings("unused")
	private void doMarshal(boolean isRoot) throws JAXBException {
		Class<?> javaClass = ((JSJAXBContext) context).getjavaClass();
		String[][] jsdata = null;
		String className = null;
		Object clazz = /** @j2sNative javaClass.$class$ || */
				null;
		/**
		 * @j2sNative
		 * 
		 * 			jsdata = clazz.__ANN__; className = clazz.__CLASS$NAME__ ||
		 *            clazz.__CLASS_NAME__;
		 */

		if (jsdata == null || className == null || clazz == null)
			throw new JAXBException("JSJAXBMarshaller: JavaScript class does not have C$.__ANN__ -- nothing to do.");

//		C$.__ANN__ = [
//		              [null,'XmlRootElement','@XmlRootElement']
//		             ,['M:getId','int','@XmlAttribute']
//		             ,['M:getName','String','@XmlElement']
//		             ,['M:getSalary','float','@XmlElement(name="Salary")']
//		            ];

		if (isRoot)
			writeHeader();
		BitSet bs = new BitSet();
		// class
		int i0 = 0;
		String xmlName = null;
		for (int i = 0; i < jsdata.length; i++) {
			String[] item = jsdata[i];
			if (item[0] != null)
				break;
			String name = getAnnotationKey(item[2], "name", null);
			if (name != null)
				xmlName = name;
			// TODO check order
		}
		if (xmlName == null)
			xmlName = getXmlNameFromClassName(className);
		writeString("<" + xmlName + " ");
		fillData(jsdata, i0, bs, "@xmlAttribute");
		for (int i = bs.nextSetBit(0); i >= 0; i = bs.nextSetBit(i + 1)) {
			String[] item = jsdata[i];
			boolean isMethod = item[0].startsWith("M:");
			String javaVar = (isMethod ? getJavaVar(item[0]) : item[0]);
			String javaMeth = (isMethod ? item[0].substring(2) : null);
			String javaName = item[0];
			String retType = item[1];
			String attrName = getAnnotationKey(item[2], "name", javaName);
			String value = getClassValue(clazz, javaObject, javaName);
			writeString("attrName=\"" + value + "\"");
		}

	}

	private String getXmlNameFromClassName(String className) {
		// TODO Auto-generated method stub
		return null;
	}

	private String getJavaVar(String M_Xxxx) {
		// TODO Auto-generated method stub
		return null;
	}

	private String getClassValue(Object clazz, Object obj, String javaName) {
		/**
		 * @j2sNative
		 * 
		 */
		// TODO Auto-generated method stub
		return null;
	}

	private String getAnnotationKey(String annotation, String key, String def) {
		String value = PT.getQuotedAttribute(annotation, key);
		return (value == null ? def : value);
	}

	private void fillData(String[][] jsdata, int i0, BitSet bs, String annotationType) {
		bs.clear();
		for (int i = i0; i < jsdata.length; i++) {
			String annotation = jsdata[i][2];
			if (annotation.startsWith(annotationType))
				bs.set(i);
		}
	}

	private void writeHeader() throws JAXBException {
		writeString("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>");
	}

	private void writeString(String s) throws JAXBException {
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

}