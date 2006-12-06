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

package net.sf.j2s.core.astvisitors;


/**
 * @author zhou renjian
 *
 * 2006-12-3
 */
public class ASTPackageVisitor extends ASTTigerVisitor {

	protected String thisPackageName = "";
	

	protected String[] skipDeclarePackages() {
		return new String[] {
				"java.lang", 
				"java.lang.ref", 
				"java.lang.ref.reflect", 
				"java.lang.reflect", 
				"java.io", 
				"java.util"};
	}

	public String getPackageName() {
		return thisPackageName;
	}

}
