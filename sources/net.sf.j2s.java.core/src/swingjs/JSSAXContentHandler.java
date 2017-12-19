package swingjs;

// SAX event handler for demos.
// No warranty; no copyright -- use this as you will.
// $Id: DemoHandler.java,v 1.3 1998/05/01 20:45:16 david Exp $

import javajs.util.PT;
import javajs.util.SB;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

/**
 * A template for extending org.xml.sax.helpers.DefaultHandler
 * 
 * @author Bob Hanson
 * 
 */
public class JSSAXContentHandler extends DefaultHandler {

	// in JavaScript, set swingjs.JSSAXContentHandler.debugging = true
	// to show tags as processing occurs.
	
	private static boolean debugging;

	@Override
	public void processingInstruction(String target, String data) {
		
		// Note that HTML5 XMLProcessor does not allow processing instructions
		// such as <?xml....?> at all.
		// JSSAXParser converts these temporarily to CDATA blocks, then  
		// reports them this way. A bit of a hack, but important.
		if (debugging)
			System.out.println("JSSAX <?" + target + ' ' + data + "?>");
	}


	@Override
	public void startDocument() {
		debugging = JSUtil.debugging;
		if (debugging)
			System.out.println("JSSAX Start document");
	}

	@Override
	public void startElement(String uri, String localName, String nodeName,
			Attributes atts) throws SAXException {
	  // Note added 5/2015 BH 
	  //
	  // There seems to be an issue with what is the localName and what is the nodeName.
	  // For example, for
	  //
	  //    <cml:molecule xmlns:cml="http://www.xml-cml.org/schema/cml2/core">
	  //
	  // Both HTML5 xmlDocument and JAXPSAXParser report:
	  //
	  //  namespaceURI = "http://www.xml-cml.org/schema/cml2/core"
	  //  localName = "molecule"
	  //  nodeName = "cml:molecule
	  //
	  //  But com.sun.apache.xerces.internal.jaxp.SAXParserImpl$JAXPSAXParser reports:
	  //
	  //  namespaceURI = ""
	  //  localName = ""
	  //  nodeName = "cml:molecule"
	  //
	  // You would think that is a bug...
	  //
	  // I only realized this recently when I wrote this code and tested it in swingjs.test.TestXML.java
	  // against javax.xml.parsers.SAXParserFactory.newInstance().newSAXParser().
	  //
	  
		localName = fixXerces(localName, nodeName);
		SB sb = new SB();
		sb.append("Start element: "
				+ JSSAXAttributes.getFullName(uri, localName, nodeName));
		for (int i = 0; i < atts.getLength(); i++)
			sb.append("\n  "
					+ JSSAXAttributes.getFullName(atts.getURI(i), atts.getLocalName(i),
							atts.getQName(i)) + " = \"" + atts.getValue(i) + "\"");
		
		if (debugging)
			System.out.println("JSSAX " + sb.toString());
	}

	@Override
	public void characters(char ch[], int start, int length) {
			String s = "";
			for (int i = start; i < start + length; i++)
				s += ch[i];
			if (debugging)
				System.out.println("JSSAX Characters: " + PT.esc(s));
	}

	@Override
	public void endElement(String uri, String localName, String nodeName)
			throws SAXException {
		localName = fixXerces(localName, nodeName);
		if (debugging)
			System.out.println("JSSAX End element: " + JSSAXAttributes.getFullName(uri, localName, nodeName));
	}

	@Override
	public void endDocument() {
		if (debugging)
			System.out.println("JSSAX End document");
	}

	/*
	 * com.sun.apache.xerces.internal.jaxp.SAXParserImpl$JAXPSAXParser messes this
	 * up and leaves localName blank when there is a qualified name (and then
	 * fails to also indicate the true nameSpaceURI).
	 * 
	 * In HTML5, "qName" is called "nodeName" so using that here.
	 */
	private String fixXerces(String localName, String nodeName) {
		//  neither localName nor nodeName should be null, but just to be sure...
		if (localName != null && localName.length() > 0 
				|| nodeName == null || nodeName.length() == 0)
			return (localName == null ? "" : localName);
		int  pt = nodeName.indexOf(":");
		return (pt < 0 ? nodeName : nodeName.substring(0, pt));
	}


}
