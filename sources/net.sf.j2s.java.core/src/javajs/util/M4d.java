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
 * A single precision doubleing point 4 by 4 matrix.
 * 
 * @author Kenji hiranabe
 * 
 *         additions by Bob Hanson hansonr@stolaf.edu 9/30/2012 for unique
 *         constructor and method names for the optimization of compiled
 *         JavaScript using Java2Script
 */
public class M4d extends M34d {

  /**
   * The fourth element of the first row.
   */
  public double m03;

  /**
   * The fourth element of the second row.
   */
  public double m13;

  /**
   * The fourth element of the third row.
   */
  public double m23;

  /**
   * The first element of the fourth row.
   */
  public double m30;

  /**
   * The second element of the fourth row.
   */
  public double m31;

  /**
   * The third element of the fourth row.
   */
  public double m32;

  /**
   * The fourth element of the fourth row.
   */
  public double m33 = 0;

  /**
   * all zeros
   * @j2sIgnore
   */
  public M4d() {
    super.size = 4;
  }
  /**
   * Constructs and initializes a Matrix4f from the specified 16 element array.
   * this.m00 =v[0], this.m01=v[1], etc.
   * 
   * @param v
   *        the array of length 16 containing in order
   * @return m
   */
  public static M4d newA16(double[] v) {
    M4d m = new M4d();
    m.m00 = v[0];
    m.m01 = v[1];
    m.m02 = v[2];
    m.m03 = v[3];

    m.m10 = v[4];
    m.m11 = v[5];
    m.m12 = v[6];
    m.m13 = v[7];

    m.m20 = v[8];
    m.m21 = v[9];
    m.m22 = v[10];
    m.m23 = v[11];

    m.m30 = v[12];
    m.m31 = v[13];
    m.m32 = v[14];
    m.m33 = v[15];

    return m;
  }

  public static M4d newA16(float[] v) {
    M4d m = new M4d();
    m.m00 = v[0];
    m.m01 = v[1];
    m.m02 = v[2];
    m.m03 = v[3];

    m.m10 = v[4];
    m.m11 = v[5];
    m.m12 = v[6];
    m.m13 = v[7];

    m.m20 = v[8];
    m.m21 = v[9];
    m.m22 = v[10];
    m.m23 = v[11];

    m.m30 = v[12];
    m.m31 = v[13];
    m.m32 = v[14];
    m.m33 = v[15];

    return m;
  }

  /**
   * Constructs a new matrix with the same values as the Matrix4f parameter.
   * 
   * @param m1
   *        the source matrix
   * @return m
   */
  public static M4d newM4(M4d m1) {
    M4d m = new M4d();
    if (m1 == null) {
      m.setIdentity();
      return m;
    }
    m.setToM3(m1);
    m.m03 = m1.m03;
    m.m13 = m1.m13;
    m.m23 = m1.m23;
    m.m30 = m1.m30;
    m.m31 = m1.m31;
    m.m32 = m1.m32;
    m.m33 = m1.m33;
    return m;
  }

  /**
   * Constructs and initializes a Matrix4f from the rotation matrix and
   * translation.
   * 
   * @param m1
   *        The rotation matrix representing the rotational components
   * @param t
   *        The translational components of the matrix
   * @return m
   */
  public static M4d newMV(M3d m1, T3d t) {
    M4d m = new M4d();
    m.setMV(m1, t);
    return m;
  }

  public static M4d newMV(M3 m1, T3 t) {
    M4d m = new M4d();
    m.setMV(M3d.newM3(m1), V3d.newV(t));
    return m;
  }
  
  public static M4d newMV(M3d m1, T3 t) {
    M4d m = new M4d();
    m.setMV(M3d.newM3(m1), V3d.newV(t));
    return m;
  }



  /**
   * Sets this matrix to all zeros.
   */
  public void setZero() {
    clear33();
    m03 = m13 = m23 = m30 = m31 = m32 = m33 = 0.0f;
  }

  /**
   * Sets this Matrix4f to identity.
   */
  public void setIdentity() {
    setZero();
    m00 = m11 = m22 = m33 = 1.0f;
  }

