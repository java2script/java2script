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


import net.sf.j2s.ui.classpathviewer.viewer.IClasspathViewer;

import org.eclipse.jdt.internal.debug.ui.actions.ActionMessages;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.dialogs.Dialog;

/**
 * Opens a dialog to allow the user to choose among advanced actions.
 */
public class AddAdvancedAction extends RuntimeClasspathAction {
	
	private IAction[] fActions;

	public AddAdvancedAction(IClasspathViewer viewer, IAction[] actions) {
		super(ActionMessages.AddAdvancedAction_Ad_vanced____1, viewer); //$NON-NLS-1$
		fActions = actions;
		setViewer(viewer);
	}	

	/**
	 * Prompts for a project to add.
	 * 
	 * @see IAction#run()
	 */	
	public void run() {
		Dialog dialog = new RuntimeClasspathAdvancedDialog(getShell(), fActions, getViewer());
		dialog.open();			
	}
		
	/**
	 * @see RuntimeClasspathAction#setViewer(RuntimeClasspathViewer)
	 */
	public void setViewer(IClasspathViewer viewer) {
		super.setViewer(viewer);
		if (fActions != null) {
			for (int i = 0; i < fActions.length; i++) {
				if (fActions[i] instanceof RuntimeClasspathAction) {
					((RuntimeClasspathAction)fActions[i]).setViewer(viewer);
				}
			}
		}
	}
	
	protected int getActionType() {
		return ADD;
	}
}
