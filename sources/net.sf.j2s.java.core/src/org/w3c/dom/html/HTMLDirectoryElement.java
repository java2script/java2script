package org.w3c.dom.html;

import org.w3c.dom.*;

/**
 * Directory list. See the DIR element definition in HTML 4.0. This element is 
 * deprecated in HTML 4.0.
 */
public interface HTMLDirectoryElement extends HTMLElement {
  /**
   * Reduce spacing between list items. See the compact attribute definition 
   * in HTML 4.0. This attribute is deprecated in HTML 4.0.
   */
  public boolean            getCompact();
  public void               setCompact(boolean compact);
}

