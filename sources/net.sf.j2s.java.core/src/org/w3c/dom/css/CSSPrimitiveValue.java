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

import org.w3c.dom.DOMException;

/**
 *  The <code>CSSPrimitiveValue</code> interface represents a single  CSS value
 *  . This interface may be used to determine the value of a specific style 
 * property currently set in a block or to set a specific style property 
 * explicitly within the block. An instance of this interface might be 
 * obtained from the <code>getPropertyCSSValue</code> method of the 
 * <code>CSSStyleDeclaration</code> interface. A 
 * <code>CSSPrimitiveValue</code> object only occurs in a context of a CSS 
 * property. 
 * <p> Conversions are allowed between absolute values (from millimeters to 
 * centimeters, from degrees to radians, and so on) but not between relative 
 * values. (For example, a pixel value cannot be converted to a centimeter 
 * value.) Percentage values can't be converted since they are relative to 
 * the parent value (or another property value). There is one exception for 
 * color percentage values: since a color percentage value is relative to the 
 * range 0-255, a color percentage value can be converted to a number; (see 
 * also the <code>RGBColor</code> interface). 
 * <p>See also the <a href='http://www.w3.org/TR/2000/CR-DOM-Level-2-20000510'>Document Object Model (DOM) Level 2 Specification</a>.
 * @since DOM Level 2
 */
public interface CSSPrimitiveValue extends CSSValue {
    // UnitTypes
    public static final short CSS_UNKNOWN               = 0;
    public static final short CSS_NUMBER                = 1;
    public static final short CSS_PERCENTAGE            = 2;
    public static final short CSS_EMS                   = 3;
    public static final short CSS_EXS                   = 4;
    public static final short CSS_PX                    = 5;
    public static final short CSS_CM                    = 6;
    public static final short CSS_MM                    = 7;
    public static final short CSS_IN                    = 8;
    public static final short CSS_PT                    = 9;
    public static final short CSS_PC                    = 10;
    public static final short CSS_DEG                   = 11;
    public static final short CSS_RAD                   = 12;
    public static final short CSS_GRAD                  = 13;
    public static final short CSS_MS                    = 14;
    public static final short CSS_S                     = 15;
    public static final short CSS_HZ                    = 16;
    public static final short CSS_KHZ                   = 17;
    public static final short CSS_DIMENSION             = 18;
    public static final short CSS_STRING                = 19;
    public static final short CSS_URI                   = 20;
    public static final short CSS_IDENT                 = 21;
    public static final short CSS_ATTR                  = 22;
    public static final short CSS_COUNTER               = 23;
    public static final short CSS_RECT                  = 24;
    public static final short CSS_RGBCOLOR              = 25;

    /**
     *  The type of the value as defined by the constants specified above.
     */
    public short getPrimitiveType();

    /**
     *  A method to set the float value with a specified unit. If the property 
     * attached with this value can not accept the specified unit or the float
     *  value, the value will be unchanged and a <code>DOMException</code> 
     * will be raised. 
     * @param unitType  A unit code as defined above. The unit code can only 
     *   be a float unit type (i.e. <code>CSS_NUMBER</code> , 
     *   <code>CSS_PERCENTAGE</code> , <code>CSS_EMS</code> , 
     *   <code>CSS_EXS</code> , <code>CSS_PX</code> , <code>CSS_CM</code> , 
     *   <code>CSS_MM</code> , <code>CSS_IN</code> , <code>CSS_PT</code> , 
     *   <code>CSS_PC</code> , <code>CSS_DEG</code> , <code>CSS_RAD</code> , 
     *   <code>CSS_GRAD</code> , <code>CSS_MS</code> , <code>CSS_S</code> , 
     *   <code>CSS_HZ</code> , <code>CSS_KHZ</code> , 
     *   <code>CSS_DIMENSION</code> ). 
     * @param floatValue  The new float value. 
     * @exception DOMException
     *    INVALID_ACCESS_ERR: Raised if the attached property doesn't support 
     *   the float value or the unit type.
     *   <br> NO_MODIFICATION_ALLOWED_ERR: Raised if this property is 
     *   readonly.
     */
    public void setFloatValue(short unitType, 
                              float floatValue)
                              throws DOMException;

