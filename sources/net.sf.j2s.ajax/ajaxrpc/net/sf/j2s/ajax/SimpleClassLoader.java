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
	private String tag;
	
	private Set<String> targetClasses;
	
	private Object mutex;
	private Map<String, Class<?>> loadedClasses; // need synchronization on mutex

	private static boolean hasClassReloaded = false;
	private static ClassLoader defaultLoader = SimpleClassLoader.class.getClassLoader();
	private static Map<String, SimpleClassLoader> allLoaders = new HashMap<String, SimpleClassLoader>();
	
	public SimpleClassLoader(ClassLoader parent, String path, String tag, Set<String> targetClazzes) {
		super(parent);
		targetClasses = targetClazzes;
		loadedClasses = new HashMap<String, Class<?>>();
		mutex = new Object();
		classpath = path;
		this.tag = tag;
	}
	
	protected boolean isSystemClass(String clazzName) {
		return clazzName.startsWith("java.") || clazzName.startsWith("javax.");
	}
	
	/*
	 * Not overriding loadClass(String, boolean) or findClass(String).
	 * For loadClass(String, boolean), we don't know how to call resolveClass.
	 * For findClass(String), parent.loadClass(String, boolean) is called first
	 * and get existed class. It is not expected.
	 * 
	 * We need to implement our own lock to avoid running into dead-lock.
	 * 
	 * TODO: Fixed class loader dead lock using JDK7+
	 */
	@Override
	public Class<?> loadClass(String clazzName) throws ClassNotFoundException {
		Class<?> clazz = loadedClasses.get(clazzName);
		if (clazz != null) {
			return clazz;
		}
		boolean contains = targetClasses.contains(clazzName);
		if (!contains) {
			// Check inner classes
			int idx = clazzName.indexOf('$');
			if (idx != -1) { // RPC$1
				contains = targetClasses.contains(clazzName.substring(0, idx));
			}
			if (!contains) {
				idx = clazzName.lastIndexOf('.');
				if (idx != -1) { // RPC.User or net.sf.j2s.XXXRPC
					contains = targetClasses.contains(clazzName.substring(0, idx));
				}
			}
		}
		if (contains) {
        	synchronized (mutex) {
        		clazz = loadedClasses.get(clazzName);
    			if (clazz == null) {
    				// The following two lines are IO sensitive
		            byte[] bytes = null;
					// The following lines are IO sensitive
		            try {
						bytes = loadClassData(clazzName);
					} catch (IOException e) {
			        	throw new ClassNotFoundException(e.getMessage(), e);
					}
		            clazz = defineClass(clazzName, bytes, 0, bytes.length);
	    			loadedClasses.put(clazzName, clazz);
    			}
        		return clazz;
			}
		}
		/* 
		 * Potential class loader dead lock! Already met in production environment.
		 * We need JDK7+ to fix this problem.
		 * http://openjdk.java.net/groups/core-libs/ClassLoaderProposal.html
		 */
		ClassLoader classLoader = allLoaders.get(clazzName);
		if (classLoader == null) {
			classLoader = getParent();
		}
		clazz = classLoader.loadClass(clazzName);
		if (isSystemClass(clazzName)) {
			return clazz;
		} // else add to loaded classes map
		synchronized (mutex) {
			loadedClasses.put(clazzName, clazz);
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
        File f = new File(cp + className.replace('.', '/') + ".class");
        int size = (int) f.length();
        byte buff[] = new byte[size];
        DataInputStream dis = null;
        try {
			dis = new DataInputStream(new FileInputStream(f));
			dis.readFully(buff);
		} finally {
	        if (dis != null) {
	        	dis.close();
	        }
		}
        return buff;
    }

    /**
     * Load given class.
     * 
     * @param clazzName
     * @return 
     */
	public static Class<?> loadSimpleClass(String clazzName) {
		try {
			ClassLoader classLoader = hasClassReloaded ? allLoaders.get(clazzName) : null;
			if (classLoader != null) {
				return classLoader.loadClass(clazzName);
			} else {
				return Class.forName(clazzName);
			}
		} catch (Exception e) {
			//e.printStackTrace();
		}
		return null;
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
		Map<String, SimpleClassLoader> oldLoaders = allLoaders;
		SimpleClassLoader loader = null;
		Set<SimpleClassLoader> checkedLoaders = new HashSet<SimpleClassLoader>();
		for (Iterator<SimpleClassLoader> itr = oldLoaders.values().iterator(); itr.hasNext();) {
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
							&& loader.loadedClasses.containsKey(name)) { // thread-safe
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
		Set<String> targetClazzes = null;
		if (loader == null) {
			Map<String, SimpleClassLoader> newLoaders = new HashMap<String, SimpleClassLoader>();
			newLoaders.putAll(oldLoaders);
			targetClazzes = new HashSet<String>(clazzNames.length + clazzNames.length);
			loader = new SimpleClassLoader(defaultLoader, path, tag, targetClazzes);
			for (int i = 0; i < clazzNames.length; i++) {
				String name = clazzNames[i];
				if (name != null && name.length() > 0) {
					targetClazzes.add(name); // prepare
					newLoaders.put(name, loader); // prepare, not working
				}
			}
			newLoaders.put("." + (checkedLoaders.size() + 1), loader); // keep it in all loaders
			/*
			 * Try to pre-load classes. Pre-loading classes may decrease the
			 * chance of class loader dead lock. But it is not a complete
			 * solution.
			 * We need JDK7+ to fix class dead lock.
			 */
			for (int i = 0; i < clazzNames.length; i++) {
				String name = clazzNames[i];
				if (name != null && name.length() > 0) {
					try {
						Class<?> clazz = loader.loadClass(name);
						if (SimpleSerializable.isSubclassOf(clazz, SimpleSerializable.class)) {
							// cache fields
							SimpleSerializable.getSerializableFields(name, clazz);
						}
					} catch (ClassNotFoundException e) {
						e.printStackTrace();
					}
				}
			}
			allLoaders = newLoaders; // new class loader works now
		} else {
			targetClazzes = new HashSet<String>(loader.targetClasses);
			for (int i = 0; i < clazzNames.length; i++) {
				String name = clazzNames[i];
				if (name != null && name.length() > 0) {
					targetClazzes.add(name); // prepare
				}
			}
			loader.targetClasses = targetClazzes; // working after targetClasses is updated
			for (int i = 0; i < clazzNames.length; i++) {
				String name = clazzNames[i];
				if (name != null && name.length() > 0) {
					/* Try to pre-load classes. */
					try {
						Class<?> clazz = loader.loadClass(name);
						if (SimpleSerializable.isSubclassOf(clazz, SimpleSerializable.class)) {
							// cache fields
							SimpleSerializable.getSerializableFields(name, clazz);
						}
					} catch (ClassNotFoundException e) {
						e.printStackTrace();
					}
					oldLoaders.put(name, loader); // working now
				}
			}
		}
		hasClassReloaded = true;
	}
    
	public static void releaseUnusedClassLoaders() {
		Map<String, SimpleClassLoader> oldLoaders = allLoaders;
		Map<String, SimpleClassLoader> newLoaders = new HashMap<String, SimpleClassLoader>();
		newLoaders.putAll(oldLoaders);
		for (Iterator<String> itr = oldLoaders.keySet().iterator(); itr.hasNext();) {
			String key = (String) itr.next();
			if (key.startsWith(".")) {
				newLoaders.remove(key);
			}
		}
		allLoaders = newLoaders;
	}
	
	public static String allLoaderStatuses() {
		StringBuffer buffer = new StringBuffer();
		Set<SimpleClassLoader> checkedLoaders = new HashSet<SimpleClassLoader>();
		Map<String, SimpleClassLoader> loaders = allLoaders;
		int count = 0;
		for (Iterator<SimpleClassLoader> itr = loaders.values().iterator();
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
			Map<String, Class<?>> loadedClazzes = loader.loadedClasses;
			for (Iterator<String> iter = loadedClazzes.keySet().iterator(); iter
					.hasNext();) {
				String clazz = (String) iter.next();
				SimpleClassLoader clazzLoader = loaders.get(clazz);
				if (clazzLoader == loader) {
					buffer.append(clazz);
					buffer.append(", ");
				}
			}
			buffer.append("\r\n");
			buffer.append("inactive classes : ");
			for (Iterator<String> iter = loadedClazzes.keySet().iterator(); iter
					.hasNext();) {
				String clazz = (String) iter.next();
				SimpleClassLoader clazzLoader = loaders.get(clazz);
				if (clazzLoader != null && clazzLoader != loader) {
					buffer.append(clazz);
					buffer.append(", ");
				}
			}
			buffer.append("\r\n");
			buffer.append("other classes : ");
			for (Iterator<String> iter = loadedClazzes.keySet().iterator(); iter
					.hasNext();) {
				String clazz = (String) iter.next();
				SimpleClassLoader clazzLoader = loaders.get(clazz);
				if (clazzLoader == null) {
					buffer.append(clazz);
					buffer.append(", ");
				}
			}
			buffer.append("\r\n\r\n");
		} // end of for values
		buffer.append("Total classloaders : ");
		buffer.append(count);
		return buffer.toString();
	}
	
}
