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
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.MessageBox;
import org.eclipse.swt.widgets.Shell;

public class TestDialog {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Display display = new Display();
		final Shell shell = new Shell(display);
		shell.setLayout(new FillLayout());
		Button button = new Button(shell, SWT.PUSH);
		button.addSelectionListener(new SelectionAdapter() {
		
			public void widgetSelected(SelectionEvent arg0) {
				System.out.println("Hello");
				MessageBox messageBox = new MessageBox(shell);
				int open = messageBox.open();
				System.out.println(open);
			}
		
		});
		shell.open();
		while (!shell.isDisposed())
			if (!shell.getDisplay().readAndDispatch()) shell.getDisplay().sleep();
		display.dispose();
	}

}
