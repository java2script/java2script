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
package j2s.jmol.common;

import java.util.HashMap;
import java.util.Map;

import org.eclipse.jdt.core.dom.ASTVisitor;

/**
 * The overall super class for Java2ScriptDependencyVisitor and Java2ScriptScriptVisitor
 * 
 * ASTVisitor > J2SASTVisitor > J2SKeywordVisitor > Java2ScriptDependencyVisitor
 * 
 * ASTVisitor > J2SASTVisitor > J2SKeywordVisitor > J2SDocVisitor > Java2ScriptScriptVisitor
 * 
 * @author zhou renjian
 */
abstract class J2SASTVisitor extends ASTVisitor {

	protected boolean isDebugging = false;

	boolean isDebugging() {
		return isDebugging;
	}

	public void setDebugging(boolean isDebugging) {
		this.isDebugging = isDebugging;
	}


	protected J2SASTVisitor() {
		super();
	}
	/**
	 * Buffer that keep all compiled *.js.
	 */
	protected StringBuffer buffer = new StringBuffer();

	/**
	 * Return the compiled *.js String
	 * @return the buffer
	 */
	public StringBuffer getBuffer() {
		return buffer;
	}

	/**
	 * registered one helper of any type per visitor
	 * 
	 */
	private Map<Class<? extends IHelper>, IHelper> helperMap = new HashMap<>();
	
	private IHelper getHelper(Class<? extends IHelper> clazz) {
		IHelper helper = helperMap.get(clazz);
		if (helper == null) {
			try {
				helper = clazz.newInstance();
				helperMap.put(helper.getClass(), helper);
				helper.setVisitor(this);
			} catch (@SuppressWarnings("unused") Exception e) {
				// not possible
			}
		}
		return helper;
	}

	protected J2SPackageHelper getPackageHelper() {
		return (J2SPackageHelper) getHelper(J2SPackageHelper.class);
	}
	
	protected J2STypeHelper getTypeHelper() {
		return (J2STypeHelper) getHelper(J2STypeHelper.class);
	}
	
	protected J2SFieldHelper getFieldHelper() {
		return (J2SFieldHelper) getHelper(J2SFieldHelper.class);
	}
	
	protected J2SMethodHelper getMethodHelper() {
		return (J2SMethodHelper) getHelper(J2SMethodHelper.class);
	}
	
	protected J2SVariableHelper getVariableHelper() {
		return (J2SVariableHelper) getHelper(J2SVariableHelper.class);
	}
	
	/**
	 * Get the package name for writing the .js file.
	 * 
	 * @return the package name for this class
	 */
	final public String getPackageName() {
		return getPackageHelper().getPackageName();
	}
	

//	/*
//	 * The following are empty super.* methods which will be use to help
//	 * developing Java2Script compiler.
//	 * 
//	 * In the final release of Java2Script, it may be commented out.
//	 */
//
////	void endVisit(AnnotationTypeDeclaration node) {
////		super.endVisit(node);
////	}
//
//	public boolean visit(AnnotationTypeDeclaration node) {
//		return false;
//	}
////
////	public void endVisit(AnnotationTypeMemberDeclaration node) {
////		super.endVisit(node);
////	}
//
//	public boolean visit(AnnotationTypeMemberDeclaration node) {
//		return false;
//	}
////
////	public void endVisit(BlockComment node) {
////		super.endVisit(node);
////	}
////
////	public boolean visit(BlockComment node) {
////		return false;
////	}
//
////	public void endVisit(CompilationUnit node) {
////		super.endVisit(node);
////	}
////
////	public boolean visit(CompilationUnit node) {
////		return super.visit(node);
////	}
//
////	public void endVisit(Javadoc node) {
////		super.endVisit(node);
////	}
////
//	final public boolean visit(Javadoc node) {
//		return false;
//	}
//
////	public void endVisit(LineComment node) {
////		super.endVisit(node);
////	}
////
//	public boolean visit(LineComment node) {
//		return false;
//	}
////
////	public void endVisit(MarkerAnnotation node) {
////		super.endVisit(node);
////	}
//
//	public boolean visit(MarkerAnnotation node) {
//		return false;
//	}
//
////	public void endVisit(MemberRef node) {
////		super.endVisit(node);
////	}
//
//	public boolean visit(MemberRef node) {
//		return false;
//	}
//
////	public void endVisit(MemberValuePair node) {
////		super.endVisit(node);
////	}
//
//	public boolean visit(MemberValuePair node) {
//		return false;
//	}
//
////	public void endVisit(MethodRef node) {
////		super.endVisit(node);
////	}
////
//	public boolean visit(MethodRef node) {
//		return false;
//	}
////
////	public void endVisit(MethodRefParameter node) {
////		super.endVisit(node);
////	}
//
//	public boolean visit(MethodRefParameter node) {
//		return false;
//	}
////
////	public void endVisit(NormalAnnotation node) {
////		super.endVisit(node);
////	}
//
//	public boolean visit(NormalAnnotation node) {
//		return false;
//	}
////
////	public void endVisit(ParameterizedType node) {
////		super.endVisit(node);
////	}
//
//	public boolean visit(ParameterizedType node) {
//		node.getType().accept(this);
//		return false;
//	}
//
////	public void endVisit(PrimitiveType node) {
////		super.endVisit(node);
////	}
////
////	public boolean visit(PrimitiveType node) {
////		return super.visit(node);
////	}
////
////	public void endVisit(SingleMemberAnnotation node) {
////		super.endVisit(node);
////	}
//
//	public boolean visit(SingleMemberAnnotation node) {
//		return false;
//	}
//
//	public boolean visit(TagElement node) {
//		super.visit(node);
//		return false;
//	}
//
//	public boolean visit(TextElement node) {
//		return false;
//	}
//
//	public boolean visit(TypeParameter node) {
//		return false;
//	}
//	public boolean visit(WildcardType node) {
//		return false;
//	}
//
//
}
