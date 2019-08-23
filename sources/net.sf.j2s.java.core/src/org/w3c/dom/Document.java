/*
 * Copyright (c) 2000 World Wide Web Consortium,
 * (Massachusetts Institute of Technology, Institut National de
 * Recherche en Informatique et en Automatique, Keio University). All
 * Rights Reserved. This program is distributed under the W3C's Software
 * Intellectual Property License. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even
 * the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 * PURPOSE. See W3C License http://www.w3.org/Consortium/Legal/ for more
 * details.
 */

package org.w3c.dom;

/**
 *  The <code>Document</code> interface represents the entire HTML or XML 
 * document. Conceptually, it is the root of the document tree, and provides 
 * the  primary access to the document's data.
 * <p> Since elements, text nodes, comments, processing instructions, etc. 
 * cannot exist outside the context of a <code>Document</code> , the 
 * <code>Document</code> interface also contains the factory methods needed 
 * to create these objects. The <code>Node</code> objects created have a 
 * <code>ownerDocument</code> attribute which associates them with the 
 * <code>Document</code> within whose context they were created.
 * <p>See also the <a href='http://www.w3.org/TR/2000/CR-DOM-Level-2-20000510'>Document Object Model (DOM) Level 2 Specification</a>.
 */
public interface Document extends Node {
    /**
     *  The Document Type Declaration (see <code>DocumentType</code> ) 
     * associated with this document. For HTML documents as well as XML 
     * documents without a document type declaration this returns 
     * <code>null</code> . The DOM Level 2 does not support editing the 
     * Document Type Declaration, therefore <code>docType</code> cannot be 
     * altered in any way, including through the use of methods, such as 
     * <code>insertNode</code> or <code>removeNode</code> , which are 
     * inherited from the <code>Node</code> interface.
     */
    public DocumentType getDoctype();

    /**
     *  The <code>DOMImplementation</code> object that handles this document. 
     * A DOM application may use objects from multiple  implementations.
     */
    public DOMImplementation getImplementation();

    /**
     *  This is a convenience attribute that allows direct access to the child 
     * node that is the root element of  the document. For HTML documents, 
     * this is the element with the tagName "HTML".
     */
    public Element getDocumentElement();

    /**
     *  Creates an element of the type specified. Note that the instance 
     * returned implements the <code>Element</code> interface, so attributes 
     * can be specified directly  on the returned object.
     * <br> In addition, if there are known attributes with default values, 
     * <code>Attr</code> nodes representing them are automatically created and
     *  attached to the element.
     * <br> To create an element with a qualified name and namespace URI, use 
     * the <code>createElementNS</code> method.
     * @param tagName  The name of the element type to instantiate. For XML, 
     *   this is case-sensitive. For HTML, the  <code>tagName</code> 
     *   parameter may be provided in any case,  but it must be mapped to the 
     *   canonical uppercase form by  the DOM implementation. 
     * @return  A new <code>Element</code> object with the 
     *   <code>nodeName</code> attribute set to <code>tagName</code> , and 
     *   <code>localName</code> , <code>prefix</code> , and 
     *   <code>namespaceURI</code> set to <code>null</code> .
     * @exception DOMException
     *    INVALID_CHARACTER_ERR: Raised if the specified name contains an 
     *   illegal character.
     */
    public Element createElement(String tagName)
                                 throws DOMException;

    /**
     *  Creates an empty <code>DocumentFragment</code> object. 
     * @return  A new <code>DocumentFragment</code> .
     */
    public DocumentFragment createDocumentFragment();

    /**
     *  Creates a <code>Text</code> node given the specified string.
     * @param data  The data for the node.
     * @return  The new <code>Text</code> object.
     */
    public Text createTextNode(String data);

    /**
     *  Creates a <code>Comment</code> node given the specified string.
     * @param data  The data for the node.
     * @return  The new <code>Comment</code> object.
     */
    public Comment createComment(String data);

    /**
     *  Creates a <code>CDATASection</code> node whose value  is the specified 
     * string.
     * @param data  The data for the <code>CDATASection</code> contents.
     * @return  The new <code>CDATASection</code> object.
     * @exception DOMException
     *    NOT_SUPPORTED_ERR: Raised if this document is an HTML document.
     */
    public CDATASection createCDATASection(String data)
                                           throws DOMException;

