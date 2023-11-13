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

import java.util.Iterator;
import java.util.List;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.ASTVisitor;
import org.eclipse.jdt.core.dom.Annotation;
import org.eclipse.jdt.core.dom.BodyDeclaration;
import org.eclipse.jdt.core.dom.ClassInstanceCreation;
import org.eclipse.jdt.core.dom.ConstructorInvocation;
import org.eclipse.jdt.core.dom.EnumConstantDeclaration;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.Javadoc;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.SuperMethodInvocation;
import org.eclipse.jdt.core.dom.TagElement;

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
		this.methodSignature = methodSignature.replaceAll("%?<[^>]+>", "");
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
	
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.ConstructorInvocation)
	 */
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
	
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.EnumConstantDeclaration)
	 */
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
	
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.MethodInvocation)
	 */
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
	
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.SuperMethodInvocation)
	 */
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

	/**
	 * Method with "j2s*" tag.
	 * 
	 * @param node
	 * @return
	 */
	protected Object getJ2STag(BodyDeclaration node, String tagName) {
		Javadoc javadoc = node.getJavadoc();
		if (javadoc != null) {
			List tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if (tagName.equals(tagEl.getTagName())) {
						return tagEl;
					}
				}
			}
		}
		List modifiers = node.modifiers();
		for (Iterator iter = modifiers.iterator(); iter.hasNext();) {
			Object obj = (Object) iter.next();
			if (obj instanceof Annotation) {
				Annotation annotation = (Annotation) obj;
				String qName = annotation.getTypeName().getFullyQualifiedName();
				int idx = qName.indexOf("J2S");
				if (idx != -1) {
					String annName = qName.substring(idx);
					annName = annName.replaceFirst("J2S", "@j2s");
					if (annName.startsWith(tagName)) {
						return annotation;
					}
				}
			}
		}
		return null;
	}

	public boolean visit(MethodDeclaration node) {
		if (getJ2STag(node, "@j2sIgnore") != null) {
			return false;
		}

		IMethodBinding mBinding = node.resolveBinding();
		if (Bindings.isMethodInvoking(mBinding, "net.sf.j2s.ajax.SimpleRPCRunnable", "ajaxRun")) {
			if (getJ2STag(node, "@j2sKeep") == null) {
				return false;
			}
		}
		String[] pipeMethods = new String[] {
				"pipeSetup", 
				"pipeThrough", 
				"through",
				"pipeMonitoring",
				"pipeMonitoringInterval",
				"pipeWaitClosingInterval",
				"setPipeHelper"
		};
		for (int i = 0; i < pipeMethods.length; i++) {
			if (Bindings.isMethodInvoking(mBinding, "net.sf.j2s.ajax.SimplePipeRunnable", pipeMethods[i])) {
				if (getJ2STag(node, "@j2sKeep") == null) {
					return false;
				}
			}
		}
		if (Bindings.isMethodInvoking(mBinding, "net.sf.j2s.ajax.CompoundPipeSession", "convert")) {
			if (getJ2STag(node, "@j2sKeep") == null) {
				return false;
			}
		}
		return super.visit(node);
	}
	
}
