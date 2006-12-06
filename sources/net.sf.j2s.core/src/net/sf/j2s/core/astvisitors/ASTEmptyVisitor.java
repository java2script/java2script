/*******************************************************************************
 * Copyright (c) 2005 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/
package net.sf.j2s.core.astvisitors;

import org.eclipse.jdt.core.dom.*;

/**
 * This empty visitor just gives a way for debugging. That is to say, in 
 * Eclipse debugging mode, if there are needs to compile these following
 * nodes, you can always modify these methods without restarting Eclipse.
 * 
 * @author zhou renjian
 */
public class ASTEmptyVisitor extends ASTVisitor {

	/**
	 * Buffer that keep all compiled *.js.
	 * @see ASTScriptVisitor#laterBuffer
	 */
	protected StringBuffer buffer = new StringBuffer();

	/**
	 * Return the buffer. Actually it is returning compiled *.js String
	 * @return
	 */
	public StringBuffer getBuffer() {
		return buffer;
	}

	/**
	 * Buffer may be set to other buffer.
	 * @see ASTScriptVisitor#visit(TypeDeclaration) 
	 * @param buffer
	 */
	public void setBuffer(StringBuffer buffer) {
		this.buffer = buffer;
	}


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
