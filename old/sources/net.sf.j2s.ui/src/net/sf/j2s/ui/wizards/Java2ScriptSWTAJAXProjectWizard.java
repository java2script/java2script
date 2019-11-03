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

package net.sf.j2s.ui.wizards;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.Path;
import org.eclipse.jdt.core.IClasspathEntry;
import org.eclipse.jdt.core.JavaCore;

import net.sf.j2s.ui.classpath.IRuntimeClasspathEntry;
import net.sf.j2s.ui.classpath.Resource;
import net.sf.j2s.ui.launching.J2SLaunchingUtil;
import net.sf.j2s.ui.launching.JavaRuntime;
import net.sf.j2s.ui.property.J2SClasspathModel;

/**
 * @author zhou renjian
 *
 * 2007-3-4
 */
public class Java2ScriptSWTAJAXProjectWizard extends Java2ScriptProjectWizard {
	public Java2ScriptSWTAJAXProjectWizard() {
		super();
	}
	
	protected void updateJava2ScriptWizardTitle() {
		setWindowTitle(getWindowTitle() + " with Java2Script AJAX and SWT Enabled");
	}

	protected void updateJava2ScriptLibraries(J2SClasspathModel classpathModel, String j2sLibPath) {
		IRuntimeClasspathEntry entry = JavaRuntime.newArchiveRuntimeClasspathEntry(j2sLibPath + "/swt.j2x");
		if (entry != null) {
			((Resource) entry).setAbsolute(true);
			classpathModel.addResource((Resource) entry);
		}
	}
	
	protected IClasspathEntry[] updateJavaLibraries(
			IClasspathEntry[] defaultEntries) {
		List list = new ArrayList();
		for (int i = 0; i < defaultEntries.length; i++) {
			list.add(i, defaultEntries[i]);
		}
		list.add(JavaCore.newVariableEntry(new Path("ECLIPSE_SWT"), null, null));
		list.add(JavaCore.newVariableEntry(new Path("AJAX_SWT"), new Path("AJAX_SWT_SRC"), null));
		list.add(JavaCore.newVariableEntry(new Path("AJAX_RPC"), new Path("AJAX_RPC_SRC"), null));
		list.add(JavaCore.newVariableEntry(new Path("AJAX_PIPE"), new Path("AJAX_PIPE_SRC"), null));
		return super.updateJavaLibraries((IClasspathEntry[]) list.toArray(new IClasspathEntry[list.size()]));
	}

	protected void updateJava2ScriptProject(String prjFolder, String binRelative) {
		try {
			File cpFile = new File(prjFolder, ".classpath");
			FileInputStream fis = new FileInputStream(cpFile);
			String classpath = J2SLaunchingUtil.readAFile(fis);
			if (classpath != null) {
				boolean needUpdate = false;
				if (classpath.indexOf("ECLIPSE_SWT") == -1 && classpath.indexOf("SWT_LIBRARY") == -1 &&  
						classpath.indexOf("eclipse.swt") == -1) {
					int idx = classpath.lastIndexOf("<");
					classpath = classpath.substring(0, idx)
							+ "\t<classpathentry kind=\"var\" path=\"ECLIPSE_SWT\"/>\r\n"
							+ classpath.substring(idx);
					needUpdate = true;
				}
				if (classpath.indexOf("AJAX_SWT") == -1 && classpath.indexOf("ajaxswt.jar") == -1) {
					int idx = classpath.lastIndexOf("<");
					classpath = classpath.substring(0, idx)
							+ "\t<classpathentry sourcepath=\"AJAX_SWT_SRC\" kind=\"var\" path=\"AJAX_SWT\"/>\r\n"
							+ classpath.substring(idx);
					needUpdate = true;
				}
				if (classpath.indexOf("AJAX_RPC") == -1 && classpath.indexOf("ajaxrpc.jar") == -1) {
					int idx = classpath.lastIndexOf("<");
					classpath = classpath.substring(0, idx)
					+ "\t<classpathentry sourcepath=\"AJAX_RPC_SRC\" kind=\"var\" path=\"AJAX_RPC\"/>\r\n"
					+ classpath.substring(idx);
					needUpdate = true;
				}
				if (classpath.indexOf("AJAX_PIPE") == -1 && classpath.indexOf("ajaxpipe.jar") == -1) {
					int idx = classpath.lastIndexOf("<");
					classpath = classpath.substring(0, idx)
					+ "\t<classpathentry sourcepath=\"AJAX_PIPE_SRC\" kind=\"var\" path=\"AJAX_PIPE\"/>\r\n"
					+ classpath.substring(idx);
					needUpdate = true;
				}
				if (needUpdate) {
					try {
						FileOutputStream fos = new FileOutputStream(cpFile);
						//fos.write(new byte[] {(byte) 0xef, (byte) 0xbb, (byte) 0xbf}); // UTF-8 header!
						fos.write(classpath.getBytes("utf-8"));
						fos.close();
					} catch (FileNotFoundException e) {
						e.printStackTrace();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	}
}
