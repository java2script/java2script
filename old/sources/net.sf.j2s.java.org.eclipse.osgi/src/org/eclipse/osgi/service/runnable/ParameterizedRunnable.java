/*******************************************************************************
 * Copyright (c) 2004, 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.osgi.service.runnable;

/**
 * Like a {@link java.lang.Runnable}, an object which captures a block of code which can 
 * be passed around and executed.  Unlike standard runnables, paramaterized 
 * runnables allow an arbitrary {@link java.lang.Object} to be passed in when the 
 * block is evaluated.
 * <p>
 * Clients may implement this interface.
 * </p>
 * @since 3.0
 */
public interface ParameterizedRunnable {

	/**
	 * Executes the block of code encapsulated by this runnable in the context of
	 * the given object and returns the result.  The result may be <code>null</code>.
	 * 
	 * @param context the context for evaluating the runnable
	 * @return the result of evaluating the runnable in the given context
	 * @throws Exception if there is a problem running this runnable
	 */
	public Object run(Object context) throws Exception;
}
