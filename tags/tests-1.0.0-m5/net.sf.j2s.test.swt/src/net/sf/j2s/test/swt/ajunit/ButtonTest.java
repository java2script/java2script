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
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;

/**
 * @author zhou renjian
 *
 * 2006-8-1
 */
public class ButtonTest extends AsyncTestCase {
	
	public void testButtonSize() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		Image imageOpen = new Image(/** @j2sImage 16x32 images/hello-packed.gif #$ */display, ButtonTest.class.getResourceAsStream("../widgets/openFolder.gif"));
		
		Button btnImg = new Button(shell, SWT.TOGGLE);
		btnImg.setImage(imageOpen);
		Button btn = new Button(shell, SWT.BORDER);
		Button btn1 = new Button(shell, SWT.PUSH);
		btn1.setText("Hello &Wo\r\nrld");
		btn1.setForeground(new Color(display, 255, 0, 0));
		btn1.setBackground(new Color(display, 0, 255, 0));
		Button btn3 = new Button(shell, SWT.PUSH);
		btn3.setText("Hello &Wo\r\nrld");
		Font font = new Font(display, "Tahoma", 1, SWT.NONE);
		btn3.setFont(font);
//		btn3.setLayoutData(new GridData(80, 30));
		Button btn2 = new Button(shell, SWT.BORDER);
		btn2.setText("Hello Worl&d");
		Button button = new Button(shell, SWT.PUSH);
		button.setText("Test");
		shell.pack();
		shell.open ();
		/*
		while (!shell.isDisposed ()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}
		*/
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println("make size tests ... ");
				assertTrue(false);
			}
		});
		font.dispose();
		imageOpen.dispose();
		display.dispose ();
	}

	
	public void testButtonPos() {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		Image imageOpen = new Image(display, ButtonTest.class.getResourceAsStream("../widgets/openFolder.gif"));
		
		Button btnImg = new Button(shell, SWT.TOGGLE);
		btnImg.setImage(imageOpen);
		shell.pack();
		shell.open ();
		/*
		while (!shell.isDisposed ()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}
		*/
		AsyncSWT.waitLayout(shell, new AsyncTestRunnable(this) {
			public void run() {
				System.out.println("make position tests ... ");
				assertTrue(true);
			}
		});
		imageOpen.dispose();
		display.dispose ();
	}
	
	public void test4() {
		testButtonSize();
	}
	public void test5() {
		testButtonPos();
	}

	public static void main(String[] args) {
		AsyncTestRunner.asyncRun (ButtonTest.class);
	}
}
