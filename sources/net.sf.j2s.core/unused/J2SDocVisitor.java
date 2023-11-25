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

/**
 * 
 * ASTVisitor > J2SASTVisitor > J2SKeywordVisitor > J2SDocVisitor > Java2ScriptScriptVisitor
 * 
 * This level of Visitor will try to focus on dealing with those
 * j2s* Javadoc tags.
 * 
 * @author zhou renjian
 *
 * 2006-12-4
 */
public abstract class J2SDocVisitor extends J2SKeywordVisitor {
	
	protected J2SDocVisitor() {
		super();
	}
	
}
