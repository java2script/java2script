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
public interface IExtendedVisitor {
	/**
	 * Return visitor that generate scripts.
	 * @return
	 */
	public ASTScriptVisitor getScriptVisitor();
	
	/**
	 * Return visitor for class dependencies.
	 * @return
	 */
	public DependencyASTVisitor getDependencyVisitor();
}
