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
package org.eclipse.core.runtime.internal.adaptor;

import java.util.Dictionary;
import java.util.Enumeration;
import org.eclipse.core.runtime.adaptor.*;
import org.eclipse.osgi.framework.adaptor.BundleData;
import org.eclipse.osgi.framework.adaptor.FrameworkAdaptor;
import org.eclipse.osgi.framework.internal.core.Constants;
import org.eclipse.osgi.framework.log.FrameworkLogEntry;
import org.eclipse.osgi.util.NLS;
import org.osgi.framework.*;

/**
 * Internal class.
 */
public class CachedManifest extends Dictionary {

	Dictionary manifest = null;
	EclipseBundleData bundledata;

	public CachedManifest(EclipseBundleData bundledata) {
		this.bundledata = bundledata;
	}

	public Dictionary getManifest() {
		if (manifest == null)
			try {
				manifest = bundledata.loadManifest();
			} catch (BundleException e) {
				final String message = NLS.bind(EclipseAdaptorMsg.ECLIPSE_CACHEDMANIFEST_UNEXPECTED_EXCEPTION, bundledata.getLocation());
				FrameworkLogEntry entry = new FrameworkLogEntry(FrameworkAdaptor.FRAMEWORK_SYMBOLICNAME, message, 0, e, null);
				EclipseAdaptor.getDefault().getFrameworkLog().log(entry);
				return null;
			}
		return manifest;
	}

	public int size() {
		//TODO: getManifest may return null
		return getManifest().size();
	}

	public boolean isEmpty() {
		return size() == 0;
	}

	public Enumeration elements() {
		//TODO: getManifest may return null		
		return getManifest().elements();
	}

	public Enumeration keys() {
		//TODO: getManifest may return null		
		return getManifest().keys();
	}

	public Object get(Object key) {
		String keyString = (String) key;
		if (Constants.BUNDLE_VERSION.equalsIgnoreCase(keyString)) {
			Version result = bundledata.getVersion();
			return result == null ? null : result.toString();
		}
		if (EclipseAdaptor.PLUGIN_CLASS.equalsIgnoreCase(keyString))
			return bundledata.getPluginClass();
		if (Constants.BUNDLE_SYMBOLICNAME.equalsIgnoreCase(keyString)) {
			if ((bundledata.getType() & BundleData.TYPE_SINGLETON) == 0)
				return bundledata.getSymbolicName();
			return bundledata.getSymbolicName() + ';' + Constants.SINGLETON_DIRECTIVE + ":=true"; //$NON-NLS-1$
		}
		if (Constants.BUDDY_LOADER.equalsIgnoreCase(keyString))
			return bundledata.getBuddyList();
		if (Constants.REGISTERED_POLICY.equalsIgnoreCase(keyString))
			return bundledata.getRegisteredBuddyList();
		Dictionary result = getManifest();
		return result == null ? null : result.get(key);
	}

	public Object remove(Object key) {
		//TODO: getManifest may return null		
		return getManifest().remove(key);
	}

	public Object put(Object key, Object value) {
		//TODO: getManifest may return null		
		return getManifest().put(key, value);
	}

}
