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
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.CastExpression;
import org.eclipse.jdt.core.dom.CharacterLiteral;
import org.eclipse.jdt.core.dom.ClassInstanceCreation;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.ConstructorInvocation;
import org.eclipse.jdt.core.dom.EnumConstantDeclaration;
import org.eclipse.jdt.core.dom.EnumDeclaration;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.FieldAccess;
import org.eclipse.jdt.core.dom.FieldDeclaration;
import org.eclipse.jdt.core.dom.IBinding;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.IPackageBinding;
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

// BH 7/31/2017 -- extensively reworked for fully qualified method names and no SAEM

// TODO private methods - rename as private names
// 
/**
 * 
 * @author zhou renjian
 * @author Bob Hanson
 *
 *         2006-12-3
 * 
 */
public class ASTScriptVisitor extends ASTJ2SDocVisitor {

	private static final String noConstructorNames = "Byte,Short,Integer,Long,Float,Double,Boolean";

	private StringBuffer laterBuffer = new StringBuffer();

	/* for anonymous classes */
	private StringBuffer methodBuffer = new StringBuffer();

	// private boolean isInnerClass = false;

	protected AbstractTypeDeclaration rootTypeNode;

	protected boolean methodOverloadingSupported = true;

	protected boolean interfaceCastingSupported = false;

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

	protected boolean checkKeyworkViolation(String name) {
		return ((ASTFieldVisitor) getAdaptable(ASTFieldVisitor.class)).checkKeyworkViolation(name);
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

	protected boolean canAutoOverride(MethodDeclaration node) {
		return ((ASTMethodVisitor) getAdaptable(ASTMethodVisitor.class)).canAutoOverride(node);
	}

	public boolean visit(AnonymousClassDeclaration node) {

		ITypeBinding binding = node.resolveBinding();
		ASTTypeVisitor typeVisitor = ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class));
		String anonClassName = null;
		if (binding.isAnonymous() || binding.isLocal()) {
			String binaryName = binding.getBinaryName();
			if (binaryName == null) {
				String bindingKey = binding.getKey();
				if (bindingKey != null) {
					binaryName = bindingKey = bindingKey.substring(1, bindingKey.length() - 1).replace('/', '.');
				}
			}
			anonClassName = assureQualifiedName(removeJavaLang(binaryName));
		} else {
			anonClassName = assureQualifiedName(removeJavaLang(binding.getQualifiedName()));
		}
		String fullClassName = anonClassName;
		String shortClassName = anonClassName.substring(anonClassName.lastIndexOf('.') + 1);
		String bootstrapName = "$" + shortClassName + "$";
		String className = typeVisitor.getClassName();
		buffer.append(fullClassName);
		buffer.append(" || (");
		StringBuffer tmpBuffer = buffer;
		buffer = methodBuffer;
		methodBuffer = new StringBuffer();

		buffer.append("cla$$.");
		buffer.append(bootstrapName);
		buffer.append(" = function () {\r\n");
		buffer.append("var cla$$ = Clazz.decorateAsClass (function () {\r\n");
		buffer.append("Clazz.newInstance$ (this, arguments[0], true);\r\n");
		buffer.append("}, ");

	    int idx = fullClassName.lastIndexOf('.');	    
		if (idx >= 0) {
			buffer.append(assureQualifiedName(shortenPackageName(fullClassName)));
			buffer.append(", \"" + fullClassName.substring(idx + 1) + "\"");
		} else {
			buffer.append("null, \"" + fullClassName + "\"");
		}

		if (binding != null) {
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
		}
		buffer.append(");\r\n");

		String oldClassName = className;
		typeVisitor.setClassName(shortClassName);
		StringBuffer oldLaterBuffer = laterBuffer;
		laterBuffer = new StringBuffer();
		List<?> bodyDeclarations = node.bodyDeclarations();

