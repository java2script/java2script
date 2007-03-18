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

package net.sf.j2s.core.compiler;

import net.sf.j2s.core.astvisitors.ASTScriptVisitor;
import net.sf.j2s.core.astvisitors.DependencyASTVisitor;
import net.sf.j2s.core.astvisitors.SWTDependencyASTVisitor;
import net.sf.j2s.core.astvisitors.SWTScriptVisitor;

/**
 * @author zhou renjian
 *
 * 2006-10-26
 */
public class SWTExtendedVisitor implements IExtendedVisitor {
	/* (non-Javadoc)
	 * @see net.sf.j2s.core.compiler.IExtendedVisitor#getScriptVisitor()
	 */
	public ASTScriptVisitor getScriptVisitor() {
		return new SWTScriptVisitor();
	}
	/* (non-Javadoc)
	 * @see net.sf.j2s.core.compiler.IExtendedVisitor#getDependencyVisitor()
	 */
	public DependencyASTVisitor getDependencyVisitor() {
		return new SWTDependencyASTVisitor();
	}
}
