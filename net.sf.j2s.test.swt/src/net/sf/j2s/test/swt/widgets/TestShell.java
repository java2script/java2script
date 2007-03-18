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
import java.util.Date;
import org.eclipse.swt.*;
import org.eclipse.swt.widgets.*;
import org.eclipse.swt.events.MouseEvent;
import org.eclipse.swt.events.MouseMoveListener;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.layout.*;

public class TestShell {

public static void main (String [] args) {
	Display display = new Display ();
	final Shell shell = new Shell (display, /*SWT.BORDER | SWT.TITLE | SWT.MAX | */SWT.RESIZE /*| SWT.MIN | SWT.CLOSE*/);
	shell.setText ("hi");
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
//	final Composite c0 = new Composite(shell, SWT.NONE);
//	final Composite c1 = new Composite(shell, SWT.BORDER);
//	final Composite c2 = new Composite(shell, SWT.BORDER);
//	c2.setLayout(new GridLayout());
//	c2.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
//	final Composite c4 = new Composite(shell, SWT.BORDER);
//	c4.setLayout(new GridLayout(2, true));
//	c4.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
//	
//	final Composite c5 = new Composite(c4, SWT.BORDER);
//	c5.setLayout(new GridLayout());
//	c5.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
//	
//	final Composite c6 = new Composite(c4, SWT.BORDER);
//	c6.setLayout(new GridLayout());
//	final Button r1 = new Button(c6, SWT.RADIO);
//	r1.setText("Hi");
//	final Button r2 = new Button(c6, SWT.RADIO);
//	r2.setText("Hello");
//	final Button r3 = new Button(c6, SWT.PUSH);
//	r3.setText("World");
//	final Label l1 = new Label(c6, SWT.NONE);
//	l1.setText("World");
//	final Label l2 = new Label(c6, SWT.BORDER);
//	l2.setText("Great");
//	
//	c5.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
//	
//	final Composite c3 = new Composite(shell, SWT.BORDER);
//	c3.setLayout(new GridLayout());
//	c3.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
//	final Button btn = new Button(c3, SWT.PUSH);
//	btn.setText("Hello");
	shell.setLocation(0, 0);
//	new Button(shell, SWT.PUSH).addSelectionListener(new SelectionAdapter() {
//		public void widgetSelected(SelectionEvent e) {
//		}
//	});
//	new Button(shell, SWT.PUSH).addSelectionListener(new SelectionAdapter() {
//		public void widgetSelected(SelectionEvent e) {
//		}
//	});
//	new Button(shell, SWT.PUSH).addSelectionListener(new SelectionAdapter() {
//		public void widgetSelected(SelectionEvent e) {
//		}
//	});
//	Button button = new Button(shell, SWT.CHECK);
//	Text text = new Text(shell, SWT.CHECK);
//	button.setText("Test");
	/*
	Label label = new Label(shell, SWT.NONE);
	label.setText("Hello J2S");
	label.addMouseMoveListener(new MouseMoveListener() {
		public void mouseMove(MouseEvent e) {
		// TODO Auto-generated method stub
		}
	});
	new Label(shell, SWT.NONE).setText("Hello J2S");
	new Label(shell, SWT.NONE).setText("Hello J2S");
	new Label(shell, SWT.NONE).setText("Hello J2S");
	new Link(shell, SWT.NONE).setText("Hello J2S");
	*/
	new Link(shell, SWT.NONE).setText("Hello J2S");
	new Link(shell, SWT.NONE).setText("Hello J2S");
	new Group(shell, SWT.NONE).setText("Hello J2S");
	new Composite(shell, SWT.BORDER);
//	button.addSelectionListener(new SelectionAdapter() {
//		public void widgetSelected(SelectionEvent e) {
//			System.out.println("************");
////			print(c0);
////			print(c1);
////			print(c2);
////			print(c3);
////			print(btn);
////			print(c4);
////			print(c5);
////			print(c6);
////			print(r1);
////			print(r2);
////			print(r3);
////			print(l1);
////			print(l2);
//			print(shell);
//		}
//	});
	System.out.println(shell.getClientArea());
	System.out.println(shell.getSize());
//	shell.pack();
	shell.setSize(210, 120);
	System.out.println(shell.getClientArea());
	System.out.println(shell.getSize());
	shell.open ();
	System.out.println(shell.getSize());
	while (!shell.isDisposed()) {
		if (!display.readAndDispatch ()) display.sleep ();
	}
	display.dispose ();
}
public static void print(Button btn) {
//	System.out.println(btn.getSize());
	System.out.println(btn.getBounds());
	System.out.println(btn.getBorderWidth());
//	System.out.println(btn.getLocation());
	System.out.println("..======..");
}
public static void print(Label btn) {
//	System.out.println(btn.getSize());
	System.out.println(btn.getBounds());
	System.out.println(btn.getBorderWidth());
//	System.out.println(btn.getLocation());
	System.out.println("..======..");
}
public static void print(Composite c) {
//	System.out.println(c.getSize());
	System.out.println(c.getBounds());
	System.out.println(c.getBorderWidth());
	System.out.println(c.getClientArea());
	System.out.println("..======..");
}

} 
