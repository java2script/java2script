// SAX parser factory.
// No warranty; no copyright -- use this as you will.
// $Id: ParserFactory.java,v 1.5 1998/05/01 20:58:23 david Exp $

package javax.xml.parsers;

import java.lang.ClassNotFoundException;
import java.lang.IllegalAccessException;
import java.lang.InstantiationException;
import java.util.Properties;
import java.lang.ClassCastException;

import javax.xml.parsers.SAXParser;

import javax.xml.sax.Parser;
import javax.xml.sax.XMLReader;
import javax.xml.validation.Schema;

import org.xml.sax.SAXException;
import org.xml.sax.SAXNotRecognizedException;
import org.xml.sax.SAXNotSupportedException;

/**
 * 
 * SwingJS note: These class in the JDK is abstract. Here we allow instantiation
 * just of this. The default parser created is swingjs.xml.JSSAXParser, a minimal implementation,
 * but this default can be set by the developer on the page using 
 * 
 * 		System.setProperty("org.xml.sax.parser", fullClassName);
 * 
 * 
 * Create a new Java-specific class for dynamically loading SAX parsers.
 *
 * <p>
 * This class is not part of the platform-independent definition of SAX; it is
 * an additional convenience class designed specifically for Java XML
 * application writers. SAX applications can use the static methods in this
 * class to allocate a SAX parser dynamically at run-time based either on the
 * value of the `org.xml.sax.parser' system property or on a string containing
 * the class name.
 * </p>
 *
 * <p>
 * Note that the application still requires an XML parser that implements SAX.
 * </p>
 *
 * @author David Megginson (ak117@freenet.carleton.ca)
 * @version 1.0
 * @see org.xml.sax.Parser
 * @see java.lang.Class
 */
@SuppressWarnings("deprecation")
public class SAXParserFactory {

	private Properties props = new Properties();

	private boolean validating;
	private boolean xIncludeAware;
	private boolean nameSpaceAware;

	Schema schema; // SwingJS: This class is not implemented
	
	/**
	 * Obtain a new instance of a SAXParserFactory from class name.
	 * 
	 * 
	 * @param factoryClassName
	 * @param classLoader
	 * @return
	 * @throws ClassNotFoundException 
	 * @throws IllegalAccessException 
	 * @throws InstantiationException 
	 */
	static SAXParserFactory newInstance(String factoryClassName, ClassLoader classLoader) throws InstantiationException, IllegalAccessException, ClassNotFoundException {
		return (SAXParserFactory) Class.forName(factoryClassName).newInstance();
	}

	/**
	 * Just use this class
	 * 
	 * @return
	 */

	public static SAXParserFactory newInstance() {
		return new SAXParserFactory();
	}

