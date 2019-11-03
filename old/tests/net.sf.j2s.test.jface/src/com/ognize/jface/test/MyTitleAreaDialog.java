/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/

package com.ognize.jface.test;

import org.eclipse.jface.dialogs.TitleAreaDialog;
import org.eclipse.swt.SWT;
import org.eclipse.swt.browser.Browser;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Rectangle;
import org.eclipse.swt.layout.FormAttachment;
import org.eclipse.swt.layout.FormData;
import org.eclipse.swt.layout.FormLayout;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.Listener;
import org.eclipse.swt.widgets.Sash;
import org.eclipse.swt.widgets.Shell;

/**
 * @author josson smith
 *
 * 2006-4-28
 */
public class MyTitleAreaDialog extends TitleAreaDialog {

	/**
	 * @param parentShell
	 */
	public MyTitleAreaDialog(Shell parentShell) {
		super(parentShell);
	}
	/* (non-Javadoc)
	 * @see org.eclipse.jface.window.Window#configureShell(org.eclipse.swt.widgets.Shell)
	 */
	protected void configureShell(Shell newShell) {
		super.configureShell(newShell);
	}

	protected Control createDialogArea(Composite parent) {
		setTitle("Select a wizard");
		setMessage("Create a Java project");
		Control area = super.createDialogArea(parent);
		final Composite shell = new Composite((Composite) area, SWT.NONE);
		//shell.handle.style.overflow = "hidden";
		shell.setBackground(new Color(null, 255, 0, 0));
		GridData gridData = new GridData(GridData.FILL_BOTH);
		gridData.heightHint = 280;
		gridData.widthHint = 540;
		shell.setLayoutData(gridData);
		Button button1 = new Button (shell, SWT.PUSH);
		button1.setText ("Button 1");
		final Sash sash = new Sash (shell, SWT.VERTICAL);
//		Button button2 = new Button (shell, SWT.PUSH);
//		button2.setText ("Button 2");
		final Browser button2 = new Browser (shell, SWT.BORDER);
		//button2.setUrl("file:///O:/j2s.sf.net/articles/tutorial-hello-j2s-ajax.html");
		//button2.setText(Math.random() + "");
		
		//button2.setText("Hello " + Math.random());
		
		button1.addSelectionListener(new SelectionAdapter() {
		
			public void widgetSelected(SelectionEvent e) {
				double num = Math.random();
				System.out.println(num);
				if (num > 0.5) {
					button2.setText("Hello " + num);
				} else {
					button2.setText("file:///O:/j2s.sf.net/articles/tutorial-hello-j2s-ajax.html");
				}
			}
		
		});
		final FormLayout form = new FormLayout ();
		shell.setLayout (form);
		
		FormData button1Data = new FormData ();
		button1Data.left = new FormAttachment (0, 0);
		button1Data.right = new FormAttachment (sash, 0);
		button1Data.top = new FormAttachment (0, 0);
		button1Data.bottom = new FormAttachment (100, 0);
		button1.setLayoutData (button1Data);

		final int limit = 20, percent = 50;
		final FormData sashData = new FormData ();
		sashData.left = new FormAttachment (percent, 0);
		sashData.top = new FormAttachment (0, 0);
		sashData.bottom = new FormAttachment (100, 0);
		sash.setLayoutData (sashData);
		sash.addListener (SWT.Selection, new Listener () {
			public void handleEvent (Event e) {
				Rectangle sashRect = sash.getBounds ();
				Rectangle shellRect = shell.getClientArea ();
//				System.out.println(sashRect);
//				System.out.println(shellRect);
				int right = shellRect.width - sashRect.width - limit;
//				System.out.println("right");
//				System.out.println(right);
//				System.out.println(e.x);
				e.x = Math.max (Math.min (e.x, right), limit);
//				System.out.println(e.x);
				if (e.x != sashRect.x)  {
					sashData.left = new FormAttachment (0, e.x);
					shell.layout (false);
				}
			}
		});
		
		FormData button2Data = new FormData ();
		button2Data.left = new FormAttachment (sash, 0);
		button2Data.right = new FormAttachment (100, 0);
		button2Data.top = new FormAttachment (0, 0);
		button2Data.bottom = new FormAttachment (100, 0);
		button2.setLayoutData (button2Data);
		return area;
	}

}
