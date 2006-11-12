/*******************************************************************************
 * Copyright (c) 2000, 2003 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package org.eclipse.swt.examples.layoutexample;


import net.sf.j2s.ajax.ARunnable;
import net.sf.j2s.ajax.ASWTClass;
import org.eclipse.swt.*;
import org.eclipse.swt.layout.*;
import org.eclipse.swt.widgets.*;
import org.eclipse.swt.events.*;

import java.lang.reflect.Constructor;
import java.text.*;
import java.util.*;

/**
 * @j2sRequireImport java.lang.reflect.Constructor
 */
public class LayoutExample {
	private static ResourceBundle resourceBundle = ResourceBundle.getBundle("examples_layout");
	private TabFolder tabFolder;
	
	/**
	 * Creates an instance of a LayoutExample embedded inside
	 * the supplied parent Composite.
	 * 
	 * @param parent the container of the example
	 */
	public LayoutExample(Composite parent) {
		/*
		tabFolder = new TabFolder (parent, SWT.NULL);
		Tab [] tabs = new Tab [] {
			new FillLayoutTab (this),
			new RowLayoutTab (this),
			new GridLayoutTab (this),
			new FormLayoutTab (this),
		};
		for (int i=0; i<tabs.length; i++) {
			TabItem item = new TabItem (tabFolder, SWT.NULL);
		    item.setText (tabs [i].getTabText ());
		    item.setControl (tabs [i].createTabFolderPage (tabFolder));
		}
		*/
		tabFolder = new TabFolder (parent, SWT.NONE);
		String[] tabs = new String[] {
				"FillLayout", 
				"RowLayout",
				"GridLayout",
				"FormLayout"
		};
		for (int i=0; i<tabs.length; i++) {
			TabItem item = new TabItem (tabFolder, SWT.NONE);
		    item.setText (tabs [i]);
		    //item.setControl (tabs [i].createTabFolderPage (tabFolder));
		    item.setData ("org.eclipse.swt.examples.layoutexample." + tabs [i] + "Tab");
		    //ProgressBar progressBar = new ProgressBar(tabFolder, SWT.INDETERMINATE);
			//item.setControl(progressBar);
		    //*
		    Label label = new Label(tabFolder, SWT.NONE);
		    label.setText("Loading " + tabs [i] + " Tab ...");
		    label.setAlignment(SWT.CENTER);
		    item.setControl(label);
		    // */
		}
		if (tabs.length > 0) {
			final TabItem item = tabFolder.getItem(0);
			ASWTClass.shellLoad(parent.getShell(), (String) item.getData(), new ARunnable() {
				public void run() {
					try {
						Constructor constructor = getClazz().getConstructor(new Class[] {LayoutExample.class});
						Object inst = constructor.newInstance(new Object[] {LayoutExample.this});
						Tab tab = (Tab) inst;
						Composite page = tab.createTabFolderPage(tabFolder);
						Control control = item.getControl();
						if (control != null && control instanceof Label) {
							control.dispose();
						}
					    //item.setImage(images[(int) Math.floor(3 * Math.random())]);
					    tabFolder.setSelection(tabFolder.getSelectionIndex());
						item.setControl(page);
						//item.getParent().getShell().pack();
					} catch (Throwable e) {
						//e.printStackTrace();
						throw (Error) e;
					}
				}
			});
		}
		if (tabs.length > 1) {
			tabFolder.addSelectionListener(new SelectionAdapter() {
				public void widgetSelected(SelectionEvent e) {
					int idx = tabFolder.getSelectionIndex();
					if (idx != -1) {
						final TabItem item = tabFolder.getItem(idx);
						Control control = item.getControl();
						if (control == null || control instanceof Label) {
							Object data = item.getData();
							if (data != null) {
								ASWTClass.shellLoad(tabFolder.getShell(), (String) data, new ARunnable() {
									public void run() {
										try {
											Constructor constructor = getClazz().getConstructor(new Class[] {LayoutExample.class});
											Object inst = constructor.newInstance(new Object[] {LayoutExample.this});
											Tab tab = (Tab) inst;
											Composite page = tab.createTabFolderPage(tabFolder);
											Control control = item.getControl();
											if (control != null && control instanceof Label) {
												control.dispose();
											}
										    //item.setImage(images[(int) Math.floor(3 * Math.random())]);
										    tabFolder.setSelection(tabFolder.getSelectionIndex());
											item.setControl(page);
										} catch (Throwable e) {
											e.printStackTrace();
											throw (Error) e;
										}
									}
								});
							}
						}
					}
				}
			});
		}
	}
	
	/**
	 * Grabs input focus.
	 */
	public void setFocus() {
		tabFolder.setFocus();
	}
	
	/**
	 * Disposes of all resources associated with a particular
	 * instance of the LayoutExample.
	 */	
	public void dispose() {
		tabFolder = null;
	}
	
	/**
	 * Invokes as a standalone program.
	 */
	public static void main(String[] args) {
		final Display display = new Display();
		final Shell shell = new Shell(display);
		shell.setLayout(new FillLayout());
		new LayoutExample(shell);
		shell.setText(getResourceString("window.title"));
		shell.addShellListener (new ShellAdapter () {
			public void shellClosed(ShellEvent e) {
				Shell [] shells = display.getShells();
				for (int i = 0; i < shells.length; i++) {
					if (shells [i] != shell) shells [i].close ();
				}
			}
		});
		//shell.setSize(640, 480);
		shell.open();
		while (! shell.isDisposed()) {
			if (! display.readAndDispatch()) display.sleep();
		}
	}

	/**
	 * Gets a string from the resource bundle.
	 * We don't want to crash because of a missing String.
	 * Returns the key if not found.
	 */
	static String getResourceString(String key) {
		try {
			return resourceBundle.getString(key);
		} catch (MissingResourceException e) {
			return key;
		} catch (NullPointerException e) {
			return "!" + key + "!";
		}			
	}

	/**
	 * Gets a string from the resource bundle and binds it
	 * with the given arguments. If the key is not found,
	 * return the key.
	 */
	static String getResourceString(String key, Object[] args) {
		try {
			return MessageFormat.format(getResourceString(key), args);
		} catch (MissingResourceException e) {
			return key;
		} catch (NullPointerException e) {
			return "!" + key + "!";
		}
	}
}
