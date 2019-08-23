/*
 * Copyright (c) 2000 World Wide Web Consortium,
 * (Massachusetts Institute of Technology, Institut National de
 * Recherche en Informatique et en Automatique, Keio University). All
 * Rights Reserved. This program is distributed under the W3C's Software
 * Intellectual Property License. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even
 * the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 * PURPOSE.
 * See W3C License http://www.w3.org/Consortium/Legal/ for more details.
 */

package org.w3c.dom;


/**
 * This interface extends the <code>Text</code> interface with a new attribute 
 * that allows one to find out whether a <code>Text</code> node only 
 * contains whitespace in element content.
 * <p>See also the <a href='http://www.w3.org/TR/2000/WD-DOM-Level-3-Core-20000901'>Document Object Model (DOM) Level 3 Core Specification</a>.
 */
public interface Text3 extends Text {
    /**
     * Returns whether this text node contains whitespace in element content, 
     * often abusively called "ignorable whitespace".An implementation can 
     * only return <code>true</code> if, one way or another, it has access 
     * to the relevant information (e.g., the DTD or schema).
     */
    public boolean getIsWhitespaceInElementContent();

}
