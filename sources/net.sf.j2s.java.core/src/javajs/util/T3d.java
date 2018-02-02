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

import java.io.Serializable;

/**
 * A generic 3 element tuple that is represented by double precision floating
 * point x,y and z coordinates.
 * 
 * @version specification 1.1, implementation $Revision: 1.9 $, $Date:
 *          2006/07/28 17:01:32 $
 * @author Kenji hiranabe
 * 
 * additions by Bob Hanson hansonr@stolaf.edu 9/30/2012
 * for unique constructor and method names
 * for the optimization of compiled JavaScript using Java2Script
 */
public abstract class T3d implements Serializable {
  /**
   * The x coordinate.
   */
  public double x;

  /**
   * The y coordinate.
   */
  public double y;

  /**
   * The z coordinate.
   */
  public double z;

  /**
   * Constructs and initializes a Tuple3d to (0,0,0).
   */
  public T3d() {
  }

  /**
   * Sets the value of this tuple to the specified xyz coordinates.
   * 
   * @param x
   *        the x coordinate
   * @param y
   *        the y coordinate
   * @param z
   *        the z coordinate
   */
  public final void set(double x, double y, double z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Sets the value of this tuple from the 3 values specified in the array.
   * 
   * @param t
   *        the array of length 3 containing xyz in order
   */
  public final void setA(double t[]) {
    // ArrayIndexOutOfBounds is thrown if t.length < 3
    x = t[0];
    y = t[1];
    z = t[2];
  }

  /**
   * Sets the value of this tuple to the value of the Tuple3d argument.
   * 
   * @param t1
   *        the tuple to be copied
   */
  public final void setT(T3d t1) {
    x = t1.x;
    y = t1.y;
    z = t1.z;
  }

  /**
   * Sets the value of this tuple to the vector sum of tuples t1 and t2.
   * 
   * @param t1
   *        the first tuple
   * @param t2
   *        the second tuple
   */
  public final void add2(T3d t1, T3d t2) {
    x = t1.x + t2.x;
    y = t1.y + t2.y;
    z = t1.z + t2.z;
  }

  /**
   * Sets the value of this tuple to the vector sum of itself and tuple t1.
   * 
   * @param t1
   *        the other tuple
   */
  public final void add(T3d t1) {
    x += t1.x;
    y += t1.y;
    z += t1.z;
  }

  /**
   * Sets the value of this tuple to the vector difference of tuple t1 and t2
   * (this = t1 - t2).
   * 
   * @param t1
   *        the first tuple
   * @param t2
   *        the second tuple
   */
  public final void sub2(T3d t1, T3d t2) {
    x = t1.x - t2.x;
    y = t1.y - t2.y;
    z = t1.z - t2.z;
  }

  /**
   * Sets the value of this tuple to the vector difference of itself and tuple
   * t1 (this = this - t1).
   * 
   * @param t1
   *        the other tuple
   */
  public final void sub(T3d t1) {
    x -= t1.x;
    y -= t1.y;
    z -= t1.z;
  }

  /**
   * Sets the value of this tuple to the scalar multiplication of itself.
   * 
   * @param s
   *        the scalar value
   */
  public final void scale(double s) {
    x *= s;
    y *= s;
    z *= s;
  }

  /**
   * Sets the value of this tuple to the scalar multiplication of tuple t1 and
   * then adds tuple t2 (this = s*t1 + t2).
   * 
   * @param s
   *        the scalar value
   * @param t1
   *        the tuple to be multipled
   * @param t2
   *        the tuple to be added
   */
  public final void scaleAdd(double s, T3d t1, T3d t2) {
    x = s * t1.x + t2.x;
    y = s * t1.y + t2.y;
    z = s * t1.z + t2.z;
  }

  /**
   * Returns a hash number based on the data values in this object. Two
   * different Tuple3d objects with identical data values (ie, returns true for
   * equals(Tuple3d) ) will return the same hash number. Two vectors with
   * different data members may return the same hash value, although this is not
   * likely.
   */
  @Override
  public int hashCode() {
    long xbits = doubleToLongBits0(x);
    long ybits = doubleToLongBits0(y);
    long zbits = doubleToLongBits0(z);
    return (int) (xbits ^ (xbits >> 32) ^ ybits ^ (ybits >> 32) ^ zbits ^ (zbits >> 32));
  }

  static long doubleToLongBits0(double d) {
    // Check for +0 or -0
    return (d == 0 ? 0 : Double.doubleToLongBits(d));
  }

  /**
   * Returns true if all of the data members of Tuple3d t1 are equal to the
   * corresponding data members in this
   * 
   * @param t1
   *        the vector with which the comparison is made.
   */
  @Override
  public boolean equals(Object t1) {
    if (!(t1 instanceof T3d))
      return false;
    T3d t2 = (T3d) t1;
    return (this.x == t2.x && this.y == t2.y && this.z == t2.z);
  }

  /**
   * Returns a string that contains the values of this Tuple3d. The form is
   * (x,y,z).
   * 
   * @return the String representation
   */
  @Override
  public String toString() {
    return "{" + x + ", " + y + ", " + z + "}";
  }

}
