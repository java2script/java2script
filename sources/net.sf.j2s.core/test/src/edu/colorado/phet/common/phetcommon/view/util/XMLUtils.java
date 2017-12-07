// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.view.util;

//import java.net.HttpURLConnection;


public class XMLUtils {
//
//    /* not intended for instantiation */
//    private XMLUtils() {
//    }
//
//    /**
//     * Converts an XML node (or document) to an XML String.
//     *
//     * @param node
//     * @return
//     * @throws TransformerException
//     */
//    public static String toString( Node node ) throws TransformerException {
//
//        TransformerFactory transformerFactory = TransformerFactory.newInstance();
//        Transformer transformer = transformerFactory.newTransformer();
//
//        // Node source
//        DOMSource source = new DOMSource( node );
//
//        // StringWriter result
//        StringWriter stringWriter = new StringWriter();
//        Result result = new StreamResult( stringWriter );
//
//        transformer.transform( source, result );
//        return stringWriter.toString();
//    }
//
//    /**
//     * Converts an XML String to a Document.
//     *
//     * @param string
//     * @return
//     * @throws TransformerException
//     * @throws ParserConfigurationException
//     */
//    public static Document toDocument( String string ) throws TransformerException, ParserConfigurationException {
//
//        // if there is a byte order mark, strip it off.
//        // otherwise, we get a org.xml.sax.SAXParseException: Content is not allowed in prolog
//        if ( string.startsWith( "\uFEFF" ) ) {
//            string = string.substring( 1 );
//        }
//
//        TransformerFactory transformerFactory = TransformerFactory.newInstance();
//        Transformer transformer = transformerFactory.newTransformer();
//
//        // StringReader source
//        Source source = new StreamSource( new StringReader( string ) );
//
//        // Document result
//        DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
//        Document document = builder.newDocument();
//        Result result = new DOMResult( document );
//
//        transformer.transform( source, result );
//        return document;
//    }
//
////    /**
////     * Uses http to post a Document to a URL.
////     *
////     * @param url
////     * @param document
////     * @return
////     * @throws IOException
////     * @throws UnknownHostException
////     * @throws TransformerException
////     */
////    public static HttpURLConnection post( String url, Document document ) throws IOException, UnknownHostException, TransformerException {
////        return post( url, toString( document ) );
////    }
////
////    /**
////     * Uses http to post an XML String to a URL.
////     *
////     * @param url
////     * @param xmlString
////     * @param return
////     * @throws IOException
////     * @throws UnknownHostException
////     */
////    public static HttpURLConnection post( String url, String xmlString ) throws IOException, UnknownHostException {
////
////        // open connection
////        URL urlObject = new URL( url );
////        HttpURLConnection connection = (HttpURLConnection) urlObject.openConnection();
////        connection.setRequestMethod( "POST" );
////        connection.setRequestProperty( "Content-Type", "text/xml; charset=\"utf-8\"" );
////        connection.setDoOutput( true );
////
////        OutputStreamWriter outStream = new OutputStreamWriter( connection.getOutputStream(), "UTF-8" );
////        outStream.write( xmlString );
////        outStream.close();
////
////        return connection;
////    }
//
////    /**
////     * Reads a Document from an HttpURLConnection.
////     *
////     * @param connection
////     * @return
////     * @throws IOException
////     * @throws ParserConfigurationException
////     * @throws SAXException
////     * @throws TransformerException
////     */
////    public static Document readDocument( HttpURLConnection connection ) throws IOException, SAXException, ParserConfigurationException, TransformerException {
////        String xmlString = readString( connection );
////        return toDocument( xmlString );
////    }
////
////    /**
////     * Reads an XML String from an HttpURLConnection.
////     *
////     * @param connection
////     * @return
////     * @throws IOException
////     */
////    public static String readString( HttpURLConnection connection ) throws IOException {
////        StringBuffer buffer = new StringBuffer();
////        BufferedReader reader = new BufferedReader( new InputStreamReader( connection.getInputStream() ) );
////        String line;
////        while ( ( line = reader.readLine() ) != null ) {
////            buffer.append( line );
////        }
////        reader.close();
////        return buffer.toString();
////    }
//
//    /**
//     * Reads an XML document from an input stream.
//     *
//     * @param inputStream
//     * @return Document
//     * @throws ParserConfigurationException if we failed to creaate a document build
//     * @throws IOException                  if there was an input error reading the stream
//     * @throws SAXException                 if we couldn't parse the XML
//     */
//    public static final Document readDocument( InputStream inputStream ) throws ParserConfigurationException, IOException, SAXException {
//        DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
//        return builder.parse( inputStream );
//    }
//
//    /**
//     * Writes an XML document to an output stream.
//     *
//     * @param document
//     * @param outputStream
//     * @throws TransformerException if the output failed
//     */
//    public static void writeDocument( Document document, OutputStream outputStream, String encoding ) throws TransformerException {
//        Source source = new DOMSource( document );
//        Result result = new StreamResult( outputStream );
//        Transformer transformer = TransformerFactory.newInstance().newTransformer();
//        transformer.setOutputProperty( "indent", "yes" ); // make the output easier to read, see Transformer.getOutputProperties
//        transformer.setOutputProperty( "encoding", encoding );
//        transformer.transform( source, result );
//    }
}
