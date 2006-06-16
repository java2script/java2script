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

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.ASTVisitor;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.FieldDeclaration;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.Initializer;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.PackageDeclaration;
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.core.dom.TypeDeclaration;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;

/**
 * @author josson smith
 * 
 * 2006-5-2
 */
public class DependencyASTVisitor extends ASTVisitor {
	protected StringBuffer buffer = new StringBuffer();

	protected String thisPackageName = "";

	protected Set musts = new HashSet();
	
	protected Set requires = new HashSet();
	
	protected Set optionals = new HashSet();
	
	
	public DependencyASTVisitor() {
		super();
	}

	public DependencyASTVisitor(boolean visitDocTags) {
		super(visitDocTags);
	}

	public StringBuffer getBuffer() {
		return buffer;
	}

	public void setBuffer(StringBuffer buffer) {
		this.buffer = buffer;
	}

	public String getPackageName() {
		return thisPackageName;
	}
	
	public String getMusts() {
		StringBuffer buf = new StringBuffer();
		buf.append("musts=");
		for (Iterator iter = musts.iterator(); iter.hasNext();) {
			String className = (String) iter.next();
			buf.append(className);
			if (iter.hasNext()) {
				buf.append(", ");
			}
		}
		return buf.toString();
	}
	
	public String getRequires() {
		StringBuffer buf = new StringBuffer();
		buf.append("requires=");
		for (Iterator iter = requires.iterator(); iter.hasNext();) {
			String className = (String) iter.next();
			buf.append(className);
			if (iter.hasNext()) {
				buf.append(", ");
			}
		}
		return buf.toString();
	}
	
	public String getOptionals() {
		StringBuffer buf = new StringBuffer();
		buf.append("optionals=");
		for (Iterator iter = optionals.iterator(); iter.hasNext();) {
			String className = (String) iter.next();
			buf.append(className);
			if (iter.hasNext()) {
				buf.append(", ");
			}
		}
		return buf.toString();
	}

	public boolean visit(PackageDeclaration node) {
		thisPackageName = "" + node.getName();
		return false;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.TypeDeclaration)
	 */
	public boolean visit(TypeDeclaration node) {
		visitForMusts(node);
		visitForRequires(node);
		visitForOptionals(node);
		return super.visit(node);
	}

	protected void visitForMusts(TypeDeclaration node) {
		Type superclassType = node.getSuperclassType();
		if (superclassType != null) {
			ITypeBinding superBinding = superclassType.resolveBinding();
			if (superBinding != null) {
				musts.add(superBinding.getQualifiedName());
			}
		}
		List superInterfaces = node.superInterfaceTypes();
		int size = superInterfaces.size();
		if (size != 0) {
			for (Iterator iter = superInterfaces.iterator(); iter.hasNext();) {
				ASTNode element = (ASTNode) iter.next();
				ITypeBinding binding = ((Type) element).resolveBinding();
				if (binding != null) {
					musts.add(binding.getQualifiedName());
				} else {
					musts.add(element.toString());
				}
			}
		}
	}

	protected void visitForRequires(TypeDeclaration node) {
		for (Iterator iter = node.bodyDeclarations().iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof TypeDeclaration) {
				if (node.isInterface() || (node.getModifiers() & Modifier.STATIC) != 0) {
					DependencyASTVisitor visitor = new DependencyASTVisitor();
					element.accept(visitor);
					requires.addAll(visitor.musts);
					requires.addAll(visitor.requires);
					requires.addAll(visitor.optionals);
				}
			} else if (element instanceof Initializer) {
				DependencyASTVisitor visitor = new DependencyASTVisitor();
				element.accept(this);
				requires.addAll(visitor.musts);
				requires.addAll(visitor.requires);
				requires.addAll(visitor.optionals);
			} else if (element instanceof FieldDeclaration) {
				FieldDeclaration field = (FieldDeclaration) element;
//				if ((field.getModifiers() & Modifier.STATIC) != 0) {
					List fragments = field.fragments();
					for (int j = 0; j < fragments.size(); j++) {
						VariableDeclarationFragment vdf = (VariableDeclarationFragment) fragments
								.get(j);
						Expression initializer = vdf.getInitializer();
						DependencyASTVisitor visitor = new DependencyASTVisitor();
						if (initializer != null) {
							initializer.accept(visitor);
						}
						requires.addAll(visitor.musts);
						requires.addAll(visitor.requires);
						requires.addAll(visitor.optionals);
					}
//				} else if (node.isInterface()) {
//					List fragments = field.fragments();
//					for (int j = 0; j < fragments.size(); j++) {
//						VariableDeclarationFragment vdf = (VariableDeclarationFragment) fragments
//								.get(j);
//						Expression initializer = vdf.getInitializer();
//						DependencyASTVisitor visitor = new DependencyASTVisitor();
//						if (initializer != null) {
//							initializer.accept(visitor);
//						}
//						requires.addAll(visitor.musts);
//						requires.addAll(visitor.requires);
//						requires.addAll(visitor.optionals);
//					}
//				}
			}
		}
	}

	protected void visitForOptionals(TypeDeclaration node) {

	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.SimpleName)
	 */
	public boolean visit(SimpleName node) {
		ITypeBinding typeBinding = node.resolveTypeBinding();
		if (typeBinding != null) {
			String qualifiedName = null;
			if (!typeBinding.isPrimitive()) {
				if (typeBinding.isArray()) {
					ITypeBinding elementType = typeBinding.getElementType();
					while (elementType.isArray()) {
						elementType = elementType.getElementType();
					}
					if (!elementType.isPrimitive()) {
						qualifiedName = elementType.getQualifiedName();
					}
				} else {
					qualifiedName = typeBinding.getQualifiedName();
				}
			}
			if ("byte".equals(qualifiedName)) {
				System.out.println("fds");
			}
			if (qualifiedName != null 
					&& !"java.lang.Object".equals(qualifiedName)
					&& !"java.lang.Class".equals(qualifiedName)
					&& !"java.lang.String".equals(qualifiedName)
					&& !"java.lang.System".equals(qualifiedName)
					&& !"java.io.PrintStream".equals(qualifiedName)
					&& !"java.lang.Math".equals(qualifiedName)
					&& !"java.lang.Integer".equals(qualifiedName)
					&& !qualifiedName.startsWith("org.eclipse.swt.internal.xhtml.")) {
				ASTNode root = node.getRoot();
				if (root instanceof CompilationUnit) {
					CompilationUnit type = (CompilationUnit) root;
					boolean existedSelf = false;
					List types = type.types();
					for (Iterator iter = types.iterator(); iter.hasNext();) {
						TypeDeclaration typeDecl = (TypeDeclaration) iter.next();
						if (typeDecl.resolveBinding().getQualifiedName().equals(qualifiedName)) {
							existedSelf = true;
							break;
						}
					}
					if (!existedSelf 
							&& !musts.contains(qualifiedName)
							&& !requires.contains(qualifiedName)) {
						optionals.add(qualifiedName);
					}
				}
			}
		}
//		ASTNode parent = node.getParent();
//		if (parent instanceof QualifiedName) {
//			QualifiedName qName = (QualifiedName) parent;
//			if (node == qName.getName()) {
//				
//			}
//		}
		return super.visit(node);
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.core.dom.ASTVisitor#visit(org.eclipse.jdt.core.dom.QualifiedName)
	 */
	public boolean visit(QualifiedName node) {
		// TODO Auto-generated method stub
		return super.visit(node);
	}
}
