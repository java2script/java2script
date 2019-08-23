package org.w3c.dom;

/**
 *  <code>EntityReference</code> objects may be inserted into the structure 
 * model when an entity reference is in the source document, or when the user 
 * wishes to insert an entity reference. Note that  character references and 
 * references to predefined entities are considered to be expanded by the 
 * HTML or XML processor so that characters are represented by their Unicode 
 * equivalent rather than by an entity reference. Moreover, the XML  
 * processor may completely expand references to entities while building the 
 * structure model, instead of providing <code>EntityReference</code> 
 * objects. If it does provide such objects, then for a given 
 * <code>EntityReference</code> node, it may be that there is no 
 * <code>Entity</code> node representing the referenced entity; but if such 
 * an <code>Entity</code> exists, then the child list of the 
 * <code>EntityReference</code> node is the same as that of the 
 * <code>Entity</code> node. As with the <code>Entity</code> node, all 
 * descendants of the <code>EntityReference</code> are readonly.
 * <p>The resolution of the children of the <code>EntityReference</code> (the  
 * replacement value of the referenced <code>Entity</code>) may be lazily  
 * evaluated; actions by the user (such as calling the  
 * <code>childNodes</code> method on the <code>EntityReference</code> node)  
 * are assumed to trigger the evaluation.
 */
public interface EntityReference extends Node {
}

