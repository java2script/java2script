package org.w3c.dom.html;

import org.w3c.dom.*;

/**
 * Definition list. See the DL element definition in HTML 4.0.
 */
public interface HTMLDListElement extends HTMLElement {
  /**
   * Reduce spacing between list items. See the compact attribute definition 
   * in HTML 4.0. This attribute is deprecated in HTML 4.0.
   */
  public boolean            getCompact();
  public void               setCompact(boolean compact);
}

