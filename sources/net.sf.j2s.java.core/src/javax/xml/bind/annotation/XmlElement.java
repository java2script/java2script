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
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.RetentionPolicy.*;

/**
 * Maps a JavaBean property to a XML element derived from property name.
 *
 * <p> <b>Usage</b>
 * <p>
 * {@code @XmlElement} annotation can be used with the following program
 * elements:
 * <ul>
 *   <li> a JavaBean property </li>
 *   <li> non static, non transient field </li>
 *   <li> within {@link XmlElements}
 * </ul>
 *
 * The usage is subject to the following constraints:
 * <ul>
 *   <li> This annotation can be used with following annotations:
 *            {@link XmlID},
 *            {@link XmlIDREF},
 *            {@link XmlList},
 *            {@link XmlSchemaType},
 *            {@link XmlValue},
 *            {@link XmlAttachmentRef},
 *            {@link XmlMimeType},
 *            {@link XmlInlineBinaryData},
 *            {@link XmlElementWrapper},
 *            {@link XmlJavaTypeAdapter}</li>
 *   <li> if the type of JavaBean property is a collection type of
 *        array, an indexed property, or a parameterized list, and
 *        this annotation is used with {@link XmlElements} then,
 *        {@code @XmlElement.type()} must be DEFAULT.class since the
 *        collection item type is already known. </li>
 * </ul>
 *
 * <p>
 * A JavaBean property, when annotated with @XmlElement annotation
 * is mapped to a local element in the XML Schema complex type to
 * which the containing class is mapped.
 *
 * <p>
 * <b>Example 1: </b> Map a public non static non final field to local
 * element
 * <pre>
 *     //Example: Code fragment
 *     public class USPrice {
 *        {@literal @}XmlElement(name="itemprice")
 *         public java.math.BigDecimal price;
 *     }
 * {@code
 *
 *     <!-- Example: Local XML Schema element -->
 *     <xs:complexType name="USPrice"/>
 *       <xs:sequence>
 *         <xs:element name="itemprice" type="xs:decimal" minOccurs="0"/>
 *       </sequence>
 *     </xs:complexType>
 *   }</pre>
 * <p>
 *
 * <b> Example 2: </b> Map a field to a nillable element.
 *   <pre>
 *     //Example: Code fragment
 *     public class USPrice {
 *        {@literal @}XmlElement(nillable=true)
 *         public java.math.BigDecimal price;
 *     }
 * {@code
 *
 *     <!-- Example: Local XML Schema element -->
 *     <xs:complexType name="USPrice">
 *       <xs:sequence>
 *         <xs:element name="price" type="xs:decimal" nillable="true" minOccurs="0"/>
 *       </sequence>
 *     </xs:complexType>
 *   }</pre>
 * <p>
 * <b> Example 3: </b> Map a field to a nillable, required element.
 *   <pre>
 *     //Example: Code fragment
 *     public class USPrice {
 *        {@literal @}XmlElement(nillable=true, required=true)
 *         public java.math.BigDecimal price;
 *     }
 * {@code
 *
 *     <!-- Example: Local XML Schema element -->
 *     <xs:complexType name="USPrice">
 *       <xs:sequence>
 *         <xs:element name="price" type="xs:decimal" nillable="true" minOccurs="1"/>
 *       </sequence>
 *     </xs:complexType>
 *   }</pre>
 *
 * <p> <b>Example 4: </b>Map a JavaBean property to an XML element
 * with anonymous type.</p>
 * <p>
 * See Example 6 in @{@link XmlType}.
 *
 * @author Sekhar Vajjhala, Sun Microsystems, Inc.
 * @since 1.6, JAXB 2.0
 */

@Retention(RUNTIME) @Target({FIELD, METHOD, PARAMETER})
public @interface XmlElement {
    /**
     * Name of the XML Schema element.
     * <p> If the value is "##default", then element name is derived from the
     * JavaBean property name.
     */
    String name() default "##default";

    /**
     * Customize the element declaration to be nillable.
     * <p>If nillable() is true, then the JavaBean property is
     * mapped to a XML Schema nillable element declaration.
     */
    boolean nillable() default false;

    /**
     * Customize the element declaration to be required.
     * <p>If required() is true, then Javabean property is mapped to
     * an XML schema element declaration with minOccurs="1".
     * maxOccurs is "1" for a single valued property and "unbounded"
     * for a multivalued property.
     * <p>If required() is false, then the Javabean property is mapped
     * to XML Schema element declaration with minOccurs="0".
     * maxOccurs is "1" for a single valued property and "unbounded"
     * for a multivalued property.
     */

    boolean required() default false;

    /**
     * XML target namespace of the XML Schema element.
     * <p>
     * If the value is "##default", then the namespace is determined
     * as follows:
     * <ol>
     *  <li>
     *  If the enclosing package has {@link XmlSchema} annotation,
     *  and its {@link XmlSchema#elementFormDefault() elementFormDefault}
     *  is {@link XmlNsForm#QUALIFIED QUALIFIED}, then the namespace of
     *  the enclosing class.
     *
     *  <li>
     *  Otherwise {@literal ''} (which produces unqualified element in the default
     *  namespace.
     * </ol>
     */
    String namespace() default "##default";

    /**
     * Default value of this element.
     *
     * <p>
     * The <pre>'\u0000'</pre> value specified as a default of this annotation element
     * is used as a poor-man's substitute for null to allow implementations
     * to recognize the 'no default value' state.
     */
    String defaultValue() default "\u0000";

    /**
     * The Java class being referenced.
     */
    Class type() default DEFAULT.class;

    /**
     * Used in {@link XmlElement#type()} to
     * signal that the type be inferred from the signature
     * of the property.
     */
    static final class DEFAULT {}
}
