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

import net.sf.j2s.annotation.J2SIgnore;

import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;

/**
 * This class is designed to load class asynchronously within the same thread 
 * of given Shell or Display. Because executing callback after given class is 
 * loaded will be in another thread scope of current Display. In order to 
 * avoid nasty codes of such 
 * <pre>
	Display.getDefault().asyncExec(new Runnable() {
			public void run() {
				//...
			}
	});
 * </pre>
 * This class ASWTClass is designed so developer won't need to code in such 
 * nasty way. Just call <code>ASWTClass#swtLoad</code> with the same
 * parameter as <code>AClass#load</code>. Or call <code>ASWTClass#shellLoad</code>
 * or <code>ASWTClass#displayLoad</code> with extra Shell/Display argument. 
 * 
 * @author zhou renjian
 *
 * 2006-8-4
 */
public class ASWTClass extends AClass {
	
	/**
	 * ASWTClass should NOT be instantialized outside package net.sf.j2s.ajax.
	 * User should always use its static methods.
	 */
    @J2SIgnore
	protected ASWTClass() {
		// prevent from instantialization
	}

	/**
	 * Load class by given class name and execute callback in the same thread
	 * of default Display's thread.
	 *  
	 * @param clazzName String given class name.
	 * @param afterLoaded Runnable given callback. If this parameter is an 
	 * instance of <code>ARunnable</code>, the callback will receive the 
	 * loaded class automatically.
	 */
	public static void swtLoad(String clazzName, Runnable afterLoaded) {
		Display display = null;
		/**
		 * @j2sIgnore
		 */
		{
			Display.getCurrent();
			if (display == null) {
				display = Display.getDefault();
			}
		}
		objectLoad(display, clazzName, afterLoaded);
	}


	/**
	 * Load class by given class name and execute callback in the same thread
	 * of given Display's thread.
	 * 
	 * @param display Display given display
	 * @param clazzName String given class name.
	 * @param afterLoaded Runnable given callback. If this parameter is an 
	 * instance of <code>ARunnable</code>, the callback will receive the 
	 * loaded class automatically.
	 * 
	 * @j2sNativeSrc
	 * ClazzLoader.loadClass (clazzName, afterLoaded == null ? null : function () {
	 * 	if (afterLoaded != null && Clazz.instanceOf (afterLoaded, net.sf.j2s.ajax.ARunnable)) {
	 * 		var clz = Clazz.evalType (clazzName);
	 * 		afterLoaded.setClazz (clz);
	 * 	}
	 * 	if (afterLoaded != null) afterLoaded.run ();
	 * }, false, true);
	 * @j2sNative
	 * ClazzLoader.loadClass (b, c == null ? null : function () {
	 * 	if (c != null && Clazz.instanceOf (c, net.sf.j2s.ajax.ARunnable)) {
	 * 		var clz = Clazz.evalType (b);
	 * 		c.setClazz (clz);
	 * 	}
	 * 	if (c != null) c.run ();
	 * }, false, true);
	 */
	static void objectLoad(Object display, final String clazzName, final Runnable afterLoaded) {
		((Display) display).asyncExec(new Runnable() {
			public void run() {
				try {
					Class<?> clz = Class.forName(clazzName); // May freeze UI!
					if (afterLoaded != null && afterLoaded instanceof ARunnable) {
						ARunnable runnable = (ARunnable) afterLoaded;
						runnable.setClazz(clz);
					}
				} catch (ClassNotFoundException e) {
					e.printStackTrace();
					return ;
				}
				
				if (afterLoaded != null) afterLoaded.run();
			}
		});
	}

	/**
	 * Load class asynchronously and execute callback in the same thread
	 * of given Display's thread.
	 * 
	 * @param display Display given display
	 * @param clazzName String given class name.
	 * @param afterLoaded Runnable given callback. If this parameter is an 
	 * instance of <code>ARunnable</code>, the callback will receive the 
	 * loaded class automatically.
	 */
	public static void displayLoad(Display display, final String clazzName, final Runnable afterLoaded) {
		objectLoad(display, clazzName, afterLoaded);
	}
	/**
	 * Load class asynchronously and execute callback in the same thread of 
	 * given Shell's Display.
	 * 
	 * @param shell Shell given shell
	 * @param clazzName String given class name.
	 * @param afterLoaded Runnable given callback. If this parameter is an 
	 * instance of <code>ARunnable</code>, the callback will receive the 
	 * loaded class automatically.
	 * 
	 */
	public static void shellLoad(Shell shell, String clazzName, Runnable afterLoaded) {
		objectLoad(shell.getDisplay(), clazzName, afterLoaded);
	}
}
