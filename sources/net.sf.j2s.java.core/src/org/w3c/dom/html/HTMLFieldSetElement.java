package org.w3c.dom.html;

import org.w3c.dom.*;

/**
 * Organizes form controls into logical groups. See the  FIELDSET  element 
 * definition in HTML 4.0.
 */
public interface HTMLFieldSetElement extends HTMLElement {
  /**
   * Returns the <code>FORM</code> element containing this control.Returns 
   * null if this control is not within the context of a form. 
   */
  public HTMLFormElement    getForm();
}

