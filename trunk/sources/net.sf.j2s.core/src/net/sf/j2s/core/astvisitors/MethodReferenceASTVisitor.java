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

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.ASTVisitor;
import org.eclipse.jdt.core.dom.ClassInstanceCreation;
import org.eclipse.jdt.core.dom.ConstructorInvocation;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.SuperMethodInvocation;

/**
 * This visitor is used to find out those private methods that are never 
 * referenced.
 * 
 * @author zhou renjian
 * 2006-5-1
 */
public class MethodReferenceASTVisitor extends ASTVisitor {

	private boolean isReferenced;
	private String methodSignature;

	private MethodReferenceASTVisitor(String methodSignature) {
		super();
		this.methodSignature = methodSignature;
	}
	
	public static boolean checkReference(ASTNode node, String methodSignature) {
		MethodReferenceASTVisitor methodRefVisitor = new MethodReferenceASTVisitor(methodSignature);
		methodRefVisitor.isReferenced = false;
		/*
		 * TODO: Should use a faster return method!
		 */
		node.accept(methodRefVisitor);
		return methodRefVisitor.isReferenced;
	}

	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.ClassInstanceCreation)
	 */
	public boolean visit(ClassInstanceCreation node) {
		IMethodBinding constructorBinding = node.resolveConstructorBinding();
		if (methodSignature.equals(constructorBinding.getKey())) {
			isReferenced = true;
			return false;
		}
		return super.visit(node);
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.ConstructorInvocation)
	 */
	public boolean visit(ConstructorInvocation node) {
		IMethodBinding constructorBinding = node.resolveConstructorBinding();
		if (methodSignature.equals(constructorBinding.getKey())) {
			isReferenced = true;
			return false;
		}
		return super.visit(node);
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.MethodInvocation)
	 */
	public boolean visit(MethodInvocation node) {
		IMethodBinding methodBinding = node.resolveMethodBinding();
		if (methodSignature.equals(methodBinding.getKey())) {
			isReferenced = true;
			return false;
		}
		return super.visit(node);
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.SuperMethodInvocation)
	 */
	public boolean visit(SuperMethodInvocation node) {
		IMethodBinding methodBinding = node.resolveMethodBinding();
		if (methodSignature.equals(methodBinding.getKey())) {
			isReferenced = true;
			return false;
		}
		return super.visit(node);
	}
	
}
