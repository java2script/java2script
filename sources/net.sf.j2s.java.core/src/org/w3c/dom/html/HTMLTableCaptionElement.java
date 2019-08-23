package org.w3c.dom.html;

import org.w3c.dom.*;

/**
 * Table caption See the CAPTION element definition in HTML 4.0.
 */
public interface HTMLTableCaptionElement extends HTMLElement {
  /**
   * Caption alignment with respect to the table. See the align attribute 
   * definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
   */
  public String             getAlign();
  public void               setAlign(String align);
}

