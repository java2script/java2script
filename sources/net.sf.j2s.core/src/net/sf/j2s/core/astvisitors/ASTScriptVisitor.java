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
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
 * @author zhou renjian 2006-12-3
 * @author Bob Hanson 2017-08,09,10
 *
 * 
 * 
 */
public class ASTScriptVisitor extends ASTJ2SDocVisitor {

	private void setInnerGlobals(ASTScriptVisitor parent, ASTNode node, String visitorClassName) {
		innerTypeNode = node;
//		parent.buffer.append("<<new inner " + visitorClassName + " " + node.hashCode() + ">>");
		setPackageName(parent.getPackageName());
		setClassName(visitorClassName);

		methodOverloadingSupported = parent.methodOverloadingSupported;
		interfaceCastingSupported = parent.interfaceCastingSupported;
		definedPackageNames = parent.definedPackageNames;
		allowExtensions = parent.allowExtensions;
		htStaticNames = parent.htStaticNames;
		staticCount = parent.staticCount;

		
		setDebugging(parent.isDebugging());
		// BH abandoning all compiler variable name compressing -- Google
		// Closure Compiler is way better
		// ((ASTVariableVisitor)
		// getAdaptable(ASTVariableVisitor.class)).setToCompileVariableName(
		// ((ASTVariableVisitor)
		// parent.getAdaptable(ASTVariableVisitor.class)).isToCompileVariableName());
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
			buffer.append("Clazz.newPackage$(\"").append(name).append("\")");
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
		return addClassOrInterface(node, node.resolveBinding(), node.bodyDeclarations(), 'a');
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
		staticBuffer.hasAssert = true;
		return false;
	}

	public boolean visit(Block node) {
		blockLevel++;
		buffer.append("{\r\n");
		return super.visit(node); // ASTJ2SDocVisitor
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
			variableAdapter.isAnonymousClass = true;
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
			addInnerTypeInstance(node, anonClassName, null, finals, (superclassName == null ? null : methodDeclaration),
					superclassName);
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
					(binding.isAnonymous() || binding.isLocal() ? binding.getBinaryName()
							: binding.getQualifiedName()),
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
		boolean isDefault = false;
		if ("String".equals(fqName)) {
			// special treatment for String -- see j2sSwingJS.js
			buffer.append(" String.instantialize(");
		} else if ("Object".equals(fqName)) {
			// For discussion, please visit
			// http://groups.google.com/group/java2script/browse_thread/thread/3d6deb9c3c0a0cda
			buffer.append(" new Clazz._O("); // BH removing window.JavaObject
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
			open$new(className, ".c$" + getJ2SParamQualifier(null, constructorBinding));
			isDefault = node.arguments().isEmpty();
			prefix = ",[";
			postfix = "]";
		}
		if (!isDefault)
			addMethodParameterList(node.arguments(), methodDeclaration, true, prefix, postfix);
		buffer.append(")");
		return false;
	}

	public boolean visit(ConstructorInvocation node) {
		IMethodBinding constructorBinding = node.resolveConstructorBinding();
		List<?> arguments = node.arguments();
		String qualifiedParams = getJ2SParamQualifier(null, constructorBinding);
		buffer.append("C$.c$").append(qualifiedParams).append(".apply(this");
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
		return addClassOrInterface(node, node.resolveBinding(), node.bodyDeclarations(), 'e');
	}

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

	/**
	 * {....}
	 * 
	 */
	public boolean visit(Initializer node) {
		if (checkj2sIgnore(node))
			return false;
		node.getBody().accept(this);
		buffer.append("\r\n");
		return false;
	}

