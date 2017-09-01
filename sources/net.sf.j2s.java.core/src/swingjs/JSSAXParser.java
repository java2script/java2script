package swingjs;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.util.Hashtable;
import java.util.Locale;
import java.util.Map;

import javajs.util.AU;
import javajs.util.PT;
import javajs.util.Rdr;
import swingjs.api.js.DOMNode;

import org.xml.sax.ContentHandler;
import org.xml.sax.DTDHandler;
import org.xml.sax.DocumentHandler;
import org.xml.sax.EntityResolver;
import org.xml.sax.ErrorHandler;
import org.xml.sax.InputSource;
import org.xml.sax.Parser;
import org.xml.sax.SAXException;
import org.xml.sax.SAXNotRecognizedException;
import org.xml.sax.SAXNotSupportedException;
import org.xml.sax.SAXParseException;
import org.xml.sax.XMLReader;

public class JSSAXParser implements Parser, XMLReader {

	private EntityResolver resolver;
	private DTDHandler dtdHandler;
	private DocumentHandler docHandler;
	private ContentHandler contentHandler;
	private ErrorHandler errorHandler;
	private boolean havePre;

	@Override
	public void setLocale(Locale locale) throws SAXException {
		// N/A
	}

	@Override
	public void setEntityResolver(EntityResolver resolver) {
		this.resolver = resolver;
	}

	@Override
	public void setDTDHandler(DTDHandler handler) {
		this.dtdHandler = handler;
	}

	@Override
	public void setDocumentHandler(DocumentHandler handler) {
		this.docHandler = handler;
	}

	@Override
	public void setErrorHandler(ErrorHandler handler) {
		this.errorHandler = handler;
	}

	public void parse(InputSource source, JSSAXContentHandler handler) throws SAXException, IOException {
		setContentHandler(handler);
		parseSource(source);
	}

	@Override
	public void parse(InputSource source) throws SAXException, IOException {
		parseSource(source);
	}

	private void parseSource(InputSource source) throws IOException, SAXException {
		Reader rdr = source.getCharacterStream();
		String[] data = new String[1];
		if (rdr == null) {
			InputStream bs = source.getByteStream();
			if (!(bs instanceof BufferedInputStream))
				bs = new BufferedInputStream(bs);
		  data[0] = Rdr.fixUTF((byte[]) Rdr.getStreamAsBytes((BufferedInputStream) bs, null));
		} else {
			if (!(rdr instanceof BufferedReader))
				rdr = new BufferedReader(rdr);
			Rdr.readAllAsString((BufferedReader) rdr, -1, false, data, 0);
		}
		try {
			parseDocument(parseXML(data[0]));
		} catch (Exception e) {
			error(e);
		}
	}

	@Override
	public void parse(String fileName) throws SAXException, IOException {
		try {
			parseDocument(parseXML(JSToolkit.getFileAsString(fileName)));
		} catch (Exception e) {
			error(e);
		}
	}

	public void parseXMLString(String data) throws SAXException, IOException {	
		try {
			parseDocument(parseXML(data));
		} catch (Exception e) {
			error(e);
		}
	}

	private DOMNode parseXML(String data) {
		return JSToolkit.getJQuery().parseXML(removeProcessing(data));
	}

	/**
	 * Removal of <?....?> commands, which are not valid in HTML5.
	 * These will be converted later into processing instructions
	 * 
	 * 
	 * @param data
	 * @return reconfigured data
	 */
	private String removeProcessing(String data) {
		if (data.indexOf("<?") >= 0) {
			getUniqueSequence(data);
			data = PT.rep(PT.rep(data,  "<?", "<![CDATA[" + uniqueSeq), "?>", "]]>");
			if (data.startsWith("<!")) {
				data = "<pre>" + data + "</pre>";
				havePre = true;
			}
		}
	  return data;
	}

	private String uniqueSeq;

	private void getUniqueSequence(String data) {
		String s = "~";
		while (data.indexOf("<![CDATA["+s) >= 0)
			s += "~";
		uniqueSeq = s;
	}

