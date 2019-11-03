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
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.graphics.ImageData;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Menu;
import org.eclipse.swt.widgets.MenuItem;
import org.eclipse.swt.widgets.MessageBox;
import org.eclipse.swt.widgets.Shell;

public class TestImageLabel {
	public static void main(String[] args) {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setText("Image");
		shell.setLayout(new GridLayout());
		Image imageOpen = new Image(display, TestImageLabel.class.getResourceAsStream("openFolder.gif"));
		final Label label = new Label(shell, SWT.BORDER);
		label.setBackground(new Color(display, 255, 255, 255));
		label.setImage(imageOpen);
		label.setAlignment(SWT.CENTER);
		label.setLayoutData(new GridData(250, 50));
		
		Menu menu = new Menu (shell, SWT.POP_UP);
		MenuItem item = new MenuItem (menu, SWT.PUSH);
		item.setText ("Properties");
		item.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				MessageBox messageBox = new MessageBox(shell);
				ImageData id = label.getImage().getImageData();
				
				messageBox.setText("Properties");
				/*
				 * Sorry to found a bug that image data's width and height are 0.
				 * You may have to get whatever from native JavaScript.
				 */
				messageBox.setMessage("Size : " + id.width + " x " + id.height);
				messageBox.open();
			}
		});
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
		item.setSelection(true);
		item.setAccelerator(SWT.CTRL + 'X');

		label.setMenu(menu);

		shell.pack();
		shell.open ();
		while (!shell.isDisposed ()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}
		display.dispose ();
		imageOpen.dispose();
	}
}
