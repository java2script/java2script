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
 * This interface extends the <code>Node</code> interface with several new 
 * methods. One allows to compare a node against another with regard to 
 * document order. Another methode allows to retrieve the content of a node 
 * and its descendants as a single DOMString. One allows to test whether two 
 * nodes are the same. Two methods provide for searching the namespace URI 
 * associated to a given prefix and to ensure the document is "namespace 
 * wellformed". Finally, a method allows to attach some user data to a Node. 
 * It also provides a new attribute to get the base URI of a node, as 
 * defined in the XML Infoset.The term namespace wellformed needs to be 
 * defined.Define it as "being conformant to the Namespaces in XML spec" in 
 * the glossary (Telcon 4 Jul 2000).
 * <p>See also the <a href='http://www.w3.org/TR/2000/WD-DOM-Level-3-Core-20000901'>Document Object Model (DOM) Level 3 Core Specification</a>.
 */
public interface Node3 {
//    /**
//     * Returns the absolute base URI of this node.How will this be affected by 
//     * resolution of relative namespace URIs issue?Should this only be on 
//     * Document, Element, ProcessingInstruction, Entity, and Notation nodes, 
//     * according to the infoset? If not, what is it equal to on other nodes? 
//     * Null? An empty string?Should this be read-only and computed or and 
//     * actual read-write attribute?The former (F2F 19 Jun 2000).
//     */
//    public String getBaseURI();
//
//
//    /**
//     * Compares a node with this node with regard to document order.Should an 
//     * exception be raised when comparing attributes? Entities and 
//     * notations? An element against an attribute? If yes, which one? 
//     * HIERARCHY_REQUEST_ERR? Should the enum value "unordered" be killed 
//     * then?No, return unordered for attributes (F2F 19 Jun 2000).Should 
//     * this method be moved to Node and take only one node in argument?Yes 
//     * (F2F 19 Jun 2000).
//     * @param otherThe node to compare against this node.
//     * @return Returns how the given node compares with this node in document 
//     *   order.
//     * @exception DOMException
//     *   WRONG_DOCUMENT_ERR: Raised if the given node does not belong to the 
//     *   same document as this node.
//     */
//    public int compareDocumentOrder(Node other)
//                                    throws DOMException;
//
//
//    public static final int PRECEDING    = 1;
//    public static final int FOLLOWING    = 2;
//    public static final int ANCESTOR     = 3;
//    public static final int DESCENDANT   = 4;
//    public static final int SAME         = 5;
//    public static final int UNORDERED    = 6;
//
//    /**
//     * Compares a node with this node with regard to their position in the 
//     * tree.
//     * @param otherThe node to compare against this node.
//     * @return Returns how the given node is positioned relatively to this 
//     *   node.
//     * @exception DOMException
//     *   WRONG_DOCUMENT_ERR: Raised if the given node does not belong to the 
//     *   same document as this node.
//     */
//    public int compareTreePosition(Node other)
//                                   throws DOMException;
//
//    /**
//     * This attribute returns the text content of this node and its 
//     * descendants. When set, any possible children this node may have are 
//     * removed and replaced by a single <code>Text</code> node containing 
//     * the string this attribute is set to. On getting, no serialization is 
//     * performed, the returned string does not contain any markup. 
//     * Similarly, on setting, no parsing is performed either, the input 
//     * string is taken as pure textual content.
//     * <br>The string returned is made of the text content of this node 
//     * depending on its type, as defined below: Node typeContent
//     * ELEMENT_NODE, ENTITY_NODE, ENTITY_REFERENCE_NODE, DOCUMENT_NODE, 
//     * DOCUMENT_FRAGMENT_NODEconcatenation of the <code>textContent</code> 
//     * of the child nodes, excluding COMMENT_NODE and 
//     * PROCESSING_INSTRUCTION_NODE nodesATTRIBUTE_NODE, TEXT_NODE, 
//     * CDATA_SECTION_NODE, COMMENT_NODE, PROCESSING_INSTRUCTION_NODE
//     * <code>nodeValue</code>DOCUMENT_TYPE_NODE, NOTATION_NODEempty string 
//     * Should any whitespace normalization be performed?Should this be two 
//     * methods instead?What about the name?
//     */
//    public String getTextContent();
//    public void setTextContent(String textContent);
//
//    /**
//     * Returns whether this node is the same node as the given one. Do we 
//     * really want to make this different from equals?Yes, change name from 
//     * isIdentical to isSameNode. (Telcon 4 Jul 2000).
//     * @param otherThe node to test against.
//     * @return Returns <code>true</code> if the nodes are the same, 
//     *   <code>false</code> otherwise.
//     */
//    public boolean isSameNode(Node other);
//
//    /**
//     * Look up the prefix associated to the given namespace URI, starting from 
//     * this node.
//     * @param namespaceURIThe namespace URI to look for.
//     * @return Returns the associated namespace prefix or <code>null</code> 
//     *   if none is found.
//     */
//    public String lookupNamespacePrefix(String namespaceURI);
//
//    /**
//     * Look up the namespace URI associated to the given prefix, starting from 
//     * this node.Name? May need to change depending on ending of the 
//     * relative namespace URI reference nightmare.
//     * @param prefixThe prefix to look for.
//     * @return Returns the associated namespace URI or <code>null</code> if 
//     *   none is found.
//     */
//    public String lookupNamespaceURI(String prefix);
//
//    /**
//     * This method walks down the tree, starting from this node, and adds 
//     * namespace declarations where needed so that every namespace being 
//     * used is properly declared. It also changes or assign prefixes when 
//     * needed. This effectively makes this node subtree is "namespace 
//     * wellformed".
//     * <br>What the generated prefixes are and/or how prefixes are changed to 
//     * achieve this is implementation dependent.Any other name?How specific 
//     * should this be? Should we not even specify that this should be done 
//     * by walking down the tree?What does this do on attribute nodes?Doesn't 
//     * do anything (F2F 1 Aug 2000).How does it work with entity reference 
//     * subtree which may be broken?This doesn't affect entity references 
//     * which are not visited in this operation (F2F 1 Aug 2000).Should this 
//     * be really be on Node?Yes, but this only works on Document, Element, 
//     * and DocumentFragment. On other types it is a no-op. (F2F 1 Aug 2000).
//     * What happens with read-only nodes?What/how errors should be reported? 
//     * Are there any?
//     */
//    public void normalizeNS();
//
//    /**
//     * This method allows to attach a user object to a Node. This object can 
//     * then be retreived using <code>getUserData</code>.Is this really worth 
//     * it?Could we live without a key?What happens if the node is cloned, 
//     * imported, adopted? Should some event mechanism be specified to notify 
//     * the application?What happens if the node is cloned?What should Object 
//     * be mapped to in ECMAScript? For IDL we need to define this type 
//     * somehow.
//     * @param dataThe piece of data to attach to this node.
//     * @param keyThe key to associate this data to.
//     * @return The object previously associated to this node and the given 
//     *   key or <code>null</code>.
//     */
//    public Object setUserData(Object data, 
//                              String key);
//
//    /**
//     * This method allows to retreive a user object previously attached to a 
//     * Node with <code>setUserData</code>.
//     * @param keyThe key to look for.
//     * @return The object associated to this node and the given key or 
//     *   <code>null</code>.
//     */
//    public Object getUserData(String key);
//
//    /**
//     * This attribute returns a unique key identifying this node.What type 
//     * should this really be?In what space is this key unique (Document, 
//     * DOMImplementation)?What is the lifetime of the uniqueness of this key 
//     * (Node, Document, ...)?
//     */
//    public Object getKey();

}
