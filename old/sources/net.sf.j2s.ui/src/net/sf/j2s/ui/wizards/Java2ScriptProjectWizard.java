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
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
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
import org.eclipse.core.runtime.IConfigurationElement;
import org.eclipse.core.runtime.IExecutableExtension;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.Path;
import org.eclipse.jdt.core.IClasspathEntry;
import org.eclipse.jdt.core.IJavaElement;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.internal.ui.JavaPlugin;
import org.eclipse.jdt.internal.ui.JavaPluginImages;
import org.eclipse.jdt.internal.ui.util.ExceptionHandler;
import org.eclipse.jdt.internal.ui.wizards.NewElementWizard;
import org.eclipse.jdt.internal.ui.wizards.NewWizardMessages;
import org.eclipse.jdt.ui.IPackagesViewPart;
import org.eclipse.jdt.ui.actions.ShowInPackageViewAction;
import org.eclipse.jdt.ui.wizards.NewJavaProjectWizardPageOne;
import org.eclipse.jdt.ui.wizards.NewJavaProjectWizardPageTwo;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.ui.IWorkbenchPage;
import org.eclipse.ui.IWorkbenchPart;
import org.eclipse.ui.IWorkbenchWindow;
import org.eclipse.ui.IWorkingSet;
import org.eclipse.ui.PlatformUI;
import org.eclipse.ui.wizards.newresource.BasicNewProjectResourceWizard;

/**
 * @author zhou renjian
 *
 * 2007-3-4
 */
public class Java2ScriptProjectWizard extends NewElementWizard implements IExecutableExtension {

	private NewJavaProjectWizardPageOne fFirstPage;
	private NewJavaProjectWizardPageTwo fSecondPage;

	private IConfigurationElement fConfigElement;

	public Java2ScriptProjectWizard() {
		this(null, null);
	}

	public Java2ScriptProjectWizard(NewJavaProjectWizardPageOne pageOne, NewJavaProjectWizardPageTwo pageTwo) {
		setDefaultPageImageDescriptor(JavaPluginImages.DESC_WIZBAN_NEWJPRJ);
		setDialogSettings(JavaPlugin.getDefault().getDialogSettings());
		setWindowTitle(NewWizardMessages.JavaProjectWizard_title); 

		fFirstPage= pageOne;
		fSecondPage= pageTwo;
	}

	/* (non-Javadoc)
	 * @see org.eclipse.jface.wizard.Wizard#addPages()
	 */
	public void addPages() {
		if (fFirstPage == null)
			fFirstPage= new NewJavaProjectWizardPageOne();
		addPage(fFirstPage);

		if (fSecondPage == null)
			fSecondPage= new NewJavaProjectWizardPageTwo(fFirstPage);
		addPage(fSecondPage);
		
		fFirstPage.init(getSelection(), getActivePart());
	}		

	/* (non-Javadoc)
	 * @see org.eclipse.jdt.internal.ui.wizards.NewElementWizard#finishPage(org.eclipse.core.runtime.IProgressMonitor)
	 */
	protected void finishPage(IProgressMonitor monitor) throws InterruptedException, CoreException {
		fSecondPage.performFinish(monitor); // use the full progress monitor
	}

	/* (non-Javadoc)
	 * @see org.eclipse.jface.wizard.IWizard#performFinish()
	 */
	public boolean performFinish() {
		boolean finished= super.performFinish();
		if (finished) {
			final IJavaElement newElement= getCreatedElement();

			IWorkingSet[] workingSets= fFirstPage.getWorkingSets();
			if (workingSets.length > 0) {
				PlatformUI.getWorkbench().getWorkingSetManager().addToWorkingSets(newElement, workingSets);
			}

			BasicNewProjectResourceWizard.updatePerspective(fConfigElement);
			selectAndReveal(fSecondPage.getJavaProject().getProject());				

			Display.getDefault().asyncExec(new Runnable() {
				public void run() {
					IWorkbenchPart activePart= getActivePart();
					if (activePart instanceof IPackagesViewPart) {
						(new ShowInPackageViewAction(activePart.getSite())).run(newElement);
					}
				}
			});
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
	    		pn.configure();
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
	
	private IWorkbenchPart getActivePart() {
		IWorkbenchWindow activeWindow= getWorkbench().getActiveWorkbenchWindow();
		if (activeWindow != null) {
			IWorkbenchPage activePage= activeWindow.getActivePage();
			if (activePage != null) {
				return activePage.getActivePart();
			}
		}
		return null;
	}

	protected void handleFinishException(Shell shell, InvocationTargetException e) {
		String title= NewWizardMessages.JavaProjectWizard_op_error_title; 
		String message= NewWizardMessages.JavaProjectWizard_op_error_create_message;			 
		ExceptionHandler.handle(e, getShell(), title, message);
	}	

	/*
	 * Stores the configuration element for the wizard.  The config element will be used
	 * in <code>performFinish</code> to set the result perspective.
	 */
	public void setInitializationData(IConfigurationElement cfig, String propertyName, Object data) {
		fConfigElement= cfig;
	}

	/* (non-Javadoc)
	 * @see IWizard#performCancel()
	 */
	public boolean performCancel() {
		fSecondPage.performCancel();
		return super.performCancel();
	}

	/* (non-Javadoc)
	 * @see org.eclipse.jdt.internal.ui.wizards.NewElementWizard#getCreatedElement()
	 */
	public IJavaElement getCreatedElement() {
		return fSecondPage.getJavaProject();
	}
	
	protected void updateJava2ScriptWizardTitle() {
		setWindowTitle(getWindowTitle() + " with Java2Script Enabled");
	}
	
	protected void updateJava2ScriptLibraries(J2SClasspathModel classpathModel, String j2sLibPath) {
	}

	protected void updateJava2ScriptProject(String prjFolder, String binRelative) {
	}
	
	protected IClasspathEntry[] updateJavaLibraries(IClasspathEntry[] defaultEntries) {
		List list = new ArrayList();
		for (int i = 0; i < defaultEntries.length; i++) {
			list.add(i, defaultEntries[i]);
		}
		list.add(JavaCore.newVariableEntry(new Path("J2S_ANNOTATION"), new Path("J2S_ANNOTATION_SRC"), null));
		return (IClasspathEntry[]) list.toArray(new IClasspathEntry[list.size()]);
	}
	
}
