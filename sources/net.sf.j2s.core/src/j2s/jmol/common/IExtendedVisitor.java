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

import j2s.jmol.common.Java2ScriptScriptVisitor;
import j2s.jmol.common.Java2ScriptDependencyVisitor;

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
	public Java2ScriptScriptVisitor getScriptVisitor();
	
	/**
	 * Return visitor for class dependencies.
	 * @return
	 */
	public Java2ScriptDependencyVisitor getDependencyVisitor();
}
