/*******************************************************************************
 * Copyright (c) 2000, 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *     BEA - Daniel R Somerfield - Bug 88939
 *******************************************************************************/
package net.sf.j2s.ui.classpathviewer.viewer;


import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;

import net.sf.j2s.ui.classpathviewer.IClasspathEntry;
import net.sf.j2s.ui.classpathviewer.IRuntimeClasspathEntry;
import net.sf.j2s.ui.classpathviewer.Resource;
import net.sf.j2s.ui.classpathviewer.actions.AddClassAction;
import net.sf.j2s.ui.classpathviewer.actions.AddExternalFolderAction;
import net.sf.j2s.ui.classpathviewer.actions.AddFolderAction;
import net.sf.j2s.ui.classpathviewer.actions.AddJarAction;
import net.sf.j2s.ui.classpathviewer.actions.AddLibraryAction;
import net.sf.j2s.ui.classpathviewer.actions.AddProjectAction;
import net.sf.j2s.ui.classpathviewer.actions.AddVariableAction;
import net.sf.j2s.ui.classpathviewer.actions.MoveDownAction;
import net.sf.j2s.ui.classpathviewer.actions.MoveUpAction;
import net.sf.j2s.ui.classpathviewer.actions.RemoveAction;
import net.sf.j2s.ui.classpathviewer.actions.RestoreDefaultEntriesAction;
import net.sf.j2s.ui.classpathviewer.actions.RuntimeClasspathAction;
import net.sf.j2s.ui.classpathviewer.actions.UpdateFromDefaultEntriesAction;
import net.sf.j2s.ui.launching.IJ2SLauchingConfiguration;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspace;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.debug.core.ILaunchConfigurationWorkingCopy;
import org.eclipse.jdt.internal.debug.ui.IJavaDebugHelpContextIds;
import org.eclipse.jdt.internal.debug.ui.JDIDebugUIPlugin;
import org.eclipse.jdt.internal.debug.ui.JavaDebugImages;
import org.eclipse.jdt.internal.debug.ui.classpath.BootpathFilter;
import org.eclipse.jdt.internal.debug.ui.launcher.LauncherMessages;
import org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants;
import org.eclipse.jface.action.IAction;
import org.eclipse.swt.SWT;
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.ui.PlatformUI;

/**
 * A launch configuration tab that displays and edits the user and
 * bootstrap classes comprising the classpath launch configuration
 * attribute.
 * <p>
 * This class may be instantiated. This class is not intended to be subclassed.
 * </p>
 * @since 2.0
 */
public class JavaClasspathTab extends JavaLaunchConfigurationTab {

	protected RuntimeClasspathViewer fClasspathViewer;
	private ClasspathModel fModel;

	protected static final String DIALOG_SETTINGS_PREFIX = "JavaClasspathTab"; //$NON-NLS-1$
	
	/**
	 * The last launch config this tab was initialized from
	 */
	protected ILaunchConfiguration fLaunchConfiguration;
	private AddClassAction addClassAction;
	private AddJarAction addJarAction;
	
	/* (non-Javadoc)
	 * @see org.eclipse.debug.ui.ILaunchConfigurationTab#createControl(org.eclipse.swt.widgets.Composite)
	 */
	public void createControl(Composite parent) {
		Font font = parent.getFont();
		
		Composite comp = new Composite(parent, SWT.NONE);
		setControl(comp);
		PlatformUI.getWorkbench().getHelpSystem().setHelp(getControl(), IJavaDebugHelpContextIds.LAUNCH_CONFIGURATION_DIALOG_CLASSPATH_TAB);
		GridLayout topLayout = new GridLayout();
		topLayout.numColumns = 2;
		comp.setLayout(topLayout);		
		GridData gd;
		
		Label label = new Label(comp, SWT.NONE);
		label.setText(LauncherMessages.JavaClasspathTab_0); //$NON-NLS-1$
		gd = new GridData(GridData.HORIZONTAL_ALIGN_BEGINNING);
		gd.horizontalSpan = 2;
		label.setLayoutData(gd);
		
		fClasspathViewer = new RuntimeClasspathViewer(comp);
		fClasspathViewer.addEntriesChangedListener(this);
		fClasspathViewer.getControl().setFont(font);
		fClasspathViewer.setLabelProvider(new ClasspathLabelProvider());
		fClasspathViewer.setContentProvider(new ClasspathContentProvider(this));
		if (!isShowBootpath()) {
			fClasspathViewer.addFilter(new BootpathFilter());
		}
	
		Composite pathButtonComp = new Composite(comp, SWT.NONE);
		GridLayout pathButtonLayout = new GridLayout();
		pathButtonLayout.marginHeight = 0;
		pathButtonLayout.marginWidth = 0;
		pathButtonComp.setLayout(pathButtonLayout);
		gd = new GridData(GridData.VERTICAL_ALIGN_BEGINNING | GridData.HORIZONTAL_ALIGN_FILL);
		pathButtonComp.setLayoutData(gd);
		pathButtonComp.setFont(font);
		
		createPathButtons(pathButtonComp);
		
		//fClasspathViewer.setSelection(new StructuredSelection(fClasspathViewer.getContentProvider().get))
	}
	
