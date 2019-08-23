package org.w3c.dom.html;

import org.w3c.dom.*;

/**
 * The document title. See the TITLE element definition in HTML 4.0.
 */
public interface HTMLTitleElement extends HTMLElement {
  /**
   * The specified title as a string. 
   */
  public String             getText();
  public void               setText(String text);
}

