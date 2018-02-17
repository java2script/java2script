package javajs.util;

/**
 * A base class for both M3 and M4 to conserve code size.
 * 
 * @author Kenji hiranabe
 * 
 *         additions by Bob Hanson hansonr@stolaf.edu 9/30/2012 for unique
 *         constructor and method names for the optimization of compiled
 *         JavaScript using Java2Script and for subclassing to M3 and M4
 * 
 */
public abstract class M34 {

  /**
   * The first element of the first row
   */
  public float m00;

  /**
   * The second element of the first row.
   */
  public float m01;

  /**
   * third element of the first row.
   */
  public float m02;

  /**
   * The first element of the second row.
   */
  public float m10;

  /**
   * The second element of the second row.
   */
  public float m11;

  /**
   * The third element of the second row.
   */
  public float m12;

  /**
   * The first element of the third row.
   */
  public float m20;

  /**
   * The second element of the third row.
   */
  public float m21;

  /**
   * The third element of the third row.
   */
  public float m22;

  protected void setAA33(A4 a) {
    double x = a.x;
    double y = a.y;
    double z = a.z;
    double angle = a.angle;
    // Taken from Rick's which is taken from Wertz. pg. 412
    // Bug Fixed and changed into right-handed by hiranabe
    double n = Math.sqrt(x * x + y * y + z * z);
    // zero-div may occur
    n = 1 / n;
    x *= n;
    y *= n;
    z *= n;
    double c = Math.cos(angle);
    double s = Math.sin(angle);
    double omc = 1.0 - c;
    m00 = (float) (c + x * x * omc);
    m11 = (float) (c + y * y * omc);
    m22 = (float) (c + z * z * omc);

    double tmp1 = x * y * omc;
    double tmp2 = z * s;
    m01 = (float) (tmp1 - tmp2);
    m10 = (float) (tmp1 + tmp2);

    tmp1 = x * z * omc;
    tmp2 = y * s;
    m02 = (float) (tmp1 + tmp2);
    m20 = (float) (tmp1 - tmp2);

    tmp1 = y * z * omc;
    tmp2 = x * s;
    m12 = (float) (tmp1 - tmp2);
    m21 = (float) (tmp1 + tmp2);
  }

  public void rotate(T3 t) {
    // alias-safe
    rotate2(t, t);
  }

  /**
   * Transform the vector vec using this Matrix3f and place the result into
   * vecOut.
   * 
   * @param t
   *        the single precision vector to be transformed
   * @param result
   *        the vector into which the transformed values are placed
   */
  public void rotate2(T3 t, T3 result) {
    // alias-safe
    result.set(m00 * t.x + m01 * t.y + m02 * t.z, m10 * t.x + m11 * t.y + m12
        * t.z, m20 * t.x + m21 * t.y + m22 * t.z);
  }


