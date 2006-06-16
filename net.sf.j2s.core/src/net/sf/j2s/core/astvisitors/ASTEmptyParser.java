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

import org.eclipse.jdt.core.dom.ASTVisitor;
import org.eclipse.jdt.core.dom.AnnotationTypeDeclaration;
import org.eclipse.jdt.core.dom.AnnotationTypeMemberDeclaration;
import org.eclipse.jdt.core.dom.BlockComment;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.EnhancedForStatement;
import org.eclipse.jdt.core.dom.EnumConstantDeclaration;
import org.eclipse.jdt.core.dom.EnumDeclaration;
import org.eclipse.jdt.core.dom.Javadoc;
import org.eclipse.jdt.core.dom.LineComment;
import org.eclipse.jdt.core.dom.MarkerAnnotation;
import org.eclipse.jdt.core.dom.MemberRef;
import org.eclipse.jdt.core.dom.MemberValuePair;
import org.eclipse.jdt.core.dom.MethodRef;
import org.eclipse.jdt.core.dom.MethodRefParameter;
import org.eclipse.jdt.core.dom.NormalAnnotation;
import org.eclipse.jdt.core.dom.ParameterizedType;
import org.eclipse.jdt.core.dom.SingleMemberAnnotation;
import org.eclipse.jdt.core.dom.TagElement;
import org.eclipse.jdt.core.dom.TextElement;
import org.eclipse.jdt.core.dom.TypeParameter;
import org.eclipse.jdt.core.dom.WildcardType;

/**
 * This empty visitor just give a way for debugging.
 * 
 * @author josson smith
 *
 */
public class ASTEmptyParser extends ASTVisitor {

	public ASTEmptyParser() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ASTEmptyParser(boolean visitDocTags) {
		super(visitDocTags);
		// TODO Auto-generated constructor stub
	}

	public void endVisit(AnnotationTypeDeclaration node) {
		// TODO Auto-generated method stub
		super.endVisit(node);
	}

	public boolean visit(AnnotationTypeDeclaration node) {
		// TODO Auto-generated method stub
		//return super.visit(node);
		return false;
	}

	public void endVisit(AnnotationTypeMemberDeclaration node) {
		// TODO Auto-generated method stub
		super.endVisit(node);
	}

	public boolean visit(AnnotationTypeMemberDeclaration node) {
		// TODO Auto-generated method stub
		//return super.visit(node);
		return false;
	}

	public void endVisit(BlockComment node) {
		// TODO Auto-generated method stub
		super.endVisit(node);
	}

	public boolean visit(BlockComment node) {
		// TODO Auto-generated method stub
		//return super.visit(node);
		return false;
	}

	public void endVisit(CompilationUnit node) {
		// TODO Auto-generated method stub
		super.endVisit(node);
	}

	public boolean visit(CompilationUnit node) {
		// TODO Auto-generated method stub
		return super.visit(node);
	}

	public void endVisit(Javadoc node) {
		// TODO Auto-generated method stub
		super.endVisit(node);
	}

	public boolean visit(Javadoc node) {
		// TODO Auto-generated method stub
		//return super.visit(node);
		return false;
	}

	public void endVisit(LineComment node) {
		// TODO Auto-generated method stub
		super.endVisit(node);
	}

	public boolean visit(LineComment node) {
		// TODO Auto-generated method stub
		//return super.visit(node);
		return false;
	}

	public void endVisit(MarkerAnnotation node) {
		// TODO Auto-generated method stub
		super.endVisit(node);
	}

	public boolean visit(MarkerAnnotation node) {
		// TODO Auto-generated method stub
		//return super.visit(node);
		return false;
	}

	public void endVisit(MemberRef node) {
		// TODO Auto-generated method stub
		super.endVisit(node);
	}

	public boolean visit(MemberRef node) {
		// TODO Auto-generated method stub
		//return super.visit(node);
		return false;
	}

	public void endVisit(MemberValuePair node) {
		// TODO Auto-generated method stub
		super.endVisit(node);
	}

	public boolean visit(MemberValuePair node) {
		// TODO Auto-generated method stub
		//return super.visit(node);
		return false;
	}

	public void endVisit(MethodRef node) {
		// TODO Auto-generated method stub
		super.endVisit(node);
	}

	public boolean visit(MethodRef node) {
		// TODO Auto-generated method stub
		//return super.visit(node);
		return false;
	}

	public void endVisit(MethodRefParameter node) {
		// TODO Auto-generated method stub
		super.endVisit(node);
	}

	public boolean visit(MethodRefParameter node) {
		// TODO Auto-generated method stub
		//return super.visit(node);
		return false;
	}

	public void endVisit(NormalAnnotation node) {
		// TODO Auto-generated method stub
		super.endVisit(node);
	}

	public boolean visit(NormalAnnotation node) {
		// TODO Auto-generated method stub
		//return super.visit(node);
		return false;
	}

	public void endVisit(ParameterizedType node) {
		// TODO Auto-generated method stub
		super.endVisit(node);
	}

	public boolean visit(ParameterizedType node) {
		// TODO Auto-generated method stub
		node.getType().accept(this);
		return false;
		//return super.visit(node);
	}

	public void endVisit(SingleMemberAnnotation node) {
		// TODO Auto-generated method stub
		super.endVisit(node);
	}

	public boolean visit(SingleMemberAnnotation node) {
		// TODO Auto-generated method stub
		//return super.visit(node);
		return false;
	}

	public void endVisit(TagElement node) {
		// TODO Auto-generated method stub
		super.endVisit(node);
	}

	public boolean visit(TagElement node) {
		// TODO Auto-generated method stub
		//return super.visit(node);
		return false;
	}

	public void endVisit(TextElement node) {
		// TODO Auto-generated method stub
		super.endVisit(node);
	}

	public boolean visit(TextElement node) {
		// TODO Auto-generated method stub
		//return super.visit(node);
		return false;
	}

	public void endVisit(TypeParameter node) {
		// TODO Auto-generated method stub
		super.endVisit(node);
	}

	public boolean visit(TypeParameter node) {
		// TODO Auto-generated method stub
		//return super.visit(node);
		return false;
	}

	public void endVisit(WildcardType node) {
		// TODO Auto-generated method stub
		super.endVisit(node);
	}

	public boolean visit(WildcardType node) {
		// TODO Auto-generated method stub
		//return super.visit(node);
		return false;
	}

}
