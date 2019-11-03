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
package org.eclipse.core.runtime.adaptor;

import java.util.Date;
import org.eclipse.osgi.service.resolver.*;
import org.eclipse.osgi.util.NLS;

public class EclipseAdaptorMsg extends NLS {
	private static final String BUNDLE_NAME = "org.eclipse.core.runtime.adaptor.EclipseAdaptorMessages"; //$NON-NLS-1$

	public static String ECLIPSE_MISSING_IMPORTED_PACKAGE;
	public static String ECLIPSE_MISSING_OPTIONAL_REQUIRED_BUNDLE;
	public static String ECLIPSE_MISSING_REQUIRED_BUNDLE;
	public static String ECLIPSE_MISSING_HOST;
	public static String ECLIPSE_CANNOT_CHANGE_LOCATION;
	public static String ECLIPSE_BUNDLESTOPPER_CYCLES_FOUND;
	public static String ECLIPSE_BUNDLESTOPPER_ERROR_STOPPING_BUNDLE;
	public static String ECLIPSE_CACHEDMANIFEST_UNEXPECTED_EXCEPTION;

	public static String fileManager_cannotLock;
	public static String fileManager_couldNotSave;
	public static String fileManager_updateFailed;
	public static String fileManager_illegalInReadOnlyMode;
	public static String fileManager_notOpen;

	public static String ECLIPSE_ADAPTOR_ERROR_XML_SERVICE;
	public static String ECLIPSE_ADAPTOR_RUNTIME_ERROR;
	public static String ECLIPSE_ADAPTOR_EXITING;

	public static String ECLIPSE_DATA_MANIFEST_NOT_FOUND;
	public static String ECLIPSE_CONVERTER_ERROR_CONVERTING;
	public static String ECLIPSE_DATA_ERROR_READING_MANIFEST;
	public static String ECLIPSE_CLASSLOADER_CANNOT_GET_HEADERS;

	public static String ECLIPSE_CLASSLOADER_CONCURRENT_STARTUP;
	public static String ECLIPSE_CLASSLOADER_ACTIVATION;
	public static String ECLIPSE_CLASSLOADER_ALREADY_STOPPED;
	public static String ECLIPSE_CLASSLOADER_GENERATED_EXCEPTION;
	public static String ECLIPSE_CLASSLOADER_CANNOT_SET_CONTEXTFINDER;
	
	public static String ECLIPSE_CONSOLE_COMMANDS_HEADER;
	public static String ECLIPSE_CONSOLE_HELP_DIAG_COMMAND_DESCRIPTION;
	public static String ECLIPSE_CONSOLE_HELP_ACTIVE_COMMAND_DESCRIPTION;
	public static String ECLIPSE_CONSOLE_HELP_GETPROP_COMMAND_DESCRIPTION;
	public static String ECLIPSE_CONSOLE_NO_BUNDLE_SPECIFIED_ERROR;
	public static String ECLIPSE_CONSOLE_NO_CONSTRAINTS_NO_PLATFORM_ADMIN_MESSAGE;
	public static String ECLIPSE_CONSOLE_CANNOT_FIND_BUNDLE_ERROR;
	public static String ECLIPSE_CONSOLE_NO_CONSTRAINTS;
	public static String ECLIPSE_CONSOLE_OTHER_VERSION;
	public static String ECLIPSE_CONSOLE_BUNDLES_ACTIVE;

	public static String ECLIPSE_STARTUP_ALREADY_RUNNING;
	public static String ECLIPSE_STARTUP_STARTUP_ERROR;
	public static String ECLIPSE_STARTUP_SHUTDOWN_ERROR;
	public static String ECLIPSE_STARTUP_ERROR_CHECK_LOG;
	public static String ECLIPSE_STARTUP_NOT_RUNNING;
	public static String ECLIPSE_STARTUP_ERROR_NO_APPLICATION;
	public static String ECLIPSE_STARTUP_ERROR_BUNDLE_NOT_ACTIVE;
	public static String ECLIPSE_STARTUP_ERROR_BUNDLE_NOT_RESOLVED;
	public static String ECLIPSE_STARTUP_BUNDLE_NOT_FOUND;
	public static String ECLIPSE_STARTUP_INVALID_PORT;
	public static String ECLIPSE_STARTUP_FAILED_FIND;
	public static String ECLIPSE_STARTUP_FAILED_UNINSTALL;
	public static String ECLIPSE_STARTUP_FAILED_INSTALL;
	public static String ECLIPSE_STARTUP_FAILED_START;
	public static String ECLIPSE_STARTUP_APP_ERROR;
	public static String ECLIPSE_STARTUP_FILEMANAGER_OPEN_ERROR;

	public static String error_badNL;

	public static String location_cannotLock;
	public static String location_cannotLockNIO;

	public static String ECLIPSE_CONVERTER_FILENOTFOUND;
	public static String ECLIPSE_CONVERTER_ERROR_CREATING_BUNDLE_MANIFEST;
	public static String ECLIPSE_CONVERTER_PLUGIN_LIBRARY_IGNORED;

	public static String ECLIPSE_CONVERTER_ERROR_PARSING_PLUGIN_MANIFEST;
	public static String ECLIPSE_CONVERTER_MISSING_ATTRIBUTE;
	public static String parse_error;
	public static String parse_errorNameLineColumn;

	public static String ECLIPSE_CONVERTER_NO_SAX_FACTORY;
	public static String ECLIPSE_CONVERTER_PARSE_UNKNOWNTOP_ELEMENT;

	public static final String NEW_LINE = System.getProperty("line.separator", "\n"); //$NON-NLS-1$ //$NON-NLS-2$

	static {
		// initialize resource bundles
		NLS.initializeMessages(BUNDLE_NAME, EclipseAdaptorMsg.class);
	}

	public static String getResolutionFailureMessage(VersionConstraint unsatisfied) {
		if (unsatisfied.isResolved())
			throw new IllegalArgumentException();
		if (unsatisfied instanceof ImportPackageSpecification)
			return NLS.bind(ECLIPSE_MISSING_IMPORTED_PACKAGE, toString(unsatisfied));
		else if (unsatisfied instanceof BundleSpecification)
			if (((BundleSpecification) unsatisfied).isOptional())
				return NLS.bind(ECLIPSE_MISSING_OPTIONAL_REQUIRED_BUNDLE, toString(unsatisfied));
			else
				return NLS.bind(ECLIPSE_MISSING_REQUIRED_BUNDLE, toString(unsatisfied));
		else
			return NLS.bind(ECLIPSE_MISSING_HOST, toString(unsatisfied));
	}

	/**
	 * Print a debug message to the console. 
	 * Pre-pend the message with the current date and the name of the current thread.
	 */
	public static void debug(String message) {
		StringBuffer buffer = new StringBuffer();
		buffer.append(new Date(System.currentTimeMillis()));
		buffer.append(" - ["); //$NON-NLS-1$
		buffer.append(Thread.currentThread().getName());
		buffer.append("] "); //$NON-NLS-1$
		buffer.append(message);
		System.out.println(buffer.toString());
	}

	private static String toString(VersionConstraint constraint) {
		org.eclipse.osgi.service.resolver.VersionRange versionRange = constraint.getVersionRange();
		if (versionRange == null)
			return constraint.getName();
		return constraint.getName() + '_' + versionRange;
	}
}