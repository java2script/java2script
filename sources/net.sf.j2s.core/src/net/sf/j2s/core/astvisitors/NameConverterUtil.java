/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.core.astvisitors;

import java.util.Map;
import org.eclipse.jdt.core.dom.IBinding;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IVariableBinding;
import org.eclipse.jdt.core.dom.SimpleName;

/**
 * @author josson smith
 *
 * 2006-6-3
 */
public class NameConverterUtil {
	private static Map maps;

	public static String getJ2SName(SimpleName node) {
//		initConvertionMaps();
//		String className = null;
		IBinding binding = node.resolveBinding();
		if (binding == null) return node.getIdentifier();
		if (binding instanceof IVariableBinding) {
			return getJ2SName((IVariableBinding) binding);
//			IVariableBinding varBinding = (IVariableBinding) binding;
//			ITypeBinding declaringClass = varBinding.getDeclaringClass();
//			if (declaringClass != null) {
//				className = declaringClass.getQualifiedName();
//			}
		}
		if (binding instanceof IMethodBinding) {
			return getJ2SName((IMethodBinding) binding);
//			IMethodBinding methodBinding = (IMethodBinding) binding;
//			ITypeBinding declaringClass = methodBinding.getDeclaringClass();
//			if (declaringClass != null) {
//				className = declaringClass.getQualifiedName();
//			}
		}
//		System.out.println("checking " + className + "." + nameID);
		
//		for (int i = 0; i < maps.length; i++) {
//			NameConvertItem item = maps[i];
//			if (item.className.equals(className) && item.varName.equals(nameID)) {
//				return item.toVarName;
//			}
//		}
//		return node.getIdentifier();
		String nameID = node.getIdentifier();
		return nameID;
	}


	public static String getJ2SName(IVariableBinding binding) {
//		initConvertionMaps();
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
//		System.out.println("checking " + className + "." + nameID);
		
		String key = className + "." + nameID;
		Object value = maps.get(key);
		if (value != null && value instanceof NameConvertItem) {
			NameConvertItem item = (NameConvertItem) value;
			return item.toVarName;
		}
		return nameID;
	}


	public static String getJ2SName(IMethodBinding binding) {
//		initConvertionMaps();
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

	private static void initConvertionMaps() {
		if (maps != null) {
			return ;
		}
//		String swt = "org.eclipse.swt.";
//		String widgets = swt + "widgets.";
//		maps = new NameConvertItem[] {
//					new NameConvertItem(widgets + "Widget", "data", "d"),	
//					new NameConvertItem(widgets + "Widget", "display", "p"),	
//					new NameConvertItem(widgets + "WWidget", "handle", "l"),	
//					new NameConvertItem(widgets + "Widget", "create", "c"),	
//					new NameConvertItem(widgets + "Widget", "handle", "h")	
//				};
	}
	
	public static void setJ2SMap(Map m) {
		maps = m;
	}
}
