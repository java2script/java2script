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
	 */
	@J2SIgnore
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
	 * ClazzLoader.loadClass (clazzName, afterLoaded == null ? null : function () {
	 * 	if (afterLoaded != null && Clazz.instanceOf (afterLoaded, net.sf.j2s.ajax.ARunnable)) {
	 * 		var clz = Clazz.evalType (clazzName);
	 * 		afterLoaded.setClazz (clz);
	 * 	}
	 * 	if (afterLoaded != null) afterLoaded.run ();
	 * }, false, true);
	 * @j2sNative
	 * ClazzLoader.loadClass (a, b == null ? null : function () {
	 * 	if (b != null && Clazz.instanceOf (b, net.sf.j2s.ajax.ARunnable)) {
	 * 		var clz = Clazz.evalType (a);
	 * 		b.setClazz (clz);
	 * 	}
	 * 	if (b != null) b.run ();
	 * }, false, true);
	 */
	public static void load(final String clazzName, final Runnable afterLoaded) {
		SimpleThreadHelper.runTask(new Runnable() {
			public void run() {
				try {
					Class<?> clz = Class.forName(clazzName);
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
		}, "Simple Asynchronous Class Loader");
	}
}