	/**
	 * Creates the buttons to manipulate the classpath.
	 * 
	 * @param pathButtonComp composite buttons are contained in
	 * @since 3.0
	 */
	protected void createPathButtons(Composite pathButtonComp) {
		List advancedActions = new ArrayList(5);
		
		createButton(pathButtonComp, new MoveUpAction(fClasspathViewer));
		createButton(pathButtonComp, new MoveDownAction(fClasspathViewer));
		createButton(pathButtonComp, new RemoveAction(fClasspathViewer));
		createButton(pathButtonComp, new AddProjectAction(fClasspathViewer));
		addClassAction = new AddClassAction(fClasspathViewer, fLaunchConfiguration);
		createButton(pathButtonComp, addClassAction);
		addJarAction = new AddJarAction(fClasspathViewer, fLaunchConfiguration);
		createButton(pathButtonComp, addJarAction);
//		createButton(pathButtonComp, new AddExternalJarAction(fClasspathViewer, DIALOG_SETTINGS_PREFIX));

		RuntimeClasspathAction action = new AddFolderAction(null);								
		advancedActions.add(action);
		
		action = new AddExternalFolderAction(null, DIALOG_SETTINGS_PREFIX);								
		advancedActions.add(action);		

		action = new AddVariableAction(null);								
		advancedActions.add(action);	
		
		action = new AddLibraryAction(null);
		advancedActions.add(action);
		
//		action = new AttachSourceAction(null, SWT.RADIO);								
//		advancedActions.add(action);
		
		IAction[] adv = (IAction[])advancedActions.toArray(new IAction[advancedActions.size()]);
//		createButton(pathButtonComp, new AddAdvancedAction(fClasspathViewer, adv));

		action= new UpdateFromDefaultEntriesAction(fClasspathViewer, this);
		createButton(pathButtonComp, action);
		action.setEnabled(true);

		action= new RestoreDefaultEntriesAction(fClasspathViewer, this);
		createButton(pathButtonComp, action);
		action.setEnabled(true);
	}

