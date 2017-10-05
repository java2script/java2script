/*******************************************************************************
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * 
://www.eclipse.org/legal/epl-v10.html
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
import org.eclipse.jdt.core.dom.AssertStatement;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.BodyDeclaration;
import org.eclipse.jdt.core.dom.BreakStatement;
import org.eclipse.jdt.core.dom.CatchClause;
import org.eclipse.jdt.core.dom.ClassInstanceCreation;
import org.eclipse.jdt.core.dom.ConstructorInvocation;
import org.eclipse.jdt.core.dom.ContinueStatement;
import org.eclipse.jdt.core.dom.DoStatement;
import org.eclipse.jdt.core.dom.EmptyStatement;
import org.eclipse.jdt.core.dom.EnhancedForStatement;
import org.eclipse.jdt.core.dom.EnumConstantDeclaration;
import org.eclipse.jdt.core.dom.EnumDeclaration;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.ExpressionStatement;
import org.eclipse.jdt.core.dom.FieldDeclaration;
import org.eclipse.jdt.core.dom.ForStatement;
import org.eclipse.jdt.core.dom.IBinding;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IVariableBinding;
import org.eclipse.jdt.core.dom.IfStatement;
import org.eclipse.jdt.core.dom.ImportDeclaration;
import org.eclipse.jdt.core.dom.Initializer;
import org.eclipse.jdt.core.dom.LabeledStatement;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.Name;
import org.eclipse.jdt.core.dom.PackageDeclaration;
import org.eclipse.jdt.core.dom.ReturnStatement;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.SingleVariableDeclaration;
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
import org.eclipse.jdt.core.dom.UnionType;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;
import org.eclipse.jdt.core.dom.VariableDeclarationStatement;
import org.eclipse.jdt.core.dom.WhileStatement;

import net.sf.j2s.core.adapters.FinalVariable;
import net.sf.j2s.core.adapters.J2SMapAdapter;
import net.sf.j2s.core.adapters.MethodAdapter;
import net.sf.j2s.core.adapters.TypeAdapter;
import net.sf.j2s.core.adapters.VariableAdapter;

// TODO: static calls to static methods do not trigger "musts" dependency

// BH 9/10/2017 -- adds full byte, short, and int distinction using class-level local fields $b$, $s$, and $i$, which are IntXArray[1]. (See ASTKeywordVisitor)
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

	private void setInnerGlobals(ASTScriptVisitor parent, ASTNode node, String visitorClassName) {
		innerTypeNode = node;
		setPackageName(parent.getPackageName());
		setClassName(visitorClassName);

		methodOverloadingSupported = parent.methodOverloadingSupported;
		interfaceCastingSupported = parent.interfaceCastingSupported;
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

	protected boolean methodOverloadingSupported = true;

	protected boolean interfaceCastingSupported = false;

	protected ASTNode innerTypeNode;

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

	public boolean visit(PackageDeclaration node) {
		String name = node.getName().toString();
		setPackageName(name);
		buffer.append("var P$=");
		if (isBasePackage()) {
			buffer.append(name);
		} else {
			buffer.append("Clazz.declarePackage(\"").append(name).append("\")");
		}
		buffer.append(",I$=[];\r\n");
		return false;
	}

	/**
	 * ignore all Imports
	 * 
	 */
	public boolean visit(ImportDeclaration node) {
		return false;
	}

	public boolean visit(AnonymousClassDeclaration node) {
		buffer.append("(");
		TypeAdapter typeAdapter = ((TypeAdapter) getAdaptable(TypeAdapter.class));
		ITypeBinding binding = node.resolveBinding();
		String fullClassName = getNameForBinding(binding);
		int pt = fullClassName.lastIndexOf('.');
		String shortClassName = fullClassName.substring(pt + 1);
		String packageAndName = (pt >= 0 ? TypeAdapter.getShortenedPackageNameFromClassName(thisPackageName, fullClassName)
				: "null") + ", \"" + shortClassName + "\"";


		addEnumOrClass(node, binding, false, false, true, packageAndName);
				
		String oldClassName = typeAdapter.getClassName();
		typeAdapter.setClassName(shortClassName);
		StaticBuffer oldStaticDefBuffer = staticFieldDefBuffer;
		staticFieldDefBuffer = new StaticBuffer();
		
		List<?> bodyDeclarations = node.bodyDeclarations();
		addFieldPreparationAndInit(bodyDeclarations, false);

		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof MethodDeclaration) {
				element.accept(this);
			}
		}
		
		typeAdapter.setClassName(oldClassName);
		buffer.append(staticFieldDefBuffer);
		staticFieldDefBuffer = oldStaticDefBuffer;

		// close the anonymous function wrapper
		addAnonymousFunctionWrapper(false);
		buffer.append(")");

		return false;
	}

	public boolean visit(AssertStatement node) {

		buffer.append("Clazz.assert(C$, this, function(){return ");
		addExpressionAsTargetType(node.getExpression(), Boolean.TYPE, "r", null);
		Expression msg = node.getMessage();
		if (msg != null) {
			buffer.append("}, function(){return ");
			msg.accept(this);
		}
		buffer.append("});\r\n");
		staticFieldDefBuffer.hasAssert = true;
		return false;
	}

	public boolean visit(Block node) {
		blockLevel++;
		buffer.append("{\r\n");
		return super.visit(node);
	}
	
	public void endVisit(Block node) {
		buffer.append("}");
		clearVariables(getVariableList('f'));
		clearVariables(getVariableList('n'));
		blockLevel--;
		super.endVisit(node);
	}

	public boolean visit(BreakStatement node) {

		buffer.append("break");
		SimpleName label = node.getLabel();
		if (label != null) {
			buffer.append(' ');
			label.accept(this);
		}
		buffer.append(";\r\n");
		return false;
	}

	public boolean visit(ClassInstanceCreation node) {
		ITypeBinding binding = node.resolveTypeBinding();
		if (binding == null)
			return false;
		AnonymousClassDeclaration anonDeclare = node.getAnonymousClassDeclaration();
		if (anonDeclare != null) {
			String anonClassName = getNameForBinding(binding);
			buffer.append("(");
			VariableAdapter variableAdapter = (VariableAdapter) getAdaptable(VariableAdapter.class);
			variableAdapter.isFinalSensible = true;
			int lastCurrentBlock = currentBlockForVisit;
			List<FinalVariable> finalVars = variableAdapter.finalVars;
			List<FinalVariable> visitedVars = variableAdapter.visitedVars;
			List<FinalVariable> normalVars = variableAdapter.normalVars;
			List<FinalVariable> lastVisitedVars = visitedVars;
			List<FinalVariable> lastNormalVars = normalVars;
			currentBlockForVisit = blockLevel;
			visitedVars = variableAdapter.visitedVars = new ArrayList<FinalVariable>();
			variableAdapter.normalVars = new ArrayList<FinalVariable>();
			methodDeclareNameStack.push(binding.getKey());
			anonDeclare.accept(this);
			methodDeclareNameStack.pop();
			buffer.append(", ");

			variableAdapter.normalVars = lastNormalVars;
			String finals = listFinalVariables(visitedVars, ", ",
					methodDeclareNameStack.size() == 0 ? null : (String) methodDeclareNameStack.peek());
			IMethodBinding constructorBinding = node.resolveConstructorBinding();
			IMethodBinding methodDeclaration = (constructorBinding == null ? null
					: constructorBinding.getMethodDeclaration());
			String superclassName = getShortenedQualifiedName(getSuperClass(binding));
			addInnerTypeInstance(node, anonClassName, null, finals, (superclassName == null ? null : methodDeclaration), superclassName);
			if (lastCurrentBlock != -1) {
				/* add the visited variables into last visited variables */
				for (int j = 0; j < visitedVars.size(); j++) {
					FinalVariable fv = visitedVars.get(j);
					int size = finalVars.size();
					for (int i = 0; i < size; i++) {
						FinalVariable vv = finalVars.get(size - i - 1);
						if (vv.variableName.equals(fv.variableName) && vv.blockLevel <= lastCurrentBlock
								&& !lastVisitedVars.contains(vv)) {
							lastVisitedVars.add(vv);
						}
					}
				}
			}
			variableAdapter.visitedVars = lastVisitedVars;
			currentBlockForVisit = lastCurrentBlock;
			buffer.append(")"); // end of line (..., ...)
			return false;
		}
		// not anonymous
		if (!binding.isTopLevel() && !isStatic(binding)) {
			// inner nonstatic class
			IMethodBinding constructorBinding = node.resolveConstructorBinding();
			addInnerTypeInstance(node,
					fixName(binding.isAnonymous() || binding.isLocal()
							? binding.getBinaryName() : binding.getQualifiedName()),
					node.getExpression(), null,
					(constructorBinding == null ? null : constructorBinding.getMethodDeclaration()), null);
			return false;
		}
		String prefix = null, postfix = null;
		IMethodBinding methodDeclaration = null;
		IMethodBinding constructorBinding = node.resolveConstructorBinding();
		String className = TypeAdapter.getTypeStringName(node.getType());
		String fqName = getShortenedQualifiedName(className);
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
			open$new(className, ".construct" + getJ2SParamQualifier(null, constructorBinding));
			prefix = ",[";
			postfix = "]";
		}
		addMethodParameterList(node.arguments(), methodDeclaration, true, prefix, postfix);
		buffer.append(")");
		return false;
	}

	public boolean visit(ConstructorInvocation node) {

		IMethodBinding constructorBinding = node.resolveConstructorBinding();
		List<?> arguments = node.arguments();
		String qualifiedParams = getJ2SParamQualifier(null, constructorBinding);
		buffer.append("C$.construct").append(qualifiedParams).append(".apply(this");
		IMethodBinding methodDeclaration = (constructorBinding == null ? null
				: constructorBinding.getMethodDeclaration());
		addMethodParameterList(arguments, methodDeclaration, true, ", [", "]");
		buffer.append(");\r\n");
		return false;
	}

	public boolean visit(ContinueStatement node) {

		buffer.append("continue");
		SimpleName label = node.getLabel();
		if (label != null) {
			buffer.append(' ');
			label.accept(this);
		}
		buffer.append(";\r\n");
		return false;
	}

	public boolean visit(DoStatement node) {

		buffer.append("do ");
		node.getBody().accept(this);
		buffer.append(" while (");
		node.getExpression().accept(this);
		buffer.append(");\r\n");
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
		buffer.append(", $");
		buffer.append(varName);
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
			buffer.append(".hasNext () && ((");
			buffer.append(varName);
			buffer.append(" = $");
			buffer.append(varName);
			buffer.append(".next ()) || true);");
		}
		buffer.append(") ");
		node.getBody().accept(this);
		buffer.append("\r\n");
		return false;
	}

	public boolean visit(EnumDeclaration node) {
		return addEnumOrClass(node, node.resolveBinding(), true, false, false, null);
	}

	public void endVisit(EnumDeclaration node) {
		if (isInnerClassInit(node))
			return;

		
		buffer.append(staticFieldDefBuffer);

		List<?> bodyDeclarations = node.bodyDeclarations();

		addClinit(bodyDeclarations, false);
		addFieldPreparationAndInit(bodyDeclarations, false);


		for (Iterator<?> it = bodyDeclarations.listIterator(); it.hasNext();) {
			BodyDeclaration decl = (BodyDeclaration) it.next();
			if (decl instanceof MethodDeclaration)
				decl.accept(this);
		}

		buffer.append(staticFieldDefBuffer.getAssertString());

		addDefaultConstructor();

		// add constants
		
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
			buffer.append("Clazz.$newEnumConst(vals, C$.construct").append(getJ2SParamQualifier(null, binding))
					.append(", \"");
			enumConst.getName().accept(this);
			buffer.append("\", " + i);
			addMethodParameterList(enumConst.arguments(), binding, true, ", [", "]");
			if (anonName != null)
				buffer.append(", ").append(anonName);
			buffer.append(");\r\n");
		}
		buffer.append("Clazz.newMethod$(C$, 'values', function() { return vals }, 1);\r\n");
		// this next just ensures we have the valueOf() method in Enum if it is
		// not already there.
		buffer.append("Clazz.newMethod$(Enum, 'valueOf$Class$S', function(cl, name) { return cl[name] }, 1);\r\n");
		
		readSources(node, "@j2sSuffix", "\r\n", "\r\n", true, false);
		addAnonymousFunctionWrapper(false);
		super.endVisit(node);
	}

