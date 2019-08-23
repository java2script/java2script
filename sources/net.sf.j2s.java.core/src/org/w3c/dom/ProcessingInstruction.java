package org.w3c.dom;

/**
 * The <code>ProcessingInstruction</code> interface represents a  "processing 
 * instruction", used in XML as a way to keep processor-specific information 
 * in the text of the document.
 */
public interface ProcessingInstruction extends Node {
  /**
   * The target of this processing instruction. XML defines this as being the 
   * first token following the markup that begins the processing instruction.
   */
  public String             getTarget();
  /**
   * The content of this processing instruction. This is from the first non 
   * white space character after the target to the character immediately 
   * preceding the <code>?&gt;</code>.
   * @exception DOMException
   *   NO_MODIFICATION_ALLOWED_ERR: Raised when the node is readonly.
   */
  public String             getData();
  public void               setData(String data)
                                      throws DOMException;
}

