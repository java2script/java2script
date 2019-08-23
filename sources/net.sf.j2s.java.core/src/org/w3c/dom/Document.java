package org.w3c.dom;

/**
 * The <code>Document</code> interface represents the entire HTML or XML 
 * document. Conceptually, it is the root of the document tree, and provides 
 * the  primary access to the document's data.
 * <p>Since elements, text nodes, comments, processing instructions, etc. 
 * cannot exist outside the context of a <code>Document</code>, the 
 * <code>Document</code> interface also contains the factory methods needed 
 * to create these objects.  The <code>Node</code> objects created have a 
 * <code>ownerDocument</code> attribute which associates them with the 
 * <code>Document</code> within whose  context they were created.
 */
public interface Document extends Node {
  /**
   * The Document Type Declaration (see <code>DocumentType</code>) associated 
   * with  this document. For HTML documents as well as XML documents without 
   * a document type declaration this returns <code>null</code>. The DOM Level
   *  1 does not support editing the Document Type Declaration, therefore 
   * <code>docType</code> cannot be altered in any way.
   */
  public DocumentType       getDoctype();
  /**
   * The <code>DOMImplementation</code> object that handles this document. A 
   * DOM application may use objects from multiple  implementations.
   */
  public DOMImplementation  getImplementation();
  /**
   * This is a convenience attribute that allows direct access to the child 
   * node that is the root element of  the document. For HTML documents, this 
   * is the element with the tagName "HTML".
   */
  public Element            getDocumentElement();
  /**
   * Creates an element of the type specified. Note that the instance returned 
   * implements the Element interface, so attributes can be specified 
   * directly  on the returned object.
   * @param tagName The name of the element type to instantiate. For XML, this 
   *   is case-sensitive. For HTML, the  <code>tagName</code> parameter may 
   *   be provided in any case,  but it must be mapped to the canonical 
   *   uppercase form by  the DOM implementation. 
   * @return A new <code>Element</code> object.
   * @exception DOMException
   *   INVALID_CHARACTER_ERR: Raised if the specified name contains an 
   *   invalid character.
   */
  public Element            createElement(String tagName)
                                          throws DOMException;
  /**
   * Creates an empty <code>DocumentFragment</code> object. 
   * @return A new <code>DocumentFragment</code>.
   */
  public DocumentFragment   createDocumentFragment();
  /**
   * Creates a <code>Text</code> node given the specified string.
   * @param data The data for the node.
   * @return The new <code>Text</code> object.
   */
  public Text               createTextNode(String data);
  /**
   * Creates a <code>Comment</code> node given the specified string.
   * @param data The data for the node.
   * @return The new <code>Comment</code> object.
   */
  public Comment            createComment(String data);
  /**
   * Creates a <code>CDATASection</code> node whose value  is the specified 
   * string.
   * @param data The data for the <code>CDATASection</code> contents.
   * @return The new <code>CDATASection</code> object.
   * @exception DOMException
   *   NOT_SUPPORTED_ERR: Raised if this document is an HTML document.
   */
  public CDATASection       createCDATASection(String data)
                                               throws DOMException;
  /**
   * Creates a <code>ProcessingInstruction</code> node given the specified 
   * name and data strings.
   * @param target The target part of the processing instruction.
   * @param data The data for the node.
   * @return The new <code>ProcessingInstruction</code> object.
   * @exception DOMException
   *   INVALID_CHARACTER_ERR: Raised if an invalid character is specified.
   *   <br>NOT_SUPPORTED_ERR: Raised if this document is an HTML document.
   */
  public ProcessingInstruction createProcessingInstruction(String target, 
                                                           String data)
                                                           throws DOMException;
  /**
   * Creates an <code>Attr</code> of the given name. Note that the 
   * <code>Attr</code> instance can then be set on an <code>Element</code> 
   * using the <code>setAttribute</code> method. 
   * @param name The name of the attribute.
   * @return A new <code>Attr</code> object.
   * @exception DOMException
   *   INVALID_CHARACTER_ERR: Raised if the specified name contains an 
   *   invalid character.
   */
  public Attr               createAttribute(String name)
                                            throws DOMException;
  /**
   * Creates an EntityReference object.
   * @param name The name of the entity to reference. 
   * @return The new <code>EntityReference</code> object.
   * @exception DOMException
   *   INVALID_CHARACTER_ERR: Raised if the specified name contains an 
   *   invalid character.
   *   <br>NOT_SUPPORTED_ERR: Raised if this document is an HTML document. 
   */
  public EntityReference    createEntityReference(String name)
                                                  throws DOMException;
  /**
   * Returns a <code>NodeList</code> of all the <code>Element</code>s with a 
   * given tag name in the order in which they would be encountered in a 
   * preorder traversal of the <code>Document</code> tree. 
   * @param tagname The name of the tag to match on. The special value "*" 
   *   matches all tags.
   * @return A new <code>NodeList</code> object containing all the matched 
   *   <code>Element</code>s.
   */
  public NodeList           getElementsByTagName(String tagname);
}

