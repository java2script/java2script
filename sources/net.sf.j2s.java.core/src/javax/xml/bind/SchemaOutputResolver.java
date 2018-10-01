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

package javax.xml.bind;

import javax.xml.transform.Result;
import java.io.IOException;

/**
 * Controls where a JAXB implementation puts the generates
 * schema files.
 *
 * <p>
 * An implementation of this abstract class has to be provided by the calling
 * application to generate schemas.
 *
 * <p>
 * This is a class, not an interface so as to allow future versions to evolve
 * without breaking the compatibility.
 *
 * @author
 *     Kohsuke Kawaguchi (kohsuke.kawaguchi@sun.com)
 * @since 1.6
 */
public abstract class SchemaOutputResolver {
    /**
     * Decides where the schema file (of the given namespace URI)
     * will be written, and return it as a {@link Result} object.
     *
     * <p>
     * This method is called only once for any given namespace.
     * IOW, all the components in one namespace is always written
     * into the same schema document.
     *
     * @param namespaceUri
     *      The namespace URI that the schema declares.
     *      Can be the empty string, but never be null.
     * @param suggestedFileName
     *      A JAXB implementation generates an unique file name (like "schema1.xsd")
     *      for the convenience of the callee. This name can be
     *      used for the file name of the schema, or the callee can just
     *      ignore this name and come up with its own name.
     *      This is just a hint.
     *
     * @return
     *      a {@link Result} object that encapsulates the actual destination
     *      of the schema.
     *
     *      If the {@link Result} object has a system ID, it must be an
     *      absolute system ID. Those system IDs are relativized by the caller and used
     *      for {@literal <xs:import>} statements.
     *
     *      If the {@link Result} object does not have a system ID, a schema
     *      for the namespace URI is generated but it won't be explicitly
     *      {@literal <xs:import>}ed from other schemas.
     *
     *      If {@code null} is returned, the schema generation for this
     *      namespace URI will be skipped.
     */
    public abstract Result createOutput( String namespaceUri, String suggestedFileName ) throws IOException;
}
