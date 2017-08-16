/*******************************************************************************
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/
package net.sf.j2s.core.astvisitors;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.jdt.core.dom.AnonymousClassDeclaration;
import org.eclipse.jdt.core.dom.ArrayType;
import org.eclipse.jdt.core.dom.BodyDeclaration;
import org.eclipse.jdt.core.dom.CastExpression;
import org.eclipse.jdt.core.dom.CharacterLiteral;
import org.eclipse.jdt.core.dom.ClassInstanceCreation;
import org.eclipse.jdt.core.dom.ConstructorInvocation;
import org.eclipse.jdt.core.dom.EnumConstantDeclaration;
import org.eclipse.jdt.core.dom.EnumDeclaration;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.FieldAccess;
import org.eclipse.jdt.core.dom.FieldDeclaration;
import org.eclipse.jdt.core.dom.IBinding;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IVariableBinding;
import org.eclipse.jdt.core.dom.InfixExpression;
import org.eclipse.jdt.core.dom.Initializer;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.Name;
import org.eclipse.jdt.core.dom.NullLiteral;
import org.eclipse.jdt.core.dom.ParenthesizedExpression;
import org.eclipse.jdt.core.dom.PostfixExpression;
import org.eclipse.jdt.core.dom.PrefixExpression;
import org.eclipse.jdt.core.dom.PrimitiveType;
import org.eclipse.jdt.core.dom.PrimitiveType.Code;
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.SimpleType;
import org.eclipse.jdt.core.dom.SingleVariableDeclaration;
import org.eclipse.jdt.core.dom.SuperConstructorInvocation;
import org.eclipse.jdt.core.dom.SuperFieldAccess;
import org.eclipse.jdt.core.dom.SuperMethodInvocation;
import org.eclipse.jdt.core.dom.ThisExpression;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.core.dom.TypeDeclaration;
import org.eclipse.jdt.core.dom.TypeDeclarationStatement;
import org.eclipse.jdt.core.dom.TypeLiteral;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;

// BH 8/16/2017 -- JSE8-UnionType catch (Exception... | Exception...) {...}
// BH 8/13/2017 -- includes native code calls in System.err
// BH 7/31/2017 -- extensively reworked for fully qualified method names and no SAEM

// DONE: type def, including inner classes and anonymous classes
// DONE: fully encapsulated C$ variable
// DONE: proper <init> processing
// DONE: non-final variables for anonymous class definition

// TODO: Q: Good assumption that generic parameterization can be ignored? put<K,V> vs put<K>? 

/**
 * 
 * @author zhou renjian
 * @author Bob Hanson
 *
 *         2006-12-3
 * 
 */
public class ASTScriptVisitor extends ASTJ2SDocVisitor {

	private void setInnerGLobals(ASTScriptVisitor parent, TypeDeclaration node) {
		// TODO: BH: Question as to whether these are all that are needed
		rootTypeNode = node;
		methodOverloadingSupported = parent.methodOverloadingSupported;
		interfaceCastingSupported = parent.interfaceCastingSupported;
		supportsObjectStaticFields = parent.supportsObjectStaticFields;
		setDebugging(parent.isDebugging());
		// BH abandoning all compiler variable name compressing -- Google Closure Compiler is way better
		//((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).setToCompileVariableName(
			//	((ASTVariableVisitor) parent.getAdaptable(ASTVariableVisitor.class)).isToCompileVariableName());
	}

	/**
	 * default constructor found by visit(MethodDeclaration)
	 */
	IMethodBinding defaultConstructor;

	/**
	 * holds all static field definitions for insertion at the end of the class def
	 */
	StringBuffer staticFieldDefBuffer = new StringBuffer();
	
	private static final String noConstructorNames = "Byte,Short,Integer,Long,Float,Double,Boolean";
	private static final String primitiveTypeEquivalents = "Boolean,Byte,Character,Short,Integer,Long,Float,Double,";
	
	private static final String getPrimitiveTYPE(String name) {
	  int pt = primitiveTypeEquivalents.indexOf(name.substring(1)) - 1;
	  String type = primitiveTypeEquivalents.substring(pt);
	  return type.substring(0, type.indexOf(",")) + ".TYPE";
	}
	
	protected boolean methodOverloadingSupported = true;

	protected boolean interfaceCastingSupported = false;

	protected AbstractTypeDeclaration rootTypeNode;

	public boolean isMethodOverloadingSupported() {
		return methodOverloadingSupported;
	}

	public void setSupportsMethodOverloading(boolean recognizeMethodOverloading) {
		methodOverloadingSupported = recognizeMethodOverloading;
	}

	public boolean isInterfaceCastingSupported() {
		return interfaceCastingSupported;
	}

	public void setSupportsInterfaceCasting(boolean recognizeInterfaceCasting) {
		interfaceCastingSupported = recognizeInterfaceCasting;
	}

	public boolean isMethodRegistered(String methodName) {
		return ((ASTMethodVisitor) getAdaptable(ASTMethodVisitor.class)).isMethodRegistered(methodName);
	}

	public String translate(String className, String methodName) {
		return ((ASTMethodVisitor) getAdaptable(ASTMethodVisitor.class)).translate(className, methodName);
	}

	public String getPackageName() {
		return ((ASTPackageVisitor) getAdaptable(ASTPackageVisitor.class)).getPackageName();
	}

