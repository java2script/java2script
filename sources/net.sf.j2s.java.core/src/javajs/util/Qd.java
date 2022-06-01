/* $RCSfile$
 * $Author: hansonr $
 * $Date: 2007-04-05 09:07:28 -0500 (Thu, 05 Apr 2007) $
 * $Revision: 7326 $
 *
 * Some portions of this file have been modified by Robert Hanson hansonr.at.stolaf.edu 2012-2017
 * for use in SwingJS via transpilation into JavaScript using Java2Script.
 *
 * Copyright (C) 2003-2005  The Jmol Development Team
 *
 * Contact: jmol-developers@lists.sf.net
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2.1 of the License, or (at your option) any later version.
 *
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */
package javajs.util;

/*
 * Standard UNIT quaternion math -- for rotation.
 * 
 * All rotations can be represented as two identical quaternions. 
 * This is because any rotation can be considered from either end of the
 * rotational axis -- either as a + rotation or a - rotation. This code
 * is designed to always maintain the quaternion with a rotation in the
 * [0, PI) range. 
 * 
 * This ensures that the reported theta is always positive, and the normal
 * reported is always associated with a positive theta.  
 * 
 * @author Bob Hanson, hansonr@stolaf.edu 6/2008
 * 
 */

public class Qd {
  public double q0, q1, q2, q3;
  private M3d mat;

  private final static P4d qZero = new P4d();
  private static final double RAD_PER_DEG = Math.PI / 180;
  
  public Qd() {
    q0 = 1;
  }

  public static Qd newQ(Qd q) {
    Qd q1 = new Qd();
    q1.set(q);
    return q1;
  }

  public static Qd newVA(T3d v, double theta) {
    Qd q = new Qd();
    q.setTA(v, theta);
    return q;
  }

  public static Qd newM(M3d mat) {
    Qd q = new Qd();
    q.setM(M3d.newM3(mat));
    return q;
  }

  public static Qd newAA(A4d a) {
    Qd q = new Qd();
    q.setAA(a);
    return q;
  }

  public static Qd newP4(P4d pt) {
    Qd q = new Qd();
    q.setP4(pt);
    return q;
  }

  public static Qd newP4(P4 pt) {
    Qd q = new Qd();
    q.setP4(P4d.new4(pt.x, pt.y, pt.z, pt.w));
    return q;
  }


  /**
   * Note that q0 is the last parameter here
   * 
   * @param q1
   * @param q2
   * @param q3
   * @param q0
   * @return {q1 q2 q3 q0}
   */
  public static Qd new4(double q1, double q2, double q3, double q0) {
    Qd q = new Qd();
    if (q0 < -1) {
      q.q0 = -1;
      return q;
    }
    if (q0 > 1) {
      q.q0 = 1;
      return q;
    }
    q.q0 = q0;
    q.q1 = q1;
    q.q2 = q2;
    q.q3 = q3;
    return q;
  }

  public void set(Qd q) {
    q0 = q.q0;
    q1 = q.q1;
    q2 = q.q2;
    q3 = q.q3;
  }

  /**
   * {x y z w} --> {q1 q2 q3 q0} and factored
   * 
   * @param pt
   */
  private void setP4(P4d pt) {
    double factor = (pt == null ? 0 : pt.distance4(qZero));
    if (factor == 0) {
      q0 = 1;
      return;
    }
    q0 = pt.w / factor;
    q1 = pt.x / factor;
    q2 = pt.y / factor;
    q3 = pt.z / factor;
  }

  /**
   * q = (cos(theta/2), sin(theta/2) * n)
   * 
   * @param pt
   * @param theta
   */
  public void setTA(T3d pt, double theta) {
    if (pt.x == 0 && pt.y == 0 && pt.z == 0) {
      q0 = 1;
      return;
    }
    double fact = (Math.sin(theta / 2 * RAD_PER_DEG) / Math.sqrt(pt.x
        * pt.x + pt.y * pt.y + pt.z * pt.z));
    q0 = (Math.cos(theta / 2 * RAD_PER_DEG));
    q1 = (pt.x * fact);
    q2 = (pt.y * fact);
    q3 = (pt.z * fact);
  }

