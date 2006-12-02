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
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.jdt.core.dom.AnonymousClassDeclaration;
import org.eclipse.jdt.core.dom.ArrayType;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.CastExpression;
import org.eclipse.jdt.core.dom.ClassInstanceCreation;
import org.eclipse.jdt.core.dom.ConstructorInvocation;
import org.eclipse.jdt.core.dom.EnumConstantDeclaration;
import org.eclipse.jdt.core.dom.EnumDeclaration;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.ExpressionStatement;
import org.eclipse.jdt.core.dom.FieldAccess;
import org.eclipse.jdt.core.dom.FieldDeclaration;
import org.eclipse.jdt.core.dom.IBinding;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IVariableBinding;
import org.eclipse.jdt.core.dom.Initializer;
import org.eclipse.jdt.core.dom.Javadoc;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.Name;
import org.eclipse.jdt.core.dom.NullLiteral;
import org.eclipse.jdt.core.dom.PrimitiveType;
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.QualifiedType;
import org.eclipse.jdt.core.dom.ReturnStatement;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.SimpleType;
import org.eclipse.jdt.core.dom.SingleVariableDeclaration;
import org.eclipse.jdt.core.dom.SuperConstructorInvocation;
import org.eclipse.jdt.core.dom.SuperFieldAccess;
import org.eclipse.jdt.core.dom.SuperMethodInvocation;
import org.eclipse.jdt.core.dom.TagElement;
import org.eclipse.jdt.core.dom.TextElement;
import org.eclipse.jdt.core.dom.ThisExpression;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.core.dom.TypeDeclaration;
import org.eclipse.jdt.core.dom.TypeDeclarationStatement;
import org.eclipse.jdt.core.dom.TypeLiteral;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;
import org.eclipse.jdt.core.dom.PrimitiveType.Code;

public class ASTScriptVisitor extends ASTKeywordParser {

	private StringBuffer laterBuffer = new StringBuffer();

	private String thisClassName = "";
	
	private int anonymousCount = 0;
	
	//private boolean isInnerClass = false;

	protected AbstractTypeDeclaration rootTypeNode;
	
	public ASTScriptVisitor() {
		super();
	}

	public ASTScriptVisitor(boolean visitDocTags) {
		super(visitDocTags);
	}

	public int getAnonymousCount() {
		return anonymousCount;
	}

	public String getClassName() {
		return thisClassName;
	}
	
	public String getFullClassName() {
		String fullClassName = null;
		if (thisPackageName != null && thisPackageName.length() != 0
				&& !"java.lang".equals(thisPackageName)) {
			fullClassName = thisPackageName + '.' + thisClassName;
		} else {
			fullClassName = thisClassName;
		}
		return fullClassName;
	}
	
	public void endVisit(AnonymousClassDeclaration node) {
		super.endVisit(node);
	}

	public boolean visit(AnonymousClassDeclaration node) {
		ITypeBinding binding = node.resolveBinding();
		anonymousCount++;
		//ClassInstanceCreation parent = (ClassInstanceCreation) node.getParent();
		String anonymousName = thisClassName + "$" + anonymousCount;

		String fullClassName = null;
		if (thisPackageName != null && thisPackageName.length() != 0) {
			fullClassName = thisPackageName + '.' + anonymousName;
		} else {
			fullClassName = anonymousName;
		}
		buffer.append("if (!Clazz.isClassDefined (\"");
		buffer.append(fullClassName);
		buffer.append("\")) {\r\n");
		buffer.append("Clazz.pu$h ();\r\n");
		buffer.append("cla$$ = ");
		//buffer.append("Clazz.decorateAsType (");
		buffer.append("Clazz.decorateAsClass (");
//		buffer.append(JavaLangUtil.ripJavaLang(fullClassName));
		String oldClassName = thisClassName;
		thisClassName = anonymousName;
//		buffer.append(" = function () {\r\n");
		buffer.append("function () {\r\n");
		if (!(node.getParent() instanceof EnumConstantDeclaration)) {
			buffer.append("Clazz.prepareCallback (this, arguments);\r\n");
		}
		StringBuffer oldLaterBuffer = laterBuffer;
		laterBuffer = new StringBuffer();
		List bodyDeclarations = node.bodyDeclarations();

		boolean needPreparation = false;
		for (Iterator iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof FieldDeclaration) {
				FieldDeclaration field = (FieldDeclaration) element;
				needPreparation = isFieldNeedPreparation(field);
				if (needPreparation) {
					break;
				}
			}
		}
		
		for (Iterator iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof MethodDeclaration) {
				//MethodDeclaration method = (MethodDeclaration) element;
				//if ((method.getModifiers() & Modifier.STATIC) != 0) {
					continue;
				//}
				// there are no static members/methods in the inner type 
				// but there are static final members
//			} else if (element instanceof Initializer) {
//				continue;
			} else if (element instanceof FieldDeclaration
					/*&& isFieldNeedPreparation((FieldDeclaration) element)*/) {
//				continue;
				FieldDeclaration fieldDeclaration = (FieldDeclaration) element;
				if (isFieldNeedPreparation(fieldDeclaration)) {
					visitWith(fieldDeclaration, true);
					continue;
				}
			}
			element.accept(this);
//			element.accept(this);
		}
		
