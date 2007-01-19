/*******************************************************************************
 * Copyright (c) 2004 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.core.runtime.internal.adaptor;

import java.util.Enumeration;
import java.util.Properties;
import org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg;
import org.eclipse.osgi.framework.console.CommandInterpreter;
import org.eclipse.osgi.framework.console.CommandProvider;
import org.eclipse.osgi.service.resolver.*;
import org.eclipse.osgi.util.NLS;
import org.osgi.framework.*;

/**
 * Internal class.
 */
public class EclipseCommandProvider implements CommandProvider {
	private BundleContext context;

	public EclipseCommandProvider(BundleContext context) {
		this.context = context;
	}

	public String getHelp() {
		StringBuffer help = new StringBuffer(512);
		help.append(EclipseAdaptorMsg.NEW_LINE);
		help.append("---"); //$NON-NLS-1$
		help.append(EclipseAdaptorMsg.ECLIPSE_CONSOLE_COMMANDS_HEADER);
		help.append("---"); //$NON-NLS-1$
		help.append(EclipseAdaptorMsg.NEW_LINE);
		help.append("\tdiag - " + EclipseAdaptorMsg.ECLIPSE_CONSOLE_HELP_DIAG_COMMAND_DESCRIPTION);//$NON-NLS-1$
		help.append(EclipseAdaptorMsg.NEW_LINE);
		help.append("\tactive - " + EclipseAdaptorMsg.ECLIPSE_CONSOLE_HELP_ACTIVE_COMMAND_DESCRIPTION);//$NON-NLS-1$
		help.append(EclipseAdaptorMsg.NEW_LINE);
		help.append("\tgetprop " + EclipseAdaptorMsg.ECLIPSE_CONSOLE_HELP_GETPROP_COMMAND_DESCRIPTION);//$NON-NLS-1$
		return help.toString();
	}

	private BundleDescription getBundleDescriptionFromToken(State state, String token) {
		try {
			long id = Long.parseLong(token);
			return state.getBundle(id);
		} catch (NumberFormatException nfe) {
			BundleDescription[] allBundles = state.getBundles(token);
			if (allBundles.length > 0)
				return allBundles[0];
		}
		return null;
	}

	public void _diag(CommandInterpreter ci) throws Exception {
		String nextArg = ci.nextArgument();
		if (nextArg == null) {
			ci.println(EclipseAdaptorMsg.ECLIPSE_CONSOLE_NO_BUNDLE_SPECIFIED_ERROR);
			return;
		}
		ServiceReference platformAdminRef = context.getServiceReference(PlatformAdmin.class.getName());
		if (platformAdminRef == null) {
			ci.print("  "); //$NON-NLS-1$
			ci.println(EclipseAdaptorMsg.ECLIPSE_CONSOLE_NO_CONSTRAINTS_NO_PLATFORM_ADMIN_MESSAGE);
			return;
		}
		try {
			PlatformAdmin platformAdmin = (PlatformAdmin) context.getService(platformAdminRef);
			if (platformAdmin == null)
				return;
			State systemState = platformAdmin.getState(false);
			while (nextArg != null) {
				BundleDescription bundle = getBundleDescriptionFromToken(systemState, nextArg);
				if (bundle == null) {
					ci.println(NLS.bind(EclipseAdaptorMsg.ECLIPSE_CONSOLE_CANNOT_FIND_BUNDLE_ERROR, nextArg));
					nextArg = ci.nextArgument();
					continue;
				}
				ci.println(bundle.getLocation() + " [" + bundle.getBundleId() + "]"); //$NON-NLS-1$ //$NON-NLS-2$
				VersionConstraint[] unsatisfied = platformAdmin.getStateHelper().getUnsatisfiedConstraints(bundle);
				if (unsatisfied.length == 0) {
					// init default message
					String message = EclipseAdaptorMsg.ECLIPSE_CONSOLE_NO_CONSTRAINTS; 
					if (!bundle.isResolved()) {
						// another version might have been picked					
						String symbolicName = bundle.getSymbolicName();
						BundleDescription resolved = symbolicName == null ? null : getResolvedBundle(systemState, symbolicName);
						if (resolved != null)
							message = NLS.bind(EclipseAdaptorMsg.ECLIPSE_CONSOLE_OTHER_VERSION, resolved.getLocation()); 
					}
					ci.print("  "); //$NON-NLS-1$
					ci.println(message);//$NON-NLS-1$
				}
				for (int i = 0; i < unsatisfied.length; i++) {
					ci.print("  "); //$NON-NLS-1$
					ci.println(EclipseAdaptorMsg.getResolutionFailureMessage(unsatisfied[i]));
				}
				nextArg = ci.nextArgument();
			}
		} finally {
			context.ungetService(platformAdminRef);
		}
	}

	private BundleDescription getResolvedBundle(State state, String symbolicName) {
		BundleDescription[] homonyms = state.getBundles(symbolicName);
		for (int i = 0; i < homonyms.length; i++)
			if (homonyms[i].isResolved())
				return homonyms[i];
		return null;
	}

	public void _active(CommandInterpreter ci) throws Exception {
		Bundle[] allBundles = context.getBundles();
		int activeCount = 0;
		for (int i = 0; i < allBundles.length; i++)
			if (allBundles[i].getState() == Bundle.ACTIVE) {
				ci.println(allBundles[i]);
				activeCount++;
			}
		ci.print("  "); //$NON-NLS-1$
		ci.println(NLS.bind(EclipseAdaptorMsg.ECLIPSE_CONSOLE_BUNDLES_ACTIVE, String.valueOf(activeCount))); 
	}
	
	public void _getprop(CommandInterpreter ci) throws Exception {
		Properties allProperties = System.getProperties();
		String filter = ci.nextArgument();
		Enumeration propertyNames = allProperties.keys();
		while(propertyNames.hasMoreElements()) {
			String prop = (String) propertyNames.nextElement();
			if (filter == null || prop.startsWith(filter)) {
				ci.println(prop+'='+allProperties.getProperty(prop));
			}
		}
	}
}
