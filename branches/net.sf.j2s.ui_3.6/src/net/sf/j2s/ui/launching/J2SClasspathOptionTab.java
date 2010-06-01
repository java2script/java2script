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

package net.sf.j2s.ui.launching;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.util.Properties;

import net.sf.j2s.ui.classpath.IRuntimeClasspathEntry;
import net.sf.j2s.ui.property.IJ2SConfigModifiedListener;
import net.sf.j2s.ui.property.J2SConfigPage;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.debug.core.ILaunchConfigurationWorkingCopy;
import org.eclipse.debug.ui.AbstractLaunchConfigurationTab;
import org.eclipse.jdt.core.IJavaModel;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.JavaCore;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.internal.debug.ui.IJavaDebugHelpContextIds;
import org.eclipse.jdt.internal.debug.ui.JDIDebugUIPlugin;
import org.eclipse.jdt.internal.debug.ui.JavaDebugImages;
import org.eclipse.jdt.internal.debug.ui.launcher.LauncherMessages;
import org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.ui.PlatformUI;

/**
 * @author zhou renjian
 *
 * 2006-5-14
 */
public class J2SClasspathOptionTab extends AbstractLaunchConfigurationTab {

	private J2SConfigPage configPage;
	/**
	 * The last launch config this tab was initialized from
	 */
	protected ILaunchConfiguration fLaunchConfiguration;

	/* (non-Javadoc)
	 * @see org.eclipse.debug.ui.ILaunchConfigurationTab#createControl(org.eclipse.swt.widgets.Composite)
	 */
	public void createControl(Composite parent) {
		Font font = parent.getFont();
		
		Composite comp = new Composite(parent, SWT.NONE);
		setControl(comp);
		PlatformUI.getWorkbench().getHelpSystem().setHelp(getControl(), IJavaDebugHelpContextIds.LAUNCH_CONFIGURATION_DIALOG_CLASSPATH_TAB);
		GridLayout topLayout = new GridLayout();
		comp.setLayout(topLayout);		
		GridData gd;
		
		Label label = new Label(comp, SWT.NONE);
		label.setText(LauncherMessages.JavaClasspathTab_0); //$NON-NLS-1$
		gd = new GridData(GridData.HORIZONTAL_ALIGN_BEGINNING);
		label.setLayoutData(gd);

		configPage = new J2SConfigPage(comp, SWT.NONE);
		configPage.forClasspathTab();
		configPage.getRestoreDefaultButton().addSelectionListener(new SelectionAdapter() {
		
			public void widgetSelected(SelectionEvent e) {
				ILaunchConfigurationWorkingCopy configCopy = ((ILaunchConfigurationWorkingCopy)fLaunchConfiguration);
				try {
					String classpath = configCopy.getAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, (String) null);
					String abandonClasspath = configCopy.getAttribute(IJ2SLauchingConfiguration.J2S_ABANDON_CLASS_PATH, (String) null);
					if ((classpath == null || classpath.trim().length() == 0) &&
							(abandonClasspath == null || abandonClasspath.trim().length() == 0)){
						return ;
					}
					configCopy.setAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, (String) null);
					configCopy.setAttribute(IJ2SLauchingConfiguration.J2S_ABANDON_CLASS_PATH, (String) null);
					IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
					String projectName = fLaunchConfiguration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
					if ((projectName == null) || (projectName.trim().length() < 1)) {
						return ;
					}			
					IJavaProject javaProject = javaModel.getJavaProject(projectName);
					if ((javaProject == null) || !javaProject.exists()) {
						return ;
					}
					IProject project = javaProject.getProject();
					String prjFolder = project.getLocation().toOSString();
					File workingDir = new File(prjFolder);
					File j2sFile = new File(workingDir, ".j2s");
					configPage.initConfigPage(j2sFile);
					updateLaunchConfigurationDialog();
				} catch (JavaModelException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				} catch (CoreException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
		});
		configPage.addConfigModifiedListener(new IJ2SConfigModifiedListener() {
		
			public void configModified() {
				setDirty(true);
				updateLaunchConfigurationDialog();
			}
		
		});
	}

	/* (non-Javadoc)
	 * @see org.eclipse.debug.ui.ILaunchConfigurationTab#setDefaults(org.eclipse.debug.core.ILaunchConfigurationWorkingCopy)
	 */
	public void setDefaults(ILaunchConfigurationWorkingCopy configuration) {
	}

