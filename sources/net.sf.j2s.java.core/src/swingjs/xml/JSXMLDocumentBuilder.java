package swingjs.xml;

import java.io.IOException;
import javax.xml.parsers.DocumentBuilder;
import org.w3c.dom.DOMImplementation;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.EntityResolver;
import org.xml.sax.ErrorHandler;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import swingjs.api.js.DOMNode;

import java.util.Map;

public class JSXMLDocumentBuilder extends DocumentBuilder {

	private Map<String, Object> attrs;
	private Map<String, Object> features;
	private DOMNode doc;
	private boolean ignoreWhitespace;
	private boolean ignoreComments;

	public JSXMLDocumentBuilder(Map<String, Object> attrs, Map<String, Object> features, JSXMLDocumentBuilderFactory dbf) {
		this.attrs= attrs;
		this.features = features;
		this.ignoreWhitespace = dbf.isIgnoringElementContentWhitespace();
		this.ignoreComments = dbf.isIgnoringComments();
	}


	@Override
	public Document newDocument() {
		return new JSXMLDocument();
	}


	@Override
	public Document parse(InputSource is) throws SAXException, IOException {
//	    doc = new JSSAXParser().parseToDOM(is);
//		return (Document) (Object) doc;
		Document d = new JSXMLDocument().parse(is);
		if (this.ignoreComments || this.ignoreWhitespace)
			fix(d.getDocumentElement());
		return d;
	}

	/**
	 * Remove white space and comments if specified. 
	 * Note that this is not quite right -- we are not reading the
	 * dtd to find out if a text node could be blank or white space, 
	 * just assuming that it the DocumentBuilderFactory flag is set, then
	 * we should get rid of all white space.
	 * @param node
	 */

	private void fix(Node node) {
		if (node.hasChildNodes()) {
			NodeList list = node.getChildNodes();
			for (int i = list.getLength(); --i >= 0;) {
				Node n = list.item(i);
				switch (n.getNodeType()) {
				case Node.TEXT_NODE:
					if (ignoreWhitespace && n.getNodeValue().trim().length() == 0)
						node.removeChild(n);
					break;
				case Node.COMMENT_NODE:
					if (ignoreComments) {
						node.removeChild(n);
					} else {
						continue;
					}
					break;
				case Node.ELEMENT_NODE:
					fix(n);
					break;
				default:
					break;
				}
			}
		}

	}


	@Override
	public boolean isNamespaceAware() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isValidating() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void setEntityResolver(EntityResolver er) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setErrorHandler(ErrorHandler eh) {
		// TODO Auto-generated method stub

	}

	@Override
	public DOMImplementation getDOMImplementation() {
		// TODO Auto-generated method stub
		return null;
	}

}
