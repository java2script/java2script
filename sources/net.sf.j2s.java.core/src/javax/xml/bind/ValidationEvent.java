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
 * This event indicates that a problem was encountered while validating the    
 * incoming XML data during an unmarshal operation, while performing 
 * on-demand validation of the Java content tree, or while marshalling the
 * Java content tree back to XML data.
 * 
 * @author <ul><li>Ryan Shoemaker, Sun Microsystems, Inc.</li><li>Kohsuke Kawaguchi, Sun Microsystems, Inc.</li><li>Joe Fialli, Sun Microsystems, Inc.</li></ul> 
 * @see Validator
 * @see ValidationEventHandler
 * @since 1.6, JAXB 1.0
 */
public interface ValidationEvent {
    
    /** 
     * Conditions that are not errors or fatal errors as defined by the 
     * XML 1.0 recommendation 
     */
    public static final int WARNING     = 0;
    
    /**
     * Conditions that correspond to the definition of "error" in section 
     * 1.2 of the W3C XML 1.0 Recommendation
     */
    public static final int ERROR       = 1;
    
    /**
     * Conditions that correspond to the definition of "fatal error" in section 
     * 1.2 of the W3C XML 1.0 Recommendation
     */
    public static final int FATAL_ERROR = 2;

    /**
     * Retrieve the severity code for this warning/error. 
     *
     * <p>
     * Must be one of {@code ValidationEvent.WARNING},
     * {@code ValidationEvent.ERROR}, or {@code ValidationEvent.FATAL_ERROR}.
     *
     * @return the severity code for this warning/error
     */
    public int getSeverity();
    
    /**
     * Retrieve the text message for this warning/error.
     *
     * @return the text message for this warning/error or null if one wasn't set
     */
    public String getMessage();
    
    /**
     * Retrieve the linked exception for this warning/error.
     *
     * @return the linked exception for this warning/error or null if one
     *         wasn't set
     */
    public Throwable getLinkedException();
    
    /**
     * Retrieve the locator for this warning/error.
     *
     * @return the locator that indicates where the warning/error occurred
     */
    public ValidationEventLocator getLocator();
    
}