  public void setAA(A4d a) {
    A4d aa = A4d.newAA(a);
    if (aa.angle == 0)
      aa.y = 1;
    setM(new M3d().setAA(aa));
  }

  private void setM(M3d mat) {

    /*
     * Changed 7/16/2008 to double precision for 11.5.48.
     * 
     * <quote>
     *  
     * RayTrace Software Package, release 3.0.  May 3, 2006.
     *
     * Mathematics Subpackage (VrMath)
     *
     * Author: Samuel R. Buss
     *
     * Software is "as-is" and carries no warranty.  It may be used without
     *   restriction, but if you modify it, please change the filenames to
     *   prevent confusion between different versions.  Please acknowledge
     *   all use of the software in any publications or products based on it.
     *
     * Bug reports: Sam Buss, sbuss@ucsd.edu.
     * Web page: http://math.ucsd.edu/~sbuss/MathCG
     
     // Use Shepperd's algorithm, which is stable, does not lose
     //    significant precision and uses only one sqrt.
     //   J. Guidance and Control, 1 (1978) 223-224.

     * </quote>
     * 
     * Except, that code has errors.
     * 
     * CORRECTIONS (as noted below) of Quaternion.cpp. I have reported the bug.
     *  
     * -- Bob Hanson
     * 
     *  theory:    
     *         cos(theta/2)^2 = (cos(theta) + 1)/2
     *  and      
     *         trace = (1-x^2)ct + (1-y^2)ct + (1-z^2)ct + 1 = 2cos(theta) + 1
     *  or
     *         cos(theta) = (trace - 1)/2 
     *         
     *  so in general,       
     *       
     *       w = cos(theta/2) 
     *         = sqrt((cos(theta)+1)/2) 
     *         = sqrt((trace-1)/4+1/2)
     *         = sqrt((trace+1)/4)
     *         = sqrt(trace+1)/2
     *     
     *  but there are precision issues, so we allow for other situations.
     *  note -- trace >= 0.5 when cos(theta) >= -0.25 (-104.48 <= theta <= 104.48).
     *  this code cleverly matches the precision in all four options.
     *
     */

    this.mat = mat;
    
    double trace = mat.m00 + mat.m11 + mat.m22;
    double temp;
    double w, x, y, z;
    if (trace >= 0.5) {
      w = Math.sqrt(1.0 + trace);
      x = (mat.m21 - mat.m12) / w;
      y = (mat.m02 - mat.m20) / w;
      z = (mat.m10 - mat.m01) / w;
    } else if ((temp = mat.m00 + mat.m00 - trace) >= 0.5) {
      x = Math.sqrt(1.0 + temp);
      w = (mat.m21 - mat.m12) / x;
      y = (mat.m10 + mat.m01) / x;
      z = (mat.m20 + mat.m02) / x;
    } else if ((temp = mat.m11 + mat.m11 - trace) >= 0.5 
        || mat.m11 > mat.m22) {
      y = Math.sqrt(1.0 + temp);
      w = (mat.m02 - mat.m20) / y;
      x = (mat.m10 + mat.m01) / y;
      z = (mat.m21 + mat.m12) / y;
    } else {
      z = Math.sqrt(1.0 + mat.m22 + mat.m22 - trace);
      w = (mat.m10 - mat.m01) / z;
      x = (mat.m20 + mat.m02) / z; // was -
      y = (mat.m21 + mat.m12) / z; // was -
    }

    q0 = (w * 0.5);
    q1 = (x * 0.5);
    q2 = (y * 0.5);
    q3 = (z * 0.5);

    /*
     *  Originally from http://www.gamedev.net/community/forums/topic.asp?topic_id=448380
     *  later algorithm was adapted from Visualizing Quaternions, by Andrew J. Hanson
     *   (Morgan Kaufmann, 2006), page 446
     *  
     *  HOWEVER, checking with AxisAngle4f and Quat4f equivalents, it was found that
     *  BOTH of these sources produce inverted quaternions. So here we do an inversion.
     *  
     *  This correction was made in 11.5.42  6/19/2008  -- Bob Hanson
     *
     *  former algorithm used:     
     * /
     
     double tr = mat.m00 + mat.m11 + mat.m22; //Matrix trace 
     double s;
     double[] q = new double[4];
     if (tr > 0) {
     s = Math.sqrt(tr + 1);
     q0 = (0.5 * s);
     s = 0.5 / s; // = 1/q0
     q1 = ((mat.m21 - mat.m12) * s);
     q2 = ((mat.m02 - mat.m20) * s);
     q3 = ((mat.m10 - mat.m01) * s);
     } else {
     double[][] m = new double[][] { new double[3], new double[3], new double[3] };
     mat.getRow(0, m[0]);
     mat.getRow(1, m[1]);
     mat.getRow(2, m[2]);

     //Find out the biggest element along the diagonal 
     double max = Math.max(mat.m11, mat.m00);
     int i = (mat.m22 > max ? 2 : max == mat.m11 ? 1 : 0);
     int j = (i + 1) % 3;
     int k = (j + 1) % 3;
     s = -Math.sqrt(1 + m[i][i] - m[j][j] - m[k][k]);
     // 0 = 1 + (1-x^2)ct + x^2 -(1-y^2)ct - y^2 - (1-z^2)ct - z^2
     // 0 = 1 - ct + (x^2 - y^2 - z^2) - (x^2 - y^2 - z^2)ct
     // 0 = 1 - ct + 2x^2 - 1 - (2x^2)ct + ct
     // 0 = 2x^2(1 - ct)
     // theta = 0 (but then trace = 1 + 1 + 1 = 3)
     // or x = 0. 
     q[i] = s * 0.5;
     if (s != 0)
     s = 0.5 / s; // = 1/q[i]
     q[j] = (m[i][j] + m[j][i]) * s;
     q[k] = (m[i][k] + m[k][i]) * s;
     q0 = ((m[k][j] - m[j][k]) * s);
     q1 = q[0]; // x
     q2 = q[1]; // y
     q3 = q[2]; // z 
     }

     */
  }

