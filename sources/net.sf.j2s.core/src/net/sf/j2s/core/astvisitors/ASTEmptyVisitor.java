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
package net.sf.j2s.core.astvisitors;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.ASTVisitor;
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
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.ConditionalExpression;
import org.eclipse.jdt.core.dom.ConstructorInvocation;
import org.eclipse.jdt.core.dom.ContinueStatement;
import org.eclipse.jdt.core.dom.DoStatement;
import org.eclipse.jdt.core.dom.EmptyStatement;
import org.eclipse.jdt.core.dom.EnhancedForStatement;
import org.eclipse.jdt.core.dom.EnumConstantDeclaration;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.ExpressionStatement;
import org.eclipse.jdt.core.dom.FieldAccess;
import org.eclipse.jdt.core.dom.FieldDeclaration;
import org.eclipse.jdt.core.dom.ForStatement;
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
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.MethodRef;
import org.eclipse.jdt.core.dom.MethodRefParameter;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.NormalAnnotation;
import org.eclipse.jdt.core.dom.NullLiteral;
import org.eclipse.jdt.core.dom.NumberLiteral;
import org.eclipse.jdt.core.dom.PackageDeclaration;
import org.eclipse.jdt.core.dom.ParameterizedType;
import org.eclipse.jdt.core.dom.ParenthesizedExpression;
import org.eclipse.jdt.core.dom.PrefixExpression;
import org.eclipse.jdt.core.dom.PrimitiveType;
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.ReturnStatement;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.SimpleType;
import org.eclipse.jdt.core.dom.SingleMemberAnnotation;
import org.eclipse.jdt.core.dom.SingleVariableDeclaration;
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
import org.eclipse.jdt.core.dom.TypeLiteral;
import org.eclipse.jdt.core.dom.TypeParameter;
import org.eclipse.jdt.core.dom.VariableDeclarationExpression;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;
import org.eclipse.jdt.core.dom.VariableDeclarationStatement;
import org.eclipse.jdt.core.dom.WhileStatement;
import org.eclipse.jdt.core.dom.WildcardType;

import net.sf.j2s.core.adapters.AbstractPluginAdapter;
import net.sf.j2s.core.adapters.FieldAdapter;
import net.sf.j2s.core.adapters.FinalVariable;
import net.sf.j2s.core.adapters.J2SMapAdapter;
import net.sf.j2s.core.adapters.TypeAdapter;
import net.sf.j2s.core.adapters.VariableAdapter;

/**
 * This empty visitor just gives a way for debugging. That is to say, in 
 * Eclipse debugging mode, if there are needs to compile these following
 * nodes, you can always modify these methods without restarting Eclipse.
 * 
 * @author zhou renjian
 * @author Bob Hanson
 */
public class ASTEmptyVisitor extends ASTVisitor {

	ASTEmptyVisitor() {
		super();
	}
	
	protected String thisPackageName;
	
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
			if (basePackages[i].equals(thisPackageName))
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

