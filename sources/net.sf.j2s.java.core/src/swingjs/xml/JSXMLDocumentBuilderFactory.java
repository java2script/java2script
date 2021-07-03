package swingjs.xml;

import java.util.Hashtable;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

public class JSXMLDocumentBuilderFactory extends DocumentBuilderFactory {

	private JSXMLDocumentBuilder builder;

	public JSXMLDocumentBuilderFactory() {

	}

	Map<String, Object> attrs = new Hashtable<String, Object>();
	Map<String, Object> features = new Hashtable<String, Object>();

	public void setAttribute(String name, Object value) throws IllegalArgumentException {
		attrs.put(name, value);
	}

	public Object getAttribute(String name) throws IllegalArgumentException {
		return attrs.get(name);
	}

	public void setFeature(String name, boolean value) throws ParserConfigurationException {
		features.put(name, Boolean.valueOf(value));

	}

	public boolean getFeature(String name) throws ParserConfigurationException {
		return (features.get(name) == Boolean.TRUE);
	}

	@Override
	public DocumentBuilder newDocumentBuilder() throws ParserConfigurationException {
		// TODO Auto-generated method stub
		return new JSXMLDocumentBuilder(attrs, features, this);
	}

	
   }