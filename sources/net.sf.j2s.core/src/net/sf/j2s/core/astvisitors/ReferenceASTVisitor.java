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

import org.eclipse.jdt.core.dom.ASTVisitor;
import org.eclipse.jdt.core.dom.SimpleName;

/**
 * @author josson smith
 *
 * 2006-5-1
 */
public class ReferenceASTVisitor extends ASTVisitor {

	private boolean isReferenced = false;
	
	public ReferenceASTVisitor() {
		super();
	}

	public ReferenceASTVisitor(boolean visitDocTags) {
		super(visitDocTags);
	}

	public boolean visit(SimpleName node) {
		Object constValue = node.resolveConstantExpressionValue();
		if (constValue != null && (constValue instanceof Number
				|| constValue instanceof Boolean)) {
			return false;
		}
		isReferenced = true;
		return false;
	}

	public boolean isReferenced() {
		return isReferenced;
	}

	public void setReferenced(boolean isReferenced) {
		this.isReferenced = isReferenced;
	};
	
}
