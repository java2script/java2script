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
 *  The <code>Node</code> interface is the primary datatype for the entire 
 * Document Object Model. It represents a single node in the document tree. 
 * While all objects implementing the <code>Node</code> interface expose 
 * methods for dealing with children, not all objects implementing the 
 * <code>Node</code> interface may have children. For example, 
 * <code>Text</code> nodes may not have children, and adding children to such 
 * nodes results in a <code>DOMException</code> being raised.
 * <p> The attributes <code>nodeName</code> , <code>nodeValue</code> and 
 * <code>attributes</code> are included as a mechanism to get at node 
 * information without casting down to the specific derived interface. In 
 * cases where there is no obvious mapping of these attributes for a specific 
 * <code>nodeType</code> (e.g., <code>nodeValue</code> for an 
 * <code>Element</code> or <code>attributes</code> for a <code>Comment</code> 
 * ), this returns <code>null</code> . Note that the specialized interfaces 
 * may contain additional and more convenient mechanisms to get and set the 
 * relevant information.
 * <p>See also the <a href='http://www.w3.org/TR/2000/CR-DOM-Level-2-20000510'>Document Object Model (DOM) Level 2 Specification</a>.
 */
public interface Node {
    // NodeType
    public static final short ELEMENT_NODE              = 1;
    public static final short ATTRIBUTE_NODE            = 2;
    public static final short TEXT_NODE                 = 3;
    public static final short CDATA_SECTION_NODE        = 4;
    public static final short ENTITY_REFERENCE_NODE     = 5;
    public static final short ENTITY_NODE               = 6;
    public static final short PROCESSING_INSTRUCTION_NODE = 7;
    public static final short COMMENT_NODE              = 8;
    public static final short DOCUMENT_NODE             = 9;
    public static final short DOCUMENT_TYPE_NODE        = 10;
    public static final short DOCUMENT_FRAGMENT_NODE    = 11;
    public static final short NOTATION_NODE             = 12;

    /**
     *  The name of this node, depending on its type; see the table above. 
     */
    public String getNodeName();

    /**
     *  The value of this node, depending on its type; see the table above. 
     * When it is defined to be <code>null</code> , setting it has no effect.
     * @exception DOMException
     *    NO_MODIFICATION_ALLOWED_ERR: Raised when the node is readonly.
     * @exception DOMException
     *    DOMSTRING_SIZE_ERR: Raised when it would return more characters 
     *   than fit in a <code>DOMString</code> variable on the implementation 
     *   platform.
     */
    public String getNodeValue()
                                  throws DOMException;
    public void setNodeValue(String nodeValue)
                                  throws DOMException;

    /**
     *  A code representing the type of the underlying object, as defined 
     * above.
     */
    public short getNodeType();

    /**
     *  The parent of this node. All nodes, except <code>Attr</code> , 
     * <code>Document</code> , <code>DocumentFragment</code> , 
     * <code>Entity</code> , and <code>Notation</code> may have a parent. 
     * However, if a	node has just been created and not yet added to the 
     * tree, or if it has been removed from the tree, this is 
     * <code>null</code> .
     */
    public Node getParentNode();

    /**
     *  A <code>NodeList</code> that contains all children of this node. If 
     * there are no children, this is a <code>NodeList</code> containing no 
     * nodes.
     */
    public NodeList getChildNodes();

    /**
     *  The first child of this node. If there is no such node, this returns 
     * <code>null</code> .
     */
    public Node getFirstChild();

    /**
     *  The last child of this node. If there is no such node, this returns 
     * <code>null</code> .
     */
    public Node getLastChild();

    /**
     *  The node immediately preceding this node. If there is no such node, 
     * this returns <code>null</code> .
     */
    public Node getPreviousSibling();

    /**
     *  The node immediately following this node. If there is no such node, 
     * this returns <code>null</code> .
     */
    public Node getNextSibling();

    /**
     *  A <code>NamedNodeMap</code> containing the attributes of this node (if 
     * it is an <code>Element</code> ) or <code>null</code> otherwise. 
     */
    public NamedNodeMap getAttributes();

    /**
     *  The <code>Document</code> object associated with this node. This is 
     * also the <code>Document</code> object used to create new nodes. When 
     * this node is a <code>Document</code> or a <code>DocumentType</code> 
     * which is not used with any <code>Document</code> yet, this is 
     * <code>null</code> .
     * @version DOM Level 2
     */
    public Document getOwnerDocument();

