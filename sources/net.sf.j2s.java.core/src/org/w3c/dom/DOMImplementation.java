package org.w3c.dom;

/**
 * The <code>DOMImplementation</code> interface provides a number of methods 
 * for performing operations that are independent of any particular instance 
 * of the document object model. 
 * <p>The DOM Level 1 does not specify a way of creating a document instance, 
 * and hence document creation is an operation specific to an implementation. 
 * Future Levels of the DOM specification are expected to provide methods for 
 * creating documents directly.
 */
public interface DOMImplementation {
  /**
   * Test if the DOM implementation implements a specific feature.
   * @param feature The package name of the feature to test. In Level 1, the 
   *   legal values are "HTML" and "XML" (case-insensitive).
   * @param version This is the version number of the package name to test.  
   *   In Level 1, this is the string "1.0". If the version is not specified, 
   *   supporting any version of the  feature will cause the method to return 
   *   <code>true</code>. 
   * @return <code>true</code> if the feature is implemented in the specified 
   *   version, <code>false</code> otherwise.
   */
  public boolean            hasFeature(String feature, 
                                       String version);
}

