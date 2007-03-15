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

/**
 * This class is an asynchronous version of Class. It is designed for function
 * of Class#forName. While Class#forName will try to load class in synchronous
 * mode, this class AClass#load  is trying to load class in asynchronous mode.
 * A callback object is provided for action to be executed after the class is
 * loaded.
 * 
 * @author zhou renjian
 *
 * 2006-8-4
 */
public class AClass {
	
	/**
	 * AClass should NOT be instantialized outside package net.sf.j2s.ajax.
	 * User should always use its static methods.
	 * 
	 * @j2sIgnore
	 */
	protected AClass() {
		// prevent from instantialization
	}
	
	/**
	 * Load the class by the given class name and execute the given callback
	 * after class is loaded.
	 * 
	 * @param clazzName String given class name.
	 * @param afterLoaded Runnable given callback. If this parameter is an 
	 * instance of <code>ARunnable</code>, the callback will receive the 
	 * loaded class automatically.
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
	 * ClazzLoader.loadClass (a, function () {
	 * 	if (Clazz.instanceOf (b, net.sf.j2s.ajax.ARunnable)) {
	 * 		var clz = Clazz.evalType (a);
	 * 		b.setClazz (clz);
	 * 	}
	 * 	b.run ();
	 * }, false, true);
	 */
	public static void load(final String clazzName, final Runnable afterLoaded) {
		new Thread(new Runnable() {
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
		}).start();
	}
}
