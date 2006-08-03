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

package net.sf.j2s.ajax;

import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;

/**
 * @author josson smith
 *
 * 2006-8-4
 */
public class ASWTClass extends AClass {
	
	/**
	 * @j2sIgnore
	 */
	protected ASWTClass() {
		// prevent from instantialization
	}

	/**
	 * @param clazzName
	 * @param afterLoaded
	 * 
	 * @j2sNativeSrc
	 * ClazzLoader.loadClass (clazzName, function () {
	 * 	afterLoaded.run ();
	 * }, false, true);
	 * @j2sNative
	 * ClazzLoader.loadClass (a, function () {
	 * 	b.run ();
	 * }, false, true);
	 */
	public static void swtLoad(final String clazzName, final Runnable afterLoaded) {
		Display display = Display.getCurrent();
		if (display == null) {
			display = Display.getDefault();
		}
		displayLoad(display, clazzName, afterLoaded);
	}


	/**
	 * @param display
	 * @param clazzName
	 * @param afterLoaded
	 * 
	 * @j2sNativeSrc
	 * ClazzLoader.loadClass (clazzName, function () {
	 * 	afterLoaded.run ();
	 * }, false, true);
	 * @j2sNative
	 * ClazzLoader.loadClass (b, function () {
	 * 	c.run ();
	 * }, false, true);
	 */
	public static void displayLoad(Display display, final String clazzName, final Runnable afterLoaded) {
		display.asyncExec(new Runnable() {
			public void run() {
				try {
					Class.forName(clazzName);
				} catch (ClassNotFoundException e) {
					e.printStackTrace();
					return ;
				}
				
				afterLoaded.run();
			}
		});
	}

	/**
	 * @param shell
	 * @param clazzName
	 * @param afterLoaded
	 * 
	 * @j2sNativeSrc
	 * ClazzLoader.loadClass (clazzName, function () {
	 * 	afterLoaded.run ();
	 * }, false, true);
	 * @j2sNative
	 * ClazzLoader.loadClass (b, function () {
	 * 	c.run ();
	 * }, false, true);
	 */
	public static void shellLoad(Shell shell, final String clazzName, final Runnable afterLoaded) {
		displayLoad(shell.getDisplay(), clazzName, afterLoaded);
	}
}
