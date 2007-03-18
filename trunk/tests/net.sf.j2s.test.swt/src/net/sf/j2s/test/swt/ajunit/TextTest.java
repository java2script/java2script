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
import org.eclipse.swt.widgets.Text;

/**
 * @author zhou renjian
 *
 * 2006-8-1
 */
public class TextTest extends AsyncTestCase {
	
	public void testMultiTextStringSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Text txt0 = new Text(shell, SWT.WRAP | SWT.MULTI);
		txt0.setText("423424x fww");
		final Text txt1 = new Text(shell, SWT.BORDER | SWT.READ_ONLY | SWT.MULTI);
		txt1.setText("42999xxxxxxxx xx");
		txt1.setLayoutData(new GridData(120, 20));
		final Text txt2 = new Text(shell, SWT.BORDER | SWT.MULTI);
		txt2.setText(" ");
		final Text txt3 = new Text(shell, SWT.FLAT | SWT.MULTI);
		txt3.setText("-----=2 ===---===");
		final Text txt4 = new Text(shell, SWT.WRAP | SWT.FLAT | SWT.MULTI);
		txt4.setText("-----=2== =---===");
		final Text txt5 = new Text(shell, SWT.NONE | SWT.MULTI);
		txt5.setText("---- -=2===---== =");
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(txt0.getSize());
				System.out.println(txt1.getSize());
				System.out.println(txt2.getSize());
				System.out.println(txt3.getSize());
				System.out.println(txt4.getSize());
				System.out.println(txt5.getSize());
				assertEquals(txt0.getSize(), new Point(71, 13));
				assertEquals(txt1.getSize(), new Point(132, 26));
				assertEquals(txt2.getSize(), new Point(15, 19));
				assertEquals(txt3.getSize(), new Point(103, 13));
				assertEquals(txt4.getSize(), new Point(103, 13));
				assertEquals(txt5.getSize(), new Point(106, 13));
			}
		});
		display.dispose ();
		//AsyncSWT.setShellAutoClose(true);
	}
	
	public void testTextStringSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Text txt0 = new Text(shell, SWT.WRAP);
		txt0.setText("423424xfww");
		final Text txt1 = new Text(shell, SWT.BORDER | SWT.READ_ONLY);
		txt1.setText("42999xxx");
		txt1.setLayoutData(new GridData(120, 20));
		final Text txt2 = new Text(shell, SWT.BORDER);
		txt2.setText(" ");
		final Text txt3 = new Text(shell, SWT.FLAT);
		txt3.setText("-----=2===---===");
		final Text txt4 = new Text(shell, SWT.WRAP | SWT.FLAT);
		txt4.setText("-----=2===---===");
		final Text txt5 = new Text(shell, SWT.NONE);
		txt5.setText("-----=2===---===");
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(txt0.getSize());
				System.out.println(txt1.getSize());
				System.out.println(txt2.getSize());
				System.out.println(txt3.getSize());
				System.out.println(txt4.getSize());
				System.out.println(txt5.getSize());
				assertEquals(txt0.getSize(), new Point(68, 13));
				assertEquals(txt1.getSize(), new Point(127, 26));
				assertEquals(txt2.getSize(), new Point(10, 19));
				assertEquals(txt3.getSize(), new Point(95, 13));
				assertEquals(txt4.getSize(), new Point(100, 13));
				assertEquals(txt5.getSize(), new Point(95, 13));
			}
		});
		display.dispose ();
		//AsyncSWT.setShellAutoClose(true);
	}
	
	public void testTextSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Text txt1 = new Text(shell, SWT.BORDER | SWT.READ_ONLY);
		txt1.setLayoutData(new GridData(120, 20));
		final Text txt0 = new Text(shell, SWT.WRAP);
		final Text txt2 = new Text(shell, SWT.BORDER);
		final Text txt3 = new Text(shell, SWT.FLAT);
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(txt0.getSize());
				System.out.println(txt1.getSize());
				System.out.println(txt2.getSize());
				System.out.println(txt3.getSize());
				assertEquals(txt0.getSize(), new Point(70, 13));
				assertEquals(txt1.getSize(), new Point(127, 26));
				assertEquals(txt2.getSize(), new Point(71, 19));
				assertEquals(txt3.getSize(), new Point(65, 13));
			}
		});
		display.dispose ();
		//AsyncSWT.setShellAutoClose(true);
	}
	
	public void testFilledTextSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new FillLayout());
		final Text txt1 = new Text(shell, SWT.NONE);
		final Text txt2 = new Text(shell, SWT.BORDER);
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(txt1.getSize());
				System.out.println(txt2.getSize());
				assertEquals(txt1.getSize(), new Point(71, 19));
				assertEquals(txt2.getSize(), new Point(71, 19));
			}
		});
		display.dispose ();
	}

	
	public void testSetTextSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Text txt1 = new Text(shell, SWT.NONE);
		txt1.setLayoutData(new GridData(120, 40));
		txt1.setEnabled(false);
		final Text txt2 = new Text(shell, SWT.BORDER);
		txt2.setLayoutData(new GridData(150, 50));
		final Text txt3 = new Text(shell, SWT.NONE);
		txt3.setLayoutData(new GridData(120, 30));
		final Text txt0 = new Text(shell, SWT.NONE);
		txt0.setLayoutData(new GridData(120, 24));
		final Text txt4 = new Text(shell, SWT.NONE);
		txt4.setLayoutData(new GridData(120, 20));
		final Text txt5 = new Text(shell, SWT.NONE);
		txt5.setLayoutData(new GridData(120, 10));
		final Text txt6 = new Text(shell, SWT.NONE);
		txt6.setLayoutData(new GridData(120, 16));
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(txt1.getSize());
				System.out.println(txt2.getSize());
				assertEquals(txt1.getSize(), new Point(121, 40));
				assertEquals(txt2.getSize(), new Point(157, 56));
			}
		});
		display.dispose ();
	}

	public static void main(String[] args) {
		AsyncSWT.setShellAutoClose(false);
		AsyncTestRunner.asyncRun (TextTest.class);
	}
}
