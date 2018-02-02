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
 * A single precision floating point 3 by 3 matrix.
 * 
 * @author Kenji hiranabe
 * 
 *         additions by Bob Hanson hansonr@stolaf.edu 9/30/2012 for unique
 *         constructor and method names for the optimization of compiled
 *         JavaScript using Java2Script
 *         
 *         
 */
public class M3 extends M34 implements Serializable {

  /**
   * Constructs and initializes a Matrix3f to all zeros.
   */
  public M3() {
  }

  /**
   * Constructs and initializes a Matrix3f from the specified 9 element array.
   * this.m00 =v[0], this.m01=v[1], etc.
   * 
   * @param v
   *        the array of length 9 containing in order
   * @return m
   */
  public static M3 newA9(float[] v) {
    M3 m = new M3();
    m.setA(v);
    return m;
  }
  
  /**
   * Constructs a new matrix with the same values as the Matrix3f parameter.
   * 
   * @param m1
   *        The source matrix.
   * @return m
   */
  public static M3 newM3(M3 m1) {
    M3 m = new M3();
    if (m1 == null) {
      m.setScale(1);
      return m;
    }
    m.m00 = m1.m00;
    m.m01 = m1.m01;
    m.m02 = m1.m02;

    m.m10 = m1.m10;
    m.m11 = m1.m11;
    m.m12 = m1.m12;

    m.m20 = m1.m20;
    m.m21 = m1.m21;
    m.m22 = m1.m22;
    return m;
  }

  /**
   * Sets this Matrix3f to a scalar * Identity.
   * @param scale 
   */
  public void setScale(float scale) {
    clear33();
    m00 = m11 = m22 = scale;
  }

  /**
   * Sets the value of this matrix to the double value of the Matrix3f argument.
   * 
   * @param m1
   *        the matrix3f
   */
  public void setM3(M34 m1) {
    setM33(m1);
  }
  /**
   * Sets the values in this Matrix3f equal to the row-major array parameter
   * (ie, the first four elements of the array will be copied into the first row
   * of this matrix, etc.).
   * 
   * @param m
   */
  public void setA(float m[]) {
    m00 = m[0];
    m01 = m[1];
    m02 = m[2];
    m10 = m[3];
    m11 = m[4];
    m12 = m[5];
    m20 = m[6];
    m21 = m[7];
    m22 = m[8];
  }

  /**
   * Sets the specified element of this matrix3d to the value provided.
   * 
   * @param row
   *        the row number to be modified (zero indexed)
   * @param col
   *        the column number to be modified (zero indexed)
   * @param v
   *        the new value
   */
  public void setElement(int row, int col, float v) {
    set33(row, col, v);
  }

  /**
   * Retrieves the value at the specified row and column of this matrix.
   * 
   * @param row
   *        the row number to be retrieved (zero indexed)
   * @param col
   *        the column number to be retrieved (zero indexed)
   * @return the value at the indexed element
   */
  public float getElement(int row, int col) {
    return get33(row, col);
  }

  /**
   * Sets the specified row of this matrix3d to the three values provided.
   * 
   * @param row
   *        the row number to be modified (zero indexed)
   * @param x
   *        the first column element
   * @param y
   *        the second column element
   * @param z
   *        the third column element
   */
  public void setRow(int row, float x, float y, float z) {
    switch (row) {
    case 0:
      m00 = x;
      m01 = y;
      m02 = z;
      return;
    case 1:
      m10 = x;
      m11 = y;
      m12 = z;
      return;
    case 2:
      m20 = x;
      m21 = y;
      m22 = z;
      return;
    default:
      err();
    }
  }

  /**
   * Sets the specified row of this matrix3d to the Vector provided.
   * 
   * @param row
   *        the row number to be modified (zero indexed)
   * @param v
   *        the replacement row
   */
  public void setRowV(int row, T3 v) {
    switch (row) {
    case 0:
      m00 = v.x;
      m01 = v.y;
      m02 = v.z;
      return;
    case 1:
      m10 = v.x;
      m11 = v.y;
      m12 = v.z;
      return;
    case 2:
      m20 = v.x;
      m21 = v.y;
      m22 = v.z;
      return;
    default:
      err();
    }
  }

  /**
   * Sets the specified row of this matrix3d to the four values provided.
   * 
   * @param row
   *        the row number to be modified (zero indexed)
   * @param v
   *        the replacement row
   */
  public void setRowA(int row, float v[]) {
    setRow33(row, v);
  }

  /**
   * Copies the matrix values in the specified row into the array parameter.
   * 
   * @param row
   *        the matrix row
   * @param v
   *        The array into which the matrix row values will be copied
   */
  @Override
  public void getRow(int row, float v[]) {
    getRow33(row, v);
  }

  /**
   * Sets the specified column of this matrix3d to the three values provided.
   * 
   * @param column
   *        the column number to be modified (zero indexed)
   * @param x
   *        the first row element
   * @param y
   *        the second row element
   * @param z
   *        the third row element
   */
  public void setColumn3(int column, float x, float y, float z) {
    switch (column) {
    case 0:
      m00 = x;
      m10 = y;
      m20 = z;
      break;
    case 1:
      m01 = x;
      m11 = y;
      m21 = z;
      break;
    case 2:
      m02 = x;
      m12 = y;
      m22 = z;
      break;
    default:
      err();
    }
  }

