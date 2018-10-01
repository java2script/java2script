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

package javax.xml.bind;

import javax.xml.namespace.QName;
import java.io.Serializable;

/**
 * <p>JAXB representation of an Xml Element.</p>
 *
 * <p>This class represents information about an Xml Element from both the element 
 * declaration within a schema and the element instance value within an xml document
 * with the following properties
 * <ul>
 *   <li>element's xml tag <b>{@code name}</b></li>
 *   <li><b>{@code value}</b> represents the element instance's atttribute(s) and content model</li>
 *   <li>element declaration's <b>{@code declaredType}</b> ({@code xs:element @type} attribute)</li>
 *   <li><b>{@code scope}</b> of element declaration</li>
 *   <li>boolean <b>{@code nil}</b> property. (element instance's <b>{@code xsi:nil}</b> attribute)</li>
 * </ul>
 * 
 * <p>The {@code declaredType} and {@code scope} property are the
 * JAXB class binding for the xml type definition.
 * </p>
 * 
 * <p><b>{@code Scope}</b> is either {@link GlobalScope} or the Java class representing the
 * complex type definition containing the schema element declaration.
 * </p>
 * 
 * <p>There is a property constraint that if <b>{@code value}</b> is {@code null},
 * then {@code nil} must be {@code true}. The converse is not true to enable
 * representing a nil element with attribute(s). If {@code nil} is true, it is possible
 * that {@code value} is non-null so it can hold the value of the attributes
 * associated with a nil element.
 * </p>
 * 
 * @author Kohsuke Kawaguchi, Joe Fialli
 * @since 1.6, JAXB 2.0
 */

public class JAXBElement<T> implements Serializable {

    /** xml element tag name */
    final protected QName name;

    /** Java datatype binding for xml element declaration's type. */
    final protected Class<T> declaredType;

    /** Scope of xml element declaration representing this xml element instance.
     *  Can be one of the following values:
     *  - {@link GlobalScope} for global xml element declaration.
     *  - local element declaration has a scope set to the Java class 
     *     representation of complex type defintion containing
     *     xml element declaration. 
     */
    final protected Class scope;

    /** xml element value. 
        Represents content model and attributes of an xml element instance. */
    protected T value;

    /** true iff the xml element instance has xsi:nil="true". */
    protected boolean nil = false;

    /**
     * Designates global scope for an xml element.
     */
    public static final class GlobalScope {}

    /**
     * <p>Construct an xml element instance.</p>
     * 
     * @param name          Java binding of xml element tag name
     * @param declaredType  Java binding of xml element declaration's type
     * @param scope
     *      Java binding of scope of xml element declaration.
     *      Passing null is the same as passing {@code GlobalScope.class}
     * @param value
     *      Java instance representing xml element's value.
     * @see #getScope()
     * @see #isTypeSubstituted()
     */
    public JAXBElement(QName name, 
		       Class<T> declaredType, 
		       Class scope,
		       T value) {
        if(declaredType==null || name==null)
            throw new IllegalArgumentException();
        this.declaredType = declaredType;
        if(scope==null)     scope = GlobalScope.class;
        this.scope = scope;
        this.name = name;
        setValue(value);
    }

    /**
     * Construct an xml element instance.
     *
     * This is just a convenience method for {@code new JAXBElement(name,declaredType,GlobalScope.class,value)}
     */
    public JAXBElement(QName name, Class<T> declaredType, T value ) {
        this(name,declaredType,GlobalScope.class,value);
    }

    /**
     * Returns the Java binding of the xml element declaration's type attribute.
     */
    public Class<T> getDeclaredType() {
        return declaredType;
    }

    /**
     * Returns the xml element tag name.
     */
    public QName getName() {
        return name;
    }

    /**
     * <p>Set the content model and attributes of this xml element.</p>
     *
     * <p>When this property is set to {@code null}, {@code isNil()} must by {@code true}.
     *    Details of constraint are described at {@link #isNil()}.</p>
     *
     * @see #isTypeSubstituted()
     */
    public void setValue(T t) {
        this.value = t;
    }

    /**
     * <p>Return the content model and attribute values for this element.</p>
     * 
     * <p>See {@link #isNil()} for a description of a property constraint when
     * this value is {@code null}</p>
     */
    public T getValue() {
        return value;
    }

    /**
     * Returns scope of xml element declaration.
     *
     * @see #isGlobalScope()
     * @return {@code GlobalScope.class} if this element is of global scope.
     */
    public Class getScope() {
        return scope;
    }
    
    /**
     * <p>Returns {@code true} iff this element instance content model
     * is nil.</p>
     *
     * <p>This property always returns {@code true} when {@link #getValue()} is null.
     * Note that the converse is not true, when this property is {@code true},
     * {@link #getValue()} can contain a non-null value for attribute(s). It is
     * valid for a nil xml element to have attribute(s).</p>
     */
    public boolean isNil() {
        return (value == null) || nil;
    }

    /**
     * <p>Set whether this element has nil content.</p>
     * 
     * @see #isNil()
     */
    public void setNil(boolean value) {
        this.nil = value;
    }
    
    /* Convenience methods  
     * (Not necessary but they do unambiguously conceptualize 
     *  the rationale behind this class' fields.)
     */

    /**
     * Returns true iff this xml element declaration is global.
     */
    public boolean isGlobalScope() {
        return this.scope == GlobalScope.class;
    }

    /**
     * Returns true iff this xml element instance's value has a different
     * type than xml element declaration's declared type.
     */
    public boolean isTypeSubstituted() {
        if(value==null)     return false;
        return value.getClass() != declaredType;
    }

    private static final long serialVersionUID = 1L;
}
