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

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.ASTVisitor;
import org.eclipse.jdt.core.dom.ClassInstanceCreation;
import org.eclipse.jdt.core.dom.ConstructorInvocation;
import org.eclipse.jdt.core.dom.EnumConstantDeclaration;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.SuperMethodInvocation;

/**
 * This visitor is used to find out those private methods that are never 
 * referenced.
 * 
 * BH removed j2sKeep because it is not used in 4.2 Java or Jmol
 * 
 * @author zhou renjian
 * 2006-5-1
 */
public class MethodReferenceASTVisitor extends ASTVisitor {

	private boolean isReferenced;
	private String methodSignature;

	private MethodReferenceASTVisitor(String methodSignature) {
		super();
		this.methodSignature = methodSignature.replaceAll("%?<[^>]+>", "");
	}
	
	static boolean checkReference(ASTNode node, String methodSignature) {
		MethodReferenceASTVisitor methodRefVisitor = new MethodReferenceASTVisitor(methodSignature);
		methodRefVisitor.isReferenced = false;
		node.accept(methodRefVisitor);
		return methodRefVisitor.isReferenced;
	}

	public boolean visit(MethodDeclaration node) {
		if (J2SDocVisitor.getJ2STag(node, "@j2sIgnore") != null) {
			return false;
		}
		return super.visit(node);
	}

	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.ClassInstanceCreation)
	 */
	public boolean visit(ClassInstanceCreation node) {
		IMethodBinding constructorBinding = node.resolveConstructorBinding();
		if (constructorBinding != null) {
			String key = constructorBinding.getKey();
			if (key != null) {
				key = key.replaceAll("%?<[^>]+>", "");
			}
			if (methodSignature.equals(key)) {
				isReferenced = true;
				return false;
			}
		}
		return super.visit(node);
	}
	
	public boolean visit(ConstructorInvocation node) {
		IMethodBinding constructorBinding = node.resolveConstructorBinding();
		String key = constructorBinding.getKey();
		if (key != null) {
			key = key.replaceAll("%?<[^>]+>", "");
		}
		if (methodSignature.equals(key)) {
			isReferenced = true;
			return false;
		}
		return super.visit(node);
	}
	
	public boolean visit(EnumConstantDeclaration node) {
		IMethodBinding constructorBinding = node.resolveConstructorBinding();
		String key = constructorBinding.getKey();
		if (key != null) {
			key = key.replaceAll("%?<[^>]+>", "");
		}
		if (methodSignature.equals(key)) {
			isReferenced = true;
			return false;
		}
		return super.visit(node);
	}
	
	public boolean visit(MethodInvocation node) {
		IMethodBinding methodBinding = node.resolveMethodBinding();
		if (methodBinding != null) {
			String key = methodBinding.getKey();
			if (key != null) {
				key = key.replaceAll("%?<[^>]+>", "");
			}
			if (methodSignature.equals(key)) {
				isReferenced = true;
				return false;
			}
		}
		return super.visit(node);
	}
	
	public boolean visit(SuperMethodInvocation node) {
		IMethodBinding methodBinding = node.resolveMethodBinding();
		String key = null;
		if (methodBinding != null) {
			key = methodBinding.getKey();
			if (key != null) {
				key = key.replaceAll("%?<[^>]+>", "");
			}
		}
		if (methodSignature.equals(key)) {
			isReferenced = true;
			return false;
		}
		return super.visit(node);
	}

	}
