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

package j2s.common;

import java.util.Map;
import org.eclipse.jdt.core.dom.IBinding;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IVariableBinding;
import org.eclipse.jdt.core.dom.SimpleName;

/**
 * @author zhou renjian
 *
 * 2006-12-3
 */
public class ASTJ2SMapVisitor extends AbstractPluginVisitor {

	private static Map maps;

	/**
	 * Set .j2smap
	 * Please also read net.sf.j2s.java.org.eclipse.swt/.j2smap file.
	 * 
	 * @param m
	 */
	public static void setJ2SMap(Map m) {
		maps = m;
	}

	String getJ2SName(SimpleName node) {
		IBinding binding = node.resolveBinding();
		if (binding == null) return node.getIdentifier();
		if (binding instanceof IVariableBinding) {
			return getJ2SName((IVariableBinding) binding);
		}
		if (binding instanceof IMethodBinding) {
			return getJ2SName((IMethodBinding) binding);
		}
		String nameID = node.getIdentifier();
		return nameID;
	}

	String getJ2SName(IVariableBinding binding) {
		String nameID = binding.getName();
		if (maps == null || maps.size() == 0) {
			return nameID; 
		}
		String className = null;
		IVariableBinding varBinding = (IVariableBinding) binding;
		ITypeBinding declaringClass = varBinding.getDeclaringClass();
		if (declaringClass != null) {
			className = declaringClass.getQualifiedName();
		}
		
		String key = className + "." + nameID;
		Object value = maps.get(key);
		if (value != null && value instanceof NameConvertItem) {
			NameConvertItem item = (NameConvertItem) value;
			return item.toVarName;
		}
		return nameID;
	}

	private String getJ2SName(IMethodBinding binding) {
		String nameID = binding.getName();
		if (maps == null || maps.size() == 0) {
			return nameID; 
		}
		String className = null;
		IMethodBinding methodBinding = (IMethodBinding) binding;
		ITypeBinding declaringClass = methodBinding.getDeclaringClass();
		ITypeBinding superclass = declaringClass.getSuperclass();
		while (superclass != null) {
			IMethodBinding[] declaredMethods = superclass.getDeclaredMethods();
			for (int i = 0; i < declaredMethods.length; i++) {
				String methodName = declaredMethods[i].getName();
				if (nameID.equals(methodName)) {
					return getJ2SName(declaredMethods[i]);
				}
			}
			superclass = superclass.getSuperclass();
		}
		if (declaringClass != null) {
			className = declaringClass.getQualifiedName();
		}
		String key = className + "#" + nameID;
		Object value = maps.get(key);
		if (value != null && value instanceof NameConvertItem) {
			NameConvertItem item = (NameConvertItem) value;
			return item.toVarName;
		}
		return nameID;
	}

	public boolean checkSameName(ITypeBinding binding, String name) {
		if (binding != null) {
			IMethodBinding[] declaredMethods = binding.getDeclaredMethods();
			for (int i = 0; i < declaredMethods.length; i++) {
				String methodName = getJ2SName(declaredMethods[i]);
				if (name.equals(methodName)) {
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


	String getFieldName(ITypeBinding binding, String name) {
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
				buffer.append(getFieldName(superclass, name));
				return buffer.toString();
			}
		}
		return name;
	}

	/**
	 * Check whether the given field name is already defined in super types 
	 * or not.
	 * 
	 * The algorithm:
	 * 1. Check binding self class/interface fields
	 * 2. Check binding super class
	 * 3. Check binding interfaces
	 *  
	 * @param binding
	 * @param name
	 * @return
	 */
	protected boolean isInheritedFieldName(ITypeBinding binding, String name) {
		if ("serialVersionUID".equals(name)) {
			/*
			 * Just ignore this field: serialVersionUID.
			 * Currently Java2Script does not support Java serialization but 
			 * support Java2Script's own Simple RPC serialization, which does
			 * not care about serialVersionID.
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

}