	/**
	 * Just get a Parser
	 * 
	 * @return
	 */
	public SAXParser newSAXParser() throws ParserConfigurationException, SAXException {
		try {
			SAXParser p = (SAXParser) makeParser();
			if (p instanceof XMLReader) {
				XMLReader r = (XMLReader) p;
				for (Object name : props.keySet()) {
					r.setProperty((String) name, props.getProperty((String)name));
				}
			} else if (p instanceof org.xml.sax.XMLReader) {
				org.xml.sax.XMLReader r = (org.xml.sax.XMLReader) p;
				for (Object name : props.keySet()) {
					r.setProperty((String) name, props.getProperty((String)name));
				}
			}
			return p;
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * Create a new SAX parser using the `org.xml.sax.parser' system property.
	 *
	 * <p>
	 * The named class must exist and must implement the org.xml.sax.Parser
	 * interface.
	 * </p>
	 *
	 * @exception                        java.lang.NullPointerException There is no
	 *                                   value for the `org.xml.sax.parser' system
	 *                                   property.
	 * @exception                        java.lang.ClassNotFoundException The SAX
	 *                                   parser class was not found (check your
	 *                                   CLASSPATH).
	 * @exception IllegalAccessException The SAX parser class was found, but you do
	 *                                   not have permission to load it.
	 * @exception InstantiationException The SAX parser class was found but could
	 *                                   not be instantiated.
	 * @exception                        java.lang.ClassCastException The SAX parser
	 *                                   class was found and instantiated, but does
	 *                                   not implement org.xml.sax.Parser.
	 * @see #makeParser(java.lang.String)
	 * @see org.xml.sax.Parser
	 */
	public static Parser makeParser() throws ClassNotFoundException, IllegalAccessException, InstantiationException,
			NullPointerException, ClassCastException {
		// SwingJS -- directs to swingjs.xml.JSSAXParser
		String className = System.getProperty("org.xml.sax.parser", "swingjs.xml.JSSAXParser");
		if (className == null) {
			throw new NullPointerException("No value for sax.parser property");
		} else {
			return makeParser(className);
		}
	}

	/**
	 * 
	 * SAX parser object using the class name provided.
	 *
	 * <p>
	 * The named class must exist and must implement the org.xml.sax.Parser
	 * interface.
	 * </p>
	 *
	 * @param className A string containing the name of the SAX parser class.
	 * @exception                        java.lang.ClassNotFoundException The SAX
	 *                                   parser class was not found (check your
	 *                                   CLASSPATH).
	 * @exception IllegalAccessException The SAX parser class was found, but you do
	 *                                   not have permission to load it.
	 * @exception InstantiationException The SAX parser class was found but could
	 *                                   not be instantiated.
	 * @exception                        java.lang.ClassCastException The SAX parser
	 *                                   class was found and instantiated, but does
	 *                                   not implement org.xml.sax.Parser.
	 * @see #makeParser()
	 * @see org.xml.sax.Parser
	 */
	public static Parser makeParser(String className)
			throws ClassNotFoundException, IllegalAccessException, InstantiationException, ClassCastException {
		return (Parser) (Class.forName(className).newInstance());
	}

	/**
	 * Returns the particular property requested for in the underlying
	 * implementation of org.xml.sax.XMLReader.
	 * 
	 * @param name
	 * @return
	 * @throws SAXNotSupportedException 
	 * @throws SAXNotRecognizedException 
	 * @throws ParserConfigurationException 
	 */
	public boolean getFeature(String name) throws ParserConfigurationException, SAXNotRecognizedException, SAXNotSupportedException {
		return props.getProperty(name, "false").equals("true");
	}


	/**
	 * Gets the Schema object specified through the setSchema(Schema schema) method.
	 * 
	 * @return
	 */
	public Schema getSchema() {
		return schema;
	}

	/**
	 * Indicates whether or not the factory is configured to produce parsers which
	 * are namespace aware.
	 * 
	 * @return
	 */
	public boolean isNamespaceAware() {
		return nameSpaceAware;
	}

	/**
	 * Indicates whether or not the factory is configured to produce parsers which
	 * validate the XML content during parse.
	 * 
	 * @return
	 */
	public boolean isValidating() {
		return validating;
	}

	/**
	 * Get state of XInclude processing.
	 * 
	 * @return
	 */
	public boolean isXIncludeAware() {
		return xIncludeAware;
	}

	public void setFeature(String name, boolean value) throws ParserConfigurationException, SAXNotRecognizedException, SAXNotSupportedException {
		props.setProperty(name, "" + value);
	}

	/**
	 * Specifies that the parser produced by this code will provide support for XML
	 * namespaces.
	 * 
	 * @param awareness
	 */
	public void setNamespaceAware(boolean awareness) {
		nameSpaceAware = awareness;

	}

	/**
	 * Set the Schema to be used by parsers created from this factory.
	 * 
	 * @param schema
	 */
	public void setSchema(Schema schema) {
		this.schema = schema;
	}

	/**
	 * Specifies that the parser produced by this code will validate documents as
	 * they are parsed.
	 * 
	 * @param validating
	 */
	public void setValidating(boolean validating) {
		this.validating = validating;
	}

	/**
	 * Set state of XInclude processing.
	 * 
	 * @param state
	 */
	public void setXIncludeAware(boolean state) {
		this.xIncludeAware = state;
	}
}