	protected static boolean isClassKnown(String qualifiedName) {
		for (int i = 0; i < knownClasses.length; i++)
			if (knownClasses[i].equals(qualifiedName))
				return true;
		return false;
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

	/**
	 * allow @j2sXHTML and @j2sXCSS extensions for Javadoc
	 * 
	 * experimental; not implemented; uses adapters.ExtendedAdapter
	 * 
	 */
	protected boolean allowExtensions = false;

	/**
	 * not implemented 
	 * 
	 * @param tf
	 */
	public void setAllowExtensions(boolean tf) {
		allowExtensions = tf;
	}


	
	protected Map<String, Integer>htStaticNames = new Hashtable<>();
	protected int[] staticCount = new int[1];
	
	/**
	 * Register a qualified static name as an import var I$[n]
	 * unless it ends with "Exception". 
	 * @param name
	 * @return the next available index for this compilation unit
	 */
	protected Integer getStaticNameIndex(String name) {
		Integer n = htStaticNames.get(name);
		if (n == null && !name.endsWith("Exception"))
			htStaticNames.put(name,  n = new Integer(staticCount[0]++));
		return n;
	}

	protected HashSet<String> definedPackageNames;

	public void setPackageNames(HashSet<String> definedPackageNames) {
		this.definedPackageNames = definedPackageNames;
	}

	protected static boolean isFinal(BodyDeclaration b) {
		return Modifier.isFinal(b.getModifiers());
	}

	protected static boolean isStatic(BodyDeclaration b) {
		return Modifier.isStatic(b.getModifiers());
	}


	/**
	 * We need to check packages only for local "var" variables, as only those will be 
	 * references as unqualified names. And the problem is only the same method. 
	 * 
	 * For example, 
	 * 
	 *  var test = 3
	 *  
	 *  x = test.Test_1.getX();
	 *  
	 * 
	 *  
	 * @param name
	 * @param checkPackages
	 * @return
	 */
	protected boolean checkKeywordViolation(String name, boolean checkPackages) {
		return FieldAdapter.checkKeywordViolation(name, checkPackages ? definedPackageNames : null);
	}

	protected String getClassName() {
		return ((TypeAdapter) getAdaptable(TypeAdapter.class)).getClassName();
	}
	protected String getConstantValue(Expression exp) {
		return ((VariableAdapter) getAdaptable(VariableAdapter.class)).getConstantValue(exp);
	}

	protected String getFieldName(ITypeBinding binding, String name) {
		return J2SMapAdapter.getFieldName(binding, name);
	}

	protected List<FinalVariable> getVariableList(char fvn) { 
		return ((VariableAdapter) getAdaptable(VariableAdapter.class)).getVariableList(fvn); 
	}

	protected String getFullClassName() {
		return ((TypeAdapter) getAdaptable(TypeAdapter.class)).getFullClassName();
	}

	protected String getIndexedVarName(String name, int i) {
		return ((VariableAdapter) getAdaptable(VariableAdapter.class)).getIndexedVarName(name, i);
	}

	protected String getJ2SName(SimpleName node) {
		return J2SMapAdapter.getJ2SName(node);
	}

	protected String getJ2SName(IVariableBinding binding) {
		return J2SMapAdapter.getJ2SName(binding);
	}

	protected String getNormalVariableName(String name) {
		return ((VariableAdapter) getAdaptable(VariableAdapter.class)).getNormalVariableName(name);
	}

	public String getPackageName() {
		return thisPackageName;
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
	protected String getShortenedQualifiedName(String name) {
		return ((TypeAdapter) getAdaptable(TypeAdapter.class)).getShortenedQualifiedName(name);
	}

	protected boolean isAnonymousClass() {
		return ((VariableAdapter) getAdaptable(VariableAdapter.class)).isAnonymousClass;
	}

	protected boolean isInheritedFieldName(ITypeBinding binding, String name) {
		return J2SMapAdapter.isInheritedFieldName(binding, name);
	}

	/**
	 * compiling of variable names is no longer supported -- use Google Closure Compiler
	 * @return
	 */
	@Deprecated
	protected boolean isToCompileVariableName() {
		return ((VariableAdapter) getAdaptable(VariableAdapter.class)).isToCompileVariableName();
	}

	protected String listFinalVariables(List<FinalVariable> list, String seperator, String scope) {
		return ((VariableAdapter) getAdaptable(VariableAdapter.class)).listFinalVariables(list, seperator, scope);
	}
	
	protected void setClassName(String className) {
		((TypeAdapter) getAdaptable(TypeAdapter.class)).setClassName(className);
	}

	protected void setPackageName(String packageName) {
		thisPackageName = packageName;
	}
	
//	public void setToCompileVariableName(boolean toCompress) {
//		((ASTVariableAdapter) getAdaptable(ASTVariableAdapter.class)).setToCompileVariableName(toCompress);	
//	}

	/**
	 * Buffer that keeps all compiled *.js.
	 */
	public StringBuffer buffer = new StringBuffer();

	/**
	 * Return the buffer. Actually it is returning compiled *.js String
	 * @return
	 */
	public StringBuffer getBuffer() {
		return buffer;
	}

	/**
	 * Buffer may be set to other buffer.
	 * @param buffer
	 */
	public void setBuffer(StringBuffer buffer) {
		this.buffer = buffer;
	}

	protected Map<Class<?>, AbstractPluginAdapter> adapterMap = new HashMap<Class<?>, AbstractPluginAdapter>();
	
	public AbstractPluginAdapter getAdaptable(Class<?> clazz) {
		try {
			AbstractPluginAdapter adapter = adapterMap.get(clazz);
			return (adapter == null ? (adapter = registerPluginVisitor((AbstractPluginAdapter) clazz.newInstance()))
					: adapter);
		} catch (@SuppressWarnings("unused") InstantiationException | IllegalAccessException e) {
			return null;
		}
	}

	public AbstractPluginAdapter registerPluginVisitor(AbstractPluginAdapter adapter) {
		adapter.setVisitor(this);
		adapterMap.put(adapter.getClass(), adapter);
		return adapter;
	}
	
	protected int lastPos = Integer.MAX_VALUE;

	/*
	 * The following are empty super.* methods which will be use to help
	 * developing Java2Script compiler.
	 * 
	 * In the final release of Java2Script, it may be commented out.
	 */

	public void endVisit(AnnotationTypeDeclaration node) {
		super.endVisit(node);
	}

	public boolean visit(AnnotationTypeDeclaration node) {
		return false;
	}

	public void endVisit(AnnotationTypeMemberDeclaration node) {
		super.endVisit(node);
	}

	public boolean visit(AnnotationTypeMemberDeclaration node) {
		return false;
	}

	public void endVisit(BlockComment node) {
		super.endVisit(node);
	}

	public boolean visit(BlockComment node) {
		return false;
	}

	public void endVisit(CompilationUnit node) {
		super.endVisit(node);
	}

	public boolean visit(CompilationUnit node) {
		return super.visit(node);
	}

	public void endVisit(Javadoc node) {
		super.endVisit(node);
	}

	public boolean visit(Javadoc node) {
		return false;
	}

	public void endVisit(LineComment node) {
		super.endVisit(node);
	}

	public boolean visit(LineComment node) {
		return false;
	}

	public void endVisit(MarkerAnnotation node) {
		super.endVisit(node);
	}

	public boolean visit(MarkerAnnotation node) {
		return false;
	}

	public void endVisit(MemberRef node) {
		super.endVisit(node);
	}

	public boolean visit(MemberRef node) {
		return false;
	}

	public void endVisit(MemberValuePair node) {
		super.endVisit(node);
	}

	public boolean visit(MemberValuePair node) {
		return false;
	}

	public void endVisit(MethodRef node) {
		super.endVisit(node);
	}

	public boolean visit(MethodRef node) {
		return false;
	}

	public void endVisit(MethodRefParameter node) {
		super.endVisit(node);
	}

	public boolean visit(MethodRefParameter node) {
		return false;
	}

	public void endVisit(NormalAnnotation node) {
		super.endVisit(node);
	}

	public boolean visit(NormalAnnotation node) {
		return false;
	}

	public void endVisit(ParameterizedType node) {
		super.endVisit(node);
	}

	public boolean visit(ParameterizedType node) {
		node.getType().accept(this);
		return false;
	}

	public void endVisit(PrimitiveType node) {
		super.endVisit(node);
	}

	public boolean visit(PrimitiveType node) {
		return super.visit(node);
	}

	public void endVisit(SingleMemberAnnotation node) {
		super.endVisit(node);
	}

	public boolean visit(SingleMemberAnnotation node) {
		return false;
	}

	public void endVisit(TagElement node) {
		super.endVisit(node);
	}

	public boolean visit(TagElement node) {
		return false;
	}

	public void endVisit(TextElement node) {
		super.endVisit(node);
	}

	public boolean visit(TextElement node) {
		return false;
	}

	public void endVisit(TypeParameter node) {
		super.endVisit(node);
	}

	public boolean visit(TypeParameter node) {
		return false;
	}

	public void endVisit(WildcardType node) {
		super.endVisit(node);
	}

	public boolean visit(WildcardType node) {
		return false;
	}

	public void endVisit(ArrayAccess node) {
		super.endVisit(node);
	}

	public void endVisit(ArrayCreation node) {
		super.endVisit(node);
	}

	public void endVisit(ArrayInitializer node) {
		super.endVisit(node);
	}

	public void endVisit(ArrayType node) {
		super.endVisit(node);
	}

	public void endVisit(AssertStatement node) {
		super.endVisit(node);
	}

	public void endVisit(Assignment node) {
		super.endVisit(node);
	}

	public void endVisit(BooleanLiteral node) {
		super.endVisit(node);
	}

	public void endVisit(BreakStatement node) {
		super.endVisit(node);
	}

	public void endVisit(CatchClause node) {
		super.endVisit(node);
	}

	public void endVisit(CharacterLiteral node) {
		super.endVisit(node);
	}

	public void endVisit(ConditionalExpression node) {
		super.endVisit(node);
	}

	public void endVisit(ContinueStatement node) {
		super.endVisit(node);
	}

	public void endVisit(DoStatement node) {
		super.endVisit(node);
	}

	public void endVisit(EmptyStatement node) {
		super.endVisit(node);
	}

	public void endVisit(EnhancedForStatement node) {
		super.endVisit(node);
	}

	public void endVisit(ForStatement node) {
		super.endVisit(node);
	}

	public void endVisit(IfStatement node) {
		super.endVisit(node);
	}

	public void endVisit(ImportDeclaration node) {
		super.endVisit(node);
	}

	public void endVisit(InfixExpression node) {
		super.endVisit(node);
	}

	public void endVisit(Initializer node) {
		super.endVisit(node);
	}

	public void endVisit(InstanceofExpression node) {
		super.endVisit(node);
	}

	public void endVisit(LabeledStatement node) {
		super.endVisit(node);
	}

	public void endVisit(Modifier node) {
		super.endVisit(node);
	}

	public void endVisit(NumberLiteral node) {
		super.endVisit(node);
	}

	public void endVisit(PackageDeclaration node) {
		super.endVisit(node);
	}

	public void endVisit(ParenthesizedExpression node) {
		super.endVisit(node);
	}

	public void endVisit(PrefixExpression node) {
		super.endVisit(node);
	}

	public void endVisit(QualifiedName node) {
		super.endVisit(node);
	}

	public void endVisit(ReturnStatement node) {
		super.endVisit(node);
	}

	public void endVisit(StringLiteral node) {
		super.endVisit(node);
	}

	public void endVisit(SwitchCase node) {
		super.endVisit(node);
	}

	public void endVisit(SwitchStatement node) {
		super.endVisit(node);
	}

	public void endVisit(SynchronizedStatement node) {
		super.endVisit(node);
	}

	public void endVisit(ThrowStatement node) {
		super.endVisit(node);
	}

	public void endVisit(TryStatement node) {
		super.endVisit(node);
	}

	public void endVisit(VariableDeclarationExpression node) {
		super.endVisit(node);
	}

	public void endVisit(VariableDeclarationFragment node) {
		super.endVisit(node);
	}

	public void endVisit(VariableDeclarationStatement node) {
		super.endVisit(node);
	}

	public void endVisit(WhileStatement node) {
		super.endVisit(node);
	}
	
	public void postVisit(ASTNode node) {
		super.postVisit(node);
	}

	public void preVisit(ASTNode node) {
//		buffer.append(node.getClass().getName());
		if (!(node instanceof Block))
			lastPos = node.getStartPosition();
		super.preVisit(node);
	}

	public boolean visit(ArrayType node) {
		return super.visit(node);
	}

	public boolean visit(ExpressionStatement node) {
		return super.visit(node);
	}

	public void endVisit(AnonymousClassDeclaration node) {
		super.endVisit(node);
	}

	public void endVisit(CastExpression node) {
		super.endVisit(node);
	}

	public void endVisit(ClassInstanceCreation node) {
		super.endVisit(node);
	}

	public void endVisit(ConstructorInvocation node) {
		super.endVisit(node);
	}

	public void endVisit(EnumConstantDeclaration node) {
		super.endVisit(node);
	}

	public void endVisit(FieldAccess node) {
		super.endVisit(node);
	}

	public void endVisit(FieldDeclaration node) {
		super.endVisit(node);
	}

	public void endVisit(MethodInvocation node) {
		super.endVisit(node);
	}

	public void endVisit(NullLiteral node) {
		super.endVisit(node);
	}

	public void endVisit(SimpleName node) {
		super.endVisit(node);
	}

	public void endVisit(SimpleType node) {
		super.endVisit(node);
	}

	public void endVisit(SingleVariableDeclaration node) {
		super.endVisit(node);
	}

	public void endVisit(SuperConstructorInvocation node) {
		super.endVisit(node);
	}

	public void endVisit(SuperFieldAccess node) {
		super.endVisit(node);
	}

	public void endVisit(SuperMethodInvocation node) {
		super.endVisit(node);
	}

	public void endVisit(ThisExpression node) {
		super.endVisit(node);
	}

	public void endVisit(TypeLiteral node) {
		super.endVisit(node);
	}

}
