package swingjs.xml;

import java.io.Writer;
import java.util.Hashtable;
import java.util.Map;
import java.util.Properties;

import javax.xml.transform.ErrorListener;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.TransformerException;
import javax.xml.transform.URIResolver;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javajs.util.PT;
import swingjs.JSUtil;

public class JSXMLTransformer extends javax.xml.transform.Transformer {

	private Source source;
	private JSXMLDocument doc;
	private URIResolver resolver;
	private int nIndent;
	private String indentSpaces;
	Properties outputProperties = new Properties();
	Map<String, Object> params = new Hashtable<String, Object>();
	
	public JSXMLTransformer(Source source) {
		this.source = source;
		outputProperties.put(OutputKeys.VERSION,  "1.0");
		outputProperties.put(OutputKeys.ENCODING, "UTF-8");
		outputProperties.put(OutputKeys.STANDALONE, "no");		
	}

	@Override
	public void transform(Source xmlSource, Result outputTarget) throws TransformerException {
		try {
		if (xmlSource instanceof DOMSource) {
			doc = (JSXMLDocument) ((DOMSource) xmlSource).getNode();
		} else {
			JSUtil.notImplemented("transform " + xmlSource.getClass().getName());
			return;
		}
		boolean doIndent = "yes".equals(getOutputProperty(OutputKeys.INDENT)); 
		String indent = !doIndent ? null : getOutputProperty("{http://xml.apache.org/xslt}indent-amount");
		if (doIndent) {
			int nIndent = (indent == null ? 2 : Math.max(0, Math.min(PT.parseInt(indent), 10)));
			indentSpaces = "          ".substring(0, nIndent);
			indentDoc(doc.getFirstChild(), "\n");
		}
		String s = getXmlDeclaration() + getDocType();
		s += /** @j2sNative new XMLSerializer().serializeToString(this.doc.doc) || */null;
		s += "\n";
		if (outputTarget instanceof StreamResult) {
			Writer w = ((StreamResult) outputTarget).getWriter();
			w.write(s);
		}
		} catch (Throwable e) {
			throw new TransformerException(e);
		}
		
	}

	private String getXmlDeclaration() {
		String encoding = getOutputProperty("encoding");
		String version = getOutputProperty("version");
		if (version != "1.0")
			System.out.println("SwingJS XML version must be 1.0");
		if (encoding != "UTF-8")
			System.out.println("SwingJS XML encoding must be UTF-8");
		return "<?xml version=\"" + version + "\"" 
				+ " encoding=\""+encoding+"\""
				+ " standalone=\""+getOutputProperty("standalone")+"\"?>\n";
	}

	private String getDocType() {
//		t.setOutputProperty(OutputKeys.DOCTYPE_PUBLIC, docType.getPublicId());
//		t.setOutputProperty(OutputKeys.DOCTYPE_SYSTEM, docType.getSystemId());

		String pub = getOutputProperty(OutputKeys.DOCTYPE_PUBLIC);
		String sys = getOutputProperty(OutputKeys.DOCTYPE_SYSTEM);
		String root = doc.getFirstChild().getNodeName();
		
		return (pub == null || sys == null ? null 
				:
					"<!DOCTYPE "+root+" PUBLIC \""+pub+"\" \""+sys+"\">\n");
	}

	private void indentDoc(Node node, String indent) {
		if (!node.hasChildNodes() || node.getFirstChild().getNodeType() == Node.TEXT_NODE)
			return;
		NodeList list = node.getChildNodes();
		for (int i = list.getLength(); --i >= 0;) {
			Node child = list.item(i);
			indentDoc(child, indent + indentSpaces);	
			Node text = doc.createTextNode(indent + indentSpaces);
			node.insertBefore(text, child);
		}
		node.appendChild(doc.createTextNode(indent));
		
	}

	@Override
	public void setParameter(String name, Object value) {
		params.put(name, value);	
	}

	@Override
	public Object getParameter(String name) {
		return params.get(name);
	}

	@Override
	public void clearParameters() {
		params.clear();
	}

	@Override
	public void setURIResolver(URIResolver resolver) {
		this.resolver = resolver;		
	}

	@Override
	public URIResolver getURIResolver() {
		return resolver;
	}

	@Override
	public void setOutputProperties(Properties oformat) {
		outputProperties = oformat;
	}

	@Override
	public Properties getOutputProperties() {
		return outputProperties;
	}

	private ErrorListener listener;
	
	@Override
	public void setOutputProperty(String name, String value) throws IllegalArgumentException {
		outputProperties.put(name,  value);	
	}

	@Override
	public String getOutputProperty(String name) throws IllegalArgumentException {
		return outputProperties.getProperty(name);
	}

	@Override
	public void setErrorListener(ErrorListener listener) throws IllegalArgumentException {
		this.listener = listener;
		
	}

	@Override
	public ErrorListener getErrorListener() {
		return listener;
	}

}
