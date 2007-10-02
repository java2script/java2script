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

 
import org.eclipse.debug.core.ILaunchConfigurationWorkingCopy;
import org.eclipse.debug.ui.AbstractLaunchConfigurationTabGroup;
import org.eclipse.debug.ui.ILaunchConfigurationDialog;
import org.eclipse.debug.ui.ILaunchConfigurationTab;
import org.eclipse.debug.ui.ILaunchConfigurationTabGroup;
import org.eclipse.jdt.internal.junit.launcher.AssertionVMArg;
import org.eclipse.jdt.junit.launcher.JUnitLaunchConfigurationTab;

 
public class J2SUnitTabGroup extends AbstractLaunchConfigurationTabGroup {
	/**
	 * @see ILaunchConfigurationTabGroup#createTabs(ILaunchConfigurationDialog, String)
	 */
	public void createTabs(ILaunchConfigurationDialog dialog, String mode) {		
//		ILaunchConfigurationTab[] tabs= new ILaunchConfigurationTab[] {
//			new JUnitMainTab(),
//			new JavaArgumentsTab(),
//			new JavaClasspathTab(),
//			new JavaJRETab(),
//			new SourceLookupTab(),
//			new EnvironmentTab(),
//			new CommonTab()
//		};
		ILaunchConfigurationTab[] tabs = new ILaunchConfigurationTab[]{new JUnitLaunchConfigurationTab(),
				new J2SArgumentsTab(),
				new J2SClasspathOptionTab(), 
				new J2SGenerateHTMLOptionsTab(),
				new J2SConsoleOptionsTab()
		};
		setTabs(tabs);
	}

	/**
	 * @see ILaunchConfigurationTabGroup#setDefaults(ILaunchConfigurationWorkingCopy)
	 */
	public void setDefaults(ILaunchConfigurationWorkingCopy config) {
		super.setDefaults(config); 
		AssertionVMArg.setArgDefault(config);
	}
}
