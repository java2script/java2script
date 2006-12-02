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
	}

	public ASTEmptyParser(boolean visitDocTags) {
		super(visitDocTags);
	}

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

}
