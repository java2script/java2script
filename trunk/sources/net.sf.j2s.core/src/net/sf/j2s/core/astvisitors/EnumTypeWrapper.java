/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.core.astvisitors;

import java.util.Iterator;
import java.util.List;

import org.eclipse.jdt.core.dom.EnumDeclaration;
import org.eclipse.jdt.core.dom.FieldDeclaration;
import org.eclipse.jdt.core.dom.MethodDeclaration;

/**
 * @author josson smith
 *
 * 2006-3-10
 */
public class EnumTypeWrapper {
	protected EnumDeclaration node;

	public EnumTypeWrapper(EnumDeclaration node) {
		super();
		// TODO Auto-generated constructor stub
		this.node = node;
	}
	/**
	 * Returns the ordered list of field declarations of this type 
	 * declaration. For a class declaration, these are the
	 * field declarations; for an interface declaration, these are
	 * the constant declarations.
	 * <p>
	 * This convenience method returns this node's body declarations
	 * with non-fields filtered out. Unlike <code>bodyDeclarations</code>,
	 * this method does not return a live result.
	 * </p>
	 * 
	 * @return the (possibly empty) list of field declarations
	 */ 
	public FieldDeclaration[] getFields() {
		List bd = node.bodyDeclarations();
		int fieldCount = 0;
		for (Iterator it = bd.listIterator(); it.hasNext(); ) {
			if (it.next() instanceof FieldDeclaration) {
				fieldCount++;
			}
		}
		FieldDeclaration[] fields = new FieldDeclaration[fieldCount];
		int next = 0;
		for (Iterator it = bd.listIterator(); it.hasNext(); ) {
			Object decl = it.next();
			if (decl instanceof FieldDeclaration) {
				fields[next++] = (FieldDeclaration) decl;
			}
		}
		return fields;
	}

	/**
	 * Returns the ordered list of method declarations of this type 
	 * declaration.
	 * <p>
	 * This convenience method returns this node's body declarations
	 * with non-methods filtered out. Unlike <code>bodyDeclarations</code>,
	 * this method does not return a live result.
	 * </p>
	 * 
	 * @return the (possibly empty) list of method (and constructor) 
	 *    declarations
	 */ 
	public MethodDeclaration[] getMethods() {
		List bd = node.bodyDeclarations();
		int methodCount = 0;
		for (Iterator it = bd.listIterator(); it.hasNext(); ) {
			if (it.next() instanceof MethodDeclaration) {
				methodCount++;
			}
		}
		MethodDeclaration[] methods = new MethodDeclaration[methodCount];
		int next = 0;
		for (Iterator it = bd.listIterator(); it.hasNext(); ) {
			Object decl = it.next();
			if (decl instanceof MethodDeclaration) {
				methods[next++] = (MethodDeclaration) decl;
			}
		}
		return methods;
	}

}
