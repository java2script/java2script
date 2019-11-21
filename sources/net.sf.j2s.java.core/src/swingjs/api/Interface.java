/* $RCSfile$
 * $Author$
 * $Date$
 * $Revision$
 *
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (C) 2006  The Jmol Development Team
 *
 * Contact: jmol-developers@lists.sf.net
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2.1 of the License, or (at your option) any later version.
 *
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 *  02110-1301, USA.
 */

package swingjs.api;

public class Interface {
	
	private static String instances=""; 

	public static Object getInstanceWithParams(String name, Class<?>[] classes, Object... params) {
		try {
			Class<?> cl = Class.forName(name);
			return  cl.getConstructor(classes).newInstance(params);
		} catch (Exception e) {
			return null;
		}
	}
  public static Object getInstance(String name, boolean isQuiet) {
  	Object x = null;
  	/**
  	 * @j2sNative
  	 * 
  	 * Clazz._isQuietLoad = isQuiet;
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
    } catch (Throwable e) {
      System.out.println("Swingjs.api.Interface Error creating instance for " + name + ": \n" + e);
      /**
       * @j2sNative
       * 
       * if (e.stack)System.out.println(e.stack);
       */
      {}
    } finally {
    	/**
    	 * @j2sNative
    	 * 
    	 * Clazz._isQuietLoad = false;
    	 */
    	{}      
    }
    return x;    	
  }

}
