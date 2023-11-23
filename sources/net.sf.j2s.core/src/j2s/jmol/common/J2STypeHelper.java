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

package j2s.jmol.common;

import org.eclipse.jdt.core.dom.ArrayType;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.ParameterizedType;
import org.eclipse.jdt.core.dom.PrimitiveType;
import org.eclipse.jdt.core.dom.QualifiedType;
import org.eclipse.jdt.core.dom.SimpleType;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.core.dom.WildcardType;

/**
 * 
 * All static methods now.
 * 
 * @author zhou renjian
 *
 *         2006-12-3
 */
public class J2STypeHelper extends J2SHelper {

	protected String thisClassName = "";

//	protected int anonymousCount = 0;
//
//	public int getAnonymousCount() {
//		return anonymousCount;
//	}

	public String getClassName() {
		return thisClassName;
	}

//	public void increaseAnonymousClassCount() {
//		anonymousCount++;
//	}

	public void setClassName(String className) {
		thisClassName = className;
	}
	
	public String getFullClassName(String thisPackageName) {
		return (thisPackageName != null && thisPackageName.length() != 0 
				&& !"java.lang".equals(thisPackageName)
			?  thisPackageName + '.' + thisClassName : thisClassName);
	}

	/**
	 * Discard generic type from the given full class name. There are no generic
	 * types in JavaScript.
	 * 
	 * @param name
	 * @return
	 */
	public static String discardGenericType(String name) {
		return (name == null ? null : BindingHelper.removeBrackets(name));
	}

	/**
	 * Shorten full qualified class names.
	 * 
	 * Here are the situations: 1. No needs for "java.lang." 2.
	 * "org.eclipse.swt.SWT" to "$WT" 3. "org.eclipse.swt.internal.browser.OS" to
	 * "O$" 4. "org.eclipse.swt." to "$wt."
	 * 
	 * @param name
	 * @return
	 */
	static String shortenQualifiedName(String name) {
		name = BindingHelper.removeBrackets(name);
		int index = name.indexOf("java.lang.");
		char ch = 0;
		if (index == 0 && (name.indexOf('.', 10) == -1 || ((ch = name.charAt(10)) >= 'A' && ch <= 'Z'))) {
			name = name.substring(10);
		}
		return name;
	}

	static String shortenPackageName(String fullName) {
		String name = fullName.substring(0, fullName.lastIndexOf('.'));
		name = BindingHelper.removeBrackets(name);
		int index = name.indexOf("java.lang.");
		char ch = 0;
		if (index == 0
				&& (name.indexOf('.', index + 10) == -1 || ((ch = name.charAt(index + 10)) >= 'A' && ch <= 'Z'))) {
			if (!fullName.startsWith("java.lang.ref") && !fullName.startsWith("java.lang.annotation")
					&& !fullName.startsWith("java.lang.instrument") && !fullName.startsWith("java.lang.management")) {
				name = name.substring(10);
			}
		}
		return name;
	}

	static String getTypeStringName(Type type) {
		if (type == null) {
			return null;
		}
		if (type instanceof PrimitiveType || type instanceof WildcardType) {
			return null;
		} else if (type instanceof ArrayType) {
			ArrayType arrType = (ArrayType) type;
			return getTypeStringName(arrType.getElementType());
		} else if (type instanceof ParameterizedType) {
			ParameterizedType paramType = (ParameterizedType) type;
			return getTypeStringName(paramType.getType());
		} else if (type instanceof QualifiedType) {
			QualifiedType qualType = (QualifiedType) type;
			return getTypeStringName(qualType.getQualifier()) + "." + qualType.getName().getIdentifier();// .getFullyQualifiedName();
		} else if (type instanceof SimpleType) {
			SimpleType simpType = (SimpleType) type;
			ITypeBinding binding = simpType.resolveBinding();
			if (binding != null) {
				return binding.getQualifiedName();
			}
		}
		return null;
	}

	static String assureQualifiedName(String name) {
		if (name == null || name.length() == 0) {
			return name;
		}
		String[] keywords = J2SFieldHelper.keywords;
		String[] packages = null;
		boolean existedKeyword = false;
		for (int i = 0; i < keywords.length; i++) {
			if (name.indexOf(keywords[i]) != -1) {
				if (packages == null) {
					packages = name.split("\\.");
				}
				for (int j = 0; j < packages.length; j++) {
					if (keywords[i].equals(packages[j])) {
						packages[j] = "[\"" + packages[j] + "\"]";
						existedKeyword = true;
					}
				}
			}
		}
		if (!existedKeyword || packages == null)
			return name;
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < packages.length; i++) {
			if (packages[i].charAt(0) == '[') {
				if (i == 0) {
					sb.append("window");
				}
				sb.append(packages[i]);
			} else {
				if (i != 0) {
					sb.append('.');
				}
				sb.append(packages[i]);
			}
		}
		return sb.toString();
	}

	static boolean isIntegerType(String type) {
		if ("int".equals(type) || "long".equals(type) || "byte".equals(type) || "short".equals(type)
				|| "char".equals(type)) {
			return true;
		}
		return false;
	}

//	/**
//	 * Check whether the class represented by the given name is inherited from the
//	 * given type binding.
//	 * 
//	 * The algorithm: 1. Check binding self class name 2. Check binding super class
//	 * 3. Check binding interfaces
//	 * 
//	 * @param binding
//	 * @param name
//	 * @return
//	 */
//	private static boolean isInheritedClassName(ITypeBinding binding, String name) {
//		if (binding == null) {
//			return false;
//		}
//		String bindingName = discardGenericType(binding.getQualifiedName());
//		if (name.equals(bindingName)) {
//			return true;
//		}
//		ITypeBinding superclass = binding.getSuperclass();
//		if (isInheritedClassName(superclass, name)) {
//			return true;
//		}
//		ITypeBinding[] interfaces = binding.getInterfaces();
//		if (interfaces != null) {
//			for (int i = 0; i < interfaces.length; i++) {
//				if (isInheritedClassName(interfaces[i], name)) {
//					return true;
//				}
//			}
//		}
//		return false;
//	}

}
