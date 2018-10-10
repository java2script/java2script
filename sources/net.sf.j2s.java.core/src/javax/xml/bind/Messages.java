/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2003-2017 Oracle and/or its affiliates. All rights reserved.
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

import java.text.MessageFormat;
import java.util.ResourceBundle;

/**
 * Formats error messages.
 */
class Messages
{
    static String format( String property ) {
        return format( property, null );
    }
    
    static String format( String property, Object arg1 ) {
        return format( property, new Object[]{arg1} );
    }
    
    static String format( String property, Object arg1, Object arg2 ) {
        return format( property, new Object[]{arg1,arg2} );
    }
    
    static String format( String property, Object arg1, Object arg2, Object arg3 ) {
        return format( property, new Object[]{arg1,arg2,arg3} );
    }
    
    // add more if necessary.
    
    /** Loads a string resource and formats it with specified arguments. */
    static String format( String property, Object[] args ) {
        String text = ResourceBundle.getBundle(Messages.class.getName()).getString(property);
        return MessageFormat.format(text,args);
    }
    
//
//
// Message resources
//
//
    static final String PROVIDER_NOT_FOUND = // 1 arg
        "ContextFinder.ProviderNotFound";

    static final String DEFAULT_PROVIDER_NOT_FOUND = // 0 args
        "ContextFinder.DefaultProviderNotFound";

    static final String COULD_NOT_INSTANTIATE = // 2 args
        "ContextFinder.CouldNotInstantiate";
        
    static final String CANT_FIND_PROPERTIES_FILE = // 1 arg
        "ContextFinder.CantFindPropertiesFile";
        
    static final String CANT_MIX_PROVIDERS = // 0 args
        "ContextFinder.CantMixProviders";
        
    static final String MISSING_PROPERTY = // 2 args
        "ContextFinder.MissingProperty";

    static final String NO_PACKAGE_IN_CONTEXTPATH = // 0 args
        "ContextFinder.NoPackageInContextPath";

    static final String NAME_VALUE = // 2 args
        "PropertyException.NameValue";
        
    static final String CONVERTER_MUST_NOT_BE_NULL = // 0 args
        "DatatypeConverter.ConverterMustNotBeNull";

    static final String ILLEGAL_CAST = // 2 args
        "JAXBContext.IllegalCast";

    static final String ERROR_LOAD_CLASS = // 2 args
            "ContextFinder.ErrorLoadClass";

    static final String JAXB_CLASSES_NOT_OPEN = // 1 arg
            "JAXBClasses.notOpen";
}