//	private void addEnumAnonStatics(List<?> bodyDeclarations, boolean isEnum) {
//		// TODO: THIS IS NOT CORRECT!!! Need clinit
//		buffer.append("\r\n//<<enumanonstatics:\r\n");
//		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
//			BodyDeclaration element = (BodyDeclaration) iter.next();
//			if (!isStatic(element))
//				continue;
//			if (isEnum && element instanceof Initializer)
//				element.accept(this);
//			else if (element instanceof FieldDeclaration)
//				addStaticFieldFragments((FieldDeclaration) element);
//		}
//		buffer.append("\r\n//:enumanonstatics>>\r\n");
//	}
//
	public boolean visit(EnumConstantDeclaration node) {

		buffer.append("this.");
		node.getName().accept(this);
		buffer.append(" = ");
		node.getName().accept(this);
		buffer.append(";\r\n");
		return super.visit(node);
	}

	public boolean visit(ExpressionStatement node) {
		// e.g. test.Test_Anon.main(args);
		return super.visit(node);
	}

	public void endVisit(ExpressionStatement node) {
		buffer.append(";\r\n");
		super.endVisit(node);
	}

	public boolean visit(FieldDeclaration node) {
		addFieldDeclaration(node, false);
		return false;
	}

	/**
	 * 
	 * @param node
	 * @param isStatic
	 *            if true, then this is a static field default preparation
	 */
	private void addFieldDeclaration(FieldDeclaration node, boolean isStatic) {
		ITypeBinding classBinding = resolveParentBinding(getClassDeclarationFor(node));
		List<?> fragments = node.fragments();
		VariableDeclarationFragment identifier = (VariableDeclarationFragment) fragments.get(0);
		IVariableBinding var = identifier.resolveBinding();
		Type nodeType = (var != null && var.getType().isArray() ? null : node.getType());
		boolean isFinal = isStatic && isFinal(node);

		for (Iterator<?> iter = fragments.iterator(); iter.hasNext();) {
			VariableDeclarationFragment fragment = (VariableDeclarationFragment) iter.next();
			Expression initializer = fragment.getInitializer();
			String constantValue = getConstantValue(initializer); 
			if (isFinal && constantValue != null)
				continue;
			String fieldName = getJ2SName(fragment.getName());
			// String fieldName = fragment.getName().getIdentifier();
			String prefix = "";
			if (checkKeywordViolation(fieldName, false)) {
				prefix += "$";
			}
			if (classBinding != null && J2SMapAdapter.checkSameName(classBinding, fieldName)) {
				prefix += "$";
			}
			buffer.append(isStatic ? "C$." : "this.");
			if (isInheritedFieldName(classBinding, fieldName)) {
				fieldName = getFieldName(classBinding, fieldName);
			}
			buffer.append(prefix + fieldName);
			buffer.append(" = ");
			if (isStatic || initializer == null) {
				appendDefaultValue(nodeType);
			}else if (constantValue != null) {
				buffer.append(constantValue);
			} else {
				initializer.accept(this);
			}
			buffer.append(";\r\n");
		}
	}

	@SuppressWarnings("unchecked")
	public boolean visit(ForStatement node) {

		buffer.append("for (");
		visitList(node.initializers(), ", ");
		buffer.append("; ");
		Expression expression = node.getExpression();
		if (expression != null) {
			expression.accept(this);
		}
		buffer.append("; ");
		visitList(node.updaters(), ", ");
		buffer.append(") ");
		node.getBody().accept(this);
		buffer.append("\r\n");
		return false;
	}

	public boolean visit(IfStatement node) {

		buffer.append("if (");
		/**
		 * Boolean x = Boolean.FALSE;
		 * 
		 * if( x ){
		 * 
		 * } should converted to if(x.booleanValue()){
		 * 
		 * }
		 */
		boxingNode(node.getExpression(), false);
		buffer.append(") ");
		node.getThenStatement().accept(this);
		if (node.getElseStatement() != null) {
			buffer.append(" else ");
			node.getElseStatement().accept(this);
		}
		return false;
	}

	public boolean visit(Initializer node) {
		if (checkj2sIgnore(node))
			return false;
		node.getBody().accept(this);
		buffer.append("\r\n");
		return false;
	}

	public boolean visit(LabeledStatement node) {

		buffer.append(node.getLabel());
		buffer.append(" : ");
		node.getBody().accept(this);
		return false;
	}

	public boolean visit(MethodDeclaration node) {

		IMethodBinding mBinding = node.resolveBinding();

		if (mBinding == null || checkj2sIgnore(node) || !checkKeepSpecialClassMethod(node, mBinding, false))
			return false;
		String key = mBinding.getKey();
		if (key != null)
			methodDeclareNameStack.push(key);

		boolean isStatic = isStatic(node);
		boolean isNative = Modifier.isNative(node.getModifiers());

		if (node.getBody() == null && !isNative) {
			// Abstract method
			return false;
		}

		boolean isConstructor = node.isConstructor();
		String name = (isConstructor ? "construct" : getJ2SName(node.getName())) + getJ2SParamQualifier(null, mBinding);
		if (isConstructor && name.equals("construct")
				|| mBinding.isVarargs() && mBinding.getParameterTypes().length == 1)
			haveDefaultConstructor = true; // in case we are not qualifying
											// names here
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
				String superclassName = (binding == null ? null : getSuperClass(binding.getDeclaringClass()));
				if (superclassName == null)
					addCallInit();
				else
					addSuperConstructor(null, null);
				blockLevel++;
				visitList(statements, "");
				endVisit(node.getBody());
			} else {
				node.getBody().accept(this);
			}
		} else if (node.getBody() == null) {
			// not a constructor and no body -- possibly native or an
			// interface
			// BH: why this? blockLevel++;
			buffer.append("{\r\n");
			if (isNative) {
				buffer.append("alert('native method must be replaced! " + key + "');\r\n");
				log("native: " + key);
			}
			// didn't we just find out that there was nothing to do?
			// addNativeJavadoc(node.getJavadoc(), null);
			buffer.append("}\r\n");
			// clearVariables(getVariableList('n'));
			// blockLevel--;
		} else {
			node.getBody().accept(this);
		}
		if (isStatic || isConstructor)
			buffer.append(", ").append(isNative ? 2 : 1);
		buffer.append(");\r\n");
		return false;
	}

	public void endVisit(MethodDeclaration node) {
		if (checkj2sIgnore(node))
			return;
		IMethodBinding mBinding = node.resolveBinding();
		if (!checkKeepSpecialClassMethod(node, mBinding, false)) {
			return;
		}

		if (mBinding != null) {
			methodDeclareNameStack.pop();
		}

		List<FinalVariable> finalVars = getVariableList('f');
		List<FinalVariable> visitedVars = getVariableList('v');
		List<FinalVariable> normalVars = getVariableList('n');
		@SuppressWarnings("unchecked")
		List<SingleVariableDeclaration> parameters = node.parameters();
		IMethodBinding resolveBinding = node.resolveBinding();
		String methodSig = (resolveBinding == null ? null : resolveBinding.getKey());
		for (int i = parameters.size() - 1; i >= 0; i--) {
			SingleVariableDeclaration varDecl = parameters.get(i);
			SimpleName name = varDecl.getName();
			IBinding binding = name.resolveBinding();
			if (binding != null) {
				String identifier = name.getIdentifier();
				FinalVariable f = new FinalVariable(blockLevel + 1, identifier, methodSig);
				f.toVariableName = getIndexedVarName(identifier, normalVars.size());
				normalVars.remove(f);
				if (Modifier.isFinal(binding.getModifiers())) {
					finalVars.remove(f);
				}
				visitedVars.remove(f);
			}
		}
		super.endVisit(node);
	}

	public boolean visit(MethodInvocation node) {
		IMethodBinding mBinding = node.resolveMethodBinding();
		String className = mBinding.getDeclaringClass().getQualifiedName();
		boolean isStatic = isStatic(mBinding);
		boolean isPrivate = Modifier.isPrivate(mBinding.getModifiers());
		boolean isPrivateAndNotStatic = isPrivate && !isStatic;
		Expression expression = node.getExpression();
		int pt = buffer.length();
		if (expression == null) {
			// "this"
		} else {
			isPrivateAndNotStatic = false;
			if (expression instanceof SimpleName) {
				appendQualifiedStaticName((SimpleName) expression, className, isStatic && !isPrivate, true);
			} else {
				expression.accept(this);
			}
			buffer.append(".");
		}
		String j2sParams = getJ2SParamQualifier(className, mBinding);

		boolean isSpecialMethod = false;
		String methodName = node.getName().getIdentifier();
		if (MethodAdapter.isMethodRegistered(methodName)) {
			String j2sName = MethodAdapter.translate(className, methodName);
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

		// record whether this.b$[.....] was used, and if so and it is private,
		// we need to use it again
		b$name = null;
		if (!isSpecialMethod) {
			node.getName().accept(this);
			buffer.append(j2sParams);
		}
		if (isPrivateAndNotStatic) {
			// A call to a private outer-class method from an inner class
			// requires
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

	public boolean visit(ReturnStatement node) {

		buffer.append("return");
		Expression expression = node.getExpression();
		if (expression == null)
			return false;
		buffer.append(' ');
		ASTNode parent = node.getParent();
		while (parent != null && !(parent instanceof MethodDeclaration)) {
			parent = parent.getParent();
		}
		IMethodBinding mBinding = (parent == null ? null : ((MethodDeclaration) parent).resolveBinding());
		ITypeBinding retType = (mBinding == null ? null : mBinding.getReturnType());
		addExpressionAsTargetType(expression, retType, "r", null);
		return false;
	}

	public void endVisit(ReturnStatement node) {
		buffer.append(";\r\n");
		super.endVisit(node);
	}

	public boolean visit(SingleVariableDeclaration node) {

		SimpleName name = node.getName();
		IBinding binding = name.resolveBinding();
		if (binding != null) {
			String identifier = name.getIdentifier();
			FinalVariable f = null;
			if (methodDeclareNameStack.size() == 0) {
				f = new FinalVariable(blockLevel + 1, identifier, null);
			} else {
				String methodSig = methodDeclareNameStack.peek();
				f = new FinalVariable(blockLevel + 1, identifier, methodSig);
			}
			addVariable(f, identifier, binding);
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

		ITypeBinding classBinding = resolveParentBinding(getClassDeclarationFor(node));
		String fieldName = getJ2SName(node.getName());
		if (isInheritedFieldName(classBinding, fieldName)) {
			if (classBinding != null) {
				IVariableBinding[] declaredFields = classBinding.getDeclaredFields();
				for (int i = 0; i < declaredFields.length; i++) {
					String superFieldName = getJ2SName(declaredFields[i]);
					if (fieldName.equals(superFieldName)) {
						buffer.append("this.");
						if (checkKeywordViolation(fieldName, false)) {
							buffer.append('$');
						}
						fieldName = getFieldName(classBinding.getSuperclass(), fieldName);
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

	@SuppressWarnings("unchecked")
	public boolean visit(SwitchStatement node) {

		buffer.append("switch (");
		addNonCharacter(node.getExpression());
		buffer.append(") {\r\n");
		visitList(node.statements(), "");
		buffer.append("}\r\n");
		return false;
	}

	public boolean visit(SwitchCase node) {

		if (node.isDefault()) {
			buffer.append("default");
		} else {
			buffer.append("case ");
			addNonCharacter(node.getExpression());
		}
		buffer.append(":\r\n");
		return false;
	}

	public boolean visit(SynchronizedStatement node) {

		// not implemented in JS, as there is only one thread
		node.getBody().accept(this);
		return false;
	}

	public boolean visit(ThisExpression node) {

		addThisOrSyntheticReference(node);
		return false;
	}

	public boolean visit(ThrowStatement node) {

		buffer.append("throw ");
		node.getExpression().accept(this);
		buffer.append(";\r\n");
		return false;
	}

	@SuppressWarnings("unchecked")
	public boolean visit(TryStatement node) {

		buffer.append("try ");
		node.getBody().accept(this);
		List<CatchClause> catchClauses = node.catchClauses();
		int size = catchClauses.size();
		if (size > 0) {
			String catchEName = "e$$";
			if (size == 1) {
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
					String typeName = type.toString();
					if ("Throwable".equals(typeName) || "java.lang.Throwable".equals(typeName)) {
						endedWithThrowable = true;
					} else {
						if (!scopeAdded) {
							buffer.append("{\r\n");
							scopeAdded = true;
						}
						buffer.append(haveType ? " || " : "if (");
						buffer.append("Clazz.exceptionOf(" + catchEName + ", ");
						type.accept(this);
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
					buffer.append("{\r\nvar " + eName + " = " + catchEName + ";\r\n");
					notEName = true;
				}
				element.getBody().accept(this);
				if (notEName) {
					buffer.append("\r\n}");
				}
				if (iter.hasNext()) {
					buffer.append(" else ");
				}
			}
			if (!endedWithThrowable) {
				buffer.append(" else {\r\nthrow " + catchEName + ";\r\n}");
			}
			if (scopeAdded) {
				buffer.append("\r\n}");
			}
		}
		Block finallys = node.getFinally();
		if (finallys != null) {
			buffer.append(" finally ");
			finallys.accept(this);
		}
		buffer.append("\r\n");
		return false;
	}

	/**
	 * A class or interface is being declared.
	 * 
	 */
	public boolean visit(TypeDeclaration node) {
		return addEnumOrClass(node, node.resolveBinding(), false, node.isInterface(), false, null);
	}

	/**
	 * Class declaration is complete; C$ is known. Time to add all the fields
	 * and methods. Outer classes only, as inner classes have already been taken
	 * care of.
	 * 
	 */
	public void endVisit(TypeDeclaration node) {

		ITypeBinding binding = node.resolveBinding();
		if (binding == null || isInnerClassInit(node))
			return;
		boolean isInterface = node.isInterface();

		
		List<?> bodyDeclarations = node.bodyDeclarations();

		addClinit(bodyDeclarations, isInterface);
		addFieldPreparationAndInit(bodyDeclarations, isInterface);


		// hold onto static defs

		StaticBuffer staticDefBackup = staticFieldDefBuffer;
		staticFieldDefBuffer = new StaticBuffer();

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

		readSources(node, "@j2sSuffix", "\r\n", "\r\n", true, false);
		if (!isInterface || checkInterfaceHasMethods(node.bodyDeclarations()))
			addAnonymousFunctionWrapper(false);
		staticFieldDefBuffer = new StaticBuffer();
		super.endVisit(node);
	}

	public boolean visit(VariableDeclarationStatement node) {

		@SuppressWarnings("unchecked")
		List<ASTNode> fragments = node.fragments();
		for (Iterator<ASTNode> iter = fragments.iterator(); iter.hasNext();) {
			buffer.append("var ");
			iter.next().accept(this);
			buffer.append(";\r\n");
		}
		return false;
	}

	public boolean visit(WhileStatement node) {

		buffer.append("while (");
		node.getExpression().accept(this);
		buffer.append(")");
		node.getBody().accept(this);
		buffer.append("\r\n");
		return false;
	}

	
	////////// END visit/endVisit ///////////
	
	
	private static final String noConstructorNames = "Boolean,Byte,Short,Integer,Long,Float,Double";

	private void addAnonymousFunctionWrapper(boolean isOpen) {
		buffer.append(isOpen ? (buffer.lastIndexOf(")") >= buffer.length() - 3 ? ";" : "")
				+ "\r\n(function(){var C$=" : "})()\r\n");
	}

	/**
	 * The call to C$.$init$ is made in two cases:
	 * 
	 * a) just after a super() call
	 * 
	 * b) as the first statement in a constructor that does not call super() (because the superclass is Object)
	 * 
	 * It is never called when the first statement is this(...).
	 * 
	 */
	private void addCallInit() {
		buffer.append("C$.$init$.apply(this);\r\n");
	}

	/**
	 * Add the $clinit$ class initializer.
	 * 
	 * @param bodyDeclarations
	 * @param isInterface
	 */
	private void addClinit(List<?> bodyDeclarations, boolean isInterface) {
		List<BodyDeclaration> lst = new ArrayList<BodyDeclaration>();
		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			BodyDeclaration element = (BodyDeclaration) iter.next();
			boolean isField = element instanceof FieldDeclaration;
			
			// All static fields that have initializers must be (re)initialized, 
			// even if they are their default values. This is because
			// they might have been modified by other actions between the 
			// time they were initially initialized and when $clinit$ is run. 
			
			if (isField || element instanceof Initializer) {
				if ((isInterface || isStatic(element)) && !checkj2sIgnore(element)) {					
					lst.add(element);
				}
			}
		}
		if (lst.size() > 0) {
			int len = buffer.length();
			buffer.append("\r\nC$.$clinit$ = function() {delete C$.$clinit$;\r\n");
			for (int i = lst.size(); --i >= 0;) {
				BodyDeclaration element = lst.remove(0);
				if (element instanceof Initializer) {
					element.accept(this);
				} else {
					FieldDeclaration field = (FieldDeclaration) element;
					List<?> fragments = field.fragments();
					for (int j = 0; j < fragments.size(); j++) {
						VariableDeclarationFragment fragment = (VariableDeclarationFragment) fragments.get(j);
						Expression initializer = fragment.getInitializer();
						if (initializer == null)
							continue;
						len = 0;
						buffer.append("C$.");
						fragment.getName().accept(this);
						buffer.append(" = ");
						appendStaticFieldValue(initializer, field.getType());
						buffer.append(";\r\n");
					}
				}
			}
			if (len == 0)
				buffer.append("}\r\n");
			else
				buffer.setLength(len);
		}
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

	private boolean addEnumOrClass(ASTNode node, ITypeBinding binding, boolean isEnum, boolean isInterface,
			boolean isAnonymous, String packageAndName) {

		if (binding == null)
			return false;

		TypeAdapter typeAdapter = (TypeAdapter) getAdaptable(TypeAdapter.class);

		// arg1 is the package name or null
		// arg2 is the full class name in quotes
		// arg3 is the class definition function, C$, which is called in
		// Clazz.$new().
		// arg4 is the superclass
		// arg5 is the superinterface(s)

		if (!isAnonymous && isInnerClassInit(node)) {
			ASTScriptVisitor tempVisitor = getTempVisitor(node, binding, typeAdapter);
			String innerClassJS = tempVisitor.getBuffer().toString();
			staticFieldDefBuffer.append(innerClassJS);
			return false;
		}
		boolean isTopLevel = binding.isTopLevel();
		if (isTopLevel)
			typeAdapter.setClassName(binding.getName());
		List<?> bodyDeclarations = (isAnonymous ? null : ((AbstractTypeDeclaration) node).bodyDeclarations());
		if (!isInterface || checkInterfaceHasMethods(bodyDeclarations))
			addAnonymousFunctionWrapper(true);
		if (packageAndName == null)
			packageAndName = getPackageAndName();
		buffer.append(isInterface ? "Clazz.declareInterface(" : "Clazz.decorateAsClass(").append(packageAndName)
				.append(", ");

		// set up func, superclass, and superInterface

		String func = "null";
		String superclassName = null;
		ITypeBinding superInterface = null;
		List<?> superInterfaceTypes = null;

		if (isAnonymous) {
			if (!(node.getParent() instanceof EnumConstantDeclaration))
				func = "function(){Clazz.newInstance$(this, arguments[0], true);}";
			superclassName = "" + getSuperclassName(binding);
			ITypeBinding[] declaredTypes = binding.getInterfaces();
			superInterface = (declaredTypes == null || declaredTypes.length == 0 ? null : declaredTypes[0]);
		} else if (isEnum) {
			superclassName = "Enum";
			superInterfaceTypes = ((EnumDeclaration) node).superInterfaceTypes();
		} else {
			List<BodyDeclaration> innerClasses = new ArrayList<BodyDeclaration>();
			for (@SuppressWarnings("null")
			Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
				BodyDeclaration bd = (BodyDeclaration) iter.next();
				if (bd instanceof TypeDeclaration) {
					innerClasses.add(bd);
				}
			}
			if (!isTopLevel || !innerClasses.isEmpty()) {
				func = null;
				buffer.append("function(){\r\n");

				// add all inner classes iteratively

				for (int i = 0; i < innerClasses.size(); i++)
					innerClasses.get(i).accept(this);

				// continue with Clazz.decorateAsClass...
				// add the newInstance$ call, which:
				// (a) adds .valueOf() = function() {return this} for Number
				// subclasses
				// (b) sets objThis.__JSID__ to a unique number
				// (c) handles inner class final variables
				// (d) includes a call to construct() when called directly by
				// the
				// user using new Foo()
				buffer.append("Clazz.newInstance$(this, arguments");
				if (!isTopLevel)
					buffer.append("[0], " + !isStatic(binding));
				buffer.append(");\r\n");
				buffer.append("}");
			}
			superclassName = "" + getSuperclassName(binding);
			superInterfaceTypes = ((TypeDeclaration) node).superInterfaceTypes();
		}

		// Add class function

		if (func != null)
			buffer.append(func);

		// Add superclass or null

		buffer.append(", ");
		if (isAnonymous)
			appendQualifiedStaticName(null, superclassName, true, false);
		else
			buffer.append(superclassName); // taken care of by loading

		// Add superinterfaces

		if (superInterface != null) {
			buffer.append(", ");
			appendQualifiedStaticName(null, superInterface.getQualifiedName(), true, false);
		} else if (superInterfaceTypes != null) {
			int size = superInterfaceTypes.size();
			if (size < 0) {
				buffer.append(", ");
				String term = "";
				if (size > 1) {
					buffer.append("[");
					term = "]";
				}
				String sep = "";
				for (Iterator<?> iter = superInterfaceTypes.iterator(); iter.hasNext();) {
					buffer.append(sep);
					ASTNode element = (ASTNode) iter.next();
					ITypeBinding sbinding = ((Type) element).resolveBinding();
					buffer.append(sbinding == null ? element : fixName(sbinding.getQualifiedName()));
					sep = ", ";
				}
				buffer.append(term);
			}
		}

		// check for in-line anonymous inner class def

		// if (superclassType != null) {
		// if (!haveSuperInterface)
		// buffer.append(", null");
		// // TODO: removed -- what was it? Not used?
		// // superclass instance. But why?
		//// ITypeBinding superclass = superclassType.resolveBinding();
		// // if (superclass != null && !superclass.isTopLevel() &&
		// !isStatic(superclass)) {
		// // buffer.append(",");
		// // addInnerTypeInstance(null, fixName(superclass.getQualifiedName()),
		// null, null, null, true, null);
		// //}
		// }

		// remove excessive null parameters

		int pt;
		while (", null".equals(buffer.substring(pt = buffer.length() - 6)))
			buffer.setLength(pt);
		
		buffer.append("),p$=C$.prototype;\r\n");
		return false;
	}

	
	/**
	 * Generate the static $init$ method, which is called from constructors
	 * just after any superclass constructor call.
	 * @param bodyDeclarations
	 */
	private void addFieldPreparationAndInit(List<?> bodyDeclarations, boolean isInterface) {
		prepareStaticFields(bodyDeclarations, isInterface);
		if (isInterface)
			return;
		buffer.append("\r\nClazz.newMethod$(C$, '$init$', function () {\r\n");
		// we include all field definitions here and all nonstatic initializers
		// Q: Why don't we have to check for static fields?
		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			BodyDeclaration element = (BodyDeclaration) iter.next();
			if ((element instanceof FieldDeclaration || element instanceof Initializer) && !isStatic(element)
					&& !checkj2sIgnore(element))
				element.accept(this);
		}
		buffer.append("}, 1);\r\n");
	}

	private void addInnerTypeInstance(ClassInstanceCreation node, String innerName, Expression outerClassExpr,
			String finals, IMethodBinding methodDeclaration, String superAnonName) {
		open$new(superAnonName == null ? innerName : superAnonName, 
				methodDeclaration == null ? ".$init$"
				: ".construct" + getJ2SParamQualifier(null, methodDeclaration));

		// add constructor application arguments: [object, parameters]
		buffer.append(", [");
		if (outerClassExpr == null)
			buffer.append("this");
		else
			outerClassExpr.accept(this);
		// add final variable array
		buffer.append(", ").append(finals == null ? "null" : finals);

		// add parameters or just Clazz.inheritArgs
		if (methodDeclaration != null) {
			List<?> args = node.arguments();
			addMethodParameterList(args, methodDeclaration, true,
					args.size() > 0 || methodDeclaration.isVarargs() ? ", " : null, null);
		}
		buffer.append("]");

		// an anonymous class will be calling a constructor in another class, so
		// we need to indicate
		// its actual call explicitly
		if (superAnonName != null)
			buffer.append(",").append(innerName);

		buffer.append(")");
	}

	/**
	 * Start a new Clazz.$new() call. Uses Clazz.static$ for dynamic loading
	 * 
	 * @param className
	 * @param methodName
	 */
	private void open$new(String className, String methodName) {
		buffer.append("Clazz.$new(");
		appendShortenedQualifiedName(thisPackageName, className, true, true);
		buffer.append(methodName);
	}

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
			int nparam = parameterTypes.length;
			if (prefix != null && (nparam > 0 || methodIsVarArgs)) {
				buffer.append(prefix);
				prefix = null;
			}
			addMethodArguments(parameterTypes, methodIsVarArgs, arguments);
		}
		if (prefix == null && suffix != null)
			buffer.append(suffix);
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

	private boolean addThisOrSyntheticReference(Expression node) {
		/*
		 * only need callbacks wrapper in inner classes or anonymous
		 * classes.
		 */
		buffer.append("this");
		Name qualifier = (node instanceof ThisExpression ? ((ThisExpression) node).getQualifier() : null);
		if (qualifier != null) {
			ASTNode classNode = getClassDeclarationFor(node);
			if (classNode != null && classNode.getParent() != null // CompilationUnit
					&& classNode.getParent().getParent() != null) {
				buffer.append(".b$[\"");
				qualifier.accept(this);
				buffer.append("\"]");
				return false;
			}
		}
		return false;
	}

	private boolean checkInterfaceHasMethods(List<?> nodes) {
		for (Iterator<?> iter = nodes.iterator(); iter.hasNext();) {
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

	private void clearVariables(List<FinalVariable> vars) {
		for (int i = vars.size(); --i >= 0;) {
			FinalVariable var = vars.get(i);
			if (var.blockLevel >= blockLevel) {
				vars.remove(i);
			}
		}
	}

	private ASTNode getClassDeclarationFor(ASTNode node) {
		ASTNode parent = node.getParent();
		while (parent != null && !(parent instanceof AbstractTypeDeclaration)
				&& !(parent instanceof AnonymousClassDeclaration)) {
			parent = parent.getParent();
		}
		return parent;
	}

	private String getNameForBinding(ITypeBinding binding) {
		String binaryName = null, bindingKey;
		if ((binding.isAnonymous() || binding.isLocal()) && (binaryName = binding.getBinaryName()) == null
				&& (bindingKey = binding.getKey()) != null)
			binaryName = bindingKey = bindingKey.substring(1, bindingKey.length() - 1).replace('/', '.');
		return fixName(binaryName == null ? binding.getQualifiedName() : binaryName);
	}
		
	private String getPackageAndName() {
		String fullClassName = getFullClassName();
		int pt = fullClassName.lastIndexOf('.');
		return (pt < 0 ? getPackageName() : TypeAdapter.getShortenedPackageNameFromClassName(thisPackageName, fullClassName))
			+ ", \"" + fullClassName.substring(pt + 1) + "\"";
	}

	private String getSuperClass(ITypeBinding declaringClass) {
		ITypeBinding superclass = declaringClass.getSuperclass();
		String qualifiedName = (superclass == null ? null : removeBrackets(superclass.getQualifiedName()));
		return (superclass == null || "java.lang.Object".equals(qualifiedName) || "java.lang.Enum".equals(qualifiedName) ? null : qualifiedName);
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
				String clazzName = fixNameNoC$(null, superclass.getQualifiedName());
				if (clazzName != null && clazzName.length() != 0 && !"Object".equals(clazzName)) 
					return clazzName;
			}
		}
		return null;
	}

	private ASTScriptVisitor getTempVisitor(ASTNode node, ITypeBinding binding, TypeAdapter typeAdapter) {
		String className;
		if (node.getParent() instanceof TypeDeclarationStatement) {
			String anonClassName = fixName(binding.isAnonymous() || binding.isLocal()
					? binding.getBinaryName() : binding.getQualifiedName());
			className = anonClassName.substring(anonClassName.lastIndexOf('.') + 1);
		} else {
			className = typeAdapter.getClassName() + "." + binding.getName();
		}

		ASTScriptVisitor tempVisitor;
		try {
			tempVisitor = this.getClass().newInstance();
		} catch (@SuppressWarnings("unused") Exception e) {
			tempVisitor = new ASTScriptVisitor(); // Default visitor
		}
		tempVisitor.setInnerGlobals(this, node, className);
		node.accept(tempVisitor);
		return tempVisitor;
	}

	private boolean isInnerClassInit(ASTNode node) {
		ASTNode parent;
		return (node != innerTypeNode && (parent = node.getParent()) != null
				&& (parent instanceof AbstractTypeDeclaration || parent instanceof TypeDeclarationStatement));
	}

	/**
	 * log to syserr -- may be subclassed
	 * 
	 * @param msg
	 */
	protected void log(String msg) {
		System.err.println(msg);
	}

	private void prepareStaticFields(List<?> bodyDeclarations, boolean isInterface) {
		buffer.append("\r\n");
		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			BodyDeclaration element = (BodyDeclaration) iter.next();
			if (element instanceof FieldDeclaration && (isInterface || isStatic(element)
					&& !checkj2sIgnore(element))) {
				addFieldDeclaration((FieldDeclaration) element, true);
			}
		}
	}

	private ITypeBinding resolveParentBinding(ASTNode xparent) {
		return (xparent instanceof AbstractTypeDeclaration ? ((AbstractTypeDeclaration) xparent).resolveBinding()
				: xparent instanceof AnonymousClassDeclaration ? ((AnonymousClassDeclaration) xparent).resolveBinding()
						: null);
	}

}
