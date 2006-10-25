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

package net.sf.j2s.core.compiler;

import net.sf.j2s.core.astvisitors.ASTScriptVisitor;
import net.sf.j2s.core.astvisitors.DependencyASTVisitor;

/**
 * @author zhou renjian
 *
 * 2006-10-26
 */
public class ASTExtendedVisitor implements IExtendedVisitor {
	/* (non-Javadoc)
	 * @see net.sf.j2s.core.compiler.IExtendedVisitor#getScriptVisitor()
	 */
	public ASTScriptVisitor getScriptVisitor() {
		return new ASTScriptVisitor();
	}
	/* (non-Javadoc)
	 * @see net.sf.j2s.core.compiler.IExtendedVisitor#getDependencyVisitor()
	 */
	public DependencyASTVisitor getDependencyVisitor() {
		return new DependencyASTVisitor();
	}
}
