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
 * 2006-12-3
 */
public class ASTPackageVisitor extends AbstractPluginVisitor {

	protected String thisPackageName = "";
	

	protected String[] skipDeclarePackages() {
		return new String[] {
				"java.lang", 
				"java.lang.ref", 
				"java.lang.ref.reflect", 
				"java.lang.reflect", 
				"java.lang.annotation",
				"java.lang.instrument",
				"java.lang.management",
				"java.io", 
				"java.util"};
	}

	public String getPackageName() {
		return thisPackageName;
	}

	public void setPackageName(String thisPackageName) {
		this.thisPackageName = thisPackageName;
	}

}
