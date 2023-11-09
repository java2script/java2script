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
 * @author zhou renjian
 *
 * 2006-12-27
 */
public interface IPluginVisitor {
	public StringBuffer getBuffer();
	//public void setBuffer(StringBuffer buffer);
	public ASTEmptyVisitor getVisitor();
	public void setVisitor(ASTEmptyVisitor visitor);
}
