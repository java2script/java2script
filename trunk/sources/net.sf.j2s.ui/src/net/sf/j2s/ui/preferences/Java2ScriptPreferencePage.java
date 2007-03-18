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

import org.eclipse.jface.preference.*;
import org.eclipse.ui.IWorkbenchPreferencePage;
import org.eclipse.ui.IWorkbench;
import net.sf.j2s.ui.Java2ScriptUIPlugin;

/**
 * @author Zhou Renjian
 * 
 * 2007-3-4
 * 
 * This class represents a preference page that
 * is contributed to the Preferences dialog. By 
 * subclassing <samp>FieldEditorPreferencePage</samp>, we
 * can use the field support built into JFace that allows
 * us to create a page that is small and knows how to 
 * save, restore and apply itself.
 * <p>
 * This page is used to modify preferences only. They
 * are stored in the preference store that belongs to
 * the main plug-in class. That way, preferences can
 * be accessed directly via the preference store.
 */

public class Java2ScriptPreferencePage
	extends FieldEditorPreferencePage
	implements IWorkbenchPreferencePage {

	public Java2ScriptPreferencePage() {
		super(GRID);
		setPreferenceStore(Java2ScriptUIPlugin.getDefault().getPreferenceStore());
		setDescription("Java2Script's default options");
	}
	
	/**
	 * Creates the field editors. Field editors are abstractions of
	 * the common GUI blocks needed to manipulate various types
	 * of preferences. Each field editor knows how to save and
	 * restore itself.
	 */
	public void createFieldEditors() {
//		addField(new DirectoryFieldEditor(PreferenceConstants.P_PATH, 
//				"&Directory preference:", getFieldEditorParent()));
		addField(
			new RadioGroupFieldEditor(
				PreferenceConstants.INNER_CONSOLE,
				"Console",
				1,
				new String[][] {
						{ "Inner J2S Console", "true" },
						{ "Registered external browsers, like Firefox, IE", "false" }
				},
				getFieldEditorParent(), true));

		addField(
				new BooleanFieldEditor(
					PreferenceConstants.ADDON_COMPATIABLE,
					"Generate Java2Script applications with Mozilla Add-on supports",
					getFieldEditorParent()));
//		addField(
//			new StringFieldEditor(PreferenceConstants.P_STRING, "A &text preference:", getFieldEditorParent()));
	}

	/* (non-Javadoc)
	 * @see org.eclipse.ui.IWorkbenchPreferencePage#init(org.eclipse.ui.IWorkbench)
	 */
	public void init(IWorkbench workbench) {
	}
	
}