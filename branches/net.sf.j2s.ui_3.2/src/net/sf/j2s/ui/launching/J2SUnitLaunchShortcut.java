/*******************************************************************************
 * Copyright (c) 2000, 2006 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *     David Saff (saff@mit.edu) - bug 102632: [JUnit] Support for JUnit 4.
 *******************************************************************************/
package net.sf.j2s.ui.launching;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.debug.core.DebugPlugin;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.debug.core.ILaunchConfigurationType;
import org.eclipse.debug.core.ILaunchConfigurationWorkingCopy;
import org.eclipse.debug.core.ILaunchManager;
import org.eclipse.debug.core.Launch;
import org.eclipse.debug.core.model.ISourceLocator;
import org.eclipse.debug.core.model.IStackFrame;
import org.eclipse.debug.ui.DebugUITools;
import org.eclipse.debug.ui.IDebugModelPresentation;
import org.eclipse.debug.ui.ILaunchShortcut;
import org.eclipse.jdt.core.IJavaElement;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.IMethod;
import org.eclipse.jdt.core.IType;
import org.eclipse.jdt.internal.junit.launcher.AssertionVMArg;
import org.eclipse.jdt.internal.junit.launcher.JUnitBaseLaunchConfiguration;
import org.eclipse.jdt.internal.junit.launcher.JUnitLaunchShortcut;
import org.eclipse.jdt.internal.junit.launcher.TestKindRegistry;
import org.eclipse.jdt.internal.junit.ui.JUnitMessages;
import org.eclipse.jdt.internal.junit.ui.JUnitPlugin;
import org.eclipse.jdt.internal.junit.util.TestSearchEngine;
import org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants;
import org.eclipse.jdt.ui.JavaElementLabelProvider;
import org.eclipse.jdt.ui.JavaElementLabels;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.jface.window.Window;
import org.eclipse.ui.IEditorInput;
import org.eclipse.ui.IEditorPart;
import org.eclipse.ui.dialogs.ElementListSelectionDialog;

public class J2SUnitLaunchShortcut implements ILaunchShortcut {
	public class LaunchCancelledByUserException extends Exception {
		private static final long serialVersionUID= 1L;
	}

	/**
	 * @see ILaunchShortcut#launch(IEditorPart, String)
	 */
	public void launch(IEditorPart editor, String mode) {
		IJavaElement element= null;
		IEditorInput input= editor.getEditorInput();
		element= (IJavaElement) input.getAdapter(IJavaElement.class);

		if (element != null) {
			searchAndLaunch(new Object[] { element }, mode);
		}
	}

	/**
	 * @see ILaunchShortcut#launch(ISelection, String)
	 */
	public void launch(ISelection selection, String mode) {
		if (selection instanceof IStructuredSelection) {
			searchAndLaunch( ((IStructuredSelection) selection).toArray(), mode);
		}
	}

	protected void searchAndLaunch(Object[] search, String mode) {
		try {
			if (search != null) {
				if (search.length == 0) {
					MessageDialog.openInformation(JUnitPlugin.getActiveWorkbenchShell(), JUnitMessages.LaunchTestAction_dialog_title,
							JUnitMessages.LaunchTestAction_message_notests);
					return;
				}
				if (search[0] instanceof IJavaElement) {
					IJavaElement element= (IJavaElement) search[0];
					if (element.getElementType() < IJavaElement.COMPILATION_UNIT) {
						launch(mode, describeContainerLaunch(element));
						return;
					}
					if (element.getElementType() == IJavaElement.METHOD) {
						launch(mode, describeMethodLaunch( ((IMethod) element)));
						return;
					}
					// launch a CU or type
					launchType(element, mode);
				}
			}
		} catch (LaunchCancelledByUserException e) {
			// OK, silently move on
		}
	}

	protected void launchType(IJavaElement search, String mode) {
		IType[] types= null;
		try {
			types= TestSearchEngine.findTests(new Object[] { search });
		} catch (InterruptedException e) {
			JUnitPlugin.log(e);
			return;
		} catch (InvocationTargetException e) {
			JUnitPlugin.log(e);
			return;
		}
		IType type= null;
		if (types.length == 0) {
			MessageDialog.openInformation(JUnitPlugin.getActiveWorkbenchShell(), JUnitMessages.LaunchTestAction_dialog_title,
					JUnitMessages.LaunchTestAction_message_notests);
		} else if (types.length > 1) {
			type= chooseType(types, mode);
		} else {
			type= types[0];
		}
		if (type != null) {
			try {
				launch(mode, describeTypeLaunch(type));
			} catch (LaunchCancelledByUserException e) {
				// OK, silently move on
			}
		}
	}