  /*
   * if qref is null, "fix" this quaternion
   * otherwise, return a quaternion that is CLOSEST to the given quaternion
   * that is, one that gives a positive dot product
   * 
   */
  public void setRef(Qd qref) {
    if (qref == null) {
      mul(getFixFactor());
      return;
    }
    if (dot(qref) >= 0)
      return;
    q0 *= -1;
    q1 *= -1;
    q2 *= -1;
    q3 *= -1;
  }

  /**
   * returns a quaternion frame based on three points (center, x, and any point in xy plane)
   * or two vectors (vA, vB).
   * 
   * @param center  (null for vA/vB option)
   * @param x
   * @param xy
   * @return quaternion for frame
   */
  public static final Qd getQuaternionFrame(P3d center, T3d x,
                                                    T3d xy) {
    return newFrame(center, x, xy, true);
  }

  public static final Qd getQuaternionFrame(P3 center, T3 x, T3 xy) {
    return newFrame(center == null ? null : P3d.newPd(center), V3d.newV(x), V3d.newV(xy), false);
  }

  private static Qd newFrame(P3d center, T3d vA, T3d vB, boolean doCopy) {
    if (doCopy) {
      vA = V3d.newV(vA);
      vB = V3d.newV(vB);
    }
    if (center != null) {
      vA.sub(center);
      vB.sub(center);
    }
    return getQuaternionFrameV((V3d) vA, (V3d) vB, null, false);
  }

  public static final Qd getQuaternionFrameV(V3 vA, V3 vB, V3 vC,
                                             boolean yBased) {
    return getQuaternionFrameV(V3d.newV(vA), V3d.newV(vB), V3d.newV(vC),
        yBased);
  }