		addInitMethod(bodyDeclarations, false);

		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof MethodDeclaration) {
				element.accept(this);
			}
		}

		//addDefaultConstructor();

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
						// buffer.append(vdf.getName());
						vdf.getName().accept(this);
						buffer.append(" = ");
						Expression initializer = vdf.getInitializer();
						if (initializer != null) {
							initializer.accept(this);
						} else {
							Type type = fields.getType();
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
						buffer.append(";\r\n");
					}
				}
			}
		}

		typeVisitor.setClassName(oldClassName);
		buffer.append(laterBuffer);
		laterBuffer = oldLaterBuffer;

		buffer.append("};\r\n");
		String methods = methodBuffer.toString();
		methodBuffer = buffer;
		methodBuffer.append(methods);
		buffer = tmpBuffer;
		String packageName = ((ASTPackageVisitor) getAdaptable(ASTPackageVisitor.class)).getPackageName();
		buffer.append(packageName);
		buffer.append(".");
		idx = className.indexOf('$');
		if (idx >= 0)
			className = className.substring(0, idx);
		buffer.append(className).append(".").append(bootstrapName).append("()");
		/*
		 * Anonymous class won't have static members, methods, or initializers
		 */
		buffer.append(")");
		return false;
	}

	private void addInitMethod(List<?> bodyDeclarations, boolean isInterface) {
		buffer.append("\r\nClazz.newMethod$(cla$$, '$init$', function () {\r\n");
		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof FieldDeclaration) {
				FieldDeclaration field = (FieldDeclaration) element;
				if (isInterface /* || !isFieldNeedPreparation(field) */) {
					continue;
				}
				if (getJ2STag(field, "@j2sIgnore") != null) {
					continue;
				}
				element.accept(this);
			} else if (element instanceof Initializer) {
				Initializer init = (Initializer) element;
				if (getJ2STag(init, "@j2sIgnore") != null) {
					continue;
				}
				if ((init.getModifiers() & Modifier.STATIC) == 0) {
					element.accept(this);
				}
			}
		}
		buffer.append("}, 1);\r\n");
	}

	public boolean visit(CastExpression node) {
		Type type = node.getType();
		/*
		 * TODO: some casting should have its meaning! int to byte, int to
		 * short, long to int will lost values
		 */
		Expression expression = node.getExpression();
		if (type.isPrimitiveType()) {
			ITypeBinding resolveTypeBinding = expression.resolveTypeBinding();
			if (resolveTypeBinding != null) {
				String name = resolveTypeBinding.getName();
				PrimitiveType pType = (PrimitiveType) type;
				if (pType.getPrimitiveTypeCode() == PrimitiveType.INT
						|| pType.getPrimitiveTypeCode() == PrimitiveType.BYTE
						|| pType.getPrimitiveTypeCode() == PrimitiveType.SHORT
						|| pType.getPrimitiveTypeCode() == PrimitiveType.LONG) {
					if ("char".equals(name)) {
						buffer.append("(");
						if (expression instanceof ParenthesizedExpression) {
							ParenthesizedExpression pe = (ParenthesizedExpression) expression;
							pe.getExpression().accept(this);
						} else {
							expression.accept(this);
						}
						buffer.append(").charCodeAt (0)");
						return false;
					} else if ("float".equals(name) || "double".equals(name)) {
						// buffer.append("Math.round (");
						buffer.append("Clazz.");
						buffer.append(name);
						buffer.append("To");
						String targetType = pType.getPrimitiveTypeCode().toString();
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
				}
				if (pType.getPrimitiveTypeCode() == PrimitiveType.CHAR) {
					if ("char".equals(name)) {
					} else if ("float".equals(name) || "double".equals(name)) {
						buffer.append("Clazz.");
						buffer.append(name);
						buffer.append("ToChar (");
						if (expression instanceof ParenthesizedExpression) {
							ParenthesizedExpression pe = (ParenthesizedExpression) expression;
							pe.getExpression().accept(this);
						} else {
							expression.accept(this);
						}
						buffer.append(")");
						return false;
					} else if ("int".equals(name) || "byte".equals(name) || "short".equals(name)
							|| "long".equals(name)) {
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
		}
		expression.accept(this);
		return false;
	}

	@SuppressWarnings("unchecked")
	public boolean visit(ClassInstanceCreation node) {
		AnonymousClassDeclaration anonDeclare = node.getAnonymousClassDeclaration();
		if (anonDeclare == null) {
			ITypeBinding binding = node.resolveTypeBinding();
			if (binding != null) {
				if (!binding.isTopLevel()) {
					if ((binding.getModifiers() & Modifier.STATIC) == 0) {
						// inner nonstatic class
						IMethodBinding constructorBinding = node.resolveConstructorBinding();
						String name = assureQualifiedName(removeJavaLang(binding.isAnonymous() || binding.isLocal()
								? binding.getBinaryName() : binding.getQualifiedName()));
						String finals = null; // No final variables for
												// non-anonymous class
						IMethodBinding methodDeclaration = (constructorBinding == null ? null
								: constructorBinding.getMethodDeclaration());
						addInnerTypeInstance(node, name, node.getExpression(), finals, methodDeclaration, false, false);
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
				buffer.append(" new ").append(fqName).append("(");
			} else {
				buffer.append("Clazz.$new(")
				.append(assureQualifiedName(fqName))
				.append(".construct")
				.append(getJ2SParamQualifier(constructorBinding));
				prefix = ",[";
				postfix = "]";
			}
			visitMethodParameterList(node.arguments(), methodDeclaration, true, prefix, postfix);
			buffer.append(")");
		} else {
			// anonymous
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
				anonClassName = assureQualifiedName(removeJavaLang(binaryName));
			} else {
				anonClassName = assureQualifiedName(removeJavaLang(binding.getQualifiedName()));
			}

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
			methodDeclareStack.push(binding.getKey());
			anonDeclare.accept(this);
			methodDeclareStack.pop();
			buffer.append(", ");

			variableVisitor.normalVars = lastNormalVars;
			String name = anonClassName;
			String finals = listFinalVariables(visitedVars, ", ",
					methodDeclareStack.size() == 0 ? null : (String) methodDeclareStack.peek());
			IMethodBinding constructorBinding = node.resolveConstructorBinding();
			IMethodBinding methodDeclaration = (constructorBinding == null ? null
					: constructorBinding.getMethodDeclaration());
			addInnerTypeInstance(node, name, null, finals, methodDeclaration, false, true);

			if (lastCurrentBlock != -1) {
				/* add the visited variables into last visited variables */
				for (int j = 0; j < visitedVars.size(); j++) {
					ASTFinalVariable fv = (ASTFinalVariable) visitedVars.get(j);
					int size = finalVars.size();
					for (int i = 0; i < size; i++) {
						ASTFinalVariable vv = (ASTFinalVariable) finalVars.get(size - i - 1);
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

			// methodBuffer = buffer;
			// buffer = tmpBuffer;
		}
		return false;
	}

	private void addInnerTypeInstance(ClassInstanceCreation node, String className, Expression outerClassExpr, String finals,
			IMethodBinding methodDeclaration, boolean inheritArgs, boolean anonymous) {
		
		String constructor = className + (inheritArgs || methodDeclaration == null ? ".$init$" 
				: ".construct" + getJ2SParamQualifier(methodDeclaration));
		buffer.append("Clazz.$new(").append(constructor).append(", [");
		if (outerClassExpr == null)
			buffer.append("this");
		else
			outerClassExpr.accept(this);
		buffer.append(", ").append(finals == null ? "null" : finals).append(", ");
		if (inheritArgs) {
			buffer.append("Clazz.inheritArgs");
		} else if (methodDeclaration != null) {
			visitMethodParameterList(node.arguments(), methodDeclaration, true, null, null);
		}
		buffer.append("]");
		// an anonymous class will be calling a constructor in another class, so we need to indicate
		// its actual call explicitly
		if (anonymous)
			buffer.append(",").append(className);
		buffer.append(")");
	}

	protected void visitMethodParameterList(List<?> arguments, IMethodBinding methodDeclaration, boolean isConstructor,
			String prefix, String suffix) {

		if (methodDeclaration == null) {
			return;
		}
		if (isConstructor && arguments.size() == 0) {
			// we have an apparent default empty constructor such as
			// public MyClass() {....}
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
			if (parameterTypes != null) {
				parameterTypeName = parameterTypes[i].getName();
			}
			if (!alreadyPrefixed && prefix != null) {
				buffer.append(prefix);
				alreadyPrefixed = true;
			}
			if (isVarArgs) {
				buffer.append("[");
				for (int j = i; j < argSize; j++) {
					ASTNode element = (ASTNode) arguments.get(j);
					visitArgumentItem(element, clazzName, methodName, parameterTypeName, i);
					if (j != argSize - 1) {
						buffer.append(", ");
					}
				}
				buffer.append("]");
			} else {
				ASTNode element = (ASTNode) arguments.get(i);
				visitArgumentItem(element, clazzName, methodName, parameterTypeName, i);
				if (i != parameterTypes.length - 1) {
					buffer.append(", ");
				}
			}
		}

		if (alreadyPrefixed && suffix != null) {
			buffer.append(suffix);
		}
	}

	private void visitArgumentItem(ASTNode element, String clazzName, String methodName, String parameterTypeName,
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
						typeStr = assureQualifiedName(removeJavaLang(nullTypeBinding.getQualifiedName()));
					}
				}
			}
		}
		if (typeStr != null) {
			buffer.append("null");
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
				// Keep String#indexOf(int) and String#lastIndexOf(int)'s first
				// char argument
				ignored = (position == 0
						&& (/* "append".equals(methodName) || */"indexOf".equals(methodName)
								|| "lastIndexOf".equals(methodName))
						&& ("java.lang.String".equals(Bindings.removeBrackets(clazzName))));

				if (!ignored && exp instanceof CharacterLiteral) {
					CharacterLiteral cl = (CharacterLiteral) exp;
					buffer.append(0 + cl.charValue());
					ignored = true;
				} else {
					boxingNode(element);
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
						buffer.append(".charCodeAt (0)");
					}
				}
			} else {
				boxingNode(element);
			}
		}
	}

	public boolean visit(ConstructorInvocation node) {
		IMethodBinding constructorBinding = node.resolveConstructorBinding();
		String qualifiedParams = getJ2SParamQualifier(constructorBinding);
		buffer.append("cla$$.construct").append(qualifiedParams).append(".apply(this");
		IMethodBinding methodDeclaration = (constructorBinding == null ? null
				: constructorBinding.getMethodDeclaration());
		visitMethodParameterList(node.arguments(), methodDeclaration, true, ", [", "]");
		buffer.append(");\r\n");
		return false;
	}

	// End- SwingJS modded 6/9/17
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
			return;
		}
		buffer.append("Clazz.newInstance$ (this, arguments);\r\n");

		buffer.append("}, ");

		ASTNode parent = node.getParent();
		if (parent != null && parent instanceof AbstractTypeDeclaration) {
			String packageName = ((ASTPackageVisitor) getAdaptable(ASTPackageVisitor.class)).getPackageName();
			String className = ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class)).getClassName();
			String fullClassName = null;
			if (packageName != null && packageName.length() != 0) {
				fullClassName = packageName + '.' + className;
			} else {
				fullClassName = className;
			}
			String name = node.getName().getIdentifier();
			buffer.append(assureQualifiedName(fullClassName));
			buffer.append(", \"" + name + "\"");
			buffer.append(", Enum");
		} else {

			String fullClassName = null;// getFullClassName();
			String packageName = ((ASTPackageVisitor) getAdaptable(ASTPackageVisitor.class)).getPackageName();
			String className = ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class)).getClassName();
			if (packageName != null && packageName.length() != 0) {
				fullClassName = packageName + '.' + className;
			} else {
				fullClassName = className;
			}
			int lastIndexOf = fullClassName.lastIndexOf('.');
			if (lastIndexOf != -1) {
				buffer.append(assureQualifiedName(shortenPackageName(fullClassName)));
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

		buffer.append(laterBuffer);

		// EnumTypeWrapper enumWrapper = new EnumTypeWrapper(node);
		//
		// MethodDeclaration[] methods = enumWrapper.getMethods();
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

		addDefaultConstructor();

		List<?> bodyDeclarations = node.bodyDeclarations();

		addInitMethod(bodyDeclarations, false);

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
						// buffer.append(vdf.getName());
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
						buffer.append(";\r\n");
					}
				}
			}
		}

		List<?> constants = node.enumConstants();
		for (int i = 0; i < constants.size(); i++) {
			EnumConstantDeclaration enumConst = (EnumConstantDeclaration) constants.get(i);
			AnonymousClassDeclaration anonDeclare = enumConst.getAnonymousClassDeclaration();
			buffer.append("Clazz.$newEnumConst(cla$$.construct");
			if (anonDeclare == null) {
				IMethodBinding binding = enumConst.resolveConstructorBinding();
				buffer.append(getJ2SParamQualifier(binding));
			} else {
				ITypeBinding binding = anonDeclare.resolveBinding();
				String anonClassName = null;
				if (binding.isAnonymous() || binding.isLocal()) {
					anonClassName = assureQualifiedName(removeJavaLang(binding.getBinaryName()));
				} else {
					anonClassName = assureQualifiedName(removeJavaLang(binding.getQualifiedName()));
				}
				StringBuffer tmpBuffer = buffer;
				buffer = new StringBuffer();
				StringBuffer tmpMethodBuffer = methodBuffer;
				methodBuffer = new StringBuffer();
				anonDeclare.accept(this);
				tmpBuffer.append(methodBuffer);
				tmpBuffer.append(buffer);
				tmpBuffer.append(";\r\n");
				methodBuffer = tmpMethodBuffer;
				buffer = tmpBuffer;
			}
			buffer.append(", \"");
			enumConst.getName().accept(this);
			buffer.append("\", " + i + ", [");
			visitList(enumConst.arguments(), ", ");
			buffer.append("]);\r\n");
		}

		addAnonymousFunctionWrapper(false);
		super.endVisit(node);
	}

	public boolean visit(EnumDeclaration node) {
		ITypeBinding binding = node.resolveBinding();
		ASTTypeVisitor typeVisitor = ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class));
		if (binding != null) {
			if (binding.isTopLevel()) {
				typeVisitor.setClassName(binding.getName());
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
			((ASTTypeVisitor) visitor.getAdaptable(ASTTypeVisitor.class))
					.setClassName(((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class)).getClassName());
			((ASTPackageVisitor) visitor.getAdaptable(ASTPackageVisitor.class))
					.setPackageName(((ASTPackageVisitor) getAdaptable(ASTPackageVisitor.class)).getPackageName());

			node.accept(visitor);
			if ((node.getModifiers() & Modifier.STATIC) != 0) {
				String str = visitor.getBuffer().toString();
				laterBuffer.append(str);
			} else {
				/*
				 * Never reach here! March 17, 2006
				 */
				methodBuffer.append(visitor.getBuffer().toString());
			}
			return false;
		}

		addAnonymousFunctionWrapper(true);
		buffer.append("var cla$$ = Clazz.decorateAsClass (function () {\r\n");
		return false;
	}

	public boolean visit(FieldAccess node) {
		/*
		 * TODO: more complicated rules should be considered. read the JavaDoc
		 */
		boolean staticFields = false;
		IVariableBinding varBinding = node.resolveFieldBinding();
		ITypeBinding declaring = null;
		String qdName = null;
		Expression expression = node.getExpression();
		if (!supportsObjectStaticFields && varBinding != null && (varBinding.getModifiers() & Modifier.STATIC) != 0
				&& (declaring = varBinding.getDeclaringClass()) != null
				&& !(qdName = declaring.getQualifiedName()).startsWith("org.eclipse.swt.internal.xhtml.")
				&& !qdName.startsWith("net.sf.j2s.html.")
				&& !(expression instanceof SimpleName || expression instanceof QualifiedName)) {
			staticFields = true;
		}
		if (staticFields) {
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
		return visitWith(node, false);
	}

	public boolean visitWith(FieldDeclaration node, boolean ignoreInitializer) {
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
			// String fieldName = element.getName().getIdentifier();
			String ext = "";
			if (checkKeyworkViolation(fieldName)) {
				ext += "$";
			}
			if (typeBinding != null && checkSameName(typeBinding, fieldName)) {
				ext += "$";
			}
			// fieldName = ext + fieldName;
			// buffer.append(fieldName);
			buffer.append("this.");
			if (isInheritedFieldName(typeBinding, fieldName)) {
				fieldName = getFieldName(typeBinding, fieldName);
				buffer.append(ext + fieldName);
			} else {
				buffer.append(ext + fieldName);
			}
			// buffer.append(element.getName());
			buffer.append(" = ");
			if (!ignoreInitializer && element.getInitializer() != null) {
				element.getInitializer().accept(this);
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
					if (node.getType().isPrimitiveType()) {
						PrimitiveType pType = (PrimitiveType) node.getType();
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
			buffer.append(";\r\n");
		}
		return false;
	}

	private boolean checkSimpleBooleanOperator(String op) {
		if (op.equals("^") || op.equals("|") || op.equals("&")) {
			return true;
		}
		return false;
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
						StringBuffer tmpBuffer = buffer;
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
		if (getJ2STag(node, "@j2sIgnore") != null) {
			return false;
		}
		// visitList(node.getBody().statements(), "\r\n");
		node.getBody().accept(this);
		buffer.append("\r\n");
		return false;
	}

	public void endVisit(MethodDeclaration node) {
		if (getJ2STag(node, "@j2sIgnore") != null) {
			addAnonymousClassDeclarationMethods();
			return;
		}

		IMethodBinding mBinding = node.resolveBinding();
		if (Bindings.isMethodInvoking(mBinding, "net.sf.j2s.ajax.SimpleRPCRunnable", "ajaxRun")) {
			if (getJ2STag(node, "@j2sKeep") == null) {
				addAnonymousClassDeclarationMethods();
				return;
			}
		}
		String[] pipeMethods = new String[] { "pipeSetup", "pipeThrough", "through", "pipeMonitoring",
				"pipeMonitoringInterval", "pipeWaitClosingInterval", "setPipeHelper" };
		for (int i = 0; i < pipeMethods.length; i++) {
			if (Bindings.isMethodInvoking(mBinding, "net.sf.j2s.ajax.SimplePipeRunnable", pipeMethods[i])) {
				if (getJ2STag(node, "@j2sKeep") == null) {
					addAnonymousClassDeclarationMethods();
					return;
				}
			}
		}
		if (Bindings.isMethodInvoking(mBinding, "net.sf.j2s.ajax.CompoundPipeSession", "convert")) {
			if (getJ2STag(node, "@j2sKeep") == null) {
				addAnonymousClassDeclarationMethods();
				return;
			}
		}
		if (mBinding != null) {
			methodDeclareStack.pop();
		}
		super.endVisit(node);
		addAnonymousClassDeclarationMethods();
	}

	protected void addAnonymousClassDeclarationMethods() {
		// if (methodBuffer != null && methodBuffer.length() != 0) {
		// buffer.append(methodBuffer.toString());
		// methodBuffer = null;
		// }
	}

	protected String[] getFilterMethods() {
		return new String[0];
	}

	@SuppressWarnings("unchecked")
	public boolean visit(MethodDeclaration node) {

		// methodBuffer = new StringBuffer();
		if (getJ2STag(node, "@j2sIgnore") != null) {
			return false;
		}

		boolean isConstructor = node.isConstructor();
		boolean isStatic = ((node.getModifiers() & Modifier.STATIC) != 0);

		IMethodBinding mBinding = node.resolveBinding();

		if (Bindings.isMethodInvoking(mBinding, "net.sf.j2s.ajax.SimpleRPCRunnable", "ajaxRun")) {
			if (getJ2STag(node, "@j2sKeep") == null) {
				return false;
			}
		}
		String[] pipeMethods = new String[] { "pipeSetup", "pipeThrough", "through", "pipeMonitoring",
				"pipeMonitoringInterval", "pipeWaitClosingInterval", "setPipeHelper" };
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
		if (mBinding != null) {
			methodDeclareStack.push(mBinding.getKey());
		}

		if (node.getBody() == null) {
			/*
			 * Abstract or native method
			 */
			if (isMethodNativeIgnored(node)) {
				return false;
			}
		}
		String name = (isConstructor ? "construct" : getJ2SName(node.getName())) + getJ2SParamQualifier(mBinding);
		if (name.equals("construct")) // was $_
			haveDefaultConstructor = true;
		buffer.append("\r\nClazz.newMethod$ (cla$$, '").append(name).append("', ").append("function (");
		List<?> parameters = node.parameters();
		visitList(parameters, ", ");
		buffer.append(") ");
		if (node.isConstructor()) {
			boolean isSuperOrThis = false;
			List<?> statements = node.getBody().statements();
			if (statements.size() > 0) {
				ASTNode firstStatement = (ASTNode) statements.get(0);
				if (firstStatement instanceof SuperConstructorInvocation
						|| firstStatement instanceof ConstructorInvocation) {
					isSuperOrThis = true;
				}
			}
			// BH @j2sIgnoreSuperConstructor removed from options
			boolean existedSuperClass = false;
			IMethodBinding binding = node.resolveBinding();
			if (binding != null) {
				ITypeBinding declaringClass = binding.getDeclaringClass();
				ITypeBinding superclass = declaringClass.getSuperclass();
				String qualifiedName = discardGenericType(superclass.getQualifiedName());
				existedSuperClass = superclass != null && !"java.lang.Object".equals(qualifiedName)
						&& !"java.lang.Enum".equals(qualifiedName);
			}
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
				visitNativeJavadoc(node.getJavadoc(), null, false);
				buffer.append("}");
			}
			List<ASTFinalVariable> normalVars = ((ASTVariableVisitor) getAdaptable(
					ASTVariableVisitor.class)).normalVars;
			for (int i = normalVars.size() - 1; i >= 0; i--) {
				ASTFinalVariable var = (ASTFinalVariable) normalVars.get(i);
				if (var.blockLevel >= blockLevel) {
					normalVars.remove(i);
				}
			}
			blockLevel--;
		} else if (!checkJ2STags(node, true)) {
			node.getBody().accept(this);
		}
		if (isStatic || isConstructor)
			buffer.append(", 1");
		buffer.append(");\r\n");
		return false;
	}

	private boolean isConstructorVarargs(IMethodBinding binding, boolean startSuper) {
		if (binding == null) {
			return false;
		}
		ITypeBinding thisClass = binding.getDeclaringClass();
		IPackageBinding declaringPackage = thisClass.getPackage();
		if (startSuper) {
			thisClass = thisClass.getSuperclass();
		}
		if (thisClass == null) {
			return false;
		}
		do {
			IMethodBinding[] declaredMethods = thisClass.getDeclaredMethods();
			if (declaredMethods == null) {
				return false;
			}
			boolean constructorVarargs = false;
			boolean containsNonDefaultConstructor = false;
			for (int i = 0; i < declaredMethods.length; i++) {
				IMethodBinding m = declaredMethods[i];
				if (!m.isConstructor() || m.isDefaultConstructor()) {
					continue;
				}
				containsNonDefaultConstructor = true;
				int modifiers = m.getModifiers();
				if ((modifiers & Modifier.PRIVATE) != 0) {
					continue;
				}
				if (modifiers == Modifier.NONE) {
					IPackageBinding thisPackage = thisClass.getPackage();
					if ((declaringPackage == null) != (thisPackage == null)
							|| declaringPackage != null && !declaringPackage.getName().equals(thisPackage.getName())) {
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
		} while ((thisClass = thisClass.getSuperclass()) != null);
		return false;
	}

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
			read = readStringSources(node, "@j2sXHTML", prefix, suffix, false);
		}
		if (!read) {
			read = readStringSources(node, "@j2sXCSS", prefix, suffix, false);
		}
		return read;
	}

	public boolean visit(MethodInvocation node) {
		IMethodBinding mBinding = node.resolveMethodBinding();
		boolean isPrivateAndNotStatic = ((mBinding.getModifiers() & Modifier.PRIVATE) != 0)
				&& ((mBinding.getModifiers() & Modifier.STATIC) == 0);

		String sbParams = getJ2SParamQualifier(mBinding);

		Expression expression = node.getExpression();
		if (expression == null) {
			// "this"
		} else {
			isPrivateAndNotStatic = false;
			expression.accept(this);
			buffer.append(".");
		}

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
		if (binding != null && binding instanceof ITypeBinding) {
			ITypeBinding typeBinding = (ITypeBinding) binding;
			if (typeBinding != null) {
				String name = typeBinding.getQualifiedName();
				if (name.startsWith("org.eclipse.swt.internal.xhtml.") || name.startsWith("net.sf.j2s.html.")) {
					buffer.append(node.getIdentifier());
					return false;
				}
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
				if (checkKeyworkViolation(fieldName)) {
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
			if (checkKeyworkViolation(name)) {
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
				if (checkKeyworkViolation(name)) {
					buffer.append('$');
				}
				buffer.append(name);
			} else {
				String name = node.getFullyQualifiedName();
				if (checkKeyworkViolation(name)) {
					buffer.append('$');
				}
				buffer.append(name);
			}
		}
		return false;
	}

	@SuppressWarnings("unchecked")
	private void simpleNameInVarBinding(SimpleName node, char ch, IVariableBinding varBinding) {
		String thisClassName = getClassName();
		if ((varBinding.getModifiers() & Modifier.STATIC) != 0) {
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
			if (checkKeyworkViolation(fieldName)) {
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
				if (methodDeclareStack.size() == 0 || !key.equals(methodDeclareStack.peek())) {
					buffer.append("this.$finals.");
					if (currentBlockForVisit != -1) {
						List<ASTFinalVariable> finalVars = ((ASTVariableVisitor) getAdaptable(
								ASTVariableVisitor.class)).finalVars;
						List<ASTFinalVariable> visitedVars = ((ASTVariableVisitor) getAdaptable(
								ASTVariableVisitor.class)).visitedVars;
						int size = finalVars.size();
						for (int i = 0; i < size; i++) {
							ASTFinalVariable vv = (ASTFinalVariable) finalVars.get(size - i - 1);
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
			if (checkKeyworkViolation(fieldName)) {
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
			if (!(isClassString && "valueOf".equals(name)) && checkKeyworkViolation(name)) {
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
					appendFieldName(parent, declaringClass, ((mthBinding.getModifiers() & Modifier.PRIVATE) != 0));
				}
			}
			// String name = node.getFullyQualifiedName();
			String name = getJ2SName(node);
			name = removeJavaLang(name);
			if (!(isClassString && "valueOf".equals(name)) && checkKeyworkViolation(name)) {
				buffer.append('$');
			}
			buffer.append(name);
		}
	}

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
						buffer.append(isPrivate ? "cla$$.prototype." : "this.");
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
						buffer.append(isPrivate ? "cla$$.prototype." : "this.");
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
			buffer.append("this.callbacks[\"");
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

	@SuppressWarnings("unchecked")
	public boolean visit(SingleVariableDeclaration node) {
		SimpleName name = node.getName();
		IBinding binding = name.resolveBinding();
		if (binding != null) {
			String identifier = name.getIdentifier();
			ASTFinalVariable f = null;
			if (methodDeclareStack.size() == 0) {
				f = new ASTFinalVariable(blockLevel + 1, identifier, null);
			} else {
				String methodSig = (String) methodDeclareStack.peek();
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
		ASTNode parent = node.getParent();
		if (parent instanceof Block) {
			Block methoBlock = (Block) parent;
			ASTNode methodParent = methoBlock.getParent();
			if (methodParent instanceof MethodDeclaration) {
				MethodDeclaration method = (MethodDeclaration) methodParent;
				if (getJ2STag(method, "@j2sIgnoreSuperConstructor") != null) {
					return false;
				}
			}
		}
		/*
		 * TODO: expression before the "super" should be considered.
		 */
		IMethodBinding methodDeclaration = null;
		if (constructorBinding != null) {
			methodDeclaration = constructorBinding.getMethodDeclaration();
		}
		addSuperConstructor(node, methodDeclaration);
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
						if (checkKeyworkViolation(fieldName)) {
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
		if (checkKeyworkViolation(fieldName)) {
			buffer.append('$');
		}
		buffer.append(fieldName);

		return false;
	}

	public boolean visit(SuperMethodInvocation node) {
		IMethodBinding mBinding = node.resolveMethodBinding();
		String name = getJ2SName(node.getName()) + getJ2SParamQualifier(mBinding);
		buffer.append("cla$$.superClazz.prototype.").append(name).append(".apply(this, arguments)");
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
				 * only need callbacks wrapper in inner classes or anonymous
				 * classes.
				 */
				buffer.append("this.callbacks[\"");
				// Start SwingJS modded 6/9/17- Reverted dollarBuilder etc.
				qualifier.accept(this);
				buffer.append("\"]");
			}
		} else {
			buffer.append("this");
		}
		return false;
	}

	public void endVisit(TypeDeclaration node) {
		if (node != rootTypeNode && node.getParent() != null && (node.getParent() instanceof AbstractTypeDeclaration
				|| node.getParent() instanceof TypeDeclarationStatement)) {
			return;
		}
		if (!node.isInterface()) {
			buffer.append("Clazz.newInstance$ (this, arguments");
			if (!node.resolveBinding().isTopLevel())
				buffer.append("[0], true");
			buffer.append(");\r\n}, ");
		}

		String fullClassName = null;
		String packageName = ((ASTPackageVisitor) getAdaptable(ASTPackageVisitor.class)).getPackageName();
		String className = ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class)).getClassName();
		if (packageName != null && packageName.length() != 0) {
			fullClassName = packageName + '.' + className;
		} else {
			fullClassName = className;
		}

		if (node.isInterface()) {
			boolean needReturn = false;
			for (Iterator<?> iter = node.bodyDeclarations().iterator(); iter.hasNext();) {
				ASTNode element = (ASTNode) iter.next();
				if (element instanceof Initializer) {
					if (getJ2STag((Initializer) element, "@j2sIgnore") != null) {
						continue;
					}
					needReturn = true;
				} else if (element instanceof FieldDeclaration) {
					FieldDeclaration field = (FieldDeclaration) element;
					if (getJ2STag(field, "@j2sIgnore") != null) {
						continue;
					}
					if ((field.getModifiers() & Modifier.STATIC) != 0) {
						needReturn = true;
					} else if (node.isInterface()) {
						List<?> fragments = field.fragments();
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
			int lastIndexOf = fullClassName.lastIndexOf('.');
			if (lastIndexOf != -1) {
				buffer.append(assureQualifiedName(shortenPackageName(fullClassName)));
				buffer.append(", \"" + fullClassName.substring(lastIndexOf + 1) + "\"");
			} else {
				buffer.append("null, \"" + fullClassName + "\"");
			}

		} else {
			int lastIndexOf = fullClassName.lastIndexOf('.');
			if (lastIndexOf != -1) {
				buffer.append(assureQualifiedName(shortenPackageName(fullClassName)));
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
				clazzName = assureQualifiedName(removeJavaLang(clazzName));
				if (clazzName != null && clazzName.length() != 0 && !"Object".equals(clazzName)) {
					buffer.append(clazzName);
					defined = true;
				}
			}
		}
		if (!defined && !node.isInterface()) {
			buffer.append("null");
		}
		buffer.append(", ");

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
		ITypeBinding superclass = null;
		Type superType = node.getSuperclassType();
		if (superType != null) {
			superclass = superType.resolveBinding();
		}
		if (superclass != null) {
			if (superclass != null && !superclass.isTopLevel()) {
				if ((superclass.getModifiers() & Modifier.STATIC) == 0) {
					String name = assureQualifiedName(removeJavaLang(superclass.getQualifiedName()));
					buffer.append(",");
					addInnerTypeInstance(null, name, null, null, null, true, false);
				}
			}
		}
		int len = buffer.length();
		if (", null, null".equals(buffer.substring(len - 12))) {
			buffer.delete(len - 12, len);
		} else if (", null".equals(buffer.substring(len - 6))) {
			buffer.delete(len - 6, len);
		}
		buffer.append(");\r\n");

		StringBuffer laterBufferBackup = laterBuffer;
		laterBuffer = new StringBuffer();
		// Enum is considered as static member!

		List<?> bodyDeclarations = node.bodyDeclarations();
		StringBuffer tmpBuffer = buffer;
		addInitMethod(bodyDeclarations, node.isInterface());

		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof EnumDeclaration) {
				element.accept(this);
			}
		}

		MethodDeclaration[] methods = node.getMethods();
		for (int i = 0; i < methods.length; i++) {
			methods[i].accept(this);
		}

		addDefaultConstructor();

		int staticCount = -1;
		ReferenceASTVisitor refVisitor = new ReferenceASTVisitor();
		/*
		 * Fixing bug#2797539 : Incorrect instantiation of member before inner
		 * class declaration inside interface
		 * http://sourceforge.net/tracker/?func=detail&aid=2797539&group_id=
		 * 155436&atid=795800 Interface's inner classes declaration is not in
		 * the correct order. Fix it by move codes a few lines ahead of member
		 * initialization.
		 */
		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof TypeDeclaration) {
				if (node.isInterface()) {
					/*
					 * Here will create a new visitor to do the Java2Script
					 * process and laterBuffer may be filled with contents.
					 */
					element.accept(this);
				}
			}
		}
		// Interface's inner interfaces or classes
		buffer.append(laterBuffer);

		tmpBuffer = buffer;
		StringBuffer tmpLaterBuffer = laterBuffer;
		buffer = new StringBuffer();
		laterBuffer = new StringBuffer();
		/* Testing class declarations in initializers */
		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof TypeDeclaration) {
				if (node.isInterface()) {
					// the above codes have already dealt those inner classes
					// inside interface
					// just ignore here
					continue;
				}
			} else if (element instanceof Initializer) {
				if (getJ2STag((Initializer) element, "@j2sIgnore") != null) {
					continue;
				}
				if ((((Initializer) element).getModifiers() & Modifier.STATIC) != 0) {
					element.accept(this);
				} else {
					continue; // ignore here
				}
			} else if (element instanceof FieldDeclaration) {
				FieldDeclaration field = (FieldDeclaration) element;
				if (getJ2STag(field, "@j2sIgnore") != null) {
					continue;
				}
				if ((field.getModifiers() & Modifier.STATIC) != 0) {
					List<?> fragments = field.fragments();
					for (int j = 0; j < fragments.size(); j++) {
						VariableDeclarationFragment vdf = (VariableDeclarationFragment) fragments.get(j);
						Expression initializer = vdf.getInitializer();
						if (initializer != null) {
							initializer.accept(this);
						}
					}
				} else if (node.isInterface()) {
					List<?> fragments = field.fragments();
					for (int j = 0; j < fragments.size(); j++) {
						VariableDeclarationFragment vdf = (VariableDeclarationFragment) fragments.get(j);
						Expression initializer = vdf.getInitializer();
						vdf.getName().accept(this);
						if (initializer != null) {
							initializer.accept(this);
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
		// method first
		/*
		 * Fixing bug for such class class A { class B () { } static class C
		 * extends A { } } A.B should be declared before A.C: c$.$A$B$ =
		 * function () ... Clazz.decorateAsClass ( ...
		 */
		buffer.append(laterBufferBackup);

		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof TypeDeclaration) {
				if (node.isInterface()) {
					// the above codes have already dealt those inner classes
					// inside interface
					// just ignore here
					continue;
				}
			} else if (element instanceof Initializer) {
				if (getJ2STag((Initializer) element, "@j2sIgnore") != null) {
					continue;
				}
				if (staticCount != -1) {
					buffer.append(");\r\n");
					staticCount = -1;
				}
				if ((((Initializer) element).getModifiers() & Modifier.STATIC) != 0) {
					element.accept(this);
				} else {
					continue; // ignore here
				}
			} else if (element instanceof FieldDeclaration) {
				FieldDeclaration field = (FieldDeclaration) element;
				if (getJ2STag(field, "@j2sIgnore") != null) {
					continue;
				}
				if ((field.getModifiers() & Modifier.STATIC) != 0) {
					List<?> fragments = field.fragments();
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
							buffer.append("cla$$").append(".");
							vdf.getName().accept(this);
							buffer.append(" = cla$$.prototype.");
							vdf.getName().accept(this);
							buffer.append(" = ");
							initializer.accept(this);
							buffer.append(";\r\n");
							continue;
						}
						staticCount++;
						if (staticCount == 0) {
							buffer.append("Clazz.defineStatics (cla$$");
						}
						buffer.append(",\r\n\"");
						vdf.getName().accept(this);
						buffer.append("\", ");
						Type type = field.getType();
						if (initializer != null) {
							if (type.isPrimitiveType()
									&& ((PrimitiveType) type).getPrimitiveTypeCode() == PrimitiveType.CHAR) {
								ITypeBinding tBinding = initializer.resolveTypeBinding();
								if (tBinding != null && !("char".equals(tBinding.getName()))) {
									buffer.append("String.fromCharCode (");
									initializer.accept(this);
									buffer.append(")");
								} else {
									initializer.accept(this);
								}
							} else {
								initializer.accept(this);
							}
						} else {
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
					}
				} else if (node.isInterface()) {
					List<?> fragments = field.fragments();
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
						Type type = field.getType();
						if (initializer != null) {
							if (type.isPrimitiveType()
									&& ((PrimitiveType) type).getPrimitiveTypeCode() == PrimitiveType.CHAR) {
								ITypeBinding tBinding = initializer.resolveTypeBinding();
								if (tBinding != null && !("char".equals(tBinding.getName()))) {
									buffer.append("String.fromCharCode (");
									initializer.accept(this);
									buffer.append(")");
								} else {
									initializer.accept(this);
								}
							} else {
								initializer.accept(this);
							}
						} else {
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
					}

				}
			}
		}
		if (staticCount != -1) {
			buffer.append(");\r\n");
		}

		String fieldsSerializables = prepareSimpleSerializable(node, bodyDeclarations);
		if (fieldsSerializables.length() > 0) {
			buffer.append("Clazz.registerSerializableFields(cla$$, ");
			buffer.append(fieldsSerializables.toString());
			buffer.append(");\r\n");
		}

		readSources(node, "@j2sSuffix", "\r\n", "\r\n", true);
		laterBuffer = new StringBuffer();
		super.endVisit(node);
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
									if (checkKeyworkViolation(fieldName)) {
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
				visitor = (ASTScriptVisitor) this.getClass().newInstance();
			} catch (Exception e) {
				visitor = new ASTScriptVisitor(); // Default visitor
			}
			visitor.rootTypeNode = node;
			visitor.methodOverloadingSupported = this.methodOverloadingSupported;
			visitor.interfaceCastingSupported = this.interfaceCastingSupported;
			visitor.supportsObjectStaticFields = this.supportsObjectStaticFields;
			visitor.setDebugging(this.isDebugging());
			((ASTVariableVisitor) visitor.getAdaptable(ASTVariableVisitor.class)).setToCompileVariableName(
					((ASTVariableVisitor) this.getAdaptable(ASTVariableVisitor.class)).isToCompileVariableName());
			String className = typeVisitor.getClassName();
			String visitorClassName = null;
			if (node.getParent() instanceof TypeDeclarationStatement) {
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

			if (node.isInterface() || (node.getModifiers() & Modifier.STATIC) != 0
					|| (node.getParent() instanceof TypeDeclaration
							&& ((TypeDeclaration) node.getParent()).isInterface())) {
				String str = visitor.getBuffer().toString();
				laterBuffer.append(str);
			} else {
				/*
				 * Code examples:
				 * 
				 * class CA { class State {} } public class CB extends CA {
				 * CA.State state = new CA.State() { public String toString() {
				 * return "CB.CA.State"; } }; State stt = new State() { public
				 * String toString() { return "State"; }; }; public static void
				 * main(String[] args) { System.out.println(new CB().state);
				 * System.out.println(new CB().stt); } }
				 */
				String targetClassName = visitor.getClassName();
				targetClassName = targetClassName.replace('.', '$');

				buffer.append("if (!");
				buffer.append(visitor.getFullClassName());
				buffer.append(") {\r\n");

				methodBuffer.append("cla$$.$");
				methodBuffer.append(targetClassName);
				methodBuffer.append("$ = function () {\r\n");
				methodBuffer.append(visitor.getBuffer().toString());
				methodBuffer.append("};\r\n");
				String pkgName = visitor.getPackageName();
				if (pkgName != null && pkgName.length() > 0) {
					buffer.append(pkgName);
					buffer.append(".");
				}
				buffer.append(className);
				buffer.append(".$");
				buffer.append(targetClassName);
				buffer.append("$ ();\r\n");
				buffer.append("}\r\n");
			}
			return false;
		}

		if (node.isInterface()) {
			return false;
		}

		// BH: JavaScipt @j2sPrefix/@j2sSuffix adds code before/after a class
		// definition that does not remove anything and needs no {...}
		readSources(node, "@j2sPrefix", "", " ", true);
		buffer.append("var cla$$ = Clazz.decorateAsClass (function () {\r\n");

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

	public boolean visit(TypeLiteral node) {
		// BH: Q: Does this actually work? Example?
		Type type = node.getType();
		if (type.isPrimitiveType()) {
			ITypeBinding resolveBinding = type.resolveBinding();
			String name = resolveBinding.getName();
			if ("boolean".equals(name)) {
				buffer.append("Boolean");
				return false;
			} else { // TODO: More types? Integer, Long, Double, ... ?
				buffer.append("Number");
				return false;
			}
		} else if (type.isArrayType()) {
			buffer.append("Array");
			return false;
		} else {
			ITypeBinding resolveBinding = type.resolveBinding();
			String name = resolveBinding.getName();
			if ("Object".equals(name) || "java.lang.Object".equals(name)) {
				buffer.append("Clazz._O");
				return false;
			}
		}
		type.accept(this);
		return false;
	}

	/////////////////// St.Olaf Additions -- NY ////////////////

	private String getJ2SParamQualifier(IMethodBinding binding) {
		String className = binding.getDeclaringClass().getQualifiedName();
		// TODO this exclusion of java. is only temporary
		if (className.startsWith("java.")) {
			return "";
		}

		StringBuffer sbParams = new StringBuffer();
		ITypeBinding[] paramTypes = binding.getParameterTypes();
		if (paramTypes.length == 0) {
			// sbParams.append("$_");
		}
		int nParams = paramTypes.length;
		for (int i = 0; i < nParams; i++) {
			String name = paramTypes[i].getQualifiedName();
			String arrays = null;
			int pt = name.indexOf("[");
			if (pt >= 0) {
				arrays = name.substring(pt + (name.indexOf("[L") >= 0 ? 1 : 0));
				name = name.substring(0, pt);
			}
			switch (name) {
			case "boolean":
				name = "b";
				break;
			case "byte":
				name = "B";
				break;
			case "short":
				name = "s";
				break;
			case "int":
				name = "I";
				break;
			case "long":
				name = "L";
				break;
			case "float":
				name = "F";
				break;
			case "double":
				name = "D";
				break;
			case "java.lang.String":
				name = "S";
				break;
			default:
				name = name.replace("java.lang.", "").replace('.', '_');

				break;
			}
			sbParams.append("$").append(name);
			if (arrays != null)
				sbParams.append(arrays.replaceAll("\\[\\]", "A"));
		}
		String s = sbParams.toString();
		// exception for special case: setting "main$SA" to "main", and "main" to "main$_"
		if ("main".equals(binding.getName())) {
			if (s.length() == 0) {
				s = "$_";
			} else if (s.equals("$SA")) {
				s = "";
			}
		}
		return s;
	}

	private void addDefaultConstructor() {

		if (!haveDefaultConstructor) {
			buffer.append("\r\nClazz.newMethod$(cla$$, 'construct', function () {"); // was																							// $_
			addSuperConstructor(null, null);
			buffer.append("},true);\r\n");
		}

	}

	public void endVisit(CompilationUnit node) {
		super.endVisit(node);
	}

	private void addAnonymousFunctionWrapper(boolean isOpen) {
		buffer.append(isOpen ? "(function(){" : "})();\r\n");
	}

	private boolean haveDefaultConstructor;

	private void addSuperConstructor(SuperConstructorInvocation node, IMethodBinding methodDeclaration) {
		if (node == null) {
			buffer.append("Clazz.super$(cla$$, this");
		} else {
			buffer.append("cla$$.superClazz.construct").append(getJ2SParamQualifier(node.resolveConstructorBinding())); 
			buffer.append(".apply(this");
			visitMethodParameterList(node.arguments(), methodDeclaration, true, ", [", "]");
		}
		buffer.append(");\r\n");
		addCallInit();
	}

	private void addCallInit() {
		buffer.append("cla$$.$init$.apply(this);\r\n");
	}

}
