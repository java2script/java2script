package org.w3c.dom;

/**
 * The <code>NodeList</code> interface provides the abstraction of an ordered 
 * collection of nodes, without defining or constraining how this collection 
 * is implemented.
 * <p>The items in the <code>NodeList</code> are accessible via an integral 
 * index, starting from 0. 
 */
public interface NodeList {
  /**
   * Returns the <code>index</code>th item in the collection. If 
   * <code>index</code> is greater than or equal to the number of nodes in 
   * the list, this returns <code>null</code>.
   * @param index Index into the collection.
   * @return The node at the <code>index</code>th position in the 
   *   <code>NodeList</code>, or <code>null</code> if that is not a valid 
   *   index.
   */
  public Node               item(int index);
  /**
   * The number of nodes in the list. The range of valid child node indices is 
   * 0 to <code>length-1</code> inclusive. 
   */
  public int                getLength();
}

