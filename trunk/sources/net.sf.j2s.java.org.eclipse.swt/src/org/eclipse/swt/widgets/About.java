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

package org.eclipse.swt.widgets;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.DisposeEvent;
import org.eclipse.swt.events.DisposeListener;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.internal.ResizeSystem;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Link;
import org.eclipse.swt.widgets.Shell;

/**
 * 
 * @author Zhou Renjian
 *
 * Aug 3, 2008
 */
public class About {

	/**
	 * Launch the application
	 * @param args
	 */
	public static void openAbout(Shell objShell) {
		try {
			Shell aboutShell = null;
			if (objShell == null) {
				aboutShell = new Shell(SWT.TOOL);
			} else {
				aboutShell = new Shell(objShell, SWT.TOOL);
			}
			aboutShell.setText("About Java2Script");

			createContents(aboutShell);
			aboutShell.setBackground(Display.getCurrent().getSystemColor(SWT.COLOR_WHITE));
			final GridLayout gridLayout = new GridLayout();
			gridLayout.verticalSpacing = 0;
			gridLayout.marginWidth = 0;
			gridLayout.marginHeight = 0;
			gridLayout.horizontalSpacing = 0;
			aboutShell.setLayout(gridLayout);

			aboutShell.setMinimumSize(442, 301);
			aboutShell.open();
			aboutShell.layout();
			aboutShell.pack();
			Point size = aboutShell.getSize();
			int y = (aboutShell.getMonitor().clientHeight - size.y) / 2 - 20;
			if (y < 0) {
				y = 0;
			}
			aboutShell.setLocation((aboutShell.getMonitor().clientWidth - size.x) / 2, y);
			ResizeSystem.register(aboutShell, SWT.CENTER);
			aboutShell.addDisposeListener(new DisposeListener() {
				public void widgetDisposed(DisposeEvent e) {
					ResizeSystem.unregister((Shell) e.widget, SWT.CENTER);
				}
			});
			Display disp = aboutShell.display;
			while (!aboutShell.isDisposed()) {
				if (!aboutShell.display.readAndDispatch())
					aboutShell.display.sleep();
			}
			if (objShell == null) {
				disp.dispose();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * Create contents of the window
	 */
	private static void createContents(Shell aboutShell) {
		final Composite composite = new Composite(aboutShell, SWT.NONE);
		composite.setBackground(Display.getCurrent().getSystemColor(SWT.COLOR_WHITE));
		composite.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		final GridLayout gridLayout = new GridLayout();
		gridLayout.numColumns = 2;
		composite.setLayout(gridLayout);

		final Label logo = new Label(composite, SWT.NONE);
		final GridData gd_logo = new GridData(SWT.LEFT, SWT.TOP, false, false);
		gd_logo.heightHint = 160;
		gd_logo.widthHint = 160;
		logo.setLayoutData(gd_logo);
		Image logoImage = null;
		/**
		 * @j2sNative
		 * logoImage = new $wt.graphics.Image ($wt.widgets.Display.getCurrent (), $wt.widgets.Display.getResourceAsStream ("images/j2s-logo.gif"));
		 */ {}
		//logo.setImage(SWTResourceManager.getImage(About.class, "images/j2s-logo.gif"));
		logo.setImage(logoImage);
		
		logo.setBackground(Display.getCurrent().getSystemColor(SWT.COLOR_WHITE));

		final Composite description = new Composite(composite, SWT.NONE);
		description.setBackground(Display.getCurrent().getSystemColor(SWT.COLOR_WHITE));
		description.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		description.setLayout(new GridLayout());

		final Label java2scriptLabel = new Label(description, SWT.NONE);
		Font j2sFont = null;
		/**
	     * @j2sNative
	     * j2sFont = new $wt.graphics.Font ($wt.widgets.Display.getCurrent (),  new $wt.graphics.FontData ("Arial", 18, 1)); // 1 = SWT.BOLD
	     */ {}
		//java2scriptLabel.setFont(SWTResourceManager.getFont("Arial", 18, SWT.BOLD));
		java2scriptLabel.setFont(j2sFont);
		
		java2scriptLabel.setBackground(Display.getCurrent().getSystemColor(SWT.COLOR_WHITE));
		GridData gd_Java2Script = new GridData(SWT.FILL, SWT.CENTER, true, false);
		gd_Java2Script.verticalIndent = 6;
		gd_Java2Script.heightHint = 24;
		java2scriptLabel.setLayoutData(gd_Java2Script);
		java2scriptLabel.setText("Java2Script");

		final Label java2scriptj2sPacemakerLabel = new Label(description, SWT.WRAP);
		j2sFont = null;
		/**
	     * @j2sNative
	     * j2sFont = new $wt.graphics.Font ($wt.widgets.Display.getCurrent (),  new $wt.graphics.FontData ("Arial", 10, 0));
	     */ {}
	    java2scriptj2sPacemakerLabel.setFont(j2sFont);
		java2scriptj2sPacemakerLabel.setBackground(Display.getCurrent().getSystemColor(SWT.COLOR_WHITE));
		java2scriptj2sPacemakerLabel.setLayoutData(new GridData(225, SWT.DEFAULT));
		java2scriptj2sPacemakerLabel.setText("Java2Script (J2S) open source project provides an Eclipse Java to JavaScript compiler plugin, provides java.lang.*, java.util.* and other common utilities, provides an JavaScript implementation of Eclipse Standard Widget Toolkit (SWT), supports SWT-based Rich Client Platform (RCP) to Rich Internet Application (RIA) conversions.");

		final Link homepageLink = new Link(description, SWT.NONE);
		homepageLink.setFont(j2sFont);
		final GridData gd_homepageLink = new GridData();
		gd_homepageLink.verticalIndent = 8;
		homepageLink.setLayoutData(gd_homepageLink);
		homepageLink.setBackground(Display.getCurrent().getSystemColor(SWT.COLOR_WHITE));
		homepageLink.setText("Home: <a href=\"http://java2script.org/\">java2script.org</a> / <a href=\"http://j2s.sourceforge.net/\">j2s.sourceforge.net</a>");

		final Link founderLink = new Link(description, SWT.NONE);
		founderLink.setFont(j2sFont);
		founderLink.setBackground(Display.getCurrent().getSystemColor(SWT.COLOR_WHITE));
		founderLink.setText("Founder: <a href=\"http://zhourenjian.name/\">Zhou Renjian</a>");

		Composite blank = new Composite(description, SWT.NONE);
		blank.setBackground(Display.getCurrent().getSystemColor(SWT.COLOR_WHITE));
		blank.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		blank.setLayout(new GridLayout());

		final Button okButton = new Button(description, SWT.NONE);
		final GridData gd_okButton = new GridData(SWT.RIGHT, SWT.CENTER, false, false);
		gd_okButton.widthHint = 120;
		okButton.setLayoutData(gd_okButton);
		okButton.setText("OK");
		okButton.addSelectionListener(new SelectionAdapter() {
		
			public void widgetSelected(SelectionEvent e) {
				((Control) e.widget).getShell().close();
			}
		
		});
		//
	}

}