	/* (non-Javadoc)
	 * @see org.eclipse.debug.ui.ILaunchConfigurationTab#initializeFrom(org.eclipse.debug.core.ILaunchConfiguration)
	 */
	public void initializeFrom(ILaunchConfiguration configuration) {
		setDirty(false);
		this.fLaunchConfiguration = configuration;
		try {
			IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
			String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
			if ((projectName == null) || (projectName.trim().length() < 1)) {
				return ;
			}			
			IJavaProject javaProject = javaModel.getJavaProject(projectName);
			if ((javaProject == null) || !javaProject.exists()) {
				return ;
			}
			IProject project = javaProject.getProject();
			String prjFolder = project.getLocation().toOSString();
			File workingDir = new File(prjFolder);
			String path = javaProject.getOutputLocation().toString();
			int idx = path.indexOf('/', 2);
			String relativePath = null;
			if (idx != -1) {
				relativePath = path.substring(idx + 1); 
			}
			File j2sFile = new File(workingDir, ".j2s");
			String classpath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, (String) null);
			String abandonClasspath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_ABANDON_CLASS_PATH, (String) null);
			if ((classpath == null || classpath.trim().length() == 0) &&
					(abandonClasspath == null || abandonClasspath.trim().length() == 0)){
				configPage.initConfigPage(j2sFile);
			} else {
				if (relativePath == null) {
					relativePath = "";
				}
				String propStr = "j2s.compiler.status=enable\r\nj2s.output.path=" + relativePath 
						+ "\r\nj2s.resources.list=" + classpath
						+ "\r\nj2s.abandoned.resources.list=" + abandonClasspath;
				configPage.initConfigPage(j2sFile, new ByteArrayInputStream(propStr.getBytes()));
			}
		} catch (CoreException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.debug.ui.ILaunchConfigurationTab#performApply(org.eclipse.debug.core.ILaunchConfigurationWorkingCopy)
	 */
	public void performApply(ILaunchConfigurationWorkingCopy configuration) {
		try {
			IJavaModel javaModel = JavaCore.create(ResourcesPlugin.getWorkspace().getRoot());
			String projectName = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, (String)null);
			if ((projectName == null) || (projectName.trim().length() < 1)) {
				return ;
			}			
			IJavaProject javaProject = javaModel.getJavaProject(projectName);
			if ((javaProject == null) || !javaProject.exists()) {
				return ;
			}
			IProject project = javaProject.getProject();
			String prjFolder = project.getLocation().toOSString();
			File workingDir = new File(prjFolder);
			boolean useDefault = true;
			try {
				useDefault = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_DEFAULT_CLASSPATH, true);
			} catch (CoreException e) {
				//JDIDebugUIPlugin.log(e);
			}
			String path = javaProject.getOutputLocation().toString();
			int idx = path.indexOf('/', 2);
			String relativePath = null;
			if (idx != -1) {
				relativePath = path.substring(idx + 1); 
			}
			File j2sFile = new File(workingDir, ".j2s");
			String classpath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, (String) null);
			String abandonClasspath = configuration.getAttribute(IJ2SLauchingConfiguration.J2S_ABANDON_CLASS_PATH, (String) null);
			if (relativePath == null) {
				relativePath = "";
			}
			String propStr = "j2s.output.path=" + relativePath + "\r\nj2s.resources.list=" + classpath
			 		+ "\r\nj2s.abandoned.resources.list==" + abandonClasspath;
			InputStream is = new ByteArrayInputStream(propStr.getBytes());
			Properties prop = configPage.getUpdatedProperties(is, j2sFile);
			String resList = prop.getProperty("j2s.resources.list");
			if (!resList.equals(classpath)) {
				configuration.setAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, resList);
			}
			resList = prop.getProperty("j2s.abandoned.resources.list");
			if (!resList.equals(classpath)) {
				configuration.setAttribute(IJ2SLauchingConfiguration.J2S_ABANDON_CLASS_PATH, resList);
			}
		} catch (CoreException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/* (non-Javadoc)
	 * @see org.eclipse.debug.ui.ILaunchConfigurationTab#getName()
	 */
	public String getName() {
		return LauncherMessages.JavaClasspathTab_Cla_ss_path_3; //$NON-NLS-1$
	}

	/**
	 * @see org.eclipse.debug.ui.ILaunchConfigurationTab#getImage()
	 */
	public static Image getClasspathImage() {
		return JavaDebugImages.get(JavaDebugImages.IMG_OBJS_CLASSPATH);
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.debug.ui.ILaunchConfigurationTab#getImage()
	 */
	public Image getImage() {
		return getClasspathImage();
	}

}
