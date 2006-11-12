/*******************************************************************************
 * Copyright (c) 2005 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/
package net.sf.j2s.core.astvisitors;

import org.eclipse.jdt.core.dom.ITypeBinding;

public class SearchSuperClass {
	public static boolean isInheritedClassName(ITypeBinding binding, String name) {
		if (binding != null) {
			if (name.equals(JavaLangUtil.ripGeneric(binding.getQualifiedName()))) {
				return true;
			} else {
				ITypeBinding[] interfaces = binding.getInterfaces();
				if (interfaces != null) {
					for (int i = 0; i < interfaces.length; i++) {
						if (JavaLangUtil.ripGeneric(interfaces[i].getQualifiedName()).equals(JavaLangUtil.ripGeneric(binding.getQualifiedName()))) {
							return true;
						}
					}
				}
			}
			ITypeBinding superclass = binding.getSuperclass();
			if (isInheritedClassName(superclass, name)) {
				return true;
			}
			ITypeBinding[] interfaces = binding.getInterfaces();
			if (interfaces != null) {
				for (int i = 0; i < interfaces.length; i++) {
					if (isInheritedClassName(interfaces[i], name)) {
						return true;
					}
				}
			}
		}
		return false;
	}
}
