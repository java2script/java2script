package swingjs.xml;

import org.w3c.dom.DOMException;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;

public class JSXMLAttributes extends JSXMLNode implements NamedNodeMap {

	@Override
	public Node getNamedItem(String name) {
		return newNode(/** @j2sNative this.node.getNamedItem(name) || */null);
	}

	@Override
	public Node setNamedItem(Node arg) throws DOMException {
		return newNode(/** @j2sNative this.node.setNamedItem(arg) || */null);
	}

	@Override
	public Node removeNamedItem(String name) throws DOMException {
		return newNode(/** @j2sNative this.node.removeNamedItem(name) || */null);
	}

	@Override
	public Node item(int index) {
		return newNode(/** @j2sNative this.node.item(index) || */null);
	}

	@Override
	public int getLength() {
		return (/** @j2sNative this.node.length || */0);
	}

	@Override
	public Node getNamedItemNS(String namespaceURI, String localName) {
		return newNode(/** @j2sNative this.node.getNamedItemNS(namespaceURI, localName) || */null);
	}

	@Override
	public Node setNamedItemNS(Node arg) throws DOMException {
		return newNode(/** @j2sNative this.node.setNamedItemNS(arg) || */null);
	}

	@Override
	public Node removeNamedItemNS(String namespaceURI, String localName) throws DOMException {
		return newNode(/** @j2sNative this.node.removeNamedItemNS(namespaceURI, localName) || */null);
	}

}
