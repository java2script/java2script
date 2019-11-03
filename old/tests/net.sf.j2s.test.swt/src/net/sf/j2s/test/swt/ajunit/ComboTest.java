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
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Combo;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;

/**
 * @author zhou renjian
 *
 * 2006-8-1
 */
public class ComboTest extends AsyncTestCase {
	public void testSetSpinnerSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		final Combo spn1 = new Combo(shell, SWT.NONE);
		spn1.setLayoutData(new GridData(120, 40));
		spn1.setEnabled(false);
		final Combo spn2 = new Combo(shell, SWT.BORDER);
		spn2.setLayoutData(new GridData(150, 50));
		final Combo spn3 = new Combo(shell, SWT.NONE);
		spn3.setItems(new String[] {"Helo", "Wrld", "Wrld", "Woooooooooorld", "Wrld", "Wrld", "Wrld", "Woooooooooorld", "Wrld", "Wrld", "Wrld", "Woooooooooorld", "Wrld", "Wrld", "Wrld", "Woooooooooorld", "Wrld", "Wrld", "Wrld", "Woooooooooorld", "Wrld"});
		spn3.setVisibleItemCount(spn3.getItemCount());
		spn3.setLayoutData(new GridData(120, 30));
		final Combo spn0 = new Combo(shell, SWT.NONE);
		spn0.setLayoutData(new GridData(120, 24));
		final Combo spn4 = new Combo(shell, SWT.NONE);
		spn4.setLayoutData(new GridData(120, 20));
		spn4.setItems(new String[] {"Helo", "Wrld"});
		final Combo spn5 = new Combo(shell, SWT.NONE);
		spn5.setLayoutData(new GridData(120, 10));
		final Combo spn6 = new Combo(shell, SWT.NONE);
		spn6.setLayoutData(new GridData(120, 16));
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(spn1.getSize());
				System.out.println(spn2.getSize());
				assertEquals(spn1.getSize(), new Point(143, 21));
				assertEquals(spn2.getSize(), new Point(173, 21));
			}
		});
		display.dispose ();
	}
	
	
	public void testComboSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		final Combo cmb1 = new Combo(shell, SWT.NONE);
		//cmb1.setItems(new String[] {"Hello", "World"});
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println(cmb1.getSize());
				assertEquals(cmb1.getSize(), new Point(87, 21));
			}
		});
		display.dispose ();
	}


	public void xtestComboPos() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
		Combo btnImg = new Combo(shell, SWT.TOGGLE);
		shell.pack();
		shell.open ();
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println("make position tests ... ");
				assertTrue(true);
			}
		});
		display.dispose ();
	}

	public static void main(String[] args) {
		AsyncSWT.setShellAutoClose(false);
		AsyncTestRunner.asyncRun (ComboTest.class);
	}
}