    /**
     *  Creates a <code>ProcessingInstruction</code> node given the specified 
     * name and data strings.
     * @param target  The target part of the processing instruction.
     * @param data  The data for the node.
     * @return  The new <code>ProcessingInstruction</code> object.
     * @exception DOMException
     *    INVALID_CHARACTER_ERR: Raised if the specified target contains an 
     *   illegal character.
     *   <br> NOT_SUPPORTED_ERR: Raised if this document is an HTML document.
     */
    public ProcessingInstruction createProcessingInstruction(String target, 
                                                             String data)
                                                             throws DOMException;

    /**
     *  Creates an <code>Attr</code> of the given name. Note that the 
     * <code>Attr</code> instance can then be set on an <code>Element</code> 
     * using the <code>setAttributeNode</code> method. 
     * <br> To create an attribute with a qualified name and namespace URI, use
     *  the <code>createAttributeNS</code> method.
     * @param name  The name of the attribute.
     * @return  A new <code>Attr</code> object with the <code>nodeName</code> 
     *   attribute set to <code>name</code> , and <code>localName</code> , 
     *   <code>prefix</code> , and <code>namespaceURI</code> set to 
     *   <code>null</code> .
     * @exception DOMException
     *    INVALID_CHARACTER_ERR: Raised if the specified name contains an 
     *   illegal character.
     */
    public Attr createAttribute(String name)
                                throws DOMException;

    /**
     *  Creates an <code>EntityReference</code> object. In addition, if the 
     * referenced entity is known, the child list of the 
     * <code>EntityReference</code> node is made the same as that of the 
     * corresponding <code>Entity</code> node. If any descendant of the 
     * <code>Entity</code> node has an unbound  namespace prefix , the 
     * corresponding descendant of the created <code>EntityReference</code> 
     * node is also unbound; (its <code>namespaceURI</code> is 
     * <code>null</code> ). The DOM Level 2 does not support any mechanism to 
     * resolve namespace prefixes.
     * @param name  The name of the entity to reference. 
     * @return  The new <code>EntityReference</code> object.
     * @exception DOMException
     *    INVALID_CHARACTER_ERR: Raised if the specified name contains an 
     *   illegal character.
     *   <br> NOT_SUPPORTED_ERR: Raised if this document is an HTML document.
     */
    public EntityReference createEntityReference(String name)
                                                 throws DOMException;

    /**
     *  Returns a <code>NodeList</code> of all the <code>Elements</code> with 
     * a given tag name in the order in which they are encountered in a 
     * preorder traversal of the <code>Document</code> tree. 
     * @param tagname  The name of the tag to match on. The special value "*" 
     *   matches all tags.
     * @return  A new <code>NodeList</code> object containing all the matched 
     *   <code>Elements</code> .
     */
    public NodeList getElementsByTagName(String tagname);

