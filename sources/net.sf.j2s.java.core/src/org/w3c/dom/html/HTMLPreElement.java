package org.w3c.dom.html;

import org.w3c.dom.*;

/**
 * Preformatted text. See the PRE element definition in HTML 4.0.
 */
public interface HTMLPreElement extends HTMLElement {
  /**
   * Fixed width for content. See the width attribute definition in HTML 4.0. 
   * This attribute is deprecated in HTML 4.0.
   */
  public int                getWidth();
  public void               setWidth(int width);
}

