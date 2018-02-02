/*
   Copyright (C) 1997,1998,1999
   Kenji Hiranabe, Eiwa System Management, Inc.

   This program is free software.
   Implemented by Kenji Hiranabe(hiranabe@esm.co.jp),
   conforming to the Java(TM) 3D API specification by Sun Microsystems.

   Permission to use, copy, modify, distribute and sell this software
   and its documentation for any purpose is hereby granted without fee,
   provided that the above copyright notice appear in all copies and
   that both that copyright notice and this permission notice appear
   in supporting documentation. Kenji Hiranabe and Eiwa System Management,Inc.
   makes no representations about the suitability of this software for any
   purpose.  It is provided "AS IS" with NO WARRANTY.
*/
package javajs.util;



/**
 * A 3 element point that is represented by signed integer x,y,z coordinates.
 * 
 * @since Java 3D 1.2
 * @version specification 1.2, implementation $Revision: 1.9 $, $Date:
 *          2006/07/28 17:01:33 $
 * @author Kenji hiranabe
 * 
 * 
 *         additions by Bob Hanson hansonr@stolaf.edu 9/30/2012 for unique
 *         constructor and method names for the optimization of compiled
 *         JavaScript using Java2Script
 */
public class P3i extends T3i {

  public static P3i new3(int x, int y, int z) {
    P3i pt = new P3i();
    pt.x = x;
    pt.y = y;
    pt.z = z;
    return pt;
  }
}
