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

package net.sf.j2s.ajax;

import org.eclipse.jface.window.Window;
import org.eclipse.swt.events.DisposeEvent;
import org.eclipse.swt.events.DisposeListener;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;

/**
 * @author zhou renjian
 *
 * 2006-4-29
 */
public class AWindowDelegate {
	Window win;

	AWindowDelegate(Window win) {
		super();
		this.win = win;
	}
	
	public static void open(Window win,AWindowRunnable runnable) {
		win.setBlockOnOpen(false);
		new AWindowDelegate(win).nonBlockOpen(null, runnable);
	}
	/* Only JavaScript call this method. */
	static void asyncOpen(Window win, Object oThis, AWindowRunnable runnable) {
		win.setBlockOnOpen(false);
		new AWindowDelegate(win).nonBlockOpen(oThis, runnable);
	}
	
	void nonBlockOpen(final Object oThis, final AWindowRunnable runnable) {
		if (runnable instanceof AWindowRunnable) {
			runnable.setWindow(win);
		}
		boolean isJ2SEnv = false;
		/**
		 * @j2sNative
		 * isJ2SEnv = true;
		 */ {}
		if (isJ2SEnv) {
			//win.open();
			/**
			 * @j2sNative
			 * this.win.open ();
			 */ {}
			(new Runnable() {
				public void run() {
					Shell shell = win.getShell();
					if (shell == null) {
						getActiveDisplay().timerExec(10, this);
						return;
					}
					shell.addDisposeListener(new DisposeListener() {
						public void widgetDisposed(DisposeEvent e) {
							e.display.update();
							if (oThis == null) {
								e.display.timerExec(5, runnable);
							} else
							/**
							 * @j2sNative
							 * var $runnable = this.f$.runnable;
							 * var $oThis = this.f$.oThis;
							 * window.setTimeout (function () {
							 * $runnable.apply ($oThis);
							 * }, 0);
							 */
							{
							
							}
						}
					});
					shell.getDisplay().readAndDispatch();
				}
			}).run();
		} else 
			/**
			 * @j2sNative
			 */
		{
			(new Thread() {
				public void run() {
					while (win.getShell() == null) {
						try {
							Thread.sleep(10);
						} catch (InterruptedException e) {
							e.printStackTrace();
						}
					}
					getActiveDisplay().syncExec(new Runnable() {
						public void run() {
							win.getShell().addDisposeListener(new DisposeListener() {
								public synchronized void widgetDisposed(DisposeEvent e) {
									e.display.update();
									runnable.run();
								}
							});
						}
					});
				}
			}).start();
			win.open();
		}
	}
	
	Display getActiveDisplay() {
		Display display = null;
		Shell shell = win.getShell();
		if (shell != null) {
			display = shell.getDisplay();
		}
		if (display == null) {
			display = Display.getCurrent();
		}
		if (display == null) {
			display = Display.getDefault();
		}
		return display;
	}
}
