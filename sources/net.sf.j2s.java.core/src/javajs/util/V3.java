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
 * A 3-element vector that is represented by single precision floating point
 * x,y,z coordinates. If this value represents a normal, then it should be
 * normalized.
 * 
 * @version specification 1.1, implementation $Revision: 1.10 $, $Date:
 *          2006/10/03 19:52:30 $
 * @author Kenji hiranabe
 * 
 * additions by Bob Hanson hansonr@stolaf.edu 9/30/2012
 * for unique constructor and method names
 * for the optimization of compiled JavaScript using Java2Script
 */
public class V3 extends T3 {

  public V3() {
  }
  
  public static V3 newV(T3 t) {
    return V3.new3(t.x, t.y, t.z);
  }

  public static V3 newVsub(T3 t1, T3 t2) {
    return V3.new3(t1.x - t2.x, t1.y - t2.y,t1.z - t2.z);
  }

  public static V3 new3(float x, float y, float z) {
    V3 v = new V3();
    v.x = x;
    v.y = y;
    v.z = z;
    return v;
  }

  /**
   * Returns the angle in radians between this vector and the vector parameter;
   * the return value is constrained to the range [0,PI].
   * 
   * @param v1
   *        the other vector
   * @return the angle in radians in the range [0,PI]
   */
  public final float angle(V3 v1) {
    // return (double)Math.acos(dot(v1)/v1.length()/v.length());
    // Numerically, near 0 and PI are very bad condition for acos.
    // In 3-space, |atan2(sin,cos)| is much stable.

    double xx = y * v1.z - z * v1.y;
    double yy = z * v1.x - x * v1.z;
    double zz = x * v1.y - y * v1.x;
    double cross = Math.sqrt(xx * xx + yy * yy + zz * zz);

    return (float) Math.abs(Math.atan2(cross, dot(v1)));
  }
}
