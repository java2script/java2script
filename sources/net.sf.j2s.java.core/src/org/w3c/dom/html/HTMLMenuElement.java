package org.w3c.dom.html;

import org.w3c.dom.*;

/**
 * Menu list. See the MENU element definition in HTML 4.0. This element is 
 * deprecated in HTML 4.0.
 */
public interface HTMLMenuElement extends HTMLElement {
  /**
   * Reduce spacing between list items. See the compact attribute definition 
   * in HTML 4.0. This attribute is deprecated in HTML 4.0.
   */
  public boolean            getCompact();
  public void               setCompact(boolean compact);
}

