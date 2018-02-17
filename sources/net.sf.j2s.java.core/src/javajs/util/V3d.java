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
 * A 3 element vector that is represented by double precision floating point
 * x,y,z coordinates. If this value represents a normal, then it should be
 * normalized.
 * 
 * @version specification 1.1, implementation $Revision: 1.9 $, $Date:
 *          2006/07/28 17:01:32 $
 * @author Kenji hiranabe
 * 
 * additions by Bob Hanson hansonr@stolaf.edu 9/30/2012
 * for unique constructor and method names
 * for the optimization of compiled JavaScript using Java2Script
 */
public class V3d extends T3d {

  /**
   * Sets this vector to be the vector cross product of vectors v1 and v2.
   * 
   * @param v1
   *        the first vector
   * @param v2
   *        the second vector
   */
  public final void cross(V3d v1, V3d v2) {
    // store on stack once for aliasing-safty
    // i.e. safe when a.cross(a, b)
    set(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y
        - v1.y * v2.x);
  }

  /**
   * Normalizes this vector in place.
   */
  public final void normalize() {
    double d = length();

    // zero-div may occur.
    x /= d;
    y /= d;
    z /= d;
  }

  /**
   * Computes the dot product of the this vector and vector v.
   * 
   * @param v
   *        the other vector
   * @return this.dot.v
   */
  public final double dot(V3d v) {
    return x * v.x + y * v.y + z * v.z;
  }

  /**
   * Returns the squared length of this vector.
   * 
   * @return the squared length of this vector
   */
  public final double lengthSquared() {
    return x * x + y * y + z * z;
  }

  /**
   * Returns the length of this vector.
   * 
   * @return the length of this vector
   */
  public final double length() {
    return Math.sqrt(lengthSquared());
  }

}
