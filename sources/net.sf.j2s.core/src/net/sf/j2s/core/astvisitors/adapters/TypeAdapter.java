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

import org.eclipse.jdt.core.dom.ArrayType;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.ParameterizedType;
import org.eclipse.jdt.core.dom.PrimitiveType;
import org.eclipse.jdt.core.dom.QualifiedType;
import org.eclipse.jdt.core.dom.SimpleType;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.core.dom.WildcardType;

import net.sf.j2s.core.astvisitors.ASTEmptyVisitor;
import net.sf.j2s.core.astvisitors.ASTKeywordVisitor;

/**
 * 
 * also used for package declaration names
 * 
 * @author zhou renjian
 *
 *         2006-12-3
 */
public class TypeAdapter extends AbstractPluginAdapter {

	private String thisClassName = "";
	private String fullClassName = "";
	private String thisPackageName;

	public String getClassName() {
		return thisClassName;
	}

	public void setClassName(String className) {
		thisClassName = className;
		thisPackageName = visitor.getPackageName();
		fullClassName = (thisPackageName == null || thisPackageName.length() == 0 
				|| "java.lang".equals(thisPackageName)
				|| thisClassName.startsWith("C$")
				? thisClassName : thisPackageName + '.' + thisClassName);
	}

	public String getFullClassName() {
		return fullClassName;
	}

