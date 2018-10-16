package swingjs.xml;

import java.io.IOException;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.UnmarshallerHandler;
import javax.xml.bind.helpers.AbstractUnmarshallerImpl;

import org.w3c.dom.Node;
import org.xml.sax.Attributes;
import org.xml.sax.ContentHandler;
import org.xml.sax.InputSource;
import org.xml.sax.Locator;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;

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


	private Object javaObject;
	private JAXBContext context;
	private JSSAXParser parser;
	private InputSource xmlSource;

	private JSJAXBClass info;
	
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
		return doUnmarshal(null);
	}

	private Object unmarshal(JSSAXParser parser, DOMNode doc, Class<?> cl) throws JAXBException {
		this.parser = parser;		
		return doUnmarshal(doc);
	}


	private Object doUnmarshal(DOMNode doc) {
		Class<?> javaClass = ((JSJAXBContext) context).getjavaClass();
		try {
			javaObject = javaClass.newInstance();
		} catch (InstantiationException | IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	
		info = new JSJAXBClass(javaClass, javaObject);
		info.prepareForUnmarshalling();
		ContentHandler oldHandler = parser.getContentHandler();
		parser.setContentHandler(this);
		try {
		
			if (doc == null)
				parser.parse(xmlSource);
			else
				parser.walkDOMTree(doc);

		} catch (IOException e) {
			e.printStackTrace();
		} catch (SAXException e) {
			e.printStackTrace();
		}
		parser.setContentHandler(oldHandler);		
		return javaObject;
	}

	private DOMNode doc;
	
	private void bindDocAttributes(DOMNode doc, Attributes atts) {
		for (int i = atts.getLength(); --i >= 0;) {
			String qName = atts.getQName(i);
			String val = atts.getValue(i);
			JSJAXBField ann = info.getFieldFromQName(qName);
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

	private void processObject() {
		List<JSJAXBField> fields = info.fields;
		int missing = 0;
		for (int i = 0; i < fields.size(); i++) {
			JSJAXBField field = fields.get(i);
			if (field.boundNode == null) {
				System.out.println("unbound field: " + field.javaName);
				missing++;
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
		if (doc == null) {
			doc = parser.getNode();
			bindDocAttributes(doc, atts);
			return;
		}
		DOMNode node = parser.getNode();
		if (getParent(node) == doc) {
			JSJAXBField ann = info.getFieldFromQName(qName);
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

	@Override
	public void endElement(String uri, String localName, String qName) throws SAXException {
		
		JSJAXBField ann = info.getFieldFromQName(qName);
		if (ann != null) {
			System.out.println("ann:" + ann.javaName + "," + ann.javaType 
					+ "," + ann.methodName 
					+ "," + ann.xmlCharacterData
					+ "," + ann.xmlType
					+ "," + (ann.boundListNodes == null ? "" : ann.boundListNodes.size())
					);
		}
	}

	
	/////////// unused /////////
	
	
	@Override
	public void startDocument() throws SAXException {
		System.out.println("startDocument");
	}

	@Override
	public void endDocument() throws SAXException {
		processObject();
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