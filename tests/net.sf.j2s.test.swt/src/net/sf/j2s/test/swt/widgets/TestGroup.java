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
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Shell;

public class TestGroup {

public static void main (String [] args) {
	Display display = new Display ();
	final Shell shell = new Shell (display);
	//shell.setLayout (new FillLayout ());
	shell.setLayout (new GridLayout ());
	final Group group = new Group(shell, SWT.BORDER | SWT.SHADOW_NONE);
//	group.setText("Colors and Font and Long and Long");
	group.setLayout(new GridLayout(2, true));
//	group.setLayoutData(new GridData(220, 100));
	final Button btn = new Button(group, SWT.PUSH);
	btn.setText("Cool");
	
	final Button btn2 = new Button(group, SWT.PUSH);
	btn2.setText("Thing");

	final Group groupLeft = new Group(group, SWT.BORDER | SWT.SHADOW_ETCHED_IN);
	groupLeft.setText("Left");
	groupLeft.setLayoutData(new GridData(GridData.FILL_BOTH));
	groupLeft.setLayout(new GridLayout());

	final Group groupRight = new Group(group, SWT.BORDER | SWT.SHADOW_ETCHED_OUT);
	groupRight.setText("Right");
	groupRight.setLayoutData(new GridData(GridData.FILL_BOTH));
	groupRight.setLayout(new GridLayout());
	
	Button button1 = new Button(groupRight, SWT.RADIO);
	button1.setText("SWT.radio 1");
	
	Button button2 = new Button(groupRight, SWT.RADIO);
	button2.setText("SWT.radio 2");
	
	final Button button3 = new Button(groupRight, SWT.PUSH);
	button3.setText("SWT.push");
	button3.addSelectionListener(new SelectionAdapter() {
		public void widgetSelected(SelectionEvent e) {
			System.out.println(button3.getBounds());
		}
	});
	Button button4 = new Button(groupRight, SWT.CHECK);
	button4.setText("SWT.check");

	Button button = new Button(shell, SWT.PUSH);
	button.setText("Test");
	button.addSelectionListener(new SelectionAdapter() {
		public void widgetSelected(SelectionEvent e) {
			System.out.println("************");
			print(group);
			print(btn);
			print(btn2);
//			print(groupLeft);
		}
	});
	Button disp = new Button(shell, SWT.PUSH);
	disp.setText("Dispose");
	disp.addSelectionListener(new SelectionAdapter() {
		public void widgetSelected(SelectionEvent e) {
			System.out.println("************");
			groupLeft.dispose();
			Group groupRight = new Group(group, SWT.BORDER | SWT.SHADOW_ETCHED_OUT);
			groupRight.setText("Right");
			groupRight.setLayoutData(new GridData(GridData.FILL_BOTH));
			groupRight.setLayout(new GridLayout());
			shell.pack();
			//shell.layout();
//			print(groupLeft);
		}
	});

//	shell.setSize (320, 200);
	shell.pack();
	System.out.println(shell.getClientArea());
	shell.open ();
	while (!shell.isDisposed()) {
		if (!display.readAndDispatch ()) display.sleep ();
	}
	display.dispose ();
}
public static void print(Composite c) {
//	System.out.println(c.getSize());
	System.out.println(c.getBounds());
	System.out.println(c.getBorderWidth());
//	System.out.println(c.getLocation());
	System.out.println("..======..");
}
public static void print(Button btn) {
//	System.out.println(btn.getSize());
	System.out.println(btn.getBounds());
	System.out.println(btn.getBorderWidth());
//	System.out.println(btn.getLocation());
	System.out.println("..======..");
}
} 
