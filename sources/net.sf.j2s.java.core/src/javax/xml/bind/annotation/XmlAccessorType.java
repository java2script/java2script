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

import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.lang.annotation.Target;
import java.lang.annotation.Retention;
import java.lang.annotation.Inherited;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.*;

/**
 * <p> Controls whether fields or Javabean properties are serialized by default. </p>
 * 
 * <p> <b> Usage </b> </p>
 *
 * <p> {@code @XmlAccessorType} annotation can be used with the following program elements:</p>
 * 
 * <ul> 
 *   <li> package</li>
 *   <li> a top level class </li>
 * </ul>
 *
 * <p> See "Package Specification" in javax.xml.bind.package javadoc for
 * additional common information.</p>
 *
 * <p>This annotation provides control over the default serialization
 * of properties and fields in a class.
 * 
 * <p>The annotation {@code @XmlAccessorType} on a package applies to
 * all classes in the package. The following inheritance
 * semantics apply:
 *
 * <ul>
 *   <li> If there is a {@code @XmlAccessorType} on a class, then it
 *        is used. </li>  
 *   <li> Otherwise, if a {@code @XmlAccessorType} exists on one of
 *        its super classes, then it is inherited.
 *   <li> Otherwise, the {@code @XmlAccessorType} on a package is
 *        inherited.
 * </ul>
 * <p> <b> Defaulting Rules: </b> </p>
 *
 * <p>By default, if {@code @XmlAccessorType} on a package is absent,
 * then the following package level annotation is assumed.</p>
 * <pre>
 *   &#64;XmlAccessorType(XmlAccessType.PUBLIC_MEMBER)
 * </pre>
 * <p> By default, if {@code @XmlAccessorType} on a class is absent,
 * and none of its super classes is annotated with
 * {@code @XmlAccessorType}, then the following default on the class
 * is assumed: </p>
 * <pre>
 *   &#64;XmlAccessorType(XmlAccessType.PUBLIC_MEMBER)
 * </pre>
 * <p>This annotation can be used with the following annotations: 
 *    {@link XmlType}, {@link XmlRootElement}, {@link XmlAccessorOrder}, 
 *    {@link XmlSchema}, {@link XmlSchemaType}, {@link XmlSchemaTypes}, 
 *    , {@link XmlJavaTypeAdapter}. It can also be used with the
 *    following annotations at the package level: {@link XmlJavaTypeAdapter}.
 *
 * @author Sekhar Vajjhala, Sun Microsystems, Inc.
 * @since 1.6, JAXB 2.0
 * @see XmlAccessType
 */

@Inherited @Retention(RUNTIME) @Target({PACKAGE, TYPE})
public @interface XmlAccessorType {

    /**
     * Specifies whether fields or properties are serialized. 
     * 
     * @see XmlAccessType
     */
    XmlAccessType value() default XmlAccessType.PUBLIC_MEMBER;
}
