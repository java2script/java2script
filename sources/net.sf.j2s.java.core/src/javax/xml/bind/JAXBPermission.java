/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2007-2017 Oracle and/or its affiliates. All rights reserved.
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

import java.security.BasicPermission;

/**
 * This class is for JAXB permissions. A {@code JAXBPermission}
 * contains a name (also referred to as a "target name") but
 * no actions list; you either have the named permission
 * or you don't.
 *
 * <P>
 * The target name is the name of the JAXB permission (see below).
 *
 * <P>
 * The following table lists all the possible {@code JAXBPermission} target names,
 * and for each provides a description of what the permission allows
 * and a discussion of the risks of granting code the permission.
 *
 * <table border=1 cellpadding=5 summary="Permission target name, what the permission allows, and associated risks">
 * <tr>
 * <th>Permission Target Name</th>
 * <th>What the Permission Allows</th>
 * <th>Risks of Allowing this Permission</th>
 * </tr>
 *
 * <tr>
 *   <td>setDatatypeConverter</td>
 *   <td>
 *     Allows the code to set VM-wide {@link DatatypeConverterInterface}
 *     via {@link DatatypeConverter#setDatatypeConverter(DatatypeConverterInterface) the setDatatypeConverter method}
 *     that all the methods on {@link DatatypeConverter} uses.
 *   </td>
 *   <td>
 *     Malicious code can set {@link DatatypeConverterInterface}, which has
 *     VM-wide singleton semantics,  before a genuine JAXB implementation sets one.
 *     This allows malicious code to gain access to objects that it may otherwise
 *     not have access to, such as {@link java.awt.Frame#getFrames()} that belongs to
 *     another application running in the same JVM.
 *   </td>
 * </tr>
 * </table>
 *
 * @see java.security.BasicPermission
 * @see java.security.Permission
 * @see java.security.Permissions
 * @see java.security.PermissionCollection
 * @see java.lang.SecurityManager
 *
 * @author Joe Fialli
 * @since 1.7, JAXB 2.2
 */

/* code was borrowed originally from java.lang.RuntimePermission. */
public final class JAXBPermission extends BasicPermission {
    /**
     * Creates a new JAXBPermission with the specified name.
     *
     * @param name
     * The name of the JAXBPermission. As of 2.2 only "setDatatypeConverter"
     * is defined.
     */
    public JAXBPermission(String name) {
        super(name);
    }

    private static final long serialVersionUID = 1L;
}
