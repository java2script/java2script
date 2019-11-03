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

package com.ognize.jface.test;

import org.eclipse.jface.window.Window;
import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.Listener;

/**
 * @author josson smith
 *
 * 2006-4-29
 */
public class AsyncWindowProxy {
	protected Window window;

	public AsyncWindowProxy(Window window) {
		super();
		this.window = window;
	}
	
	public void registerAsync(final Runnable runnable) {
		Display.getCurrent().asyncExec(new Runnable() {
			public void run() {
				new Thread(new Runnable() {
					public void run() {
						while (window.getShell() == null) {
							try {
								Thread.sleep(10);
							} catch (InterruptedException e) {
								e.printStackTrace();
							}
						}
						window.getShell().addListener(SWT.Close, new Listener() {
							public void handleEvent(Event event) {
								runnable.run();
							}
						});
					}
				}).start();
			}
		});
	}
}
