package org.xml.sax.demo;
// SAX demonstration for parsing from a UTF-16 character stream.
// No warranty; no copyright -- use this as you will.
// $Id: CharacterStreamDemo.java,v 1.3 1998/05/01 20:44:33 david Exp $

import org.xml.sax.Parser;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import org.xml.sax.helpers.ParserFactory;

import java.io.StringReader;


/**
  * Demonstrate parsing from a UTF-16 character stream.
  *
  * <p>Usage: java -Dorg.xml.sax.parser=<var>CLASSNAME</var>
  * CharacterStreamDemo</p>
  *
  * <p>The SAX parser will read the document from a character
  * stream connected to an internal string.</p>
  *
  * <p>Note that the Java implementation of SAX represents a
  * character stream using a Reader.</p>
  *
  * @see DemoHandler
  * @see org.xml.org.xml.sax.parser
  * @see org.xml.sax.InputSource
  * @see org.xml.sax.helpers.ParserFactory
  * @see java.io.StringReader
  */
public class CharacterStreamDemo {

				// This is the document, in all its glory.
				// In a read-world application, this
				// could come from a database, a text
				// field, or just about anywhere.
  final static String doc = "<?xml version=\"1.0\"?>" +
                            "<doc>\n" +
                            "<title>Hello</title>\n" +
                            "<para>Hello, world!</para>\n" +
                            "</doc>\n";

  /**
    * Main entry point for an application.
    */
  public static void main (String args[])
    throws Exception
  {
    DemoHandler handler;
    InputSource source;
    Parser parser;
    StringReader reader;

				// First, check the command-line
				// arguments.
    if (args.length != 0) {
      System.err.println("Usage: java CharTest");
      System.exit(2);
    }

				// Allocate a SAX Parser object, using
				// the class name provided in the
				// org.xml.sax.parser property (you could
				// also specify a classname here).
    parser = ParserFactory.makeParser();

				// Allocate an event handler, and register
				// it with the SAX parser for all four
				// types of events (we could use a 
				// separate object for each).
    handler = new DemoHandler();
    parser.setEntityResolver(handler);
    parser.setDTDHandler(handler);
    parser.setDocumentHandler(handler);
    parser.setErrorHandler(handler);

				// Create a Java-specific StringReader
				// for the internal document.
    reader = new StringReader(doc);

				// Parse the document from the
				// character stream.
    parser.parse(new InputSource(reader));
  }

}