  /**
   * Create a quaternion based on a frame
   * @param vA
   * @param vB
   * @param vC
   * @param yBased
   * @return quaternion
   */
  public static final Qd getQuaternionFrameV(V3d vA, V3d vB,
                                                    V3d vC, boolean yBased) {
    if (vC == null) {
      vC = new V3d();
      vC.cross(vA, vB);
      if (yBased)
        vA.cross(vB, vC);
    }
    V3d vBprime = new V3d();
    vBprime.cross(vC, vA);
    vA.normalize();
    vBprime.normalize();
    vC.normalize();
    M3d mat = new M3d();
    mat.setColumnV(0, vA);
    mat.setColumnV(1, vBprime);
    mat.setColumnV(2, vC);

    /*
     * 
     * Verification tests using Quat4f and AngleAxis4f:
     * 
     System.out.println("quaternion frame matrix: " + mat);
     
     Point3f pt2 = new Point3f();
     mat.transform(Point3f.new3(1, 0, 0), pt2);
     System.out.println("vA=" + vA + " M(100)=" + pt2);
     mat.transform(Point3f.new3(0, 1, 0), pt2);
     System.out.println("vB'=" + vBprime + " M(010)=" + pt2);
     mat.transform(Point3f.new3(0, 0, 1), pt2);
     System.out.println("vC=" + vC + " M(001)=" + pt2);
     Quat4f q4 = new Quat4f();
     q4.set(mat);
     System.out.println("----");
     System.out.println("Quat4f: {" + q4.w + " " + q4.x + " " + q4.y + " " + q4.z + "}");
     System.out.println("Quat4f: 2xy + 2wz = m10: " + (2 * q4.x * q4.y + 2 * q4.w * q4.z) + " = " + mat.m10);   
     
     */

    Qd q = newM(mat);

     /*
     System.out.println("Quaternion mat from q \n" + q.getMatrix());
     System.out.println("Quaternion: " + q.getNormal() + " " + q.getTheta());
     AxisAngle4f a = new AxisAngle4f();
     a.set(mat);
     Vector3f v = Vector3f.new3(a.x, a.y, a.z);
     v.normalize();
     System.out.println("angleAxis: " + v + " "+(a.angle/Math.PI * 180));
     */
     
    return q;
  }

  public M3d getMatrix() {
    if (mat == null)
      setMatrix();
    return mat;
  }

  private void setMatrix() {
    mat = new M3d();
    // q0 = w, q1 = x, q2 = y, q3 = z
    mat.m00 = q0 * q0 + q1 * q1 - q2 * q2 - q3 * q3;
    mat.m01 = 2 * q1 * q2 - 2 * q0 * q3;
    mat.m02 = 2 * q1 * q3 + 2 * q0 * q2;
    mat.m10 = 2 * q1 * q2 + 2 * q0 * q3;
    mat.m11 = q0 * q0 - q1 * q1 + q2 * q2 - q3 * q3;
    mat.m12 = 2 * q2 * q3 - 2 * q0 * q1;
    mat.m20 = 2 * q1 * q3 - 2 * q0 * q2;
    mat.m21 = 2 * q2 * q3 + 2 * q0 * q1;
    mat.m22 = q0 * q0 - q1 * q1 - q2 * q2 + q3 * q3;
  }

  public Qd add(double x) {
    // scalar theta addition (degrees) 
   return newVA(getNormal(), getTheta() + x);
  }

  public Qd mul(double x) {
    // scalar theta multiplication
    return (x == 1 ? new4(q1, q2, q3, q0) : 
      newVA(getNormal(), getTheta() * x));
  }

  public Qd mulQ(Qd p) {
    return new4(
        q0 * p.q1 + q1 * p.q0 + q2 * p.q3 - q3 * p.q2, 
        q0 * p.q2 + q2 * p.q0 + q3 * p.q1 - q1 * p.q3, 
        q0 * p.q3 + q3 * p.q0 + q1 * p.q2 - q2 * p.q1, 
        q0 * p.q0 - q1 * p.q1 - q2 * p.q2 - q3 * p.q3);
  }

  public Qd div(Qd p) {
    // unit quaternions assumed -- otherwise would scale by 1/p.dot(p)
    return mulQ(p.inv());
  }

  public Qd divLeft(Qd p) {
    // unit quaternions assumed -- otherwise would scale by 1/p.dot(p)
    return this.inv().mulQ(p);
  }

  public double dot(Qd q) {
    return this.q0 * q.q0 + this.q1 * q.q1 + this.q2 * q.q2 + this.q3 * q.q3;
  }

  public Qd inv() {
    return new4(-q1, -q2, -q3, q0);
  }

  public Qd negate() {
    return new4(-q1, -q2, -q3, -q0);
  }