    /**
     *  Inserts the node <code>newChild</code> before the existing child node 
     * <code>refChild</code> . If <code>refChild</code> is <code>null</code> 
     * , insert <code>newChild</code> at the end of the list of children.
     * <br> If <code>newChild</code> is a <code>DocumentFragment</code> 
     * object, all of its children are inserted, in the same order, before 
     * <code>refChild</code> . If the <code>newChild</code> is already in the 
     * tree, it is first removed.
     * @param newChild  The node to insert.
     * @param refChild  The reference node, i.e., the node before which the 
     *   new node must be inserted.
     * @return  The node being inserted.
     * @exception DOMException
     *    HIERARCHY_REQUEST_ERR: Raised if this node is of a type that does 
     *   not allow children of the type of the <code>newChild</code> node, or 
     *   if the node to insert is one of this node's ancestors.
     *   <br> WRONG_DOCUMENT_ERR: Raised if <code>newChild</code> was created 
     *   from a different document than the one that created this node.
     *   <br> NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly or 
     *   if the parent of the node being inserted is readonly.
     *   <br> NOT_FOUND_ERR: Raised if <code>refChild</code> is not a child 
     *   of this node.
     */
    public Node insertBefore(Node newChild, 
                             Node refChild)
                             throws DOMException;

    /**
     *  Replaces the child node <code>oldChild</code> with 
     * <code>newChild</code> in the list of children, and returns the 
     * <code>oldChild</code> node.
     * <br> If <code>newChild</code> is a <code>DocumentFragment</code> object,
     *  <code>oldChild</code> is replaced by all of the 
     * <code>DocumentFragment</code> children, which are inserted in the same 
     * order. If the <code>newChild</code> is already in the tree, it is 
     * first removed.
     * @param newChild  The new node to put in the child list.
     * @param oldChild  The node being replaced in the list.
     * @return  The node replaced.
     * @exception DOMException
     *    HIERARCHY_REQUEST_ERR: Raised if this node is of a type that does 
     *   not allow children of the type of the <code>newChild</code> node, or 
     *   if the node to put in is one of this node's ancestors.
     *   <br> WRONG_DOCUMENT_ERR: Raised if <code>newChild</code> was created 
     *   from a different document than the one that created this node.
     *   <br> NO_MODIFICATION_ALLOWED_ERR: Raised if this node or the parent 
     *   of the new node is readonly.
     *   <br> NOT_FOUND_ERR: Raised if <code>oldChild</code> is not a child 
     *   of this node.
     */
    public Node replaceChild(Node newChild, 
                             Node oldChild)
                             throws DOMException;

    /**
     *  Removes the child node indicated by <code>oldChild</code> from the 
     * list of children, and returns it.
     * @param oldChild  The node being removed.
     * @return  The node removed.
     * @exception DOMException
     *    NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
     *   <br> NOT_FOUND_ERR: Raised if <code>oldChild</code> is not a child 
     *   of this node.
     */
    public Node removeChild(Node oldChild)
                            throws DOMException;

    /**
     *  Adds the node <code>newChild</code> to the end of the list of children 
     * of this node. If the <code>newChild</code> is already in the tree, it 
     * is first removed.
     * @param newChild  The node to add. If it is a  
     *   <code>DocumentFragment</code> object, the entire contents of the 
     *   document fragment are moved into the child list of this node
     * @return  The node added.
     * @exception DOMException
     *    HIERARCHY_REQUEST_ERR: Raised if this node is of a type that does 
     *   not allow children of the type of the <code>newChild</code> node, or 
     *   if the node to append is one of this node's ancestors.
     *   <br> WRONG_DOCUMENT_ERR: Raised if <code>newChild</code> was created 
     *   from a different document than the one that created this node.
     *   <br> NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
     */
    public Node appendChild(Node newChild)
                            throws DOMException;

    /**
     *  This is a convenience method to allow easy determination of whether a 
     * node has any children.
     * @return  <code>true</code> if the node has any children, 
     *   <code>false</code> if the node has no children.
     */
    public boolean hasChildNodes();

