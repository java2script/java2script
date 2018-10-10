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

package javax.xml.bind.helpers;

import java.text.MessageFormat;

import javax.xml.bind.ValidationEvent;
import javax.xml.bind.ValidationEventLocator;

/**
 * Default implementation of the ValidationEvent interface.
 * 
 * <p>
 * JAXB providers are allowed to use whatever class that implements
 * the ValidationEvent interface. This class is just provided for a
 * convenience.
 *
 * @author <ul><li>Kohsuke Kawaguchi, Sun Microsystems, Inc.</li></ul> 
 * @see javax.xml.bind.Validator
 * @see javax.xml.bind.ValidationEventHandler
 * @see javax.xml.bind.ValidationEvent
 * @see javax.xml.bind.ValidationEventLocator
 * @since 1.6, JAXB 1.0
 */
public class ValidationEventImpl implements ValidationEvent
{
    
    /**
     * Create a new ValidationEventImpl.
     * 
     * @param _severity The severity value for this event.  Must be one of
     * ValidationEvent.WARNING, ValidationEvent.ERROR, or 
     * ValidationEvent.FATAL_ERROR
     * @param _message The text message for this event - may be null.
     * @param _locator The locator object for this event - may be null.
     * @throws IllegalArgumentException if an illegal severity field is supplied
     */
    public ValidationEventImpl( int _severity, String _message, 
                                 ValidationEventLocator _locator ) {
        
        this(_severity,_message,_locator,null);
    }

    /**
     * Create a new ValidationEventImpl.
     * 
     * @param _severity The severity value for this event.  Must be one of
     * ValidationEvent.WARNING, ValidationEvent.ERROR, or 
     * ValidationEvent.FATAL_ERROR
     * @param _message The text message for this event - may be null.
     * @param _locator The locator object for this event - may be null.
     * @param _linkedException An optional linked exception that may provide
     * additional information about the event - may be null.
     * @throws IllegalArgumentException if an illegal severity field is supplied
     */
    public ValidationEventImpl( int _severity, String _message, 
                                 ValidationEventLocator _locator, 
                                 Throwable _linkedException ) {
    
        setSeverity( _severity );
        this.message = _message;
        this.locator = _locator;
        this.linkedException = _linkedException;
    }
    
    private int severity;
    private String message;
    private Throwable linkedException;
    private ValidationEventLocator locator;
    
    public int getSeverity() {
        return severity;
    }
    
    
    /**
     * Set the severity field of this event.  
     * 
     * @param _severity Must be one of ValidationEvent.WARNING, 
     * ValidationEvent.ERROR, or ValidationEvent.FATAL_ERROR.
     * @throws IllegalArgumentException if an illegal severity field is supplied
     */
    public void setSeverity( int _severity ) {
        
        if( _severity != ValidationEvent.WARNING && 
            _severity != ValidationEvent.ERROR && 
            _severity != ValidationEvent.FATAL_ERROR ) {
                throw new IllegalArgumentException( 
                    Messages.format( Messages.ILLEGAL_SEVERITY ) );
        }

        this.severity = _severity;
    }
    
    public String getMessage() {
        return message;
    }
    /**
     * Set the message field of this event.
     * 
     * @param _message String message - may be null.
     */
    public void setMessage( String _message ) {
        this.message = _message;
    }
    
    public Throwable getLinkedException() {
        return linkedException;
    }
    /**
     * Set the linked exception field of this event.
     * 
     * @param _linkedException Optional linked exception - may be null.
     */
    public void setLinkedException( Throwable _linkedException ) {
        this.linkedException = _linkedException;
    }
    
    public ValidationEventLocator getLocator() {
        return locator;
    }
    /**
     * Set the locator object for this event.
     * 
     * @param _locator The locator - may be null.
     */
    public void setLocator( ValidationEventLocator _locator ) {
        this.locator = _locator;
    }
    
    /**
     * Returns a string representation of this object in a format
     * helpful to debugging.
     * 
     * @see Object#equals(Object)
     */
    public String toString() {
        String s;
        switch(getSeverity()) {
        case WARNING:   s="WARNING";break;
        case ERROR: s="ERROR";break;
        case FATAL_ERROR: s="FATAL_ERROR";break;
        default: s=String.valueOf(getSeverity());break;
        }
        return MessageFormat.format("[severity={0},message={1},locator={2}]",
            new Object[]{
                s,
                getMessage(),
                getLocator()
            });
    }
}
