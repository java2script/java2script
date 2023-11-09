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

package j2s.common;

import j2s.common.ASTScriptVisitor;
import j2s.common.DependencyASTVisitor;

/**
 * @author zhou renjian
 *
 * 2006-10-26
 */
public class ASTExtendedVisitor implements IExtendedVisitor {
	/* (non-Javadoc)
	 * @see j2s.common.IExtendedVisitor#getScriptVisitor()
	 */
	public ASTScriptVisitor getScriptVisitor() {
		return new ASTScriptVisitor();
	}
	/* (non-Javadoc)
	 * @see j2s.common.IExtendedVisitor#getDependencyVisitor()
	 */
	public DependencyASTVisitor getDependencyVisitor() {
		return new DependencyASTVisitor();
	}
}
