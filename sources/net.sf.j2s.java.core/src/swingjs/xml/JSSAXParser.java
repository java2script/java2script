package swingjs.xml;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.util.Hashtable;
import java.util.Locale;
import java.util.Map;

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
import org.xml.sax.helpers.DefaultHandler;

import javajs.util.AU;
import javajs.util.Rdr;
import swingjs.JSUtil;
import swingjs.api.js.DOMNode;

public class JSSAXParser implements Parser, XMLReader {

	private EntityResolver resolver;
	private DTDHandler dtdHandler;
	private DocumentHandler docHandler;
	private ContentHandler contentHandler;
	private ErrorHandler errorHandler;
	private boolean havePre;

	public XMLReader getXMLReader() {
		return this;
	}
	
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

	@Override
	public void parse(String fileName) throws SAXException, IOException {
		parseXMLString(JSUtil.getFileAsString(fileName));
	}

	@Override
	public void parse(InputSource source) throws SAXException, IOException {
		parse(source, PARSE_ALL);
	}

	public DOMNode parseToDOM(InputSource is) throws SAXException, IOException {	
		return parseXML(getString(is));
	}

	public void parse(InputSource source, int mode) throws  SAXException, IOException  {
		parseXMLString(getString(source), mode);
	}

	public void parseXMLString(String data) throws SAXException, IOException {	
		parseXMLString(data, PARSE_ALL);
	}

	public void parseXMLString(String data, int mode) throws SAXException, IOException {	
		try {
			parseDocument(parseXML(data), mode);
		} catch (Throwable e) {
			error(e);
		}
	}
	
	public void parse(InputSource source, DefaultHandler handler) throws SAXException, IOException {
		setContentHandler(handler);
		parse(source, PARSE_ALL);
	}

	private String getString(InputSource source) throws IOException {
		Reader rdr = source.getCharacterStream();
		if (rdr == null) {
			return Rdr.fixUTF(Rdr.streamToBytes(source.getByteStream()));
		}
		if (!(rdr instanceof BufferedReader))
			rdr = new BufferedReader(rdr);
		String[] data = new String[1];
		Rdr.readAllAsString((BufferedReader) rdr, -1, false, data, 0);
		return data[0];
	}

	public DOMNode parseXML(String data) {
		return JSUtil.jQuery.parseXML(removeProcessing(data));
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
//		if (data.indexOf("<?") >= 0) { // doesn't seem to be necessary?
//			getUniqueSequence(data);
//			data = PT.rep(PT.rep(data,  "<?", "<![CDATA[" + uniqueSeq), "?>", "]]>");
//			if (data.startsWith("<!")) {
//			data = "<pre>" + data + "</pre>";
//			havePre = true;
//			}
//		}
	  return data;
	}

//	private String uniqueSeq;
//
//	private void getUniqueSequence(String data) {
//		String s = "~";
//		while (data.indexOf("<![CDATA["+s) >= 0)
//			s += "~";
//		uniqueSeq = s;
//	}

	private void error(Throwable e) throws SAXException {
		System.err.println(e);
		/**
		 * @j2sNative
		 * 
		 * e.stack && System.out.println(e.stack);
		 */
		SAXParseException ee = new SAXParseException("Invalid Document", null);
		if (errorHandler == null)
			throw(ee);
		else
			errorHandler.fatalError(ee);
	}

  private boolean ver2;

	public static final int PARSE_ALL = 0;
	public static final int PARSE_TOP_LEVEL_ONLY = 1;
	public static final int PARSE_GET_DOC_ONLY = 2;

	private Map<String, String> htPrefixMap = new Hashtable<>();
	
	void registerPrefixes(DOMNode node) {
		String[] names = new String[0];
		/**
		 * @j2sNative names = node.getAttributeNames();
		 */
		for (int i = names.length; --i >= 0;) {
			String name = names[i];
			boolean isDefault;
			if (!(isDefault = name.equals("xmlns")) &&
					!name.startsWith("xmlns:"))
				continue;
			String prefix = (isDefault ? "##default:" : name.substring(6) + ":");
			String val = getAttribute(node, name);
			htPrefixMap.put(prefix, val);
			htPrefixMap.put(val + ":", val);
			htPrefixMap.put(val, prefix);
		}
	}

	/**
	 * 
	 * @param name
	 * @return
	 */
	public String getNamespaceForAttributeName(String name) {
		int pt = name.indexOf(":");
		if (pt < 0)
			return "";
		String uri = htPrefixMap.get(name.substring(0, pt + 1));
		if (uri != null)
			return uri;
		System.out.println("!! JSSAXParser could not find " + name);
		return "";
	}
	
