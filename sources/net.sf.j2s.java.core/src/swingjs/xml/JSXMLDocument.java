package swingjs.xml;

import java.io.IOException;

import org.w3c.dom.Attr;
import org.w3c.dom.CDATASection;
import org.w3c.dom.Comment;
import org.w3c.dom.DOMException;
import org.w3c.dom.DOMImplementation;
import org.w3c.dom.Document;
import org.w3c.dom.DocumentFragment;
import org.w3c.dom.DocumentType;
import org.w3c.dom.Element;
import org.w3c.dom.EntityReference;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.w3c.dom.ProcessingInstruction;
import org.w3c.dom.Text;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import swingjs.JSUtil;
import swingjs.api.js.DOMNode;

public class JSXMLDocument extends JSXMLNode implements Document {

	protected DOMNode doc;
	protected ImplementationImpl impl;
	protected ImplementationImpl.DocumentTypeImpl docType;

	
	public JSXMLDocument() {
		doc = JSUtil.jQuery.parseXML("<xml></xml>");
		doc.removeChild(DOMNode.firstChild(doc));
		setNode(doc);
	}

	public Document parse(InputSource is) throws SAXException, IOException {
		node = doc = new JSSAXParser().parseToDOM(is);
		return this;
	}

	@Override
	public DocumentType getDoctype() {
		return docType;
	}

	@Override
	public DOMImplementation getImplementation() {
		return impl == null ? (impl = new ImplementationImpl()) : impl;
	}

	@Override
	public Element getDocumentElement() {
		return (Element) get("firstElementChild");
	}

	@Override
	public Element createElement(String tagName) throws DOMException {
		return (Element) new JSXMLElement().setNode(
				/**  @j2sNative this.doc.createElement(tagName) ||*/null);
	}

	@Override
	public DocumentFragment createDocumentFragment() {
		return (DocumentFragment) new JSXMLDocumentFragment().setNode(
				/**
				 * @j2sNative this.doc.createDocumentFragment() ||
				 */
				null);
	}

	@Override
	public Text createTextNode(String data) {
		return (Text) new JSXMLText().setNode(
				/**  @j2sNative this.doc.createTextNode(data) ||*/null);
	}

	@Override
	public Comment createComment(String data) {
		return (Comment) new JSXMLComment().setNode(
				/**  @j2sNative this.doc.createComment(data) ||*/null);
	}

	@Override
	public CDATASection createCDATASection(String data) throws DOMException {
		return (CDATASection) new JSXMLCDATASection().setNode(
				/**  @j2sNative this.doc.createCDATASection(data) ||*/null);
	}

	@Override
	public ProcessingInstruction createProcessingInstruction(String target, String data) throws DOMException {
		return (ProcessingInstruction) new JSXMLProcessingInstruction().setNode(/** @j2sNative this.doc.createProcessingInstruction(target, data) || */ null);	
	}

	@Override
	public Attr createAttribute(String name) throws DOMException {
		return (Attr) new JSXMLAttr().setNode(/**@j2sNative 1 ? this.doc.createAttribute(name) : */ null);
	}

	@Override
	public EntityReference createEntityReference(String name) throws DOMException {
		return (EntityReference) new JSXMLEntityReference().setNode(/** @j2sNative this.doc.createEntityReference(name) || */ null);	
	}

	@Override
	public Element createElementNS(String namespaceURI, String qualifiedName) throws DOMException {
		return (Element) new JSXMLElement().setNode(
				/**  @j2sNative this.doc.createElementNS(namespaceURI, qualifiedName) ||*/null);
	}
	@Override
	public Attr createAttributeNS(String namespaceURI, String qualifiedName) throws DOMException {
		return (Attr) new JSXMLAttr().setNode(/**@j2sNative 1 ? this.doc.createAttributeNS(namespaceURI, qualifiedName) : */ null);
	}

	@Override
	public Element getElementById(String id) {
		return (Element) get("id");
	}


	@Override
	public Node importNode(Node importedNode, boolean deep) throws DOMException {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public String getActualEncoding() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setActualEncoding(String actualEncoding) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getEncoding() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setEncoding(String encoding) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean getStandalone() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void setStandalone(boolean standalone) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean getStrictErrorChecking() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void setStrictErrorChecking(boolean strictErrorChecking) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getVersion() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setVersion(String version) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Node adoptNode(Node source) throws DOMException {
		/** @j2sNative this.node.appendChild(source.node);*/
		return source;
	}
	
	@Override
	public Node appendChild(Node newChild) throws DOMException {
		/** @j2sNative this.doc.appendChild(this.node = newChild.node); */
		return newChild;
	}

	@Override
	public Node getFirstChild() {
		return get("root");
	}


	@Override
	public String getDocumentURI() {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public NodeList getElementsByAttributeValue(String namespaceURI, String localName, String value) {
		JSUtil.notImplemented(null);
		return null;
	}


	private class ImplementationImpl implements DOMImplementation {
		
		DOMNode domImpl;
		public ImplementationImpl() {
			@SuppressWarnings("unused")
			DOMNode mydoc = doc;
			domImpl = /** @j2sNative mydoc.implementation || */null;			
		}


		@Override
		public boolean hasFeature(String feature, String version) {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public DocumentTypeImpl createDocumentType(String qualifiedName, String publicId, String systemId)
				throws DOMException {
			return new DocumentTypeImpl(qualifiedName, publicId, systemId);
		}
		
		@Override
		public Document createDocument(String namespaceURI, String qualifiedName, org.w3c.dom.DocumentType doctype)
				throws DOMException {
			JSUtil.notImplemented(null);
			return null;

		} 
		
		/**
		 * Only qualifiedName, systemId, and publicId are implemented.
		 * 
		 * @author hansonr
		 *
		 */
		private class DocumentTypeImpl extends JSXMLNode implements org.w3c.dom.DocumentType {


			public DocumentTypeImpl(String qualifiedName, String publicId, String systemId) {
				@SuppressWarnings("unused")
				DocumentTypeImpl me = this;
				@SuppressWarnings("unused")
				DOMNode di = domImpl;
				me.node = /** @j2sNative 1 ? di.createDocumentType(qualifiedName, publicId, systemId) : */null;
			}


			@Override
			public String getName() {
				return /**@j2sNative 1 ? this.node.name : */null;
			}
			

			@Override
			public String getSystemId() {
				return  /**@j2sNative 1 ? this.node.systemId : */null;
			}

			@Override
			public String getPublicId() {
				return  /**@j2sNative 1 ? this.node.publicId : */null;
			}

			@Override
			public NamedNodeMap getEntities() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public NamedNodeMap getNotations() {
				// TODO Auto-generated method stub
				return null;
			}

			@Override
			public String getInternalSubset() {
				// TODO Auto-generated method stub
				return null;
			}
			
		}

	}
	
}