    /**
     *  Returns a duplicate of this node, i.e., serves as a generic copy 
     * constructor for nodes. The duplicate node has no parent; (
     * <code>parentNode</code> is <code>null</code> .).
     * <br> Cloning an <code>Element</code> copies all attributes and their 
     * values, including those generated by the XML processor to represent 
     * defaulted attributes, but this method does not copy any text it 
     * contains unless it is a deep clone, since the text is contained in a 
     * child <code>Text</code> node. Cloning an <code>Attribute</code> 
     * directly, as opposed to be cloned as part of an <code>Element</code> 
     * cloning operation, returns a specified attribute (
     * <code>specified</code> is <code>true</code> ). Cloning any other type 
     * of node simply returns a copy of this node.
     * <br> Note that cloning an immutable subtree results in a mutable copy, 
     * but the children of an <code>EntityReference</code> clone are   
     * readonly . In addition, clones of unspecified <code>Attr</code> nodes 
     * are specified. And, cloning <code>Document</code> , 
     * <code>DocumentType</code> , <code>Entity</code> , and 
     * <code>Notation</code> nodes is implementation dependent.
     * @param deep  If <code>true</code> , recursively clone the subtree under 
     *   the specified node; if <code>false</code> , clone only the node 
     *   itself (and its attributes, if it is an <code>Element</code> ).  
     * @return  The duplicate node.
     */
    public Node cloneNode(boolean deep);

    /**
     *  Puts all <code>Text</code> nodes in the full depth of the sub-tree 
     * underneath this <code>Node</code> , including attribute nodes, into a 
     * "normal" form where only structure (e.g., elements, comments, 
     * processing instructions, CDATA sections, and entity references) 
     * separates <code>Text</code> nodes, i.e., there are neither adjacent 
     * <code>Text</code> nodes nor empty <code>Text</code> nodes. This can be 
     * used to ensure that the DOM view  of a document is the same as if it 
     * were saved and re-loaded, and is useful when operations (such as 
     * XPointer lookups) that depend on a particular document tree structure 
     * are to be used. In cases where the document contains 
     * <code>CDATASections</code> , the normalize operation alone may not be 
     * sufficient, since XPointers do not differentiate between 
     * <code>Text</code> nodes and <code>CDATASection</code> nodes.
     * @since DOM Level 2
     */
    public void normalize();

    /**
     *  Tests whether the DOM implementation implements a specific feature and 
     * that feature is supported by this node.
     * @param feature  The name of the feature to test. This is the same name 
     *   which can be passed to the method <code>hasFeature</code> on 
     *   <code>DOMImplementation</code> .
     * @param version  This is the version number of the feature to test. In 
     *   Level 2, version 1, this is the string "2.0". If the version is not 
     *   specified, supporting any version of the feature will cause the 
     *   method to return <code>true</code> .
     * @return  Returns <code>true</code> if the specified feature is supported
     *    on this node, <code>false</code> otherwise.
     * @since DOM Level 2
     */
    public boolean supports(String feature, 
                            String version);

    /**
     *  The  namespace URI of this node, or <code>null</code> if it is 
     * unspecified.
     * <br> This is not a computed value that is the result of a namespace 
     * lookup based on an examination of the namespace declarations in scope. 
     * It is merely the namespace URI given at creation time.
     * <br> For nodes of any type other than <code>ELEMENT_NODE</code> and 
     * <code>ATTRIBUTE_NODE</code> and nodes created with a DOM Level 1 
     * method, such as <code>createElement</code> from the 
     * <code>Document</code> interface, this is always <code>null</code> . 
     * Per the  Namespaces in XML Specification  an attribute does not 
     * inherit its namespace from the element it is attached to. If an 
     * attribute is not explicitly given a namespace, it simply has no 
     * namespace.
     * @since DOM Level 2
     */
    public String getNamespaceURI();

