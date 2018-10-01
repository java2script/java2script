/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2015-2017 Oracle and/or its affiliates. All rights reserved.
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

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Iterator;
import java.util.ServiceLoader;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Shared ServiceLoader/FactoryFinder Utils shared among SAAJ, JAXB and JAXWS
 * - this class must be duplicated to all those projects, but it's
 * basically generic code and we want to have it everywhere same.
 *
 * @author Miroslav.Kos@oracle.com
 */
class ServiceLoaderUtil {

    private static final String OSGI_SERVICE_LOADER_CLASS_NAME = "org.glassfish.hk2.osgiresourcelocator.ServiceLoader";
    private static final String OSGI_SERVICE_LOADER_METHOD_NAME = "lookupProviderClasses";

    static <P, T extends Exception> P firstByServiceLoader(Class<P> spiClass,
                                                           Logger logger,
                                                           ExceptionHandler<T> handler) throws T {
        // service discovery
        try {
            ServiceLoader<P> serviceLoader = ServiceLoader.load(spiClass);

            for (P impl : serviceLoader) {
                logger.fine("ServiceProvider loading Facility used; returning object [" +
                        impl.getClass().getName() + "]");

                return impl;
            }
        } catch (Throwable t) {
            throw handler.createException(t, "Error while searching for service [" + spiClass.getName() + "]");
        }
        return null;
    }

    static Object lookupUsingOSGiServiceLoader(String factoryId, Logger logger) {

        try {
            // Use reflection to avoid having any dependendcy on ServiceLoader class
            Class serviceClass = Class.forName(factoryId);
            Class target = Class.forName(OSGI_SERVICE_LOADER_CLASS_NAME);
            Method m = target.getMethod(OSGI_SERVICE_LOADER_METHOD_NAME, Class.class);
            Iterator iter = ((Iterable) m.invoke(null, serviceClass)).iterator();
            if (iter.hasNext()) {
                Object next = iter.next();
                logger.fine("Found implementation using OSGi facility; returning object [" +
                        next.getClass().getName() + "].");
                return next;
            } else {
                return null;
            }
        } catch (IllegalAccessException |
                InvocationTargetException |
                ClassNotFoundException |
                NoSuchMethodException ignored) {

            logger.log(Level.FINE, "Unable to find from OSGi: [" + factoryId + "]", ignored);
            return null;
        }
    }

    static void checkPackageAccess(String className) {
        // make sure that the current thread has an access to the package of the given name.
        SecurityManager s = System.getSecurityManager();
        if (s != null) {
            int i = className.lastIndexOf('.');
            if (i != -1) {
                s.checkPackageAccess(className.substring(0, i));
            }
        }
    }

    static Class nullSafeLoadClass(String className, ClassLoader classLoader) throws ClassNotFoundException {
        if (classLoader == null) {
            return Class.forName(className);
        } else {
            return classLoader.loadClass(className);
        }
    }

    // Returns instance of required class. It checks package access (security)
    // unless it is defaultClassname. It means if you are trying to instantiate
    // default implementation (fallback), pass the class name to both first and second parameter.
    static <T extends Exception> Object newInstance(String className,
                                                    String defaultImplClassName,
                                                    final ExceptionHandler<T> handler) throws T {
        try {
            return safeLoadClass(className, defaultImplClassName, contextClassLoader(handler)).newInstance();
        } catch (ClassNotFoundException x) {
            throw handler.createException(x, "Provider " + className + " not found");
        } catch (Exception x) {
            throw handler.createException(x, "Provider " + className + " could not be instantiated: " + x);
        }
    }

    static Class safeLoadClass(String className,
                               String defaultImplClassName,
                               ClassLoader classLoader) throws ClassNotFoundException {

        try {
            checkPackageAccess(className);
        } catch (SecurityException se) {
            // anyone can access the platform default factory class without permission
            if (defaultImplClassName != null && defaultImplClassName.equals(className)) {
                return Class.forName(className);
            }
            // not platform default implementation ...
            throw se;
        }
        return nullSafeLoadClass(className, classLoader);
    }

    static ClassLoader contextClassLoader(ExceptionHandler exceptionHandler) throws Exception {
        try {
            return Thread.currentThread().getContextClassLoader();
        } catch (Exception x) {
            throw exceptionHandler.createException(x, x.toString());
        }
    }

    static abstract class ExceptionHandler<T extends Exception> {

        public abstract T createException(Throwable throwable, String message);

    }

}
