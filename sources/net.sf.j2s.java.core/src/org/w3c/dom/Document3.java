/*
 * Copyright (c) 2000 World Wide Web Consortium,
 * (Massachusetts Institute of Technology, Institut National de
 * Recherche en Informatique et en Automatique, Keio University). All
 * Rights Reserved. This program is distributed under the W3C's Software
 * Intellectual Property License. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even
 * the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 * PURPOSE.
 * See W3C License http://www.w3.org/Consortium/Legal/ for more details.
 */

package org.w3c.dom;

/**
 * This interface extends the <code>Document</code> interface with additional 
 * attributes and methods.
 * <p>See also the <a href='http://www.w3.org/TR/2000/WD-DOM-Level-3-Core-20000901'>Document Object Model (DOM) Level 3 Core Specification</a>.
 */
public interface Document3 extends Document {
    /**
     * An attribute specifying the actual encoding of this document. This is 
     * <code>null</code> otherwise.
     */
    public String getActualEncoding();
    public void setActualEncoding(String actualEncoding);

    /**
     * An attribute specifying, as part of the XML declaration, the encoding 
     * of this document. This is <code>null</code> when unspecified.
     */
    public String getEncoding();
    public void setEncoding(String encoding);

    /**
     * An attribute specifying, as part of the XML declaration, whether this 
     * document is standalone.
     */
    public boolean getStandalone();
    public void setStandalone(boolean standalone);

    /**
     * An attribute specifying whether errors checking is enforced or not. 
     * When set to <code>false</code>, the implementation is free to not 
     * test every possible error case normally defined on DOM operations, 
     * and not raise any <code>DOMException</code>. In case of error, the 
     * behavior is undefined. This attribute is <code>true</code> by 
     * defaults.
     */
    public boolean getStrictErrorChecking();
    public void setStrictErrorChecking(boolean strictErrorChecking);

    /**
     * An attribute specifying, as part of the XML declaration, the version 
     * number of this document. This is <code>null</code> when unspecified.
     */
    public String getVersion();
    public void setVersion(String version);

    /**
     * Changes the <code>ownerDocument</code> of a node, its children, as well 
     * as the attached attribute nodes if there are any. If the node has a 
     * parent it is first removed from its parent child list. This 
     * effectively allows moving a subtree from one document to another. The 
     * following list describes the specifics for each type of node. 
     * <dl>
     * <dt>
     * ATTRIBUTE_NODE</dt>
     * <dd>The <code>ownerElement</code> attribute is set to 
     * <code>null</code> and the <code>specified</code> flag is set to 
     * <code>true</code> on the adopted <code>Attr</code>. The descendants 
     * of the source <code>Attr</code> are recursively adopted.</dd>
     * <dt>
     * DOCUMENT_FRAGMENT_NODE</dt>
     * <dd>The descendants of the source node are 
     * recursively adopted.</dd>
     * <dt>DOCUMENT_NODE</dt>
     * <dd><code>Document</code> nodes cannot 
     * be adopted.</dd>
     * <dt>DOCUMENT_TYPE_NODE</dt>
     * <dd><code>DocumentType</code> nodes cannot 
     * be adopted.</dd>
     * <dt>ELEMENT_NODE</dt>
     * <dd>Specified attribute nodes of the source 
     * element are adopted, and the generated <code>Attr</code> nodes. 
     * Default attributes are discarded, though if the document being 
     * adopted into defines default attributes for this element name, those 
     * are assigned. The descendants of the source element are recursively 
     * adopted.</dd>
     * <dt>ENTITY_NODE</dt>
     * <dd><code>Entity</code> nodes can be adopted, however 
     * in the current release of the DOM the <code>DocumentType</code> is 
     * readonly. Ability to add these adopted nodes to a 
     * <code>DocumentType</code> will be considered for addition to a future 
     * release of the DOM. The descendants of the the source entity are 
     * recursively adopted.</dd>
     * <dt>ENTITY_REFERENCE_NODE</dt>
     * <dd>Only the 
     * <code>EntityReference</code> node itself is adopted, the descendants 
     * are discarded, since the source and destination documents might have 
     * defined the entity differently. If the document being imported into 
     * provides a definition for this entity name, its value is assigned.</dd>
     * <dt>
     * NOTATION_NODE</dt>
     * <dd><code>Notation</code> nodes can be adopted, however in 
     * the current release of the DOM the <code>DocumentType</code> is 
     * readonly. Ability to add these adopted nodes to a 
     * <code>DocumentType</code> will be considered for addition to a future 
     * release of the DOM.</dd>
     * <dt>PROCESSING_INSTRUCTION_NODE, TEXT_NODE, 
     * CDATA_SECTION_NODE, COMMENT_NODE</dt>
     * <dd>These nodes can all be adopted. No 
     * specifics.</dd>
     *  Should this method simply return null when it fails? How 
     * "exceptional" is failure for this method?Stick with raising 
     * exceptions only in exceptional circumstances, return null on failure 
     * (F2F 19 Jun 2000).Can an entity node really be adopted?
     * @param sourceThe node to move into this document.
     * @return The adopted node, or <code>null</code> if this operation 
     *   fails, such as when the source node comes from a different 
     *   implementation.
     * @exception DOMException
     *   NOT_SUPPORTED_ERR: Raised if the source node is of type 
     *   <code>DOCUMENT</code>, <code>DOCUMENT_TYPE</code>.
     *   <br>NO_MODIFICATION_ALLOWED_ERR: Raised when the source node is 
     *   readonly.
     */
    public Node adoptNode(Node source)
                          throws DOMException;

    /**
     * Get a list of all the elements which have a specific attribute.Anyone 
     * still lobbying for this?No, killed! (F2F 1 Aug 2000)Should we have 
     * getElementsByAttributeValue and getElementsByAttributeValueNS?Yes, 
     * but irrelevant, see above. (F2F 1 Aug 2000)Should we have this on 
     * Element as well? We have getElementsByTagName there.Irrelevant, see 
     * above. (F2F 1 Aug 2000)
     * @param namespaceURIThe namespace URI of the attribute to look for.
     * @param localNameThe local name of the attribute to look for.
     * @param valueThe value of the attribute to look for.
     * @return Returns a list containing the elements that have an attribute 
     *   that matches the given namespace URI, local name, and value.
     */
    public NodeList getElementsByAttributeValue(String namespaceURI, 
                                                String localName, 
                                                String value);

}