	private void launch(String mode, JUnitLaunchDescription description) throws LaunchCancelledByUserException {
		ILaunchConfiguration config= findOrCreateLaunchConfiguration(mode, this, description);

		if (config != null) {
			try {
				DebugPlugin.getDefault().getLaunchManager().addLaunch(new Launch(config, mode, new ISourceLocator() {
					public Object getSourceElement(IStackFrame stackFrame) {
						// TODO Auto-generated method stub
						return null;
					}
				}));
				J2SUnitLaunchingUtil.launchingJ2SUnit(config);
			} catch (CoreException e) {
				e.printStackTrace();
			}
			DebugUITools.launch(config, mode);
		}
	}

	public JUnitLaunchDescription describeContainerLaunch(IJavaElement container) {
		JUnitLaunchDescription description= new JUnitLaunchDescription(container, getContainerLabel(container));
		description.setContainer(container.getHandleIdentifier());
		description.setTestKind(TestKindRegistry.getContainerTestKindId(container));
		return description;
	}

	protected String getContainerLabel(IJavaElement container) {
		String name= JavaElementLabels.getTextLabel(container, JavaElementLabels.ALL_FULLY_QUALIFIED);
		return name.substring(name.lastIndexOf(IPath.SEPARATOR) + 1);
	}

	public JUnitLaunchDescription describeTypeLaunch(IType type) {
		JUnitLaunchDescription description= new JUnitLaunchDescription(type, type.getElementName());
		description.setMainType(type);
		description.setTestKind(TestKindRegistry.getContainerTestKindId(type));
		return description;
	}

	public JUnitLaunchDescription describeMethodLaunch(IMethod method) {
		IType declaringType= method.getDeclaringType();

		String name= declaringType.getElementName() + "." + method.getElementName(); //$NON-NLS-1$
		JUnitLaunchDescription description= new JUnitLaunchDescription(method, name);
		description.setMainType(declaringType);
		description.setTestName(method.getElementName());
		description.setTestKind(TestKindRegistry.getContainerTestKindId(method));
		return description;
	}

	public ILaunchConfiguration findOrCreateLaunchConfiguration(String mode, J2SUnitLaunchShortcut registry, JUnitLaunchDescription description)
			throws LaunchCancelledByUserException {
		ILaunchConfiguration config= registry.findLaunchConfiguration(mode, description);

		if (config == null) {
			config= registry.createConfiguration(description);
		}
		return config;
	}

	/**
	 * Prompts the user to select a type
	 * 
	 * @param types
	 * @param mode
	 * @return the selected type or <code>null</code> if none.
	 */
	protected IType chooseType(IType[] types, String mode) {
		ElementListSelectionDialog dialog= new ElementListSelectionDialog(JUnitPlugin.getActiveWorkbenchShell(), new JavaElementLabelProvider(
				JavaElementLabelProvider.SHOW_POST_QUALIFIED));
		dialog.setElements(types);
		dialog.setTitle(JUnitMessages.LaunchTestAction_dialog_title2);
		if (mode.equals(ILaunchManager.DEBUG_MODE)) {
			dialog.setMessage(JUnitMessages.LaunchTestAction_message_selectTestToRun);
		} else {
			dialog.setMessage(JUnitMessages.LaunchTestAction_message_selectTestToDebug);
		}
		dialog.setMultipleSelection(false);
		if (dialog.open() == Window.OK) {
			return (IType) dialog.getFirstResult();
		}
		return null;
	}

	protected ILaunchManager getLaunchManager() {
		return DebugPlugin.getDefault().getLaunchManager();
	}

	/**
	 * Show a selection dialog that allows the user to choose one of the
	 * specified launch configurations. Return the chosen config, or
	 * <code>null</code> if the user cancelled the dialog.
	 * 
	 * @param configList
	 * @param mode
	 * @return ILaunchConfiguration
	 * @throws LaunchCancelledByUserException
	 */
	protected ILaunchConfiguration chooseConfiguration(List configList, String mode) throws LaunchCancelledByUserException {
		IDebugModelPresentation labelProvider= DebugUITools.newDebugModelPresentation();
		ElementListSelectionDialog dialog= new ElementListSelectionDialog(JUnitPlugin.getActiveWorkbenchShell(), labelProvider);
		dialog.setElements(configList.toArray());
		dialog.setTitle(JUnitMessages.LaunchTestAction_message_selectConfiguration);
		if (mode.equals(ILaunchManager.DEBUG_MODE)) {
			dialog.setMessage(JUnitMessages.LaunchTestAction_message_selectDebugConfiguration);
		} else {
			dialog.setMessage(JUnitMessages.LaunchTestAction_message_selectRunConfiguration);
		}
		dialog.setMultipleSelection(false);
		int result= dialog.open();
		labelProvider.dispose();
		if (result == Window.OK) {
			return (ILaunchConfiguration) dialog.getFirstResult();
		}
		throw new LaunchCancelledByUserException();
	}

