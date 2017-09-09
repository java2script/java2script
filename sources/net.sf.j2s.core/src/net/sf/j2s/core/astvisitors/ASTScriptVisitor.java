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
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.jdt.core.dom.AnonymousClassDeclaration;
import org.eclipse.jdt.core.dom.ArrayType;
import org.eclipse.jdt.core.dom.AssertStatement;
import org.eclipse.jdt.core.dom.BodyDeclaration;
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
import org.eclipse.jdt.core.dom.Initializer;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.Name;
import org.eclipse.jdt.core.dom.NullLiteral;
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

// TODO: static calls to static methods do not trigger "musts" dependency

// BH 9/7/2017 -- primitive casting for *=,/=,+=,-=,&=,|=,^=
// BH 9/7/2017 -- primitive numeric casting -- (byte) was ignored so that (byte)  0xFF remained 0xFF.
// BH 9/7/2017 -- fixed multiple issues with char and Character
// BH 9/4/2017 -- java.awt, javax.swing, swingjs code added; additional fixes required
// BH 8/30/2017 -- all i/o working, including printf and FileOutputStream
// BH 8/19/2017 -- String must implement CharSequence, so all .length() -> .length$()
// BH 8/19/2017 -- varargs logic fixed for missing argument
// BH 8/18/2017 -- array instanceof, reflection, componentType fixes
// BH 8/16/2017 -- JSE8-UnionType catch (Exception... | Exception...) {...}
// BH 8/13/2017 -- includes native code calls in System.err
// BH 7/31/2017 -- extensively reworked for fully qualified method names and no SAEM

// DONE: type def, including inner classes and anonymous classes
// DONE: fully encapsulated C$ variable
// DONE: proper <init> processing
// DONE: non-final variables for anonymous class definition
// DONE: array handling in instanceof and reflection
// DONE: String + double/float/Double/Float --> new Double/Float().toString() 
// TODO: Q: Good assumption that generic parameterization can be ignored? put<K,V> vs put<K>? 
/*
 * 

TODO #24 in a file starting with an interface and also including a class, only the class is found.

interface Editable {
    EditInfo getEditInfo(int n);
    void setEditValue(int n, EditInfo ei);
}

class EditDialog extends Dialog implements AdjustmentListener, ActionListener, ItemListener {
...

TODO #16 when an inner public class is called by another class using instanceOf, that inner class becomes an optional load. 
but optional loads must still be loaded, and unless declared in package.js, J2S will look for xxx.xxx.Outer/Inner.js
because the inner classes are not fully declared. 

Solution is to switch to requiring the outer class, not the inner class:

@J2SRequireImport(NumberFormat.class)
@J2SIgnoreImport(NumberFormat.Field.class)
public class NumberFormatter extends InternationalFormatter...



TODO #14 in java.awt.image.Raster, we have a static block that 
creates new Objects. In that case, we need to add the annotation:
      
      @J2SRequireImport({ jsjava.awt.image.SinglePixelPackedSampleModel.class, jssun.awt.image.IntegerInterleavedRaster.class, jssun.awt.image.ByteInterleavedRaster.class })
      
      
TODO #12 Inner classes must not call other inner classes defined after them in a file.
    This showed up in java.awt.geom.Path2D.Float.CopyIterator, which extends
    java.awt.geom.Path2D.Iterator. Since the Iterator is in the code after CopyIterator,
    the reference to java.awt.geom.Path2D.Iterator in
    
    c$ = Clazz.decorateAsClass (function () {
		this.floatCoords = null;
		Clazz.instantialize (this, arguments);
	}, java.awt.geom.Path2D.Float, "CopyIterator", java.awt.geom.Path2D.Iterator);
     
    is null, and then CopyIterator does not extend Iterator.
   
TODO #4 @J2SRequireImport({jsjava.util.PropertyResourceBundle.class})

is required for  public abstract class ResourceBundle because the inner class
ResourceBundle.Control requires it, but for some reason it is not included in the
MUST list in the Clazz.load() call.


 */

/**
 * 
 * @author zhou renjian    2006-12-3
 * @author Bob Hanson    2017-08/2017-09
 *
 *     
 * 
 */
public class ASTScriptVisitor extends ASTJ2SDocVisitor {

	private void setInnerGLobals(ASTScriptVisitor parent, TypeDeclaration node) {
		// TODO: BH: Question as to whether these are all that are needed
		rootTypeNode = node;
		methodOverloadingSupported = parent.methodOverloadingSupported;
		interfaceCastingSupported = parent.interfaceCastingSupported;
//		supportsObjectStaticFields = parent.supportsObjectStaticFields;
		definedPackageNames = parent.definedPackageNames;
		setDebugging(parent.isDebugging());
		// BH abandoning all compiler variable name compressing -- Google Closure Compiler is way better
		//((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).setToCompileVariableName(
			//	((ASTVariableVisitor) parent.getAdaptable(ASTVariableVisitor.class)).isToCompileVariableName());
	}

