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

import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.eclipse.jdt.core.dom.ASTVisitor;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.PackageDeclaration;
import org.eclipse.jdt.core.dom.TypeDeclaration;

/**
 * 
 * This class collects all alias names for generic methods and classes
 * 
 * @author Bob Hanson
 */
public class GenericsVisitor extends ASTVisitor {

	private Map<String, ITypeBinding> classMap;

	public Map<String,ITypeBinding> getGenericClassMap() {
		return classMap;
	}

	private Map<String, IMethodBinding> methodMap;

	public Map<String,IMethodBinding> getGenericMethodMap() {
		return methodMap;
	}

	public boolean visit(TypeDeclaration node) {
		ITypeBinding binding = node.resolveBinding();
		String key = binding.getKey();
		
		System.err.println("erasure: " + key + " "   
				+ " classs name: " + binding.getClass().getName()+ " " + binding.getErasure());

		// this is the way to get the actual params for the generic type.
		List params = node.typeParameters();
		for (int i = 0; i < params.size(); i++)
			System.err.println("param" + i + " " + params.get(i) + " " + params.get(i).getClass().getName());
		

		if (binding.isGenericType()) {
			if (classMap == null)
				classMap = new Hashtable<String, ITypeBinding>();
			System.err.println("generic type: " + key);
			classMap.put(key, binding);
			return true;
		}
		if (classMap == null)
			return true;
		
		for (Entry<String, ITypeBinding> b: classMap.entrySet()) {
			ITypeBinding t = b.getValue();
			System.err.println("checking " + t.getQualifiedName());
			if (binding.isSubTypeCompatible(t)) {
				System.err.println("YES! " + key + " is a subtype of " + (t.isInterface() ? "i " : "c "  ) + t.getQualifiedName());
			}
			if (binding.isAssignmentCompatible(t)) {
				System.err.println("YESA! " + key + " is assignable from "  + (t.isInterface() ? "i " : "c "  )+ t.getQualifiedName());
			}
		}
		
		
		// must look inside for inner classes
		return true;
	}
	
	public boolean visit(MethodDeclaration node) {
		IMethodBinding mbinding = node.resolveBinding();
		String key = mbinding.getKey();
		if (key.indexOf(";T") >= 0 || key.indexOf("(T") >= 0) {
			if (methodMap == null)
				methodMap = new Hashtable<String, IMethodBinding>();
			System.err.println("generic method: " + key + " " + mbinding.getName() + ASTKeywordVisitor.getJ2SParamQualifier(null, mbinding, null));
			methodMap.put(key, mbinding);
		}
		if (methodMap == null)
			return true;

		for (Entry<String, IMethodBinding> b: methodMap.entrySet()) {
			IMethodBinding t = b.getValue();
			if (mbinding.overrides(t)) {
				System.err.println("YESM! " + key + " overrides "  + t.getKey());				
			}
		}

		return true;
	}

}
