package org.w3c.dom.html;

import org.w3c.dom.*;

/**
 * Notice of modification to part of a document. See the  INS  and DEL  
 * element definitions in HTML 4.0. 
 */
public interface HTMLModElement extends HTMLElement {
  /**
   * A URI designating a document that describes the reason forthe change. See 
   * the cite attribute definition in HTML 4.0.
   */
  public String             getCite();
  public void               setCite(String cite);
  /**
   * The date and time of the change. See the datetime attribute definition in 
   * HTML 4.0.
   */
  public String             getDateTime();
  public void               setDateTime(String dateTime);
}

