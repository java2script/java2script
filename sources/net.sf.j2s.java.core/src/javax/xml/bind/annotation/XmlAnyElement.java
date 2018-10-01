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

import org.w3c.dom.Element;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.util.List;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * Maps a JavaBean property to XML infoset representation and/or JAXB element.
 *
 * <p>
 * This annotation serves as a "catch-all" property while unmarshalling 
 * xml content into a instance of a JAXB annotated class. It typically
 * annotates a multi-valued JavaBean property, but it can occur on
 * single value JavaBean property. During unmarshalling, each xml element 
 * that does not match a static &#64;XmlElement or &#64;XmlElementRef 
 * annotation for the other JavaBean properties on the class, is added to this 
 * "catch-all" property.
 *
 * <h2>Usages:</h2>
 * <pre>
 * &#64;XmlAnyElement
 * public {@link Element}[] others;
 * 
 * // Collection of {@link Element} or JAXB elements.
 * &#64;XmlAnyElement(lax="true")
 * public {@link Object}[] others;
 *
 * &#64;XmlAnyElement
 * private List&lt;{@link Element}&gt; nodes;
 *
 * &#64;XmlAnyElement
 * private {@link Element} node;
 * </pre>
 *
 * <h2>Restriction usage constraints</h2>
 * <p>
 * This annotation is mutually exclusive with
 * {@link XmlElement}, {@link XmlAttribute}, {@link XmlValue},
 * {@link XmlElements}, {@link XmlID}, and {@link XmlIDREF}.
 *
 * <p>
 * There can be only one {@link XmlAnyElement} annotated JavaBean property
 * in a class and its super classes.
 *
 * <h2>Relationship to other annotations</h2>
 * <p>
 * This annotation can be used with {@link XmlJavaTypeAdapter}, so that users
 * can map their own data structure to DOM, which in turn can be composed 
 * into XML.
 *
 * <p>
 * This annotation can be used with {@link XmlMixed} like this:
 * <pre>
 * // List of java.lang.String or DOM nodes.
 * &#64;XmlAnyElement &#64;XmlMixed
 * List&lt;Object&gt; others;
 * </pre>
 *
 *
 * <h2>Schema To Java example</h2>
 *
 * The following schema would produce the following Java class:
 * <pre>{@code
 * <xs:complexType name="foo">
 *   <xs:sequence>
 *     <xs:element name="a" type="xs:int" />
 *     <xs:element name="b" type="xs:int" />
 *     <xs:any namespace="##other" processContents="lax" minOccurs="0" maxOccurs="unbounded" />
 *   </xs:sequence>
 * </xs:complexType>
 * }</pre>
 *
 * <pre>
 * class Foo {
 *   int a;
 *   int b;
 *   &#64;{@link XmlAnyElement}
 *   List&lt;Element&gt; any;
 * }
 * </pre>
 *
 * It can unmarshal instances like
 *
 * <pre>{@code
 * <foo xmlns:e="extra">
 *   <a>1</a>
 *   <e:other />  // this will be bound to DOM, because unmarshalling is orderless
 *   <b>3</b>
 *   <e:other />
 *   <c>5</c>     // this will be bound to DOM, because the annotation doesn't remember namespaces.
 * </foo>
 * }</pre>
 *
 *
 *
 * The following schema would produce the following Java class:
 * <pre>{@code
 * <xs:complexType name="bar">
 *   <xs:complexContent>
 *   <xs:extension base="foo">
 *     <xs:sequence>
 *       <xs:element name="c" type="xs:int" />
 *       <xs:any namespace="##other" processContents="lax" minOccurs="0" maxOccurs="unbounded" />
 *     </xs:sequence>
 *   </xs:extension>
 * </xs:complexType>
 * }</pre>
 *
 * <pre>
 * class Bar extends Foo {
 *   int c;
 *   // Foo.getAny() also represents wildcard content for type definition bar.
 * }
 * </pre>
 *
 *
 * It can unmarshal instances like
 *
 * <pre>{@code
 * <bar xmlns:e="extra">
 *   <a>1</a>
 *   <e:other />  // this will be bound to DOM, because unmarshalling is orderless
 *   <b>3</b>
 *   <e:other />
 *   <c>5</c>     // this now goes to Bar.c
 *   <e:other />  // this will go to Foo.any
 * </bar>
 * }</pre>
 *
 *
 *
 *
 * <h2>Using {@link XmlAnyElement} with {@link XmlElementRef}</h2>
 * <p>
 * The {@link XmlAnyElement} annotation can be used with {@link XmlElementRef}s to
 * designate additional elements that can participate in the content tree.
 *
 * <p>
 * The following schema would produce the following Java class:
 * <pre>{@code
 * <xs:complexType name="foo">
 *   <xs:choice maxOccurs="unbounded" minOccurs="0">
 *     <xs:element name="a" type="xs:int" />
 *     <xs:element name="b" type="xs:int" />
 *     <xs:any namespace="##other" processContents="lax" />
 *   </xs:choice>
 * </xs:complexType>
 * }</pre>
 *
 * <pre>
 * class Foo {
 *   &#64;{@link XmlAnyElement}(lax="true")
 *   &#64;{@link XmlElementRefs}({
 *     &#64;{@link XmlElementRef}(name="a", type="JAXBElement.class")
 *     &#64;{@link XmlElementRef}(name="b", type="JAXBElement.class")
 *   })
 *   {@link List}&lt;{@link Object}&gt; others;
 * }
 *
 * &#64;XmlRegistry
 * class ObjectFactory {
 *   ...
 *   &#64;XmlElementDecl(name = "a", namespace = "", scope = Foo.class)
 *   {@link JAXBElement}&lt;Integer&gt; createFooA( Integer i ) { ... }
 *
 *   &#64;XmlElementDecl(name = "b", namespace = "", scope = Foo.class)
 *   {@link JAXBElement}&lt;Integer&gt; createFooB( Integer i ) { ... }
 * </pre>
 *
 * It can unmarshal instances like
 *
 * <pre>
 *{@code <foo xmlns:e="extra">}
 *{@code   <a>1</a>}     // this will unmarshal to a {@link JAXBElement} instance whose value is 1.
 *{@code   <e:other />}  // this will unmarshal to a DOM {@link Element}.
 *{@code   <b>3</b>}     // this will unmarshal to a {@link JAXBElement} instance whose value is 1.
 *{@code </foo>}
 * </pre>
 *
 *
 *
 *
 * <h2>W3C XML Schema "lax" wildcard emulation</h2>
 * The lax element of the annotation enables the emulation of the "lax" wildcard semantics.
 * For example, when the Java source code is annotated like this:
 * <pre>
 * &#64;{@link XmlRootElement}
 * class Foo {
 *   &#64;XmlAnyElement(lax=true)
 *   public {@link Object}[] others;
 * }
 * </pre>
 * then the following document will unmarshal like this:
 * <pre>{@code
 * <foo>
 *   <unknown />
 *   <foo />
 * </foo>
 *
 * Foo foo = unmarshal();
 * // 1 for 'unknown', another for 'foo'
 * assert foo.others.length==2;
 * // 'unknown' unmarshals to a DOM element
 * assert foo.others[0] instanceof Element;
 * // because of lax=true, the 'foo' element eagerly
 * // unmarshals to a Foo object.
 * assert foo.others[1] instanceof Foo;
 * }</pre>
 *
 * @author Kohsuke Kawaguchi
 * @since 1.6, JAXB 2.0
 */
@Retention(RUNTIME)
@Target({FIELD,METHOD})
public @interface XmlAnyElement {

    /**
     * Controls the unmarshaller behavior when it sees elements
     * known to the current {@link JAXBContext}.
     *
     * <h3>When false</h3>
     * <p>
     * If false, all the elements that match the property will be unmarshalled
     * to DOM, and the property will only contain DOM elements.
     *
     * <h3>When true</h3>
     * <p>
     * If true, when an element matches a property marked with {@link XmlAnyElement}
     * is known to {@link JAXBContext} (for example, there's a class with
     * {@link XmlRootElement} that has the same tag name, or there's
     * {@link XmlElementDecl} that has the same tag name),
     * the unmarshaller will eagerly unmarshal this element to the JAXB object,
     * instead of unmarshalling it to DOM. Additionally, if the element is
     * unknown but it has a known xsi:type, the unmarshaller eagerly unmarshals
     * the element to a {@link JAXBElement}, with the unknown element name and
     * the JAXBElement value is set to an instance of the JAXB mapping of the 
     * known xsi:type.
     *
     * <p>
     * As a result, after the unmarshalling, the property can become heterogeneous;
     * it can have both DOM nodes and some JAXB objects at the same time.
     *
     * <p>
     * This can be used to emulate the "lax" wildcard semantics of the W3C XML Schema.
     */
    boolean lax() default false;

    /**
     * Specifies the {@link DomHandler} which is responsible for actually
     * converting XML from/to a DOM-like data structure.
     */
    Class<? extends DomHandler> value() default W3CDomHandler.class;
}
