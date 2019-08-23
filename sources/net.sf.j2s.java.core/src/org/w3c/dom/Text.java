package org.w3c.dom;

/**
 * The <code>Text</code> interface represents the textual content (termed 
 * character  data in XML) of an <code>Element</code> or <code>Attr</code>.  
 * If there is no markup inside an element's content, the text is contained 
 * in a single object implementing the <code>Text</code> interface that is 
 * the only child of the element. If there is markup, it is parsed into a 
 * list of elements and <code>Text</code> nodes that form the list of 
 * children of the element.
 * <p>When a document is first made available via the DOM, there is  only one 
 * <code>Text</code> node for each block of text. Users may create  adjacent 
 * <code>Text</code> nodes that represent the  contents of a given element 
 * without any intervening markup, but should be aware that there is no way 
 * to represent the separations between these nodes in XML or HTML, so they 
 * will not (in general) persist between DOM editing sessions. The 
 * <code>normalize()</code> method on <code>Element</code> merges any such 
 * adjacent <code>Text</code> objects into a single node for each block of 
 * text; this is  recommended before employing operations that depend on a 
 * particular document structure, such as navigation with 
 * <code>XPointers.</code> 
 */
public interface Text extends CharacterData {
  /**
   * Breaks this <code>Text</code> node into two Text nodes at the specified 
   * offset, keeping both in the tree as siblings. This node then only 
   * contains all the content up to the <code>offset</code> point. And a new 
   * <code>Text</code> node, which is inserted as the next sibling of  this 
   * node, contains all the content at and after the <code>offset</code> 
   * point.
   * @param offset The offset at which to split, starting from 0.
   * @return The new <code>Text</code> node.
   * @exception DOMException
   *   INDEX_SIZE_ERR: Raised if the specified offset is negative or greater 
   *   than the number of characters in <code>data</code>.
   *   <br>NO_MODIFICATION_ALLOWED_ERR: Raised if this node is readonly.
   */
  public Text               splitText(int offset)
                                      throws DOMException;
}

