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
import org.eclipse.swt.graphics.Rectangle;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.ProgressBar;
import org.eclipse.swt.widgets.Shell;

/**
 * @author zhou renjian
 *
 * 2006-8-1
 */
public class ProgressBarTest extends AsyncTestCase {

	public void testDefaultSize() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final ProgressBar progressD = new ProgressBar(shell, SWT.NONE);
		final ProgressBar progressB = new ProgressBar(shell, SWT.BORDER);
		final ProgressBar progressV = new ProgressBar(shell, SWT.VERTICAL);
		final ProgressBar progressS = new ProgressBar(shell, SWT.SMOOTH);
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(progressD.getSize());
				System.out.println(progressB.getSize());
				System.out.println(progressV.getSize());
				System.out.println(progressS.getSize());
				
				assertEquals(progressD.getSize(), new Point(162, 18));
				assertEquals(progressB.getSize(), new Point(162, 18));
				assertEquals(progressV.getSize(), new Point(18, 162));
				assertEquals(progressS.getSize(), new Point(162, 18));
			}
		});
		display.dispose ();
	}


	public void testFilledSize() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new FillLayout());
		final ProgressBar progressD = new ProgressBar(shell, SWT.NONE);
		final ProgressBar progressB = new ProgressBar(shell, SWT.BORDER);
		final ProgressBar progressV = new ProgressBar(shell, SWT.VERTICAL);
		final ProgressBar progressS = new ProgressBar(shell, SWT.SMOOTH);
		shell.setSize(240, 135);
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(progressD.getSize());
				System.out.println(progressB.getSize());
				System.out.println(progressV.getSize());
				System.out.println(progressS.getSize());
				
				assertEquals(progressD.getSize(), new Point(58, 107));
				assertEquals(progressB.getSize(), new Point(58, 107));
				assertEquals(progressV.getSize(), new Point(58, 107));
				assertEquals(progressS.getSize(), new Point(58, 107));
			}
		});
		display.dispose ();
	}


	public void testDefaultBounds() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final ProgressBar progressD = new ProgressBar(shell, SWT.NONE);
		final ProgressBar progressB = new ProgressBar(shell, SWT.BORDER);
		final ProgressBar progressV = new ProgressBar(shell, SWT.VERTICAL);
		final ProgressBar progressS = new ProgressBar(shell, SWT.SMOOTH);
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(progressD.getBounds());
				System.out.println(progressB.getBounds());
				System.out.println(progressV.getBounds());
				System.out.println(progressS.getBounds());
				
				assertEquals(progressD.getBounds(), new Rectangle(5, 5, 162, 18));
				assertEquals(progressB.getBounds(), new Rectangle(5, 28, 162, 18));
				assertEquals(progressV.getBounds(), new Rectangle(5, 51,18, 162));
				assertEquals(progressS.getBounds(), new Rectangle(5, 218, 162, 18));
			}
		});
		display.dispose ();
	}


	public void testFilledBounds() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new FillLayout());
		final ProgressBar progressD = new ProgressBar(shell, SWT.NONE);
		final ProgressBar progressB = new ProgressBar(shell, SWT.BORDER);
		final ProgressBar progressV = new ProgressBar(shell, SWT.VERTICAL);
		final ProgressBar progressS = new ProgressBar(shell, SWT.SMOOTH);
		shell.setSize(240, 135);
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(progressD.getBounds());
				System.out.println(progressB.getBounds());
				System.out.println(progressV.getBounds());
				System.out.println(progressS.getBounds());
				
				assertEquals(progressD.getBounds(), new Rectangle(0, 0, 58, 107));
				assertEquals(progressB.getBounds(), new Rectangle(58, 0, 58, 107));
				assertEquals(progressV.getBounds(), new Rectangle(116, 0, 58, 107));
				assertEquals(progressS.getBounds(), new Rectangle(174, 0, 58, 107));
			}
		});
		display.dispose ();
	}

	public void testDefaultValue() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final ProgressBar progressD = new ProgressBar(shell, SWT.NONE);
		final ProgressBar progressB = new ProgressBar(shell, SWT.BORDER);
		final ProgressBar progressV = new ProgressBar(shell, SWT.VERTICAL);
		final ProgressBar progressS = new ProgressBar(shell, SWT.SMOOTH);
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(progressD.getMaximum());
				System.out.println(progressB.getMaximum());
				System.out.println(progressV.getMaximum());
				System.out.println(progressS.getMaximum());
				
				assertEquals(progressD.getMaximum(), 100);
				assertEquals(progressB.getMaximum(), 100);
				assertEquals(progressV.getMaximum(), 100);
				assertEquals(progressS.getMaximum(), 100);
			}
		});
		display.dispose ();
	}


	public void testSelectionValue() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final ProgressBar progressD = new ProgressBar(shell, SWT.NONE);
		final ProgressBar progressB = new ProgressBar(shell, SWT.BORDER);
		final ProgressBar progressV = new ProgressBar(shell, SWT.VERTICAL);
		final ProgressBar progressS = new ProgressBar(shell, SWT.SMOOTH);
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				progressD.setSelection(20);
				progressB.setSelection(120);
				progressV.setSelection(-20);
				progressS.setSelection(100);
				
				assertEquals(progressD.getSelection(), 20);
				assertEquals(progressB.getSelection(), 100);
				assertEquals(progressV.getSelection(), 0);
				assertEquals(progressS.getSelection(), 100);
			}
		});
		display.dispose ();
	}


	public void testMaximumValue() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final ProgressBar progressD = new ProgressBar(shell, SWT.NONE);
		final ProgressBar progressB = new ProgressBar(shell, SWT.BORDER);
		final ProgressBar progressV = new ProgressBar(shell, SWT.VERTICAL);
		final ProgressBar progressS = new ProgressBar(shell, SWT.SMOOTH);
		final ProgressBar progressX = new ProgressBar(shell, SWT.INDETERMINATE);
		new ProgressBar(shell, SWT.SMOOTH | SWT.INDETERMINATE);
		new ProgressBar(shell, SWT.VERTICAL | SWT.INDETERMINATE);
		shell.pack();
		shell.open ();
		//AsyncSWT.setShellAutoClose(false);
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				progressD.setSelection(20);
				progressB.setSelection(-20);
				progressV.setSelection(120);
				progressS.setSelection(100);
				progressX.setSelection(5);
				
				progressD.setMaximum(40);
				progressB.setMaximum(-80);
				progressV.setMaximum(250);
				progressS.setMaximum(50);
				
				assertEquals("Default", progressD.getSelection(), 20);
				assertEquals("Border", progressB.getSelection(), 0);
				assertEquals("Vertical", progressV.getSelection(), 100);
				assertEquals("Smooth", progressS.getSelection(), 50);
				assertEquals("Indeterminate", progressX.getSelection(), 5);
				
			}
		});
		display.dispose ();
	}


	public void testMinimumValue() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final ProgressBar progressD = new ProgressBar(shell, SWT.NONE);
		final ProgressBar progressB = new ProgressBar(shell, SWT.BORDER);
		final ProgressBar progressV = new ProgressBar(shell, SWT.VERTICAL);
		final ProgressBar progressS = new ProgressBar(shell, SWT.SMOOTH);
		final ProgressBar progressX = new ProgressBar(shell, SWT.INDETERMINATE);
		//new ProgressBar(shell, SWT.SMOOTH | SWT.INDETERMINATE);
		//new ProgressBar(shell, SWT.VERTICAL | SWT.INDETERMINATE);
		shell.pack();
		shell.open ();
		AsyncSWT.setShellAutoClose(false);
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				progressD.setSelection(20);
				progressB.setSelection(-20);
				progressV.setSelection(120);
				progressS.setSelection(100);
				progressX.setSelection(45);
				
				progressD.setMinimum(40);
				progressB.setMinimum(-80);
				progressV.setMinimum(250);
				progressS.setMinimum(50);
				progressX.setMinimum(70);
				
				assertEquals("Default", progressD.getSelection(), 40);
				assertEquals("Border", progressB.getSelection(), 0);
				assertEquals("Vertical", progressV.getSelection(), 100);
				assertEquals("Smooth", progressS.getSelection(), 100);
				assertEquals("Indeterminate", progressX.getSelection(), 70);
				
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
//		AsyncSWT.setShellAutoClose(false);
		AsyncTestRunner.asyncRun (ProgressBarTest.class);
	}
}
