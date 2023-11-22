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
 * super class to 
 * @author zhou renjian
 *
 * 2006-12-27
 */
public abstract class J2SHelper implements IHelper {

	protected J2SASTVisitor visitor;
	
	public StringBuffer getBuffer() {
		return visitor.getBuffer();
	}

	public J2SASTVisitor getVisitor() {
		return visitor;
	}

	public void setVisitor(J2SASTVisitor visitor) {
		this.visitor = visitor;
	}
	
}