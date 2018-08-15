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
package net.sf.j2s.core;

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

import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.IType;
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
import org.eclipse.jdt.core.dom.CreationReference;
import org.eclipse.jdt.core.dom.DoStatement;
import org.eclipse.jdt.core.dom.EmptyStatement;
import org.eclipse.jdt.core.dom.EnhancedForStatement;
import org.eclipse.jdt.core.dom.EnumConstantDeclaration;
import org.eclipse.jdt.core.dom.EnumDeclaration;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.ExpressionMethodReference;
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
import org.eclipse.jdt.core.dom.LambdaExpression;
import org.eclipse.jdt.core.dom.LineComment;
import org.eclipse.jdt.core.dom.MarkerAnnotation;
import org.eclipse.jdt.core.dom.MemberRef;
import org.eclipse.jdt.core.dom.MemberValuePair;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.MethodRef;
import org.eclipse.jdt.core.dom.MethodRefParameter;
import org.eclipse.jdt.core.dom.MethodReference;
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
import org.eclipse.jdt.core.dom.PrimitiveType.Code;
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.QualifiedType;
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
import org.eclipse.jdt.core.dom.SuperMethodReference;
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
import org.eclipse.jdt.core.dom.TypeMethodReference;
import org.eclipse.jdt.core.dom.TypeParameter;
import org.eclipse.jdt.core.dom.UnionType;
import org.eclipse.jdt.core.dom.VariableDeclaration;
import org.eclipse.jdt.core.dom.VariableDeclarationExpression;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;
import org.eclipse.jdt.core.dom.VariableDeclarationStatement;
import org.eclipse.jdt.core.dom.WhileStatement;
import org.eclipse.jdt.core.dom.WildcardType;

// BH 8/12/2018 -- refactored to simplify naming issues
// BH 8/6/2018  -- additional Java 8 fixes; enum $valueOf$S to valueOf$S
// BH 8/1/2018  -- adds interface default methods as C$.$defaults$(C$)
// BH 7/29/2018 -- java.util.stream.Collectors is returning java.util.Collectionthis.b$['java.util.Collection'].add

// BH 7/25/2018 -- allows for direct private function calls in inner and anonymous classes using var p$, p$$, p$$$, etc
// BH 7/22/2018 -- fixes improper use of charCodeAt() to replace charCode().$c() when not java.lang.String.charAt
// BH 7/20/2018 -- removes qualifications for single-abstract method overrides
// BH 7/19/2018 -- fixes Enum.Enum
// BH 7/18/2018 -- addw Java 8 try without catch or finally
// BH 7/16/2018 -- adds Java 8 :: operator
// BH 7/15/2018 -- adds Java 8 lambda expressions
// BH 7/14/2018 -- removes java2scriptbuilder; uses CompilationParticipant instead
// BH 7/5/2018 -- fixes int | char
// BH 7/3/2018 -- adds tryWithResource
// BH 7/3/2018 -- adds effectively final -- FINAL keyword no longer necessary  
// BH 6/27/2018 -- fix for a[Integer] not becoming a[Integer.valueOf]
// BH 6/26/2018 -- method logging via j2s.log.methods.called and j2s.log.methods.declared
// BH 6/24/2018 -- synchronized(a = new Object()) {...} ---> ...; only if an assignment or not a simple function call to Object.getTreeLock()
// BH 6/23/2018 -- synchronized(a = new Object()) {...} ---> if(!(a = new Object()) {throw new NullPointerException()}else{...}
// BH 6/21/2018 -- CharSequence.subSequence() should be defined both subSequence$I$I and subSequence
// BH 6/20/2018 -- fixes for (int var : new int[] {3,4,5}) becoming for var var
// BH 6/19/2018 -- adds .j2s j2s.class.replacements=org.apache.log4j.->jalview.javascript.log4j.;
// BH 5/15/2018 -- fix for a[pt++] |= 3  incrementing pt twice and disregarding a[][] (see test/Test_Or.java)
// BH 3/27/2018 -- fix for anonymous inner classes of inner classes not having this.this$0
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

	private static final String VERSION = CorePlugin.VERSION;

	/**
	 * The idea of simplifying the functional interfaces using Clazz.newLambda did
	 * not work out as well as I had hoped. The code is still here, but
	 * Clazz.newLambda has been commented out, and setting this false bypasses the
	 * code that is here as well.
	 * 
	 */
	private static final boolean ALLOW_NEW_LAMBDA = false;

	private static final int NOT_LAMBDA = 0;
	private static final int LAMBDA_METHOD = 1;
	private static final int LAMBDA_CREATION = 3;
	private static final int LAMBDA_EXPRESSION = 5;

	private final static int METHOD_NOTSPECIAL = 0;
	private final static int METHOD_LITERAL = 1;
	private final static int METHOD_LAMBDA_C = 3;

	private final static int METHOD_CONSTRUCTOR = 4;
	private final static int METHOD_INDEXOF = 8;
	private final static int METHOD_ISQUALIFIED = 16;
	private final static int METHOD_NULLEXPRESSION = 32;

	private final static String CHARCODEAT0 = ".$c()";

	private static final String NULL_PACKAGE = "_";

	private IJavaProject global_project;

	private String package_name;
	private int package_blockLevel = 0;
	private int package_currentBlockForVisit = -1;
	private Stack<String> package_methodStackForFinals = new Stack<String>();

	/**
	 * track the names for I$$[...]
	 */
	private StringBuffer package_includes = new StringBuffer();

	/**
	 * map class names to I$$[] index
	 * 
	 */
	private Map<String, Integer> package_htIncludeNames = new Hashtable<>();

	/**
	 * I$$[] index counter
	 * 
	 */
	private int[] package_includeCount = new int[1];

	/**
	 * List of variables that are declared as final or are found to be effectively
	 * final.
	 */
	private List<LocalVariable> package_finalVars = new ArrayList<LocalVariable>();

	/**
	 * Normal (non-final) variables may be affected by final variable names.
	 */
	private List<LocalVariable> class_normalVars = new ArrayList<LocalVariable>();

	/**
	 * The final variables that are actually referenced inside an anonymous or local
	 * class
	 */
	private List<LocalVariable> package_visitedVars = new ArrayList<LocalVariable>();

	/**
	 * a flag to indicate that the expression being evaluated is an ArrayAccess type
	 * and so must be integerized with |0
	 */
	private boolean temp_processingArrayIndex;

	/**
	 * functionalInterface methods add the name$ qualifier even if they are
	 * parameterized
	 * 
	 */
	private boolean temp_addUnqualifiedMethod;

	// the three key elements of any class

	private String myFullClassName = ""; // test.Test_
	private String myShortClassName = ""; // Test_
	private ITypeBinding myTypeBinding;

	/**
	 * Set the three key elements for the current class. Called only by
	 * addClsasOrInterface.
	 * 
	 * @param className
	 * @param binding
	 */
	private void setClassAndBinding(String className, ITypeBinding binding) {
		myTypeBinding = binding;
		myShortClassName = className;
		myFullClassName = package_name + '.' + myShortClassName;
	}

	private Java2ScriptVisitor setInnerGlobals(Java2ScriptVisitor parent, ASTNode node) {
		package_name = parent.package_name;
		package_htIncludeNames = parent.package_htIncludeNames;
		package_includeCount = parent.package_includeCount;
		package_includes = parent.package_includes;
		package_mapBlockJavadoc = parent.package_mapBlockJavadoc;

		// final and effectively final references

		package_currentBlockForVisit = parent.package_currentBlockForVisit;
		package_methodStackForFinals = parent.package_methodStackForFinals;
		package_blockLevel = parent.package_blockLevel;
		package_finalVars = parent.package_finalVars;
		class_normalVars = parent.class_normalVars;
		package_visitedVars = parent.package_visitedVars;

		// inner class temporary visitor business

		this$0Name = parent.myFullClassName;
		innerNode = node;

		return this;
	}

	private ASTNode innerNode;
	private String this$0Name;
	private boolean class_isAnonymousOrLocal;
	private boolean inNewLambdaExpression;

	/**
	 * default constructor found by visit(MethodDeclaration)
	 */
	private boolean haveDefaultConstructor;

	private String getNormalVariableName(String name) {
		for (int i = class_normalVars.size() - 1; i >= 0; i--) {
			String var = class_normalVars.get(i).variableName;
			if (name.equals(var))
				return var;
		}
		return name;
	}

	private static IType appletType;

	public Java2ScriptVisitor() {
		// default constructor is necessary for addClassOrInterface

		// TODO how to compare a type with a subclass of JApplet?
//		try {
//			appletType = project.findType("javax.swing.JApplet");
//		} catch (JavaModelException e) {
//			logErr("Java2ScriptVisitor could not find javax.swing.JApplet");
//		}
	}

	public Java2ScriptVisitor setProject(IJavaProject project) {
		this.global_project = project;
		return this;
	}

	public String getMyPackageName() {
		return package_name;
	}

	/**
	 * Buffer that keeps all compiled *.js.
	 */
	private StringBuffer buffer = new StringBuffer();

	private char getLastCharInBuffer() {
		return (buffer.length() == 0 ? '\0' : buffer.charAt(buffer.length() - 1));
	}

	private StringBuffer init0Buffer;

	private ArrayList<String> applets, apps;

	private void addApplication() {
		if (apps == null)
			apps = new ArrayList<String>();
		apps.add(myFullClassName);
	}

	private boolean checkAddApplet(ITypeBinding binding) {
		if (Modifier.isAbstract(binding.getModifiers()))
			return false;
		IType bound = (IType) binding.getJavaElement();
		// How to compare this with JApplet?
		ITypeBinding b = binding;
		while ((binding = binding.getSuperclass()) != null) {
			String name = binding.getQualifiedName();
			if (!("javax.swing.JApplet".equals(name))) {
				if (name.startsWith("java.") || name.startsWith("javax"))
					return false;
				continue;
			}
			if (applets == null)
				applets = new ArrayList<String>();
			applets.add(myFullClassName);
			return true;
		}
		return false;
	}

	public ArrayList<String> getAppList(boolean isApplets) {
		return (isApplets ? applets : apps);
	}

	private boolean isUserApplet;

	public boolean visit(CompilationUnit node) {
		resetPrivateVars();
		return true;
	}

	public boolean visit(PackageDeclaration node) {
		setMapJavaDoc(node);
		setPackage(node.getName().toString());
		return false;
	}

//	public boolean visit(AnonymousClassDeclaration node) {
	// anonymous will never come through here. It will be routed directly to
	// addClassOrInterface
