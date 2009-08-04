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
package net.sf.j2s.core.compiler;

import java.util.HashMap;
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
 * 2006-10-26
 */
public class ExtendedVisitors {

	public static Map visitors = new HashMap();

	private static boolean isExtensionPointsChecked = false;

	private static void checkExtensionPoints() {
		if (isExtensionPointsChecked) {
			return;
		}
		isExtensionPointsChecked = true;
		IExtensionRegistry extensionRegistry = Platform.getExtensionRegistry();
		IExtensionPoint extensionPoint = extensionRegistry
				.getExtensionPoint("net.sf.j2s.core.extendedASTScriptVisitor"); //$NON-NLS-1$
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
				if ("extendedASTScriptVisitor".equals(element.getName())) { //$NON-NLS-1$
					String className = element.getAttribute("class"); //$NON-NLS-1$
					String id = element.getAttribute("id"); //$NON-NLS-1$
					if (className != null && className.trim().length() != 0
							&& id != null && id.trim().length() != 0) {
						try {
							Object callback = element
									.createExecutableExtension("class");
							if (callback instanceof IExtendedVisitor) {
								visitors.put(id.trim(), callback);
							}
						} catch (CoreException e) {
							e.printStackTrace();
						}
					}
				}
			}
		}
	}

	public static void register(String visitorID, IExtendedVisitor visitor) {
		if (visitorID != null && visitorID.trim().length() != 0
				&& visitor != null) {
			visitors.put(visitorID, visitor);
		}
	}

	public static IExtendedVisitor deregister(String visitorID) {
		if (visitorID != null && visitorID.trim().length() != 0) {
			return (IExtendedVisitor) visitors.remove(visitorID);
		}
		return null;
	}

	public static IExtendedVisitor[] getExistedVisitors() {
		checkExtensionPoints();
		return (IExtendedVisitor[]) visitors.values().toArray(new IExtendedVisitor[0]);
	}
	
	public static IExtendedVisitor getExistedVisitor(String id) {
		checkExtensionPoints();
		return (IExtendedVisitor) visitors.get(id);
	}
	
}
