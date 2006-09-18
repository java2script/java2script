/*******************************************************************************
 * Copyright (c) 2000, 2004 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
package net.sf.j2s.test.swt.widgets;
 
/*
 * Menu example snippet: create a popup menu (set in multiple controls)
 *
 * For a list of all SWT example snippets see
 * http://www.eclipse.org/swt/snippets/
 */
import org.eclipse.swt.*;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.widgets.*;

public class TestPopupMenu {

public static void main (String [] args) {
	Display display = new Display ();
	Shell shell = new Shell (display);
	Composite c1 = new Composite (shell, SWT.BORDER);
	c1.setSize (100, 100);
	Composite c2 = new Composite (shell, SWT.BORDER);
	c2.setBounds (100, 0, 100, 100);
	Menu menu = new Menu (shell, SWT.POP_UP);
	MenuItem item = new MenuItem (menu, SWT.PUSH);
	item.setText ("Popup");
	item = new MenuItem (menu, SWT.SEPARATOR);
	item = new MenuItem (menu, SWT.PUSH);
	item.setText ("Pas&te");
	item.setEnabled(false);
	item = new MenuItem (menu, SWT.PUSH | SWT.CHECK);
	item.setText ("Copy\tCtrl+C");
	item.setSelection(true);
	item.setAccelerator(SWT.CTRL + 'C');
	item = new MenuItem (menu, SWT.CHECK);
	item.setText ("&Cut\tCtrl+X");
	final Image imageOpen = new Image(display, TestButton.class.getResourceAsStream("openFolder.gif"));
	item.setImage(imageOpen);
	item.setSelection(true);
	item.setAccelerator(SWT.CTRL + 'X');
	item = new MenuItem (menu, SWT.RADIO);
	item.setText ("Copy a very &long string \tCtrl+C");
	item.setSelection(true);
	item.setAccelerator(SWT.CTRL + 'T');
	item.addSelectionListener(new SelectionAdapter() {
		public void widgetSelected(SelectionEvent e) {
			System.out.println("Copy cut");
		}
	});
	item = new MenuItem (menu, SWT.RADIO);
	item.setText ("Remove\tCtrl+Shift+X");
	item.setImage(null);
	item.setSelection(true);
	item.setAccelerator(SWT.CTRL + 'R');
	
	item = new MenuItem (menu, SWT.CASCADE);
	item.setText ("Pa&ste");
	
	Menu submenu = new Menu (item);
	MenuItem subitem = new MenuItem (submenu, SWT.PUSH);
	subitem.setText ("Popup");
	subitem = new MenuItem (submenu, SWT.SEPARATOR);
	subitem = new MenuItem (submenu, SWT.PUSH);
	subitem.setText ("Pas&te");
	subitem.setEnabled(false);
	subitem = new MenuItem (submenu, SWT.PUSH | SWT.CHECK);
	subitem.setText ("Copy\tCtrl+C");
	subitem.setSelection(true);
	subitem.setAccelerator(SWT.CTRL + 'C');
	subitem = new MenuItem (submenu, SWT.CHECK);
	subitem.setText ("&Cut\tCtrl+X");
	subitem.setImage(imageOpen);
	subitem.setSelection(true);
	subitem.setAccelerator(SWT.CTRL + 'X');
	subitem = new MenuItem (submenu, SWT.RADIO);
	subitem.setText ("Copy a very long string \tCtrl+C");
	subitem.setSelection(true);
	subitem.setAccelerator(SWT.CTRL + 'T');
	subitem.addSelectionListener(new SelectionAdapter() {
		public void widgetSelected(SelectionEvent e) {
			System.out.println("Copy cut");
		}
	});
	subitem = new MenuItem (submenu, SWT.RADIO);
	subitem.setText ("Remove\tCtrl+Shift+X");
	subitem.setImage(null);
	subitem.setSelection(true);
	subitem.setAccelerator(SWT.CTRL + 'R');

	item.setMenu(submenu);
	
	c1.setMenu (menu);
	c2.setMenu (menu);
	shell.setMenu (menu);
	shell.setSize (300, 300);
	shell.open ();
	while (!shell.isDisposed ()) {
		if (!display.readAndDispatch ()) display.sleep ();
	}
	imageOpen.dispose();
	display.dispose ();
}
} 
