package org.w3c.dom.html;

import org.w3c.dom.*;

/**
 * Paragraphs. See the P element definition in HTML 4.0.
 */
public interface HTMLParagraphElement extends HTMLElement {
  /**
   * Horizontal text alignment. See the align attribute definition in HTML 
   * 4.0. This attribute is deprecated in HTML 4.0.
   */
  public String             getAlign();
  public void               setAlign(String align);
}

