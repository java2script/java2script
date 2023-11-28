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
package j2s.jmol;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Stack;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.jdt.core.dom.AnonymousClassDeclaration;
import org.eclipse.jdt.core.dom.ArrayAccess;
import org.eclipse.jdt.core.dom.ArrayCreation;
import org.eclipse.jdt.core.dom.ArrayInitializer;
import org.eclipse.jdt.core.dom.ArrayType;
import org.eclipse.jdt.core.dom.AssertStatement;
import org.eclipse.jdt.core.dom.Assignment;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.BodyDeclaration;
import org.eclipse.jdt.core.dom.BooleanLiteral;
import org.eclipse.jdt.core.dom.BreakStatement;
import org.eclipse.jdt.core.dom.CastExpression;
import org.eclipse.jdt.core.dom.CatchClause;
import org.eclipse.jdt.core.dom.CharacterLiteral;
import org.eclipse.jdt.core.dom.ClassInstanceCreation;
import org.eclipse.jdt.core.dom.ConditionalExpression;
import org.eclipse.jdt.core.dom.ConstructorInvocation;
import org.eclipse.jdt.core.dom.ContinueStatement;
import org.eclipse.jdt.core.dom.DoStatement;
import org.eclipse.jdt.core.dom.EmptyStatement;
import org.eclipse.jdt.core.dom.EnhancedForStatement;
import org.eclipse.jdt.core.dom.EnumConstantDeclaration;
import org.eclipse.jdt.core.dom.EnumDeclaration;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.ExpressionStatement;
import org.eclipse.jdt.core.dom.FieldAccess;
import org.eclipse.jdt.core.dom.FieldDeclaration;
import org.eclipse.jdt.core.dom.ForStatement;
import org.eclipse.jdt.core.dom.IBinding;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.IPackageBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IVariableBinding;
import org.eclipse.jdt.core.dom.IfStatement;
import org.eclipse.jdt.core.dom.ImportDeclaration;
import org.eclipse.jdt.core.dom.InfixExpression;
import org.eclipse.jdt.core.dom.Initializer;
import org.eclipse.jdt.core.dom.InstanceofExpression;
import org.eclipse.jdt.core.dom.LabeledStatement;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.Name;
import org.eclipse.jdt.core.dom.NullLiteral;
import org.eclipse.jdt.core.dom.NumberLiteral;
import org.eclipse.jdt.core.dom.PackageDeclaration;
import org.eclipse.jdt.core.dom.ParameterizedType;
import org.eclipse.jdt.core.dom.ParenthesizedExpression;
import org.eclipse.jdt.core.dom.PostfixExpression;
import org.eclipse.jdt.core.dom.PrefixExpression;
import org.eclipse.jdt.core.dom.PrimitiveType;
import org.eclipse.jdt.core.dom.PrimitiveType.Code;
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.QualifiedType;
import org.eclipse.jdt.core.dom.ReturnStatement;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.SimpleType;
import org.eclipse.jdt.core.dom.SingleVariableDeclaration;
import org.eclipse.jdt.core.dom.Statement;
import org.eclipse.jdt.core.dom.StringLiteral;
import org.eclipse.jdt.core.dom.SuperConstructorInvocation;
import org.eclipse.jdt.core.dom.SuperFieldAccess;
import org.eclipse.jdt.core.dom.SuperMethodInvocation;
import org.eclipse.jdt.core.dom.SwitchCase;
import org.eclipse.jdt.core.dom.SwitchStatement;
import org.eclipse.jdt.core.dom.SynchronizedStatement;
import org.eclipse.jdt.core.dom.ThisExpression;
import org.eclipse.jdt.core.dom.ThrowStatement;
import org.eclipse.jdt.core.dom.TryStatement;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.core.dom.TypeDeclaration;
import org.eclipse.jdt.core.dom.TypeDeclarationStatement;
import org.eclipse.jdt.core.dom.TypeLiteral;
import org.eclipse.jdt.core.dom.UnionType;
import org.eclipse.jdt.core.dom.VariableDeclarationExpression;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;
import org.eclipse.jdt.core.dom.VariableDeclarationStatement;
import org.eclipse.jdt.core.dom.WhileStatement;
import org.eclipse.jdt.core.dom.WildcardType;

import j2s.jmol.J2SUtil.TypeHelper;

/**
 *
 * This class has to solve the following compiling problems:
 * 
 * 1. Field and method names:
 * 
 * 1.1 Java and JavaScript keywords;
 * 
 * 1.2 super;
 * 
 * 1.3 private;
 * 
 * 1.4 .j2smap;
 * 
 * 1.5 ...
 * 
 * 2. Final variables
 * 
 * 3. @-j2s* tags
 * 
 * 4.
 * 
 * @author zhou renjian
 *
 *         2006-12-3
 * 
 *         Extensively adapted for Jmol by Bob Hanson 2023.11.27, fixing all the
 *         work-arounds that had been needed to get this working with Jmol,
 *         including:
 * 
 *         boxing/unboxing issues, Java 8 SwitchCase, global c$ from pu$h/p0p,
 *         removing \r from \r\n, and several others
 * 
 */
class J2SLegacyVisitor extends J2SASTVisitor {

	private final static String emptyFunction = "Clazz.decorateAsClass(function(){Clazz.instantialize(this, arguments);}, ";

	protected J2SLegacyVisitor() {
		super(true);
	}

	J2SUtil.VariableHelper variableHelper = new J2SUtil.VariableHelper();

	private Stack<String> methodDeclareStack = new Stack<>();
	
	private J2SUtil.TypeHelper typeHelper = new J2SUtil.TypeHelper();

	private StringBuffer laterBuffer = new StringBuffer();
	
	private int currentBlockForVisit = -1;
	
	/* for anonymous classes */
	private StringBuffer methodBuffer = new StringBuffer();

	private AbstractTypeDeclaration rootTypeNode;

