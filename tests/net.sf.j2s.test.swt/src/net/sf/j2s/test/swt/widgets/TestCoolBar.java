/*******************************************************************************
 * Java2Script Pacemaker (http://j2s.sourceforge.net)
 *
 * Copyright (c) 2006 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.test.swt.widgets;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.CoolBar;
import org.eclipse.swt.widgets.CoolItem;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Listener;
import org.eclipse.swt.widgets.Shell;

/**
 * @author josson smith
 *
 * 2006-5-21
 */
public class TestCoolBar {
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout(2, false));
		final Group group = new Group(shell, SWT.NONE);
		group.setLayout(new GridLayout());
		final CoolBar bar5 = new CoolBar(group, SWT.BORDER);
		bar5.setLayoutData(new GridData(GridData.FILL_BOTH));
		final CoolItem toolItem5 = new CoolItem(bar5, SWT.NONE);
		final Label label5 = new Label(bar5, SWT.NONE);
		label5.setText("Hello x World");
		toolItem5.setControl(label5);
		toolItem5.setPreferredSize(200, 24);
		final CoolItem toolItem52 = new CoolItem(bar5, SWT.NONE);
		final Label label52 = new Label(bar5, SWT.NONE);
		label52.setText("Hello World");
		toolItem52.setControl(label52);
		toolItem52.setMinimumSize(13, 24);
		toolItem52.setPreferredSize(100, 24);
		final CoolItem toolItem53 = new CoolItem(bar5, SWT.NONE);
		final Label label53 = new Label(bar5, SWT.NONE);
		label53.setText("World");
		toolItem53.setControl(label53);
		toolItem53.setPreferredSize(60, 24);
		final CoolItem toolItem54 = new CoolItem(bar5, SWT.NONE);
		final Label label54 = new Label(bar5, SWT.NONE);
		label54.setText("World");
		toolItem54.setControl(label54);
		toolItem54.setPreferredSize(60, 24);
		//toolItem54.setMinimumSize(60, 14);
		bar5.setWrapIndices(new int[] { 3 });
		/* add a listener to resize the group box to match the coolbar */
		bar5.addListener(SWT.Resize, new Listener() {
			public void handleEvent(Event event) {
				System.out.println(bar5.getBounds());
				shell.layout();
			}
		});

		shell.setSize(480, 200);
		
		System.out.println(bar5.getBounds());
		
		System.out.println(toolItem5.getBounds());
		System.out.println(toolItem52.getBounds());
		System.out.println(toolItem53.getBounds());
		System.out.println(toolItem54.getBounds());
		
		Button button = new Button(shell, SWT.PUSH);
		button.setText("Test");
		Button button2 = new Button(shell, SWT.PUSH);
		button2.setText("Laout");
		button2.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				group.layout(true);
			}
		});
		button.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				System.out.println(toolItem5.getBounds());
				System.out.println(toolItem52.getBounds());
				System.out.println(toolItem53.getBounds());
				System.out.println(toolItem54.getBounds());
				
				System.out.println(toolItem5.getPreferredSize());
				System.out.println(toolItem52.getPreferredSize());
				System.out.println(toolItem53.getPreferredSize());
				System.out.println(toolItem54.getPreferredSize());
				
				System.out.println(toolItem5.getMinimumSize());
				System.out.println(toolItem52.getMinimumSize());
				System.out.println(toolItem53.getMinimumSize());
				System.out.println(toolItem54.getMinimumSize());
				
				System.out.println(bar5.getBounds());
				System.out.println("===============");
			}
		});
		//shell.pack();
		shell.open ();
		while (!shell.isDisposed ()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}
		display.dispose ();
	}
}
