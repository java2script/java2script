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
 * A basic event handler interface for validation errors.
 *
 * <p>
 * If an application needs to implement customized event handling, it must
 * implement this interface and then register it with either the 
 * {@link Unmarshaller#setEventHandler(ValidationEventHandler) Unmarshaller}, 
 * the {@link Validator#setEventHandler(ValidationEventHandler) Validator}, or 
 * the {@link Marshaller#setEventHandler(ValidationEventHandler) Marshaller}.  
 * The JAXB Provider will then report validation errors and warnings encountered
 * during the unmarshal, marshal, and validate operations to these event 
 * handlers.
 *
 * <p>
 * If the {@code handleEvent} method throws an unchecked runtime exception,
 * the JAXB Provider must treat that as if the method returned false, effectively
 * terminating whatever operation was in progress at the time (unmarshal, 
 * validate, or marshal).
 * 
 * <p>
 * Modifying the Java content tree within your event handler is undefined
 * by the specification and may result in unexpected behaviour.
 *
 * <p>
 * Failing to return false from the {@code handleEvent} method after
 * encountering a fatal error is undefined by the specification and may result 
 * in unexpected behavior.
 *
 * <p>
 * <b>Default Event Handler</b>
 * <blockquote>
 *    See: <a href="Validator.html#defaulthandler">Validator javadocs</a>
 * </blockquote>
 *
 * @author <ul><li>Ryan Shoemaker, Sun Microsystems, Inc.</li>
 *             <li>Kohsuke Kawaguchi, Sun Microsystems, Inc.</li>
 *             <li>Joe Fialli, Sun Microsystems, Inc.</li></ul>
 * @see Unmarshaller
 * @see Validator
 * @see Marshaller
 * @see ValidationEvent
 * @see javax.xml.bind.util.ValidationEventCollector
 * @since 1.6, JAXB 1.0
 */
public interface ValidationEventHandler {
    /**
     * Receive notification of a validation warning or error.  
     * 
     * The ValidationEvent will have a 
     * {@link ValidationEventLocator ValidationEventLocator} embedded in it that 
     * indicates where the error or warning occurred.
     *
     * <p>
     * If an unchecked runtime exception is thrown from this method, the JAXB
     * provider will treat it as if the method returned false and interrupt
     * the current unmarshal, validate, or marshal operation.
     * 
     * @param event the encapsulated validation event information.  It is a 
     * provider error if this parameter is null.
     * @return true if the JAXB Provider should attempt to continue the current
     *         unmarshal, validate, or marshal operation after handling this 
     *         warning/error, false if the provider should terminate the current 
     *         operation with the appropriate {@code UnmarshalException},
     *         {@code ValidationException}, or {@code MarshalException}.
     * @throws IllegalArgumentException if the event object is null.
     */
    public boolean handleEvent( ValidationEvent event );
    
}

