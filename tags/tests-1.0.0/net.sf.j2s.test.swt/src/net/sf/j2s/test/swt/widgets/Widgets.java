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
import org.eclipse.swt.browser.Browser;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.program.Program;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Link;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.TabFolder;
import org.eclipse.swt.widgets.TabItem;
import org.eclipse.swt.widgets.Text;

/**
 * @author zhou renjian
 *
 * 2006-5-21
 */
public class Widgets {
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Display display = new Display ();
		final Shell shell = new Shell(display);
		shell.setLayout(new GridLayout(2, false));
		
		new Label(shell, SWT.NONE).setText("Java2&Script reuse Java codes");

		new Label(shell, SWT.SEPARATOR | SWT.HORIZONTAL);
		
		new Link(shell, SWT.NONE).setText("Hello, <a href=\"http://ognize.com/\">cec.ognize</a> me?");
		
		Composite composite = new Composite(shell, SWT.NONE);
		GridLayout layout = new GridLayout(2, false);
		composite.setLayout(layout);
		new Button(composite, SWT.PUSH).setText("&OK");
		new Button(composite, SWT.PUSH).setText("&Cancel");
		Composite composite2 = new Composite(shell, SWT.NONE);
		GridLayout layout2 = new GridLayout(2, false);
		composite2.setLayout(layout2);
		new Button(composite2, SWT.TOGGLE).setText("Options");
		new Button(composite2, SWT.TOGGLE).setText("Ideas");
		
		new Button(shell, SWT.ARROW);
		
		final Image imageOpen = new Image(display, TestButton.class.getResourceAsStream("openFolder.gif"));
		Button btnImg = new Button(shell, SWT.PUSH);
		btnImg.setImage(imageOpen);
		
		Group g1 = new Group(shell, SWT.NONE);
		g1.setLayout(new GridLayout(2, false));
		new Button(g1, SWT.RADIO).setText("Java");
		new Button(g1, SWT.RADIO).setText("JavaScript");
		Group g2 = new Group(shell, SWT.NONE);
		g2.setLayout(new GridLayout(1, false));
		new Button(g2, SWT.CHECK).setText("SWT");
		new Button(g2, SWT.CHECK).setText("Swing");
		new Button(g2, SWT.CHECK).setText("Others");

		new Group(shell, SWT.NONE).setText("Parameters");
		
		TabFolder tf2 = new TabFolder(shell, SWT.NONE);
		TabItem ti1 = new TabItem(tf2, SWT.NONE);
		ti1.setText("General");
		final TabItem ti2 = new TabItem(tf2, SWT.NONE | SWT.RIGHT_TO_LEFT);
		ti2.setText("Advanced");

		final Text textPath = new Text(shell, SWT.BORDER);
		String base = "S:/eclipse-3.1.1/";
		textPath.setText(base);

		Text t = new Text(shell, SWT.BORDER | SWT.MULTI | SWT.WRAP | SWT.V_SCROLL);
		t.setText("Maybe this is the first time you install Java2Script plugin. To install Java2Script, do as following");
		GridData gd = new GridData();
		gd.widthHint = 80;
		t.setLayoutData(gd);

		Browser browser = new Browser(shell, SWT.BORDER);
		GridData gd2 = new GridData();
		gd2.widthHint = 180;
		browser.setLayoutData(gd2);
		browser.setUrl("http://c.ognize.com/j2s.sf.net/");
		
		shell.pack();
		shell.open ();
		while (!shell.isDisposed ()) {
			if (!display.readAndDispatch ()) display.sleep ();
		}
		imageOpen.dispose();
		display.dispose ();
	}

	private static Label createLabel(Composite comp, String label) {
		Label lbl = new Label(comp, SWT.WRAP);
		lbl.setText(label);
		GridData gd = new GridData(GridData.FILL_HORIZONTAL);
		gd.widthHint = 330;
		lbl.setLayoutData(gd);
		return lbl;
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
