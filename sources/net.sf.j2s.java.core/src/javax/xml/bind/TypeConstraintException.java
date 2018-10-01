/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2003-2017 Oracle and/or its affiliates. All rights reserved.
 *
 * The contents of this file are subject to the terms of either the GNU
 * General Public License Version 2 only ("GPL") or the Common Development
 * and Distribution License("CDDL") (collectively, the "License").  You
 * may not use this file except in compliance with the License.  You can
 * obtain a copy of the License at
 * https://oss.oracle.com/licenses/CDDL+GPL-1.1
 * or LICENSE.txt.  See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * When distributing the software, include this License Header Notice in each
 * file and include the License file at LICENSE.txt.
 *
 * GPL Classpath Exception:
 * Oracle designates this particular file as subject to the "Classpath"
 * exception as provided by Oracle in the GPL Version 2 section of the License
 * file that accompanied this code.
 *
 * Modifications:
 * If applicable, add the following below the License Header, with the fields
 * enclosed by brackets [] replaced by your own identifying information:
 * "Portions Copyright [year] [name of copyright owner]"
 *
 * Contributor(s):
 * If you wish your version of this file to be governed by only the CDDL or
 * only the GPL Version 2, indicate your decision by adding "[Contributor]
 * elects to include this software in this distribution under the [CDDL or GPL
 * Version 2] license."  If you don't indicate a single choice of license, a
 * recipient has the option to distribute your version of this file under
 * either the CDDL, the GPL Version 2 or to extend the choice of license to
 * its licensees as provided above.  However, if you add GPL Version 2 code
 * and therefore, elected the GPL Version 2 license, then the option applies
 * only if the new code is made subject to such option by the copyright
 * holder.
 */

package javax.xml.bind;

/**
 * This exception indicates that a violation of a dynamically checked type 
 * constraint was detected.
 *
 * <p>
 * This exception can be thrown by the generated setter methods of the schema
 * derived Java content classes.  However, since fail-fast validation is
 * an optional feature for JAXB Providers to support, not all setter methods
 * will throw this exception when a type constraint is violated.
 * 
 * <p>
 * If this exception is throw while invoking a fail-fast setter, the value of
 * the property is guaranteed to remain unchanged, as if the setter were never
 * called.
 *
 * @author <ul><li>Ryan Shoemaker, Sun Microsystems, Inc.</li><li>Joe Fialli, Sun Microsystems, Inc.</li></ul> 
 * @see ValidationEvent
 * @since 1.6, JAXB 1.0
 */

public class TypeConstraintException extends java.lang.RuntimeException {
  
    /** 
     * Vendor specific error code
     *
     */
    private String errorCode;

    /** 
     * Exception reference
     *
     */
    private volatile Throwable linkedException;

    static final long serialVersionUID = -3059799699420143848L;

    /** 
     * Construct a TypeConstraintException with the specified detail message.  The 
     * errorCode and linkedException will default to null.
     *
     * @param message a description of the exception
     */
    public TypeConstraintException(String message) {
        this( message, null, null );
    }

    /** 
     * Construct a TypeConstraintException with the specified detail message and vendor 
     * specific errorCode.  The linkedException will default to null.
     *
     * @param message a description of the exception
     * @param errorCode a string specifying the vendor specific error code
     */
    public TypeConstraintException(String message, String errorCode) {
        this( message, errorCode, null );
    }

    /** 
     * Construct a TypeConstraintException with a linkedException.  The detail message and
     * vendor specific errorCode will default to null.
     *
     * @param exception the linked exception
     */
    public TypeConstraintException(Throwable exception) {
        this( null, null, exception );
    }
    
    /** 
     * Construct a TypeConstraintException with the specified detail message and 
     * linkedException.  The errorCode will default to null.
     *
     * @param message a description of the exception
     * @param exception the linked exception
     */
    public TypeConstraintException(String message, Throwable exception) {
        this( message, null, exception );
    }
    
    /** 
     * Construct a TypeConstraintException with the specified detail message,
     * vendor specific errorCode, and linkedException.
     *
     * @param message a description of the exception
     * @param errorCode a string specifying the vendor specific error code
     * @param exception the linked exception
     */
    public TypeConstraintException(String message, String errorCode, Throwable exception) {
        super( message );
        this.errorCode = errorCode;
        this.linkedException = exception;
    }
    
    /** 
     * Get the vendor specific error code
     *
     * @return a string specifying the vendor specific error code
     */
    public String getErrorCode() {
        return this.errorCode;
    }

    /**
     * Get the linked exception 
     *
     * @return the linked Exception, null if none exists
     */
    public Throwable getLinkedException() {
        return linkedException;
    }

    /**
     * Add a linked Exception.
     *
     * @param exception the linked Exception (A null value is permitted and 
     *                  indicates that the linked exception does not exist or
     *                  is unknown).
     */
    public void setLinkedException( Throwable exception ) {
        this.linkedException = exception;
    }
    
    /**
     * Returns a short description of this TypeConstraintException.
     *
     */
    public String toString() {
        return linkedException == null ? 
            super.toString() :
            super.toString() + "\n - with linked exception:\n[" +
                                linkedException.toString()+ "]";
    }
 
    /**
     * Prints this TypeConstraintException and its stack trace (including the stack trace
     * of the linkedException if it is non-null) to the PrintStream.
     *
     * @param s PrintStream to use for output
     */
    public void printStackTrace( java.io.PrintStream s ) {
        if( linkedException != null ) {
          linkedException.printStackTrace(s);
          s.println("--------------- linked to ------------------");
        }

        super.printStackTrace(s);
    }
 
    /**
     * Prints this TypeConstraintException and its stack trace (including the stack trace
     * of the linkedException if it is non-null) to {@code System.err}.
     *
     */
    public void printStackTrace() {
        printStackTrace(System.err);
    }

}
