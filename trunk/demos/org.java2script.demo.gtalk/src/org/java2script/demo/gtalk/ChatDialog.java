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

import java.util.Date;
import net.sf.j2s.ajax.SimpleRPCSWTRequest;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.DisposeEvent;
import org.eclipse.swt.events.DisposeListener;
import org.eclipse.swt.events.KeyAdapter;
import org.eclipse.swt.events.KeyEvent;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Text;

/**
 * @author zhou renjian
 *
 * 2007-3-11
 */
public class ChatDialog {
	
	Shell shell;
	Text txtChatting;
	Text txtSending;
	Label lblStatus;
	
	String user;
	String hash;
	String friend;
	
	public ChatDialog(Shell parent, String user, String hash, String friend, String msg) {
		this.user = user;
		this.hash = hash;
		this.friend = friend;
		
		shell = new Shell(parent, SWT.CLOSE | SWT.BORDER | SWT.TITLE);
		shell.setText(friend + " - GTalk Chat");

		GridLayout gl = new GridLayout();
		shell.setLayout(gl);

		new Label(shell, SWT.NONE).setText("Chatting ...");
		
		txtChatting = new Text(shell, SWT.BORDER | SWT.V_SCROLL | SWT.READ_ONLY);
		GridData gdChatting = new GridData(GridData.FILL_BOTH | GridData.GRAB_HORIZONTAL | GridData.GRAB_VERTICAL);
		gdChatting.heightHint = 240; 
		txtChatting.setLayoutData(gdChatting);

		new Label(shell, SWT.NONE).setText("Sending ...");

		txtSending = new Text(shell, SWT.BORDER | SWT.V_SCROLL);
		GridData gdSend = new GridData(GridData.FILL_HORIZONTAL | GridData.GRAB_HORIZONTAL);
		gdSend.heightHint = 48;
		txtSending.setLayoutData(gdSend);
		txtSending.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == 13 || e.keyCode == 10) {
					if ((e.stateMask & SWT.SHIFT) == 0) {
						e.doit = false;
						sendMessage();
					}
				}
			}
		});

		Button send = new Button(shell, SWT.PUSH);
		GridData gdButton = new GridData();
		gdButton.widthHint = 120;
		gdButton.grabExcessHorizontalSpace = true;
		gdButton.horizontalAlignment = GridData.HORIZONTAL_ALIGN_END;
		send.setLayoutData(gdButton);
		send.setText("Send");
		send.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				sendMessage();
			}
		});
		
		lblStatus = new Label(shell, SWT.NONE);
		GridData gdStatus = new GridData(GridData.FILL_HORIZONTAL | GridData.GRAB_HORIZONTAL);
		lblStatus.setLayoutData(gdStatus);
		lblStatus.setText(".");
		
		shell.setSize(320, 360);
		shell.open();
		
		startChattingThread();

		txtSending.forceFocus();
		
		shell.addDisposeListener(new DisposeListener() {
			public void widgetDisposed(DisposeEvent e) {
				SimpleRPCSWTRequest.swtRequest(new CloseChattingRunnable() {
					public void ajaxIn() {
						user = ChatDialog.this.user;
						hash = ChatDialog.this.hash;
						friend = ChatDialog.this.friend;
					}
				});
			}
		});
	}
	
	void sendMessage() {
		String msg = txtSending.getText();
		if (msg.length() == 0) {
			lblStatus.setText("Empty message!");
			return;
		}
		SimpleRPCSWTRequest.swtRequest(new SendingRunnable() {
			public void ajaxIn() {
				sending = txtSending.getText();
				user = ChatDialog.this.user;
				hash = ChatDialog.this.hash;
				friend = ChatDialog.this.friend;
				appendMessage(user, sending);
				txtSending.setText("");
				lblStatus.setText("Sending message ...");
			}
			public void ajaxOut() {
				if (shell == null || shell.isDisposed()) {
					return;
				}
				lblStatus.setText("Message sent.");
				if (replied != null) {
					appendMessage(friend, replied);
				}
			}
			public void ajaxFail() {
				if (shell == null || shell.isDisposed()) {
					return;
				}
				appendMessage(user, "Failed to send the following message:\r\n" + replied);
				lblStatus.setText("Sending message failed!");
			};
		});
	}

	void appendMessage(String author, String newMsg) {
		String msg = txtChatting.getText();
		if (msg.length() != 0) {
			msg += "\r\n";
		}
		Date now = new Date();
		int ms = now.getMinutes();
		int hs = now.getHours();
		msg += author + " [" + ((hs < 10) ? "0" : "") + hs + ":" + ((ms < 10) ? "0" : "") + ms + "]\r\n";
		msg += newMsg;
		txtChatting.setText(msg);
	}
	
	void startChattingThread() {
		if (shell == null || shell.isDisposed()) return; 
		Display display = shell.getDisplay();
		if (display == null || display.isDisposed()) return;
		display.timerExec(5000, new Runnable() {
			public void run() {
				updateChattingMessage();
			}
		});
	}
	
	void updateChattingMessage() {
		SimpleRPCSWTRequest.swtRequest(new ReceivingRunnable() {
			public void ajaxIn() {
				user = ChatDialog.this.user;
				hash = ChatDialog.this.hash;
				friend = ChatDialog.this.friend;
			}
		
			public void ajaxOut() {
				if (shell == null || shell.isDisposed()) {
					return;
				}
				if (replied != null) {
					appendMessage(friend, replied);
					lblStatus.setText("Last message received at " + new Date());
				}
				startChattingThread();
			}
			public void ajaxFail() {
				if (shell == null || shell.isDisposed()) {
					return;
				}
				lblStatus.setText("Failed to receive chatting message.");
				startChattingThread();
			}
		});
	}
}