	/**
	 * Check whether the class represented by the given name is inherited from
	 * the given type binding.
	 * 
	 * The algorithm:
	 * 1. Check binding self class name
	 * 2. Check binding super class
	 * 3. Check binding interfaces
	 * 
	 * @param binding
	 * @param name
	 * @return
	 */
	static public boolean isInheritedClassName(ITypeBinding binding, String name) {
		if (binding == null) {
			return false;
		}
		String bindingName = ASTKeywordVisitor.removeBrackets(binding.getQualifiedName());
		if (name.equals(bindingName)) {
			return true;
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
		return false;
	}

	/**
	 * 
	 * @param thisPackageName if not null, will replace this by P$
	 * 
	 * @param fullName
	 * @return
	 */
	static public String getShortenedPackageNameFromClassName(String thisPackageName, String fullName) {
		return assureQualifiedName(thisPackageName, getShortenedName(null, fullName.substring(0, fullName.lastIndexOf('.')), true));
	}

	/**
	 * Shorten fully qualified class names starting with java.lang and
	 * will replace a class name with C$.
	 * Use static getShortenedName(null, name, false) if that is not desired.
	 * 
	 * Here are the situations: 
	 * 1. Remove "java.lang." in most cases 
	 * 2. "org.eclipse.swt.SWT" to "$WT" 
	 * 3. "org.eclipse.swt.internal.browser.OS" to "O$" 
	 * 4. "org.eclipse.swt." to "$wt."
	 * 5. current class name to C$
	 * 
	 * @param name
	 * @return
	 */
	public String getShortenedQualifiedName(String name) {		
		return getShortenedName(fullClassName, name, false);
	}

	/**
	 * 
	 * @param className if not null, allows for conversion to C$
	 * 
	 * @param name
	 * @param isPackage
	 * @return
	 */
	static public String getShortenedName(String className, String name, boolean isPackage) {
		if (name == null) 
			return null;
		if (!isPackage) {
			className= ASTKeywordVisitor.removeBrackets(className);
			name = ASTKeywordVisitor.removeBrackets(name);
		}
		if (className != null) {
			if (name.equals(className))
				return "C$";
			if (name.startsWith(className + "."))
				return "C$." + name.substring(className.length() + 1);
		}
		String name1 = shortenJavaLang(name);
		return (name1 == null ? shortenSWTName(name, isPackage) : name1);
	}

	static private String shortenJavaLang(String name) {
		// shorten java.lang.XXX.YYY but not java.lang.xxx.ZZZ
		// don't shorten java.lang.ref or java.lang.annotation or java.lang.instrument or java.lang.management
		// because why? they are discarded ultimately?
		return (!name.startsWith("java.lang.") 
				|| name.length() > 10 && !Character.isUpperCase(name.charAt(10))
					//|| name.startsWith("java.lang.ref") 
					//|| name.startsWith("java.lang.annotation")
					//|| name.startsWith("java.lang.instrument") 
					//|| name.startsWith("java.lang.management")
					? null : name.substring(10));

// was:
//		int index = name.indexOf("java.lang.");
//		char ch = 0;
//		if (index == 0
//				&& (name.indexOf('.', index + 10) == -1 || ((ch = name.charAt(index + 10)) >= 'A' && ch <= 'Z'))) {
//			if (!fullName.startsWith("java.lang.ref") && !fullName.startsWith("java.lang.annotation")
//					&& !fullName.startsWith("java.lang.instrument") && !fullName.startsWith("java.lang.management")) {
//				name = name.substring(10);
//			}
//		}

	}

	static private String shortenSWTName(String name, boolean isPackage) {		
		if (name.indexOf(".swt.") < 0 && (isPackage || name.indexOf(".j2s.") < 0)) 
			return name;
		String name1;
		return ((name1 = checkAbbrClassName(name, "org.eclipse.swt.SWT", "$WT")) != null
			 || (name1 = checkAbbrClassName(name, "org.eclipse.swt.internal.browser.OS", "O$")) != null
			 || !isPackage && (
					   (name1 = checkAbbrClassName(name, "net.sf.j2s.html.", "")) != null
					|| (name1 = checkAbbrClassName(name, "org.eclipse.swt.internal.xhtml.", "")) != null
				)
			 || (name1 = checkAbbrClassName(name, "org.eclipse.swt", "$wt")) != null // important to be last 
			 ? name1 : name);
	}

	static private String checkAbbrClassName(String name, String prefix, String abbr) {
		int pt;
		return (name.startsWith(prefix) && (
					(pt = prefix.length()) == 0 
					|| name.length() == pt 
					|| name.charAt(pt) == '.'
				) 
			? abbr + name.substring(pt) 
			: null);
	}

	static public String getTypeStringName(Type type) {
		if (type instanceof QualifiedType) {
			QualifiedType qualType = (QualifiedType) type;
			return getTypeStringName(qualType.getQualifier()) + "." + qualType.getName().getIdentifier();
		} 
		if (type instanceof SimpleType) {
			ITypeBinding binding = ((SimpleType) type).resolveBinding();
			return (binding == null ? null  : binding.getQualifiedName());
		}
		return (type == null || type instanceof PrimitiveType || type instanceof WildcardType ? null
				: type instanceof ArrayType ? getTypeStringName(((ArrayType) type).getElementType())
				: type instanceof ParameterizedType ? getTypeStringName(((ParameterizedType) type).getType())
						: null);
	}

	/**
	 * may return P$
	 * 
	 * @param thisPackageName
	 *            null to not allow P$
	 * @param name
	 * @return
	 */
	@SuppressWarnings("null")
	public static String assureQualifiedName(String thisPackageName, String name) {
		if (name == null || name.length() == 0)
			return name;
		if (thisPackageName != null) {
			if (name.startsWith(thisPackageName + "."))
				return "P$." + name.substring(thisPackageName.length() + 1);
			if (name.equals(thisPackageName))
				return "P$";
		}
		String[] packages = null;
		boolean existedKeyword = false;
//		String[] keywords = FieldAdapter.keywords;
//		for (int i = 0; i < keywords.length; i++) {
//			if (name.indexOf(keywords[i]) >= 0) {
//				if (packages == null) {
//					packages = name.split("\\.");
//				}
//				for (int j = 0; j < packages.length; j++) {
//					if (keywords[i].equals(packages[j])) {
//						packages[j] = "[\"" + packages[j] + "\"]";
//						existedKeyword = true;
//					}
//				}
//			}
//		}
		if (existedKeyword) {
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
		return name;
	}

}
