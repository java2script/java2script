/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.ui.resources;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IConfigurationElement;
import org.eclipse.core.runtime.IExtension;
import org.eclipse.core.runtime.IExtensionPoint;
import org.eclipse.core.runtime.IExtensionRegistry;
import org.eclipse.core.runtime.Platform;

/**
 * @author zhou renjian
 *
 * 2006-5-13
 */
public class ExternalResources {
	private static Map providers = new HashMap();

	private static boolean isExtensionPointsChecked = false;

	private static void checkExtensionPoints() {
		if (isExtensionPointsChecked) {
			return;
		}
		isExtensionPointsChecked = true;
		IExtensionRegistry extensionRegistry = Platform.getExtensionRegistry();
		IExtensionPoint extensionPoint = extensionRegistry
				.getExtensionPoint("net.sf.j2s.ui.externalResourceProvider"); //$NON-NLS-1$
		if (extensionPoint == null) {
			return;
		}
		IExtension[] extensions = extensionPoint.getExtensions();
		// For each extension ...
		for (int i = 0; i < extensions.length; i++) {
			IExtension extension = extensions[i];
			IConfigurationElement[] elements = extension
					.getConfigurationElements();
			// For each member of the extension ...
			for (int j = 0; j < elements.length; j++) {
				IConfigurationElement element = elements[j];
				if ("externalResourceProvider".equals(element.getName())) { //$NON-NLS-1$
					String className = element.getAttribute("class"); //$NON-NLS-1$
					String id = element.getAttribute("id"); //$NON-NLS-1$
					if (className != null && className.trim().length() != 0
							&& id != null && id.trim().length() != 0) {
						try {
							Object callback = element
									.createExecutableExtension("class");
							if (callback instanceof IExternalResourceProvider) {
								providers.put(id.trim(), callback);
							}
						} catch (CoreException e) {
							e.printStackTrace();
						}
					}
				}
			}
		}
	}

	public static Map getProviders() {
		checkExtensionPoints();
		return providers;
	}
	
	public static IExternalResourceProvider getProviderByName(String keyName) {
		checkExtensionPoints();
		if (keyName != null) {
			for (Iterator iter = providers.keySet().iterator(); iter.hasNext();) {
				String key = (String) iter.next();
				IExternalResourceProvider provider = (IExternalResourceProvider) providers.get(key);
				String[] keys = provider.getKeys();
				for (int i = 0; i < keys.length; i++) {
					if (keyName.equals(keys[i])) {
						return provider;
					}
				}
			}
		}
		return null;
	}
	
	public static String[] getAllKeys() {
		checkExtensionPoints();
		List list = new ArrayList();
		for (Iterator iter = providers.keySet().iterator(); iter.hasNext();) {
			String key = (String) iter.next();
			IExternalResourceProvider provider = (IExternalResourceProvider) providers.get(key);
			String[] keys = provider.getKeys();
			for (int i = 0; i < keys.length; i++) {
				list.add(keys[i]);
			}
		}
		return (String[]) list.toArray(new String[0]);
	}
	
	public static String[] getAllDescriptions() {
		checkExtensionPoints();
		List list = new ArrayList();
		for (Iterator iter = providers.keySet().iterator(); iter.hasNext();) {
			String key = (String) iter.next();
			IExternalResourceProvider provider = (IExternalResourceProvider) providers.get(key);
			String[] descs = provider.getDescriptions();
			for (int i = 0; i < descs.length; i++) {
				list.add(descs[i]);
			}
		}
		return (String[]) list.toArray(new String[0]);
	}
	
	public static String[][] getAllResources() {
		checkExtensionPoints();
		List list = new ArrayList();
		for (Iterator iter = providers.keySet().iterator(); iter.hasNext();) {
			String key = (String) iter.next();
			IExternalResourceProvider provider = (IExternalResourceProvider) providers.get(key);
			String[][] ress = provider.getResources();
			for (int i = 0; i < ress.length; i++) {
				list.add(ress[i]);
			}
		}
		return (String[][]) list.toArray(new String[0][0]);
	}
}
