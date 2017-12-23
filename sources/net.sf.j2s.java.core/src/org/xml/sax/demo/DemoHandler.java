package org.xml.sax.demo;

// SAX event handler for demos.
// No warranty; no copyright -- use this as you will.
// $Id: DemoHandler.java,v 1.3 1998/05/01 20:45:16 david Exp $

import org.xml.sax.HandlerBase;
import org.xml.sax.InputSource;
import org.xml.sax.Locator;
import org.xml.sax.AttributeList;
import org.xml.sax.EntityResolver;
import org.xml.sax.DTDHandler;
import org.xml.sax.DocumentHandler;
import org.xml.sax.ErrorHandler;
import org.xml.sax.SAXParseException;


/**
  * Event handler class for SAX demos.
  *
  * <p>This handler simply reports all of the events that it receives.
  * It is useful for testing and comparing SAX implementations, and
  * for teaching or learning about SAX.  This is also a demonstration
  * of how one class can implement all four handler interfaces.</p>
  *
  * @see org.xml.sax.EntityResolver
  * @see org.xml.sax.DTDHandler
  * @see org.xml.sax.DocumentHandler
  * @see org.xml.sax.ErrorHandler
  */
public class DemoHandler
  implements EntityResolver, DTDHandler, DocumentHandler, ErrorHandler
{



  //////////////////////////////////////////////////////////////////////
  // Implementation of org.xml.sax.EntityResolver
  //////////////////////////////////////////////////////////////////////


  /**
    * Display requests for entity resolution.
    *
    * <p>The SAX parser will invoke this method to give the application
    * a chance to resolve entities.  This implementation always
    * returns null, so that the parser will resolve the entity
    * itself.</p>
    *
    * @see org.xml.sax.EntityResolver#resolveEntity
    */
  @Override
	public InputSource resolveEntity (String publicId, String systemId)
  {
    System.out.print("Resolve entity:");
    if (publicId != null) {
      System.out.print(" publicId=\"" + publicId + '"');
    }
    System.out.println(" systemId=\"" + systemId + '"');

    return null;
  }



  //////////////////////////////////////////////////////////////////////
  // Implementation of org.xml.sax.DTDHandler
  //////////////////////////////////////////////////////////////////////


  /**
    * Display notation declarations as they are reported.
    *
    * @see org.xml.sax.DTDHandler#notationDecl
    */
  @Override
	public void notationDecl (String name, String publicId, String systemId)
  {
    System.out.print("Notation declaration: " + name);
    if (publicId != null) {
      System.out.print(" publicId=\"" + publicId + '"');
    }
    if (systemId != null) {
      System.out.print(" systemId=\"" + systemId + '"');
    }
    System.out.print('\n');
  }


  /**
    * Display unparsed entity declarations as they are reported.
    *
    * @see org.xml.sax.DTDHandler#unparsedEntityDecl
    */
  @Override
	public void unparsedEntityDecl (String name,
				  String publicId,
				  String systemId,
				  String notationName)
  {
    System.out.print("Unparsed Entity Declaration: " + name);
    if (publicId != null) {
      System.out.print(" publicId=\"" + publicId + '"');
    }
    if (systemId != null) {
      System.out.print(" systemId=\"" + systemId + '"');
    }
    System.out.println(" notationName=\"" + notationName + '"');
  }



  //////////////////////////////////////////////////////////////////////
  // Implementation of org.xml.sax.DocumentHandler
  //////////////////////////////////////////////////////////////////////


  /**
    * Print a message when the parser provides a locator.
    *
    * <p>Not all SAX parsers will provide a locator object.</p>
    *
    * @see org.xml.sax.DocumentHandler#setDocumentLocator
    */
  @Override
	public void setDocumentLocator (Locator locator)
  {
    System.out.println("Document locator supplied.");
  }


  /**
    * Print a message at the start of the document.
    *
    * @see org.xml.sax.DocumentHandler#startDocument
    */
  @Override
	public void startDocument ()
  {
    System.out.println("Start document");
  }


  /**
    * Print a message for the end of the document.
    *
    * @see org.xml.sax.DocumentHandler#endDocument
    */
  @Override
	public void endDocument ()
  {
    System.out.println("End document");
  }


  /**
    * Print a message for the start of an element.
    *
    * <p>Display all attributes on separate lines, indented.</p>
    *
    * @see org.xml.sax.DocumentHandler#startElement
    */
  @Override
	public void startElement (String name, AttributeList attributes)
  {
    System.out.println("Start element: " + name);
    for (int i = 0; i < attributes.getLength(); i++) {
      System.out.println("  Attribute: " +
			 attributes.getName(i) +
			 ' ' +
			 attributes.getType(i) +
			 " \"" +
			 attributes.getValue(i) +
			 '"');
    }
  }


  /**
    * Print a message for the end of an element.
    *
    * @see org.xml.sax.DocumentHandler#endElement
    */
  @Override
	public void endElement (String name)
  {
    System.out.println("End element: " + name);
  }


  /**
    * Print a message for character data.
    *
    * @see org.xml.sax.DocumentHandler#characters
    */
  @Override
	public void characters (char ch[], int start, int length)
  {
    System.out.print("Characters: ");
    display(ch, start, length);
  }


  /**
    * Print a message for ignorable whitespace.
    *
    * @see org.xml.sax.DocumentHandler#ignorableWhitespace
    */
  @Override
	public void ignorableWhitespace (char ch[], int start, int length)
  {
    System.out.print("Ignorable Whitespace: ");
    display(ch, start, length);
  }


  /**
    * Print a message for a processing instruction.
    *
    * @see org.xml.sax.DocumentHandler#processingInstruction
    */
  @Override
	public void processingInstruction (String target, String data)
  {
    System.out.println("Processing instruction: " + target + ' ' + data);
  }



  //////////////////////////////////////////////////////////////////////
  // Implementation of org.xml.sax.ErrorHandler
  //////////////////////////////////////////////////////////////////////


  /**
    * Report all warnings, and continue parsing.
    *
    * @see org.xml.sax.ErrorHandler#warning
    */
  @Override
	public void warning (SAXParseException exception)
  {
    System.out.println("Warning: " +
		       exception.getMessage() +
		       " (" +
		       exception.getSystemId() +
		       ':' +
		       exception.getLineNumber() +
		       ',' +
		       exception.getColumnNumber() +
		       ')');
  }


  /**
    * Report all recoverable errors, and try to continue parsing.
    *
    * @see org.xml.sax.ErrorHandler#error
    */
  @Override
	public void error (SAXParseException exception)
  {
    System.out.println("Recoverable Error: " +
		       exception.getMessage() +
		       " (" +
		       exception.getSystemId() +
		       ':' +
		       exception.getLineNumber() +
		       ',' +
		       exception.getColumnNumber() +
		       ')');
  }


  /**
    * Report all fatal errors, and try to continue parsing.
    *
    * <p>Note: results are no longer reliable once a fatal error has
    * been reported.</p>
    *
    * @see org.xml.sax.ErrorHandler#fatalError
    */
  @Override
	public void fatalError (SAXParseException exception)
  {
    System.out.println("Fatal Error: " +
		       exception.getMessage() +
		       " (" +
		       exception.getSystemId() +
		       ':' +
		       exception.getLineNumber() +
		       ',' +
		       exception.getColumnNumber() +
		       ')');
  }



  //////////////////////////////////////////////////////////////////////
  // Utility routines.
  //////////////////////////////////////////////////////////////////////


  /**
    * Display text, escaping some characters.
    */
  private static void display (char ch[], int start, int length)
  {
    for (int i = start; i < start + length; i++) {
      switch (ch[i]) {
      case '\n':
	System.out.print("\\n");
	break;
      case '\t':
	System.out.print("\\t");
	break;
      default:
	System.out.print(ch[i]);
	break;
      }
    }
    System.out.print("\n");
  }

}
