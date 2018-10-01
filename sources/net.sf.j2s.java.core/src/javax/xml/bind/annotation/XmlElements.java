/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2004-2017 Oracle and/or its affiliates. All rights reserved.
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

import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import static java.lang.annotation.RetentionPolicy.RUNTIME;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

/**
 * <p>
 * A container for multiple @{@link XmlElement} annotations.
 *
 * Multiple annotations of the same type are not allowed on a program
 * element. This annotation therefore serves as a container annotation
 * for multiple &#64;XmlElements as follows:
 *
 * <pre>
 * &#64;XmlElements({ @XmlElement(...),@XmlElement(...) })
 * </pre>
 *
 * <p>The {@code @XmlElements} annotation can be used with the
 * following program elements: </p>
 * <ul>
 *   <li> a JavaBean property </li>
 *   <li> non static, non transient field </li>
 * </ul>
 *
 * This annotation is intended for annotation a JavaBean collection
 * property (e.g. List). 
 *
 * <p><b>Usage</b></p>
 *
 * <p>The usage is subject to the following constraints:
 * <ul>
 *   <li> This annotation can be used with the following
 *        annotations: @{@link XmlIDREF}, @{@link XmlElementWrapper}. </li>
 *   <li> If @XmlIDREF is also specified on the JavaBean property,
 *        then each &#64;XmlElement.type() must contain a JavaBean
 *        property annotated with {@code @XmlID}.</li>
 * </ul>
 *
 * <p>See "Package Specification" in javax.xml.bind.package javadoc for
 * additional common information.</p>
 *
 * <hr>
 * 
 * <p><b>Example 1:</b> Map to a list of elements</p>
 * <pre>
 *    
 *    // Mapped code fragment
 *    public class Foo {
 *        &#64;XmlElements(
 *            &#64;XmlElement(name="A", type=Integer.class),
 *            &#64;XmlElement(name="B", type=Float.class)
 *         )
 *         public List items;
 *    }
 * {@code
 * 
 *    <!-- XML Representation for a List of {1,2.5} 
 *            XML output is not wrapped using another element -->
 *    ...
 *    <A> 1 </A>
 *    <B> 2.5 </B>
 *    ...
 *
 *    <!-- XML Schema fragment -->
 *    <xs:complexType name="Foo">
 *      <xs:sequence>
 *        <xs:choice minOccurs="0" maxOccurs="unbounded">
 *          <xs:element name="A" type="xs:int"/>
 *          <xs:element name="B" type="xs:float"/>
 *        <xs:choice>
 *      </xs:sequence>
 *    </xs:complexType>
 *
 * }</pre>
 *
 * <p><b>Example 2:</b> Map to a list of elements wrapped with another element
 * </p>
 * <pre>
 * 
 *    // Mapped code fragment
 *    public class Foo {
 *        &#64;XmlElementWrapper(name="bar")
 *        &#64;XmlElements(
 *            &#64;XmlElement(name="A", type=Integer.class),
 *            &#64;XmlElement(name="B", type=Float.class)
 *        }
 *        public List items;
 *    }
 * {@code
 * 
 *    <!-- XML Schema fragment -->
 *    <xs:complexType name="Foo">
 *      <xs:sequence>
 *        <xs:element name="bar">
 *          <xs:complexType>
 *            <xs:choice minOccurs="0" maxOccurs="unbounded">
 *              <xs:element name="A" type="xs:int"/>
 *              <xs:element name="B" type="xs:float"/>
 *            </xs:choice>
 *          </xs:complexType>
 *        </xs:element>
 *      </xs:sequence>
 *    </xs:complexType>
 * }</pre>
 *
 * <p><b>Example 3:</b> Change element name based on type using an adapter. 
 * </p>
 * <pre>
 *    class Foo {
 *       &#64;XmlJavaTypeAdapter(QtoPAdapter.class)
 *       &#64;XmlElements({
 *           &#64;XmlElement(name="A",type=PX.class),
 *           &#64;XmlElement(name="B",type=PY.class)
 *       })
 *       Q bar;
 *    }
 * 
 *    &#64;XmlType abstract class P {...}
 *    &#64;XmlType(name="PX") class PX extends P {...}
 *    &#64;XmlType(name="PY") class PY extends P {...}
 * {@code
 * 
 *    <!-- XML Schema fragment -->
 *    <xs:complexType name="Foo">
 *      <xs:sequence>
 *        <xs:element name="bar">
 *          <xs:complexType>
 *            <xs:choice minOccurs="0" maxOccurs="unbounded">
 *              <xs:element name="A" type="PX"/>
 *              <xs:element name="B" type="PY"/>
 *            </xs:choice>
 *          </xs:complexType>
 *        </xs:element>
 *      </xs:sequence>
 *    </xs:complexType>
 * }</pre>
 * 
 * @author <ul><li>Kohsuke Kawaguchi, Sun Microsystems, Inc.</li><li>Sekhar Vajjhala, Sun Microsystems, Inc.</li></ul>
 * @see XmlElement 
 * @see XmlElementRef
 * @see XmlElementRefs
 * @see XmlJavaTypeAdapter
 * @since 1.6, JAXB 2.0
 */
@Retention(RUNTIME) @Target({FIELD,METHOD})
public @interface XmlElements {
    /**
     * Collection of @{@link XmlElement} annotations
     */
    XmlElement[] value();
}