  /**
   * ensures 
   * 
   * 1) q0 > 0
   * or
   * 2) q0 = 0 and q1 > 0
   * or
   * 3) q0 = 0 and q1 = 0 and q2 > 0
   * or
   * 4) q0 = 0 and q1 = 0 and q2 = 0 and q3 > 0
   * 
   * @return 1 or -1  
   * 
   */

  private double getFixFactor() {
    return (q0 < 0 || 
        q0 == 0 && (q1 < 0 || q1 == 0 && (q2 < 0 || q2 == 0 && q3 < 0)) ? -1 : 1);
  }
  
  public V3d getVector(int i) {
    return getVectorScaled(i, 1f);
  }

  public V3d getVectorScaled(int i, double scale) {
    if (i == -1) {
      scale *= getFixFactor();
      return V3d.new3(q1 * scale, q2 * scale, q3 * scale);
    }
    if (mat == null)
      setMatrix();
    V3d v = new V3d();
    mat.getColumnV(i, v);
    if (scale != 1f)
      v.scale(scale);
    return v;
  }

  /**
   * 
   * @return  vector such that 0 <= angle <= 180
   */
  public V3d getNormal() {
    V3d v = getRawNormal(this);
    v.scale(getFixFactor());
    return v;
  }

  private static V3d getRawNormal(Qd q) {
    V3d v = V3d.new3(q.q1, q.q2, q.q3);
    if (v.length() == 0)
      return V3d.new3(0, 0, 1);
    v.normalize();
    return v;
  }

  /**
   * 
   * @return 0 <= angle <= 180 in degrees
   */
  public double getTheta() {
    return (Math.acos(Math.abs(q0)) * 2 * 180 / Math.PI);
  }

  public double getThetaRadians() {
    return (Math.acos(Math.abs(q0)) * 2);
  }

  /**
   * 
   * @param v0
   * @return    vector option closest to v0
   * 
   */
  public V3d getNormalDirected(V3d v0) {
    V3d v = getNormal();
    if (v.x * v0.x + v.y * v0.y + v.z * v0.z < 0) {
      v.scale(-1);
    }
    return v;
  }

  public V3d get3dProjection(V3d v3d) {
    v3d.set(q1, q2, q3);
    return v3d;
  }
  
  /**
   * 
   * @param axisAngle
   * @return   fill in theta of axisAngle such that 
   */
  public P4d getThetaDirected(P4d axisAngle) {
    //fills in .w;
    double theta = getTheta();
    V3d v = getNormal();
    if (axisAngle.x * q1 + axisAngle.y * q2 + axisAngle.z * q3 < 0) {
      v.scale(-1);
      theta = -theta;
    }
    axisAngle.set4(v.x, v.y, v.z, theta);
    return axisAngle;
  }

  /**
   * 
   * @param vector  a vector, same as for getNormalDirected
   * @return   return theta 
   */
  public double getThetaDirectedV(V3d vector) {
    //fills in .w;
    double theta = getTheta();
    V3d v = getNormal();
    if (vector.x * q1 + vector.y * q2 + vector.z * q3 < 0) {
      v.scale(-1);
      theta = -theta;
    }
    return theta;
  }

  /**
   *   Qdernions are saved as {q1, q2, q3, q0} 
   * 
   * While this may seem odd, it is so that for any point4 -- 
   * planes, axisangles, and quaternions -- we can use the 
   * first three coordinates to determine the relavent axis
   * the fourth then gives us offset to {0,0,0} (plane), 
   * rotation angle (axisangle), and cos(theta/2) (quaternion).
   * @return {x y z w} (unnormalized)
   */
  public P4d toPoint4d() {
    return P4d.new4(q1, q2, q3, q0); // x,y,z,w
  }

  public A4d toAxisAngle4d() {
    double theta = 2 * Math.acos(Math.abs(q0));
    double sinTheta2 = Math.sin(theta/2);
    V3d v = getNormal();
    if (sinTheta2 < 0) {
      v.scale(-1);
      theta = Math.PI - theta;
    }
    return A4d.newVA(v, theta);
  }

  public T3d transform2(T3d pt, T3d ptNew) {
    if (mat == null)
      setMatrix();
    mat.rotate2(pt, ptNew);
    return ptNew;
  }

