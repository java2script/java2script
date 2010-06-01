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

package net.sf.j2s.core.astvisitors;


/**
 * @author zhou renjian
 *
 * 2006-12-27
 */
public class AbstractPluginVisitor implements IPluginVisitor {

	protected ASTEmptyVisitor visitor;
	
//	protected StringBuffer buffer;

	public StringBuffer getBuffer() {
		return visitor.getBuffer();
	}

//	public void setBuffer(StringBuffer buffer) {
//		this.buffer = buffer;
//	}

	public ASTEmptyVisitor getVisitor() {
		return visitor;
	}

	public void setVisitor(ASTEmptyVisitor visitor) {
		this.visitor = visitor;
	}
	
}