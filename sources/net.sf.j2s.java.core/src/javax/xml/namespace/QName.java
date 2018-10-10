/* JBoss, the OpenSource WebOS
 *
 * Distributable under LGPL license.
 * See terms of license at gnu.org.
 * 
 * modified for SwingJS by Bob Hanson, hansonr@stolaf.edu
 * 
 */
package javax.xml.namespace;

// $Id: QName.java,v 1.2.6.8 2005/04/12 03:35:26 starksm Exp $

import java.util.StringTokenizer;

/** QName represents an immutable qualified name.
 * The value of a QName contains a Namespace URI, local part and prefix.
 * 
 * The prefix is included in QName to retain lexical information when present
 * in an XML input source. The prefix is NOT used in QName.equals(Object) or
 * to compute the QName.hashCode(). Equality and the hash code are defined
 * using only the Namespace URI and local part.
 * 
 * If not specified, the Namespace URI is set to "" (the empty string).
 * If not specified, the prefix is set to "" (the empty string).
 * 
 * @author Scott.Stark@jboss.org
 * @author Thomas.Diesler@jboss.org
 * @author Jeff Suttor (javadoc)
 * @version $Revision: 1.2.6.8 $
 */
public class QName //implements Serializable
{
//   /** @since 4.0.2, compatible with jdk5 by default */
//   final static long serialVersionUID;
//   static
//   {
//      if (SerialVersion.version == SerialVersion.LEGACY)
//         serialVersionUID = 8217399441836960859L;
//      else
//         serialVersionUID = -3852060120346905000L;
//   }
//
   private String namespaceURI;
   private String localPart;
   private String prefix;

   /** QName derived from parsing the formatted String.
    * If the String is null or does not conform to QName.toString() formatting,
    * an IllegalArgumentException is thrown.
    * 
    * The String MUST be in the form returned by QName.toString(). There is NO
    * standard specification for representing a QName as a String. The String
    * format is NOT portable across implementations and will change when a
    * standard String representation is defined. This implementation currently
    * parses a String formatted as: "{" + Namespace URI + "}" + local part. If
    * the Namespace URI .equals(""), only the local part should be provided.
    * 
    * The prefix value CANNOT be represented in the String and will be set to ""
    * 
    * This method does not do full validation of the resulting QName. In
    * particular, the local part is not validated as a NCName as specified in
    * Namespaces in XML.
    * 
    * @see #toString()
    * @param toStringName - a QName string in the format of toString().
    * @return QName for the toStringName
    */
   public static QName valueOf(String toStringName)
   {
      String uri = null;
      String localPart = null;

      StringTokenizer tokenizer = new StringTokenizer(toStringName, "{}");
      int tokenCount = tokenizer.countTokens();

      if (tokenCount < 1 || tokenCount > 2)
         throw new IllegalArgumentException("Invalid QName string: " + toStringName);

      if (tokenCount > 1)
         uri = tokenizer.nextToken();

      localPart = tokenizer.nextToken();
      return new QName(uri, localPart);
   }

   public QName(String localPart)
   {
      this(null, localPart);
   }

   public QName(String namespaceURI, String localPart)
   {
      this(namespaceURI, localPart, "");
   }

   /** QName constructor specifying the Namespace URI, local part and prefix.
    * If the Namespace URI is null, it is set to "". This value represents no
    * explicitly defined Namespace as defined by the Namespaces in XML
    * specification. This action preserves compatible behavior with QName 1.0.
    * 
    * If the local part is null, an IllegalArgumentException is thrown.
    * 
    * If the prefix is null, an IllegalArgumentException is thrown. Use "" to
    * explicitly indicate that no prefix is present or the prefix is not
    * relevant.
    * 
    * @param namespaceURI - Namespace URI of the QName
    * @param localPart - local part of the QName
    * @param prefix - prefix of the QName
    */
   public QName(String namespaceURI, String localPart, String prefix)
   {
      this.namespaceURI = namespaceURI;
      if (this.namespaceURI == null)
         this.namespaceURI = "";

      if (localPart == null)
         throw new IllegalArgumentException("localPart cannot be null");

      if (localPart.startsWith(":"))
         throw new IllegalArgumentException("Illegal localPart: " + localPart);

      this.localPart = localPart;

      this.prefix = prefix;
      if (this.prefix == null)
         this.prefix = "";
   }

   public String getNamespaceURI()
   {
      return namespaceURI;
   }

   public String getLocalPart()
   {
      return localPart;
   }

   public String getPrefix()
   {
      return prefix;
   }

   /** There is NO standard specification for representing a QName as a String.
    * The returned String is not portable across implementations and will change when a standard String representation is defined.
    * This implementation currently represents a QName as: "{" + Namespace URI + "}" + local part.
    * If the Namespace URI .equals(""), only the local part is returned.
    * An appropriate use of this method is for debugging or logging for human consumption.
    *
    * Note the prefix value is NOT returned as part of the String representation.
    *
    * @return '{' + namespaceURI + '}' + localPart
    */
   public String toString()
   {
      if (namespaceURI.equals(""))
         return localPart;
      else
         return '{' + namespaceURI + '}' + localPart;
   }

   /** Equality is based on the namespaceURI and localPart
    * @param obj the QName to compare too
    * @return true if both namespaceURI and localPart, false otherwise
    */
   public boolean equals(Object obj)
   {
      if (obj instanceof QName)
      {
         QName qn = (QName)obj;
         boolean equals = namespaceURI.equals(qn.namespaceURI);
         return equals && localPart.equals(qn.localPart);
      }
      return false;
   }

   /** Calculate the hash of namespaceURI and localPart 
    * @return namespaceURI.hashCode() + localPart.hashCode()
    */
   public int hashCode()
   {
      int hashCode = namespaceURI.hashCode() + localPart.hashCode();
      return hashCode;
   }

   /**
    * Compares this object with the specified object for order.  Returns a
    * negative integer, zero, or a positive integer as this object is less
    * than, equal to, or greater than the specified object.<p>
    */
   public int compareTo(Object o)
   {
      QName other = (QName)o;
      return toString().compareTo(other.toString());
   }
}
