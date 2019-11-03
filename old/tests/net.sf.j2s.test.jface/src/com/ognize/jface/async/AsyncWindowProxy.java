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

package com.ognize.jface.async;

import org.eclipse.jface.window.Window;
import org.eclipse.jface.window.WindowProxy;
import org.eclipse.swt.events.DisposeEvent;
import org.eclipse.swt.events.DisposeListener;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;

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
	
	public static void open(Window window, AsyncWindowRunnable runnable) {
		new AsyncWindowProxy(window).open(runnable);
	}
	
	/**
	 * @j2sNative
runnable.setWindow (this.window);
this.window.open ();
(function (innerThis, finalVars) {
if (!Clazz.isClassDefined ("com.ognize.jface.async.AsyncWindowProxy$1")) {
Clazz.pu$h ();
cla$$ = com.ognize.jface.async.AsyncWindowProxy$1 = function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (cla$$, "com.ognize.jface.async.AsyncWindowProxy$1", null, Runnable);
Clazz.defineMethod (cla$$, "run", 
function () {
if (this.callbacks["com.ognize.jface.async.AsyncWindowProxy"].window.getShell () == null) {
this.callbacks["com.ognize.jface.async.AsyncWindowProxy"].getActiveDisplay ().timerExec (10, this);
return ;
}
var $hell = this.callbacks["com.ognize.jface.async.AsyncWindowProxy"].window.getShell ();
$hell.addDisposeListener ((function (innerThis, finalVars) {
if (!Clazz.isClassDefined ("com.ognize.jface.async.AsyncWindowProxy$1$2")) {
Clazz.pu$h ();
cla$$ = com.ognize.jface.async.AsyncWindowProxy$1$2 = function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (cla$$, "com.ognize.jface.async.AsyncWindowProxy$1$2", null, $wt.events.DisposeListener);
Clazz.defineMethod (cla$$, "widgetDisposed", 
function (e) {
//this.$finals.runnable.run ();
this.callbacks["com.ognize.jface.async.AsyncWindowProxy"].getActiveDisplay ().timerExec (5, this.$finals.runnable);
}, "$wt.events.DisposeEvent");
cla$$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (com.ognize.jface.async.AsyncWindowProxy$1$2, innerThis, finalVars);
}) (this, Clazz.cloneFinals ("runnable", this.$finals.runnable)));
$hell.getDisplay ().readAndDispatch ();
});
cla$$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (com.ognize.jface.async.AsyncWindowProxy$1, innerThis, finalVars);
}) (this, Clazz.cloneFinals ("runnable", runnable)).run ();
	 */
	public void open(final AsyncWindowRunnable runnable) {
		runnable.setWindow(window);
		new Thread(new Runnable() {
			public void run() {
				while (window.getShell() == null) {
					try {
						Thread.sleep(10);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
				getActiveDisplay().syncExec(new Runnable() {
					public void run() {
						window.getShell().addDisposeListener(new DisposeListener() {
							public synchronized void widgetDisposed(DisposeEvent e) {
								runnable.run();
							}
						});
					}
				});
			}
		}).start();
		window.open();
	}
	
	/*
	public void open(final AsyncWindowRunnable runnable) {
		runnable.setWindow(window);
		window.open();
		new Runnable() {
			public void run() {
				if (window.getShell() == null) {
					getActiveDisplay().timerExec(10, this);
					return ;
				}
				window.getShell().addDisposeListener(new DisposeListener() {
					public synchronized void widgetDisposed(DisposeEvent e) {
						//runnable.run();
						getActiveDisplay().timerExec(5, runnable);
					}
				});
			}
		}.run();
	}
	*/
	
	Display getActiveDisplay() {
		Display display = null;
		Shell shell = window.getShell();
		if (shell == null) {
			shell = WindowProxy.getParentShell(window);
		}
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
