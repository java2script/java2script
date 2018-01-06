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
import java.util.HashMap;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Stack;
import java.util.regex.Pattern;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.ASTVisitor;
import org.eclipse.jdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.jdt.core.dom.Annotation;
import org.eclipse.jdt.core.dom.AnnotationTypeDeclaration;
import org.eclipse.jdt.core.dom.AnnotationTypeMemberDeclaration;
import org.eclipse.jdt.core.dom.AnonymousClassDeclaration;
import org.eclipse.jdt.core.dom.ArrayAccess;
import org.eclipse.jdt.core.dom.ArrayCreation;
import org.eclipse.jdt.core.dom.ArrayInitializer;
import org.eclipse.jdt.core.dom.ArrayType;
import org.eclipse.jdt.core.dom.AssertStatement;
import org.eclipse.jdt.core.dom.Assignment;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.BlockComment;
import org.eclipse.jdt.core.dom.BodyDeclaration;
import org.eclipse.jdt.core.dom.BooleanLiteral;
import org.eclipse.jdt.core.dom.BreakStatement;
import org.eclipse.jdt.core.dom.CastExpression;
import org.eclipse.jdt.core.dom.CatchClause;
import org.eclipse.jdt.core.dom.CharacterLiteral;
import org.eclipse.jdt.core.dom.ClassInstanceCreation;
import org.eclipse.jdt.core.dom.Comment;
import org.eclipse.jdt.core.dom.CompilationUnit;
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
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IVariableBinding;
import org.eclipse.jdt.core.dom.IfStatement;
import org.eclipse.jdt.core.dom.ImportDeclaration;
import org.eclipse.jdt.core.dom.InfixExpression;
import org.eclipse.jdt.core.dom.Initializer;
import org.eclipse.jdt.core.dom.InstanceofExpression;
import org.eclipse.jdt.core.dom.Javadoc;
import org.eclipse.jdt.core.dom.LabeledStatement;
import org.eclipse.jdt.core.dom.LineComment;
import org.eclipse.jdt.core.dom.MarkerAnnotation;
import org.eclipse.jdt.core.dom.MemberRef;
import org.eclipse.jdt.core.dom.MemberValuePair;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.MethodRef;
import org.eclipse.jdt.core.dom.MethodRefParameter;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.Name;
import org.eclipse.jdt.core.dom.NormalAnnotation;
import org.eclipse.jdt.core.dom.NullLiteral;
import org.eclipse.jdt.core.dom.NumberLiteral;
import org.eclipse.jdt.core.dom.PackageDeclaration;
import org.eclipse.jdt.core.dom.ParameterizedType;
import org.eclipse.jdt.core.dom.ParenthesizedExpression;
import org.eclipse.jdt.core.dom.PostfixExpression;
import org.eclipse.jdt.core.dom.PrefixExpression;
import org.eclipse.jdt.core.dom.PrimitiveType;
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.PrimitiveType.Code;
import org.eclipse.jdt.core.dom.ReturnStatement;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.SimpleType;
import org.eclipse.jdt.core.dom.SingleMemberAnnotation;
import org.eclipse.jdt.core.dom.SingleVariableDeclaration;
import org.eclipse.jdt.core.dom.Statement;
import org.eclipse.jdt.core.dom.StringLiteral;
import org.eclipse.jdt.core.dom.SuperConstructorInvocation;
import org.eclipse.jdt.core.dom.SuperFieldAccess;
import org.eclipse.jdt.core.dom.SuperMethodInvocation;
import org.eclipse.jdt.core.dom.SwitchCase;
import org.eclipse.jdt.core.dom.SwitchStatement;
import org.eclipse.jdt.core.dom.SynchronizedStatement;
import org.eclipse.jdt.core.dom.TagElement;
import org.eclipse.jdt.core.dom.TextElement;
import org.eclipse.jdt.core.dom.ThisExpression;
import org.eclipse.jdt.core.dom.ThrowStatement;
import org.eclipse.jdt.core.dom.TryStatement;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.core.dom.TypeDeclaration;
import org.eclipse.jdt.core.dom.TypeDeclarationStatement;
import org.eclipse.jdt.core.dom.TypeLiteral;
import org.eclipse.jdt.core.dom.TypeParameter;
import org.eclipse.jdt.core.dom.UnionType;
import org.eclipse.jdt.core.dom.VariableDeclarationExpression;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;
import org.eclipse.jdt.core.dom.VariableDeclarationStatement;
import org.eclipse.jdt.core.dom.WhileStatement;
import org.eclipse.jdt.core.dom.WildcardType;

// BH 1/5/2018 --  @j2sKeep removed; refactored into one class

// BH 12/31/2017 -- competely rewritten for no run-time ambiguities
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


/**
 * 
 * @author zhou renjian 2006-12-3
 * @author Bob Hanson 2017-08,09,10
 *
 * 
 * 
 */
public class Java2ScriptVisitor extends ASTVisitor {

	/**
	 * Buffer that keeps all compiled *.js.
	 */
	private StringBuffer buffer = new StringBuffer();

	private StringBuffer init0Buffer;

	private ArrayList<String> applets, apps;

	///// Type and Variable Adapters ///////
	
	private String getQualifiedClassName() {
		return ((TypeAdapter) getAdaptable(TypeAdapter.class)).getFullClassName();
	}

	/**
	 * Shorten fully qualified class names starting with java.lang and will
	 * replace a class name with C$. Use static getShortenedName(null, name,
	 * false) if that is not desired.
	 * 
	 * 
	 * @param name
	 * @return
	 */
	private String getShortenedQualifiedName(String name) {
		return ((TypeAdapter) getAdaptable(TypeAdapter.class)).getShortenedQualifiedName(name);
	}

	private String getUnqualifiedClassName() {
		return ((TypeAdapter) getAdaptable(TypeAdapter.class)).getClassName();
	}

	private void setClassName(String className) {
		((TypeAdapter) getAdaptable(TypeAdapter.class)).setClassName(className);
	}

	private List<VariableAdapter.FinalVariable> getVariableList(char fvn) { 
		return ((VariableAdapter) getAdaptable(VariableAdapter.class)).getVariableList(fvn); 
	}

	private String getNormalVariableName(String name) {
		return ((VariableAdapter) getAdaptable(VariableAdapter.class)).getNormalVariableName(name);
	}

	private boolean isAnonymousClass() {
		return ((VariableAdapter) getAdaptable(VariableAdapter.class)).isAnonymousClass;
	}

	private Map<Class<?>, VisitorAdapter> adapterMap = new HashMap<Class<?>, VisitorAdapter>();
	
	public VisitorAdapter getAdaptable(Class<?> thisClass) {
		try {
			VisitorAdapter adapter = adapterMap.get(thisClass);
			return (adapter == null ? (adapter = registerAdapter((VisitorAdapter) thisClass.newInstance()))
					: adapter);
		} catch (@SuppressWarnings("unused") InstantiationException | IllegalAccessException e) {
			return null;
		}
	}

	public VisitorAdapter registerAdapter(VisitorAdapter adapter) {
		adapter.setVisitor(this);
		adapterMap.put(adapter.getClass(), adapter);
		return adapter;
	}
	
	private void addApplication() {
		if (apps == null)
			apps = new ArrayList<String>();
		apps.add(getQualifiedClassName());
	}

	private void checkAddApplet(ITypeBinding binding) {
		if (Modifier.isAbstract(binding.getModifiers()))
			return;
		ITypeBinding b = binding;
		while ((binding = binding.getSuperclass()) != null) {
			String name = binding.getQualifiedName();
			if (!("javax.swing.JApplet".equals(name))) {
				if (name.startsWith("java.") || name.startsWith("javax"))
					return;
				continue;
			}
			if (applets == null)
				applets = new ArrayList<String>();
			name = b.getQualifiedName();
			applets.add(name);
			break;
		}
	}

	public ArrayList<String> getAppList(boolean isApplets) {
		return (isApplets ? applets : apps);
	}

	private void setInnerGlobals(Java2ScriptVisitor parent, ASTNode node, String visitorClassName) {
		global_PackageName = parent.global_PackageName;
		global_htIncludeNames = parent.global_htIncludeNames;
		global_includeCount = parent.global_includeCount;
		global_includes = parent.global_includes;
		global_j2sFlag_isDebugging = parent.global_j2sFlag_isDebugging;
		global_mapBlockJavadoc = parent.global_mapBlockJavadoc;
		parentClassName = parent.getQualifiedClassName();

		innerTypeNode = node;
		setClassName(visitorClassName);

	}

	/**
	 * default constructor found by visit(MethodDeclaration)
	 */
	boolean haveDefaultConstructor;

	private ASTNode innerTypeNode;

