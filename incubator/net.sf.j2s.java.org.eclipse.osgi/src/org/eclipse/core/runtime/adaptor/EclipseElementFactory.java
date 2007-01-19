/*******************************************************************************
 * Copyright (c) 2003, 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.core.runtime.adaptor;

import java.io.IOException;

import org.eclipse.osgi.framework.adaptor.BundleProtectionDomain;
import org.eclipse.osgi.framework.adaptor.ClassLoaderDelegate;
import org.eclipse.osgi.framework.adaptor.core.*;

/**
 * Creates EclipseBundleData and EclipseClassLoader objects for the framework adaptor
 * <p>
 * Clients may extend this class.
 * </p>
 * @since 3.1
 */
public class EclipseElementFactory implements AdaptorElementFactory {

	public AbstractBundleData createBundleData(AbstractFrameworkAdaptor adaptor, long id) throws IOException {
		return new EclipseBundleData((AbstractFrameworkAdaptor) adaptor, id);
	}

	public org.eclipse.osgi.framework.adaptor.BundleClassLoader createClassLoader(ClassLoaderDelegate delegate, BundleProtectionDomain domain, String[] bundleclasspath, AbstractBundleData data) {
		return new EclipseClassLoader(delegate, domain, bundleclasspath, data.getAdaptor().getBundleClassLoaderParent(), data);
	}

}
