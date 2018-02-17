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

import javajs.api.JSONEncodable;
import javajs.util.T3;



/**
 * A 4 element axis angle represented by single precision floating point
 * x,y,z,angle components. An axis angle is a rotation of angle (radians) about
 * the vector (x,y,z).
 * 
 * @version specification 1.1, implementation $Revision: 1.9 $, $Date:
 *          2006/07/28 17:01:32 $
 * @author Kenji hiranabe
 * 
 * additions by Bob Hanson hansonr@stolaf.edu 9/30/2012
 * for unique constructor and method names
 * for the optimization of compiled JavaScript using Java2Script
 */
public class A4 implements JSONEncodable, Serializable {

  /*
   * I assumed that the length of the axis vector is not significant.
   */

  /**
   * The x coordinate.
   */
  public float x;

  /**
   * The y coordinate.
   */
  public float y;

  /**
   * The z coordinate.
   */
  public float z;

  /**
   * The angle.
   */
  public float angle;

  /**
   * Constructs and initializes a AxisAngle4f to (0,0,1,0).
   */
  public A4() {
    z = 1.0f;
  }

  /**
   * Constructs and initializes an AxisAngle4f from the specified x, y, z, and
   * angle.
   * 
   * @param x
   *        the x coordinate
   * @param y
   *        the y coordinate
   * @param z
   *        the z coordinate
   * @param angle
   *        the angle.
   * @return a
   */
  public static A4 new4(float x, float y, float z, float angle) {
    A4 a = new A4();
    a.set4(x, y, z, angle);
    return a;
  }

  /**
   * Constructs and initializes a AxisAngle4f from the specified AxisAngle4f.
   * 
   * @param a1
   *        the AxisAngle4f containing the initialization x y z angle data
   * @return a
   */
  public static A4 newAA(A4 a1) {
    A4 a = new A4();
    a.set4(a1.x, a1.y, a1.z, a1.angle);
    return a;
  }

  /**
   * Constructs and initializes an AxisAngle4f from the specified axis and
   * angle.
   * 
   * @param axis
   *        the axis
   * @param angle
   *        the angle
   * @return a
   */
  public static A4 newVA(V3 axis, float angle) {
    A4 a = new A4();
    a.setVA(axis, angle);
    return a;
  }

  /**
   * Sets the value of this AxisAngle4f to the specified axis and angle.
   * 
   * @param axis
   *        the axis
   * @param angle
   *        the angle
   * @since Java 3D 1.2
   */
  public final void setVA(V3 axis, float angle) {
    x = axis.x;
    y = axis.y;
    z = axis.z;
    this.angle = angle;
  }

  /**
   * Sets the value of this axis angle to the specified x,y,z,angle.
   * 
   * @param x
   *        the x coordinate
   * @param y
   *        the y coordinate
   * @param z
   *        the z coordinate
   * @param angle
   *        the angle
   */
  public final void set4(float x, float y, float z, float angle) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.angle = angle;
  }

  /**
   * Sets the value of this axis angle to the value of axis angle t1.
   * 
   * @param a
   *        the axis angle to be copied
   */
  public final void setAA(A4 a) {
    x = a.x;
    y = a.y;
    z = a.z;
    angle = a.angle;
  }


  /**
   * Sets the value of this axis-angle to the rotational component of the passed
   * matrix.
   * 
   * @param m1
   *        the matrix3f
   */
  public final void setM(M3 m1) {
    setFromMat(m1.m00, m1.m01, m1.m02, m1.m10, m1.m11, m1.m12, m1.m20, m1.m21,
        m1.m22);
  }

  // helper method
  private void setFromMat(double m00, double m01, double m02, double m10,
                          double m11, double m12, double m20, double m21,
                          double m22) {
    // assuming M is normalized.

    double cos = (m00 + m11 + m22 - 1.0) * 0.5;
    x = (float) (m21 - m12);
    y = (float) (m02 - m20);
    z = (float) (m10 - m01);
    double sin = 0.5 * Math.sqrt(x * x + y * y + z * z);
    if (sin == 0 && cos == 1) {
      x = y = 0;
      z = 1;
      angle = 0;
    } else {
      angle = (float) Math.atan2(sin, cos);
    }

    // no need to normalize
    // x /= n;
    // y /= n;
    // z /= n;
  }

  /**
   * Returns a hash number based on the data values in this object. Two
   * different AxisAngle4f objects with identical data values (ie, returns true
   * for equals(AxisAngle4f) ) will return the same hash number. Two vectors
   * with different data members may return the same hash value, although this
   * is not likely.
   */
  @Override
  public int hashCode() {
    return T3.floatToIntBits(x) ^ T3.floatToIntBits(y)
        ^ T3.floatToIntBits(z) ^ T3.floatToIntBits(angle);
  }

  /**
   * Returns true if the Object o is of type AxisAngle4f and all of the data
   * members of o1 are equal to the corresponding data members in this
   * AxisAngle4f.
   * 
   * @param o
   *        the object with which the comparison is made.
   * @return T/F
   */
  @Override
  public boolean equals(Object o) {
    if (!(o instanceof A4))
      return false;
    A4 a1 = (A4) o;
    return x == a1.x && y == a1.y && z == a1.z && angle == a1.angle;
  }

  /**
   * Returns a string that contains the values of this AxisAngle4f. The form is
   * (x,y,z,angle).
   * 
   * @return the String representation
   */
  @Override
  public String toString() {
    return "(" + x + ", " + y + ", " + z + ", " + angle + ")";
  }

  @Override
  public String toJSON() {
    return "[" + x + "," + y + "," + z + "," + (float) (angle * 180.0 / Math.PI) + "]";
  }
}