	public boolean visit(PackageDeclaration node) {
		setMapJavaDoc(node);
		String name = node.getName().toString();
		global_PackageName = name;
		global_includes = new StringBuffer();
		buffer.append("var P$=");
		if (isBasePackage()) {
			buffer.append(name);
		} else {
			buffer.append("Clazz.newPackage(\"").append(name).append("\")");
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
		trailingBuffer.hasAssert = true;
		return false;
	}

	/**
	 * Only specially process blocks if they are method declarations. Never
	 * process these for constructors.
	 */

	public boolean visit(Block node) {
		blockLevel++;
		buffer.append("{\r\n");
		ASTNode parent = node.getParent();
		if (parent instanceof MethodDeclaration && !((MethodDeclaration) parent).isConstructor()
				|| parent instanceof Initializer) {
			Javadoc javadoc = ((BodyDeclaration) parent).getJavadoc();
			if (javadoc != null) {
				List<Javadoc> list = new ArrayList<Javadoc>();
				list.add(javadoc);
				return !NativeDoc.checkJ2sJavadocs(buffer, list, false, global_j2sFlag_isDebugging);
			}
		}
		return super.visit(node);
	}
			


	public void endVisit(Block node) {
		// look for trailing j2sNative block just before the end of a block 
		getJ2sJavadoc(node, false);	
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

	/**
	 * new Foo()
	 * 
	 */
	public boolean visit(ClassInstanceCreation node) {
		ITypeBinding binding = node.resolveTypeBinding();
		if (binding == null)
			return false;
		AnonymousClassDeclaration anonDeclare = node.getAnonymousClassDeclaration();
		if (anonDeclare != null) {
			String anonClassName = getAnonymousName(binding);
			buffer.append("(");
			VariableAdapter variableAdapter = (VariableAdapter) getAdaptable(VariableAdapter.class);
			variableAdapter.isAnonymousClass = true;
			int lastCurrentBlock = currentBlockForVisit;
			List<VariableAdapter.FinalVariable> finalVars = variableAdapter.finalVars;
			List<VariableAdapter.FinalVariable> lastNormalVars = variableAdapter.normalVars;
			List<VariableAdapter.FinalVariable> lastVisitedVars = variableAdapter.visitedVars;
			List<VariableAdapter.FinalVariable> visitedVars = variableAdapter.visitedVars = new ArrayList<VariableAdapter.FinalVariable>();
			currentBlockForVisit = blockLevel;
			variableAdapter.normalVars = new ArrayList<VariableAdapter.FinalVariable>();
			methodDeclareNameStack.push(binding.getKey());
			anonDeclare.accept(this);
			buffer.append(", ");
			methodDeclareNameStack.pop();
			variableAdapter.normalVars = lastNormalVars;
			String finals = VariableAdapter.listFinalVariables(visitedVars, ", ",
					methodDeclareNameStack.size() == 0 ? null : (String) methodDeclareNameStack.peek());
			IMethodBinding constructorBinding = node.resolveConstructorBinding();
			IMethodBinding methodDeclaration = (constructorBinding == null ? null
					: constructorBinding.getMethodDeclaration());
			String superclassName = getShortenedQualifiedName(getSuperClassNameNoBrackets(binding));
			addInnerTypeInstance(node, anonClassName, null, finals, (superclassName == null ? null : methodDeclaration),
					superclassName);
			if (lastCurrentBlock != -1) {
				/* add the visited variables into last visited variables */
				for (int j = 0; j < visitedVars.size(); j++) {
					VariableAdapter.FinalVariable fv = visitedVars.get(j);
					int size = finalVars.size();
					for (int i = 0; i < size; i++) {
						VariableAdapter.FinalVariable vv = finalVars.get(size - i - 1);
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
					(binding.isAnonymous() || binding.isLocal() ? binding.getBinaryName() : binding.getQualifiedName()),
					node.getExpression(), null,
					(constructorBinding == null ? null : constructorBinding.getMethodDeclaration()), null);
			return false;
		}
		String className = TypeAdapter.getTypeStringName(node.getType());
		String fqName = getShortenedQualifiedName(className);
		if ("Object".equals(fqName)) {
			buffer.append(" Clazz.new_()");
			return false;
		}
		String prefix = null, postfix = null;
		IMethodBinding methodDeclaration = null;
		IMethodBinding constructorBinding = node.resolveConstructorBinding();
		if (constructorBinding != null) {
			methodDeclaration = constructorBinding.getMethodDeclaration();
		}
		boolean isDefault = false;
		if ("String".equals(fqName)) {
			// special treatment for String -- see j2sSwingJS.js
			buffer.append(" String.instantialize(");
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
			openNew(className, constructorBinding);
			isDefault = node.arguments().isEmpty();
			prefix = ",[";
			postfix = "]";
		}
		if (!isDefault)
			addMethodParameterList(node.arguments(), methodDeclaration, true, prefix, postfix, false);
		buffer.append(")");
		return false;
	}

	public boolean visit(ConstructorInvocation node) {
		IMethodBinding constructorBinding = node.resolveConstructorBinding();
		List<?> arguments = node.arguments();
		buffer.append(getJ2SQualifiedName("C$.c$", null, constructorBinding, null, false)).append(".apply(this");
		IMethodBinding methodDeclaration = (constructorBinding == null ? null
				: constructorBinding.getMethodDeclaration());
		addMethodParameterList(arguments, methodDeclaration, true, ", [", "]", false);
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
		Statement ifElse = node.getElseStatement();
		if (ifElse != null) {
			buffer.append(" else ");
			ifElse.accept(this);
		}
		return false;
	}

	/**
	 * {....}
	 * 
	 */
	public boolean visit(Initializer node) {
		if (NativeDoc.checkj2sIgnore(node)) {
			return false;
		}
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

		if (mBinding == null || NativeDoc.checkj2sIgnore(node))
			return false;

		// TODO: We will need to alias all generic implementations

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
		String name = getMethodNameOrArrayForDeclaration(node, mBinding, isConstructor);
		if (isConstructor && name.equals("'c$'") || mBinding.isVarargs() && mBinding.getParameterTypes().length == 1)
			haveDefaultConstructor = true; // in case we are not qualifying
											// names here
		if (name.equals("'main'"))
			addApplication();
		buffer.append("\r\nClazz.newMeth(C$, ").append(name).append(", function (");
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
				String superclassName = (binding == null ? null
						: getSuperClassNameNoBrackets(binding.getDeclaringClass()));
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
		if (NativeDoc.checkj2sIgnore(node))
			return;
		IMethodBinding mBinding = node.resolveBinding();
		if (mBinding != null)
			methodDeclareNameStack.pop();
		List<VariableAdapter.FinalVariable> finalVars = getVariableList('f');
		List<VariableAdapter.FinalVariable> visitedVars = getVariableList('v');
		List<VariableAdapter.FinalVariable> normalVars = getVariableList('n');
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
				VariableAdapter.FinalVariable f = new VariableAdapter.FinalVariable(blockLevel + 1, identifier, methodSig);
				f.toVariableName = identifier;
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
			if (expression instanceof Name) {
				// this will use visit(QualifiedName) or visit(SimpleName)
				getQualifiedStaticName((Name) expression, className, isStatic && !isPrivate, true, true);
			} else {
				// (x ? y : z).foo()
				expression.accept(this);
			}
			buffer.append(".");
		}
		boolean isSpecialMethod = false;
		String methodName = node.getName().getIdentifier();
		boolean isIndexOf = false;
		if (NameMapper.isJ2SMethodRegistered(methodName)) {
			String j2sName = NameMapper.j2sMap(className, methodName);
			if (j2sName != null) {
				// Array.newInstance --> Clazz.array
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
		} else if (methodName.equals("indexOf") || methodName.equals("lastIndexOf")) {
			isIndexOf = className.equals("java.lang.String");
		}

		// record whether this.b$[.....] was used, and if so and it is private,
		// we need to use it again
		b$name = null;
		String term = ")";
		if (!isSpecialMethod) {
			String qname = getJ2SQualifiedName(getQualifiedSimpleName(node.getName()), className, mBinding, null, true);
			if (qname.indexOf('|') >= 0) {
				// foo.xx$T$K || $o$.xx$O$O --> ($o$=foo).($o$.xx$T$K ||
				// $o$.xx$O$O)
				postFixGeneric$O(pt, qname, isPrivateAndNotStatic);
				term = "])";
			} else {
				buffer.append(qname);
			}
		}
		if (isPrivateAndNotStatic) {
			// A call to a private outer-class method from an inner class
			// requires
			// this.b$["....."], not just "this"
			buffer.append(".apply(this");
			if (b$name != null)
				buffer.append(b$name);
			buffer.append(", [");
			term = "])";
		}
		if (term == ")")
			buffer.append("(");
		addMethodParameterList(node.arguments(), mBinding, false, null, null, isIndexOf);
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
			VariableAdapter.FinalVariable f = null;
			if (methodDeclareNameStack.size() == 0) {
				f = new VariableAdapter.FinalVariable(blockLevel + 1, identifier, null);
			} else {
				String methodSig = methodDeclareNameStack.peek();
				f = new VariableAdapter.FinalVariable(blockLevel + 1, identifier, methodSig);
			}
			addVariable(f, identifier, binding);
		}
		name.accept(this);
		return false;
	}

	public boolean visit(SuperConstructorInvocation node) {
		IMethodBinding constructorBinding = node.resolveConstructorBinding();
		if (constructorBinding != null && !isObjectOrNull(constructorBinding.getDeclaringClass())) {
			addSuperConstructor(node, constructorBinding.getMethodDeclaration());
		} else {
			addCallInit();
		}
		return false;
	}

	public boolean visit(SuperMethodInvocation node) {
		IMethodBinding mBinding = node.resolveMethodBinding();
		String name = getJ2SQualifiedName(NameMapper.getJ2SName(node.getName()), null, mBinding, null, false);
		// BH if this is a call to super.clone() and there is no superclass, or
		// the superclass is Object,
		// then we need to invoke Clazz.clone(this) directly instead of calling
		// C$.superclazz.clone()
		if ("clone".equals(name) && getSuperclassNameQualified(mBinding.getDeclaringClass()) == null) {
			buffer.append("Clazz.clone(this)");
		} else {
			buffer.append("C$.superclazz.prototype." + name + ".apply(this, ");
			buffer.append("[");
			addMethodParameterList(node.arguments(), mBinding, false, null, null, false);
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
						buffer.append("\"" + removeBrackets(type.resolveBinding().getQualifiedName()) + "\"");
						//type.accept(this);
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
		return addClassOrInterface(node, node.resolveBinding(), node.bodyDeclarations(),
				node.isInterface() ? 'i' : node.isLocalTypeDeclaration() ? 'l' : 'c');
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

	private static final int FIELD_DECL_STATIC_NONDEFAULT = 1;
	private static final int FIELD_DECL_STATIC_DEFAULTS = 2;
	private static final int FIELD_DECL_NONSTATIC_ALL = 3;

	private void addAnonymousFunctionWrapper(boolean isOpen) {
		buffer.append(
				isOpen ? (buffer.lastIndexOf(")") >= buffer.length() - 3 ? ";" : "") + "\r\n(function(){" : "})()\r\n");
	}

	/**
	 * The call to C$.$init$ from a constructor is made in two cases:
	 * 
	 * a) as the second statement in a constructor, when the first line is a
	 * super(...) call
	 * 
	 * b) as the first statement in a constructor that does not call super(...)
	 * or this(...) (because the superclass is Object)
	 * 
	 * Note that it is not called when the first statement is this(...).
	 * 
	 */
	private void addCallInit() {
		buffer.append("C$.$init$.apply(this);\r\n");
	}

	/**
	 * Add Clazz.newInterface(...) or Clazz.newClass(...) for all classes and
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
		checkGenericClass(binding, binding);
		boolean isAnonymous = (type == 'a');
		boolean isEnum = (type == 'e');
		boolean isInterface = (type == 'i');
		boolean isLocal = (type == 'l');
		int pt;
		
		

		TypeAdapter typeAdapter = ((TypeAdapter) getAdaptable(TypeAdapter.class));
		ASTNode parent = node.getParent();
		if (isAnonymous) {
			buffer.append("(");
		} else if (node != innerTypeNode
				&& (parent instanceof AbstractTypeDeclaration || parent instanceof TypeDeclarationStatement)) {
			// if this is an inner class, we use a temporary visitor to put its
			// definition in the static buffer and return
			String className;
			if (parent instanceof TypeDeclarationStatement) {
				String anonClassName = assureQualifiedName(binding.isAnonymous() || binding.isLocal()
						? binding.getBinaryName() : binding.getQualifiedName());
				className = anonClassName.substring(anonClassName.lastIndexOf('.') + 1);
			} else {
				className = typeAdapter.getClassName() + "." + binding.getName();
			}
			Java2ScriptVisitor tempVisitor;
			try {
				tempVisitor = this.getClass().newInstance();
			} catch (@SuppressWarnings("unused") Exception e) {
				tempVisitor = new Java2ScriptVisitor(); // Default visitor
			}
			tempVisitor.setInnerGlobals(this, node, className);
			node.accept(tempVisitor);
			trailingBuffer.append(tempVisitor.buffer.toString());
			return false;
		}
		System.err.println("visit " + binding.getKey());
		
		boolean isTopLevel = binding.isTopLevel();
		if (isTopLevel) {
			String name = binding.getName();
			typeAdapter.setClassName(name);
			appendElementKey(name);
		}

		// check for a JApplet

		if (isTopLevel && !isEnum) {
			checkAddApplet(binding);
		}

		// add the anonymous wrapper if needed

		if (!isTopLevel)
			addAnonymousFunctionWrapper(true);

		// begin the class or interface definition

		buffer.append("var C$=" + (isInterface ? "Clazz.newInterface(" : "Clazz.newClass("));

		// arg1 is the package name
		// arg2 is the full class name in quotes
		// arg3 is the class definition function, C$, which is called in
		// Clazz.new_().
		// arg4 is the superclass
		// arg5 is the superinterface(s)
		// arg6 is the type: anonymous(1), local(2), or absent

		// arg1: package name or null
		// arg2: shortened class name in quotes

		String oldClassName = null;
		String fullClassName, defaultPackageName;

		if (isAnonymous) {
			oldClassName = typeAdapter.getClassName();
			fullClassName = getAnonymousName(binding); // P$.Test_Enum$Planet$1
			defaultPackageName = "null";
		} else {
			fullClassName = getQualifiedClassName(); // test.Test_Enum.Planet
			defaultPackageName = global_PackageName;
		}
		pt = fullClassName.lastIndexOf('.');
		String shortClassName = fullClassName.substring(pt + 1);
		String packageName = (pt < 0 ? defaultPackageName
				: TypeAdapter.getShortenedPackageNameFromClassName(global_PackageName, fullClassName));
		buffer.append(packageName + ", \"" + shortClassName + "\"");

		// set up func, superclass, and superInterface

		String func = "null";
		String superclassName = null;
		List<?> superInterfaceTypes = null;
		// arg3: class definition function, C$, or null to add the standard
		// function at run time

		boolean hasDependents = false;
		buffer.append(", ");
		if (isAnonymous) {
			if (!(parent instanceof EnumConstantDeclaration))
				func = "function(){Clazz.newInstance(this, arguments[0],1,C$);}";
			superclassName = "" + getSuperclassNameQualified(binding);
			ITypeBinding[] declaredTypes = binding.getInterfaces();
			if (declaredTypes != null && declaredTypes.length > 0) {
				List<ITypeBinding> types = new ArrayList<ITypeBinding>();
				types.add(declaredTypes[0]);
				superInterfaceTypes = types;
			}
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
					buffer.append("Clazz.newInstance(this, arguments")
							.append(isTopLevel ? ",0" : "[0]," + !isStatic(binding)).append(",C$);\r\n");
				}
				buffer.append("}");
			}
			superclassName = "" + getSuperclassNameQualified(binding);
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
				buffer.append(getInnerClassList(superclassName));

		}

		// arg5: superinterface(s) if not null

		if (superInterfaceTypes != null && superInterfaceTypes.size() > 0) {
			hasDependents = true;
			buffer.append(", ");
			String term = "";
			if (superInterfaceTypes.size() > 1) {
				buffer.append("[");
				term = "]";
			}
			String sep = "";
			for (Iterator<?> iter = superInterfaceTypes.iterator(); iter.hasNext();) {
				buffer.append(sep);
				Object iface = iter.next();
				ITypeBinding ibinding = (iface instanceof Type ? ((Type) iface).resolveBinding()
						: (ITypeBinding) iface);
				String term1 = "";
				if (!ibinding.isTopLevel()) {
					if (sep == "" && term == "") {
						buffer.append("[");
						term = "]";
					}
					buffer.append("[");
					term1 = "]";
					ITypeBinding b = ibinding;
					pt = buffer.length();
					while (!b.isTopLevel()) {
						b = b.getDeclaringClass();
						buffer.insert(pt, "'" + assureQualifiedNameNoC$(null, b.getQualifiedName()) + "',");
					}
				}
				buffer.append("'");
				buffer.append(assureQualifiedNameNoC$(null, ibinding.getQualifiedName()));
				buffer.append("'");
				buffer.append(term1);
				sep = ", ";
			}
			buffer.append(term);
		} else {
			buffer.append(", null");
		}

		// arg6: anonymous(1), local(2), or absent

		if (isLocal) {
			buffer.append(", 2");
		} else if (isAnonymous) {
			buffer.append(", 1");
		} else {
			// remove excessive null parameters
			int i;
			while (", null".equals(buffer.substring(i = buffer.length() - 6)))
				buffer.setLength(i);
		}

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

		// add the Java8 compatibility local variable $o$

		// also add the local var p$ short for C$.prototype if we have any
		// private methods

		// add all the methods

		TrailingBuffer oldTrailingBuffer = null;

		if (isEnum) {
			buffer.append(trailingBuffer);
		} else {

			// if this is not an Enum, save the old static def buffer; start a
			// new one

			oldTrailingBuffer = trailingBuffer;
			trailingBuffer = new TrailingBuffer();
		}
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
				if ((isInterface || isStatic(element)) && !NativeDoc.checkj2sIgnore(element)) {
					lstStatic.add(element);
					if (isField)
						addFieldDeclaration((FieldDeclaration) element, FIELD_DECL_STATIC_DEFAULTS);

				}
			} else if (!havePrivateMethods && element instanceof MethodDeclaration) {
				if (Modifier.isPrivate(((MethodDeclaration) element).resolveBinding().getModifiers())) {
					buffer.append("var p$=C$.prototype;\r\n");
					havePrivateMethods = true;
				}
			}
		}
		if (lstStatic.size() > 0 || hasDependents) {
			pt = buffer.length();
			boolean haveDeclarations = false;
			buffer.append("\r\nC$.$clinit$ = function() {Clazz.load(C$, 1);\r\n");
			for (int i = lstStatic.size(); --i >= 0;) {
				BodyDeclaration element = lstStatic.remove(0);
				if (element instanceof Initializer) {
					element.accept(this);
					buffer.append(";\r\n");
					haveDeclarations = true;
				} else if (addFieldDeclaration((FieldDeclaration) element, FIELD_DECL_STATIC_NONDEFAULT)) {
					haveDeclarations = true;
				}
			}
			if (isEnum) {
				addEnumConstants((EnumDeclaration) node);
				haveDeclarations = true;
			}
			if (haveDeclarations || hasDependents)
				buffer.append("}\r\n");
			else
				buffer.setLength(pt);
		}

		if (isAnonymous) {
			typeAdapter.setClassName(shortClassName);
		}

		if (!isInterface) {

			// if this is not an interface, generate $init0$ and $init$ methods

			StringBuffer init0bufold = init0Buffer;
			init0Buffer = new StringBuffer();

			int len = buffer.length();
			buffer.append("\r\nClazz.newMeth(C$, '$init$', function () {\r\n");
			// we include all field definitions here and all nonstatic
			// initializers
			for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
				BodyDeclaration element = (BodyDeclaration) iter.next();
				if ((element instanceof FieldDeclaration || element instanceof Initializer) && !isStatic(element)
						&& !NativeDoc.checkj2sIgnore(element)) {
					if (element instanceof FieldDeclaration)
						addFieldDeclaration((FieldDeclaration) element, FIELD_DECL_NONSTATIC_ALL);
					else
						element.accept(this);
				}
			}
			buffer.append("}, 1);\r\n");

			if (init0Buffer.length() > 0) {
				String buf = buffer.substring(len);
				buffer.setLength(len);
				buffer.append("\r\nClazz.newMeth(C$, '$init0$', function () {\r\n");
				buffer.append("var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);\r\n");
				buffer.append(init0Buffer);
				buffer.append("}, 1);\r\n");
				buffer.append(buf);
			}

			init0Buffer = init0bufold;
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
			buffer.append(trailingBuffer.getAssertString());
			addDefaultConstructor();
			buffer.append("var $vals=[];\r\n");
			buffer.append("Clazz.newMeth(C$, 'values', function() { return $vals }, 1);\r\n");
		} else {
			buffer.append(trailingBuffer); // also writes the assert string
			if (isAnonymous) {
				// if anonymous, restore old static def buffer
				trailingBuffer = oldTrailingBuffer;
			} else {
				// otherwise, dump the oldStatic buffer and start a new one
				buffer.append(oldTrailingBuffer);
				trailingBuffer = new TrailingBuffer();
				if (!isInterface)
					addDefaultConstructor();
			}
		}

	    getJ2sJavadoc(node, false);
		
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
	 * For Clazz.newClass we want an array if there is an inner class so that
	 * the outer class is guaranteed to be loaded first.
	 * 
	 * @param className
	 * @return
	 */
	private String getInnerClassList(String className) {

		String[] parts = className.split("\\.");
		String s = parts[0];
		int i = 1;
		// loop through packages and outer Class
		while (i < parts.length && !Character.isUpperCase(parts[i - 1].charAt(0))) {
			s += "." + parts[i++];
		}
		String ret = "'" + s + "'";
		// add inner classes
		while (i < parts.length) {
			ret += ",'" + s + "." + parts[i++] + "'";
		}
		return (ret.indexOf(",") >= 0 ? "[" + ret + "]" : ret);
	}

	/**
	 * If there is no Foo() or Foo(xxx... array), then we need to provide our
	 * own constructor.
	 * 
	 */
	private void addDefaultConstructor() {
		if (haveDefaultConstructor) {
			haveDefaultConstructor = false;
		} else {
			buffer.append("\r\nClazz.newMeth(C$);\r\n");
		}
	}

	/**
	 * Add all the Enum constants, and create C$.values() and Enum.valueOf
	 * 
	 * @param constants
	 */
	private void addEnumConstants(EnumDeclaration e) {
		List<?> constants = e.enumConstants();
		buffer.append("$vals=Clazz.array(C$,[0]);\r\n");
		for (int i = 0; i < constants.size(); i++) {
			EnumConstantDeclaration enumConst = (EnumConstantDeclaration) constants.get(i);
			IMethodBinding binding = enumConst.resolveConstructorBinding();
			AnonymousClassDeclaration anonDeclare = enumConst.getAnonymousClassDeclaration();
			String anonName = null;
			if (anonDeclare != null) {
				// BH: add the anonymous class definition inline!
				anonDeclare.accept(this);
				anonName = getAnonymousName(anonDeclare.resolveBinding());
				buffer.append("\r\n");
			}
			buffer.append("Clazz.newEnumConst($vals, ").append(getJ2SQualifiedName("C$.c$", null, binding, null, false))
					.append(", \"");
			enumConst.getName().accept(this);
			buffer.append("\", " + i);
			addMethodParameterList(enumConst.arguments(), binding, true, ", [", "]", false);
			if (anonName != null)
				buffer.append(", ").append(anonName);
			buffer.append(");\r\n");
		}
	}

	/**
	 * 
	 * Handle all field declarations without visit(FieldDeclaration).
	 * 
	 * 
	 * @param field
	 *            the field being declared
	 * @param mode
	 *            FIELD_DECL_STATIC_NONDEFAULT static fields into $clinit$
	 *            (values) FIELD_DECL_STATIC_DEFAULTS static fields into buffer
	 *            directly (defaults) FIELD_DECL_NONSTATIC_ALL static variables
	 *            into $init$ (values) and $init0$ (defaults)
	 * @return true if anything was written to the buffer
	 */
	private boolean addFieldDeclaration(FieldDeclaration field, int mode) {

		boolean isStatic = (mode == FIELD_DECL_STATIC_NONDEFAULT || mode == FIELD_DECL_STATIC_DEFAULTS);
		boolean needDefault = (mode == FIELD_DECL_NONSTATIC_ALL || mode == FIELD_DECL_STATIC_DEFAULTS);
		List<?> fragments = field.fragments();
		VariableDeclarationFragment identifier = (VariableDeclarationFragment) fragments.get(0);
		IVariableBinding var = identifier.resolveBinding();
		Type nodeType = (var != null && var.getType().isArray() ? null : field.getType());
		Code code = (nodeType == null || !nodeType.isPrimitiveType() ? null
				: ((PrimitiveType) nodeType).getPrimitiveTypeCode());
		ITypeBinding classBinding = resolveAbstractOrAnonymousBinding(field);
		// have to check here for final Object = "foo", as that must not be ignored.
		boolean checkFinalConstant = (isStatic && Modifier.isFinal(field.getModifiers())
				&& var != null && !var.getType().getQualifiedName().equals("java.lang.Object"));
		if (needDefault)
			preVisit2(field);
		int len0 = buffer.length();
		for (Iterator<?> iter = fragments.iterator(); iter.hasNext();) {
			VariableDeclarationFragment fragment = (VariableDeclarationFragment) iter.next();
			Expression initializer = fragment.getInitializer();
			if (checkFinalConstant ? getConstantValue(initializer) != null
					: isStatic && initializer == null && !needDefault)
				continue;
			int len = buffer.length();
			String prefix = (isStatic ? "C$." : "this.")
					+ NameMapper.getJ2SCheckedFieldName(classBinding, NameMapper.getJ2SName(fragment.getName()));
			buffer.append(prefix);
			buffer.append(" = ");
			int len1 = buffer.length();

			if (initializer == null || needDefault) {
				// Route default for this to the $init0$ buffer if nonstatic, or
				// straight to the class if static
				// if static and not initialized

				buffer.append(code == null ? "null" : getPrimitiveDefault(code));
				buffer.append(";\r\n");
				//
				// $clinit$ -- statics; once only
				// $init0$ -- from within Clazz.newInstance, before any
				// constructors
				// $init$ -- from the constructor, just after any super()
				// call or whenever there is no this() call

				// com.falstad.Diffraction.CrossAperature initialization was
				// failing. Sequence was:

				// Aperature<init>: calls setDefaults() (new double[][]
				// lineXLocations)
				// BlockAperature<init> sets lineXLocations = null
				// CrossAperature<init> needs the defaults set and fails

				// but needed to be:

				// Aperature<init>: calls setDefaults() (new double[][]
				// lineXLocations)
				// BlockAperature<init> defines but does not set
				// lineXLocations
				// CrossAperature<init> sees the created lineXLocations
				// created in Aperature<init>

				if (isStatic)
					continue;
				init0Buffer.append(buffer.substring(len));
				if (initializer == null) {
					buffer.setLength(len);
					continue;
				}
				buffer.setLength(len1);
			}
			// not static and has an initializer
			addExpressionAsTargetType(initializer, field.getType(), "v", null);
			buffer.append(";\r\n");
		}
		return (buffer.length() > len0);
	}

	/**
	 * 
	 * generate the Clazz.new_(...) call for an inner class.
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
		String name = (superAnonName == null ? innerName : superAnonName);
		openNew(name, methodDeclaration);

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
					args.size() > 0 || methodDeclaration.isVarargs() ? ", " : null, null, false);
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
	 * @param isIndexOf
	 *            TODO
	 */
	private void addMethodParameterList(List<?> arguments, IMethodBinding methodDeclaration, boolean isConstructor,
			String prefix, String suffix, boolean isIndexOf) {
		if (methodDeclaration == null)
			return;

		boolean methodIsVarArgs = methodDeclaration.isVarargs();
		int argCount = arguments.size();
		if (isConstructor && argCount == 0) {
			// We allow use of a default constructor using new foo().
			// Here we always add a [] argument to a default constuctor, as null
			// will indicate
			// that we did not use Clazz.new_ and instead called new foo()
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
			addMethodArguments(parameterTypes, methodIsVarArgs, arguments, isIndexOf);
		}
		if (prefix == null && suffix != null)
			buffer.append(suffix);
	}

	private void addSuperConstructor(SuperConstructorInvocation node, IMethodBinding methodDeclaration) {
		if (node == null) {
			// default constructor
			buffer.append("Clazz.super_(C$, this,1);\r\n");
			return;
		}
		buffer.append(getJ2SQualifiedName("C$.superclazz.c$", null, node.resolveConstructorBinding(), null, false));
		buffer.append(".apply(this");
		addMethodParameterList(node.arguments(), methodDeclaration, true, ", [", "]", false);
		buffer.append(");\r\n");
		addCallInit();
	}

	private void clearVariables(List<VariableAdapter.FinalVariable> vars) {
		for (int i = vars.size(); --i >= 0;) {
			VariableAdapter.FinalVariable var = vars.get(i);
			if (var.blockLevel >= blockLevel) {
				vars.remove(i);
			}
		}
	}

	private String getAnonymousName(ITypeBinding binding) {
		String binaryName = null, bindingKey;
		if ((binding.isAnonymous() || binding.isLocal()) && (binaryName = binding.getBinaryName()) == null
				&& (bindingKey = binding.getKey()) != null)
			binaryName = bindingKey.substring(1, bindingKey.length() - 1).replace('/', '.');
		return assureQualifiedName(binaryName == null ? binding.getQualifiedName() : binaryName);
	}

	private static String getSuperClassNameNoBrackets(ITypeBinding typeBinding) {
		ITypeBinding superclass = typeBinding.getSuperclass();
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
	private String getSuperclassNameQualified(ITypeBinding typeBinding) {
		if (typeBinding != null) {
			ITypeBinding superclass = typeBinding.getSuperclass();
			if (superclass != null) {
				String clazzName = assureQualifiedNameNoC$(null, superclass.getQualifiedName());
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
	private void log(String msg) {
		System.err.println(msg);
	}

	/**
	 * Start a new Clazz.new_() call for class creation or inner classes. Uses
	 * Clazz.load for dynamic loading
	 * 
	 * @param className
	 * @param dotMethodName
	 * @return true if this is the default constructor
	 */
	private void openNew(String className, IMethodBinding mbinding) {
		buffer.append("Clazz.new_(");
		String name = assureQualifiedName(className);
		if (!name.equals("C$"))
			name = getQualifiedStaticName(null, className, true, true, false);
		if (mbinding == null) {
			buffer.append(name + ".$init$");
			return;
		}
		String qName = getJ2SQualifiedName(name + ".c$", null, mbinding, null, false);
		buffer.append(qName.endsWith(".c$") ? name : qName);
	}

	private static boolean isObjectOrNull(ITypeBinding type) {
		return type == null || "java.lang.Object".equals(type.getQualifiedName());
	}

	private final static String CHARCODEAT0 = ".$c()";

	private final static String defaultNonQualified = "javajs.api.js;swingjs.api.js;swingjs.JSToolkit;";

	private static String[] nonQualifiedPackages;

	private final static String[] nonQualifiedClasses = new String[] {
			// these classes need no qualification
			"java.lang.Boolean", "java.lang.Byte", "java.lang.Character", "java.lang.Double", "java.lang.Float",
			"java.lang.Integer", "java.lang.Long", "java.lang.Math", "java.lang.Number", "java.lang.reflect.Array",
			"java.lang.Short", "java.lang.System", "java.lang.String", "java.lang.Void",

			// I have no idea why these are here
			"java.util.Date", // TODO _- really???
			"java.util.EventListenerProxy", "java.util.EventObject" 
		};

	private static final String primitiveTypeEquivalents = "Boolean,Byte,Character,Short,Integer,Long,Float,Double,Void,";

	private static final String getPrimitiveTYPE(String name) {
		int pt = primitiveTypeEquivalents.indexOf(name.substring(1)) - 1;
		String type = primitiveTypeEquivalents.substring(pt);
		return type.substring(0, type.indexOf(",")) + ".TYPE";
	}

	private boolean isArray = false;
	private int blockLevel = 0;
	private int currentBlockForVisit = -1;

	public String parentClassName;


	/**
	 * used in case we are applying a private outer class method
	 * 
	 */
	private String b$name;
	
	
	private Stack<String> methodDeclareNameStack = new Stack<String>();

	/**
	 * holds all static field definitions for insertion at the end of the class
	 * def and allows setting of local typed integer arrays for fast processing
	 * of bytes
	 * 
	 */
	protected TrailingBuffer trailingBuffer = new TrailingBuffer();

	/**
	 * TrailingBuffer holds definitions that need to come after all methods are
	 * defined, with blocks defined just once for any given class.
	 * 
	 * The buffer also provides a very efficient way to do byte, short, and int
	 * operation processing by using the trick that if we have defined
	 * 
	 * var $b$ = new Int8Array(1)
	 * 
	 * then we can use that to "filter" a (necessarily) 32-bit integer
	 * JavaScript variable to reproduce the effect of being a byte or short or
	 * int. This is done as follows:
	 * 
	 * Java:
	 * 
	 * byte b = (byte) 300;
	 * 
	 * JavaScript:
	 * 
	 * var b = ($b$[0] = 300, $b$[0]);
	 * 
	 * This works because Int8Arrays really are bytes, and they can only hold
	 * bytes. So
	 * 
	 * $b$[0] = 300
	 * 
	 * sets $b$[0] to be 44, and ($b$[0] = 300, $b$[0]) then passes that value
	 * on to the receiving variable b (which itself is a 32-bit integer,
	 * actually).
	 * 
	 * It was a surprise to me that the "(..., $b$[0])" business was necessary.
	 * However, it turns out that
	 * 
	 * b = $b$[0] = 300;
	 * 
	 * is really short for the two (undesired) independent processes:
	 * 
	 * b = 300; $b$[0] = 300;
	 *
	 * not the (desired) sequential pair
	 * 
	 * $b$[0] = 300; b = $b$[0];
	 * 
	 * But
	 * 
	 * var b = ($b$[0] = 300, $b$[0]);
	 * 
	 * is precisely this second meaning.
	 * 
	 * 
	 * We turn this action off using the field isArray so that these don't get
	 * nested.
	 * 
	 * @author Bob Hanson
	 *
	 */
	class TrailingBuffer {
		private StringBuffer buf;
		private String added = "";

		boolean hasAssert;

		TrailingBuffer() {
			buf = new StringBuffer();
		}

		TrailingBuffer append(String s) {
			buf.append(s);
			return this;
		}

		String getAssertString() {
			return (hasAssert ? "C$.$_ASSERT_ENABLED_ = ClassLoader.$getClassAssertionStatus(C$);\r\n" : "");
		}

		public String toString() {
			return getAssertString() + added + buf;
		}

		void addType(String name) {
			char a = name.charAt(0);
			// note that this character may not be in the phrase "new Int Array"
			if (added.indexOf(a) >= 0)
				return;
			added += "var $" + a + "$";
			switch (a) {
			case 'b': // $b$
				added += " = new Int8Array(1)";
				break;
			case 's': // $s$
				added += " = new Int16Array(1)";
				break;
			case 'i': // $i$ // abandoned - using |0
				added += " = new Int32Array(1)";
				break;
			default:
			case 'p': // $p$
				break;
			}
			added += ";\r\n";
		}
	}

	public boolean visit(ArrayAccess node) {
		node.getArray().accept(this);
		buffer.append('[');
		addNonCharacter(node.getIndex());
		buffer.append(']');
		return false;
	}

	@SuppressWarnings("unchecked")
	public boolean visit(ArrayCreation node) {
		ArrayInitializer inode = node.getInitializer();
		ITypeBinding binding = node.resolveTypeBinding();
		if (inode == null) {
			buffer.append(clazzArray(binding, 0));
			buffer.append(", [");
			List<ASTNode> dim = node.dimensions();
			visitList(dim, ", ");
			for (int i = binding.getDimensions() - dim.size(); --i >= 0;)
				buffer.append(", null");
			buffer.append("])");
		} else {
			visit(inode);
		}
		return false;
	}

	public boolean visit(ArrayInitializer node) {
		// as in: public String[] d = {"1", "2"};
		buffer.append(clazzArray(node.resolveTypeBinding(), -1));
		buffer.append(", [");
		@SuppressWarnings("unchecked")
		List<ASTNode> expressions = node.expressions();
		visitList(expressions, ", ");
		buffer.append("])");
		return false;
	}

	public boolean visit(Assignment node) {
		// note that this is not
		// var x = .....
		//
		// includes: =
		// +=, -=, *=, /=, %=
		// &=, |=, ^=
		// <<=
		// >>=
		// >>>=

		Expression left = node.getLeftHandSide();
		Expression right = node.getRightHandSide();
		ITypeBinding leftTypeBinding = left.resolveTypeBinding();
		ITypeBinding rightTypeBinding = right.resolveTypeBinding();
		String rightName = (rightTypeBinding == null ? null : rightTypeBinding.getName());
		String leftName = (leftTypeBinding == null ? null : leftTypeBinding.getName());
		if (leftName == null || rightName == null)
			return false;
		boolean wasArray = isArray;
		isArray = (left instanceof ArrayAccess);
		IVariableBinding toBinding = getLeftVariableBinding(left, leftTypeBinding);
		String op = node.getOperator().toString();
		String opType = (op.length() == 1 ? null : op.substring(0, op.length() - 1));
		boolean needParenthesis = false;
		if (checkStaticBinding(toBinding)) {
			// Static def new Test_Static().y++;
			ASTNode parent = node.getParent();
			needParenthesis = (!haveDirectStaticAccess(left)) && !(parent instanceof Statement);
			if (needParenthesis) {
				buffer.append("(");
			}
			addLeftSidePrefixName(left);
		} else {
			toBinding = null;
		}

		// take care of "=" first

		if (opType == null) {
			left.accept(this);
			buffer.append(" = ");
			addExpressionAsTargetType(right, leftTypeBinding, "=", null);
			if (needParenthesis) {
				buffer.append(")");
			}
			isArray = wasArray;
			return false;
		}

		if ("boolean".equals(leftName)) {
			// |=, &=, ^=
			left.accept(this);
			buffer.append(" = (");
			left.accept(this);
			switch (op) {
			case "|=":
				buffer.append("||");
				break;
			case "&=":
				buffer.append("&&");
				break;
			default:
			case "^=":
				buffer.append("!=");
				break;
			}
			if (right instanceof InfixExpression) {
				buffer.append(" (");
				right.accept(this);
				buffer.append(")");
			} else {
				right.accept(this);
			}
			buffer.append(")");
			isArray = wasArray;
			return false;

		}

		left.accept(this);

		if (!("char".equals(leftName))) {
			if (isNumericType(leftName)) {
				// byte|short|int|long += ...
				buffer.append(" = ");
				addPrimitiveTypedExpression(left, toBinding, leftName, opType, right, rightName, null, true);
				isArray = wasArray;
				return false;
			}
			// not char x ....
			// not boolean x....
			// could be int, byte, short, long with =, ==, or !=
			// could be String x = .....

			buffer.append(' ');
			buffer.append(op);
			buffer.append(' ');
			boolean leftIsString = leftName.equals("String");
			if ("char".equals(rightName)) {
				if (right instanceof CharacterLiteral) {
					// ... = 'c'
					if (leftIsString) {
						buffer.append(getConstantValue(right));
					} else {
						buffer.append(0 + ((CharacterLiteral) right).charValue());
					}
				} else if (leftIsString) {
					// String x = (char)....
					right.accept(this);
				} else {
					// dump ( right ) and check for right being
					// String.charAt(...);
					int pt = buffer.length();
					buffer.append('(');
					right.accept(this);
					buffer.append(")");
					addCharCodeAt(right, pt);
				}
			} else {
				// just add the right operand
				addOperand(right, leftIsString);
			}
			if (needParenthesis) {
				buffer.append(")");
			}
			isArray = wasArray;
			return false;
		}

		// char left op right where op is not just "="

		// could be +=, -=, *=, /=, >>=, etc

		buffer.append(" = String.fromCharCode(");
		if (left instanceof SimpleName || left instanceof QualifiedName) {
			left.accept(this);
		} else {
			buffer.append("(");
			left.accept(this);
			buffer.append(")");
		}
		buffer.append(CHARCODEAT0); // .charCodeAt(0)
		buffer.append(opType);
		buffer.append(' ');
		boolean needCharCode = false;
		if (right instanceof InfixExpression) {
			String constValue = getConstantValue(right);
			if (constValue == null) {
				buffer.append("(");
				boxingNode(right, true);
				buffer.append(")");
			} else {
				buffer.append(constValue);
				needCharCode = (constValue.startsWith("'") || constValue.startsWith("\""));
			}
		} else if ("char".equals(rightName)) {
			Object constValue = right.resolveConstantExpressionValue();
			if (constValue != null && constValue instanceof Character) {
				buffer.append(((Character) constValue).charValue() + 0);
			} else {
				needParenthesis = !(right instanceof ParenthesizedExpression || right instanceof PrefixExpression
						|| right instanceof PostfixExpression);
				if (needParenthesis) {
					buffer.append("(");
				}
				needCharCode = boxingNode(right, false);
				if (needParenthesis) {
					buffer.append(")");
				}
			}
		} else {
			boxingNode(right, true);
			needCharCode = false;
		}
		if (needCharCode)
			buffer.append(CHARCODEAT0);
		buffer.append(')');
		isArray = wasArray;
		return false;
	}

	public boolean visit(BooleanLiteral node) {
		buffer.append(node.booleanValue());
		return false;
	}

	public boolean visit(CastExpression node) {
		Expression expression = node.getExpression();
		ITypeBinding expBinding = expression.resolveTypeBinding();
		Type typeTO = node.getType();
		String fromValue = "";
		String toValue = "";
		// assume that casting is intentional to adjust the integer type
		if (expBinding != null && typeTO.isPrimitiveType()) {
			String nameFROM = expBinding.getName();
			String nameTO = ((PrimitiveType) typeTO).getPrimitiveTypeCode().toString();
			if (!nameTO.equals(nameFROM)) {
				addPrimitiveTypedExpression(null, null, nameTO, null, expression, nameFROM, null, false);
				return false;
			}
		}
		buffer.append(fromValue);
		expression.accept(this);
		buffer.append(toValue);
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
		// tricky part here is that the overall expression should have a target,
		// not the individual ones.
		ITypeBinding binding = node.resolveTypeBinding();
		Expression expThen = node.getThenExpression();
		Expression expElse = node.getElseExpression();
		node.getExpression().accept(this);
		buffer.append(" ? ");
		addExpressionAsTargetType(expThen, binding, "e", null);
		buffer.append(" : ");
		addExpressionAsTargetType(expElse, binding, "e", null);
		return false;
	}

	public boolean visit(FieldAccess node) {
		// Field access expression AST node type.
		// FieldAccess:
		// Expression . Identifier
		//
		//
		// Note that there are several kinds of expressions that resemble field
		// access expressions: qualified names, this expressions, and super
		// field access expressions. The following guidelines help with correct
		// usage:
		// •An expression like "foo.this" can only be represented as a this
		// expression (ThisExpression) containing a simple name. "this" is a
		// keyword, and therefore invalid as an identifier.
		// •An expression like "this.foo" can only be represented as a field
		// access expression (FieldAccess) containing a this expression and a
		// simple name. Again, this is because "this" is a keyword, and
		// therefore invalid as an identifier.
		// •An expression with "super" can only be represented as a super field
		// access expression (SuperFieldAccess). "super" is a also keyword, and
		// therefore invalid as an identifier.
		// •An expression like "foo.bar" can be represented either as a
		// qualified name (QualifiedName) or as a field access expression
		// (FieldAccess) containing simple names. Either is acceptable, and
		// there is no way to choose between them without information about what
		// the names resolve to (ASTParser may return either).
		// •Other expressions ending in an identifier, such as "foo().bar" can
		// only be represented as field access expressions (FieldAccess).

		IVariableBinding varBinding = node.resolveFieldBinding();
		Expression expression = node.getExpression();
		if (checkStaticBinding(varBinding)) {
			// e.g. i += 3 + y + ++(new >>Test_Static<<().y);
			buffer.append('(');
		} else {
			varBinding = null;
		}

		expression.accept(this);

		if (varBinding != null) {
			buffer.append(", ");
			addQualifiedNameFromBinding(varBinding);
			buffer.append(')');
		}
		buffer.append(".");
		node.getName().accept(this);
		return false;
	}

	/**
	 * Infix operators (typesafe enumeration).
	 * 
	 * <pre>
	 * InfixOperator:<code>
	 *    <b>*</b>	TIMES
	 *    <b>/</b>  DIVIDE
	 *    <b>%</b>  REMAINDER
	 *    <b>+</b>  PLUS
	 *    <b>-</b>  MINUS
	 *    <b>&lt;&lt;</b>  LEFT_SHIFT
	 *    <b>&gt;&gt;</b>  RIGHT_SHIFT_SIGNED
	 *    <b>&gt;&gt;&gt;</b>  RIGHT_SHIFT_UNSIGNED
	 *    <b>&lt;</b>  LESS
	 *    <b>&gt;</b>  GREATER
	 *    <b>&lt;=</b>  LESS_EQUALS
	 *    <b>&gt;=</b>  GREATER_EQUALS
	 *    <b>==</b>  EQUALS
	 *    <b>!=</b>  NOT_EQUALS
	 *    <b>^</b>  XOR
	 *    <b>&amp;</b>  AND
	 *    <b>|</b>  OR
	 *    <b>&amp;&amp;</b>  CONDITIONAL_AND
	 *    <b>||</b>  CONDITIONAL_OR</code>
	 * </pre>
	 */

	public boolean visit(InfixExpression node) {
		// includes
		//
		// * / % + -
		// << >> >>>
		// < > <= >= == !=
		// ^ & |
		// && ||

		Expression left = node.getLeftOperand();
		Expression right = node.getRightOperand();
		List<?> extendedOperands = node.extendedOperands();

		String constValue = getConstantValue(node);
		if (constValue != null) {
			buffer.append(constValue);
			return false;
		}

		ITypeBinding expTypeBinding = node.resolveTypeBinding();
		if (expTypeBinding == null)
			return false;
		String expTypeName = expTypeBinding.getName();
		boolean isToString = (expTypeName.indexOf("String") >= 0);

		String operator = node.getOperator().toString();
		boolean isBitwise = isBitwiseBinaryOperator(node);
		boolean isComparison = (!isBitwise && "!==<=>=".indexOf(operator) >= 0);
		ITypeBinding leftTypeBinding = left.resolveTypeBinding();
		ITypeBinding rightTypeBinding = right.resolveTypeBinding();
		if (leftTypeBinding == null || rightTypeBinding == null)
			return false;
		String leftName = leftTypeBinding.getName();
		String rightName = rightTypeBinding.getName();
		if ("/".equals(operator) && leftTypeBinding.isPrimitive() && isNumericType(leftName)
				&& isNumericType(rightName)) {
			// left and right are one of byte, short, int, or long
			// division must take care of this.
			addPrimitiveTypedExpression(left, null, leftName, operator, right, rightName, extendedOperands, false);
			return false;
		}

		boolean toBoolean = "boolean".equals(expTypeName);

		char pre = ' ';
		char post = ' ';
		if (isBitwise && toBoolean) {
			pre = '(';
			post = ')';
			buffer.append("!!(");
		}

		boolean isDirect = isBitwise && !toBoolean;
		if (isDirect || isComparison) {

			// we do not have to do a full conversion
			// possibilities include
			// numeric op numeric
			// char/Character op char/Character
			// String op String
			//
			if (!isDirect)
				switch (leftName) {
				case "char":
				case "Character":
				case "String":
					switch (rightName) {
					case "char":
					case "Character":
					case "String":
						isDirect = true;
						break;
					default:
						break;
					}
					break;
				default:
					if (isNumericType(leftName) && isNumericType(rightName))
						isDirect = true;
					break;
				}

			if (isDirect) {
				boxingNode(left, false);
				buffer.append(' ');
				buffer.append(operator);
				buffer.append(' ');
				boxingNode(right, false);
				addExtendedOperands(extendedOperands, operator, pre, post, isToString);
				return false;
			}
		}

		// left
		addOperand(left, isToString);
		buffer.append(' ');
		// op
		buffer.append(operator);
		if (("==".equals(operator) || "!=".equals(operator)) && !leftTypeBinding.isPrimitive()
				&& !(left instanceof NullLiteral) && !(right instanceof NullLiteral)) {
			buffer.append('=');
		}
		buffer.append(' ');
		// right
		addOperand(right, isToString);

		// The extended operands is the preferred way of representing deeply
		// nested expressions of the form L op R op R2 op R3... where the same
		// operator appears between all the operands (the most common case being
		// lengthy string concatenation expressions). Using the extended
		// operands keeps the trees from getting too deep; this decreases the
		// risk is running out of thread stack space at runtime when traversing
		// such trees. ((a + b) + c) + d would be translated to: leftOperand: a
		// rightOperand: b extendedOperands: {c, d} operator: +

		addExtendedOperands(extendedOperands, operator, pre, post, isToString);
		if (toBoolean)
			buffer.append(post);
		return false;
	}

	public boolean visit(InstanceofExpression node) {
		Type right = node.getRightOperand();
		ITypeBinding binding = right.resolveBinding();
		if (binding == null)
			return false;
		buffer.append("Clazz.instanceOf(");
		node.getLeftOperand().accept(this);
		buffer.append(", ");
		if (right instanceof ArrayType) {
			buffer.append(clazzArray(binding, 1));
		} else {
			buffer.append("\"" + removeBrackets(binding.getQualifiedName()) + "\"");
			// right.accept(this);
		}
		buffer.append(")");
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
			if (token.endsWith("F") || token.endsWith("f") || token.endsWith("D") || token.endsWith("d")) {
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
		ITypeBinding binding = node.resolveTypeBinding();
		if (binding != null)
			buffer.append("null");
		return super.visit(node);
	}

	public boolean visit(ParenthesizedExpression node) {
		buffer.append("(");
		node.getExpression().accept(this);
		buffer.append(")");
		return false;
	}

	/**
	 * Postfix operators (typesafe enumeration).
	 * 
	 * <pre>
	 * PostfixOperator:
	 *    <b><code>++</code></b>  <code>INCREMENT</code>
	 *    <b><code>--</code></b>  <code>DECREMENT</code>
	 * </pre>
	 */
	public boolean visit(PostfixExpression node) {
		return addPrePost(node, node.getOperand(), node.getOperator().toString(), true);
	}

	/**
	 * Prefix operators (typesafe enumeration).
	 * 
	 * <pre>
	 * PrefixOperator:
	 *    <b><code>++</code></b>  <code>INCREMENT</code>
	 *    <b><code>--</code></b>  <code>DECREMENT</code>
	 *    <b><code>+</code></b>  <code>PLUS</code>
	 *    <b><code>-</code></b>  <code>MINUS</code>
	 *    <b><code>~</code></b>  <code>COMPLEMENT</code>
	 *    <b><code>!</code></b>  <code>NOT</code>
	 * </pre>
	 */
	public boolean visit(PrefixExpression node) {
		// Q: Can you really have a constant here?
		String constValue = getConstantValue(node);
		if (constValue != null) {
			buffer.append(constValue);
			return false;
		}
		String op = node.getOperator().toString();
		if ("~".equals(op)) {
			buffer.append(op);
			return super.visit(node);
		}
		return addPrePost(node, node.getOperand(), node.getOperator().toString(), false);
	}

	public boolean visit(QualifiedName node) {
		// page.x =...
		if (NameMapper.isJ2SSimpleQualified(node)) {
			String constValue = getConstantValue(node);
			if (constValue != null) {
				buffer.append(constValue);
				return false;
			}
		}
		IBinding nameBinding = node.resolveBinding();
		IVariableBinding varBinding = (nameBinding instanceof IVariableBinding ? (IVariableBinding) nameBinding : null);
		ASTNode parent = node.getParent();
		Name qualifier = node.getQualifier();
		if (!checkStaticBinding(varBinding) || qualifier.resolveBinding() instanceof ITypeBinding)
			varBinding = null;
		boolean skipQualifier = false;// (allowExtensions &&
										// ExtendedAdapter.isHTMLClass(qualifier.toString(),
										// true));
		String className = null;
		if (!skipQualifier && parent != null && !(parent instanceof QualifiedName)) {
			while (qualifier instanceof QualifiedName) {
				IBinding binding = qualifier.resolveBinding();
				if (binding != null && !(binding instanceof IVariableBinding)) {
					Name xqualifier = ((QualifiedName) qualifier).getQualifier();
					if (xqualifier instanceof QualifiedName) {
						IBinding xbinding = xqualifier.resolveBinding();
						if (xbinding != null && !(xbinding instanceof IVariableBinding)) {
							qualifier = xqualifier;
							continue;
						}
					}
				}
				break;
			}
			IBinding binding = qualifier.resolveBinding();
			if (binding != null && !(binding instanceof IVariableBinding)) {
				ITypeBinding typeBinding = qualifier.resolveTypeBinding();
				if (typeBinding != null) {
					// Compiling inner Class or enum type, like:
					// RadiusData.EnumType e = RadiusData.EnumType.THREE;
					// avoid generate duplicated RadiusData
					className = typeBinding.getQualifiedName();
					// if (allowExtensions)
					// className = ExtendedAdapter.trimName(className, false);
					// // ??
					// probably
					// should
					// be
					// true
					if (className.indexOf("java.lang.") == 0) {
						className = className.substring(10);
					}
					if (isStatic(nameBinding)) {
						className = getQualifiedStaticName(null, className, true, true, false);
					}
				}
			}
		}

		if (!skipQualifier) {
			if (varBinding != null) {
				if (qualifier instanceof SimpleName) {
					addQualifiedNameFromBinding(varBinding);
					// buffer.append("<qsn<");
				} else {
					buffer.append('(');
					if (className == null)
						qualifier.accept(this);
					else
						buffer.append(className);
					buffer.append(", ");
					addQualifiedNameFromBinding(varBinding);
					buffer.append(')');
				}
			} else if (className == null) {
				node.getQualifier().accept(this);
			} else {
				buffer.append(className);
			}
			buffer.append('.');
		}
		node.getName().accept(this);
		return false;
	}

	public boolean visit(SimpleName node) {
		// var x = ...
		// this.pages ....
		buffer.append(getQualifiedSimpleName(node));
		return false;
	}

	/**
	 * also sets b$name
	 * 
	 * @param node
	 * @return
	 */
	private String getQualifiedSimpleName(SimpleName node) {
		// xxx.yyy.zzz...
		String constValue = getConstantValue(node);
		if (constValue != null) {
			return constValue;
		}
		IBinding binding = node.resolveBinding();
		// if (allowExtensions && binding instanceof ITypeBinding
		// && ExtendedAdapter.isHTMLClass(((ITypeBinding)
		// binding).getQualifiedName(), false)) {
		// return node.getIdentifier();
		// }
		ASTNode xparent = node.getParent();
		if (xparent == null) {
			return node.toString();
		}
		char leadingChar = getLastChar();
		boolean isQualified = (leadingChar == '.');
		// looking for "." or '"' here.
		if (isQualified && xparent instanceof QualifiedName) {
			if (!(binding instanceof IVariableBinding))
				return node.toString();
			IVariableBinding varBinding = (IVariableBinding) binding;
			ITypeBinding declaringClass = varBinding.getVariableDeclaration().getDeclaringClass();
			return NameMapper.getJ2SCheckedFieldName(declaringClass, NameMapper.getJ2SName(node));
		}
		if (xparent instanceof ClassInstanceCreation && !(binding instanceof IVariableBinding)) {
			String name = (binding == null ? NameMapper.getJ2SName(node)
					: node.resolveTypeBinding().getQualifiedName());
			return assureQualifiedName(name);
		}
		if (binding == null) {
			String name = getShortenedQualifiedName(NameMapper.getJ2SName(node));
			return NameMapper.getJ2SValidFieldName$Qualifier(name, true);
		}
		if (binding instanceof IVariableBinding)
			return simpleNameInVarBinding(node, leadingChar, (IVariableBinding) binding);
		if (binding instanceof IMethodBinding)
			return simpleNameInMethodBinding(node, isQualified, (IMethodBinding) binding);

		ITypeBinding typeBinding = node.resolveTypeBinding();
		// >>Math<<.max
		return NameMapper.getJ2SValidFieldName$Qualifier(typeBinding == null ? node.getFullyQualifiedName()
				: assureQualifiedName(typeBinding.getQualifiedName()), true);
	}

	private char getLastChar() {
		return (buffer.length() == 0 ? '\0' : buffer.charAt(buffer.length() - 1));
	}

	/**
	 * TODO: This complicated method needs documenting
	 * 
	 * @param node
	 * @param isQualified
	 * @param mBinding
	 * @return
	 */
	private String simpleNameInMethodBinding(SimpleName node, boolean isQualified, IMethodBinding mBinding) {
		String name = getShortenedQualifiedName(NameMapper.getJ2SName(node));
		String ret = "";
		if (isStatic(mBinding)) {
			IMethodBinding variableDeclaration = mBinding.getMethodDeclaration();
			ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
			boolean isClassString = false;
			if (declaringClass != null) {
				isClassString = "java.lang.String".equals(declaringClass.getQualifiedName());
				ASTNode parent = node.getParent();
				if (parent instanceof MethodInvocation) {
					MethodInvocation mthInv = (MethodInvocation) parent;
					if (mthInv.getExpression() == null) {
						String cname = declaringClass.getQualifiedName();
						cname = assureQualifiedName(cname);
						if (cname.length() > 0)
							ret = cname + ".";
					}
				}
			}
			if (isClassString && "$valueOf".equals(name))
				name = "valueOf";
		} else {
			ASTNode parent = node.getParent();
			boolean checkNameViolation = false;
			if (parent != null && !(parent instanceof FieldAccess)) {
				IMethodBinding methodDeclaration = mBinding.getMethodDeclaration();
				ITypeBinding declaringClass = methodDeclaration.getDeclaringClass();
				if (!isQualified && declaringClass != null && getUnqualifiedClassName() != null) {
					String className = declaringClass.getQualifiedName();
					checkNameViolation = !("java.lang.String".equals(className) && "valueOf".equals(name));
					ret = getClassNameAndDot(parent, declaringClass, Modifier.isPrivate(mBinding.getModifiers()));
				}
			}
			if (checkNameViolation)
				ret += NameMapper.getJ2SValidFieldName$Qualifier(name, false);
		}
		return ret + name;
	}

	/**
	 * TODO: This complex method needs documenting
	 * 
	 * @param node
	 * @param ch
	 * @param varBinding
	 * @return
	 */
	private String simpleNameInVarBinding(SimpleName node, char ch, IVariableBinding varBinding) {
		String name = null;
		String ret = "";
		IVariableBinding variableDeclaration = varBinding.getVariableDeclaration();
		ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
		if (isStatic(varBinding)) {
			if (ch != '.' && ch != '"' && ch != '\'' && declaringClass != null) {
				name = declaringClass.getQualifiedName();
				if ((name == null || name.length() == 0) && declaringClass.isAnonymous()) {
					name = declaringClass.getBinaryName();
				}
				name = assureQualifiedName(name);
				if (name.length() != 0) {
					ret = getQualifiedStaticName(null, name, true, true, false) + ".";
					//ch = '.';
				}
			}
		} else {
			ASTNode parent = node.getParent();
			if (parent != null && !(parent instanceof FieldAccess)) {
				if (declaringClass != null && getUnqualifiedClassName() != null && ch != '.') {
					ret = getClassNameAndDot(parent, declaringClass, false);
					//ch = '.';
				}
			}
			String fieldVar = null;
			if (isAnonymousClass() && Modifier.isFinal(varBinding.getModifiers())
					&& varBinding.getDeclaringMethod() != null) {
				String key = varBinding.getDeclaringMethod().getKey();
				if (methodDeclareNameStack.size() == 0 || !key.equals(methodDeclareNameStack.peek())) {
					buffer.append("this.$finals.");
					if (currentBlockForVisit != -1) {
						List<VariableAdapter.FinalVariable> finalVars = getVariableList('f');
						List<VariableAdapter.FinalVariable> visitedVars = getVariableList('v');
						int size = finalVars.size();
						for (int i = 0; i < size; i++) {
							VariableAdapter.FinalVariable vv = finalVars.get(size - i - 1);
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
			if (declaringClass == null)
				name = (fieldVar == null ? getNormalVariableName(node.getIdentifier()) : fieldVar);
		}
		if (declaringClass != null)
			name = NameMapper.getJ2SName(node);
		ret += NameMapper.getJ2SCheckedFieldName(declaringClass, name);//, ch != '.');
		return ret;
	}

	public boolean visit(SimpleType node) {
		ITypeBinding binding = node.resolveBinding();
		buffer.append(binding == null ? node : assureQualifiedName(binding.getQualifiedName()));
		return false;
	}

	public boolean visit(StringLiteral node) {
		buffer.append(node.getEscapedValue());
		return false;
	}

	/**
	 *  SuperFieldAccess:
     *
     *[ ClassName . ] super . Identifier
     *
	 */
	public boolean visit(SuperFieldAccess node) {
		ITypeBinding classBinding = resolveAbstractOrAnonymousBinding(node);
		String fieldName = NameMapper.getJ2SName(node.getName());
		buffer.append("this.");
		if (NameMapper.isJ2SInheritedFieldName(classBinding, fieldName)) {
			if (classBinding != null) {
				IVariableBinding[] declaredFields = classBinding.getDeclaredFields();
				for (int i = 0; i < declaredFields.length; i++) {
					String superFieldName = NameMapper.getJ2SVariableName(declaredFields[i]);
					if (fieldName.equals(superFieldName)) {
						buffer.append(NameMapper.getJ2SValidFieldName$Qualifier(fieldName, false));
						buffer.append(NameMapper.getJ2SFieldName$Appended(classBinding.getSuperclass(), fieldName));
						return false;
					}
				}
			}
		}
		buffer.append(NameMapper.getJ2SValidFieldName$Qualifier(fieldName, true));
		return false;
	}

	/**
	 *   this or ClassName.this   
	 * 
	 */
	public boolean visit(ThisExpression node) {
		Name className = node.getQualifier();
		if (className != null) {
			ASTNode classNode = getAbstractOrAnonymousParentForNode(node);
			if (classNode != null && classNode.getParent() != null // CompilationUnit
					&& classNode.getParent().getParent() != null) {
				// just checking for top level? 
				buffer.append(getSyntheticReference(node.resolveTypeBinding().getQualifiedName()));
				return false;
			}
		}
		buffer.append("this");
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
			// int[][].class --> Clazz.array(Integer.TYPE, -2);
			buffer.append(clazzArray(binding, 1));
		} else {
			// BH we are creating a new Class object around this class
			// if it is an interface, then we explicitly add .$methodList$
			buffer.append("Clazz.getClass(" + getQualifiedStaticName(null,
					ensureNameIfLocal(binding.getQualifiedName(), binding, node.getParent()), true, true, false));
			if (binding.isInterface())
				addInterfaceMethodListForLiteral(binding);
			buffer.append(")");
		}
		return false;
	}

	private void addInterfaceMethodListForLiteral(ITypeBinding binding) {
		//System.err.println("interface literal -- adding methods for " + binding.getQualifiedName());
		buffer.append(",[");
		IMethodBinding[] methods = binding.getDeclaredMethods();
		for (int i = 0; i < methods.length; i++) {
			if (i > 0)
				buffer.append(",");
			String name = getJ2SQualifiedName(methods[i].getName(), null, methods[i], null, true);
			buffer.append("'").append(name).append("'");
		}
		buffer.append("]");
	}

	@SuppressWarnings("unchecked")
	public boolean visit(VariableDeclarationExpression node) {
		buffer.append("var ");
		visitList(node.fragments(), ", ");
		return false;
	}

	public boolean visit(VariableDeclarationFragment node) {
		SimpleName name = node.getName();
		IBinding binding = name.resolveBinding();
		if (binding == null)
			return false;
		String identifier = name.getIdentifier();
		VariableAdapter.FinalVariable f = new VariableAdapter.FinalVariable(blockLevel, identifier,
				methodDeclareNameStack.size() == 0 ? null : (String) methodDeclareNameStack.peek());
		addVariable(f, identifier, binding);
		name.accept(this);
		Expression right = node.getInitializer();
		ITypeBinding rightBinding = (right == null ? null : right.resolveTypeBinding());
		if (rightBinding == null)
			return false;
		buffer.append(" = ");
		addExpressionAsTargetType(right, name.resolveTypeBinding(), "v", null);
		return false;
	}

	////////// END visit/endVisit ///////////

	private boolean addPrePost(Expression node, Expression left, String op, boolean isPost) {
		ASTNode parent = node.getParent();
		ITypeBinding leftTypeBinding = left.resolveTypeBinding();
		IVariableBinding varBinding = getLeftVariableBinding(left, leftTypeBinding);
		boolean isChar = (leftTypeBinding != null && leftTypeBinding.isPrimitive()
				&& "char".equals(leftTypeBinding.getName()));
		String term = "";
		if (checkStaticBinding(varBinding)) {
			if ((isChar || !haveDirectStaticAccess(left))
					&& !(parent instanceof Statement || parent instanceof ParenthesizedExpression)) {
				buffer.append("(");
				term = ")";
			}
			addLeftSidePrefixName(left);
		} else {
			varBinding = null;
		}

		if (isPost) {
			if (isChar) {
				addCharacterPrePostFix(left, parent, varBinding, op, false);
			} else {
				addFieldName(left, varBinding);
				buffer.append(op);
			}
		} else {
			if (isChar) {
				if (varBinding == null)
					buffer.append("(");
				addCharacterPrePostFix(left, (varBinding == null ? parent : null), varBinding, op, true);
				if (varBinding == null)
					buffer.append(")");
			} else {
				buffer.append(op);
				addFieldName(left, varBinding);
			}

		}
		buffer.append(term);
		return false;
	}

	private static boolean isBoxTyped(Expression exp) {
		return exp.resolveBoxing() || exp.resolveUnboxing();
	}

	private final static boolean isMethodQualified(String className, String methodName) {
		for (int i = nonQualifiedClasses.length; --i >= 0;) {
			String s = nonQualifiedClasses[i];
			if (className.equals(s)) {
				// leave selected String methods the same
				return (className.equals("java.lang.String")
						&& "charAt,codePointAt,format,getBytes,substring,indexOf,lastIndexOf,toUpperCase,toLowerCase,trim,valueOf"
								.indexOf(methodName) < 0);
			}
		}
		return true;
	}

	private static boolean isNumericType(String type) {
		return (type != null && type.length() > 1 && "int long byte short".indexOf(type) >= 0);
	}

	/**
	 * Check to see if this class is in a package for which we exclude parameter
	 * qualification
	 * 
	 * @param className
	 * @return
	 */
	public static boolean isPackageQualified(String className) {
		for (int i = nonQualifiedPackages.length; --i >= 0;) {
			String s = nonQualifiedPackages[i];
			if (s.length() > 0 && (s.startsWith(".") ? className.contains(s) : className.startsWith(s)))
				return false;
		}
		return true;
	}

	private static boolean isStatic(IBinding b) {
		return b != null && Modifier.isStatic(b.getModifiers());
	}

	/**
	 *
	 * @param type
	 * @param dimFlag
	 *            -1 : initialized depth; n > 0 uninitialized depth; 0: not
	 *            necessary
	 * @return JavaScript for array creation
	 */
	private String clazzArray(ITypeBinding type, int dimFlag) {
		ITypeBinding ebinding = type.getElementType();
		if (ebinding == null)
			ebinding = type; // creating for Enum
		String params = (ebinding.isPrimitive() ? getPrimitiveTYPE(ebinding.getName())
				: getQualifiedStaticName(null, ebinding.getQualifiedName(), true, true, false))
				+ (dimFlag == 0 ? "" : ", " + Math.abs(dimFlag) * type.getDimensions() * -1);
		return "Clazz.array(" + params + (dimFlag > 0 ? ")" : "");
	}

	public static void setNoQualifiedNamePackages(String names) {
		names = defaultNonQualified + (names == null ? "" : names);
		nonQualifiedPackages = names.split(";");
		for (int i = nonQualifiedPackages.length; --i >= 0;) {
			String s = nonQualifiedPackages[i];
			if (s.startsWith("*."))
				nonQualifiedPackages[i] = s.substring(1);
			nonQualifiedPackages[i] = (s.endsWith("*") ? s.substring(0, s.length() - 1) : s + ".");
		}
	}

	////////////////////////////////

	/**
	 * 
	 * @param left
	 * @param parent
	 *            null for prefix
	 * @param varBinding
	 * @param op
	 * @param b
	 */
	private void addCharacterPrePostFix(Expression left, ASTNode parent, IVariableBinding varBinding, String op,
			boolean isPrefix) {
		boolean addAnonymousWrapper = !isPrefix && !(parent instanceof Statement);
		if (addAnonymousWrapper) {
			buffer.append("($p$ = ");
			addFieldName(left, varBinding);
			buffer.append(", ");
			trailingBuffer.addType("p");
		}

		addFieldName(left, varBinding);
		buffer.append(" = String.fromCharCode(");
		addFieldName(left, varBinding);
		buffer.append(CHARCODEAT0).append("++".equals(op) ? "+1" : "-1");
		buffer.append(")");
		if (addAnonymousWrapper) {
			buffer.append(", $p$)");
		}
	}

	/**
	 * check to change charAt to charCodeAt
	 * 
	 * @param right
	 * @param pt
	 */
	private void addCharCodeAt(Expression right, int pt) {
		String charCodeAt0 = CHARCODEAT0;
		if (right instanceof MethodInvocation) {
			// if possible, just replace "charAt" with "charCodeAt"
			MethodInvocation m = (MethodInvocation) right;
			if ("charAt".equals(m.getName().toString())) {
				if ((pt = buffer.indexOf(".charAt", pt)) >= 0) {
					charCodeAt0 = "Code" + buffer.substring(pt + 5); // At....
					buffer.setLength(pt + 5);
				}
			}
		}
		buffer.append(charCodeAt0);
	}

	/**
	 * Append an expression, coercing to primitive numeric types of the target
	 * parameter if needed. Used for Method arguments and return values, as well
	 * as variable declaration fragments, where we know the target type and no
	 * operator is involved.
	 * 
	 * 
	 * @param exp
	 * @param targetType
	 *            ITypeBinding or TYPE or string
	 * @param op
	 *            just an identifier of the context: = for assignment, r for
	 *            return statement, v for variable declaration fragment, p for
	 *            method parameter, q for first parameter of indexOf or
	 *            lastIndexOf, which are officially ints
	 */
	private void addExpressionAsTargetType(Expression exp, Object targetType, String op, List<?> extendedOperands) {
		if (targetType == null
				|| exp instanceof CastExpression && ((CastExpression) exp).getExpression() instanceof NullLiteral) {
			buffer.append("null");
			return;
		}
		ITypeBinding expTypeBinding = exp.resolveTypeBinding();
		if (expTypeBinding != null) {
			// BH: Question: When does typeBinding == null?
			// A: when there is a compilation error, I think.
			// OK, now we have the same situation as any operand.
			String rightName = expTypeBinding.getName();
			if (rightName.equals("char") && op == "q") {
				boxingNode(exp, false);
				return;
			}
			String paramName = (exp.resolveTypeBinding().isArray() ? ";"
					: targetType instanceof ITypeBinding ? ((ITypeBinding) targetType).getName()
							: targetType.toString());
			boolean isNumeric = isNumericType(paramName);
			if ((isNumeric || paramName.equals("char")) && !isBoxTyped(exp)) {
				// using operator "m" to limit int application of $i$

				addPrimitiveTypedExpression(null, null, paramName, op, exp, rightName, extendedOperands, false);
			} else {
				// char f() { return Character }
				// Character f() { return char }
				// int f() { return Character }
				boxingNode(exp, isNumeric);
			}
		}
	}

	private void addExtendedOperands(List<?> extendedOperands, String operator, char pre, char post,
			boolean isToString) {
		if (extendedOperands.size() > 0) {
			buffer.append(' ');
			for (Iterator<?> iter = extendedOperands.iterator(); iter.hasNext();) {
				buffer.append(operator);
				buffer.append(pre);
				ASTNode element = (ASTNode) iter.next();
				addOperand((Expression) element, isToString);
				buffer.append(post);
			}
		}
	}

	private void addFieldName(Expression left, IVariableBinding qualifier) {
		if (qualifier != null) {
			addQualifiedNameFromBinding(qualifier);
			buffer.append('.');
			left = (left instanceof QualifiedName ? ((QualifiedName) left).getName()
					: left instanceof FieldAccess ? ((FieldAccess) left).getName() : left);
		}
		boxingNode(left, false);
	}

	/**
	 * add a reference to the static field prior to defining it.
	 * 
	 * @param left
	 */
	private void addLeftSidePrefixName(Expression left) {
		if (left instanceof QualifiedName) {
			if ((left = ((QualifiedName) left).getQualifier()) instanceof SimpleName)
				return;
		} else if (left instanceof FieldAccess) {
			if ((left = ((FieldAccess) left).getExpression()) instanceof ThisExpression)
				return;
		} else {
			return;
		}
		left.accept(this);
		buffer.append(", ");
	}

	@SuppressWarnings("null")
	private void addMethodArguments(ITypeBinding[] parameterTypes, boolean methodIsVarArgs, List<?> arguments,
			boolean isIndexOf) {
		String post = ", ";
		int nparam = parameterTypes.length;
		int argCount = arguments.size();
		for (int i = 0; i < nparam; i++) {
			ITypeBinding paramType = parameterTypes[i];
			Expression arg = (i < argCount ? (Expression) arguments.get(i) : null);
			String op = (isIndexOf && i == 0 ? "q" : "p");
			if (i == nparam - 1) {
				// BH: can't just check for an array; it has to be an array with
				// the right number of dimensions
				if (nparam != argCount || methodIsVarArgs && paramType.isArray()
						&& arg.resolveTypeBinding().getDimensions() != paramType.getDimensions()
						&& !(arg instanceof NullLiteral)) {
					buffer.append("[");
					for (int j = i; j < argCount; j++) {
						addExpressionAsTargetType((Expression) arguments.get(j), paramType, op, null);
						if (j != argCount - 1) {
							buffer.append(", ");
						}
					}
					buffer.append("]");
					break;
				}
				post = "";
			}
			addExpressionAsTargetType(arg, paramType, op, null);
			buffer.append(post);
		}
	}

	/**
	 * Do not allow char or Character in a switch or array; instead use int
	 * 
	 * @param exp
	 */
	private void addNonCharacter(Expression exp) {
		String name = exp.resolveTypeBinding().getName();
		switch (name) {
		case "char":
		case "Character":
			addOperand(exp, false);
			break;
		default:
		case "String":
			exp.accept(this);
			break;
		}
	}

	/**
	 * add the operand, checking to see if it needs some adjustment:
	 * 
	 * (a) String + x where x is {double/float} requires boxing
	 * Double/Float(x).toString()
	 * 
	 * (b) String + x where x is {Double/Float} requires added .toString()
	 * 
	 * (c) Character and char to numeric requires addition of .$c()
	 * 
	 * 
	 * 
	 * @param exp
	 * @param isToString
	 */
	private void addOperand(Expression exp, boolean isToString) {
		ITypeBinding binding = exp.resolveTypeBinding();
		String name = binding.getName();
		if (isToString) {
			String prefix = null, suffix = null;
			switch (name) {
			case "double":
				prefix = "new Double(";
				suffix = ")";
				break;
			case "float":
				prefix = "new Float(";
				suffix = ")";
				break;
			case "Double":
			case "Float":
				prefix = suffix = "";
				break;
			default:
				exp.accept(this);
				break;
			}
			if (prefix != null) {
				buffer.append(prefix);
				exp.accept(this);
				buffer.append(suffix);
				buffer.append(".toString()");
			}
			return;
		}
		if (!binding.isPrimitive() || !"char".equals(name)) {
			boxingNode(exp, !isToString);
			return;
		}
		// to numeric only
		// oddly enough, 'c' is considered a simple
		if (exp instanceof CharacterLiteral) {
			buffer.append(0 + ((CharacterLiteral) exp).charValue());
		} else if (exp instanceof SimpleName || exp instanceof QualifiedName) {
			int pt = buffer.length();
			boxingNode(exp, false);
			if (pt == buffer.length() - 3 && buffer.charAt(pt) == '\'') {
				char c = buffer.charAt(pt + 1);
				buffer.setLength(pt);
				buffer.append((int) c);
			} else {
				buffer.append(CHARCODEAT0);
			}
		} else if (exp instanceof PrefixExpression || exp instanceof PostfixExpression
				|| exp instanceof ParenthesizedExpression) {
			boxingNode(exp, false);
			buffer.append(CHARCODEAT0);
		} else {
			int pt = buffer.length();
			buffer.append("(");
			boxingNode(exp, false);
			buffer.append(")");
			addCharCodeAt(exp, pt);
		}
	}

//	/**
//	 * fix the buffer for number/char issue when generating simple this.foo =
//	 * <constantValue>
//	 * 
//	 * @param code
//	 */
//	private void fixPrimitiveRightSide(Code code) {
//		if (code != PrimitiveType.BOOLEAN) {
//			boolean isCharConst = (buffer.charAt(buffer.length() - 1) == '\'');
//			if (isCharConst != (getPrimitiveDefault(code).charAt(0) == '\'')) {
//				if (!isCharConst) {
//					// char c = 33;
//					buffer.insert(buffer.lastIndexOf(" ") + 1, "String.fromCharCode(");
//					buffer.append(")");
//				} else if (code == PrimitiveType.BYTE) {
//					// byte b = 'c'
//					buffer.insert(buffer.lastIndexOf(" ") + 1, "($b$[0] = ");
//					buffer.append(".$c(), $b$[0])");
//					trailingBuffer.addType("b");
//				} else {
//					// int b = 'c'
//					buffer.append(".$c()");
//				}
//			}
//		}
//	}

	private String getPrimitiveDefault(Code code) {
		return (code == PrimitiveType.BOOLEAN ? "false" : code == PrimitiveType.CHAR ? "'\\0'" : "0");
	}

	/**
	 * A general method to handle implicit casting.
	 * 
	 * @param left
	 * @param assignmentBinding
	 * @param leftName
	 * @param op
	 * @param right
	 * @param rightName
	 */
	private void addPrimitiveTypedExpression(Expression left, IVariableBinding assignmentBinding, String leftName,
			String op, Expression right, String rightName, List<?> extendedOperands, boolean isAssignment) {
		// byte|short|int|long /= ...
		// convert to proper number of bits

		// byte a |= right

		// becomes

		// a = ($b$[0] = a | right, $b$[0])

		String classIntArray = null;
		String more = null;
		boolean fromChar = ("char".equals(rightName));
		boolean fromIntType = ("long int short byte".indexOf(rightName) >= 0);
		boolean addParens = (op != "r" || fromChar);
		boolean isDiv = "/".equals(op);
		boolean toChar = false;
		switch (leftName) {
		case "char":
			if (!fromChar) {
				buffer.append("String.fromCharCode(");
				more = ")";
				addParens = false;
			}
			toChar = true;
			break;
		default:
			// double, float
			break;
		case "long":
			if (!fromIntType || isDiv) {
				more = "|0)";
				addParens = true;
			}
			break;
		case "int":
			if (op != null && (!isDiv && fromIntType) || fromChar || rightName.equals("short") || right.equals("byte"))
				break;
			more = "|0)";
			addParens = true;
			break;
		case "short":
			if (right.equals("byte") && !isDiv)
				break;
			//$FALL-THROUGH$
		case "byte":
			if (isArray) {
				more = "|0)";
				addParens = true;
			} else {
				classIntArray = "$" + leftName.charAt(0) + "$[0]"; // $i$, etc.
				trailingBuffer.addType(leftName);
			}
			break;
		}
		boolean wasArray = isArray;
		if (classIntArray != null) {
			if (addParens)
				buffer.append("(");
			buffer.append(classIntArray).append(" = ");
			isArray = true;
		} else if (more == "|0)") {
			buffer.append("(");
		}
		if (left != null) {
			// a += b
			addFieldName(left, assignmentBinding);
			buffer.append(op);
			if (isAssignment)
				buffer.append("(");
		}
		if (!boxingNode(right, fromChar) && fromChar && !toChar) {
			buffer.append(CHARCODEAT0);
		}
		if (extendedOperands != null) {
			addExtendedOperands(extendedOperands, op, ' ', ' ', false);
		}
		if (left != null && isAssignment) {
			buffer.append(")");
		}
		if (classIntArray != null) {
			// this is necessary because in JavaScript, (a=3.5) will be 3.5, not
			// a:
			// a = new Int8Array(1)
			// (a[0]=3.4, a[0])
			// 3
			// (a[0]=3.4)
			// 3.4
			buffer.append(", ").append(classIntArray);
			if (addParens)
				buffer.append(")");
			isArray = wasArray;
		} else if (more != null)
			buffer.append(more);
	}

	/**
	 * for example: new Test_Static().y++
	 * 
	 * @param varBinding
	 */
	private void addQualifiedNameFromBinding(IVariableBinding varBinding) {
		appendShortenedQualifiedName(global_PackageName, varBinding.getDeclaringClass().getQualifiedName(),
				isStatic(varBinding), true);
	}

	private void addVariable(VariableAdapter.FinalVariable f, String identifier, IBinding binding) {
		List<VariableAdapter.FinalVariable> finalVars = getVariableList('f');
		List<VariableAdapter.FinalVariable> normalVars = getVariableList('n');
		f.toVariableName = identifier;
		normalVars.add(f);
		if (Modifier.isFinal(binding.getModifiers()))
			finalVars.add(f);
	}

	/**
	 * Determine the qualifier for a method or variable. 
	 * 
	 * In the case of private methods, this is "p$.";
	 * for general fields, this will be "this."; for fields in outer classes, we need a synthetic 
	 * references, this.b$[className] that points to the outer object, which may be one or more levels
	 * higher than this one. 
	 * 
	 * Anonymous inner classes may reference either a superclass method/field or one in its declaring class
	 * stack.   
	 *  
	 * @param node either a method or field or local variable
	 * @param declaringClass the class that declares this variable
	 * @param isPrivate
	 * @return qualifier for method or variable
	 */
	private String getClassNameAndDot(ASTNode node, ITypeBinding declaringClass, boolean isPrivate) {
		
		String name = declaringClass.getQualifiedName();
		String ret = "";
		int superLevel = 0;
		boolean isThis = false;
		
		// Search parents of this node for an anonymous or abstract class declaration
		while (node != null) {
			boolean isAnonymous = (node instanceof AnonymousClassDeclaration);
			ITypeBinding typeBinding = (isAnonymous ? ((AnonymousClassDeclaration) node).resolveBinding()
					: node instanceof AbstractTypeDeclaration ? ((AbstractTypeDeclaration) node).resolveBinding()
							: null);
			if (typeBinding != null) {
				superLevel++;
				if (isSuperType(declaringClass, typeBinding)) {
					if (superLevel == 1) {
						ret = (isPrivate ? "p$." : "this.");
						isThis = true;
					}
					name = typeBinding.getQualifiedName();
					if (isAnonymous)
						name = ensureNameIfLocal(name, typeBinding, node);
					break;
				}
			}
			node = node.getParent();
		}
		return (isThis ? ret : getSyntheticReference(name) + ".");
	}

	private String ensureNameIfLocal(String name, ITypeBinding typeBinding, ASTNode parent) {
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
		return name;
	}

	/**
	 * Append a shortened qualified name, possibly using Clazz.load for dynamic
	 * loading
	 * 
	 * @param packageName
	 * @param name
	 * @param isStatic
	 * @param doCache
	 */
	private void appendShortenedQualifiedName(String packageName, String name, boolean isStatic, boolean doCache) {
		name = removeBrackets(name);
		String shortName = (doCache ? assureQualifiedName(name) : assureQualifiedNameNoC$(packageName, name));
		if (isStatic && (shortName.length() < 2 || shortName.charAt(1) != '$')) {
			if (!doCache || isClassKnown(name))
				name = shortName;
			getQualifiedStaticName(null, name, true, doCache, true);
		} else {
			buffer.append(shortName);
		}
	}

	private String getSyntheticReference(String className) {
		b$name = (className.equals(parentClassName) ? ".this$0" : ".b$['" + assureQualifiedNameNoC$(null, className) + "']");
		return "this" + b$name;
	}

	/**
	 * box or unbox as necessary
	 * 
	 * @param element
	 * @param toCharCode
	 *            true to append .c$(), not .valueOf();
	 * @return true if boxing or unboxing
	 */
	private boolean boxingNode(ASTNode element, boolean toCharCode) {
		// Double > x will be unboxed
		// Character == 'c' will be unboxed
		// f$Integer(int) will be boxed
		if (element instanceof Expression) {
			Expression exp = (Expression) element;
			if (exp.resolveBoxing()) {
				// expression is the site of a boxing conversion
				ITypeBinding typeBinding = exp.resolveTypeBinding();
				if (typeBinding.isPrimitive()) {
					String name = typeBinding.getName();
					name = (name.equals("char") ? "Character"
							: name.equals("int") ? "Integer"
									: Character.toUpperCase(name.charAt(0)) + name.substring(1));
					buffer.append("new " + name + "(");
					element.accept(this);
					buffer.append(")");
					return true;
				}
			} else if (exp.resolveUnboxing()) {
				// expression is the site of an unboxing conversion
				ITypeBinding typeBinding = exp.resolveTypeBinding();
				if (!typeBinding.isPrimitive()) {
					String name = typeBinding.getQualifiedName();
					name = (name.indexOf("Integer") >= 0 ? "int"
							: name.indexOf("Character") >= 0 ? "char" : name.replace("java.lang.", "").toLowerCase());
					buffer.append("(");
					element.accept(this);
					buffer.append(toCharCode && name == "char" ? ")" + CHARCODEAT0 : ")." + name + "Value()");
					return true;
				}
			}
			String constValue = getConstantValue(exp);
			if (constValue != null) {
				buffer.append(constValue);
				return false;
			}

		}
		element.accept(this);
		return false;
	}

	private boolean checkSimpleBooleanOperator(String op) {
		return (op.equals("^") || op.equals("|") || op.equals("&"));
	}

	/**
	 * Check to see if we have a static variable.
	 * 
	 * @param varBinding
	 * @return
	 */
	private boolean checkStaticBinding(IVariableBinding varBinding) {
		// ITypeBinding declaring;
		return (isStatic(varBinding) && varBinding.getDeclaringClass() != null
		// && (!allowExtensions ||
		// !ExtendedAdapter.isHTMLClass(declaring.getQualifiedName(), false))
		);
	}

	/**
	 * may return P$ if packageName is not null
	 * 
	 * @param packageName
	 * @param name
	 * @return
	 */
	private String assureQualifiedNameNoC$(String packageName, String name) {
		if (name == null)
			return null;		
		if (name.startsWith("C$."))
			name = getQualifiedClassName() + name.substring(2);
		name = TypeAdapter.getShortenedName(null, name, false);
		return TypeAdapter.assureQualifiedName(packageName, name);
	}

	private String assureQualifiedName(String name) {
		return (name == null ? null
				: TypeAdapter.assureQualifiedName(global_PackageName, getShortenedQualifiedName(name)));
	}

	private IVariableBinding getLeftVariableBinding(Expression left, IBinding leftTypeBinding) {
		if (left instanceof Name) {
			if (leftTypeBinding instanceof IVariableBinding) {
				return (IVariableBinding) leftTypeBinding;
			}
		} else if (left instanceof FieldAccess) {
			return ((FieldAccess) left).resolveFieldBinding();
		}
		return null;
	}

	/**
	 * Proved access to C$.$clinit$ when a static method is called or a static
	 * field is accessed.
	 * 
	 * @param methodQualifier
	 *            SimpleName qualifier in qualifier.methodName() method
	 *            invocation
	 * @param className
	 * @param doEscape
	 *            set true except for static nonprivate field names
	 * @param doCache
	 *            generally true, but not for initial class definitions or for
	 *            some nonstatic references
	 * @param doAppend
	 *            true to use buffer.append;
	 * @return name wrapped if necessary by nested Class.load() calls
	 */
	private String getQualifiedStaticName(Name methodQualifier, String className, boolean doEscape, boolean doCache,
			boolean doAppend) {
		// BH: The idea here is to load these on demand.
		// It will require synchronous loading,
		// but it will ensure that a class is only
		// loaded when it is really needed.
		className = removeBrackets(className);
		doEscape &= (className.indexOf(".") >= 0 && !isClassKnown(className));
		String s = null;
		if (!doEscape) {
			if (methodQualifier != null) {
				// a method invocation with a Name as qualifier expression
				methodQualifier.accept(this);
				return "";
			}
			s = className;
			doCache = false;
		}
		String myClassName = getQualifiedClassName();
		if (doCache && className.equals(myClassName)) {
				s = "C$"; // anonymous class will be like this
		} else if (s == null) {
		  s = getNestedClazzLoads(methodQualifier == null && !className.startsWith("C$.") ? className : assureQualifiedNameNoC$(null, className), doCache);
		}
		if (doAppend)
			buffer.append(s);
		return s;
	}

	private boolean haveDirectStaticAccess(Expression exp) {
		return exp instanceof SimpleName
				|| (exp instanceof QualifiedName && ((QualifiedName) exp).getQualifier() instanceof SimpleName)
				|| (exp instanceof FieldAccess && ((FieldAccess) exp).getExpression() instanceof ThisExpression);

	}

	/**
	 * The left operand is primitive boolean. Check to see if the operator is ^,
	 * |, or &, or if the left or right operand is such an expression.
	 * 
	 * If so, we are going to box this all as a Boolean(....).valueOf()
	 * 
	 * @param node
	 * @return
	 */
	private boolean isBitwiseBinaryOperator(InfixExpression node) {
		if (checkSimpleBooleanOperator(node.getOperator().toString())) {
			return true;
		}
		Expression left = node.getLeftOperand();
		if (left instanceof InfixExpression) {
			if (isBitwiseBinaryOperator((InfixExpression) left)) {
				return true;
			}
		}
		Expression right = node.getRightOperand();
		if (right instanceof InfixExpression) {
			if (isBitwiseBinaryOperator((InfixExpression) right)) {
				return true;
			}
		}
		return false;
	}

	private void visitList(List<ASTNode> list, String seperator) {
		for (Iterator<ASTNode> iter = list.iterator(); iter.hasNext();) {
			boxingNode(iter.next(), false);
			if (iter.hasNext()) {
				buffer.append(seperator);
			}
		}
	}

	private static Map<String, Map<String, List<String[]>>> genericClassMap = new HashMap<String, Map<String, List<String[]>>>();
	private static Map<String, Map<String, String>> genericClassTypes = new HashMap<String, Map<String, String>>();

	/**
	 * Check a class, interface, or Enum binding for generics.
	 * 
	 * @param topBinding
	 *            -- the class being declared
	 * @param binding
	 * @return true if this class could have generic replacements
	 */
	private static boolean checkGenericClass(ITypeBinding topBinding, ITypeBinding binding) {
		// debugListAllOverrides(binding);
		if (topBinding == binding)
			genericClassMap.put(binding.getKey(), null);
		// check all superclasses from most super to least super
		String classKey = binding.getKey();
		boolean hasGenerics = (binding.isRawType() || binding.getTypeArguments().length > 0);
		// System.err.println(hasGenerics + " " + binding.getBinaryName() + " "
		// + binding.getKey());
		if (hasSuperClass(binding)) {// &&
										// !genericClassMap.containsKey(superclass.getKey()))
										// {
			// System.err.println("--superclass--");
			hasGenerics = checkGenericClass(topBinding, binding.getSuperclass()) || hasGenerics;
		}
		// check all interfaces
		ITypeBinding[] interfaces = binding.getInterfaces();
		for (int i = interfaces.length; --i >= 0;) {
			// if (!genericClassMap.containsKey(interfaces[i].getKey())) {
			// System.err.println("--implements--");
			hasGenerics = checkGenericClass(topBinding, interfaces[i]) || hasGenerics;
		}
		if (hasGenerics) {
			// System.err.println(hasGenerics + " " + binding.getKey() +
			// "\n--class--\n" + binding.toString() + "\n--erasure--\n" +
			// binding.getErasure());
			// debugDumpClass(binding);
			checkMethodsWithGenericParams(topBinding.getKey(), binding);
		} else {
			genericClassMap.put(classKey, null);
		}
		return hasGenerics;
	}

	/**
	 * Tie class type parameters (T, V, etc.) to the bound implemented types for
	 * all methods that implement generics
	 * 
	 * @param topClassKey
	 * @param binding
	 */
	private static void checkMethodsWithGenericParams(String topClassKey, ITypeBinding binding) {
		Map<String, String> classTypes = getGenericClassTypes(binding);
		if (classTypes == null)
			return;
		String classKey = binding.getKey();
		IMethodBinding[] methods = binding.getErasure().getDeclaredMethods();
		for (int i = methods.length; --i >= 0;) {
			IMethodBinding m = methods[i];
			String methodName = m.getName();
			ITypeBinding[] params = m.getParameterTypes();
			if (params.length == 0)
				continue;
			String key = m.getKey();
			if (key.indexOf(";T") >= 0 || key.indexOf("(T") >= 0) {
				String[] list = new String[params.length];
				for (int j = list.length; --j >= 0;) {
					String name = params[j].getName();
					list[j] = name + "|" + classTypes.get(name) + ";";
				}
				addGenericClassMethod(classKey, methodName, list);
				addGenericClassMethod(topClassKey, methodName, list);
			}
		}

	}

	private static ASTNode getAbstractOrAnonymousParentForNode(ASTNode node) {
		ASTNode parent = node.getParent();
		while (parent != null && !(parent instanceof AbstractTypeDeclaration)
				&& !(parent instanceof AnonymousClassDeclaration)) {
			parent = parent.getParent();
		}
		return parent;
	}

	private static ITypeBinding resolveAbstractOrAnonymousBinding(ASTNode node) {
		node = getAbstractOrAnonymousParentForNode(node);
		return (node instanceof AbstractTypeDeclaration ? ((AbstractTypeDeclaration) node).resolveBinding()
				: node instanceof AnonymousClassDeclaration ? ((AnonymousClassDeclaration) node).resolveBinding()
						: null);
	}
	
	/**
	 * Create a map of the class type arguments for an implemented generic class
	 * 
	 * @param type
	 * @return a map {T:"java.lang.String",K:"java.lang.Object"}
	 */
	private static Map<String, String> getGenericClassTypes(ITypeBinding type) {
		String classKey = type.getKey();
		Map<String, String> classTypes = genericClassTypes.get(classKey);
		if (classTypes != null)
			return classTypes;
		ITypeBinding[] typeArgs = type.getTypeArguments();
		ITypeBinding[] typeParams = type.getTypeParameters();
		boolean isGeneric = (typeParams.length > 0);
		boolean isExtended = (typeArgs.length > 0 || type.isRawType());
		// System.err.println("getgenclasstypes " + type.getKey() + " " +
		// isGeneric + " " + isExtended);
		if (!isGeneric && !isExtended) {
			if (hasSuperClass(type))
				genericClassTypes.put(classKey, classTypes = genericClassTypes.get(type.getSuperclass().getKey()));
			return classTypes;
		}
		ITypeBinding[] types = (isGeneric ? typeParams : typeArgs);
		classTypes = new Hashtable<String, String>();
		// We have to parse this by hand, because I cannot seem to get access to
		// the
		// typeParameters of a superclass. Java seems to have erased all that.
		String erasure = type.getErasure().toString();
		// abstract class test.Test_GenericExt_T<T extends Map<T,K>, K>
		erasure = erasure.substring(erasure.indexOf("<") + 1);
		StringBuffer sb = new StringBuffer(erasure.substring(0, erasure.indexOf(">\n")));
		for (int n = 0, i = sb.length(); --i >= 0;) {
			switch (sb.charAt(i)) {
			case '>':
				n++;
				sb.setCharAt(i, ' ');
				break;
			case '<':
				n--;
				sb.setCharAt(i, ' ');
				break;
			case ',':
				if (n != 0)
					sb.setCharAt(i, ' ');
				break;
			default:
				break;
			}
		}

		String[] tokens = sb.toString().split(",");
		// System.err.println("erasure=" + sb + " " + tokens.length);
		for (int i = tokens.length; --i >= 0;) {
			String key = tokens[i].trim();
			key = key.substring(0, (key + " ").indexOf(" "));
			String value = (i < types.length ? types[i].getQualifiedName() : "java.lang.Object");
			// System.err.println("classTypes key value|" + key + "|" + value +
			// "|");
			classTypes.put(key, value);
		}
		return classTypes;
	}

	/**
	 * Retrieve a list of generic types such as { ["T|java.lang.String",
	 * "V|java.lang.Object"], ["M|java.lang.String", "N|java.lang.Object"] } if
	 * it exists
	 * 
	 * @param methodClass
	 * @param methodName
	 * @return list of generic types for methods with this name
	 */
	private static List<String[]> getGenericMethodList(ITypeBinding methodClass, String methodName) {
		Map<String, List<String[]>> methodList = genericClassMap.get(methodClass.getKey());
		return (methodList == null ? null : methodList.get(methodName));
	}

	/**
	 * add a generic class method to the genericClassMap under the class and
	 * method
	 * 
	 * @param classKey
	 * @param methodName
	 * @param list
	 */
	private static void addGenericClassMethod(String classKey, String methodName, String[] list) {

		//System.err.println("Adding class method " + methodName + " " + list.length + list[0] + " in " + classKey);
		Map<String, List<String[]>> classMap = genericClassMap.get(classKey);
		if (classMap == null)
			genericClassMap.put(classKey, classMap = new Hashtable<String, List<String[]>>());
		List<String[]> methodList = classMap.get(methodName);
		if (methodList == null)
			classMap.put(methodName, methodList = new ArrayList<String[]>());
		methodList.add(list);
	}

	/**
	 * 
	 * @param node
	 * @param mBinding
	 * @param isConstructor
	 * @return j2s-qualified name or an array of j2s-qualified names
	 */
	private String getMethodNameOrArrayForDeclaration(MethodDeclaration node, IMethodBinding mBinding,
			boolean isConstructor) {
		SimpleName nodeName = node.getName();
		String methodName = (isConstructor ? "c$" : NameMapper.getJ2SName(nodeName));
		String name = getJ2SQualifiedName(methodName, null, mBinding, null, false);
		ITypeBinding methodClass = mBinding.getDeclaringClass();
		List<String> names = null;
		// System.err.println("checking methodList for " + nodeName.toString() +
		// " in " + methodClass.getKey());
		List<String[]> methodList = getGenericMethodList(methodClass, nodeName.toString());

		if (methodList != null) {
			// System.err.println("have methodList for " + nodeName + " " +
			// methodList.size());
			names = new ArrayList<String>();
			for (int i = methodList.size(); --i >= 0;) {
				String pname = getJ2SQualifiedName(methodName, null, mBinding, methodList.get(i), false);
				// System.err.println("params = " + pname + "
				// "+methodList.get(i).length + "==?==" +
				// mBinding.getParameterTypes().length + " " +
				// methodList.get(i)[0]);
				if (pname != null)
					names.add(pname);
			}
		}
		if (names == null || names.size() == 0)
			return "'" + name + "'";
		name = ",'" + name + "'";
		for (int i = names.size(); --i >= 0;) {
			String next = ",'" + names.get(i) + "'";
			if (name.indexOf(next) < 0)
				name += next;
		}
		return "[" + name.substring(1) + "]";
	}

	/**
	 * Determine the qualified parameter suffix for method names, including
	 * constructors.
	 * 
	 * @param nodeName
	 * @param binding
	 * @param genericTypes
	 * @param isMethodInvoc
	 * 
	 * @return a fully j2s-qualified method name
	 */
	private String getJ2SQualifiedName(String j2sName, String nodeName, IMethodBinding binding, String[] genericTypes,
			boolean isMethodInvoc) {
		// The problem is that System.out and System.err are PrintStreams, and
		// we
		// do not intend to change those. So in the case that we just wrote
		// "System....", we use that instead and do not qualify the name
		// Note: binding can be null if we have errors in the Java and we are
		// compiling
		if (binding == null || nodeName != null && nodeName.startsWith("System."))
			return j2sName;
		String methodName = binding.getName();
		String className = binding.getDeclaringClass().getQualifiedName();
		if (!isPackageQualified(className) || !isMethodQualified(className, methodName))
			return j2sName;
		ITypeBinding[] paramTypes = binding.getMethodDeclaration().getParameterTypes();

		// BH: Note that Map.put$K$V is translated to actual values
		// if .getMethodDeclaration() is not used.
		// Without that, it uses the bound parameters such as
		// String, Object instead of the declared ones, such as $TK$TV

		int nParams = paramTypes.length;
		if (genericTypes != null && genericTypes.length != nParams)
			return null;

		if (nParams == 0 && methodName.equals("length"))
			return j2sName + "$"; // so that String implements CharSequence

		String s = getParamsAsString(nParams, genericTypes, paramTypes, false);
		// exception for special case: setting static main(String[] args) to
		// "main", and "main()" to "main$"
		if ("main".equals(methodName) && isStatic(binding)) {
			if (s.length() == 0) {
				s = "$";
			} else if (s.equals("$SA")) {
				s = "";
			}
		} else if (isMethodInvoc && s.indexOf("$T") >= 0 && isJava(className) && !isJava(getQualifiedClassName())) {
			// also add the $O version
			String generic = getParamsAsString(nParams, genericTypes, paramTypes, true);
			if (generic != null) {
				trailingBuffer.addType("o");
				return j2sName + s + " || $o$." + j2sName.substring(j2sName.lastIndexOf(".") + 1) + generic;
			}
			// this does not work for two reasons:
			// 1) sometimes the qualifier, so for t.foo$TA(o), "t." is outside
			// the scope of these parentheses.
			// 2) When selecting functions like this, one needs to use apply,
			// so: ((a$ = expression).foo$TA || a$.foo$O).apply(a$, [o])
			//
			// thus, this determination must be made very early.

		}
		return j2sName + s;
	}

	/**
	 * finish the generic foo || bar fix
	 * 
	 * @param pt
	 *            start of this method invocation in buffer
	 * @param qname
	 *            qualified name, containing " || "
	 * @param isPrivateAndNotStatic
	 *            switch $O$ to p$; already using .apply(this)
	 */
	private void postFixGeneric$O(int pt, String qname, boolean isPrivateAndNotStatic) {
		// this is a Java8-compatibility hack. The class is accessing a
		// type-parameterized method which it might not be overriding
		// and might be nongeneric in Java 6.
		// this.adItem$TE(o) becomes (($o$=this).addItem$TE ||
		// $o$.addItem$O).apply($o$,[o]);
		if (isPrivateAndNotStatic) {
			buffer.insert(pt, "(");
			buffer.append(qname.replace("$o$", "p$")).append(")");
			return;
		}
		buffer.insert(pt, "(($o$=");
		buffer.append(qname).append(").apply($o$,[");
		buffer.insert(buffer.lastIndexOf(".", buffer.lastIndexOf("|")), ")");
		trailingBuffer.addType("o");
	}

	private boolean isJava(String className) {
		return className.length() > 5 && "java.javax".contains(className.substring(0, 5));
	}

	private static String getParamsAsString(int nParams, String[] genericTypes, ITypeBinding[] paramTypes,
			boolean toObject) {
		StringBuffer sbParams = new StringBuffer();
		// if this is a method invocation and has generics, then we alias that
		boolean haveGeneric = false;
		for (int i = 0; i < nParams; i++) {
			String type = j2sGetParamCode(paramTypes[i], true, toObject);
			if (genericTypes != null) {
				String genericType = genericTypes[i];
				if (genericType != null) {
					if (genericType.indexOf("|null") < 0) {
						// System.err.println("hoping that " + className + "." +
						// methodName + " " + i + " " + genericType + " works
						// for " + paramTypes[i].getQualifiedName() + " " +
						// paramTypes[i].getKey());
						if (genericType.indexOf("|" + paramTypes[i].getQualifiedName() + ";") < 0)
							return null;
						type = "T" + genericType.substring(0, genericType.indexOf("|")); // "O";//
						haveGeneric = true;
						// Originally I was substituting in the generic type
						// T,V,E,etc., but
						// this causes a problem when the user is working with a
						// later version of
						// Java and subclassing what was originally not a
						// generic class (JComboBox)
						// but which is now generic (JComboBox<E>). The new
						// version of Java will be
						// used by the transpiler working on the user's machine,
						// and then we will
						// have the problem that the code will have addItem$TE
						// inserted even though
						// the version of Java in the SwingJS distribution will
						// be only addItem$O.
						// Using Object here because that would be the default
						// for
						// JComboBox<>
						// and so match that earlier non-generic designation
						// (hopefully).
					}
				}
			}
			sbParams.append("$").append(type);
		}
		return (toObject && !haveGeneric ? null : sbParams.toString());
	}

	private static String j2sGetParamCode(ITypeBinding binding, boolean addAAA, boolean asGenericObject) {
		String prefix = (removeBrackets(binding.getKey()).indexOf(":T") >= 0 ? "T" : null);
		String name = binding.getQualifiedName();
		String arrays = null;
		name = removeBrackets(name);
		int pt = name.indexOf("[");
		if (pt >= 0) {
			arrays = name.substring(pt + (name.indexOf("[L") >= 0 ? 1 : 0));
			name = name.substring(0, pt);
		}

		// NOTE: If any of these are changed, they must be changed in j2sSwingJS
		// as well.
		// NOTE: These are the same as standard Java Spec, with the exception of
		// Short, which is "H" instead of "S"

		switch (name) {
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
			if (prefix != null)
				name = (asGenericObject ? "O" : prefix + name); // "O";//

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

	public static String removeBrackets(String qName) {
		if (qName == null || qName.indexOf('<') < 0)
			return qName;
		StringBuffer buf = new StringBuffer();
		int ltCount = 0;
		char c;
		for (int i = 0, len = qName.length(); i < len; i++) {
			switch (c = qName.charAt(i)) {
			case '<':
				ltCount++;
				continue;
			case '>':
				ltCount--;
				continue;
			default:
				if (ltCount == 0)
					buf.append(c);
				continue;
			}
		}
		return buf.toString().trim();
	}

	///////////////// debugging //////////////////////////

	void debugDumpClass(ITypeBinding binding) {
		ITypeBinding[] lst = binding.getTypeParameters();

		// Check for <T,V> - these are for the generic class defs themselves
		for (int i = 0; i < lst.length; i++)
			System.err.println(binding.getKey() + "typeP " + i + lst[i].getName());

		// check for <String,Object> for the implemented classes
		lst = binding.getTypeArguments();
		for (int i = 0; i < lst.length; i++)
			System.err.println(binding.getKey() + "typeA " + i + lst[i].getName());

		IMethodBinding[] methods = binding.getDeclaredMethods();
		for (int i = methods.length; --i >= 0;) {
			IMethodBinding m = methods[i];
			System.err.println(getJ2SQualifiedName(m.getName(), null, m, null, false));
			ITypeBinding[] params = m.getParameterTypes();
			for (int j = 0; j < params.length; j++)
				System.err.println("\t" + params[j].getName());

		}
	}

	static void debugListAllOverrides(ITypeBinding binding) {
		IMethodBinding[] jmethods = binding.getDeclaredMethods();
		for (int j = jmethods.length; --j >= 0;) {
			IMethodBinding m = jmethods[j];
			ITypeBinding b = null;
			while ((b = (b == null ? m.getDeclaringClass() : b.getSuperclass())) != null) {
				IMethodBinding[] methods = b.getDeclaredMethods();
				for (int i = methods.length; --i >= 0;)
					if (m.overrides(methods[i]))
						System.err.println(">> " + m.getKey() + " overrides " + methods[i].getKey());
			}
		}
	}

	/**
	 * Returns <code>true</code> if the given type is a super type of a
	 * candidate. <code>true</code> is returned if the two type bindings are
	 * identical
	 * 
	 * @param possibleSuperType
	 *            the type to inspect
	 * @param type
	 *            the type whose super types are looked at
	 * @return <code>true</code> iff <code>possibleSuperType</code> is a super
	 *         type of <code>type</code> or is equal to it
	 */
	private static boolean isSuperType(ITypeBinding possibleSuperType, ITypeBinding type) {
		if (type.isArray() || type.isPrimitive()) {
			return false;
		}
		String name;
		if (possibleSuperType.isEqualTo(type)
				|| (name = possibleSuperType.getBinaryName()) != null && name.equals(type.getBinaryName()))
			return true;
		ITypeBinding superClass = type.getSuperclass();
		if (superClass != null && isSuperType(possibleSuperType, superClass))
			return true;

		if (possibleSuperType.isInterface()) {
			ITypeBinding[] superInterfaces = type.getInterfaces();
			for (int i = 0; i < superInterfaces.length; i++) {
				if (isSuperType(possibleSuperType, superInterfaces[i])) {
					return true;
				}
			}
		}
		return false;
	}

	private static boolean hasSuperClass(ITypeBinding typeBinding) {
		ITypeBinding superclass = typeBinding.getSuperclass();
		return (superclass != null && !"java.lang.Object".equals(superclass.getQualifiedName()));
	}

	/**
	 * If given expression is constant value expression, return its value 
	 * string; or character or return null.
	 * 
	 * @param node
	 * @return
	 */
	private static String getConstantValue(Expression node) {
		if (node == null)
			return null;
		Object constValue = node.resolveConstantExpressionValue();
		if (constValue != null && (constValue instanceof Number
				|| constValue instanceof Character
				|| constValue instanceof Boolean)) {
			StringBuffer buffer = new StringBuffer();
			if (constValue instanceof Character) {
				buffer.append('"');
				addChar(((Character)constValue).charValue(), buffer);
				buffer.append('"');
			} else {
				// Number or Boolean
				buffer.append(constValue);
			}
			return buffer.toString();
		}
		if (constValue instanceof String) {
			StringBuffer buffer = new StringBuffer();
			String str = (String) constValue;
			int length = str.length();
			buffer.append('"');
			for (int i = 0; i < length; i++)
				addChar(str.charAt(i), buffer);
			buffer.append('"');
			return buffer.toString();
		}
		return null;
	}

	private static void addChar(char c, StringBuffer buffer) {
		if (c < 32 || c > 127) {
			String hexStr = "0000" + Integer.toHexString(c);
			buffer.append("\\u").append(hexStr.substring(hexStr.length() - 4));
		} else {
			switch (c) {
			case '\\':
			case '\'':
			case '\"':
				buffer.append('\\');
				buffer.append(c);
				break;
			case '\r':
				buffer.append("\\r");
				break;
			case '\n':
				buffer.append("\\n");
				break;
			case '\t':
				buffer.append("\\t");
				break;
			case '\f':
				buffer.append("\\f");
				break;
			default:
				buffer.append(c);
				break;
			}
		}
	}

////////////////////////
	
	private void setMapJavaDoc(PackageDeclaration node) {
		ASTNode root = node.getRoot();
		global_mapBlockJavadoc = new HashMap<Integer, List<Javadoc>>();

		// gat a list of all @j2s blocks
		
		List<ASTNode> list = new ArrayList<ASTNode>();
		List<?> commentList = ((CompilationUnit) root).getCommentList();
		for (int i = 0, n = commentList.size(); i < n; i++) {
			Comment comment = (Comment) commentList.get(i);
			if (comment instanceof Javadoc) {
				List<?> tags = ((Javadoc) comment).tags();
				if (tags.size() != 0) {
					for (Iterator<?> itr = tags.iterator(); itr.hasNext();) {
						TagElement tagEl = (TagElement) itr.next();
						String tagName = tagEl.getTagName();
						if (tagName == null || !tagName.startsWith("@j2sNative") 
								&& !tagName.startsWith("@j2sIgnore")
								&& !tagName.startsWith("@j2sDebug"))
							continue;
						list.add(comment);
						break;
					}
				}
			}
		}
		if (list.isEmpty())
			return;

		// now add all the associated elements

		try {
			root.accept(new NativeDoc.BlockVisitor(list));
		} catch (@SuppressWarnings("unused") IndexOutOfBoundsException e) {
			// normal termination from item after last j2sjavadoc
		}

		for (int i = 0, n = list.size(); i < n; i++) {
			System.err.println(i + "  " + (list.get(i) == null ? null : list.get(i).getClass().getName() + " " + list.get(i).getStartPosition() + "..." + (list.get(i).getStartPosition() + list.get(i).getLength())));
		}

		// and link javadoc to its closest block

		for (int i = 0, n = list.size() - 1; i < n;) {
			Javadoc doc = (Javadoc) list.get(i++);
			ASTNode item = list.get(i);
			int factor = 1;
			if (item instanceof Javadoc) {
				System.err.println("!!Note: @j2s doc ignored because nothing follows it: " + doc.getStartPosition()
						+ "\r\n" + doc);
			} else {
				if (item == null) {
					factor = -1;
					item = list.get(++i);
				}
				i++;
				Integer pt = Integer.valueOf(item.getStartPosition() * factor);
				List<Javadoc> docs = global_mapBlockJavadoc.get(pt);
				if (docs == null)
					global_mapBlockJavadoc.put(pt, docs = new ArrayList<Javadoc>());
				System.err.println(pt + " " + item.getClass().getName() + " " + doc);				
				docs.add(doc);
			}
		}
	}

	/**
	 * check any node other than the package node for @j2sNative or @j2sDebug or @j2sIgnore 
	 */
	public boolean preVisit2(ASTNode node) {
		List<Javadoc> j2sJavadoc;
		if (	global_mapBlockJavadoc == null 	
				|| node instanceof MethodDeclaration 
				|| node instanceof Initializer 
				|| (j2sJavadoc = getJ2sJavadoc(node, true)) == null)
			return true;
		boolean isBlock = (node instanceof Block);
		boolean ret = !NativeDoc.checkJ2sJavadocs(buffer, j2sJavadoc, isBlock, global_j2sFlag_isDebugging) || !isBlock;
		//buffer.append("visiting " + node.getStartPosition() + " " + isBlock + " " +  ret);
		return ret;
	}

	private List<Javadoc> getJ2sJavadoc(ASTNode node, boolean isPre) {
		List<Javadoc> docs = global_mapBlockJavadoc.remove(Integer.valueOf((isPre ? 1 : -1) * node.getStartPosition()));
		if (!isPre && docs != null)
			NativeDoc.checkJ2sJavadocs(buffer, docs, false, global_j2sFlag_isDebugging);
		return docs;
	}

	/////////////////////////////

	/**
	 * includes @j2sDebug blocks; from j2s.compiler.mode=debug in .j2s
	 * 
	 */
	private boolean global_j2sFlag_isDebugging = false;

	public void setDebugging(boolean isDebugging) {
		this.global_j2sFlag_isDebugging = isDebugging;
	}

	
	/**
	 * tracks file byte pointers for @j2sNative, @j2sIgnore
	 */
	private Map<Integer, List<Javadoc>> global_mapBlockJavadoc;
	

	/**
	 * separates top-level classes found in a source file
	 * 
	 */
	private static final String ELEMENT_KEY = "__@J2S_ELEMENT__";

	/**
	 * Add the top-level class name with the element key.
	 *
	 * @param className
	 */
	private void appendElementKey(String className) {
		buffer.append(ELEMENT_KEY + className + "\r\n");
	}

	/**
	 * track the names for I$$[...]
	 */
	private StringBuffer global_includes = new StringBuffer();
	
	/**
	 * map class names to I$$[] index
	 * 
	 */
	private Map<String, Integer>global_htIncludeNames = new Hashtable<>();
	
	/**
	 * I$$[] index counter
	 *  
	 */
	private int[] global_includeCount = new int[1];
	
	/**
	 * Register a qualified static name as an import var I$[n] unless it ends
	 * with "Exception". create loads of inner classes pkg.Foo.Bar as
	 * Clazz.load(['pkg.Foo','.Bar'])
	 * 
	 * If caching, put into the code (I$[n]||$incl$(n)), where n is 
	 * the index into the I$[] array  
	 * 
	 * @param className
	 * @param doCache
	 * @return  
	 */
	private String getNestedClazzLoads(String className, boolean doCache) {
		String[] parts = className.split("\\.");
		String s = parts[0];
		if (s.equals("P$")) {
			// can't do this with Clazz.load
			s = global_PackageName;
		}
		int i = 1;
		// loop through packages and outer Class
		while (i < parts.length && (i == 1 || !Character.isUpperCase(parts[i - 1].charAt(0))))
			s += "." + parts[i++];
		s = "'" + s + "'";
		// int nlast = parts.length;
		if (i < parts.length) {
			s = "[" + s;
			while (i < parts.length)
				s += ",'." + parts[i++] + "'";
			s += "]";
		}
		if (doCache) {
			Integer n = global_htIncludeNames.get(s);
			if (n == null && !s.endsWith("Exception'")) {
				global_htIncludeNames.put(s, n = new Integer(++global_includeCount[0]));
				global_includes.append(global_includeCount[0] == 1 ? ",I$=[[" : ",").append(s);
			}
			if (n != null)
				return "(I$[" + n + "]||$incl$(" + n + "))";

		}
		return "Clazz.load(" + s + ")";
	}



	/**
	 * Separate the buffer into a list so that all top-level elements can be in
	 * their own file (as is done in Java). Provide a common include list
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
		String[] parts = js.split(ELEMENT_KEY);
		String header = parts[0];
		String header_noIncludes = header.replace(",I$=[[]]", "");
		header = header.replace(",I$=[]", global_includes.length() == 0 ? "" : global_includes.append("]],$incl$=function(i){return I$[i]=Clazz.load(I$[0][i-1])}"));
		System.err.println(header);
		for (int i = 1; i < parts.length; i++) {
			js = parts[i];
			int pt = js.indexOf("\r\n");
			elements.add(js.substring(0, pt));
			js = js.substring(pt + 2);
			String head = "(function(){" + (js.indexOf("(I$[") < 0 ? header_noIncludes : header);
			
			
			elements.add(head + js + "})();\r\n" + trailer);
		}
		return elements;
	}
	
	private String global_PackageName;
	
	public String getPackageName() {
		return global_PackageName;
	}
	
	public static String[] basePackages =  {
			"java.lang", 
			"java.lang.ref", 
			"java.lang.ref.reflect", 
			"java.lang.reflect", 
			"java.lang.annotation",
			"java.lang.instrument",
			"java.lang.management",
			"java.io", 
			"java.util"
	};
 
	public boolean isBasePackage() {
		for (int i = 0; i < basePackages.length; i++)
			if (basePackages[i].equals(global_PackageName))
				return true;
		return false;
	}


	private final static String[] knownClasses = new String[] { 
			"java.lang.Object", "java.lang.Class", 
			"java.lang.String",
			"java.lang.Byte", "java.lang.Character",
			"java.lang.Short", "java.lang.Long", 
			"java.lang.Integer", "java.lang.Float", 
			"java.lang.Double", 
			"java.io.Serializable", "java.lang.Iterable", 
			"java.lang.CharSequence", "java.lang.Cloneable",
			"java.lang.Comparable", "java.lang.Runnable", 
			"java.util.Comparator", "java.lang.System",
			"java.lang.ClassLoader",
			"java.lang.Math", 
			};

	private static boolean isClassKnown(String qualifiedName) {
		for (int i = 0; i < knownClasses.length; i++)
			if (knownClasses[i].equals(qualifiedName))
				return true;
		return false;
	}

	private static boolean isStatic(BodyDeclaration b) {
		return Modifier.isStatic(b.getModifiers());
	}
	
	public boolean visit(AnnotationTypeDeclaration node) {
		return false;
	}

	public boolean visit(AnnotationTypeMemberDeclaration node) {
		return false;
	}

	public boolean visit(BlockComment node) {
		return false;
	}

	public boolean visit(Javadoc node) {
		return false;
	}

	public boolean visit(LineComment node) {
		return false;
	}

	public boolean visit(MarkerAnnotation node) {
		return false;
	}

	public boolean visit(MemberRef node) {
		return false;
	}

	public boolean visit(MemberValuePair node) {
		return false;
	}

	public boolean visit(MethodRef node) {
		return false;
	}

	public boolean visit(MethodRefParameter node) {
		return false;
	}

	public boolean visit(NormalAnnotation node) {
		return false;
	}

	public boolean visit(ParameterizedType node) {
		node.getType().accept(this);
		return false;
	}

	public boolean visit(SingleMemberAnnotation node) {
		return false;
	}

	public boolean visit(TagElement node) {
		return false;
	}

	public boolean visit(TextElement node) {
		return false;
	}
	public boolean visit(TypeParameter node) {
		return false;
	}

	public boolean visit(WildcardType node) {
		return false;
	}

	/**
	 * @author zhou renjian
	 *
	 *         2006-12-3
	 */
	public static class NameMapper {

		private static Set<String> methodSet;
		private static Map<String, String> pmMap;
		private static final String PACKAGE_PREFIX;
		private static String[] mapDocument;
		private static String[] mapNode;
		private static String[] mapNodeList; 
		private static String[] mapNamedNodeMap;
		private static String[] mapCharacterData;
		private static String[] mapAttr;
		private static String[] mapElement;
		private static String[] mapDocumentType;
		private static String[] mapNotation;
		private static String[] mapEntity;
		private static String[] mapProcessingInstruction;

		public static boolean isJ2SMethodRegistered(String methodName) {
			return methodSet.contains(methodName);
		}

		public static String j2sMap(String className, String methodName) {
			return pmMap.get(className + "." + methodName);
		}



		static {
			PACKAGE_PREFIX = "org.w3c.dom.";
			
			mapDocument = new String[] {
					"Document",
					"doctype",
					"implementation",
					"documentElement"
				};
			mapNode = new String[] {
					"Node",
					"nodeName",
					"nodeValue",
					"nodeType",
					"parentNode",
					"childNodes",
					"firstChild",
					"lastChild",
					"previousSibling",
					"nextSibling",
					"attributes",
					"ownerDocument",
					"namespaceURI",
					"prefix",
					"localName"
				};
			mapNodeList = new String[] {
					"NodeList",
					"length"
			};
			mapNamedNodeMap = new String[] {
				"NamedNodeMap",
				"length"
			};
			mapCharacterData = new String[] {
					"CharacterData",
					"data",
					"length"
			};
			mapAttr = new String[] {
					"Attr",
					"name",
					"specified",
					"value",
					"ownerElement",
			};
			mapElement = new String[] {
					"Element",
					"tagName"
			};
			mapDocumentType = new String[] {
					"DocumentType",
					"name",
					"entities",
					"notations",
					"publicId",
					"systemId",
					"internalSubset"
			};
			mapNotation = new String[] {
					"Notation",
					"publicId",
					"systemId"
			};
			mapEntity = new String[] {
					"Entity",
					"publicId",
					"systemId",
					"notationName"
			};
			mapProcessingInstruction = new String[] {
					"ProcessingInstruction",
					"target",
					"data"
			};

			init();
		}

		private static void init() {
			pmMap = new HashMap<String, String>();
			methodSet = new HashSet<String>();
			register("java.lang.Class", "forName", "Clazz.forName");
			register("java.lang.reflect.Array", "newInstance", "Clazz.array");
//			register("java.lang.String", "length", "length"); // BH no -- we need String to implement CharSequence. Both will be length$()
//			register("java.lang.CharSequence", "length", "length");//sgurin: fix for bug: CharSequence cs = "123"; cs.length();
			register("java.lang.String", "replace", "~replace");
			register("java.lang.String", "split", "~plit");
			registerAllMaps();
		}

		private static void register(String className, String methodName, String propertyName) {
			pmMap.put(className + "." + methodName, propertyName);
			methodSet.add(methodName);
		}

		private static void registerMap(String[] map) {
			for (int i = 1; i < map.length; i++) {
				register(PACKAGE_PREFIX + map[0], 
						"get" + map[i].substring(0, 1).toUpperCase() 
						+ map[i].substring(1), map[i]);
			}
		}

		private static void registerAllMaps() {
			registerMap(mapDocument);
			registerMap(mapNode);
			registerMap(mapNodeList);
			registerMap(mapNamedNodeMap);
			registerMap(mapCharacterData);
			registerMap(mapAttr);
			registerMap(mapElement);
			registerMap(mapDocumentType);
			registerMap(mapNotation);
			registerMap(mapEntity);
			registerMap(mapProcessingInstruction);
		}
		

		public static boolean checkJ2SInheritedMethodNameCollision(ITypeBinding binding, String name) {
			if (binding != null) {
				IMethodBinding[] methods = binding.getDeclaredMethods();
				for (int i = 0; i < methods.length; i++)
					if (name.equals(getJ2SMethodName(methods[i])))
						return true;
				ITypeBinding superclass = binding.getSuperclass();
				if (checkJ2SInheritedMethodNameCollision(superclass, name))
					return true;
				ITypeBinding[] interfaces = binding.getInterfaces();
				if (interfaces != null)
					for (int i = 0; i < interfaces.length; i++)
						if (checkJ2SInheritedMethodNameCollision(interfaces[i], name))
							return true;
			}
			return false;
		}

		protected static String getJ2SCheckedFieldName(ITypeBinding classBinding, String fieldName) {
			String name = getJ2SValidFieldName$Qualifier(fieldName, false);
			if (classBinding != null) {
				if (checkJ2SInheritedMethodNameCollision(classBinding, fieldName)) {
					name += "$";
				}
				if (isJ2SInheritedFieldName(classBinding, fieldName))
					fieldName = getJ2SFieldName$Appended(classBinding, fieldName);
			}
			return name + fieldName;
		}

		public static String getJ2SName(SimpleName node) {
			IBinding binding = node.resolveBinding();
			if (binding == null)
				return node.getIdentifier();
			if (binding instanceof IVariableBinding) {
				return getJ2SVariableName((IVariableBinding) binding);
			}
			if (binding instanceof IMethodBinding) {
				return getJ2SMethodName((IMethodBinding) binding);
			}
			String nameID = node.getIdentifier();
			return nameID;
		}

		/**
		 * We need to check packages only for local "var" variables, as only those
		 * will be references as unqualified names. And the problem is only the same
		 * method.
		 * 
		 * For example,
		 * 
		 * var test = 3
		 * 
		 * x = test.Test_1.getX();
		 * 
		 * 
		 * 
		 * @param name
		 * @param addName
		 * @return
		 */
		protected static String getJ2SValidFieldName$Qualifier(String name, boolean addName) {
			boolean isViolation = checkJ2SKeywordViolation(name);
			return (isViolation ? "$" : "") + (addName ? name : "");
		}


		protected static String getJ2SVariableName(IVariableBinding binding) {
			// leaving the option here to qualify this in some way
			return binding.getName();
		}

		/**
		 * 
		 * @param binding
		 * @param name
		 * @return
		 */
		protected static String getJ2SFieldName$Appended(ITypeBinding binding, String name) {
			if (binding != null) {
				ITypeBinding superclass = binding.getSuperclass();
				if (superclass != null) {
					StringBuffer buffer = new StringBuffer();
					IVariableBinding[] declaredFields = superclass.getDeclaredFields();
					for (int i = 0; i < declaredFields.length; i++) {
						String fieldName = getJ2SVariableName(declaredFields[i]);
						if (name.equals(fieldName)) {
							buffer.append("$");
						}
					}
					buffer.append(getJ2SFieldName$Appended(superclass, name));
					return buffer.toString();
				}
			}
			return name;
		}

		/**
		 * Check for generic method name conflict with JavaScript methods such as .bind(), .call(), etc. 
		 * but exclude methods in swingjs.api, because those are meant to be that way.
		 * 
		 * @param binding
		 * @return
		 */
		private static String getJ2SMethodName(IMethodBinding binding) {
			String name = binding.getName();
			boolean isViolation = (checkJ2SKeywordViolation(name)
					&& !binding.getDeclaringClass().getQualifiedName().startsWith("swingjs.api"));
			return (isViolation ? "$" + name : name);
		}

		/**
		 * Check whether the given field name is already defined in super types or
		 * not.
		 * 
		 * The algorithm: 1. Check binding self class/interface fields 2. Check
		 * binding super class 3. Check binding interfaces
		 * 
		 * @param binding
		 * @param name
		 * @return
		 */
		public static boolean isJ2SInheritedFieldName(ITypeBinding binding, String name) {
			if ("serialVersionUID".equals(name)) {
				/*
				 * Just ignore this field: serialVersionUID. Currently Java2Script
				 * does not support Java serialization but support Java2Script's own
				 * Simple RPC serialization, which does not care about
				 * serialVersionID.
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
				String fieldName = getJ2SVariableName(declaredFields[i]);
				if (name.equals(fieldName)) {
					return true;
				}
			}
			if (isJ2SInheritedFieldName(superclass, name)) {
				return true;
			}
			ITypeBinding[] interfaces = binding.getInterfaces();
			if (interfaces != null) {
				for (int i = 0; i < interfaces.length; i++) {
					if (isJ2SInheritedFieldName(interfaces[i], name)) {
						return true;
					}
				}
			}
			return false;
		}

		/**
		 * Check whether the given QualifiedName is just simple or not.
		 * The "just simple" means foo.bar not just foo?
		 * 
		 * @param node
		 * @return
		 */
		public static boolean isJ2SSimpleQualified(QualifiedName node) {
			Name qualifier = node.getQualifier();
			if (qualifier instanceof SimpleName) {
				return true;
			} else if (qualifier instanceof QualifiedName) {
				return isJ2SSimpleQualified((QualifiedName) qualifier);
			}
			System.err.println(">>> FieldAdapter not simple " + node.getFullyQualifiedName());
			return false;
		}

		/*
		 * IE passes the following: 
		 * public,private,private,static,package,
		 * implements,prototype,false,throws,label
		 * 
		 * Firefox passes the following:
		 * public,prototype,false,label
		 * 
		 * The following does not contains all the reserved keywords:
		 * http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Reserved_Words
		 * 
		 * abstract,		boolean,		break,			byte,
		 * case,			catch,			char,			class,
		 * const,			continue,		debugger,		default, 
		 * delete,			do,				double,			else, 
		 * enum,			export,			extends,		false, 
		 * final,			finally,		float,			for, 
		 * function,		goto,			if,				implements, 
		 * import,			in,				instanceof,		int, 
		 * interface,		long,			native,			new, 
		 * null,			package,		private,		private, 
		 * public,			return,			short,			static, 
		 * super,			switch,			synchronized,	this, 
		 * throw,			throws,			transient,		true, 
		 * try,				typeof,			var,			void, 
		 * volatile,		while,			with,
		 *  
		 *  
		 *  
		 */
		private static String[] keywords = new String[] {
			"class", /*"java", "javax", "sun", */"for", "while", "do", "in", "return", "function", "var", 
			"class", "pubic", "private", "private", "new", "delete",
			"static", "package", "import", "extends", "implements",
			"instanceof", "typeof", "void", "if", "this", "super",
			"prototype", "else", "break", "true", "false", "try",
			"catch", "throw", "throws", "continue", "switch", "default",
			"case", "export", "import", "const",/*"label", */"with",
			// BH and a few of our own, based on checking developer console:
			 "c$", "apply", "arguments", "bind", "call", "caller",
			 "watch", "unwatch", "valueOf", "isPrototypeOf", "isGenerator", 
			 "prototype"
		};

		public static boolean checkJ2SKeywordViolation(String name) {
			for (int i = 0; i < keywords.length; i++) {
				if (keywords[i].equals(name)) {
					return true;
				}
			}
			return false;		
		}

	}		

	public static class NativeDoc {
		
		/**
		 * prepare a list that alternates [javadoc element javadoc element ... ] associating an element with its javadoc. 
		 * @author RM
		 *
		 */
		private static class BlockVisitor extends ASTVisitor {

			private int ptrDoc0;
			private List<ASTNode> list;
			private int listPtr;

			BlockVisitor(List<ASTNode> list) {
				this.list = list;
				ptrDoc0 = list.get(listPtr = 0).getStartPosition();
			}

			/**
			 * Just collect blocks after j2s Javadocs. Throws an
			 * IndexOfBoundsException when done with scanning.
			 * 
			 * Note that this no longer requires that the node be a block, because
			 * we are processing these BEFORE the node is visited.
			 * 
			 */

			public void preVisit(ASTNode node) throws IndexOutOfBoundsException {
				checkNode(node, false);
			}

			public void postVisit(ASTNode node) {
				checkNode(node, true);			
			}

			private void checkNode(ASTNode node, boolean isPost) {
				int nodept = node.getStartPosition() + (isPost? node.getLength() : 0);
				while (nodept >= ptrDoc0)
					addNode(node, isPost);
			}

			private void addNode(ASTNode node, boolean isPost) {
				if (isPost)
					list.add(++listPtr, null);
				list.add(++listPtr, node);
				ptrDoc0 = list.get(++listPtr).getStartPosition();
			}

		}



		/**
		 * 
		 * Check for j2sIgnore, j2sDebug, j2sNative
		 * @param javadoc
		 * @param isBlock
		 * @return true if code was added
		 */
		static boolean checkJ2sJavadocs(StringBuffer buffer, List<Javadoc> list, boolean isBlock, boolean isDebugging) {
			boolean didAdd = false;
			for (int i = 0, n = list.size(); i < n; i++) {
				Javadoc javadoc = list.get(i);
				List<?> tags = javadoc.tags();
				if (tags != null && tags.size() > 0 && (
					       isBlock && getTag(tags, "@j2sIgnore") != null
						|| isDebugging && addJ2SSourceForTag(buffer, getTag(tags, "@j2sDebug"), isBlock && i == 0, isBlock && i == n - 1)
						|| addJ2SSourceForTag(buffer, getTag(tags, "@j2sNative"), isBlock && i == 0, isBlock && i == n - 1)
					)) {
					didAdd = true;
				}
			}
			return didAdd;
		}

		private static TagElement getTag(List<?> tags, String j2sKey) {
			Iterator<?> iter = tags.iterator();
			while (iter.hasNext()) {
				TagElement tagEl = (TagElement) iter.next();
				if (j2sKey.equals(tagEl.getTagName())) {
					return tagEl;
				}
			}
			return null;
		}

		private static boolean addJ2SSourceForTag(StringBuffer buffer, TagElement tag, boolean addPrefix, boolean addPostfix) {
			if (tag == null)
				return false;
			StringBuffer buf = new StringBuffer();
			List<?> fragments = tag.fragments();
			for (Iterator<?> iterator = fragments.iterator(); iterator
					.hasNext();) {
				TextElement commentEl = (TextElement) iterator.next();
				String text = commentEl.getText().trim();
				buf.append(text);
				if (text.length() != 0) {
					buf.append(text.endsWith(";") || text.indexOf("//") >= 0 ? "\r\n" : " ");
					// BH note that all line terminators are removed,
					// as this causes problems after source cleaning, which may result
					// in code such as:
					//
					// return
					// x
					//
					// but this still does not fix the problem that we can have
					// x = " 
					//       "
					// after source cleaning
				}
			}
			String code = buf.toString();
			// /-* comment *-/ becomes /* comment */ and <@> becomes @
			if (code.length() > 0)
				code = Pattern.compile("\\/-\\*(.*)\\*-\\/",
					Pattern.MULTILINE | Pattern.DOTALL)
					.matcher(code).replaceAll("/*$1*/").replaceAll("<@>","@").trim();
			boolean isInline = code.endsWith("||");
			buffer.append(isInline ? "" : addPrefix ? "{\r\n" : "\r\n");
			buffer.append(code);
			buffer.append(isInline ? "" : addPostfix ? "}\r\n" : "\r\n");
			return true;
		}
		
		/**
		 * @param node
		 * @return true if we have @j2sIngore for this BodyDeclaration
		 */
		protected static boolean checkj2sIgnore(BodyDeclaration node) {
		  return getJ2SKeepOrIgnore(node, "@j2sIgnore") != null;
		}

		/**
		 * Method with "j2s*" tag.
		 * 
		 * @param node
		 * @return
		 */
		private static Object getJ2SKeepOrIgnore(BodyDeclaration node, String tagName) {
			Javadoc javadoc = node.getJavadoc();
			if (javadoc != null) {
				List<?> tags = javadoc.tags();
				if (tags.size() != 0) {
					for (Iterator<?> iter = tags.iterator(); iter.hasNext();) {
						TagElement tagEl = (TagElement) iter.next();
						if (tagName.equals(tagEl.getTagName())) {
							return tagEl;
						}
					}
				}
			}
			List<?> modifiers = node.modifiers();
			if (modifiers != null && modifiers.size() > 0) {
				for (Iterator<?> iter = modifiers.iterator(); iter.hasNext();) {
					Object obj = iter.next();
					if (obj instanceof Annotation) {
						Annotation annotation = (Annotation) obj;
						String qName = annotation.getTypeName().getFullyQualifiedName();
						int idx = qName.indexOf("J2S");
						if (idx >= 0) {
							String annName = qName.substring(idx);
							annName = annName.replaceFirst("J2S", "@j2s");
							if (annName.startsWith(tagName)) {
								return annotation;
							}
						}
					}
				}
			}
			return null;
		}


	}
}
