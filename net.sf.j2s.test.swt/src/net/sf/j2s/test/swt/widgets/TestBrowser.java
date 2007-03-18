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

import org.eclipse.swt.SWT;
import org.eclipse.swt.browser.Browser;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Widget;

/**
 * @author zhou renjian
 *
 * 2006-5-21
 */
public class TestBrowser {
	static final String[] imageLocations = {
		"closedFolder.gif",
		"openFolder.gif",
		"target.gif" };
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		System.out.println("hello\tworld");
		System.out.println("\thello\tworld");
		Image imageOpen = new Image(display, TestBrowser.class.getResourceAsStream("openFolder.gif"));
//		final Label label = new Label(shell, SWT.NONE);
//		label.setText("Hello World");
		final Label label0 = new Label(shell, SWT.BORDER);
		label0.setText("Hel\r\n\tlo &World");
		final Label label2 = new Label(shell, SWT.BORDER);
		label2.setText("Hel\r\nlo &Wor&&ld");
		label2.setAlignment(SWT.RIGHT);
		label2.setForeground(new Color(display, 255, 0, 0));
		label2.setEnabled(false);
		label2.setLayoutData(new GridData(250, 50));
//		final Label label3 = new Label(shell, SWT.BORDER | SWT.SEPARATOR);
//		label3.setText("Hello World");
//		final Label label4 = new Label(shell, SWT.BORDER | SWT.SEPARATOR | SWT.HORIZONTAL | SWT.SHADOW_NONE);
//		label4.setText("Hello World");
//		label4.setLayoutData(new GridData(50, 50));
		final Label label5 = new Label(shell, SWT.BORDER | SWT.WRAP);
		label5.setText("Copyright (c) 2006 ognize.com and others.All rights reserved. This program and the accompanying materials");
		final Label label6 = new Label(shell, SWT.BORDER | SWT.WRAP);
		final Font font = new Font(display, "Arial", 14, SWT.BOLD | SWT.ITALIC);
		//label6.setFont(font);
		label6.setText("Copyright (c) 2006 ognize.com and others.\r\nAll &rights reserved. This program and the accompanying materials");
		GridData gd = new GridData();
		gd.widthHint = 100;
		label6.setLayoutData(gd);
		final Label label7 = new Label(shell, SWT.BORDER);
		label7.setImage(imageOpen);
		label7.setAlignment(SWT.RIGHT);
		label7.setText("Hi...");
		label7.setLayoutData(new GridData(250, 50));
		
		final Browser browser = new Browser(shell, SWT.NONE);
		browser.setUrl("http://c.ognize.com/");
		
		Button button = new Button(shell, SWT.PUSH);
		button.setText("Test");
		button.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				System.out.println("************");
				print (label0);
				print (label2);
//				print (label3);
//				print (label4);
//				print (label5);
				
//				print (label6);
//				print (label7);
//				
//				label6.setFont(font);
//				label2.setEnabled(true);
//				shell.pack(true);
				print (browser);
				//shell.layout();
			}
		});
		shell.pack();
		shell.open ();
		while (!shell.isDisposed ()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}
		display.dispose ();
		font.dispose();
		imageOpen.dispose();
	}
	public static void print(Control label) {
		System.out.println(label.getSize());
		System.out.println(label.getBounds());
		System.out.println(label.getBorderWidth());
		System.out.println(label.getLocation());
		System.out.println(label.getFont().getFontData()[0].height);
		System.out.println("..======..");
	}
}
