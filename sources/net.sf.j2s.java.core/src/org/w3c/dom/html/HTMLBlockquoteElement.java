package org.w3c.dom.html;

import org.w3c.dom.*;

/**
 * ??? See the BLOCKQUOTE element definition in HTML 4.0.
 */
public interface HTMLBlockquoteElement extends HTMLElement {
  /**
   * A URI designating a document that describes the reason forthe change. See 
   * the cite attribute definition in HTML 4.0.
   */
  public String             getCite();
  public void               setCite(String cite);
}

