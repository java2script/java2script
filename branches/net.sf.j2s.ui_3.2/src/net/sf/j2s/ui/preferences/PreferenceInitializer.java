/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.ui.preferences;

import org.eclipse.core.runtime.preferences.AbstractPreferenceInitializer;
import org.eclipse.jface.preference.IPreferenceStore;

import net.sf.j2s.ui.Java2ScriptUIPlugin;

/**
 * @author Zhou Renjian
 * 
 * 2007-3-4
 * 
 * Class used to initialize default preference values.
 */
public class PreferenceInitializer extends AbstractPreferenceInitializer {

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.eclipse.core.runtime.preferences.AbstractPreferenceInitializer#initializeDefaultPreferences()
	 */
	public void initializeDefaultPreferences() {
		IPreferenceStore store = Java2ScriptUIPlugin.getDefault()
				.getPreferenceStore();
		store.setDefault(PreferenceConstants.INNER_CONSOLE, true);
		store.setDefault(PreferenceConstants.ADDON_COMPATIABLE, true);
//		store.setDefault(PreferenceConstants.P_STRING,
//				"Default value");
	}

}
