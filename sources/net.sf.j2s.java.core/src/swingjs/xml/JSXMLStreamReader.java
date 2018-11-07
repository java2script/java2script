package swingjs.xml;

import java.io.InputStream;
import java.io.Reader;

import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;

import org.xml.sax.InputSource;

public class JSXMLStreamReader implements XMLStreamReader {

	private InputStream stream;
	private Reader reader;

	public JSXMLStreamReader(InputStream stream) throws XMLStreamException {
		this.stream = stream;
	}

	public JSXMLStreamReader(Reader reader) throws XMLStreamException {
		this.reader = reader;
	}
	
	public InputSource getSource() {
		return (stream != null ? new InputSource(stream)
				: reader != null ? new InputSource(reader): null);
	}

}