    /**
     *  The  namespace prefix of this node, or <code>null</code> if it is 
     * unspecified.
     * <br> Note that setting this attribute, when permitted, changes the 
     * <code>nodeName</code> attribute, which holds the  qualified name , as 
     * well as the <code>tagName</code> and <code>name</code> attributes of 
     * the <code>Element</code> and <code>Attr</code> interfaces, when 
     * applicable.
     * <br> Note also that changing the prefix of an attribute that is known to
     *  have a default value, does not make a new attribute with the default 
     * value and the original prefix appear, since the 
     * <code>namespaceURI</code> and <code>localName</code> do not change.
     * <br> For nodes of any type other than <code>ELEMENT_NODE</code> and 
     * <code>ATTRIBUTE_NODE</code> and nodes created with a DOM Level 1 
     * method, such as <code>createElement</code> from the 
     * <code>Document</code> interface, this is always <code>null</code> .
     * @exception DOMException
     *    INVALID_CHARACTER_ERR: Raised if the specified prefix contains an 
     *   illegal character.
     *   <br> NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
     *   <br> NAMESPACE_ERR: Raised if the specified <code>prefix</code> is 
     *   malformed, if the <code>namespaceURI</code> of this node is 
     *   <code>null</code> , if the specified prefix is "xml" and the 
     *   <code>namespaceURI</code> of this node is different from " 
     *   http://www.w3.org/XML/1998/namespace ", if this node is an attribute 
     *   and the specified prefix is "xmlns" and the <code>namespaceURI</code>
     *    of this node is different from " http://www.w3.org/2000/xmlns/ ", 
     *   or if this node is an attribute and the <code>qualifiedName</code> 
     *   of this node is "xmlns"  .
     * @since DOM Level 2
     */
    public String getPrefix();
    public void setPrefix(String prefix)
                            throws DOMException;

    /**
     *  Returns the local part of the  qualified name of this node.
     * <br> For nodes of any type other than <code>ELEMENT_NODE</code> and 
     * <code>ATTRIBUTE_NODE</code> and nodes created with a DOM Level 1 
     * method, such as <code>createElement</code> from the 
     * <code>Document</code> interface, this is always <code>null</code> .
     * @since DOM Level 2
     */
    public String getLocalName();

    /**
     * Returns the absolute base URI of this node.How will this be affected by 
     * resolution of relative namespace URIs issue?Should this only be on 
     * Document, Element, ProcessingInstruction, Entity, and Notation nodes, 
     * according to the infoset? If not, what is it equal to on other nodes? 
     * Null? An empty string?Should this be read-only and computed or and 
     * actual read-write attribute?The former (F2F 19 Jun 2000).
     */
    public String getBaseURI();


    /**
     * Compares a node with this node with regard to document order.Should an 
     * exception be raised when comparing attributes? Entities and 
     * notations? An element against an attribute? If yes, which one? 
     * HIERARCHY_REQUEST_ERR? Should the enum value "unordered" be killed 
     * then?No, return unordered for attributes (F2F 19 Jun 2000).Should 
     * this method be moved to Node and take only one node in argument?Yes 
     * (F2F 19 Jun 2000).
     * @param otherThe node to compare against this node.
     * @return Returns how the given node compares with this node in document 
     *   order.
     * @exception DOMException
     *   WRONG_DOCUMENT_ERR: Raised if the given node does not belong to the 
     *   same document as this node.
     */
    public int compareDocumentOrder(Node other)
                                    throws DOMException;


    public static final int PRECEDING    = 1;
    public static final int FOLLOWING    = 2;
    public static final int ANCESTOR     = 3;
    public static final int DESCENDANT   = 4;
    public static final int SAME         = 5;
    public static final int UNORDERED    = 6;


public static final short DOCUMENT_POSITION_DISCONNECTED = 1;	
public static final short DOCUMENT_POSITION_PRECEDING 	 = 2;
public static final short DOCUMENT_POSITION_FOLLOWING 	 = 4;
public static final short DOCUMENT_POSITION_CONTAINS 	 = 8;
public static final short DOCUMENT_POSITION_CONTAINED_BY = 16;	
public static final short DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32;

public short compareDocumentPosition(Node other) throws DOMException;

    /**
     * Compares a node with this node with regard to their position in the 
     * tree.
     * @param otherThe node to compare against this node.
     * @return Returns how the given node is positioned relatively to this 
     *   node.
     * @exception DOMException
     *   WRONG_DOCUMENT_ERR: Raised if the given node does not belong to the 
     *   same document as this node.
     */
    public int compareTreePosition(Node other)
                                   throws DOMException;

