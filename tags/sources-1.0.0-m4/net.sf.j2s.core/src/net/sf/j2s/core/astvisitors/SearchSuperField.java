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
import org.eclipse.jdt.core.dom.IVariableBinding;

public class SearchSuperField {
	public static boolean isInheritedFieldName(ITypeBinding binding, String name) {
		if ("serialVersionUID".equals(name)) {
			/*
			 * Just ignore this field: serialVersionUID
			 */
			return false;
		}
		if (binding != null) {
			ITypeBinding superclass = binding.getSuperclass();
			if (superclass != null) {
				IVariableBinding[] declaredFields = superclass.getDeclaredFields();
				for (int i = 0; i < declaredFields.length; i++) {
//					String fieldName = declaredFields[i].getName();
					String fieldName = NameConverterUtil.getJ2SName(declaredFields[i]);
					if (name.equals(fieldName)) {
						return true;
					}
				}
			} else {
				// Interface
				IVariableBinding[] declaredFields = binding.getDeclaredFields();
				for (int i = 0; i < declaredFields.length; i++) {
//					String fieldName = declaredFields[i].getName();
					String fieldName = NameConverterUtil.getJ2SName(declaredFields[i]);
					if (name.equals(fieldName)) {
						return true;
					}
				}
			}
			if (isInheritedFieldName(superclass, name)) {
				return true;
			}
			ITypeBinding[] interfaces = binding.getInterfaces();
			if (interfaces != null) {
				for (int i = 0; i < interfaces.length; i++) {
					if (isInheritedFieldName(interfaces[i], name)) {
						return true;
					}
				}
			}
		}
		return false;
	}

	public static String getFieldName(ITypeBinding binding, String name) {
		if (binding != null) {
			ITypeBinding superclass = binding.getSuperclass();
			if (superclass != null) {
				StringBuffer buffer = new StringBuffer();
				IVariableBinding[] declaredFields = superclass.getDeclaredFields();
				for (int i = 0; i < declaredFields.length; i++) {
//					String fieldName = declaredFields[i].getName();
					String fieldName = NameConverterUtil.getJ2SName(declaredFields[i]);
					if (name.equals(fieldName)) {
						buffer.append("$");
					}
				}
//			} else {
//				// Interface
//				IVariableBinding[] declaredFields = binding.getDeclaredFields();
//				for (int i = 0; i < declaredFields.length; i++) {
//					if (name.equals(declaredFields[i].getName())) {
//						buffer.append("$");
//					}
//				}
				buffer.append(getFieldName(superclass, name));
				return buffer.toString();
			}
			/*
			 * The static final constant in the interfaces are not counted
			 */
			/*
			ITypeBinding[] interfaces = binding.getInterfaces();
			if (interfaces != null) {
				for (int i = 0; i < interfaces.length; i++) {
					if (isInheritedFieldName(interfaces[i], name)) {
						buffer.append("$");
					}
				}
			}
			*/
		}
		return name;
	}
}