  /**
   * Sets the value of this matrix to the double value of the Matrix3f argument.
   * 
   * @param m1
   *        the matrix3f
   */
  protected void setM33(M34 m1) {
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

  protected void clear33() {
    m00 = m01 = m02 = m10 = m11 = m12 = m20 = m21 = m22 = 0.0f;
  }

  protected void set33(int row, int col, float v) {
    switch (row) {
    case 0:
      switch (col) {
      case 0:
        m00 = v;
        return;
      case 1:
        m01 = v;
        return;
      case 2: 
        m02 = v;
        return;
      }
      break;
    case 1:
      switch (col) {
      case 0:
        m10 = v;
        return;
      case 1:
        m11 = v;
        return;
      case 2: 
        m12 = v;
        return;
      }
      break;
    case 2: 
      switch (col) {
      case 0:
        m20 = v;
        return;
      case 1:
        m21 = v;
        return;
      case 2: 
        m22 = v;
        return;
      }
      break;
    }
    err();
  }

  protected float get33(int row, int col) {
    switch (row) {
    case 0:
      switch (col) {
      case 0:
        return m00;
      case 1:
        return m01;
      case 2:
        return m02;
      }
      break;
    case 1:
      switch (col) {
      case 0:
        return m10;
      case 1:
        return m11;
      case 2:
        return m12;
      }
      break;
    case 2:
      switch (col) {
      case 0:
        return m20;
      case 1:
        return m21;
      case 2:
        return m22;
      }
      break;
    }
    err();
    return 0;
  }

  protected void setRow33(int row, float v[]) {
    switch (row) {
    case 0:
      m00 = v[0];
      m01 = v[1];
      m02 = v[2];
      return;
    case 1:
      m10 = v[0];
      m11 = v[1];
      m12 = v[2];
      return;
    case 2:
      m20 = v[0];
      m21 = v[1];
      m22 = v[2];
      return;
    default:
      err();
    }
  }
  
  public abstract void getRow(int row, float v[]);

  protected void getRow33(int row, float v[]) {
    switch (row) {
    case 0:
      v[0] = m00;
      v[1] = m01;
      v[2] = m02;
      return;
    case 1:
      v[0] = m10;
      v[1] = m11;
      v[2] = m12;
      return;
    case 2:
      v[0] = m20;
      v[1] = m21;
      v[2] = m22;
      return;
    }
    err();
  }

  protected void setColumn33(int column, float v[]) {
    switch(column) {
    case 0:
      m00 = v[0];
      m10 = v[1];
      m20 = v[2];
      break;
    case 1:
      m01 = v[0];
      m11 = v[1];
      m21 = v[2];
      break;
    case 2:
      m02 = v[0];
      m12 = v[1];
      m22 = v[2];
      break;
     default:
      err();
    }
  }

  protected void getColumn33(int column, float v[]) {
    switch(column) {
    case 0:
      v[0] = m00;
      v[1] = m10;
      v[2] = m20;
      break;
    case 1:
      v[0] = m01;
      v[1] = m11;
      v[2] = m21;
      break;
    case 2:
      v[0] = m02;
      v[1] = m12;
      v[2] = m22;
      break;
    default:
      err();
    }
  }

  protected void add33(M34 m1) {
    m00 += m1.m00;
    m01 += m1.m01;
    m02 += m1.m02;
    m10 += m1.m10;
    m11 += m1.m11;
    m12 += m1.m12;
    m20 += m1.m20;
    m21 += m1.m21;
    m22 += m1.m22;
  }

  protected void sub33(M34 m1) {
    m00 -= m1.m00;
    m01 -= m1.m01;
    m02 -= m1.m02;
    m10 -= m1.m10;
    m11 -= m1.m11;
    m12 -= m1.m12;
    m20 -= m1.m20;
    m21 -= m1.m21;
    m22 -= m1.m22;
  }

  protected void mul33(float x) {
    m00 *= x;
    m01 *= x;
    m02 *= x;
    m10 *= x;
    m11 *= x;
    m12 *= x;
    m20 *= x;
    m21 *= x;
    m22 *= x;
  }

  protected void transpose33() {
    float tmp = m01;
    m01 = m10;
    m10 = tmp;

    tmp = m02;
    m02 = m20;
    m20 = tmp;

    tmp = m12;
    m12 = m21;
    m21 = tmp;
  }

  protected void setXRot(float angle) {
    double c = Math.cos(angle);
    double s = Math.sin(angle);
    m00 = 1.0f;
    m01 = 0.0f;
    m02 = 0.0f;
    m10 = 0.0f;
    m11 = (float) c;
    m12 = (float) -s;
    m20 = 0.0f;
    m21 = (float) s;
    m22 = (float) c;
  }

  protected void setYRot(float angle) {
    double c = Math.cos(angle);
    double s = Math.sin(angle);
    m00 = (float) c;
    m01 = 0.0f;
    m02 = (float) s;
    m10 = 0.0f;
    m11 = 1.0f;
    m12 = 0.0f;
    m20 = (float) -s;
    m21 = 0.0f;
    m22 = (float) c;
  }
  
  protected void setZRot(float angle) {
    double c = Math.cos(angle);
    double s = Math.sin(angle);
    m00 = (float) c;
    m01 = (float) -s;
    m02 = 0.0f;
    m10 = (float) s;
    m11 = (float) c;
    m12 = 0.0f;
    m20 = 0.0f;
    m21 = 0.0f;
    m22 = 1.0f;
  }
  
  /**
   * @return 3x3 determinant
   */
  public float determinant3() {
    return m00 * (m11 * m22 - m21 * m12) - m01 * (m10 * m22 - m20 * m12) + m02
        * (m10 * m21 - m20 * m11);
  }
  
  protected void err() {
    throw new ArrayIndexOutOfBoundsException(
        "matrix column/row out of bounds");
  }


}