  /**
   * Sets the specified column of this matrix3d to the vector provided.
   * 
   * @param column
   *        the column number to be modified (zero indexed)
   * @param v
   *        the replacement column
   */
  public void setColumnV(int column, T3 v) {
    switch (column) {
    case 0:
      m00 = v.x;
      m10 = v.y;
      m20 = v.z;
      break;
    case 1:
      m01 = v.x;
      m11 = v.y;
      m21 = v.z;
      break;
    case 2:
      m02 = v.x;
      m12 = v.y;
      m22 = v.z;
      break;
    default:
      err();
    }
  }

  /**
   * Copies the matrix values in the specified column into the vector parameter.
   * 
   * @param column
   *        the matrix column
   * @param v
   *        The vector into which the matrix row values will be copied
   */
  public void getColumnV(int column, T3 v) {
    switch (column) {
    case 0:
      v.x = m00;
      v.y = m10;
      v.z = m20;
      break;
    case 1:
      v.x = m01;
      v.y = m11;
      v.z = m21;
      break;
    case 2:
      v.x = m02;
      v.y = m12;
      v.z = m22;
      break;
    default:
      err();
    }
  }

  /**
   * Sets the specified column of this matrix3d to the four values provided.
   * 
   * @param column
   *        the column number to be modified (zero indexed)
   * @param v
   *        the replacement column
   */
  public void setColumnA(int column, float v[]) {
    setColumn33(column, v);
  }

  /**
   * Copies the matrix values in the specified column into the array parameter.
   * 
   * @param column
   *        the matrix column
   * @param v
   *        The array into which the matrix row values will be copied
   */
  public void getColumn(int column, float v[]) {
    getColumn33(column, v);
  }

  /**
   * Sets the value of this matrix to sum of itself and matrix m1.
   * 
   * @param m1
   *        the other matrix
   */
  public void add(M3 m1) {
    add33(m1);
  }

  /**
   * Sets the value of this matrix to the matrix difference of itself and matrix
   * m1 (this = this - m1).
   * 
   * @param m1
   *        the other matrix
   */
  public void sub(M3 m1) {
    sub33(m1);
  }

  /**
   * Sets the value of this matrix to its transpose.
   */
  public void transpose() {
    transpose33();
  }

  /**
   * Sets the value of this matrix to the transpose of the argument matrix
   * 
   * @param m1
   *        the matrix to be transposed
   */
  public void transposeM(M3 m1) {
    // alias-safe
    setM33(m1);
    transpose33();
  }

  /**
   * Sets the value of this matrix to the matrix inverse of the passed matrix
   * m1.
   * 
   * @param m1
   *        the matrix to be inverted
   */
  public void invertM(M3 m1) {
    setM33(m1);
    invert();
  }

  /**
   * Sets the value of this matrix to its inverse.
   */
  public void invert() {
    double s = determinant3();
    if (s == 0.0)
      return;
    s = 1 / s;
    // alias-safe way.
    set9(m11 * m22 - m12 * m21, m02 * m21 - m01 * m22, m01 * m12 - m02 * m11,
        m12 * m20 - m10 * m22, m00 * m22 - m02 * m20, m02 * m10 - m00 * m12,
        m10 * m21 - m11 * m20, m01 * m20 - m00 * m21, m00 * m11 - m01 * m10);
    scale((float) s);
  }

  /**
   * Sets the value of this matrix to a rotation matrix about the x axis by the
   * passed angle.
   * 
   * @param angle
   *        the angle to rotate about the X axis in radians
   * @return this
   */
  public M3 setAsXRotation(float angle) {
    setXRot(angle);
    return this;
  }
  
  /**
   * Sets the value of this matrix to a rotation matrix about the y axis by the
   * passed angle.
   * 
   * @param angle
   *        the angle to rotate about the Y axis in radians
   * @return this
   */
  public M3 setAsYRotation(float angle) {
    setYRot(angle);
    return this;
  }

  /**
   * Sets the value of this matrix to a rotation matrix about the z axis by the
   * passed angle.
   * 
   * @param angle
   *        the angle to rotate about the Z axis in radians
   * @return this
   */
  public M3 setAsZRotation(float angle) {
    setZRot(angle);
    return this;
  }

  /**
   * Multiplies each element of this matrix by a scalar.
   * 
   * @param scalar
   *        The scalar multiplier.
   */
  public void scale(float scalar) {
    mul33(scalar);
  }

  /**
   * Sets the value of this matrix to the result of multiplying itself with
   * matrix m1.
   * 
   * @param m1
   *        the other matrix
   */
  public void mul(M3 m1) {
    mul2(this, m1);
  }

