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
 * A 3 element point that is represented by single precision doubleing point
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
public class P3d extends T3d {

  public P3d() {
    // ignore T3
  }
  
  public static P3d newP(T3d t) {
    P3d p = new P3d();
    p.x = t.x;
    p.y = t.y;
    p.z = t.z;
    return p;
  }

  private static P3d unlikely;
  
  public static P3d getUnlikely() {
    return (unlikely == null ? unlikely = new3(Math.PI, Math.E, (Math.PI * Math.E)) : unlikely);
  }
  
  public static P3d new3(double x, double y, double z) {
    P3d p = new P3d();
    p.x = x;
    p.y = y;
    p.z = z;
    return p;
  }

  public static P3d newPd(T3 a) {
    return new3(a.x, a.y, a.z);
  }

  public static P3d newA(double[] a) {
   return new3(a[0], a[1], a[2]);    
  }

  /**
   * Copy to float version. Avoid using this, as it will slow down JavaScript unnecessarily.
   * 
   * @return new P3
   */
  public P3 copyToP3() {
    return P3.new3((float) x, (float) y, (float) z);
  }

  /**
   * Copy in Java; do nothing in JavaScript
   * 
   * @return this in JavaScript, P3 copy in Java
   */
  public P3 asP3() {
    /** @j2sNative
     * return this;
     */
    {
      return copyToP3();
    }
  }

}
