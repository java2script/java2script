package swingjs.xml;

import java.io.InputStream;
import java.io.Reader;
import java.util.HashMap;
import java.util.Map;

import javax.xml.stream.EventFilter;
import javax.xml.stream.StreamFilter;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLReporter;
import javax.xml.stream.XMLResolver;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;
import javax.xml.stream.util.XMLEventAllocator;
import javax.xml.transform.Source;

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

	@Override
	public XMLStreamReader createXMLStreamReader(Source source) throws XMLStreamException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public XMLStreamReader createXMLStreamReader(String systemId, InputStream stream) throws XMLStreamException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public XMLStreamReader createXMLStreamReader(String systemId, Reader reader) throws XMLStreamException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public XMLEventReader createXMLEventReader(Reader reader) throws XMLStreamException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public XMLEventReader createXMLEventReader(String systemId, Reader reader) throws XMLStreamException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public XMLEventReader createXMLEventReader(XMLStreamReader reader) throws XMLStreamException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public XMLEventReader createXMLEventReader(Source source) throws XMLStreamException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public XMLEventReader createXMLEventReader(InputStream stream) throws XMLStreamException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public XMLEventReader createXMLEventReader(InputStream stream, String encoding) throws XMLStreamException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public XMLEventReader createXMLEventReader(String systemId, InputStream stream) throws XMLStreamException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public XMLStreamReader createFilteredReader(XMLStreamReader reader, StreamFilter filter) throws XMLStreamException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public XMLEventReader createFilteredReader(XMLEventReader reader, EventFilter filter) throws XMLStreamException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public XMLResolver getXMLResolver() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setXMLResolver(XMLResolver resolver) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public XMLReporter getXMLReporter() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setXMLReporter(XMLReporter reporter) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean isPropertySupported(String name) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void setEventAllocator(XMLEventAllocator allocator) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public XMLEventAllocator getEventAllocator() {
		// TODO Auto-generated method stub
		return null;
	}

}
