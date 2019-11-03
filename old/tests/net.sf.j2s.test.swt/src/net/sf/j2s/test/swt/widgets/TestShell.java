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
 * example snippet: detect CR in a text or combo control (default selelection)
 *
 * For a list of all SWT example snippets see
 * http://www.eclipse.org/swt/snippets/
 */
import org.eclipse.swt.*;
import org.eclipse.swt.widgets.*;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.layout.*;

public class TestShell {

public static void main (String [] args) {
	Display display = new Display ();
	//final Shell shell = new Shell (display, /*SWT.BORDER | SWT.TITLE | SWT.MAX | */SWT.RESIZE /*| SWT.MIN | SWT.CLOSE*/);
	final Shell shell = new Shell (display);
	shell.setText ("hixxxxx");
	int style = shell.getStyle();
	int w = 0;
	int h = 0;
	if ((style & (SWT.TITLE | SWT.CLOSE | SWT.MIN | SWT.MAX)) != 0) {
		w = 113;
		h = 28;
	}
	System.out.println(w);
	System.out.println(h);
	shell.setBackground(new Color(display, 255, 0, 0));
	shell.setLayout (new GridLayout (3, false));
	shell.setLocation(0, 0);
	final Link link1 = new Link(shell, SWT.NONE);
	link1.setText("Hello J2S");
	System.out.println(".fdsasd.");
	link1.setSize(150, 24);
	final Link link2 = new Link(shell, SWT.NONE);
	link2.setText("Hello <a href=\"#\">J2S</a>");
	link2.setSize(150, 24);
	link2.addSelectionListener(new SelectionAdapter() {
	
		public void widgetSelected(SelectionEvent e) {
			System.out.println(link1.getSize());
			System.out.println(link2.getSize());
			
			Shell dialog = new Shell(shell, SWT.DIALOG_TRIM | SWT.RESIZE);
			dialog.setLayout(new GridLayout());
			dialog.setMinimumSize(503, 332);
			
			System.out.println(dialog.getClientArea());
			System.out.println(dialog.getSize());
			System.out.println(dialog.computeSize (SWT.DEFAULT, SWT.DEFAULT, true));
			dialog.open ();
			System.out.println(dialog.getClientArea());
			System.out.println(dialog.getSize());
			System.out.println(dialog.computeSize (SWT.DEFAULT, SWT.DEFAULT, true));
			dialog.pack ();
			System.out.println(dialog.getClientArea());
			System.out.println(dialog.getSize());
			System.out.println(dialog.computeSize (SWT.DEFAULT, SWT.DEFAULT, true));
		}
	
	});
	new Group(shell, SWT.NONE).setText("Hello J2S");
	new Composite(shell, SWT.BORDER);
	System.out.println(shell.getClientArea());
	System.out.println(shell.getSize());
//	shell.pack();
	shell.setSize(210, 120);
	System.out.println(shell.getClientArea());
	System.out.println(shell.getSize());
	shell.open ();
	System.out.println(shell.getClientArea());
	System.out.println(shell.getSize());
	shell.pack ();
	System.out.println(shell.getClientArea());
	System.out.println(shell.getSize());
	System.out.println();
	while (!shell.isDisposed()) {
		if (!display.readAndDispatch ()) display.sleep ();
	}
	display.dispose ();
}

} 
