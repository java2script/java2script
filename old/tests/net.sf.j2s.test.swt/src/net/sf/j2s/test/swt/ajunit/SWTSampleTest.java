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
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;

/**
 * @author zhou renjian
 *
 * 2006-8-1
 */
public class SWTSampleTest extends AsyncTestCase {
	
	public void testEmpty() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		new Button(shell, SWT.BORDER);
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

	public void testButtonSize() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Button btn = new Button(shell, SWT.BORDER);
		shell.pack();
		shell.open ();
		
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				assertEquals(btn.getSize(), new Point(16, 27));
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
		AsyncTestRunner.asyncRun (SWTSampleTest.class);
	}
}
