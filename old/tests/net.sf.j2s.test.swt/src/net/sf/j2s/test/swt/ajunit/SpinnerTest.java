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
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Spinner;

/**
 * @author zhou renjian
 *
 * 2006-8-1
 */
public class SpinnerTest extends AsyncTestCase {
	
	public void testSpinnerValue() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Spinner spn1 = new Spinner(shell, SWT.BORDER | SWT.READ_ONLY);
		spn1.setLayoutData(new GridData(120, 20));
		spn1.setMinimum(-120);
		spn1.setDigits(2);
		spn1.setIncrement(7);
//		spn1.setEnabled(false);
		final Spinner spn0 = new Spinner(shell, SWT.WRAP);
		final Spinner spn2 = new Spinner(shell, SWT.BORDER);
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(spn0.getSize());
				System.out.println(spn2.getSize());
				assertEquals(spn0.getSize(), new Point(35, 16));
				assertEquals(spn2.getSize(), new Point(41, 19));
			}
		});
		display.dispose ();
		AsyncSWT.setShellAutoClose(true);
	}

	public void testDefaultValue() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Spinner scaleD = new Spinner(shell, SWT.NONE);
		final Spinner scaleB = new Spinner(shell, SWT.BORDER);
		final Spinner scaleV = new Spinner(shell, SWT.NONE);
		final Spinner scaleS = new Spinner(shell, SWT.NONE);
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(scaleD.getMaximum());
				System.out.println(scaleB.getMaximum());
				System.out.println(scaleV.getMaximum());
				System.out.println(scaleS.getMaximum());
				
				assertEquals(scaleD.getMaximum(), 100);
				assertEquals(scaleB.getMaximum(), 100);
				assertEquals(scaleV.getMaximum(), 100);
				assertEquals(scaleS.getMaximum(), 100);
			}
		});
		display.dispose ();
	}


	public void testSelectionValue() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Spinner scaleD = new Spinner(shell, SWT.NONE);
		final Spinner scaleB = new Spinner(shell, SWT.BORDER);
		final Spinner scaleV = new Spinner(shell, SWT.NONE);
		final Spinner scaleS = new Spinner(shell, SWT.NONE);
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				scaleD.setSelection(20);
				scaleB.setSelection(120);
				scaleV.setSelection(-20);
				scaleS.setSelection(100);
				
				assertEquals("Default", scaleD.getSelection(), 20);
				assertEquals("Border", scaleB.getSelection(), 100);
				assertEquals("Vertical", scaleV.getSelection(), 0);
				assertEquals("Smooth", scaleS.getSelection(), 100);
			}
		});
		display.dispose ();
	}


	public void testMaximumValue() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Spinner scaleD = new Spinner(shell, SWT.NONE);
		final Spinner scaleB = new Spinner(shell, SWT.BORDER);
		final Spinner scaleV = new Spinner(shell, SWT.NONE);
		final Spinner scaleS = new Spinner(shell, SWT.NONE);
		final Spinner scaleX = new Spinner(shell, SWT.NONE);
		shell.pack();
		shell.open ();
		//AsyncSWT.setShellAutoClose(false);
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				scaleD.setSelection(20);
				scaleB.setSelection(-20);
				scaleV.setSelection(120);
				scaleS.setSelection(100);
				scaleX.setSelection(5);
				
				scaleD.setMaximum(40);
				scaleB.setMaximum(-80);
				scaleV.setMaximum(250);
				scaleS.setMaximum(50);
				
				assertEquals("Default", scaleD.getSelection(), 20);
				assertEquals("Border", scaleB.getSelection(), 0);
				assertEquals("Vertical", scaleV.getSelection(), 100);
				assertEquals("Smooth", scaleS.getSelection(), 50);
				assertEquals("Indeterminate", scaleX.getSelection(), 5);
				
			}
		});
		display.dispose ();
	}


	public void testMinimumValue() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Spinner scaleD = new Spinner(shell, SWT.NONE);
		final Spinner scaleB = new Spinner(shell, SWT.BORDER);
		final Spinner scaleV = new Spinner(shell, SWT.NONE);
		final Spinner scaleS = new Spinner(shell, SWT.NONE);
		final Spinner scaleX = new Spinner(shell, SWT.NONE);
		shell.pack();
		shell.open ();
		//AsyncSWT.setShellAutoClose(false);
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				scaleD.setSelection(20);
				scaleB.setSelection(-20);
				scaleV.setSelection(120);
				scaleS.setSelection(100);
				scaleX.setSelection(45);
				
				scaleD.setMinimum(40);
				scaleB.setMinimum(-80);
				scaleV.setMinimum(250);
				scaleS.setMinimum(50);
				scaleX.setMinimum(70);
				
				assertEquals("Default", scaleD.getSelection(), 40);
				assertEquals("Border", scaleB.getSelection(), 0);
				assertEquals("Vertical", scaleV.getSelection(), 100);
				assertEquals("Smooth", scaleS.getSelection(), 100);
				assertEquals("Indeterminate", scaleX.getSelection(), 70);
				
			}
		});
		display.dispose ();
	}

	public void testSpinnerSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Spinner spn1 = new Spinner(shell, SWT.NONE);
		final Spinner spn2 = new Spinner(shell, SWT.BORDER);
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(spn1.getSize());
				System.out.println(spn2.getSize());
				assertEquals(spn1.getSize(), new Point(35, 16));
				assertEquals(spn2.getSize(), new Point(41, 19));
			}
		});
		display.dispose ();
	}
	
	public void testFilledSpinnerSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new FillLayout());
		final Spinner spn1 = new Spinner(shell, SWT.NONE);
		final Spinner spn2 = new Spinner(shell, SWT.BORDER);
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(spn1.getSize());
				System.out.println(spn2.getSize());
				assertEquals(spn1.getSize(), new Point(52, 19));
				assertEquals(spn2.getSize(), new Point(53, 19));
			}
		});
		display.dispose ();
	}

	
	public void testSetSpinnerSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Spinner spn1 = new Spinner(shell, SWT.NONE);
		spn1.setLayoutData(new GridData(120, 40));
		spn1.setEnabled(false);
		final Spinner spn2 = new Spinner(shell, SWT.BORDER);
		spn2.setLayoutData(new GridData(150, 50));
		final Spinner spn3 = new Spinner(shell, SWT.NONE);
		spn3.setLayoutData(new GridData(120, 30));
		final Spinner spn0 = new Spinner(shell, SWT.NONE);
		spn0.setLayoutData(new GridData(120, 24));
		final Spinner spn4 = new Spinner(shell, SWT.NONE);
		spn4.setLayoutData(new GridData(120, 20));
		final Spinner spn5 = new Spinner(shell, SWT.NONE);
		spn5.setLayoutData(new GridData(120, 10));
		final Spinner spn6 = new Spinner(shell, SWT.NONE);
		spn6.setLayoutData(new GridData(120, 16));
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(spn1.getSize());
				System.out.println(spn2.getSize());
				assertEquals(spn1.getSize(), new Point(137, 40));
				assertEquals(spn2.getSize(), new Point(173, 56));
			}
		});
		display.dispose ();
	}

	public static void main(String[] args) {
		AsyncSWT.setShellAutoClose(false);
		AsyncTestRunner.asyncRun (SpinnerTest.class);
	}
}
