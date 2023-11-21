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

import org.eclipse.jdt.core.dom.ASTVisitor;
import org.eclipse.jdt.core.dom.SimpleName;

/**
 * @author zhou renjian
 *
 * 2006-5-1
 */
public class ReferenceASTVisitor extends ASTVisitor {

	private boolean isReferenced = false;
	private boolean isConstant = false;
	
	public ReferenceASTVisitor() {
		super();
	}

	public ReferenceASTVisitor(boolean visitDocTags) {
		super(visitDocTags);
	}

	/**
	 * @return true if the expression is not a constant or the constant
	 * or the type is not a number nor a boolean primitive.
	 * 
	 */
	public boolean visit(SimpleName node) {
		Object constValue = node.resolveConstantExpressionValue();
		isConstant = (constValue == null);
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

	public boolean isConstant() {
		return isConstant;
	}

	public void setReferenced(boolean isReferenced) {
		this.isReferenced = isReferenced;
		isConstant = false;
	}
	
}