	/**
	 * out: while.... 
	 * 
	 */
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
		String name = (isConstructor ? "c$" : getJ2SName(node.getName())) + getJ2SParamQualifier(null, mBinding);
		if (isConstructor && name.equals("c$")
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
				getQualifiedStaticName((SimpleName) expression, className, isStatic && !isPrivate, true, true);
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
		String term = ")";
		if (isPrivateAndNotStatic) {
			// A call to a private outer-class method from an inner class
			// requires
			// this.b$["....."], not just "this"
			// There is probably a nicer way to do this...
			buffer.append(".apply(this");
			if (b$name != null)
				buffer.append(b$name);
			buffer.append(", [");
			term = "])";
		} else {
			buffer.append("(");
		}
		addMethodParameterList(node.arguments(), mBinding, false, null, null);
		buffer.append(term);
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
		if (constructorBinding != null && declaringClass != null
				&& !"java.lang.Object".equals(declaringClass.getQualifiedName())) {
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
		Name qualifier = node.getQualifier();
		if (qualifier != null) {
			ASTNode classNode = getClassDeclarationFor(node);
			if (classNode != null && classNode.getParent() != null // CompilationUnit
					&& classNode.getParent().getParent() != null) {
				appendSyntheticReference(node.resolveTypeBinding().getQualifiedName());
				return false;
			}
		}
		buffer.append("this");
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
		return addClassOrInterface(node, node.resolveBinding(), node.bodyDeclarations(), node.isInterface() ? 'i' : 'c');
	}
	
	/**
	 * <pre>
	 * VariableDeclarationStatement:
	 *    { ExtendedModifier } Type VariableDeclarationFragment
	 *        { <b>,</b> VariableDeclarationFragment } <b>;</b>
	 * </pre>
	 */
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

	private static final String ELEMENT_KEY = "__@J2S_ELEMENT__";

	private void addAnonymousFunctionWrapper(boolean isOpen) {
		buffer.append(isOpen ? (buffer.lastIndexOf(")") >= buffer.length() - 3 ? ";" : "") + "\r\n(function(){"
				: "})()\r\n");
	}

	/**
	 * The call to C$.$init$ from a constructor is made in two cases:
	 * 
	 * a) as the second statement in a constructor, when the first line is a super(...) call
	 * 
	 * b) as the first statement in a constructor that does not call super(...) or this(...)
	 * (because the superclass is Object)
	 * 
	 * Note that it is not called when the first statement is this(...).
	 * 
	 */
	private void addCallInit() {
		buffer.append("C$.$init$.apply(this);\r\n");
	}

	/**
	 * Add Clazz.newInterface$(...) or Clazz.newClass$(...) for all classes and
	 * interfaces, including Enum and anonymous.
	 * 
	 * If this is an inner class, then iterate, just adding its definition to
	 * the current staticBuffer;
	 * 
	 * @param node
	 * @param binding
	 * @param BodyDeclarations
	 * @param type
	 *            'a' (anonymous class), 'e' (Enum), 'i' (Interface), or 'c'
	 *            (standard class)
	 * @return false
	 */
	private boolean addClassOrInterface(ASTNode node, ITypeBinding binding, List<?> bodyDeclarations, char type) {
		if (binding == null)
			return false;

		boolean isAnonymous = (type == 'a');
		boolean isEnum = (type == 'e');
		boolean isInterface = (type == 'i');

		TypeAdapter typeAdapter = ((TypeAdapter) getAdaptable(TypeAdapter.class));
		ASTNode parent = node.getParent();
		// buffer.append(">>" + binding.getName() + (innerTypeNode != null) +
		// (node == innerTypeNode) + " " + node.hashCode() + (innerTypeNode ==
		// null ? "null" : " " + innerTypeNode.hashCode()) + ">>");
		if (isAnonymous) {
			buffer.append("(");
		} else if (node != innerTypeNode
				&& (parent instanceof AbstractTypeDeclaration || parent instanceof TypeDeclarationStatement)) {
			// if this is an inner class, we use a temporary visitor to put its
			// definition in the static buffer and return
			String className;
			if (parent instanceof TypeDeclarationStatement) {
				String anonClassName = fixName(binding.isAnonymous() || binding.isLocal() ? binding.getBinaryName()
						: binding.getQualifiedName());
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
			// buffer.append(">>" + className + ">>");
			node.accept(tempVisitor);
			// buffer.append(">>creating static buffer for " + className +
			// "<<");
			// staticBuffer.append(">>static>>");
			staticBuffer.append(tempVisitor.getBuffer().toString());
			// staticBuffer.append("<<static<<");
			// buffer.append(">>exiting<<");
			return false;
		}
		boolean isTopLevel = binding.isTopLevel();
		if (isTopLevel) {
			typeAdapter.setClassName(binding.getName());
			buffer.append(ELEMENT_KEY + binding.getName() + "\r\n");
		}

		// add the anonymous wrapper if needed

		if (!isTopLevel)
			addAnonymousFunctionWrapper(true);
		
		// begin the class or interface definition

		buffer.append("var C$=" + (isInterface ? "Clazz.newInterface$(" : "Clazz.newClass$("));

		// arg1 is the package name
		// arg2 is the full class name in quotes
		// arg3 is the class definition function, C$, which is called in
		// Clazz.new().
		// arg4 is the superclass
		// arg5 is the superinterface(s)

		// arg1: package name or null
		// arg2: full class name in quotes

		String packageAndName, oldClassName = null, shortClassName = null;
		if (isAnonymous) {
			oldClassName = typeAdapter.getClassName();
			String fullClassName = getNameForBinding(binding);
			int pt = fullClassName.lastIndexOf('.');
			shortClassName = fullClassName.substring(pt + 1);
			packageAndName = (pt >= 0 ? TypeAdapter.getShortenedPackageNameFromClassName(thisPackageName, fullClassName)
					: "null") + ", \"" + shortClassName + "\"";
		} else {
			packageAndName = getPackageAndName();
		}

		buffer.append(packageAndName).append(", ");

		// set up func, superclass, and superInterface

		String func = "null";
		String superclassName = null;
		ITypeBinding superInterface = null;
		List<?> superInterfaceTypes = null;

		// arg3: class definition function, C$, or null to add the standard
		// function at run time

		boolean hasDependents = false;
		if (isAnonymous) {
			if (!(parent instanceof EnumConstantDeclaration))
				func = "function(){Clazz.newInstance$(this, arguments[0], true);}";
			superclassName = "" + getSuperclassName(binding);
			ITypeBinding[] declaredTypes = binding.getInterfaces();
			superInterface = (declaredTypes == null || declaredTypes.length == 0 ? null : declaredTypes[0]);
		} else if (isEnum) {
			hasDependents = true;
			superclassName = "Enum";
			superInterfaceTypes = ((EnumDeclaration) node).superInterfaceTypes();
		} else {
			List<BodyDeclaration> innerClasses = new ArrayList<BodyDeclaration>();
			for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
				BodyDeclaration bd = (BodyDeclaration) iter.next();
				if (bd instanceof TypeDeclaration) {
					innerClasses.add(bd);
				}
			}
			if (!isTopLevel || !innerClasses.isEmpty()) {
				func = null;
				buffer.append("function(){\r\n");

				// add all inner classes iteratively

				if (!isInterface)
					for (int i = 0; i < innerClasses.size(); i++)
						innerClasses.get(i).accept(this);

				// continue with Clazz.decorateAsClass...
				// add the newInstance$ call, which:
				// (a) adds .valueOf() = function() {return this} for Number
				// subclasses
				// (b) sets objThis.__JSID__ to a unique number
				// (c) handles inner class final variables
				// (d) includes a call to the constructor c$() when called
				// directly by the
				// user using new Foo()
				if (!isInterface) {
					buffer.append("Clazz.newInstance$(this, arguments");
					if (!isTopLevel)
						buffer.append("[0], " + !isStatic(binding));
					buffer.append(");\r\n");
				}
				buffer.append("}");
			}
			superclassName = "" + getSuperclassName(binding);
			superInterfaceTypes = ((TypeDeclaration) node).superInterfaceTypes();
		}

		if (func != null)
			buffer.append(func);

		// arg4: superclass or null

		buffer.append(", ");

		if (superclassName.equals("null")) {
			buffer.append("null");
		} else {
			hasDependents = true;
			if (isAnonymous)
				getQualifiedStaticName(null, superclassName, true, false, true);
			else
				buffer.append("'" + superclassName + "'"); // taken care of by
															// loading
		}

		// arg5: superinterface(s) if not null

		if (superInterface != null) {
			hasDependents = true;
			buffer.append(", '");
			buffer.append(fixNameNoC$(null, superInterface.getQualifiedName()));
			buffer.append("'");
		} else if (superInterfaceTypes != null) {
			int size = superInterfaceTypes.size();
			if (size > 0) {
				hasDependents = true;
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
					buffer.append("'");
					buffer.append(sbinding == null ? element : fixNameNoC$(null, sbinding.getQualifiedName()));
					buffer.append("'");
					sep = ", ";
				}
				buffer.append(term);
			}
		}

		// remove excessive null parameters

		int pt;
		while (", null".equals(buffer.substring(pt = buffer.length() - 6)))
			buffer.setLength(pt);

		// close the initializer

		buffer.append(");\r\n");

		// Add the class static initializer C$.$clinit$(), which
		// finalizes all field values and running static{...} initializers.
		// C$.$clinit$ is removed immediately when run so that it is only run
		// just
		// once per class. (In contrast, C$.$init$ is run once per instance.)

		List<BodyDeclaration> lstStatic = new ArrayList<BodyDeclaration>();
		boolean havePrivateMethods = false;

		// create a list of static fields and initializers

		// also add the local var p$ short for C$.prototype if we have any
		// private methods

		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			BodyDeclaration element = (BodyDeclaration) iter.next();
			boolean isField = element instanceof FieldDeclaration;

			// All static fields that have initializers must be (re)initialized,
			// even if they are their default values. This is because
			// they might have been modified by other actions between the
			// time they were initially initialized and when $clinit$ is run.
			// This happens when the static fields in class A reference
			// static fields in class B, which in turn reference static fields
			// in Class A.

			if (isField || element instanceof Initializer) {
				if ((isInterface || isStatic(element)) && !checkj2sIgnore(element)) {
					lstStatic.add(element);
				}
			} else if (!havePrivateMethods && element instanceof MethodDeclaration) {
				if (Modifier.isPrivate(((MethodDeclaration) element).resolveBinding().getModifiers())) {
					buffer.append("var p$=C$.prototype;\r\n");
					havePrivateMethods = true;
				}
			}
		}
		if (lstStatic.size() > 0 || hasDependents) {
			int len = buffer.length();
			buffer.append("\r\nC$.$clinit$ = function() {delete C$.$clinit$;Clazz.load(C$, 1);\r\n");
			for (int i = lstStatic.size(); --i >= 0;) {
				BodyDeclaration element = lstStatic.remove(0);
				if (element instanceof Initializer) {
					element.accept(this);
				} else {
					FieldDeclaration field = (FieldDeclaration) element;
					List<?> fragments = field.fragments();
					for (int j = 0; j < fragments.size(); j++) {
						VariableDeclarationFragment fragment = (VariableDeclarationFragment) fragments.get(j);
						Expression initializer = fragment.getInitializer();
						if (initializer == null || isFinal(element) && getConstantValue(initializer) != null)
							continue;
						len = 0;
						buffer.append("C$.");
						fragment.getName().accept(this);
						buffer.append(" = ");
						addExpressionAsTargetType(initializer, field.getType(), "v", null);
						buffer.append(";\r\n");
					}
				}
			}
			if (len == 0 || hasDependents)
				buffer.append("};\r\n");
			else
				buffer.setLength(len);
		}

