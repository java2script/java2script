package org.w3c.dom;

/**
 * This interface represents a notation declared in the DTD. A notation either 
 * declares, by name, the format of an unparsed entity (see section 4.7 of 
 * the XML 1.0 specification), or is used for formal declaration of 
 * Processing Instruction targets (see section 2.6 of the XML 1.0 
 * specification). The <code>nodeName</code> attribute inherited from 
 * <code>Node</code> is set to the declared name of the notation.
 * <p>The DOM Level 1 does not support editing <code>Notation</code> nodes; 
 * they are therefore readonly.
 * <p>A <code>Notation</code> node does not have any parent.
 */
public interface Notation extends Node {
  /**
   * The public identifier of this notation. If the  public identifier was not 
   * specified, this is <code>null</code>.
   */
  public String             getPublicId();
  /**
   * The system identifier of this notation. If the  system identifier was not 
   * specified, this is <code>null</code>.
   */
  public String             getSystemId();
}

