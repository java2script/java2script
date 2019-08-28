/*
 * Copyright (c) 2000 World Wide Web Consortium,
 * (Massachusetts Institute of Technology, Institut National de
 * Recherche en Informatique et en Automatique, Keio University). All
 * Rights Reserved. This program is distributed under the W3C's Software
 * Intellectual Property License. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even
 * the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 * PURPOSE. See W3C License http://www.w3.org/Consortium/Legal/ for more
 * details.
 */

package org.w3c.dom.css;

/**
 *  The <code>CSSValueList</code> interface provides the abstraction of an 
 * ordered collection of CSS values.
 * <p> Some properties allow an empty list into their syntax. In that case, 
 * these properties take the <code>none</code> identifier. So, an empty list  
 * means that the property has the value <code>none</code> . 
 * <p>See also the <a href='http://www.w3.org/TR/2000/CR-DOM-Level-2-20000510'>Document Object Model (DOM) Level 2 Specification</a>.
 * @since DOM Level 2
 */
public interface CSSValueList extends CSSValue {
    /**
     *  The number of <code>CSSValues</code> in the list. The range of valid 
     * values of the indices is <code>0</code> to <code>length-1</code> 
     * inclusive.
     */
    public int getLength();

    /**
     *  Used to retrieve a CSS rule by ordinal index. The order in this 
     * collection represents the order of the values in the CSS style 
     * property.
     * @param index  Index into the collection.
     * @return  The style rule at the <code>index</code> position in the 
     *   <code>CSSValueList</code> , or <code>null</code> if that is not a 
     *   valid index.
     */
    public CSSValue item(int index);

}

