/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2005-2017 Oracle and/or its affiliates. All rights reserved.
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

package javax.xml.bind.annotation;

import javax.xml.bind.ValidationEventHandler;
import javax.xml.transform.Result;
import javax.xml.transform.Source;

/**
 * Converts an element (and its descendants)
 * from/to DOM (or similar) representation.
 *
 * <p>
 * Implementations of this interface will be used in conjunction with
 * {@link XmlAnyElement} annotation to map an element of XML into a representation
 * of infoset such as W3C DOM.
 *
 * <p>
 * Implementations hide how a portion of XML is converted into/from such
 * DOM-like representation, allowing JAXB providers to work with arbitrary
 * such library.
 *
 * <P>
 * This interface is intended to be implemented by library writers
 * and consumed by JAXB providers. None of those methods are intended to
 * be called from applications.
 *
 * @author Kohsuke Kawaguchi
 * @since 1.6, JAXB 2.0
 */
public interface DomHandler<ElementT,ResultT extends Result> {
    /**
     * When a JAXB provider needs to unmarshal a part of a document into an
     * infoset representation, it first calls this method to create a
     * {@link Result} object.
     *
     * <p>
     * A JAXB provider will then send a portion of the XML
     * into the given result. Such a portion always form a subtree
     * of the whole XML document rooted at an element.
     *
     * @param errorHandler
     *      if any error happens between the invocation of this method
     *      and the invocation of {@link #getElement(Result)}, they
     *      must be reported to this handler.
     *
     *      The caller must provide a non-null error handler.
     *
     *      The {@link Result} object created from this method
     *      may hold a reference to this error handler.
     *
     * @return
     *      null if the operation fails. The error must have been reported
     *      to the error handler.
     */
    ResultT createUnmarshaller( ValidationEventHandler errorHandler );

    /**
     * Once the portion is sent to the {@link Result}. This method is called
     * by a JAXB provider to obtain the unmarshalled element representation.
     *
     * <p>
     * Multiple invocations of this method may return different objects.
     * This method can be invoked only when the whole sub-tree are fed
     * to the {@link Result} object.
     *
     * @param rt
     *      The {@link Result} object created by {@link #createUnmarshaller(ValidationEventHandler)}.
     *
     * @return
     *      null if the operation fails. The error must have been reported
     *      to the error handler.
     */
    ElementT getElement(ResultT rt);

    /**
     * This method is called when a JAXB provider needs to marshal an element
     * to XML.
     *
     * <p>
     * If non-null, the returned {@link Source} must contain a whole document
     * rooted at one element, which will then be weaved into a bigger document
     * that the JAXB provider is marshalling.
     *
     * @param errorHandler
     *      Receives any errors happened during the process of converting
     *      an element into a {@link Source}.
     *
     *      The caller must provide a non-null error handler.
     *
     * @return
     *      null if there was an error. The error should have been reported
     *      to the handler.
     */
    Source marshal( ElementT n, ValidationEventHandler errorHandler );
}
