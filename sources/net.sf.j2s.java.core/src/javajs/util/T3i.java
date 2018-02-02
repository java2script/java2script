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
 * A 3-element tuple represented by signed integer x,y,z coordinates.
 * 
 * @since Java 3D 1.2
 * @version specification 1.2, implementation $Revision: 1.9 $, $Date:
 *          2006/07/28 17:01:32 $
 * @author Kenji hiranabe
 * 
 *         additions by Bob Hanson hansonr@stolaf.edu 9/30/2012 for unique
 *         constructor and method names for the optimization of compiled
 *         JavaScript using Java2Script
 */
public abstract class T3i implements Serializable {

  /**
   * The x coordinate.
   */
  public int x;

  /**
   * The y coordinate.
   */
  public int y;

  /**
   * The z coordinate.
   */
  public int z;

  /**
   * Constructs and initializes a Tuple3i to (0,0,0).
   */
  public T3i() {
  }

  /**
   * Sets the value of this tuple to to the specified x, y, and z coordinates.
   * 
   * @param x
   *        the x coordinate.
   * @param y
   *        the y coordinate.
   * @param z
   *        the z coordinate.
   */
  public final void set(int x, int y, int z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Sets the value of this tuple to the value of tuple t1.
   * 
   * @param t1
   *        the tuple to be copied.
   */
  public final void setT(T3i t1) {
    x = t1.x;
    y = t1.y;
    z = t1.z;
  }

  /**
   * Sets the value of this tuple to the sum of itself and t1.
   * 
   * @param t
   *        is the other tuple
   */
  public final void add(T3i t) {
    x += t.x;
    y += t.y;
    z += t.z;
  }

  /**
   * Sets the value of this tuple to the scalar multiplication of tuple t1 plus
   * tuple t2 (this = s*t1 + t2).
   * 
   * @param s
   *        the scalar value
   * @param t1
   *        the tuple to be multipled
   * @param t2
   *        the tuple to be added
   */
  public final void scaleAdd(int s, T3i t1, T3i t2) {
    x = s * t1.x + t2.x;
    y = s * t1.y + t2.y;
    z = s * t1.z + t2.z;
  }

  /**
   * Returns a hash number based on the data values in this object. Two
   * different Tuple3i objects with identical data values (ie, returns true for
   * equals(Tuple3i) ) will return the same hash number. Two vectors with
   * different data members may return the same hash value, although this is not
   * likely.
   */
  @Override
  public int hashCode() {
    return x ^ y ^ z;
  }

  /**
   * Returns true if the Object o is of type Tuple3i and all of the data members
   * of t are equal to the corresponding data members in this Tuple3i.
   * 
   * @param o
   *        the object with which the comparison is made.
   */
  @Override
  public boolean equals(Object o) {
    if (!(o instanceof T3i))
      return false;
    T3i t = (T3i) o;
    return (this.x == t.x && this.y == t.y && this.z == t.z);
  }

  /**
   * Returns a string that contains the values of this Tuple3i. The form is
   * (x,y,z).
   * 
   * @return the String representation
   */
  @Override
  public String toString() {
    return "(" + x + ", " + y + ", " + z + ")";
  }

}
