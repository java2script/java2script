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
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import net.sf.j2s.core.Java2ScriptProjectNature;
import net.sf.j2s.ui.classpath.IRuntimeClasspathEntry;
import net.sf.j2s.ui.classpath.Resource;
import net.sf.j2s.ui.launching.JavaRuntime;
import net.sf.j2s.ui.property.FileUtil;
import net.sf.j2s.ui.property.J2SClasspathModel;
import net.sf.j2s.ui.resources.ExternalResources;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IncrementalProjectBuilder;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.internal.ui.wizards.JavaProjectWizard;
import org.eclipse.jface.preference.PreferenceDialog;

/**
 * @author zhou renjian
 *
 * 2007-3-4
 */
public class Java2ScriptProjectWizard extends JavaProjectWizard {
	/**
	 * 
	 */
	public Java2ScriptProjectWizard() {
		super();
		updateJava2ScriptWizardTitle();
	}

	protected void updateJava2ScriptWizardTitle() {
		setWindowTitle(getWindowTitle() + " with Java2Script Enabled");
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.internal.ui.wizards.JavaProjectWizard#performFinish()
	 */
	public boolean performFinish() {
		boolean finished = super.performFinish();
		if (finished) {
	        if (getContainer() instanceof PreferenceDialog) {
	            PreferenceDialog dialog = (PreferenceDialog) getContainer();
	            dialog.close();
	        }
	        IProgressMonitor monitor = null;
	    	IJavaProject jproject = (IJavaProject) getCreatedElement();
	        IProject project = jproject.getProject();
			String prjFolder = project.getLocation().toOSString();
			File file = new File(prjFolder, ".j2s");
			Properties props = new Properties();
			try {
				String path = jproject.getOutputLocation().toString();
				int idx = path.indexOf('/', 2);
				String relativePath = null;
				if (idx != -1) {
					relativePath = path.substring(idx + 1); 
					props.setProperty("j2s.output.path", relativePath);
				} else {
					props.setProperty("j2s.output.path", "");
				}
			} catch (JavaModelException e) {
				e.printStackTrace();
			}
			
			J2SClasspathModel classpathModel = new J2SClasspathModel();
			String[][] allResources = ExternalResources.getAllResources();
			String j2sLibPath = null;
			if (allResources != null && allResources.length != 0 && allResources[0].length != 0) {
				if ((allResources[0][0]).startsWith("|")) {
					allResources[0][0] = allResources[0][0].substring(1).replace('\\', '/');
				}
				j2sLibPath = allResources[0][0].substring(0, allResources[0][0].lastIndexOf("/") + 1);
			} else {
				j2sLibPath = "../net.sf.j2s.lib/j2slib/";
			}
			IRuntimeClasspathEntry entry = JavaRuntime.newArchiveRuntimeClasspathEntry(j2sLibPath + "/java.runtime.j2x");
			if (entry != null) {
				((Resource) entry).setAbsolute(true);
				classpathModel.addResource((Resource) entry);
			}
			updateJava2ScriptLibraries(classpathModel, j2sLibPath);
			
			StringBuffer buffer = new StringBuffer();
			Resource[] resources = classpathModel.getResources();
			for (int i = 0; i < resources.length; i++) {
				Resource res = resources[i];
				String resPath = null;
				resPath = res.toResourceString();
				if (res.isAbsolute()) {
					resPath = FileUtil.toRelativePath(resPath.substring(1), new File(prjFolder).getAbsolutePath());
				}
				if (resPath != null) {
					if (buffer.length() != 0) {
						buffer.append(',');
					}
					buffer.append(resPath);
				}
				
			}
			props.setProperty("j2s.resources.list", buffer.toString());
			props.setProperty("j2s.abandoned.resources.list", "");
			props.setProperty("j2s.compiler.status", "enable");
			try {
				props.store(new FileOutputStream(file), "Java2Script Configuration");
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			updateJava2ScriptProject(prjFolder, props.getProperty("j2s.output.path"));
			
	        try {
	        	project.refreshLocal(1, null);
	        } catch (CoreException e) {
	            e.printStackTrace();
	        }
	        
	    	try {
	    		Java2ScriptProjectNature pn = new Java2ScriptProjectNature();
	    		pn.setProject(project);
	    		pn.addToBuildSpec("net.sf.j2s.core.java2scriptbuilder");
	    	} catch (CoreException e) {
	    		e.printStackTrace();
	    	}
	        try {
				project.build(IncrementalProjectBuilder.CLEAN_BUILD, monitor);
			} catch (CoreException e) {
				e.printStackTrace();
			}
		}
		return finished;
	}
	
	protected void updateJava2ScriptLibraries(J2SClasspathModel classpathModel, String j2sLibPath) {
	}

	protected void updateJava2ScriptProject(String prjFolder, String binRelative) {
	}
}
