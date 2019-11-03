/*******************************************************************************
 * Copyright (c) 2003, 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.osgi.service.environment;

/**
 * A Framework service which gives access to the command line used to start
 * this running framework as well as information about the environment
 * such as the current operating system, machine architecture, locale and 
 * windowing system.
 * <p>
 * This interface is not intended to be implemented by clients.
 * </p>
 * 
 * @since 3.0
 */
public interface EnvironmentInfo {

	/**
	 * Returns all command line arguments specified when the running framework was started.
	 * 
	 * @return the array of command line arguments.
	 */
	public String[] getCommandLineArgs();

	/**
	 * Returns the arguments consumed by the framework implementation itself.  Which
	 * arguments are consumed is implementation specific.
	 * 
	 * @return the array of command line arguments consumed by the framework.
	 */
	public String[] getFrameworkArgs();

	/**
	 * Returns the arguments not consumed by the framework implementation itself.  Which
	 * arguments are consumed is implementation specific.
	 * 
	 * @return the array of command line arguments not consumed by the framework.
	 */
	public String[] getNonFrameworkArgs();

	/**
	 * Returns the string name of the current system architecture.  
	 * The value is a user-defined string if the architecture is 
	 * specified on the command line, otherwise it is the value 
	 * returned by <code>java.lang.System.getProperty("os.arch")</code>.
	 * 
	 * @return the string name of the current system architecture
	 */
	public String getOSArch();

	/**
	 * Returns the string name of the current locale for use in finding files
	 * whose path starts with <code>$nl$</code>.
	 *
	 * @return the string name of the current locale
	 */
	public String getNL();

	/**
	 * Returns the string name of the current operating system for use in finding
	 * files whose path starts with <code>$os$</code>.  Return {@link Constants#OS_UNKNOWN} 
	 * if the operating system cannot be determined.
	 * <p>  
	 * The value may indicate one of the operating systems known to the platform
	 * (as specified in <code>org.eclipse.core.runtime.Platform#knownOSValues</code>) 
	 * or a user-defined string if the operating system name is specified on the command line.
	 * </p>
	 *
	 * @return the string name of the current operating system
	 */
	public String getOS();

	/**
	 * Returns the string name of the current window system for use in finding files
	 * whose path starts with <code>$ws$</code>.  Return <code>null</code>
	 * if the window system cannot be determined.
	 *
	 * @return the string name of the current window system or <code>null</code>
	 */
	public String getWS();

	/**
	 * Returns <code>true</code> if the framework is in debug mode and
	 * <code>false</code> otherwise.
	 * 
	 * @return whether or not the framework is in debug mode
	 */
	public boolean inDebugMode();

	/**
	 * Returns <code>true</code> if the framework is in development mode
	 * and <code>false</code> otherwise.
	 * 
	 * @return whether or not the framework is in development mode
	 */
	public boolean inDevelopmentMode();
}
