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

import javax.activation.DataHandler;
import static java.lang.annotation.ElementType.*;
import java.lang.annotation.Retention;
import static java.lang.annotation.RetentionPolicy.RUNTIME;
import java.lang.annotation.Target;

/**
 * Marks a field/property that its XML form is a uri reference to mime content.
 * The mime content is optimally stored out-of-line as an attachment.
 *
 * A field/property must always map to the {@link DataHandler} class.
 *
 * <h2>Usage</h2>
 * <pre>
 * &#64;{@link XmlRootElement}
 * class Foo {
 *   &#64;{@link XmlAttachmentRef}
 *   &#64;{@link XmlAttribute}
 *   {@link DataHandler} data;
 *
 *   &#64;{@link XmlAttachmentRef}
 *   &#64;{@link XmlElement}
 *   {@link DataHandler} body;
 * }
 * </pre>
 * The above code maps to the following XML:
 * <pre>{@code
 * <xs:element name="foo" xmlns:ref="http://ws-i.org/profiles/basic/1.1/xsd">
 *   <xs:complexType>
 *     <xs:sequence>
 *       <xs:element name="body" type="ref:swaRef" minOccurs="0" />
 *     </xs:sequence>
 *     <xs:attribute name="data" type="ref:swaRef" use="optional" />
 *   </xs:complexType>
 * </xs:element>
 * }</pre>
 *
 * <p>
 * The above binding supports WS-I AP 1.0 <a href="http://www.ws-i.org/Profiles/AttachmentsProfile-1.0-2004-08-24.html#Referencing_Attachments_from_the_SOAP_Envelope">WS-I Attachments Profile Version 1.0.</a>
 *
 * @author Kohsuke Kawaguchi
 * @since 1.6, JAXB 2.0
 */
@Retention(RUNTIME)
@Target({FIELD,METHOD,PARAMETER})
public @interface XmlAttachmentRef {
}
