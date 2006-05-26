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
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Link;
import org.eclipse.swt.widgets.Shell;

/**
 * @author josson smith
 *
 * 2006-5-21
 */
public class TestLink {
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout());
		
//		System.out.println(new StringBuffer().getClass().getName());
		final Link link = new Link(shell, SWT.BORDER);
		link.setText("Hello <a href=\"http://ognize.com/\">ognize</a> &World");
		link.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				System.out.println("424234233");
				System.out.println(link);
				e.doit = false;
			}
		});
		link.setVisible(false);
		final Link link2 = new Link(shell, SWT.BORDER);
		link2.setText("Hello <a href=\"http://ognize.com/j2s/\">o&&\r\ngni<br/>ze</a> \r\n &Great <a href=\"http://google.com\">&Worl&d</a>");
//		link2.setForeground(new Color(display, 0, 255, 0));
//		link2.setEnabled(false);
		final SelectionAdapter selectionAdapter = new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				System.out.println("424234233");
				System.out.println(link2);
				e.doit = false;
			}
		};
		link2.addSelectionListener(selectionAdapter);
		Button button = new Button(shell, SWT.PUSH);
		button.setText("Test");
		button.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				System.out.println("************");
				print (link);
				print (link2);
				link2.setEnabled(true);
				link.setVisible(true);
				link2.removeSelectionListener(selectionAdapter);
			}
		});
		shell.pack();
		shell.open ();
		while (!shell.isDisposed ()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}
		display.dispose ();
	}
	public static void print(Link link) {
		System.out.println(link.getSize());
		System.out.println(link.getBounds());
		System.out.println(link.getBorderWidth());
		System.out.println(link.getLocation());
		System.out.println(link.getFont().getFontData()[0].height);
		System.out.println("..======..");
	}
}
