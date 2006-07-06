/*******************************************************************************
 * Copyright (c) 2000, 2006 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package net.sf.j2s.ui.launching;

 
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IAdaptable;
import org.eclipse.debug.core.DebugPlugin;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.debug.core.ILaunchConfigurationType;
import org.eclipse.debug.core.ILaunchConfigurationWorkingCopy;
import org.eclipse.debug.core.Launch;
import org.eclipse.debug.core.model.ISourceLocator;
import org.eclipse.debug.core.model.IStackFrame;
import org.eclipse.debug.internal.ui.DebugUIMessages;
import org.eclipse.debug.ui.DebugUITools;
import org.eclipse.jdt.core.IJavaElement;
import org.eclipse.jdt.core.IMember;
import org.eclipse.jdt.core.IType;
import org.eclipse.jdt.core.search.IJavaSearchScope;
import org.eclipse.jdt.core.search.SearchEngine;
import org.eclipse.jdt.internal.debug.ui.launcher.JavaLaunchShortcut;
import org.eclipse.jdt.internal.debug.ui.launcher.LauncherMessages;
import org.eclipse.jdt.internal.debug.ui.launcher.MainMethodSearchEngine;
import org.eclipse.jdt.launching.IJavaLaunchConfigurationConstants;
import org.eclipse.jface.operation.IRunnableContext;

/**
 * Performs single click launching for local Java applications.
 */
public class J2SApplicationLaunchShortcut extends JavaLaunchShortcut {
	
	/**
	 * Returns the Java elements corresponding to the given objects.
	 * 
	 * @param objects selected objects
	 * @return corresponding Java elements
	 */
	private IJavaElement[] getJavaElements(Object[] objects) {
		List list= new ArrayList(objects.length);
		for (int i = 0; i < objects.length; i++) {
			Object object = objects[i];
			if (object instanceof IAdaptable) {
				IJavaElement element = (IJavaElement) ((IAdaptable)object).getAdapter(IJavaElement.class);
				if (element != null) {
					if (element instanceof IMember) {
						// Use the declaring type if available
						IJavaElement type= ((IMember)element).getDeclaringType();
						if (type != null) {
							element= type;
						}
					}
					list.add(element);
				}
			}
		}
		return (IJavaElement[]) list.toArray(new IJavaElement[list.size()]);
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.internal.debug.ui.launcher.JavaLaunchShortcut#createConfiguration(org.eclipse.jdt.core.IType)
	 */
	protected ILaunchConfiguration createConfiguration(IType type) {
		ILaunchConfiguration config = null;
		ILaunchConfigurationWorkingCopy wc = null;
		try {
			ILaunchConfigurationType configType = getConfigurationType();
			wc = configType.newInstance(null, getLaunchManager().generateUniqueLaunchConfigurationNameFrom(type.getElementName()));
			wc.setAttribute(IJavaLaunchConfigurationConstants.ATTR_MAIN_TYPE_NAME, type.getFullyQualifiedName());
			wc.setAttribute(IJavaLaunchConfigurationConstants.ATTR_PROJECT_NAME, type.getJavaProject().getElementName());
			wc.setMappedResources(new IResource[] {type.getJavaProject().getProject()});
			config = wc.doSave();
		} catch (CoreException exception) {
			reportErorr(exception);		
		} 
		return config;
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.jdt.internal.debug.ui.launcher.JavaLaunchShortcut#getConfigurationType()
	 */
	protected ILaunchConfigurationType getConfigurationType() {
//		return getLaunchManager().getLaunchConfigurationType(IJavaLaunchConfigurationConstants.ID_JAVA_APPLICATION);		
		return getLaunchManager().getLaunchConfigurationType("net.sf.j2s.ui.launching.j2sApplication");//IJavaLaunchConfigurationConstants.ID_JAVA_APPLICATION);		
	}

	protected IType[] findTypes(Object[] elements, IRunnableContext context) throws InterruptedException, CoreException {
		try {
			IJavaElement[] javaElements = getJavaElements(elements);
			MainMethodSearchEngine engine = new MainMethodSearchEngine();
			IJavaSearchScope scope = SearchEngine.createJavaSearchScope(javaElements, false);
			return engine.searchMainMethods(context, scope, true);
		} catch (InvocationTargetException e) {
			throw (CoreException)e.getTargetException(); 
		}
	}

	/* (non-Javadoc)
	 * @see org.eclipse.jdt.internal.debug.ui.launcher.JavaLaunchShortcut#getTypeSelectionTitle()
	 */
	protected String getTypeSelectionTitle() {
		return LauncherMessages.JavaApplicationLaunchShortcut_0;
	}

	/* (non-Javadoc)
	 * @see org.eclipse.jdt.internal.debug.ui.launcher.JavaLaunchShortcut#getEditorEmptyMessage()
	 */
	protected String getEditorEmptyMessage() {
		return LauncherMessages.JavaApplicationLaunchShortcut_1;
	}

	/* (non-Javadoc)
	 * @see org.eclipse.jdt.internal.debug.ui.launcher.JavaLaunchShortcut#getSelectionEmptyMessage()
	 */
	protected String getSelectionEmptyMessage() {
		return LauncherMessages.JavaApplicationLaunchShortcut_2;
	}
	
	/**
	 * Launches a configuration for the given type
	 */
	protected void launch(IType type, String mode) {
		ILaunchConfiguration config = findLaunchConfiguration(type, getConfigurationType());
		if (config != null) {
			try {
				StringBuffer buffer= new StringBuffer(config.getName());
				buffer.append(DebugUIMessages.DebugUIPlugin_0); //$NON-NLS-1$
				ILaunchConfigurationWorkingCopy workingCopy= config.copy(buffer.toString());
				//workingCopy.setAttribute(ATTR_LAUNCHING_CONFIG_HANDLE, config.getMemento());
				//final ILaunch pendingLaunch= new PendingLaunch(workingCopy, mode, this);
                
				DebugPlugin.getDefault().getLaunchManager().addLaunch(new Launch(config, mode, new ISourceLocator() {
					public Object getSourceElement(IStackFrame stackFrame) {
						// TODO Auto-generated method stub
						return null;
					}
				}));
				J2SLaunchingUtil.launchingJ2SApp(config);
			} catch (CoreException e) {
				e.printStackTrace();
			}
			//DebugUITools.launch(config, mode);
		}			
	}
	
}
