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
package org.eclipse.osgi.service.pluginconversion;

/**
 * Custom exception for errors that can happen during plugin conversion.
 * 
 * @since 3.0
 */
public class PluginConversionException extends Exception {
	private static final long serialVersionUID = 3258130258472284472L;

	/**
	 * Nested exception.
	 */
	private transient Throwable cause;

	/**
	 * Constructor for the class.
	 */
	public PluginConversionException() {
		super();
	}

	/**
	 * Create a new exception with the given message.
	 * 
	 * @param message the message for the exception
	 */
	public PluginConversionException(String message) {
		super(message);
	}

	/**
	 * Create a new exception with the given message and nested exception.
	 * 
	 * @param message the message for the exception
	 * @param cause the nested exception
	 */
	public PluginConversionException(String message, Throwable cause) {
		super(message);
		this.cause = cause;
	}

	/**
	 * Create a new exception with the given nested exception.
	 * 
	 * @param cause the nested exception
	 */
	public PluginConversionException(Throwable cause) {
		this.cause = cause;
	}

	/**
	 * Return the nested exception for this exception or <code>null</code>
	 * if there is none.
	 * 
	 * @return the nested exception or <code>null</code>
	 */
	public Throwable getCause() {
		return cause;
	}
}
