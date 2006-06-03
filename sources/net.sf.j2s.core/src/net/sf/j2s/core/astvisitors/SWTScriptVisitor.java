/*******************************************************************************
 * Copyright (c) 2005 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/
package net.sf.j2s.core.astvisitors;

import java.util.Iterator;
import java.util.List;

import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.AnonymousClassDeclaration;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.ClassInstanceCreation;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.ExpressionStatement;
import org.eclipse.jdt.core.dom.IBinding;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IVariableBinding;
import org.eclipse.jdt.core.dom.IfStatement;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.Name;
import org.eclipse.jdt.core.dom.PrefixExpression;
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.Statement;
import org.eclipse.jdt.core.dom.WhileStatement;

public class SWTScriptVisitor extends ASTScriptVisitor {

//	private StringBuffer bufferRemoved = new StringBuffer();
	private boolean metSWTBlockWhile = false;

	public SWTScriptVisitor() {
		super();
	}

	public SWTScriptVisitor(boolean visitDocTags) {
		super(visitDocTags);
	}

	/* (non-Javadoc)
	 * @see net.sf.j2s.core.astvisitors.ASTKeywordParser#skipDeclarePackages()
	 */
	protected String[] skipDeclarePackages() {
		String swt = "org.eclipse.swt";
		String[] swtInnerPackages = new String[]{
				swt, 
				swt + ".accessibility", 
				swt + ".browser", 
				swt + ".custom", 
				swt + ".dnd",
				swt + ".events", 
				swt + ".graphics", 
				swt + ".internal", 
				swt + ".internal.dnd", 
				swt + ".layout", 
				swt + ".widgets"
		};
		String[] pkgs = super.skipDeclarePackages();
		String[] packages = new String[swtInnerPackages.length + pkgs.length];
		System.arraycopy(pkgs, 0, packages, 0, pkgs.length);
		System.arraycopy(swtInnerPackages, 0, packages, pkgs.length, swtInnerPackages.length);
		return packages;
	}
