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

package net.sf.j2s.test.swt.widgets;

import java.util.Date;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.CoolBar;
import org.eclipse.swt.widgets.CoolItem;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Listener;
import org.eclipse.swt.widgets.Menu;
import org.eclipse.swt.widgets.MenuItem;
import org.eclipse.swt.widgets.MessageBox;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Text;
import org.eclipse.swt.widgets.ToolBar;
import org.eclipse.swt.widgets.ToolItem;

/**
 * @author zhou renjian
 *
 * 2006-5-21
 */
public class TestCoolBar {
	/**
	 * @param args
	 */
	public static void main0(String[] args) {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout(2, false));
		final Group group = new Group(shell, SWT.NONE);
		group.setLayout(new GridLayout());
		final CoolBar bar5 = new CoolBar(group, SWT.BORDER);
		bar5.setLayoutData(new GridData(GridData.FILL_BOTH));
		final CoolItem toolItem5 = new CoolItem(bar5, SWT.DROP_DOWN);
		ToolBar toolBar = new ToolBar (bar5, SWT.NONE);
		ToolItem item = new ToolItem (toolBar, SWT.RADIO);
		item.setText("Car");
		item.setToolTipText ("SWT.RADIO");
		item = new ToolItem (toolBar, SWT.RADIO);
		item.setText("Bike");
		item.setToolTipText ("SWT.RADIO");
		item = new ToolItem (toolBar, SWT.RADIO);
		item.setText("Plane");
		item.setToolTipText ("SWT.RADIO");
//		final Label label5 = new Label(bar5, SWT.NONE);
//		label5.setText("Hello x World");
//		toolItem5.setControl(label5);
		toolItem5.setControl(toolBar);
		toolItem5.setPreferredSize(200, 24);
		toolItem5.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				System.out.println("x.vx.vx.v");
			}
		});
		final CoolItem toolItem52 = new CoolItem(bar5, SWT.NONE);
		final Label label52 = new Label(bar5, SWT.NONE);
		label52.setText("Hello World");
		toolItem52.setControl(label52);
		toolItem52.setMinimumSize(13, 24);
		toolItem52.setPreferredSize(100, 24);
		final CoolItem toolItem53 = new CoolItem(bar5, SWT.NONE);
		final Label label53 = new Label(bar5, SWT.NONE);
		label53.setText("World");
		toolItem53.setControl(label53);
		toolItem53.setPreferredSize(60, 24);
		final CoolItem toolItem54 = new CoolItem(bar5, SWT.NONE);
		final Label label54 = new Label(bar5, SWT.NONE);
		label54.setText("World");
		toolItem54.setControl(label54);
		toolItem54.setPreferredSize(60, 24);
		//toolItem54.setMinimumSize(60, 14);
		bar5.setWrapIndices(new int[] { 3 });
		/* add a listener to resize the group box to match the coolbar */
		bar5.addListener(SWT.Resize, new Listener() {
			public void handleEvent(Event event) {
				System.out.println(bar5.getBounds());
				shell.layout();
			}
		});

		shell.setSize(480, 200);
		
		System.out.println(bar5.getBounds());
		
		System.out.println(toolItem5.getBounds());
		System.out.println(toolItem52.getBounds());
		System.out.println(toolItem53.getBounds());
		System.out.println(toolItem54.getBounds());
		
		Button button = new Button(shell, SWT.PUSH);
		button.setText("Test");
		Button button2 = new Button(shell, SWT.PUSH);
		button2.setText("Laout");
		button2.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				//group.layout(true);
				MessageBox box = new MessageBox(shell);
				box.setText("Hello");
				box.setMessage("Hello world. I am from China.\r\nThis is a very long string that has no meanings.");
				box.open();
				
				box = new MessageBox(shell, SWT.NONE);
				box.setText("About");
				box.setMessage("Java2Script Web TestCoolBar 1.0, Nov 2006\r\n\r\n -Created by Zhou Renjian");
				box.open();		

			}
		});
		button.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				System.out.println(toolItem5.getBounds());
				System.out.println(toolItem52.getBounds());
				System.out.println(toolItem53.getBounds());
				System.out.println(toolItem54.getBounds());
				
				System.out.println(toolItem5.getPreferredSize());
				System.out.println(toolItem52.getPreferredSize());
				System.out.println(toolItem53.getPreferredSize());
				System.out.println(toolItem54.getPreferredSize());
				
				System.out.println(toolItem5.getMinimumSize());
				System.out.println(toolItem52.getMinimumSize());
				System.out.println(toolItem53.getMinimumSize());
				System.out.println(toolItem54.getMinimumSize());
				
				System.out.println(bar5.getBounds());
				System.out.println("===============");
			}
		});
		//shell.pack();
		shell.open ();
		while (!shell.isDisposed ()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}
		display.dispose ();
	}
	
	
	static int AUTO_SAVING_TIME_INTERVAL = 60000; // 1 minute
	
	private Shell shell;
	private Text text;
	private Label status;
	
	private String currentFilePath;
	
	private String tmpPathBeforeSaved;
	
	// Cache last status
	private String lastText;
	
	// Cache last saved status
	private String lastSavedText;

	private Image imageNew;

	private Image imageLoad;
	
	private Image imageLoadDraft;
	
	private Image imageSave;
	
	private Image imageSaveAs;
	
	public Shell open(Display display) {
		shell = new Shell(display);
		shell.setText("New - Java2Script Web Notepad");
		
		createMenuBar();
		
		GridLayout gl = new GridLayout();
		shell.setLayout(gl);
		
		ToolBar bar = new ToolBar(shell, SWT.NONE);
		ToolItem toolItem = new ToolItem(bar, SWT.NONE);
		toolItem.setText("New");
		imageNew = new Image(display, TestCoolBar.class.getResourceAsStream("newfile_wiz.gif"));
		toolItem.setImage(imageNew);
		toolItem.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				newFile();
			}
		});
		toolItem = new ToolItem(bar, SWT.NONE);
		toolItem.setText("Load");
		imageLoad = new Image(display, TestCoolBar.class.getResourceAsStream("file_obj.gif"));
		toolItem.setImage(imageLoad);
		toolItem.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				open();
			}
		});
		toolItem = new ToolItem(bar, SWT.NONE);
		toolItem.setText("Load Draft");
		imageLoadDraft = new Image(display, TestCoolBar.class.getResourceAsStream("template_obj.gif"));
		toolItem.setImage(imageLoadDraft);
		toolItem.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				loadDraft();
			}
		});
		toolItem = new ToolItem(bar, SWT.NONE);
		toolItem.setText("Save");
		imageSave = new Image(display, TestCoolBar.class.getResourceAsStream("save_edit.gif"));
		toolItem.setImage(imageSave);
		toolItem.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				save();
			}
		});
		toolItem = new ToolItem(bar, SWT.NONE);
		toolItem.setText("Save As");
		imageSaveAs = new Image(display, TestCoolBar.class.getResourceAsStream("saveas_edit.gif"));
		toolItem.setImage(imageSaveAs);
		toolItem.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				saveAs();
			}
		});

		text = new Text(shell, SWT.BORDER | SWT.V_SCROLL | SWT.H_SCROLL);
		text.setLayoutData(new GridData(GridData.FILL_BOTH | GridData.GRAB_HORIZONTAL | GridData.GRAB_VERTICAL));
		
		//status = new Label(shell, SWT.BORDER);
		status = new Label(shell, SWT.NONE);
		status.setLayoutData(new GridData(GridData.FILL_HORIZONTAL | GridData.GRAB_HORIZONTAL));
		status.setText(".");
		
		shell.open();
		
		//loadNote();
		
		startAutoSavingThread();
		
		return shell;
	}
	
	private Menu createMenuBar() {
		Menu menuBar = new Menu(shell, SWT.BAR);
		shell.setMenuBar(menuBar);
		
		//create each header and subMenu for the menuBar
		createFileMenu(menuBar);
		createHelpMenu(menuBar);
		
		return menuBar;
	}

	private void createFileMenu(Menu menuBar) {
		//File menu.
		MenuItem item = new MenuItem(menuBar, SWT.CASCADE);
		item.setText("File");
		Menu menu = new Menu(shell, SWT.DROP_DOWN);
		item.setMenu(menu);

		//File -> New
		MenuItem subItem = new MenuItem(menu, SWT.NULL);
		subItem.setText("New\tCtrl+F");
		subItem.setAccelerator(SWT.MOD1 + 'F');
		subItem.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				newFile();
			}
		});
		
		subItem = new MenuItem(menu, SWT.NULL);
		subItem.setText("New Window\tCtrl+N");
		subItem.setAccelerator(SWT.MOD1 + 'N');
		subItem.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				TestCoolBar.main(new String[0]);
			}
		});
		
		new MenuItem(menu, SWT.SEPARATOR);
		
		//File -> Open
		subItem = new MenuItem(menu, SWT.NULL);
		subItem.setText("Open\tCtrl+O");
		subItem.setAccelerator(SWT.MOD1 + 'O');
		subItem.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				open();
			}
		});
		
		
		//File -> Load Draft
		subItem = new MenuItem(menu, SWT.NULL);
		subItem.setText("&Load &Draft\tCtrl+D");
		subItem.setAccelerator(SWT.MOD1 + 'D');
		subItem.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				loadDraft();
			}
		});

		//File -> Save.
		subItem = new MenuItem(menu, SWT.NULL);
		subItem.setText("&Save\tCtrl+S");
		subItem.setAccelerator(SWT.MOD1 + 'S');
		subItem.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				save();
			}
		});
		
		//File -> Save as.
		subItem = new MenuItem(menu, SWT.NULL);
		subItem.setText("Save &As");
		subItem.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				saveAs();
			}
		});
			
		new MenuItem(menu, SWT.SEPARATOR);
		
		//File -> Exit.
		subItem = new MenuItem(menu, SWT.NULL);
		subItem.setText("Exit");
		subItem.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				shell.close();
			}
		});
	}

	private void createHelpMenu(Menu menuBar) {
		//Help Menu
		MenuItem item = new MenuItem(menuBar, SWT.CASCADE);
		item.setText("Help");	
		Menu menu = new Menu(shell, SWT.DROP_DOWN);
		item.setMenu(menu);
		
		//Help -> About TestCoolBar
		MenuItem subItem = new MenuItem(menu, SWT.NULL);
		subItem.setText("About");
		subItem.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				MessageBox box = new MessageBox(shell, SWT.NONE);
				box.setText("About");
				box.setMessage("Java2Script Web TestCoolBar 1.0, Nov 2006\r\n\r\n -Created by Zhou Renjian");
				box.open();		
			}
		});
	}

	void newFile() {
		currentFilePath = null;
		tmpPathBeforeSaved = null;
		lastText = lastSavedText = null;
		text.setText("");
		status.setText("New File");
		shell.setText("New - Java2Script Web TestCoolBar");
	}


	void open() {
	}

	private void loadFile() {
	}
	
	void loadDraft() {
		status.setText("Draft loading ...");
	}
	
	void save() {
	}

	private void saveFile(final String contentText) {
	}
	
	void saveAs() {
	}

	void saveTemporaryFile() {
	}
	
	private void startAutoSavingThread() {
		shell.getDisplay().timerExec(AUTO_SAVING_TIME_INTERVAL, new Runnable() {
			public void run() {
				saveTemporaryFile();
			}
		});
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Display display = new Display();
		TestCoolBar notepad = new TestCoolBar();
		if (args.length > 1) {
			notepad.currentFilePath = args[0];
		}
		Shell shell = notepad.open(display);
		// You can comment out the following line and Java application will be run locally.
		//SimpleRPCSWTRequest.switchToAJAXMode();
		while (!shell.isDisposed()) {
			if (!display.readAndDispatch())
				display.sleep();
		}
		if (notepad.imageNew != null) {
			notepad.imageNew.dispose();
			notepad.imageNew = null;
		}
		if (notepad.imageLoad != null) {
			notepad.imageLoad.dispose();
			notepad.imageLoad = null;
		}
		if (notepad.imageLoadDraft != null) {
			notepad.imageLoadDraft.dispose();
			notepad.imageLoadDraft = null;
		}
		if (notepad.imageSave != null) {
			notepad.imageSave.dispose();
			notepad.imageSave = null;
		}
		if (notepad.imageSaveAs != null) {
			notepad.imageSaveAs.dispose();
			notepad.imageSaveAs = null;
		}
		display.dispose();
	}

}
