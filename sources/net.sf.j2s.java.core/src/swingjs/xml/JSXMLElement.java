package swingjs.xml;

import org.w3c.dom.Attr;
import org.w3c.dom.DOMException;
import org.w3c.dom.Element;

public class JSXMLElement extends JSXMLNode implements Element {

	@Override
	public String getTagName() {
		return /** @j2sNative 1 ? this.node.tagName : */"";
	}

	@Override
	public String getNodeName() {
		return getTagName();
	}

	@Override
	public String getAttribute(String name) {
		return /** @j2sNative 1 ? this.node.getAttribute(name) : */"";
	}

	@Override
	public void setAttribute(String name, String value) throws DOMException {
		/** @j2sNative this.node.setAttribute(name, value) */
	}

	@Override
	public void removeAttribute(String name) throws DOMException {
		/** @j2sNative this.node.removeAttribute(name) */
	}

	@Override
	public Attr getAttributeNode(String name) {
		return (Attr) newNode(/** @j2sNative this.node.getAttributeNode(name)||*/null);
	}

	@Override
	public Attr setAttributeNode(Attr newAttr) throws DOMException {
		/** @j2sNative this.node.setAttributeNode(newAttr.node); */
		return newAttr;
	}

	@Override
	public Attr removeAttributeNode(Attr oldAttr) throws DOMException {
		/** @j2sNative this.node.removeAttributeNode(oldAttr.node); */
		return oldAttr;
	}


	@Override
	public String getAttributeNS(String namespaceURI, String localName) {
		return /** @j2sNative this.node.getAttributeNS(namespaceURI, localName)||*/null;
	}

	@Override
	public void setAttributeNS(String namespaceURI, String qualifiedName, String value) throws DOMException {
		/** @j2sNative this.node.setAttributeNS(namespaceURI, localName)*/
	}

	@Override
	public void removeAttributeNS(String namespaceURI, String localName) throws DOMException {
		/** @j2sNative this.node.removeAttributeNS(namespaceURI, localName)*/
	}

	@Override
	public Attr getAttributeNodeNS(String namespaceURI, String localName) {
		return (Attr) newNode(/** @j2sNative this.node.getAttributeNS(namespaceURI, localName) ||*/ null);
	}

	@Override
	public Attr setAttributeNodeNS(Attr newAttr) throws DOMException {
		return (Attr) newNode(/** @j2sNative this.node.seAttributeNS(newAttr.node) ||*/null);
	}

	@Override
	public boolean hasAttribute(String name) {
		return /** @j2sNative 1 ? this.node.hasAttribute(name) : */false;
	}

	@Override
	public boolean hasAttributeNS(String namespaceURI, String localName) {
		return /** @j2sNative 1 ? this.node.hasAttributeNS(namespaceURI, localName) : */false;
	}

	@Override
	public boolean isDefaultNamespace(String namespaceURI) {
		return /** @j2sNative 1 ? this.node.isDefaultNamespace(namespaceURI) : */false;
	}

	@Override
	public String lookupPrefix(String namespaceURI) {
		return /** @j2sNative 1 ? this.node.lookupPrefix(namespaceURI) : */"";
	}

}
