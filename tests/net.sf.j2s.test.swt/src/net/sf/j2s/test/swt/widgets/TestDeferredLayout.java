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
import org.eclipse.swt.events.PaintEvent;
import org.eclipse.swt.events.PaintListener;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.layout.RowLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Combo;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.Listener;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Text;

/**
 * @author zhou renjian
 *
 * 2006-5-19
 */
public class TestDeferredLayout {
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Display display = new Display ();
		Shell shell = new Shell (display);
		shell.setLayout (new GridLayout ());
		Composite c1 = new Composite(shell, SWT.NONE);
		c1.setLayout(new GridLayout (2, true));
		c1.setLayoutData(new GridData(GridData.FILL_BOTH));
		Composite c2 = new Composite(c1, SWT.NONE);
		c2.setLayout(new GridLayout ());
		c2.setLayoutData(new GridData(GridData.FILL_BOTH));
		new Button(c2, SWT.PUSH).setText("XC1");
		new Button(c2, SWT.PUSH).setText("XC2");
		
		Composite c3 = new Composite(c1, SWT.NONE);
		c3.setLayout(new GridLayout (2, false));
		c3.setLayoutData(new GridData(GridData.FILL_BOTH));
		new Button(c3, SWT.PUSH).setText("XC3");
		new Button(c3, SWT.PUSH).setText("XC4");
		shell.addPaintListener(new PaintListener() {
			public void paintControl(PaintEvent e) {
				System.out.println(e.widget);
			}
		});
		shell.setSize(320, 180);
		shell.open ();
		while (!shell.isDisposed()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}
		display.dispose ();
	}
}
