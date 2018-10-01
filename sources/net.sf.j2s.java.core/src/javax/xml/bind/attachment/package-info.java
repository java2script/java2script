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

/**
 * This package is implemented by a MIME-based package processor that
 * enables the interpretation and creation of optimized binary data
 * within an MIME-based package format.
 * <p>
 * <p>
 * Soap MTOM[1], XOP([2][3]) and WS-I AP[4] standardize approaches to
 * optimized transmission of binary datatypes as an attachment.
 * To optimally support these standards within a message passing
 * environment, this package enables an integrated solution between
 * a MIME-based package processor and JAXB unmarshall/marshal processes.
 * <p>
 * <h2>Package Specification</h2>
 * <p>
 * <ul>
 * <li><a href="https://jaxb.java.net/">JAXB Specification</a>
 * </ul>
 * <p>
 * <h2>Related Standards</h2>
 * <p>
 * <ul>
 * <li><a href="http://www.w3.org/TR/2004/WD-soap12-mtom-20040608/">[1]SOAP Message Transmission Optimization Mechanism</a> </li>
 * <li><a href="http://www.w3.org/TR/2005/REC-xop10-20050125/">[2]XML-binary Optimized Packaging</a></li>
 * <li><a href="http://www.ws-i.org/Profiles/AttachmentsProfile-1.0-2004-08-24.html">[3]WS-I Attachments Profile Version 1.0.</a></li>
 * <li><a href="http://www.w3.org/TR/xml-media-types/">[4]Describing Media Content of Binary Data in XML</a></li>
 * </ul>
 *
 * @see <a href="http://www.w3.org/TR/2004/WD-soap12-mtom-20040608/">[1]SOAP Message Transmission Optimization Mechanism</a>
 * @see <a href="http://www.w3.org/TR/2005/REC-xop10-20050125/">[2]XML-binary Optimized Packaging</a>
 * @see <a href="http://www.ws-i.org/Profiles/AttachmentsProfile-1.0-2004-08-24.html">[3]WS-I Attachments Profile Version 1.0.</a>
 * @see <a href="http://www.w3.org/TR/xml-media-types/">[4]Describing Media Content of Binary Data in XML</a>
 * @since JAXB 2.0
 */
package javax.xml.bind.attachment;