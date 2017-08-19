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

package javajs.api;

public class Interface {

  public static Object getInterface(String name) {
    try {
      Class<?> x = Class.forName(name);
      return (x == null ? null : x.newInstance());
    } catch (Exception e) {
      System.out.println("Interface.getInterface Error creating instance for " + name + ": \n" + e);
      return null;
    }
  }
  
	public static Object getInstanceWithParams(String name, Class<?>[] classes, Object... params) {
		try {
			Class<?> cl = Class.forName(name);
			return  cl.getConstructor(classes).newInstance(params);
		} catch (Exception e) {
      System.out.println("Interface.getInterfaceWithParams Error creating instance for " + name + ": \n" + e);
			return null;
		}
	}


}
