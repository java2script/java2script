package swingjs.xml;

import org.w3c.dom.DOMException;
import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import swingjs.api.js.DOMNode;

public class JSXMLNode implements Node {
	
	DOMNode node;
	

	public Node setNode(DOMNode n) {
		node = n;
		/**@j2sNative n._o = this; */
		return this;
	}

	protected Node get(String type) {
		DOMNode n = null;
		switch (type) {
		case "id" :
			/** @j2sNative n = this.doc.getElementById(id) */
			break;
		case "root":
			n = node;
			break;
		case "owner":
			/** @j2sNative n = this.node.ownerDocument; */
			break;
		case "clone" :
			/** @j2sNative n = this.node.cloneNode(false); */
			break;
		case "clonedeep": 
			/** @j2sNative n = this.node.cloneNode(true); */
			break;
		default:
			/** @j2sNative n = this.node[type]; */
			break;
		}
		return newNode(n);
	}

	static Node newNode(DOMNode n) {

		/**
		 * @j2sNative
		 * 
		 * 			if (n == null) return null; if (n._o != null) return n._o;
		 */
		switch (/** @j2sNative 1 ? n.nodeType : */
		0) {
		case Node.ELEMENT_NODE:
			return new JSXMLElement().setNode(n);
		case Node.TEXT_NODE:
			return new JSXMLText().setNode(n);
		case Node.COMMENT_NODE:
			return new JSXMLComment().setNode(n);
		default:
			return new JSXMLNode().setNode(n);
		}
	}


	@Override
	public String getNodeName() {
		return /** @j2sNative 1 ? this.node.nodeName : */""; 
	}

	@Override
	public String getNodeValue() throws DOMException {
		return /** @j2sNative 1 ? this.node.value : */ null; 
	}

	@Override
	public void setNodeValue(String s) throws DOMException {
		 /** @j2sNative this.node.value = s;*/
	}

	@Override
	public short getNodeType() {
		return /** @j2sNative 1 ? this.node.nodeType : */ 0;
	}

	@Override
	public Node getParentNode() {
		return get("parentNode");
	}


	@Override
	public NodeList getChildNodes() {
		return new JSXMLNodeList(/**@j2sNative 1 ? this.node.childNodes :*/null);
	}

	@Override
	public Node getFirstChild() {
		return get("firstChild");
	}

	@Override
	public Node getLastChild() {
		return get("lastChild");
	}

	@Override
	public Node getPreviousSibling() {
		return get("previousSibling");
	}

	@Override
	public Node getNextSibling() {
		return get("nextSibling");
	}

	@Override
	public NamedNodeMap getAttributes() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Document getOwnerDocument() {
		return (Document) get("owner");
	}

	@Override
	public Node insertBefore(Node newChild, Node refChild) throws DOMException {
		/** @j2sNative this.node.insertBefore(newChild.node, refChild.node); */
		return newChild;
	}

	@Override
	public Node replaceChild(Node newChild, Node oldChild) throws DOMException {
		/** @j2sNative this.node.replaceChild(newChild.node, oldChild.node); */
		return oldChild;
	}

	@Override
	public Node removeChild(Node oldChild) throws DOMException {
		/** @j2sNative this.node.removeChild(oldChild.node); */
		return oldChild;
	}

	@Override
	public Node appendChild(Node newChild) throws DOMException {
		/** @j2sNative this.node.appendChild(newChild.node); */
		return newChild;
	}

	@Override
	public boolean hasChildNodes() {
		return /** @j2sNative 1 ? this.node.hasChildNodes() :*/ false;
	}

	@Override
	public Node cloneNode(boolean deep) {
		return get(deep ? "cloneDeep" : "clone");
	}

	@Override
	public void normalize() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean supports(String feature, String version) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public String getNamespaceURI() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getPrefix() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setPrefix(String prefix) throws DOMException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getLocalName() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getBaseURI() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int compareDocumentOrder(Node other) throws DOMException {
		int i = compareDocumentPosition(other);
		if ((i & DOCUMENT_POSITION_CONTAINS) != 0)
				return ANCESTOR;
		if ((i & DOCUMENT_POSITION_CONTAINED_BY) != 0) 
			return DESCENDANT;
		if ((i & DOCUMENT_POSITION_FOLLOWING) != 0)
			return FOLLOWING;
		if ((i & DOCUMENT_POSITION_PRECEDING) != 0)
			return PRECEDING;
		return UNORDERED;
	}

	@Override
	public short compareDocumentPosition(Node other) throws DOMException {
		return /** @j2sNative 1 ? this.node.compareDocumentPosition(other.node) : */0;
	}

	@Override
	public int compareTreePosition(Node other) throws DOMException {
		return /** @j2sNative 1 ? this.node.compareTreePosition(other.node) : */0;
	}

	@Override
	public String getTextContent() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setTextContent(String textContent) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean isSameNode(Node other) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public String lookupNamespacePrefix(String namespaceURI) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String lookupNamespaceURI(String prefix) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void normalizeNS() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Object setUserData(Object data, String key) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object getUserData(String key) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object getKey() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isEqualNode(Node child2) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean hasAttributes() {
		// TODO Auto-generated method stub
		return false;
	}

	public NodeList getElementsByAttributeValue(String namespaceURI, String localName, String value) {
		// TODO Auto-generated method stub
		return null;
	}

	public NodeList getElementsByTagName(String tagname) {
		return new JSXMLNodeList(/** @j2sNative this.node.getElementsByTagName(tagname) || */null);
	}

	public NodeList getElementsByTagNameNS(String namespaceURI, String localName) {
		return new JSXMLNodeList(/** @j2sNative this.node.getElementsByTagNameNS(namespaceURI, localName) || */null);
	}

}