	/**
	 * Creates a button for the given action.
	 * 
	 * @param pathButtonComp parent composite for the button
	 * @param action the action triggered by the button
	 * @return the button that was created
	 */
	protected Button createButton(Composite pathButtonComp, RuntimeClasspathAction action) {
		Button button  = createPushButton(pathButtonComp, action.getText(), null);
		action.setButton(button);
		return button;
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
		refresh(configuration);
		fClasspathViewer.expandToLevel(2);
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.debug.ui.ILaunchConfigurationTab#activated(org.eclipse.debug.core.ILaunchConfigurationWorkingCopy)
	 */
	public void activated(ILaunchConfigurationWorkingCopy workingCopy) {
		try {
			boolean useDefault= workingCopy.getAttribute(IJavaLaunchConfigurationConstants.ATTR_DEFAULT_CLASSPATH, true);
			if (useDefault) {
				if (!isDefaultClasspath(getCurrentClasspath(), workingCopy)) {
					initializeFrom(workingCopy);
					return;
				}
			}
			fClasspathViewer.refresh();
		} catch (CoreException e) {
		}
	}
	
	/**
	 * Refreshes the classpath entries based on the current state of the given
	 * launch configuration.
	 */
	private void refresh(ILaunchConfiguration configuration) {
		boolean useDefault = true;
		setErrorMessage(null);
		try {
			useDefault = configuration.getAttribute(IJavaLaunchConfigurationConstants.ATTR_DEFAULT_CLASSPATH, true);
		} catch (CoreException e) {
			JDIDebugUIPlugin.log(e);
		}
		
		if (configuration == getLaunchConfiguration()) {
			// no need to update if an explicit path is being used and this setting
			// has not changed (and viewing the same config as last time)
			if (!useDefault) {
				setDirty(false);
				return;			
			}
		}
		
		setLaunchConfiguration(configuration);
		try {
			createClasspathModel(configuration);
		} catch (CoreException e) {
			setErrorMessage(e.getMessage());
		}
		
		fClasspathViewer.setLaunchConfiguration(configuration);
		fClasspathViewer.setInput(fModel);
		addClassAction.setConfiguration(configuration);
		addJarAction.setConfiguration(fLaunchConfiguration);
		setDirty(false);
	}
	
	private void createClasspathModel(ILaunchConfiguration configuration) throws CoreException {
		fModel= new ClasspathModel();
		IRuntimeClasspathEntry[] entries= JavaRuntime.computeUnresolvedRuntimeClasspath(configuration);
		IRuntimeClasspathEntry entry;
		for (int i = 0; i < entries.length; i++) {
			entry= entries[i];
			switch (entry.getClasspathProperty()) {
				case IRuntimeClasspathEntry.USER_CLASSES:				
					fModel.addEntry(ClasspathModel.USER, entry);
					break;
				default:
					fModel.addEntry(ClasspathModel.BOOTSTRAP, entry);
					break;
			}
		}	
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.debug.ui.ILaunchConfigurationTab#performApply(org.eclipse.debug.core.ILaunchConfigurationWorkingCopy)
	 */
	public void performApply(ILaunchConfigurationWorkingCopy configuration) {
		if (isDirty()) {
			IRuntimeClasspathEntry[] classpath = getCurrentClasspath();
			boolean def = isDefaultClasspath(classpath, configuration.getOriginal());
			if (def) {
				configuration.setAttribute(IJavaLaunchConfigurationConstants.ATTR_DEFAULT_CLASSPATH, (String)null);
				//configuration.setAttribute(IJavaLaunchConfigurationConstants.ATTR_CLASSPATH, (String)null);
				configuration.setAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, (String)null);
			} else {
				configuration.setAttribute(IJavaLaunchConfigurationConstants.ATTR_DEFAULT_CLASSPATH, false);
//				try {
					StringBuffer buf = new StringBuffer();
					for (int i = 0; i < classpath.length; i++) {
						if (classpath[i] instanceof Resource) {
							Resource res = (Resource) classpath[i];
							String str = res.toResourceString();
							buf.append(str);
							if (i != classpath.length - 1) {
								buf.append(",");
							}
						}
					}
					//configuration.setAttribute(IJavaLaunchConfigurationConstants.ATTR_CLASSPATH, buf.toString());
					configuration.setAttribute(IJ2SLauchingConfiguration.J2S_CLASS_PATH, buf.toString());
//				} catch (CoreException e) {
//					JDIDebugUIPlugin.errorDialog(LauncherMessages.JavaClasspathTab_Unable_to_save_classpath_1, e); //$NON-NLS-1$
//				}	
			}
		}
	}
	
	/**
	 * Returns the classpath entries currently specified by this tab.
	 * 
	 * @return the classpath entries currently specified by this tab
	 */
	private IRuntimeClasspathEntry[] getCurrentClasspath() {
		IClasspathEntry[] boot = fModel.getEntries(ClasspathModel.BOOTSTRAP);
		IClasspathEntry[] user = fModel.getEntries(ClasspathModel.USER);
		List entries = new ArrayList(boot.length + user.length);
		IClasspathEntry bootEntry;
		IRuntimeClasspathEntry entry;
		for (int i = 0; i < boot.length; i++) {
			bootEntry= boot[i];
			entry = null;
			if (bootEntry instanceof ClasspathEntry) {
				entry = ((ClasspathEntry)bootEntry).getDelegate(); 
			} else if (bootEntry instanceof IRuntimeClasspathEntry) {
				entry= (IRuntimeClasspathEntry) boot[i];
			}
			if (entry != null) {
				if (entry.getClasspathProperty() == IRuntimeClasspathEntry.USER_CLASSES) {
					entry.setClasspathProperty(IRuntimeClasspathEntry.BOOTSTRAP_CLASSES);
				}
				entries.add(entry);
			}
		}
		IClasspathEntry userEntry;
		for (int i = 0; i < user.length; i++) {
			userEntry= user[i];
			entry = null;
			if (userEntry instanceof ClasspathEntry) {
				entry = ((ClasspathEntry)userEntry).getDelegate();
			} else if (userEntry instanceof IRuntimeClasspathEntry) {
				entry= (IRuntimeClasspathEntry) user[i];
			}
			if (entry != null) {
				entry.setClasspathProperty(IRuntimeClasspathEntry.USER_CLASSES);
				entries.add(entry);
			}
		}			
		return (IRuntimeClasspathEntry[]) entries.toArray(new IRuntimeClasspathEntry[entries.size()]);
	}

	/**
	 * Returns whether the specified classpath is equivalent to the
	 * default classpath for this configuration.
	 * 
	 * @param classpath classpath to compare to default
	 * @param configuration original configuration
	 * @return whether the specified classpath is equivalent to the
	 * default classpath for this configuration
	 */
	private boolean isDefaultClasspath(IRuntimeClasspathEntry[] classpath, ILaunchConfiguration configuration) {
		try {
			ILaunchConfigurationWorkingCopy wc = configuration.getWorkingCopy();
			wc.setAttribute(IJavaLaunchConfigurationConstants.ATTR_DEFAULT_CLASSPATH, true);
			IRuntimeClasspathEntry[] entries= JavaRuntime.computeUnresolvedRuntimeClasspath(wc);
			if (classpath.length == entries.length) {
				for (int i = 0; i < entries.length; i++) {
					IRuntimeClasspathEntry entry = entries[i];
					if (!entry.equals(classpath[i])) {
						return false;
					}
				}
				return true;
			}
			return false;
		} catch (CoreException e) {
			return false;
		}
//		return false;
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
	
	/**
	 * Sets the launch configuration for this classpath tab
	 */
	private void setLaunchConfiguration(ILaunchConfiguration config) {
		fLaunchConfiguration = config;
	}	
	
	/**
	 * Returns the current launch configuration
	 */
	public ILaunchConfiguration getLaunchConfiguration() {
		return fLaunchConfiguration;
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.debug.ui.ILaunchConfigurationTab#dispose()
	 */
	public void dispose() {
		if (fClasspathViewer != null) {
			fClasspathViewer.removeEntriesChangedListener(this);
		}
		super.dispose();
	}

	/* (non-Javadoc)
	 * @see org.eclipse.debug.ui.ILaunchConfigurationTab#getImage()
	 */
	public Image getImage() {
		return getClasspathImage();
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.debug.ui.ILaunchConfigurationTab#isValid(org.eclipse.debug.core.ILaunchConfiguration)
	 */
	public boolean isValid(ILaunchConfiguration launchConfig) {
		setErrorMessage(null);
		setMessage(null);
		String projectName= null;
		try {
			projectName= launchConfig.getAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, ""); //$NON-NLS-1$
		} catch (CoreException e) {
			return false;
		}
		if (projectName.length() > 0) {
			IWorkspace workspace = ResourcesPlugin.getWorkspace();
			IStatus status = workspace.validateName(projectName, IResource.PROJECT);
			if (status.isOK()) {
				IProject project= ResourcesPlugin.getWorkspace().getRoot().getProject(projectName);
				if (!project.exists()) {
					setErrorMessage(MessageFormat.format(LauncherMessages.JavaMainTab_20, new String[] {projectName})); //$NON-NLS-1$
					return false;
				}
				if (!project.isOpen()) {
					setErrorMessage(MessageFormat.format(LauncherMessages.JavaMainTab_21, new String[] {projectName})); //$NON-NLS-1$
					return false;
				}
			} else {
				setErrorMessage(MessageFormat.format(LauncherMessages.JavaMainTab_19, new String[]{status.getMessage()})); //$NON-NLS-1$
				return false;
			}
		}
		
		IRuntimeClasspathEntry [] entries = fModel.getAllEntries();
		for (int i=0; i<entries.length; i++)
		{
//			if (entries[i].getType() == IRuntimeClasspathEntry.ARCHIVE 
//					&& (!entries[i].getPath().isAbsolute()))
//			{
//				setErrorMessage(MessageFormat.format(LauncherMessages.JavaClasspathTab_Invalid_runtime_classpath_1, new String[]{entries[i].getPath().toString()}));
//				return false;
//			}
		}
		
		return true;
	}
	
	/**
	 * Returns whether the bootpath should be displayed.
	 * 
	 * @return whether the bootpath should be displayed
	 * @since 3.0
	 */
	public boolean isShowBootpath() {
		return true;
	}
	
	/**
	 * @return Returns the classpath model.
	 */
	protected ClasspathModel getModel() {
		return fModel;
	}
}
