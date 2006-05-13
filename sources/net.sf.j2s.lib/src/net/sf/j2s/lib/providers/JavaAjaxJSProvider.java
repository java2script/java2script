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
public class JavaAjaxJSProvider implements IExternalResourceProvider {

	private static String[] AJAX_KEY_LIST = new String[] {
		"AJAX Core", 
		"AJAX SWT" 
	};
	
	private static String[] AJAX_DESC_LIST = new String[] {
		"With AJAX supported", 
		"With AJAX SWT supported" 
	};

	private static String[][] AJAX_RESOURCE_LIST = new String[][] {
		new String[] {
				"j2s-ajax-core.z.js"
		},
		new String[] {
				"j2s-ajax-swt.z.js"
		}
	};
	
	public String[] getKeys() {
		return AJAX_KEY_LIST;
	}

	public String[] getDescriptions() {
		return AJAX_DESC_LIST;
	}
	
	public String[][] getResources() {
		String[][] list = new String[AJAX_RESOURCE_LIST.length][];
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
			list[i] = new String[AJAX_RESOURCE_LIST[i].length];
			for (int j = 0; j < AJAX_RESOURCE_LIST[i].length; j++) {
				list[i][j] = "|" + new File(srcPath, "j2slib/" + AJAX_RESOURCE_LIST[i][j]).getAbsolutePath();
			}
		}
		return list;
	}

	public void copyResources(String key, String destPath) {
		String[][] patterResouces = AJAX_RESOURCE_LIST;
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
		for (int i = 0; i < AJAX_KEY_LIST.length; i++) {
			if (AJAX_KEY_LIST[i].equals(key)) {
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
