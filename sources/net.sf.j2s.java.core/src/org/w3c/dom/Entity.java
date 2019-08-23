package org.w3c.dom;

/**
 * This interface represents an entity, either parsed or unparsed, in an XML 
 * document. Note that this models the entity itself not the entity 
 * declaration. <code>Entity</code> declaration modeling has been left for a 
 * later Level of the DOM specification.
 * <p>The <code>nodeName</code> attribute that is inherited from 
 * <code>Node</code> contains the name of the entity.
 * <p>An XML processor may choose to completely expand entities before  the 
 * structure model is passed to the DOM; in this case there will be no 
 * <code>EntityReference</code> nodes in the document tree.
 * <p>XML does not mandate that a non-validating XML processor read and 
 * process entity declarations  made in the external subset or declared in 
 * external parameter entities. This means that parsed entities declared in 
 * the external subset need not be expanded by some classes of applications, 
 * and that the replacement value of the entity may not be available. When the
 *  replacement value is available, the corresponding  <code>Entity</code> 
 * node's child list represents the structure of that replacement text. 
 * Otherwise, the child list is empty.
 * <p>The resolution of the children of the <code>Entity</code> (the  
 * replacement value) may be lazily evaluated; actions by the user (such as 
 * calling the <code>childNodes</code> method on the <code>Entity</code> 
 * Node) are assumed to trigger the evaluation.  
 * <p>The DOM Level 1 does not support editing <code>Entity</code> nodes; if a 
 * user wants to make changes to the contents of an <code>Entity</code>, 
 * every related <code>EntityReference</code> node has to be replaced in the 
 * structure model by a clone of the <code>Entity</code>'s contents, and then 
 * the desired changes must be made to each of those clones instead. All the 
 * descendants of an <code>Entity</code> node are readonly.
 * <p>An <code>Entity</code> node does not have any parent.
 */
public interface Entity extends Node {
  /**
   * The public identifier associated with the entity, if specified. If the 
   * public identifier was not specified, this is <code>null</code>.
   */
  public String             getPublicId();
  /**
   * The system identifier associated with the entity, if specified. If the 
   * system identifier was not specified, this is <code>null</code>.
   */
  public String             getSystemId();
  /**
   * For unparsed entities, the name of the notation for the entity. For 
   * parsed entities, this is <code>null</code>. 
   */
  public String             getNotationName();
}

