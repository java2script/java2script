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

package org.w3c.dom;

/**
 *  DOM operations only raise exceptions in "exceptional" circumstances, 
 * i.e., when an operation is impossible to perform (either for logical 
 * reasons, because data is lost, or  because the implementation has become 
 * unstable). In general, DOM methods return specific error values in ordinary
 *  processing situations, such as out-of-bound errors when using 
 * <code>NodeList</code> .  
 * <p> Implementations may raise other exceptions under other circumstances. 
 * For example, implementations may raise an implementation-dependent  
 * exception if a <code>null</code> argument is passed. 
 * <p> Some languages and object systems do not support the concept of 
 * exceptions. For such systems, error conditions may be indicated using 
 * native error reporting mechanisms. For some bindings, for example, methods 
 * may return error codes similar to those listed in the corresponding method 
 * descriptions.
 * <p>See also the <a href='http://www.w3.org/TR/2000/CR-DOM-Level-2-20000510'>Document Object Model (DOM) Level 2 Specification</a>.
 */
public class DOMException extends RuntimeException {
    public DOMException(short code, String message) {
       super(message);
       this.code = code;
    }
    public short   code;
    // ExceptionCode
    public static final short INDEX_SIZE_ERR            = 1;
    public static final short DOMSTRING_SIZE_ERR        = 2;
    public static final short HIERARCHY_REQUEST_ERR     = 3;
    public static final short WRONG_DOCUMENT_ERR        = 4;
    public static final short INVALID_CHARACTER_ERR     = 5;
    public static final short NO_DATA_ALLOWED_ERR       = 6;
    public static final short NO_MODIFICATION_ALLOWED_ERR = 7;
    public static final short NOT_FOUND_ERR             = 8;
    public static final short NOT_SUPPORTED_ERR         = 9;
    public static final short INUSE_ATTRIBUTE_ERR       = 10;
    /** 
     * @since DOM Level 2
     */ 
    public static final short INVALID_STATE_ERR         = 11;
    /** 
     * @since DOM Level 2
     */ 
    public static final short SYNTAX_ERR                = 12;
    /** 
     * @since DOM Level 2
     */ 
    public static final short INVALID_MODIFICATION_ERR  = 13;
    /** 
     * @since DOM Level 2
     */ 
    public static final short NAMESPACE_ERR             = 14;
    /** 
     * @since DOM Level 2
     */ 
    public static final short INVALID_ACCESS_ERR        = 15;
    
    public static final short 	TYPE_MISMATCH_ERR 	=  17;
    public static final short 	VALIDATION_ERR 	 = 16;

}