    /**
     * This attribute returns the text content of this node and its 
     * descendants. When set, any possible children this node may have are 
     * removed and replaced by a single <code>Text</code> node containing 
     * the string this attribute is set to. On getting, no serialization is 
     * performed, the returned string does not contain any markup. 
     * Similarly, on setting, no parsing is performed either, the input 
     * string is taken as pure textual content.
     * <br>The string returned is made of the text content of this node 
     * depending on its type, as defined below: Node typeContent
     * ELEMENT_NODE, ENTITY_NODE, ENTITY_REFERENCE_NODE, DOCUMENT_NODE, 
     * DOCUMENT_FRAGMENT_NODEconcatenation of the <code>textContent</code> 
     * of the child nodes, excluding COMMENT_NODE and 
     * PROCESSING_INSTRUCTION_NODE nodesATTRIBUTE_NODE, TEXT_NODE, 
     * CDATA_SECTION_NODE, COMMENT_NODE, PROCESSING_INSTRUCTION_NODE
     * <code>nodeValue</code>DOCUMENT_TYPE_NODE, NOTATION_NODEempty string 
     * Should any whitespace normalization be performed?Should this be two 
     * methods instead?What about the name?
     */
    public String getTextContent();
    public void setTextContent(String textContent);

    /**
     * Returns whether this node is the same node as the given one. Do we 
     * really want to make this different from equals?Yes, change name from 
     * isIdentical to isSameNode. (Telcon 4 Jul 2000).
     * @param otherThe node to test against.
     * @return Returns <code>true</code> if the nodes are the same, 
     *   <code>false</code> otherwise.
     */
    public boolean isSameNode(Node other);

    /**
     * Look up the prefix associated to the given namespace URI, starting from 
     * this node.
     * @param namespaceURIThe namespace URI to look for.
     * @return Returns the associated namespace prefix or <code>null</code> 
     *   if none is found.
     */
    public String lookupNamespacePrefix(String namespaceURI);

    /**
     * Look up the namespace URI associated to the given prefix, starting from 
     * this node.Name? May need to change depending on ending of the 
     * relative namespace URI reference nightmare.
     * @param prefixThe prefix to look for.
     * @return Returns the associated namespace URI or <code>null</code> if 
     *   none is found.
     */
    public String lookupNamespaceURI(String prefix);

    /**
     * This method walks down the tree, starting from this node, and adds 
     * namespace declarations where needed so that every namespace being 
     * used is properly declared. It also changes or assign prefixes when 
     * needed. This effectively makes this node subtree is "namespace 
     * wellformed".
     * <br>What the generated prefixes are and/or how prefixes are changed to 
     * achieve this is implementation dependent.Any other name?How specific 
     * should this be? Should we not even specify that this should be done 
     * by walking down the tree?What does this do on attribute nodes?Doesn't 
     * do anything (F2F 1 Aug 2000).How does it work with entity reference 
     * subtree which may be broken?This doesn't affect entity references 
     * which are not visited in this operation (F2F 1 Aug 2000).Should this 
     * be really be on Node?Yes, but this only works on Document, Element, 
     * and DocumentFragment. On other types it is a no-op. (F2F 1 Aug 2000).
     * What happens with read-only nodes?What/how errors should be reported? 
     * Are there any?
     */
    public void normalizeNS();

    /**
     * This method allows to attach a user object to a Node. This object can 
     * then be retreived using <code>getUserData</code>.Is this really worth 
     * it?Could we live without a key?What happens if the node is cloned, 
     * imported, adopted? Should some event mechanism be specified to notify 
     * the application?What happens if the node is cloned?What should Object 
     * be mapped to in ECMAScript? For IDL we need to define this type 
     * somehow.
     * @param dataThe piece of data to attach to this node.
     * @param keyThe key to associate this data to.
     * @return The object previously associated to this node and the given 
     *   key or <code>null</code>.
     */
    public Object setUserData(Object data, 
                              String key);

    /**
     * This method allows to retreive a user object previously attached to a 
     * Node with <code>setUserData</code>.
     * @param keyThe key to look for.
     * @return The object associated to this node and the given key or 
     *   <code>null</code>.
     */
    public Object getUserData(String key);

    /**
     * This attribute returns a unique key identifying this node.What type 
     * should this really be?In what space is this key unique (Document, 
     * DOMImplementation)?What is the lifetime of the uniqueness of this key 
     * (Node, Document, ...)?
     */
    public Object getKey();

	public boolean isEqualNode(Node child2);

	public boolean hasAttributes();

}