	public String discardGenericType(String name) {
		return ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class)).discardGenericType(name);
	}

	protected String listFinalVariables(List<ASTFinalVariable> list, String seperator, String scope) {
		return ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).listFinalVariables(list, seperator, scope);
	}

	protected String getFullClassName() {
		return ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class)).getFullClassName();
	}

	public String getTypeStringName(Type type) {
		return ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class)).getTypeStringName(type);
	}

	protected String getFieldName(ITypeBinding binding, String name) {
		return ((ASTJ2SMapVisitor) getAdaptable(ASTJ2SMapVisitor.class)).getFieldName(binding, name);
	}

	protected String getJ2SName(SimpleName node) {
		return ((ASTJ2SMapVisitor) getAdaptable(ASTJ2SMapVisitor.class)).getJ2SName(node);
	}

	protected String getJ2SName(IVariableBinding binding) {
		return ((ASTJ2SMapVisitor) getAdaptable(ASTJ2SMapVisitor.class)).getJ2SName(binding);
	}

	protected boolean isInheritedFieldName(ITypeBinding binding, String name) {
		return ((ASTJ2SMapVisitor) getAdaptable(ASTJ2SMapVisitor.class)).isInheritedFieldName(binding, name);
	}

	protected boolean checkKeywordViolation(String name) {
		return ASTFieldVisitor.checkKeywordViolation(name);
	}

	protected boolean checkSameName(ITypeBinding binding, String name) {
		return ((ASTJ2SMapVisitor) getAdaptable(ASTJ2SMapVisitor.class)).checkSameName(binding, name);
	}

	public boolean isIntegerType(String type) {
		return ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class)).isIntegerType(type);
	}

	public String getClassName() {
		return ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class)).getClassName();
	}

	protected String getVariableName(String name) {
		return ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).getVariableName(name);
	}

	// protected boolean canAutoOverride(MethodDeclaration node) {
	// return ((ASTMethodVisitor)
	// getAdaptable(ASTMethodVisitor.class)).canAutoOverride(node);
	// }

	public boolean visit(AnonymousClassDeclaration node) {

		ITypeBinding binding = node.resolveBinding();
		ASTTypeVisitor typeVisitor = ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class));
		String anonClassName = getNameForBinding(binding);
		String fullClassName = anonClassName;
		String shortClassName = anonClassName.substring(anonClassName.lastIndexOf('.') + 1);
		String className = typeVisitor.getClassName();
		// BH: add the anonymous class definition inline, not as a static,
		// and not requiring finalization of variables
		buffer.append("(");
		addAnonymousFunctionWrapper(true);
		buffer.append("var C$ = Clazz.decorateAsClass (function () {\r\n");
		buffer.append("Clazz.newInstance$ (this, arguments");
		if (!(node.getParent() instanceof EnumConstantDeclaration))
			buffer.append("[0], true");
		buffer.append(");\r\n}, ");

		int idx = fullClassName.lastIndexOf('.');
		if (idx >= 0) {
			buffer.append(assureQualifiedName(shortenPackageName(fullClassName)));
			buffer.append(", \"" + fullClassName.substring(idx + 1) + "\"");
		} else {
			buffer.append("null, \"" + fullClassName + "\"");
		}

		ITypeBinding superclass = binding.getSuperclass();
		if (superclass != null) {
			String superclassName = superclass.getQualifiedName();
			superclassName = assureQualifiedName(removeJavaLang(superclassName));
			if (superclassName != null && superclassName.length() != 0 && !"Object".equals(superclassName)) {
				buffer.append(", ");
				buffer.append(superclassName);
			} else {
				ITypeBinding[] declaredTypes = binding.getInterfaces();
				if (declaredTypes != null && declaredTypes.length > 0) {
					superclassName = declaredTypes[0].getQualifiedName();
					if (superclassName != null && superclassName.length() > 0) {
						superclassName = assureQualifiedName(removeJavaLang(superclassName));
						buffer.append(", null, ");
						buffer.append(superclassName);
					}
				}
			}
		}
		buffer.append(");\r\n");

		String oldClassName = className;
		typeVisitor.setClassName(shortClassName);
		StringBuffer oldStaticDefBuffer = staticFieldDefBuffer;
		staticFieldDefBuffer = new StringBuffer();
		List<?> bodyDeclarations = node.bodyDeclarations();

		addInitMethod(bodyDeclarations);

		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof MethodDeclaration) {
				element.accept(this);
			}
		}

		// addDefaultConstructor();

		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			BodyDeclaration element = (BodyDeclaration) iter.next();
			if (element instanceof FieldDeclaration && isStatic(element.getModifiers()))
				addStaticFieldFragments((FieldDeclaration) element);
		}

		typeVisitor.setClassName(oldClassName);
		buffer.append(staticFieldDefBuffer);

		staticFieldDefBuffer = oldStaticDefBuffer;

		addAnonymousFunctionWrapper(false);
		buffer.append(")");

		return false;
	}

	private void addStaticFieldFragments(FieldDeclaration field) {
		List<?> fragments = field.fragments();
		for (int j = 0; j < fragments.size(); j++) {
			buffer.append("C$");
			buffer.append(".");
			VariableDeclarationFragment vdf = (VariableDeclarationFragment) fragments.get(j);
			vdf.getName().accept(this);
			buffer.append(" = ");
			Expression initializer = vdf.getInitializer();
			if (initializer == null) {
				appendDefaultValue(field.getType());
			} else {
				initializer.accept(this);
			}
			buffer.append(";\r\n");
		}
	}

	/**
	 * Generate the static $init$ method, which is called from constructors
	 * just after any superclass constructor call.
	 * @param bodyDeclarations
	 */
	private void addInitMethod(List<?> bodyDeclarations) {
		buffer.append("\r\nClazz.newMethod$(C$, '$init$', function () {\r\n");
		// we include all field definitions here and all nonstatic initializers
		// Q: Why don't we have to check for static fields?
		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			BodyDeclaration element = (BodyDeclaration) iter.next();
			if ((element instanceof FieldDeclaration || (element instanceof Initializer) && !isStatic(element.getModifiers()))
					&& !checkj2sIgnore(element))
				element.accept(this);
		}
		buffer.append("}, 1);\r\n");
	}

	public boolean visit(CastExpression node) {
		//TODO: some casting should have its meaning! int to byte, int to short, long to int will lose values
		Expression expression = node.getExpression();
		ITypeBinding typeBinding = expression.resolveTypeBinding();
		Type typeTO = node.getType();
		if (typeTO.isPrimitiveType() && typeBinding != null) {
			String nameFROM = typeBinding.getName();
			Code codeTO = ((PrimitiveType) typeTO).getPrimitiveTypeCode();
			if (codeTO == PrimitiveType.INT 
					|| codeTO == PrimitiveType.BYTE 
					|| codeTO == PrimitiveType.SHORT
					|| codeTO == PrimitiveType.LONG) {
				switch (nameFROM) {
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
					buffer.append(").charCodeAt (0)");
					return false;
				case "float":
				case "double":
					buffer.append("Clazz.");
					buffer.append(nameFROM);
					buffer.append("To");
					String targetType = codeTO.toString();
					buffer.append(targetType.substring(0, 1).toUpperCase());
					buffer.append(targetType.substring(1));
					buffer.append(" (");
					if (expression instanceof ParenthesizedExpression) {
						ParenthesizedExpression pe = (ParenthesizedExpression) expression;
						pe.getExpression().accept(this);
					} else {
						expression.accept(this);
					}
					buffer.append(")");
					return false;
				}
			} else if (codeTO == PrimitiveType.CHAR) {
				switch (nameFROM) {
				case "char":
				default:
					break;
				case "float":
				case "double":
					buffer.append("Clazz.");
					buffer.append(nameFROM);
					buffer.append("ToChar (");
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
					buffer.append("String.fromCharCode (");
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
		ITypeBinding binding = node.resolveTypeBinding();
		if (anonDeclare == null) {
			if (binding != null) {
				if (!binding.isTopLevel()) {
					if (!isStatic(binding.getModifiers())) {
						// inner nonstatic class
						IMethodBinding constructorBinding = node.resolveConstructorBinding();
						String name = assureQualifiedName(removeJavaLang(binding.isAnonymous() || binding.isLocal()
								? binding.getBinaryName() : binding.getQualifiedName()));
						String finals = null; // No final variables for
												// non-anonymous class
						IMethodBinding methodDeclaration = (constructorBinding == null ? null
								: constructorBinding.getMethodDeclaration());
						addInnerTypeInstance(node, name, node.getExpression(), finals, methodDeclaration, false, null);
						return false;
					}
				}
			}
			String prefix = null, postfix = null;
			IMethodBinding methodDeclaration = null;
			IMethodBinding constructorBinding = node.resolveConstructorBinding();
			String fqName = removeJavaLang(getTypeStringName(node.getType()));
			if (constructorBinding != null) {
				methodDeclaration = constructorBinding.getMethodDeclaration();
			}
			if ("String".equals(fqName)) {
				// special treatment for String -- see j2sSwingJS.js
				buffer.append(" String.instantialize(");
			} else if ("Object".equals(fqName)) {
				// For discussion, please visit
				// http://groups.google.com/group/java2script/browse_thread/thread/3d6deb9c3c0a0cda
				buffer.append(" new Clazz._O("); // BH removing
													// window.JavaObject
			} else if (noConstructorNames.indexOf(fqName) >= 0) {
				// look out for java.lang.Integer and the like -- just pass it directly
				// Replace new Boolean with Boolean.from because new Boolean("false") returns true in JavaScript.
				// JavaScript considers any string to be true while java only considers the string "true" to be true
				if (fqName.equals("Boolean"))
					buffer.append(" Boolean.from(");
				else
					buffer.append(" new ").append(fqName).append("(");
			} else {
				buffer.append("Clazz.$new(")
				.append(assureQualifiedName(fqName))
				.append(".construct")
				.append(getJ2SParamQualifier(null, constructorBinding));
				prefix = ",[";
				postfix = "]";
			}
			visitMethodParameterList(node.arguments(), methodDeclaration, true, prefix, postfix);
			buffer.append(")");
		} else {
			// anonymous
			String name = getNameForBinding(binding);
			String anonClassName = (hasSuperClass(binding) ? name + ".superClazz" : null);
			buffer.append("(");
			ASTVariableVisitor variableVisitor = ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class));
			variableVisitor.isFinalSensible = true;
			int lastCurrentBlock = currentBlockForVisit;
			List<ASTFinalVariable> finalVars = variableVisitor.finalVars;
			List<ASTFinalVariable> visitedVars = variableVisitor.visitedVars;
			List<ASTFinalVariable> normalVars = variableVisitor.normalVars;
			List<ASTFinalVariable> lastVisitedVars = visitedVars;
			List<ASTFinalVariable> lastNormalVars = normalVars;
			currentBlockForVisit = blockLevel;
			visitedVars = variableVisitor.visitedVars = new ArrayList<ASTFinalVariable>();
			variableVisitor.normalVars = new ArrayList<ASTFinalVariable>();
			methodDeclareNameStack.push(binding.getKey());
			anonDeclare.accept(this);
			methodDeclareNameStack.pop();
			buffer.append(", ");

			variableVisitor.normalVars = lastNormalVars;
			String finals = listFinalVariables(visitedVars, ", ",
					methodDeclareNameStack.size() == 0 ? null : (String) methodDeclareNameStack.peek());
			IMethodBinding constructorBinding = node.resolveConstructorBinding();
			IMethodBinding methodDeclaration = (constructorBinding == null ? null
					: constructorBinding.getMethodDeclaration());
			addInnerTypeInstance(node, name, null, finals, (anonClassName == null ? null : methodDeclaration), false, anonClassName);

			if (lastCurrentBlock != -1) {
				/* add the visited variables into last visited variables */
				for (int j = 0; j < visitedVars.size(); j++) {
					ASTFinalVariable fv = visitedVars.get(j);
					int size = finalVars.size();
					for (int i = 0; i < size; i++) {
						ASTFinalVariable vv = finalVars.get(size - i - 1);
						if (vv.variableName.equals(fv.variableName) && vv.blockLevel <= lastCurrentBlock
								&& !lastVisitedVars.contains(vv)) {
							lastVisitedVars.add(vv);
						}
					}
				}
			}
			variableVisitor.visitedVars = lastVisitedVars;
			currentBlockForVisit = lastCurrentBlock;
			buffer.append(")"); // end of line (..., ...)
		}
		return false;
	}

	private String getNameForBinding(ITypeBinding binding) {
		if (binding.isAnonymous() || binding.isLocal()) {
			String binaryName = binding.getBinaryName();
			if (binaryName == null) {
				String bindingKey = binding.getKey();
				if (bindingKey != null) {
					binaryName = bindingKey = bindingKey.substring(1, bindingKey.length() - 1).replace('/', '.');
				}
			}
			return assureQualifiedName(removeJavaLang(binaryName));
		}
		return assureQualifiedName(removeJavaLang(binding.getQualifiedName()));
	}

	private void addInnerTypeInstance(ClassInstanceCreation node, String className, Expression outerClassExpr, String finals,
			IMethodBinding methodDeclaration, boolean inheritArgs, String anonName) {
		
		String constructor = (anonName == null ? className : anonName) + (inheritArgs || methodDeclaration == null ? ".$init$" 
				: ".construct" + getJ2SParamQualifier(null, methodDeclaration));
		buffer.append("Clazz.$new(").append(constructor).append(", [");
		if (outerClassExpr == null)
			buffer.append("this");
		else
			outerClassExpr.accept(this);
		buffer.append(", ").append(finals == null ? "null" : finals);
		if (inheritArgs) {
			buffer.append(", Clazz.inheritArgs");
		} else if (methodDeclaration != null) {
			List<?> args = node.arguments();
			visitMethodParameterList(args, methodDeclaration, true, args.size() > 0 || methodDeclaration.isVarargs() ? ", " : null, null);
		}
		buffer.append("]");
		// an anonymous class will be calling a constructor in another class, so we need to indicate
		// its actual call explicitly
		if (anonName != null)
			buffer.append(",").append(className);
		buffer.append(")");
	}

	protected boolean visitMethodParameterList(List<?> arguments, IMethodBinding methodDeclaration,
			boolean isConstructor, String prefix, String suffix) {

		if (methodDeclaration == null) {
			return false;
		}
		if (isConstructor && arguments.size() == 0) {
			// always add a [] constuctor, as null will indicate
			// that we did not use Clazz.$new and instead called new foo() directly
			// we have an apparent default empty constructor such as
			// public MyClass() {....}
			if (prefix != null) {
				buffer.append(prefix);
				if (methodDeclaration.isVarargs())
					buffer.append("[]");
			}
			if (suffix != null) {
				buffer.append(suffix);
			}
			return true;
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
					Expression element = (Expression) arguments.get(j);
					visitArgumentItem(element, clazzName, methodName, parameterTypeName, i);
					if (j != argSize - 1) {
						buffer.append(", ");
					}
				}
				buffer.append("]");
			} else {
				Expression element = (Expression) arguments.get(i);
				visitArgumentItem(element, clazzName, methodName, parameterTypeName, i);
				if (i != parameterTypes.length - 1) {
					buffer.append(", ");
				}
			}
		}

		if (alreadyPrefixed && suffix != null) {
			buffer.append(suffix);
		}
		return true;
	}

	/**
	 * 
	 * @param exp
	 * @param clazzName
	 * @param methodName
	 *            can be null
	 * @param parameterTypeName
	 * @param position
	 */
	private void visitArgumentItem(Expression exp, String clazzName, String methodName, String parameterTypeName,
			int position) {
		if (exp instanceof CastExpression && ((CastExpression) exp).getExpression() instanceof NullLiteral) {
			buffer.append("null");
			return;
		}
		ITypeBinding expTypeBinding = exp.resolveTypeBinding();
		String expTypeName = (expTypeBinding == null ? null : expTypeBinding.getName());
		if (expTypeBinding == null)
			System.err.println("typeBinding was null in " + clazzName + "." + methodName + " " + parameterTypeName);
		// BH: Question: When does typeBinding == null?
		// only continue if we are converting a character to a non-character type
		// Keep String#indexOf(int) and String#lastIndexOf(int)'s first char argument
		boolean useCharCodeAt = (
				"char".equals(expTypeName)
				&& !"char".equals(parameterTypeName)
				&& !parameterTypeName.startsWith("Object") // BH could be Object or Object[]
				&& (position != 0 || !"indexOf".equals(methodName) && !"lastIndexOf".equals(methodName)
						|| !"java.lang.String".equals(Bindings.removeBrackets(clazzName))));
		if (useCharCodeAt && exp instanceof CharacterLiteral) {
			// BH: converting character literal such as 'A' to number 65
			CharacterLiteral cl = (CharacterLiteral) exp;
			buffer.append(0 + cl.charValue());
			return;
		}
		int idx1 = buffer.length();
		boxingNode(exp);
		if (!useCharCodeAt)
			return;
		int length = buffer.length();
		if (exp instanceof MethodInvocation) {
			MethodInvocation m = (MethodInvocation) exp;
			if ("charAt".equals(m.getName().toString())) {
				int idx2 = buffer.indexOf(".charAt ", idx1);
				if (idx2 >= 0) {
					StringBuffer buf = new StringBuffer();
					buf.append(buffer.substring(idx1, idx2));
					buf.append(".charCodeAt ");
					buf.append(buffer.substring(idx2 + 8, length));
					buffer.delete(idx1, length);
					buffer.append(buf.toString());
					return;
				}
			}
		}
		buffer.append(".charCodeAt (0)");
	}

	public boolean visit(ConstructorInvocation node) {
		addThisConstructorCall(node.resolveConstructorBinding(), node.arguments());
		return false;
	}

	private void addThisConstructorCall(IMethodBinding constructorBinding, List<?> arguments) {
		String qualifiedParams = getJ2SParamQualifier(null, constructorBinding);
		buffer.append("C$.construct").append(qualifiedParams).append(".apply(this");
		IMethodBinding methodDeclaration = (constructorBinding == null ? null
				: constructorBinding.getMethodDeclaration());
		visitMethodParameterList(arguments, methodDeclaration, true, ", [", "]");
		buffer.append(");\r\n");
	}

	public boolean visit(EnumDeclaration node) {
		ITypeBinding binding = node.resolveBinding();
		ASTTypeVisitor typeVisitor = ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class));
		if (binding != null && binding.isTopLevel()) {
			typeVisitor.setClassName(binding.getName());
		}
		ASTNode parent = node.getParent();
		boolean haveParentClass = (parent != null && parent instanceof AbstractTypeDeclaration);
		boolean isInnerStaticClass = (node != rootTypeNode && haveParentClass);
		if (isInnerStaticClass) {
			ASTScriptVisitor visitor = null;
			try {
				visitor = this.getClass().newInstance();
			} catch (@SuppressWarnings("unused") Exception e) {
				visitor = new ASTScriptVisitor(); // Default visitor
			}
			visitor.rootTypeNode = node;
			((ASTTypeVisitor) visitor.getAdaptable(ASTTypeVisitor.class))
					.setClassName(((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class)).getClassName());
			((ASTPackageVisitor) visitor.getAdaptable(ASTPackageVisitor.class))
					.setPackageName(((ASTPackageVisitor) getAdaptable(ASTPackageVisitor.class)).getPackageName());

			node.accept(visitor);
			String str = visitor.getBuffer().toString();
			staticFieldDefBuffer.append(str);
			return false;
		}

		addAnonymousFunctionWrapper(true);
		buffer.append("var C$ = Clazz.decorateAsClass (function () {\r\n");
		return false;
	}

	public void endVisit(EnumDeclaration node) {
		ASTNode parent = node.getParent();
		boolean haveParentClass = (parent != null && parent instanceof AbstractTypeDeclaration);
		boolean isInnerStaticClass = (node != rootTypeNode && haveParentClass);
		if (isInnerStaticClass)
			return;
		buffer.append("Clazz.newInstance$ (this, arguments);\r\n}, ");

		String packageName = ((ASTPackageVisitor) getAdaptable(ASTPackageVisitor.class)).getPackageName();
		String className = ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class)).getClassName();
		String fullClassName = null;
		if (packageName != null && packageName.length() != 0) {
			fullClassName = packageName + '.' + className;
		} else {
			fullClassName = className;
		}
		String name;
		if (haveParentClass) {
			buffer.append(assureQualifiedName(fullClassName));
			name = node.getName().getIdentifier();
		} else {
			int pt = fullClassName.lastIndexOf('.');
			buffer.append(pt < 0 ? "null" : assureQualifiedName(shortenPackageName(fullClassName)));
			name = fullClassName.substring(pt + 1);
		}
		buffer.append(", \"" + name + "\"");
		buffer.append(", Enum");

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
				clazzName = assureQualifiedName(removeJavaLang(clazzName));
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

		buffer.append(staticFieldDefBuffer);

		List<?> bodyDeclarations = node.bodyDeclarations();

		for (Iterator<?> it = bodyDeclarations.listIterator(); it.hasNext();) {
			BodyDeclaration decl = (BodyDeclaration) it.next();
			if (decl instanceof MethodDeclaration)
				decl.accept(this);
		}

		addDefaultConstructor();

		addInitMethod(bodyDeclarations);

		// add statics

		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			BodyDeclaration element = (BodyDeclaration) iter.next();
			if (!isStatic(element.getModifiers()))
				continue;
			if (element instanceof Initializer)
				element.accept(this);
			else if (element instanceof FieldDeclaration)
				addStaticFieldFragments((FieldDeclaration) element);
		}

		buffer.append("var vals = [];\r\n");
		List<?> constants = node.enumConstants();
		for (int i = 0; i < constants.size(); i++) {
			EnumConstantDeclaration enumConst = (EnumConstantDeclaration) constants.get(i);
			IMethodBinding binding = enumConst.resolveConstructorBinding();
			AnonymousClassDeclaration anonDeclare = enumConst.getAnonymousClassDeclaration();
			String anonName = null;
			if (anonDeclare != null) {
				// BH: add the anonymous class definition inline!
				anonDeclare.accept(this);
				anonName = getNameForBinding(anonDeclare.resolveBinding());
				buffer.append("\r\n");
			}
			buffer.append("vals.push(Clazz.$newEnumConst(C$.construct").append(getJ2SParamQualifier(null, binding))
					.append(", \"");
			enumConst.getName().accept(this);
			buffer.append("\", " + i);
			visitMethodParameterList(enumConst.arguments(), binding, true, ", [", "]");
			buffer.append(", ").append(anonName).append("));\r\n");
		}
		buffer.append("Clazz.newMethod$(C$, 'values', function() { return vals }, 1);\r\n");
		// this next just ensures we have the valueOf() method in Enum if it is
		// not already there.
		buffer.append("Clazz.newMethod$(Enum, 'valueOf$Class$S', function(cl, name) { return cl[name] }, 1);\r\n");
		addAnonymousFunctionWrapper(false);
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

	public void endVisit(EnumConstantDeclaration node) {
		super.endVisit(node);
	}
	
	public boolean visit(FieldAccess node) {
		// Expression . Identifier
		// TODO: more complicated rules should be considered. read the JavaDoc
		IVariableBinding varBinding = node.resolveFieldBinding();
		ITypeBinding declaring;
		String qdName;
		Expression expression = node.getExpression();
		if (!supportsObjectStaticFields && varBinding != null && isStatic(varBinding.getModifiers())
				&& (declaring = varBinding.getDeclaringClass()) != null
				&& !(expression instanceof SimpleName || expression instanceof QualifiedName)
				&& !(qdName = declaring.getQualifiedName()).startsWith("org.eclipse.swt.internal.xhtml.")
				&& !qdName.startsWith("net.sf.j2s.html.")) {
			buffer.append('(');
			expression.accept(this);
			buffer.append(", ");
			buffer.append(assureQualifiedName(removeJavaLang(varBinding.getDeclaringClass().getQualifiedName())));
			buffer.append(')');
		} else {
			expression.accept(this);
		}
		buffer.append(".");
		node.getName().accept(this);
		return false;
	}

	public boolean visit(FieldDeclaration node) {
		if (isStatic(node.getModifiers()))
			return false;
		ITypeBinding typeBinding = resolveParentBinding(getXparent(node));
		List<?> fragments = node.fragments();
		for (Iterator<?> iter = fragments.iterator(); iter.hasNext();) {
			VariableDeclarationFragment element = (VariableDeclarationFragment) iter.next();
			String fieldName = getJ2SName(element.getName());
			// String fieldName = element.getName().getIdentifier();
			String ext = "";
			if (checkKeywordViolation(fieldName)) {
				ext += "$";
			}
			if (typeBinding != null && checkSameName(typeBinding, fieldName)) {
				ext += "$";
			}
			buffer.append("this.");
			if (isInheritedFieldName(typeBinding, fieldName)) {
				fieldName = getFieldName(typeBinding, fieldName);
				buffer.append(ext + fieldName);
			} else {
				buffer.append(ext + fieldName);
			}
			buffer.append(" = ");
			if (element.getInitializer() == null) {
				boolean isArray = false;
				List<?> frags = node.fragments();
				if (frags.size() > 0) {
					VariableDeclarationFragment varFrag = (VariableDeclarationFragment) frags.get(0);
					IVariableBinding resolveBinding = varFrag.resolveBinding();
					if (resolveBinding != null) {
						isArray = resolveBinding.getType().isArray();
						if (isArray)
							buffer.append("null");
					}
				}
				if (!isArray)
					appendDefaultValue(node.getType());
			} else {
				element.getInitializer().accept(this);
			}
			buffer.append(";\r\n");
		}
		return false;
	}

	private ASTNode getXparent(ASTNode node) {
		ASTNode xparent = node.getParent();
		while (xparent != null && !(xparent instanceof AbstractTypeDeclaration)
				&& !(xparent instanceof AnonymousClassDeclaration)) {
			xparent = xparent.getParent();
		}
		return xparent;
	}

	private ITypeBinding resolveParentBinding(ASTNode xparent) {
		return (xparent instanceof AbstractTypeDeclaration ? ((AbstractTypeDeclaration) xparent).resolveBinding()
				: xparent instanceof AnonymousClassDeclaration ? ((AnonymousClassDeclaration) xparent).resolveBinding()
						: null);
	}

	private boolean checkSimpleBooleanOperator(String op) {
		return (op.equals("^") || op.equals("|") || op.equals("&"));
	}

	private boolean checkInfixOperator(InfixExpression node) {
		if (checkSimpleBooleanOperator(node.getOperator().toString())) {
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

	private void charVisit(ASTNode node, boolean beCare) {
		if (!beCare || !(node instanceof Expression)) {
			boxingNode(node);
			return;
		}
		Expression exp = (Expression) node;
		ITypeBinding binding = exp.resolveTypeBinding();
		if (binding.isPrimitive() && "char".equals(binding.getName())) {
			if (node instanceof CharacterLiteral) {
				CharacterLiteral cl = (CharacterLiteral) node;
				buffer.append(0 + cl.charValue());
			} else if (node instanceof SimpleName || node instanceof QualifiedName) {
				boxingNode(node);
				buffer.append(".charCodeAt (0)");
			} else {
				int idx1 = buffer.length();
				if (node instanceof PrefixExpression || node instanceof PostfixExpression
						|| node instanceof ParenthesizedExpression) {
					boxingNode(node);
				} else {
					buffer.append("(");
					boxingNode(node);
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
					buffer.append(".charCodeAt (0)");
				}
			}
		} else {
			boxingNode(node);
		}
	}

	public boolean visit(InfixExpression node) {
		String constValue = checkConstantValue(node);
		if (constValue != null) {
			buffer.append(constValue);
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

		if (/*
			 * (left instanceof SimpleName || left instanceof CharacterLiteral)
			 * && (right instanceof SimpleName || right instanceof
			 * CharacterLiteral) &&
			 */(">".equals(operator) || "<".equals(operator) || ">=".equals(operator) || "<=".equals(operator)
				|| "==".equals(operator) || "!=".equals(operator))) {
			ITypeBinding rightBinding = right.resolveTypeBinding();
			if (typeBinding.isPrimitive() && "char".equals(typeBinding.getName()) && rightBinding.isPrimitive()
					&& "char".equals(rightBinding.getName())) {
				boxingNode(left);
				buffer.append(' ');
				buffer.append(operator);
				buffer.append(' ');
				boxingNode(right);
				return false;
			}
		}
		if ("/".equals(operator)) {
			if (typeBinding != null && typeBinding.isPrimitive()) {
				if (isIntegerType(typeBinding.getName())) {
					ITypeBinding rightTypeBinding = right.resolveTypeBinding();
					if (isIntegerType(rightTypeBinding.getName())) {
						StringBuffer oldBuffer = buffer;
						buffer = new StringBuffer();
						buffer.append("Clazz.doubleToInt (");
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
										buffer.insert(0, "Clazz.doubleToInt (");
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

						oldBuffer.append(buffer);
						buffer = oldBuffer;
						oldBuffer = null;

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
			 * && !(node.getLeftOperand() instanceof StringLiteral) // "abc" ==
			 * ... && !(node.getRightOperand() instanceof StringLiteral)
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
			buffer.append(").valueOf ()");
		}
		return false;
	}

	public boolean visit(Initializer node) {
		if (checkj2sIgnore(node)) {
			return false;
		}
		// visitList(node.getBody().statements(), "\r\n");
		node.getBody().accept(this);
		buffer.append("\r\n");
		return false;
	}

	protected String[] getFilterMethods() {
		return new String[0];
	}

	public boolean visit(MethodDeclaration node) {

		if (checkj2sIgnore(node)) {
			return false;
		}

		IMethodBinding mBinding = node.resolveBinding();

		boolean isConstructor = node.isConstructor();
		if (isConstructor) {
			// TODO: This is not sufficient for variable args. We are not finding the correct constructor, only the first-stated
			//       For example, this(int...) and this(float...) will be wrong here. 
			//       fortunately this only affects anonymous class definitions - BH
			if (mBinding.getParameterTypes().length == 0 || mBinding.isVarargs()
					&& (defaultConstructor == null))  {
				defaultConstructor = mBinding;
			}
		}
		boolean isStatic = isStatic(node.getModifiers());

		if (!checkKeepSpecialClassMethod(node, mBinding, false))
			return false;
		String key = (mBinding == null ? null : mBinding.getKey());
		if (key != null)
			methodDeclareNameStack.push(key);

		boolean isNative = ((node.getModifiers() & Modifier.NATIVE) != 0);
		if (node.getBody() == null && !isNative) {
		  //Abstract method
		  return false;
		}
		String name = (isConstructor ? "construct" : getJ2SName(node.getName())) + getJ2SParamQualifier(null, mBinding);
		buffer.append("\r\nClazz.newMethod$(C$, '").append(name).append("', ").append("function (");
		@SuppressWarnings("unchecked")
		List<ASTNode> parameters = node.parameters();
		visitList(parameters, ", ");
		buffer.append(") ");
		if (node.isConstructor()) {
			boolean isSuperOrThis = false;
			@SuppressWarnings("unchecked")
			List<ASTNode> statements = node.getBody().statements();
			if (statements.size() > 0) {
				ASTNode firstStatement = statements.get(0);
				if (firstStatement instanceof SuperConstructorInvocation
						|| firstStatement instanceof ConstructorInvocation) {
					isSuperOrThis = true;
				}
			}
			// BH @j2sIgnoreSuperConstructor removed from options
			// as it is too risky to do this -- lose all initialization.
			IMethodBinding binding = node.resolveBinding();
		    boolean existedSuperClass = binding != null && hasSuperClass(binding.getDeclaringClass());
			if (isSuperOrThis) {
				if (!checkJ2STags(node, true))
					node.getBody().accept(this);
			} else {
				buffer.append("{\r\n");
				if (existedSuperClass) {
					addSuperConstructor(null, null);
				} else {
					addCallInit();
				}
				if (checkJ2STags(node, false)) {
					buffer.append("}");
				} else {
					blockLevel++;
					visitList(statements, "");
					endVisit(node.getBody());
				}
			}
		} else if (node.getBody() == null) {
			// not a constructor
			blockLevel++;
			if (!checkJ2STags(node, true)) {
				buffer.append("{\r\n");
				if (isNative) {
					buffer.append("// native_code\r\n");
					System.err.println("native: " + key);
				}
				visitNativeJavadoc(node.getJavadoc(), null, false);
				buffer.append("}");
			}
			List<ASTFinalVariable> normalVars = ((ASTVariableVisitor) getAdaptable(
					ASTVariableVisitor.class)).normalVars;
			for (int i = normalVars.size() - 1; i >= 0; i--) {
				ASTFinalVariable var = normalVars.get(i);
				if (var.blockLevel >= blockLevel) {
					normalVars.remove(i);
				}
			}
			blockLevel--;
		} else if (!checkJ2STags(node, true)) {
			node.getBody().accept(this);
		}
		if (isStatic || isConstructor)
			buffer.append(", ").append(isNative ? 2 : 1);
		buffer.append(");\r\n");
		return false;
	}

	private boolean hasSuperClass(ITypeBinding declaringClass) {
		ITypeBinding superclass = declaringClass.getSuperclass();
		String qualifiedName = (superclass == null ? null : discardGenericType(superclass.getQualifiedName()));
		return superclass != null && !"java.lang.Object".equals(qualifiedName)
				&& !"java.lang.Enum".equals(qualifiedName);
	}

	public void endVisit(MethodDeclaration node) {
		if (checkj2sIgnore(node)) {
			return;
		}

		IMethodBinding mBinding = node.resolveBinding();
		
		if (!checkKeepSpecialClassMethod(node, mBinding, false)) {
			return;
		}

		if (mBinding != null) {
			methodDeclareNameStack.pop();
		}
		super.endVisit(node);
	}

//	@SuppressWarnings("null")
//	private boolean isConstructorVarargs(IMethodBinding binding, boolean startSuper) {
//		if (binding == null) {
//			return false;
//		}
//		ITypeBinding thisClass = binding.getDeclaringClass();
//		IPackageBinding declaringPackage = thisClass.getPackage();
//		if (startSuper) {
//			thisClass = thisClass.getSuperclass();
//		}
//		if (thisClass == null) {
//			return false;
//		}
//		do {
//			IMethodBinding[] declaredMethods = thisClass.getDeclaredMethods();
//			if (declaredMethods == null) {
//				return false;
//			}
//			boolean constructorVarargs = false;
//			boolean containsNonDefaultConstructor = false;
//			for (int i = 0; i < declaredMethods.length; i++) {
//				IMethodBinding m = declaredMethods[i];
//				if (!m.isConstructor() || m.isDefaultConstructor()) {
//					continue;
//				}
//				containsNonDefaultConstructor = true;
//				int modifiers = m.getModifiers();
//				if ((modifiers & Modifier.PRIVATE) != 0) {
//					continue;
//				}
//				if (modifiers == Modifier.NONE) {
//					IPackageBinding thisPackage = thisClass.getPackage();
//					if ((declaringPackage == null) != (thisPackage == null)
//							|| declaringPackage != null && !declaringPackage.getName().equals(thisPackage.getName())) {
//						continue;
//					}
//				}
//				ITypeBinding[] parameterTypes = m.getParameterTypes();
//				if (parameterTypes == null || parameterTypes.length == 0) {
//					constructorVarargs = false;
//					break;
//				} else if (parameterTypes.length == 1 && m.isVarargs()) {
//					constructorVarargs = true;
//				}
//			}
//			if (containsNonDefaultConstructor) {
//				return constructorVarargs;
//			}
//		} while ((thisClass = thisClass.getSuperclass()) != null);
//		return false;
//	}

	/*
	 * Check to see whether there are @j2s* and append sources to buffer
	 */
	private boolean checkJ2STags(MethodDeclaration node, boolean needScope) {
		String prefix = "{\r\n";
		String suffix = "\r\n}";
		if (!needScope) {
			prefix = "";
			suffix = "";
		}
		boolean read = false;
		if (isDebugging()) {
			read = readSources(node, "@j2sDebug", prefix, suffix, false);
		}
		if (!read) {
			boolean toCompileVariableName = ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class))
					.isToCompileVariableName();
			if (!toCompileVariableName) {
				read = readSources(node, "@j2sNativeSrc", prefix, suffix, false);
			}
		}
		if (!read) {
			read = readSources(node, "@j2sNative", prefix, suffix, false);
		}
		if (!read) {
			read = readStringSources(node, "@j2sXHTML", prefix, suffix);
		}
		if (!read) {
			read = readStringSources(node, "@j2sXCSS", prefix, suffix);
		}
		return read;
	}

	public boolean visit(MethodInvocation node) {
		IMethodBinding mBinding = node.resolveMethodBinding();
		boolean isPrivateAndNotStatic = ((mBinding.getModifiers() & Modifier.PRIVATE) != 0)
				&& !isStatic(mBinding.getModifiers());

		Expression expression = node.getExpression();
		int pt = buffer.length();
		if (expression == null) {
			// "this"
		} else {
			isPrivateAndNotStatic = false;
			expression.accept(this);
			buffer.append(".");
		}

		String sbParams = getJ2SParamQualifier(buffer.substring(pt, buffer.length()), mBinding);

		String methodName = node.getName().getIdentifier();
		List<?> args = node.arguments();
		int size = args.size();
		boolean isSpecialMethod = false;
		if (isMethodRegistered(methodName)
				&& (size == 0 || methodName.equals("split") || methodName.equals("replace"))) {
			IBinding binding = node.getName().resolveBinding();
			if (binding != null && binding instanceof IMethodBinding) {
				IMethodBinding mthBinding = (IMethodBinding) binding;
				String className = mthBinding.getDeclaringClass().getQualifiedName();
				String propertyName = translate(className, methodName);
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
			buffer.append(sbParams);
		}
		buffer.append(isPrivateAndNotStatic ? ".apply(this, [" : " (");
		visitMethodParameterList(node.arguments(), mBinding, false, null, null);
		if (isPrivateAndNotStatic)
			buffer.append("]");
		buffer.append(")");
		return false;
	}

	public boolean visit(SimpleName node) {
		String constValue = checkConstantValue(node);
		if (constValue != null) {
			buffer.append(constValue);
			return false;
		}
		IBinding binding = node.resolveBinding();
		if (binding instanceof ITypeBinding) {
			ITypeBinding typeBinding = (ITypeBinding) binding;
			String name = typeBinding.getQualifiedName();
			if (name.startsWith("org.eclipse.swt.internal.xhtml.") || name.startsWith("net.sf.j2s.html.")) {
				buffer.append(node.getIdentifier());
				return false;
			}
		}
		ASTNode xparent = node.getParent();
		if (xparent == null) {
			buffer.append(node);
			return false;
		}
		char ch = 0;
		if (buffer.length() > 0) {
			ch = buffer.charAt(buffer.length() - 1);
		}
		if (ch == '.' && xparent instanceof QualifiedName) {
			if (binding != null && binding instanceof IVariableBinding) {
				IVariableBinding varBinding = (IVariableBinding) binding;
				IVariableBinding variableDeclaration = varBinding.getVariableDeclaration();
				ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
				String fieldName = getJ2SName(node);
				if (checkSameName(declaringClass, fieldName)) {
					buffer.append('$');
				}
				if (checkKeywordViolation(fieldName)) {
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
		if (xparent instanceof ClassInstanceCreation && !(binding instanceof IVariableBinding)) {
			ITypeBinding binding2 = node.resolveTypeBinding();
			if (binding != null) {
				String name = binding2.getQualifiedName();
				name = assureQualifiedName(removeJavaLang(name));
				buffer.append(name);
			} else {
				String nodeId = getJ2SName(node);
				buffer.append(assureQualifiedName(removeJavaLang(nodeId)));
			}
			return false;
		}
		if (binding == null) {
			String name = getJ2SName(node);
			name = removeJavaLang(name);
			if (checkKeywordViolation(name)) {
				buffer.append('$');
			}
			buffer.append(name);
			return false;
		}
		if (binding instanceof IVariableBinding) {
			IVariableBinding varBinding = (IVariableBinding) binding;
			simpleNameInVarBinding(node, ch, varBinding);
		} else if (binding instanceof IMethodBinding) {
			IMethodBinding mthBinding = (IMethodBinding) binding;
			simpleNameInMethodBinding(node, ch, mthBinding);
		} else {
			ITypeBinding typeBinding = node.resolveTypeBinding();
			// String name = NameConverterUtil.getJ2SName(node);
			if (typeBinding != null) {
				String name = typeBinding.getQualifiedName();
				name = assureQualifiedName(removeJavaLang(name));
				if (checkKeywordViolation(name)) {
					buffer.append('$');
				}
				buffer.append(name);
			} else {
				String name = node.getFullyQualifiedName();
				if (checkKeywordViolation(name)) {
					buffer.append('$');
				}
				buffer.append(name);
			}
		}
		return false;
	}

	private void simpleNameInVarBinding(SimpleName node, char ch, IVariableBinding varBinding) {
		String thisClassName = getClassName();
		if (isStatic(varBinding.getModifiers())) {
			IVariableBinding variableDeclaration = varBinding.getVariableDeclaration();
			ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
			if (ch != '.' && ch != '\"' && declaringClass != null) {
				String name = declaringClass.getQualifiedName();
				if ((name == null || name.length() == 0) && declaringClass.isAnonymous()) {
					// TODO: FIXME: I count the anonymous class name myself
					// and the binary name of the anonymous class will conflict
					// with my anonymous class name!
					name = declaringClass.getBinaryName();
				}
				name = assureQualifiedName(removeJavaLang(name));
				if (name.length() != 0) {
					buffer.append(name);
					buffer.append(".");
				}
			}
			String fieldName = getJ2SName(node);
			if (checkSameName(declaringClass, fieldName)) {
				buffer.append('$');
			}
			if (checkKeywordViolation(fieldName)) {
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
					appendFieldName(parent, declaringClass, false);
				}
			}

			String fieldVar = null;
			if (((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).isFinalSensible
					&& (varBinding.getModifiers() & Modifier.FINAL) != 0 && varBinding.getDeclaringMethod() != null) {
				String key = varBinding.getDeclaringMethod().getKey();
				if (methodDeclareNameStack.size() == 0 || !key.equals(methodDeclareNameStack.peek())) {
					buffer.append("this.f$.");
					if (currentBlockForVisit != -1) {
						List<ASTFinalVariable> finalVars = ((ASTVariableVisitor) getAdaptable(
								ASTVariableVisitor.class)).finalVars;
						List<ASTFinalVariable> visitedVars = ((ASTVariableVisitor) getAdaptable(
								ASTVariableVisitor.class)).visitedVars;
						int size = finalVars.size();
						for (int i = 0; i < size; i++) {
							ASTFinalVariable vv = finalVars.get(size - i - 1);
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
			// String fieldName = node.getFullyQualifiedName();
			String fieldName = null;
			if (declaringClass != null) {
				fieldName = getJ2SName(node);
			} else if (fieldVar == null) {
				fieldName = getVariableName(node.getIdentifier());
			} else {
				fieldName = fieldVar;
			}
			// System.err.println(fieldName);
			if (checkKeywordViolation(fieldName)) {
				buffer.append('$');
			}
			if (declaringClass != null && checkSameName(declaringClass, fieldName)) {
				buffer.append('$');
			}
			if (declaringClass != null && isInheritedFieldName(declaringClass, fieldName)) {
				fieldName = getFieldName(declaringClass, fieldName);
			}
			buffer.append(fieldName);
		}
	}

	private void simpleNameInMethodBinding(SimpleName node, char ch, IMethodBinding mthBinding) {
		String thisClassName = getClassName();
		if (isStatic(mthBinding.getModifiers())) {
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
						name = assureQualifiedName(removeJavaLang(name));
						if (name.length() != 0) {
							buffer.append(name);
							buffer.append(".");
						}
					}
				}
			}
			// String name = variableDeclaration.getName();
			String name = getJ2SName(node);
			name = removeJavaLang(name);
			if (isClassString && "$valueOf".equals(name))
				name = "valueOf";
			buffer.append(name);
		} else {
			ASTNode parent = node.getParent();
			boolean isClassString = false;
			if (parent != null && !(parent instanceof FieldAccess)) {
				IMethodBinding variableDeclaration = mthBinding.getMethodDeclaration();
				ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
				if (declaringClass != null && thisClassName != null && ch != '.') {
					isClassString = "java.lang.String".equals(declaringClass.getQualifiedName());
					appendFieldName(parent, declaringClass, ((mthBinding.getModifiers() & Modifier.PRIVATE) != 0));
				}
			}
			// String name = node.getFullyQualifiedName();
			String name = getJ2SName(node);
			name = removeJavaLang(name);
			if (!(isClassString && "valueOf".equals(name)) && checkKeywordViolation(name)) {
				buffer.append('$');
			}
			buffer.append(name);
		}
	}

	@SuppressWarnings("null")
	private void appendFieldName(ASTNode parent, ITypeBinding declaringClass, boolean isPrivate) {
		String name = declaringClass.getQualifiedName();
		boolean isThis = false;
		int superLevel = 0;
		ITypeBinding originalType = null;
		while (parent != null) {
			if (parent instanceof AbstractTypeDeclaration) {
				AbstractTypeDeclaration type = (AbstractTypeDeclaration) parent;
				ITypeBinding typeBinding = type.resolveBinding();
				if (typeBinding != null && originalType == null) {
					originalType = typeBinding;
				}
				superLevel++;
				if (Bindings.isSuperType(declaringClass, typeBinding)) {
					if (superLevel == 1) {
						buffer.append(isPrivate ? "C$.prototype." : "this.");
						isThis = true;
					} else {
						name = typeBinding.getQualifiedName();
					}
					break;
				}
			} else if (parent instanceof AnonymousClassDeclaration) {
				AnonymousClassDeclaration type = (AnonymousClassDeclaration) parent;
				ITypeBinding typeBinding = type.resolveBinding();
				if (typeBinding != null && originalType == null) {
					originalType = typeBinding;
				}
				superLevel++;
				if (Bindings.isSuperType(declaringClass, typeBinding)) {
					if (superLevel == 1) {
						buffer.append(isPrivate ? "C$.prototype." : "this.");
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
								if (idx2 == -1) { // maybe the name is already
													// "$1$2..." for Java5.0+ in
													// Eclipse 3.2+
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

		// Start SwingJS modded 6/9/17- Reverted b$
		if (!isThis) {
			buffer.append("this.b$[\"");
			buffer.append(removeJavaLang(name));
			buffer.append("\"].");
		}

		// if (!isThis) {
		// buffer.append("this.callbacks[\"");
		// //buffer.append(shortenQualifiedName(name));
		// StringBuilder dollarBuilder = new StringBuilder();
		// ArrayList<String> levels = new ArrayList<String>();
		// ArrayList<String> classes = new ArrayList<String>();
		// if (originalType != null) {
		// levels.add(originalType.getBinaryName());
		// classes.add(originalType.getSuperclass().getBinaryName());
		// ITypeBinding thisDeclaringClass = originalType.getDeclaringClass();
		// while (thisDeclaringClass != null) {
		// levels.add(thisDeclaringClass.getBinaryName());
		// classes.add(thisDeclaringClass.getSuperclass().getBinaryName());
		// dollarBuilder.append("$");
		// thisDeclaringClass = thisDeclaringClass.getDeclaringClass();
		// }
		// }
		// String binaryName = declaringClass.getBinaryName();
		// int idx = levels.indexOf(binaryName);
		// if (idx == -1) {
		// idx = classes.indexOf(binaryName);
		// if (idx == -1) {
		// // Check each super class
		// int index = 0;
		// ITypeBinding superClass = originalType.getSuperclass();
		// while (superClass != null) {
		// String superName = superClass.getBinaryName();
		// if ("java.lang.Object".equals(superName)) {
		// break;
		// }
		// if (binaryName.equals(superName)) {
		// idx = index;
		// //break;
		// }
		// superClass = superClass.getSuperclass();
		// }
		// ITypeBinding thisDeclaringClass = originalType.getDeclaringClass();
		// while (thisDeclaringClass != null) {
		// index++;
		// superClass = thisDeclaringClass.getSuperclass();
		// while (superClass != null) {
		// String superName = superClass.getBinaryName();
		// if ("java.lang.Object".equals(superName)) {
		// break;
		// }
		// if (binaryName.equals(superName)) {
		// idx = index;
		// //break;
		// }
		// superClass = superClass.getSuperclass();
		// }
		// thisDeclaringClass = thisDeclaringClass.getDeclaringClass();
		// }
		// }
		// }
		// if (idx != -1) {
		// for (int i = idx + 1; i < levels.size(); i++) {
		// if (dollarBuilder.length() > 0) {
		// dollarBuilder.deleteCharAt(0);
		// }
		// }
		// } else {
		// declaringClass = declaringClass.getDeclaringClass();
		// while (declaringClass != null) {
		// if (dollarBuilder.length() > 0) {
		// dollarBuilder.deleteCharAt(0);
		// }
		// declaringClass = declaringClass.getDeclaringClass();
		// }
		// }
		// buffer.append(dollarBuilder);
		// buffer.append("\"].");
		// }

	}

	public boolean visit(SimpleType node) {
		ITypeBinding binding = node.resolveBinding();
		if (binding != null) {
			buffer.append(assureQualifiedName(removeJavaLang(binding.getQualifiedName())));
		} else {
			buffer.append(node);
		}
		return false;
	}

	public boolean visit(SingleVariableDeclaration node) {
		SimpleName name = node.getName();
		IBinding binding = name.resolveBinding();
		if (binding != null) {
			String identifier = name.getIdentifier();
			ASTFinalVariable f = null;
			if (methodDeclareNameStack.size() == 0) {
				f = new ASTFinalVariable(blockLevel + 1, identifier, null);
			} else {
				String methodSig = methodDeclareNameStack.peek();
				f = new ASTFinalVariable(blockLevel + 1, identifier, methodSig);
			}
			List<ASTFinalVariable> finalVars = ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).finalVars;
			List<ASTFinalVariable> normalVars = ((ASTVariableVisitor) getAdaptable(
					ASTVariableVisitor.class)).normalVars;
			f.toVariableName = getIndexedVarName(identifier, normalVars.size());
			normalVars.add(f);
			if ((binding.getModifiers() & Modifier.FINAL) != 0) {
				finalVars.add(f);
			}
		}
		name.accept(this);
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
//		// BH NEVER NEVER NEVER ignore superconstructor, as it includes an <init> call.
//		ASTNode parent = node.getParent();
//		if (parent instanceof Block) {
//			Block methoBlock = (Block) parent;
//			ASTNode methodParent = methoBlock.getParent();
//			if (methodParent instanceof MethodDeclaration) {
//				MethodDeclaration method = (MethodDeclaration) methodParent;
//				if (getJ2STag(method, "@j2sIgnoreSuperConstructor") != null) {
//					return false;
//				}
//			}
//		}
		/*
		 * TODO: expression before the "super" should be considered.
		 */
		IMethodBinding methodDeclaration = constructorBinding.getMethodDeclaration();
		addSuperConstructor(node, methodDeclaration);
		return false;
	}

	public boolean visit(SuperFieldAccess node) {
		ITypeBinding typeBinding = resolveParentBinding(getXparent(node));
		String fieldName = getJ2SName(node.getName());
		if (isInheritedFieldName(typeBinding, fieldName)) {
			if (typeBinding != null) {
				IVariableBinding[] declaredFields = typeBinding.getDeclaredFields();
				for (int i = 0; i < declaredFields.length; i++) {
					String superFieldName = getJ2SName(declaredFields[i]);
					if (fieldName.equals(superFieldName)) {
						buffer.append("this.");
						if (checkKeywordViolation(fieldName)) {
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
		if (checkKeywordViolation(fieldName)) {
			buffer.append('$');
		}
		buffer.append(fieldName);

		return false;
	}

	public boolean visit(SuperMethodInvocation node) {
		IMethodBinding mBinding = node.resolveMethodBinding();
		String name = getJ2SName(node.getName()) + getJ2SParamQualifier(null, mBinding);
		buffer.append("C$.superClazz.prototype.").append(name).append(".apply(this, arguments)");
		return false;
	}

	public boolean visit(ThisExpression node) {
		Name qualifier = node.getQualifier();
		if (qualifier != null) {
			ASTNode xparent = getXparent(node);
			if (xparent == null || xparent.getParent() == null // CompilationUnit
					|| xparent.getParent().getParent() == null) {
				buffer.append("this");
			} else {
				/*
				 * only need callbacks wrapper in inner classes or anonymous
				 * classes.
				 */
				buffer.append("this.b$[\"");
				// Start SwingJS modded 6/9/17- Reverted dollarBuilder etc.
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
		ASTTypeVisitor typeVisitor = ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class));
		if (binding != null && binding.isTopLevel()) {
			typeVisitor.setClassName(binding.getName());
		}
		if ((node != rootTypeNode) && node.getParent() != null && (node.getParent() instanceof AbstractTypeDeclaration
				|| node.getParent() instanceof TypeDeclarationStatement)) {
			
			/* inner static class */
			ASTScriptVisitor visitor = null;
			try {
				visitor = this.getClass().newInstance();
			} catch (@SuppressWarnings("unused") Exception e) {
				visitor = new ASTScriptVisitor(); // Default visitor
			}
			visitor.setInnerGLobals(this, node);
			String className = typeVisitor.getClassName();
			String visitorClassName = null;
			if (node.getParent() instanceof TypeDeclarationStatement) {
				@SuppressWarnings("null")
				String anonClassName = assureQualifiedName(removeJavaLang(binding.isAnonymous() || binding.isLocal()
						? binding.getBinaryName() : binding.getQualifiedName()));
				visitorClassName = anonClassName.substring(anonClassName.lastIndexOf('.') + 1);
			} else {
				visitorClassName = className + "." + node.getName();
			}
			((ASTTypeVisitor) visitor.getAdaptable(ASTTypeVisitor.class)).setClassName(visitorClassName);
			((ASTPackageVisitor) visitor.getAdaptable(ASTPackageVisitor.class))
					.setPackageName(((ASTPackageVisitor) getAdaptable(ASTPackageVisitor.class)).getPackageName());
			node.accept(visitor);

			if (node.isInterface() || isStatic(node.getModifiers())
					|| (node.getParent() instanceof TypeDeclaration
							&& ((TypeDeclaration) node.getParent()).isInterface())) {
				String str = visitor.getBuffer().toString();
				staticFieldDefBuffer.append(str);
			} else {
				
				String targetClassName = visitor.getClassName();
				targetClassName = targetClassName.replace('.', '$');

				staticFieldDefBuffer.append("C$.$");
				staticFieldDefBuffer.append(targetClassName);
				staticFieldDefBuffer.append("$ = function () {\r\n");
				staticFieldDefBuffer.append(visitor.getBuffer().toString());
				staticFieldDefBuffer.append("};\r\n");

				buffer.append(visitor.getFullClassName());
				buffer.append(" || ");
				String pkgName = visitor.getPackageName();
				if (pkgName != null && pkgName.length() > 0) {
					buffer.append(pkgName);
					buffer.append(".");
				}
				buffer.append(className);
				buffer.append(".$");
				buffer.append(targetClassName);
				buffer.append("$ ();\r\n\r\n");  

// oops -- not anonymous
//				buffer.append(visitor.getFullClassName());
//				buffer.append(" || ");
//				buffer.append("(function(){");
//				buffer.append(visitor.getBuffer().toString());
//				buffer.append("}) ();\r\n");  
			}
			return false;
		}

		if (node.isInterface()) {
			return false;
		}

		// BH: JavaScipt @j2sPrefix/@j2sSuffix adds code before/after a class
		// definition that does not remove anything and needs no {...}
		addAnonymousFunctionWrapper(true);
		readSources(node, "@j2sPrefix", "", " ", true);
		buffer.append("var C$ = Clazz.decorateAsClass (function () {\r\n");

		// add all inner classes iteratively

		List<?> bodyDeclarations = node.bodyDeclarations();
		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof TypeDeclaration) {
				if (!node.isInterface()) {
					element.accept(this);
				}
			}
		}
		return false;
	}

	public void endVisit(TypeDeclaration node) {
		ASTNode parent = node.getParent();
		boolean haveParentClass = (parent != null
				&& (parent instanceof AbstractTypeDeclaration || parent instanceof TypeDeclarationStatement));
		boolean isInnerStaticClass = (node != rootTypeNode && haveParentClass);
		if (isInnerStaticClass)
			return;
		ITypeBinding binding = node.resolveBinding();
		String packageName = ((ASTPackageVisitor) getAdaptable(ASTPackageVisitor.class)).getPackageName();
		String className = ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class)).getClassName();
		String fullClassName = (packageName == null || packageName.length() == 0 ? className
				: packageName + '.' + className);
		boolean isInterface = node.isInterface();
		boolean interfaceHasMethods = (isInterface && checkInterfaceHasMethods(node));
		if (isInterface) {
			if (interfaceHasMethods) {
				addAnonymousFunctionWrapper(true);
				buffer.append("var C$=");
			}
			buffer.append("Clazz.declareInterface (");
		} else {
			// continue with Clazz.decorateAsClass...
			// add the newInstance$ call, which:
			// (a) adds .valueOf() = function() {return this} for Number
			// subclasses
			// (b) sets objThis.__JSID__ to a unique number
			// (c) handles inner class final variables
			// (d) includes a call to construct() when called directly by the
			// user using new Foo()
			buffer.append("Clazz.newInstance$ (this, arguments");
			if (!binding.isTopLevel())
				buffer.append("[0], true");
			buffer.append(");\r\n");
			buffer.append("}"); // end of Clazz.decorateAsClass(){};
			buffer.append(", ");
		}
		// add package name, full class name
		int lastIndexOf = fullClassName.lastIndexOf('.');
		buffer.append(lastIndexOf >= 0 ? assureQualifiedName(shortenPackageName(fullClassName)) : "null")
				.append(", \"" + fullClassName.substring(lastIndexOf + 1) + "\"");

		Type superClassType = null;
		if (!isInterface) {
			// add superclass name
			superClassType = node.getSuperclassType();
			String superClassName = "null";
			ITypeBinding typeBinding = node.resolveBinding();
			if (typeBinding != null) {
				ITypeBinding superclass = typeBinding.getSuperclass();
				if (superclass != null) {
					String clazzName = superclass.getQualifiedName();
					clazzName = assureQualifiedName(removeJavaLang(clazzName));
					if (clazzName != null && clazzName.length() != 0 && !"Object".equals(clazzName)) {
						superClassName = clazzName;
					}
				}
			}
			buffer.append(", ").append(superClassName);
		}
		// Add superinterfaces
		buffer.append(", ");
		List<?> superInterfaces = node.superInterfaceTypes();
		String term = "";
		switch (superInterfaces.size()) {
		case 0:
			buffer.append("null");
			break;
		case 1:
			break;
		default:
			buffer.append("[");
			term = "]";
			break;
		}
		for (Iterator<?> iter = superInterfaces.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			binding = ((Type) element).resolveBinding();
			if (binding != null) {
				String clazzName = binding.getQualifiedName();
				clazzName = assureQualifiedName(removeJavaLang(clazzName));
				buffer.append(clazzName);
			} else {
				buffer.append(element);
			}
			if (iter.hasNext()) {
				buffer.append(", ");
			}
		}
		buffer.append(term);

		if (superClassType != null) {
			// check for inner classes
			ITypeBinding superclass = superClassType.resolveBinding();
			if (superclass != null && !superclass.isTopLevel() && !isStatic(superclass.getModifiers())) {
				String name = assureQualifiedName(removeJavaLang(superclass.getQualifiedName()));
				buffer.append(",");
				addInnerTypeInstance(null, name, null, null, null, true, null);
			}
		}

		// remove excessive buffer nulls
		int len = buffer.length();
		if (", null, null".equals(buffer.substring(len - 12))) {
			buffer.delete(len - 12, len);
		} else if (", null".equals(buffer.substring(len - 6))) {
			buffer.delete(len - 6, len);
		}
		buffer.append(");\r\n");// done with declare...

		List<?> bodyDeclarations = node.bodyDeclarations();

		// hold onto static defs

		StringBuffer staticDefBackup = staticFieldDefBuffer;
		staticFieldDefBuffer = new StringBuffer();

		if (!isInterface) {
			// add the $init$ method, which includes all fields and initializer
			// {...} business
			addInitMethod(bodyDeclarations);
		}

		// add all the Enum declarations

		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof EnumDeclaration) {
				element.accept(this);
			}
		}

		// add all the methods

		MethodDeclaration[] methods = node.getMethods();
		for (int i = 0; i < methods.length; i++) {
			methods[i].accept(this);
		}

		if (isInterface) {
			// Check for type declarations in interfaces
			// This will create a new visitor.
			// Static field buffer may be filled with contents.
			for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
				ASTNode element = (ASTNode) iter.next();
				if (element instanceof TypeDeclaration)
					element.accept(this);
			}
		} else {
			// add a default constructor if needed
			// TODO: problem here with distinguishing construct(int...) from
			// construct(float...)
			addDefaultConstructor();
		}

		// add any recently defined static field definitions
		buffer.append(staticFieldDefBuffer);

		// // save the static defs

		// StringBuffer oldStaticDefBuffer = staticFieldDefBuffer;
		// staticFieldDefBuffer = new StringBuffer();
		// StringBuffer oldBuffer = buffer;
		// buffer = new StringBuffer();

		// for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();)
		// {
		// BodyDeclaration element = (BodyDeclaration) iter.next();
		// if (!isStatic(element.getModifiers()) || checkj2sIgnore(element))
		// continue;
		// if (element instanceof Initializer) {
		// System.err.println("??? static init=" + element);
		// element.accept(this);
		// } else if (element instanceof FieldDeclaration) {
		// System.err.println("??? static field=" + element);
		// FieldDeclaration field = (FieldDeclaration) element;
		// List<?> fragments = field.fragments();
		// for (int j = 0; j < fragments.size(); j++) {
		// VariableDeclarationFragment vdf = (VariableDeclarationFragment)
		// fragments.get(j);
		// Expression initializer = vdf.getInitializer();
		// if (initializer != null) {
		// initializer.accept(this);
		// }
		// }
		// // BH all interface field declarations are implicitly static
		// // } else if (isInterface) {
		// // List<?> fragments = field.fragments();
		// // for (int j = 0; j < fragments.size(); j++) {
		// // VariableDeclarationFragment vdf =
		// // (VariableDeclarationFragment) fragments.get(j);
		// // Expression initializer = vdf.getInitializer();
		// // vdf.getName().accept(this);
		// // if (initializer != null) {
		// // initializer.accept(this);
		// // }
		// // }
		// //
		// }
		// }
		// buffer = oldBuffer;
		// staticFieldDefBuffer = oldStaticDefBuffer;

		// add all static initializers and static fields

		buffer.append(staticDefBackup);
		int staticCount = -1;
		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			BodyDeclaration element = (BodyDeclaration) iter.next();
			if (element instanceof Initializer) {
				if (checkj2sIgnore(element)) {
					continue;
				}
				if (staticCount != -1) {
					buffer.append(");\r\n");
					staticCount = -1;
				}
				if (isStatic(element.getModifiers())) {
					element.accept(this);
				}
			} else if (element instanceof FieldDeclaration) {
				FieldDeclaration field = (FieldDeclaration) element;
				if (!isStatic(element.getModifiers()) || checkj2sIgnore(field))
					continue;
//				ReferenceASTVisitor refVisitor = new ReferenceASTVisitor();
				List<?> fragments = field.fragments();
				for (int j = 0; j < fragments.size(); j++) {
					VariableDeclarationFragment vdf = (VariableDeclarationFragment) fragments.get(j);
					if ("serialVersionUID".equals(vdf.getName().getIdentifier())) {
						continue;
					}
					if (++staticCount == 0) {
						buffer.append("Clazz.defineStatics (C$");
					}
					buffer.append(",\r\n\"");
					vdf.getName().accept(this);
					buffer.append("\", ");
					Type fieldType = field.getType();
					Expression initializer = vdf.getInitializer();
					if (initializer == null) {
						appendDefaultValue(fieldType);
					} else {
						term = null;
						if (fieldType.isPrimitiveType()
								&& ((PrimitiveType) fieldType).getPrimitiveTypeCode() == PrimitiveType.CHAR) {
							ITypeBinding tBinding = initializer.resolveTypeBinding();
							if (tBinding != null && !("char".equals(tBinding.getName()))) {
								buffer.append("String.fromCharCode (");
								term = ")";
							}
						}
						initializer.accept(this);
						if (term != null)
							buffer.append(term);
					}
				}
			}
		}
		if (staticCount != -1) {
			buffer.append(");\r\n");
		}

		String fieldsSerializables = prepareSimpleSerializable(node, bodyDeclarations);
		if (fieldsSerializables.length() > 0) {
			buffer.append("Clazz.registerSerializableFields(C$, ");
			buffer.append(fieldsSerializables.toString());
			buffer.append(");\r\n");
		}

		readSources(node, "@j2sSuffix", "\r\n", "\r\n", true);
		if (!isInterface || interfaceHasMethods)
			addAnonymousFunctionWrapper(false);
		staticFieldDefBuffer = new StringBuffer();
		super.endVisit(node);
	}

	private void appendDefaultValue(Type type) {
		if (type.isPrimitiveType()) {
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

	private boolean checkInterfaceHasMethods(TypeDeclaration node) {
		for (Iterator<?> iter = node.bodyDeclarations().iterator(); iter.hasNext();) {
			BodyDeclaration element = (BodyDeclaration) iter.next();
			if ((element instanceof Initializer
					|| element instanceof FieldDeclaration
							&& (isStatic(element.getModifiers()) || ((FieldDeclaration) element).fragments().size() > 0)
					|| element instanceof MethodDeclaration && isStatic(element.getModifiers())
				) && !checkj2sIgnore(element))
				return true;
		}
		return false;
	}
		
	@SuppressWarnings("deprecation")
	private String prepareSimpleSerializable(TypeDeclaration node, List<?> bodyDeclarations) {
		StringBuffer fieldsSerializables = new StringBuffer();
		ITypeBinding binding = node.resolveBinding();
		boolean isSimpleSerializable = binding != null
				&& (Bindings.findTypeInHierarchy(binding, "net.sf.j2s.ajax.SimpleSerializable") != null);
		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof FieldDeclaration) {
				if (node.isInterface()) {
					/*
					 * As members of interface should be treated as final and
					 * for javascript interface won't get instantiated, so the
					 * member will be treated specially.
					 */
					continue;
				}
				FieldDeclaration fieldDeclaration = (FieldDeclaration) element;

				if (isSimpleSerializable) {
					List<?> fragments = fieldDeclaration.fragments();
					int modifiers = fieldDeclaration.getModifiers();
					if ((Modifier.isPublic(
							modifiers)/* || Modifier.isProtected(modifiers) */) && !Modifier.isStatic(modifiers)
							&& !Modifier.isTransient(modifiers)) {
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
						} else {
							ITypeBinding t = resolveBinding;
							do {
								String typeName = t.getQualifiedName();
								if ("java.lang.Object".equals(typeName)) {
									break;
								}
								if ("net.sf.j2s.ajax.SimpleSerializable".equals(typeName)) {
									mark = "O";
									break;
								}
								t = t.getSuperclass();
								if (t == null) {
									break;
								}
							} while (true);
						}
						if (mark != null) {
							for (Iterator<?> xiter = fragments.iterator(); xiter.hasNext();) {
								VariableDeclarationFragment var = (VariableDeclarationFragment) xiter.next();
								int curDim = dims + var.getExtraDimensions();
								if (curDim <= 1) {
									if (fieldsSerializables.length() > 0) {
										fieldsSerializables.append(", ");
									}
									/*
									 * Fixed bug for the following scenario:
									 * class NT extends ... { public boolean
									 * typing; public void typing() { } }
									 */
									String fieldName = var.getName().toString();
									if (checkKeywordViolation(fieldName)) {
										fieldName = "$" + fieldName;
									}
									String prefix = null;
									if (binding != null && checkSameName(binding, fieldName)) {
										prefix = "$";
									}
									if (binding != null && isInheritedFieldName(binding, fieldName)) {
										fieldName = getFieldName(binding, fieldName);
									}
									if (prefix != null) {
										fieldName = prefix + fieldName;
									}

									fieldsSerializables.append("\"" + fieldName + "\", \"");
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
		return fieldsSerializables.toString();
	}

	public boolean visit(TypeLiteral node) {
		// Class x = Foo.class
		Type type = node.getType();
		ITypeBinding binding = type.resolveBinding();
		if (type.isPrimitiveType()) {
			String name = binding.getName();
			// adds Integer.TYPE, Float.TYPE, etc.
			buffer.append(getPrimitiveTYPE(name));
			return false;
		} else if (type.isArrayType()) {
			buffer.append(j2sGetArrayClass(binding));
			return false;
		} else {
			String name = binding.getName();
			if ("Object".equals(name) || "java.lang.Object".equals(name)) {
				buffer.append("Clazz._O"); // BH was JavaObject, but that
											// introduces a new top-level
											// JavaScript object
				return false;
			}
		}
		type.accept(this);
		return false;
	}

	/////////////////// St.Olaf Additions -- NY ////////////////

	private void addAnonymousFunctionWrapper(boolean isOpen) {
		buffer.append(isOpen ? (buffer.lastIndexOf(")") >= buffer.length() - 3 ? ";" : "")
				+ "\r\n(function(){" : "})()\r\n");
	}

	private final static String[] excludedClasses = new String[] {
			// these are pre-defined in j2sSwingJSext.js 
			"java.lang.Boolean", 
			"java.lang.Byte", 
			"java.lang.Character", 
			"java.lang.Double",
			"java.lang.Float",
			"java.lang.Integer",
			"java.lang.Long", 
			"java.lang.Math", 
			"java.lang.Number",
			"java.lang.reflect.Array", 
			"java.lang.Short",
			"java.lang.Thread",
			"java.util.Date",
			"java.util.EventListenerProxy",
			"java.util.EventObject",
		
		
	};


	/**
	 * Determine the qualified parameter suffix for method names, including
	 * constructors. TODO: Something like this must be duplicated in Clazz as
	 * well in JavaScript
	 * @param nodeName
	 * @param binding
	 * 
	 * @return
	 */
	private String getJ2SParamQualifier(String nodeName, IMethodBinding binding) {
//		if (binding.getTypeParameters().length > 0) {
//			String key = binding.getKey();
//			int pt = key.indexOf("T:");
//			if (pt > key.indexOf("(")) {
//				String fullName = binding.getName();
//				// for put<K,V> we just allow this to be a single method.
//				// TODO: Q: Good assumption? Could register these to check for
//				// problems?
//				String name = discardGenericType(fullName);
//				Object other = htGenerics.get(name);
//				System.err.println(binding.getKey());
//				if (other == null) {
//					htGenerics.put(name, key);
//				} else if (other instanceof String) {
//					System.err.println("parameterization problem with " + key + "; dual generic " + other);
//					htGenerics.put(name, Boolean.TRUE);
//				}
//			}
//		}

		// The problem is that System.out and System.err are PrintStreams, and we 
		// do not intend to change those. So in the case that we just wrote
		// "System....", we use that instead and do not qualify the name
		if (nodeName != null && nodeName.startsWith("System."))
			return "";
		String className = binding.getDeclaringClass().getQualifiedName();		
		for (int i = excludedClasses.length; --i >= 0;) {
			if (className.startsWith(excludedClasses[i])) {
				return "";
			}
		}

		StringBuffer sbParams = new StringBuffer();
		ITypeBinding[] paramTypes = binding.getParameterTypes();
		int nParams = paramTypes.length;
		for (int i = 0; i < nParams; i++)
			sbParams.append("$").append(j2sGetParamCode(paramTypes[i], true));
		String s = sbParams.toString();
		// exception for special case: setting static main(String[] args) to
		// "main", and "main()" to "main$"
		if ("main".equals(binding.getName()) && isStatic(binding.getModifiers())) {
			if (s.length() == 0) {
				s = "$";
			} else if (s.equals("$SA")) {
				s = "";
			}
		}
		return s;
	}

	static String j2sGetParamCode(ITypeBinding binding, boolean addAAA) {
		String prefix = (binding.getKey().indexOf(":T") >= 0 ? "T" : null);
		String name = binding.getQualifiedName();
		String arrays = null;
			
		int pt = name.indexOf("[");
		if (pt >= 0) {
			arrays = name.substring(pt + (name.indexOf("[L") >= 0 ? 1 : 0));
			name = name.substring(0, pt);
		}
		// catching putAll$java_util_Map<? extends K,? extends V>
		// (java.util.AbstractMap.js)
		
		// NOTE: If any of these are changed, they must be changed in j2sSwingJS as well.
		// NOTE: These are the same as standard Java Spec, with the exception of Short, which is "H" instead of "S"
		
		switch (name = Bindings.removeBrackets(name)) {
		case "boolean":
			name = "Z";
			break;
		case "byte":
			name = "B";
			break;
		case "char":
			name = "C";
			break;
		case "double":
			name = "D";
			break;
		case "float":
			name = "F";
			break;
		case "int":
			name = "I";
			break;
		case "long":
			name = "J";
			break;
		case "short":
			name = "H"; // differs from Java Spec so we can use S for String
			break;
		case "java.lang.Object":
		case "Object":
			name = "O";
			break;
		case "java.lang.String":
			name = "S";
			break;
		default:
			if (name.length() == 1 && prefix != null)
				name = prefix + name; // (T,V) --> $TK$TV
			name = name.replace("java.lang.", "").replace('.', '_');
			break;
		}
		if (arrays != null) {
			if (addAAA) 
				arrays = arrays.replaceAll("\\[\\]", "A");
			name += arrays;
		}
		return name;
	}

	private void addDefaultConstructor() {
		if (defaultConstructor != null && !defaultConstructor.isVarargs())
			return;
		buffer.append("\r\nClazz.newMethod$(C$, 'construct', function () {");
		if (defaultConstructor == null) {
			addSuperConstructor(null, null);
		} else {
			// TODO BH: This is still not right. It's specifically for anonymous
			// constructors
			// But I can't seem to see how to get the right vararg constructor
			// (float...) vs (int...)
			addThisConstructorCall(defaultConstructor, new ArrayList<Object>());
		}
		buffer.append("}, 1);\r\n");

	}

	private void addSuperConstructor(SuperConstructorInvocation node, IMethodBinding methodDeclaration) {
		if (node == null) {
			buffer.append("Clazz.super$(C$, this");
		} else {
			buffer.append("C$.superClazz.construct").append(getJ2SParamQualifier(null, node.resolveConstructorBinding())); 
			buffer.append(".apply(this");
			visitMethodParameterList(node.arguments(), methodDeclaration, true, ", [", "]");
		}
		buffer.append(");\r\n");
		addCallInit();
	}

	private void addCallInit() {
		buffer.append("C$.$init$.apply(this);\r\n");
	}

	/**
	 * Add the Clazz.arrayClass$(class, ndim) call to create a
	 * faux class with the correct _paramType and __NDIM
	 *
	 * @param binding
	 * @return
	 */
    static String j2sGetArrayClass(ITypeBinding binding) {
    	String strClass = j2sGetParamCode(binding, false);
    	int n = 0;
    	int pt = 0;
    	String strAAA = "";
    	while ((pt = strClass.lastIndexOf("[]")) >= 0) {
    		n++;
    		strClass = strClass.substring(0, pt);
    		strAAA += "A";
    	}
		return "Clazz.arrayClass$('" + strClass + strAAA + "'," + n + ")";
	}

	private static boolean isStatic(int modifiers) {
		return ((modifiers & Modifier.STATIC) != 0);
	}


}
