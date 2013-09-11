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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
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
	private String tag;
	
	private Set<String> targetClasses;
	private Map<String, Class<?>> loadedClasses;
	private Object loadingMutex;

	private static boolean hasClassReloaded = false;
	private static ClassLoader defaultLoader = SimpleClassLoader.class.getClassLoader();
	private static Map<String, SimpleClassLoader> allLoaders = new HashMap<String, SimpleClassLoader>();
	
	public SimpleClassLoader(ClassLoader parent, String path, String tag) {
		super(parent);
		targetClasses = new HashSet<String>();
		loadedClasses = new HashMap<String, Class<?>>();
		loadingMutex = new Object();
		classpath = path;
		this.tag = tag;
	}
	
	protected boolean isSystemClass(String clazzName) {
		return clazzName.startsWith("java.") || clazzName.startsWith("javax.");
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
	    				// The following two lines are IO sensitive
			            byte[] bytes = loadClassData(clazzName);
			            clazz = defineClass(clazzName, bytes, 0, bytes.length);
		    			loadedClasses.put(clazzName, clazz);
	    			}
				}
	    		return clazz;
	        } catch (Throwable e) {
	        	//e.printStackTrace();
	        }
		}
		Class<?> clazz = getParent().loadClass(clazzName);
		if (isSystemClass(clazzName)) {
			return clazz;
		} // else add to loaded classes map
    	synchronized (loadingMutex) {
			if (!loadedClasses.containsKey(clazzName)) {
				loadedClasses.put(clazzName, clazz);
			}
    	}
		return clazz;
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
			//e.printStackTrace();
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
		reloadSimpleClasses(new String[] { clazzName }, path, null);
	}

	/**
	 * Try to reload given classes.
	 * 
	 * Class should contains default constructor.
	 * 
	 * @param clazzNames
	 * @param classpath for the given class
	 * @param tag, with specified tag
	 */
	public static void reloadSimpleClasses(String[] clazzNames, String path, String tag) {
		hasClassReloaded = true;
		SimpleClassLoader loader = null;
		Set<SimpleClassLoader> checkedLoaders = new HashSet<SimpleClassLoader>();
		synchronized (allLoaders) {
			for (Iterator<SimpleClassLoader> itr = allLoaders.values().iterator();
					itr.hasNext();) {
				loader = (SimpleClassLoader) itr.next();
				if (checkedLoaders.contains(loader)) {
					loader = null;
					continue;
				}
				checkedLoaders.add(loader);
				if ((tag == null // for tag is null, use any existed loader
								|| (loader.tag != null && loader.tag.equals(tag)))
						&& ((loader.classpath == null && path == null)
								|| (loader.classpath != null && loader.classpath.equals(path)))) {
					boolean loaded = false;
					for (int i = 0; i < clazzNames.length; i++) {
						String name = clazzNames[i];
						if (name != null && name.length() > 0
								&& loader.loadedClasses.containsKey(name)) {
							loaded = true;
							break;
						}
					}
					if (!loaded) {
						// Class loader does not know class specified by clazzName variable
						break;
					}
				}
				loader = null;
			}
			boolean creatingMore = false;
			if (loader == null) {
				loader = new SimpleClassLoader(defaultLoader, path, tag);
				creatingMore = true;
			}
			for (int i = 0; i < clazzNames.length; i++) {
				String name = clazzNames[i];
				if (name != null && name.length() > 0) {
					loader.targetClasses.add(name);
				}
			}
			if (creatingMore) { // keep it in all loaders
				allLoaders.put("." + (checkedLoaders.size() + 1), loader);
			}
			for (int i = 0; i < clazzNames.length; i++) {
				String name = clazzNames[i];
				if (name != null && name.length() > 0) {
					allLoaders.put(name, loader);
				}
			}
		}
		for (int i = 0; i < clazzNames.length; i++) {
			String name = clazzNames[i];
			if (name != null && name.length() > 0) {
				SimpleSerializable.removeCachedClassFields(name);
			}
		}
	}
    
	public static void releaseUnusedClassLoaders() {
		List<String> removingKeys = new ArrayList<String>();
		synchronized (allLoaders) {
			for (Iterator<String> itr = allLoaders.keySet().iterator(); itr.hasNext();) {
				String key = (String) itr.next();
				if (key.startsWith(".")) {
					removingKeys.add(key);
				}
			}
			for (Iterator<String> itr = removingKeys.iterator(); itr.hasNext();) {
				String key = (String) itr.next();
				allLoaders.remove(key);
			}
		}		
	}
	
	public static String allLoaderStatuses() {
		StringBuffer buffer = new StringBuffer();
		Set<SimpleClassLoader> checkedLoaders = new HashSet<SimpleClassLoader>();
		synchronized (allLoaders) {
			int count = 0;
			for (Iterator<SimpleClassLoader> itr = allLoaders.values().iterator();
					itr.hasNext();) {
				SimpleClassLoader loader = (SimpleClassLoader) itr.next();
				if (checkedLoaders.contains(loader)) {
					continue;
				}
				checkedLoaders.add(loader);
				count++;
				buffer.append("Classloader ");
				buffer.append(count);
				buffer.append(" ");
				buffer.append(loader.toString());
				buffer.append("\r\n");
				buffer.append("classpath : ");
				buffer.append(loader.classpath);
				buffer.append("\r\n");
				if (loader.tag != null) {
					buffer.append("tag : ");
					buffer.append(loader.tag);
					buffer.append("\r\n");
				}
				buffer.append("active classes : ");
				for (Iterator<String> iter = loader.loadedClasses.keySet().iterator(); iter
						.hasNext();) {
					String clazz = (String) iter.next();
					SimpleClassLoader clazzLoader = allLoaders.get(clazz);
					if (clazzLoader == loader) {
						buffer.append(clazz);
						buffer.append(", ");
					}
				}
				buffer.append("\r\n");
				buffer.append("inactive classes : ");
				for (Iterator<String> iter = loader.loadedClasses.keySet().iterator(); iter
						.hasNext();) {
					String clazz = (String) iter.next();
					SimpleClassLoader clazzLoader = allLoaders.get(clazz);
					if (clazzLoader != null && clazzLoader != loader) {
						buffer.append(clazz);
						buffer.append(", ");
					}
				}
				buffer.append("\r\n");
				buffer.append("other classes : ");
				for (Iterator<String> iter = loader.loadedClasses.keySet().iterator(); iter
						.hasNext();) {
					String clazz = (String) iter.next();
					SimpleClassLoader clazzLoader = allLoaders.get(clazz);
					if (clazzLoader == null) {
						buffer.append(clazz);
						buffer.append(", ");
					}
				}
				buffer.append("\r\n\r\n");
			} // end of for values
			buffer.append("Total classloaders : ");
			buffer.append(count);
		}
		return buffer.toString();
	}
	
}