    /**
     *  Imports a node from another document to this document. The returned 
     * node has no parent; (<code>parentNode</code> is <code>null</code> ). 
     * The source node is not altered or removed from the original document; 
     * this method creates a new copy of the source node.
     * <br> For all nodes, importing a node creates a node object owned by the 
     * importing document, with attribute values identical to the source 
     * node's <code>nodeName</code> and <code>nodeType</code> , plus the 
     * attributes related to namespaces (<code>prefix</code> , 
     * <code>localName</code> , and <code>namespaceURI</code> ). As in the 
     * <code>cloneNode</code> operation on a <code>Node</code> , the source 
     * node is not altered.
     * <br> Additional information is copied as appropriate to the 
     * <code>nodeType</code> , attempting to mirror the behavior expected if a
     *  fragment of XML or HTML source was copied from one document to 
     * another, recognizing that the two documents may have different DTDs in 
     * the XML case. The following list describes the specifics for each type 
     * of node. 
     * <dl>
     * <dt> ATTRIBUTE_NODE</dt>
     * <dd> The <code>ownerElement</code> attribute is 
     * set to <code>null</code> and the <code>specified</code> flag is set to 
     * <code>true</code> on the generated <code>Attr</code> . The descendants 
     * of the source <code>Attr</code> are recursively imported and the 
     * resulting nodes reassembled to form the corresponding subtree. Note 
     * that the <code>deep</code> parameter has no effect on  
     * <code>Attr</code> nodes; they always carry their children with them 
     * when imported.</dd>
     * <dt> DOCUMENT_FRAGMENT_NODE</dt>
     * <dd> If the <code>deep</code> option 
     * was set to <code>true</code> , the descendants of the source element 
     * will be recursively imported and the resulting nodes reassembled to 
     * form the corresponding subtree. Otherwise, this simply generates an 
     * empty <code>DocumentFragment</code> .</dd>
     * <dt> DOCUMENT_NODE</dt>
     * <dd>
     * <code>Document</code> nodes cannot be imported.</dd>
     * <dt> DOCUMENT_TYPE_NODE</dt>
     * <dd>
     * <code>DocumentType</code> nodes cannot be imported.</dd>
     * <dt> ELEMENT_NODE</dt>
     * <dd> 
     * Specified attribute nodes of the source element are imported, and the 
     * generated <code>Attr</code> nodes are attached to the generated 
     * <code>Element</code> . Default attributes are  not copied, though if 
     * the document being imported into defines default attributes for this 
     * element name, those are assigned. If the <code>importNode</code> 
     * <code>deep</code> parameter was set to <code>true</code> , the 
     * descendants of the source element will be recursively imported and the 
     * resulting nodes reassembled to form the corresponding subtree.</dd>
     * <dt> 
     * ENTITY_NODE</dt>
     * <dd><code>Entity</code> nodes can be imported, however in the 
     * current release of the DOM the <code>DocumentType</code> is readonly. 
     * Ability to add these imported nodes to a <code>DocumentType</code> 
     * will be considered for addition to a future release of the DOM. On 
     * import, the <code>publicId</code> , <code>systemId</code> , and 
     * <code>notationName</code> attributes are copied. If a <code>deep</code>
     *  import is requested, the descendants of the the source 
     * <code>Entity</code> is recursively imported and the resulting nodes 
     * reassembled to form the corresponding subtree.</dd>
     * <dt> ENTITY_REFERENCE_NODE</dt>
     * <dd> 
     * Only the <code>EntityReference</code> itself is copied, even if a 
     * <code>deep</code> import is requested, since the source and 
     * destination documents might have defined the entity differently. If 
     * the document being imported into provides a definition for this entity 
     * name, its value is assigned.</dd>
     * <dt> NOTATION_NODE</dt>
     * <dd><code>Notation</code> nodes 
     * can be imported, however in the current release of the DOM the 
     * <code>DocumentType</code> is readonly. Ability to add these imported 
     * nodes to a <code>DocumentType</code> will be considered for addition 
     * to a future release of the DOM. On import, the <code>publicId</code> 
     * and <code>systemId</code> attributes are copied. Note that the 
     * <code>deep</code> parameter has no effect on  <code>Notation</code> 
     * nodes since they never have any children.</dd>
     * <dt> PROCESSING_INSTRUCTION_NODE</dt>
     * <dd> 
     * The imported node copies its <code>target</code> and <code>data</code> 
     * values from those of the source node.</dd>
     * <dt> TEXT_NODE, CDATA_SECTION_NODE, 
     * COMMENT_NODE</dt>
     * <dd> These three types of nodes inheriting from 
     * <code>CharacterData</code> copy their <code>data</code> and 
     * <code>length</code> attributes from those of the source node.</dd>
     * </dl> 
     * @param importedNode  The node to import.
     * @param deep  If <code>true</code> , recursively import the subtree 
     *   under the specified node; if <code>false</code> , import only the 
     *   node itself, as explained above. This has no effect on 
     *   <code>Attr</code> , <code>EntityReference</code> , and 
     *   <code>Notation</code> nodes.
     * @return  The imported node that belongs to this <code>Document</code> .
     * @exception DOMException
     *    NOT_SUPPORTED_ERR: Raised if the type of node being imported is not 
     *   supported.
     * @since DOM Level 2
     */
    public Node importNode(Node importedNode, 
                           boolean deep)
                           throws DOMException;

