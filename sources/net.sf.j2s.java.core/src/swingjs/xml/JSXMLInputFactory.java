package swingjs.xml;

import java.io.InputStream;
import java.io.Reader;
import java.util.HashMap;
import java.util.Map;

import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;

public class JSXMLInputFactory extends XMLInputFactory {

	@Override
	public XMLStreamReader createXMLStreamReader(Reader reader) throws XMLStreamException {
		return new JSXMLStreamReader(reader);
	}

	@Override
	public XMLStreamReader createXMLStreamReader(InputStream stream) throws XMLStreamException {
		return new JSXMLStreamReader(stream);
	}

	@Override
	public XMLStreamReader createXMLStreamReader(InputStream stream, String encoding) throws XMLStreamException {
		return new JSXMLStreamReader(stream);
	}

	Map<String, Object> properties = new HashMap<>();
	@Override
	public void setProperty(String name, Object value) throws IllegalArgumentException {
		properties.put(name,  value);
	}

	@Override
	public Object getProperty(String name) throws IllegalArgumentException {
		return properties.get(name);
	}

}
