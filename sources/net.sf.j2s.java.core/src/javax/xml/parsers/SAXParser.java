// SAX parser factory.
// No warranty; no copyright -- use this as you will.
// $Id: ParserFactory.java,v 1.5 1998/05/01 20:58:23 david Exp $

package javax.xml.parsers;

import javax.xml.sax.Parser;

import org.xml.sax.XMLReader;

/**
 * Just an interface to fill in for the JavaScript version
 * 
 * @author Bob Hanson
 *
 */
@SuppressWarnings("deprecation")
public abstract class SAXParser implements Parser {

	public abstract XMLReader getXMLReader();
}