  public Qd leftDifference(Qd q2) {
    //dq = q.leftDifference(qnext);//q.inv().mul(qnext);
    Qd q2adjusted = (this.dot(q2) < 0 ? q2.negate() : q2);
    return inv().mulQ(q2adjusted);
  }

  public Qd rightDifference(Qd q2) {
    //dq = qnext.rightDifference(q);//qnext.mul(q.inv());
    Qd q2adjusted = (this.dot(q2) < 0 ? q2.negate() : q2);
    return mulQ(q2adjusted.inv());
  }

  /**
   * 
   *  Java axisAngle / plane / Point4f format
   *  all have the format {x y z w}
   *  so we go with that here as well
   *   
   * @return  "{q1 q2 q3 q0}"
   */
  @Override
  public String toString() {
    return "{" + q1 + " " + q2 + " " + q3 + " " + q0 + "}";
  }

  /**
   * 
   * @param data1
   * @param data2
   * @param nMax     > 0 --> limit to this number
   * @param isRelative
   * 
   * @return       pairwise array of data1 / data2 or data1 \ data2
   */
  public static Qd[] div(Qd[] data1, Qd[] data2, int nMax, boolean isRelative) {
    int n;
    if (data1 == null || data2 == null || (n = Math.min(data1.length, data2.length)) == 0)
      return null;
    if (nMax > 0 && n > nMax)
      n = nMax;
    Qd[] dqs = new Qd[n];
    for (int i = 0; i < n; i++) {
      if (data1[i] == null || data2[i] == null)
        return null;
      dqs[i] = (isRelative ? data1[i].divLeft(data2[i]) : data1[i].div(data2[i]));
    }
    return dqs;
  }
  
  public static Qd sphereMean(Qd[] data, double[] retStddev, double criterion) {
    // Samuel R. Buss, Jay P. Fillmore: 
    // Spherical averages and applications to spherical splines and interpolation. 
    // ACM Trans. Graph. 20(2): 95-126 (2001)
      if (data == null || data.length == 0)
        return new Qd();
      if (retStddev == null)
        retStddev = new double[1];
      if (data.length == 1) {
        retStddev[0] = 0;
        return newQ(data[0]);
      }
      double diff = Double.MAX_VALUE;
      double lastStddev = Double.MAX_VALUE;
      Qd qMean = simpleAverage(data);
      int maxIter = 100; // typically goes about 5 iterations
      int iter = 0;
      while (diff > criterion && lastStddev != 0 && iter < maxIter) {
        qMean = newMean(data, qMean);
        retStddev[0] = stdDev(data, qMean);
        diff = Math.abs(retStddev[0] - lastStddev);
        lastStddev = retStddev[0];
        //Logger.info(++iter + " sphereMean " + qMean + " stddev=" + lastStddev + " diff=" + diff);
      }
      return qMean;
  }

  /**
   * Just a starting point.
   * get average normal vector
   * scale normal by average projection of vectors onto it
   * create quaternion from this 3D projection
   * 
   * @param ndata
   * @return approximate average
   */
  private static Qd simpleAverage(Qd[] ndata) {
    V3d mean = V3d.new3(0, 0, 1);
    // using the directed normal ensures that the mean is 
    // continually added to and never subtracted from 
    V3d v = ndata[0].getNormal();
    mean.add(v);
    for (int i = ndata.length; --i >= 0;)
      mean.add(ndata[i].getNormalDirected(mean));
    mean.sub(v);
    mean.normalize();
    double f = 0;
    // the 3D projection of the quaternion is [sin(theta/2)]*n
    // so dotted with the normalized mean gets us an approximate average for sin(theta/2)
    for (int i = ndata.length; --i >= 0;)
      f += Math.abs(ndata[i].get3dProjection(v).dot(mean)); 
    if (f != 0)
      mean.scale(f / ndata.length);
    // now convert f to the corresponding cosine instead of sine
    f = Math.sqrt(1 - mean.lengthSquared());
    if (Double.isNaN(f))
      f = 0;
    return newP4(P4d.new4(mean.x, mean.y, mean.z, f));
  }

