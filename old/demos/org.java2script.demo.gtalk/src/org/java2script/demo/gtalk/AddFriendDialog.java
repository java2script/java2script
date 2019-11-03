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

package org.java2script.demo.gtalk;

import net.sf.j2s.ajax.SimpleRPCSWTRequest;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.FocusAdapter;
import org.eclipse.swt.events.FocusEvent;
import org.eclipse.swt.events.KeyAdapter;
import org.eclipse.swt.events.KeyEvent;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Text;

/**
 * @author zhou renjian
 *
 * 2007-3-11
 */
public class AddFriendDialog {
	
	Shell shell;
	Text txtFriend;
	Label lblStatus;
	
	String user;
	String hash;
	GridData gdAdd;
	Composite panelResult;
	private GridData gdResult;
	private Composite panelAdd;
	private Button btnAdd;
	private Label lblFriend;
	
	public AddFriendDialog(Shell parent, String user, String hash) {
		this.user = user;
		this.hash = hash;
		
		shell = new Shell(parent, SWT.CLOSE | SWT.BORDER | SWT.TITLE);
		shell.setText("Add New Friend - GTalk");

		GridLayout gl = new GridLayout();
		shell.setLayout(gl);

		boolean skipLogin = false;
		
		panelAdd = new Composite(shell, SWT.NONE);
		gdAdd = new GridData(GridData.HORIZONTAL_ALIGN_CENTER 
								| GridData.VERTICAL_ALIGN_CENTER
								| GridData.GRAB_VERTICAL
								| GridData.GRAB_HORIZONTAL);
		gdAdd.exclude = skipLogin;
		panelAdd.setLayoutData(gdAdd);
		
		panelAdd.setLayout(new GridLayout(2, false));

		panelResult = new Composite(shell, SWT.NONE);
		gdResult = new GridData(GridData.FILL_BOTH | GridData.GRAB_HORIZONTAL | GridData.GRAB_VERTICAL);
		gdResult.exclude = !skipLogin;
		panelResult.setLayoutData(gdResult);
		
		panelResult.setLayout(new GridLayout());

		lblFriend = new Label(panelAdd, SWT.NONE);
		lblFriend.setText("New Friend:");

		txtFriend = new Text(panelAdd, SWT.BORDER);
		GridData gdFriend = new GridData(GridData.FILL_HORIZONTAL | GridData.GRAB_HORIZONTAL);
		gdFriend.widthHint = 120;
		txtFriend.setLayoutData(gdFriend);
		txtFriend.setText("user@gmail.com");
		txtFriend.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == 13 || e.keyCode == 10) {
					if ((e.stateMask & SWT.SHIFT) == 0) {
						e.doit = false;
						autoFulfillFriend();
						addFriend();
					}
				}
			}
		});
		txtFriend.addFocusListener(new FocusAdapter() {
			public void focusGained(FocusEvent e) {
				txtFriend.selectAll();
			}
			public void focusLost(FocusEvent e) {
				autoFulfillFriend();
			}
		});

		btnAdd = new Button(panelAdd, SWT.PUSH);
		GridData gdButton = new GridData(GridData.HORIZONTAL_ALIGN_CENTER);
		gdButton.horizontalSpan = 2;
		gdButton.widthHint = 120;
		btnAdd.setLayoutData(gdButton);
		btnAdd.setText("Add");
		btnAdd.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				addFriend();
			}
		});
		
		
		new Label(panelResult, SWT.NONE).setText("Your friends has been added to your list successfully.");
		
		Button btnOK = new Button(panelResult, SWT.PUSH);
		gdButton = new GridData(GridData.HORIZONTAL_ALIGN_CENTER);
		gdButton.widthHint = 120;
		btnOK.setLayoutData(gdButton);
		btnOK.setText("OK");
		btnOK.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				shell.close();
			}
		});
		
		
		lblStatus = new Label(shell, SWT.NONE);
		GridData gdStatus = new GridData(GridData.FILL_HORIZONTAL | GridData.GRAB_HORIZONTAL);
		lblStatus.setLayoutData(gdStatus);
		lblStatus.setText(".");
		
		shell.pack();
		shell.open();
		
		txtFriend.forceFocus();
	}
	
	void autoFulfillFriend() {
		String friend = txtFriend.getText();
		if (friend == null || friend.trim().length() == 0) {
			return;
		}
		if (friend.indexOf("@") == -1) {
			txtFriend.setText(friend.trim() + "@gmail.com");
		}
	}

	void addFriend() {
		String friend = txtFriend.getText();
		if (friend.length() == 0) {
			lblStatus.setText("Empty friend!");
			return;
		}
		if (friend.indexOf("@") == -1) {
			friend = friend.trim() + "@gmail.com";
			txtFriend.setText(user);
		}
		SimpleRPCSWTRequest.swtRequest(new AddFriendRunnable() {
			public void ajaxIn() {
				friend = txtFriend.getText();
				user = AddFriendDialog.this.user;
				hash = AddFriendDialog.this.hash;
				lblFriend.setEnabled(false);
				txtFriend.setEnabled(false);
				btnAdd.setEnabled(false);
				lblStatus.setText("Adding new friend ...");
			}
			public void ajaxOut() {
				if (shell == null || shell.isDisposed()) {
					return;
				}
				if (status) {
					lblStatus.setText("Friend has been added.");
					gdAdd.exclude = true;
					gdResult.exclude = false;
					panelAdd.setVisible(!gdAdd.exclude);
					panelResult.setVisible(!gdResult.exclude);
					shell.layout(true);
				} else {
					lblStatus.setText("Failed to add new friend!");
				}
			}
			public void ajaxFail() {
				if (shell == null || shell.isDisposed()) {
					return;
				}
				lblStatus.setText("Failed to add new friend!");
			};
		});
	}
}
