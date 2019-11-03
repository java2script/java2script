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

package net.sf.j2s.ajax;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.IWorkspaceDescription;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.FileLocator;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.core.runtime.Path;
import org.eclipse.core.runtime.Status;
import org.eclipse.jdt.core.ClasspathVariableInitializer;
import org.eclipse.jdt.core.JavaCore;

/**
 * @author zhou renjian
 *
 * 2006-6-5
 */
public class AJAXVariableInitializer extends ClasspathVariableInitializer {


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
        URL starterURL = AjaxPlugin.getDefault().getBundle().getEntry(File.separator);
		String root = "."; //$NON-NLS-1$
		try {
			root = FileLocator.toFileURL(starterURL).getFile();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		if ("AJAX_CORE".equals(variable)) {
			newPath = Path.fromPortableString(root + "/ajaxcore.jar");
		} else if ("AJAX_SWT".equals(variable)) {
			newPath = Path.fromPortableString(root + "/ajaxswt.jar");
		} else if ("AJAX_RPC".equals(variable)) {
			newPath = Path.fromPortableString(root + "/ajaxrpc.jar");
		} else if ("AJAX_PIPE".equals(variable)) {
			newPath = Path.fromPortableString(root + "/ajaxpipe.jar");
		} else if ("AJAX_STORE".equals(variable)) {
			newPath = Path.fromPortableString(root + "/ajaxstore.jar");
		} else if ("J2S_ANNOTATION".equals(variable)) {
			newPath = Path.fromPortableString(root + "/j2stag.jar");
		} else if ("AJAX_CORE_SRC".equals(variable)) {
			newPath = Path.fromPortableString(root + "/ajaxcoresrc.zip");
		} else if ("AJAX_SWT_SRC".equals(variable)) {
			newPath = Path.fromPortableString(root + "/ajaxswtsrc.zip");
		} else if ("AJAX_RPC_SRC".equals(variable)) {
			newPath = Path.fromPortableString(root + "/ajaxrpcsrc.zip");
		} else if ("AJAX_PIPE_SRC".equals(variable)) {
			newPath = Path.fromPortableString(root + "/ajaxpipesrc.zip");
		} else if ("AJAX_STORE_SRC".equals(variable)) {
			newPath = Path.fromPortableString(root + "/ajaxstoresrc.zip");
		} else if ("J2S_ANNOTATION_SRC".equals(variable)) {
			newPath = Path.fromPortableString(root + "/j2stagsrc.zip");
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
				AjaxPlugin.getDefault().getLog().log(new Status(IStatus.ERROR,
						"net.sf.j2s.ajax", IStatus.ERROR, ce.getMessage(), ce));
				return;
			} finally {
				try {
					setAutobuild(workspace, wasAutobuild);
				} catch (CoreException ce) {
					AjaxPlugin.getDefault().getLog().log(new Status(IStatus.ERROR,
							"net.sf.j2s.ajax", IStatus.ERROR, ce.getMessage(), ce));
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