	/**
	 * default constructor found by visit(MethodDeclaration)
	 */
	boolean haveDefaultConstructor;

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

	private String b$name;

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

	protected String getJ2SName(SimpleName node) {
		return ((ASTJ2SMapVisitor) getAdaptable(ASTJ2SMapVisitor.class)).getJ2SName(node);
	}

	protected String getJ2SName(IVariableBinding binding) {
		return ((ASTJ2SMapVisitor) getAdaptable(ASTJ2SMapVisitor.class)).getJ2SName(binding);
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
		String fullClassName = getNameForBinding(binding);
		int idx = fullClassName.lastIndexOf('.');
		String shortClassName = fullClassName.substring(idx + 1);
		String className = typeVisitor.getClassName();
		buffer.append("(");

		// BH: add the anonymous class definition inline, not as a static,
		// and not requiring finalization of variables
		addAnonymousFunctionWrapper(true);

		// add decorateAsClass
		buffer.append("var C$ = Clazz.decorateAsClass(");
		{
			// arg1 is the package name or null
			buffer.append(idx >= 0 ? assureQualifiedName(shortenPackageName(fullClassName)) : "null");

			// arg2 is the full class name in quotes
			buffer.append(", \"" + fullClassName.substring(idx + 1) + "\"");

			
			// arg3 is the class definition function, C$, which is called in Clazz.$new(). 
			boolean isInnerEnum = !(node.getParent() instanceof EnumConstantDeclaration);
			if (isInnerEnum)
				buffer.append(", function(){Clazz.newInstance$(this, arguments[0], true);}");
			
			// arg4 is the superclass
			// arg5 is the superinterface
			// (only one or the other is ever non-null)
			if (binding.getSuperclass() != null) {
				if (!isInnerEnum)
					buffer.append(", null");
				String superclassName = getSuperclassName(binding);
				if (superclassName == null) {
					// no superclass other than Object
					// look for superInterface
					ITypeBinding[] declaredTypes = binding.getInterfaces();
					if (declaredTypes != null && declaredTypes.length > 0) {
						String superinterfaceName = declaredTypes[0].getQualifiedName();
						if (superinterfaceName != null && superinterfaceName.length() > 0) {
							buffer.append(", null, ");
							buffer.append(assureQualifiedName(removeJavaLang(superinterfaceName)));
						}
					}
				} else {
					// superclass, not superinterface
					buffer.append(", ");
					buffer.append(superclassName);
				}
			}
		}
		// close decorateAsClass
		buffer.append(");\r\n");

		String oldClassName = className;
		typeVisitor.setClassName(shortClassName);
		StaticBuffer oldStaticDefBuffer = staticFieldDefBuffer;
		staticFieldDefBuffer = new StaticBuffer();
		List<?> bodyDeclarations = node.bodyDeclarations();

		addInitMethod(bodyDeclarations);

		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof MethodDeclaration) {
				element.accept(this);
			}
		}

		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			BodyDeclaration element = (BodyDeclaration) iter.next();
			if (element instanceof FieldDeclaration && isStatic(element))
				addStaticFieldFragments((FieldDeclaration) element);
		}

		typeVisitor.setClassName(oldClassName);
		buffer.append(staticFieldDefBuffer);
		staticFieldDefBuffer = oldStaticDefBuffer;

		// close the anonymous function wrapper
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
			if ((element instanceof FieldDeclaration || (element instanceof Initializer) && !isStatic(element))
					&& !checkj2sIgnore(element))
				element.accept(this);
		}
		buffer.append("}, 1);\r\n");
	}

	public boolean visit(AssertStatement node) {
		Expression msg = node.getMessage();
		buffer.append("Clazz.assert(C$, function(){return ");
		node.getExpression().accept(this);
		if (msg != null) {
			buffer.append("}, function(){return ");
			msg.accept(this);
		}
		buffer.append("});\r\n");
		return false;
	}

	public boolean visit(ClassInstanceCreation node) {
		ITypeBinding binding = node.resolveTypeBinding();
		if (binding == null)
			return false;
		AnonymousClassDeclaration anonDeclare = node.getAnonymousClassDeclaration();
		if (anonDeclare != null) {
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
			addInnerTypeInstance(node, name, null, finals, (anonClassName == null ? null : methodDeclaration), false,
					anonClassName);
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
			return false;
		}
		// not anonymous
		if (!binding.isTopLevel() && !isStatic(binding)) {
			// inner nonstatic class
			IMethodBinding constructorBinding = node.resolveConstructorBinding();
			addInnerTypeInstance(node,
					assureQualifiedName(removeJavaLang(binding.isAnonymous() || binding.isLocal()
							? binding.getBinaryName() : binding.getQualifiedName())),
					node.getExpression(), null,
					(constructorBinding == null ? null : constructorBinding.getMethodDeclaration()), false, null);
			return false;
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
			// look out for java.lang.Integer and the like -- just pass it
			// directly
			// Replace new Boolean with Boolean.from because new
			// Boolean("false") returns true in JavaScript.
			// JavaScript considers any string to be true while java only
			// considers the string "true" to be true
			if (fqName.equals("Boolean"))
				buffer.append(" Boolean.from(");
			else
				buffer.append(" new ").append(fqName).append("(");
		} else {
			buffer.append("Clazz.$new(").append(assureQualifiedName(fqName)).append(".construct")
					.append(getJ2SParamQualifier(null, constructorBinding));
			prefix = ",[";
			postfix = "]";
		}
		addMethodParameterList(node.arguments(), methodDeclaration, true, prefix, postfix);
		buffer.append(")");
		return false;
	}

	private String getNameForBinding(ITypeBinding binding) {
		String binaryName = null, bindingKey;
		if ((binding.isAnonymous() || binding.isLocal()) && (binaryName = binding.getBinaryName()) == null
				&& (bindingKey = binding.getKey()) != null)
			binaryName = bindingKey = bindingKey.substring(1, bindingKey.length() - 1).replace('/', '.');
		return assureQualifiedName(removeJavaLang(binaryName == null ? binding.getQualifiedName() : binaryName));
	}

	private void addInnerTypeInstance(ClassInstanceCreation node, String className, Expression outerClassExpr, String finals,
			IMethodBinding methodDeclaration, boolean inheritArgs, String anonName) {		
		buffer.append("Clazz.$new(");
		
			buffer.append((anonName == null ? className : anonName) + (inheritArgs || methodDeclaration == null ? ".$init$" 
					: ".construct" + getJ2SParamQualifier(null, methodDeclaration)));
	
			// add constructor application arguments: [object, parameters]
			buffer.append(", [");
				if (outerClassExpr == null)
					buffer.append("this");
				else
					outerClassExpr.accept(this);
				// add final variable array
				buffer.append(", ").append(finals == null ? "null" : finals);
				
				// add parameters or just Clazz.inheritArgs
				if (inheritArgs) {
					buffer.append(", Clazz.inheritArgs");
				} else if (methodDeclaration != null) {
					List<?> args = node.arguments();
					addMethodParameterList(args, methodDeclaration, true, args.size() > 0 || methodDeclaration.isVarargs() ? ", " : null, null);
				}
			buffer.append("]");
			
			// an anonymous class will be calling a constructor in another class, so we need to indicate
			// its actual call explicitly
			if (anonName != null)
				buffer.append(",").append(className);
			
		buffer.append(")");
	}

	@SuppressWarnings("null")
	protected void addMethodParameterList(List<?> arguments, IMethodBinding methodDeclaration, boolean isConstructor,
			String prefix, String suffix) {
		if (methodDeclaration == null)
			return;
		boolean methodIsVarArgs = methodDeclaration.isVarargs();
		int argCount = arguments.size();
		if (isConstructor && argCount == 0) {
			// We allow use of a default constructor using new foo().
			// Here we always add a [] argument to a default constuctor, as null
			// will indicate
			// that we did not use Clazz.$new and instead called new foo()
			// directly.
			if (prefix != null) {
				buffer.append(prefix);
				prefix = null;
				if (methodIsVarArgs)
					buffer.append("[]");
			}
		} else {
			ITypeBinding[] parameterTypes = methodDeclaration.getParameterTypes();
			ITypeBinding declaringClass = methodDeclaration.getDeclaringClass();
			String clazzName = (declaringClass == null ? null : declaringClass.getQualifiedName());
			String methodName = methodDeclaration.getName();
			String post = ", ";
			int nparam = parameterTypes.length;
			if (prefix != null && (nparam > 0 || methodIsVarArgs)) {
				buffer.append(prefix);
				prefix = null;
			}
			for (int i = 0; i < nparam; i++) {
				ITypeBinding paramType = parameterTypes[i];
				String parameterTypeName = paramType.getName();
				Expression arg = (i < argCount ? (Expression) arguments.get(i) : null);
				if (i == nparam - 1) {
					// BH: can't just check for an array; it has to be an array with the right number of dimensions
					if (nparam != argCount || methodIsVarArgs && paramType.isArray()
							&& arg.resolveTypeBinding().getDimensions() != paramType.getDimensions() 
							&& !(arg instanceof NullLiteral)) {
						buffer.append("[");
						for (int j = i; j < argCount; j++) {
							addMethodArgument((Expression) arguments.get(j), clazzName, methodName, parameterTypeName,
									i);
							if (j != argCount - 1) {
								buffer.append(", ");
							}
						}
						buffer.append("]");
						break;
					}
					post = "";
				}
				addMethodArgument(arg, clazzName, methodName, parameterTypeName, i);
				buffer.append(post);
			}
		}
		if (prefix == null && suffix != null)
			buffer.append(suffix);
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
		addMethodParameterList(arguments, methodDeclaration, true, ", [", "]");
		buffer.append(");\r\n");
	}

	public boolean visit(EnumDeclaration node) {
		ITypeBinding binding = node.resolveBinding();
		ASTTypeVisitor typeVisitor = ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class));
		if (binding != null && binding.isTopLevel()) {
			typeVisitor.setClassName(binding.getName());
		}
		if (isInnerClass(node)) {
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
		buffer.append("var C$ = Clazz.decorateAsClass(");
		
		String packageName = ((ASTPackageVisitor) getAdaptable(ASTPackageVisitor.class)).getPackageName();
		String className = ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class)).getClassName();
		String fullClassName = null;
		if (packageName != null && packageName.length() != 0) {
			fullClassName = packageName + '.' + className;
		} else {
			fullClassName = className;
		}
		ASTNode parent = node.getParent();
		boolean haveParentClass = (parent != null && parent instanceof AbstractTypeDeclaration);
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

		buffer.append(", null");
		return false;
	}

	public void endVisit(EnumDeclaration node) {
		if (isInnerClass(node))
			return;
		buffer.append(", Enum");
		addSuperInterfaces(node.superInterfaceTypes());
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
			if (!isStatic(element))
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
			addMethodParameterList(enumConst.arguments(), binding, true, ", [", "]");
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

	public boolean visit(FieldDeclaration node) {
		if (isStatic(node))
			return false;
		ITypeBinding typeBinding = resolveParentBinding(getXparent(node));
		List<?> fragments = node.fragments();
		for (Iterator<?> iter = fragments.iterator(); iter.hasNext();) {
			VariableDeclarationFragment element = (VariableDeclarationFragment) iter.next();
			String fieldName = getJ2SName(element.getName());
			// String fieldName = element.getName().getIdentifier();
			String prefix = "";
			if (checkKeywordViolation(fieldName, false)) {
				prefix += "$";
			}
			if (typeBinding != null && checkSameName(typeBinding, fieldName)) {
				prefix += "$";
			}
			buffer.append("this.");
			if (isInheritedFieldName(typeBinding, fieldName)) {
				fieldName = getFieldName(typeBinding, fieldName);
			}
			buffer.append(prefix + fieldName);
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

	public boolean visit(Initializer node) {
		if (checkj2sIgnore(node)) {
			return false;
		}
		node.getBody().accept(this);
		buffer.append("\r\n");
		return false;
	}

	protected String[] getFilterMethods() {
		return new String[0];
	}

	public boolean visit(MethodDeclaration node) {

		IMethodBinding mBinding = node.resolveBinding();

		if (mBinding == null || checkj2sIgnore(node)) {
			return false;
		}

		boolean isStatic = isStatic(node);

		if (!checkKeepSpecialClassMethod(node, mBinding, false))
			return false;
		String key = mBinding.getKey();
		if (key != null)
			methodDeclareNameStack.push(key);

		boolean isNative = Modifier.isNative(node.getModifiers());
		if (node.getBody() == null && !isNative) {
			// Abstract method
			return false;
		}

		boolean isConstructor = node.isConstructor();
		String name = (isConstructor ? "construct" : getJ2SName(node.getName())) + getJ2SParamQualifier(null, mBinding);
		if (isConstructor && name.equals("construct") || mBinding.isVarargs() && mBinding.getParameterTypes().length == 1)
			haveDefaultConstructor = true; // in case we are not qualifying names here
		buffer.append("\r\nClazz.newMethod$(C$, '").append(name).append("', function (");
		@SuppressWarnings("unchecked")
		List<ASTNode> parameters = node.parameters();
		visitList(parameters, ", ");
		buffer.append(") ");
		if (isConstructor) {
			// BH @j2sIgnoreSuperConstructor removed from options
			// as it is too risky to do this -- lose all initialization.
			@SuppressWarnings("unchecked")
			List<ASTNode> statements = node.getBody().statements();
			ASTNode firstStatement;
			if (statements.size() == 0 || !((firstStatement = statements.get(0)) instanceof SuperConstructorInvocation)
					&& !(firstStatement instanceof ConstructorInvocation)) {
				buffer.append("{\r\n");
				IMethodBinding binding = node.resolveBinding();
				boolean needSuperClassCall = binding != null && hasSuperClass(binding.getDeclaringClass());
				if (needSuperClassCall) {
					addSuperConstructor(null, null);
				} else {
					addCallInit();
				}
				blockLevel++;
				visitList(statements, "");
				endVisit(node.getBody());
			} else {
				node.getBody().accept(this);
			}
		} else if (node.getBody() == null) {
			// not a constructor and no body -- possibly native or an interface
			blockLevel++;
			if (!checkJ2STags(node, true)) {
				buffer.append("{\r\n");
				if (isNative) {
					buffer.append("// native_code\r\n");
					System.err.println("native: " + key);
				}
				visitNativeJavadoc(node.getJavadoc(), null);
				buffer.append("}\r\n");
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
		String prefix = (needScope ? "{\r\n" : "");
		String suffix = (needScope ? "\r\n}" : "");
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

		boolean isPrivateAndNotStatic = Modifier.isPrivate(mBinding.getModifiers())
				&& !isStatic(mBinding);

		Expression expression = node.getExpression();
		int pt = buffer.length();
		if (expression == null) {
			// "this"
		} else {
			isPrivateAndNotStatic = false;
			expression.accept(this);
			buffer.append(".");
		}
		ITypeBinding cl = mBinding.getDeclaringClass();
		String className = cl.getQualifiedName();
		String methodName = node.getName().getIdentifier();
		String j2sParams = getJ2SParamQualifier(className, mBinding);

		boolean isSpecialMethod = false;
		if (isMethodRegistered(methodName)) {
			String j2sName = translate(className, methodName);
			if (j2sName != null) {
				// Array.newInstance --> Clazz.newArray$
				if (j2sName.startsWith("Clazz.")) {
					buffer.setLength(pt);
					buffer.append(j2sName);
					isSpecialMethod = true;
				} else if (node.arguments().size() == 0 || methodName.equals("split") || methodName.equals("replace")) {
					if (j2sName.startsWith("~")) {
						buffer.append('$');
						buffer.append(j2sName.substring(1));
						isSpecialMethod = true;
					} else {
						buffer.append(j2sName);
						return false;
					}
				}
			}
		}
		
		// record whether this.b$[.....] was used, and if so and it is private, we need to use it again
		b$name = null;
		if (!isSpecialMethod) {
			node.getName().accept(this);
			buffer.append(j2sParams);
		}
		if (isPrivateAndNotStatic) {
			// A call to a private outer-class method from an inner class requires 
			// this.b$["....."], not just "this"
			// There is probably a nicer way to do this...
			buffer.append(".apply(this");
			if (b$name != null)
				buffer.append(b$name);
			buffer.append(", [");
		} else {
			buffer.append("(");			
		}
		addMethodParameterList(node.arguments(), mBinding, false, null, null);
		if (isPrivateAndNotStatic)
			buffer.append("]");
		buffer.append(")");
		return false;
	}

	private boolean addThisOrSyntheticReference(Expression node) {
		/*
		 * only need callbacks wrapper in inner classes or anonymous
		 * classes.
		 */
		buffer.append("this");
		Name qualifier = (node instanceof ThisExpression ? ((ThisExpression) node).getQualifier() : null);
		if (qualifier != null) {
			ASTNode xparent = getXparent(node);
			if (xparent != null && xparent.getParent() != null // CompilationUnit
					&& xparent.getParent().getParent() != null) {
				buffer.append(".b$[\"");
				qualifier.accept(this);
				buffer.append("\"]");
				return false;
			}
		}
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
				ITypeBinding declaringClass = varBinding.getVariableDeclaration().getDeclaringClass();
				String fieldName = getJ2SName(node);
				if (checkSameName(declaringClass, fieldName)) {
					buffer.append('$');
				}
				if (checkKeywordViolation(fieldName, false)) {
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
			String name = removeJavaLang(getJ2SName(node));
			if (checkKeywordViolation(name, true))
				buffer.append('$');
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
			String name = (typeBinding == null ? node.getFullyQualifiedName() : 
				assureQualifiedName(removeJavaLang(typeBinding.getQualifiedName())));
			if (checkKeywordViolation(name, false))
				buffer.append('$');
			buffer.append(name);
		}
		return false;
	}

	private void simpleNameInVarBinding(SimpleName node, char ch, IVariableBinding varBinding) {
		String thisClassName = getClassName();
		if (isStatic(varBinding)) {
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
			if (checkKeywordViolation(fieldName, false)) {
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
					&& Modifier.isFinal(varBinding.getModifiers()) && varBinding.getDeclaringMethod() != null) {
				String key = varBinding.getDeclaringMethod().getKey();
				if (methodDeclareNameStack.size() == 0 || !key.equals(methodDeclareNameStack.peek())) {
					buffer.append("this.$finals.");
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
			String fieldName = (declaringClass != null ? getJ2SName(node)
					: fieldVar == null ? getVariableName(node.getIdentifier())
							: fieldVar);
			if (checkKeywordViolation(fieldName, true))
				buffer.append('$');
			if (declaringClass != null && checkSameName(declaringClass, fieldName))
				buffer.append('$');
			if (declaringClass != null && isInheritedFieldName(declaringClass, fieldName))
				fieldName = getFieldName(declaringClass, fieldName);
			buffer.append(fieldName);
		}
	}

	private void simpleNameInMethodBinding(SimpleName node, char ch, IMethodBinding mthBinding) {
		String thisClassName = getClassName();
		if (isStatic(mthBinding)) {
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
					appendFieldName(parent, declaringClass, Modifier.isPrivate(mthBinding.getModifiers()));
				}
			}
			// String name = node.getFullyQualifiedName();
			String name = getJ2SName(node);
			name = removeJavaLang(name);
			if (!(isClassString && "valueOf".equals(name)) && checkKeywordViolation(name, false)) {
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

		if (!isThis) {
			buffer.append("this");
			buffer.append(b$name = ".b$[\"" + removeJavaLang(name) + "\"]");
			buffer.append(".");
		}
	}

	public boolean visit(SimpleType node) {
		ITypeBinding binding = node.resolveBinding();
		buffer.append(binding == null ? node : assureQualifiedName(removeJavaLang(binding.getQualifiedName())));
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
		ITypeBinding declaringClass = (constructorBinding == null ? null : constructorBinding.getDeclaringClass());
		if (constructorBinding != null && declaringClass != null && !"java.lang.Object".equals(declaringClass.getQualifiedName())) {
			// // BH NEVER NEVER NEVER ignore superconstructor, as it
			// includes an <init> call.
			// ASTNode parent = node.getParent();
			// if (parent instanceof Block) {
			// Block methoBlock = (Block) parent;
			// ASTNode methodParent = methoBlock.getParent();
			// if (methodParent instanceof MethodDeclaration) {
			// MethodDeclaration method = (MethodDeclaration) methodParent;
			// if (getJ2STag(method, "@j2sIgnoreSuperConstructor") != null)
			// {
			// return false;
			// }
			// }
			// }
			addSuperConstructor(node, constructorBinding.getMethodDeclaration());
		} else {
			addCallInit();
		}
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
						if (checkKeywordViolation(fieldName, false)) {
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
		if (checkKeywordViolation(fieldName, false)) {
			buffer.append('$');
		}
		buffer.append(fieldName);

		return false;
	}

	public boolean visit(SuperMethodInvocation node) {
		IMethodBinding mBinding = node.resolveMethodBinding();
		String name = getJ2SName(node.getName()) + getJ2SParamQualifier(null, mBinding);
		// BH if this is a call to super.clone() and there is no superclass, or
		// the superclass is Object,
		// then we need to invoke Clazz.clone(this) directly instead of calling
		// C$.superClazz.clone()
		if ("clone".equals(name) && getSuperclassName(mBinding.getDeclaringClass()) == null) {
			buffer.append("Clazz.clone(this)");
		} else {
			buffer.append("C$.superClazz.prototype." + name + ".apply(this, ");
			buffer.append("[");
			addMethodParameterList(node.arguments(), mBinding, false, null, null);
			buffer.append("])");
		}

		return false;
	}

	public boolean visit(ThisExpression node) {
		addThisOrSyntheticReference(node);
		return false;
	}

	private boolean isInnerClass(ASTNode node) {
		ASTNode parent;
		return (node != rootTypeNode && (parent = node.getParent()) != null
				&& (parent instanceof AbstractTypeDeclaration || parent instanceof TypeDeclarationStatement));
	}

	public boolean visit(TypeDeclaration node) {

		ITypeBinding binding = node.resolveBinding();
		if (binding == null)
			return false;

		boolean isTopLevel = binding.isTopLevel();
		// get full current class name ?
		ASTTypeVisitor typeVisitor = ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class));
		if (isInnerClass(node)) {

			String className = typeVisitor.getClassName();

			ASTScriptVisitor visitor = null;
			try {
				visitor = getClass().newInstance();
			} catch (@SuppressWarnings("unused") Exception e) {
				visitor = new ASTScriptVisitor(); // Default visitor
			}
			visitor.setInnerGLobals(this, node);

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

			if (node.isInterface() || isStatic(node) || (node.getParent() instanceof TypeDeclaration
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
			}
			return false;
		}

		if (isTopLevel) {
			typeVisitor.setClassName(binding.getName());
		}
		
		if (node.isInterface()) {
			if (checkInterfaceHasMethods(node)) {
				addAnonymousFunctionWrapper(true);
				buffer.append("var C$=");
			}
			buffer.append("Clazz.declareInterface(").append(getPackageAndName());
			return false;
		}

		// BH: JavaScipt @j2sPrefix/@j2sSuffix adds code before/after a class
		// definition that does not remove anything and needs no {...}
		addAnonymousFunctionWrapper(true);
		readSources(node, "@j2sPrefix", "", " ", true);

		// add decorateAsClass
		
		buffer.append("var C$ = Clazz.decorateAsClass(").append(getPackageAndName());

		List<?> bodyDeclarations = node.bodyDeclarations();
		boolean hasInnerClasses = false;
		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			if (iter.next() instanceof TypeDeclaration) {
				hasInnerClasses = true;
				break;
			}
		}
		
		// add class object function or null if standard
		
		if (isTopLevel && !hasInnerClasses) {
			buffer.append(", null");
			return false;
		}
		
		buffer.append(", function(){\r\n");

		// add all inner classes iteratively

		if (hasInnerClasses) {
			for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
				ASTNode element = (ASTNode) iter.next();
				if (element instanceof TypeDeclaration) {
					element.accept(this);
				}
			}
		}
		// continue with Clazz.decorateAsClass...
		// add the newInstance$ call, which:
		// (a) adds .valueOf() = function() {return this} for Number
		// subclasses
		// (b) sets objThis.__JSID__ to a unique number
		// (c) handles inner class final variables
		// (d) includes a call to construct() when called directly by the
		// user using new Foo()
		buffer.append("Clazz.newInstance$(this, arguments");
		if (!isTopLevel)
			buffer.append("[0], " + !isStatic(binding));
		buffer.append(");\r\n");
		buffer.append("}"); // end of Clazz.decorateAsClass(){};
		return false;
	}

	private String getPackageAndName() {
		String packageName = ((ASTPackageVisitor) getAdaptable(ASTPackageVisitor.class)).getPackageName();
		String className = ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class)).getClassName();
		String fullClassName = (packageName == null || packageName.length() == 0 ? className
				: packageName + '.' + className);
		int lastIndexOf = fullClassName.lastIndexOf('.');
		return (lastIndexOf >= 0 ? assureQualifiedName(shortenPackageName(fullClassName)) : "null")
			+ ", \"" + fullClassName.substring(lastIndexOf + 1) + "\"";
	}

	public void endVisit(TypeDeclaration node) {
		ITypeBinding binding = node.resolveBinding();
		if (binding == null || isInnerClass(node))
			return;
		boolean isInterface = node.isInterface();
		boolean hasWrapper = !isInterface || checkInterfaceHasMethods(node);
		
		// Add superclass or null
		
		if (!isInterface) {
			buffer.append(", ").append("" + getSuperclassName(node.resolveBinding()));
		}
		
		// Add superinterfaces
		
		boolean haveSuperInterface = addSuperInterfaces(node.superInterfaceTypes());

		// check for in-line anonymous inner class def
		
		Type superClassType = (isInterface ? null : node.getSuperclassType());
		if (superClassType != null) {
			if (!haveSuperInterface)
				buffer.append(", null");
			ITypeBinding superclass = superClassType.resolveBinding();
			if (superclass != null && !superclass.isTopLevel() && !isStatic(superclass)) {
				String name = assureQualifiedName(removeJavaLang(superclass.getQualifiedName()));
				buffer.append(",");
				addInnerTypeInstance(null, name, null, null, null, true, null);
			}
		}

		// remove excessive null parameters
		
		int pt;
		while (", null".equals(buffer.substring(pt = buffer.length() - 6)))
			buffer.setLength(pt);
		buffer.append(");\r\n");// done with declare...

		List<?> bodyDeclarations = node.bodyDeclarations();

		// hold onto static defs

		StaticBuffer staticDefBackup = staticFieldDefBuffer;
		staticFieldDefBuffer = new StaticBuffer();

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

		// Check for type declarations in interfaces

		if (isInterface) {
			// This will create a new visitor.
			// Static field buffer may be filled with contents.
			for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
				ASTNode element = (ASTNode) iter.next();
				if (element instanceof TypeDeclaration)
					element.accept(this);
			}
		} else {
			addDefaultConstructor();
		}

		// add any recently defined static field definitions
		
		buffer.append(staticFieldDefBuffer);

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
					buffer.append("]);\r\n");
					staticCount = -1;
				}
				if (isStatic(element)) {
					element.accept(this);
				}
			} else if (element instanceof FieldDeclaration) {
				FieldDeclaration field = (FieldDeclaration) element;
				if (!isStatic(element) || checkj2sIgnore(field))
					continue;
//				ReferenceASTVisitor refVisitor = new ReferenceASTVisitor();
				List<?> fragments = field.fragments();
				for (int j = 0; j < fragments.size(); j++) {
					VariableDeclarationFragment vdf = (VariableDeclarationFragment) fragments.get(j);
					if ("serialVersionUID".equals(vdf.getName().getIdentifier())) {
						continue;
					}
//					if (++staticCount == 0) {
						buffer.append("Clazz.defineStatics$ (C$, [");
//					} else {
//						buffer.append(",\r\n");
//					}
					buffer.append("\"");
					vdf.getName().accept(this);
					buffer.append("\",");
					Type fieldType = field.getType();
					Expression initializer = vdf.getInitializer();
					appendInitializer(initializer, fieldType);
					buffer.append("]);\r\n");
				}
			}
		}
		if (staticCount != -1) {
			buffer.append("\r\n]);\r\n");
		}

		String fieldsSerializables = prepareSimpleSerializable(node, bodyDeclarations);
		if (fieldsSerializables.length() > 0) {
			buffer.append("Clazz.registerSerializableFields(C$, ");
			buffer.append(fieldsSerializables.toString());
			buffer.append(");\r\n");
		}

		readSources(node, "@j2sSuffix", "\r\n", "\r\n", true);
		if (hasWrapper)
			addAnonymousFunctionWrapper(false);
		staticFieldDefBuffer = new StaticBuffer();
		super.endVisit(node);
	}

	private boolean addSuperInterfaces(List<?> superInterfaces) {
		int size = superInterfaces.size();
		if (size == 0)
			return false;
		buffer.append(", ");
		String term = "";
		if (size > 1) {
			buffer.append("[");
			term = "]";
		}
		String sep = "";
		for (Iterator<?> iter = superInterfaces.iterator(); iter.hasNext();) {
			buffer.append(sep);
			ASTNode element = (ASTNode) iter.next();
			ITypeBinding binding = ((Type) element).resolveBinding();
			if (binding == null) {
				buffer.append(element);
			} else {
				String clazzName = binding.getQualifiedName();
				clazzName = assureQualifiedName(removeJavaLang(clazzName));
				buffer.append(clazzName);
			}
			sep = ", ";
		}
		buffer.append(term);
		return true;
	}

	/**
	 * return the superclass name, provided it is not Object or ""
	 * 
	 * @param typeBinding
	 * @return superclass name or null 
	 */
	private String getSuperclassName(ITypeBinding typeBinding) {
		if (typeBinding != null) {
			ITypeBinding superclass = typeBinding.getSuperclass();
			if (superclass != null) {
				String clazzName = superclass.getQualifiedName();
				clazzName = assureQualifiedName(removeJavaLang(clazzName));
				if (clazzName != null && clazzName.length() != 0 && !"Object".equals(clazzName)) 
					return clazzName;
			}
		}
		return null;
	}

	private boolean checkInterfaceHasMethods(TypeDeclaration node) {
		for (Iterator<?> iter = node.bodyDeclarations().iterator(); iter.hasNext();) {
			BodyDeclaration element = (BodyDeclaration) iter.next();
			if ((element instanceof Initializer
					|| element instanceof FieldDeclaration
							&& (isStatic(element) || ((FieldDeclaration) element).fragments().size() > 0)
					|| element instanceof MethodDeclaration && isStatic(element)
				) && !checkj2sIgnore(element))
				return true;
		}
		return false;
	}
		
	public boolean visit(TypeLiteral node) {
		// Class x = Foo.class
		Type type = node.getType();
		ITypeBinding binding = type.resolveBinding();
		if (type.isPrimitiveType()) {
			// adds Integer.TYPE, Float.TYPE, etc.
			buffer.append(getPrimitiveTYPE(binding.getName()));
		} else if (type instanceof ArrayType) {
			buffer.append(j2sGetArrayClass(binding, 1));
		} else {
			// BH we are creating a new Class object around this class
			buffer.append("Clazz.$newClass(" + Bindings.removeBrackets(binding.getQualifiedName()) + ")");
		}
		return false;
	}

	/////////////////// St.Olaf Additions -- NY ////////////////

	private void addAnonymousFunctionWrapper(boolean isOpen) {
		buffer.append(isOpen ? (buffer.lastIndexOf(")") >= buffer.length() - 3 ? ";" : "")
				+ "\r\n(function(){" : "})()\r\n");
	}

	private void addDefaultConstructor() {
		// if there is no Foo() or Foo(xxx... array) 
		// then we need to provide our own constructor
		if (haveDefaultConstructor) {
			haveDefaultConstructor = false;
		} else {
			buffer.append("\r\nClazz.newMethod$(C$, 'construct', function(){");
				addSuperConstructor(null, null);
			buffer.append("}, 1);\r\n");
		}
	}

	private void addSuperConstructor(SuperConstructorInvocation node, IMethodBinding methodDeclaration) {
		if (node == null) {
			buffer.append("Clazz.super$(C$, this");
		} else {
			buffer.append("C$.superClazz.construct").append(getJ2SParamQualifier(null, node.resolveConstructorBinding())); 
			buffer.append(".apply(this");
			addMethodParameterList(node.arguments(), methodDeclaration, true, ", [", "]");
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
	 * @param type
	 * @param dimFlag  -1 : initialized depth; n > 0 uninitialized depth as Clazz.arrayClass$; 0: not necessary 
	 * @return JavaScript for array creation
	 */
    static String j2sGetArrayClass(ITypeBinding type, int dimFlag) {
    	ITypeBinding ebinding = type.getElementType();
    	String params = (ebinding.isPrimitive() ? getPrimitiveTYPE(ebinding.getName()) : Bindings.removeBrackets(ebinding.getQualifiedName())) 
    			+ (dimFlag == 0 ? "" : ", " + dimFlag * type.getDimensions());
		return (dimFlag > 0 ? "Clazz.arrayClass$(" + params + ")" 
				: " Clazz.newArray$(" + params);
	}

	public void setPackageNames(HashSet<String> definedPackageNames) {
		this.definedPackageNames = definedPackageNames;
	}

	protected static boolean isStatic(BodyDeclaration b) {
		return Modifier.isStatic(b.getModifiers());
	}



}
