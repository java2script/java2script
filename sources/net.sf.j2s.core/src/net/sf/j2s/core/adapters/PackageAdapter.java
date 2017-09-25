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

package net.sf.j2s.core.adapters;

/**
 * 
 * Class to allow checking for need to use Clazz.declarePackage
 * (because they are predefined in j2sSwingjs.js)
 * and to track the current package name.
 * 
 * 
 * @author zhou renjian
 *
 * 2006-12-3
 */
public class PackageAdapter extends AbstractPluginAdapter {

	private String thisPackageName = "";
	
	public static String[] basePackages =  {
			"java.lang", 
			"java.lang.ref", 
			"java.lang.ref.reflect", 
			"java.lang.reflect", 
			"java.lang.annotation",
			"java.lang.instrument",
			"java.lang.management",
			"java.io", 
			"java.util"};
 
	public String getPackageName() {
		return thisPackageName;
	}

	public void setPackageName(String packageName) {
		thisPackageName = packageName;
	}

	public boolean isBasePackage() {
		for (int i = 0; i < basePackages.length; i++)
			if (basePackages[i].equals(thisPackageName))
				return true;
		return false;
	}

}
