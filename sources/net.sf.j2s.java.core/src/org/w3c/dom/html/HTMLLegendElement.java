package org.w3c.dom.html;

import org.w3c.dom.*;

/**
 * Provides a caption for a <code>FIELDSET</code> grouping.  See the LEGEND 
 * element definition in HTML 4.0.
 */
public interface HTMLLegendElement extends HTMLElement {
  /**
   * Returns the <code>FORM</code> element containing this control.Returns 
   * null if this control is not within the context of a form. 
   */
  public HTMLFormElement    getForm();
  /**
   * A single character access key to give access to the form control. See the 
   * accesskey attribute definition in HTML 4.0.
   */
  public String             getAccessKey();
  public void               setAccessKey(String accessKey);
  /**
   * Text alignment relative to <code>FIELDSET</code>. See the align attribute 
   * definition in HTML 4.0. This attribute is deprecated in HTML 4.0.
   */
  public String             getAlign();
  public void               setAlign(String align);
}

