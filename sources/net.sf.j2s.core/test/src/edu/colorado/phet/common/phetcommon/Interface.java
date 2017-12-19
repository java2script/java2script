package edu.colorado.phet.common.phetcommon;

import java.lang.reflect.Constructor;

public class Interface {
	
	private static String instances=""; 

	public static Object getInstanceWithParams(String name, Class<?>[] classes, Object... params) {
		try {
			Class<?> cl = Class.forName(name);
			Constructor<?> x = cl.getConstructor(classes);
			return  x.newInstance(params);
		} catch (Exception e) {
			return null;
		}
	}
  public static Object getInstance(String name, boolean isQuiet) {
  	Object x = null;
  	/**
  	 * @j2sNative
  	 * 
  	 * Clazz._isQuiet = isQuiet;
  	 */
  	{}
    try {
    	if (!isQuiet && instances.indexOf(name + ";") <= 0) {
    		System.out.println("swingjs.api.Interface creating instance of " + name);
    		instances += name + ";";
    	}
    	Class<?> y = Class.forName(name); 
      if (y != null)
      	x = y.newInstance();
    } catch (Exception e) {
      System.out.println("Swingjs.api.Interface Error creating instance for " + name + ": \n" + e);
    } finally {
    	/**
    	 * @j2sNative
    	 * 
    	 * Clazz._isQuiet = false;
    	 */
    	{}      
    }
    return x;    	
  }

}
