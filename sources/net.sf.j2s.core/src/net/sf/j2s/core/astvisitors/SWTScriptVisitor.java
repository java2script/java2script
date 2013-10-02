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

import java.util.Iterator;
import java.util.List;
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
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.Name;
import org.eclipse.jdt.core.dom.PrefixExpression;
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.Statement;
import org.eclipse.jdt.core.dom.WhileStatement;

public class SWTScriptVisitor extends ASTScriptVisitor {

	/**
	 * Mark whether current statement are before or after SWT's while block.
	 * <code>
	 * ...
	 * shell.open();
	 * while (!shell.isDisposed()) {
	 * 	if (!display.readAndDispatch())
	 * 		display.sleep();
	 * }
	 * display.dispose();
	 * ...
	 * </code>
	 */
	private boolean metSWTBlockWhile = false;
	
	/**
	 * Mark whether current statement are before or after Dialog#open call.
	 * <code>
	 * ...
	 * dialog.open();
	 * ...
	 * </code>
	 */
	private boolean metDialogOpen = false;

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
				swt + ".internal.browser", 
				swt + ".internal.struct", 
				swt + ".layout", 
				swt + ".widgets"
		};
		String[] pkgs = super.skipDeclarePackages();
		String[] packages = new String[swtInnerPackages.length + pkgs.length];
		System.arraycopy(pkgs, 0, packages, 0, pkgs.length);
		System.arraycopy(swtInnerPackages, 0, packages, pkgs.length, swtInnerPackages.length);
		return packages;
	}
	
	public boolean visit(SimpleName node) {
		String constValue = checkConstantValue(node);
		if (constValue != null) {
			buffer.append(constValue);
			return false;
		}
		IBinding binding = node.resolveBinding();
		if (binding != null
				&& binding instanceof ITypeBinding) {
			ITypeBinding typeBinding = (ITypeBinding) binding;
			if (typeBinding != null) {
				String name = typeBinding.getQualifiedName();
				if (name.startsWith("org.eclipse.swt.internal.xhtml.")
						|| name.startsWith("net.sf.j2s.html.")) {
					String identifier = node.getIdentifier();
					if ("window".equals(identifier)) {
						identifier = "w$";
					} else if ("document".equals(identifier)) {
						identifier = "d$";
					}
					buffer.append(identifier);
					return false;
				}
				if ("org.eclipse.swt.internal.browser.OS".equals(name)) {
					buffer.append("O$");
					return false;
				}
			}
		}
		return super.visit(node);
	}
	public boolean visit(QualifiedName node) {
		if (isSimpleQualified(node)) {
			String constValue = checkConstantValue(node);
			if (constValue != null) {
				buffer.append(constValue);
				return false;
			}
		}
		boolean staticFields = false;
		IVariableBinding varBinding = null;
		IBinding nameBinding = node.resolveBinding();
		if (nameBinding instanceof IVariableBinding) {
			varBinding = (IVariableBinding) nameBinding;
		}
		ITypeBinding declaring = null;
		String qdName = null;
		if (!supportsObjectStaticFields && varBinding != null 
				&& (varBinding.getModifiers() & Modifier.STATIC) != 0
				&& (declaring = varBinding.getDeclaringClass()) != null 
				&& !(qdName = declaring.getQualifiedName()).startsWith("org.eclipse.swt.internal.xhtml.")
				&& !qdName.startsWith("net.sf.j2s.html.")) {
			IBinding qBinding = node.getQualifier().resolveBinding();
			if (!(qBinding != null && qBinding instanceof ITypeBinding)) {
				staticFields = true;
			}
		}
		ASTNode parent = node.getParent();
		boolean qualifierVisited = false;
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
						// Compiling inner Class or enum type, like:
						// RadiusData.EnumType e = RadiusData.EnumType.THREE;
						// avoid generate duplicated RadiusData
						String name = typeBinding.getQualifiedName();
//						ITypeBinding declaringClass = typeBinding.getDeclaringClass();
//						if (declaringClass != null) {
//							name = declaringClass.getQualifiedName();
//						} else {
//							name = "";
//						}
						name = shortenQualifiedName(name);
						if (name.indexOf("java.lang.") == 0) {
							name = name.substring(10);
						}
						String xhtml = "org.eclipse.swt.internal.xhtml.";
						if (name.indexOf(xhtml) == 0) {
							name = name.substring(xhtml.length());
						}
						xhtml = "net.sf.j2s.html.";
						if (name.indexOf(xhtml) == 0) {
							name = name.substring(xhtml.length());
						}
						xhtml = "$wt.internal.xhtml.";
						if (name.indexOf(xhtml) == 0) {
							name = name.substring(xhtml.length());
						}
						if ("window".equals(name)) {
							name = "w$";
						} else if ("document".equals(name)) {
							name = "d$";
						}
						if (name.length() != 0) {
							if (staticFields) {
								if (qualifier instanceof SimpleName) {
									buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
								} else {
									buffer.append('(');
									buffer.append(name);
									buffer.append(", ");
									buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
									buffer.append(')');
								}
							} else {
								buffer.append(name);
							}
							buffer.append('.');
							qualifierVisited = true;
						}
					}
				}
			}
		}
		Name qName = node.getQualifier();
		String nodeStr = qName.toString();
		if (nodeStr.equals("net.sf.j2s.html")
				|| nodeStr.equals("org.eclipse.swt.internal.xhtml")) {
			node.getName().accept(this);
			return false;
		}
		if (!qualifierVisited) {
			if (staticFields) {
				if (qName instanceof SimpleName) {
					buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
				} else {
					buffer.append('(');
					node.getQualifier().accept(this);
					buffer.append(", ");
					buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
					buffer.append(')');
				}
			} else {
				node.getQualifier().accept(this);
			}
			buffer.append('.');
		}
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
		} else {
			String fqName = null;
			String name = getTypeStringName(node.getType());
			if (name != null) {
				fqName = name;//.getFullyQualifiedName();
			} else {
				fqName = "noname";
			}
			fqName = shortenQualifiedName(fqName);
			String filterKey = "org.eclipse.swt.internal.xhtml.";
			if (fqName.startsWith(filterKey)) {
				buffer.append(" new ");
				buffer.append(fqName.substring(filterKey.length()));
				buffer.append(" (");
				visitList(node.arguments(), ", ");
				buffer.append(")");
				return false;
			}
			filterKey = "net.sf.j2s.html.";
			if (fqName.startsWith(filterKey)) {
				buffer.append(" new ");
				buffer.append(fqName.substring(filterKey.length()));
				buffer.append(" (");
				visitList(node.arguments(), ", ");
				buffer.append(")");
				return false;
			}
			filterKey = "$wt.internal.xhtml.";
			if (fqName.startsWith(filterKey)) {
				buffer.append(" new ");
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
		if (methodBinding != null && "open".equals(methodBinding.getName()) && methodBinding.getParameterTypes().length == 0) {
			boolean isDialogBlock = false;
			boolean isWindowBlock = false;
			if ((isDialogBlock = Bindings.findTypeInHierarchy(methodBinding.getDeclaringClass(), "org.eclipse.swt.widgets.Dialog") != null)
					|| (!getPackageName().startsWith("org.eclipse.jface.")
							&& (isWindowBlock = Bindings.findTypeInHierarchy(methodBinding.getDeclaringClass(), "org.eclipse.jface.window.Window") != null))) {
				int lastIndexOf1 = buffer.lastIndexOf(";\r\n");
				if (lastIndexOf1 != -1) {
					lastIndexOf1 += 3;
				}
				int lastIndexOf2 = buffer.lastIndexOf("}\r\n");
				if (lastIndexOf2 != -1) {
					lastIndexOf2 += 3;
				}
				int lastIndexOf3 = buffer.lastIndexOf("}");
				if (lastIndexOf3 != -1) {
					lastIndexOf3 += 1;
				}
				int lastIndexOf4 = buffer.lastIndexOf("{\r\n");
				if (lastIndexOf4 != -1) {
					lastIndexOf4 += 3;
				}
				int lastIndexOf5 = buffer.lastIndexOf("{");
				if (lastIndexOf5 != -1) {
					lastIndexOf5 += 1;
				}
				int lastIndexOf = -1;
				if (lastIndexOf1 == -1 && lastIndexOf2 == -1 
						&& lastIndexOf3 == -1 && lastIndexOf1 == -1 
						&& lastIndexOf2 == -1 && lastIndexOf3 == -1) {
					lastIndexOf = buffer.length(); // should never be in here!
				} else {
					lastIndexOf = Math.max(Math.max(Math.max(lastIndexOf1, lastIndexOf2), lastIndexOf3), 
							Math.max(lastIndexOf4, lastIndexOf5)); 
				}
				String s = buffer.substring(lastIndexOf);
				buffer.delete(lastIndexOf, buffer.length());
				if (isDialogBlock) {
					buffer.append("DialogSync2Async.block (");
				} else if (isWindowBlock) {
					buffer.append("net.sf.j2s.ajax.AWindowDelegate.asyncOpen (");
				}
				node.getExpression().accept(this);
				buffer.append(", this, function () {\r\n");
				buffer.append(s);
				node.getExpression().accept(this);
				if (isDialogBlock) {
					buffer.append(".dialogReturn");
				} else if (isWindowBlock) {
					buffer.append(".getReturnCode ()");
				}
				metDialogOpen = true;
				return false;
			}
		}
		if (methodBinding != null && "net.sf.j2s.ajax.junit.AsyncSWT".equals(methodBinding.getDeclaringClass().getQualifiedName())
				&& "waitLayout".equals(methodBinding.getName())) {
			metSWTBlockWhile = true;
			node.getExpression().accept(this);
			buffer.append(".waitLayout (");
			Expression shellExp = (Expression) node.arguments().get(0);
			shellExp.accept(this);
			buffer.append(", ");
			Expression runnableExp = (Expression) node.arguments().get(1);
			runnableExp.accept(this);
			buffer.append(", this, function () {\r\n//");
			return false;
		}
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
			} else if (Bindings.isMethodInvoking(methodBinding, filterMethods[i], filterMethods[i + 1])) {
				return;
			}
		}
		super.endVisit(node);
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
	
	public boolean visit(Block node) {
		int swtBlockWhileCount = 0;
		int swtDialogOpenCount = 0;
		boolean lastSWTBlockWhile = metSWTBlockWhile;
		metSWTBlockWhile = false;
		boolean lastDialogOpen = metDialogOpen;
		metDialogOpen = false;
		if (super.visit(node) == false) {
			metSWTBlockWhile = lastSWTBlockWhile;
			metDialogOpen = lastDialogOpen;
			return false;
		}
		List statements = node.statements();
		for (Iterator iter = statements.iterator(); iter.hasNext();) {
			Statement stmt = (Statement) iter.next();
			if (stmt instanceof ExpressionStatement) {
				ExpressionStatement expStmt = (ExpressionStatement) stmt;
				Expression exp = expStmt.getExpression();
				String[] filterMethods = getFilterMethods();
				boolean isContinue = false;
				for (int i = 0; i < filterMethods.length; i += 2) {
					if ("*".equals(filterMethods[i + 1])) {
						continue;
					} else if (Bindings.isMethodInvoking(exp, filterMethods[i], filterMethods[i + 1])) {
						isContinue = true;
						break;
					}
				}
				if (isContinue) {
					continue;
				}
			}
			stmt.accept(this);
			if (metSWTBlockWhile) {
				swtBlockWhileCount++;
				metSWTBlockWhile = false;
			}
			if (metDialogOpen) {
				swtDialogOpenCount++;
				metDialogOpen = false;
			}
		}
		for (int i = 0; i < swtBlockWhileCount + swtDialogOpenCount; i++) {
			buffer.append("});\r\n");
			buffer.append("return;\r\n"); /* always return directly when dialog#open is called */
		}
		metSWTBlockWhile = lastSWTBlockWhile;
		metDialogOpen = lastDialogOpen;
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
				if (Bindings.isMethodInvoking(exp, "org.eclipse.swt.widgets.Widget", "error")) {
					return false;
				}
				if (Bindings.isMethodInvoking(exp, "org.eclipse.swt.SWT", "error")) {
					return false;
				}
				if (Bindings.isMethodInvoking(exp, "org.eclipse.swt.widgets.Display", "error")) {
					return false;
				}
			}
		}
		return super.visit(node);
	}
}
