package org.w3c.dom.html;

import org.w3c.dom.*;

/**
 * Document head information. See the HEAD element definition in HTML 4.0.
 */
public interface HTMLHeadElement extends HTMLElement {
  /**
   * URI designating a metadata profile. See the profile attribute definition 
   * in HTML 4.0.
   */
  public String             getProfile();
  public void               setProfile(String profile);
}

