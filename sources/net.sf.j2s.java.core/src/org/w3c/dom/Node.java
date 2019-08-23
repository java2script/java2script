package org.w3c.dom;

/**
 * The <code>Node</code> interface is the primary datatype for the entire 
 * Document Object Model. It represents a single node in the document tree. 
 * While all objects implementing the <code>Node</code> interface expose 
 * methods for dealing with children, not all objects implementing the 
 * <code>Node</code> interface may have children. For example, 
 * <code>Text</code> nodes may not have children, and adding children to such 
 * nodes results in a <code>DOMException</code> being raised.  
 * <p>The attributes <code>nodeName</code>, <code>nodeValue</code>  and 
 * <code>attributes</code> are  included as a mechanism to get at node 
 * information without  casting down to the specific derived interface. In 
 * cases where  there is no obvious mapping of these attributes for a specific
 *  <code>nodeType</code> (e.g., <code>nodeValue</code> for an Element  or 
 * <code>attributes</code>  for a Comment), this returns <code>null</code>. 
 * Note that the  specialized interfaces may contain additional and more 
 * convenient mechanisms to get and set the relevant information.
 */
public interface Node {
  // NodeType
  public static final short           ELEMENT_NODE         = 1;
  public static final short           ATTRIBUTE_NODE       = 2;
  public static final short           TEXT_NODE            = 3;
  public static final short           CDATA_SECTION_NODE   = 4;
  public static final short           ENTITY_REFERENCE_NODE = 5;
  public static final short           ENTITY_NODE          = 6;
  public static final short           PROCESSING_INSTRUCTION_NODE = 7;
  public static final short           COMMENT_NODE         = 8;
  public static final short           DOCUMENT_NODE        = 9;
  public static final short           DOCUMENT_TYPE_NODE   = 10;
  public static final short           DOCUMENT_FRAGMENT_NODE = 11;
  public static final short           NOTATION_NODE        = 12;