    /**
     *  This method is used to get a float value in a specified unit. If this 
     * CSS value doesn't contain a float value or can't be converted into the 
     * specified unit, a <code>DOMException</code> is raised. 
     * @param unitType  A unit code to get the float value.  The unit code can 
     *   only be a float unit type (i.e. <code>CSS_NUMBER</code> , 
     *   <code>CSS_PERCENTAGE</code> , <code>CSS_EMS</code> , 
     *   <code>CSS_EXS</code> , <code>CSS_PX</code> , <code>CSS_CM</code> , 
     *   <code>CSS_MM</code> , <code>CSS_IN</code> , <code>CSS_PT</code> , 
     *   <code>CSS_PC</code> , <code>CSS_DEG</code> , <code>CSS_RAD</code> , 
     *   <code>CSS_GRAD</code> , <code>CSS_MS</code> , <code>CSS_S</code> , 
     *   <code>CSS_HZ</code> , <code>CSS_KHZ</code> , 
     *   <code>CSS_DIMENSION</code> ). 
     * @return  The float value in the specified unit. 
     * @exception DOMException
     *    INVALID_ACCESS_ERR: Raised if the CSS value doesn't contain a float 
     *   value or if the float value can't be converted into the specified 
     *   unit. 
     */
    public float getFloatValue(short unitType)
                               throws DOMException;

    /**
     *  A method to set the string value with the specified unit. If the 
     * property attached to this value can't accept the specified unit or the 
     * string value, the value will be unchanged and a 
     * <code>DOMException</code> will be raised. 
     * @param stringType  A string code as defined above. The string code can 
     *   only be a string unit type (i.e. <code>CSS_STRING</code> , 
     *   <code>CSS_URI</code> , <code>CSS_IDENT</code> , and 
     *   <code>CSS_ATTR</code> ). 
     * @param stringValue  The new string value. 
     * @exception DOMException
     *    INVALID_ACCESS_ERR: Raised if the CSS value doesn't contain a string
     *    value or if the string value can't be converted into the specified 
     *   unit.
     *   <br> NO_MODIFICATION_ALLOWED_ERR: Raised if this property is 
     *   readonly.
     */
    public void setStringValue(short stringType, 
                               String stringValue)
                               throws DOMException;

    /**
     *  This method is used to get the string value. If the CSS value doesn't 
     * contain a string value, a <code>DOMException</code> is raised.  Some 
     * properties (like  'font-family' or  'voice-family' ) convert a 
     * whitespace separated list of idents to a string. 
     * @return  The string value in the current unit. The current 
     *   <code>primitiveType</code> can only be a string unit type (i.e. 
     *   <code>CSS_STRING</code> , <code>CSS_URI</code> , 
     *   <code>CSS_IDENT</code> and <code>CSS_ATTR</code> ). 
     * @exception DOMException
     *    INVALID_ACCESS_ERR: Raised if the CSS value doesn't contain a string
     *    value. 
     */
    public String getStringValue()
                                 throws DOMException;

    /**
     *  This method is used to get the Counter value. If this CSS value doesn't
     *  contain a counter value, a <code>DOMException</code> is raised. 
     * Modification to the corresponding style property can be achieved using 
     * the <code>Counter</code> interface. 
     * @return  The Counter value.
     * @exception DOMException
     *    INVALID_ACCESS_ERR: Raised if the CSS value doesn't contain a 
     *   Counter value (e.g. this is not <code>CSS_COUNTER</code> ). 
     */
    public Counter getCounterValue()
                                   throws DOMException;

    /**
     *  This method is used to get the Rect value. If this CSS value doesn't 
     * contain a rect value, a <code>DOMException</code> is raised. 
     * Modification to the corresponding style property can be achieved using 
     * the <code>Rect</code> interface. 
     * @return  The Rect value.
     * @exception DOMException
     *    INVALID_ACCESS_ERR: Raised if the CSS value doesn't contain a Rect 
     *   value.  (e.g. this is not <code>CSS_RECT</code> ). 
     */
    public Rect getRectValue()
                             throws DOMException;

    /**
     *  This method is used to get the RGB color. If this CSS value doesn't 
     * contain a RGB color value, a <code>DOMException</code> is raised. 
     * Modification to the corresponding style property can be achieved using 
     * the <code>RGBColor</code> interface. 
     * @return  the RGB color value.
     * @exception DOMException
     *    INVALID_ACCESS_ERR: Raised if the attached property can't return a 
     *   RGB color value (e.g. this is not <code>CSS_RGBCOLOR</code> ). 
     */
    public RGBColor getRGBColorValue()
                                     throws DOMException;

}

