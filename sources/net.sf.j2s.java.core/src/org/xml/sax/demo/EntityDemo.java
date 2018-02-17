package org.xml.sax.demo;
// SAX demonstration for custom entity resolution.
// No warranty; no copyright -- use this as you will.
// $Id: EntityDemo.java,v 1.2 1998/05/01 20:52:16 david Exp $

import org.xml.sax.InputSource;
import org.xml.sax.Parser;
import org.xml.sax.SAXException;

import org.xml.sax.helpers.ParserFactory;

import java.io.StringReader;
import java.net.URL;


/**
  * Demonstrate custom entity resolution.
  *
  * <p>Usage: java -Dorg.xml.sax.parser=<var>classname</var> EntityDemo
  * <var>systemId</var></p>
  *
  * <p>If you create an XML document which references an 
  * external text entity with the public identifier
  * "-//megginson//TEXT Sample Entity//EN", this application will
  * substitute the string "Entity resolution works!" for the
  * entity's contents:</p>
  *
  * <pre>
  * &lt;!DOCTYPE doc [
  *   &lt;!ENTITY ent 
  *     PUBLIC "-//megginson//TEXT Sample Entity//EN" "ent.xml">
  * ]>
  * &lt;doc>
  * &lt;para>&ent;&lt;/para>
  * &lt;/doc>
  * </pre>
  *
  * <p>The SAX parser will open a connection to the URI itself.</p>
  *
  * @see DemoHandler
  */
public class EntityDemo extends DemoHandler {

				// This is the Reader that will be
				// substituted for the entity contents.
  StringReader reader =
    new StringReader("Entity resolution works!");

  /**
    * Main entry point.
    */
  public static void main (String args[])
    throws Exception
  {
    Parser parser;
    EntityDemo handler;

				// Check the command-line usage.
    if (args.length != 1) {
      System.err.println("Usage: java -Dorg.xml.sax.parser=<classname> " +
			 "EntityDemo <document>");
      System.exit(2);
    }

				// Make the parser, using the value
				// provided in the org.xml.sax.parser property.
    parser = ParserFactory.makeParser();

				// Create an event handler, and register
				// it with the SAX parser.
    handler = new EntityDemo();
    parser.setEntityResolver(handler);
    parser.setDTDHandler(handler);
    parser.setDocumentHandler(handler);
    parser.setErrorHandler(handler);

				// Parse the document.
    parser.parse(makeAbsoluteURL(args[0]));
  }


  /**
    * Override resolveEntity().
    *
    * <p>If the public identifier is "-//megginson//TEXT Sample
    * //Entity//EN", instruct the parser to read the entity's
    * contents from the StringReader rather than from the 
    * system identifier.</p>
    *
    * <p>The public identifier is safer than the system identifier,
    * since the parser may have resolved the system identifier to
    * an absolute URL.</p>
    *
    * @see org.xml.sax.EntityResolver#resolveEntity
    */
  @Override
	public InputSource resolveEntity (String publicId, String systemId)
  {
    if (publicId != null &&
	publicId.equals("-//megginson//TEXT Sample Entity//EN")) {
      return new InputSource(reader);
    } else {
      return null;
    }
  }


  /**
    * If a URL is relative, make it absolute against the current directory.
    */
  private static String makeAbsoluteURL (String url)
    throws java.net.MalformedURLException
  {
    URL baseURL;

    String currentDirectory = System.getProperty("user.dir");
    String fileSep = System.getProperty("file.separator");
    String file = currentDirectory.replace(fileSep.charAt(0), '/') + '/';

    if (file.charAt(0) != '/') {
      file = "/" + file;
    }
    baseURL = new URL("file", null, file);

    return new URL(baseURL, url).toString();
  }

}
