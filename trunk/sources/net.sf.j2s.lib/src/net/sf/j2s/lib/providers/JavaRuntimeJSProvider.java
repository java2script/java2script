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

package net.sf.j2s.lib.providers;

import java.io.File;
import java.io.IOException;
import java.net.URL;

import net.sf.j2s.lib.LibPlugin;
import net.sf.j2s.ui.resources.FileSystemUtils;
import net.sf.j2s.ui.resources.IExternalResourceProvider;

import org.eclipse.core.runtime.Platform;

/**
 * @author josson smith
 *
 * 2006-5-13
 */
public class JavaRuntimeJSProvider implements IExternalResourceProvider {

	/*
	private static String[] CORE_KEY_LIST = new String[] {
		"Common", "Utilities", "Bare Core" 
	};
	
	private static String[] CORE_DESC_LIST = new String[] {
		"With common Java classes supported, such as StringBuffer", 
		"With Java utilities supported, such as java.util.*", 
		"With only the Java class inheritance supported" 
	};

	private static String[][] CORE_RESOURCE_LIST = new String[][] {
		new String[] {
				"j2s-core-common.z.js"
		},
		new String[] {
				"j2s-core-util.z.js"
		},
		new String[] {
				"j2s-core-bare.z.js"
		}
	};
	*/
	private static String[] CORE_KEY_LIST = new String[] {
		"J2S Core" 
	};
	
	private static String[] CORE_DESC_LIST = new String[] {
		"Java2Script core library" 
	};

	private static String[][] CORE_RESOURCE_LIST = new String[][] {
		new String[] {
				"j2s-core-bare.z.js",
				"j2s-core-basic.z.js",
				"j2s-core-error.z.js",
				"j2s-core-common.z.js",
				"j2s-core-util.z.js",
				"j2s-core-more.z.js"
		}
	};
	
	public String[] getKeys() {
		return CORE_KEY_LIST;
	}

	public String[] getDescriptions() {
		return CORE_DESC_LIST;
	}

	public String[][] getResources() {
		String[][] list = new String[CORE_RESOURCE_LIST.length][];
        URL starterURL = LibPlugin.getDefault().getBundle()
				.getEntry("/" + File.separator); //$NON-NLS-1$
		String srcPath = "."; //$NON-NLS-1$
		try {
			srcPath = Platform.asLocalURL(starterURL).getFile();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		srcPath = srcPath.replace('/', File.separatorChar);
		for (int i = 0; i < list.length; i++) {
			list[i] = new String[CORE_RESOURCE_LIST[i].length];
			for (int j = 0; j < CORE_RESOURCE_LIST[i].length; j++) {
				list[i][j] = "|" + new File(srcPath, "j2slib/" + CORE_RESOURCE_LIST[i][j]).getAbsolutePath();
			}
		}
		return list;
	}

	public void copyResources(String key, String destPath) {
		String[][] patterResouces = CORE_RESOURCE_LIST;
        URL starterURL = LibPlugin.getDefault().getBundle()
				.getEntry("/" + File.separator); //$NON-NLS-1$
		String srcPath = "."; //$NON-NLS-1$
		try {
			srcPath = Platform.asLocalURL(starterURL).getFile();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		srcPath = srcPath.replace('/', File.separatorChar);
		int index = 0;
		for (int i = 0; i < CORE_KEY_LIST.length; i++) {
			if (CORE_KEY_LIST[i].equals(key)) {
				index = i;
				break;
			}
		}
		for (int j = 0; j < patterResouces[index].length; j++) {
			File srcFile = new File(srcPath, "j2slib/" + patterResouces[index][j]);
			File destFile = new File(destPath, patterResouces[index][j]);
			if (!destFile.exists() || srcFile.lastModified() >= destFile.lastModified()) {
				FileSystemUtils.copyFile(srcFile.getAbsolutePath(), destFile.getAbsolutePath());
			}
		}
	}

}