  private static Qd newMean(Qd[] data, Qd mean) {
    /* quaternion derivatives nicely take care of producing the necessary 
     * metric. Since dq gives us the normal with the smallest POSITIVE angle, 
     * we just scale by that -- using degrees.
     * No special normalization is required.
     * 
     * The key is that the mean has been set up already, and dq.getTheta()
     * will always return a value between 0 and 180. True, for groupings
     * where dq swings wildly -- 178, 182, 178, for example -- there will
     * be problems, but the presumption here is that there is a REASONABLE
     * set of data. Clearly there are spherical data sets that simply cannot
     * be assigned a mean. (For example, where the three projected points
     * are equally distant on the sphere. We just can't worry about those
     * cases here. Rather, if there is any significance to the data,
     * there will be clusters of projected points, and the analysis will
     * be meaningful.
     * 
     * Note that the hemisphere problem drops out because dq.getNormal() and
     * dq.getTheta() will never return (n, 182 degrees) but will 
     * instead return (-n, 2 degrees). That's just what we want in that case.
     *
     *  Note that the projection in this case is to 3D -- a set of vectors
     *  in space with lengths proportional to theta (not the sin(theta/2) 
     *  that is associated with a quaternion map).
     *  
     *  This is officially an "exponential" or "hyperbolic" projection.
     *  
     */
    V3d sum = new V3d();
    V3d v;
    Qd q, dq;
    //System.out.println("newMean mean " + mean);
    for (int i = data.length; --i >= 0;) {
      q = data[i];
      dq = q.div(mean);
      v = dq.getNormal();
      v.scale(dq.getTheta());
      sum.add(v);
    }
    sum.scale(1f/data.length);
    Qd dqMean = newVA(sum, sum.length());
    //System.out.println("newMean dqMean " + dqMean + " " + dqMean.getNormal() + " " + dqMean.getTheta());
    return dqMean.mulQ(mean);
  }

  /**
   * @param data
   * @param mean
   * @return     standard deviation in units of degrees
   */
  private static double stdDev(Qd[] data, Qd mean) {
    // the quaternion dot product gives q0 for dq (i.e. q / mean)
    // that is, cos(theta/2) for theta between them
    double sum2 = 0;
    int n = data.length;
    for (int i = n; --i >= 0;) {
      double theta = data[i].div(mean).getTheta(); 
      sum2 += theta * theta;
    }
    return Math.sqrt(sum2 / n);
  }

  public double[] getEulerZYZ() {
    // http://www.swarthmore.edu/NatSci/mzucker1/e27/diebel2006attitude.pdf
    double rA, rB, rG;
    if (q1 == 0 && q2 == 0) {
      double theta = getTheta();
      // pure Z rotation - ambiguous
      return new double[] { q3 < 0 ? -theta : theta , 0, 0 };
    }
    rA = Math.atan2(2 * (q2 * q3 + q0 * q1), 2 * (-q1 * q3 + q0 * q2 ));
    rB = Math.acos(q3 * q3 - q2 * q2 - q1 * q1 + q0 * q0);
    rG = Math.atan2( 2 * (q2 * q3 - q0 * q1), 2 * (q0 * q2 + q1 * q3));
    return new double[]  {(rA / RAD_PER_DEG), (rB / RAD_PER_DEG), (rG / RAD_PER_DEG)};
  } 

  public double[] getEulerZXZ() {
    // NOT http://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles
    // http://www.swarthmore.edu/NatSci/mzucker1/e27/diebel2006attitude.pdf
    double rA, rB, rG;
    if (q1 == 0 && q2 == 0) {
      double theta = getTheta();
      // pure Z rotation - ambiguous
      return new double[] { q3 < 0 ? -theta : theta , 0, 0 };
    }
    rA = Math.atan2(2 * (q1 * q3 - q0 * q2), 2 * (q0 * q1 + q2 * q3 ));
    rB = Math.acos(q3 * q3 - q2 * q2 - q1 * q1 + q0 * q0);
    rG = Math.atan2( 2 * (q1 * q3 + q0 * q2), 2 * (-q2 * q3 + q0 * q1));
    return new double[]  {(rA / RAD_PER_DEG), (rB / RAD_PER_DEG), (rG / RAD_PER_DEG)};
  }

}
