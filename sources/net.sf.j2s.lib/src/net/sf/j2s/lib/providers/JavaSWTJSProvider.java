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

package net.sf.j2s.lib.providers;

import java.io.File;
import java.io.IOException;
import java.net.URL;

import net.sf.j2s.lib.LibPlugin;
import net.sf.j2s.ui.resources.FileSystemUtils;
import net.sf.j2s.ui.resources.IExternalResourceProvider;

import org.eclipse.core.runtime.Platform;

/**
 * @author zhou renjian
 *
 * 2006-5-13
 */
public class JavaSWTJSProvider implements IExternalResourceProvider {

	/*
	private static String[] SWT_KEY_LIST = new String[] {
		"SWT", 
		"SWT Custom" 
	};
	
	private static String[] SWT_DESC_LIST = new String[] {
		"With SWT components supported", 
		"With SWT and custom components supported" 
	};

	private static String[][] SWT_RESOURCE_LIST = new String[][] {
		new String[] {
				"j2s-swt-basic.z.js",
				"j2s-swt-widget.z.js"
		},
		new String[] {
				"j2s-swt-custom.z.js",
				"j2s-swt-other.z.js"
		}
	};
	*/
	private static String[] SWT_KEY_LIST = new String[] {
		"J2S SWT" 
	};
	
	private static String[] SWT_DESC_LIST = new String[] {
		"J2S SWT library" 
	};

	private static String[][] SWT_RESOURCE_LIST = new String[][] {
		new String[] {
				"j2s-swt-basic.z.js",
				"j2s-swt-event.z.js",
				"j2s-swt-layout.z.js",
				"j2s-swt-widget.z.js",
				"j2s-swt-more.z.js",
				"j2s-swt-custom.z.js",
				"j2s-swt-other.z.js"
		}
	};

	public String[] getKeys() {
		return SWT_KEY_LIST;
	}

	public String[] getDescriptions() {
		return SWT_DESC_LIST;
	}
	
	public String[][] getResources() {
		String[][] list = new String[SWT_RESOURCE_LIST.length][];
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
			list[i] = new String[SWT_RESOURCE_LIST[i].length];
			for (int j = 0; j < SWT_RESOURCE_LIST[i].length; j++) {
				list[i][j] = "|" + new File(srcPath, "j2slib/" + SWT_RESOURCE_LIST[i][j]).getAbsolutePath();
			}
		}
		return list;
	}

	public void copyResources(String key, String destPath) {
		String[][] patterResouces = SWT_RESOURCE_LIST;
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
		for (int i = 0; i < SWT_KEY_LIST.length; i++) {
			if (SWT_KEY_LIST[i].equals(key)) {
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