//	public boolean visit(MethodDeclaration node) {
//		String methodName = node.getName().getIdentifier();
//		if (methodName.startsWith("WM_") || methodName.startsWith("wm")) {
//			StringBuffer buf = buffer;
//			buffer = new StringBuffer();
//			boolean b = super.visit(node);
//			bufferRemoved.append(buffer);
//			buffer = buf;
//			return b;
//		}
//		return super.visit(node);
//	}
//
//	public StringBuffer getBufferRemoved() {
//		return bufferRemoved;
//	}
	
	public boolean visit(SimpleName node) {
		Object constValue = node.resolveConstantExpressionValue();
		if (constValue != null && (constValue instanceof Number
				|| constValue instanceof Boolean)) {
			buffer.append(constValue);
			return false;
		}
		IBinding binding = node.resolveBinding();
		if (binding != null
				&& binding instanceof ITypeBinding) {
			ITypeBinding typeBinding = (ITypeBinding) binding;
			if (typeBinding != null) {
				String name = typeBinding.getQualifiedName();
				if (name.startsWith("org.eclipse.swt.internal.xhtml")) {
					String identifier = node.getIdentifier();
					if ("window".equals(identifier)) {
						identifier = "w$";
					} else if ("document".equals(identifier)) {
						identifier = "d$";
					}
					buffer.append(identifier);
					return false;
				}
			}
		}
		return super.visit(node);
	}
	public boolean visit(QualifiedName node) {
		Object constValue = node.resolveConstantExpressionValue();
		if (constValue != null && (constValue instanceof Number
				|| constValue instanceof Boolean)
				&& isSimpleQualified(node)) {
			buffer.append(constValue);
			return false;
		}
//		IBinding nodeBinding = node.resolveBinding();
//		if (nodeBinding instanceof IVariableBinding) {
//			IVariableBinding varBinding = (IVariableBinding) nodeBinding;
//			if ((varBinding.getModifiers() & Modifier.STATIC) != 0) {
//				ASTNode parent = node.getParent();
//				if (parent != null && !(parent instanceof QualifiedName)) {
//					Name qName = node.getQualifier();
//					IBinding qBinding = qName.resolveBinding();
//					if (qBinding instanceof IVariableBinding) {
//						buffer.append("(((");
//						qName.accept(this);
//						buffer.append(") || true) ? ");
//						buffer.append(varBinding.getDeclaringClass().getQualifiedName());
//						buffer.append('.');
//						node.getName().accept(this);
//						buffer.append(" : 0)");
//						return false;
//					}
//				}
//			}
//		}
		ASTNode parent = node.getParent();
		if (parent != null && !(parent instanceof QualifiedName)) {
			Name qualifier = node.getQualifier();
			while (qualifier instanceof QualifiedName) {
				IBinding binding = qualifier.resolveBinding();
				if (binding != null && !(binding instanceof IVariableBinding)) {
					Name xqualifier = ((QualifiedName) qualifier).getQualifier();
					if (xqualifier instanceof QualifiedName) {
						IBinding xbinding = qualifier.resolveBinding();
						if (xbinding != null && !(xbinding instanceof IVariableBinding)) {
							qualifier = xqualifier;
							continue;
						}
					}
				}
				break;
			}
			IBinding binding = qualifier.resolveBinding();
			if (binding != null) {
				if (!(binding instanceof IVariableBinding)) {
					ITypeBinding typeBinding = qualifier.resolveTypeBinding();
					if (typeBinding != null) {
						String name = null;
						ITypeBinding declaringClass = typeBinding.getDeclaringClass();
						if (declaringClass != null) {
							name = declaringClass.getQualifiedName();
						} else {
//							IPackageBinding pkg = typeBinding.getPackage();
//							if (pkg != null) {
//								name = pkg.getName();
//							} else {
								name = "";
//							}
						}
						name = JavaLangUtil.ripJavaLang(name);
//						System.out.println("---" + name);
						//*
						if (name.indexOf("java.lang") != -1) {
							name = name.substring(9);
						}
						//*/
						String xhtml = "org.eclipse.swt.internal.xhtml";
						if (name.indexOf(xhtml) == 0) {
							name = name.substring(xhtml.length());
						}
						xhtml = "$wt.internal.xhtml";
						if (name.indexOf(xhtml) == 0) {
							name = name.substring(xhtml.length());
						}
//						System.out.println("xvs - " + name);
						if ("window".equals(name)) {
							name = "w$";
						} else if ("document".equals(name)) {
							name = "d$";
						}
						if (name.length() != 0) {
							buffer.append(name);
							buffer.append('.');
						}
					}
//				} else {
//					IVariableBinding varBinding = (IVariableBinding) binding;
//					if ((varBinding.getModifiers() & Modifier.STATIC) != 0) {
//						
//					}
				}
			}
		}
		node.getQualifier().accept(this);
		buffer.append('.');
		node.getName().accept(this);
		return false;
	}
	public boolean visit(ClassInstanceCreation node) {
		ITypeBinding binding = node.resolveTypeBinding();
		if (binding != null) {
			if (isTypeOf(binding, "org.eclipse.swt.internal.RunnableCompatibility")) {
				buffer.append("Clazz.makeFunction (");
				boolean result = super.visit(node);
				buffer.append(")");
				return result;
			}
		}
		AnonymousClassDeclaration anonDeclare = node.getAnonymousClassDeclaration();
		if (anonDeclare != null) {
				/*
				ITypeBinding[] interfaces = binding.getInterfaces();
				if (interfaces != null && interfaces.length == 1) {
					//System.out.println(interfaces[0].getQualifiedName());
					if ("org.eclipse.swt.internal.RunnableCompatibility"
							.equals(JavaLangUtil.ripGeneric(interfaces[0].getQualifiedName()))) {
						buffer.append("Clazz.makeFunction (");
						boolean result = super.visit(node);
						buffer.append(")");
						return result;
					}
				} else {
					ITypeBinding superclass = binding.getSuperclass();
					if ("org.eclipse.swt.internal.RunnableCompatibility"
							.equals(JavaLangUtil.ripGeneric(superclass.getQualifiedName()))) {
						buffer.append("Clazz.makeFunction (");
						boolean result = super.visit(node);
						buffer.append(")");
						return result;
					}
				}
				//System.out.println(interfaces);
				*/
		} else {
			String fqName = null;
			if (node.getAST().apiLevel() != AST.JLS3) {
				fqName = node.getName().getFullyQualifiedName();
			} else {
				String name = ASTJL3.getTypeStringName(node.getType());
				if (name != null) {
					fqName = name;//.getFullyQualifiedName();
				} else {
					fqName = "noname";
				}
				//System.out.println("---- ---");
			}
			//System.out.println(fqName);
			fqName = JavaLangUtil.ripJavaLang(fqName);
			//System.out.println(fqName);
			String filterKey = "org.eclipse.swt.internal.xhtml.";
			if (fqName.startsWith(filterKey)) {
				buffer.append(" new ");
				//buffer.append(node.getName());
				buffer.append(fqName.substring(filterKey.length()));
				buffer.append(" (");
				visitList(node.arguments(), ", ");
				buffer.append(")");
				return false;
			}
			filterKey = "$wt.internal.xhtml.";
			if (fqName.startsWith(filterKey)) {
				buffer.append(" new ");
				//buffer.append(node.getName());
				buffer.append(fqName.substring(filterKey.length()));
				buffer.append(" (");
				visitList(node.arguments(), ", ");
				buffer.append(")");
				return false;
			}
		}
		return super.visit(node);
	}
	
	boolean isTypeOf(ITypeBinding binding, String clazzName) {
		if (binding == null || clazzName == null || clazzName.length() == 0) {
			return false;
		}
		if (clazzName.equals(binding.getBinaryName())) {
			return true;
		} else {
			return isTypeOf(binding.getSuperclass(), clazzName);
		}
	}
	public boolean visit(WhileStatement node) {
		Expression exp = node.getExpression();
		if (exp instanceof PrefixExpression) {
			PrefixExpression preExp = (PrefixExpression) exp;
			if ("!".equals(preExp.getOperator().toString())) {
				Expression operand = preExp.getOperand();
				if (operand instanceof MethodInvocation) {
					MethodInvocation shellIsDisposed = (MethodInvocation) operand;
					Expression shellExp = shellIsDisposed.getExpression();
					if (shellExp != null) {
						ITypeBinding typeBinding = shellExp.resolveTypeBinding();
						if (isTypeOf(typeBinding, "org.eclipse.swt.widgets.Shell")) {
							SimpleName methodName = shellIsDisposed.getName();
							if ("isDisposed".equals(methodName.getIdentifier())) {
								metSWTBlockWhile = true;
								buffer.append("Sync2Async.block (");
								shellExp.accept(this);
								buffer.append(", this, function () {\r\n");
								return false;
							}
						}
					}
				}
			}
		}
		return super.visit(node);
	}
	
	public void endVisit(Block node) {
		super.endVisit(node);
	}

	public boolean visit(Block node) {
		int swtBlockWhileCount = 0;
		boolean lastSWTBlockWhile = metSWTBlockWhile;
		metSWTBlockWhile = false;
		if (super.visit(node) == false) {
			return false;
		}
		List statements = node.statements();
		for (Iterator iter = statements.iterator(); iter.hasNext();) {
			Statement stmt = (Statement) iter.next();
			if (stmt instanceof ExpressionStatement) {
				ExpressionStatement expStmt = (ExpressionStatement) stmt;
				Expression exp = expStmt.getExpression();
				if (isMethodInvoking(exp, "org.eclipse.swt.widgets.Widget", "checkWidget")) {
					continue;
				}
				if (isMethodInvoking(exp, "org.eclipse.swt.widgets.Display", "checkDevice")) {
					continue;
				}
				if (isMethodInvoking(exp, "org.eclipse.swt.graphics.Device", "checkDevice")) {
					continue;
				}
			}
			stmt.accept(this);
			if (metSWTBlockWhile) {
				swtBlockWhileCount++;
				metSWTBlockWhile = false;
			}
		}
		for (int i = 0; i < swtBlockWhileCount; i++) {
			buffer.append("});\r\n");
		}
		metSWTBlockWhile = lastSWTBlockWhile;
		return false;
		//return super.visit(node);
	}
	
	private boolean isMethodInvoking(Expression exp, String className, String methodName) {
		if (exp instanceof MethodInvocation) {
			MethodInvocation method = (MethodInvocation) exp;
			IMethodBinding methodBinding = method.resolveMethodBinding();
			if (methodName.equals(methodBinding.getName()) &&className.equals(
					methodBinding.getDeclaringClass().getQualifiedName())) {
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
