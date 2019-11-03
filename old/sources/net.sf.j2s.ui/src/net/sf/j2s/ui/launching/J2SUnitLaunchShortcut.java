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

import org.eclipse.jdt.junit.launcher.JUnitLaunchShortcut;

/**
 * The launch shortcut to launch JUnit tests.
 * 
 * <p>
 * This class may be instantiated and subclassed.
 * </p>
 * @since 3.3
 */
public class J2SUnitLaunchShortcut extends JUnitLaunchShortcut {

	/**
	 * Default constructor.
	 */
	public J2SUnitLaunchShortcut() {
	}
	
	/**
	 * Returns the launch configuration type id of the launch configuration this shortcut will create. Clients can override this method to
	 * return the id of their launch configuration.
	 * 
	 * @return the launch configuration type id of the launch configuration this shortcut will create
	 */
	protected String getLaunchConfigurationTypeId() {
		//return JUnitLaunchConfigurationConstants.ID_JUNIT_APPLICATION;
		return "net.sf.j2s.ui.launching.j2sUnit";
	}
}