  /**
   * Sets the value of this matrix to a copy of the passed matrix m1.
   * 
   * @param m1
   *        the matrix to be copied
   * @return this
   */
  public M4d setM4(M4d m1) {
    setM33(m1);
    m03 = m1.m03;
    m13 = m1.m13;
    m23 = m1.m23;
    m30 = m1.m30;
    m31 = m1.m31;
    m32 = m1.m32;
    m33 = m1.m33;
    return this;
  }

  /**
   * Initializes a Matrix4f from the rotation matrix and translation.
   * 
   * @param m1
   *        The rotation matrix representing the rotational components
   * @param t
   *        The translational components of the matrix
   */
  public void setMV(M3d m1, T3d t) {
    setM33(m1);
    setTranslation(t);
    m33 = 1;
  }

  /**
   * Sets the rotational component (upper 3x3) of this matrix to the matrix
   * values in the single precision Matrix3f argument; the other elements of
   * this matrix are initialized as if this were an identity matrix (ie, affine
   * matrix with no translational component).
   * 
   * @param m1
   *        the 3x3 matrix
   */
  public void setToM3(M34d m1) {
    setM33(m1);
    m03 = m13 = m23 = m30 = m31 = m32 = 0.0f;
    m33 = 1.0f;
  }

  /**
   * Sets the rotational component (upper 3x3) of this matrix 
   * to a rotation given by an axis angle
   * 
   * @param a
   *        the axis and angle to be converted
   */
  public void setToAA(A4d a) {
    setIdentity();
    setAA33(a);
  }

  public void setToAA(A4 a) {
    setIdentity();
    setAA33(a);
  }

  /**
   * Sets the values in this Matrix4f equal to the row-major array parameter
   * (ie, the first four elements of the array will be copied into the first row
   * of this matrix, etc.).
   * 
   * @param a
   */
  public void setA(double a[]) {
    m00 = a[0];
    m01 = a[1];
    m02 = a[2];
    m03 = a[3];
    m10 = a[4];
    m11 = a[5];
    m12 = a[6];
    m13 = a[7];
    m20 = a[8];
    m21 = a[9];
    m22 = a[10];
    m23 = a[11];
    m30 = a[12];
    m31 = a[13];
    m32 = a[14];
    m33 = a[15];
  }

  public void setAF(float[] a) {
    m00 = a[0];
    m01 = a[1];
    m02 = a[2];
    m03 = a[3];
    m10 = a[4];
    m11 = a[5];
    m12 = a[6];
    m13 = a[7];
    m20 = a[8];
    m21 = a[9];
    m22 = a[10];
    m23 = a[11];
    m30 = a[12];
    m31 = a[13];
    m32 = a[14];
    m33 = a[15];
  }
  /**
   * Modifies the translational components of this matrix to the values of the
   * Vector3f argument; the other values of this matrix are not modified.
   * 
   * @param trans
   *        the translational component
   */
  public void setTranslation(T3d trans) {
    m03 = trans.x;
    m13 = trans.y;
    m23 = trans.z;
  }

  public void setTranslation(T3 trans) {
    m03 = trans.x;
    m13 = trans.y;
    m23 = trans.z;
  }