  /**
   * The name of this node, depending on its type; see the table above. 
   */
  public String             getNodeName();
  /**
   * The value of this node, depending on its type; see the table above.
   * @exception DOMException
   *   NO_MODIFICATION_ALLOWED_ERR: Raised when the node is readonly.
   * @exception DOMException
   *   DOMSTRING_SIZE_ERR: Raised when it would return more characters than 
   *   fit in a <code>DOMString</code> variable on the implementation 
   *   platform.
   */
  public String             getNodeValue()
                                                 throws DOMException;
  public void               setNodeValue(String nodeValue)
                                                 throws DOMException;
  /**
   * A code representing the type of the underlying object, as defined above.
   */
  public short              getNodeType();
  /**
   * The parent of this node. All nodes, except <code>Document</code>, 
   * <code>DocumentFragment</code>, and <code>Attr</code> may have a parent. 
   * However, if a node has just been created and not yet added to the tree, 
   * or if it has been removed from the tree, this is <code>null</code>.
   */
  public Node               getParentNode();
  /**
   * A <code>NodeList</code> that contains all children of this node. If there 
   * are no children, this is a <code>NodeList</code> containing no nodes. 
   * The content of the returned <code>NodeList</code> is "live" in the sense 
   * that, for instance, changes to the children of the node object that 
   * it	was created from are immediately reflected in the nodes returned by 
   * the <code>NodeList</code> accessors; it is not a static snapshot of the 
   * content of the node. This is true for every <code>NodeList</code>, 
   * including the ones returned by the <code>getElementsByTagName</code> 
   * method.
   */
  public NodeList           getChildNodes();
  /**
   * The first child of this node. If there is no such node, this returns 
   * <code>null</code>.
   */
  public Node               getFirstChild();
  /**
   * The last child of this node. If there is no such node, this returns 
   * <code>null</code>.
   */
  public Node               getLastChild();
  /**
   * The node immediately preceding this node. If there is no such node, this 
   * returns <code>null</code>.
   */
  public Node               getPreviousSibling();
  /**
   * The node immediately following this node. If there is no such node, this 
   * returns <code>null</code>.
   */
  public Node               getNextSibling();
  /**
   * A <code>NamedNodeMap</code> containing the attributes of this node (if it 
   * is an <code>Element</code>) or <code>null</code> otherwise. 
   */
  public NamedNodeMap       getAttributes();
  /**
   * The <code>Document</code> object associated with this node. This is also 
   * the <code>Document</code> object used to create new nodes. When this 
   * node is a <code>Document</code> this is <code>null</code>.
   */
  public Document           getOwnerDocument();
  /**
   * Inserts the node <code>newChild</code> before the existing child node 
   * <code>refChild</code>. If <code>refChild</code> is <code>null</code>, 
   * insert <code>newChild</code> at the end of the list of children.
   * <br>If <code>newChild</code> is a <code>DocumentFragment</code> object, 
   * all of its children are inserted, in the same order, before 
   * <code>refChild</code>. If the <code>newChild</code> is already in the 
   * tree, it is first removed.
   * @param newChild The node to insert.
   * @param refChild The reference node, i.e., the node before which the new 
   *   node must be inserted.
   * @return The node being inserted.
   * @exception DOMException
   *   HIERARCHY_REQUEST_ERR: Raised if this node is of a type that does not 
   *   allow children of the type of the <code>newChild</code> node, or if 
   *   the node to insert is one of this node's ancestors.
   *   <br>WRONG_DOCUMENT_ERR: Raised if <code>newChild</code> was created 
   *   from a different document than the one that created this node.
   *   <br>NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
   *   <br>NOT_FOUND_ERR: Raised if <code>refChild</code> is not a child of 
   *   this node.
   */
  public Node               insertBefore(Node newChild, 
                                         Node refChild)
                                         throws DOMException;
  /**
   * Replaces the child node <code>oldChild</code> with <code>newChild</code> 
   * in the list of children, and returns the <code>oldChild</code> node. If 
   * the <code>newChild</code> is already in the tree, it is first removed.
   * @param newChild The new node to put in the child list.
   * @param oldChild The node being replaced in the list.
   * @return The node replaced.
   * @exception DOMException
   *   HIERARCHY_REQUEST_ERR: Raised if this node is of a type that does not 
   *   allow children of the type of the <code>newChild</code> node, or it 
   *   the node to put in is one of this node's ancestors.
   *   <br>WRONG_DOCUMENT_ERR: Raised if <code>newChild</code> was created 
   *   from a different document than the one that created this node.
   *   <br>NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
   *   <br>NOT_FOUND_ERR: Raised if <code>oldChild</code> is not a child of 
   *   this node.
   */
  public Node               replaceChild(Node newChild, 
                                         Node oldChild)
                                         throws DOMException;
  /**
   * Removes the child node indicated by <code>oldChild</code> from the list 
   * of children, and returns it.
   * @param oldChild The node being removed.
   * @return The node removed.
   * @exception DOMException
   *   NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
   *   <br>NOT_FOUND_ERR: Raised if <code>oldChild</code> is not a child of 
   *   this node.
   */
  public Node               removeChild(Node oldChild)
                                        throws DOMException;
  /**
   * Adds the node <code>newChild</code> to the end of the list of children of 
   * this node. If the <code>newChild</code> is already in the tree, it is 
   * first removed.
   * @param newChild The node to add.If it is a  <code>DocumentFragment</code> 
   *   object, the entire contents of the document fragment are moved into 
   *   the child list of this node
   * @return The node added.
   * @exception DOMException
   *   HIERARCHY_REQUEST_ERR: Raised if this node is of a type that does not 
   *   allow children of the type of the <code>newChild</code> node, or if 
   *   the node to append is one of this node's ancestors.
   *   <br>WRONG_DOCUMENT_ERR: Raised if <code>newChild</code> was created 
   *   from a different document than the one that created this node.
   *   <br>NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
   */
  public Node               appendChild(Node newChild)
                                        throws DOMException;
  /**
   *  This is a convenience method to allow easy determination of whether a 
   * node has any children.
   * @return  <code>true</code> if the node has any children, 
   *   <code>false</code> if the node has no children.
   */
  public boolean            hasChildNodes();
  /**
   * Returns a duplicate of this node, i.e., serves as a generic copy 
   * constructor for nodes. The duplicate node has no parent (
   * <code>parentNode</code> returns <code>null</code>.).
   * <br>Cloning an <code>Element</code> copies all attributes and their 
   * values, including those generated by the  XML processor to represent 
   * defaulted attributes, but this method does not copy any text it contains 
   * unless it is a deep clone, since the text is contained in a child 
   * <code>Text</code> node. Cloning any other type of node simply returns a 
   * copy of this node. 
   * @param deep If <code>true</code>, recursively clone the subtree under the 
   *   specified node; if <code>false</code>, clone only the node itself (and 
   *   its attributes, if it is an <code>Element</code>).  
   * @return The duplicate node.
   */
  public Node               cloneNode(boolean deep);
}

