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
 * A 3 element point that is represented by single precision floating point
 * x,y,z coordinates.
 * 
 * @version specification 1.1, implementation $Revision: 1.10 $, $Date:
 *          2006/09/08 20:20:20 $
 * @author Kenji hiranabe
 * 
 * additions by Bob Hanson hansonr@stolaf.edu 9/30/2012
 * for unique constructor and method names
 * for the optimization of compiled JavaScript using Java2Script
 * 
 */
public class P3 extends T3 {

  public P3() {
    // ignore T3
  }
  
  public static P3 newP(T3 t) {
    P3 p = new P3();
    p.x = t.x;
    p.y = t.y;
    p.z = t.z;
    return p;
  }

  private static P3 unlikely;
  
  public static P3 getUnlikely() {
    return (unlikely == null ? unlikely = new3((float) Math.PI, (float) Math.E, (float) (Math.PI * Math.E)) : unlikely);
  }
  
  public static P3 new3(float x, float y, float z) {
    P3 p = new P3();
    p.x = x;
    p.y = y;
    p.z = z;
    return p;
  }

}