	public ILaunchConfiguration createConfiguration(JUnitLaunchDescription description) {
		String mainType= description.getAttribute(IJavaLaunchConfigurationConstants.ATTR_MAIN_TYPE_NAME);
		String testName= description.getAttribute(JUnitBaseLaunchConfiguration.TESTNAME_ATTR);
		ILaunchConfiguration config= createConfiguration(description.getProject(), description.getName(), mainType, description.getContainer(), testName);
		
		try {
			ILaunchConfigurationWorkingCopy wc= config.getWorkingCopy();
			String testKind= description.getAttribute(JUnitBaseLaunchConfiguration.TEST_KIND_ATTR);
			wc.setAttribute(JUnitBaseLaunchConfiguration.TEST_KIND_ATTR, testKind);
			config= wc.doSave();
		} catch (CoreException ce) {
			JUnitPlugin.log(ce);
		}
		return config;
	}

	/*
	 * Overridden by org.eclipse.pde.internal.ui.launcher.JUnitWorkbenchShortcut; don't remove!
	 */
	protected ILaunchConfiguration createConfiguration(IJavaProject project, String name, String mainType, String container, String testName) {
		ILaunchConfiguration config= null;
		try {
			ILaunchConfigurationWorkingCopy wc= newWorkingCopy(name);
			wc.setAttribute(IJavaLaunchConfigurationConstants.ATTR_MAIN_TYPE_NAME, mainType);
			wc.setAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, project.getElementName());
			wc.setAttribute(JUnitBaseLaunchConfiguration.ATTR_KEEPRUNNING, false);
			wc.setAttribute(JUnitBaseLaunchConfiguration.LAUNCH_CONTAINER_ATTR, container);
			if (testName.length() > 0)
				wc.setAttribute(JUnitBaseLaunchConfiguration.TESTNAME_ATTR, testName);	
			AssertionVMArg.setArgDefault(wc);
			config= wc.doSave();		
		} catch (CoreException ce) {
			JUnitPlugin.log(ce);
		}
		return config;
	}

	protected ILaunchConfigurationWorkingCopy newWorkingCopy(String name) throws CoreException {
		ILaunchConfigurationType configType= getJUnitLaunchConfigType();
		return configType.newInstance(null, getLaunchManager().generateUniqueLaunchConfigurationNameFrom(name));
	}

	/**
	 * Returns the local java launch config type
	 * 
	 * @return ILaunchConfigurationType
	 */
	protected ILaunchConfigurationType getJUnitLaunchConfigType() {
		ILaunchManager lm= getLaunchManager();
		//return lm.getLaunchConfigurationType(JUnitLaunchConfiguration.ID_JUNIT_APPLICATION);
		return lm.getLaunchConfigurationType("net.sf.j2s.ui.launching.j2sUnit");		
	}

	public ILaunchConfiguration findLaunchConfiguration(String mode, JUnitLaunchDescription description) throws LaunchCancelledByUserException {
		ILaunchConfigurationType configType= getJUnitLaunchConfigType();
		List candidateConfigs= Collections.EMPTY_LIST;
		try {
			ILaunchConfiguration[] configs= getLaunchManager().getLaunchConfigurations(configType);
			candidateConfigs= new ArrayList(configs.length);
			for (int i= 0; i < configs.length; i++) {
				ILaunchConfiguration config= configs[i];
				if (description.attributesMatch(config)) {
					candidateConfigs.add(config);
				}
			}
		} catch (CoreException e) {
			JUnitPlugin.log(e);
		}

		// If there are no existing configs associated with the IType, create
		// one.
		// If there is exactly one config associated with the IType, return it.
		// Otherwise, if there is more than one config associated with the
		// IType, prompt the
		// user to choose one.
		int candidateCount= candidateConfigs.size();
		if (candidateCount < 1) {
			return null;
		} else if (candidateCount == 1) {
			return (ILaunchConfiguration) candidateConfigs.get(0);
		} else {
			// Prompt the user to choose a config. A null result means the user
			// cancelled the dialog, in which case this method returns null,
			// since cancelling the dialog should also cancel launching
			// anything.
			ILaunchConfiguration config= chooseConfiguration(candidateConfigs, mode);
			if (config != null) {
				return config;
			}
		}
		return null;
	}
}