/*******************************************************************************
 * Copyright (c) 2000, 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * 
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package net.sf.j2s.ui.classpathviewer.actions;


import net.sf.j2s.ui.classpathviewer.IRuntimeClasspathEntry;
import net.sf.j2s.ui.classpathviewer.viewer.IClasspathViewer;
import net.sf.j2s.ui.classpathviewer.viewer.JavaRuntime;

import org.eclipse.debug.ui.StringVariableSelectionDialog;
import org.eclipse.jdt.debug.ui.IJavaDebugUIConstants;
import org.eclipse.jdt.internal.debug.ui.DialogSettingsHelper;
import org.eclipse.jdt.internal.debug.ui.actions.RuntimeClasspathAction;
import org.eclipse.jdt.internal.debug.ui.launcher.LauncherMessages;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.dialogs.Dialog;
import org.eclipse.jface.dialogs.IDialogConstants;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Text;

/**
 * Dialog of radio buttons/actions for advanced classpath options.
 */
public class RuntimeClasspathAdvancedDialog extends Dialog {

	private IAction[] fActions;
	private Button[] fButtons;	
	
	private IClasspathViewer fViewer;
	private Button fAddVariableStringButton;
	private Text fVariableString;

	/**
	 * Constructs a new dialog on the given shell, with the specified
	 * set of actions.
	 * 
	 * @param parentShell
	 * @param actions advanced actions
	 */
	public RuntimeClasspathAdvancedDialog(Shell parentShell, IAction[] actions, IClasspathViewer viewer) {
		super(parentShell);
		setShellStyle(SWT.RESIZE | getShellStyle());
		fActions = actions;
		fViewer = viewer;
	}

	/**
	 * @see Dialog#createDialogArea(Composite)
	 */
	protected Control createDialogArea(Composite parent) {
		Composite inner= new Composite(parent, SWT.NONE);
		GridLayout layout= new GridLayout();
		inner.setLayout(layout);
		
		GridData gd = new GridData(GridData.FILL_BOTH);
		inner.setLayoutData(gd);
		
		Label l = new Label(inner, SWT.NONE);
		l.setText(LauncherMessages.RuntimeClasspathAdvancedDialog_Select_an_advanced_option__1); //$NON-NLS-1$
		gd = new GridData(GridData.FILL_HORIZONTAL);
		l.setLayoutData(gd);
		
		fButtons = new Button[fActions.length];
		for (int i = 0; i < fActions.length; i++) {
			IAction action= fActions[i];
			fButtons[i] = new Button(inner, SWT.RADIO);
			fButtons[i].setText(action.getText());
			fButtons[i].setData(action);
			fButtons[i].setEnabled(action.isEnabled());
			fButtons[i].setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
		}
		
		addVariableStringComposite(inner);

		getShell().setText(LauncherMessages.RuntimeClasspathAdvancedDialog_Advanced_Options_1); //$NON-NLS-1$
		
		Dialog.applyDialogFont(parent);
		return inner;
	}

	private void addVariableStringComposite(Composite composite) {
		fAddVariableStringButton = new Button(composite, SWT.RADIO);
		fAddVariableStringButton.setText(LauncherMessages.RuntimeClasspathAdvancedDialog_6); //$NON-NLS-1$
		GridData gd = new GridData(GridData.FILL_HORIZONTAL);
		fAddVariableStringButton.setLayoutData(gd);
		
		final Composite inner = new Composite(composite, SWT.NONE);
		inner.setLayout(new GridLayout(2, false));
		inner.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
		
		fVariableString = new Text(inner, SWT.SINGLE | SWT.BORDER);
		gd = new GridData(GridData.FILL_HORIZONTAL);
		gd.grabExcessHorizontalSpace = true;
		fVariableString.setLayoutData(gd);
		
		final Button fVariablesButton = createButton(inner, IDialogConstants.IGNORE_ID, LauncherMessages.RuntimeClasspathAdvancedDialog_7, false); //$NON-NLS-1$
		gd = new GridData(GridData.HORIZONTAL_ALIGN_BEGINNING);
		fVariablesButton.setLayoutData(gd);
		
		fVariablesButton.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				StringVariableSelectionDialog dialog = new StringVariableSelectionDialog(getShell());
				dialog.open();
				String variable = dialog.getVariableExpression();
				if (variable != null) {
					fVariableString.insert(variable);
				}
			}
		});
		
		fAddVariableStringButton.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				boolean enabled = fAddVariableStringButton.getSelection();
				fVariableString.setEnabled(enabled);
				fVariablesButton.setEnabled(enabled);
			}
		});
		//set initial state
		boolean enabled = fAddVariableStringButton.getSelection();
		fVariableString.setEnabled(enabled);
		fVariablesButton.setEnabled(enabled);
	}

	/**
	 * @see Dialog#okPressed()
	 */
	protected void okPressed() {
		if (fAddVariableStringButton.getSelection()) {
			String varString = fVariableString.getText().trim();
			if (varString.length() > 0) {
				IRuntimeClasspathEntry entry = JavaRuntime.newStringVariableClasspathEntry(varString);
				fViewer.addEntries(new IRuntimeClasspathEntry[] {entry});
			}
		} else {
			for (int i = 0; i < fButtons.length; i++) {
				if (fButtons[i].getSelection()) {
					IAction action = (IAction)fButtons[i].getData();
					if (action instanceof RuntimeClasspathAction) {
						((RuntimeClasspathAction)action).setShell(getShell());
					}
					action.run();
					break;
				}
			}
		}
		super.okPressed();
	}
		
	protected String getDialogSettingsSectionName() {
		return IJavaDebugUIConstants.PLUGIN_ID + ".RUNTIME_CLASSPATH_ADVANCED_DIALOG"; //$NON-NLS-1$
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.jface.window.Window#getInitialSize()
	 */
	protected Point getInitialSize() {
		return DialogSettingsHelper.getInitialSize(getDialogSettingsSectionName(), super.getInitialSize());
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.jface.window.Window#getInitialLocation(org.eclipse.swt.graphics.Point)
	 */
	protected Point getInitialLocation(Point initialSize) {
		Point point = DialogSettingsHelper.getInitialLocation(getDialogSettingsSectionName());
		return point != null ? point : super.getInitialLocation(initialSize);
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.jface.window.Window#close()
	 */
	public boolean close() {
		DialogSettingsHelper.persistShellGeometry(getShell(), getDialogSettingsSectionName());
		return super.close();
	}

}
