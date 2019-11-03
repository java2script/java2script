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

package net.sf.j2s.test.swt.ajunit;

import net.sf.j2s.ajax.junit.AsyncSWT;
import net.sf.j2s.ajax.junit.AsyncTestCase;
import net.sf.j2s.ajax.junit.AsyncTestRunnable;
import net.sf.j2s.ajax.junit.AsyncTestRunner;
import org.eclipse.swt.SWT;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Shell;

/**
 * @author zhou renjian
 *
 * 2006-8-1
 */
public class LabelTest extends AsyncTestCase {
	
	public void testEmpty() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		new Label(shell, SWT.BORDER).setText("Hello");
		shell.pack();
		shell.open ();
		//while (!shell.isDisposed ()) {
		//	if (!display.readAndDispatch ()) display.sleep ();
		//}
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				assertTrue(true);
			}
		});
		display.dispose ();
	}

	public void testLabelSize() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Label lbl = new Label(shell, SWT.BORDER);
		lbl.setText("Hello");
		
		final Label label0 = new Label(shell, SWT.BORDER);
		label0.setText("Hel\r\n\tlo &World");
		final Label label2 = new Label(shell, SWT.BORDER);
		label2.setText("Hel\r\nlo &Wor&&ld");
		label2.setAlignment(SWT.RIGHT);
		label2.setForeground(new Color(display, 255, 0, 0));
		label2.setEnabled(false);
		label2.setLayoutData(new GridData(250, 50));
		shell.pack();
		shell.open ();
		
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				assertEquals(lbl.getSize(), new Point(25, 15));
			}
		});
		display.dispose ();
	}

	/**
	 * ATTENTION: Always run me as SWT Application or Java2Script Application.
	 * Running me as JUnit Test or Java2Script Unit Test won't work for these
	 * asynchronous unit tests!
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		AsyncTestRunner.asyncRun (LabelTest.class);
	}
}
