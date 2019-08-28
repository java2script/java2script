package swingjs.xml;

import java.io.InputStream;
import java.io.Reader;

import javax.xml.namespace.NamespaceContext;
import javax.xml.namespace.QName;
import javax.xml.stream.Location;
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

	@Override
	public Object getProperty(String name) throws IllegalArgumentException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int next() throws XMLStreamException {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void require(int type, String namespaceURI, String localName) throws XMLStreamException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getElementText() throws XMLStreamException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int nextTag() throws XMLStreamException {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public boolean hasNext() throws XMLStreamException {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void close() throws XMLStreamException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getNamespaceURI(String prefix) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isStartElement() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isEndElement() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isCharacters() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isWhiteSpace() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public String getAttributeValue(String namespaceURI, String localName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getAttributeCount() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public QName getAttributeName(int index) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getAttributeNamespace(int index) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getAttributeLocalName(int index) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getAttributePrefix(int index) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getAttributeType(int index) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getAttributeValue(int index) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isAttributeSpecified(int index) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public int getNamespaceCount() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public String getNamespacePrefix(int index) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getNamespaceURI(int index) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public NamespaceContext getNamespaceContext() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getEventType() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public String getText() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public char[] getTextCharacters() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getTextCharacters(int sourceStart, char[] target, int targetStart, int length)
			throws XMLStreamException {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getTextStart() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getTextLength() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public String getEncoding() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean hasText() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Location getLocation() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public QName getName() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getLocalName() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean hasName() {
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
	public String getVersion() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isStandalone() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean standaloneSet() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public String getCharacterEncodingScheme() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getPITarget() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getPIData() {
		// TODO Auto-generated method stub
		return null;
	}

}
