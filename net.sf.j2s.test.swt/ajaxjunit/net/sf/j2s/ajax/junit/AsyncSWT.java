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

package net.sf.j2s.ajax.junit;

import junit.framework.AssertionFailedError;
import org.eclipse.swt.events.DisposeEvent;
import org.eclipse.swt.events.DisposeListener;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;

/**
 * @author zhou renjian
 *
 * 2006-7-31
 */
public class AsyncSWT {
	
	private static boolean shellAutoClose = true;
	
	public static void setShellAutoClose(boolean close) {
		shellAutoClose = close;
	}
	
	public static boolean isShellAutoClose() {
		return shellAutoClose;
	}
	
	/**
	 * @param shell
	 * @param runnable
	 * 
	 * @j2sNative
var oThis = arguments[2];
var closeCleanUp = arguments[3];
var f = function () {
	if (runnable != null) {
		try {
			runnable.run ();
		} catch (e) {
			if (Clazz.instanceOf (runnable, 
					net.sf.j2s.ajax.junit.AsyncTestRunnable)) {
if (Clazz.instanceOf (e, junit.framework.AssertionFailedError)) {
	runnable.test.testResult.addFailure (runnable.test, e);
} else if (Clazz.instanceOf (e, ThreadDeath)) {
	throw e;
} else if (Clazz.instanceOf (e, Throwable)) {
	runnable.test.testResult.addError (runnable.test, e);
} else {
	throw e;
}
			}
		} finally {
			if (net.sf.j2s.ajax.junit.AsyncSWT.isShellAutoClose ()) {
				shell.close ();
			}
		}
	} else {
		if (net.sf.j2s.ajax.junit.AsyncSWT.isShellAutoClose ()) {
			shell.close ();
		}
	}
};
var key = "j2s.swt.shell.finish.layout";
window[key] = f;
var closeFun = closeCleanUp;
if (Clazz.instanceOf (runnable, net.sf.j2s.ajax.junit.AsyncTestRunnable)) {
	closeFun = function () {
		closeCleanUp ();
		runnable.callback ();
	};
}
Sync2Async.block (shell, oThis, closeFun);
	 */
	public static void waitLayout(Shell shell, Runnable runnable) {
		if (runnable != null) {
			try {
				runnable.run();
			} catch (Throwable e) {
				//throw (Error) e;
				if (runnable instanceof AsyncTestRunnable) {
					AsyncTestRunnable aTest = (AsyncTestRunnable) runnable;
					if (e instanceof AssertionFailedError) {
						aTest.test.getTestResult()
								.addFailure (aTest.test, (AssertionFailedError) e);
					} else if (e instanceof ThreadDeath) {
						throw (ThreadDeath) e;
					} else if (e instanceof Throwable) {
						aTest.test.getTestResult()
								.addError (aTest.test, e);
					} else {
						throw (Error) e;
					}
				}
			} finally {
				if (isShellAutoClose()) {
					shell.close();
				}
			}
		} else {
			if (isShellAutoClose()) {
				shell.close();
			}
		}
		if (runnable instanceof AsyncTestRunnable) {
			final AsyncTestRunnable aTest = (AsyncTestRunnable) runnable;
			//aTest.callback();
			final Runnable callback = new Runnable() {
				public void run() {
					try {
						Thread.sleep(100);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
					aTest.callback();
				}
			};
			if (isShellAutoClose()) {
				new Thread(callback).start();
			} else {
				shell.addDisposeListener(new DisposeListener() {
					public void widgetDisposed(DisposeEvent e) {
						new Thread(callback).start();
					}
				});
				Display display = shell.getDisplay();
				while (!shell.isDisposed ()) {
					if (!display.readAndDispatch ()) display.sleep ();
				}
			}
		}
	}
}
