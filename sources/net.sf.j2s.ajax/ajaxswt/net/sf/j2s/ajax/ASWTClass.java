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

	public static void swtLoad(String clazzName, Runnable afterLoaded) {
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
	 * 	if (Clazz.instanceOf (afterLoaded, net.sf.j2s.ajax.ARunnable)) {
	 * 		var clz = Clazz.evalType (clazzName);
	 * 		afterLoaded.setClazz (clz);
	 * 	}
	 * 	afterLoaded.run ();
	 * }, false, true);
	 * @j2sNative
	 * ClazzLoader.loadClass (b, function () {
	 * 	if (Clazz.instanceOf (c, net.sf.j2s.ajax.ARunnable)) {
	 * 		var clz = Clazz.evalType (b);
	 * 		c.setClazz (clz);
	 * 	}
	 * 	c.run ();
	 * }, false, true);
	 */
	public static void displayLoad(Display display, final String clazzName, final Runnable afterLoaded) {
		display.asyncExec(new Runnable() {
			public void run() {
				try {
					Class clz = Class.forName(clazzName);
					if (afterLoaded instanceof ARunnable) {
						ARunnable runnable = (ARunnable) afterLoaded;
						runnable.setClazz(clz);
					}
				} catch (ClassNotFoundException e) {
					e.printStackTrace();
					return ;
				}
				
				afterLoaded.run();
			}
		});
	}

	public static void shellLoad(Shell shell, String clazzName, Runnable afterLoaded) {
		displayLoad(shell.getDisplay(), clazzName, afterLoaded);
	}
}