//		addClassOrInterface(node, node.resolveBinding(), node.bodyDeclarations(), 'a');
//		return false;
//	}

	/**
	 * Set the package name and start the package header
	 * 
	 * @param packageName package name or null to check to see if this is a
	 *                    top-level window. applet
	 * 
	 */
	private void setPackage(String packageName) {
		if (packageName == null) {
			if (package_name != null)
				return;
			packageName = NULL_PACKAGE;
		}
		package_name = packageName;
		package_includes = new StringBuffer();
		buffer.append("var P$=");
		if (NameMapper.isJ2sClazzPackage(package_name)) {
			buffer.append(packageName);
		} else {
			buffer.append("Clazz.newPackage(\"").append(packageName).append("\")");
		}
		buffer.append(",I$=[];\r\n");
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
	 * Only specially process blocks if they are method declarations. Never process
	 * these for constructors.
	 */

	public boolean visit(Block node) {
		if (inNewLambdaExpression)
			return true;
		package_blockLevel++;
		buffer.append("{\r\n");
		ASTNode parent = node.getParent();
		if (parent instanceof MethodDeclaration && !((MethodDeclaration) parent).isConstructor()
				|| parent instanceof Initializer) {
			Javadoc javadoc = ((BodyDeclaration) parent).getJavadoc();
			if (javadoc != null) {
				List<Javadoc> list = new ArrayList<Javadoc>();
				list.add(javadoc);
				return !NativeDoc.checkJ2sJavadocs(buffer, list, false);
			}
		}
		return true;
	}

	public void endVisit(Block node) {
		if (inNewLambdaExpression)
			return;
		// look for trailing j2sNative block just before the end of a block
		getJ2sJavadoc(node, false);
		buffer.append("}");
		clearVariables(package_finalVars);
		clearVariables(class_normalVars);
		package_blockLevel--;
	}

	public boolean visit(BreakStatement node) {
		buffer.append("break");
		addLabel(node.getLabel(), false);
		return false;
	}

	/**
	 * top-level new Foo()
	 * inner static new Foo.Bar()
	 * 
	 * lambda expression Runnable r2 = () -> System. out.println("Hello world two!");
	 * 
	 * new MouseListener() {...}
	 * 
	 */
	public boolean visit(ClassInstanceCreation node) {
		AnonymousClassDeclaration anonDeclare = node.getAnonymousClassDeclaration();
		ITypeBinding binding = node.resolveTypeBinding();
		if (binding == null)
			return false;
		if (binding.isLocal()) {
			// method-local classes or anonymous classes
			// includes anonymous, despite JLS spec that anonymous classes are not local
			processLocalInstance(node, anonDeclare, binding, getJavaClassNameQualified(binding), NOT_LAMBDA,
					anonDeclare == null);
			return false;
		}
		IMethodBinding constructorMethodBinding = node.resolveConstructorBinding();
		if (binding.isTopLevel() || isStatic(binding)) {
			// standard new Foo() or new ClassX.Foo()
			addConstructor(node.getType(), constructorMethodBinding, node.arguments(), -1);
		} else {
			// inner nonstatic class
			addInnerTypeInstance(node, getJavaClassNameQualified(binding), node.getExpression(), null, (constructorMethodBinding == null ? null : constructorMethodBinding.getMethodDeclaration()),
					null, null);
		}
		return false;
	}

	private void addConstructor(Type type, IMethodBinding constructorMethodBinding, List<?> arguments,
			int lambdaArity) {
		String javaClassName = getClassJavaNameForClass(type);
		if ("java.lang.Object".equals(javaClassName)) {
			buffer.append(" Clazz.new_()");
			return;
		}
		String finalQualifiedClassName = getFinalJ2SClassName(javaClassName, FINAL_RAW);
		String prefix = null, postfix = null;
		boolean isDefault = false;
		if ("String".equals(finalQualifiedClassName)) {
			// special treatment for String -- see j2sSwingJS.js
			buffer.append(" String.instantialize(");
		} else if (NameMapper.isOneOf(finalQualifiedClassName, NameMapper.noConstructorNames)) {
			// look out for java.lang.Integer and the like -- just pass it
			// directly
			// Replace new Boolean with Boolean.from because new
			// Boolean("false") returns true in JavaScript.
			// JavaScript considers any string to be true while java only
			// considers the string "true" to be true
			if (finalQualifiedClassName.equals("Boolean"))
				buffer.append(" Boolean.from(");
			else
				buffer.append(" new ").append(finalQualifiedClassName).append("(");
		} else {
			openNew(javaClassName, null, constructorMethodBinding, lambdaArity);
			isDefault = (arguments != null && arguments.isEmpty());
			prefix = ",[";
			postfix = "]";
		}
		if (lambdaArity >= 0)
			buffer.append(",[" + this.getLambdaParamList(constructorMethodBinding, lambdaArity) + "]");
		else if (!isDefault) {
			IMethodBinding constructorMethodDeclaration = (constructorMethodBinding == null ? null
					: constructorMethodBinding.getMethodDeclaration());
			addMethodParameterList(arguments, constructorMethodDeclaration, prefix, postfix, METHOD_CONSTRUCTOR);
		}
		buffer.append(")");
	}

	/**
	 * Start a new Clazz.new_() call for class creation or inner classes. Uses
	 * Clazz.load for dynamic loading
	 * 
	 * @param javaClassName            the class name to use if there is no anonymous class name
	 * @param anonJavaName the name of the anonymous class or lambda class that has just been defined
	 * @param constructorMethodBinding the specified constructor for this
	 *                                 instantiation
	 * @param lambdaArity              parameterTypes[].length for a lambda method
	 *                                 or -1 for non-lambda classes
	 */
	private void openNew(String javaClassName, String anonJavaName, IMethodBinding constructorMethodBinding, int lambdaArity) {
		buffer.append("Clazz.new_(");
		String finalQualifiedName;
		if (anonJavaName == null) {
			finalQualifiedName = getFinalJ2SClassName(javaClassName, FINAL_PC);
			if (!finalQualifiedName.equals("C$"))
				finalQualifiedName = getFinalJ2SClassNameQualifier(null, javaClassName, FINAL_ESCAPECACHE);
		} else {
			// use the lambda name directly without caching or changing.
			finalQualifiedName = getFinalJ2SClassName(anonJavaName, FINAL_P);
		}
		if (constructorMethodBinding == null) {
			// an interface instance, so no constructor
			buffer.append(finalQualifiedName + ".$init$");
			return;
		}
		String qName = getFinalMethodNameWith$Params(finalQualifiedName + ".c$", null, constructorMethodBinding, null, false,
				lambdaArity >= 0 ? METHOD_LAMBDA_C : METHOD_NOTSPECIAL);
		// if no parameters, we just give the name of the class, not the constructor
		buffer.append(qName.endsWith(".c$") ? finalQualifiedName : qName);
	}

	/**
	 * Iteratively construct the class name.
	 * 
	 * @param type
	 * @return
	 */
	private String getClassJavaNameForClass(Type type) {
		if (type instanceof QualifiedType) {
			QualifiedType qualType = (QualifiedType) type;
			return getClassJavaNameForClass(qualType.getQualifier()) + "." + qualType.getName().getIdentifier();
		}
//		if (type instanceof NameQualifiedType) {
//			NameQualifiedType nType = (NameQualifiedType) type;
//			return  getClassJavaNameForClass(nType.getQualifier()) + "." + nType.getName().getIdentifier();
//		}
		if (type instanceof ArrayType)
			return getClassJavaNameForClass(((ArrayType) type).getElementType());
		if (type instanceof ParameterizedType)
			return getClassJavaNameForClass(((ParameterizedType) type).getType());
		if (type instanceof SimpleType) {
			ITypeBinding binding = ((SimpleType) type).resolveBinding();
			return getJavaClassNameQualified(binding);
		}

		// PrimitiveType
		// WildcardType
		// other types?
		return null;
	}

	private Map<String, String> htLocalFinals = new HashMap<>();

//	private String localName; // temporary only

	/**
	 * Runnable r = new Runnable(){public void run(){System. out.println("OK");}};
	 * 
	 * or
	 * 
	 * Runnable r = () -> System. out.println("OK");
	 * 
	 * a class definition and an instantiation at the same time. "
	 * 
	 * @param node
	 * @param anonymousClassDeclaration
	 * @param binding
	 * @param javaInnerClassName includes method-local class names and anonymous class names
	 * @param isLambda
	 * @param isClassTrulyLocal
	 */
	private void processLocalInstance(ASTNode node, ASTNode anonymousClassDeclaration, ITypeBinding binding,
			String javaInnerClassName, int lambdaType, boolean isClassTrulyLocal) {

		// In the case of local classes, the declaration is dissociated from the
		// instantiation, so we need to cache the final string "{m:m,b:b,...}" at
		// creation time and recover it here.

//		localName = null;
		String finals;
		if (isClassTrulyLocal) {
			// predefined by class creation step
			finals = htLocalFinals.get(getNormalizedKey(binding));
		} else {
			// lambda and anonymous classes are defined inline. 
			finals = addInnerDeclaration(anonymousClassDeclaration == null ? node : anonymousClassDeclaration, binding, lambdaType, false, null);
			if (finals != null)
				allowClazzNewLambda = false;
		}
		IMethodBinding constructorDeclaration;
		String anonymousSuperclassName, anonName;
		if (lambdaType == NOT_LAMBDA) {
			// anonymous class
			IMethodBinding constructorBinding = ((ClassInstanceCreation) node).resolveConstructorBinding();
			anonymousSuperclassName = getJavaClassNameSuperNoBrackets(binding);
			constructorDeclaration = (constructorBinding == null || anonymousSuperclassName == null ? null 
					: constructorBinding.getMethodDeclaration());
			// force direct .$init$() call rather than .c$()
			// only if the anonymous instance is for an interface
			anonName = (constructorDeclaration == null ? javaInnerClassName : null);
		} else {
			// force .$init$() call rather than .c$() for lambda classes
			constructorDeclaration = null;
			anonymousSuperclassName = null;
			anonName = getMyJavaClassNameLambda(false);
		}
		addInnerTypeInstance(node, javaInnerClassName, null, finals, constructorDeclaration,
				anonymousSuperclassName, anonName);
		if (lambdaType != LAMBDA_METHOD && !isClassTrulyLocal)
			buffer.append(")"); // end of line (..., ...)
	}

	/**
	 * Add the class declaration for inner, local, and lambda classes.
	 * 
	 * @param node
	 * @param declaration
	 * @param binding
	 * @param lambdaType
	 * @param isLocal
	 * @param bodyDeclarations
	 * @return
	 */
	private String addInnerDeclaration(ASTNode node, ITypeBinding binding, int lambdaType, boolean isLocal,
			List<?> bodyDeclarations) {
		boolean wasAnonymous = class_isAnonymousOrLocal;
		class_isAnonymousOrLocal = true;
		List<LocalVariable> lastNormalVars = class_normalVars;
		List<LocalVariable> lastVisitedVars = package_visitedVars;
		List<LocalVariable> myVisitedVars = package_visitedVars = new ArrayList<LocalVariable>();
		int lastCurrentBlock = package_currentBlockForVisit;
		package_currentBlockForVisit = package_blockLevel;
		class_normalVars = new ArrayList<LocalVariable>();
		package_methodStackForFinals.push(getNormalizedKey(binding));
		// localName = null;
		if (lambdaType != NOT_LAMBDA) {
			addClassOrInterface(node, binding, null, 'm');
			if (lambdaType == LAMBDA_METHOD)
				buffer.append("); return ");
			else
				buffer.append(", ");
		} else if (isLocal) {
			addClassOrInterface(node, binding, bodyDeclarations, 'l');
		} else {
			buffer.append("(");
			AnonymousClassDeclaration decl = (AnonymousClassDeclaration) node;
//			decl.accept(this);//localName = 
			addClassOrInterface(decl, decl.resolveBinding(), decl.bodyDeclarations(), 'a');
			buffer.append(", ");
		}
		package_methodStackForFinals.pop();
		class_normalVars = lastNormalVars;

		String finals = listFinalVariables(myVisitedVars);
		if (lastCurrentBlock != -1) {
			/* add the visited variables into last visited variables */
			for (int j = 0; j < myVisitedVars.size(); j++) {
				LocalVariable visitedVar = myVisitedVars.get(j);
				for (int i = 0, size = package_finalVars.size(); i < size; i++) {
					LocalVariable finalVar = package_finalVars.get(size - i - 1);
					if (finalVar.variableName.equals(visitedVar.variableName) && finalVar.blockLevel <= lastCurrentBlock
							&& !lastVisitedVars.contains(finalVar)) {
						lastVisitedVars.add(finalVar);
					}
				}
			}
		}
		package_visitedVars = lastVisitedVars;
		package_currentBlockForVisit = lastCurrentBlock;
		class_isAnonymousOrLocal = wasAnonymous;
		return finals;
	}

	/**
	 * Generated final variable list for anonymous class creation.
	 * 
	 * @param visitedVars
	 * @param seperator
	 * @param scope
	 * @return
	 */
	private String listFinalVariables(List<LocalVariable> visitedVars) {
		if (visitedVars.size() == 0) {
			return null;
		}
		String scope = (package_methodStackForFinals.size() == 0 ? null : (String) package_methodStackForFinals.peek());
		StringBuffer buf = new StringBuffer();
		buf.append("{");
		for (Iterator<LocalVariable> iter = visitedVars.iterator(); iter.hasNext();) {
			LocalVariable fv = iter.next();
			String name = fv.prefixedName;
			buf.append(name);
			buf.append(": ");
			String methodScope = fv.methodScope;
			if (methodScope == null ? scope == null : methodScope.equals(scope)) {
				buf.append(name);
			} else {
				buf.append("this.$finals$." + name);
			}
			if (iter.hasNext()) {
				buf.append(", ");
			}
		}
		buf.append("}");
		return buf.toString();
	}

	public boolean visit(ConstructorInvocation node) {
		IMethodBinding constructorBinding = node.resolveConstructorBinding();
		List<?> arguments = node.arguments();
		buffer.append(getFinalMethodNameWith$Params("C$.c$", null, constructorBinding, null, false, METHOD_NOTSPECIAL))
				.append(".apply(this");
		IMethodBinding methodDeclaration = (constructorBinding == null ? null
				: constructorBinding.getMethodDeclaration());
		addMethodParameterList(arguments, methodDeclaration, ", [", "]", METHOD_CONSTRUCTOR);
		buffer.append(");\r\n");
		return false;
	}

	public boolean visit(ContinueStatement node) {
		buffer.append("continue");
		addLabel(node.getLabel(), false);
		return false;
	}

	/**
	 * break foo; continue foo; foo: for/while/do
	 * 
	 * $var: ....
	 * 
	 * @param label
	 * @param isDefining
	 */
	private void addLabel(SimpleName label, boolean isDefining) {
		if (label != null) {
			buffer.append(' ');
			buffer.append(NameMapper.getJ2S$JavaScriptCollisionIdentifier(label.getIdentifier(), false, null));
			buffer.append(label);
		}
		buffer.append(isDefining ? " : " : ";\r\n");
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
		// for (Integer v : ...)
		SimpleName name = node.getParameter().getName();
		ITypeBinding vtype = name.resolveTypeBinding();
		buffer.append("for (var ");
		int pt = buffer.length();
		name.accept(this);
		String varName = buffer.substring(pt);
		setVariableFinal(name, 1);
		appendReplaceV(", $V = ", "V", varName, null, null);
		Expression exp = node.getExpression();
		ITypeBinding eType = exp.resolveTypeBinding();
		ITypeBinding arrayType = eType.getComponentType();

		if (arrayType == null) {
			exp.accept(this);
			appendReplaceV(".iterator$(); $V.hasNext$()&&((V=", "V", varName, null, null);
			appendReplaceV("($V.next$())", "V", varName, vtype, eType);
			appendReplaceV("),1);", "V", varName, null, null);
		} else {
			appendReplaceV("0, $$V = ", "V", varName, null, null);
			exp.accept(this);
			appendReplaceV("; $V<$$V.length&&((V=", "V", varName, null, null);
			appendReplaceV("($$V[$V])", "V", varName, vtype, arrayType);
			appendReplaceV("),1);$V++", "V", varName, null, null);
		}
		buffer.append(") ");
		node.getBody().accept(this);
		buffer.append("\r\n");
		return false;
	}

	/**
	 * For enhanced FOR only.
	 * 
	 * allow for primitive boxing or unboxing. See test.Test_Chars.java
	 * 
	 * @param template
	 * @param v
	 * @param varName
	 * @param vType
	 * @param eType
	 */
	private void appendReplaceV(String template, String v, String varName, ITypeBinding vType, ITypeBinding eType) {
		String s = template.replace(v, varName);
		if (vType != eType) {
			if (vType.isPrimitive()) {
				if (eType.isPrimitive()) {
					// this is a conversion of an char[] to an int -- the only
					// possibility allowed, I think
					s += CHARCODEAT0;
				} else {
					// So we know the expression is boxed -- Character, for
					// example
					// Character does not use .objectValue, but we implement it
					// here
					if (vType.getName().equals("int"))
						s += ".intValue$()";
					else
						s += ".objectValue$()";
				}
			} else if (eType.isPrimitive()) {
				// So we know the expression is unboxed -- char, for example
				s = "new " + NameMapper.getPrimitiveTYPE(eType.getName()) + s;
			}
		}
		buffer.append(s);
	}

	public boolean visit(EnumDeclaration node) {
		setPackage(null);
		addClassOrInterface(node, node.resolveBinding(), node.bodyDeclarations(), 'e');
		return false;
	}

	public boolean visit(EnumConstantDeclaration node) {
		buffer.append("this.");
		node.getName().accept(this);
		buffer.append(" = ");
		node.getName().accept(this);
		buffer.append(";\r\n");
//		 EnumConstantDeclaration:
//		     [ Javadoc ] { ExtendedModifier } Identifier
//		         [ ( [ Expression { , Expression } ] ) ]
//		         [ AnonymousClassDeclaration ]
		return true;
	}

	public boolean visit(ExpressionStatement node) {
		// e.g. test.Test_Anon.main(args);
		return true;
	}

	public void endVisit(ExpressionStatement node) {
		buffer.append(";\r\n");
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
		appendBoxingNode(node.getExpression(), false);
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
	 * out: while/for/do...
	 * 
	 */
	public boolean visit(LabeledStatement node) {
		addLabel(node.getLabel(), true);
		node.getBody().accept(this);
		return false;
	}

	@SuppressWarnings("unchecked")
	public boolean visit(MethodDeclaration node) {
		IMethodBinding mBinding = node.resolveBinding();
		if (mBinding == null || NativeDoc.checkj2sIgnore(node))
			return false;
		processMethodDeclaration(mBinding, node.parameters(), node.getBody(), node.isConstructor(), NOT_LAMBDA);
		return false;
	}

	/**
	 * Called by visit(MethodDeclaration) as well as addLambdaMethod().
	 * 
	 * @param mBinding
	 * @param parameters
	 * @param body
	 * @param isConstructor
	 * @param lambdaType
	 */
	@SuppressWarnings("null")
	private void processMethodDeclaration(IMethodBinding mBinding, List<ASTNode> parameters, ASTNode body,
			boolean isConstructor, int lambdaType) {
		int mods = mBinding.getModifiers();
		boolean isNative = Modifier.isNative(mods);
		if (body == null && !isNative && lambdaType == NOT_LAMBDA) {
			// Abstract method
			return;
		}
		boolean isPublic = Modifier.isPublic(mods);
		boolean isPrivate = !isPublic && !isConstructor && isPrivate(mBinding);
		boolean isStatic = isStatic(mBinding);
		boolean addUnqualified = lambdaType == NOT_LAMBDA && (temp_addUnqualifiedMethod // method call to lambda
				|| isUserApplet && !isConstructor && !isStatic && isPublic
		// public applet methods could never be overloaded in
		// JavaScript anyway.
		);
		String finalName = getFinalMethodNameOrArrayForDeclaration(mBinding, isConstructor, addUnqualified);
		boolean isMain = isStatic && isPublic && mBinding.getName().equals("main")
				&& mBinding.getKey().endsWith(";.main([Ljava/lang/String;)V");
		if (isMain) {
			addApplication();
		}
		if (global_lstMethodsDeclared != null && !isPrivate)
			logMethodDeclared(finalName);

		String key = getNormalizedKey(mBinding);
		package_methodStackForFinals.push(key);
		try {
			ITypeBinding mClass = mBinding.getDeclaringClass();
			if (isConstructor && finalName.equals("'c$'")
					|| mBinding.isVarargs() && mBinding.getParameterTypes().length == 1)
				haveDefaultConstructor = true; // in case we are not qualifying
												// names here
			buffer.append("\r\nClazz.newMeth(C$, ").append(finalName).append(", function (");
			if (parameters == null)
				// lambda method
				buffer.append(getLambdaParamList(mBinding, -1));
			else
				visitList(parameters, ", ");
			buffer.append(") ");
			if (lambdaType != NOT_LAMBDA) {
				addLambdaBody(body);
				if (body == null)
					return;
			} else if (isConstructor) {
				@SuppressWarnings("unchecked")
				List<ASTNode> statements = ((Block) body).statements();
				ASTNode firstStatement;
				if (statements.size() == 0
						|| !((firstStatement = statements.get(0)) instanceof SuperConstructorInvocation)
								&& !(firstStatement instanceof ConstructorInvocation)) {
					buffer.append("{\r\n");
					String superclassName = getJavaClassNameSuperNoBrackets(mClass);
					if (superclassName == null)
						addCallInit();
					else
						addSuperConstructor(null, null);
					package_blockLevel++;
					visitList(statements, "");
					endVisit((Block) body);
				} else {
					body.accept(this);
				}
			} else if (body == null) {
				// not a constructor and no body -- native
				buffer.append("{\r\n");
				if (isNative) {
					buffer.append("alert('native method must be replaced! " + key + "');\r\n");
					log("native: " + key);
				}
				buffer.append("}\r\n");
			} else {
				body.accept(this);
			}
			if (isStatic || isConstructor)
				buffer.append(", ").append(isNative ? 2 : 1);
			else if (isPrivate)
				buffer.append(", " + getPrivateVar(mClass, false));
			buffer.append(");\r\n");
		} finally {
			package_methodStackForFinals.pop();
			removeVariableFinals(mBinding, parameters);
		}
	}

	private void setVariableFinal(SimpleName name, int offset) {
		IBinding binding = name.resolveBinding();
		if (binding != null) {
			boolean isFinal = isFinalOrEffectivelyFinal(binding);
			String identifier = name.getIdentifier();
			addVariable(identifier, offset, isFinal);
		}
	}

	private void addVariable(String identifier, int offset, boolean isFinal) {
		int level = package_blockLevel + offset;
		LocalVariable f = new LocalVariable(level, identifier,
				package_methodStackForFinals.size() == 0 ? null : package_methodStackForFinals.peek());
		f.toVariableName = identifier;
		f.prefixedName = NameMapper.getFinalJ2SPrefixedFieldName(myTypeBinding, identifier);
		class_normalVars.add(f);
		if (isFinal) {
			package_finalVars.add(f);
		}
	}

	private static boolean isFinalOrEffectivelyFinal(IBinding binding) {
		return Modifier.isFinal(binding.getModifiers())
				|| binding instanceof IVariableBinding && ((IVariableBinding) binding).isEffectivelyFinal();
	}

	private void removeVariableFinals(IMethodBinding mBinding, List<ASTNode> parameters) {
		if (parameters == null)
			return;
		String methodSig = mBinding.getKey();
		for (int i = parameters.size() - 1; i >= 0; i--) {
			SimpleName name = ((VariableDeclaration) parameters.get(i)).getName();
			IBinding binding = name.resolveBinding();
			if (binding != null) {
				String identifier = name.getIdentifier();
				LocalVariable f = new LocalVariable(package_blockLevel + 1, identifier, methodSig);
				f.toVariableName = identifier;
				f.prefixedName = NameMapper.getFinalJ2SPrefixedFieldName(myTypeBinding, identifier);
				class_normalVars.remove(f);
				if (isFinalOrEffectivelyFinal(binding)) {
					package_finalVars.remove(f);
				}
				package_visitedVars.remove(f);
			}
		}
	}

	private void clearVariables(List<LocalVariable> vars) {
		for (int i = vars.size(); --i >= 0;) {
			LocalVariable var = vars.get(i);
			if (var.blockLevel >= package_blockLevel) {
				vars.remove(i);
			}
		}
	}

	public boolean visit(MethodInvocation node) {
		Expression expression = node.getExpression();
		IMethodBinding mBinding = node.resolveMethodBinding();
		addMethodInvocation(node.getName(), node.arguments(), mBinding, expression, -1);
		return false;
	}

	/**
	 * Called by visit(MethodDeclaration) as well as addLambdaMethod().
	 * 
	 * @param javaQualifier
	 * @param arguments
	 * @param mBinding
	 * @param expression
	 */
	private void addMethodInvocation(SimpleName javaQualifier, List<?> arguments, IMethodBinding mBinding,
			Expression expression, int lambdaArity) {
		if (javaQualifier == null)
			dumpStack("addMethodInvocation null simpleJavaName " + mBinding + " " + expression + " " + lambdaArity);
		String methodName = mBinding.getName();
		ITypeBinding declaringClass = mBinding.getDeclaringClass();
		String declaringClassJavaClassName = getJavaClassNameQualified(declaringClass);

		// System. out.println -- System.out is static, but println is not.
		// nonetheless, Modifier.isStatic() returns true.

		boolean isStatic = isStatic(mBinding);// || expression != null && isStatic(expression.resolveTypeBinding()));
//		if (!isStatic && expression instanceof Name) {
//			IBinding binding = ((Name) expression).resolveBinding();
//			// no, because sometimes these are not fully qualified className =
//			// expression.toString();
//			// because System.out is the name of a static field, not a class
//			isStatic |= isStatic(binding);
//		}
		boolean isPrivate = isPrivate(mBinding);
		boolean isPrivateAndNotStatic = isPrivate && !isStatic;
		String privateVar = (isPrivateAndNotStatic ? getPrivateVar(declaringClass, false) : null);
		boolean doLog = (!isPrivate && global_htMethodsCalled != null);

		boolean needBname = (!isStatic && expression == null && lambdaArity < 0
				&& !areEqual(declaringClass, myTypeBinding) && !myTypeBinding.isAssignmentCompatible(declaringClass));

		String bname = (needBname ? getThisRefOrSyntheticReference(javaQualifier, declaringClass, null) : null);

		// add the qualifier

		int pt = buffer.length();
		if (isPrivateAndNotStatic) {
			// note that the following expression will not work if the method is private:
			// (b ? classA : classB).method()
			// because we don't know at compile time which class is being run.
			buffer.append(privateVar);
			buffer.append(".");
		} else if (lambdaArity >= 0) {
			doLog = false;
			if (bname != null)
				allowClazzNewLambda = false;
		} else {
			if (expression == null) {
				doLog = false;
				if (bname != null) {
					buffer.append(bname);
					buffer.append(".");
				} else if (!isStatic) {
					buffer.append("this.");
				} else {
					// this will be C$., I think.
				}
			} else {
				appendFinalMethodQualifier(expression, declaringClassJavaClassName, bname,
						(isStatic && !isPrivate ? FINAL_ESCAPECACHE : FINAL_CACHE));
				buffer.append(".");
			}
		}
		// keep a pointer, because we may rewrite this
		int ptLog = (doLog ? buffer.length() : 0);

		// check for special Clazz.array or Clazz.forName
		// as well as special treatment for String.indexOf and String.lastIndexOf

		boolean isSpecialMethod = false;
		boolean isIndexOf = false;
		if (lambdaArity < 0 && !isPrivateAndNotStatic) {
			String j2sName = NameMapper.getJ2SFinalMapClazzMethod(declaringClassJavaClassName + "." + methodName);
			if (j2sName != null) {
				isSpecialMethod = true;
				// overwrite qualifier
				doLog = false;
				buffer.setLength(pt);
				buffer.append(j2sName);
				bname = null;
			} else if (declaringClassJavaClassName.equals("java.lang.String")
					&& (methodName.equals("indexOf") || methodName.equals("lastIndexOf"))) {
				// indicate to boxer method to use method "q" not "p" here.
				// This allows characters to be left as strings in String.indexOf$I and
				// String.lastIndexOf$I
				// for faster processing.
				isIndexOf = true;
			}
		}

		// have xxxx.

		// now get the method name

		// record whether this.b$[.....] was used, and if so and it is private,
		// we need to use it again
		String term = ")";
		if (!isSpecialMethod) {
			// TODO: for now we are just returning name$ for all lambda methods
			// note that simpleNameInMethodBinding can return C$.xxxx
			
			String j2sName = getFinalDotQualifiedNameForMethod(javaQualifier, mBinding,
					(expression == null ? METHOD_NULLEXPRESSION : 0) | METHOD_ISQUALIFIED
							| (lambdaArity >= 0 ? LAMBDA_METHOD : 0));
			
			String finalMethodNameWith$Params = getFinalMethodNameWith$Params(j2sName, declaringClassJavaClassName,
					mBinding, null, true, METHOD_NOTSPECIAL);
			if (lambdaArity >= 0) {
				// The problem here is that we cannot apply a method from an interface
				// because those methods are not present in JavaScript.
				// Otherwise we would use $class$.prototype here. The assumption
				// in using "t.apply" is that t must be non-null.
				// if this does not work, then we can go to ($class$.prototype || t)
				//
				boolean classIsTarget = ((isStatic || isVariableBinding(expression))
						&& lambdaArity == mBinding.getParameterTypes().length);
				buffer.append((classIsTarget ? "$class$." : "t.") + finalMethodNameWith$Params + ".apply("
						+ (isStatic ? "null" : classIsTarget ? "$class$" : "t") + ",[");
				buffer.append(getLambdaParamList(mBinding, lambdaArity));
				buffer.append("])");
				return;
			}
			if (finalMethodNameWith$Params.indexOf('|') >= 0) {
				// cover multiple parameter options to cover older versions of java
				// foo.xx$T$K || $o$.xx$O$O --> ($o$=foo).($o$.xx$T$K ||
				// $o$.xx$O$O)
				doLog = false;
				postFixGeneric$OMethodName(pt, finalMethodNameWith$Params, isPrivateAndNotStatic, privateVar);
				term = "])";
			} else {
				// standard call
				buffer.append(finalMethodNameWith$Params);
			}

			if (doLog) {
				String name = declaringClassJavaClassName + "." + buffer.substring(ptLog);
				logMethodCalled(name);
			}
			if (isPrivateAndNotStatic || bname != null) {
				// A call to a nonprivate outer-class method from an inner class
				// requires using apply on the object, which is either
				// this or this.b$["....."]
				//
				// all private calls are made to var p$x

				buffer.append(".apply(");
				appendFinalMethodQualifier(expression, declaringClassJavaClassName, bname, FINAL_CACHE);
				buffer.append(", [");
				term = "])";
			}
		}
		if (term == ")")
			buffer.append("(");
		addMethodParameterList(arguments, mBinding, null, null, isIndexOf ? METHOD_INDEXOF : METHOD_NOTSPECIAL);
		buffer.append(term);
	}

	/**
	 * Write the method expression to the buffer. If the qualifier is a variable,
	 * such as System.out, or an expression, such as (useF? f : g), then we can
	 * simply accept it. Othewise we need to qualify it.
	 * 
	 * @param qualifier                   null for "this" or outer-class reference;
	 * 
	 * @param declaringClassJavaClassName
	 * @param bname
	 * @param flags    FINAL_LAMBDA | FINAL_ESCAPE | FINAL_CACHE
	 */
	private void appendFinalMethodQualifier(Expression qualifier, String declaringClassJavaClassName, String bname,
			int flags) {
		if (qualifier == null) {
			if ((flags & FINAL_LAMBDA) != 0) {
				buffer.append(getFinalJ2SClassNameQualifier(null, declaringClassJavaClassName, flags));
			} else {
				buffer.append(bname == null ? "this" : bname);
			}
		} else if (qualifier instanceof Name && !isVariableBinding(qualifier)) {
			buffer.append(getFinalJ2SClassNameQualifier((Name) qualifier, declaringClassJavaClassName, flags));
		} else {
			// xxxx.field.foo()
			// (x ? y : z).foo()
			qualifier.accept(this);
		}
	}

	private static boolean isVariableBinding(Expression qualifier) {
		return qualifier instanceof Name && ((Name) qualifier).resolveBinding() instanceof IVariableBinding;
	}

	public boolean visit(ReturnStatement node) {
		buffer.append("return");
		Expression expression = node.getExpression();
		if (expression != null) {
			buffer.append(' ');

			ASTNode parent = node.getParent();
			while (parent != null && !(parent instanceof MethodDeclaration)) {
				parent = parent.getParent();
			}
			IMethodBinding mBinding = (parent == null ? null : ((MethodDeclaration) parent).resolveBinding());
			ITypeBinding retType = (mBinding == null ? null : mBinding.getReturnType());
			addExpressionAsTargetType(expression, retType, "r", null);
		}
		buffer.append(";\r\n");
		return false;
	}

	/**
	 * method parameters or catch variables
	 */
	public boolean visit(SingleVariableDeclaration node) {
		SimpleName name = node.getName();
		name.accept(this);
		setVariableFinal(name, 1);
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
		String finalMethodNameWith$Params = getFinalMethodNameWith$Params(null, null, mBinding, null, false,
				METHOD_NOTSPECIAL);
		// BH if this is a call to super.clone() and there is no superclass, or
		// the superclass is Object,
		// then we need to invoke Clazz.clone(this) directly instead of calling
		// C$.superclazz.clone()
		if ("clone$".equals(finalMethodNameWith$Params)
				&& getJavaClassNameSuper(mBinding.getDeclaringClass()) == null) {
			buffer.append("Clazz.clone(this)");
		} else {
			buffer.append("C$.superclazz.prototype." + finalMethodNameWith$Params + ".apply(this, ");
			buffer.append("[");
			addMethodParameterList(node.arguments(), mBinding, null, null, METHOD_NOTSPECIAL);
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
		// we could wrap this with a simple if() statement,
		// checking that it is not null, but that seems to me
		// to be unnecessary. When would one ever intentionally
		// produce a null pointer exception from synchronized(...)?

		Expression e = node.getExpression();
		if (!(e instanceof Name || e instanceof TypeLiteral || e instanceof ThisExpression)) {
			buffer.append("/*sync " + e.getClass().getName() + "*/");
			// get actual JavaScript code
			int pt = buffer.length();
			e.accept(this);
			String expr = buffer.substring(pt, buffer.length());
			buffer.setLength(pt);
			// ignore (treeLock())
			if (!(e instanceof MethodInvocation && expr.indexOf(".getTreeLock()") >= 0)) {
				buffer.append("(");
				buffer.append(expr);
				buffer.append(");\r\n");
			}
		}
		node.getBody().accept(this);
		return false;
	}

	public boolean visit(ThrowStatement node) {
		buffer.append("throw ");
		node.getExpression().accept(this);
		buffer.append(";\r\n");
		return false;
	}

	@SuppressWarnings({ "unchecked", "null" })
	public boolean visit(TryStatement node) {
		List<CatchClause> catchClauses = node.catchClauses();
		int size = catchClauses.size();
		Block finallyBlock = node.getFinally();
		buffer.append(size > 0 || finallyBlock != null ? "try " : "/*try*/ ");
		List<ASTNode> resources = node.resources();
		// Returns the live ordered list of resources for this try statement (added in
		// JLS4 API).
		// [ooh...JSL9 change...]
		// A resource is either a VariableDeclarationExpression or (since JLS9) a Name.

		int pt = (resources == null || resources.size() == 0 ? -1 : buffer.length());
		node.getBody().accept(this);
		if (pt >= 0) {
			// just after first "{"
			String buf = buffer.substring((pt = buffer.indexOf("{", pt) + 1));
			buffer.setLength(pt);
			for (int i = 0; i < resources.size(); i++) {
				ASTNode resource = resources.get(i);
				if (resource instanceof VariableDeclarationExpression) {
					resource.accept(this);
				} else {
					// Java 9 -- just a Name.
					buffer.append("/* Java 9 resource " + resource + "*/\r\n");
				}
			}
			buffer.append(buf);
		}
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
					if ("java.lang.Throwable".equals(type.resolveBinding().getQualifiedName())) {
						endedWithThrowable = true;
					} else {
						if (!scopeAdded) {
							buffer.append("{\r\n");
							scopeAdded = true;
						}
						buffer.append(haveType ? " || " : "if (");
						buffer.append("Clazz.exceptionOf(" + catchEName + ",\"");
						type.accept(this);
						buffer.append("\")");
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
		if (finallyBlock != null) {
			buffer.append(" finally ");
			finallyBlock.accept(this);
		}
		buffer.append("\r\n");
		return false;
	}

	/**
	 * A class or interface is being declared.
	 * 
	 * 
	 */
	public boolean visit(TypeDeclaration node) {
		setPackage(null);
		// anonymous will never come through here. It will be routed directly to
		// addClassOrInterface
		List<?> declarations = node.bodyDeclarations();
		ITypeBinding binding = node.resolveBinding();
		addClassOrInterface(node, binding, declarations,
				node.isInterface() ? 'i' : node.isLocalTypeDeclaration() ? 'l' : 'c');
		return false;
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
	 * b) as the first statement in a constructor that does not call super(...) or
	 * this(...) (because the superclass is Object)
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
	 * If this is an inner class, then iterate, just adding its definition to the
	 * current staticBuffer;
	 * 
	 * @param node
	 * @param binding
	 * @param BodyDeclarations
	 * @param type             'a' (anonymous class), 'e' (Enum), 'i' (Interface),
	 *                         'l' (local), 'm' (LambdaExpression), or 'c' (standard
	 *                         class)
	 * @return localName
	 */
	@SuppressWarnings("null")
	private void addClassOrInterface(ASTNode node, ITypeBinding binding, List<?> bodyDeclarations, char type) {
		if (binding == null)
			return;

		checkGenericClass(binding, binding);

		ASTNode parent = node.getParent();

		boolean isEnum = (type == 'e');
		boolean isInterface = (type == 'i');
		boolean isLocal = (type == 'l');
		boolean isLambda = (type == 'm');
		boolean isAnonymous = (type == 'a' || isLambda);
		boolean isClass = (type == 'c');
		boolean isTopLevel = (!isLambda && binding.isTopLevel());

		if (!isTopLevel && !isAnonymous && node != innerNode) {
			// inner named class first pass only

			// includes EnumDeclaration

			// We use a temporary visitor to put the code
			// into a temporary buffer, produce the code in the
			// temporary visitor, append it to our TrailingBuffer,
			// and return.

			// get the visitor

			Java2ScriptVisitor tempVisitor = null;
			try {
				tempVisitor = getClass().newInstance().setProject(global_project).setInnerGlobals(this, node);
			} catch (@SuppressWarnings("unused") Exception e) {
				// impossible
			}

			// set its className and binding

			String className;
			if (parent instanceof TypeDeclarationStatement) {
				String anonClassName = removeBrackets(getJavaClassNameQualified(binding));
				className = anonClassName.substring(anonClassName.lastIndexOf('.') + 1);
				// note - this className is NOT QUALIFIED
			} else {
				className = myShortClassName + "." + binding.getName();
			}
			tempVisitor.setClassAndBinding(className, binding);

			// generate the code

			if (isLocal) {
				String finals = tempVisitor.addInnerDeclaration(node, binding, NOT_LAMBDA, true, bodyDeclarations);
				// when the class is called, we will need these
				htLocalFinals.put(getNormalizedKey(binding), finals);
			} else {
				tempVisitor.addClassOrInterface(node, binding, bodyDeclarations, type);
			}

			// append it to our TrailingBuffer

			trailingBuffer.append(tempVisitor.buffer.toString());

			return;
		}

		// set up key fields and local variables

		ITypeBinding oldBinding = null;
		String oldShortClassName = null, this$0Name0 = null, finalShortClassName, finalPackageName;
		if (isTopLevel) {
			String javaName = binding.getName();
			appendElementKey(javaName);
			setClassAndBinding(javaName, binding);
			if (isClass)
				isUserApplet = checkAddApplet(binding);
		}
		if (isAnonymous) {
			oldShortClassName = myShortClassName;
			oldBinding = myTypeBinding;
			// anonymous classes reference their package, not their outer class in
			// Clazz.newClass, so clazz.$this$0 is not assigned.
			this$0Name0 = this$0Name;
			this$0Name = null;
			finalShortClassName = getFinalJ2SClassName(
					(isLambda ? getMyJavaClassNameLambda(true) : getJavaClassNameQualified(binding)), FINAL_P)
							.substring(3);
			setClassAndBinding(finalShortClassName, binding);
			if (isLambda)
				buffer.append("(");
			buffer.append("(P$." + finalShortClassName + "||");
			finalPackageName = "P$";
		} else {
			// Top or inner named classes are already set.
			// For inner classes, we are just loading up the temporary buffer.
			// The code will end up in the trailing buffer for the parent class.
			int pt1 = myFullClassName.lastIndexOf('.');
			finalShortClassName = myFullClassName.substring(pt1 + 1);
			finalPackageName = checkPackageP$Name(myFullClassName.substring(0, pt1));
		}

		// add the anonymous wrapper if needed

		if (!isTopLevel) {
			addAnonymousFunctionWrapper(true);
		}

		// begin the class or interface definition

		buffer.append("var C$=" + (isInterface ? "Clazz.newInterface(" : "Clazz.newClass("));

		// arg1 is the package name
		// arg2 is the full class name in quotes
		// arg3 is the class definition function, C$, which is called in
		// Clazz.new_().
		// arg4 is the superclass
		// arg5 is the superinterface(s)
		// arg6 is the type: anonymous(1), local(2), or absent

		// Here we go...

		// arg1: package name or null
		// arg2: shortened class name in quotes

		buffer.append(finalPackageName + ", \"" + finalShortClassName + "\"");

		// set up func, superclass, and superInterface

		String func = "null";
		String superclassName = null;
		List<?> superInterfaceTypes = null;

		// arg3: class definition function, C$, or null to add the standard
		// function at run time

		boolean hasDependents = isEnum;
		buffer.append(", ");
		List<IMethodBinding> unqualifiedMethods = getUnqualifiedMethods(binding, null);
		if (isAnonymous) {
			if (!(parent instanceof EnumConstantDeclaration))
				func = "function(){Clazz.newInstance(this, arguments[0],1,C$);}";
			superclassName = "" + (isLambda ? null : getJavaClassNameSuper(binding));
			ITypeBinding[] declaredTypes = null;
			if (isLambda) {
				// we just have this one superinterface, which is the lambda binding itself
				declaredTypes = new ITypeBinding[] { binding };
			} else {
				declaredTypes = binding.getInterfaces();
			}
			if (declaredTypes != null && declaredTypes.length > 0) {
				List<ITypeBinding> types = new ArrayList<ITypeBinding>();
				ITypeBinding anonClassImplemented = declaredTypes[0];
				types.add(anonClassImplemented);
				superInterfaceTypes = types;
			}
		} else {
			List<BodyDeclaration> innerClasses = new ArrayList<BodyDeclaration>();
			for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
				BodyDeclaration bd = (BodyDeclaration) iter.next();
				if (bd instanceof TypeDeclaration || bd instanceof EnumDeclaration) {
					innerClasses.add(bd);
				}
			}
			if (!isTopLevel || !innerClasses.isEmpty()) {
				func = null;
				buffer.append("function(){\r\n");

				// add all inner classes iteratively

				for (int i = 0; i < innerClasses.size(); i++)
					innerClasses.get(i).accept(this);

				// continue with Clazz.newClass...
				// add the Clazz.newInstance call, which:
				// (a) adds .valueOf() = function() {return this} for Number
				// subclasses
				// (b) sets objThis.__JSID__ to a unique number
				// (c) handles inner class final variables
				// (d) includes a call to the constructor c$() when called
				// directly by the user using new Foo()
				if (!isInterface) {
					buffer.append("Clazz.newInstance(this, arguments")
							.append(isTopLevel ? ",0" : "[0]," + !isStatic(binding)).append(",C$);\r\n");
				}
				buffer.append("}");
			}
			if (isEnum) {
				superclassName = "java.lang.Enum";
				superInterfaceTypes = ((EnumDeclaration) node).superInterfaceTypes();
			} else {
				superclassName = "" + getJavaClassNameSuper(binding);
				superInterfaceTypes = ((TypeDeclaration) node).superInterfaceTypes();
			}

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
				buffer.append(getFinalJ2SClassNameQualifier(null, superclassName, FINAL_ESCAPE));
			else
				buffer.append(getFinalInnerClassList(superclassName));
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
					int pt = buffer.length();
					while (!b.isTopLevel()) {
						b = b.getDeclaringClass();
						buffer.insert(pt, "'" + getFinalJ2SClassName(getJavaClassNameQualified(b), FINAL_RAW) + "',");
					}
				}
				buffer.append("'");
				buffer.append(getFinalJ2SClassName(getJavaClassNameQualified(ibinding), FINAL_RAW));
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

		// create a list of static fields and initializers

		// add the Java8 compatibility local variable $o$

		// also add the local var p$ short for C$.prototype if we have any
		// private methods

		// add all the methods

		TrailingBuffer oldTrailingBuffer = trailingBuffer;
		trailingBuffer = new TrailingBuffer();

		if (!isLambda) {
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
				}
			}
		}
		if (lstStatic.size() > 0 || hasDependents) {
			int pt = buffer.length();
			buffer.append("\r\nC$.$clinit$ = function() {Clazz.load(C$, 1);\r\n");
			boolean haveDeclarations = isEnum;
			if (isEnum)
				addEnumConstants((EnumDeclaration) node);
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
			if (haveDeclarations || hasDependents)
				buffer.append("}\r\n");
			else
				buffer.setLength(pt);
		}

		if (isAnonymous) {
			setClassAndBinding(finalShortClassName, binding);
		}

		if (!isInterface) {

			// if this is not an interface, generate $init0$ and $init$ methods

			StringBuffer init0bufold = init0Buffer;
			init0Buffer = new StringBuffer();

			int len = buffer.length();
			buffer.append("\r\nClazz.newMeth(C$, '$init$', function () {\r\n");
			// we include all field definitions here and all nonstatic
			// initializers
			if (!isLambda)
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

		// add all the methods

		StringBuffer defaults = new StringBuffer();

		if (isLambda) {
			addLambdaMethod(node, binding.getFunctionalInterfaceMethod());
		} else {
			for (Iterator<?> iter = bodyDeclarations.iterator(); iter.hasNext();) {
				ASTNode element = (ASTNode) iter.next();
				if (element instanceof MethodDeclaration) {
					IMethodBinding method = ((MethodDeclaration) element).resolveBinding();
					int defpt = -1;
					if (Modifier.isDefault(method.getModifiers())) {
						log("default method " + method.getKey());
						defpt = buffer.length();
					}
					boolean addUnqualifiedCurrent = temp_addUnqualifiedMethod;
					if (unqualifiedMethods != null) {
						// check for all methods that override a functional interface abstract method,
						// as those
						// methods are not to be qualified

						for (int i = unqualifiedMethods.size(); --i >= 0;) {
							if (method.overrides(unqualifiedMethods.get(i))) {
								temp_addUnqualifiedMethod = true;
								break;
							}
						}
					}
					element.accept(this);
					if (defpt >= 0) {
						defaults.append(buffer.substring(defpt));
						buffer.setLength(defpt);
					}
					temp_addUnqualifiedMethod = addUnqualifiedCurrent;
				}
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

			if (defaults.length() > 0) {
				buffer.append("C$.$defaults$ = function(C$){\n").append(defaults).append("};");
			}
		}

		// add any recently defined static field definitions, assert strings
		// and Enum constants

//		if (isEnum) {
//			buffer.append(trailingBuffer.getAssertString());
//			addDefaultConstructor();
//		} else 
		{
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
				if (isEnum) {
					buffer.append("var $vals=[];\r\n");
					// implicit Enum methods added as trailer
					buffer.append("Clazz.newMeth(C$, 'values$', function() { return $vals }, 1);\r\n");
					buffer.append(
							"Clazz.newMeth(C$, 'valueOf$S', function(name) { for (var val in $vals){ if ($vals[val].$name == name) return $vals[val]} return null }, 1);\r\n");
				}
			}
		}

		getJ2sJavadoc(node, false);

		if (!isTopLevel) {
			addAnonymousFunctionWrapper(false);
			if (isAnonymous) {
				buffer.append(")");
				this$0Name = this$0Name0;
				setClassAndBinding(oldShortClassName, oldBinding);
			}
		}
	}

	/**
	 * Collect all names of all functional interface abstract methods that this
	 * class might refer to so that their unqualified. This is not perfect, as it is
	 * possible to have implementations of specific subtypes of parameterized
	 * methods. However, it will have to do for now.
	 * 
	 * @param type
	 * @param unqualifiedMethods
	 * @return List of methods that should have raw unparameterized alias
	 */
	private List<IMethodBinding> getUnqualifiedMethods(ITypeBinding type, List<IMethodBinding> unqualifiedMethods) {
		if (type.isArray() || type.isPrimitive()) {
			return unqualifiedMethods;
		}
		ITypeBinding superClass = type.getSuperclass();
		if (superClass != null)
			unqualifiedMethods = getUnqualifiedMethods(superClass, unqualifiedMethods);
		ITypeBinding[] superInterfaces = type.getInterfaces();
		for (int i = 0; i < superInterfaces.length; i++)
			unqualifiedMethods = getUnqualifiedMethods(superInterfaces[i], unqualifiedMethods);
		IMethodBinding functionalMethod = type.getFunctionalInterfaceMethod();
		if (functionalMethod != null) {
			if (unqualifiedMethods == null)
				unqualifiedMethods = new ArrayList<IMethodBinding>();
			unqualifiedMethods.add(functionalMethod);
		}
		return unqualifiedMethods;
	}

	/**
	 * If there is no Foo() or Foo(xxx... array), then we need to provide our own
	 * constructor.
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
	 * Add all the Enum constants, and create C$.values$() and Enum.valueOf
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
				ITypeBinding dbinding = anonDeclare.resolveBinding();
				// BH: add the anonymous class definition inline!
				addClassOrInterface(anonDeclare, dbinding, anonDeclare.bodyDeclarations(), 'a');
//				anonDeclare.accept(this);
				anonName = getJavaClassNameQualified(dbinding);
				buffer.append("\r\n");
			}
			buffer.append("Clazz.newEnumConst($vals, ")
					.append(getFinalMethodNameWith$Params("C$.c$", null, binding, null, false, METHOD_NOTSPECIAL))
					.append(", \"");
			enumConst.getName().accept(this);
			buffer.append("\", " + i);
			addMethodParameterList(enumConst.arguments(), binding, ", [", "]", METHOD_CONSTRUCTOR);
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
	 * @param field the field being declared
	 * @param mode  FIELD_DECL_STATIC_NONDEFAULT static fields into $clinit$
	 *              (values) FIELD_DECL_STATIC_DEFAULTS static fields into buffer
	 *              directly (defaults) FIELD_DECL_NONSTATIC_ALL static variables
	 *              into $init$ (values) and $init0$ (defaults)
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
		boolean checkFinalConstant = (isStatic && Modifier.isFinal(field.getModifiers()) && var != null
				&& !var.getType().getQualifiedName().equals("java.lang.Object"));
		if (needDefault)
			checkForJ2SDoc(field);
		int len0 = buffer.length();
		for (Iterator<?> iter = fragments.iterator(); iter.hasNext();) {
			VariableDeclarationFragment fragment = (VariableDeclarationFragment) iter.next();
			Expression initializer = fragment.getInitializer();
			if (checkFinalConstant ? getConstantValue(initializer, false)
					: isStatic && initializer == null && !needDefault)
				continue;
			int len = buffer.length();

			String prefix = (isStatic ? "C$." : "this.")
					+ NameMapper.getFinalJ2SPrefixedFieldName(classBinding, fragment.resolveBinding().getName());

			buffer.append(prefix);
			buffer.append("="); // no space here; will check last char for lambda
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
	 * @param javaInnerClassName
	 * @param outerClassExpr
	 * @param finals
	 * @param constructorDeclaration
	 * @param superAnonName the name of the superclass of the anonymous method, as 
	 * for example, in MouseAdapter adapter = new MouseAdapter() {....}
	 */
	private void addInnerTypeInstance(ASTNode node, String javaInnerClassName, 
			Expression outerClassExpr, String finals,
			IMethodBinding constructorMethodDeclaration, String superAnonName, String anonName) {
		openNew((superAnonName == null ? javaInnerClassName : superAnonName), anonName, constructorMethodDeclaration, -1);

		// add constructor application arguments: [object, parameters]

		buffer.append(", [");
		if (outerClassExpr == null)
			buffer.append("this");
		else
			outerClassExpr.accept(this);

		// add final variable array

		buffer.append(", ").append(finals == null ? "null" : finals);

		// add parameters

		if (constructorMethodDeclaration != null) {
			List<?> args = ((ClassInstanceCreation) node).arguments();
			addMethodParameterList(args, constructorMethodDeclaration,
					args.size() > 0 || constructorMethodDeclaration.isVarargs() ? ", " : null, null, METHOD_CONSTRUCTOR);
		}
		buffer.append("]");

		// an anonymous class will be calling a constructor in another
		// class, so
		// we need to indicate its actual call explicitly

		if (superAnonName != null && javaInnerClassName != null)
			buffer.append(",").append(getFinalJ2SClassName(javaInnerClassName, FINAL_PC));

		buffer.append(")");
	}

	/**
	 * Add a method parameter list
	 * 
	 * @param arguments
	 * @param methodDeclaration
	 * @param prefix
	 * @param suffix
	 * @param flags
	 */
	private void addMethodParameterList(List<?> arguments, IMethodBinding methodDeclaration, String prefix,
			String suffix, int flags) {
		if (methodDeclaration == null)
			return;

		boolean methodIsVarArgs = methodDeclaration.isVarargs();
		int argCount = arguments.size();
		if ((flags & METHOD_CONSTRUCTOR) != 0 && argCount == 0) {
			// We allow use of a default constructor using new foo().
			// Here we always add a [] argument to a default constructor, as null
			// will indicate that we did not use Clazz.new_ and instead called new foo()
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
			addMethodArguments(parameterTypes, methodIsVarArgs, arguments, flags);
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
		buffer.append(getFinalMethodNameWith$Params("C$.superclazz.c$", null, node.resolveConstructorBinding(), null,
				false, METHOD_NOTSPECIAL));
		buffer.append(".apply(this");
		addMethodParameterList(node.arguments(), methodDeclaration, ", [", "]", METHOD_CONSTRUCTOR);
		buffer.append(");\r\n");
		addCallInit();
	}

//	/**
//	 * Check whether the class represented by the given name is inherited from the
//	 * given type binding.
//	 * 
//	 * The algorithm: 1. Check binding self class name 2. Check binding super class
//	 * 3. Check binding interfaces
//	 * 
//	 * @param binding
//	 * @param name
//	 * @return
//	 */
//	static private boolean isInheritedClassName(ITypeBinding binding, String name) {
//		if (binding == null) {
//			return false;
//		}
//		String bindingName = Java2ScriptVisitor.removeBrackets(binding.getJavaClassNameQualified());
//		if (name.equals(bindingName)) {
//			return true;
//		}
//		ITypeBinding superclass = binding.getSuperclass();
//		if (isInheritedClassName(superclass, name)) {
//			return true;
//		}
//		ITypeBinding[] interfaces = binding.getInterfaces();
//		if (interfaces != null) {
//			for (int i = 0; i < interfaces.length; i++) {
//				if (isInheritedClassName(interfaces[i], name)) {
//					return true;
//				}
//			}
//		}
//		return false;
//	}
//
//	/**
//	 * nonAnonymous classes only
//	 * 
//	 * @param binding
//	 * @return
//	 */
//	private String getNamedClassName(ITypeBinding binding) {
//		String innerClassName = getClassNameQualifiedAllowP$(
//				binding.isLocal() ? binding.getBinaryName() : binding.getJavaClassNameQualified());
//		return innerClassName.substring(innerClassName.lastIndexOf('.') + 1);
//	}

	/**
	 * log to sysout
	 * 
	 * @param msg
	 */
	static void log(String msg) {
		System.out.println(msg);
	}

	/**
	 * log to syserr
	 * 
	 * @param msg
	 */
	static void logErr(String msg) {
		System.err.println(msg);
	}

	private static boolean isObjectOrNull(ITypeBinding type) {
		return type == null || "java.lang.Object".equals(type.getQualifiedName());
	}

	/**
	 * holds all static field definitions for insertion at the end of the class def
	 * and allows setting of local typed integer arrays for fast processing of bytes
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
	 * then we can use that to "filter" a (necessarily) 32-bit integer JavaScript
	 * variable to reproduce the effect of being a byte or short or int. This is
	 * done as follows:
	 * 
	 * Java:
	 * 
	 * byte b = (byte) 300;
	 * 
	 * JavaScript:
	 * 
	 * var b = ($b$[0] = 300, $b$[0]);
	 * 
	 * This works because Int8Arrays really are bytes, and they can only hold bytes.
	 * So
	 * 
	 * $b$[0] = 300
	 * 
	 * sets $b$[0] to be 44, and ($b$[0] = 300, $b$[0]) then passes that value on to
	 * the receiving variable b (which itself is a 32-bit integer, actually).
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
			return (hasAssert ? "C$.$_ASSERT_ENABLED_ = ClassLoader.getClassAssertionStatus$(C$);\r\n" : "");
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
			case 'p': // $p$ // char temp
			case 'j': // $j$ // [pt++] temp
			case 'k': // $k$ // [3][pt++]
			case 'l': // $l$ // [3][4][pt++]
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
		// new byte[] {'a', 2, 3, 4, 5};
		ArrayInitializer inode = node.getInitializer();
		if (inode == null) {
			addArrayConstructor(node.resolveTypeBinding(), node.dimensions());
		} else {
			visit(inode);
		}
		return false;
	}

	private void addArrayConstructor(ITypeBinding binding, List<ASTNode> dim) {
		boolean isLambda_C = (dim == null);
		@SuppressWarnings("null")
		int n = (isLambda_C ? 1 : dim.size());
		buffer.append(clazzArray(binding, ARRAY_DIM_ONLY));
		buffer.append(", [");
		if (isLambda_C)
			buffer.append("t.intValue()");
		else
			visitList(dim, ", ");
		for (int i = binding.getDimensions() - n; --i >= 0;)
			buffer.append(", null");
		buffer.append("])");
	}

	public boolean visit(ArrayInitializer node) {
		// as in: public String[] d = {"1", "2"};
		buffer.append(clazzArray(node.resolveTypeBinding(), ARRAY_INITIALIZED));
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
		boolean wasArray = temp_processingArrayIndex;
		temp_processingArrayIndex = (left instanceof ArrayAccess);
		ArrayAccess leftArray = (temp_processingArrayIndex ? (ArrayAccess) left : null);
		IVariableBinding toBinding = getLeftVariableBinding(left, leftTypeBinding);
		String op = node.getOperator().toString();
		String opType = (op.length() == 1 ? null : op.substring(0, op.length() - 1));
		boolean needNewStaticParenthesis = false;
		boolean isParenthesized = (right instanceof ParenthesizedExpression);
		if (isStaticBinding(toBinding)) {
			// Static def new Test_Static().y++;
			ASTNode parent = node.getParent();
			needNewStaticParenthesis = (!haveDirectStaticAccess(left)) && !(parent instanceof Statement);
			if (needNewStaticParenthesis) {
				buffer.append("(");
			}
			addLeftSidePrefixName(left);
		} else {
			toBinding = null;
		}

		if ("boolean".equals(leftName) && "boolean".equals(rightName)) {
			if (("^=".equals(op))) {
				opType = "!=";
			} else {
				// all boolean should be OK -- no automatic here
				left.accept(this);
				buffer.append((opType == null ? "=" : op));
				right.accept(this);
				leftName = null;
			}
		} else if (opType == null) {
			// = operator is no problem
			left.accept(this);
			buffer.append("=");
			addExpressionAsTargetType(right, leftTypeBinding, "=", null);
			leftName = null;
		}
		if (leftName == null) {
			// we are done
			if (needNewStaticParenthesis)
				buffer.append(")");
			temp_processingArrayIndex = wasArray;
			return false;
		}

		int ptArray = (temp_processingArrayIndex ? buffer.length() : -1);
		if (toBinding != null)
			addFieldName(left, toBinding);
		else
			left.accept(this);
		int ptArray2 = (temp_processingArrayIndex ? buffer.length() : -1);
		if (!"char".equals(leftName)) {
			if (isIntegerType(leftName) || "boolean".equals(leftName)) {
				// can't just use a |= b because that ends up as 1 or 0, not true or false.
				// byte|short|int|long += ...
				if (!addPrimitiveTypedExpression(left, toBinding, leftName, opType, right, rightName, null, true))
					ptArray = -1;
			} else {
				ptArray = -1;
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
							getConstantValue(right, true);
						} else {
							if (isParenthesized)
								buffer.append("(");
							checkForJ2SDoc(right);
							buffer.append(0 + ((CharacterLiteral) right).charValue());
							if (isParenthesized)
								buffer.append(")");
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
				if (needNewStaticParenthesis) {
					buffer.append(")");
				}
			}
			return fixAssignArray(leftArray, ptArray, ptArray2, wasArray);
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
			if (getConstantValue(right, true)) {
				char c = getLastCharInBuffer();
				needCharCode = (c == '\'' || c == '"');
			} else {
				buffer.append("(");
				appendBoxingNode(right, true);
				buffer.append(")");
			}
		} else if ("char".equals(rightName)) {
			Object constValue = right.resolveConstantExpressionValue();
			if (constValue != null && constValue instanceof Character) {
				buffer.append(((Character) constValue).charValue() + 0);
			} else {
				boolean needParenthesis = !(right instanceof ParenthesizedExpression
						|| right instanceof PrefixExpression || right instanceof PostfixExpression);
				if (needParenthesis) {
					buffer.append("(");
					checkForJ2SDoc(right);
				}
				needCharCode = appendBoxingNode(right, false);
				if (needParenthesis) {
					buffer.append(")");
				}
			}
		} else {
			appendBoxingNode(right, true);
			needCharCode = false;
		}
		if (needCharCode)
			buffer.append(CHARCODEAT0);
		buffer.append(')');
		return fixAssignArray(leftArray, ptArray, ptArray2, wasArray);
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
	 * We must fix:
	 * 
	 * this.ctype[low++] = (this.ctype[low++]|(4)|0);
	 * 
	 * to read:
	 * 
	 * this.ctype[$j$=low++] = (this.ctype[$j$]|(4)|0);
	 * 
	 * so that the index does not get operated upon twice.
	 * 
	 * But what if we had this.ctype[i++][3] += .... ? -- for now, not considering
	 * this! Also resets wasArray.
	 * 
	 * @param ptArray
	 * @param ptArray2
	 * @param wasArray
	 * @return
	 */
	private boolean fixAssignArray(ArrayAccess leftArray, int ptArray, int ptArray2, boolean wasArray) {
		if (ptArray >= 0) {

			// dyn_ltree[(Tree._length_code[lc] + LITERALS + 1) * 2]++;

			String left = buffer.substring(ptArray, ptArray2); // zzz[xxx]
			int ptIndex1 = left.indexOf("[");
			int ptIndex2 = left.lastIndexOf("]");
			if (ptIndex2 - ptIndex1 > 3) {
				// at least as long as zzz[i++]
				String right = buffer.substring(ptArray2);
				buffer.setLength(ptArray);
				String name = left.substring(0, ptIndex1);
				if (name.indexOf("(") >= 0) {
					// test/Test_Static: getByteArray()[p++] += (byte) ++p;
					// ($j$=C$.getByteArray())[$k$=p++]=($j$[$k$]+((++p|0))|0);
					buffer.append("($j$=" + name + ")");
					name = "$j$";
					trailingBuffer.addType("j");
				} else {
					buffer.append(name);
				}
				String newRight = addArrayTemps(leftArray);
				int ptIndex3 = right.indexOf(left);
				buffer.append(right.substring(0, ptIndex3));
				buffer.append(name);
				buffer.append(newRight);
				buffer.append(right.substring(ptIndex3 + left.length()));
			}
		}
		temp_processingArrayIndex = wasArray;
		return false;
	}

	private String addArrayTemps(ArrayAccess leftArray) {
		String right = "";
		char c = 'k';
		String left = "";
		while (leftArray != null) {
			Expression exp = leftArray.getIndex();
			int pt = buffer.length();
			exp.accept(this);
			int len = buffer.length() - pt;
			String index = buffer.substring(pt);
			buffer.setLength(pt);
			if (len < 3) {
				left = "[" + index + "]" + left;
				right = "[" + index + "]" + right;
			} else {
				left = "[$" + c + "$=" + index + "]" + left;
				right = "[$" + c + "$]" + right;
				trailingBuffer.addType("" + c++);
			}
			exp = leftArray.getArray();
			if (!(exp instanceof ArrayAccess))
				break;
			leftArray = (ArrayAccess) exp;
		}
		buffer.append(left);
		return right;
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
		// a ccess expressions: qualified names, this expressions, and super
		// field access expressions. The following guidelines help with correct
		// usage:
		// -An expression like "foo.this" can only be represented as a this
		// expression (ThisExpression) containing a simple name. "this" is a
		// keyword, and therefore invalid as an identifier.
		// -An expression like "this.foo" can only be represented as a field
		// access expression (FieldAccess) containing a this expression and a
		// simple name. Again, this is because "this" is a keyword, and
		// therefore invalid as an identifier.
		// -An expression with "super" can only be represented as a super field
		// access expression (SuperFieldAccess). "super" is a also keyword, and
		// therefore invalid as an identifier.
		// -An expression like "foo.bar" can be represented either as a
		// qualified name (QualifiedName) or as a field access expression
		// (FieldAccess) containing simple names. Either is acceptable, and
		// there is no way to choose between them without information about what
		// the names resolve to (ASTParser may return either).
		// -Other expressions ending in an identifier, such as "foo().bar" can
		// only be represented as field access expressions (FieldAccess).

		IVariableBinding varBinding = node.resolveFieldBinding();
		Expression expression = node.getExpression();
		if (isStaticBinding(varBinding)) {
			// e.g. i += 3 + y + ++(new >>Test_Static<<().y);
			buffer.append('(');
		} else {
			varBinding = null;
		}

		expression.accept(this);

		if (varBinding != null) {
			buffer.append(", ");
			addQualifiedNameForBinding(varBinding, false);
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

		if (getConstantValue(node, true))
			return false;
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
		boolean leftIsInt = leftTypeBinding.isPrimitive() && isIntegerType(leftName);
		boolean rightIsInt = rightTypeBinding.isPrimitive() && isIntegerType(rightName);
		if ("/".equals(operator) && leftIsInt && rightIsInt) {
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

		boolean isDirect = isBitwise && !toBoolean && leftIsInt && rightIsInt;
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
					if (isIntegerType(leftName) && isIntegerType(rightName))
						isDirect = true;
					break;
				}

			if (isDirect) {
				appendBoxingNode(left, false);
				buffer.append(' ');
				buffer.append(operator);
				buffer.append(' ');
				appendBoxingNode(right, false);
				addExtendedOperands(extendedOperands, operator, pre, post, isToString);
				return false;
			}
		}

//		boolean isToStringLeft = isToString && !isBitwise;
//		boolean isToStringRight = isToString && !isBitwise;

		// String s = "e";
		// s += 'c' | 'd';

		// left
		addOperand(left, isToString && !isBitwise);
		buffer.append(' ');
		// op
		buffer.append(operator);
		if (("==".equals(operator) || "!=".equals(operator)) && !leftTypeBinding.isPrimitive()
				&& !(left instanceof NullLiteral) && !(right instanceof NullLiteral)) {
			buffer.append('=');
		}
		buffer.append(' ');
		// right
		addOperand(right, isToString && !isBitwise);

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
			buffer.append(clazzArray(binding, ARRAY_CLASS_LITERAL));
		} else {
			buffer.append("\"" + removeBracketsAndFixNullPackageName(getJavaClassNameQualified(binding)) + "\"");
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
		return true;
	}

	public boolean visit(ParenthesizedExpression node) {
		buffer.append("(");
		checkForJ2SDoc(node);
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
		if (getConstantValue(node, true))
			return false;
		String op = node.getOperator().toString();
		if ("~".equals(op)) {
			buffer.append(op);
			return true;
		}
		return addPrePost(node, node.getOperand(), node.getOperator().toString(), false);
	}

	public boolean visit(QualifiedName node) {
		// page.x =...

		if (getConstantValue(node, true))
			return false;
		IBinding nameBinding = node.resolveBinding();
		IVariableBinding varBinding = (nameBinding instanceof IVariableBinding ? (IVariableBinding) nameBinding : null);
		ASTNode parent = node.getParent();
		Name qualifier = node.getQualifier();
		boolean skipQualifier = false;
		if (isStatic(nameBinding) && varBinding != null) {
			addQualifiedNameForBinding(varBinding, true);
			buffer.append('.');
			skipQualifier = true;
		} else if (!isStaticBinding(varBinding) || qualifier.resolveBinding() instanceof ITypeBinding) {
			varBinding = null;
		}
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
					className = getJavaClassNameQualified(typeBinding);
					if (isStatic(nameBinding)) {
						className = getFinalJ2SClassNameQualifier(null, className, FINAL_ESCAPECACHE);						
					} else {
						dumpStack("in visit(QualifiedName) outputting raw javaClassName " + className);						
					}
				}
			}
		}

		if (!skipQualifier) {
			if (varBinding != null) {
				if (qualifier instanceof SimpleName) {
					addQualifiedNameForBinding(varBinding, false);
				} else {
					buffer.append('(');
					if (className == null)
						qualifier.accept(this);
					else
						buffer.append(className);
					buffer.append(", ");
					addQualifiedNameForBinding(varBinding, false);
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
		if (!getConstantValue(node, true))
			buffer.append(getFinalNameSimpleQualified(node));
		return false;
	}

	/**
	 * Return a qualifier.name or C$.name
	 * 
	 * Only called by
	 * 
	 * @param node
	 * @param mBinding
	 * @param flags    METHOD_ISQUALIFIED | METHOD_NULLEXPRESSION | LAMBDA_METHOD
	 * @return
	 */
	private String getFinalDotQualifiedNameForMethod(SimpleName node, IMethodBinding mBinding, int flags) {
		if (node == null)
			dumpStack("node is null in simpleNameInMethodBinding " + mBinding);
		ITypeBinding declaringClass = mBinding.getMethodDeclaration().getDeclaringClass();
		String name = mBinding.getName();
		if (node == null) {
			// lambda::method needs to be qualified here only if it is a functional
			// interface method
			// otherwise it will be qualified in getQualifiedSimpleNameForinvocation
			name = (mBinding.getDeclaringClass().getFunctionalInterfaceMethod() == null ? name : name + "$");
		} else {
			String classDot = "";
//			boolean checkNameViolation = false;
			ASTNode parent;
			if (isStatic(mBinding)) {
				if ((flags & LAMBDA_METHOD) == 0 && declaringClass != null) {
					if ((flags & METHOD_NULLEXPRESSION) != 0) {
						// could be C$. or P$.
						String cname = removeBracketsAndFixNullPackageName(getJavaClassNameQualified(declaringClass));
						if (cname.length() > 0)
							classDot = cname + ".";
					}
				}
			} else if ((parent = node.getParent()) != null && !(parent instanceof FieldAccess)) {
				if ((flags & METHOD_ISQUALIFIED) == 0 && declaringClass != null && myShortClassName != null) {
//					checkNameViolation = true;
					classDot = getClassNameAndDot(parent, declaringClass, isPrivate(mBinding));
				}
			}
			name = classDot + name;

	        if (classDot.length() > 0)
	        	name = getFinalJ2SClassName(name, FINAL_PC);

//					+ (checkNameViolation ? NameMapper.getJ2S$JavaScriptCollisionIdentifier(name, true, mBinding)
	//						: name);
		}
		
		return name;
	}

	public boolean visit(SimpleType node) {
		ITypeBinding binding = node.resolveBinding();
		buffer.append(binding == null ? node : getFinalJ2SClassName(getJavaClassNameQualified(binding), FINAL_PC));
		return false;
	}

	public boolean visit(StringLiteral node) {
		buffer.append(node.getEscapedValue().replace("\\u000a", "\\n"));
		return false;
	}

	/**
	 * SuperFieldAccess:
	 *
	 * [ ClassName . ] super . Identifier
	 *
	 */
	public boolean visit(SuperFieldAccess node) {
		ITypeBinding classBinding = resolveAbstractOrAnonymousBinding(node);
		String fieldName = node.getName().resolveBinding().getName();

		// all super.xxx references will be this.xxx, with qualifications as necessary.

		buffer.append("this.");
		String newName = (classBinding == null ? null
				: NameMapper.getJ2S$SuperFieldNameOrNull(classBinding, fieldName));
		buffer.append(
				newName == null ? NameMapper.getJ2S$JavaScriptCollisionIdentifier(fieldName, false, null) + fieldName
						: newName);
		return false;
	}

	/**
	 * this or ClassName.this - just getting the qualifier here, not the whole
	 * thing?
	 * 
	 * 
	 */
	public boolean visit(ThisExpression node) {
		buffer.append(node.getQualifier() == null ? "this"
				: getThisRefOrSyntheticReference(node, node.resolveTypeBinding(), "this"));
		return false;
	}

	private String getThisRefOrSyntheticReference(ASTNode node, ITypeBinding binding, String ref) {
		ASTNode classNode = (node == null ? null : getAbstractOrAnonymousParentForNode(node));
		if (class_isAnonymousOrLocal || classNode != null && classNode.getParent() != null // CompilationUnit
				&& classNode.getParent().getParent() != null) {
			// not the top level -- add the synthetic reference.
			// anonymous and local will not have fully qualified names
			return getSyntheticReference(getJavaClassNameQualified(binding));
		}
		return ref;
	}

	public boolean visit(TypeLiteral node) {
		// Class x = Foo.class
		Type type = node.getType();
		ITypeBinding binding = type.resolveBinding();
		if (type.isPrimitiveType()) {
			// adds Integer.TYPE, Float.TYPE, etc.
			buffer.append(NameMapper.getPrimitiveTYPE(binding.getName()) + ".TYPE");
		} else if (type instanceof ArrayType) {
			buffer.append(clazzArray(binding, ARRAY_CLASS_LITERAL));
		} else {
			// BH we are creating a new Class object around this class
			// if it is an interface, then we explicitly add .$methodList$
			buffer.append("Clazz.getClass(");
			buffer.append(getFinalJ2SClassNameQualifier(null,
					// ensureNameIfLocal(
					getJavaClassNameQualified(binding)
					// , binding, node.getParent())
					, FINAL_ESCAPECACHE));
			if (binding.isInterface())
				addInterfaceMethodListForLiteral(binding);
			buffer.append(")");
		}
		return false;
	}

	/**
	 * Add the list of methods in the Clazz.getClass call so that we can use them
	 * for reflection.
	 * 
	 * @param binding
	 */
	private void addInterfaceMethodListForLiteral(ITypeBinding binding) {
		buffer.append(",[");
		IMethodBinding[] methods = binding.getDeclaredMethods();
		for (int i = 0; i < methods.length; i++) {
			if (i > 0)
				buffer.append(",");
			buffer.append("'")
					.append(getFinalMethodNameWith$Params(null, null, methods[i], null, false, METHOD_LITERAL))
					.append("'");
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
		name.accept(this);
		setVariableFinal(name, 0);
		Expression right = node.getInitializer();
		ITypeBinding rightBinding = (right == null ? null : right.resolveTypeBinding());
		if (rightBinding == null)
			return false;
		buffer.append("=");// no space here -- need to check for last char "=" in lambda
		addExpressionAsTargetType(right, name.resolveTypeBinding(), "v", null);
		return false;
	}

	////////// END visit/endVisit ///////////

	/**
	 * pre: ++,--, +, -, ~, !
	 * 
	 * post: ++,--
	 * 
	 * @param node
	 * @param left
	 * @param op
	 * @param isPost
	 * @return
	 */
	@SuppressWarnings({ "null" })
	private boolean addPrePost(Expression node, Expression left, String op, boolean isPost) {

		ASTNode parent = node.getParent();

		ITypeBinding leftTypeBinding = left.resolveTypeBinding();
		IVariableBinding varBinding = getLeftVariableBinding(left, leftTypeBinding);
		String name = null;
		boolean isChar = (leftTypeBinding != null && leftTypeBinding.isPrimitive()
				&& "char".equals(name = leftTypeBinding.getName()));
		boolean isShortOrByte = ("short".equals(name) || "byte".equals(name));
		String term = "";
		if (isStaticBinding(varBinding)) {
			// new Test_Static().y++ where y is static
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
			if (isChar || isShortOrByte) {
				addPrePostFix(left, parent, varBinding, op, false, name.charAt(0));
			} else {
				// TODO: have to consider short and byte
				addFieldName(left, varBinding);
				buffer.append(op);
			}
		} else {
			if (isChar || isShortOrByte) {
				if (varBinding == null)
					buffer.append("(");
				addPrePostFix(left, (varBinding == null ? parent : null), varBinding, op, true, name.charAt(0));
				if (varBinding == null)
					buffer.append(")");
			} else {
				// have to consider short and byte
				buffer.append(op);
				addFieldName(left, varBinding);
			}

		}
		buffer.append(term);
		return false;
	}

	/**
	 * 
	 * @param left
	 * @param parent     null for prefix
	 * @param varBinding
	 * @param op
	 * @param b
	 */
	private void addPrePostFix(Expression left, ASTNode parent, IVariableBinding varBinding, String op,
			boolean isPrefix, char type) {

		boolean isChar = (type == 'c');
		if (isChar)
			type = 'p';
		boolean isStatement = (parent instanceof Statement);
		boolean addAnonymousWrapper = (!isChar || !isPrefix && !isStatement);
		String key = "$" + type + (isChar ? "$" : "$[0]");
		if (addAnonymousWrapper) {
			buffer.append("(" + key + "=");
			trailingBuffer.addType("" + type);
		}
		if (isChar) {
			if (addAnonymousWrapper) {
				addFieldName(left, varBinding);
				buffer.append(",");
			}
			addFieldName(left, varBinding);
			buffer.append(isChar ? "=String.fromCharCode(" : "=");
			addFieldName(left, varBinding);
			buffer.append(CHARCODEAT0).append("++".equals(op) ? "+1" : "-1");
			buffer.append(")");
		} else {
			// byte or short

			// Key in all cases is to return $b$[0], not just $b$[0]++ or ++$b$[0],
			// as that first converts to an integer, and then applies ++ in JavaScript.
			// In Java, ++ first operates on the byte, then that result is converted to
			// an integer.

			boolean wasArray = temp_processingArrayIndex;
			temp_processingArrayIndex = (left instanceof ArrayAccess);
			if (isPrefix)
				buffer.append(op);
			int ptArray = (temp_processingArrayIndex ? buffer.length() : -1);
			addFieldName(left, varBinding);
			int ptArray2 = (temp_processingArrayIndex ? buffer.length() : -1);
			buffer.append(",");
			addFieldName(left, varBinding);
			buffer.append("=");
			if (temp_processingArrayIndex)
				fixAssignArray((ArrayAccess) left, ptArray, ptArray2, wasArray);
			if (isPrefix) {
				// i = ($b$[0]=++b,b=$b$[0]);
				// ($b$[0]=++b,b=$b$[0]);
				buffer.append(key);
			} else {
				// i = ($b$[0]=b,b=(++$b$[0],$b$[0]),--$b$[0],$b$[0]);
				// ($b$[0]=b,b=(++$b$[0],$b$[0]));
				buffer.append("(");
				buffer.append(op);
				buffer.append(key);
				if (isStatement) {
					key += ")";
				} else {
					buffer.append(",");
					buffer.append(key);
					buffer.append("),");
					buffer.append(op.equals("++") ? "--" : "++");
					buffer.append(key);
				}
			}
		}
		if (addAnonymousWrapper) {
			buffer.append("," + key + ")");
		}
	}

	private static boolean isBoxTyped(Expression exp) {
		return exp.resolveBoxing() || exp.resolveUnboxing();
	}

	private static boolean isIntegerType(String type) {
		return (type != null && type.length() > 1 && "int long byte short".indexOf(type) >= 0);
	}

	static boolean isPrivate(IBinding b) {
		return b != null && Modifier.isPrivate(b.getModifiers());
	}

	static boolean isStatic(IBinding b) {
		return b != null && Modifier.isStatic(b.getModifiers());
	}

	/**
	 * @param b
	 * @return
	 */
	static boolean isStatic(IMethodBinding b) {
		return b != null && Modifier.isStatic(b.getModifiers());
	}

	static boolean isStatic(BodyDeclaration b) {
		return Modifier.isStatic(b.getModifiers());
	}

	/**
	 * new int[5] becomes Clazz.array(Integer.TYPE, [5])
	 */
	private final static int ARRAY_DIM_ONLY = 0;
	/**
	 * new byte[] {'a', 2, 3, 4, 5} becomes Clazz.array(Byte.TYPE, -1, ["a", 2, 3,
	 * 4, 5]);
	 */
	private final static int ARRAY_INITIALIZED = -1;

	/**
	 * int[][].class becomes Clazz.array(Integer.TYPE, -2)
	 */
	private final static int ARRAY_CLASS_LITERAL = 1;

	/**
	 *
	 * @param type
	 * @param dimFlag
	 * @return JavaScript for array creation
	 */
	private String clazzArray(ITypeBinding type, int dimFlag) {
		ITypeBinding ebinding = type.getElementType();
		if (ebinding == null)
			ebinding = type; // creating for Enum
		String params = (ebinding.isPrimitive() ? NameMapper.getPrimitiveTYPE(ebinding.getName()) + ".TYPE"
				: getFinalJ2SClassNameQualifier(null, getJavaClassNameQualified(ebinding), FINAL_ESCAPECACHE))
				+ (dimFlag == ARRAY_DIM_ONLY ? "" : ", " + (Math.abs(dimFlag) * type.getDimensions() * -1));
		return "Clazz.array(" + params + (dimFlag > 0 ? ")" : "");
	}

	////////////////////////////////

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
			if (m.resolveMethodBinding().getKey().equals("Ljava/lang/String;.charAt(I)C")) {
				if ((pt = buffer.indexOf(".charAt", pt)) >= 0) {
					charCodeAt0 = "Code" + buffer.substring(pt + 5);
					buffer.setLength(pt + 5);
				}
			}
		}
		buffer.append(charCodeAt0);
	}

	/**
	 * Append an expression, coercing to primitive numeric types of the target
	 * parameter if needed. Used for Method arguments and return values, as well as
	 * variable declaration fragments, where we know the target type and no operator
	 * is involved.
	 * 
	 * 
	 * @param exp
	 * @param targetType ITypeBinding or TYPE or string
	 * @param op         just an identifier of the context: = for assignment, r for
	 *                   return statement, v for variable declaration fragment, p
	 *                   for method parameter, q for first parameter of indexOf or
	 *                   lastIndexOf, which are officially ints
	 */
	private void addExpressionAsTargetType(Expression exp, Object targetType, String op, List<?> extendedOperands) {
		if (targetType == null
				|| exp instanceof CastExpression && ((CastExpression) exp).getExpression() instanceof NullLiteral) {
			checkForJ2SDoc(exp);
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
				appendBoxingNode(exp, false);
				return;
			}
			String paramName = (exp.resolveTypeBinding().isArray() ? ";"
					: targetType instanceof ITypeBinding ? ((ITypeBinding) targetType).getName()
							: targetType.toString());
			boolean isNumeric = isIntegerType(paramName);
			if ((isNumeric || paramName.equals("char")) && !isBoxTyped(exp)) {
				// using operator "m" to limit int application of $i$

				addPrimitiveTypedExpression(null, null, paramName, op, exp, rightName, extendedOperands, false);
			} else {
				// char f() { return Character }
				// Character f() { return char }
				// int f() { return Character }
				appendBoxingNode(exp, isNumeric);
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
			addQualifiedNameForBinding(qualifier, false);
			buffer.append('.');
			left = (left instanceof QualifiedName ? ((QualifiedName) left).getName()
					: left instanceof FieldAccess ? ((FieldAccess) left).getName() : left);
		}
		appendBoxingNode(left, false);
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

	/**
	 * 
	 * @param parameterTypes
	 * @param methodIsVarArgs
	 * @param arguments
	 * @param flags    METHOD_INDEXOF | 0
	 */
	@SuppressWarnings("null")
	private void addMethodArguments(ITypeBinding[] parameterTypes, boolean methodIsVarArgs, List<?> arguments,
			int flags) {
		String post = ", ";
		int nparam = parameterTypes.length;
		int argCount = arguments.size();
		boolean isIndexOf = ((flags & METHOD_INDEXOF) != 0);
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
		case "Byte":
		case "Short":
		case "Integer":
		case "Long":
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
			appendBoxingNode(exp, !isToString);
			return;
		}
		// to numeric only
		// oddly enough, 'c' is considered a simple
		Object constValue = null;
		if (exp instanceof CharacterLiteral) {
			buffer.append(0 + ((CharacterLiteral) exp).charValue());
		} else if ((constValue = exp.resolveConstantExpressionValue()) != null && constValue instanceof Character) {
			buffer.append(0 + ((Character) constValue).charValue());
		} else if (exp instanceof SimpleName || exp instanceof QualifiedName) {
			int pt = buffer.length();
			appendBoxingNode(exp, false);
			if (pt == buffer.length() - 3 && buffer.charAt(pt) == '\'') {
				char c = buffer.charAt(pt + 1);
				buffer.setLength(pt);
				buffer.append((int) c);
			} else {
				buffer.append(CHARCODEAT0);
			}
		} else if (exp instanceof PrefixExpression || exp instanceof PostfixExpression
				|| exp instanceof ParenthesizedExpression) {
			appendBoxingNode(exp, false);
			buffer.append(CHARCODEAT0);
		} else {
			int pt = buffer.length();
			buffer.append("(");
			appendBoxingNode(exp, false);
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
	 * @param extendedOperands
	 * @param isAssignment      (+=, &=, etc)
	 * @param                   return true if is an assignment and a = (a op b) was
	 *                          used
	 */
	private boolean addPrimitiveTypedExpression(Expression left, IVariableBinding assignmentBinding, String leftName,
			String op, Expression right, String rightName, List<?> extendedOperands, boolean isAssignment) {
		// byte|short|int|long /= ...
		// convert to proper number of bits

		// byte a |= right

		// becomes

		// a = ($b$[0] = a | right, $b$[0])

		String classIntArray = null;
		String more = null;
		String prefix = (isAssignment ? "=" : "");
		boolean fromChar = ("char".equals(rightName));
		boolean fromIntType = ("long int short byte".indexOf(rightName) >= 0);
		boolean addParens = (op != "r" || fromChar);
		boolean isDiv = "/".equals(op);
		boolean toChar = false;
		switch (leftName) {
		case "char":
			if (!fromChar) {
				prefix += "String.fromCharCode(";
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
			} else {
				left = null;
			}
			break;
		case "int":
			if (op != null && (!isDiv && fromIntType) || fromChar || rightName.equals("short")
					|| rightName.equals("byte")) {
				left = null;
				break;
			}
			more = "|0)";
			addParens = true;
			break;
		case "short":
			if ((rightName.equals("short") || rightName.equals("byte")) && !isDiv) {
				left = null;
				break;
			}
			//$FALL-THROUGH$
		case "byte":
			if (temp_processingArrayIndex) {
				more = "|0)";
				addParens = true;
			} else {
				classIntArray = "$" + leftName.charAt(0) + "$[0]"; // $i$, etc.
				trailingBuffer.addType(leftName);
			}
			break;
		}
		boolean wasArray = temp_processingArrayIndex;

		if (isAssignment && left == null) {
			buffer.append(op);
		}
//		buffer.append("OP_" + op + " " + isAssignment + " left=" + left + "PREFIX_" + prefix + "_PREFIX");
		buffer.append(prefix);
		if (classIntArray != null) {
			if (addParens)
				buffer.append("(");
			buffer.append(classIntArray).append(" = ");
			temp_processingArrayIndex = true;
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
		if (!appendBoxingNode(right, fromChar) && fromChar && !toChar) {
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
			temp_processingArrayIndex = wasArray;
		} else if (more != null) {
			buffer.append(more);
		}
		return (isAssignment && left != null);
	}

	/**
	 * for example: new Test_Static().y++
	 * 
	 * @param varBinding
	 * @param isStatic
	 */
	private void addQualifiedNameForBinding(IVariableBinding varBinding, boolean isStatic) {
		boolean usePackage = !isStatic;
		String javaVariableName = getJavaClassNameQualified(varBinding.getDeclaringClass());
		isStatic = isStatic(varBinding);
		String finalQualifiedName = getFinalJ2SClassName(javaVariableName, FINAL_PC);
		if (isStatic && (!usePackage || finalQualifiedName.length() < 2 || finalQualifiedName.charAt(1) != '$')) {
			finalQualifiedName = getFinalJ2SClassNameQualifier(null, javaVariableName, FINAL_ESCAPECACHE);
		}
		buffer.append(finalQualifiedName);
	}

	/**
	 * Determine the qualifier for a method or variable.
	 * 
	 * In the case of private nonstatic methods, this is "p$<n>".
	 * 
	 * For general fields, this will be "this.".
	 * 
	 * For fields in outer classes, we need a synthetic references,
	 * this.b$[className] that points to the outer object, which may be one or more
	 * levels higher than this one.
	 * 
	 * Anonymous inner classes may reference either a superclass method/field or one
	 * in its declaring class stack.
	 * 
	 * @param node                  either a method or field or local variable
	 * @param declaringClass        the class that declares this variable
	 * @param isPrivateAndNotStatic
	 * @return qualifier for method or variable
	 */
	private String getClassNameAndDot(ASTNode node, ITypeBinding declaringClass, boolean isPrivateAndNotStatic) {

		String name = getJavaClassNameQualified(declaringClass);
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
				// is anonymous or abstract class declaration
				superLevel++;
				if (isSuperType(declaringClass, typeBinding)) {
					if (isPrivateAndNotStatic) {
						ret = getPrivateVar(declaringClass, false) + ".";
						isThis = true;
					} else if (superLevel == 1) {
						ret = "this.";
						isThis = true;
					}
					name = getJavaClassNameQualified(typeBinding);
					break;
				}
			}
			node = node.getParent();
		}
		return (isThis ? ret : getSyntheticReference(name) + ".");
	}

//	private String ensureNameIfLocal(String name, ITypeBinding typeBinding, ASTNode parent) {
//		if ((name == null || name.length() == 0) && typeBinding.isLocal()) {
//			name = typeBinding.getBinaryName();
//			int idx0 = name.lastIndexOf(".");
//			if (idx0 == -1) {
//				idx0 = 0;
//			}
//			int idx1 = name.indexOf('$', idx0);
//			if (idx1 != -1) {
//				int idx2 = name.indexOf('$', idx1 + 1);
//				String parentAnon = "";
//				if (idx2 == -1) { // maybe the name is already
//									// "$1$2..." for Java5.0+ in
//									// Eclipse 3.2+
//					parent = parent.getParent();
//					while (parent != null) {
//						if (parent instanceof AbstractTypeDeclaration) {
//							break;
//						} else if (parent instanceof AnonymousClassDeclaration) {
//							AnonymousClassDeclaration atype = (AnonymousClassDeclaration) parent;
//							ITypeBinding aTypeBinding = atype.resolveBinding();
//							String aName = aTypeBinding.getBinaryName();
//							parentAnon = aName.substring(aName.indexOf('$')) + parentAnon;
//						}
//						parent = parent.getParent();
//					}
//					name = name.substring(0, idx1) + parentAnon + name.substring(idx1);
//				}
//			}
//		}
//		return name;
//	}

	/**
	 * Get the synthetic reference for inner classes that reference "this" for outer
	 * classes
	 * 
	 * 
	 * @param className
	 * @return "this" + .qualifier
	 */
	private String getSyntheticReference(String className) {
		return "this" + (className.equals("java.lang.Object") || className.equals("Object") ? ""
				: className.equals(this$0Name) ? ".this$0"
						: ".b$['" + getFinalJ2SClassName(className, FINAL_RAW) + "']");
	}

	/**
	 * box or unbox as necessary
	 * 
	 * @param element
	 * @param toCharCode true to append .c$(), not .valueOf();
	 * @return true if boxing or unboxing
	 */
	private boolean appendBoxingNode(ASTNode element, boolean toCharCode) {
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
					String name = getJavaClassNameQualified(typeBinding);
					name = (name.indexOf("Integer") >= 0 ? "int"
							: name.indexOf("Character") >= 0 ? "char" : name.replace("java.lang.", "").toLowerCase());
					buffer.append("(");
					element.accept(this);
					buffer.append(toCharCode && name == "char" ? ")" + CHARCODEAT0 : ")." + name + "Value$()");
					return true;
				}
			}
			if (getConstantValue(exp, true))
				return false;
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
	private boolean isStaticBinding(IVariableBinding varBinding) {
		return (isStatic(varBinding) && varBinding.getDeclaringClass() != null);
	}

	private static String getJavaClassNameQualified(ITypeBinding binding) {
		String binaryName = null, bindingKey;

		// about binding.isLocal()
		//
		// Returns whether this type binding represents a local class.
		// A local class is any nested class or enum type not declared as a member of
		// another class or interface. A local class is a subspecies of nested type, and
		// mutually exclusive with member types. For anonymous classes, which are
		// considered a subspecies of local classes, this method returns true.
		// Note: This deviates from JLS3 14.3, which states that anonymous types are not
		// local types since they do not have a name. Also note that interfaces and
		// annotation types cannot be local.
		//
		// about binding.getBinaryName()
		//
		// Note that in some cases, the binary name may be unavailable. This may happen,
		// for example, for a local type declared in unreachable code.
		//
		// about binding.getKey() (not relevant)
		//
		// Note that the key for member value pair bindings is not yet implemented. This
		// method returns null for that kind of bindings.
		//

		if (binding == null)
			return null;
		if ((binding.isAnonymous() || binding.isLocal()) && (binaryName = binding.getBinaryName()) == null
				&& (bindingKey = binding.getKey()) != null)
			binaryName = bindingKey.substring(1, bindingKey.length() - 1).replace('/', '.');
		if (binaryName == null)	
			return binding.getQualifiedName();
		return binaryName;
	}

	private static String getJavaClassNameSuperNoBrackets(ITypeBinding typeBinding) {
		ITypeBinding superclass = typeBinding.getSuperclass();
		if (superclass == null)
			return null;
		String qualifiedName = removeBracketsAndFixNullPackageName(getJavaClassNameQualified(superclass));
		return ("java.lang.Object".equals(qualifiedName) || "java.lang.Enum".equals(qualifiedName) ? null
				: qualifiedName);
	}

	/**
	 * return the superclass name, provided it is not Object or ""
	 * 
	 * @param typeBinding
	 * @return superclass name or null
	 */
	private String getJavaClassNameSuper(ITypeBinding typeBinding) {
		if (typeBinding != null) {
			ITypeBinding superclass = typeBinding.getSuperclass();
			if (superclass != null) {
				String javaClassName = getJavaClassNameQualified(superclass);
				if (javaClassName != null && javaClassName.length() != 0 && !"java.lang.Object".equals(javaClassName))
					return javaClassName;
			}
		}
		return null;
	}

	private int lambdaCount = 0;

	private String getMyJavaClassNameLambda(boolean andIncrement) {
		return package_name + "." + myShortClassName.replace('.','$') + "$lambda" + (andIncrement ? ++lambdaCount : lambdaCount);
	}

	private static String stripJavaLang(String name) {
		// shorten java.lang.XXX.YYY but not java.lang.xxx.YYY
		return (
				  !name.startsWith("java.lang.") 
				|| name.equals("java.lang.Object")
				|| name.length() > 10 && !Character.isUpperCase(name.charAt(10))
				? name
				: name.substring(10));
	}

	/**
	 * From visit(SimpleName) only.
	 * 
	 * @param node
	 * @return
	 */
	private String getFinalNameSimpleQualified(SimpleName node) {
		// xxx.yyy.zzz...
		IBinding binding = node.resolveBinding();
		// if (allowExtensions && binding instanceof ITypeBinding
		// && ExtendedAdapter.isHTMLClass(((ITypeBinding)
		// binding).getJavaClassNameQualified(), false)) {
		// return node.getIdentifier();
		// }
		ASTNode parent = node.getParent();
		if (parent == null) {
			// this does not appear to be reachable
			dumpStack("parent is null in returnFinalNameSimpleQualified");
			return node.toString();
		}
		char leadingChar = getLastCharInBuffer();
		boolean isQualified = (leadingChar == '.');
		// looking for "." or '"' here.
		if (isQualified && parent instanceof QualifiedName) {
			if (binding instanceof IVariableBinding) {
				IVariableBinding varBinding = (IVariableBinding) binding;
				ITypeBinding declaringClass = varBinding.getVariableDeclaration().getDeclaringClass();
				return NameMapper.getFinalJ2SPrefixedFieldName(declaringClass, binding.getName());
			}
			// TODO could be a problem here is we have a conversion of a class in .j2s.
			// package or class-qualified:
			// java.lang.Math.xxx "lang" or "Math"
			return node.toString();
		}
		if (parent instanceof ClassInstanceCreation && !(binding instanceof IVariableBinding)) {
			if (binding == null)
				dumpStack(" binding null in ClassInstanceCreation");
			return getFinalJ2SClassName(getJavaClassNameQualified(node.resolveTypeBinding()), FINAL_PC);
		}
		if (binding instanceof IVariableBinding)
			return getFinalVarName(node, leadingChar, (IVariableBinding) binding);

		if (binding instanceof IMethodBinding) {
// Arises when a lambda expression is used as a method parameter,
// in the one case we have, as a parameter to a constructor in java.util.stream.Collectors:
// In this case, "add" is the name:
//
//		              return new CollectorImpl<>(collectionFactory, 
//			                       Collection<T>::add,
//		                           (r1, r2) -> { r1.addAll(r2); return r1; },
//                                 CH_ID);
//		    }
// ...			
//	        CollectorImpl(
//  			Supplier<A> supplier,
//              BiConsumer<A, T> accumulator,
//              BinaryOperator<A> combiner,
//              Set<Characteristics> characteristics
//          ) {
//              this(supplier, accumulator, combiner, castingIdentity(), characteristics);
//          }			
			return getFinalDotQualifiedNameForMethod(node, (IMethodBinding) binding,
					(isQualified ? METHOD_ISQUALIFIED : METHOD_NOTSPECIAL));
		}

		// static reference such as java.lang.String
		ITypeBinding typeBinding = node.resolveTypeBinding();
		// dumpStack("simple name type" + (typeBinding == null ? "?" +
		// node.getFullyQualifiedName() : typeBinding.getJavaClassNameQualified()));
		return NameMapper.getJ2S$JavaScriptCollisionIdentifier(typeBinding == null ? node.getFullyQualifiedName()
				: getFinalJ2SClassName(getJavaClassNameQualified(typeBinding), FINAL_PC), true, null);
	}

	/**
	 * Get the final JavaScript name for a variable, possibly prefixed with
	 * "this.$finals$."
	 * 
	 * @param node
	 * @param lastBufferChar
	 * @param varBinding
	 * @return a fully qualified variable name
	 */
	private String getFinalVarName(SimpleName node, char lastBufferChar, IVariableBinding varBinding) {
		String name = null;
		String qualifier = "";
		IVariableBinding variableDeclaration = varBinding.getVariableDeclaration();
		ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
		if (isStatic(varBinding)) {
			if (declaringClass != null && lastBufferChar != '.' && lastBufferChar != '"' && lastBufferChar != '\'') {
				// this is an unescaped name that is also not qualified.
				name = getJavaClassNameQualified(declaringClass);
				qualifier = getFinalJ2SClassNameQualifier(null, name, FINAL_ESCAPECACHE) + ".";
			}
		} else {
			ASTNode parent = node.getParent();
			if (parent != null && !(parent instanceof FieldAccess)) {
				if (declaringClass != null && myShortClassName != null && lastBufferChar != '.') {
					qualifier = getClassNameAndDot(parent, declaringClass, false);
				}
			}
			String fieldVar = null;
			IMethodBinding meth;
			String key;
			if (class_isAnonymousOrLocal && isFinalOrEffectivelyFinal(varBinding)
					&& (meth = varBinding.getDeclaringMethod()) != null
					&& (key = getNormalizedKey(meth)).indexOf(".lambda$") < 0
					&& (package_methodStackForFinals.size() == 0 || !key.equals(package_methodStackForFinals.peek()))) {
				qualifier = "this.$finals$.";
				if (package_currentBlockForVisit >= 0) {
					String vname = varBinding.getName();
					for (int i = 0, size = package_finalVars.size(); i < size; i++) {
						LocalVariable finalVar = package_finalVars.get(i);
						if (finalVar.blockLevel <= package_currentBlockForVisit
								&& finalVar.variableName.equals(vname)) {
							if (!package_visitedVars.contains(finalVar)) {
								package_visitedVars.add(finalVar);
							}
							fieldVar = finalVar.toVariableName;
							break;
						}
					}
				}
			}
			if (declaringClass == null)
				name = (fieldVar == null ? getNormalVariableName(node.getIdentifier()) : fieldVar);
		}
		if (declaringClass != null)
			name = varBinding.getName();
		name = qualifier + NameMapper.getFinalJ2SPrefixedFieldName(declaringClass, name);
		return name;
	}

	private static final int FINAL_RAW = 0;
	private static final int FINAL_P = 1;
	private static final int FINAL_C = 2;
	private static final int FINAL_PC = FINAL_P | FINAL_C;

	private static final int FINAL_ESCAPE = 8;
	private static final int FINAL_CACHE = 16;
	private static final int FINAL_ESCAPECACHE = FINAL_ESCAPE | FINAL_CACHE;

	private static final int FINAL_LAMBDA = 32;

	/**
	 * Proved access to C$.$clinit$ when a static method is called or a static field
	 * is accessed.
	 * 
	 * @param methodQualifier             SimpleName qualifier in
	 *                                    qualifier.methodName() method invocation
	 * @param declaringClassJavaClassName the declaring class of the method or
	 *                                    variable
	 * @param flags                       or of FINAL_ESCAPE except for static
	 *                                    nonprivate field names; FINAL_CACHE
	 *                                    generally true, but not for initial class
	 *                                    definitions or for some nonstatic
	 *                                    references
	 * @return name wrapped if necessary by nested Class.load() calls
	 */
	String getFinalJ2SClassNameQualifier(Name methodQualifier, String declaringClassJavaClassName, int flags) {
		// BH: The idea here is to load these on demand.
		// It will require synchronous loading,
		// but it will ensure that a class is only
		// loaded when it is really needed.

		boolean doEscape = ((flags & FINAL_ESCAPE) == FINAL_ESCAPE);
		boolean doCache = ((flags & FINAL_CACHE) == FINAL_CACHE);

		String name = removeBracketsAndFixNullPackageName(declaringClassJavaClassName);
		doEscape &= !NameMapper.isClassKnown(name);
		if (!doEscape) {
			if (methodQualifier != null) {
				// a method invocation with a Name as qualifier expression
				methodQualifier.accept(this);
				return "";
			}
			return stripJavaLang(name);
		}
		if (doCache && name.equals(myFullClassName)) {
			return "C$"; // anonymous class will be like this
		}
		
		// lambda classes will always be defined at this point. No need to cache them
		if (name.indexOf("$lambda") >= 0)
			return getFinalJ2SClassName(name, FINAL_P);

		return getFinalClazzLoadI$Reference(name, doCache);
	}

	/**
	 * Turns "test.Test0.Exc1.Exc2" into "['test.Test0','.Exc1','.Exc2']"
	 * 
	 * For Clazz.newClass we want an array if the superclass is an inner class so
	 * that the outer class is guaranteed to be loaded first. The same goes for
	 * $I$[] dynamic class loading and interfaces, (but interfaces are handled
	 * differently).
	 * 
	 * This is a temporary will fix and will fail if the program does not adhere to
	 * class/package-capitalization standards.
	 * 
	 * 
	 * @param javaClassName
	 * @return array listing classes that need to be loaded in order
	 */
	private String getFinalInnerClassList(String javaClassName) {
		if (javaClassName.indexOf("$lambda") >= 0)
			return "'" + getFinalJ2SClassName(javaClassName, FINAL_RAW) + "'";
		String[] parts = Java2ScriptVisitor.removeBracketsAndFixNullPackageName(javaClassName).split("\\.");
		String s = parts[0];
		int i = 1;
		int len = parts.length;
		// loop through packages and outer Class
		// TODO this is a hack. There is no rule about case in class names.
		while (i < len && !Character.isUpperCase(parts[i - 1].charAt(0)))
			s += "." + parts[i++];
		String ret = "'" + stripJavaLang(NameMapper.checkClassReplacement(s)) + "'";
		// add inner classes
		while (i < len) {
			ret += ",'." + parts[i++] + "'";
		}
		ret = (ret.indexOf(",") >= 0 ? "[" + ret + "]" : ret);
		return ret;
	}

	/**
	 * Register a qualified static name as an import var I$[n] unless it ends with
	 * "Exception". Create a loading list for inner classes.
	 * 
	 * 'pkg.Foo.Bar', for example, becomes ['pkg.Foo','.Bar'] for Clazz.load().
	 * 
	 * If caching, put into the code $I$(n), where n is the index into the I$[]
	 * array, starting at 1. [0] is reserved for the list of classes we are creating
	 * here.
	 * 
	 * @param javaClassName
	 * @param doCache
	 * @return the string to include in the buffer
	 */
	private String getFinalClazzLoadI$Reference(String javaClassName, boolean doCache) {
		String s = getFinalInnerClassList(javaClassName);
		if (doCache) {
			Integer n = package_htIncludeNames.get(s);
			if (n != null)
				return "$I$(" + n + ")";
			if (!s.endsWith("Exception'")) {
				// count starts at 1, because i$[0] is the list
				package_htIncludeNames.put(s, n = new Integer(++package_includeCount[0]));
				package_includes.append(package_includeCount[0] == 1 ? ",I$=[[0," : ",").append(s);
			}
		}
		return "Clazz.load(" + s + ")";
	}

	/**
	 * Get the final JavaScript class name from a Java class name. Options include
	 * shortening the name with C$. and/or with P$. Brackets are removed. "java.lang."
	 * is removed where appropriate. 
	 * 
	 * @param javaClassName
	 * @param flags         FINAL_C to allow C$, FINAL_P to allow P$, FINAL_PC,
	 *                      FINAL_NOPC
	 * @return the final JavaScript name
	 */
	private String getFinalJ2SClassName(String javaClassName, int flags) {
		if (javaClassName == null)
			return null;
		String name = javaClassName;
		name = removeBracketsAndFixNullPackageName(name);
	
		if (((flags & FINAL_C) != 0)) {
			String myJavaClassName = myFullClassName;
			if (name.equals(myJavaClassName)) {
				return "C$";
			}
			if (name.startsWith(myJavaClassName + ".")) {
				return "C$." + name.substring(myJavaClassName.length() + 1);
			}
		}
		name = stripJavaLang(NameMapper.checkClassReplacement(name));
		return ((flags & FINAL_P) == 0 ? name : checkPackageP$Name(name));
	}

	/**
	 * strips java.lang, removes brackets, may return P$
	 * 
	 * @param thisPackageName null to not allow P$
	 * @param javaName
	 * @return
	 */
	private String checkPackageP$Name(String javaName) {
		return (javaName.startsWith(package_name + ".") ? "P$." + javaName.substring(package_name.length() + 1)
				: javaName.equals(package_name) ? "P$" : javaName);
	}

	/**
	 * exp is xxxx or xxxx.yyyy or className.this
	 * 
	 * @param exp
	 * @return
	 */
	private boolean haveDirectStaticAccess(Expression exp) {
		return exp instanceof SimpleName
				|| (exp instanceof QualifiedName && ((QualifiedName) exp).getQualifier() instanceof SimpleName)
				|| (exp instanceof FieldAccess && ((FieldAccess) exp).getExpression() instanceof ThisExpression);

	}

	/**
	 * The left operand is primitive boolean. Check to see if the operator is ^, |,
	 * or &, or if the left or right operand is such an expression.
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

	private void visitList(List<ASTNode> list, String separator) {
		for (Iterator<ASTNode> iter = list.iterator(); iter.hasNext();) {
			appendBoxingNode(iter.next(), false);
			if (iter.hasNext()) {
				buffer.append(separator);
			}
		}
	}

	private static Map<String, Map<String, List<String[]>>> genericClassMap = new HashMap<String, Map<String, List<String[]>>>();
	private static Map<String, Map<String, String>> genericClassTypes = new HashMap<String, Map<String, String>>();

	/**
	 * Check a class, interface, or Enum binding for generics.
	 * 
	 * This is used in the method declaration to add alias names to methods.
	 * 
	 * @param topBinding -- the class being declared
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
		if (hasSuperClass(binding)) {
			hasGenerics = checkGenericClass(topBinding, binding.getSuperclass()) || hasGenerics;
		}
		// check all interfaces
		ITypeBinding[] interfaces = binding.getInterfaces();
		for (int i = interfaces.length; --i >= 0;) {
			hasGenerics = checkGenericClass(topBinding, interfaces[i]) || hasGenerics;
		}
		if (hasGenerics) {
			checkMethodsWithGenericParams(topBinding.getKey(), binding);
		} else {
			genericClassMap.put(classKey, null);
		}
		return hasGenerics;
	}

	/**
	 * Tie class type parameters (T, V, etc.) to the bound implemented types for all
	 * methods that implement generics
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
		for (int i = tokens.length; --i >= 0;) {
			String key = tokens[i].trim();
			key = key.substring(0, (key + " ").indexOf(" "));
			String value = (i < types.length ? getJavaClassNameQualified(types[i]) : "java.lang.Object");
			classTypes.put(key, value);
		}
		return classTypes;
	}

	/**
	 * Retrieve a list of generic types such as { ["T|java.lang.String",
	 * "V|java.lang.Object"], ["M|java.lang.String", "N|java.lang.Object"] } if it
	 * exists
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
	 * add a generic class method to the genericClassMap under the class and method
	 * 
	 * @param classKey
	 * @param methodName
	 * @param list
	 */
	private static void addGenericClassMethod(String classKey, String methodName, String[] list) {

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
	 * This is the method used to get the name or names to write into the method
	 * declaration Clazz.newMeth(...). Bracketed returns tell Clazz to create
	 * multiple aliases for the same method.
	 * 
	 * @param node
	 * @param mBinding
	 * @param isConstructor
	 * @return j2s-qualified name or an array of j2s-qualified names
	 */
	private String getFinalMethodNameOrArrayForDeclaration(IMethodBinding mBinding, boolean isConstructor,
			boolean addUnqualified) {
		String nodeName = mBinding.getName();
		String methodName = (isConstructor ? "c$" : nodeName);//NameMapper.getJ2S$JavaScriptCollisionMethodIdentifier(mBinding));
		String qname = getFinalMethodNameWith$Params(methodName, null, mBinding, null, false, METHOD_NOTSPECIAL);
		ITypeBinding methodClass = mBinding.getDeclaringClass();
		List<String> names = null;
		List<String[]> methodList = getGenericMethodList(methodClass, nodeName);
		if (methodList != null) {
			names = new ArrayList<String>();
			for (int i = methodList.size(); --i >= 0;) {
				String pname = getFinalMethodNameWith$Params(methodName, null, mBinding, methodList.get(i), false,
						METHOD_NOTSPECIAL);
				if (pname != null)
					names.add(pname);
				if (addUnqualified)
					names.add(ensureMethod$Name(methodName, mBinding, getJavaClassNameQualified(methodClass)));
			}
		} else if (addUnqualified && !methodName.equals(qname) && !classHasMethod(methodClass, methodName)) {
			names = new ArrayList<String>();
			names.add(methodName + (methodName.indexOf("$") >= 0 ? "" : "$"));
		}
		if (names == null || names.size() == 0)
			return "'" + qname + "'";
		qname = ",'" + qname + "'";
		for (int i = names.size(); --i >= 0;) {
			String next = ",'" + names.get(i) + "'";
			if (qname.indexOf(next) < 0)
				qname += next;
		}
		return "[" + qname.substring(1) + "]";
	}

	private static boolean classHasMethod(ITypeBinding methodClass, String methodName) {
		while (methodClass != null) {
			IMethodBinding[] methods = methodClass.getDeclaredMethods();
			for (int i = methods.length; --i >= 0;) {
				IMethodBinding m = methods[i];
				if (m.getName().equals(methodName) && m.getParameterTypes().length == 0 && !isPrivate(m))
					return true;
			}
			methodClass = methodClass.getSuperclass();
		}
		return false;
	}

	/**
	 * This is the principle method for returning a fully qualified method name.
	 * 
	 * Determine the qualified parameter suffix for method names, including
	 * constructors. Now returns name$ for all unparameterized methods not
	 * explicitly excluded.
	 * 
	 * @param javaClassNameForInvocation
	 * @param mBinding
	 * @param genericTypes               only in the case of method declarations,
	 *                                   where we are trying to match generic
	 *                                   methods
	 * @param addCallingOption$O
	 * @param isLiteralOrLambda_C
	 * 
	 * @return a fully j2s-qualified method name
	 */
	private String getFinalMethodNameWith$Params(String j2sName, String javaClassNameForInvocation,
			IMethodBinding mBinding, String[] genericTypes, boolean addCallingOption$O, int specialType) {
		// The problem is that System.out and System.err are PrintStreams, and
		// we
		// do not intend to change those. So in the case that we just wrote
		// "System....", we use that instead and do not qualify the name
		// Note: binding can be null if we have errors in the Java and we are
		// compiling
		//
		// mBinding should never be null, but...
		if (mBinding == null)
			return j2sName;
		if (j2sName == null)
			j2sName = mBinding.getName();//NameMapper.getJ2S$JavaScriptCollisionMethodIdentifier(mBinding);
		String methodName = mBinding.getName();
		ITypeBinding declaringClass = mBinding.getDeclaringClass();
		String javaClassName = getJavaClassNameQualified(declaringClass);
		if (NameMapper.isMethodNonqualified(javaClassName, methodName))
			return j2sName;

		// BH: Note in the next statement, that Map.put$K$V is translated to actual
		// values
		// if .getMethodDeclaration() is not used.
		// Without that, it uses the bound parameters such as
		// String, Object instead of the declared ones, such as $TK$TV

		// !isMethodInvoaction and isLiteralOrLambda_C means LambdaC
		ITypeBinding[] paramTypes = (specialType == METHOD_LAMBDA_C ? mBinding.getParameterTypes()
				: mBinding.getMethodDeclaration().getParameterTypes());

		int nParams = paramTypes.length;
		if (genericTypes != null && genericTypes.length != nParams)
			return null;

		// xxx() adds $ to become xxx$() iff it is NOT
		// - (private and not static)
		// - toString or hashCode
		// - already qualified with $
		// skipping C$.
		if (nParams == 0)
			return ensureMethod$Name(j2sName, mBinding, null);

		// functional interface methods are qualified only by "$", not their parameters.
		// This is not ideal.

		IMethodBinding fm = (specialType != METHOD_NOTSPECIAL || javaClassName.equals("java.lang.reflect.Proxy") ? null
				: declaringClass.getFunctionalInterfaceMethod());
		if (fm != null && methodName.equals(fm.getName()))
			return ensureMethod$Name(j2sName, mBinding, null);

		String s = getParamsAsString(nParams, genericTypes, paramTypes, false);

		if (addCallingOption$O && s.indexOf("$T") >= 0 && isJava(javaClassName) && !isJava(myFullClassName)) {
			// If the method being called is a Java class and the calling class is NOT a
			// Java class,
			// then also add the $O version.
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
	 * Add postfix "$" is the method is:
	 * 
	 * (a) static or not private, and
	 * 
	 * (b) there is no field name that covers it, and
	 * 
	 * (c) it doesn't already have a $ in it after the 3rd character (P$..., C$...
	 * excepted), and
	 * 
	 * (d) the name is not "c$", which is reserved for function(s) { s.charCodeAt(0)
	 * }, and
	 * 
	 * (e) the method is not an explicitly nonqualified method (namely, toString())
	 * or in an explicitly nonqualified class
	 * 
	 * @param j2sName
	 * @param mBinding
	 * @param className
	 * @return
	 */
	private static String ensureMethod$Name(String j2sName, IMethodBinding mBinding, String className) {
		if (isPrivate(mBinding) && !isStatic(mBinding) || NameMapper.fieldNameCoversMethod(j2sName)
				|| j2sName.indexOf("$", 2) >= 0 || j2sName.equals("c$")
				|| className != null && NameMapper.isMethodNonqualified(className, mBinding.getName()))
			return j2sName;		
		return j2sName + "$";
	}

	/**
	 * finish the generic foo || bar fix
	 * 
	 * @param pt                    start of this method invocation in buffer
	 * @param qname                 qualified name, containing " || "
	 * @param isPrivateAndNotStatic switch $O$ to p$; already using .apply(this)
	 */
	private void postFixGeneric$OMethodName(int pt, String qname, boolean isPrivateAndNotStatic, String privateVar) {
		// this is a Java8-compatibility hack. The class is accessing a
		// type-parameterized method which it might not be overriding
		// and might be nongeneric in Java 6.
		// this.adItem$TE(o) becomes (($o$=this).addItem$TE ||
		// $o$.addItem$O).apply($o$,[o]);
		if (isPrivateAndNotStatic) {
			buffer.insert(pt, "(");
			buffer.append(qname.replace("$o$", privateVar)).append(")");
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
						if (genericType.indexOf("|" + getJavaClassNameQualified(paramTypes[i]) + ";") < 0)
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
		String prefix = (removeBracketsAndFixNullPackageName(binding.getKey()).indexOf(":T") >= 0 ? "T" : null);
		String name = removeBrackets(getJavaClassNameQualified(binding));
		if (!asGenericObject && prefix == null && !binding.isPrimitive())
			name = NameMapper.fixPackageName(name);
		String arrays = null;
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
			if (prefix == null)
				name = NameMapper.checkClassReplacement(name);
			else
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

	/**
	 * Remove <...> in class and method names
	 * 
	 * @param qName
	 * @return
	 */
	public static String removeBracketsAndFixNullPackageName(String qName) {
		if (qName == null)
			return null;
		qName = NameMapper.fixPackageName(qName);
		return removeBrackets(qName);
	}

	private static String removeBrackets(String qName) {
		if (qName.indexOf('<') < 0)
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
			log(binding.getKey() + "typeP " + i + lst[i].getName());

		// check for <String,Object> for the implemented classes
		lst = binding.getTypeArguments();
		for (int i = 0; i < lst.length; i++)
			log(binding.getKey() + "typeA " + i + lst[i].getName());

		IMethodBinding[] methods = binding.getDeclaredMethods();
		for (int i = methods.length; --i >= 0;) {
			IMethodBinding m = methods[i];
			log(getFinalMethodNameWith$Params(m.getName(), null, m, null, false, METHOD_NOTSPECIAL));
			ITypeBinding[] params = m.getParameterTypes();
			for (int j = 0; j < params.length; j++)
				log("\t" + params[j].getName());

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
						log("!! " + m.getKey() + " overrides " + methods[i].getKey());
			}
		}
	}

	/**
	 * Returns <code>true</code> if the given type is a super type of a candidate.
	 * <code>true</code> is returned if the two type bindings are identical
	 * 
	 * @param possibleSuperType the type to inspect
	 * @param type              the type whose super types are looked at
	 * @return <code>true</code> iff <code>possibleSuperType</code> is a super type
	 *         of <code>type</code> or is equal to it
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
	 * If given expression is constant value expression, return its value string; or
	 * character or return null.
	 * 
	 * @param node
	 * @return
	 */
	private boolean getConstantValue(Expression node, boolean andWrite) {
		if (node == null)
			return false;
		Object constValue = node.resolveConstantExpressionValue();
		StringBuffer sb = null;
		if (constValue != null
				&& (constValue instanceof Number || constValue instanceof Character || constValue instanceof Boolean)) {
			sb = new StringBuffer();
			if (constValue instanceof Character) {
				sb.append('"');
				addChar(((Character) constValue).charValue(), sb);
				sb.append('"');
			} else {
				// Number or Boolean
				sb.append(constValue);
			}
		} else if (constValue instanceof String) {
			sb = new StringBuffer();
			String str = (String) constValue;
			int length = str.length();
			sb.append('"');
			for (int i = 0; i < length; i++)
				addChar(str.charAt(i), sb);
			sb.append('"');
		}
		if (sb == null)
			return false;
		if (andWrite) {
			// this is just in case we have (/** @j2sNative 1?x:*/y);
			boolean needParen = (node instanceof ParenthesizedExpression);
			if (needParen)
				buffer.append("(");
			checkForJ2SDoc(node);
			buffer.append(sb);
			if (needParen)
				buffer.append(")");
		}
		return true;
	}

	private static void addChar(char c, StringBuffer buffer) {
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
			if (c < 32 || c > 127) {
				String hexStr = "0000" + Integer.toHexString(c);
				buffer.append("\\u").append(hexStr.substring(hexStr.length() - 4));
			} else {
				buffer.append(c);
			}
			break;
		}
	}

////////////////////////

	private void setMapJavaDoc(PackageDeclaration node) {
		ASTNode root = node.getRoot();
		package_mapBlockJavadoc = new HashMap<Integer, List<Javadoc>>();

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
						if (tagName == null || !tagName.startsWith("@j2sNative") && !tagName.startsWith("@j2sIgnore")
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

//		for (int i = 0, n = list.size(); i < n; i++) {
//			System. out.println(i + "  " + (list.get(i) == null ? null : list.get(i).getClass().getName() + " " + list.get(i).getStartPosition() + "..." + (list.get(i).getStartPosition() + list.get(i).getLength())));
//		}

		// and link javadoc to its closest block

		for (int i = 0, n = list.size() - 1; i < n;) {
			Javadoc doc = (Javadoc) list.get(i++);
			ASTNode item = list.get(i);
			int factor = 1;
			if (item instanceof Javadoc) {
				logErr("!!Note: @j2s doc ignored because nothing follows it: " + doc.getStartPosition() + "\r\n" + doc);
			} else {
				if (item == null) {
					factor = -1;
					item = list.get(++i);
				}
				i++;
				Integer pt = Integer.valueOf(item.getStartPosition() * factor);
				List<Javadoc> docs = package_mapBlockJavadoc.get(pt);
				if (docs == null)
					package_mapBlockJavadoc.put(pt, docs = new ArrayList<Javadoc>());
				docs.add(doc);
			}
		}
	}

	/**
	 * check any node other than the package node for @j2sNative or @j2sDebug
	 * or @j2sIgnore
	 */
	public boolean preVisit2(ASTNode node) {
		// will do this for ParenthesizedExpression after the "("
		return (node instanceof ParenthesizedExpression || checkForJ2SDoc(node));
	}

	private boolean checkForJ2SDoc(ASTNode node) {
		List<Javadoc> j2sJavadoc;
		if (package_mapBlockJavadoc == null || node instanceof MethodDeclaration || node instanceof Initializer
				|| (j2sJavadoc = getJ2sJavadoc(node, true)) == null)
			return true;
		boolean isBlock = (node instanceof Block);
		return !NativeDoc.checkJ2sJavadocs(buffer, j2sJavadoc, isBlock) || !isBlock;
	}

	private List<Javadoc> getJ2sJavadoc(ASTNode node, boolean isPre) {
		if (package_mapBlockJavadoc == null)
			return null;
		// package_mapBlockJavadoc will be null for a no-package class like VARNA.java
		List<Javadoc> docs = package_mapBlockJavadoc
				.remove(Integer.valueOf((isPre ? 1 : -1) * node.getStartPosition()));
		if (!isPre && docs != null)
			NativeDoc.checkJ2sJavadocs(buffer, docs, false);
		return docs;
	}

	/////////////////////////////

	/**
	 * includes @j2sDebug blocks; from j2s.compiler.mode=debug in .j2s
	 * 
	 */
	static boolean global_j2sFlag_isDebugging = false;

	public static void setDebugging(boolean isDebugging) {
		global_j2sFlag_isDebugging = isDebugging;
	}

	private static List<String> global_lstMethodsDeclared;

	private static Map<String, String> global_htMethodsCalled;

	private static boolean global_logAllCalls;

	public static void setLogging(List<String> lstMethodsDeclared, Map<String, String> htMethodsCalled,
			boolean logAllCalls) {
		global_lstMethodsDeclared = lstMethodsDeclared;
		global_htMethodsCalled = htMethodsCalled;
		global_logAllCalls = logAllCalls;
		if (lstMethodsDeclared != null)
			lstMethodsDeclared.clear();
		if (logAllCalls)
			htMethodsCalled.clear();
	}

	private void logMethodDeclared(String name) {
		if (name.startsWith("[")) {
			String[] names = name.substring(0, name.length() - 1).split(",");
			for (int i = 0; i < names.length; i++)
				logMethodDeclared(names[i]);
			return;
		}
		String myName = fixLogName(myFullClassName);
		if (name.startsWith("'"))
			name = name.substring(1, name.length() - 1);
		global_lstMethodsDeclared.add(myName + "." + name);
	}

	private void logMethodCalled(String name) {
		name = fixLogName(name);
		String myName = fixLogName(myFullClassName);
		if (global_logAllCalls)
			global_htMethodsCalled.put(name + "," + myName, "-");
		else
			global_htMethodsCalled.put(name, myName);
	}

	private String fixLogName(String name) {
		name = NameMapper.checkClassReplacement(name);
		int pt = name.indexOf("<");
		return (pt > 0 ? name.substring(0, pt) : name);
	}

	/**
	 * tracks file byte pointers for @j2sNative, @j2sIgnore
	 */
	private Map<Integer, List<Javadoc>> package_mapBlockJavadoc;

	private boolean allowClazzNewLambda;

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
		buffer.append(ELEMENT_KEY + ("=" + className) + "\r\n");
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
		String trailer = ";Clazz.setTVer('" + VERSION + "');//Created "
				+ new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()) + " Java2ScriptVisitor version "
				+ VERSION + " net.sf.j2s.core.jar version " + CorePlugin.VERSION + "\n";
		List<String> elements = new ArrayList<String>();
		String js = buffer.toString();
		String eq = "="; // because we might be operating on this file
		String[] parts = js.split(ELEMENT_KEY + eq);
		String header = parts[0];
		String header_noIncludes = header.replace(",I$=[[]]", "");
		header = header.replace(",I$=[]", privateVarString + (package_includes.length() == 0 ? ""
				: package_includes.append("]],$I$=function(i){return I$[i]||(I$[i]=Clazz.load(I$[0][i]))}")));
		for (int i = 1; i < parts.length; i++) {
			js = parts[i];
			int pt = js.indexOf("\r\n");
			String name = js.substring(0, pt);
			elements.add(name);
			js = js.substring(pt + 2);
			String head = "(function(){"
					+ (js.indexOf("$I$(") < 0 && js.indexOf("p$") < 0 ? header_noIncludes : header);
			elements.add(head + js + "})();\r\n" + trailer);
		}
		resetPrivateVars();
		return elements;
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

	public boolean visit(ImportDeclaration node) {
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
	 * FinalVariable that is used to record variable state, which will provide
	 * information for compiler to decide the generated name in *.js.
	 * 
	 * @author zhou renjian
	 *
	 *         2006-12-6
	 */
	private static class LocalVariable {

		/**
		 * Level of the block
		 */
		int blockLevel;

		/**
		 * Final variable may be in a very deep anonymous class
		 */
		String methodScope;

		/**
		 * Variable name that is defined in Java sources
		 */
		String variableName;

		/**
		 * Variable name that is to be generated in the compiled *.js
		 */
		String toVariableName;

		/**
		 * $name, if required
		 * 
		 */
		String prefixedName;

		LocalVariable(int blockLevel, String variableName, String methodScope) {
			super();
			this.blockLevel = blockLevel;
			this.variableName = variableName;
			this.methodScope = methodScope;
		}

		public String toString() {
			return variableName + ":" + variableName + "[" + blockLevel + "," + methodScope + "]";
		}

		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + blockLevel;
			result = prime * result + ((methodScope == null) ? 0 : methodScope.hashCode());
			result = prime * result + ((toVariableName == null) ? 0 : toVariableName.hashCode());
			result = prime * result + ((variableName == null) ? 0 : variableName.hashCode());
			return result;
		}

		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null || getClass() != obj.getClass())
				return false;
			final LocalVariable other = (LocalVariable) obj;
			if (blockLevel != other.blockLevel)
				return false;
			if (methodScope == null) {
				if (other.methodScope != null)
					return false;
			} else if (!methodScope.equals(other.methodScope))
				return false;
			if (toVariableName == null) {
				if (other.toVariableName != null)
					return false;
			} else if (!toVariableName.equals(other.toVariableName))
				return false;
			if (variableName == null) {
				if (other.variableName != null)
					return false;
			} else if (!variableName.equals(other.variableName))
				return false;
			return true;
		}

	}

	public static class NameMapper {

		/**
		 * defined already in j2sClazz.js
		 */
		static String[] j2sClazzPackages = { "java.lang", "java.lang.reflect", "java.io", "java.util" };

		static boolean isJ2sClazzPackage(String packageName) {
			for (int i = 0; i < j2sClazzPackages.length; i++)
				if (j2sClazzPackages[i].equals(packageName))
					return true;
			return false;
		}

		static final String primitiveTypeEquivalents = "Boolean,Byte,Character,Short,Integer,Long,Float,Double,Void,";
		static final String noConstructorNames = ",Boolean,Byte,Short,Integer,Long,Float,Double,";

		static String fixPackageName(String name) {
			// trying to avoid "double" or "doubleA" here. Not perfect, but who would
			// ever name a top-level class with a lower-case starting letter?
			// a name can be "" here as for LambdaExpressions
			return (name.length() > 0 && name.indexOf(".") < 0 && !Character.isLowerCase(name.charAt(0))
					? NULL_PACKAGE + "." + name
					: name);
		}

		static boolean isOneOf(String key, String values) {
			return (values.indexOf("," + key + ",") >= 0);
		}

		static String getPrimitiveTYPE(String name) {
			int pt = primitiveTypeEquivalents.indexOf(name.substring(1)) - 1;
			String type = primitiveTypeEquivalents.substring(pt);
			return type.substring(0, type.indexOf(","));
		}

		private final static String[] knownClasses = new String[] { 
				"java.lang.Object", "java.lang.Class",
				"java.lang.String", "java.lang.Byte", "java.lang.Character", 
				"java.lang.Short", "java.lang.Long",
				"java.lang.Integer", "java.lang.Float", "java.lang.Double", 
				"java.io.Serializable",
				"java.lang.Iterable", "java.lang.CharSequence", "java.lang.Cloneable", 
				"java.lang.Comparable",
				"java.lang.Runnable", "java.lang.System", "java.lang.ClassLoader", 
				"java.lang.Math",
				"java.lang.Number" };
		private final static Set<String> knownClassHash = new HashSet<String>();
		static {
			for (int i = knownClasses.length; --i >= 0;)
				knownClassHash.add(knownClasses[i]);
		}

		static boolean isClassKnown(String qualifiedName) {
			return knownClassHash.contains(qualifiedName);
		}

		private static Map<String, String> htClassReplacements;
		private static List<String> lstPackageReplacements;

		public static void setClassReplacements(String keyValues) {
			// j2s.class.replacements=org.apache.log4j.*:jalview.jslogger.;
			htClassReplacements = null;
			if (keyValues == null)
				return;
			htClassReplacements = new Hashtable<String, String>();
			lstPackageReplacements = new ArrayList<String>();
			String[] pairs = keyValues.split(";");
			for (int i = pairs.length; --i >= 0;) {
				pairs[i] = pairs[i].trim();
				if (pairs[i].length() == 0)
					continue;
				String[] kv = pairs[i].split("->");
				htClassReplacements.put(kv[0], kv[1]);
				if (kv[0].endsWith("."))
					lstPackageReplacements.add(kv[0]);
				log("class replacement " + kv[0] + " --> " + kv[1]);
			}
		}

		static String checkClassReplacement(String className) {
			if (htClassReplacements != null) {
				String rep = htClassReplacements.get(className);
				if (rep == null && lstPackageReplacements != null) {
					for (int i = lstPackageReplacements.size(); --i >= 0;) {
						rep = lstPackageReplacements.get(i);
						if (className.startsWith(rep)) {
							rep = htClassReplacements.get(rep) + className.substring(rep.length());
							break;
						}
						if (i == 0)
							rep = null;
					}

				}
				if (rep != null) {
					log(className + " -> " + rep);
					return rep;
				}
			}
			return className;
		}

		/**
		 * classes and packages that do not accept $ in their method names
		 * 
		 */
		private final static String defaultNonQualified
		// Math and Date both are minor extensions
		// of JavaScript, so they are not qualified
				= "java.lang.Math;" + "java.util.Date;"
				// swingjs.api.js and javajs.api.js contain
				// interfaces to JavaScript methods and so
				// are not parameterized.
						+ "*.api.js;"
		// netscape.JSObject interface includes 8 methods
		// that do not need to be parameterized.
		// + "netscape.*;"
		;

		private static String[] nonQualifiedPackages;

		/**
		 * .j2s option j2s.compiler.nonqualified.packages/classes
		 * 
		 * @param names semicolon-separated list. For example,
		 *              org.jmol.api.js;jspecview.api.js
		 */
		public static void setNonQualifiedNamePackages(String names) {
			names = defaultNonQualified + (names == null ? "" : names);
			nonQualifiedPackages = names.replace(";;", ";").trim().split(";");
			for (int i = nonQualifiedPackages.length; --i >= 0;) {
				String s = nonQualifiedPackages[i];
				if (s.length() == 0)
					continue;
				if (s.startsWith("*."))
					s = s.substring(1);
				if (s.endsWith("."))
					s = s.substring(0, s.length() - 1);
				nonQualifiedPackages[i] = (s.endsWith("*") ? s.substring(0, s.length() - 1) : s + ".").trim();
			}
		}

		/**
		 * Check to see if this class is in a package for which we exclude parameter
		 * qualification
		 * 
		 * @param className
		 * @return
		 */
		private static boolean isPackageOrClassNonqualified(String className) {
			className += ".";
			for (int i = nonQualifiedPackages.length; --i >= 0;) {
				String s = nonQualifiedPackages[i];
				if (s.length() > 0 && s.startsWith(".") ? className.contains(s) : className.startsWith(s)) {
					return true;
				}
			}
			return false;
		}

		/**
		 * @param methodName not used but could be
		 */
		static boolean isMethodNonqualified(String className, String methodName) {
			return (NameMapper.isPackageOrClassNonqualified(className));
		}

		private final static String[] mapToClazz = { "java.lang.Class.forName", "Clazz.forName",
				"java.lang.reflect.Array.newInstance", "Clazz.array" };

		/**
		 * Check for special direct Clazz method calls, avoiding loading the entire
		 * class.
		 * 
		 * @param fullName
		 * @return
		 */
		static String getJ2SFinalMapClazzMethod(String fullName) {
			fullName = fullName.intern();
			for (int i = 0; i < mapToClazz.length; i += 2) {
				if (mapToClazz[i] == fullName)
					return mapToClazz[i + 1];
			}
			return null;
		}

//		/**
//		 * Convenience method for general use with Java methods only.
//		 * 
//		 * @param binding
//		 * @return
//		 */
//		static String getJ2S$JavaScriptCollisionMethodIdentifier(IMethodBinding binding) {
//			return getJ2S$JavaScriptCollisionIdentifier(binding.getName(), true, binding);
//		}

		/**
		 * Append a $ if the name is a JavaScript keyword such as "var" or "for".
		 * 
		 * For example,
		 * 
		 * var test = 3
		 * 
		 * x = test.Test_1.getX();
		 * 
		 * 
		 * Check for generic method name conflict with JavaScript methods such as
		 * .bind(), .call(), etc. but exclude methods in swingjs.api.js, because those
		 * are meant to be that way.
		 * 
		 * @param identifier
		 * @param addName
		 * @param binding    when null, this is for a field; when not null, this is for
		 *                   a method
		 * @return
		 */
		static String getJ2S$JavaScriptCollisionIdentifier(String identifier, boolean addName, IMethodBinding binding) {
			boolean isViolation = (identifier.indexOf("$") < 0 && checkJ2SKeywordViolation(identifier));
			return (addName ? identifier : "") + (isViolation ? "$" : "");
		}

		/*
		 * IE passes the following: public,private,private,static,package,
		 * implements,prototype,false,throws,label
		 * 
		 * Firefox passes the following: public,prototype,false,label
		 * 
		 * The following does not contains all the reserved keywords:
		 * http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:
		 * Reserved_Words
		 * 
		 * abstract, boolean, break, byte, case, catch, char, class, const, continue,
		 * debugger, default, delete, do, double, else, enum, export, extends, false,
		 * final, finally, float, for, function, goto, if, implements, import, in,
		 * instanceof, int, interface, long, native, new, null, package, private,
		 * private, public, return, short, static, super, switch, synchronized, this,
		 * throw, throws, transient, true, try, typeof, var, void, volatile, while,
		 * with,
		 * 
		 * 
		 * 
		 */
		private static String[] keywords = new String[] { "class", /* "java", "javax", "sun", */"for", "while", "do",
				"in", "return", "function", "var", "class", "pubic", "private", "private", "new", "delete", "static",
				"package", "import", "extends", "implements", "instanceof", "typeof", "void", "if", "this", "super",
				"prototype", "else", "break", "true", "false", "try", "catch", "throw", "throws", "continue", "switch",
				"default", "case", "export", "import", "const", /* "label", */"with",
				// BH and a few of our own, based on checking developer console:
				"c$", "apply", "arguments", "bind", "call", "caller", "watch", "unwatch", "valueOf", "isPrototypeOf",
				"isGenerator", "prototype" };

		private static boolean checkJ2SKeywordViolation(String identifier) {
			for (int i = 0; i < keywords.length; i++) {
				if (keywords[i].equals(identifier)) {
					return true;
				}
			}
			return false;
		}

		/**
		 * Prepend a $ to a field name if there is a JavaScript keyword collision, and n
		 * more if there are collisions with higher-level field names.
		 * 
		 * This method no longer checks for field-method collisions.
		 * 
		 * @param classBinding
		 * @param fieldName
		 * @param isPrivate
		 * @return
		 */
		static String getFinalJ2SPrefixedFieldName(ITypeBinding classBinding, String fieldName) {
			StringBuffer ret = new StringBuffer(getJ2S$JavaScriptCollisionIdentifier(fieldName, false, null));
			if (classBinding != null && isJ2SInheritedFieldName(classBinding, fieldName))
				return getJ2S$$InheritedFieldName(classBinding, fieldName, newFieldNameBuf(fieldName, ret)).toString();
			return ret.append(fieldName).toString();
		}

		/**
		 * Get the qualified name for a super.xxxx reference. Here we need only go one
		 * level deep
		 * 
		 * @param classBinding
		 * @param fieldName
		 * @return
		 */
		static String getJ2S$SuperFieldNameOrNull(ITypeBinding classBinding, String fieldName) {
			String ret = null;
			if (classBinding != null && NameMapper.isJ2SInheritedFieldName(classBinding, fieldName)) {
				IVariableBinding[] declaredFields = classBinding.getDeclaredFields();
				for (int i = 0; i < declaredFields.length; i++) {
					if (fieldName.equals(declaredFields[i].getName())) {
						ret = getJ2S$JavaScriptCollisionIdentifier(fieldName, false, null) + getJ2S$$InheritedFieldName(
								classBinding.getSuperclass(), fieldName, newFieldNameBuf(fieldName, null));
						break;
					}
				}
			}
			return ret;
		}

		/**
		 * Initializer for the $$$... buffer that is prepended to all field names
		 * 
		 * @param fieldName
		 * @param buf
		 * @return
		 */
		private static StringBuffer newFieldNameBuf(String fieldName, StringBuffer buf) {
			if (buf == null)
				buf = new StringBuffer();
			if (fieldNameCoversMethod(fieldName))
				buf.append("$");
			return buf;
		}

		/**
		 * toString is the only method not qualified. It will be used directly by
		 * JavaScript in s1 + s2. So in this case, we need a field by that name to be
		 * prepended with "$".
		 * 
		 * @param fieldName
		 * @return
		 */
		static boolean fieldNameCoversMethod(String fieldName) {
			return fieldName.equals("toString");
		}

		/**
		 * Prefix field name with as many $ as necessary to make it inheritance-unique
		 * 
		 * @param binding
		 * @param name
		 * @return
		 */
		static StringBuffer getJ2S$$InheritedFieldName(ITypeBinding binding, String name, StringBuffer buf) {
			if (binding != null) {
				ITypeBinding superclass = binding.getSuperclass();
				if (superclass != null) {
					IVariableBinding[] declaredFields = superclass.getDeclaredFields();
					for (int i = 0; i < declaredFields.length; i++) {
						if (name.equals(declaredFields[i].getName())) {
							buf.append("$");
							break;
						}
					}
					return getJ2S$$InheritedFieldName(superclass, name, buf);
				}
			}
			return buf.append(name);
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
		private static boolean isJ2SInheritedFieldName(ITypeBinding binding, String name) {
			if ("serialVersionUID".equals(name)) {
				/*
				 * Just ignore this field: serialVersionUID. Currently Java2Script does not
				 * support Java serialization but support Java2Script's own Simple RPC
				 * serialization, which does not care about serialVersionID.
				 */
				return false;
			}
			ITypeBinding superclass = binding.getSuperclass();
			IVariableBinding[] declaredFields = null;
			if (superclass == null) {
				// interface
				declaredFields = binding.getDeclaredFields();
			} else {
				declaredFields = superclass.getDeclaredFields();
			}
			for (int i = 0; i < declaredFields.length; i++) {
				if (name.equals(declaredFields[i].getName())) {
					return true;
				}
			}
			if (superclass != null && isJ2SInheritedFieldName(superclass, name)) {
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

//		private static void registerMap(String[] map) {
//			for (int i = 1; i < map.length; i++) {
//				register(PACKAGE_PREFIX + map[0], "get" + map[i].substring(0, 1).toUpperCase() + map[i].substring(1),
//						map[i]);
//			}
//		}

		// Note: This was for the experimental HTML version of Java2Script
		//
//					PACKAGE_PREFIX = "org.w3c.dom.";
//					mapDocument = new String[] { "Document", "doctype", "implementation", "documentElement" };
//					mapNode = new String[] { "Node", "nodeName", "nodeValue", "nodeType", "parentNode", "childNodes",
//							"firstChild", "lastChild", "previousSibling", "nextSibling", "attributes", "ownerDocument",
//							"namespaceURI", "prefix", "localName" };
//					mapNodeList = new String[] { "NodeList", "length" };
//					mapNamedNodeMap = new String[] { "NamedNodeMap", "length" };
//					mapCharacterData = new String[] { "CharacterData", "data", "length" };
//					mapAttr = new String[] { "Attr", "name", "specified", "value", "ownerElement", };
//					mapElement = new String[] { "Element", "tagName" };
//					mapDocumentType = new String[] { "DocumentType", "name", "entities", "notations", "publicId", "systemId",
//							"internalSubset" };
//					mapNotation = new String[] { "Notation", "publicId", "systemId" };
//					mapEntity = new String[] { "Entity", "publicId", "systemId", "notationName" };
//					mapProcessingInstruction = new String[] { "ProcessingInstruction", "target", "data" };

//		private static void registerAllMaps() {
//			registerMap(mapDocument);
//			registerMap(mapNode);
//			registerMap(mapNodeList);
//			registerMap(mapNamedNodeMap);
//			registerMap(mapCharacterData);
//			registerMap(mapAttr);
//			registerMap(mapElement);
//			registerMap(mapDocumentType);
//			registerMap(mapNotation);
//			registerMap(mapEntity);
//			registerMap(mapProcessingInstruction);
//		}

//		/**
//		 * Look for field name also a non-private method name somewhere in the stacks.
//		 * Method name is first adjusted by "$..." if it is a JavaScript name collision.
//		 * 
//		 * @param binding
//		 * @param name
//		 * @param isPrivate
//		 * @return
//		 */
//		private static boolean checkJ2SInheritedMethodNameCollision(ITypeBinding binding, String name) {
//			if (binding != null) {
//				IMethodBinding[] methods = binding.getDeclaredMethods();
//				for (int i = 0; i < methods.length; i++) {
//					if (methods[i].getParameterTypes().length > 0 || isPrivate(methods[i]))
//						continue;
//					String name1 = getJ2S$CollisionMethodName(methods[i]);
//					if (name.equals(name1))
//						return true;
//					
//				}
//				ITypeBinding superclass = binding.getSuperclass();
//				if (checkJ2SInheritedMethodNameCollision(superclass, name))
//					return true;
//				ITypeBinding[] interfaces = binding.getInterfaces();
//				if (interfaces != null)
//					for (int i = 0; i < interfaces.length; i++) {
//						if (checkJ2SInheritedMethodNameCollision(interfaces[i], name)) {
//							return true;
//						}
//					}
//			}
//			return false;
//		}

	}

	public static class NativeDoc {

		/**
		 * prepare a list that alternates [javadoc element javadoc element ... ]
		 * associating an element with its javadoc.
		 * 
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
			 * Just collect blocks after j2s Javadocs. Throws an IndexOfBoundsException when
			 * done with scanning.
			 * 
			 * Note that this no longer requires that the node be a block, because we are
			 * processing these BEFORE the node is visited.
			 * 
			 */

			public void preVisit(ASTNode node) throws IndexOutOfBoundsException {
				checkNode(node, false);
			}

			public void postVisit(ASTNode node) {
				checkNode(node, true);
			}

			private void checkNode(ASTNode node, boolean isPost) {
				int nodept = node.getStartPosition() + (isPost ? node.getLength() : 0);
				boolean checkParens = (!isPost && node instanceof ParenthesizedExpression);
				while (nodept >= ptrDoc0 || checkParens && nodept == ptrDoc0 - 1)
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
		 * 
		 * @param javadoc
		 * @param isBlock
		 * @return true if code was added
		 */
		static boolean checkJ2sJavadocs(StringBuffer buffer, List<Javadoc> list, boolean isBlock) {
			boolean didAdd = false;
			for (int i = 0, n = list.size(); i < n; i++) {
				Javadoc javadoc = list.get(i);
				List<?> tags = javadoc.tags();
				if (tags != null && tags.size() > 0
						&& (isBlock && getTag(tags, "@j2sIgnore") != null
								|| global_j2sFlag_isDebugging && addJ2SSourceForTag(buffer, getTag(tags, "@j2sDebug"),
										isBlock && i == 0, isBlock && i == n - 1)
								|| addJ2SSourceForTag(buffer, getTag(tags, "@j2sNative"), isBlock && i == 0,
										isBlock && i == n - 1))) {
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

		private static boolean addJ2SSourceForTag(StringBuffer buffer, TagElement tag, boolean addPrefix,
				boolean addPostfix) {
			if (tag == null)
				return false;
			StringBuffer buf = new StringBuffer();
			List<?> fragments = tag.fragments();
			for (Iterator<?> iterator = fragments.iterator(); iterator.hasNext();) {
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
					// "
					// after source cleaning
				}
			}
			String code = buf.toString();
			// /-* comment *-/ becomes /* comment */ and <@> becomes @
			if (code.length() > 0)
				code = Pattern.compile("\\/-\\*(.*)\\*-\\/", Pattern.MULTILINE | Pattern.DOTALL).matcher(code)
						.replaceAll("/*$1*/").replaceAll("<@>", "@").trim();
			// use of inline comment
			// that is, no {...} after it, in the middle of an expression
			// for example: int x = /**@j2sNative 32||*/15;
			// has limitations in that you cannot replace a string by "" or an object by
			// null.
			// end with || to replace Java value; must not be 0, "", or null
			// end with 0 && to replace a number with 0.
			// end with null && to replace anything with null
			// end with 1?xxx: to replace anything with xxx
			// /** @j2sNatve ! */true
			// (/** @j2sNative 1?x: */y)
			// /** @j2sNative true || */()

			boolean isInline = code.endsWith("|") || code.endsWith("&") || code.endsWith(":") || code.endsWith("!");
			buffer.append(isInline ? "" : addPrefix ? "{\r\n" : "\r\n");
			buffer.append(code);
			buffer.append(isInline ? "" : addPostfix ? "\r\n}\r\n" : "\r\n");
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

	/**
	 * for debugging -- to System.err.println
	 * 
	 * @param msg
	 */
	public static void dumpStack(String msg) {
		try {
			throw new NullPointerException("Why am I here? " + msg);
		} catch (Exception e) {
			e.printStackTrace(System.out);
		}
	}

////////////////// JAVA 8 LAMBDA ADDITIONS /////////////////	

	/**
	 * 
	 * Function<Integer, int[]> iaCreator = int[]::new;
	 * 
	 */
	public boolean visit(CreationReference node) {
//		// lambda_C
//		buffer.append("Clazz.newLambda(function(t){return ");
//		Type classType = node.getType();
//		ITypeBinding tbinding = classType.resolveBinding();
//		if (classType instanceof ArrayType) {
//			addArrayConstructor(tbinding, null);
//		} else {
//			IMethodBinding mBinding = node.resolveMethodBinding();
//			addConstructor(classType, mBinding, null);
//		}
//		buffer.append("},0,'S')");
// was:
		ITypeBinding binding = node.resolveTypeBinding();
		processLocalInstance(node, null, binding, null, LAMBDA_CREATION, false);
		return false;
	}

	/**
	 * System.out::println;
	 * 
	 * new Test()::test2;
	 * 
	 */
	public boolean visit(ExpressionMethodReference node) {
		// lambda_M
		// oddly enough, if we just use visit(MethodReference) it goes
		// somewhere else.
		return addLambdaMethodReference(node, node.getExpression());
	}

	/**
	 * 
	 * super::test2;
	 * 
	 */
	public boolean visit(SuperMethodReference node) {
		return addLambdaMethodReference(node, null);
	}

	public boolean visit(TypeMethodReference node) {
		return addLambdaMethodReference(node, null);
	}

	private boolean addLambdaMethodReference(MethodReference node, Expression exp) {
		ITypeBinding binding = node.resolveTypeBinding();
		IMethodBinding mBinding = node.resolveMethodBinding();
		String declaringlassJavaName = getJavaClassNameQualified(mBinding.getDeclaringClass());
		char lambdaType = getLambdaType(binding);
		switch (lambdaType) {
		case 'F':
		case 'C':
		case 'P':
		case 'S':
			if (!addLambda$class$Method(node, binding, exp, declaringlassJavaName, true)) {
				buffer.append("Clazz.newLambda(");
				appendFinalMethodQualifier(exp, declaringlassJavaName, null, FINAL_ESCAPECACHE | FINAL_LAMBDA);
				buffer.append(",");
				buffer.append(getFinalMethodNameOrArrayForDeclaration(mBinding, false, false));
				buffer.append(",'" + lambdaType + "')");
			}
			break;
		default:
			addLambda$class$Method(node, binding, exp, declaringlassJavaName, false);
			break;
		}
		return false;
	}

	/**
	 * Generate code not using Clazz.newLambda. If there are no finals and no
	 * external method calls, then delete this and rewrite it using Clazz.newLambda.
	 * 
	 * We do not allow Clazz.newLambda for assignments such as
	 * 
	 * 
	 * 
	 * @param node
	 * @param binding
	 * @param exp
	 * @param declaringClassJavaName
	 * @param checkFinals
	 * @return true if we are done and cannot use Clazz.newLamba for this call
	 */
	private boolean addLambda$class$Method(MethodReference node, ITypeBinding binding, Expression exp,
			String declaringClassJavaName, boolean checkFinals) {
		allowClazzNewLambda = (ALLOW_NEW_LAMBDA && getLastCharInBuffer() != '=');
		int pt = buffer.length();
		buffer.append("(function($class$){");
		processLocalInstance(node, null, binding, null, LAMBDA_METHOD, false);
		buffer.append("})(");
		appendFinalMethodQualifier(exp, declaringClassJavaName, null, FINAL_ESCAPECACHE | FINAL_LAMBDA);
		buffer.append(")");
		if (checkFinals && allowClazzNewLambda)
			buffer.setLength(pt);
		return !allowClazzNewLambda;

	}

	/**
	 * s -> b(s)
	 * 
	 * Only Function, Consumer, Predicate, and Supplier are covered by
	 * Clazz.newLambda.
	 * 
	 */
	@SuppressWarnings("unchecked")
	public boolean visit(LambdaExpression node) {
		// LambdaExpression:
		// Identifier -> Body
		// ( [ Identifier { , Identifier } ] ) -> Body
		// ( [ FormalParameter { , FormalParameter } ] ) -> Body
		// ==>
		// new runnable() { public xxx singleMethod() { Body })

		// lambda_E
		ITypeBinding binding = node.resolveTypeBinding();
		char lambdaType = getLambdaType(binding);
		switch (lambdaType) {
		case 'F':
		case 'C':
		case 'P':
		case 'S':
			// lambda parameters are NOT final and do not cover
			// variables in the method. Lambda functions are at the same
			// block level as their caller with all their same final calls

			if (!addLambda$class$Expr(node, binding, true)) {
				List<ASTNode> params = node.parameters();
				buffer.append("Clazz.newLambda(function(");
				visitList(params, ",");
				buffer.append("){");
				inNewLambdaExpression = true;
				addLambdaBody(node.getBody());
				inNewLambdaExpression = false;
				buffer.append("},0,'" + lambdaType + "'");
				buffer.append(")");
			}
			break;
		default:
			addLambda$class$Expr(node, binding, false);
			break;
		}
		return false;
	}

	private boolean addLambda$class$Expr(LambdaExpression node, ITypeBinding binding, boolean checkFinals) {
		allowClazzNewLambda = (ALLOW_NEW_LAMBDA && getLastCharInBuffer() != '=');
		int pt = buffer.length();
		processLocalInstance(node, null, binding, null, LAMBDA_EXPRESSION, false);
		if (checkFinals && allowClazzNewLambda)
			buffer.setLength(pt);
		return !allowClazzNewLambda;
	}

	private char getLambdaType(ITypeBinding binding) {
		String name = removeBracketsAndFixNullPackageName(getJavaClassNameQualified(binding));
		if (!name.startsWith("java.util.function.") || name.indexOf("To") >= 0)
			return '?';
		// TODO: covers Boolean...Int..., Long..., Double... but only roughly
		char c = (name.endsWith("Function") ? 'F'
				: name.endsWith("Consumer") ? 'C'
						: name.endsWith("Predicate") ? 'P' : name.endsWith("Supplier") ? 'S' : '-');
		return c;
	}

	private void addLambdaBody(ASTNode body) {
		if (body instanceof Block) {
			body.accept(this);
		} else {
			// there may be no return, but we still want to do this
			buffer.append("{ return ");
			if (body == null)
				return; // handled elsewhere
			buffer.append("(");
			body.accept(this);
			buffer.append(");}");
		}
	}

	private String getLambdaParamList(IMethodBinding mBinding, int arity0) {
		int n = mBinding.getParameterTypes().length;
		if (arity0 < 0)
			arity0 = n;
		// accept(t,u)......add(u)
		// buffer.append("/*"+arity0 + "," + n + "*/");
		return (n == 0 ? "" : " t,u,v,w,x,y,z".substring(Math.max(0, (arity0 - n) * 2) + 1, arity0 * 2));
	}

	/**
	 * This method is a fallback for the full-class implementation that does not use
	 * Clazz.newLambda. It is called by addClassOrInterface only.
	 * 
	 * @param lnode
	 * @param mBinding
	 */
	private void addLambdaMethod(ASTNode lnode, IMethodBinding mBinding) {
		if (lnode instanceof LambdaExpression) {
			buffer.append("/*lambda_E*/");
			LambdaExpression node = (LambdaExpression) lnode;
			mBinding = node.resolveMethodBinding();
			@SuppressWarnings("unchecked")
			List<ASTNode> params = node.parameters();
			processMethodDeclaration(mBinding, params, node.getBody(), false, LAMBDA_EXPRESSION);
			return;
		}
		if (lnode instanceof CreationReference) {
			// int[]::new;
			buffer.append("/*lambda_C*/");
			processMethodDeclaration(mBinding, null, null, false, LAMBDA_CREATION);
			CreationReference node = (CreationReference) lnode;
			Type ctype = node.getType();
			if (ctype instanceof ArrayType) {
				addArrayConstructor(ctype.resolveBinding(), null);
			} else {
				addConstructor(ctype, mBinding, null, mBinding.getParameterTypes().length);
			}
			buffer.append("});\r\n");
			return;
		}
		SimpleName identifier;
		Expression exp = null;
		IMethodBinding mBinding1;
		if (lnode instanceof TypeMethodReference) {
			// Collection<T>::add (see java.stream.Collectors)
			buffer.append("/*lambda_T*/");
			TypeMethodReference node = (TypeMethodReference) lnode;
			identifier = node.getName();
			mBinding1 = node.resolveMethodBinding();
		} else if (lnode instanceof SuperMethodReference) {
			// super::test3
			buffer.append("/*lambda_S*/");
			SuperMethodReference node = (SuperMethodReference) lnode;
			identifier = node.getName();
			mBinding1 = node.resolveMethodBinding();
		} else if (lnode instanceof ExpressionMethodReference) {
			// String.out::println
			buffer.append("/*lambda_M*/");
			ExpressionMethodReference node = (ExpressionMethodReference) lnode;
			identifier = node.getName();
			mBinding1 = node.resolveMethodBinding();
			exp = node.getExpression();
		} else {
			buffer.append("/*lambda_?*/");
			log("??? addLambdaMethod " + lnode.getClass().getName());
			return;
		}
		processMethodDeclaration(mBinding, null, null, false, LAMBDA_METHOD);
		addMethodInvocation(identifier, null, mBinding1, exp, mBinding.getParameterTypes().length);
		buffer.append("});\r\n");
	}

	/**
	 * SwingJS uses var p$<n> within an anonymous function wrapper ;(function()
	 * {.....})(); to isolate local variables within all classes of all types.
	 * Within this framework, C$ is the raw JavaScript object for the class, p$<n>
	 * is is an associative array containing private methods.
	 * 
	 * This hashtable is reset for each top-level class, indicating which private
	 * var to use for a private method -- p$1, p$2, p$3 etc. -- depending upon the
	 * class being referred to.
	 * 
	 */
	private static Map<String, String> classToPrivateVar = new Hashtable<String, String>();
	private static String privateVarString = "";
	private static int privateClassCount = 0;
	private static int privateVarCount = 0;

	/**
	 * p$1, p$2, etc.
	 * 
	 * Also used to compare two classes for equivalence, because I cannot figure out
	 * how to equate a class being invoked and a class being declared
	 * 
	 * @param binding
	 * @return
	 */
	private String getPrivateVar(IBinding binding, boolean isClassCompare) {
		String key = binding.getKey(), key0 = null, key1 = null;
		if (isClassCompare)
			key = "_" + key;
		String p$ = classToPrivateVar.get(key);
		if (p$ == null) {
			key0 = key;
			p$ = classToPrivateVar.get(key = (isClassCompare ? "_" : "") + getNormalizedKey(binding));
		}
		if (p$ == null && !isClassCompare && key.indexOf("[") >= 0) {
			key1 = key;
			p$ = classToPrivateVar.get(key = key.substring(0, key.indexOf("[") + 1) + "]");
		}
		if (p$ == null) {
			classToPrivateVar.put(key, p$ = "p$" + (isClassCompare ? ++privateClassCount : ++privateVarCount));
			classToPrivateVar.put(key0, p$);
			if (!isClassCompare) {
				if (key1 != null)
					classToPrivateVar.put(key1, p$);
				privateVarString += "," + p$ + "={}";
			}
		}
		return p$;
	}

	/**
	 * Test to see if an invocation is the same as a declaration using cached
	 * normalized keys
	 * 
	 * @param a
	 * @param b
	 * @return
	 */
	private boolean areEqual(IBinding a, IBinding b) {
		return getPrivateVar(a, true).equals(getPrivateVar(b, true));
	}

	private static String getNormalizedKey(IBinding b) {
		return getNormalizedSubKey(b.getKey());
		// e.g.: invocation vs. declaration
		// Ltest/Test_GenericIMV_AB<Ltest/Test_GenericIMV_AB;:TA;Ltest/Test_GenericIMV_AB;:TB;>;
		// becomes test/Test_GenericIMV_AB[TA;TB;];
		// Ljava/util/Hashtable<Ljava/util/Hashtable;:TK;Ljava/util/Hashtable;:TV;>.Enumerator<Ljava/util/Hashtable$Enumerator;:TT;>;
		// becomes java/util/Hashtable[TK;TV;].Enumerator[TT;];
	}

	private static String getNormalizedSubKey(String key) {
		int pt0 = key.lastIndexOf("<"), pt1;
		if (pt0 >= 0)
			return getNormalizedSubKey(key.substring(0, pt0) + "[" + getNormalizedSubKey(
					key.substring(pt0 + 1, (pt1 = key.indexOf(">", pt0))) + "]" + key.substring(pt1 + 1)));
		if (key.indexOf(":") < 0)
			return key;
		int left = -1;
		int pt;
		while ((pt = key.indexOf(":", ++left)) >= 0) {
			// Ltest/Test_GenericIMV_AB;:TA;Ltest/Test_GenericIMV_AB;:TB;
			// ^ ^
			// include ; but not :
			key = key.substring(0, left) + key.substring(pt + 1);
			// TA;Ltest/Test_GenericIMV_AB;:TB;
			// ^
			left = key.indexOf(";", left);
			if (left < 0)
				break;

			// Ljava/util/Hashtable<Ljava/util/Hashtable;:TK;Ljava/util/Hashtable;:TV;>.Enumerator<Ljava/util/Hashtable$Enumerator;:TT;>;
			// Ljava/util/Hashtable<Ljava/util/Hashtable;:TK;Ljava/util/Hashtable;:TV;>.Enumerator[TT;];
			// Ljava/util/Hashtable[TK;TV;].Enumerator[TT;];

		}
		return key;
	}

	private void resetPrivateVars() {
		privateVarCount = privateClassCount = 0;
		privateVarString = "";
		classToPrivateVar.clear();
	}

}
