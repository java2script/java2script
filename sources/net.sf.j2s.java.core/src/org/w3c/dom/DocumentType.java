package org.w3c.dom;

/**
 * Each <code>Document</code> has a <code>doctype</code> attribute whose value 
 * is either <code>null</code> or a <code>DocumentType</code> object. The 
 * <code>DocumentType</code> interface in the DOM Level 1 Core provides an 
 * interface to the list of entities that are defined for the document, and 
 * little else because the effect of namespaces and the various XML scheme 
 * efforts on DTD representation are not clearly understood as of this 
 * writing.
 * <p>The DOM Level 1 doesn't support editing <code>DocumentType</code> nodes.
 */
public interface DocumentType extends Node {
  /**
   * The name of DTD; i.e., the name immediately following the 
   * <code>DOCTYPE</code> keyword.
   */
  public String             getName();
  /**
   * A <code>NamedNodeMap</code> containing the general entities, both 
   * external and internal, declared in the DTD. Duplicates are discarded. 
   * For example in:&lt;!DOCTYPE ex SYSTEM "ex.dtd" [ &lt;!ENTITY foo 
   * "foo"&gt; &lt;!ENTITY bar "bar"&gt; &lt;!ENTITY % baz "baz"&gt;]&gt;
   * &lt;ex/&gt;  the interface provides access to <code>foo</code> and 
   * <code>bar</code> but not <code>baz</code>. Every node in this map also 
   * implements the <code>Entity</code> interface.
   * <br>The DOM Level 1 does not support editing entities, therefore 
   * <code>entities</code> cannot be altered in any way.
   */
  public NamedNodeMap       getEntities();
  /**
   * A <code>NamedNodeMap</code> containing  the notations declared in the 
   * DTD. Duplicates are discarded. Every node in this map also implements 
   * the <code>Notation</code> interface.
   * <br>The DOM Level 1 does not support editing notations, therefore 
   * <code>notations</code> cannot be altered in any way.
   */
  public NamedNodeMap       getNotations();
}