//		ASTScriptVisitor scriptVisitor = new ASTScriptVisitor();
//		scriptVisitor.isInnerClass = true;
//		scriptVisitor.thisClassName = anonymousName;
//		node.accept(scriptVisitor);
//		buffer.append(scriptVisitor.getBuffer());
		
		buffer.append("Clazz.instantialize (this, arguments);\r\n");
		
		buffer.append("}, ");

		
		String emptyFun = "Clazz.decorateAsClass (function () {\r\n" +
				"Clazz.instantialize (this, arguments);\r\n" +
				"}, ";
		int idx = buffer.lastIndexOf(emptyFun);
		
		if (idx != -1 && idx == buffer.length() - emptyFun.length()) {
			buffer.replace(idx, buffer.length(), "Clazz.declareType (");
		} else {
			emptyFun = "Clazz.decorateAsClass (function () {\r\n" +
					"Clazz.prepareCallback (this, arguments);\r\n" +
					"Clazz.instantialize (this, arguments);\r\n" +
					"}, ";
			idx = buffer.lastIndexOf(emptyFun);
			
			if (idx != -1 && idx == buffer.length() - emptyFun.length()) {
				buffer.replace(idx, buffer.length(), "Clazz.declareAnonymous (");
			}
		}
		
		int lastIndexOf = fullClassName.lastIndexOf ('.');
		if (lastIndexOf != -1) {
			buffer.append(JavaLangUtil.ripJavaLang(fullClassName.substring(0, lastIndexOf)));
			buffer.append(", \"" + fullClassName.substring(lastIndexOf + 1) + "\"");
		} else {
			buffer.append("null, \"" + fullClassName + "\"");
		}

		if (binding != null) {
			ITypeBinding superclass = binding.getSuperclass();
			if (superclass != null) {
				String clazzName = superclass.getQualifiedName();
				clazzName = JavaLangUtil.ripJavaLang(clazzName);
				if (clazzName != null && clazzName.length() != 0
						&& !"Object".equals(clazzName)) {
					buffer.append(", ");
					buffer.append(clazzName);
				} else {
					ITypeBinding[] declaredTypes = binding.getInterfaces();
					if (declaredTypes != null && declaredTypes.length > 0) {
						clazzName = declaredTypes[0].getQualifiedName();
						if (clazzName != null && clazzName.length() != 0) {
							clazzName = JavaLangUtil.ripJavaLang(clazzName);
							buffer.append(", null, ");
							buffer.append(clazzName);
						}
					}
				}
			}
		}
		buffer.append(");\r\n");
		
		bodyDeclarations = node.bodyDeclarations();
		
		if (needPreparation) {
			buffer.append("Clazz.prepareFields (cla$$, function () {\r\n");
			for (Iterator iter = bodyDeclarations.iterator(); iter.hasNext();) {
				ASTNode element = (ASTNode) iter.next();
				if (element instanceof FieldDeclaration) {
					FieldDeclaration field = (FieldDeclaration) element;
					if (!isFieldNeedPreparation(field)) {
						continue;
					}
					element.accept(this);
				}
			}
			buffer.append("});\r\n");
		}
		
		for (Iterator iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof MethodDeclaration) {
				element.accept(this);
			}
		}
		
		for (Iterator iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof FieldDeclaration) {
				FieldDeclaration fields = (FieldDeclaration) element;
				if ((fields.getModifiers() & Modifier.STATIC) != 0) {
					List fragments = fields.fragments();
					for (int j = 0; j < fragments.size(); j++) {
					//if (fragments.size () == 1) {
						/* replace full class name with short variable name */
						buffer.append("cla$$");
						//buffer.append(fullClassName);
						buffer.append(".");
						VariableDeclarationFragment vdf = (VariableDeclarationFragment) fragments.get(j);
						//buffer.append(vdf.getName());
						vdf.getName().accept(this);
						buffer.append(" = ");
						Expression initializer = vdf.getInitializer();
						if (initializer != null) { 
							initializer.accept(this);
						} else {
							Type type = fields.getType();
							if (type.isPrimitiveType()){
								PrimitiveType pType = (PrimitiveType) type;
								if (pType.getPrimitiveTypeCode() == PrimitiveType.BOOLEAN) {
									buffer.append("false");
								} else {
									buffer.append("0");
								}
							} else {
								buffer.append("null");
							}
						}
						buffer.append(";\r\n");
					}
				}
			}
		}
		
		buffer.append("cla$$ = Clazz.p0p ();\r\n");
		thisClassName = oldClassName;
		
		buffer.append(laterBuffer);
		laterBuffer = oldLaterBuffer;
		
		buffer.append("}\r\n");
		/*
		 * Anonymouse class won't have static members and methods and initializers
		 */
		return false;
	}

	public void endVisit(CastExpression node) {
		super.endVisit(node);
	}

	public boolean visit(CastExpression node) {
		Type type = node.getType();
		/*
		 * TODO: some casting should have its meaning!
		 * int to byte, int to short, long to int will lost values
		 */
		if (type.isPrimitiveType()) {
			ITypeBinding resolveTypeBinding = node.getExpression().resolveTypeBinding();
			String name = resolveTypeBinding.getName();
			PrimitiveType pType = (PrimitiveType) type;
			if (pType.getPrimitiveTypeCode() == PrimitiveType.INT
					|| pType.getPrimitiveTypeCode() == PrimitiveType.BYTE
					|| pType.getPrimitiveTypeCode() == PrimitiveType.SHORT
					|| pType.getPrimitiveTypeCode() == PrimitiveType.LONG) {
				if ("char".equals(name)) {
					buffer.append("(");
					node.getExpression().accept(this);
					buffer.append (").charCodeAt (0)");
					return false;
				} else if ("float".equals(name) || "double".equals(name)) {
					buffer.append("Math.round (");
					node.getExpression().accept(this);
					buffer.append (")");
					return false;
				}
			}
			if (pType.getPrimitiveTypeCode() == PrimitiveType.CHAR) {
				if ("char".equals(name)) {
//					buffer.append("(");
//					node.getExpression().accept(this);
//					buffer.append (").charCodeAt (0)");
//					return false;
				} else if ("float".equals(name) || "double".equals(name)) {
					// TODO:
					buffer.append("String.fromCharCode (");
					buffer.append("Math.round (");
					node.getExpression().accept(this);
					buffer.append (")");
					buffer.append (")");
					return false;
				} else if ("int".equals(name) || "byte".equals(name)
						|| "double".equals(name) || "float".equals(name)
						|| "short".equals(name) || "long".equals(name)) {
					buffer.append("String.fromCharCode (");
					node.getExpression().accept(this);
					buffer.append (")");
					return false;
				}
			}
		}
		node.getExpression().accept(this);
		return false;
	}

	public void endVisit(ClassInstanceCreation node) {
		super.endVisit(node);
	}

	public boolean visit(ClassInstanceCreation node) {
		AnonymousClassDeclaration anonDeclare = node.getAnonymousClassDeclaration();
		Expression expression = node.getExpression();
		if (anonDeclare == null) {
			if (expression != null) {
				/*
				 * TODO: make sure the expression is not effected
				 */
				expression.accept(this);
			}
			ITypeBinding binding = node.resolveTypeBinding();
			if (binding != null) {
				if (!binding.isTopLevel()) {
					if ((binding.getModifiers() & Modifier.STATIC) == 0) {
						buffer.append("Clazz.innerTypeInstance (");
						if (binding.isAnonymous() || binding.isLocal()) {
							buffer.append(JavaLangUtil.ripJavaLang(binding.getBinaryName()));
						} else {
							buffer.append(JavaLangUtil.ripJavaLang(binding.getQualifiedName()));
						}
						buffer.append(", this, ");
						buffer.append("null"); // No final variables for non-anonymous class
						List arguments = node.arguments();
						if (arguments.size() > 0) {
							buffer.append(", ");
							visitList(arguments, ", ");
						}
						buffer.append(")");
						return false;
					}
				}
			}
			String fqName = ASTJL3.getTypeStringName(node.getType());
			if ("String".equals(fqName) || "java.lang.String".equals(fqName)) {
				buffer.append(" String.instantialize");
			} else {
				buffer.append(" new ");
				if (fqName != null) {
					fqName = JavaLangUtil.ripJavaLang(fqName);
					buffer.append(fqName);
				}
			}
			buffer.append(" (");
			visitList(node.arguments(), ", ");
			buffer.append(")");
		} else {
			int anonCount = anonymousCount + 1;
			buffer.append("(function (innerThis");
			List arguments = node.arguments();
			int argSize = arguments.size();
			if (argSize > 0) {
				buffer.append(", ");
			}
			this.isFinalSensible = false;
			/*visitList(arguments, ", ");*/
			for (int i = 0; i < argSize; i++) {
				buffer.append("arg" + i);
				if (i != argSize - 1) {
					buffer.append(", ");
				}
			}
			this.isFinalSensible = true;
			buffer.append(", finalVars) {\r\n");
			
			int lastCurrentBlock = currentBlockForVisit;
			List lastVisitedVars = visitedVars;
			List lastNormalVars = normalVars;
			currentBlockForVisit = blockLevel;
			visitedVars = new ArrayList();
			normalVars = new ArrayList();
			anonDeclare.accept(this);

			buffer.append("return Clazz.innerTypeInstance (");
			/*
			 * TODO: Should get the class by type binding 
			 */
			buffer.append(JavaLangUtil.ripJavaLang(getFullClassName()));
			buffer.append("$" + anonCount + ", innerThis, finalVars");
			if (argSize > 0) {
				buffer.append(", ");
			}
			this.isFinalSensible = false;
			//visitList(arguments, ", ");
			for (int i = 0; i < argSize; i++) {
				buffer.append("arg" + i);
				if (i != argSize - 1) {
					buffer.append(", ");
				}
			}
			this.isFinalSensible = true;
			buffer.append(");\r\n");
			buffer.append("}) (this");
			if (argSize > 0) {
				buffer.append(", ");
			}
			visitList(arguments, ", ");
			buffer.append(", ");
			String scope = null;
			if (methodDeclareStack.size() != 0) {
				scope = (String) methodDeclareStack.peek();
			}
			normalVars = lastNormalVars;
			buffer.append(listFinalVariables(visitedVars, ", ", scope));
			
			if (lastCurrentBlock != -1) {
				/* add the visited variables into last visited variables */
				for (int j = 0; j < visitedVars.size(); j++) {
					FinalVariable fv = (FinalVariable) visitedVars.get(j);
					int size = finalVars.size();
					for (int i = 0; i < size; i++) {
						FinalVariable vv = (FinalVariable) finalVars.get(size - i - 1);
						if (vv.getVariableName().equals(fv.getVariableName())
								&& vv.getBlockLevel() <= lastCurrentBlock
								&& !lastVisitedVars.contains(vv)) {
							lastVisitedVars.add(vv);
						}
					}
				}
			}
			visitedVars = lastVisitedVars;
			currentBlockForVisit = lastCurrentBlock;
			buffer.append(")");
		}
		return false;
	}

	public void endVisit(ConstructorInvocation node) {
		super.endVisit(node);
	}

	public boolean visit(ConstructorInvocation node) {
		buffer.append("this.construct (");
		visitList(node.arguments(), ", ");
		buffer.append(");\r\n");
		return false;
	}
	public void endVisit(EnumConstantDeclaration node) {
		super.endVisit(node);
	}

	public boolean visit(EnumConstantDeclaration node) {
		buffer.append("this.");
		node.getName().accept(this);
		buffer.append(" = ");
		node.getName().accept(this);
		buffer.append(";\r\n");
		return super.visit(node);
	}

	public void endVisit(EnumDeclaration node) {
		if (node != rootTypeNode && node.getParent() != null && node.getParent() instanceof AbstractTypeDeclaration) {
			return ;
		}
//		if (!node.isInterface()) {
			buffer.append("Clazz.instantialize (this, arguments);\r\n");
//		}

		buffer.append("}, ");
		
		
		String emptyFun = "Clazz.decorateAsClass (function () {\r\n" +
				"Clazz.instantialize (this, arguments);\r\n" +
				"}, ";
		int idx = buffer.lastIndexOf(emptyFun);
		
		if (idx != -1 && idx == buffer.length() - emptyFun.length()) {
			buffer.replace(idx, buffer.length(), "Clazz.declareType (");
		}

		String fullClassName = null;//getFullClassName();
		if (thisPackageName != null && thisPackageName.length() != 0) {
			fullClassName = thisPackageName + '.' + thisClassName;
		} else {
			fullClassName = thisClassName;
		}
		
		int lastIndexOf = fullClassName.lastIndexOf ('.');
		if (lastIndexOf != -1) {
			buffer.append(JavaLangUtil.ripJavaLang(fullClassName.substring(0, lastIndexOf)));
			buffer.append(", \"" + fullClassName.substring(lastIndexOf + 1) + "\"");
		} else {
			buffer.append("null, \"" + fullClassName + "\"");
		}
		buffer.append(", Enum");

		List superInterfaces = node.superInterfaceTypes();
		int size = superInterfaces.size();
		if (size > 0) {
			buffer.append(", ");
		}
		if (size > 1) {
			buffer.append("[");
		}
		for (Iterator iter = superInterfaces.iterator(); iter
				.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			ITypeBinding binding = ((Type) element).resolveBinding();
			if (binding != null) {
				String clazzName = binding.getQualifiedName();
				clazzName = JavaLangUtil.ripJavaLang(clazzName);
				buffer.append(clazzName);
			} else {
				buffer.append(element);
			}
			if (iter.hasNext()) {
				buffer.append(", ");
			}
		}
		if (size > 1) {
			buffer.append("]");
		}
		buffer.append(");\r\n");

		buffer.append(laterBuffer);
		
		EnumTypeWrapper enumWrapper = new EnumTypeWrapper(node);
		
		MethodDeclaration[] methods = enumWrapper.getMethods();
		for (int i = 0; i < methods.length; i++) {
			methods[i].accept(this);
		}

		List bodyDeclarations = node.bodyDeclarations();
		
		boolean needPreparation = false;
		for (Iterator iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof FieldDeclaration) {
				FieldDeclaration field = (FieldDeclaration) element;
				needPreparation = isFieldNeedPreparation(field);
				if (needPreparation) {
					break;
				}
			}
		}
		if (needPreparation) {
			buffer.append("Clazz.prepareFields (cla$$, function () {\r\n");
			for (Iterator iter = bodyDeclarations.iterator(); iter.hasNext();) {
				ASTNode element = (ASTNode) iter.next();
				if (element instanceof FieldDeclaration) {
					FieldDeclaration field = (FieldDeclaration) element;
					if (!isFieldNeedPreparation(field)) {
						continue;
					}
					element.accept(this);
				}
			}
			buffer.append("};\r\n");
		}
		
		for (Iterator iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof Initializer) {
				element.accept(this);
				
			} else if (element instanceof FieldDeclaration) {
				FieldDeclaration field = (FieldDeclaration) element;
			if ((field.getModifiers() & Modifier.STATIC) != 0) {
				List fragments = field.fragments();
				for (int j = 0; j < fragments.size(); j++) {
				//if (fragments.size () == 1) {
					/* replace full class name with short variable name */
					buffer.append("cla$$");
					//buffer.append(fullClassName);
					buffer.append(".");
					VariableDeclarationFragment vdf = (VariableDeclarationFragment) fragments.get(j);
					//buffer.append(vdf.getName());
					vdf.getName().accept(this);
					buffer.append(" = ");
					Expression initializer = vdf.getInitializer();
					if (initializer != null) { 
						initializer.accept(this);
					} else {
						Type type = field.getType();
						if (type.isPrimitiveType()){
							PrimitiveType pType = (PrimitiveType) type;
							if (pType.getPrimitiveTypeCode() == PrimitiveType.BOOLEAN) {
								buffer.append("false");
							} else {
								buffer.append("0");
							}
						} else {
							buffer.append("null");
						}
					}
					buffer.append(";\r\n");
				}
			}
		}
		}

		List constants = node.enumConstants();
		for (int i = 0; i < constants.size(); i++) {
			EnumConstantDeclaration enumConst = (EnumConstantDeclaration) constants.get(i);
			AnonymousClassDeclaration anonDeclare = enumConst.getAnonymousClassDeclaration();
			if (anonDeclare == null) {
				buffer.append("Clazz.defineEnumConstant (");
				/* replace full class name with short variable name */
				buffer.append("cla$$");
				//buffer.append(fullClassName);
				buffer.append(", \"");
				enumConst.getName().accept(this);
				buffer.append("\", " + i + ", [");
				visitList(enumConst.arguments(), ", ");
				buffer.append("]);\r\n");
				
			} else {
				int anonCount = anonymousCount + 1;
				anonDeclare.accept(this);

				buffer.append("Clazz.defineEnumConstant (");
				/* replace full class name with short variable name */
				buffer.append("cla$$");
				//buffer.append(fullClassName);
				buffer.append(", \"");
				enumConst.getName().accept(this);
				buffer.append("\", " + i + ", [");
				visitList(enumConst.arguments(), ", ");
				buffer.append("], ");
				buffer.append(getFullClassName());
				buffer.append("$" + anonCount + ");\r\n");

			}
		}

		super.endVisit(node);
	}

	public boolean visit(EnumDeclaration node) {
		ITypeBinding binding = node.resolveBinding();
		if (binding != null) {
			if (binding.isTopLevel()) {
				thisClassName = binding.getName();
			} else {
			}
		}
		if ((node != rootTypeNode) && node.getParent() != null && node.getParent() instanceof AbstractTypeDeclaration) {
			/* inner static class */
			ASTScriptVisitor visitor = null;
			try {
				visitor = (ASTScriptVisitor) this.getClass().newInstance();
			} catch (Exception e) {
				visitor = new ASTScriptVisitor(); // Default visitor
			}
			visitor.rootTypeNode = node;
			visitor.thisClassName = thisClassName + "." + node.getName();
			visitor.thisPackageName = thisPackageName;
			node.accept(visitor);
			if ((node.getModifiers() & Modifier.STATIC) != 0) {
				String str = visitor.getBuffer().toString();
				if (!str.startsWith("cla$$")) {
					laterBuffer.append(str);
				} else {
					laterBuffer.append("Clazz.pu$h ();\r\n");
					laterBuffer.append(str);
					laterBuffer.append("cla$$ = Clazz.p0p ();\r\n");
				}
			} else {
				/*
				 * Never reach here!
				 * March 17, 2006
				 */
				buffer.append("if (!Clazz.isClassDefined (\"");
				buffer.append(visitor.getFullClassName());
				buffer.append("\")) {\r\n");
				buffer.append("Clazz.pu$h ();\r\n");
				buffer.append(visitor.getBuffer().toString());
				buffer.append("cla$$ = Clazz.p0p ();\r\n");
				buffer.append("}\r\n");
			}
			return false;
		}
		buffer.append("cla$$ = ");
		
		buffer.append("Clazz.decorateAsClass (");
		
		buffer.append("function () {\r\n");
		
		List bodyDeclarations = node.bodyDeclarations();

		for (Iterator iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof MethodDeclaration) {
				//MethodDeclaration method = (MethodDeclaration) element;
				//if ((method.getModifiers() & Modifier.STATIC) != 0) {
					continue;
				//}
			} else if (element instanceof Initializer) {
				continue;
			} else if (element instanceof FieldDeclaration 
					/*&& isFieldNeedPreparation((FieldDeclaration) element)*/) {
				//if (node.isInterface()) {
					/*
					 * As members of interface should be treated
					 * as final and for javascript interface won't
					 * get instantiated, so the member will be
					 * treated specially. 
					 */
					//continue;
				//}
				FieldDeclaration fieldDeclaration = (FieldDeclaration) element;
				if (isFieldNeedPreparation(fieldDeclaration)) {
					visitWith(fieldDeclaration, true);
					continue;
				}
			}
			element.accept(this);
		}
		return false;
	}


	public void endVisit(FieldAccess node) {
		super.endVisit(node);
	}

	public boolean visit(FieldAccess node) {
		/*
		 * TODO: more complicated rules should be considered.
		 * read the JavaDoc
		 */
		node.getExpression().accept(this);
		buffer.append(".");
		node.getName().accept(this);
		return false;
	}

	public void endVisit(FieldDeclaration node) {
		super.endVisit(node);
	}

	protected boolean isFieldNeedPreparation(FieldDeclaration node) {
		if ((node.getModifiers() & Modifier.STATIC) != 0) {
			return false;
		}

		List fragments = node.fragments();
		for (Iterator iter = fragments.iterator(); iter.hasNext();) {
			VariableDeclarationFragment element = (VariableDeclarationFragment) iter.next();
			Expression initializer = element.getInitializer();
			if (initializer != null) {
				Object constValue = initializer.resolveConstantExpressionValue();
				if (constValue != null && (constValue instanceof Number
						|| constValue instanceof Character
						|| constValue instanceof Boolean
						|| constValue instanceof String)) {
					return false;
				}
				if (initializer instanceof NullLiteral) {
					return false;
				}
				return true;
			} else {
				return false;
			}
		}
		return false;
	}
	
	public boolean visit(FieldDeclaration node) {
		return visitWith(node, false);
	}
	public boolean visitWith(FieldDeclaration node, boolean ignoreInitializer) {
		if ((node.getModifiers() & Modifier.STATIC) != 0) {
			return false;
		}
		ASTNode xparent = node.getParent();
		while (xparent != null 
				&& !(xparent instanceof AbstractTypeDeclaration)
				&& !(xparent instanceof AnonymousClassDeclaration)) {
			xparent = xparent.getParent();
		}
		ITypeBinding typeBinding = null;
		//ITypeBinding anonBinding = null;
		if (xparent != null) {
			if (xparent instanceof AbstractTypeDeclaration) {
				AbstractTypeDeclaration type = (AbstractTypeDeclaration) xparent;
				typeBinding = type.resolveBinding();
			} else if (xparent instanceof AnonymousClassDeclaration) {
				AnonymousClassDeclaration type = (AnonymousClassDeclaration) xparent;
				typeBinding = type.resolveBinding();//.getSuperclass();
			}
		}

		List fragments = node.fragments();
		for (Iterator iter = fragments.iterator(); iter.hasNext();) {
			VariableDeclarationFragment element = (VariableDeclarationFragment) iter.next();
			String fieldName = NameConverterUtil.getJ2SName(element.getName());
//			String fieldName = element.getName().getIdentifier();
			String ext = "";
			if (JavaScriptKeywords.checkKeyworkViolation(fieldName)) {
				ext += "$";
			}
			if (typeBinding != null 
					&& CheckFieldMethodName.checkSameName(typeBinding, fieldName)) {
				ext += "$";
			}
			//fieldName = ext + fieldName;
			//buffer.append(fieldName);
			buffer.append("this.");
			if (SearchSuperField.isInheritedFieldName(typeBinding, fieldName)) {
				fieldName = SearchSuperField.getFieldName(typeBinding, fieldName);
				buffer.append(ext + fieldName);
			} else {
				buffer.append(ext + fieldName);
			}
			//buffer.append(element.getName());
			buffer.append(" = ");
				if (!ignoreInitializer && element.getInitializer() != null) {
					element.getInitializer().accept(this);
				} else {
					boolean isArray = false;
					List frags = node.fragments();
					if (frags.size() > 0) {
						VariableDeclarationFragment varFrag = (VariableDeclarationFragment) frags.get(0);
						IVariableBinding resolveBinding = varFrag.resolveBinding();
						if (resolveBinding != null) {
							isArray = resolveBinding.getType().isArray();
							if (isArray) {
								buffer.append("null");
							}
						}
					}
					if (!isArray) {
						if (node.getType().isPrimitiveType()){
							PrimitiveType pType = (PrimitiveType) node.getType();
							if (pType.getPrimitiveTypeCode() == PrimitiveType.BOOLEAN) {
								buffer.append("false");
							} else {
								buffer.append("0");
							}
						} else {
							buffer.append("null");
						}
					}
				}
			buffer.append(";\r\n");
		}
		return false;
	}

	public void endVisit(MethodDeclaration node) {
		Javadoc javadoc = node.getJavadoc();
		if (javadoc != null) {
			List tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if ("@j2sIgnore".equals(tagEl.getTagName())) {
						return ;
					}
				}
			}
		}
		IMethodBinding mBinding = node.resolveBinding();
		if (mBinding != null) {
			methodDeclareStack.pop();
		}
		super.endVisit(node);
	}

	private boolean testForceOverriding(IMethodBinding method) {
		String methodName = method.getName();
		ITypeBinding classInHierarchy = method.getDeclaringClass();
		do {
			IMethodBinding[] methods = classInHierarchy.getDeclaredMethods();
			int count = 0;
			IMethodBinding superMethod = null;
			for (int i= 0; i < methods.length; i++) {
				if (methodName.equals(methods[i].getName())) {
					count++;
					superMethod = methods[i];
				}
			}
			if (count > 1) {
				return false;
			} else if (count == 1) {
				if (!Bindings.isSubsignature(method, superMethod)) {
					return false;
				} else if ((superMethod.getModifiers() & Modifier.PRIVATE) != 0) {
					return false;
				}
			}
			classInHierarchy = classInHierarchy.getSuperclass();
		} while (classInHierarchy != null);
		return true;
	}
	public boolean visit(MethodDeclaration node) {
		Javadoc javadoc = node.getJavadoc();
		if (javadoc != null) {
			List tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if ("@j2sIgnore".equals(tagEl.getTagName())) {
						return false;
					}
				}
			}
		}
		IMethodBinding mBinding = node.resolveBinding();
		if (mBinding != null) {
			methodDeclareStack.push(mBinding.getKey());
		}
		
		if (node.getBody() == null) {
			/*
			 * Abstract or native method
			 */
			boolean isJ2S = false;
			if ((node.getModifiers() & Modifier.NATIVE) != 0) {
				if (javadoc != null) {
					List tags = javadoc.tags();
					if (tags.size() != 0) {
						for (Iterator iter = tags.iterator(); iter.hasNext();) {
							TagElement tagEl = (TagElement) iter.next();
							if ("@j2sIgnore".equals(tagEl.getTagName())) {
								return false;
							}
						}
						if (isDebugging()) {
							for (Iterator iter = tags.iterator(); iter.hasNext();) {
								TagElement tagEl = (TagElement) iter.next();
								if ("@j2sDebug".equals(tagEl.getTagName())) {
									isJ2S = true;
									break;
								}
							}
						}
						if (!isJ2S) {
							for (Iterator iter = tags.iterator(); iter.hasNext();) {
								TagElement tagEl = (TagElement) iter.next();
								if ("@j2sNative".equals(tagEl.getTagName())) {
									isJ2S = true;
									break;
								}
							}
						}
					}
				}
			}
			if (!isJ2S) {
				return false;
			}
		}
		/*
		 * To skip those methods or constructors which are just overriding with
		 * default super methods or constructors. 
		 */
		Block body = node.getBody();
		boolean needToCheckArgs = false;
		List argsList = null;
		if (body != null && body.statements().size() == 1) {
			Object statement = body.statements().get(0);
			if (statement instanceof ReturnStatement) {
				ReturnStatement ret = (ReturnStatement) statement;
				Expression exp = ret.getExpression();
				if (exp instanceof SuperMethodInvocation) {
					SuperMethodInvocation superRet = (SuperMethodInvocation) exp;
					if (superRet.getName().toString().equals(node.getName().toString())) {
						// same method name
						needToCheckArgs = true;
						argsList = superRet.arguments();
					}
				}
			} else if (statement instanceof ExpressionStatement) {
				ExpressionStatement sttmt = (ExpressionStatement) statement;
				Expression exp = sttmt.getExpression();
				if (exp instanceof SuperMethodInvocation) {
					SuperMethodInvocation superRet = (SuperMethodInvocation) exp;
					if (superRet.getName().toString().equals(node.getName().toString())) {
						// same method name
						needToCheckArgs = true;
						argsList = superRet.arguments();
					}
				}
			} else if (statement instanceof SuperConstructorInvocation) {
				SuperConstructorInvocation superConstructor = (SuperConstructorInvocation) statement;
				needToCheckArgs = true;
				argsList = superConstructor.arguments();
				if (argsList.size() == 0) {
					IMethodBinding constructorBinding = superConstructor.resolveConstructorBinding();
					ITypeBinding declaringClass = constructorBinding.getDeclaringClass();
					if ("java.lang.Object".equals(declaringClass.getQualifiedName())) {
						needToCheckArgs = false;
					}
				}
			}
		}
		if (needToCheckArgs) {
			List params = node.parameters();
			if (params.size() == argsList.size()) {
				// same parameters count
				boolean isOnlySuper = true;
				for (Iterator iter = params.iterator(), itr = argsList.iterator(); iter.hasNext();) {
					ASTNode astNode = (ASTNode) iter.next();
					ASTNode argNode = (ASTNode) itr.next();
					if (astNode instanceof SingleVariableDeclaration
							&& argNode instanceof SimpleName) {
						SingleVariableDeclaration varDecl = (SingleVariableDeclaration) astNode;
						String paramID = varDecl.getName().getIdentifier();
						String argID = ((SimpleName) argNode).getIdentifier();
						if (!paramID.equals(argID)) {
							// not with the same order, break out
							isOnlySuper = false;
							break;
						}
					} else {
						isOnlySuper = false;
						break;
					}
				}
				if (isOnlySuper) {
					boolean isForced2Keep = false;
					if (javadoc != null) {
						List tags = javadoc.tags();
						if (tags.size() != 0) {
							for (Iterator iter = tags.iterator(); iter.hasNext();) {
								TagElement tagEl = (TagElement) iter.next();
								if ("@j2sKeep".equals(tagEl.getTagName())) {
									isForced2Keep = true;
									break;
								}
							}
						}
					}
					if (!isForced2Keep) {
						return false;
					}
				}
			}
		}
		if ((node.getModifiers() & Modifier.PRIVATE) != 0) {
			MethodReferenceASTVisitor methodRefVisitor = new MethodReferenceASTVisitor();
			methodRefVisitor.setMethodSignature(node.resolveBinding().getKey());
			node.getRoot().accept(methodRefVisitor);
			if (!methodRefVisitor.isReferenced()) {
				boolean isForced2Keep = false;
				if (javadoc != null) {
					List tags = javadoc.tags();
					if (tags.size() != 0) {
						for (Iterator iter = tags.iterator(); iter.hasNext();) {
							TagElement tagEl = (TagElement) iter.next();
							if ("@j2sKeep".equals(tagEl.getTagName())) {
								isForced2Keep = true;
								break;
							}
						}
					}
				}
				if (!isForced2Keep) {
					return false;
				}
			}
		}
		
		if (node.isConstructor()) {
			buffer.append("Clazz.makeConstructor (");
		} else {
			boolean isToOverride = false;
			if (javadoc != null) {
				List tags = javadoc.tags();
				if (tags.size() != 0) {
					for (Iterator iter = tags.iterator(); iter.hasNext();) {
						TagElement tagEl = (TagElement) iter.next();
						if ("@j2sOverride".equals(tagEl.getTagName())) {
							isToOverride = true;;
						}
					}
				}
			}
			if ((node.getModifiers() & Modifier.STATIC) != 0) {
				/* replace full class name with short variable name */
				buffer.append("cla$$");
				//buffer.append(fullClassName);
				buffer.append(".");
				//buffer.append(methods[i].getName());
				node.getName().accept(this);
				buffer.append(" = ");
			}
			if (isToOverride) {
				buffer.append("Clazz.overrideMethod (");
			} else {
				boolean isOK2AutoOverriding = false;
				IMethodBinding methodBinding = node.resolveBinding();
				if (testForceOverriding(methodBinding)) {
					IMethodBinding superMethod = Bindings.findMethodDeclarationInHierarchy(methodBinding.getDeclaringClass(), methodBinding);
					if (superMethod != null) {
						MethodReferenceASTVisitor methodRefVisitor = new MethodReferenceASTVisitor();
						methodRefVisitor.setMethodSignature(superMethod.getKey());
						ASTNode parentRoot = node.getParent();
						while (parentRoot != null && !(parentRoot instanceof AbstractTypeDeclaration)) {
							parentRoot = parentRoot.getParent();
						}
						if (parentRoot != null) {
							parentRoot.accept(methodRefVisitor);
						}
						if (!methodRefVisitor.isReferenced()) {
							isOK2AutoOverriding = true;
						}
					}
				}
				if (isOK2AutoOverriding) {
					buffer.append("Clazz.overrideMethod (");
				} else {
					buffer.append("Clazz.defineMethod (");
				}
			}
		}
		/* replace full class name with short variable name */
		buffer.append("cla$$");
		
		if (node.isConstructor()) {
			buffer.append(", ");
		} else {
			buffer.append(", \"");
			String identifier = NameConverterUtil.getJ2SName(node.getName());
			if (JavaScriptKeywords.checkKeyworkViolation(identifier)) {
				buffer.append('$');
			}
			buffer.append(identifier);
			buffer.append("\", ");
		}
		buffer.append("\r\n");
		boolean isPrivate = (node.getModifiers() & Modifier.PRIVATE) != 0;
		if (isPrivate) {
			buffer.append("($fz = ");
		}		
		buffer.append("function (");
		List parameters = node.parameters();
		visitList(parameters, ", ");
		buffer.append(") ");
		if (node.isConstructor()) {
			boolean isSuperCalled = false;
			List statements = node.getBody().statements();
			if (statements.size() > 0) {
				ASTNode firstStatement = (ASTNode) statements.get(0);
				if (firstStatement instanceof SuperConstructorInvocation
						|| firstStatement instanceof ConstructorInvocation) {
					isSuperCalled = true;
				}
			}
			//Javadoc javadoc = node.getJavadoc();
			if (javadoc != null) {
				List tags = javadoc.tags();
				if (tags.size() != 0) {
					for (Iterator iter = tags.iterator(); iter.hasNext();) {
						TagElement tagEl = (TagElement) iter.next();
						if ("@j2sIgnoreSuperConstructor".equals(tagEl.getTagName())) {
							isSuperCalled = true;
						}
					}
				}
			}
			boolean existedSuperClass = false;
			IMethodBinding binding = node.resolveBinding();
			if (binding != null) {
				ITypeBinding declaringClass = binding.getDeclaringClass();
				ITypeBinding superclass = declaringClass.getSuperclass();
				String qualifiedName = JavaLangUtil.ripGeneric(superclass.getQualifiedName());
				existedSuperClass = superclass != null 
						&& !"java.lang.Object".equals(qualifiedName)
						&& !"java.lang.Enum".equals(qualifiedName);
			}
			if (!isSuperCalled && existedSuperClass) {
				blockLevel++;
				buffer.append("{\r\n");
				buffer.append("Clazz.superConstructor (this, ");
				buffer.append(JavaLangUtil.ripJavaLang(getFullClassName()));
				buffer.append(", []);\r\n");
				visitList(statements, ""); 
				//buffer.append("}");
				endVisit(node.getBody());
			} else {
				node.getBody().accept(this);
			}
		} else if (node.getBody() == null) {
			blockLevel++;
			buffer.append("{\r\n");
			visitNativeJavadoc(node.getJavadoc(), null, false);
			for (int i = normalVars.size() - 1; i >= 0; i--) {
				FinalVariable var = (FinalVariable) normalVars.get(i);
				if (var.getBlockLevel() >= blockLevel) {
					normalVars.remove(i);
				}
			}
			blockLevel--;
			buffer.append("}");
		} else {
			node.getBody().accept(this);
		}
		if (isPrivate) {
			buffer.append(", $fz.isPrivate = true, $fz)");
		}		
		if (parameters.size() != 0) {
			buffer.append(", \"");
			for (Iterator iter = parameters.iterator(); iter.hasNext();) {
				SingleVariableDeclaration element = (SingleVariableDeclaration) iter.next();
				boolean isArray = false;
				IBinding resolveBinding = element.getName().resolveBinding();
				if (resolveBinding instanceof IVariableBinding) {
					IVariableBinding varBinding = (IVariableBinding) resolveBinding;
					if (varBinding != null) {
						isArray = varBinding.getType().isArray();
						if (isArray) {
							//buffer.append("Array");
							buffer.append("~A");
						}
					}
				}
				if (!isArray) {
					Type type = element.getType();
					if (type.isPrimitiveType()){
						PrimitiveType pType = (PrimitiveType) type;
						if (pType.getPrimitiveTypeCode() == PrimitiveType.BOOLEAN) {
							buffer.append("~B"); // Boolean
						} else {
							buffer.append("~N"); // Number
						}
					} else if (type.isArrayType()) {
						buffer.append("~A"); // Array
					} else {
						ITypeBinding binding = type.resolveBinding();
						if (binding != null) {
							String name = binding.getQualifiedName();
							name = JavaLangUtil.ripJavaLang(name);
							if ("String".equals(name)) {
								buffer.append("~S");
							} else if ("Object".equals(name)) {
								buffer.append("~O");
							} else {
								buffer.append(name);
							}
						} else {
							buffer.append(type);
						}
					}
				}
				if (iter.hasNext()) {
					buffer.append(",");
				}
			}
			buffer.append("\"");
		}
		buffer.append(");\r\n");
		return false;
	}

	public void endVisit(MethodInvocation node) {
		super.endVisit(node);
	}

	public boolean visit(MethodInvocation node) {
		Expression expression = node.getExpression();
		boolean existedPrefixExp =false;
		if (expression != null) {
			/*
			 * Here?
			 */
			expression.accept(this);
			buffer.append(".");
			existedPrefixExp = true;
		}
		
		String methodName = node.getName().getIdentifier();
		List args = node.arguments();
		int size = args.size();
		boolean isSpecialMethod = false;
		if (PropertyMethodMap.isMethodRegistered(methodName) 
				&& (size == 0 || methodName.equals("split") || methodName.equals("replace"))) {
			IBinding binding = node.getName().resolveBinding();
			if (binding != null && binding instanceof IMethodBinding) {
				IMethodBinding mthBinding = (IMethodBinding) binding;
				String className = mthBinding.getDeclaringClass().getQualifiedName();
				String propertyName = PropertyMethodMap.translate(className, methodName);
				if (propertyName != null) {
					if (propertyName.startsWith("~")) {
						buffer.append('$');
						buffer.append(propertyName.substring(1));
						isSpecialMethod = true;
					} else {
						buffer.append(propertyName);
						return false;
					}
				}
			}
		}
		if (!isSpecialMethod) {
			node.getName().accept(this);
		}
		buffer.append(" (");

		IMethodBinding methodBinding = node.resolveMethodBinding();
		if (methodBinding != null && methodBinding.isVarargs()) {
			ITypeBinding[] paramTypes = methodBinding.getParameterTypes();
			visitList(args, ", ", 0, paramTypes.length - 1);
			if (paramTypes.length - 1 > 0) {
				buffer.append(", ");
			}
			buffer.append("[");
			visitList(args, ", ", paramTypes.length - 1, size);
			buffer.append("]");
		} else {
			visitList(args, ", ");
		}
		buffer.append(")");
		return false;
	}

	public void endVisit(NullLiteral node) {
		super.endVisit(node);
	}

	public boolean visit(NullLiteral node) {
		/*
		 * TODO: Clazz.castNullAs should be used instead
		 */
		ITypeBinding binding = node.resolveTypeBinding();
		if (binding != null)
		buffer.append("null");
		return super.visit(node);
	}

	public void endVisit(QualifiedType node) {
		super.endVisit(node);
	}

	public boolean visit(QualifiedType node) {
		/*
		 * TODO: inner class
		 */
		return super.visit(node);
	}

	public void endVisit(SimpleName node) {
		super.endVisit(node);
	}

	public boolean visit(SimpleName node) {
		if (checkConstantValue(node)) return false;
		IBinding binding = node.resolveBinding();
		if (binding != null
				&& binding instanceof ITypeBinding) {
			ITypeBinding typeBinding = (ITypeBinding) binding;
			if (typeBinding != null) {
				String name = typeBinding.getQualifiedName();
				if (name.startsWith("org.eclipse.swt.internal.xhtml")) {
					buffer.append(node.getIdentifier());
					return false;
				}
			}
		}
		String thisClassName = getClassName();
		ASTNode xparent = node.getParent();
		if (xparent == null) {
			buffer.append(node);
			return false;
		}
		char ch = buffer.charAt(buffer.length() - 1);
		if (xparent instanceof QualifiedName) {
			if (ch == '.') {
				if (binding != null) {
					if (binding instanceof IVariableBinding) {
						IVariableBinding varBinding = (IVariableBinding) binding;
							IVariableBinding variableDeclaration = varBinding.getVariableDeclaration();
							ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
							String fieldName = NameConverterUtil.getJ2SName(node);
							if (CheckFieldMethodName.checkSameName(declaringClass, fieldName)) {
								buffer.append('$');
							}
							if (JavaScriptKeywords.checkKeyworkViolation(fieldName)) {
								buffer.append('$');
							}
							if (declaringClass != null
									&& SearchSuperField.isInheritedFieldName(declaringClass, fieldName)) {
								fieldName = SearchSuperField.getFieldName(declaringClass, fieldName);
							}
							buffer.append(fieldName);
							return false;
					}
				}
				buffer.append(node);
				return false;
			}
		}
		if (xparent instanceof ClassInstanceCreation) {
			if (!(binding instanceof IVariableBinding)) {
				ITypeBinding binding2 = node.resolveTypeBinding();
				if (binding != null) {
					String name = binding2.getQualifiedName();
					name = JavaLangUtil.ripJavaLang(name);
					buffer.append(name);
				} else {
					String nodeId = NameConverterUtil.getJ2SName(node);
					buffer.append(JavaLangUtil.ripJavaLang(nodeId));
				}
				return false;
			}
		}
		if (binding != null) {
			if (binding instanceof IVariableBinding) {
				IVariableBinding varBinding = (IVariableBinding) binding;
				if ((varBinding.getModifiers() & Modifier.STATIC) != 0) {
					IVariableBinding variableDeclaration = varBinding.getVariableDeclaration();
					ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
					if (ch != '.' && ch != '\"'
							&& declaringClass != null) {
						String name = declaringClass.getQualifiedName();
						if ((name == null || name.length() == 0) 
								&& declaringClass.isAnonymous()) {
							// TODO: FIXME: I count the anonymous class name myself
							// and the binary name of the anonymous class will conflict
							// with my anonymous class name!
							name = declaringClass.getBinaryName();
						}
						name = JavaLangUtil.ripJavaLang(name);
						if (name.length() != 0) {
							buffer.append(name);
							buffer.append(".");
						}
					}
					String fieldName = NameConverterUtil.getJ2SName(node);
					if (CheckFieldMethodName.checkSameName(declaringClass, fieldName)) {
						buffer.append('$');
					}
					if (JavaScriptKeywords.checkKeyworkViolation(fieldName)) {
						buffer.append('$');
					}
					if (declaringClass != null
							&& SearchSuperField.isInheritedFieldName(declaringClass, fieldName)) {
						fieldName = SearchSuperField.getFieldName(declaringClass, fieldName);
					}
					buffer.append(fieldName);				
				} else {
					ASTNode parent = node.getParent();
					if (parent != null && !(parent instanceof FieldAccess)) {
						IVariableBinding variableDeclaration = varBinding.getVariableDeclaration();
						ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
						if (declaringClass != null && thisClassName != null) {
							if (ch != '.') {
								String name = declaringClass.getQualifiedName();
								boolean isThis = false;
								int superLevel = 0;
								while (parent != null) {
									if (parent instanceof AbstractTypeDeclaration) {
										AbstractTypeDeclaration type = (AbstractTypeDeclaration) parent;
										ITypeBinding typeBinding = type.resolveBinding();
										superLevel++;
//										if (SearchSuperClass.isInheritedClassName(typeBinding, name)) {
										if (Bindings.isSuperType(declaringClass, typeBinding)) {
											if (superLevel == 1) {
												buffer.append("this.");
												isThis = true;
											} else {
												name = typeBinding.getQualifiedName();
											}
											break;
										}
									} else if (parent instanceof AnonymousClassDeclaration) {
										AnonymousClassDeclaration type = (AnonymousClassDeclaration) parent;
										ITypeBinding typeBinding = type.resolveBinding();
										superLevel++;
										if (Bindings.isSuperType(declaringClass, typeBinding)) {
											if (superLevel == 1) {
												buffer.append("this.");
												isThis = true;
											} else {
												name = typeBinding.getQualifiedName();
												if ((name == null || name.length() == 0) && typeBinding.isLocal()) {
													name = typeBinding.getBinaryName();
													int idx0 = name.lastIndexOf(".");
													if (idx0 == -1) {
														idx0 = 0;
													}
													int idx1 = name.indexOf('$', idx0);
													if (idx1 != -1) {
														// TODO: Comment the following codes!
														// I can't understand why now -- Josson
														int idx2 = name.indexOf('$', idx1 + 1);
														String parentAnon = "";
														if (idx2 == -1) { // maybe the name is already "$1$2..." for Java5.0+ in Eclipse 3.2+
															parent = parent.getParent();
															while (parent != null) {
																if (parent instanceof AbstractTypeDeclaration) {
																	break;
																} else if (parent instanceof AnonymousClassDeclaration) {
																	AnonymousClassDeclaration atype = (AnonymousClassDeclaration) parent;
																	ITypeBinding aTypeBinding = atype.resolveBinding();
																	String aName = aTypeBinding.getBinaryName();
																	parentAnon = aName.substring(aName.indexOf('$')) + parentAnon;
																}
																parent = parent.getParent();
															}
															name = name.substring(0, idx1) + parentAnon + name.substring(idx1);
														}
													}
												}
											}
											break;
										}
									}
									parent = parent.getParent();
								}
								if (!isThis) {
									buffer.append("this.callbacks[\"");
									buffer.append(JavaLangUtil.ripJavaLang(name));
									buffer.append("\"].");
								}
							}
						}
					}
					
					String fieldVar = null;
					if (this.isFinalSensible 
							&& (varBinding.getModifiers() & Modifier.FINAL) != 0 
							&& varBinding.getDeclaringMethod() != null) {
						String key = varBinding.getDeclaringMethod().getKey();
						if (methodDeclareStack.size() == 0 || !key.equals(methodDeclareStack.peek())) {
							buffer.append("this.$finals.");
							if (currentBlockForVisit != -1) {
								int size = finalVars.size();
								for (int i = 0; i < size; i++) {
									FinalVariable vv = (FinalVariable) finalVars.get(size - i - 1);
									if (vv.getVariableName().equals(varBinding.getName())
											&& vv.getBlockLevel() <= currentBlockForVisit) {
										if (!visitedVars.contains(vv)) {
											visitedVars.add(vv);
										}
										fieldVar = vv.getToVariableName();
									}
								}
							}
						}
					}

					IVariableBinding variableDeclaration = varBinding.getVariableDeclaration();
					ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
//					String fieldName = node.getFullyQualifiedName();
					String fieldName = null;
					if (declaringClass != null) {
						fieldName = NameConverterUtil.getJ2SName(node);
					} else {
						if (fieldVar == null) {
							fieldName = getVariableName(node.getIdentifier());
						} else {
							fieldName = fieldVar;
						}
					}
					//System.err.println(fieldName);
					if (JavaScriptKeywords.checkKeyworkViolation(fieldName)) {
						buffer.append('$');
					}
					if (declaringClass != null 
							&& CheckFieldMethodName.checkSameName(declaringClass, fieldName)) {
						buffer.append('$');
					}
					if (declaringClass != null
							&& SearchSuperField.isInheritedFieldName(declaringClass, fieldName)) {
						fieldName = SearchSuperField.getFieldName(declaringClass, fieldName);
					}
					buffer.append(fieldName);
				}
			} else if (binding instanceof IMethodBinding) {
				IMethodBinding mthBinding = (IMethodBinding) binding;
				if ((mthBinding.getModifiers() & Modifier.STATIC) != 0) {
					IMethodBinding variableDeclaration = mthBinding.getMethodDeclaration();
					ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
					boolean isClassString = false;
					if (declaringClass != null) {
						isClassString = "java.lang.String".equals(declaringClass.getQualifiedName());
						ASTNode parent = node.getParent();
						if (parent instanceof MethodInvocation) {
							MethodInvocation mthInv = (MethodInvocation) parent;
							if (mthInv.getExpression() == null) {
								String name = declaringClass.getQualifiedName();
								name = JavaLangUtil.ripJavaLang(name);
								if (name.length() != 0) {
									buffer.append(name);
									buffer.append(".");
								}
							}
						}
					}
//					String name = variableDeclaration.getName();
					String name = NameConverterUtil.getJ2SName(node);
					name = JavaLangUtil.ripJavaLang(name);
					if (!(isClassString && "valueOf".equals(name)) && JavaScriptKeywords.checkKeyworkViolation(name)) {
						buffer.append('$');
					}
					buffer.append(name);
				} else {
					ASTNode parent = node.getParent();
					boolean isClassString = false;
					if (parent != null && !(parent instanceof FieldAccess)) {
						IMethodBinding variableDeclaration = mthBinding.getMethodDeclaration();
						ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
						if (declaringClass != null && thisClassName != null) {
							isClassString = "java.lang.String".equals(declaringClass.getQualifiedName());
							if (ch != '.') {
								String name = declaringClass.getQualifiedName();
								boolean isThis = false;
								int superLevel = 0;
								while (parent != null) {
									if (parent instanceof AbstractTypeDeclaration) {
										AbstractTypeDeclaration type = (AbstractTypeDeclaration) parent;
										ITypeBinding typeBinding = type.resolveBinding();
										superLevel++;
										if (Bindings.isSuperType(declaringClass, typeBinding)) {
											if (superLevel == 1) {
												buffer.append("this.");
												isThis = true;
											} else {
												name = typeBinding.getQualifiedName();
											}
											break;
										}
									} else if (parent instanceof AnonymousClassDeclaration) {
										AnonymousClassDeclaration type = (AnonymousClassDeclaration) parent;
										ITypeBinding typeBinding = type.resolveBinding();
										superLevel++;
										if (Bindings.isSuperType(declaringClass, typeBinding)) {
											if (superLevel == 1) {
												buffer.append("this.");
												isThis = true;
											} else {
												name = typeBinding.getQualifiedName();
												if ((name == null || name.length() == 0) && typeBinding.isLocal()) {
													name = typeBinding.getBinaryName();
													int idx0 = name.lastIndexOf(".");
													if (idx0 == -1) {
														idx0 = 0;
													}
													int idx1 = name.indexOf('$', idx0);
													if (idx1 != -1) {
														int idx2 = name.indexOf('$', idx1 + 1);
														String parentAnon = "";
														if (idx2 == -1) { // maybe the name is already "$1$2..." for Java5.0+ in Eclipse 3.2+
															parent = parent.getParent();
															while (parent != null) {
																if (parent instanceof AbstractTypeDeclaration) {
																	break;
																} else if (parent instanceof AnonymousClassDeclaration) {
																	AnonymousClassDeclaration atype = (AnonymousClassDeclaration) parent;
																	ITypeBinding aTypeBinding = atype.resolveBinding();
																	String aName = aTypeBinding.getBinaryName();
																	parentAnon = aName.substring(aName.indexOf('$')) + parentAnon;
																}
																parent = parent.getParent();
															}
															name = name.substring(0, idx1) + parentAnon + name.substring(idx1);
														}
													}
												}
											}
											break;
										}
									}
									parent = parent.getParent();
								}
								if (!isThis) {
									buffer.append("this.callbacks[\"");
									buffer.append(JavaLangUtil.ripJavaLang(name));
									buffer.append("\"].");
								}
							}
						}
					}
//					String name = node.getFullyQualifiedName();
					String name = NameConverterUtil.getJ2SName(node);
					name = JavaLangUtil.ripJavaLang(name);
					if (!(isClassString && "valueOf".equals(name)) && JavaScriptKeywords.checkKeyworkViolation(name)) {
						buffer.append('$');
					}
					buffer.append(name);
				}
			} else {
				ITypeBinding typeBinding = node.resolveTypeBinding();
//				String name = NameConverterUtil.getJ2SName(node);
				if (typeBinding != null) {
					String name = typeBinding.getQualifiedName();
					name = JavaLangUtil.ripJavaLang(name);
					if (JavaScriptKeywords.checkKeyworkViolation(name)) {
						buffer.append('$');
					}
					buffer.append(name);
				} else {
					String name = node.getFullyQualifiedName();
					if (JavaScriptKeywords.checkKeyworkViolation(name)) {
						buffer.append('$');
					}
					buffer.append(name);
				}
			}
		} else {
			String name = NameConverterUtil.getJ2SName(node);
			name = JavaLangUtil.ripJavaLang(name);
			if (JavaScriptKeywords.checkKeyworkViolation(name)) {
				buffer.append('$');
			}
			buffer.append(name);
		}
		return false;
	}

	protected String getVariableName(String name) {
		for (int i = normalVars.size() - 1; i >= 0; i--) {
			FinalVariable var = (FinalVariable) normalVars.get(i);
			if (name.equals(var.getVariableName())) {
				//return getIndexedVarName(name, i);
				return var.getToVariableName();
			}
		}
		return name;
	}

	public void endVisit(SimpleType node) {
		super.endVisit(node);
	}

	public boolean visit(SimpleType node) {
		ITypeBinding binding = node.resolveBinding();
		if (binding != null) {
			buffer.append(JavaLangUtil.ripJavaLang(binding.getQualifiedName()));
		} else {
			buffer.append(node);
		}
		return false;
	}

	public void endVisit(SingleVariableDeclaration node) {
		super.endVisit(node);
	}

	public boolean visit(SingleVariableDeclaration node) {
		SimpleName name = node.getName();
		IBinding binding = name.resolveBinding();
		if (binding != null) {
			String identifier = name.getIdentifier();
			FinalVariable f = null;
			if (methodDeclareStack.size() == 0) {
				f = new FinalVariable(blockLevel + 1, identifier, null);
			} else {
				String methodSig = (String) methodDeclareStack.peek();
				f = new FinalVariable(blockLevel + 1, identifier, methodSig);
			}
			f.setToVariableName(getIndexedVarName(identifier, normalVars.size()));
			normalVars.add(f);
			if ((binding.getModifiers() & Modifier.FINAL) != 0) {
				finalVars.add(f);
			}
		}
		name.accept(this);
		return false;
	}

	public void endVisit(SuperConstructorInvocation node) {
		super.endVisit(node);
	}

	public boolean visit(SuperConstructorInvocation node) {
		IMethodBinding constructorBinding = node.resolveConstructorBinding();
		ITypeBinding declaringClass = constructorBinding.getDeclaringClass();
		if ("java.lang.Object".equals(declaringClass.getQualifiedName())) {
			return false;
		}
		ASTNode parent = node.getParent();
		if (parent instanceof Block) {
			Block methoBlock = (Block) parent;
			ASTNode methodParent = methoBlock.getParent();
			if (methodParent instanceof MethodDeclaration) {
				MethodDeclaration method = (MethodDeclaration) methodParent;
				Javadoc javadoc = method.getJavadoc();
				if (javadoc != null) {
					List tags = javadoc.tags();
					if (tags.size() != 0) {
						for (Iterator iter = tags.iterator(); iter.hasNext();) {
							TagElement tagEl = (TagElement) iter.next();
							if ("@j2sIgnoreSuperConstructor".equals(tagEl.getTagName())) {
								return false;
							}
						}
					}
				}
			}
		}
		/*
		 * TODO: expression before the "super" should be considered.
		 */
		buffer.append("Clazz.superConstructor (this, ");
		buffer.append(JavaLangUtil.ripJavaLang(getFullClassName()));
		List arguments = node.arguments();
		if (arguments.size() > 0) {
			buffer.append(", [");
			visitList(arguments, ", ");
			buffer.append("]");
		}
		buffer.append(");\r\n");
		return false;
	}

	public void endVisit(SuperFieldAccess node) {
		super.endVisit(node);
	}

	public boolean visit(SuperFieldAccess node) {
		ASTNode xparent = node.getParent();
		while (xparent != null 
				&& !(xparent instanceof AbstractTypeDeclaration)
				&& !(xparent instanceof AnonymousClassDeclaration)) {
			xparent = xparent.getParent();
		}
		ITypeBinding typeBinding = null;
		if (xparent != null) {
			if (xparent instanceof AbstractTypeDeclaration) {
				AbstractTypeDeclaration type = (AbstractTypeDeclaration) xparent;
				typeBinding = type.resolveBinding();
			} else if (xparent instanceof AnonymousClassDeclaration) {
				AnonymousClassDeclaration type = (AnonymousClassDeclaration) xparent;
				typeBinding = type.resolveBinding().getSuperclass();
			}
		}
		String fieldName = NameConverterUtil.getJ2SName(node.getName());
		if (SearchSuperField.isInheritedFieldName(typeBinding, fieldName)) {
			if (typeBinding != null) {
				IVariableBinding[] declaredFields = typeBinding.getDeclaredFields();
				for (int i = 0; i < declaredFields.length; i++) {
					String superFieldName = NameConverterUtil.getJ2SName(declaredFields[i]);
					if (fieldName.equals(superFieldName)) {
						buffer.append("this.");
						if (JavaScriptKeywords.checkKeyworkViolation(fieldName)) {
							buffer.append('$');
						}
						fieldName = SearchSuperField.getFieldName(typeBinding.getSuperclass(), fieldName);
						buffer.append(fieldName);
						return false;
					}
				}
			}
		}
		buffer.append("this.");
		if (JavaScriptKeywords.checkKeyworkViolation(fieldName)) {
			buffer.append('$');
		}
		buffer.append(fieldName);
		
		return false;
	}

	public void endVisit(SuperMethodInvocation node) {
		super.endVisit(node);
	}

	public boolean visit(SuperMethodInvocation node) {
		buffer.append("Clazz.superCall (this, ");
		buffer.append(JavaLangUtil.ripJavaLang(getFullClassName()));
		buffer.append(", \"");
		String name = NameConverterUtil.getJ2SName(node.getName());
		buffer.append(name);
		buffer.append("\", [");
		visitList(node.arguments(), ", ");
		buffer.append("])");
		return false;
	}

	public void endVisit(ThisExpression node) {
		super.endVisit(node);
	}

	public boolean visit(ThisExpression node) {
		Name qualifier = node.getQualifier();
		if (qualifier != null) {
			buffer.append("this.callbacks[\"");
			qualifier.accept(this);
			buffer.append("\"]");
		} else {
			buffer.append("this");
		}
		return false;
	}

	public void endVisit(TypeDeclaration node) {
		if (node != rootTypeNode && node.getParent() != null 
				&& (node.getParent() instanceof AbstractTypeDeclaration
						|| node.getParent() instanceof TypeDeclarationStatement)) {
			return ;
		}
		if (!node.isInterface()) {
			buffer.append("Clazz.instantialize (this, arguments);\r\n");
			//buffer.append("};\r\n");
			buffer.append("}, ");
		}
		
		String emptyFun = "Clazz.decorateAsClass (function () {\r\n" +
				"Clazz.instantialize (this, arguments);\r\n" +
				"}, ";
		int idx = buffer.lastIndexOf(emptyFun);
		
		if (idx != -1 && idx == buffer.length() - emptyFun.length()) {
			buffer.replace(idx, buffer.length(), "Clazz.declareType (");
		}

		
		String fullClassName = null;
		if (thisPackageName != null && thisPackageName.length() != 0) {
			fullClassName = thisPackageName + '.' + thisClassName;
		} else {
			fullClassName = thisClassName;
		}

		if (node.isInterface()) {
			boolean needReturn = false;
			for (Iterator iter = node.bodyDeclarations().iterator(); iter.hasNext();) {
				ASTNode element = (ASTNode) iter.next();
				if (element instanceof Initializer) {
					needReturn = true;
				} else if (element instanceof FieldDeclaration) {
					FieldDeclaration field = (FieldDeclaration) element;
					if ((field.getModifiers() & Modifier.STATIC) != 0) {
						needReturn = true;
					} else if (node.isInterface()) {
						List fragments = field.fragments();
						needReturn = fragments.size() > 0;
					}
				}
				if (needReturn) {
					break;
				}
			}
			if (needReturn) {
				buffer.append("cla$$ = ");
			}
			buffer.append("Clazz.declareInterface (");
			int lastIndexOf = fullClassName.lastIndexOf ('.');
			if (lastIndexOf != -1) {
				buffer.append(JavaLangUtil.ripJavaLang(fullClassName.substring(0, lastIndexOf)));
				buffer.append(", \"" + fullClassName.substring(lastIndexOf + 1) + "\"");
			} else {
				buffer.append("null, \"" + fullClassName + "\"");
			}
			
		} else {
			int lastIndexOf = fullClassName.lastIndexOf ('.');
			if (lastIndexOf != -1) {
				buffer.append(JavaLangUtil.ripJavaLang(fullClassName.substring(0, lastIndexOf)));
				buffer.append(", \"" + fullClassName.substring(lastIndexOf + 1) + "\"");
			} else {
				buffer.append("null, \"" + fullClassName + "\"");
			}
			buffer.append(", ");

		}
		boolean defined = false;
		ITypeBinding typeBinding = node.resolveBinding();
		if (typeBinding != null) {
			ITypeBinding superclass = typeBinding.getSuperclass();
			if (superclass != null) {
				String clazzName = superclass.getQualifiedName();
				clazzName = JavaLangUtil.ripJavaLang(clazzName);
				if (clazzName != null && clazzName.length() != 0
						&& !"Object".equals(clazzName)) {
					buffer.append(clazzName);
					defined = true;
				}
			}
		}
		if (!defined && !node.isInterface()) {
			buffer.append("null");
		}
		buffer.append(", ");

		//List superInterfaces = node.superInterfaceTypes();
		List superInterfaces = null;
		if (node.getAST().apiLevel() != AST.JLS3) {
			// AST.JLS2
			superInterfaces = node.superInterfaces();
		} else {
			superInterfaces = node.superInterfaceTypes();
		}
		int size = superInterfaces.size();
		if (size == 0) {
			buffer.append("null");
		} else if (size > 1) {
			buffer.append("[");
		}
		for (Iterator iter = superInterfaces.iterator(); iter
				.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			ITypeBinding binding = ((Type) element).resolveBinding();
			if (binding != null) {
				String clazzName = binding.getQualifiedName();
				clazzName = JavaLangUtil.ripJavaLang(clazzName);
				buffer.append(clazzName);
			} else {
				buffer.append(element);
			}
			if (iter.hasNext()) {
				buffer.append(", ");
			}
		}
		if (size > 1) {
			buffer.append("]");
		}
		ITypeBinding superclass = null;
		if (node.getAST().apiLevel() != AST.JLS3) {
			// AST.JLS2
			Name superClazz = node.getSuperclass();
			if (superclass != null) {
				superclass = superClazz.resolveTypeBinding();
			}
		} else {
			//superclass 
			Type type = node.getSuperclassType();
			if (type != null) {
				superclass = type.resolveBinding();
			}
		}
		if (superclass != null) {
			ITypeBinding binding = superclass;//.resolveTypeBinding();
			if (binding != null && !binding.isTopLevel()) {
				if ((binding.getModifiers() & Modifier.STATIC) == 0) {
					buffer.append(", Clazz.innerTypeInstance (");
					buffer.append(JavaLangUtil.ripJavaLang(binding.getQualifiedName()));
					buffer.append(", this, null, Clazz.inheritArgs");
					buffer.append(")");
				}
			}
		}
		int len = buffer.length();
		// ", null, null"
		if (", null, null".equals(buffer.substring(len - 12))) {
			buffer.delete(len - 12, len);
		} else if (", null".equals(buffer.substring(len - 6))) {
			buffer.delete(len - 6, len);
		}
		buffer.append(");\r\n");
		
		buffer.append(laterBuffer);
		laterBuffer = new StringBuffer();
		// Enum is considered as static member!
		List bodyDeclarations = node.bodyDeclarations();

		
		boolean needPreparation = false;
		for (Iterator iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof FieldDeclaration) {
				FieldDeclaration field = (FieldDeclaration) element;
				needPreparation = isFieldNeedPreparation(field);
				if (needPreparation) {
					break;
				}
			}
		}
		if (needPreparation) {
			buffer.append("Clazz.prepareFields (cla$$, function () {\r\n");
			for (Iterator iter = bodyDeclarations.iterator(); iter.hasNext();) {
				ASTNode element = (ASTNode) iter.next();
				if (element instanceof FieldDeclaration) {
					FieldDeclaration field = (FieldDeclaration) element;
					if (node.isInterface() || !isFieldNeedPreparation(field)) {
						continue;
					}
					element.accept(this);
				}
			}
			buffer.append("});\r\n");
		}
		
		for (Iterator iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof EnumDeclaration) {
				element.accept(this);
			}
		}
		
		MethodDeclaration[] methods = node.getMethods();
		for (int i = 0; i < methods.length; i++) {
			// All the methods are defined outside the main function body! -- March 17, 2006
			methods[i].accept(this);
		}
		
		
		int staticCount = -1;
		ReferenceASTVisitor refVisitor = new ReferenceASTVisitor();
		for (Iterator iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof TypeDeclaration) {
				if (node.isInterface()) {
					/*
					 * Here will create a new visitor to do the Java2Script process
					 * and laterBuffer may be filled with contents.
					 */
					element.accept(this);
				}
			} else if (element instanceof Initializer) {
				if (staticCount != -1) {
					buffer.append(");\r\n");
					staticCount = -1;
				}
				element.accept(this);
			} else if (element instanceof FieldDeclaration) {
				FieldDeclaration field = (FieldDeclaration) element;
			if ((field.getModifiers() & Modifier.STATIC) != 0) {
				List fragments = field.fragments();
				for (int j = 0; j < fragments.size(); j++) {
					VariableDeclarationFragment vdf = (VariableDeclarationFragment) fragments.get(j);
					if ("serialVersionUID".equals(vdf.getName().getIdentifier())) {
						continue;
					}
					Expression initializer = vdf.getInitializer();
					refVisitor.setReferenced(false);
					if (initializer != null) {
						initializer.accept(refVisitor);
					}
					if (refVisitor.isReferenced()) {
						if (staticCount != -1) {
							buffer.append(");\r\n");
							staticCount = -1;
						}
						buffer.append("cla$$");
						//buffer.append(fullClassName);
						buffer.append(".");
						//buffer.append(vdf.getName());
						vdf.getName().accept(this);
						buffer.append(" = ");
						buffer.append("cla$$");
						//buffer.append(fullClassName);
						buffer.append(".prototype.");
						vdf.getName().accept(this);
						buffer.append(" = ");
						initializer.accept(this);
						buffer.append(";\r\n");
						continue;
					} else {
						staticCount++;
						if (staticCount == 0) {
							buffer.append("Clazz.defineStatics (cla$$");
						}
					}
					buffer.append(",\r\n\"");
					vdf.getName().accept(this);
					buffer.append("\", ");
					
					if (initializer != null) { 
						initializer.accept(this);
					} else {
						Type type = field.getType();
						if (type.isPrimitiveType()){
							PrimitiveType pType = (PrimitiveType) type;
							if (pType.getPrimitiveTypeCode() == PrimitiveType.BOOLEAN) {
								buffer.append("false");
							} else if (pType.getPrimitiveTypeCode() == PrimitiveType.CHAR) {
								buffer.append("'\\0'");
							} else {
								buffer.append("0");
							}
						} else {
							buffer.append("null");
						}
					}
				}
			} else if (node.isInterface()) {
				List fragments = field.fragments();
				for (int j = 0; j < fragments.size(); j++) {
					VariableDeclarationFragment vdf = (VariableDeclarationFragment) fragments.get(j);
					if ("serialVersionUID".equals(vdf.getName().getIdentifier())) {
						continue;
					}
					Expression initializer = vdf.getInitializer();
					refVisitor.setReferenced(false);
					if (initializer != null) {
						initializer.accept(refVisitor);
					}
					if (refVisitor.isReferenced()) {
						if (staticCount != -1) {
							buffer.append(");\r\n");
							staticCount = -1;
						}
						buffer.append("cla$$");
						buffer.append(".");
						vdf.getName().accept(this);
						buffer.append(" = ");
						buffer.append("cla$$");
						buffer.append(".prototype.");
						vdf.getName().accept(this);
						buffer.append(" = ");
						initializer.accept(this);
						buffer.append(";\r\n");
						continue;
					} else {
						staticCount++;
						if (staticCount == 0) {
							buffer.append("Clazz.defineStatics (cla$$");
						}
					}
					buffer.append(",\r\n\"");
					vdf.getName().accept(this);
					buffer.append("\", ");
					if (initializer != null) { 
						initializer.accept(this);
					} else {
						Type type = field.getType();
						if (type.isPrimitiveType()){
							PrimitiveType pType = (PrimitiveType) type;
							if (pType.getPrimitiveTypeCode() == PrimitiveType.BOOLEAN) {
								buffer.append("false");
							} else if (pType.getPrimitiveTypeCode() == PrimitiveType.CHAR) {
								buffer.append("'\\0'");
							} else {
								buffer.append("0");
							}
						} else {
							buffer.append("null");
						}
					}
				}
		
			}
		}
		}
		if (staticCount != -1) {
			buffer.append(");\r\n");
		}
		// Interface's inner interfaces or classes
		buffer.append(laterBuffer);
		
		StringBuffer fieldsSerializables = new StringBuffer();
		ITypeBinding binding = node.resolveBinding();
		boolean isSimpleSerializable = (Bindings.findTypeInHierarchy(binding, "net.sf.j2s.ajax.SimpleSerializable") != null);
		for (Iterator iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof FieldDeclaration) {
				if (node.isInterface()) {
					/*
					 * As members of interface should be treated
					 * as final and for javascript interface won't
					 * get instantiated, so the member will be
					 * treated specially. 
					 */
					continue;
				}
				FieldDeclaration fieldDeclaration = (FieldDeclaration) element;
				
				if (isSimpleSerializable) {
					List fragments = fieldDeclaration.fragments();
					int modifiers = fieldDeclaration.getModifiers();
					if ((Modifier.isPublic(modifiers) || Modifier.isProtected(modifiers)) 
							&& !Modifier.isStatic(modifiers) && !Modifier.isTransient(modifiers)) {
						Type type = fieldDeclaration.getType();
						int dims = 0;
						if (type.isArrayType()) {
							dims = 1;
							type = ((ArrayType) type).getComponentType();
						}
						String mark = null;
						if (type.isPrimitiveType()) {
							PrimitiveType pType = (PrimitiveType) type;
							Code code = pType.getPrimitiveTypeCode();
							if (code == PrimitiveType.FLOAT) {
								mark = "F";
							} else if (code == PrimitiveType.DOUBLE) {
								mark = "D";
							} else if (code == PrimitiveType.INT) {
								mark = "I";
							} else if (code == PrimitiveType.LONG) {
								mark = "L";
							} else if (code == PrimitiveType.SHORT) {
								mark = "S";
							} else if (code == PrimitiveType.BYTE) {
								mark = "B";
							} else if (code == PrimitiveType.CHAR) {
								mark = "C";
							} else if (code == PrimitiveType.BOOLEAN) {
								mark = "b";
							} 
						}
						ITypeBinding resolveBinding = type.resolveBinding();
						if ("java.lang.String".equals(resolveBinding.getQualifiedName())) {
							mark = "s";
						}
						if (mark != null) {
							for (Iterator xiter = fragments.iterator(); xiter.hasNext();) {
								VariableDeclarationFragment var = (VariableDeclarationFragment) xiter.next();
								int curDim = dims + var.getExtraDimensions();
								if (curDim <= 1) {
									if (fieldsSerializables.length() > 0) {
										fieldsSerializables.append(", ");
									}
									fieldsSerializables.append("\"" + var.getName() + "\", \"");
									if (mark.charAt(0) == 's' && curDim == 1) {
										fieldsSerializables.append("AX");
									} else if (curDim == 1) {
										fieldsSerializables.append("A");
										fieldsSerializables.append(mark);
									} else {
										fieldsSerializables.append(mark);
									}
									fieldsSerializables.append("\"");
								}
							}					
						}
					}
				}
			}
		}
		if (fieldsSerializables.length() > 0) {
			buffer.append("Clazz.registerSerializableFields(cla$$, ");
			buffer.append(fieldsSerializables.toString());
			buffer.append(");\r\n");
		}
		
		Javadoc javadoc = node.getJavadoc();
		if (javadoc != null) {
			List tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if ("@j2sSuffix".equals(tagEl.getTagName())) {
						List fragments = tagEl.fragments();
						StringBuffer buf = new StringBuffer();
						boolean isFirstLine = true;
						for (Iterator iterator = fragments.iterator(); iterator
								.hasNext();) {
							TextElement commentEl = (TextElement) iterator.next();
							String text = commentEl.getText().trim();
							if (isFirstLine) {
								if (text.length() == 0) {
									continue;
								}
							}
							buf.append(text);
							buf.append("\r\n");
						}
						buffer.append("\r\n" + buf.toString().trim() + "\r\n");
					}
				}
			}
		}
		laterBuffer = new StringBuffer();
		super.endVisit(node);
	}

	public boolean visit(TypeDeclaration node) {
		ITypeBinding binding = node.resolveBinding();
		if (binding != null) {
			if (binding.isTopLevel()) {
				thisClassName = binding.getName();
			} else {
			}
		}
		
		if ((node != rootTypeNode) && node.getParent() != null 
				&& (node.getParent() instanceof AbstractTypeDeclaration
				|| node.getParent() instanceof TypeDeclarationStatement)) {
			/* inner static class */
			ASTScriptVisitor visitor = null;
			try {
				visitor = (ASTScriptVisitor) this.getClass().newInstance();
			} catch (Exception e) {
				visitor = new ASTScriptVisitor(); // Default visitor
			}
			visitor.rootTypeNode = node;
			if (node.getParent() instanceof TypeDeclarationStatement) {
				anonymousCount++;
				if (node.resolveBinding().getBinaryName().matches(".*\\$[0-9]+\\$.*")) {
					visitor.thisClassName = thisClassName + "$" + anonymousCount + "$" + node.getName();
				} else {
					visitor.thisClassName = thisClassName + "$" + anonymousCount + node.getName();
				}
			} else {
				visitor.thisClassName = thisClassName + "." + node.getName();
			}
			visitor.thisPackageName = thisPackageName;
			node.accept(visitor);
			if (node.isInterface() || (node.getModifiers() & Modifier.STATIC) != 0 
					|| (node.getParent() instanceof TypeDeclaration 
							&& ((TypeDeclaration) node.getParent()).isInterface())) {
				String str = visitor.getBuffer().toString();
				if (!str.startsWith("cla$$")) {
					laterBuffer.append(str);
				} else {
					laterBuffer.append("Clazz.pu$h ();\r\n");
					laterBuffer.append(str);
					laterBuffer.append("cla$$ = Clazz.p0p ();\r\n");
				}
			} else {
				/*
				 * Never reach here!
				 * March 17, 2006
				 */
				/*
				 * It reaches here!
				 * Code examples:
				 * 
class CA {
	class State {}
}
public class CB extends CA {
	CA.State state = new CA.State() {
		public String toString() {
			return "CB.CA.State";
		}
	};
	State stt = new State() {
		public String toString() {
			return "State";
		};
	};
	public static void main(String[] args) {
		System.out.println(new CB().state);
		System.out.println(new CB().stt);
	}
}
				 */
				buffer.append("if (!Clazz.isClassDefined (\"");
				buffer.append(visitor.getFullClassName());
				buffer.append("\")) {\r\n");
				buffer.append("Clazz.pu$h ();\r\n");
				buffer.append(visitor.getBuffer().toString());
				buffer.append("cla$$ = Clazz.p0p ();\r\n");
				buffer.append("}\r\n");
			}
			return false;
		}
		
		if (node.isInterface()) {
			return false;
		}
		Javadoc javadoc = node.getJavadoc();
		if (javadoc != null) {
			List tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if ("@j2sPrefix".equals(tagEl.getTagName())) {
						List fragments = tagEl.fragments();
						StringBuffer buf = new StringBuffer();
						boolean isFirstLine = true;
						for (Iterator iterator = fragments.iterator(); iterator
								.hasNext();) {
							TextElement commentEl = (TextElement) iterator.next();
							String text = commentEl.getText().trim();
							if (isFirstLine) {
								if (text.length() == 0) {
									continue;
								}
							}
							buf.append(text);
							buf.append("\r\n");
						}
						buffer.append(buf.toString().trim() + " ");
					}
				}
			}
		}
		buffer.append("cla$$ = ");
		
		buffer.append("Clazz.decorateAsClass (");
		
		buffer.append("function () {\r\n");
		if (node == rootTypeNode && (node.getModifiers() & Modifier.STATIC) == 0 
				&& ((node.getParent() instanceof TypeDeclaration 
						&& !((TypeDeclaration) node.getParent()).isInterface()) 
						|| node.getParent() instanceof TypeDeclarationStatement)) {
			buffer.append("Clazz.prepareCallback (this, arguments);\r\n");
		}
		List bodyDeclarations = node.bodyDeclarations();
		for (Iterator iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof MethodDeclaration) {
				continue;
			} else if (element instanceof Initializer) {
				continue;
			} else if (element instanceof EnumDeclaration) {
				continue;
			} else if (element instanceof FieldDeclaration) {
				if (node.isInterface()) {
					/*
					 * As members of interface should be treated
					 * as final and for javascript interface won't
					 * get instantiated, so the member will be
					 * treated specially. 
					 */
					continue;
				}
				FieldDeclaration fieldDeclaration = (FieldDeclaration) element;
				if (isFieldNeedPreparation(fieldDeclaration)) {
					visitWith(fieldDeclaration, true);
					continue;
				}
			} else if (element instanceof TypeDeclaration) {
				if (node.isInterface()) {
					/*
					 * As sub type of interface should be treated
					 * as final and for javascript interface won't
					 * get instantiated, so the type will be
					 * treated specially. 
					 */
					continue;
				}
			}
			element.accept(this);
		}
		return false;
	}

	public void endVisit(TypeDeclarationStatement node) {
		super.endVisit(node);
	}

	public boolean visit(TypeDeclarationStatement node) {
		return super.visit(node);
	}

	public void endVisit(TypeLiteral node) {
		super.endVisit(node);
	}

	public boolean visit(TypeLiteral node) {
		node.getType().accept(this);
		return false;
	}

}
