package org.w3c.dom;

/**
 * By far the vast majority of objects (apart from text) that authors 
 * encounter when traversing a document are <code>Element</code> nodes.  
 * Assume the following XML document:&lt;elementExample id="demo"&gt; 
 * &lt;subelement1/&gt; 
 * &lt;subelement2&gt;&lt;subsubelement/&gt;&lt;/subelement2&gt;
 * &lt;/elementExample&gt;  
 * <p>When represented using DOM, the top node is an <code>Element</code> node 
 * for "elementExample", which contains two child <code>Element</code> nodes, 
 * one for "subelement1" and one for "subelement2". "subelement1" contains no 
 * child nodes.
 * <p>Elements may have attributes associated with them; since the 
 * <code>Element</code> interface inherits from <code>Node</code>, the generic
 *  <code>Node</code> interface method <code>getAttributes</code> may be used 
 * to retrieve the set of all attributes for an element.  There are methods on
 *  the <code>Element</code> interface to retrieve either an <code>Attr</code>
 *  object by name or an attribute value by name. In XML, where an attribute 
 * value may contain entity references, an <code>Attr</code> object should be 
 * retrieved to examine the possibly fairly complex sub-tree representing the 
 * attribute value. On the other hand, in HTML, where all attributes have 
 * simple string values, methods to directly access an attribute value can 
 * safely be used as a convenience.
 */
public interface Element extends Node {
  /**
   * The name of the element. For example, in: &lt;elementExample 
   * id="demo"&gt;  ... &lt;/elementExample&gt; , <code>tagName</code> has 
   * the value <code>"elementExample"</code>. Note that this is 
   * case-preserving in XML, as are all of the operations of the DOM. The 
   * HTML DOM returns the <code>tagName</code> of an HTML element in the 
   * canonical uppercase form, regardless of the case in the  source HTML 
   * document. 
   */
  public String             getTagName();
  /**
   * Retrieves an attribute value by name.
   * @param name The name of the attribute to retrieve.
   * @return The <code>Attr</code> value as a string, or the empty  string if 
   *   that attribute does not have a specified or default value.
   */
  public String             getAttribute(String name);
  /**
   * Adds a new attribute. If an attribute with that name is already present 
   * in the element, its value is changed to be that of the value parameter. 
   * This value is a simple string, it is not parsed as it is being set. So 
   * any markup (such as syntax to be recognized as an entity reference) is 
   * treated as literal text, and needs to be appropriately escaped by the 
   * implementation when it is written out. In order to assign an attribute 
   * value that contains entity references, the user must create an 
   * <code>Attr</code> node plus any <code>Text</code> and 
   * <code>EntityReference</code> nodes, build the appropriate subtree, and 
   * use <code>setAttributeNode</code> to assign it as the value of an 
   * attribute.
   * @param name The name of the attribute to create or alter.
   * @param value Value to set in string form.
   * @exception DOMException
   *   INVALID_CHARACTER_ERR: Raised if the specified name contains an 
   *   invalid character.
   *   <br>NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
   */
  public void               setAttribute(String name, 
                                         String value)
                                         throws DOMException;
  /**
   * Removes an attribute by name. If the removed attribute has a default 
   * value it is immediately replaced.
   * @param name The name of the attribute to remove.
   * @exception DOMException
   *   NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
   */
  public void               removeAttribute(String name)
                                            throws DOMException;
  /**
   * Retrieves an <code>Attr</code> node by name.
   * @param name The name of the attribute to retrieve.
   * @return The <code>Attr</code> node with the specified attribute name or 
   *   <code>null</code> if there is no such attribute.
   */
  public Attr               getAttributeNode(String name);
  /**
   * Adds a new attribute. If an attribute with that name is already present 
   * in the element, it is replaced by the new one.
   * @param newAttr The <code>Attr</code> node to add to the attribute list.
   * @return If the <code>newAttr</code> attribute replaces an existing 
   *   attribute with the same name, the  previously existing 
   *   <code>Attr</code> node is returned, otherwise <code>null</code> is 
   *   returned.
   * @exception DOMException
   *   WRONG_DOCUMENT_ERR: Raised if <code>newAttr</code> was created from a 
   *   different document than the one that created the element.
   *   <br>NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
   *   <br>INUSE_ATTRIBUTE_ERR: Raised if <code>newAttr</code> is already an 
   *   attribute of another <code>Element</code> object. The DOM user must 
   *   explicitly clone <code>Attr</code> nodes to re-use them in other 
   *   elements.
   */
  public Attr               setAttributeNode(Attr newAttr)
                                             throws DOMException;
  /**
   * Removes the specified attribute.
   * @param oldAttr The <code>Attr</code> node to remove from the attribute 
   *   list. If the removed <code>Attr</code> has a default value it is 
   *   immediately replaced.
   * @return The <code>Attr</code> node that was removed.
   * @exception DOMException
   *   NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
   *   <br>NOT_FOUND_ERR: Raised if <code>oldAttr</code> is not an attribute 
   *   of the element.
   */
  public Attr               removeAttributeNode(Attr oldAttr)
                                                throws DOMException;
  /**
   * Returns a <code>NodeList</code> of all descendant elements with a given 
   * tag name, in the order in which they would be encountered in a preorder 
   * traversal of the <code>Element</code> tree.
   * @param name The name of the tag to match on. The special value "*" 
   *   matches all tags.
   * @return A list of matching <code>Element</code> nodes.
   */
  public NodeList           getElementsByTagName(String name);
  /**
   * Puts all <code>Text</code> nodes in the full depth of the sub-tree 
   * underneath this <code>Element</code> into a "normal" form where only 
   * markup (e.g., tags, comments, processing instructions, CDATA sections, 
   * and entity references) separates <code>Text</code> nodes, i.e., there 
   * are no adjacent <code>Text</code> nodes.  This can be used to ensure 
   * that the DOM view of a document is the same as if it were saved and 
   * re-loaded, and is useful when operations (such as XPointer lookups) that 
   * depend on a particular document tree structure are to be used.
   */
  public void               normalize();
}

