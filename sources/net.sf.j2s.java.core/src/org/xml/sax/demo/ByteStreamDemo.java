package org.xml.sax.demo;
// SAX demonstration for parsing from a raw byte stream.
// No warranty; no copyright -- use this as you will.
// $Id: ByteStreamDemo.java,v 1.4 1998/05/01 20:38:19 david Exp $

import org.xml.sax.Parser;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import org.xml.sax.helpers.ParserFactory;

import java.io.FileInputStream;



/**
  * Demonstrate parsing from a byte stream.
  *
  * <p>Usage: java -Dorg.xml.sax.parser=<var>CLASSNAME</var> ByteStreamDemo
  * <var>FILE</var></p>
  *
  * <p>The SAX parser will open a byte stream to the file name
  * provided.  Note the use of the InputStreamAdapter class to allow a
  * Java InputStream to serve as a SAX ByteStream.</p>
  *
  * @see DemoHandler
  */
public class ByteStreamDemo {


  /**
    * Main entry point.
    */
  public static void main (String args[])
    throws Exception
  {
    Parser parser;
    InputSource source;
    DemoHandler handler;
    FileInputStream input;

				// First, check the command-line usage.
    if (args.length != 1) {
      System.err.println("Usage: java -Dorg.xml.sax.parser=<classname> " +
			 "SystemIdDemo <document>");
      System.exit(2);
    }

				// Allocate a SAX Parser object, using
				// the class name provided in the
				// org.xml.sax.parser property.
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

				// Create a Java FileInputStream from
				// the file: note that SAX cannot
				// use this directly.
    input = new FileInputStream(args[0]);

				// Create the input source.
    source = new InputSource(input);
    source.setSystemId(args[0]);

				// Parse the document from the
				// ByteStream.
    parser.parse(source);
  }

}