		// add all the methods, static first

		StaticBuffer oldStaticBuffer = null;

		if (isEnum) {
			buffer.append(staticBuffer);
		} else {

			// if this is not an Enum, save the old static def buffer; start a
			// new one

			// buffer.append(">>oldLen=" + staticBuffer.toString().length() +
			// "<<");
			oldStaticBuffer = staticBuffer;
			staticBuffer = new StaticBuffer();
		}

		if (isAnonymous) {
			typeAdapter.setClassName(shortClassName);
		} else {
			// prepare static fields with default values
			buffer.append("\r\n");
			for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
				BodyDeclaration element = (BodyDeclaration) iter.next();
				if (element instanceof FieldDeclaration
						&& (isInterface || isStatic(element) && !checkj2sIgnore(element)))
					addFieldDeclaration((FieldDeclaration) element, true);
			}
		}

		if (!isInterface) {

			// if this is not an interface, generate $init$ method

			buffer.append("\r\nClazz.newMethod$(C$, '$init$', function () {\r\n");
			// we include all field definitions here and all nonstatic
			// initializers
			for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
				BodyDeclaration element = (BodyDeclaration) iter.next();
				if ((element instanceof FieldDeclaration || element instanceof Initializer) && !isStatic(element)
						&& !checkj2sIgnore(element)) {
					// using element.accept here does not properly adjust names
					// by adding $
					element.accept(this);
				}
			}
			buffer.append("}, 1);\r\n");
		}

		if (!isAnonymous && !isEnum) {

			// for interfaces and classes, add all the Enum declarations

			for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
				ASTNode element = (ASTNode) iter.next();
				if (element instanceof EnumDeclaration) {
					element.accept(this);
				}
			}
		}

		// add all the methods

		for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			if (element instanceof MethodDeclaration) {
				element.accept(this);
			}
		}

		if (isInterface) {

			// Check for static type declarations in interfaces
			// This will create a new visitor.
			// Static field buffer may be filled with contents.

			for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
				ASTNode element = (ASTNode) iter.next();
				if (element instanceof TypeDeclaration)
					element.accept(this);
			}
		}

		// add any recently defined static field definitions, assert strings
		// and Enum constants

		if (isEnum) {
			buffer.append(staticBuffer.getAssertString());
			addDefaultConstructor();
			addEnumConstants(((EnumDeclaration) node).enumConstants());
		} else {
			// buffer.append(">>>adding1>>>" + this);
			buffer.append(staticBuffer); // also writes the assert string
			// buffer.append("<<<adding1<<<" + this);
			if (isAnonymous) {
				// if anonymous, restore old static def buffer
				staticBuffer = oldStaticBuffer;
			} else {
				// otherwise, dump the oldStatic buffer and start a new one
				// buffer.append(">>>adding2>>>" + this);
				buffer.append(oldStaticBuffer);
				// buffer.append("<<<adding2<<<" + this);
				staticBuffer = new StaticBuffer();
				if (!isInterface)
					addDefaultConstructor();
			}
		}

		if (!isAnonymous) {
			readSources((BodyDeclaration) node, "@j2sSuffix", "\r\n", "\r\n", true, false);
		}

		if (!isTopLevel) {
			addAnonymousFunctionWrapper(false);
		}

		if (isAnonymous) {
			buffer.append(")");
			typeAdapter.setClassName(oldClassName);
		}
		return false;
	}

	/**
     * If there is no Foo() or Foo(xxx... array),
     * then we need to provide our own constructor.
	 * 
	 */
	private void addDefaultConstructor() {
		if (haveDefaultConstructor) {
			haveDefaultConstructor = false;
		} else {
			buffer.append("\r\nClazz.newMethod$(C$, 'c$', function(){");
			addSuperConstructor(null, null);
			buffer.append("}, 1);\r\n");
		}
	}

	/**
	 * Add all the Enum constants, and create C$.values() and Enum.valueOf
	 * 
	 * @param constants
	 */
	private void addEnumConstants(List<?> constants) {
		buffer.append("var vals = [];\r\n");
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
			buffer.append("Clazz.newEnumConst$(vals, C$.c$").append(getJ2SParamQualifier(null, binding))
					.append(", \"");
			enumConst.getName().accept(this);
			buffer.append("\", " + i);
			addMethodParameterList(enumConst.arguments(), binding, true, ", [", "]");
			if (anonName != null)
				buffer.append(", ").append(anonName);
			buffer.append(");\r\n");
		}
		buffer.append("Clazz.newMethod$(C$, 'values', function() { return vals }, 1);\r\n");
		// this next just ensures we have the valueOf() method in Enum if it
		// is not already there.
		buffer.append("Clazz.newMethod$(Enum, 'valueOf$Class$S', function(cl, name) { return cl[name] }, 1);\r\n");
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
			buffer.append(isStatic ? "C$." : "this.");
			appendCheckedFieldName(getJ2SName(fragment.getName()), classBinding, false);
			buffer.append(" = ");
			if (isStatic || initializer == null) {
				appendDefaultValue(nodeType);
			} else if (constantValue != null) {
				buffer.append(constantValue);
			} else {
				initializer.accept(this);
			}
			buffer.append(";\r\n");
		}
	}

	
	/**
	 * 
	 * generate the Clazz.new(...) call for an inner class.
	 * 
	 * @param node
	 * @param innerName
	 * @param outerClassExpr
	 * @param finals
	 * @param methodDeclaration
	 * @param superAnonName
	 */
	private void addInnerTypeInstance(ClassInstanceCreation node, String innerName, Expression outerClassExpr,
			String finals, IMethodBinding methodDeclaration, String superAnonName) {
		open$new(superAnonName == null ? innerName : superAnonName,
				methodDeclaration == null ? ".$init$" : ".c$" + getJ2SParamQualifier(null, methodDeclaration));

		// add constructor application arguments: [object, parameters]

		buffer.append(", [");
		if (outerClassExpr == null)
			buffer.append("this");
		else
			outerClassExpr.accept(this);

		// add final variable array

		buffer.append(", ").append(finals == null ? "null" : finals);

		// add parameters

		if (methodDeclaration != null) {
			List<?> args = node.arguments();
			addMethodParameterList(args, methodDeclaration, true,
					args.size() > 0 || methodDeclaration.isVarargs() ? ", " : null, null);
		}
		buffer.append("]");

		// an anonymous class will be calling a constructor in another
		// class, so
		// we need to indicate its actual call explicitly

		if (superAnonName != null)
			buffer.append(",").append(innerName);

		buffer.append(")");
	}

	/**
	 * Add a method parameter list
	 * 
	 * @param arguments
	 * @param methodDeclaration
	 * @param isConstructor
	 * @param prefix
	 * @param suffix
	 */
	private void addMethodParameterList(List<?> arguments, IMethodBinding methodDeclaration, boolean isConstructor,
			String prefix, String suffix) {
		if (methodDeclaration == null)
			return;
		boolean methodIsVarArgs = methodDeclaration.isVarargs();
		int argCount = arguments.size();
		if (isConstructor && argCount == 0) {
			// We allow use of a default constructor using new foo().
			// Here we always add a [] argument to a default constuctor, as null
			// will indicate
			// that we did not use Clazz.new and instead called new foo()
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
			// default constructor
			buffer.append("Clazz.super(C$, this,1);\r\n");
			return;
		} 
		buffer.append("C$.superClazz.c$")
				.append(getJ2SParamQualifier(null, node.resolveConstructorBinding()));
		buffer.append(".apply(this");
		addMethodParameterList(node.arguments(), methodDeclaration, true, ", [", "]");
		buffer.append(");\r\n");
		addCallInit();
	}

	private boolean checkInterfaceHasMethods(List<?> nodes) {
		for (Iterator<?> iter = nodes.iterator(); iter.hasNext();) {
			BodyDeclaration element = (BodyDeclaration) iter.next();
			if ((element instanceof Initializer
					|| element instanceof FieldDeclaration
							&& (isStatic(element) || ((FieldDeclaration) element).fragments().size() > 0)
					|| element instanceof MethodDeclaration && isStatic(element)) && !checkj2sIgnore(element))
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
		return (pt < 0 ? getPackageName()
				: TypeAdapter.getShortenedPackageNameFromClassName(thisPackageName, fullClassName)) + ", \""
				+ fullClassName.substring(pt + 1) + "\"";
	}

	private String getSuperClass(ITypeBinding declaringClass) {
		ITypeBinding superclass = declaringClass.getSuperclass();
		String qualifiedName = (superclass == null ? null : removeBrackets(superclass.getQualifiedName()));
		return (superclass == null || "java.lang.Object".equals(qualifiedName) || "java.lang.Enum".equals(qualifiedName)
				? null : qualifiedName);
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

	/**
	 * log to syserr -- may be subclassed
	 * 
	 * @param msg
	 */
	protected void log(String msg) {
		System.err.println(msg);
	}

	/**
	 * Start a new Clazz.new() call for class creation or inner classes. Uses Clazz.load for dynamic loading
	 * 
	 * @param className
	 * @param dotMethodName
	 * @return true if this is the default constructor
	 */
	private void open$new(String className, String dotMethodName) {
		buffer.append("Clazz.new(");
		String name = fixName(className);
		if (name.equals("C$"))
			buffer.append("C$");
		else 
			getQualifiedStaticName(null, className, true, true, true);
		boolean isDefault = dotMethodName.equals(".c$");
		if (!isDefault)
			buffer.append(dotMethodName);
	}

	private ITypeBinding resolveParentBinding(ASTNode xparent) {
		return (xparent instanceof AbstractTypeDeclaration ? ((AbstractTypeDeclaration) xparent).resolveBinding()
				: xparent instanceof AnonymousClassDeclaration ? ((AnonymousClassDeclaration) xparent).resolveBinding()
						: null);
	}

	/**
	 * Separate the buffer into a list so that all top-level elements can be in
	 * their own file (as is done in Java).
	 * 
	 * We do not have to worry about inner classes, as they are never referenced
	 * directly.
	 * 
	 * @return List {elementName, js, elementName, js, ....}
	 */
	public List<String> getElementList() {
		String trailer = "//Created " + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()) + "\n";
		List<String> elements = new ArrayList<String>();
		String js = buffer.toString();
		if (js.indexOf("I$") == js.lastIndexOf("I$"))
			js = js.replace(",I$=[]","");
		String[] parts = js.split(ELEMENT_KEY);
		String header = parts[0];
		for (int i = 1; i < parts.length; i++) {
			js = parts[i];
			int pt = js.indexOf("\r\n");
			elements.add(js.substring(0, pt));
			js = js.substring(pt + 2);
			elements.add("(function(){" + header + js + "})();\r\n" + trailer);
		}		
		return elements;
	}

}
