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
 */
public class ControlExample {
	private static ResourceBundle resourceBundle;

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
		String[] tabs = getTabs();
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

	String[] getTabs() {
		String[] tabs = new String[] {
//				"Table",
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
		return tabs;
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
		if (resourceBundle == null) {
			/**
			 * @j2sNative
			 * java.util.ResourceBundle.registerBundle("examples_control", "error.CouldNotLoadResources = Unable to load resources\nwindow.title = SWT Controls\ncustom.window.title = SWT Custom Controls\n\nText_Buttons\t\t= Text Buttons\nSize \t\t\t\t= Size\nAlignment\t\t\t= Alignment\nLeft\t\t\t\t= Left\nRight\t\t\t\t= Right\nUp\t\t\t\t\t= Up\nDown\t\t\t\t= Down\nCenter\t\t\t\t= Center\nOne\t\t\t\t\t= One\nTwo\t\t\t\t\t= Two\nThree\t\t\t\t= Three\nImage_Buttons\t\t= Image Buttons\nControl_Example\t\t= Control Example\nParameters\t\t\t= Parameters\nOther\t\t\t\t= Other\nEnabled\t\t\t\t= Enabled\nVisible\t\t\t\t= Visible\nPreferred \t\t\t= Preferred\nStyles\t \t\t\t= Styles\nMenu_Styles\t \t\t= Menu Styles\nMenuItem_Styles\t \t= MenuItem Styles\nListeners\t\t\t= Listeners\nSelect_Listeners\t= Select Listeners\nListen\t\t\t\t= Listen\nClear\t\t\t\t= Clear\nSet_Get\t\t\t\t= Set/Get API\nParameter_Info\t\t= {0}   e.g. {1} \nInfo_int\t\t\t= 4\nInfo_intA\t\t\t= 1,2,3\nInfo_long\t\t\t= 4\nInfo_longA\t\t\t= 1,2,3\nInfo_char\t\t\t= c\nInfo_charA\t\t\t= c,d,e\nInfo_boolean\t\t= true\nInfo_booleanA\t\t= true,true\nInfo_String\t\t\t= hello\nInfo_StringA\t\t= hello,there\nInfo_Point\t\t\t= 0,0\nInfo_TabItem\t\t= Tab 0\nInfo_TabItemA\t\t= Tab 0,Tab 2\nInfo_TableItem\t\t= Index:2\nInfo_TableItemA\t\t= Index:2,Index:4\nInfo_TreeItem\t\t= Node 1\nInfo_TreeItemA\t\t= Node 1,Node 3\nSelect_All\t\t\t= Select All\nDeselect_All\t\t= Deselect All\nOK\t\t\t\t\t= OK\nFillDamage\t\t\t= Fill Damaged Area With Color\nTitle_Text\t\t\t= Title Text\nText_Labels\t\t\t= Text Labels\nImage_Labels\t\t= Image Labels\nCustom_Labels\t\t= Custom Labels\nCustom_Combo\t\t= Custom Combo\nOne_Two_Three\t\t= One Two Three\nText_ToolBar \t\t= Text ToolBar\nImage_ToolBar \t\t= Image ToolBar\nImageText_ToolBar\t= Image and Text ToolBar\nMaximum\t\t\t\t= Maximum\nMinimum\t\t\t\t= Minimum\nSelection\t\t\t= Selection\nIncrement\t\t\t= Increment\nPage_Increment\t\t= Page Increment\nThumb\t\t\t\t= Thumb\nDigits\t\t\t\t= Digits\nTree_With_Images\t= Tree With Images\nDialog_Type\t\t\t= Dialog Type\nCreate_Dialog\t\t= Create Dialog\nButton_Styles\t\t= Button Styles\nIcon_Styles\t\t\t= Icon Styles\nModal_Styles\t\t= Modal Styles\nFile_Dialog_Styles\t= File Dialog Styles\nItem_Styles\t\t\t= Item Styles\nDialog_Result\t\t= Dialog Result\nColorDialog\t\t\t= ColorDialog\nDirectoryDialog\t\t= DirectoryDialog\nFileDialog\t\t\t= FileDialog\nFontDialog\t\t\t= FontDialog\nPrintDialog\t\t\t= PrintDialog\nMessageBox\t\t\t= MessageBox\nMulti_line\t\t\t= A multi line text widget.\nExample_string\t\t= The quick brown fox jumps over the lazy dog.\nHeader_Visible\t\t= Header Visible\nLines_Visible\t\t= Lines Visible\nMoveable_Columns\t= Moveable Columns\nMultiple_Columns\t= Multiple Columns\nLocked\t\t\t\t= Locked\nCombo_child\t\t\t= Combo Child\nNode_1\t\t\t\t= Node 1\nNode_2\t\t\t\t= Node 2\nNode_3\t\t\t\t= Node 3\nNode_4\t\t\t\t= Node 4\nNode_1_1\t\t\t= Node 1.1\nNode_2_1\t\t\t= Node 2.1\nNode_3_1\t\t\t= Node 3.1\nNode_2_2\t\t\t= Node 2.2\nNode_2_2_1\t\t\t= Node 2.2.1\nParent\t\t\t\t= Parent\nNo_Parent\t\t\t= No Parent\nDecoration_Styles\t= Decoration Styles\nCreate_Shell\t\t= Create Shell\nClose_All_Shells\t= Close All Shells\nPush\t\t\t\t= Push\nRadio\t\t\t\t= Radio\nCheck\t\t\t\t= Check\nCascade\t\t\t\t= Cascade\nDrop_Down\t\t\t= Drop Down\nImages_failed\t\t= Warning: Failed to load images\nreadme_txt\t\t\t= readme.txt\nIndex\t\t\t\t= Index:\nTitle\t\t\t\t= Title:\nClose\t\t\t\t= Close\nResult\t\t\t\t= Result: {0}\nFilterName_0\t\t= Text Files\nFilterName_1\t\t= Batch Files\nFilterName_2\t\t= Doc Files\nFilterName_3\t\t= All Files\nTableTitle_0\t\t= Name\nTableTitle_1\t\t= Type\nTableTitle_2\t\t= Size\nTableTitle_3\t\t= Modified\nTableLine0_0\t\t= <empty>\nTableLine0_1\t\t= classes\nTableLine0_2\t\t= 0\nTableLine0_3\t\t= today\nTableLine1_0\t\t= <empty>\nTableLine1_1\t\t= databases\nTableLine1_2\t\t= 2556\nTableLine1_3\t\t= tomorrow\nTableLine2_0\t\t= <empty>\nTableLine2_1\t\t= images\nTableLine2_2\t\t= 91571\nTableLine2_3\t\t= yesterday\nListData0_0\t\t\t= Line 1\nListData0_1\t\t\t= Line 2\nListData0_2\t\t\t= Line 3\nListData0_3\t\t\t= Line 4\nListData0_4\t\t\t= Line 5\nListData0_5\t\t\t= Line 6\nListData0_6\t\t\t= Line 7\nListData0_7\t\t\t= Line 8\nListData0_8\t\t\t= Longest Line In List\nListData1_0\t\t\t= Apples\nListData1_1\t\t\t= Oranges\nListData1_2\t\t\t= Bananas\nListData1_3\t\t\t= Grapefruit\nListData1_4\t\t\t= Peaches\nListData1_5\t\t\t= Kiwi\nListData1_6\t\t\t= Apricots\nListData1_7\t\t\t= Strawberries\nListData1_8\t\t\t= The Longest String\nDropDownData_0\t\t= Apples\nDropDownData_1\t\t= Oranges\nDropDownData_2\t\t=\nDropDownData_3\t\t= Grapefruit\nDropDownData_4\t\t= Peaches\nDropDownData_5\t\t= Kiwi\nDropDownData_6\t\t=\nDropDownData_7\t\t= Strawberries\nDropDownData_8\t\t= The Longest String\nColors \t\t\t\t= Colors and Font\nTable_Item_Colors\t= Row 0 Colors and Font\nTree_Item_Colors\t= Node 1 Colors and Font\nItem_Font\t\t\t= Item Font ...\nBackground_Color\t= Background Color\nForeground_Color\t= Foreground Color\nFont\t\t\t\t= &Font...\nDefaults\t\t\t= &Defaults\nWrap_Text\t\t\t= Jack and Jill went up the hill to fetch a pail of water, \\\n\t\t\t\t\t  Jack fell down and broke his crown and Jill came tumbling after!\nForeground_Style\t= Foreground Style\nBackground_Style \t= Background Style\nStyledText_Styles\t= Text Styles\nStyledText_Style_Instructions\t= Select text, then style.\nBold\t\t\t\t= Bold\nItalic\t\t\t\t= Italic\nUnderline\t\t= Underline\nStrikeout\t\t= Strikeout\nFill\t\t\t\t= Horizontal Fill\nTabItem1_0\t\t\t= Tab 0\nTabItem1_1\t\t\t= Tab 1\nTabItem1_2\t\t\t= Tab 2\nTabItem_content\t\t= TabItem Content\nCTabItem1_0\t\t\t= CTabItem 0\nCTabItem1_1\t\t\t= CTabItem 1\nCTabItem1_2\t\t\t= CTabItem 2 has a long name\nCItem_Colors\t\t= CTabItem Colors\nCTabItem_content\t= CTabItem Content\nSet_Simple_Tabs\t\t= Simple Tabs\nSet_Single_Tabs\t\t= Single Tab\nSet_Min_Visible     = Minimize\nSet_Max_Visible     = Maximize\nSet_Unselected_Close_Visible = Close on Unselected Tabs\nSet_Unselected_Image_Visible = Image on Unselected Tabs\nSelection_Foreground_Color = Selection Foreground Color\nSelection_Background_Color = Selection Background Color\nSet_Image\t\t\t= Set Image\nTableTree_column\t= Column\nMenuItem_Cut\t\t= Cu&t\tCtrl+X\nMenuItem_Copy\t\t= &Copy\tCtrl+C\nMenuItem_Paste\t\t= &Paste\tCtrl+V\nMenuItem_SelectAll\t= Select &All\tCtrl+A\nOrientation \t\t= Orientation\nDefault \t\t\t= Default (Inherit)\nImages\t\t\t\t= Images\nImage\t\t\t\t= Image\nAccelerators\t\t= Accelerators\nMnemonics\t\t\t= Mnemonics\nSubMenu\t\t\t\t= Sub-Menu\nSubSubMenu\t\t\t= Sub-Sub-Menu\n1Radio\t\t\t\t= Radio1\n2Radio\t\t\t\t= Radio2\n1RadioWithMnemonic\t= Radio&1\n2RadioWithMnemonic\t= Radio&2\nPushWithMnemonic\t= &Push\nRadioWithMnemonic\t= &Radio\nCheckWithMnemonic\t= &Check\nCascadeWithMnemonic\t= C&ascade\nPopupMenuHere\t\t= Popup Menu Here\nLinkText=Visit the <A HREF=\\\"www.eclipse.org\\\">Eclipse.org</A> project and the <A HREF=\\\"www.eclipse.org\\\\swt\">SWT</A> homepage.\n");
			 */ { }
			 resourceBundle = ResourceBundle.getBundle("examples_control");
		}
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
		Shell shell = new Shell(display, SWT.SHELL_TRIM);
		shell.setLayout(new FillLayout());
		ControlExample instance = new ControlExample(shell);
		shell.setText(getResourceString("window.title"));
//		setShellSize(display, shell);
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

