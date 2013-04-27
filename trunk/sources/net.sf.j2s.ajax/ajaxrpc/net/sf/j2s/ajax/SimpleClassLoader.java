/*******************************************************************************
 * Copyright (c) 2013 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian / zhourenjian@gmail.com - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.ajax;

import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/**
 * SimpleClassLoader is designed to load or reload class instance.
 * 
 * Developer can use {@link #reloadSimpleClass(String, String)} to reload a
 * given class.
 * 
 * @author zhourenjian
 *
 */
public class SimpleClassLoader extends ClassLoader {

	private String classpath;
	
	private Set<String> targetClasses;
	private Map<String, Class<?>> loadedClasses;
	private Object loadingMutex;

	private static boolean hasClassReloaded = false;
	private static ClassLoader defaultLoader = SimpleClassLoader.class.getClassLoader();
	private static Map<String, SimpleClassLoader> allLoaders = new HashMap<String, SimpleClassLoader>();
	
	public SimpleClassLoader(ClassLoader parent, String path) {
		super(parent);
		targetClasses = new HashSet<String>();
		loadedClasses = new HashMap<String, Class<?>>();
		loadingMutex = new Object();
		classpath = path;
	}

	@Override
	public Class<?> loadClass(String clazzName) throws ClassNotFoundException {
		if (targetClasses.contains(clazzName)) {
			Class<?> clazz = loadedClasses.get(clazzName);
			if (clazz != null) {
				return clazz;
			}
	        try {
	        	synchronized (loadingMutex) {
	        		clazz = loadedClasses.get(clazzName);
	    			if (clazz == null) {
			            byte[] bytes = loadClassData(clazzName);
			            clazz = defineClass(clazzName, bytes, 0, bytes.length);
			    		synchronized (loadedClasses) {
			    			loadedClasses.put(clazzName, clazz);
			    		}
	    			}
				}
	    		return clazz;
	        } catch (Throwable e) {
	        	e.printStackTrace();
	        }
		}
		return getParent().loadClass(clazzName);
	}
	
	/*
	 * Read class bytes from file system.
	 */
    private byte[] loadClassData(String className) throws IOException {
    	String cp = classpath;
    	if (cp == null) {
    		cp = "./";
    	}
    	int length = cp.length();
		if (length > 0) {
			char c = cp.charAt(length - 1);
			if (c != '/' && c != '\\') {
	    		cp = cp + "/";
			}
    	}
        File f = new File(cp + className.replaceAll("\\.", "/") + ".class");
        int size = (int) f.length();
        byte buff[] = new byte[size];
        FileInputStream fis = new FileInputStream(f);
        DataInputStream dis = new DataInputStream(fis);
        dis.readFully(buff);
        dis.close();
        return buff;
    }

    /**
     * Load given class and create instance by default constructor.
     * 
     * This method should not be used for those classes without default constructor.
     * 
     * @param clazzName
     * @return 
     */
	public static Object loadSimpleInstance(String clazzName) {
		try {
			Class<?> runnableClass = null;
			ClassLoader classLoader = hasClassReloaded ? allLoaders.get(clazzName) : null;
			if (classLoader != null) {
				runnableClass = classLoader.loadClass(clazzName);
			} else {
				runnableClass = Class.forName(clazzName);
			}
			if (runnableClass != null) {
				return runnableClass.newInstance();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * Try to reload given class.
	 * 
	 * Class should contains default constructor.
	 * 
	 * @param clazzName
	 * @param classpath for the given class
	 */
	public static void reloadSimpleClass(String clazzName, String path) {
		hasClassReloaded = true;
		SimpleClassLoader loader = null;
		synchronized (allLoaders) {
			for (Iterator<SimpleClassLoader> itr = allLoaders.values().iterator();
					itr.hasNext();) {
				loader = (SimpleClassLoader) itr.next();
				if (!loader.loadedClasses.containsKey(clazzName)
						&& ((loader.classpath == null && path == null) || loader.classpath.equals(path))) {
					// Class loader does not know class specified by clazzName variable
					break;
				}
				loader = null;
			}
		}
		if (loader == null) {
			loader = new SimpleClassLoader(defaultLoader, path);
		}
		synchronized (loader.targetClasses) {
			loader.targetClasses.add(clazzName);
		}
		synchronized (allLoaders) {
			allLoaders.put(clazzName, loader);
		}
		SimpleSerializable.removeCachedClassFields(clazzName);
	}
    
}
