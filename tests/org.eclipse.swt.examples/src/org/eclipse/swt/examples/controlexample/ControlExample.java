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
package org.eclipse.swt.examples.controlexample;


import net.sf.j2s.ajax.ARunnable;
import net.sf.j2s.ajax.ASWTClass;
import org.eclipse.swt.*;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.*;
import org.eclipse.swt.layout.*;
import org.eclipse.swt.widgets.*;

import java.io.*;
import java.lang.reflect.Constructor;
import java.text.*;
import java.util.*;

/**
 * 
 * @author josson smith
 *
 * 2006-7-9
 * 
 * @j2sRequireImport java.lang.reflect.Constructor
 * @j2sIgnoreImport java.text.MessageFormat
 */
public class ControlExample {
	private static ResourceBundle resourceBundle =
		ResourceBundle.getBundle("examples_control");
	private ShellTab shellTab;
	private TabFolder tabFolder;
	Image images[];

	static final int ciClosedFolder = 0, ciOpenFolder = 1, ciTarget = 2;
	static final String[] imageLocations = {
		"closedFolder.gif",
		"openFolder.gif",
		"target.gif" };

	boolean startup = true;

	/**
	 * Creates an instance of a ControlExample embedded inside
	 * the supplied parent Composite.
	 * 
	 * @param parent the container of the example
	 */
	public ControlExample(Composite parent) {
		initResources();
		tabFolder = new TabFolder (parent, SWT.NONE);
		String[] tabs = new String[] {
				"Button", 
//				"Canvas",
//				"CLabel",
				
				"Combo",
				
				"CoolBar",
//				"CTabFolder",
				"Dialog",
				"Group",
				"Label",
				"Link",
				"List",
				"Menu",
				"ProgressBar",
				
				"Sash",
				"SashForm",
				// shellTab = new ShellTab(this),
				"Shell",
				"Slider",
				"Spinner",
				"TabFolder",
				"Table",
				"Text",
				"ToolBar",
				"Tree"
		};
		for (int i=0; i<tabs.length; i++) {
			TabItem item = new TabItem (tabFolder, SWT.NONE);
		    item.setText (tabs [i]);
		    //item.setControl (tabs [i].createTabFolderPage (tabFolder));
		    item.setData ("org.eclipse.swt.examples.controlexample." + tabs [i] + "Tab");
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
						Constructor constructor = getClazz().getConstructor(new Class[] {ControlExample.class});
						Object inst = constructor.newInstance(new Object[] {ControlExample.this});
						Tab tab = (Tab) inst;
						Composite page = tab.createTabFolderPage(tabFolder);
						Control control = item.getControl();
						if (control != null && control instanceof Label) {
							control.dispose();
						}
					    item.setImage(images[(int) Math.floor(3 * Math.random())]);
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
											Constructor constructor = getClazz().getConstructor(new Class[] {ControlExample.class});
											Object inst = constructor.newInstance(new Object[] {ControlExample.this});
											Tab tab = (Tab) inst;
											if (((String) item.getData()).indexOf("Shell") != -1) {
												shellTab = (ShellTab) tab;
											}
											Composite page = tab.createTabFolderPage(tabFolder);
											Control control = item.getControl();
											if (control != null && control instanceof Label) {
												control.dispose();
											}
										    item.setImage(images[(int) Math.floor(3 * Math.random())]);
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
		
		/*
		Tab [] tabs = createTabs();
		for (int i=0; i<tabs.length; i++) {
			TabItem item = new TabItem (tabFolder, SWT.NONE);
		    item.setText (tabs [i].getTabText ());
		    //item.setControl (tabs [i].createTabFolderPage (tabFolder));
		    item.setData (tabs [i]);
		}
		if (tabs.length > 0) {
			TabItem item = tabFolder.getItem(0);
			item.setControl(tabs[0].createTabFolderPage(tabFolder));
		}
		if (tabs.length > 1) {
			tabFolder.addSelectionListener(new SelectionAdapter() {
				public void widgetSelected(SelectionEvent e) {
					int idx = tabFolder.getSelectionIndex();
					if (idx != -1) {
						TabItem item = tabFolder.getItem(idx);
						if (item.getControl() == null) {
							Object data = item.getData();
							if (data != null) {
								Tab tab = (Tab) data;
								item.setControl(tab.createTabFolderPage(tabFolder));
							}
						}
					}
				}
			});
		}
		*/
		startup = false;
	}

	/**
	 * Answers the set of example Tabs
	 */
//	Tab[] createTabs() {
//		return new Tab [] {
//			new ButtonTab (this),
////			new CanvasTab (this),
//			new ComboTab (this),
////			new CoolBarTab (this),
////			new DialogTab (this),
//			new GroupTab (this),
//			new LabelTab (this),
//			new LinkTab (this),
////			new ListTab (this),
////			new MenuTab (this),
//			new ProgressBarTab (this),
////			new SashTab (this),
//			shellTab = new ShellTab(this),
////			new SliderTab (this),
//			new SpinnerTab (this),
//			new TabFolderTab (this),
////			new TableTab (this),
//			new TextTab (this),
////			new ToolBarTab (this),
////			new TreeTab (this),
//		};
//	}

	/**
	 * Disposes of all resources associated with a particular
	 * instance of the ControlExample.
	 */	
	public void dispose() {
		/*
		 * Destroy any shells that may have been created
		 * by the Shells tab.  When a shell is disposed,
		 * all child shells are also disposed.  Therefore
		 * it is necessary to check for disposed shells
		 * in the shells list to avoid disposing a shell
		 * twice.
		 */
		if (shellTab != null) shellTab.closeAllShells ();
		shellTab = null;
		tabFolder = null;
		freeResources();
	}

	/**
	 * Frees the resources
	 */
	void freeResources() {
		if (images != null) {
			for (int i = 0; i < images.length; ++i) {
				final Image image = images[i];
				if (image != null) image.dispose();
			}
			images = null;
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

	/**
	 * Loads the resources
	 */
	void initResources() {
		final Class clazz = ControlExample.class;
		if (resourceBundle != null) {
			try {
				if (images == null) {
					images = new Image[imageLocations.length];
					
					for (int i = 0; i < imageLocations.length; ++i) {
						InputStream sourceStream = clazz.getResourceAsStream(imageLocations[i]);
						ImageData source = new ImageData(sourceStream);
						ImageData mask = source.getTransparencyMask();
						images[i] = new Image(null, source, mask);
						try {
							sourceStream.close();
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				}
				return;
			} catch (Throwable t) {
			}
		}
		String error = (resourceBundle != null) ?
			getResourceString("error.CouldNotLoadResources") :
			"Unable to load resources";
		freeResources();
		throw new RuntimeException(error);
	}

	/**
	 * Invokes as a standalone program.
	 */
	public static void main(String[] args) {
		//System.out.println("To begin control examples ..."); // bring the correct width and height of XHTML
		Display display = new Display();
		int styleNone = SWT.NONE;
		int style = styleNone;
		style = SWT.SHELL_TRIM;
		/**
		 * @j2sNative 
		 * style = styleNone;
		 */ {}
		
		Shell shell = new Shell(display, style);
		shell.setLayout(new FillLayout());
		ControlExample instance = new ControlExample(shell);
		shell.setText(getResourceString("window.title"));
//		setShellSize(display, shell);
		/**
		 * @j2sNative
		 * //shell.setMaximized(true);
		 */ {}
		
		shell.open();
		while (! shell.isDisposed()) {
			if (! display.readAndDispatch()) display.sleep();
		}
		instance.dispose();
	}
	
	/**
	 * Grabs input focus.
	 */
	public void setFocus() {
		tabFolder.setFocus();
	}
	
	/**
	 * Sets the size of the shell to it's "packed" size,
	 * unless that makes it bigger than the display,
	 * in which case set it to 9/10 of display size.
	 */
	static void setShellSize (Display display, Shell shell) {
		Rectangle bounds = display.getBounds();
		Point size = shell.computeSize (SWT.DEFAULT, SWT.DEFAULT);
		if (size.x > bounds.width) size.x = bounds.width * 9 / 10;
		if (size.y > bounds.height) size.y = bounds.height * 9 / 10;
		shell.setSize (size);
	}
}

