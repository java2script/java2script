package org.w3c.dom.html;

import org.w3c.dom.*;

/**
 * For the <code>H1</code> to <code>H6</code> elements. See the H1 element 
 * definition in HTML 4.0.
 */
public interface HTMLHeadingElement extends HTMLElement {
  /**
   * Horizontal text alignment. See the align attribute definition in HTML 
   * 4.0. This attribute is deprecated in HTML 4.0.
   */
  public String             getAlign();
  public void               setAlign(String align);
}

