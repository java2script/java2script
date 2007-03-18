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

package net.sf.j2s.core.astvisitors;

import org.eclipse.jdt.core.dom.ArrayType;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.ParameterizedType;
import org.eclipse.jdt.core.dom.PrimitiveType;
import org.eclipse.jdt.core.dom.QualifiedType;
import org.eclipse.jdt.core.dom.SimpleType;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.core.dom.WildcardType;

/**
 * @author zhou renjian
 *
 * 2006-12-3
 */
public class ASTTypeVisitor extends AbstractPluginVisitor {

	protected String thisClassName = "";
	
	protected int anonymousCount = 0;

	public int getAnonymousCount() {
		return anonymousCount;
	}

	public String getClassName() {
		return thisClassName;
	}
	
	public void increaseAnonymousClassCount() {
		anonymousCount++;
	}
	
	public void setClassName(String className) {
		thisClassName = className;
	}
	
	public String getFullClassName() {
		String fullClassName = null;
		String thisPackageName = ((ASTPackageVisitor) getVisitor().getAdaptable(ASTPackageVisitor.class)).getPackageName();
		if (thisPackageName != null && thisPackageName.length() != 0
				&& !"java.lang".equals(thisPackageName)) {
			fullClassName = thisPackageName + '.' + thisClassName;
		} else {
			fullClassName = thisClassName;
		}
		return fullClassName;
	}

	/**
	 * Discard generic type from the given full class name. There are no generic
	 * types in JavaScript.
	 * 
	 * @param name
	 * @return
	 */
	public String discardGenericType(String name) {
		if (name == null) {
			return null;
		}
		int index = name.indexOf('<');
		if (index != -1) {
			name = name.substring(0, index).trim();
		}
		return name;
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
	public boolean isInheritedClassName(ITypeBinding binding, String name) {
		if (binding == null) {
			return false;
		}
		String bindingName = discardGenericType(binding.getQualifiedName());
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
	 * Shorten full qualified class names. 
	 * 
	 * Here are the situations: 
	 * 1. No needs for "java.lang." 
	 * 2. "org.eclipse.swt.SWT" to "$WT" 
	 * 3. "org.eclipse.swt.internal.browser.OS" to "O$" 
	 * 4. "org.eclipse.swt." to "$wt."
	 * 
	 * @param name
	 * @return
	 */
	public String shortenQualifiedName(String name) {
		int index = name.indexOf('<');
		if (index != -1) {
			name = name.substring(0, index).trim();
		}
		index = name.indexOf("java.lang.");
		char ch = 0;
		if (index != -1
				&& (name.indexOf('.', index + 10) == -1 || ((ch = name
						.charAt(index + 10)) >= 'A' && ch <= 'Z'))) {
			if (!name.startsWith("java.lang.ref")
							&& !name.startsWith("java.lang.annotaion")
							&& !name.startsWith("java.lang.instrument")
							&& !name.startsWith("java.lang.management")) {
				name = name.substring(10);
			}
		}
		String swt = "org.eclipse.swt.SWT";
		index = name.indexOf(swt);
		if (index != -1) {
			String after = name.substring(swt.length());
			if (after.length() == 0 || after.startsWith(".")) {
				name = "$WT" + after;
			}
		} else {
			String os = "org.eclipse.swt.internal.browser.OS";
			index = name.indexOf(os);
			if (index != -1) {
				String after = name.substring(os.length());
				if (after.length() == 0 || after.startsWith(".")) {
					name = "O$" + after;
				}
			}
		}
		swt = "org.eclipse.swt";
		index = name.indexOf(swt);
		if (index != -1) {
			String after = name.substring(swt.length());
			name = "$wt" + after;
		}
		return name;
	}

	public String shortenPackageName(String fullName) {
		String name = fullName.substring(0, fullName.lastIndexOf('.'));
		int index = name.indexOf('<');
		if (index != -1) {
			name = name.substring(0, index).trim();
		}
		index = name.indexOf("java.lang.");
		char ch = 0;
		if (index != -1
				&& (name.indexOf('.', index + 10) == -1 || ((ch = name
						.charAt(index + 10)) >= 'A' && ch <= 'Z'))) {
			if (!fullName.startsWith("java.lang.ref")
							&& !fullName.startsWith("java.lang.annotation")
							&& !fullName.startsWith("java.lang.instrument")
							&& !fullName.startsWith("java.lang.management")) {
				name = name.substring(10);
			}
		}
		String swt = "org.eclipse.swt.SWT";
		index = name.indexOf(swt);
		if (index != -1) {
			String after = name.substring(swt.length());
			if (after.length() == 0 || after.startsWith(".")) {
				name = "$WT" + after;
			}
		} else {
			String os = "org.eclipse.swt.internal.browser.OS";
			index = name.indexOf(os);
			if (index != -1) {
				String after = name.substring(os.length());
				if (after.length() == 0 || after.startsWith(".")) {
					name = "O$" + after;
				}
			}
		}
		swt = "org.eclipse.swt";
		index = name.indexOf(swt);
		if (index != -1) {
			String after = name.substring(swt.length());
			name = "$wt" + after;
		}
		return name;
	}

	public String getTypeStringName(Type type) {
		if (type == null) {
			return null;
		}
		if (type instanceof PrimitiveType
				|| type instanceof WildcardType) {
			return null;
		} else if (type instanceof ArrayType) {
			ArrayType arrType = (ArrayType) type;
			return getTypeStringName(arrType.getElementType());
		} else if (type instanceof ParameterizedType) {
			ParameterizedType paramType = (ParameterizedType) type;
			return getTypeStringName(paramType.getType());
		} else if (type instanceof QualifiedType) {
			QualifiedType qualType = (QualifiedType) type;
			return getTypeStringName(qualType.getQualifier()) + "." + qualType.getName().getIdentifier();//.getFullyQualifiedName();
		} else if (type instanceof SimpleType) {
			SimpleType simpType = (SimpleType) type;
			return simpType.resolveBinding().getQualifiedName();
		}
		return null;
	}


	public boolean isIntegerType(String type) {
		if ("int".equals(type)
				|| "long".equals(type)
				|| "byte".equals(type)
				|| "short".equals(type)
				|| "char".equals(type)) {
			return true;
		}
		return false;
	}

}
