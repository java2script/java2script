package swingjs.xml;

import javax.xml.transform.ErrorListener;
import javax.xml.transform.Source;
import javax.xml.transform.Templates;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.URIResolver;

public class JSXMLTransformerFactory extends javax.xml.transform.TransformerFactory {

	@Override
	public Transformer newTransformer(Source source) throws TransformerConfigurationException {
		return new JSXMLTransformer(source);
	}

	@Override
	public Transformer newTransformer() throws TransformerConfigurationException {
		return new JSXMLTransformer(null);
	}

	@Override
	public Templates newTemplates(Source source) throws TransformerConfigurationException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Source getAssociatedStylesheet(Source source, String media, String title, String charset)
			throws TransformerConfigurationException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setURIResolver(URIResolver resolver) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public URIResolver getURIResolver() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setFeature(String name, boolean value) throws TransformerConfigurationException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean getFeature(String name) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void setAttribute(String name, Object value) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Object getAttribute(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setErrorListener(ErrorListener listener) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ErrorListener getErrorListener() {
		// TODO Auto-generated method stub
		return null;
	}

}
