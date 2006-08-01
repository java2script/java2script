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
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.TabFolder;
import org.eclipse.swt.widgets.TabItem;
import org.eclipse.swt.widgets.Text;

public class TestTabFolder {

public static void main (String [] args) {
	Display display = new Display ();
	final Shell shell = new Shell (display);
	//shell.setLayout (new FillLayout ());
	shell.setLayout (new GridLayout ());
	Image imageOpen = new Image(display, TestTabFolder.class.getResourceAsStream("openFolder.gif"));
//	final TabFolder tf = new TabFolder(shell, SWT.BORDER | SWT.SHADOW_NONE);
//	group.setText("Colors and Font and Long and Long");
//	tf.setLayout(new GridLayout(2, true));
//	tf.setLayoutData(new GridData(220, 100));
//	
//	final Button btn = new Button(tf, SWT.PUSH);
//	btn.setText("Cool");
//	
//	final Button btn2 = new Button(tf, SWT.PUSH);
//	btn2.setText("Thing");
//	final Group group = new Group(shell, SWT.BORDER);
//	group.setText("Colors and Font and Long and Long");
//	group.setLayout(new GridLayout(1, true));

	final TabFolder tf2 = new TabFolder(shell, SWT.NONE | SWT.TOP);
	final TabItem ti1 = new TabItem(tf2, SWT.NONE);
	Font font = new Font(display, "Tahoma", 18, SWT.NONE);
//	tf2.setFont(font);
	ti1.setText("World");
	final TabItem ti2 = new TabItem(tf2, SWT.NONE | SWT.RIGHT_TO_LEFT);
	ti2.setText("World");
//	final TabItem ti3 = new TabItem(tf2, SWT.NONE);
//	ti3.setText("World");
	final Button btnCool = new Button(tf2, SWT.PUSH);
	btnCool.setText("Cool");
//	ti1.setControl(btnCool);
	
	final Text txtCool = new Text(tf2, SWT.SINGLE);
	txtCool.setText("Cool");
	ti1.setControl(txtCool);
//	ti2.setImage(imageOpen);
	
//	final Button btnThing = new Button(tf2, SWT.PUSH);
//	btnThing.setText("Thing");
//	ti2.setControl(btnThing);
//	final Button btnThink = new Button(tf2, SWT.PUSH);
//	btnThink.setText("Think");
//	ti3.setControl(btnThink);
//	new TabItem(tf2, SWT.NONE).setText("World");
//	new TabItem(tf2, SWT.NONE).setText("World");
//	new TabItem(tf2, SWT.NONE | SWT.RIGHT_TO_LEFT).setText("Hello long long and long");
	new TabItem(tf2, SWT.NONE).setText("World");
	TabItem ti5 = new TabItem(tf2, SWT.NONE);
	ti5.setText("World");
	final Text txt2Cool = new Text(tf2, SWT.SINGLE);
	txt2Cool.setText("Cool");
	ti5.setControl(txt2Cool);
//	new TabItem(tf2, SWT.NONE).setText("World");
//	new TabItem(tf2, SWT.NONE).setText("Wor");
//	new TabItem(tf2, SWT.NONE).setText("World");
//	new TabItem(tf2, SWT.NONE).setText("Wor");
//	new TabItem(tf2, SWT.NONE).setText("World");
//	new TabItem(tf2, SWT.NONE).setText("Wor");
//	tf2.setSelection(1);
	tf2.setLayoutData(new GridData(230, 80));
	
	Button button = new Button(shell, SWT.PUSH);
	button.setText("Test");
	button.addSelectionListener(new SelectionAdapter() {
		public void widgetSelected(SelectionEvent e) {
			System.out.println("************");
			tf2.setSelection(7);
			
//			print(tf);
//			print(btn);
//			print(btn2);
			print(btnCool);
			print(txtCool);
			print(txt2Cool);
//			print(btnThink);
			print(tf2);
//			print(groupLeft);
//			shell.layout();
		}
	});
	Button disp = new Button(shell, SWT.PUSH);
	disp.setText("Dispose");
	disp.addSelectionListener(new SelectionAdapter() {
		public void widgetSelected(SelectionEvent e) {
			System.out.println("************");
//			groupLeft.dispose();
//			Group groupRight = new Group(tf, SWT.BORDER | SWT.SHADOW_ETCHED_OUT);
//			groupRight.setText("Right");
//			groupRight.setLayoutData(new GridData(GridData.FILL_BOTH));
//			groupRight.setLayout(new GridLayout());
//			shell.pack();
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
	imageOpen.dispose();
	font.dispose();
	display.dispose ();
}
public static void print(Composite c) {
//	System.out.println(c.getSize());
	System.out.println(c.getBounds());
	System.out.println(c.getBorderWidth());
	System.out.println("[]" + c.getClientArea());
	System.out.println("..======..");
}
public static void print(Button btn) {
//	System.out.println(btn.getSize());
	System.out.println(btn.getBounds());
	System.out.println(btn.getBorderWidth());
	System.out.println("..======..");
}
public static void print(Text btn) {
//	System.out.println(btn.getSize());
	System.out.println(btn.getBounds());
	System.out.println(btn.getBorderWidth());
	System.out.println("..======..");
}
} 
