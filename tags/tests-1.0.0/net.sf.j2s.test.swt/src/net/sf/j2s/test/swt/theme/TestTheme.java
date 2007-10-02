/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Soheil Hassas Yeganeh - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.test.swt.theme;

import org.eclipse.swt.SWT;
import org.eclipse.swt.browser.Browser;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
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

/**
 * @author Soheil Hassas Yeganeh
 *
 */
public class TestTheme {
	static final String[] themes = {
		"theme1",
		"theme2"};
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		final Button button = new Button(shell, SWT.BORDER);
		button.setText("Change to theme1");
		button.addSelectionListener(new SelectionAdapter(){
			public void widgetSelected(SelectionEvent e){
				/**
				 * @j2sNative
				 * $WTC$$.registerTheme("theme1", "theme1");
				 */{}
			}
		});
		final Button button2 = new Button(shell, SWT.BORDER);
		button2.setText("Change to theme2");
		button2.addSelectionListener(new SelectionAdapter(){
			public void widgetSelected(SelectionEvent e){
				/**
				 * @j2sNative
				 * $WTC$$.registerTheme("theme2", "theme2");
				 */{}
			}
		});
		
		shell.pack();
		shell.open ();
		while (!shell.isDisposed ()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}
		display.dispose ();
	}
}