	private void error(Exception e) throws SAXException {
		SAXParseException ee = new SAXParseException("Invalid Document", null);
		if (errorHandler == null)
			throw(ee);
		else
			errorHandler.fatalError(ee);
	}

  private boolean ver2;
  
	private void parseDocument(DOMNode doc) throws SAXException {
		if (docHandler == null && contentHandler == null)
			contentHandler = new JSSAXContentHandler();
		ver2 = (contentHandler != null);
		if (ver2)
			contentHandler.startDocument();
		else
			docHandler.startDocument();
		walkDOMTree((DOMNode) DOMNode.getAttr(doc, "firstChild"), havePre);
		if (ver2)
			contentHandler.endDocument();
		else
			docHandler.endDocument();
	}

	private char[] tempChars = new char[1024];

	private void walkDOMTree(DOMNode node, boolean skipTag) throws SAXException {
		String localName = ((String) DOMNode.getAttr(node, "localName"));
		String qName = (String) DOMNode.getAttr(node, "nodeName");
		String uri = (String) DOMNode.getAttr(node, "namespaceURI");
		if (localName == null) {
			boolean isText = "#text".equals(qName);
			if (isText || "#cdata-section".equals(qName)) {
				String data = (String) DOMNode.getAttr(node, "textContent");
				if (isText || uniqueSeq == null || !data.startsWith(uniqueSeq)) {
					int len = data.length();
					char[] ch = tempChars;
					if (len > ch.length)
						ch = tempChars = (char[]) AU.ensureLength(ch, len * 2);
					for (int i = len; --i >= 0;)
						ch[i] = data.charAt(i);
					if (ver2)
						contentHandler.characters(ch, 0, len);
					else
						docHandler.characters(ch, 0, len);
					return;
				}
				data = data.substring(uniqueSeq.length());
				String target = data + " ";
				target = target.substring(0, target.indexOf(" "));
				data = data.substring(target.length()).trim();
				if (ver2)
					contentHandler.processingInstruction(target, data);
				else
					docHandler.processingInstruction(target, data);
			}
		} else if (!skipTag) {
			JSSAXAttributes atts = new JSSAXAttributes(node);
			if (ver2)
				contentHandler.startElement(uri, localName, qName, atts);
			else
				docHandler.startElement(localName, atts);
		}
		node = (DOMNode) DOMNode.getAttr(node, "firstChild");
		while (node != null) {
			walkDOMTree(node, false);
			node = (DOMNode) DOMNode.getAttr(node, "nextSibling");
		}
		if (localName == null || skipTag)
			return;
		if (ver2)
			contentHandler.endElement(uri, localName, qName);
		else
			docHandler.endElement(localName);
	}

	@Override
	public boolean getFeature(String name) throws SAXNotRecognizedException,
			SAXNotSupportedException {
		return (getProperty("\1" + name) != null);
	}

	@Override
	public void setFeature(String name, boolean value)
			throws SAXNotRecognizedException, SAXNotSupportedException {
		setProperty("\1" + name, value ? Boolean.TRUE : null);		
	}

	@Override
	public Object getProperty(String name) throws SAXNotRecognizedException,
			SAXNotSupportedException {
		return (props == null  ? null : props.get(name));
	}

	private Map<String, Object> props;

	@Override
	public void setProperty(String name, Object value)
			throws SAXNotRecognizedException, SAXNotSupportedException {
		if (value == null) {
			if (props != null)
				props.remove(name);
			return;
		}
		if (props == null)
			props = new Hashtable<String, Object>();
		props.put(name, value);
	}

	@Override
	public EntityResolver getEntityResolver() {
		return resolver;
	}

	@Override
	public DTDHandler getDTDHandler() {
		return dtdHandler;
	}

	@Override
	public void setContentHandler(ContentHandler handler) {
		contentHandler = handler;
	}

	@Override
	public ContentHandler getContentHandler() {
		return contentHandler;
	}

	@Override
	public ErrorHandler getErrorHandler() {
		return errorHandler;
	}


}