  /**
   * Sets the specified element of this matrix4f to the value provided.
   * 
   * @param row
   *        the row number to be modified (zero indexed)
   * @param col
   *        the column number to be modified (zero indexed)
   * @param v
   *        the new value
   */
  @Override
public void setElement(int row, int col, double v) {
    if (row < 3 && col < 3) {
      set33(row, col, v);
      return;
    }
    if (row > 3 || col > 3)
      err();
    switch (row) {
    case 0:
      m03 = v;
      return;
    case 1:
      m13 = v;
      return;
    case 2:
      m23 = v;
      return;
    }
    switch (col) {
    case 0:
      m30 = v;
      return;
    case 1:
      m31 = v;
      return;
    case 2:
      m32 = v;
      return;
    case 3:
      m33 = v;
      return;
    }
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
  @Override
public double getElement(int row, int col) {
    if (row < 3 && col < 3)
      return get33(row, col);
    if (row > 3 || col > 3) {
      err();
      return 0;
    }
    switch (row) {
    case 0:
      return m03;
    case 1:
      return m13;
    case 2:
      return m23;
    default:
      switch (col) {
      case 0:
        return m30;
      case 1:
        return m31;
      case 2:
        return m32;
      default:
        return m33;
      }
    }
  }

  /**
   * Retrieves the translational components of this matrix.
   * 
   * @param trans
   *        the vector that will receive the translational component
   */
  public void getTranslation(T3d trans) {
    trans.x = m03;
    trans.y = m13;
    trans.z = m23;
  }

  /**
   * Gets the upper 3x3 values of this matrix and places them into the matrix
   * m1.
   * 
   * @param m1
   *        The matrix that will hold the values
   */
  public void getRotationScale(M3d m1) {
    m1.m00 = m00;
    m1.m01 = m01;
    m1.m02 = m02;
    m1.m10 = m10;
    m1.m11 = m11;
    m1.m12 = m12;
    m1.m20 = m20;
    m1.m21 = m21;
    m1.m22 = m22;
  }

  /**
   * Replaces the upper 3x3 matrix values of this matrix with the values in the
   * matrix m1.
   * 
   * @param m1
   *        The matrix that will be the new upper 3x3
   */
  public void setRotationScale(M3d m1) {
    m00 = m1.m00;
    m01 = m1.m01;
    m02 = m1.m02;
    m10 = m1.m10;
    m11 = m1.m11;
    m12 = m1.m12;
    m20 = m1.m20;
    m21 = m1.m21;
    m22 = m1.m22;
  }

  /**
   * Sets the specified row of this matrix4f to the four values provided.
   * 
   * @param row
   *        the row number to be modified (zero indexed)
   * @param v
   *        the replacement row
   */
  public void setRowA(int row, double v[]) {
    if (row < 3)
      setRow33(row, v);
    switch (row) {
    case 0:
      m03 = v[3];
      return;
    case 1:
      m13 = v[3];
      return;
    case 2:
      m23 = v[3];
      return;
    case 3:
      m30 = v[0];
      m31 = v[1];
      m32 = v[2];
      m33 = v[3];
      return;
    }
    err();
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
  public void getRow(int row, double v[]) {
    if (row < 3)
      getRow33(row, v);
    switch (row) {
    case 0:
      v[3] = m03;
      return;
    case 1:
      v[3] = m13;
      return;
    case 2:
      v[3] = m23;
      return;
    case 3:
      v[0] = m30;
      v[1] = m31;
      v[2] = m32;
      v[3] = m33;
      return;
    }
    err();
  }

  /**
   * Sets the specified column of this matrix4f to the four values provided.
   * 
   * @param column
   *        the column number to be modified (zero indexed)
   * @param x
   *        the first row element
   * @param y
   *        the second row element
   * @param z
   *        the third row element
   * @param w
   *        the fourth row element
   */
  public void setColumn4(int column, double x, double y, double z, double w) {
    if (column == 0) {
      m00 = x;
      m10 = y;
      m20 = z;
      m30 = w;
    } else if (column == 1) {
      m01 = x;
      m11 = y;
      m21 = z;
      m31 = w;
    } else if (column == 2) {
      m02 = x;
      m12 = y;
      m22 = z;
      m32 = w;
    } else if (column == 3) {
      m03 = x;
      m13 = y;
      m23 = z;
      m33 = w;
    } else {
      err();
    }
  }

  /**
   * Sets the specified column of this matrix4f to the four values provided.
   * 
   * @param column
   *        the column number to be modified (zero indexed)
   * @param v
   *        the replacement column
   */
  public void setColumnA(int column, double v[]) {
    if (column < 3)
      setColumn33(column, v);
    switch (column) {
    case 0:
      m30 = v[3];
      return;
    case 1:
      m31 = v[3];
      return;
    case 2:
      m32 = v[3];
      return;
    case 3:
      m03 = v[0];
      m13 = v[1];
      m23 = v[2];
      m33 = v[3];
      return;
    default:
      err();
    }
  }

  /**
   * Copies the matrix values in the specified column into the array parameter.
   * 
   * @param column
   *        the matrix column
   * @param v
   *        The array into which the matrix column values will be copied
   */
  public void getColumn(int column, double v[]) {
    if (column < 3)
      getColumn33(column, v);
    switch (column) {
    case 0:
      v[3] = m30;
      return;
    case 1:
      v[3] = m31;
      return;
    case 2:
      v[3] = m32;
      return;
    case 3:
      v[0] = m03;
      v[1] = m13;
      v[2] = m23;
      v[3] = m33;
      return;
    default:
      err();
    }
  }

  /**
   * Sets the value of this matrix to the matrix difference of itself and matrix
   * m1 (this = this - m1).
   * 
   * @param m1
   *        the other matrix
   */
  public void sub(M4d m1) {
    sub33(m1);
    m03 -= m1.m03;
    m13 -= m1.m13;
    m23 -= m1.m23;
    m30 -= m1.m30;
    m31 -= m1.m31;
    m32 -= m1.m32;
    m33 -= m1.m33;
  }
  
  /**
   * add to translation
   * 
   * @param pt
   */
  public void add(T3d pt) {
    m03 += pt.x;
    m13 += pt.y;
    m23 += pt.z;
  }

  public void add(T3 pt) {
    m03 += pt.x;
    m13 += pt.y;
    m23 += pt.z;
  }

  /**
   * Sets the value of this matrix to its transpose.
   */
  public void transpose() {
    transpose33();
    double tmp = m03;
    m03 = m30;
    m30 = tmp;

    tmp = m13;
    m13 = m31;
    m31 = tmp;

    tmp = m23;
    m23 = m32;
    m32 = tmp;
  }

  /**
   * Sets the value of this matrix to its inverse.
   * @return this
   */
  public M4d invert() {
    double s = determinant4();
    if (s == 0.0)
      return this;
    s = 1 / s;
    // alias-safe way.
    // less *,+,- calculation than expanded expression.
    set(m11 * (m22 * m33 - m23 * m32) + m12 * (m23 * m31 - m21 * m33) + m13
        * (m21 * m32 - m22 * m31), m21 * (m02 * m33 - m03 * m32) + m22
        * (m03 * m31 - m01 * m33) + m23 * (m01 * m32 - m02 * m31), m31
        * (m02 * m13 - m03 * m12) + m32 * (m03 * m11 - m01 * m13) + m33
        * (m01 * m12 - m02 * m11), m01 * (m13 * m22 - m12 * m23) + m02
        * (m11 * m23 - m13 * m21) + m03 * (m12 * m21 - m11 * m22),

    m12 * (m20 * m33 - m23 * m30) + m13 * (m22 * m30 - m20 * m32) + m10
        * (m23 * m32 - m22 * m33), m22 * (m00 * m33 - m03 * m30) + m23
        * (m02 * m30 - m00 * m32) + m20 * (m03 * m32 - m02 * m33), m32
        * (m00 * m13 - m03 * m10) + m33 * (m02 * m10 - m00 * m12) + m30
        * (m03 * m12 - m02 * m13), m02 * (m13 * m20 - m10 * m23) + m03
        * (m10 * m22 - m12 * m20) + m00 * (m12 * m23 - m13 * m22),

    m13 * (m20 * m31 - m21 * m30) + m10 * (m21 * m33 - m23 * m31) + m11
        * (m23 * m30 - m20 * m33), m23 * (m00 * m31 - m01 * m30) + m20
        * (m01 * m33 - m03 * m31) + m21 * (m03 * m30 - m00 * m33), m33
        * (m00 * m11 - m01 * m10) + m30 * (m01 * m13 - m03 * m11) + m31
        * (m03 * m10 - m00 * m13), m03 * (m11 * m20 - m10 * m21) + m00
        * (m13 * m21 - m11 * m23) + m01 * (m10 * m23 - m13 * m20),

    m10 * (m22 * m31 - m21 * m32) + m11 * (m20 * m32 - m22 * m30) + m12
        * (m21 * m30 - m20 * m31), m20 * (m02 * m31 - m01 * m32) + m21
        * (m00 * m32 - m02 * m30) + m22 * (m01 * m30 - m00 * m31), m30
        * (m02 * m11 - m01 * m12) + m31 * (m00 * m12 - m02 * m10) + m32
        * (m01 * m10 - m00 * m11), m00 * (m11 * m22 - m12 * m21) + m01
        * (m12 * m20 - m10 * m22) + m02 * (m10 * m21 - m11 * m20));
    scale(s);
    return this;
  }

  /**
   * Sets 16 values
   * 
   * @param m00
   * @param m01
   * @param m02
   * @param m03
   * @param m10
   * @param m11
   * @param m12
   * @param m13
   * @param m20
   * @param m21
   * @param m22
   * @param m23
   * @param m30
   * @param m31
   * @param m32
   * @param m33
   */
  private void set(double m00, double m01, double m02, double m03, double m10,
                   double m11, double m12, double m13, double m20, double m21,
                   double m22, double m23, double m30, double m31, double m32,
                   double m33) {
    this.m00 = m00;
    this.m01 = m01;
    this.m02 = m02;
    this.m03 = m03;
    this.m10 = m10;
    this.m11 = m11;
    this.m12 = m12;
    this.m13 = m13;
    this.m20 = m20;
    this.m21 = m21;
    this.m22 = m22;
    this.m23 = m23;
    this.m30 = m30;
    this.m31 = m31;
    this.m32 = m32;
    this.m33 = m33;
  }
  /**
   * Computes the determinant of this matrix.
   * 
   * @return the determinant of the matrix
   */
  public double determinant4() {
    // less *,+,- calculation than expanded expression.
    return (m00 * m11 - m01 * m10) * (m22 * m33 - m23 * m32)
        - (m00 * m12 - m02 * m10) * (m21 * m33 - m23 * m31)
        + (m00 * m13 - m03 * m10) * (m21 * m32 - m22 * m31)
        + (m01 * m12 - m02 * m11) * (m20 * m33 - m23 * m30)
        - (m01 * m13 - m03 * m11) * (m20 * m32 - m22 * m30)
        + (m02 * m13 - m03 * m12) * (m20 * m31 - m21 * m30);

  }

  /**
   * Multiplies each element of this matrix by a scalar.
   * 
   * @param scalar
   *        The scalar multiplier.
   */
  public void scale(double scalar) {
    mul33(scalar);
    m03 *= scalar;
    m13 *= scalar;
    m23 *= scalar;
    m30 *= scalar;
    m31 *= scalar;
    m32 *= scalar;
    m33 *= scalar;
  }

  /**
   * Sets the value of this matrix to the result of multiplying itself with
   * matrix m1.
   * 
   * @param m1
   *        the other matrix
   */
  public void mul(M4d m1) {
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
  public void mul2(M4d m1, M4d m2) {
    // alias-safe way.
    set(m1.m00 * m2.m00 + m1.m01 * m2.m10 + m1.m02 * m2.m20 + m1.m03 * m2.m30,
        m1.m00 * m2.m01 + m1.m01 * m2.m11 + m1.m02 * m2.m21 + m1.m03 * m2.m31,
        m1.m00 * m2.m02 + m1.m01 * m2.m12 + m1.m02 * m2.m22 + m1.m03 * m2.m32,
        m1.m00 * m2.m03 + m1.m01 * m2.m13 + m1.m02 * m2.m23 + m1.m03 * m2.m33,

        m1.m10 * m2.m00 + m1.m11 * m2.m10 + m1.m12 * m2.m20 + m1.m13 * m2.m30,
        m1.m10 * m2.m01 + m1.m11 * m2.m11 + m1.m12 * m2.m21 + m1.m13 * m2.m31,
        m1.m10 * m2.m02 + m1.m11 * m2.m12 + m1.m12 * m2.m22 + m1.m13 * m2.m32,
        m1.m10 * m2.m03 + m1.m11 * m2.m13 + m1.m12 * m2.m23 + m1.m13 * m2.m33,

        m1.m20 * m2.m00 + m1.m21 * m2.m10 + m1.m22 * m2.m20 + m1.m23 * m2.m30,
        m1.m20 * m2.m01 + m1.m21 * m2.m11 + m1.m22 * m2.m21 + m1.m23 * m2.m31,
        m1.m20 * m2.m02 + m1.m21 * m2.m12 + m1.m22 * m2.m22 + m1.m23 * m2.m32,
        m1.m20 * m2.m03 + m1.m21 * m2.m13 + m1.m22 * m2.m23 + m1.m23 * m2.m33,

        m1.m30 * m2.m00 + m1.m31 * m2.m10 + m1.m32 * m2.m20 + m1.m33 * m2.m30,
        m1.m30 * m2.m01 + m1.m31 * m2.m11 + m1.m32 * m2.m21 + m1.m33 * m2.m31,
        m1.m30 * m2.m02 + m1.m31 * m2.m12 + m1.m32 * m2.m22 + m1.m33 * m2.m32,
        m1.m30 * m2.m03 + m1.m31 * m2.m13 + m1.m32 * m2.m23 + m1.m33 * m2.m33);
  }

  /**
   * Transform the vector vec using this Matrix4f and place the result back into
   * vec.
   * 
   * @param vec
   *        the single precision vector to be transformed
   */
  public void transform(T4d vec) {
    transform2(vec, vec);
  }

  public void transform(T4 vec) {
    transform2(vec, vec);
  }

  /**
   * Transform the vector vec using this Matrix4f and place the result into
   * vecOut.
   * 
   * @param vec
   *        the single precision vector to be transformed
   * @param vecOut
   *        the vector into which the transformed values are placed
   */
  public void transform2(T4d vec, T4d vecOut) {
    // alias-safe
    vecOut.set4(m00 * vec.x + m01 * vec.y + m02 * vec.z + m03 * vec.w, m10
        * vec.x + m11 * vec.y + m12 * vec.z + m13 * vec.w, m20 * vec.x + m21
        * vec.y + m22 * vec.z + m23 * vec.w, m30 * vec.x + m31 * vec.y + m32
        * vec.z + m33 * vec.w);
  }

  public void transform2(T4 vec, T4 vecOut) {
    // alias-safe
    vecOut.set4((float) (m00 * vec.x + m01 * vec.y + m02 * vec.z + m03 * vec.w),
        (float) (m10 * vec.x + m11 * vec.y + m12 * vec.z + m13 * vec.w),
        (float) (m20 * vec.x + m21 * vec.y + m22 * vec.z + m23 * vec.w),
        (float) (m30 * vec.x + m31 * vec.y + m32 * vec.z + m33 * vec.w));
  }

  /**
   * Transforms the point parameter with this Matrix4f and places the result
   * back into point. The fourth element of the point input parameter is assumed
   * to be one.
   * 
   * @param point
   *        the input point to be transformed.
   */
  public void rotTrans(T3d point) {
    rotTrans2(point, point);
  }

  public void rotTrans(T3 point) {
    rotTrans2(point, point);
  }

  public T3 rotTrans2(T3 point, T3 ret) {
    ret.set((float) (m00 * point.x + m01 * point.y + m02 * point.z + m03),
        (float) (m10 * point.x + m11 * point.y + m12 * point.z + m13),
        (float) (m20 * point.x + m21 * point.y + m22 * point.z + m23));
    return ret;
  }
  /**
   * Transforms the point parameter with this Matrix4f and places the result
   * into pointOut. The fourth element of the point input parameter is assumed to
   * be one. point may be pointOut
   * 
   * @param point
   *        the input point to be transformed.
   * @param pointOut
   *        the transformed point
   * @return pointOut
   */
  public T3d rotTrans2(T3d point, T3d pointOut) {
      pointOut.set(
          m00 * point.x + m01 * point.y + m02 * point.z + m03, 
          m10 * point.x + m11 * point.y + m12 * point.z + m13, 
          m20 * point.x + m21 * point.y + m22 * point.z + m23);
      return pointOut;
  }

  /**
   * Sets the value of this matrix to a rotation matrix about the w axis by the
   * passed angle.
   * 
   * @param angle
   *        the angle to rotate about the W axis in radians
   * @return this
   */
  public M4d setAsXYRotation(double angle) {
    setIdentity();
    double c = Math.cos(angle);
    double s = Math.sin(angle);
    m22 = c;
    m23 = -s;
    m32 = s;
    m33 = c;
    return this;
  }

  /**
   * Sets the value of this matrix to a rotation matrix about the w axis by the
   * passed angle.
   * 
   * @param angle
   *        the angle to rotate about the W axis in radians
   * @return this
   */
  public M4d setAsYZRotation(double angle) {
    setIdentity();
    double c = Math.cos(angle);
    double s = Math.sin(angle);
    m00 = c;
    m03 = -s;
    m30 = s;
    m33 = c;
    return this;
  }

  /**
   * Sets the value of this matrix to a rotation matrix about the w axis by the
   * passed angle.
   * 
   * @param angle
   *        the angle to rotate about the W axis in radians
   * @return this
   */
  public M4d setAsXZRotation(double angle) {
    setIdentity();
    double c = Math.cos(angle);
    double s = Math.sin(angle);
    m11 = c;
    m13 = -s;
    m31 = s;
    m33 = c;
    return this;
  }

  /**
   * Returns true if the Object o is of type Matrix4f and all of the data
   * members of t1 are equal to the corresponding data members in this Matrix4f.
   * 
   * @param o
   *        the object with which the comparison is made.
   */
  @Override
  public boolean equals(Object o) {
    if (!(o instanceof M4d))
      return false;
    M4d m = (M4d) o;
    return (this.m00 == m.m00 && this.m01 == m.m01 && this.m02 == m.m02
        && this.m03 == m.m03 && this.m10 == m.m10 && this.m11 == m.m11
        && this.m12 == m.m12 && this.m13 == m.m13 && this.m20 == m.m20
        && this.m21 == m.m21 && this.m22 == m.m22 && this.m23 == m.m23
        && this.m30 == m.m30 && this.m31 == m.m31 && this.m32 == m.m32 && this.m33 == m.m33);
  }

  /**
   * Returns a hash number based on the data values in this object. Two
   * different Matrix4f objects with identical data values (ie, returns true for
   * equals(Matrix4f) ) will return the same hash number. Two objects with
   * different data members may return the same hash value, although this is not
   * likely.
   * 
   * @return the integer hash value
   */
  @Override
  public int hashCode() {
    return T3d.doubleToIntBits(m00) ^ T3d.doubleToIntBits(m01)
        ^ T3d.doubleToIntBits(m02) ^ T3d.doubleToIntBits(m03)
        ^ T3d.doubleToIntBits(m10) ^ T3d.doubleToIntBits(m11)
        ^ T3d.doubleToIntBits(m12) ^ T3d.doubleToIntBits(m13)
        ^ T3d.doubleToIntBits(m20) ^ T3d.doubleToIntBits(m21)
        ^ T3d.doubleToIntBits(m22) ^ T3d.doubleToIntBits(m23)
        ^ T3d.doubleToIntBits(m30) ^ T3d.doubleToIntBits(m31)
        ^ T3d.doubleToIntBits(m32) ^ T3d.doubleToIntBits(m33);
  }

  /**
   * Returns a string that contains the values of this Matrix4f.
   * 
   * @return the String representation
   */
  @Override
  public String toString() {
    return "[[" + m00 + "\t" + m01 + "\t" + m02 + "\t" + m03 + "]"
        + "\n  [" + m10 + "\t" + m11 + "\t" + m12 + "\t" + m13 + "]" + "\n  ["
        + m20 + "\t" + m21 + "\t" + m22 + "\t" + m23 + "]" + "\n  [" + m30
        + "\t" + m31 + "\t" + m32 + "\t" + m33 + "]]";
  }
  public M4d round(double f) {
    m00 = rnd(m00, f);
    m01 = rnd(m01, f);
    m02 = rnd(m02, f);
    m03 = rnd(m03, f);
    m10 = rnd(m10, f);
    m11 = rnd(m11, f);
    m12 = rnd(m12, f);
    m13 = rnd(m13, f);
    m20 = rnd(m20, f);
    m21 = rnd(m21, f);
    m22 = rnd(m22, f);
    m23 = rnd(m23, f);
    m30 = rnd(m30, f);
    m31 = rnd(m31, f);
    m32 = rnd(m32, f);
    m33 = rnd(m33, f);
    return this;
  }

  private double rnd(double n, double f) {
    return (Math.abs(n) < f ? 0 : n);
  }
  public void getTranslation(V3 trans) {
      trans.x = (float) m03;
      trans.y = (float) m13;
      trans.z = (float) m23;
  }
}