	public boolean visit(AnonymousClassDeclaration node) {
		ITypeBinding binding = node.resolveBinding();
		J2SUtil.TypeHelper typeHelper = this.typeHelper;
		String anonClassName = null;
		if (binding.isAnonymous() || binding.isLocal()) {
			String binaryName = binding.getBinaryName();
			if (binaryName == null) {
				String bindingKey = binding.getKey();
				if (bindingKey != null) {
					binaryName = bindingKey = bindingKey.substring(1, bindingKey.length() - 1).replace('/', '.');
				}
			}
			anonClassName = binaryName;
		} else {
			anonClassName = binding.getQualifiedName();
		}
		anonClassName = J2SUtil.assureQualifiedName(shortenQualifiedName(anonClassName));
		String shortClassName = null;
		int idx = anonClassName.lastIndexOf('.');
		if (idx == -1) {
			shortClassName = anonClassName;
		} else {
			shortClassName = anonClassName.substring(idx + 1);
		}
		String className = typeHelper.getClassName();
		String fullClassName = anonClassName;
		buffer.append("(Clazz.isClassDefined(\"");
		buffer.append(fullClassName);
		buffer.append("\") ? 0 : ");

		StringBuffer tmpBuffer = buffer;
		buffer = methodBuffer;
		methodBuffer = new StringBuffer();

		buffer.append("cla$$.$");
		buffer.append(shortClassName);
		buffer.append("$=function(){\n");

		buffer.append("/*if5*/;(function(){\n");
		buffer.append("var cla$$ =");
		buffer.append("Clazz.decorateAsClass(");
		String oldClassName = className;
		typeHelper.setClassName(shortClassName);
		buffer.append("function(){\n");
		if (!(node.getParent() instanceof EnumConstantDeclaration)) {
			buffer.append("Clazz.prepareCallback(this, arguments);\n");
		}
		StringBuffer oldLaterBuffer = laterBuffer;
		laterBuffer = new StringBuffer();
		List<?> bodyDeclarations = node.bodyDeclarations();

		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof MethodDeclaration) {
				continue;
			} else if (element instanceof FieldDeclaration) {
				FieldDeclaration fieldDeclaration = (FieldDeclaration) element;
				if (fieldNeedsPreparation(fieldDeclaration, false)) {
					processFieldDeclaration(fieldDeclaration, true);
					continue;
				}
			}
			element.accept(this);
		}
		buffer.append("Clazz.instantialize(this, arguments);\n");
		buffer.append("}, ");
		String emptyFun = emptyFunction;
		idx = buffer.lastIndexOf(emptyFun);
		if (idx != -1 && idx == buffer.length() - emptyFun.length()) {
			buffer.replace(idx, buffer.length(), "Clazz.declareType(");
		} else {
			emptyFun = "Clazz.decorateAsClass(function(){\n" + "Clazz.prepareCallback (this, arguments);\n"
					+ "Clazz.instantialize(this, arguments);\n" + "}, ";
			idx = buffer.lastIndexOf(emptyFun);

			if (idx != -1 && idx == buffer.length() - emptyFun.length()) {
				buffer.replace(idx, buffer.length(), "Clazz.declareAnonymous(");
			}
		}

		int lastIndexOf = fullClassName.lastIndexOf('.');
		if (lastIndexOf != -1) {
			buffer.append(J2SUtil.assureQualifiedName(shortenPackageName(fullClassName)));
			buffer.append(", \"" + fullClassName.substring(lastIndexOf + 1) + "\"");
		} else {
			buffer.append("null, \"" + fullClassName + "\"");
		}
		ITypeBinding superclass = binding.getSuperclass();
		if (superclass != null) {
			String clazzName = superclass.getQualifiedName();
			clazzName = J2SUtil.assureQualifiedName(shortenQualifiedName(clazzName));
			if (clazzName != null && clazzName.length() != 0 && !"Object".equals(clazzName)) {
				buffer.append(", ");
				buffer.append(clazzName);
			} else {
				ITypeBinding[] declaredTypes = binding.getInterfaces();
				if (declaredTypes != null && declaredTypes.length > 0) {
					clazzName = declaredTypes[0].getQualifiedName();
					if (clazzName != null && clazzName.length() != 0) {
						clazzName = J2SUtil.assureQualifiedName(shortenQualifiedName(clazzName));
						buffer.append(", null, ");
						buffer.append(clazzName);
					}
				}
			}
		}
		buffer.append(");\n");

		if (checkAnonOrEnumNeedsFieldPreparations(bodyDeclarations)) {
			writePrepareFields(bodyDeclarations, false);
		}

		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof MethodDeclaration) {
				element.accept(this);
			}
		}

		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof FieldDeclaration) {
				FieldDeclaration fields = (FieldDeclaration) element;
				if ((fields.getModifiers() & Modifier.STATIC) != 0) {
					List<?> fragments = fields.fragments();
					for (int j = 0; j < fragments.size(); j++) {
						buffer.append("cla$$");
						buffer.append(".");
						VariableDeclarationFragment vdf = (VariableDeclarationFragment) fragments.get(j);
						vdf.getName().accept(this);
						buffer.append(" = ");
						Expression initializer = vdf.getInitializer();
						if (initializer != null) {
							boxOrUnboxExpression(initializer);
						} else {
							writeDefaultFieldType(fields.getType());
						}
						buffer.append(";\n");
					}
				}
			}
		}

		buffer.append("/*eoif5*/})();\n");
		typeHelper.setClassName(oldClassName);
		buffer.append(laterBuffer);
		laterBuffer = oldLaterBuffer;
		buffer.append("};\n");
		String methods = methodBuffer.toString();
		methodBuffer = buffer;
		methodBuffer.append(methods);
		buffer = tmpBuffer;
		buffer.append(thisPackageName);
		buffer.append(".");
		idx = className.indexOf('$');
		if (idx != -1) {
			buffer.append(className.substring(0, idx));
		} else {
			buffer.append(className);
		}
		buffer.append(".$");
		buffer.append(shortClassName);
		buffer.append("$ ())");
		// Anonymous class won't have static members and methods and initializers
		return false;
	}

	public boolean visit(CastExpression node) {
		Type type = node.getType();
		// shortcoming: int to byte, int to short, long to int will lose values
		Expression expression = node.getExpression();
		ITypeBinding resolveTypeBinding = (type.isPrimitiveType() ? expression.resolveTypeBinding() : null);
		if (resolveTypeBinding != null) {
			String name = resolveTypeBinding.getName();
			PrimitiveType pType = (PrimitiveType) type;
			Code code = pType.getPrimitiveTypeCode();
			if (code == PrimitiveType.INT 
					|| code == PrimitiveType.BYTE
					|| code == PrimitiveType.SHORT
					|| code == PrimitiveType.LONG) {
				switch (name) {
				default:
					break;
				case "char":
					buffer.append("(");
					if (expression instanceof ParenthesizedExpression) {
						ParenthesizedExpression pe = (ParenthesizedExpression) expression;
						pe.getExpression().accept(this);
					} else {
						expression.accept(this);
					}
					buffer.append(").charCodeAt(0)");
					return false;
				case "float":
				case "double":
					buffer.append("Clazz.");
					buffer.append(name);
					buffer.append("To");
					String targetType = pType.getPrimitiveTypeCode().toString();
					buffer.append(targetType.substring(0, 1).toUpperCase());
					buffer.append(targetType.substring(1));
					buffer.append("(");
					if (expression instanceof ParenthesizedExpression) {
						ParenthesizedExpression pe = (ParenthesizedExpression) expression;
						pe.getExpression().accept(this);
					} else {
						expression.accept(this);
					}
					buffer.append(")");
					return false;
				}
			} else if (code == PrimitiveType.CHAR) {
				switch (name) {
				default:
					break;
				case "float":
				case "double":
					buffer.append("Clazz.");
					buffer.append(name);
					buffer.append("ToChar(");
					if (expression instanceof ParenthesizedExpression) {
						ParenthesizedExpression pe = (ParenthesizedExpression) expression;
						pe.getExpression().accept(this);
					} else {
						expression.accept(this);
					}
					buffer.append(")");
					return false;
				case "int":
				case "byte":
				case "short":
				case "long":
					Object constantValue = expression.resolveConstantExpressionValue();
					if (constantValue != null) {
						if (constantValue instanceof Integer) {
							int value = ((Integer) constantValue).intValue();
							if ((value >= '0' && value <= '9') || (value >= 'A' && value <= 'Z')
									|| (value >= 'a' && value <= 'z')) {
								buffer.append('\'');
								buffer.append((char) value);
								buffer.append('\'');
								return false;
							}
						} else if (constantValue instanceof Long) {
							long value = ((Long) constantValue).longValue();
							if ((value >= '0' && value <= '9') || (value >= 'A' && value <= 'Z')
									|| (value >= 'a' && value <= 'z')) {
								buffer.append('\'');
								buffer.append((char) value);
								buffer.append('\'');
								return false;
							}
						}
					}
					buffer.append("String.fromCharCode(");
					if (expression instanceof ParenthesizedExpression) {
						ParenthesizedExpression pe = (ParenthesizedExpression) expression;
						pe.getExpression().accept(this);
					} else {
						expression.accept(this);
					}
					buffer.append(")");
					return false;
				}
			}
		}
		expression.accept(this);
		return false;
	}

	public boolean visit(ClassInstanceCreation node) {
		AnonymousClassDeclaration anonDeclare = node.getAnonymousClassDeclaration();
		Expression expression = node.getExpression();
		if (anonDeclare == null) {
			if (expression != null) {
				expression.accept(this);
			}
			ITypeBinding binding = node.resolveTypeBinding();
			if (binding != null) {
				if (!binding.isTopLevel()) {
					if ((binding.getModifiers() & Modifier.STATIC) == 0) {
						buffer.append("Clazz.innerTypeInstance(");
						if (binding.isAnonymous() || binding.isLocal()) {
							buffer.append(J2SUtil.assureQualifiedName(shortenQualifiedName(binding.getBinaryName())));
						} else {
							buffer.append(J2SUtil.assureQualifiedName(shortenQualifiedName(binding.getQualifiedName())));
						}
						buffer.append(", this, ");
						buffer.append("null"); // No final variables for non-anonymous class
						IMethodBinding methodDeclaration = null;
						IMethodBinding constructorBinding = node.resolveConstructorBinding();
						if (constructorBinding != null) {
							methodDeclaration = constructorBinding.getMethodDeclaration();
						}
						processMethodParameterList(node.arguments(), methodDeclaration, true, ", ", null);
						buffer.append(")");
						return false;
					}
				}
			}
			String fqName = getTypeStringName(node.getType());
			if ("String".equals(fqName) || "java.lang.String".equals(fqName)) {
				buffer.append(" String.instantialize");
			} else if ("Object".equals(fqName) || "java.lang.Object".equals(fqName)) {
				// For discussion, please visit
				// http://groups.google.com/group/java2script/browse_thread/thread/3d6deb9c3c0a0cda
				buffer.append(" new Clazz._O"); // BH 2023.11.10
			} else {
				buffer.append(" new ");
				if (fqName != null) {
					fqName = J2SUtil.assureQualifiedName(shortenQualifiedName(fqName));
					buffer.append(fqName);
				}
			}
			buffer.append("(");
			IMethodBinding methodDeclaration = null;
			IMethodBinding constructorBinding = node.resolveConstructorBinding();
			if (constructorBinding != null) {
				methodDeclaration = constructorBinding.getMethodDeclaration();
			}
			processMethodParameterList(node.arguments(), methodDeclaration, true, null, null);
			buffer.append(")");
		} else {
			ITypeBinding binding = node.resolveTypeBinding();
			String anonClassName = null;
			if (binding.isAnonymous() || binding.isLocal()) {
				String binaryName = binding.getBinaryName();
				if (binaryName == null) {
					String bindingKey = binding.getKey();
					if (bindingKey != null) {
						binaryName = bindingKey = bindingKey.substring(1, bindingKey.length() - 1).replace('/', '.');
					}
				}
				anonClassName = J2SUtil.assureQualifiedName(shortenQualifiedName(binaryName));
			} else {
				anonClassName = J2SUtil.assureQualifiedName(shortenQualifiedName(binding.getQualifiedName()));
			}
			buffer.append("(");
			J2SUtil.VariableHelper variableVisitor = variableHelper;
			variableVisitor.isFinalSensible = true;
			int lastCurrentBlock = currentBlockForVisit;
			List<J2SUtil.FinalVariable> finalVars = variableVisitor.finalVars;
			List<J2SUtil.FinalVariable> visitedVars = variableVisitor.visitedVars;
			List<J2SUtil.FinalVariable> normalVars = variableVisitor.normalVars;
			List<J2SUtil.FinalVariable> lastVisitedVars = visitedVars;
			List<J2SUtil.FinalVariable> lastNormalVars = normalVars;
			currentBlockForVisit = blockLevel;
			variableVisitor.visitedVars = new ArrayList<J2SUtil.FinalVariable>();
			visitedVars = variableVisitor.visitedVars;
			variableVisitor.normalVars = new ArrayList<J2SUtil.FinalVariable>();
			methodDeclareStack.push(binding.getKey());
			anonDeclare.accept(this);
			methodDeclareStack.pop();
			buffer.append(", ");

			buffer.append("Clazz.innerTypeInstance(");
			buffer.append(anonClassName);
			buffer.append(", this, ");
			String scope = null;
			if (methodDeclareStack.size() != 0) {
				scope = methodDeclareStack.peek();
			}
			variableVisitor.normalVars = lastNormalVars;
			buffer.append(listFinalVariables(visitedVars, ", ", scope));

			IMethodBinding methodDeclaration = null;
			IMethodBinding constructorBinding = node.resolveConstructorBinding();
			if (constructorBinding != null) {
				methodDeclaration = constructorBinding.getMethodDeclaration();
			}
			processMethodParameterList(node.arguments(), methodDeclaration, true, ", ", null);

			if (lastCurrentBlock != -1) {
				// add the visited variables into last visited variables
				for (int j = 0; j < visitedVars.size(); j++) {
					J2SUtil.FinalVariable fv = visitedVars.get(j);
					int size = finalVars.size();
					for (int i = 0; i < size; i++) {
						J2SUtil.FinalVariable vv = finalVars.get(size - i - 1);
						if (vv.variableName.equals(fv.variableName) && vv.blockLevel <= lastCurrentBlock
								&& !lastVisitedVars.contains(vv)) {
							lastVisitedVars.add(vv);
						}
					}
				}
			}
			variableVisitor.visitedVars = lastVisitedVars;
			currentBlockForVisit = lastCurrentBlock;
			buffer.append(")"); // Clazz.innerTypeInstance
			buffer.append(")"); // end of line (..., ...)
		}
		return false;
	}

	public boolean visit(ConstructorInvocation node) {
		buffer.append("this.construct (");
		IMethodBinding methodDeclaration = null;
		IMethodBinding constructorBinding = node.resolveConstructorBinding();
		if (constructorBinding != null) {
			methodDeclaration = constructorBinding.getMethodDeclaration();
		}
		processMethodParameterList(node.arguments(), methodDeclaration, true, null, null);
		buffer.append(");\n");
		return false;
	}

	public boolean visit(EnumConstantDeclaration node) {
		buffer.append("this.");
		node.getName().accept(this);
		buffer.append(" = ");
		node.getName().accept(this);
		buffer.append(";\n");
		return super.visit(node);
	}

	public void endVisit(EnumDeclaration node) {
		if (node != rootTypeNode && node.getParent() != null && node.getParent() instanceof AbstractTypeDeclaration) {
			return;
		}
		buffer.append("Clazz.instantialize(this, arguments);\n");
		buffer.append("}, ");

		String emptyFun = emptyFunction;
		int idx = buffer.lastIndexOf(emptyFun);

		if (idx != -1 && idx == buffer.length() - emptyFun.length()) {
			buffer.replace(idx, buffer.length(), "Clazz.declareType(");
		}

		ASTNode parent = node.getParent();
		if (parent != null && parent instanceof AbstractTypeDeclaration) {
			String packageName = thisPackageName;
			String className = typeHelper.getClassName();
			String fullClassName = null;
			if (packageName != null && packageName.length() != 0) {
				fullClassName = packageName + '.' + className;
			} else {
				fullClassName = className;
			}
			String name = node.getName().getIdentifier();
			buffer.append(J2SUtil.assureQualifiedName(fullClassName));
			buffer.append(", \"" + name + "\"");
			buffer.append(", Enum");
		} else {

			String fullClassName = null;// getFullClassName();
			String className = typeHelper.getClassName();
			if (thisPackageName != null && thisPackageName.length() != 0) {
				fullClassName = thisPackageName + '.' + className;
			} else {
				fullClassName = className;
			}
			int lastIndexOf = fullClassName.lastIndexOf('.');
			if (lastIndexOf != -1) {
				buffer.append(J2SUtil.assureQualifiedName(shortenPackageName(fullClassName)));
				buffer.append(", \"" + fullClassName.substring(lastIndexOf + 1) + "\"");
			} else {
				buffer.append("null, \"" + fullClassName + "\"");
			}
			buffer.append(", Enum");
		}

		List<?> superInterfaces = node.superInterfaceTypes();
		int size = superInterfaces.size();
		if (size > 0) {
			buffer.append(", ");
		}
		if (size > 1) {
			buffer.append("[");
		}
		for (Iterator<?> iter = superInterfaces.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			ITypeBinding binding = ((Type) element).resolveBinding();
			if (binding != null) {
				String clazzName = binding.getQualifiedName();
				clazzName = J2SUtil.assureQualifiedName(shortenQualifiedName(clazzName));
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
		buffer.append(");\n");

		buffer.append(laterBuffer);
		List<?> bd = node.bodyDeclarations();
		int methodCount = 0;
		for (Iterator<?> it = bd.listIterator(); it.hasNext();) {
			if (it.next() instanceof MethodDeclaration) {
				methodCount++;
			}
		}
		MethodDeclaration[] methods = new MethodDeclaration[methodCount];
		int next = 0;
		for (Iterator<?> it = bd.listIterator(); it.hasNext();) {
			Object decl = it.next();
			if (decl instanceof MethodDeclaration) {
				methods[next++] = (MethodDeclaration) decl;
			}
		}
		for (int i = 0; i < methods.length; i++) {
			methods[i].accept(this);
		}

		List<?> bodyDeclarations = node.bodyDeclarations();

		if (checkAnonOrEnumNeedsFieldPreparations(bodyDeclarations)) {
			writePrepareFields(bodyDeclarations, false);
		}

		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof Initializer) {
				element.accept(this);

			} else if (element instanceof FieldDeclaration) {
				FieldDeclaration field = (FieldDeclaration) element;
				if ((field.getModifiers() & Modifier.STATIC) != 0) {
					List<?> fragments = field.fragments();
					for (int j = 0; j < fragments.size(); j++) {
						buffer.append("cla$$");
						buffer.append(".");
						VariableDeclarationFragment vdf = (VariableDeclarationFragment) fragments.get(j);
						vdf.getName().accept(this);
						buffer.append(" = ");
						Expression initializer = vdf.getInitializer();
						if (initializer != null) {
							initializer.accept(this);
						} else {
							Type type = field.getType();
							if (type.isPrimitiveType()) {
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
						buffer.append(";\n");
					}
				}
			}
		}

		List<?> constants = node.enumConstants();
		for (int i = 0; i < constants.size(); i++) {
			EnumConstantDeclaration enumConst = (EnumConstantDeclaration) constants.get(i);
			AnonymousClassDeclaration anonDeclare = enumConst.getAnonymousClassDeclaration();
			if (anonDeclare == null) {
				buffer.append("Clazz.defineEnumConstant(");
				// replace full class name with short variable name
				buffer.append("cla$$");
				buffer.append(", \"");
				enumConst.getName().accept(this);
				buffer.append("\", " + i + ", [");
				boxList(enumConst.arguments(), ", ");
				buffer.append("]);\n");

			} else {
				ITypeBinding binding = node.resolveBinding();
				String anonClassName = null;
				if (binding.isAnonymous() || binding.isLocal()) {
					anonClassName = J2SUtil.assureQualifiedName(shortenQualifiedName(binding.getBinaryName()));
				} else {
					anonClassName = J2SUtil.assureQualifiedName(shortenQualifiedName(binding.getQualifiedName()));
				}
				anonDeclare.accept(this);
				buffer.append("Clazz.defineEnumConstant(");
				buffer.append("cla$$");
				buffer.append(", \"");
				enumConst.getName().accept(this);
				buffer.append("\", " + i + ", [");
				boxList(enumConst.arguments(), ", ");
				buffer.append("], ");
				buffer.append(anonClassName);
				buffer.append(");\n");

			}
		}
	}

	public boolean visit(EnumDeclaration node) {
		ITypeBinding binding = node.resolveBinding();
		J2SUtil.TypeHelper typeVisitor = typeHelper;
		if (binding != null && binding.isTopLevel()) {
			typeVisitor.setClassName(binding.getName());
		}
		if ((node != rootTypeNode) && node.getParent() != null && node.getParent() instanceof AbstractTypeDeclaration) {
			processInnerEnum(node);
			return false;
		}
		
		buffer.append("var cla$$ = Clazz.decorateAsClass(");
		buffer.append("function(){\n");

		List<?> bodyDeclarations = node.bodyDeclarations();

		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof MethodDeclaration) {
				// MethodDeclaration method = (MethodDeclaration) element;
				// if ((method.getModifiers() & Modifier.STATIC) != 0) {
				continue;
				// }
			} else if (element instanceof Initializer) {
				continue;
			} else if (element instanceof FieldDeclaration
			/* && isFieldNeedPreparation((FieldDeclaration) element) */) {
				// if (node.isInterface()) {
				/*
				 * As members of interface should be treated as final and for javascript
				 * interface won't get instantiated, so the member will be treated specially.
				 */
				// continue;
				// }
				FieldDeclaration fieldDeclaration = (FieldDeclaration) element;
				if (fieldNeedsPreparation(fieldDeclaration, false)) {
					processFieldDeclaration(fieldDeclaration, true);
					continue;
				}
			}
			element.accept(this);
		}
		return false;
	}

	private void processInnerEnum(EnumDeclaration node) {		
		/* inner static Enum class */
		J2SLegacyVisitor visitor = null;
		try {
			visitor = this.getClass().newInstance();
		} catch (@SuppressWarnings("unused") Exception e) {
			visitor = new J2SLegacyVisitor(); // Default visitor
		}
		visitor.rootTypeNode = node;
		visitor.typeHelper.setClassName(this.typeHelper.getClassName());
		visitor.thisPackageName = thisPackageName;

		node.accept(visitor);
		String str = visitor.buffer.toString();
		if ((node.getModifiers() & Modifier.STATIC) != 0) {
			if (str.startsWith("var cla$$")) {
				laterBuffer.append("/*if1*/;(function(){\n");
				laterBuffer.append(str);
				laterBuffer.append("/*eoif1*/})();\n");
			} else {
				laterBuffer.append(str);
			}
		} else {
			// never found?
			methodBuffer.append("/*if2*/;(function(){\n");
			methodBuffer.append(str);
			methodBuffer.append("/*eoif2*/})();\n");
		}
	}

	public boolean visit(FieldAccess node) {
		/*
		 * TODO: more complicated rules should be considered. read the JavaDoc
		 */
		boolean staticFields = false;
		IVariableBinding varBinding = node.resolveFieldBinding();
		Expression expression = node.getExpression();
		if (varBinding != null && (varBinding.getModifiers() & Modifier.STATIC) != 0
				&& (varBinding.getDeclaringClass()) != null
				&& !(expression instanceof SimpleName || expression instanceof QualifiedName)) {
			staticFields = true;
		}
		if (staticFields && varBinding != null) {
			buffer.append('(');
			expression.accept(this);
			buffer.append(", ");
			buffer.append(J2SUtil.assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
			buffer.append(')');
		} else {
			expression.accept(this);
		}
		buffer.append(".");
		node.getName().accept(this);
		return false;
	}

	public boolean visit(FieldDeclaration node) {
		return processFieldDeclaration(node, false);
	}

	public boolean processFieldDeclaration(FieldDeclaration node, boolean ignoreInitializer) {
		if ((node.getModifiers() & Modifier.STATIC) != 0) {
			return false;
		}
		ASTNode xparent = node.getParent();
		while (xparent != null && !(xparent instanceof AbstractTypeDeclaration)
				&& !(xparent instanceof AnonymousClassDeclaration)) {
			xparent = xparent.getParent();
		}
		ITypeBinding typeBinding = null;
		// ITypeBinding anonBinding = null;
		if (xparent != null) {
			if (xparent instanceof AbstractTypeDeclaration) {
				AbstractTypeDeclaration type = (AbstractTypeDeclaration) xparent;
				typeBinding = type.resolveBinding();
			} else if (xparent instanceof AnonymousClassDeclaration) {
				AnonymousClassDeclaration type = (AnonymousClassDeclaration) xparent;
				typeBinding = type.resolveBinding();// .getSuperclass();
			}
		}

		List<?> fragments = node.fragments();
		for (Iterator<?> iter = fragments.iterator(); iter.hasNext();) {
			VariableDeclarationFragment element = (VariableDeclarationFragment) iter.next();
			String fieldName = getJ2SName(element.getName());
			String ext = "";
			if (J2SUtil.checkKeywordViolation(fieldName)) {
				ext += "$";
			}
			if (typeBinding != null && isSameName(typeBinding, fieldName)) {
				ext += "$";
			}
			buffer.append("this.");
			if (isInheritedFieldName(typeBinding, fieldName)) {
				fieldName = getFieldName(typeBinding, fieldName);
			}
			buffer.append(ext + fieldName);
			buffer.append(" = ");
			Expression initializer = element.getInitializer();
			Type type = node.getType();
			boolean isPrimitive = type.isPrimitiveType();
			if (!ignoreInitializer && initializer != null) {
				writeFieldOrVarInitializer(initializer, type, isPrimitive);
			} else {
				boolean isArray = false;
				List<?> frags = node.fragments();
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
					writeDefaultFieldType(type);
				}
			}
			buffer.append(";\n");
		}
		return false;
	}

	public boolean visit(InfixExpression node) {
		if (writeConstantValue(node)) {
			return false;
		}
		ITypeBinding expTypeBinding = node.resolveTypeBinding();
		boolean beCare = false;
		if (expTypeBinding != null && expTypeBinding.getName().indexOf("String") == -1) {
			beCare = true;
		}
		String operator = node.getOperator().toString();
		Expression left = node.getLeftOperand();
		Expression right = node.getRightOperand();
		ITypeBinding typeBinding = left.resolveTypeBinding();

		if ((">".equals(operator) || "<".equals(operator) || ">=".equals(operator) || "<=".equals(operator)
				|| "==".equals(operator) || "!=".equals(operator))) {
			ITypeBinding rightBinding = right.resolveTypeBinding();
			if (typeBinding.isPrimitive() && "char".equals(typeBinding.getName()) && rightBinding.isPrimitive()
					&& "char".equals(rightBinding.getName())) {
				boxOrUnboxExpression(left);
				buffer.append(' ');
				buffer.append(operator);
				buffer.append(' ');
				boxOrUnboxExpression(right);
				return false;
			}
		}
		if ("/".equals(operator)) {
			if (typeBinding != null && typeBinding.isPrimitive()) {
				if (isIntegerType(typeBinding.getName())) {
					ITypeBinding rightTypeBinding = right.resolveTypeBinding();
					if (isIntegerType(rightTypeBinding.getName())) {
						StringBuffer tmpBuffer = buffer;
						buffer = new StringBuffer();

						// buffer.append("Math.floor (");
						// TODO
						buffer.append("Clazz.doubleToInt(");
						charVisit(left, beCare);
						buffer.append(' ');
						buffer.append(operator);
						buffer.append(' ');
						charVisit(right, beCare);
						buffer.append(')');
						List<?> extendedOperands = node.extendedOperands();
						if (extendedOperands.size() > 0) {
							for (Iterator<?> iter = extendedOperands.iterator(); iter.hasNext();) {
								ASTNode element = (ASTNode) iter.next();
								boolean is2Floor = false;
								if (element instanceof Expression) {
									Expression exp = (Expression) element;
									ITypeBinding expBinding = exp.resolveTypeBinding();
									if (isIntegerType(expBinding.getName())) {
										// buffer.insert(0, "Math.floor (");
										buffer.insert(0, "Clazz.doubleToInt(");
										is2Floor = true;
									}
								}
								buffer.append(' ');
								buffer.append(operator);
								buffer.append(' ');
								charVisit(element, beCare);
								if (is2Floor) {
									buffer.append(')');
								}
							}
						}

						tmpBuffer.append(buffer);
						buffer = tmpBuffer;
						tmpBuffer = null;

						return false;
					}
				}
			}
		}
		boolean simple = false;
		if (typeBinding != null && typeBinding.isPrimitive()) {
			if ("boolean".equals(typeBinding.getName())) {
				if (checkInfixOperator(node)) {
					buffer.append(" new Boolean (");
					simple = true;
				}
			}
		}

		charVisit(left, beCare);
		buffer.append(' ');
		buffer.append(operator);
		if ("==".equals(operator) || "!=".equals(operator)) {
			if (typeBinding != null && !typeBinding.isPrimitive() && !(left instanceof NullLiteral)
					&& !(right instanceof NullLiteral)
			/*
			 * && !(node.getLeftOperand() instanceof StringLiteral) // "abc" == ... &&
			 * !(node.getRightOperand() instanceof StringLiteral)
			 */) {
				buffer.append('=');
			}
		}
		buffer.append(' ');
		charVisit(right, beCare);
		List<?> extendedOperands = node.extendedOperands();
		if (extendedOperands.size() > 0) {
			for (Iterator<?> iter = extendedOperands.iterator(); iter.hasNext();) {
				buffer.append(' ');
				buffer.append(operator);
				buffer.append(' ');
				ASTNode element = (ASTNode) iter.next();
				charVisit(element, beCare);
			}
		}
		if (simple) {
			buffer.append(").valueOf()");
		}
		return false;
	}

	public boolean visit(Initializer node) {
		if (ignore(node)) {
			return false;
		}
		node.getBody().accept(this);
		return false;
	}

	public void endVisit(MethodDeclaration node) {
		if (ignore(node)) {
			return;
		}

		IMethodBinding mBinding = node.resolveBinding();
		if (mBinding != null) {
			methodDeclareStack.pop();
		}
		List<J2SUtil.FinalVariable> finalVars = variableHelper.finalVars;
		List<?> visitedVars = variableHelper.visitedVars;
		List<J2SUtil.FinalVariable> normalVars = variableHelper.normalVars;
		List<?> parameters = node.parameters();
		String methodSig = null;
		IMethodBinding resolveBinding = node.resolveBinding();
		if (resolveBinding != null) {
			methodSig = resolveBinding.getKey();
		}
		for (int i = parameters.size() - 1; i >= 0; i--) {
			SingleVariableDeclaration varDecl = (SingleVariableDeclaration) parameters.get(i);
			
			SimpleName name = varDecl.getName();
			IBinding binding = name.resolveBinding();
			if (binding != null) {
				String identifier = name.getIdentifier();
				J2SUtil.FinalVariable f = new J2SUtil.FinalVariable(blockLevel + 1, identifier, methodSig);
				f.toVariableName = identifier;
				normalVars.remove(f);
				if ((binding.getModifiers() & Modifier.FINAL) != 0) {
					finalVars.remove(f);
				}
				visitedVars.remove(f);
			}
		}
	}

	public boolean visit(MethodDeclaration node) {
		if (ignore(node)) {
			return false;
		}
		IMethodBinding mBinding = node.resolveBinding();
		if (mBinding != null) {
			methodDeclareStack.push(mBinding.getKey());
		}
	
		if (node.getBody() == null && 
				((node.getModifiers() & Modifier.NATIVE) == 0
				|| J2SUtil.getJ2STag(node, "@j2sNative") == null)) {
			// could be an interface or an abstract method
			// but don't skip if we have @j2sNative with a NATIVE method
			// (see java.util.ResourceBundle.evalString)
			return false;
		}
		
		/*
		 * To skip those methods or constructors which are just overriding with default
		 * super methods or constructors.
		 */
		Block body = node.getBody();
		boolean needToCheckArgs = false;
		List<?> argsList = null;
		if (body != null && body.statements().size() == 1) {
			List<?> sts = body.statements();
			Object statement = sts.get(sts.size() - 1);
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
		if (argsList != null && needToCheckArgs) {
			List<?> params = node.parameters();
			if (params.size() == argsList.size()) {
				// same parameters count
				boolean isOnlySuper = true;
				for (Iterator<?> iter = params.iterator(), itr = argsList.iterator(); iter.hasNext();) {
					ASTNode astNode = (ASTNode) iter.next();
					ASTNode argNode = (ASTNode) itr.next();
					if (astNode instanceof SingleVariableDeclaration && argNode instanceof SimpleName) {
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
					return false;
				}
			}
		}
		if ((node.getModifiers() & Modifier.PRIVATE) != 0 && mBinding != null
				&& !J2SUtil.MethodReferenceASTVisitor.checkReference(node.getRoot(), mBinding.getKey())) {
			System.out.println("J2SV1753 reference skipping " + node);
			return false;
		}

		if (node.isConstructor()) {
			if (J2SUtil.getJ2STag(node, "@j2sOverride") != null) {
				buffer.append("Clazz.overrideConstructor(");
			} else {
				buffer.append("Clazz.makeConstructor(");
			}
		} else {
			if ((node.getModifiers() & Modifier.STATIC) != 0) {
				/* replace full class name with short variable name */
				buffer.append("cla$$");
				// buffer.append(fullClassName);
				buffer.append(".");
				// buffer.append(methods[i].getName());
				node.getName().accept(this);
				buffer.append(" = ");
			}
			if (J2SUtil.getJ2STag(node, "@j2sOverride") != null) {
				buffer.append("Clazz.overrideMethod(");
			} else if (J2SUtil.MethodReferenceASTVisitor.canAutoOverride(node)) {
				buffer.append("Clazz.overrideMethod(");
			} else {
				buffer.append("Clazz.defineMethod(");
			}
		}
		/* replace full class name with short variable name */
		buffer.append("cla$$");

		if (node.isConstructor()) {
			buffer.append(", ");
		} else {
			buffer.append(", \"");
			String identifier = getJ2SName(node.getName());
			if (J2SUtil.checkKeywordViolation(identifier)) {
				buffer.append('$');
			}
			buffer.append(identifier);
			buffer.append("\", ");
		}
		buffer.append("\n");
		buffer.append("function (");
		List<?> parameters = node.parameters();
		boxList(parameters, ", ");
		buffer.append(") ");
		if (node.isConstructor()) {
			boolean isSuperCalled = false;
			List<?> statements = node.getBody().statements();
			if (statements.size() > 0) {
				ASTNode firstStatement = (ASTNode) statements.get(0);
				if (firstStatement instanceof SuperConstructorInvocation
						|| firstStatement instanceof ConstructorInvocation) {
					isSuperCalled = true;
				}
			}
			if (J2SUtil.getJ2STag(node, "@j2sIgnoreSuperConstructor") != null) {
				isSuperCalled = true;
			}
			boolean existedSuperClass = false;
			IMethodBinding binding = node.resolveBinding();
			if (binding != null) {
				ITypeBinding declaringClass = binding.getDeclaringClass();
				ITypeBinding superclass = declaringClass.getSuperclass();
				if (superclass != null) {
					String qualifiedName = J2SUtil.discardGenericType(superclass.getQualifiedName());
					existedSuperClass = !"java.lang.Object".equals(qualifiedName)
							&& !"java.lang.Enum".equals(qualifiedName);
				}
			}
			if (!isSuperCalled && existedSuperClass) {
				buffer.append("{\n");
				buffer.append("Clazz.superConstructor (this, ");
				buffer.append(J2SUtil.assureQualifiedName(shortenQualifiedName(getFullClassName())));
				boolean constructorVarargs = isConstructorVarargs(binding, true);
				if (constructorVarargs) {
					buffer.append(", [[]]);\n");
				} else {
					buffer.append(", []);\n");
				}
				boolean read = writeJ2STags(node, false);
				if (!read) {
					blockLevel++;
					boxList(statements, "");
					// buffer.append("}");
					endVisit(node.getBody());
				} else {
					buffer.append("}");
				}
			} else {
				boolean read = writeJ2STags(node, true);
				if (!read) {
					node.getBody().accept(this);
				}
			}
		} else if (node.getBody() == null) {
			blockLevel++;
			if (!writeJ2STags(node, true)) {
				buffer.append("{\n");
				processJ2STags(node.getJavadoc(), null, false);
				buffer.append("}");
			}
			List<J2SUtil.FinalVariable> normalVars = variableHelper.normalVars;
			for (int i = normalVars.size() - 1; i >= 0; i--) {
				J2SUtil.FinalVariable var = normalVars.get(i);
				if (var.blockLevel >= blockLevel) {
					normalVars.remove(i);
				}
			}
			blockLevel--;
		} else {
			boolean read = writeJ2STags(node, true);
			if (!read) {
				node.getBody().accept(this);
			}
		}
		if (parameters.size() != 0) {
			buffer.append(", \"");
			for (Iterator<?> iter = parameters.iterator(); iter.hasNext();) {
				SingleVariableDeclaration element = (SingleVariableDeclaration) iter.next();
				boolean isArray = false;
				IBinding resolveBinding = element.getName().resolveBinding();
				if (resolveBinding instanceof IVariableBinding) {
					IVariableBinding varBinding = (IVariableBinding) resolveBinding;
					isArray = varBinding.getType().isArray();
					if (isArray) {
						// buffer.append("Array");
						buffer.append("~A");
					}
				}
				if (!isArray) {
					Type type = element.getType();
					if (type.isPrimitiveType()) {
						PrimitiveType pType = (PrimitiveType) type;
						if (pType.getPrimitiveTypeCode() == PrimitiveType.BOOLEAN) {
							buffer.append("~B"); // Boolean
						} else if (pType.getPrimitiveTypeCode() == PrimitiveType.CHAR) {
							buffer.append("~S"); // String for char
						} else {
							buffer.append("~N"); // Number
						}
					} else if (type.isArrayType()) {
						buffer.append("~A"); // Array
					} else {
						ITypeBinding binding = type.resolveBinding();
						if (binding != null) {
							if (binding.isTypeVariable()) {
								buffer.append("~O");
							} else {
								String name = binding.getQualifiedName();
								name = shortenQualifiedName(name);
								if ("String".equals(name)) {
									buffer.append("~S");
								} else if ("Object".equals(name)) {
									buffer.append("~O");
								} else {
									buffer.append(name);
								}
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
		buffer.append(");\n");
		return false;
	}

	public boolean visit(MethodInvocation node) {
		Expression expression = node.getExpression();
		if (expression != null) {
			/*
			 * Here?
			 */
			expression.accept(this);
			buffer.append(".");
		}

		String methodName = node.getName().getIdentifier();
		List<?> args = node.arguments();
		int size = args.size();
		boolean isSpecialMethod = false;
		if (J2SUtil.MethodReferenceASTVisitor.isMethodRegistered(methodName)
				&& (size == 0 || methodName.equals("split") || methodName.equals("replace"))) {
			IBinding binding = node.getName().resolveBinding();
			if (binding != null && binding instanceof IMethodBinding) {
				IMethodBinding mthBinding = (IMethodBinding) binding;
				String className = mthBinding.getDeclaringClass().getQualifiedName();
				String propertyName = J2SUtil.MethodReferenceASTVisitor.translate(className, methodName);
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
		buffer.append("(");
		IMethodBinding methodDeclaration = node.resolveMethodBinding();
		processMethodParameterList(node.arguments(), methodDeclaration, false, null, null);
		buffer.append(")");
		return false;
	}

	public boolean visit(SimpleName node) {
		if (writeConstantValue(node))
			return false;
		IBinding binding = node.resolveBinding();
		ASTNode parent = node.getParent();
		if (parent == null) {
			buffer.append(node);
			return false;
		}
		char ch = 0;
		if (buffer.length() > 0) {
			ch = buffer.charAt(buffer.length() - 1);
		}
		if (ch == '.' && parent instanceof QualifiedName) {
			if (binding != null && binding instanceof IVariableBinding) {
				IVariableBinding varBinding = (IVariableBinding) binding;
				IVariableBinding variableDeclaration = varBinding.getVariableDeclaration();
				ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
				String fieldName = getJ2SName(node);
				if (isSameName(declaringClass, fieldName)) {
					buffer.append('$');
				}
				if (J2SUtil.checkKeywordViolation(fieldName)) {
					buffer.append('$');
				}
				if (declaringClass != null && isInheritedFieldName(declaringClass, fieldName)) {
					fieldName = getFieldName(declaringClass, fieldName);
				}
				buffer.append(fieldName);
				return false;
			}
			buffer.append(node);
			return false;
		}
		if (parent instanceof ClassInstanceCreation && !(binding instanceof IVariableBinding)) {
			ITypeBinding binding2 = node.resolveTypeBinding();
			if (binding != null) {
				String name = binding2.getQualifiedName();
				name = J2SUtil.assureQualifiedName(shortenQualifiedName(name));
				buffer.append(name);
			} else {
				String nodeId = getJ2SName(node);
				buffer.append(J2SUtil.assureQualifiedName(shortenQualifiedName(nodeId)));
			}
			return false;
		}
		if (binding == null) {
			String name = getJ2SName(node);
			name = shortenQualifiedName(name);
			if (J2SUtil.checkKeywordViolation(name)) {
				buffer.append('$');
			}
			buffer.append(name);
			return false;
		}
		if (binding instanceof IVariableBinding) {
			IVariableBinding varBinding = (IVariableBinding) binding;
			processSimpleNameInVarBinding(node, ch, varBinding);
		} else if (binding instanceof IMethodBinding) {
			IMethodBinding mthBinding = (IMethodBinding) binding;
			processSimpleNameInMethodBinding(node, ch, mthBinding);
		} else {
			ITypeBinding typeBinding = node.resolveTypeBinding();
			processSimpleNameInTypeBinding(node, typeBinding);
		}
		return false;
	}

	public boolean visit(SimpleType node) {
		ITypeBinding binding = node.resolveBinding();
		if (binding != null) {
			buffer.append(J2SUtil.assureQualifiedName(shortenQualifiedName(binding.getQualifiedName())));
		} else {
			buffer.append(node);
		}
		return false;
	}

	public boolean visit(SingleVariableDeclaration node) {
		SimpleName name = node.getName();
		declareVariable(name, blockLevel + 1);
		return false;
	}

	public boolean visit(SuperConstructorInvocation node) {
		IMethodBinding constructorBinding = node.resolveConstructorBinding();
		if (constructorBinding == null) {
			return false;
		}
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
				if (J2SUtil.getJ2STag(method, "@j2sIgnoreSuperConstructor") != null) {
					return false;
				}
			}
		}
		buffer.append("Clazz.superConstructor(this, ");
		buffer.append(J2SUtil.assureQualifiedName(shortenQualifiedName(getFullClassName())));
		IMethodBinding methodDeclaration = null;
		methodDeclaration = constructorBinding.getMethodDeclaration();
		processMethodParameterList(node.arguments(), methodDeclaration, true, ", [", "]");
		buffer.append(");\n");
		return false;
	}

	public boolean visit(SuperFieldAccess node) {
		ASTNode xparent = node.getParent();
		while (xparent != null && !(xparent instanceof AbstractTypeDeclaration)
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
		String fieldName = getJ2SName(node.getName());
		if (isInheritedFieldName(typeBinding, fieldName)) {
			if (typeBinding != null) {
				IVariableBinding[] declaredFields = typeBinding.getDeclaredFields();
				for (int i = 0; i < declaredFields.length; i++) {
					String superFieldName = getJ2SName(declaredFields[i]);
					if (fieldName.equals(superFieldName)) {
						buffer.append("this.");
						if (J2SUtil.checkKeywordViolation(fieldName)) {
							buffer.append('$');
						}
						fieldName = getFieldName(typeBinding.getSuperclass(), fieldName);
						buffer.append(fieldName);
						return false;
					}
				}
			}
		}
		buffer.append("this.");
		if (J2SUtil.checkKeywordViolation(fieldName)) {
			buffer.append('$');
		}
		buffer.append(fieldName);

		return false;
	}

	public boolean visit(SuperMethodInvocation node) {
		buffer.append("Clazz.superCall(this, ");
		buffer.append(J2SUtil.assureQualifiedName(shortenQualifiedName(getFullClassName())));
		buffer.append(", \"");
		String name = getJ2SName(node.getName());
		buffer.append(name);
		buffer.append("\", [");
		IMethodBinding methodDeclaration = node.resolveMethodBinding();
		processMethodParameterList(node.arguments(), methodDeclaration, false, null, null);
		buffer.append("])");
		return false;
	}

	public boolean visit(ThisExpression node) {
		Name qualifier = node.getQualifier();
		if (qualifier != null) {
			ASTNode xparent = node.getParent();
			while (xparent != null && !(xparent instanceof AbstractTypeDeclaration)
					&& !(xparent instanceof AnonymousClassDeclaration)) {
				xparent = xparent.getParent();
			}
			if (xparent == null || xparent.getParent() == null // CompilationUnit
					|| xparent.getParent().getParent() == null) {
				buffer.append("this");
			} else {
				/*
				 * only need callbacks wrapper in inner classes or anonymous classes.
				 */
				buffer.append("this.callbacks[\"");
				qualifier.accept(this);
				buffer.append("\"]");
			}
		} else {
			buffer.append("this");
		}
		return false;
	}

	public boolean visit(TypeDeclaration node) {
		ITypeBinding binding = node.resolveBinding();
		if (binding.isAnnotation())
			return false;
		boolean isTopLevel = (binding != null && binding.isTopLevel());
		J2SUtil.TypeHelper typeVisitor = typeHelper;
		if (isTopLevel && binding != null) {
			typeVisitor.setClassName(binding.getName());
		}
		if ((node != rootTypeNode) && node.getParent() != null && (node.getParent() instanceof AbstractTypeDeclaration
				|| node.getParent() instanceof TypeDeclarationStatement)) {
			processInnerStaticClass(node, binding, typeVisitor);
			return false;
		}

		if (node.isInterface()) {
			return false;
		}

		buffer.append("var cla$$ = Clazz.decorateAsClass(function(){\n");
		if (node == rootTypeNode && (node.getModifiers() & Modifier.STATIC) == 0
				&& ((node.getParent() instanceof TypeDeclaration && !((TypeDeclaration) node.getParent()).isInterface())
						|| node.getParent() instanceof TypeDeclarationStatement)) {
			buffer.append("Clazz.prepareCallback(this, arguments);\n");
		}
		List<?> bodyDeclarations = node.bodyDeclarations();
		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
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
					 * As members of interface should be treated as final and for javascript
					 * interface won't get instantiated, so the member will be treated specially.
					 */
					continue;
				}
				FieldDeclaration fieldDeclaration = (FieldDeclaration) element;
				if (ignore(fieldDeclaration)) {
					continue;
				}
				if (fieldNeedsPreparation(fieldDeclaration, true)) {
					processFieldDeclaration(fieldDeclaration, true);
					continue;
				}
			} else if (element instanceof TypeDeclaration) {
				if (node.isInterface()) {
					/*
					 * As sub type of interface should be treated as final and for javascript
					 * interface won't get instantiated, so the type will be treated specially.
					 */
					continue;
				}
			}
			element.accept(this);
		}
		return false;
	}

	public void endVisit(TypeDeclaration node) {
		if (node != rootTypeNode && node.getParent() != null && (node.getParent() instanceof AbstractTypeDeclaration
				|| node.getParent() instanceof TypeDeclarationStatement)) {
			return;
		}
		ITypeBinding typeBinding = node.resolveBinding();
		if (typeBinding.isAnnotation())
			return;
		boolean isInterface = node.isInterface(); 
		if (!isInterface) {
			buffer.append("Clazz.instantialize(this, arguments);\n}, ");
		}
		String emptyFun = emptyFunction;
		int idx = buffer.lastIndexOf(emptyFun);

		if (idx != -1 && idx == buffer.length() - emptyFun.length()) {
			buffer.replace(idx, buffer.length(), "Clazz.declareType(");
		}

		String fullClassName = getFullDotClassName(typeHelper.getClassName());
		if (isInterface) {
			boolean need_c$ = false;
			for (Iterator<?> iter = node.bodyDeclarations().iterator(); iter.hasNext();) {
				ASTNode element = (ASTNode) iter.next();
				if (element instanceof Initializer) {
					if (ignore((Initializer) element)) {
						continue;
					}
					need_c$ = true;
				} else if (element instanceof FieldDeclaration) {
					FieldDeclaration field = (FieldDeclaration) element;
					if (ignore(field)) {
						continue;
					}
					if ((field.getModifiers() & Modifier.STATIC) != 0) {
						need_c$ = true;
					} else if (isInterface) {
						List<?> fragments = field.fragments();
						need_c$ = fragments.size() > 0;
					}
				}
				if (need_c$) {
					break;
				}
			}
			if (need_c$) {
				buffer.append("var cla$$ = ");
			}
			buffer.append("Clazz.declareInterface(");	
		}
		
		
		// add package and name
		
		int lastIndexOf = fullClassName.lastIndexOf('.');
		if (lastIndexOf != -1) {
			buffer.append(J2SUtil.assureQualifiedName(shortenPackageName(fullClassName)));
			buffer.append(", \"" + fullClassName.substring(lastIndexOf + 1) + "\"");
		} else {
			buffer.append("null, \"" + fullClassName + "\"");
		}

		// add superclass 
		
		String superName = null;
		if (typeBinding != null) {
			ITypeBinding superclass = typeBinding.getSuperclass();
			if (superclass != null) {
				// non-interface only
				String clazzName = superclass.getQualifiedName();
				clazzName = J2SUtil.assureQualifiedName(shortenQualifiedName(clazzName));
				if (clazzName != null && clazzName.length() != 0 && !"Object".equals(clazzName)) {
					superName = clazzName;
				}
			}
		}
		if (superName != null) {
			buffer.append(", ");
			buffer.append(superName);
		} else if (!isInterface) {
			buffer.append(", null");
		}
		buffer.append(", ");
		
		// add superInterfaces
		
		List<?> superInterfaces = node.superInterfaceTypes();
		int size = superInterfaces.size();
		if (size == 0) {
			buffer.append("null");
		} else if (size > 1) {
			buffer.append("[");
		}
		for (Iterator<?> iter = superInterfaces.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			ITypeBinding binding = ((Type) element).resolveBinding();
			if (binding != null) {
				String clazzName = binding.getQualifiedName();
				clazzName = J2SUtil.assureQualifiedName(shortenQualifiedName(clazzName));
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
		Type superType = node.getSuperclassType();
		if (superType != null) {
			superclass = superType.resolveBinding();
		}
		if (superclass != null) {
			ITypeBinding binding = superclass;
			if (!binding.isTopLevel()) {
				if ((binding.getModifiers() & Modifier.STATIC) == 0) {
					buffer.append(", Clazz.innerTypeInstance(");
					buffer.append(J2SUtil.assureQualifiedName(shortenQualifiedName(binding.getQualifiedName())));
					buffer.append(", this, null, Clazz.inheritArgs");
					buffer.append(")");
				}
			}
		}
		int len = buffer.length();
		if (buffer.indexOf(", null", len - 6) >= 0) {
			buffer.setLength(len - 6);
		}
		if (buffer.indexOf(", null", len - 6) >= 0) {
			buffer.setLength(len - 6);
		}
		buffer.append(");\n");

		StringBuffer laterBufferBackup = laterBuffer;
		// buffer.append(laterBuffer);
		laterBuffer = new StringBuffer();
		// Enum is considered as static member!

		// pass 1: write Clazz.prepareFields(...) if necessary
		List<?> bodyDeclarations = node.bodyDeclarations();
		StringBuffer tmpBuffer = buffer;
		if (checkTypeNeedsFieldPreparations(bodyDeclarations, isInterface)) {
			writePrepareFields(bodyDeclarations, isInterface);
		}

		// pass 2: Enum declarations
		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof EnumDeclaration) {
				element.accept(this);
			}
		}

		// pass 3: methods
		MethodDeclaration[] methods = node.getMethods();
		for (int i = 0; i < methods.length; i++) {
			// All the methods are defined outside the main function body! -- March 17, 2006
			methods[i].accept(this);
		}

		// pass 4: inner classes for interfaces only
		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (isInterface && element instanceof TypeDeclaration) {
				element.accept(this);
			}
		}
		
		// Interface's inner interfaces or classes
		buffer.append(laterBuffer);
		tmpBuffer = buffer;
		StringBuffer tmpLaterBuffer = laterBuffer;
		buffer = new StringBuffer();
		laterBuffer = new StringBuffer();
		
		// pass 5: static {  ....  } blocks and static fields
		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof TypeDeclaration) {
				if (isInterface) {
					// the above codes have already dealt those inner classes inside interface
					// just ignore here
					continue;
				}
			} else if (element instanceof Initializer) {
				if (ignore((Initializer) element)) {
					continue;
				}
				if ((((Initializer) element).getModifiers() & Modifier.STATIC) != 0) {
					element.accept(this);
				} else {
					continue; // ignore here
				}
			} else if (element instanceof FieldDeclaration) {
				FieldDeclaration field = (FieldDeclaration) element;
				if (ignore(field)) {
					continue;
				}
				if ((field.getModifiers() & Modifier.STATIC) != 0 || isInterface) {
					List<?> fragments = field.fragments();
					for (int j = 0; j < fragments.size(); j++) {
						VariableDeclarationFragment vdf = (VariableDeclarationFragment) fragments.get(j);
						Expression initializer = vdf.getInitializer();
						if (initializer != null) {
							boxOrUnboxExpression(initializer);
						}
					}
				}
			}
		}
		buffer = tmpBuffer;
		laterBuffer = tmpLaterBuffer;

		if (methodBuffer.length() > 0) {
			buffer.append(methodBuffer);
			methodBuffer = new StringBuffer();
		}
		buffer.append(laterBufferBackup);
				
		// pass 6: add static initializers and static fields
		
		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof TypeDeclaration) {
				if (isInterface) {
					// the above codes have already dealt those inner classes inside interface
					// just ignore here
					continue;
				}
			} else if (element instanceof Initializer) {
				if (ignore((Initializer) element)) {
					continue;
				}
				if ((((Initializer) element).getModifiers() & Modifier.STATIC) != 0) {
					element.accept(this);
				} else {
					continue; // ignore here
				}
			} else if (element instanceof FieldDeclaration) {
				FieldDeclaration field = (FieldDeclaration) element;
				if (ignore(field)) {
					continue;
				}
				if (isInterface || (field.getModifiers() & Modifier.STATIC) != 0) {
					List<?> fragments = field.fragments();
					for (int j = 0; j < fragments.size(); j++) {
						VariableDeclarationFragment vdf = (VariableDeclarationFragment) fragments.get(j);
						if ("serialVersionUID".equals(vdf.getName().getIdentifier())) {
							continue;
						}
						Expression initializer = vdf.getInitializer();
						boolean isArray = (initializer instanceof ArrayInitializer);
						Type type = field.getType();
						boolean isPrimitive = type.isPrimitiveType();
						if (!isArray && (field.getModifiers() & Modifier.FINAL) != 0
								&& !fieldNeedsPreparation(field, false)
								&& (isPrimitive || isString(type))) {
							// BH 2023.11.09 final static primitives literals that are not
							// being boxed can be ignored since any expression is presented here as a
							// literal
							continue;
						}
						writeStaticFieldWithInitializer(initializer, type, vdf, isPrimitive);
					}
				}
			}
		}
		laterBuffer = new StringBuffer();
	}

	private void processInnerStaticClass(TypeDeclaration node, ITypeBinding binding, TypeHelper typeVisitor) {
		/* inner static class */
		J2SLegacyVisitor visitor = null;
		try {
			visitor = this.getClass().newInstance();
		} catch (@SuppressWarnings("unused") Exception e) {
			visitor = new J2SLegacyVisitor(); // Default visitor
		}
		visitor.rootTypeNode = node;
		String className = typeVisitor.getClassName();
		String visitorClassName = null;
		if (binding != null && node.getParent() instanceof TypeDeclarationStatement) {
			String anonClassName = null;
			if (binding.isAnonymous() || binding.isLocal()) {
				anonClassName = J2SUtil.assureQualifiedName(shortenQualifiedName(binding.getBinaryName()));
			} else {
				anonClassName = J2SUtil.assureQualifiedName(shortenQualifiedName(binding.getQualifiedName()));
			}
			int idx = anonClassName.lastIndexOf('.');
			if (idx == -1) {
				visitorClassName = anonClassName;
			} else {
				visitorClassName = anonClassName.substring(idx + 1);
			}
		} else {
			visitorClassName = className + "." + node.getName();
		}
		visitor.typeHelper.setClassName(visitorClassName);
		visitor.thisPackageName = thisPackageName;
		node.accept(visitor);
		if (node.isInterface() || (node.getModifiers() & Modifier.STATIC) != 0
				|| (node.getParent() instanceof TypeDeclaration
						&& ((TypeDeclaration) node.getParent()).isInterface())) {
			String str = visitor.buffer.toString();
			if (str.startsWith("var cla$$")) {
				laterBuffer.append("/*if3*/;(function(){\n");
				laterBuffer.append(str);
				laterBuffer.append("/*eoif3*/})();\n");
			} else {
				laterBuffer.append(str);
			}
		} else {
			buffer.append("if (!Clazz.isClassDefined(\"");
			buffer.append(visitor.getFullClassName());
			buffer.append("\")) {\n");

			methodBuffer.append("cla$$.$");
			String targetClassName = visitor.typeHelper.getClassName();
			targetClassName = targetClassName.replace('.', '$');
			methodBuffer.append(targetClassName);
			methodBuffer.append("$ = function(){\n");
			methodBuffer.append("/*if4*/;(function(){\n");
			methodBuffer.append(visitor.buffer);
			methodBuffer.append("/*eoif4*/})();\n");
			methodBuffer.append("};\n");

			String pkgName = visitor.getPackageName();
			if (pkgName != null && pkgName.length() > 0) {
				buffer.append(pkgName);
				buffer.append(".");
			}
			buffer.append(className);
			buffer.append(".$");
			buffer.append(targetClassName);
			buffer.append("$ ();\n");
			buffer.append("}\n");

		}
	}

	public boolean visit(TypeLiteral node) {
		Type type = node.getType();
		if (type.isPrimitiveType()) {
			ITypeBinding resolveBinding = type.resolveBinding();
			String name = resolveBinding.getName();
			if ("boolean".equals(name)) {
				buffer.append("Boolean");
				return false;
			}
			buffer.append("Number");
			return false;
		} else if (type.isArrayType()) {
			buffer.append("Array");
			return false;
		} else {
			ITypeBinding resolveBinding = type.resolveBinding();
			String name = resolveBinding.getName();
			if ("Object".equals(name) || "java.lang.Object".equals(name)) {
				buffer.append("Clazz._O"); // BH 2023.11.10
				return false;
			}
		}
		type.accept(this);
		return false;
	}

	public boolean visit(ArrayAccess node) {
		node.getArray().accept(this);
		buffer.append('[');
		int idx1 = buffer.length();
		Expression index = node.getIndex();
		index.accept(this);
		ITypeBinding rightTypeBinding = index.resolveTypeBinding();
		if (rightTypeBinding != null && "char".equals(rightTypeBinding.getName())) {
			boolean appendingCode = true;
			int length = buffer.length();
			if (index instanceof MethodInvocation) {
				MethodInvocation m = (MethodInvocation) index;
				if ("charAt".equals(m.getName().toString())) {
					int idx2 = buffer.indexOf(".charAt ", idx1);
					if (idx2 != -1) {
						StringBuffer newMethodBuffer = new StringBuffer();
						newMethodBuffer.append(buffer.substring(idx1, idx2));
						newMethodBuffer.append(".charCodeAt ");
						newMethodBuffer.append(buffer.substring(idx2 + 8, length));
						buffer.delete(idx1, length);
						buffer.append(newMethodBuffer.toString());
						appendingCode = false;
					}
				}
			}
			if (appendingCode) {
				buffer.append(".charCodeAt(0)");
			}
		}
		buffer.append(']');
		return false;
	}

	public boolean visit(ArrayCreation node) {
		/*
		 * TODO: multi-dimension Array creation
		 */
		ArrayInitializer initializer = node.getInitializer();
		if (initializer != null) {
			initializer.accept(this);
		} else {
			List<?> dim = node.dimensions();
			ITypeBinding elementType = node.getType().getElementType().resolveBinding();
			if (elementType != null){
				if (elementType.isPrimitive()) {
					String typeCode = elementType.getName();
					if ("int".equals(typeCode)
							|| "float".equals(typeCode)
							|| "double".equals(typeCode)
							|| "byte".equals(typeCode)
							|| "long".equals(typeCode)
							|| "short".equals(typeCode)) {
						buffer.append(" Clazz.new");
						buffer.append(typeCode.substring(0, 1).toUpperCase());
						buffer.append(typeCode.substring(1));
						buffer.append("Array (");
						boxList(dim, ", ");
						buffer.append(", 0)");
					} else if ("char".equals(typeCode)) {
						buffer.append(" Clazz.newCharArray (");
						boxList(dim, ", ");
						buffer.append(", '\\0')");
					} else if ("boolean".equals(typeCode)) {
						buffer.append(" Clazz.newBooleanArray(");
						boxList(dim, ", ");
						buffer.append(", false)");
					} else {
						if (dim != null && dim.size() > 1) {
							buffer.append(" Clazz.newArray(");
							boxList(dim, ", ");
							buffer.append(", null)");
						} else {
							buffer.append(" new Array(");
							boxList(dim, "");
							buffer.append(")");
						}
					}
				} else {
					if (dim != null && dim.size() > 1) {
						buffer.append(" Clazz.newArray(");
						boxList(dim, ", ");
						buffer.append(", null)");
					} else {
						buffer.append(" new Array(");
						boxList(dim, "");
						buffer.append(")");
					}
				}
			}
		}
		return false;
	}

	public boolean visit(ArrayInitializer node) {
		List<?> expressions = node.expressions();
		ITypeBinding arrType = node.resolveTypeBinding();
		ITypeBinding elementType = null;
		if (arrType != null) {
			elementType = arrType.getComponentType();
		}
		if (elementType == null) {
			buffer.append("[");
			boxList(expressions, ", ");
			buffer.append("]");
			return false;
		}
		if (elementType.isPrimitive()) {
			String typeCode = elementType.getName();
			if ("int".equals(typeCode)
					|| "float".equals(typeCode)
					|| "double".equals(typeCode)
					|| "byte".equals(typeCode)
					|| "long".equals(typeCode)
					|| "short".equals(typeCode)) {
				buffer.append(" Clazz.new");
				buffer.append(typeCode.substring(0, 1).toUpperCase());
				buffer.append(typeCode.substring(1));
				buffer.append("Array(-1, ");
				buffer.append("[");
				boxList(expressions, ", ");
				buffer.append("])");
			} else if ("char".equals(typeCode)) {
				buffer.append(" Clazz.newCharArray(-1, ");
				buffer.append("[");
				boxList(expressions, ", ");
				buffer.append("])");
			} else if ("boolean".equals(typeCode)) {
				buffer.append(" Clazz.newBooleanArray(-1, ");
				buffer.append("[");
				boxList(expressions, ", ");
				buffer.append("])");
			} else {
				buffer.append(" Clazz.newArray(-1, ");
				buffer.append("[");
				boxList(expressions, ", ");
				buffer.append("])");
			}
		} else {
			buffer.append(" Clazz.newArray(-1, ");
			buffer.append("[");
			boxList(expressions, ", ");
			buffer.append("])");
		}
		return false;
	}

	public boolean visit(AssertStatement node) {
		/*
		 * TODO: should be implemented
		 */
		//return super.visit(node);
		/*
		 * The assert statement should be passed when debugging in
		 * native Java application mode. No need for JavaScript to
		 * throws errors.
		 */
		return false;
	}

	public boolean visit(Assignment node) {
		Expression left = node.getLeftHandSide();
		Expression right = node.getRightHandSide();
		IVariableBinding varBinding = null;
		if (left instanceof Name) {
			Name leftName = (Name) left;
			IBinding nameBinding = leftName.resolveBinding();
			if (nameBinding instanceof IVariableBinding) {
				varBinding = (IVariableBinding) nameBinding;
			}
		} else if (left instanceof FieldAccess) {
			FieldAccess leftAccess = (FieldAccess) left;
			varBinding = leftAccess.resolveFieldBinding();
		}
		String op = node.getOperator().toString();
		ITypeBinding declaring = null;
		String qName = null;
		if (varBinding != null 
				&& (varBinding.getModifiers() & Modifier.STATIC) != 0
				&& (declaring = varBinding.getDeclaringClass()) != null 
				&& !(qName = declaring.getQualifiedName()).startsWith("org.eclipse.swt.internal.xhtml.")
				&& !qName.startsWith("net.sf.j2s.html.")) {
			boolean directStaticAccess = left instanceof SimpleName
					|| (left instanceof QualifiedName && ((QualifiedName) left).getQualifier() instanceof SimpleName)
					|| (left instanceof FieldAccess && ((FieldAccess) left).getExpression() instanceof ThisExpression);
			ASTNode parent = node.getParent();
			boolean needParenthesis = !directStaticAccess && !(parent instanceof Statement);
			if (needParenthesis) {
				buffer.append("(");
			}
			if (left instanceof QualifiedName) {
				QualifiedName leftName = (QualifiedName) left;
				if (!(leftName.getQualifier() instanceof SimpleName)) {
					leftName.getQualifier().accept(this);
					buffer.append(", ");
				}
			} else if (left instanceof FieldAccess) {
				FieldAccess leftAccess = (FieldAccess) left;
				if (!(leftAccess.getExpression() instanceof ThisExpression)) { 
					leftAccess.getExpression().accept(this);
					buffer.append(", ");
				}
			}
			buffer.append(J2SUtil.assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
			buffer.append('.');
			if (left instanceof QualifiedName) {
				QualifiedName leftName = (QualifiedName) left;
				leftName.getName().accept(this);
			} else if (left instanceof FieldAccess) {
				FieldAccess leftAccess = (FieldAccess) left;
				leftAccess.getName().accept(this);
			} else {
				Name leftName = (Name) left;
				leftName.accept(this);
			}
			buffer.append(' ');
			boolean isMixedOp = op.trim().length() > 1;
			ITypeBinding leftTypeBinding = left.resolveTypeBinding();
			if (leftTypeBinding != null && "char".equals(leftTypeBinding.getName())) {
				ITypeBinding rightTypeBinding = right.resolveTypeBinding();
				if (!isMixedOp) { // =
					buffer.append(op);
					buffer.append(' ');
					if (rightTypeBinding != null && "char".equals(rightTypeBinding.getName())) {
						boxOrUnboxExpression(right);
					} else {
						buffer.append("String.fromCharCode(");
						boxOrUnboxExpression(right);
						buffer.append(')');
					}
				} else {
					buffer.append("= String.fromCharCode(");
					buffer.append(J2SUtil.assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
					buffer.append('.');
					if (left instanceof QualifiedName) {
						QualifiedName leftName = (QualifiedName) left;
						leftName.getName().accept(this);
					} else if (left instanceof FieldAccess) {
						FieldAccess leftAccess = (FieldAccess) left;
						leftAccess.getName().accept(this);
					} else {
						Name leftName = (Name) left;
						leftName.accept(this);
					}
					buffer.append(".charCodeAt(0) ");
					buffer.append(op.charAt(0));
					buffer.append(' ');
					if (rightTypeBinding != null && "char".equals(rightTypeBinding.getName())) {
						Object constValue = right.resolveConstantExpressionValue();
						if (constValue != null && constValue instanceof Character) {
							buffer.append(((Character) constValue).charValue() + 0);
						} else {
							boxOrUnboxExpression(right);
							buffer.append(".charCodeAt(0)");
						}
					} else {
						boxOrUnboxExpression(right);
					}
					buffer.append(")");
				}
			} else {
				buffer.append(op);
				buffer.append(' ');
				boxOrUnboxExpression(right);
			}

			if (needParenthesis) {
				buffer.append(")");
			}
			return false;
		}
		ITypeBinding typeBinding = left.resolveTypeBinding();
		if (typeBinding != null && typeBinding.isPrimitive()) {
			if ("boolean".equals(typeBinding.getName())) {
				if (op.startsWith("^")
						|| op.startsWith("|")
						|| op.startsWith("&")
						/*|| op.startsWith("!")*/) {
					left.accept(this);
					buffer.append(" = new Boolean (");
					left.accept(this);
					buffer.append(' ');
					buffer.append(op.charAt(0));
					if (right instanceof InfixExpression) {
						buffer.append("(");
						right.accept(this);
						buffer.append("))");
					} else {
						buffer.append(' ');
						right.accept(this);
						buffer.append(')');
					}
					buffer.append(".valueOf()");
					return false;
				}
			} else if ("char".equals(typeBinding.getName())) {
				boolean isMixedOp = op.trim().length() > 1;
				if (!isMixedOp) {
					if (right instanceof Name || right instanceof CharacterLiteral
							|| right instanceof ArrayAccess
							|| right instanceof FieldAccess
							|| right instanceof MethodInvocation
							|| right instanceof ParenthesizedExpression
							|| right instanceof SuperFieldAccess
							|| right instanceof SuperMethodInvocation
							|| right instanceof ThisExpression
							|| right instanceof CastExpression) {
						left.accept(this);
						buffer.append(" = ");
						right.accept(this);
						return false;
					}
				}
				ITypeBinding rightTypeBinding = right.resolveTypeBinding();
				left.accept(this);
				boolean rightIsChar = (rightTypeBinding != null && "char".equals(rightTypeBinding.getName())); 
				if (rightIsChar && !isMixedOp) {
					buffer.append(' ');
					buffer.append(op);
					buffer.append(' ');
					right.accept(this);
				} else {
					buffer.append(" = String.fromCharCode(");
					if (isMixedOp) {
						if (left instanceof SimpleName || left instanceof QualifiedName) {
							left.accept(this);
						} else {
							buffer.append("(");
							left.accept(this);
							buffer.append(")");
						}
						buffer.append(".charCodeAt(0)");
						buffer.append(op.charAt(0));
					}
					buffer.append(' ');
					if (right instanceof InfixExpression) {
						String constValue = getConstantValue(right);
						if (constValue != null) {
							buffer.append(constValue);
						} else {
							buffer.append("(");
							right.accept(this);
							buffer.append(")");
						}
						if (rightIsChar) {
							buffer.append(".charCodeAt(0)");
						}
					} else {
						if (rightIsChar) {
							Object constValue = right.resolveConstantExpressionValue();
							if (constValue != null && constValue instanceof Character) {
								buffer.append(((Character) constValue).charValue() + 0);
							} else {
								boolean needParenthesis = !(right instanceof ParenthesizedExpression || right instanceof PrefixExpression || right instanceof PostfixExpression);
								if (needParenthesis) {
									buffer.append("(");
								}
								right.accept(this);
								if (needParenthesis) {
									buffer.append(")");
								}
								buffer.append(".charCodeAt(0)");
							}
						} else {
							right.accept(this);
						}
					}
					buffer.append(')');
				}
				return false;
			}
		}
		left.accept(this);
		buffer.append(' ');
		buffer.append(op);
		buffer.append(' ');
		ITypeBinding binding = right.resolveTypeBinding();
		if (binding != null && "char".equals(binding.getName())) {
			String typeBindingName = (typeBinding == null ? "" : typeBinding.getName());
			if (right instanceof CharacterLiteral) {
				CharacterLiteral cl = (CharacterLiteral) right;
				if ("char".equals(typeBindingName) || typeBindingName.indexOf("String") != -1) {
					String constValue = getConstantValue(right);
					buffer.append(constValue);
				} else {
					buffer.append(0 + cl.charValue());
				}
			} else {
				if (typeBindingName != null && ("char".equals(typeBindingName) || typeBindingName.indexOf("String") != -1)) {
					right.accept(this);
				} else {
					int idx1 = buffer.length();
					buffer.append('(');
					right.accept(this);
					buffer.append(")");
					
					boolean appendingCode = true;
					int length = buffer.length();
					if (right instanceof MethodInvocation) {
						MethodInvocation m = (MethodInvocation) right;
						if ("charAt".equals(m.getName().toString())) {
							int idx2 = buffer.indexOf(".charAt ", idx1);
							if (idx2 != -1) {
								StringBuffer newMethodBuffer = new StringBuffer();
								newMethodBuffer.append(buffer.substring(idx1 + 1, idx2));
								newMethodBuffer.append(".charCodeAt ");
								newMethodBuffer.append(buffer.substring(idx2 + 8, length - 1));
								buffer.delete(idx1, length);
								buffer.append(newMethodBuffer.toString());
								appendingCode = false;
							}
						}
					}
					if (appendingCode) {
						buffer.append(".charCodeAt(0)");
					}
				}
			}
		} else {
			boxOrUnboxExpression(right);
		}
		return false;
	}

	public void endVisit(Block node) {
		buffer.append("}");
		List<J2SUtil.FinalVariable> finalVars = variableHelper.finalVars;
		List<J2SUtil.FinalVariable> normalVars = variableHelper.normalVars;
		for (int i = finalVars.size() - 1; i >= 0; i--) {
			J2SUtil.FinalVariable var = finalVars.get(i);
			if (var.blockLevel >= blockLevel) {
				finalVars.remove(i);
			}
		}
		for (int i = normalVars.size() - 1; i >= 0; i--) {
			J2SUtil.FinalVariable var = normalVars.get(i);
			if (var.blockLevel >= blockLevel) {
				normalVars.remove(i);
			}
		}
	}

	public boolean visit(BooleanLiteral node) {
		buffer.append(node.booleanValue());
		return false;
	}

	public boolean visit(BreakStatement node) {
		buffer.append("break");
		/*
		 * TODO: verify that the label is not supported!
		 */
		SimpleName label = node.getLabel();
		if (label != null) {
			buffer.append(' ');
			label.accept(this);
		}
		buffer.append(";\n");
		return false;
	}

	public boolean visit(CatchClause node) {
		buffer.append(" catch (");
		node.getException().accept(this);
		buffer.append(") ");
		node.getBody().accept(this);
		return false;
	}

	public boolean visit(CharacterLiteral node) {
		buffer.append(node.getEscapedValue());
		return false;
	}

	public boolean visit(ConditionalExpression node) {
		node.getExpression().accept(this);
		buffer.append(" ? ");
		node.getThenExpression().accept(this);
		buffer.append(" : ");
		node.getElseExpression().accept(this);
		return false;
	}

	public boolean visit(ContinueStatement node) {
		buffer.append("continue");
		/*
		 * TODO: verify that label is not supported!
		 */
		SimpleName label = node.getLabel();
		if (label != null) {
			buffer.append(' ');
			label.accept(this);
		}
		buffer.append(";\n");
		return false;
	}

	public boolean visit(DoStatement node) {
		buffer.append("do ");
		node.getBody().accept(this);
		buffer.append(" while (");
		node.getExpression().accept(this);
		buffer.append(");\n");
		return false;
	}

	public boolean visit(EmptyStatement node) {
		buffer.append(";");
		return false;
	}

	public boolean visit(EnhancedForStatement node) {
		
		SimpleName name = node.getParameter().getName();
		String varName = name.getIdentifier();
		buffer.append("for (var ");
		buffer.append(varName);
		//name.accept(this);
		buffer.append(", $");
		buffer.append(varName);
		//name.accept(this);
		buffer.append(" = ");
		Expression exp = node.getExpression();
		ITypeBinding typeBinding = exp.resolveTypeBinding();
		if (typeBinding.isArray()) {
			buffer.append("0, $$");
			buffer.append(varName);
			buffer.append(" = ");
			exp.accept(this);
			buffer.append("; $");
			buffer.append(varName);
			buffer.append(" < $$");
			buffer.append(varName);
			buffer.append(".length && ((");
			buffer.append(varName);
			buffer.append(" = $$");
			buffer.append(varName);
			buffer.append("[$");
			buffer.append(varName);
			buffer.append("]) || true); $");
			buffer.append(varName);
			buffer.append("++");
		} else {
			exp.accept(this);
			buffer.append(".iterator (); $");
			buffer.append(varName);
			//name.accept(this);
			buffer.append(".hasNext()&& ((");
			buffer.append(varName);
			//name.accept(this);
			buffer.append(" = $");
			buffer.append(varName);
			//name.accept(this);
			buffer.append(".next ()) || true);");
		}
		buffer.append(") ");
		node.getBody().accept(this);
		buffer.append("\n");
		return false;
	}

	public void endVisit(ExpressionStatement node) {
		buffer.append(";\n");
	}

	public boolean visit(ForStatement node) {
		buffer.append("for (");
		boxList(node.initializers(), ", ");
		buffer.append("; ");
		Expression expression = node.getExpression();
		if (expression != null) {
			expression.accept(this);
		}
		buffer.append("; ");
		boxList(node.updaters(), ", ");
		buffer.append(") ");
		node.getBody().accept(this);
		buffer.append("\n");
		return false;
	}

	public boolean visit(IfStatement node) {
		buffer.append("if (");
		/**
		 * Boolean x = Boolean.FALSE;
		 * 
		 * if( x ){
		 * 
		 * }
		 * should converted to 
		 * if(x.booleanValue()){
		 * 
		 * }
		 */
		boxOrUnboxExpression(node.getExpression());
		buffer.append(") ");
		node.getThenStatement().accept(this);
		if (node.getElseStatement() != null) {
			buffer.append(" else ");
			node.getElseStatement().accept(this);
		}
		return false;
	}

	public boolean visit(ImportDeclaration node) {
		return false;
	}

	public boolean visit(InstanceofExpression node) {
		Type right = node.getRightOperand();
		int pt = buffer.length();
		buffer.append("Clazz.instanceOf("); // len == 17
		node.getLeftOperand().accept(this);
		buffer.append(",");
		if (right instanceof ArrayType) {
			buffer.append("Array");
		} else {
			buffer.append("\"");
			int pt2 = buffer.length();
			right.accept(this);
			if (buffer.substring(pt2).equals("String")) {
				buffer.setLength(pt2 - 2); //,
				buffer.append(")=='string'");
				buffer.replace(pt,  pt + 17, "(typeof(");
			} else if (buffer.indexOf(".",pt2) < 0) {
			  // Integer, Exception, etc.
			  buffer.setCharAt(pt2 - 1, ' ');
			} else {
				buffer.append("\"");
			}
		}
		buffer.append(")");
		return false;
	}

	public boolean visit(LabeledStatement node) {
		buffer.append(node.getLabel());
		buffer.append(" : ");
		node.getBody().accept(this);
		return false;
	}

	public boolean visit(Modifier node) {
		return false;
	}

	public boolean visit(NumberLiteral node) {
		String token = node.getToken();
		if (token.endsWith("L") || token.endsWith("l")) {
			buffer.append(token.substring(0, token.length() - 1));
		} else if (!token.startsWith("0x") && !token.startsWith("0X")) {
			if (token.endsWith("F") || token.endsWith("f")
					|| token.endsWith("D") || token.endsWith("d")) {
				buffer.append(token.substring(0, token.length() - 1));
			} else {
				buffer.append(token);
			}
		} else {
			buffer.append(token);
		}
		return false;
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

	public boolean visit(PackageDeclaration node) {
		super.visit(node);
		for (int i = J2SUtil.preDeclaredPackages.length; --i >= 0;) {
			if (thisPackageName.equals(J2SUtil.preDeclaredPackages[i])) {
				return false;
			}
		}
		buffer.append("Clazz.declarePackage(\"");
		node.getName().accept(this);
		buffer.append("\");\n");
		return false;
	}

	public boolean visit(ParenthesizedExpression node) {
		buffer.append("(");
		node.getExpression().accept(this);
		buffer.append(")");
		return false;
	}

	public void endVisit(PostfixExpression node) {
		Expression left = node.getOperand();
		IVariableBinding varBinding = null;
		if (left instanceof Name) {
			Name leftName = (Name) left;
			IBinding nameBinding = leftName.resolveBinding();
			if (nameBinding instanceof IVariableBinding) {
				varBinding = (IVariableBinding) nameBinding;
			}
		} else if (left instanceof FieldAccess) {
			FieldAccess leftAccess = (FieldAccess) left;
			varBinding = leftAccess.resolveFieldBinding();
		}
		ITypeBinding declaring = null;
		String qName = null;
		if (varBinding != null 
				&& (varBinding.getModifiers() & Modifier.STATIC) != 0
				&& (declaring = varBinding.getDeclaringClass()) != null 
				&& !(qName = declaring.getQualifiedName()).startsWith("org.eclipse.swt.internal.xhtml.")
				&& !qName.startsWith("net.sf.j2s.html.")) {
			return ;
		}
		ITypeBinding typeBinding = node.getOperand().resolveTypeBinding();
		if (typeBinding != null && typeBinding.isPrimitive()) {
			if ("char".equals(typeBinding.getName())) {
				return ;
			}
		}
		buffer.append(node.getOperator());
	}

	public boolean visit(PostfixExpression node) {
		Expression left = node.getOperand();
		IVariableBinding varBinding = null;
		if (left instanceof Name) {
			Name leftName = (Name) left;
			IBinding nameBinding = leftName.resolveBinding();
			if (nameBinding instanceof IVariableBinding) {
				varBinding = (IVariableBinding) nameBinding;
			}
		} else if (left instanceof FieldAccess) {
			FieldAccess leftAccess = (FieldAccess) left;
			varBinding = leftAccess.resolveFieldBinding();
		}
		ITypeBinding typeBinding = left.resolveTypeBinding();
		ITypeBinding declaring = null;
		String qName = null;
		if (varBinding != null 
				&& (varBinding.getModifiers() & Modifier.STATIC) != 0
				&& (declaring = varBinding.getDeclaringClass()) != null 
				&& !(qName = declaring.getQualifiedName()).startsWith("org.eclipse.swt.internal.xhtml.")
				&& !qName.startsWith("net.sf.j2s.html.")) {
			boolean directStaticAccess = left instanceof SimpleName
					|| (left instanceof QualifiedName && ((QualifiedName) left).getQualifier() instanceof SimpleName)
					|| (left instanceof FieldAccess && ((FieldAccess) left).getExpression() instanceof ThisExpression);
			ASTNode parent = node.getParent();
			boolean staticCharType = (typeBinding != null && typeBinding.isPrimitive() && "char".equals(typeBinding.getName()));
			boolean needParenthesis = (!directStaticAccess || staticCharType)
					&& !(parent instanceof Statement || parent instanceof ParenthesizedExpression);
			if (needParenthesis) {
				buffer.append("(");
			}
			if (left instanceof QualifiedName) {
				QualifiedName leftName = (QualifiedName) left;
				if (!(leftName.getQualifier() instanceof SimpleName)) {
					leftName.getQualifier().accept(this);
					buffer.append(", ");
				}
			} else if (left instanceof FieldAccess) {
				FieldAccess leftAccess = (FieldAccess) left;
				if (!(leftAccess.getExpression() instanceof ThisExpression)) { 
					leftAccess.getExpression().accept(this);
					buffer.append(", ");
				}
			}
			if ((staticCharType) && !(parent instanceof Statement)) {
				buffer.append("$t$ = ");
			}
			String op = node.getOperator().toString();
			if (staticCharType) {
				if (!(parent instanceof Statement)) {
					buffer.append(J2SUtil.assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
					buffer.append('.');
					if (left instanceof QualifiedName) {
						QualifiedName leftName = (QualifiedName) left;
						leftName.getName().accept(this);
					} else if (left instanceof FieldAccess) {
						FieldAccess leftAccess = (FieldAccess) left;
						leftAccess.getName().accept(this);
					} else {
						Name leftName = (Name) left;
						leftName.accept(this);
					}
					buffer.append(", ");
				}
				buffer.append(J2SUtil.assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
				buffer.append('.');
				if (left instanceof QualifiedName) {
					QualifiedName leftName = (QualifiedName) left;
					leftName.getName().accept(this);
				} else if (left instanceof FieldAccess) {
					FieldAccess leftAccess = (FieldAccess) left;
					leftAccess.getName().accept(this);
				} else {
					Name leftName = (Name) left;
					leftName.accept(this);
				}
				buffer.append(" = String.fromCharCode(");
				buffer.append(J2SUtil.assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
				buffer.append('.');
				if (left instanceof QualifiedName) {
					QualifiedName leftName = (QualifiedName) left;
					leftName.getName().accept(this);
				} else if (left instanceof FieldAccess) {
					FieldAccess leftAccess = (FieldAccess) left;
					leftAccess.getName().accept(this);
				} else {
					Name leftName = (Name) left;
					leftName.accept(this);
				}
				if ("++".equals(op)) {
					buffer.append(".charCodeAt(0)+1)");
				} else {
					buffer.append(".charCodeAt(0)-1)");
				}
			} else {
				buffer.append(J2SUtil.assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
				buffer.append('.');
				if (left instanceof QualifiedName) {
					QualifiedName leftName = (QualifiedName) left;
					leftName.getName().accept(this);
				} else if (left instanceof FieldAccess) {
					FieldAccess leftAccess = (FieldAccess) left;
					leftAccess.getName().accept(this);
				} else {
					Name leftName = (Name) left;
					leftName.accept(this);
				}
				buffer.append(op);
			}
			if (staticCharType && !(parent instanceof Statement)) {
				buffer.append(", $t$");
			}
			if (needParenthesis) {
				buffer.append(")");
			}
			return false;
		}
		if (typeBinding != null && typeBinding.isPrimitive()) {
			if ("char".equals(typeBinding.getName())) {
				ASTNode parent = node.getParent();
				if (!(parent instanceof Statement)) {
					if (!(parent instanceof ParenthesizedExpression)) {
						buffer.append("(");
					}
					buffer.append("$c$ = ");
					left.accept(this);
					buffer.append(", ");
				}
				left.accept(this);
				buffer.append(" = String.fromCharCode(");
				left.accept(this);
				String op = node.getOperator().toString();
				if ("++".equals(op)) {
					buffer.append(".charCodeAt(0)+1)");
				} else {
					buffer.append(".charCodeAt(0)-1)");
				}
				if (!(parent instanceof Statement)) {
					buffer.append(", $c$");
					if (!(parent instanceof ParenthesizedExpression)) {
						buffer.append(")");
					}
				}
				return false;
			}
		}
		boxOrUnboxExpression(left);
		return false;
		//return super.visit(node);
	}

	public boolean visit(PrefixExpression node) {
		if (writeConstantValue(node))
			return false;
		String op = node.getOperator().toString();
		if ("~".equals(op) || "!".equals(op)) {
			buffer.append(op);
			return super.visit(node);
		}
		Expression left = node.getOperand();
		IVariableBinding varBinding = null;
		if (left instanceof Name) {
			Name leftName = (Name) left;
			IBinding nameBinding = leftName.resolveBinding();
			if (nameBinding instanceof IVariableBinding) {
				varBinding = (IVariableBinding) nameBinding;
			}
		} else if (left instanceof FieldAccess) {
			FieldAccess leftAccess = (FieldAccess) left;
			varBinding = leftAccess.resolveFieldBinding();
		}
		ITypeBinding typeBinding = left.resolveTypeBinding();
		ITypeBinding declaring = null;
		String qName = null;
		if (varBinding != null 
				&& (varBinding.getModifiers() & Modifier.STATIC) != 0
				&& (declaring = varBinding.getDeclaringClass()) != null 
				&& !(qName = declaring.getQualifiedName()).startsWith("org.eclipse.swt.internal.xhtml.")
				&& !qName.startsWith("net.sf.j2s.html.")) {
			boolean directStaticAccess = left instanceof SimpleName
					|| (left instanceof QualifiedName && ((QualifiedName) left).getQualifier() instanceof SimpleName)
					|| (left instanceof FieldAccess && ((FieldAccess) left).getExpression() instanceof ThisExpression);
			ASTNode parent = node.getParent();
			boolean needParenthesis = (!directStaticAccess
					|| (typeBinding != null && typeBinding.isPrimitive() && "char".equals(typeBinding.getName())))
					&& !(parent instanceof Statement || parent instanceof ParenthesizedExpression);
			if (needParenthesis) {
				buffer.append("(");
			}
			if (left instanceof QualifiedName) {
				QualifiedName leftName = (QualifiedName) left;
				if (!(leftName.getQualifier() instanceof SimpleName)) {
					leftName.getQualifier().accept(this);
					buffer.append(", ");
				}
			} else if (left instanceof FieldAccess) {
				FieldAccess leftAccess = (FieldAccess) left;
				if (!(leftAccess.getExpression() instanceof ThisExpression/* 
						|| leftAccess.getExpression() instanceof SimpleName*/)) { 
					leftAccess.getExpression().accept(this);
					buffer.append(", ");
				}
			}
			if (typeBinding != null && typeBinding.isPrimitive() && "char".equals(typeBinding.getName())) {
				buffer.append(J2SUtil.assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
				buffer.append('.');
				if (left instanceof QualifiedName) {
					QualifiedName leftName = (QualifiedName) left;
					leftName.getName().accept(this);
				} else if (left instanceof FieldAccess) {
					FieldAccess leftAccess = (FieldAccess) left;
					leftAccess.getName().accept(this);
				} else {
					Name leftName = (Name) left;
					leftName.accept(this);
				}
				buffer.append(" = String.fromCharCode(");
				buffer.append(J2SUtil.assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
				buffer.append('.');
				if (left instanceof QualifiedName) {
					QualifiedName leftName = (QualifiedName) left;
					leftName.getName().accept(this);
				} else if (left instanceof FieldAccess) {
					FieldAccess leftAccess = (FieldAccess) left;
					leftAccess.getName().accept(this);
				} else {
					Name leftName = (Name) left;
					leftName.accept(this);
				}
				if ("++".equals(op)) {
					buffer.append(".charCodeAt(0)+1)");
				} else {
					buffer.append(".charCodeAt(0)-1)");
				}
			} else {
				buffer.append(op);
				//buffer.append(' ');
				buffer.append(J2SUtil.assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
				buffer.append('.');
				if (left instanceof QualifiedName) {
					QualifiedName leftName = (QualifiedName) left;
					leftName.getName().accept(this);
				} else if (left instanceof FieldAccess) {
					FieldAccess leftAccess = (FieldAccess) left;
					leftAccess.getName().accept(this);
				} else {
					Name leftName = (Name) left;
					leftName.accept(this);
				}
			}
			if (needParenthesis) {
				buffer.append(")");
			}
			return false;
		}
		if (typeBinding.isPrimitive()) {
			if ("char".equals(typeBinding.getName())) {
				ASTNode parent = node.getParent();
				if (!(parent instanceof Statement || parent instanceof ParenthesizedExpression)) {
					buffer.append("(");
				}
				left.accept(this);
				buffer.append(" = String.fromCharCode(");
				left.accept(this);
				if ("++".equals(op)) {
					buffer.append(".charCodeAt(0)+1)");
				} else {
					buffer.append(".charCodeAt(0)-1)");
				}
				if (!(parent instanceof Statement || parent instanceof ParenthesizedExpression)) {
					buffer.append(")");
				}
				return false;
			}
		}
		buffer.append(node.getOperator());
		boxOrUnboxExpression(left);
		return false;
	}

	public boolean visit(QualifiedName node) {
		if (isSimpleQualified(node) && writeConstantValue(node)) {
			return false;
		}
		boolean staticFields = false;
		IVariableBinding varBinding = null;
		IBinding nameBinding = node.resolveBinding();
		if (nameBinding instanceof IVariableBinding) {
			varBinding = (IVariableBinding) nameBinding;
		}
		if (varBinding != null 
				&& (varBinding.getModifiers() & Modifier.STATIC) != 0
				&& (varBinding.getDeclaringClass()) != null 
				) { 
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
						if (name.indexOf("java.lang.") == 0) {
							name = name.substring(10);
						}
						if (name.length() != 0) {
							if (staticFields) {
								@SuppressWarnings("null")
								String qname = J2SUtil.assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName()));
								if (qualifier instanceof SimpleName) {
									buffer.append(qname);
								} else {
									buffer.append('(');
									buffer.append(name);
									buffer.append(", ");
									buffer.append(qname);
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
				@SuppressWarnings("null")
				String qname = J2SUtil.assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName()));
				if (qName instanceof SimpleName) {
					buffer.append(qname);
				} else {
					buffer.append('(');
					qName.accept(this);
					buffer.append(", ");
					buffer.append(qname);
					buffer.append(')');
				}
			} else {
				qName.accept(this);
			}
			buffer.append('.');
		}
		node.getName().accept(this);
		return false;
	}

	public boolean visit(ReturnStatement node) {
		buffer.append("return");
		Expression expression = node.getExpression();
		if (expression != null) {
			buffer.append(' ');
			boolean needCharWrapping = false;
			ASTNode parent = node.getParent();
			while (parent != null && !(parent instanceof MethodDeclaration)) {
				parent = parent.getParent();
			}
			if (parent != null) {
				MethodDeclaration m = (MethodDeclaration) parent;
				IMethodBinding binding = m.resolveBinding();
				if (binding != null) {
					ITypeBinding returnType = binding.getReturnType();
					if (returnType != null && "char".equals(returnType.getName())) {
						needCharWrapping = true;
					}
				}
			}
			if (needCharWrapping) {
				ITypeBinding tBinding = expression.resolveTypeBinding();
				if (tBinding != null && !("char".equals(tBinding.getName()))) {
					buffer.append("String.fromCharCode (");
					expression.accept(this);
					buffer.append(")");
				} else {
					expression.accept(this);
				}
			} else {
				expression.accept(this);
			}
		}
		buffer.append(";\n");
		return false;
	}

	public boolean visit(StringLiteral node) {
		buffer.append(node.getEscapedValue());
		return false;
	}

	public boolean visit(SwitchCase node) {
		if (node.isDefault()) {
			buffer.append("default:\n");
		} else {
			buffer.append("case ");
			writeCharAsInt(node.getExpression(), false);
			buffer.append(":\n");
		}
		return false;
	}

	public boolean visit(SwitchStatement node) {
		buffer.append("switch (");
		
		Expression exp= node.getExpression();
		boolean isCharSwitch = exp.resolveTypeBinding().getName().equals("char");
		if (isCharSwitch) {
			buffer.append("(");
			exp.accept(this);
			buffer.append(").charCodeAt(0)");
		} else {
			exp.accept(this);
		}
		buffer.append(") {\n");
		boxList(node.statements(), "");
		buffer.append("}\n");
		return false;
	}

	public boolean visit(SynchronizedStatement node) {
		node.getBody().accept(this);
		return false;
	}

	public boolean visit(ThrowStatement node) {
		buffer.append("throw ");
		node.getExpression().accept(this);
		buffer.append(";\n");
		return false;
	}

	@SuppressWarnings("unchecked")
	public boolean visit(TryStatement node) {
		List<CatchClause> catchClauses = node.catchClauses();
		int nCatch = catchClauses.size();
		Block finallyBlock = node.getFinally();
		List<ASTNode> resources = node.resources();

		// try(resourceDefs) {
		// block code
		// } optional catch/finally{}
		// same as
		//
		// try { resourceDefs;
		// try {
		// block code
		// } finally {resourceDefs.close();}
		// } nonOptional catch/finally{}

		// same rules apply in terms of catch

		// Returns the live ordered list of resources for this try statement (added in
		// JLS4 API).
		// [ooh...JSL9 change...]
		// A resource is either a VariableDeclarationExpression or (since JLS9) a Name.
		int pt = -1;
		boolean haveResources = (resources != null && resources.size() > 0);
		boolean haveCatchOrFinal = (nCatch > 0 || finallyBlock != null);
		String closing = "";
		if (haveResources && resources != null) {
			buffer.append("try {\n");
			for (int i = 0; i < resources.size(); i++) {
				ASTNode resource = resources.get(i);
				pt = buffer.length();
				resource.accept(this);
				buffer.append(";\n");
				closing = getResourceClosing(buffer.substring(pt)) + closing;
			}
		}
		buffer.append("try ");
		node.getBody().accept(this);
		if (haveResources && resources != null) {
			pt = buffer.lastIndexOf("}");
			buffer.setLength(pt);
			buffer.append("\n}finally{/*res*/").append(closing).append("}\n}");
		}
		if (nCatch > 0) {
			String catchEName = "e$$";
			if (nCatch == 1) {
				CatchClause element = catchClauses.get(0);
				SimpleName exName = element.getException().getName();
				catchEName = exName.getIdentifier();
			}
			buffer.append(" catch (" + catchEName + ") ");
			boolean scopeAdded = false;
			boolean endedWithThrowable = false;
			for (Iterator<CatchClause> iter = catchClauses.iterator(); iter.hasNext();) {
				CatchClause element = iter.next();
				List<Type> types;
				Type type = element.getException().getType();
				if (type instanceof UnionType) {
					types = ((UnionType) type).types();
				} else {
					(types = new ArrayList<Type>()).add(type);
				}
				boolean haveType = false;
				for (int j = 0; j < types.size(); j++) {
					type = types.get(j);
					if ("java.lang.Throwable".equals(type.resolveBinding().getQualifiedName())) {
						endedWithThrowable = true;
					} else {
						if (!scopeAdded) {
							buffer.append("{\n");
							scopeAdded = true;
						}
						buffer.append(haveType ? " || " : "if (");
						buffer.append("Clazz.exceptionOf(" + catchEName + ", ");
						int pte = buffer.length();
						type.accept(this);
						// no quotes for these four - see j2sjmol.js Clazz.exceptionOf BH 2023.11.21
						switch (buffer.substring(pte)) {
						case "Error":
						case "Exception":
						case "Throwable":
						case "NullPointerException":
							break;
						default:
							buffer.setCharAt(pte - 1, '"');
							buffer.append('"');
							break;
						}
						buffer.append(")");
						haveType = true;
					}
				}
				if (haveType)
					buffer.append(")");
				SimpleName exName = element.getException().getName();
				String eName = exName.getIdentifier();
				boolean notEName = false;
				if (!catchEName.equals(eName)) {
					buffer.append("{\nvar " + eName + " = " + catchEName + ";\n");
					notEName = true;
				}
				element.getBody().accept(this);
				if (notEName) {
					buffer.append("\n}");
				}
				if (iter.hasNext()) {
					buffer.append(" else ");
				}
			}
			if (!endedWithThrowable) {
				buffer.append(" else {\nthrow " + catchEName + ";\n}");
			}
			if (scopeAdded) {
				buffer.append("\n}");
			}
		}
		if (finallyBlock != null) {
			buffer.append(" finally ");
			finallyBlock.accept(this);
		} else if (!haveCatchOrFinal) {
			buffer.append("finally{}");
		}
		buffer.append("\n");
		return false;
	}

	public boolean visit(VariableDeclarationExpression node) {
		/*
		 * TODO: Confirm that whether "var" is necessary or not
		 */
		buffer.append("var ");
		boxList(node.fragments(), ", ");
		return false;
	}
	
	public boolean visit(VariableDeclarationFragment node) {
		SimpleName name = node.getName();
		declareVariable(name, blockLevel);
		Expression initializer = node.getInitializer();
		if (initializer != null) {
			buffer.append(" = ");
			ITypeBinding typeBinding = initializer.resolveTypeBinding();
			if (typeBinding != null && "char".equals(typeBinding.getName())) {
				ITypeBinding nameTypeBinding = name.resolveTypeBinding();
				String nameType = nameTypeBinding.getName();
				if (initializer instanceof CharacterLiteral) {
					CharacterLiteral cl = (CharacterLiteral) initializer;
					if ("char".equals(nameType)) {
						if (writeConstantValue(initializer))
							return false;
					} else {
						buffer.append(0 + cl.charValue());
						return false;
					}
				}
				if (nameType != null && !"char".equals(nameType) && nameType.indexOf("String") == -1) {
					int idx1 = buffer.length();
					buffer.append("(");
					boxOrUnboxExpression(initializer);
					buffer.append(")");
					boolean appendingCode = true;
					int length = buffer.length();
					if (initializer instanceof MethodInvocation) {
						MethodInvocation m = (MethodInvocation) initializer;
						if ("charAt".equals(m.getName().toString())) {
							int idx2 = buffer.indexOf(".charAt ", idx1);
							if (idx2 != -1) {
								StringBuffer newMethodBuffer = new StringBuffer();
								newMethodBuffer.append(buffer.substring(idx1 + 1, idx2));
								newMethodBuffer.append(".charCodeAt ");
								newMethodBuffer.append(buffer.substring(idx2 + 8, length - 1));
								buffer.delete(idx1, length);
								buffer.append(newMethodBuffer.toString());
								appendingCode = false;
							}
						}
					}
					if (appendingCode) {
						buffer.append(".charCodeAt(0)");
					}
					return false;
				}

			}
			ITypeBinding nameTypeBinding = name.resolveTypeBinding();
			if (nameTypeBinding != null) {
				String nameType = nameTypeBinding.getName();
				if ("char".equals(nameType)) {
					if (typeBinding != null && !"char".equals(typeBinding.getName())) {
						buffer.append("String.fromCharCode(");
						boxOrUnboxExpression(initializer);
						buffer.append(")");
						return false;
					}
				}
			}
			boxOrUnboxExpression(initializer);
		}
		return false;
	}

	public boolean visit(VariableDeclarationStatement node) {
		List<?> fragments = node.fragments();
		for (Iterator<?> iter = fragments.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			buffer.append("var ");
			element.accept(this);
			buffer.append(";\n");
		}
		return false;
	}

	public boolean visit(WhileStatement node) {
		buffer.append("while (");
		node.getExpression().accept(this);
		buffer.append(") ");
		node.getBody().accept(this);
		buffer.append("\n");
		return false;
	}

	/// private nonstatic methods
	
	private void declareVariable(SimpleName name, int blockLevel) {
		IBinding binding = name.resolveBinding();
		if (binding != null) {
			String identifier = name.getIdentifier();
			J2SUtil.FinalVariable f = null;
			if (methodDeclareStack.size() == 0) {
				f = new J2SUtil.FinalVariable(blockLevel, identifier, null);
			} else {
				String methodSig = methodDeclareStack.peek();
				f = new J2SUtil.FinalVariable(blockLevel, identifier, methodSig);
			}
			List<J2SUtil.FinalVariable> finalVars = variableHelper.finalVars;
			List<J2SUtil.FinalVariable> normalVars = variableHelper.normalVars;
			f.toVariableName = identifier;
			normalVars.add(f);
			if ((binding.getModifiers() & Modifier.FINAL) != 0) {
				finalVars.add(f);
			}
		}
		name.accept(this);
	}

	private void boxList(List<?> list, String seperator) {
		for (Iterator<?> iter = list.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			boxOrUnboxExpression(element);
			if (iter.hasNext()) {
				buffer.append(seperator);
			}
		}
	}

	private void processSimpleNameInVarBinding(SimpleName node, char ch, IVariableBinding varBinding) {
		String thisClassName = typeHelper.getClassName();
		if ((varBinding.getModifiers() & Modifier.STATIC) != 0) {
			IVariableBinding variableDeclaration = varBinding.getVariableDeclaration();
			ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
			if (ch != '.' && ch != '\"' && declaringClass != null) {
				String name = declaringClass.getQualifiedName();
				if ((name == null || name.length() == 0) && declaringClass.isAnonymous()) {
					name = declaringClass.getBinaryName();
				}
				name = J2SUtil.assureQualifiedName(shortenQualifiedName(name));
				if (name.length() != 0) {
					buffer.append(name);
					buffer.append(".");
				}
			}
			String fieldName = getJ2SName(node);
			if (isSameName(declaringClass, fieldName)) {
				buffer.append('$');
			}
			if (J2SUtil.checkKeywordViolation(fieldName)) {
				buffer.append('$');
			}
			if (declaringClass != null && isInheritedFieldName(declaringClass, fieldName)) {
				fieldName = getFieldName(declaringClass, fieldName);
			}
			buffer.append(fieldName);
		} else {
			ASTNode parent = node.getParent();
			if (parent != null && !(parent instanceof FieldAccess)) {
				IVariableBinding variableDeclaration = varBinding.getVariableDeclaration();
				ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
				if (declaringClass != null && thisClassName != null && ch != '.') {
					appendFieldName(parent, declaringClass);
				}
			}

			String fieldVar = null;
			if (variableHelper.isFinalSensible && (varBinding.getModifiers() & Modifier.FINAL) != 0
					&& varBinding.getDeclaringMethod() != null) {
				String key = varBinding.getDeclaringMethod().getKey();
				if (methodDeclareStack.size() == 0 || !key.equals(methodDeclareStack.peek())) {
					buffer.append("this.$finals.");
					if (currentBlockForVisit != -1) {
						List<J2SUtil.FinalVariable> finalVars = variableHelper.finalVars;
						List<J2SUtil.FinalVariable> visitedVars = variableHelper.visitedVars;
						int size = finalVars.size();
						for (int i = 0; i < size; i++) {
							J2SUtil.FinalVariable vv = finalVars.get(size - i - 1);
							if (vv.variableName.equals(varBinding.getName()) && vv.blockLevel <= currentBlockForVisit) {
								if (!visitedVars.contains(vv)) {
									visitedVars.add(vv);
								}
								fieldVar = vv.toVariableName;
							}
						}
					}
				}
			}

			IVariableBinding variableDeclaration = varBinding.getVariableDeclaration();
			ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
			String fieldName = null;
			if (declaringClass != null) {
				fieldName = getJ2SName(node);
			} else if (fieldVar == null) {
				fieldName = variableHelper.getVariableName(node.getIdentifier());
			} else {
				fieldName = fieldVar;
			}
			if (J2SUtil.checkKeywordViolation(fieldName)) {
				buffer.append('$');
			}
			if (declaringClass != null && isSameName(declaringClass, fieldName)) {
				buffer.append('$');
			}
			if (declaringClass != null && isInheritedFieldName(declaringClass, fieldName)) {
				fieldName = getFieldName(declaringClass, fieldName);
			}
			buffer.append(fieldName);
		}
	}

	private void processSimpleNameInMethodBinding(SimpleName node, char ch, IMethodBinding mthBinding) {
		String thisClassName = typeHelper.getClassName();
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
						name = J2SUtil.assureQualifiedName(shortenQualifiedName(name));
						if (name.length() != 0) {
							buffer.append(name);
							buffer.append(".");
						}
					}
				}
			}
			String name = getJ2SName(node);
			name = shortenQualifiedName(name);
			if (!(isClassString && "valueOf".equals(name)) && J2SUtil.checkKeywordViolation(name)) {
				buffer.append('$');
			}
			buffer.append(name);
		} else {
			ASTNode parent = node.getParent();
			boolean isClassString = false;
			if (parent != null && !(parent instanceof FieldAccess)) {
				IMethodBinding variableDeclaration = mthBinding.getMethodDeclaration();
				ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
				if (declaringClass != null && thisClassName != null && ch != '.') {
					isClassString = "java.lang.String".equals(declaringClass.getQualifiedName());
					appendFieldName(parent, declaringClass);
				}
			}
//					String name = node.getFullyQualifiedName();
			String name = getJ2SName(node);
			name = shortenQualifiedName(name);
			if (!(isClassString && "valueOf".equals(name)) && J2SUtil.checkKeywordViolation(name)) {
				buffer.append('$');
			}
			buffer.append(name);
		}
	}

	private void processSimpleNameInTypeBinding(SimpleName node, ITypeBinding typeBinding) {
		if (typeBinding != null) {
			String name = typeBinding.getQualifiedName();
			name = J2SUtil.assureQualifiedName(shortenQualifiedName(name));
			if (J2SUtil.checkKeywordViolation(name)) {
				buffer.append('$');
			}
			buffer.append(name);
		} else {
			String name = node.getFullyQualifiedName();
			if (J2SUtil.checkKeywordViolation(name)) {
				buffer.append('$');
			}
			buffer.append(name);
		}
	}

	private void appendFieldName(ASTNode parent, ITypeBinding declaringClass) {
		String name = declaringClass.getQualifiedName();
		boolean isThis = false;
		int superLevel = 0;
		while (parent != null) {
			if (parent instanceof AbstractTypeDeclaration) {
				AbstractTypeDeclaration type = (AbstractTypeDeclaration) parent;
				ITypeBinding typeBinding = type.resolveBinding();
				superLevel++;
				if (J2SUtil.isSuperType(declaringClass, typeBinding)) {
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
				if (J2SUtil.isSuperType(declaringClass, typeBinding)) {
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
			buffer.append(shortenQualifiedName(name));
			buffer.append("\"].");
		}
	}

	private static boolean isConstructorVarargs(IMethodBinding binding, boolean startSuper) {
		if (binding == null) {
			return false;
		}
		ITypeBinding declaringClass = binding.getDeclaringClass();
		ITypeBinding superclass = declaringClass;
		if (startSuper) {
			superclass = declaringClass.getSuperclass();
		}
		if (superclass == null) {
			return false;
		}
		do {
			IMethodBinding[] declaredMethods = superclass.getDeclaredMethods();
			if (declaredMethods == null) {
				return false;
			}
			boolean constructorVarargs = false;
			boolean containsNonDefaultConstructor = false;
			for (int i = 0; i < declaredMethods.length; i++) {
				IMethodBinding m = declaredMethods[i];
				if (m.isDefaultConstructor() || !m.isConstructor()) {
					continue;
				}
				containsNonDefaultConstructor = true;
				int modifiers = m.getModifiers();
				if ((modifiers & Modifier.PRIVATE) != 0) {
					continue;
				}
				if (modifiers == Modifier.NONE) {
					IPackageBinding declaringPackage = declaringClass.getPackage();
					IPackageBinding superPackage = superclass.getPackage();
					if (((declaringPackage == null) != (superPackage == null))) {
						continue;
					}
					if (superPackage != null && declaringPackage != null
							&& !declaringPackage.getName().equals(superPackage.getName())) {
						continue;
					}
				}
				ITypeBinding[] parameterTypes = m.getParameterTypes();
				if (parameterTypes == null || parameterTypes.length == 0) {
					constructorVarargs = false;
					break;
				} else if (parameterTypes.length == 1 && m.isVarargs()) {
					constructorVarargs = true;
				}
			}
			if (containsNonDefaultConstructor) {
				return constructorVarargs;
			}
			superclass = superclass.getSuperclass();
		} while (superclass != null);

		return false;
	}

	/*
	 * Check to see whether there are @j2sNative and append sources to buffer
	 */
	private boolean writeJ2STags(MethodDeclaration node, boolean needScope) {
		String prefix = "{\n";
		String suffix = "\n}";
		if (!needScope) {
			prefix = "";
			suffix = "";
		}
		return writeJ2SSources(node, "@j2sNative", prefix, suffix, false);
	}


	private String getFullClassName() {
		return typeHelper.getFullClassName(thisPackageName);
	}

	private void processMethodParameterList(List<?> arguments, IMethodBinding methodDeclaration, boolean isConstructor,
			String prefix, String suffix) {
		if (methodDeclaration == null) {
			return;
		}
		if (isConstructor && arguments.size() == 0) {
			boolean constructorVarargs = isConstructorVarargs(methodDeclaration, false);
			if (constructorVarargs) {
				if (prefix != null) {
					buffer.append(prefix);
				}
				buffer.append("[]");
				if (suffix != null) {
					buffer.append(suffix);
				}
			}
			return;
		}

		boolean alreadyPrefixed = false;
		String clazzName = null;
		ITypeBinding[] parameterTypes = methodDeclaration.getParameterTypes();
		ITypeBinding declaringClass = methodDeclaration.getDeclaringClass();
		if (declaringClass != null) {
			clazzName = declaringClass.getQualifiedName();
		}
		String methodName = methodDeclaration.getName();
		int argSize = arguments.size();
		for (int i = 0; i < parameterTypes.length; i++) {
			boolean isVarArgs = false;
			if (i == parameterTypes.length - 1) {
				ITypeBinding paramType = parameterTypes[i];
				if (parameterTypes.length != argSize) {
					isVarArgs = true;
				} else if (paramType.isArray() && methodDeclaration.isVarargs()) {
					Expression element = (Expression) arguments.get(i);
					ITypeBinding argType = element.resolveTypeBinding();
					if (!argType.isArray()) {
						if (!(element instanceof NullLiteral)) {
							isVarArgs = true;
						}
					}
				}
			}
			String parameterTypeName = null;
			parameterTypeName = parameterTypes[i].getName();
			if (!alreadyPrefixed && prefix != null) {
				buffer.append(prefix);
				alreadyPrefixed = true;
			}
			if (isVarArgs) {
				buffer.append("[");
				for (int j = i; j < argSize; j++) {
					ASTNode element = (ASTNode) arguments.get(j);
					processArgument(element, clazzName, methodName, parameterTypeName, i);
					if (j != argSize - 1) {
						buffer.append(", ");
					}
				}
				buffer.append("]");
			} else {
				ASTNode element = (ASTNode) arguments.get(i);
				processArgument(element, clazzName, methodName, parameterTypeName, i);
				if (i != parameterTypes.length - 1) {
					buffer.append(", ");
				}
			}
		}

		if (alreadyPrefixed && suffix != null) {
			buffer.append(suffix);
		}
	}

	private void processArgument(ASTNode element, String clazzName, String methodName, String parameterTypeName,
			int position) {
		String typeStr = null;
		if (element instanceof CastExpression) {
			CastExpression castExp = (CastExpression) element;
			Expression exp = castExp.getExpression();
			if (exp instanceof NullLiteral) {
				ITypeBinding nullTypeBinding = castExp.resolveTypeBinding();
				if (nullTypeBinding != null) {
					if (nullTypeBinding.isArray()) {
						typeStr = "Array";
					} else if (nullTypeBinding.isPrimitive()) {
						Code code = PrimitiveType.toCode(nullTypeBinding.getName());
						if (code == PrimitiveType.BOOLEAN) {
							typeStr = "Boolean";
						} else {
							typeStr = "Number";
						}
					} else if (!nullTypeBinding.isTypeVariable()) {
						typeStr = J2SUtil.assureQualifiedName(shortenQualifiedName(nullTypeBinding.getQualifiedName()));
					}
				}
			}
		}
		if (typeStr != null) {
			buffer.append("Clazz.castNullAs(\"");
			buffer.append(typeStr.replaceFirst("^\\$wt.", "org.eclipse.swt."));
			buffer.append("\")");
		} else {
			Expression exp = (Expression) element;
			ITypeBinding typeBinding = exp.resolveTypeBinding();
			String typeName = null;
			if (typeBinding != null) {
				typeName = typeBinding.getName();
			}
			int idx1 = buffer.length();
			if ("char".equals(typeName) && !"char".equals(parameterTypeName)) {
				boolean ignored = false;
				// Keep String#indexOf(int) and String#lastIndexOf(int)'s first char argument
				ignored = (position == 0 && ("indexOf".equals(methodName) || "lastIndexOf".equals(methodName))
						&& ("java.lang.String".equals(J2SUtil.removeBrackets(clazzName))));

				if (!ignored && exp instanceof CharacterLiteral) {
					CharacterLiteral cl = (CharacterLiteral) exp;
					buffer.append(0 + cl.charValue());
					ignored = true;
				} else {
					boxOrUnboxExpression(element);
				}
				if (!ignored) {
					boolean appendingCode = true;
					int length = buffer.length();
					if (exp instanceof MethodInvocation) {
						MethodInvocation m = (MethodInvocation) exp;
						if ("charAt".equals(m.getName().toString())) {
							int idx2 = buffer.indexOf(".charAt ", idx1);
							if (idx2 != -1) {
								StringBuffer newMethodBuffer = new StringBuffer();
								newMethodBuffer.append(buffer.substring(idx1, idx2));
								newMethodBuffer.append(".charCodeAt ");
								newMethodBuffer.append(buffer.substring(idx2 + 8, length));
								buffer.delete(idx1, length);
								buffer.append(newMethodBuffer.toString());
								appendingCode = false;
							}
						}
					}
					if (appendingCode) {
						buffer.append(".charCodeAt(0)");
					}
				}
			} else {
				boxOrUnboxExpression(element);
			}
		}
	}

	private void charVisit(ASTNode node, boolean beCare) {
		if (!beCare || !(node instanceof Expression)) {
			boxOrUnboxExpression(node);
			return;
		}
		Expression exp = (Expression) node;
		ITypeBinding binding = exp.resolveTypeBinding();
		if (binding.isPrimitive() && "char".equals(binding.getName())) {
			if (node instanceof CharacterLiteral) {
				CharacterLiteral cl = (CharacterLiteral) node;
				buffer.append(0 + cl.charValue());
			} else if (node instanceof SimpleName || node instanceof QualifiedName) {
				boxOrUnboxExpression(node);
				buffer.append(".charCodeAt(0)");
			} else {
				int idx1 = buffer.length();
				if (node instanceof PrefixExpression || node instanceof PostfixExpression
						|| node instanceof ParenthesizedExpression) {
					boxOrUnboxExpression(node);
				} else {
					buffer.append("(");
					boxOrUnboxExpression(node);
					buffer.append(")");
				}

				boolean appendingCode = true;
				int length = buffer.length();
				if (exp instanceof MethodInvocation) {
					MethodInvocation m = (MethodInvocation) exp;
					if ("charAt".equals(m.getName().toString())) {
						int idx2 = buffer.indexOf(".charAt ", idx1);
						if (idx2 != -1) {
							StringBuffer newMethodBuffer = new StringBuffer();
							newMethodBuffer.append(buffer.substring(idx1 + 1, idx2));
							newMethodBuffer.append(".charCodeAt ");
							newMethodBuffer.append(buffer.substring(idx2 + 8, length - 1));
							buffer.delete(idx1, length);
							buffer.append(newMethodBuffer.toString());
							appendingCode = false;
						}
					}
				}
				if (appendingCode) {
					buffer.append(".charCodeAt(0)");
				}
			}
		} else {
			boxOrUnboxExpression(node);
		}
	}

	/**
	 * will remove previous ( if present and haveParen
	 * 
	 * @param e
	 * @return did replace with an int
	 */
	private boolean writeCharAsInt(Expression e, boolean haveParen) {
		int pt = buffer.length();
		boxOrUnboxExpression(e);
		if (buffer.charAt(pt) == '\'') {
			// 'a'
			// '\r'
			// '\12'
			// '\123'
			// '\u0000'
			int rep = escapedCharToInt(buffer.substring(pt + 1, buffer.length() - 1));
			if (rep == Integer.MIN_VALUE)
				return false;
			if (haveParen)
				pt--;
			buffer.replace(pt, buffer.length(), "" + rep);
			return true;
		}
		return false;
	}

	private void writeDefaultFieldType(Type type) {
		if (type.isPrimitiveType()) {
			PrimitiveType pType = (PrimitiveType) type;
			Code code = pType.getPrimitiveTypeCode();
			if (code == PrimitiveType.BOOLEAN) {
				buffer.append("false");
			} else if (code == PrimitiveType.CHAR) {
				buffer.append("'\\0'");
			} else {
				buffer.append("0");
			}
		} else {
			buffer.append("null");
		}
	}

	private void writePrepareFields(List<?> bodyDeclarations, boolean isInterface) {
		// create the <init> method in Java
		// not static, has initializer, not a constant number, character, boolean, or string
		buffer.append("Clazz.prepareFields (cla$$, function(){\n");
		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof FieldDeclaration) {
				FieldDeclaration field = (FieldDeclaration) element;
				if (ignore(field)) {
					continue;
				}
				if (isInterface || !fieldNeedsPreparation(field, true)) {
					continue;
				}
				element.accept(this);
			} else if (element instanceof Initializer) {
				Initializer init = (Initializer) element;
				if (ignore(init)) {
					continue;
				}
				if ((init.getModifiers() & Modifier.STATIC) == 0) {
					element.accept(this);
				}
			}
		}
		buffer.append("});\n");

	}

	private void writeStaticFieldWithInitializer(Expression initializer, Type type, VariableDeclarationFragment vdf,
			boolean isPrimitive) {
		buffer.append("cla$$");
		buffer.append(".");
		vdf.getName().accept(this);
		buffer.append(" = ");
		if (initializer == null) {
			writeDefaultFieldType(type);
		} else {
			writeFieldOrVarInitializer(initializer, type, isPrimitive);
		}
		buffer.append(";\n");
	}

	private void writeFieldOrVarInitializer(Expression initializer, Type type, boolean isPrimitive) {
		if (isPrimitive) {
			ITypeBinding tBinding = initializer.resolveTypeBinding();
			if (((PrimitiveType) type).getPrimitiveTypeCode() == PrimitiveType.CHAR) {
				if (tBinding != null 
						&& !"char".equals(tBinding.getName())
						&& !"Character".equals(tBinding.getName())) {
					buffer.append("String.fromCharCode(");
					boxOrUnboxExpression(initializer);
					buffer.append(")");
					return;
				}
			} else if (tBinding != null 
					&& ("char".equals(tBinding.getName())
						|| "Character".equals(tBinding.getName())	
							)) {
				buffer.append("(");
				if (!writeCharAsInt(initializer, true)) {
					buffer.append(").charCodeAt(0)");
				}
				return;
			}
		}
		boxOrUnboxExpression(initializer, type);
	}


	/// private static methods

    private void boxOrUnboxExpression(ASTNode element) {
    	boxOrUnboxExpression(element, null);
    }

    private void boxOrUnboxExpression(ASTNode element, Type type) {
		if (element instanceof Expression) {
			Expression exp = (Expression) element;
			if (exp.resolveBoxing()) {
				// BH issue here is the odd Character c = 120, 
				// where we have to coerce int->char->Character;
				ITypeBinding typeBinding = exp.resolveTypeBinding();
				if (typeBinding.isPrimitive()) {
					boolean toChar =  type != null && "Character".equals(type.toString());
					Code code = PrimitiveType.toCode(typeBinding.getName());
					String primitiveTypeName = null;
					if (code == PrimitiveType.CHAR || toChar) {
						primitiveTypeName = "Character";
						toChar = (code != PrimitiveType.CHAR);
					} else	if (code == PrimitiveType.INT) {				
						primitiveTypeName = "Integer";
					} else if (code == PrimitiveType.LONG) {
						primitiveTypeName = "Long";
					} else if (code == PrimitiveType.FLOAT) {
						primitiveTypeName = "Float";
					} else if (code == PrimitiveType.DOUBLE) {
						primitiveTypeName = "Double";
					} else if (code == PrimitiveType.BOOLEAN) {
						primitiveTypeName = "Boolean";
					} else if (code == PrimitiveType.BYTE) {
						primitiveTypeName = "Byte";
					} else if (code == PrimitiveType.SHORT) {
						primitiveTypeName = "Short";
					}
 					if (primitiveTypeName != null) {
						buffer.append(toChar ? "new Character(String.fromCharCode(" : 
							"new " + primitiveTypeName + "(");
						element.accept(this);
						buffer.append(toChar ? "))" : ")");
						return ;
					}
				}
			} else if (exp.resolveUnboxing()) {
				ITypeBinding typeBinding = exp.resolveTypeBinding();
				if (!typeBinding.isPrimitive()) {
					String name = typeBinding.getQualifiedName();
					String primitiveName = null;
					if ("java.lang.Integer".equals(name)) {
						primitiveName = "int";
					} else if ("java.lang.Long".equals(name)) {
						primitiveName = "long";
					} else if ("java.lang.Float".equals(name)) {
						primitiveName = "float";
					} else if ("java.lang.Double".equals(name)) {
						primitiveName = "double";
					} else if ("java.lang.Boolean".equals(name)) {
						primitiveName = "boolean";
					} else if ("java.lang.Byte".equals(name)) {
						primitiveName = "byte";
					} else if ("java.lang.Short".equals(name)) {
						primitiveName = "short";
					} else if ("java.lang.Character".equals(name)) {
						primitiveName = "char";
					}
					 
					if (primitiveName != null) {
						buffer.append("(");
						element.accept(this);
						buffer.append(")." + primitiveName + "Value()");
						return;
					}
				}
			}
		}
		element.accept(this);
	}
    
	private static String getResourceClosing(String name) {
		// Java 9 try(res) or Java 8 try(OutputStream os = ....)
		int pt = name.indexOf("=");
		if (pt >= 0 || (pt = name.indexOf(";")) >= 0) {
			name = name.substring(0, pt);
		}
		if (name.startsWith("var"))
			name = name.substring(4);
		return name + "&&" + name + ".close&&" + name + ".close();";
	}

	private static String getJ2SName(SimpleName node) {
		IBinding binding = node.resolveBinding();
		return (binding instanceof IVariableBinding || binding instanceof IMethodBinding ? binding.getName()
				: node.getIdentifier());
	}

	private static String getJ2SName(IVariableBinding binding) {
		return binding.getName();
	}

	private static boolean checkSimpleBooleanOperator(String op) {
		return (op.equals("^") || op.equals("|") || op.equals("&"));
	}

	private static boolean checkInfixOperator(InfixExpression node) {
		String op = node.getOperator().toString();
		if (checkSimpleBooleanOperator(op)) {
			return true;
		}
		Expression left = node.getLeftOperand();
		if (left instanceof InfixExpression) {
			if (checkInfixOperator((InfixExpression) left)) {
				return true;
			}
		}
		Expression right = node.getRightOperand();
		if (right instanceof InfixExpression) {
			if (checkInfixOperator((InfixExpression) right)) {
				return true;
			}
		}
		return false;
	}

	private static boolean checkAnonOrEnumNeedsFieldPreparations(List<?> bodyDeclarations) {
		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof FieldDeclaration) {
				FieldDeclaration field = (FieldDeclaration) element;
				if (fieldNeedsPreparation(field, false))
					return true;
			} else if (element instanceof Initializer) {
				Initializer init = (Initializer) element;
				if ((init.getModifiers() & Modifier.STATIC) == 0) {
					return true;
				}
			}
		}
		return false;
	}

	private static boolean checkTypeNeedsFieldPreparations(List<?> bodyDeclarations, boolean isInterface) {
		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof FieldDeclaration) {
				FieldDeclaration field = (FieldDeclaration) element;
				if (ignore(field)
						|| isInterface || !fieldNeedsPreparation(field, false)) {
					continue;
				}
				return true;
			} else if (element instanceof Initializer) {
				Initializer init = (Initializer) element;
				if (ignore(init)) {
					continue;
				}
				if ((init.getModifiers() & Modifier.STATIC) == 0) {
					return true;
				}
			}
		}
		return false;
	}

	private static boolean isString(Type type) {
		// BH 2023.11.09
		String fqName = getTypeStringName(type);
		return ("String".equals(fqName) || "java.lang.String".equals(fqName));
	}

	private static boolean isSameName(ITypeBinding binding, String name) {
		if (binding != null) {
			IMethodBinding[] declaredMethods = binding.getDeclaredMethods();
			for (int i = 0; i < declaredMethods.length; i++) {
				if (name.equals(declaredMethods[i].getName())) {
					return true;
				}
			}
			ITypeBinding superclass = binding.getSuperclass();
			if (isSameName(superclass, name)) {
				return true;
			}
			ITypeBinding[] interfaces = binding.getInterfaces();
			if (interfaces != null) {
				for (int i = 0; i < interfaces.length; i++) {
					if (isSameName(interfaces[i], name)) {
						return true;
					}
				}
			}
		}
		return false;
	}

	private static String getFieldName(ITypeBinding binding, String name) {
		if (binding != null) {
			ITypeBinding superclass = binding.getSuperclass();
			if (superclass != null) {
				StringBuffer buf = new StringBuffer();
				IVariableBinding[] declaredFields = superclass.getDeclaredFields();
				for (int i = 0; i < declaredFields.length; i++) {
					// String fieldName = getJ2SName(declaredFields[i]);
					if (name.equals(declaredFields[i].getName())) {
						buf.append("$");
					}
				}
				buf.append(getFieldName(superclass, name));
				return buf.toString();
			}
		}
		return name;
	}

	/**
	 * Check whether the given field name is already defined in super types or not.
	 * 
	 * The algorithm: 1. Check binding self class/interface fields 2. Check binding
	 * super class 3. Check binding interfaces
	 * 
	 * @param binding
	 * @param name
	 * @return
	 */
	private static boolean isInheritedFieldName(ITypeBinding binding, String name) {
		if ("serialVersionUID".equals(name)) {
			/*
			 * Just ignore this field: serialVersionUID. Currently Java2Script does not
			 * support Java serialization but support Java2Script's own Simple RPC
			 * serialization, which does not care about serialVersionID.
			 */
			return false;
		}
		if (binding == null) {
			return false;
		}
		ITypeBinding superclass = binding.getSuperclass();
		IVariableBinding[] declaredFields = null;
		if (superclass != null) {
			declaredFields = superclass.getDeclaredFields();
		} else { // Interface
			declaredFields = binding.getDeclaredFields();
		}
		for (int i = 0; i < declaredFields.length; i++) {
			// String fieldName = getJ2SName(declaredFields[i]);
			if (name.equals(declaredFields[i].getName())) {// fieldName) {) {
				return true;
			}
		}
		if (isInheritedFieldName(superclass, name)) {
			return true;
		}
		ITypeBinding[] interfaces = binding.getInterfaces();
		if (interfaces != null) {
			for (int i = 0; i < interfaces.length; i++) {
				if (isInheritedFieldName(interfaces[i], name)) {
					return true;
				}
			}
		}
		return false;
	}

	private static String getTypeStringName(Type type) {
		if (type == null) {
			return null;
		}
		if (type instanceof PrimitiveType || type instanceof WildcardType) {
			return null;
		} else if (type instanceof ArrayType) {
			ArrayType arrType = (ArrayType) type;
			return getTypeStringName(arrType.getElementType());
		} else if (type instanceof ParameterizedType) {
			ParameterizedType paramType = (ParameterizedType) type;
			return getTypeStringName(paramType.getType());
		} else if (type instanceof QualifiedType) {
			QualifiedType qualType = (QualifiedType) type;
			return getTypeStringName(qualType.getQualifier()) + "." + qualType.getName().getIdentifier();// .getFullyQualifiedName();
		} else if (type instanceof SimpleType) {
			SimpleType simpType = (SimpleType) type;
			ITypeBinding binding = simpType.resolveBinding();
			if (binding != null) {
				return binding.getQualifiedName();
			}
		}
		return null;
	}

	private static boolean isIntegerType(String type) {
		if ("int".equals(type) || "long".equals(type) || "byte".equals(type) || "short".equals(type)
				|| "char".equals(type)) {
			return true;
		}
		return false;
	}

	/**
	 * Generated final variable list for anonymous class creation.
	 * <ol>
	 * <li>Generate "null" if there are no referenced final variales inside
	 * anonymous class</li>
	 * <li>Generate "Clazz.cloneFinals (...)" if there are referenced final
	 * variable</li>
	 * </ol>
	 * 
	 * @param list
	 * @param seperator
	 * @param scope
	 * @return
	 */
	private static String listFinalVariables(List<?> list, String seperator, String scope) {
		if (list.size() == 0) {
			return "null";
		}
		StringBuffer buf = new StringBuffer();
		buf.append("Clazz.cloneFinals(");
		for (Iterator<?> iter = list.iterator(); iter.hasNext();) {
			J2SUtil.FinalVariable fv = (J2SUtil.FinalVariable) iter.next();
			String name = fv.variableName;
			if (fv.toVariableName != null) {
				name = fv.toVariableName;
			}
			buf.append("\"");
			buf.append(name);
			buf.append("\", ");
			String methodScope = fv.methodScope;
			if (methodScope == null && scope == null) {
				buf.append(name);
			} else if (methodScope == null || scope == null) {
				buf.append("this.$finals." + name);
			} else if (methodScope.equals(scope)) {
				buf.append(name);
			} else {
				buf.append("this.$finals." + name);
			}
			if (iter.hasNext()) {
				buf.append(seperator);
			}
		}
		buf.append(")");
		return buf.toString();
	}

	private static String shortenPackageName(String fullName) {
		String name = fullName.substring(0, fullName.lastIndexOf('.'));
		name = J2SUtil.removeBrackets(name);
		int index = name.indexOf("java.lang.");
		char ch = 0;
		if (index == 0
				&& (name.indexOf('.', index + 10) == -1 || ((ch = name.charAt(index + 10)) >= 'A' && ch <= 'Z'))) {
			if (!fullName.startsWith("java.lang.ref") && !fullName.startsWith("java.lang.annotation")
					&& !fullName.startsWith("java.lang.instrument") && !fullName.startsWith("java.lang.management")) {
				name = name.substring(10);
			}
		}
		return name;
	}
	
	/**
	 * Check whether the given QualifiedName is just simple or not.
	 * The "just simple" means only "*.*" format.
	 * 
	 * @param node
	 * @return
	 */
	private static boolean isSimpleQualified(QualifiedName node) {
		Name qualifier = node.getQualifier();
		if (qualifier instanceof SimpleName) {
			return true;
		} else if (qualifier instanceof QualifiedName) {
			return isSimpleQualified((QualifiedName) qualifier);
		}
		return false;
	}
	
	/**
	 * not static, has initializer, not a constant number, character, boolean, or string
	 * 
	 * @param node
	 * @return
	 */
	private static boolean fieldNeedsPreparation(FieldDeclaration node, boolean checkStatic) {
		if (checkStatic && (node.getModifiers() & Modifier.STATIC) != 0) {
			return false;
		}
		List<?> fragments = node.fragments();
		for (Iterator<?> iter = fragments.iterator(); iter.hasNext();) {
			VariableDeclarationFragment element = (VariableDeclarationFragment) iter.next();
			Expression initializer = element.getInitializer();
			if (initializer != null) {
				Object constValue = initializer.resolveConstantExpressionValue();
				if (constValue != null && (constValue instanceof Number || constValue instanceof Character
						|| constValue instanceof Boolean || constValue instanceof String)) {
					break;
				}
				if (initializer instanceof NullLiteral) {
					break;
				}
				return true;
			}
			break;
		}
		return false;
	}

	/**
	 * Check for a constant value and write it if that is what we have.
	 * 
	 * @param node
	 * @return true if this was a constant value
	 */
	private boolean writeConstantValue(Expression node) {
		String constValue = getConstantValue(node);
		if (constValue == null)
			return false;
		buffer.append(constValue);
		return true;
	}

	/**
	 * If given expression is constant value expression, return its value string; or
	 * return null.
	 * 
	 * @param node
	 * @return
	 */
	private static String getConstantValue(Expression node) {
		Object constValue = node.resolveConstantExpressionValue();
		if (constValue != null
				&& (constValue instanceof Number || constValue instanceof Character || constValue instanceof Boolean)) {
			StringBuffer buf = new StringBuffer();
			if (constValue instanceof Character) {
				buf.append('\'');
				buf.append(escapeChar(((Character) constValue).charValue()));
				buf.append('\'');
			} else {
				buf.append(constValue);
			}
			return buf.toString();
		}
		if (constValue != null && (constValue instanceof String)) {
			StringBuffer buf = new StringBuffer();
			String str = (String) constValue;
			int length = str.length();
			/*
			 * if (length > 20) { return null; }
			 */
			buf.append("\"");
			for (int i = 0; i < length; i++) {
				buf.append(escapeChar(str.charAt(i)));
			}
			buf.append("\"");
			return buf.toString();
		}
		return null;
	}

	private static String escapeChar(char charValue) {
		String out = "";
		switch (charValue) {
		case '\\':
		case '\'':
		case '\"':
			out = "\\" + charValue;
			break;
		case '\r':
			out = "\\r";
			break;
		case '\n':
			out = "\\n";
			break;
		case '\t':
			out = "\\t";
			break;
		case '\f':
			out = "\\f";
			break;
		default:
			if (charValue < 32 || charValue > 127) {
				String hexStr = "0000" + Integer.toHexString(charValue);
				out = "\\u" + hexStr.substring(hexStr.length() - 4);
			} else {
				out = "" + charValue;
			}
			break;
		}
		return out;
	}

	private static int escapedCharToInt(String s) {
		// pt to xxx of 'xxx'<eob>
		int len = s.length();
		if (len == 1)
			return s.charAt(0);
		// '\x';
		switch (s.charAt(1)) {
		case 'r':
			return '\r';
		case 'n':
			return '\n';
		case 't':
			return '\t';
		case 'f':
			return '\f';
		case '\\':
		case '\'':
		case '\"':
			return s.charAt(1);
		default:
			try {
				return (s.charAt(1) == 'u' ? Integer.parseInt(s.substring(2), 16) : Integer.parseInt(s.substring(1), 8));
			} catch (@SuppressWarnings("unused") Exception e) {
				return Integer.MIN_VALUE;
			}
		}
	}

	/**
	 * Shorten full qualified class names.
	 * 
	 * @param name
	 * @return
	 */
	private static String shortenQualifiedName(String name) {
		name = J2SUtil.removeBrackets(name);
		int index = name.indexOf("java.lang.");
		char ch = 0;
		if (index == 0 && (name.indexOf('.', 10) == -1 || ((ch = name.charAt(10)) >= 'A' && ch <= 'Z'))) {
			name = name.substring(10);
		}
		return name;
	}

	private static boolean ignore(BodyDeclaration node) {
		return (J2SUtil.getJ2STag(node, "@j2sIgnore") != null);
	}

	@SuppressWarnings("unused")
	private void bufferLog(String msg) {
		buffer.append("/*LV!" + msg.replace('*', ' ') + "*/");		
	}
	
}
