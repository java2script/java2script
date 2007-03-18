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
import org.eclipse.swt.widgets.Scale;
import org.eclipse.swt.widgets.Shell;

/**
 * @author zhou renjian
 *
 * 2006-8-1
 */
public class ScaleTest extends AsyncTestCase {

	public void testDefaultSize() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Scale scaleD = new Scale(shell, SWT.NONE);
		final Scale scaleB = new Scale(shell, SWT.BORDER);
		final Scale scaleV = new Scale(shell, SWT.VERTICAL);
		final Scale scaleS = new Scale(shell, SWT.SMOOTH);
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(scaleD.getSize());
				System.out.println(scaleB.getSize());
				System.out.println(scaleV.getSize());
				System.out.println(scaleS.getSize());
				
				assertEquals(scaleD.getSize(), new Point(160, 41));
				assertEquals(scaleB.getSize(), new Point(164, 45));
				assertEquals(scaleV.getSize(), new Point(41, 160));
				assertEquals(scaleS.getSize(), new Point(160, 41));
			}
		});
		display.dispose ();
	}


	public void xtestFilledSize() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new FillLayout());
		final Scale scaleD = new Scale(shell, SWT.NONE);
		final Scale scaleB = new Scale(shell, SWT.BORDER);
		final Scale scaleV = new Scale(shell, SWT.VERTICAL);
		final Scale scaleS = new Scale(shell, SWT.SMOOTH);
		shell.setSize(240, 135);
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(scaleD.getSize());
				System.out.println(scaleB.getSize());
				System.out.println(scaleV.getSize());
				System.out.println(scaleS.getSize());
				
				assertEquals(scaleD.getSize(), new Point(58, 107));
				assertEquals(scaleB.getSize(), new Point(58, 107));
				assertEquals(scaleV.getSize(), new Point(58, 107));
				assertEquals(scaleS.getSize(), new Point(58, 107));
			}
		});
		display.dispose ();
	}


	public void testDefaultBounds() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Scale scaleD = new Scale(shell, SWT.NONE);
		final Scale scaleB = new Scale(shell, SWT.BORDER);
		final Scale scaleV = new Scale(shell, SWT.VERTICAL);
		final Scale scaleS = new Scale(shell, SWT.SMOOTH);
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(scaleD.getBounds());
				System.out.println(scaleB.getBounds());
				System.out.println(scaleV.getBounds());
				System.out.println(scaleS.getBounds());
				
				assertEquals(scaleD.getBounds(), new Rectangle(5, 5, 160, 41));
				assertEquals(scaleB.getBounds(), new Rectangle(5, 51, 164, 45));
				assertEquals(scaleV.getBounds(), new Rectangle(5, 101, 41, 160));
				assertEquals(scaleS.getBounds(), new Rectangle(5, 266, 160, 41));
			}
		});
		display.dispose ();
	}


	public void xtestFilledBounds() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new FillLayout());
		final Scale scaleD = new Scale(shell, SWT.NONE);
		final Scale scaleB = new Scale(shell, SWT.BORDER);
		final Scale scaleV = new Scale(shell, SWT.VERTICAL);
		final Scale scaleS = new Scale(shell, SWT.SMOOTH);
		shell.setSize(240, 135);
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(scaleD.getBounds());
				System.out.println(scaleB.getBounds());
				System.out.println(scaleV.getBounds());
				System.out.println(scaleS.getBounds());
				
				assertEquals(scaleD.getBounds(), new Rectangle(0, 0, 58, 107));
				assertEquals(scaleB.getBounds(), new Rectangle(58, 0, 58, 107));
				assertEquals(scaleV.getBounds(), new Rectangle(116, 0, 58, 107));
				assertEquals(scaleS.getBounds(), new Rectangle(174, 0, 58, 107));
			}
		});
		display.dispose ();
	}

	public void xtestDefaultValue() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Scale scaleD = new Scale(shell, SWT.NONE);
		final Scale scaleB = new Scale(shell, SWT.BORDER);
		final Scale scaleV = new Scale(shell, SWT.VERTICAL);
		final Scale scaleS = new Scale(shell, SWT.SMOOTH);
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
		final Scale scaleD = new Scale(shell, SWT.NONE);
		final Scale scaleB = new Scale(shell, SWT.BORDER);
		final Scale scaleV = new Scale(shell, SWT.VERTICAL);
		final Scale scaleS = new Scale(shell, SWT.SMOOTH);
		shell.pack();
		shell.open ();
		AsyncSWT.setShellAutoClose(false);
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


	public void xtestMaximumValue() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Scale scaleD = new Scale(shell, SWT.NONE);
		final Scale scaleB = new Scale(shell, SWT.BORDER);
		final Scale scaleV = new Scale(shell, SWT.VERTICAL);
		final Scale scaleS = new Scale(shell, SWT.SMOOTH);
		final Scale scaleX = new Scale(shell, SWT.INDETERMINATE);
		new Scale(shell, SWT.SMOOTH | SWT.INDETERMINATE);
		new Scale(shell, SWT.VERTICAL | SWT.INDETERMINATE);
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


	public void xtestMinimumValue() {
		Display display = new Display ();
		Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Scale scaleD = new Scale(shell, SWT.NONE);
		final Scale scaleB = new Scale(shell, SWT.BORDER);
		final Scale scaleV = new Scale(shell, SWT.VERTICAL);
		final Scale scaleS = new Scale(shell, SWT.SMOOTH);
		final Scale scaleX = new Scale(shell, SWT.INDETERMINATE);
		//new Scale(shell, SWT.SMOOTH | SWT.INDETERMINATE);
		//new Scale(shell, SWT.VERTICAL | SWT.INDETERMINATE);
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

	/**
	 * ATTENTION: Always run me as SWT Application or Java2Script Application.
	 * Running me as JUnit Test or Java2Script Unit Test won't work for these
	 * asynchronous unit tests!
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		//AsyncSWT.setShellAutoClose(false);
		AsyncTestRunner.asyncRun (ScaleTest.class);
	}
}