    /**
     *  Creates an element of the given qualified name and namespace URI. 
     * HTML-only DOM implementations do not need to implement this method.
     * @param namespaceURI  The  namespace URI of the element to create.
     * @param qualifiedName  The  qualified name of the element type to 
     *   instantiate.
     * @return  A new <code>Element</code> object with the following 
     *   attributes: Attribute Value<code>Node.nodeName</code>
     *   <code>qualifiedName</code><code>Node.namespaceURI</code>
     *   <code>namespaceURI</code><code>Node.prefix</code> prefix, extracted 
     *   from <code>qualifiedName</code> , or <code>null</code> if there is no
     *    prefix<code>Node.localName</code> local name , extracted from 
     *   <code>qualifiedName</code><code>Element.tagName</code>
     *   <code>qualifiedName</code>
     * @exception DOMException
     *    INVALID_CHARACTER_ERR: Raised if the specified qualified name 
     *   contains an illegal character.
     *   <br> NAMESPACE_ERR: Raised if the <code>qualifiedName</code> is 
     *   malformed, if the <code>qualifiedName</code> has a prefix and the 
     *   <code>namespaceURI</code> is <code>null</code> or an empty string, 
     *   or if the <code>qualifiedName</code> has a prefix that is "xml" and 
     *   the <code>namespaceURI</code> is different from " 
     *   http://www.w3.org/XML/1998/namespace "  .
     * @since DOM Level 2
     */
    public Element createElementNS(String namespaceURI, 
                                   String qualifiedName)
                                   throws DOMException;

    /**
     *  Creates an attribute of the given qualified name and namespace URI. 
     * HTML-only DOM implementations do not need to implement this method.
     * @param namespaceURI  The  namespace URI of the attribute to create.
     * @param qualifiedName  The  qualified name of the attribute to 
     *   instantiate.
     * @return  A new <code>Attr</code> object with the following attributes: 
     *   Attribute Value<code>Node.nodeName</code> qualifiedName
     *   <code>Node.namespaceURI</code><code>namespaceURI</code>
     *   <code>Node.prefix</code> prefix, extracted from 
     *   <code>qualifiedName</code> , or <code>null</code> if there is no 
     *   prefix<code>Node.localName</code> local name , extracted from 
     *   <code>qualifiedName</code><code>Attr.name</code>
     *   <code>qualifiedName</code>
     * @exception DOMException
     *    INVALID_CHARACTER_ERR: Raised if the specified qualified name 
     *   contains an illegal character.
     *   <br> NAMESPACE_ERR: Raised if the <code>qualifiedName</code> is 
     *   malformed, if the <code>qualifiedName</code> has a prefix and the 
     *   <code>namespaceURI</code> is <code>null</code> or an empty string, 
     *   if the <code>qualifiedName</code> has a prefix that is "xml" and the 
     *   <code>namespaceURI</code> is different from " 
     *   http://www.w3.org/XML/1998/namespace ", or if the 
     *   <code>qualifiedName</code> is "xmlns" and the 
     *   <code>namespaceURI</code> is different from " 
     *   http://www.w3.org/2000/xmlns/ ".
     * @since DOM Level 2
     */
    public Attr createAttributeNS(String namespaceURI, 
                                  String qualifiedName)
                                  throws DOMException;

    /**
     *  Returns a <code>NodeList</code> of all the <code>Elements</code> with 
     * a given  local name and namespace URI in the order in which they are 
     * encountered in a preorder traversal of the <code>Document</code> tree.
     * @param namespaceURI  The  namespace URI of the elements to match on. 
     *   The special value "*" matches all namespaces.
     * @param localName  The  local name of the elements to match on. The 
     *   special value "*" matches all local names.
     * @return  A new <code>NodeList</code> object containing all the matched 
     *   <code>Elements</code> .
     * @since DOM Level 2
     */
    public NodeList getElementsByTagNameNS(String namespaceURI, 
                                           String localName);

    /**
     *  Returns the <code>Element</code> whose <code>ID</code> is given by 
     * <code>elementId</code> . If no such element exists, returns 
     * <code>null</code> . Behavior is not defined if more than one element 
     * has this <code>ID</code> .  The DOM implementation must have 
     * information that says which attributes are of type ID. Attributes with 
     * the name "ID" are not of type ID unless so defined. Implementations 
     * that do not know whether attributes are of type ID or not are expected 
     * to return <code>null</code> .
     * @param elementId  The unique <code>id</code> value for an element.
     * @return  The matching element.
     * @since DOM Level 2
     */
    public Element getElementById(String elementId);
    
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

