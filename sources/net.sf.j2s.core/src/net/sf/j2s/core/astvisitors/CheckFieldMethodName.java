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

import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;

public class CheckFieldMethodName {
	public static boolean checkSameName(ITypeBinding binding, String name) {
		//System.out.println("check");
		if (binding != null) {
			//System.out.println("check in..");
			IMethodBinding[] declaredMethods = binding.getDeclaredMethods();
			for (int i = 0; i < declaredMethods.length; i++) {
				if (name.equals(declaredMethods[i].getName())) {
					return true;
				}
			}
			ITypeBinding superclass = binding.getSuperclass();
			if (checkSameName(superclass, name)) {
				return true;
			}
			ITypeBinding[] interfaces = binding.getInterfaces();
			if (interfaces != null) {
				for (int i = 0; i < interfaces.length; i++) {
					if (checkSameName(interfaces[i], name)) {
						return true;
					}
				}
			}
		}
		return false;
	}
}
