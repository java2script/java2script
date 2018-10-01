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

package javax.xml.bind.annotation.adapters;

import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.XmlElementRefs;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlSchema;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlSchemaTypes;
import java.lang.annotation.Target;
import java.lang.annotation.Retention;

import static java.lang.annotation.RetentionPolicy.RUNTIME;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.ElementType.PACKAGE;


/**
 * Use an adapter that implements {@link XmlAdapter} for custom marshaling.
 *
 * <p> <b> Usage: </b> </p>
 *
 * <p> The {@code @XmlJavaTypeAdapter} annotation can be used with the
 * following program elements:  
 * <ul> 
 *   <li> a JavaBean property </li>
 *   <li> field </li>
 *   <li> parameter </li>
 *   <li> package </li>
 *   <li> from within {@link XmlJavaTypeAdapters} </li>
 * </ul>
 *
 * <p> When {@code @XmlJavaTypeAdapter} annotation is defined on a
 * class, it applies to all references to the class.
 * <p> When {@code @XmlJavaTypeAdapter} annotation is defined at the
 * package level it applies to all references from within the package
 * to {@code @XmlJavaTypeAdapter.type()}.
 * <p> When {@code @XmlJavaTypeAdapter} annotation is defined on the
 * field, property or parameter, then the annotation applies to the
 * field, property or the parameter only.
 * <p> A {@code @XmlJavaTypeAdapter} annotation on a field, property
 * or parameter overrides the {@code @XmlJavaTypeAdapter} annotation
 * associated with the class being referenced by the field, property
 * or parameter.  
 * <p> A {@code @XmlJavaTypeAdapter} annotation on a class overrides
 * the {@code @XmlJavaTypeAdapter} annotation specified at the
 * package level for that class.
 *
 * <p>This annotation can be used with the following other annotations:
 * {@link XmlElement}, {@link XmlAttribute}, {@link XmlElementRef},
 * {@link XmlElementRefs}, {@link XmlAnyElement}. This can also be
 * used at the package level with the following annotations:
 * {@link XmlAccessorType}, {@link XmlSchema}, {@link XmlSchemaType},
 * {@link XmlSchemaTypes}. 
 * 
 * <p><b> Example: </b> See example in {@link XmlAdapter}
 *
 * @author <ul><li>Sekhar Vajjhala, Sun Microsystems Inc.</li> <li> Kohsuke Kawaguchi, Sun Microsystems Inc.</li></ul>
 * @since 1.6, JAXB 2.0
 * @see XmlAdapter
 */

@Retention(RUNTIME) @Target({PACKAGE,FIELD,METHOD,TYPE,PARAMETER})        
public @interface XmlJavaTypeAdapter {
    /**
     * Points to the class that converts a value type to a bound type or vice versa.
     * See {@link XmlAdapter} for more details.
     */
    Class<? extends XmlAdapter> value();

    /**
     * If this annotation is used at the package level, then value of
     * the type() must be specified.
     */

    Class type() default DEFAULT.class;

    /**
     * Used in {@link XmlJavaTypeAdapter#type()} to
     * signal that the type be inferred from the signature
     * of the field, property, parameter or the class.
     */

    static final class DEFAULT {}
    
}
