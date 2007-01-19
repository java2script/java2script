/*******************************************************************************
 * Copyright (c) 2004 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.core.runtime.internal.adaptor;

import org.eclipse.osgi.framework.adaptor.core.BundleInstaller;
import org.eclipse.osgi.service.resolver.BundleDescription;
import org.osgi.framework.*;

/**
 * Internal class.
 */
//TODO: minimal implementation for now. This could be smarter
public class EclipseBundleInstaller implements BundleInstaller {
	BundleContext context;
	public EclipseBundleInstaller(BundleContext context) {
		this.context = context;
	}

	public void installBundle(BundleDescription toInstall) throws BundleException {
		context.installBundle(toInstall.getLocation());
	}

	public void uninstallBundle(BundleDescription toUninstallId) throws BundleException {
		Bundle toUninstall = context.getBundle(toUninstallId.getBundleId());
		if (toUninstall != null)
			toUninstall.uninstall();
	}

	public void updateBundle(BundleDescription toUpdateId) throws BundleException {
		Bundle toUpdate = context.getBundle(toUpdateId.getBundleId());
		if (toUpdate != null)
			toUpdate.update();
	}
}