	static String getAttribute(DOMNode node, String name) {
		return (/** @j2sNative node.getAttribute(name) || */ null);
	}

/**
   * Using JQuery to reading data from an XHTML document
   * 
   * @param doc
   * @throws SAXException
   */
	public void parseDocument(DOMNode doc, int mode) throws SAXException {
		if (docHandler == null && contentHandler == null)
			contentHandler = new JSSAXContentHandler();
		ver2 = (contentHandler != null);
		setNode(doc);
		if (mode == PARSE_GET_DOC_ONLY)
			return;
		if (ver2)
			contentHandler.startDocument();
		else
			docHandler.startDocument();
		
		// We must continue down until we have the root node.
		
		DOMNode element = (DOMNode) DOMNode.getAttr(doc, "firstChild");
	
		// skipping type 8 (processing directive) and type 10 (doctype) and anything
		// that is not 1 (element)
		
		/**
		 * @j2sNative
		 * 
		 * var type;
		 * while (element && (type = element.nodeType) != 1) {
		 *   element = element.nextSibling;
		 *   }
		 * 
		 */
		
		walkDOMTreePrivate(null, element, havePre, mode);
		if (ver2)
			contentHandler.endDocument();
		else
			docHandler.endDocument();
	}

	private char[] tempChars = new char[1024];

	/**
	 * SwingJS: Allow for a top-level only parsing
	 * 
	 * @param node
	 * @param topOnly
	 * @throws SAXException
	 */
	public void walkDOMTree(DOMNode node, int mode) throws SAXException {
		walkDOMTreePrivate(null, node, false, mode);
	}

	private void walkDOMTreePrivate(DOMNode root, DOMNode node, boolean skipTag, int mode) throws SAXException {
		String localName = ((String) DOMNode.getAttr(node, "localName"));
		String nodeName = (String) DOMNode.getAttr(node, "nodeName");
		String uri = (String) DOMNode.getAttr(node, "namespaceURI");
		if (localName == null) {
			if (mode != PARSE_ALL)
				return;
			getTextData(node, true);
		} else if (!skipTag) {
			registerPrefixes(node);
			//System.out.println("JSSAXParser: uri::" + uri + " localName::" + localName + " qName::" + nodeName);
			JSSAXAttributes atts = new JSSAXAttributes(node);
			setNode(node);
			if (ver2)
				contentHandler.startElement(uri, localName, nodeName, atts);
			else
				docHandler.startElement(localName, atts);
		}
		if (root == null)
			root = node;
		boolean isRoot = (node == root);
		node = (DOMNode) DOMNode.getAttr(node, "firstChild");
		while (node != null) {
			if (isRoot || mode == PARSE_ALL)
				walkDOMTreePrivate(root, node, false, mode);
			node = (DOMNode) DOMNode.getAttr(node, "nextSibling");
		}
		if (localName == null || skipTag)
			return;
		if (ver2)
			contentHandler.endElement(uri, localName, nodeName);
		else
			docHandler.endElement(localName);
	}

	public static DOMNode[] getChildren(DOMNode node) {
		return (DOMNode[]) DOMNode.getAttr(node, "children");
	}
	
	public static String getSimpleInnerText(DOMNode node) {
		DOMNode[] children = getChildren(node);
		return (children == null || children.length > 0 ? "" 
				: (String) DOMNode.getAttr(node, "textContent"));
	}
	
	private String getTextData(DOMNode node, boolean doProcess) throws SAXException {
		String nodeName = (String) DOMNode.getAttr(node, "nodeName");
		boolean isText = "#text".equals(nodeName);
		if (isText || "#cdata-section".equals(nodeName)) {
			String data = (String) DOMNode.getAttr(node, "textContent");
			if (!doProcess)
				return data;
//			if (isText || uniqueSeq == null || !data.startsWith(uniqueSeq)) {
				int len = data.length();
				char[] ch = tempChars;
				if (len > ch.length)
					ch = tempChars = (char[]) AU.ensureLength(ch, len * 2);
				for (int i = len; --i >= 0;)
					ch[i] = data.charAt(i);
				setNode(node);
				if (ver2)
					contentHandler.characters(ch, 0, len);
				else
					docHandler.characters(ch, 0, len);
				return null;
//			}
//			data = data.substring(uniqueSeq.length());
//			String target = data + " ";
//			target = target.substring(0, target.indexOf(" "));
//			data = data.substring(target.length()).trim();
//			if (ver2)
//				contentHandler.processingInstruction(target, data);
//			else
//				docHandler.processingInstruction(target, data);
		}
		return null;
	}

	DOMNode currentNode;
	private void setNode(DOMNode node) {
		this.currentNode = node;
	}
	
	public DOMNode getNode() {
		return currentNode;
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
