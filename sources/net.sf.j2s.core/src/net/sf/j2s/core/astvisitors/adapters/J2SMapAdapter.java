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

package net.sf.j2s.core.adapters;

import org.eclipse.jdt.core.dom.IBinding;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IVariableBinding;
import org.eclipse.jdt.core.dom.SimpleName;

/**
 * @author zhou renjian
 *
 *         2006-12-3
 */
public class J2SMapAdapter extends AbstractPluginAdapter {

	public static String getJ2SName(SimpleName node) {
		IBinding binding = node.resolveBinding();
		if (binding == null)
			return node.getIdentifier();
		if (binding instanceof IVariableBinding) {
			return getJ2SName((IVariableBinding) binding);
		}
		if (binding instanceof IMethodBinding) {
			return getJ2SMethodName((IMethodBinding) binding);
		}
		String nameID = node.getIdentifier();
		return nameID;
	}

	public static String getJ2SName(IVariableBinding binding) {
		return binding.getName();
	}

	public static boolean checkInheritedMethodNameCollision(ITypeBinding binding, String name) {
		if (binding != null) {
			IMethodBinding[] methods = binding.getDeclaredMethods();
			for (int i = 0; i < methods.length; i++)
				if (name.equals(getJ2SMethodName(methods[i])))
					return true;
			ITypeBinding superclass = binding.getSuperclass();
			if (checkInheritedMethodNameCollision(superclass, name))
				return true;
			ITypeBinding[] interfaces = binding.getInterfaces();
			if (interfaces != null)
				for (int i = 0; i < interfaces.length; i++)
					if (checkInheritedMethodNameCollision(interfaces[i], name))
						return true;
		}
		return false;
	}

	/**
	 * 
	 * @param binding
	 * @param name
	 * @return
	 */
	public static String getFieldName$Appended(ITypeBinding binding, String name) {
		if (binding != null) {
			ITypeBinding superclass = binding.getSuperclass();
			if (superclass != null) {
				StringBuffer buffer = new StringBuffer();
				IVariableBinding[] declaredFields = superclass.getDeclaredFields();
				for (int i = 0; i < declaredFields.length; i++) {
					String fieldName = getJ2SName(declaredFields[i]);
					if (name.equals(fieldName)) {
						buffer.append("$");
					}
				}
				buffer.append(getFieldName$Appended(superclass, name));
				return buffer.toString();
			}
		}
		return name;
	}

	/**
	 * Check whether the given field name is already defined in super types or
	 * not.
	 * 
	 * The algorithm: 1. Check binding self class/interface fields 2. Check
	 * binding super class 3. Check binding interfaces
	 * 
	 * @param binding
	 * @param name
	 * @return
	 */
	public static boolean isInheritedFieldName(ITypeBinding binding, String name) {
		if ("serialVersionUID".equals(name)) {
			/*
			 * Just ignore this field: serialVersionUID. Currently Java2Script
			 * does not support Java serialization but support Java2Script's own
			 * Simple RPC serialization, which does not care about
			 * serialVersionID.
			 */
			return false;
		}
		if (binding == null) {
			return false;
		}
		ITypeBinding superclass = binding.getSuperclass();
		IVariableBinding[] declaredFields = null;
		if (superclass != null) {
			declaredFields = superclass.getDeclaredFields();
		} else { // Interface
			declaredFields = binding.getDeclaredFields();
		}
		for (int i = 0; i < declaredFields.length; i++) {
			String fieldName = getJ2SName(declaredFields[i]);
			if (name.equals(fieldName)) {
				return true;
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
		return false;
	}

	/**
	 * Check for generic method name conflict with JavaScript methods such as .bind(), .call(), etc. 
	 * but exclude methods in swingjs.api, because those are meant to be that way.
	 * 
	 * @param binding
	 * @return
	 */
	private static String getJ2SMethodName(IMethodBinding binding) {
		String name = binding.getName();
		boolean isViolation = (FieldAdapter.checkKeywordViolation(name, null)
				&& !binding.getDeclaringClass().getQualifiedName().startsWith("swingjs.api"));
		return (isViolation ? "$" + name : name);
	}


}
