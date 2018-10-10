package swingjs;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.PropertyException;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.UnmarshallerHandler;
import javax.xml.bind.ValidationEventHandler;
import javax.xml.bind.annotation.adapters.XmlAdapter;
import javax.xml.bind.attachment.AttachmentUnmarshaller;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLStreamReader;
import javax.xml.transform.Source;
import javax.xml.validation.Schema;

import org.w3c.dom.Node;
import org.xml.sax.InputSource;

/**
 * Simple marshaller/unmarshaller
 * 
 * @author hansonr
 *
 */
public class JSJAXBUnmarshaller implements Unmarshaller {

//	<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
//	<employee id="1">
//	    <name>Vimal Jaiswal</name>
//	    <Salary>50000.0</Salary>
//	</employee>


	private Object javaObject;
	private JAXBContext context;

	Map<String, Object> properties = new HashMap<String, Object>();
	private InputStream inputStream;
	private Reader reader;


	public JSJAXBUnmarshaller(JAXBContext context) {
		this.context = context;
	}

	@Override
	public Object unmarshal(File f) throws JAXBException {
		try {
			this.inputStream = new FileInputStream(f);
		} catch (FileNotFoundException e) {
			return new JAXBException("JSJAXBMarshaller: for "+ f + " " + e.getMessage());
		}
		return doUnmarshal(true);
	}

	private Object doUnmarshal(boolean isRoot) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object unmarshal(InputStream is) throws JAXBException {
		inputStream = is;
		return doUnmarshal(true);
	}

	@Override
	public Object unmarshal(Reader reader) throws JAXBException {
		this.reader = reader;
		return doUnmarshal(true);
	}

	@Override
	public Object unmarshal(URL url) throws JAXBException {
		try {
			inputStream = url.openStream();
		} catch (IOException e) {
			return new JAXBException("JSJAXBMarshaller: for " + url + " "+ e.getMessage());
		}
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object unmarshal(InputSource source) throws JAXBException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object unmarshal(Node node) throws JAXBException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> JAXBElement<T> unmarshal(Node node, Class<T> declaredType) throws JAXBException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object unmarshal(Source source) throws JAXBException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> JAXBElement<T> unmarshal(Source source, Class<T> declaredType) throws JAXBException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object unmarshal(XMLStreamReader reader) throws JAXBException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> JAXBElement<T> unmarshal(XMLStreamReader reader, Class<T> declaredType) throws JAXBException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object unmarshal(XMLEventReader reader) throws JAXBException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> JAXBElement<T> unmarshal(XMLEventReader reader, Class<T> declaredType) throws JAXBException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UnmarshallerHandler getUnmarshallerHandler() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setValidating(boolean validating) throws JAXBException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean isValidating() throws JAXBException {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void setEventHandler(ValidationEventHandler handler) throws JAXBException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ValidationEventHandler getEventHandler() throws JAXBException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setProperty(String name, Object value) throws PropertyException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Object getProperty(String name) throws PropertyException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setSchema(Schema schema) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Schema getSchema() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setAdapter(XmlAdapter adapter) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public <A extends XmlAdapter> void setAdapter(Class<A> type, A adapter) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public <A extends XmlAdapter> A getAdapter(Class<A> type) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setAttachmentUnmarshaller(AttachmentUnmarshaller au) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public AttachmentUnmarshaller getAttachmentUnmarshaller() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setListener(Listener listener) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Listener getListener() {
		// TODO Auto-generated method stub
		return null;
	}


}