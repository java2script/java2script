package org.w3c.dom.html;

import org.w3c.dom.*;

/**
 * Root of an HTML document. See the HTML element definition in HTML 4.0.
 */
public interface HTMLHtmlElement extends HTMLElement {
  /**
   * Version information about the document's DTD. See the version attribute 
   * definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
   */
  public String             getVersion();
  public void               setVersion(String version);
}

