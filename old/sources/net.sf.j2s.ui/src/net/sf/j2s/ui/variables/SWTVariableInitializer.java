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

package net.sf.j2s.ui.variables;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.net.URL;
import net.sf.j2s.ui.Java2ScriptUIPlugin;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.IWorkspaceDescription;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.Platform;
import org.eclipse.jdt.core.ClasspathVariableInitializer;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.internal.launching.LaunchingPlugin;
import org.eclipse.osgi.service.datalocation.Location;
import org.eclipse.ui.internal.ide.IDEWorkbenchPlugin;

/**
 * @author zhou renjian
 *
 * 2006-6-5
 */
public class SWTVariableInitializer extends ClasspathVariableInitializer {


	/**
	 * The monitor to use for progress reporting.
	 * May be null
	 */
	private IProgressMonitor fMonitor;
	
	/**
	 * @see ClasspathVariableInitializer#initialize(String)
	 */
	public void initialize(String variable) {
		IPath newPath= null;
		if ("ECLIPSE_SWT".equals(variable)) {
			Location location = Platform.getInstallLocation();
			URL url = location.getURL();
			File file = new File(url.getFile(), "plugins");
			File[] swtJars = file.listFiles(new FileFilter() {
				public boolean accept(File pathname) {
					String name = pathname.getName().toLowerCase();
					if (name.startsWith("org.eclipse.swt.") && name.endsWith(".jar") && name.indexOf("source") == -1) {
						return true;
					}
					return false;
				}
			});
			if (swtJars == null || swtJars.length == 0) {
				return;
			}
			File mainSWT = swtJars[0];
			for (int i = 1; i < swtJars.length; i++) {
				File swt = swtJars[0];
				if (swt.getName().length() > mainSWT.getName().length()) {
					mainSWT = swt;
				}
			}
			newPath = Path.fromOSString(mainSWT.getAbsolutePath());
		}

		if (newPath == null) {
			return ;
		}
//		IVMInstall vmInstall= JavaRuntime.getDefaultVMInstall();
//		if (vmInstall != null) {
			IWorkspace workspace= ResourcesPlugin.getWorkspace();
			IWorkspaceDescription wsDescription= workspace.getDescription();				
			boolean wasAutobuild= wsDescription.isAutoBuilding();
			try {
				setAutobuild(workspace, false);
				setJREVariable(newPath, variable);	
			} catch (CoreException ce) {
				LaunchingPlugin.log(ce);
				return;
			} finally {
				try {
					setAutobuild(workspace, wasAutobuild);
				} catch (CoreException ce) {
					LaunchingPlugin.log(ce);
				}
			}
//		}
	}
	
	private void setJREVariable(IPath newPath, String var) throws CoreException {
		JavaCore.setClasspathVariable(var, newPath, getMonitor());
	}
	
	private boolean setAutobuild(IWorkspace ws, boolean newState) throws CoreException {
		IWorkspaceDescription wsDescription= ws.getDescription();
		boolean oldState= wsDescription.isAutoBuilding();
		if (oldState != newState) {
			wsDescription.setAutoBuilding(newState);
			ws.setDescription(wsDescription);
		}
		return oldState;
	}
	
	protected IProgressMonitor getMonitor() {
		if (fMonitor == null) {
			return new NullProgressMonitor();
		}
		return fMonitor;
	}
	
}
