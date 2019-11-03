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
import org.eclipse.swt.events.FocusAdapter;
import org.eclipse.swt.events.FocusEvent;
import org.eclipse.swt.events.KeyAdapter;
import org.eclipse.swt.events.KeyEvent;
import org.eclipse.swt.events.MouseAdapter;
import org.eclipse.swt.events.MouseEvent;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.MessageBox;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Text;
import org.eclipse.swt.widgets.ToolBar;
import org.eclipse.swt.widgets.ToolItem;
import org.eclipse.swt.widgets.Tree;
import org.eclipse.swt.widgets.TreeItem;

/**
 * @author zhou renjian
 *
 * 2007-3-11
 */
public class GoogleTalk {
	
	String user;
	String hash;
	
	Shell shell;
	
	Group panelLog;
	Text txtUser;
	Text txtPassword;
	Button btnLogin;
	
	Composite panelList;
	Tree treeUsers;
	
	Label lblStatus;
	GridData gdLog;
	GridData gdList;
	Label lblUser;
	Label lblPassword;
	Button btnDefault;
	Button btnUser;

	String [] friends;
	String [] aliases;
	String [] presences;
	
	boolean justLogin;
	private Image imageLogout;
	private Image imageAbout;
	private Image imageAdd;
	
	Shell openWindow(Display display) {
		justLogin = false;
		shell = new Shell(display);
		shell.setText("Java2Script Google Talk");
		GridLayout gl = new GridLayout();
		shell.setLayout(gl);

		boolean skipLogin = false;
		
		GridData gd = null;
		
		panelLog = new Group(shell, SWT.NONE);
		gdLog = new GridData(GridData.HORIZONTAL_ALIGN_CENTER 
						| GridData.VERTICAL_ALIGN_CENTER
						| GridData.GRAB_VERTICAL
						| GridData.GRAB_HORIZONTAL);
		gdLog.exclude = skipLogin;
		panelLog.setLayoutData(gdLog);
		
		GridLayout glLog = new GridLayout(2, false);
		glLog.verticalSpacing = 10;
		glLog.horizontalSpacing = 4;
		glLog.marginLeft = 4;
		glLog.marginRight = 4;
		glLog.marginTop = 4;
		glLog.marginBottom = 4;
		panelLog.setLayout(glLog);
		
		panelLog.setText("Login");
		
		btnDefault = new Button(panelLog, SWT.RADIO);
		gd = new GridData();
		gd.horizontalSpan = 2;
		btnDefault.setLayoutData(gd);
		btnDefault.setText("Default user " + JabberPool.DEAULT_USER);
		btnDefault.setSelection(false);
		
		btnUser = new Button(panelLog, SWT.RADIO);
		gd = new GridData();
		gd.horizontalSpan = 2;
		btnUser.setLayoutData(gd);
		btnUser.setText("Your user");
		btnUser.setSelection(true);
		
		SelectionAdapter userSwitch = new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				enableUserPassword(btnUser.getSelection());
			}
		};
		btnDefault.addSelectionListener(userSwitch);
		btnUser.addSelectionListener(userSwitch);
		
		lblUser = new Label(panelLog, SWT.NONE);
		gd = new GridData();
		gd.horizontalIndent = 16;
		lblUser.setLayoutData(gd);
		lblUser.setText("User:");
		txtUser = new Text(panelLog, SWT.BORDER); 
		gd = new GridData();
		gd.widthHint = 108;
		gd.horizontalIndent = 8;
		txtUser.setLayoutData(gd);
		txtUser.setText(JabberPool.DEAULT_USER);
		txtUser.addKeyListener(new KeyAdapter() {
			public void keyReleased(KeyEvent e) {
				if (e.keyCode == 13 || e.keyCode == 10) {
					autoFulfillUser();
					txtPassword.forceFocus();
				}
			}
		});
		txtUser.addFocusListener(new FocusAdapter() {
			public void focusGained(FocusEvent e) {
				txtUser.selectAll();
			}
			public void focusLost(FocusEvent e) {
				autoFulfillUser();
			}
		});
		lblPassword = new Label(panelLog, SWT.NONE);
		gd = new GridData();
		gd.horizontalIndent = 16;
		lblPassword.setLayoutData(gd);
		lblPassword.setText("Password:");
		txtPassword = new Text(panelLog, SWT.BORDER | SWT.PASSWORD);
		gd = new GridData();
		gd.widthHint = 108;
		gd.horizontalIndent = 8;
		txtPassword.setLayoutData(gd);
		txtPassword.setText("x"); // for default user email, this password has no senses.
		txtPassword.addKeyListener(new KeyAdapter() {
			public void keyReleased(KeyEvent e) {
				if (e.keyCode == 13 || e.keyCode == 10) {
					login();
				}
			}
		});

		btnLogin = new Button(panelLog, SWT.PUSH);
		GridData gdButton = new GridData(GridData.HORIZONTAL_ALIGN_CENTER);
		gdButton.horizontalSpan = 2;
		gdButton.widthHint = 120;
		btnLogin.setLayoutData(gdButton);
		btnLogin.setText("Login");
		btnLogin.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				login();
			}
		});

		panelList = new Composite(shell, SWT.NONE);
		gdList = new GridData(GridData.FILL_BOTH | GridData.GRAB_HORIZONTAL | GridData.GRAB_VERTICAL);
		gdList.exclude = !skipLogin;
		panelList.setLayoutData(gdList);
		
		panelList.setLayout(new GridLayout());

		ToolBar bar = new ToolBar(panelList, SWT.RIGHT);
		ToolItem toolItem = new ToolItem(bar, SWT.NONE);
		toolItem.setText("Add(+)");
		toolItem.setToolTipText("Add new friends");
		imageAdd = new Image(display, GoogleTalk.class.getResourceAsStream("newfile_wiz.gif"));
		toolItem.setImage(imageAdd);
		toolItem.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				new AddFriendDialog(shell, user, hash);
			}
		});
		toolItem = new ToolItem(bar, SWT.NONE);
		toolItem.setText("Logout");
		toolItem.setToolTipText("Logout or switch to another user");
		imageLogout = new Image(display, GoogleTalk.class.getResourceAsStream("file_obj.gif"));
		toolItem.setImage(imageLogout);
		toolItem.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				Shell[] shells = shell.getShells();
				int existedChats = 0;
				for (int i = 0; i < shells.length; i++) {
					Shell shell = shells[i];
					String title = shell.getText();
					if (title != null && title.length() > 0
							&& title.endsWith("GTalk Chat")) {
						existedChats++;
					}
				}
				if (existedChats == 0) {
					logout();
					return;
				}
				MessageBox msgBox = new MessageBox(shell, SWT.YES | SWT.NO | SWT.CANCEL | SWT.ICON_QUESTION);
				msgBox.setText("Close all existed chat?");
				msgBox.setMessage("There are " + existedChats + " chats.\r\n Do you still want to logout?");
				int answer = msgBox.open();
				if (answer == SWT.YES) {
					for (int i = 0; i < shells.length; i++) {
						Shell shell = shells[i];
						String title = shell.getText();
						if (title != null && title.length() > 0
								&& title.endsWith("GTalk Chat")) {
							shell.close();
						}
					}
					logout();
				}
			}
		});
		toolItem = new ToolItem(bar, SWT.NONE);
		toolItem.setText("About");
		toolItem.setToolTipText("About Java2Script version of GTalk");
		imageAbout = new Image(display, GoogleTalk.class.getResourceAsStream("template_obj.gif"));
		toolItem.setImage(imageAbout);
		toolItem.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				MessageBox msgBox = new MessageBox(shell, SWT.ICON_QUESTION);
				msgBox.setText("About Java2Script GTalk");
				msgBox.setMessage("Created by Zhou Renjian (2007).\r\nAll rights reserved.");
				msgBox.open();
			}
		});

		new Label(panelList, SWT.NONE).setText("Friends:");
		
		treeUsers = new Tree(panelList, SWT.BORDER);
		treeUsers.setLayoutData(new GridData(GridData.FILL_BOTH | GridData.GRAB_HORIZONTAL | GridData.GRAB_VERTICAL));
		
		TreeItem treeItem = new TreeItem(treeUsers, SWT.NONE);
		treeItem.setText("Pending user list ...");
		
		treeUsers.addMouseListener(new MouseAdapter() {
			public void mouseDoubleClick(MouseEvent e) {
				String user = (String) treeUsers.getSelection()[0].getData();
				Shell[] shells = shell.getShells();
				for (int i = 0; i < shells.length; i++) {
					Shell shell = shells[i];
					String title = shell.getText();
					if (title != null && title.length() > 0
							&& title.endsWith("GTalk Chat")
							&& title.startsWith(user)) {
						shell.forceFocus();
						return;
					}
				}
				new ChatDialog(shell, GoogleTalk.this.user, hash, user, null);
			}
		});

		lblStatus = new Label(shell, SWT.NONE);
		GridData gdStatus = new GridData(GridData.FILL_HORIZONTAL | GridData.GRAB_HORIZONTAL);
		lblStatus.setLayoutData(gdStatus);
		lblStatus.setText(".");
		
		shell.setSize(250, 480);
		shell.open();
		
		txtUser.forceFocus();
		
		
		shell.addDisposeListener(new DisposeListener() {
			public void widgetDisposed(DisposeEvent e) {
				SimpleRPCSWTRequest.swtRequest(new LogoutRunnable() {
					public void ajaxIn() {
						user = GoogleTalk.this.user;
						hash = GoogleTalk.this.hash;
					}
				});
			}
		});

		return shell;
	}
	
	void autoFulfillUser() {
		String user = txtUser.getText();
		if (user == null || user.trim().length() == 0) {
			return;
		}
		if (user.indexOf("@") == -1) {
			txtUser.setText(user.trim() + "@gmail.com");
		}
	}
	
	void logout() {
		lblStatus.setText("Logout ...");
		SimpleRPCSWTRequest.swtRequest(new LogoutRunnable() {
			public void ajaxIn() {
				user = GoogleTalk.this.user;
				hash = GoogleTalk.this.hash;
			}
			public void ajaxOut() {
				if (status) {
					justLogin = false;
					lblStatus.setText("Successful logout!");
					gdLog.exclude = false;
					gdList.exclude = true;
					panelLog.setVisible(!gdLog.exclude);
					panelList.setVisible(!gdList.exclude);
					shell.layout(true);
				} else {
					lblStatus.setText("Failed to login!");
				}
			}
			public void ajaxFail() {
				lblStatus.setText("Connection failed or server was down!");
			}
		});

	}
	
	void login() {
		String user = txtUser.getText();
		String password = txtPassword.getText();
		if (user == null || user.trim().length() == 0
				|| password == null 
				|| password.trim().length() == 0) {
			return;
		}
		if (user.indexOf("@") == -1) {
			user = user.trim() + "@gmail.com";
			txtUser.setText(user);
		}
		enableUserPassword(false);
		btnDefault.setEnabled(false);
		btnUser.setEnabled(false);
		btnLogin.setEnabled(false);
		lblStatus.setText("Login ...");
		
		justLogin = true;
		SimpleRPCSWTRequest.swtRequest(new LoginRunnable() {
			public void ajaxIn() {
				user = txtUser.getText();
				password = txtPassword.getText();
			}
			public void ajaxOut() {
				enableUserPassword(true);
				btnLogin.setEnabled(true);
				btnDefault.setEnabled(true);
				btnUser.setEnabled(true);
				if (hash != null) {
					txtPassword.setText("");
					GoogleTalk.this.hash = hash;
					GoogleTalk.this.user = user;
					lblStatus.setText("Successful login!");
					gdLog.exclude = true;
					gdList.exclude = false;
					panelLog.setVisible(!gdLog.exclude);
					panelList.setVisible(!gdList.exclude);
					shell.layout(true);
					updateUserList();
				} else {
					lblStatus.setText("Failed to login!");
				}
			}
			public void ajaxFail() {
				enableUserPassword(true);
				btnLogin.setEnabled(true);
				btnDefault.setEnabled(true);
				btnUser.setEnabled(true);
				lblStatus.setText("Connection failed or server was down!");
			}
		});
	}
	
	void updateUserList() {
		SimpleRPCSWTRequest.swtRequest(new UpdatingRunnable() {
			public void ajaxIn() {
				user = GoogleTalk.this.user;
				hash = GoogleTalk.this.hash;
			}
			public void ajaxOut() {
				if (shell == null || shell.isDisposed()) {
					return;
				}
				if (aliases != null && friends != null && presences != null) {
					boolean updated = isUpdated(aliases, friends, presences);
					if (updated) {
						TreeItem[] items = treeUsers.getItems();
						for (int i = items.length - 1; i >= 0; i--) {
							items[i].dispose();
						}
						for (int i = 0; i < aliases.length; i++) {
							TreeItem treeItem = new TreeItem(treeUsers, SWT.NONE);
							String label = aliases[i] == null ? friends[i] : aliases[i];
							treeItem.setText(label + " (" + (presences[i] == null ? "offline" : presences[i]) + ")");
							treeItem.setData(friends[i]);
						}
						String[] as = new String[aliases.length];
						System.arraycopy(aliases, 0, as, 0, aliases.length);
						GoogleTalk.this.aliases = as;
						String[] fs = new String[friends.length];
						System.arraycopy(friends, 0, fs, 0, friends.length);
						GoogleTalk.this.friends = fs;
						String[] ps = new String[presences.length];
						System.arraycopy(presences, 0, ps, 0, presences.length);
						GoogleTalk.this.presences = ps;
						lblStatus.setText("Friend list updated at " + new Date());
					}
				}
				startUpdatingThread();
			}
			public void ajaxFail() {
				if (shell == null || shell.isDisposed()) {
					return;
				}
				lblStatus.setText("Failed to get user list.");
				startUpdatingThread();
			}
		});
	}

	boolean isArrayDifferent(String[] a, String[] b) {
		if (a == null && b != null) {
			return true;
		} else if (a != null && b == null) {
			return true;
		} else if (a != null && b != null) {
			if (a.length != b.length) {
				return true;
			}
			for (int i = 0; i < b.length; i++) {
				if (b[i] == null && a[i] != null) {
					return true;
				}
				if (b[i] != null && !b[i].equals(a[i])) {
					return true;
				}
			}
		}
		return false;
	}
	boolean isUpdated(String[] aliases, String[] friends, String[] presences) {
		return isArrayDifferent(this.aliases, aliases) 
				|| isArrayDifferent(this.friends, friends)
				|| isArrayDifferent(this.presences, presences); 
	}
	
	void enableUserPassword(boolean enabled) {
		lblUser.setEnabled(enabled);
		txtUser.setEnabled(enabled);
		lblPassword.setEnabled(enabled);
		txtPassword.setEnabled(enabled);
	}
	
	void startUpdatingThread() {
		if (!justLogin || shell == null || shell.isDisposed()) return;
		Display display = shell.getDisplay();
		if (display == null || display.isDisposed()) return;
		display.timerExec(justLogin ? 3000 : 10000, new Runnable() {
			public void run() {
				updateUserList();
			}
		});
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Display display = new Display();
		
		GoogleTalk tgt = new GoogleTalk();
		
		Shell shell = tgt.openWindow(display);
		// You can comment out the following line and Java application will be run locally.
		//SimpleRPCSWTRequest.switchToAJAXMode();
		while (!shell.isDisposed()) {
			if (!display.readAndDispatch())
				display.sleep();
		}
		if (tgt.imageAdd != null) {
			tgt.imageAdd.dispose();
			tgt.imageAdd = null;
		}
		if (tgt.imageLogout != null) {
			tgt.imageLogout.dispose();
			tgt.imageLogout = null;
		}
		if (tgt.imageAbout != null) {
			tgt.imageAbout.dispose();
			tgt.imageAbout = null;
		}
		display.dispose();
	}
}
