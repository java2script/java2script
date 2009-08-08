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

import java.util.List;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.ExpressionStatement;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IfStatement;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.Statement;

/**
 * @author zhou renjian
 *
 * 2006-8-5
 */
public class SWTDependencyASTVisitor extends DependencyASTVisitor {

	protected String[] getFilterMethods() {
		return new String[] {
				"org.eclipse.swt.widgets.Widget", "checkSubclass",
				"org.eclipse.swt.widgets.Dialog", "checkSubclass",
				"org.eclipse.swt.widgets.Widget", "checkWidget",
				"org.eclipse.swt.widgets.Display", "checkDevice",
				"org.eclipse.swt.graphics.Device", "checkDevice",
				"org.eclipse.jface.util.Assert", "*",
				"org.eclipse.core.internal.commands.util.Assert", "*",
				"org.eclipse.core.internal.runtime.Assert", "*"
		};
	}
	
	/* (non-Javadoc)
	 * @see net.sf.j2s.core.astvisitors.ASTScriptVisitor#visit(org.eclipse.jdt.core.dom.MethodInvocation)
	 */
	public boolean visit(MethodInvocation node) {
		IMethodBinding methodBinding = node.resolveMethodBinding();
		String[] filterMethods = getFilterMethods();
		for (int i = 0; i < filterMethods.length; i += 2) {
			if ("*".equals(filterMethods[i + 1])) {
				if (methodBinding == null) {
					continue;
				}
				ITypeBinding type = methodBinding.getDeclaringClass();
				if (type != null && filterMethods[i].equals(type.getQualifiedName())) {
					return false;
				}
			} else if (Bindings.isMethodInvoking(methodBinding, filterMethods[i], filterMethods[i + 1])) {
				return false;
			}
		}
		return super.visit(node);
	}
	
	/* (non-Javadoc)
	 * @see net.sf.j2s.core.astvisitors.ASTScriptVisitor#visit(org.eclipse.jdt.core.dom.MethodDeclaration)
	 */
	public boolean visit(MethodDeclaration node) {
		IMethodBinding methodBinding = node.resolveBinding();
		String[] filterMethods = getFilterMethods();
		for (int i = 0; i < filterMethods.length; i += 2) {
			if ("*".equals(filterMethods[i + 1])) {
				if (methodBinding == null) {
					continue;
				}
				ITypeBinding type = methodBinding.getDeclaringClass();
				if (type != null && filterMethods[i].equals(type.getQualifiedName())) {
					return false;
				}
			} else if (Bindings.isMethodInvoking(methodBinding, filterMethods[i], filterMethods[i + 1])) {
				return false;
			}
		}
		return super.visit(node);
	}

	/* (non-Javadoc)
	 * @see net.sf.j2s.core.astvisitors.ASTScriptVisitor#endVisit(org.eclipse.jdt.core.dom.MethodDeclaration)
	 */
	public void endVisit(MethodDeclaration node) {
		IMethodBinding methodBinding = node.resolveBinding();
		String[] filterMethods = getFilterMethods();
		for (int i = 0; i < filterMethods.length; i += 2) {
			if ("*".equals(filterMethods[i + 1])) {
				if (methodBinding == null) {
					continue;
				}
				ITypeBinding type = methodBinding.getDeclaringClass();
				if (type != null && filterMethods[i].equals(type.getQualifiedName())) {
					return;
				}
			} else if (isMethodInvoking(methodBinding, filterMethods[i], filterMethods[i + 1])) {
				return;
			}
		}
		super.endVisit(node);
	}

	private boolean isMethodInvoking(IMethodBinding methodBinding, String className, String methodName) {
		if (methodBinding != null && methodName.equals(methodBinding.getName())) {
			IMethodBinding findMethodInHierarchy = Bindings.findMethodInHierarchy(methodBinding.getDeclaringClass(), methodName, null);
			IMethodBinding last = findMethodInHierarchy;
			int count = 0;
			while (findMethodInHierarchy != null && (count++) < 10) {
				last = findMethodInHierarchy;
				ITypeBinding superclass = last.getDeclaringClass().getSuperclass();
				if (superclass == null) {
					break;
				}
				findMethodInHierarchy = 
					Bindings.findMethodInHierarchy(superclass, methodName, null);
			}
			if (last == null) {
				last = methodBinding;
			}
			if (className.equals(last.getDeclaringClass().getQualifiedName())) {
				return true;
			}
		}
		return false;
	}

	private boolean isMethodInvoking(Expression exp, String className, String methodName) {
		if (exp instanceof MethodInvocation) {
			MethodInvocation method = (MethodInvocation) exp;
			IMethodBinding methodBinding = method.resolveMethodBinding();
			if (isMethodInvoking(methodBinding, className, methodName)) {
				return true;
			}
		}
		return false;
	}

	public boolean visit(IfStatement node) {
		if (node.getElseStatement() == null) {
			Statement thenStatement = node.getThenStatement();
			if (thenStatement instanceof Block) {
				Block block = (Block) thenStatement;
				List statements = block.statements();
				if (statements.size() == 1) {
					thenStatement = (Statement) statements.get(0);
				}
			}
			if (thenStatement instanceof ExpressionStatement) {
				ExpressionStatement expStmt = (ExpressionStatement) thenStatement;
				Expression exp = expStmt.getExpression();
				if (isMethodInvoking(exp, "org.eclipse.swt.widgets.Widget", "error")) {
					return false;
				}
				if (isMethodInvoking(exp, "org.eclipse.swt.SWT", "error")) {
					return false;
				}
				if (isMethodInvoking(exp, "org.eclipse.swt.widgets.Display", "error")) {
					return false;
				}
			}
		}
		return super.visit(node);
	}
}
