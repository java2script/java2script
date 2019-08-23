package org.w3c.dom.html;

import org.w3c.dom.*;

/**
 * Force a line break. See the BR element definition in HTML 4.0.
 */
public interface HTMLBRElement extends HTMLElement {
  /**
   * Control flow of text around floats. See the clear attribute definition in 
   * HTML 4.0. This attribute is deprecated in HTML 4.0.
   */
  public String             getClear();
  public void               setClear(String clear);
}