  /**
   * Sets the value of this matrix to the result of multiplying the two argument
   * matrices together.
   * 
   * @param m1
   *        the first matrix
   * @param m2
   *        the second matrix
   */
  public void mul2(M3 m1, M3 m2) {
    // alias-safe way.
    set9(m1.m00 * m2.m00 + m1.m01 * m2.m10 + m1.m02 * m2.m20, m1.m00 * m2.m01
        + m1.m01 * m2.m11 + m1.m02 * m2.m21, m1.m00 * m2.m02 + m1.m01 * m2.m12
        + m1.m02 * m2.m22,

    m1.m10 * m2.m00 + m1.m11 * m2.m10 + m1.m12 * m2.m20, m1.m10 * m2.m01
        + m1.m11 * m2.m11 + m1.m12 * m2.m21, m1.m10 * m2.m02 + m1.m11 * m2.m12
        + m1.m12 * m2.m22,

    m1.m20 * m2.m00 + m1.m21 * m2.m10 + m1.m22 * m2.m20, m1.m20 * m2.m01
        + m1.m21 * m2.m11 + m1.m22 * m2.m21, m1.m20 * m2.m02 + m1.m21 * m2.m12
        + m1.m22 * m2.m22);
  }

  /**
   * Returns true if the Object o is of type Matrix3f and all of the data
   * members of t1 are equal to the corresponding data members in this Matrix3f.
   * 
   * @param o
   *        the object with which the comparison is made.
   */
  @Override
  public boolean equals(Object o) {
    if (!(o instanceof M3))
      return false;
    M3 m = (M3) o;
    return m00 == m.m00 && m01 == m.m01 && m02 == m.m02 && m10 == m.m10
        && m11 == m.m11 && m12 == m.m12 && m20 == m.m20 && m21 == m.m21
        && m22 == m.m22;
  }

  /**
   * Returns a hash number based on the data values in this object. Two
   * different Matrix3f objects with identical data values (ie, returns true for
   * equals(Matrix3f) ) will return the same hash number. Two objects with
   * different data members may return the same hash value, although this is not
   * likely.
   * 
   * @return the integer hash value
   */
  @Override
  public int hashCode() {
    return T3.floatToIntBits(m00) ^ T3.floatToIntBits(m01)
        ^ T3.floatToIntBits(m02) ^ T3.floatToIntBits(m10)
        ^ T3.floatToIntBits(m11) ^ T3.floatToIntBits(m12)
        ^ T3.floatToIntBits(m20) ^ T3.floatToIntBits(m21)
        ^ T3.floatToIntBits(m22);
  }

  /**
   * Sets this matrix to all zeros.
   */
  public void setZero() {
    clear33();
  }

  /**
   * Sets 9 values
   * 
   * @param m00
   * @param m01
   * @param m02
   * @param m10
   * @param m11
   * @param m12
   * @param m20
   * @param m21
   * @param m22
   */
  private void set9(float m00, float m01, float m02, float m10, float m11,
                   float m12, float m20, float m21, float m22) {
    this.m00 = m00;
    this.m01 = m01;
    this.m02 = m02;
    this.m10 = m10;
    this.m11 = m11;
    this.m12 = m12;
    this.m20 = m20;
    this.m21 = m21;
    this.m22 = m22;
  }

  /**
   * Returns a string that contains the values of this Matrix3f.
   * 
   * @return the String representation
   */
  @Override
  public String toString() {
    return "[\n  [" + m00 + "\t" + m01 + "\t" + m02 + "]" + "\n  [" + m10
        + "\t" + m11 + "\t" + m12 + "]" + "\n  [" + m20 + "\t" + m21 + "\t"
        + m22 + "] ]";
  }

  /**
   * Sets the value of this matrix to the matrix conversion of the single
   * precision axis and angle argument.
   * 
   * @param a
   *        the axis and angle to be converted
   * @return this
   */
  public M3 setAA(A4 a) {
    setAA33(a);
    return this;
  }

  /**
   * 3D ball rotation from dx dy in-plane mouse motion
   * adapted from Andrew Hanson
   * Computer Graphics beyond the Third Dimension:
   * Geometry, Orientation Control, and Rendering for
   * Graphics in Dimensions Greater than Three
   * Course Notes for SIGGRAPH ’98
   * http://www.cse.ohio-state.edu/~hwshen/888_su02/hanson_note.pdf
   * 
   * @param responseFactor Jmol uses 0.02 here
   * @param dx
   * @param dy
   * @return true if successful; false if not;
   */
  public boolean setAsBallRotation(float responseFactor, float dx, float dy) {
    float r = (float) Math.sqrt(dx * dx + dy * dy);
    float th =  r * responseFactor;
    if (th == 0) {
      setScale(1);
      return false;
    }
    float c = (float) Math.cos(th);
    float s = (float) Math.sin(th);
    float nx = -dy / r;
    float ny = dx / r;
    float c1 = c - 1;
    m00 = 1 + c1 * nx * nx;
    m01 = m10 = c1 * nx * ny;
    m20 = -(m02 = s * nx);
    m11 = 1 + c1 * ny * ny;
    m21 = -(m12 = s * ny);
    m22 = c;
    return true;
  }

  public boolean isRotation() {
    return (Math.abs(determinant3() - 1) < 0.001f);
  }

}
