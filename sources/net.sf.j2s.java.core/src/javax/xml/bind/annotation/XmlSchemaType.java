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

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.PACKAGE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * Maps a Java type to a simple schema built-in type.
 *
 * <p> <b>Usage</b> </p>
 * <p>
 * {@code @XmlSchemaType} annotation can be used with the following program
 * elements: 
 * <ul> 
 *   <li> a JavaBean property </li>
 *   <li> field </li>
 *   <li> package</li>
 * </ul>
 *
 * <p> {@code @XmlSchemaType} annotation defined for Java type
 * applies to all references to the Java type from a property/field. 
 * A {@code @XmlSchemaType} annotation specified on the
 * property/field overrides the {@code @XmlSchemaType} annotation
 * specified at the package level.
 *
 * <p> This annotation can be used with the following annotations:
 * {@link XmlElement},  {@link XmlAttribute}.
 * <p>
 * <b>Example 1: </b> Customize mapping of XMLGregorianCalendar on the
 *  field.
 * 
 * <pre>
 *     //Example: Code fragment
 *     public class USPrice {
 *         &#64;XmlElement
 *         &#64;XmlSchemaType(name="date")
 *         public XMLGregorianCalendar date;
 *     }
 * {@code
 * 
 *     <!-- Example: Local XML Schema element -->
 *     <xs:complexType name="USPrice"/>
 *       <xs:sequence>
 *         <xs:element name="date" type="xs:date"/>
 *       </sequence>
 *     </xs:complexType>
 * }</pre>
 *
 * <p> <b> Example 2: </b> Customize mapping of XMLGregorianCalendar at package
 *     level </p>
 * <pre>
 *     package foo;
 *     &#64;javax.xml.bind.annotation.XmlSchemaType(
 *          name="date", type=javax.xml.datatype.XMLGregorianCalendar.class)
 *     }
 * </pre>
 * 
 * @since 1.6, JAXB 2.0
 */

@Retention(RUNTIME) @Target({FIELD,METHOD,PACKAGE})        
public @interface XmlSchemaType {
    String name();
    String namespace() default "http://www.w3.org/2001/XMLSchema";
    /**
     * If this annotation is used at the package level, then value of
     * the type() must be specified.
     */

    Class type() default DEFAULT.class;

    /**
     * Used in {@link XmlSchemaType#type()} to
     * signal that the type be inferred from the signature
     * of the property.
     */

    static final class DEFAULT {}

}



