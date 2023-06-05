/* $RCSfile$
 * $Author: egonw $
 * $Date: 2005-11-10 09:52:44 -0600 (Thu, 10 Nov 2005) $
 * $Revision: 4255 $
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

import javajs.api.EigenInterface;
import javajs.api.Interface;

final public class Measure {

  public final static float radiansPerDegree = (float) (2 * Math.PI / 360);
  
  public static float computeAngle(T3 pointA, T3 pointB, T3 pointC, V3 vectorBA, V3 vectorBC, boolean asDegrees) {
    vectorBA.sub2(pointA, pointB);
    vectorBC.sub2(pointC, pointB);
    float angle = vectorBA.angle(vectorBC);
    return (asDegrees ? angle / radiansPerDegree : angle);
  }

  public static float computeAngleABC(T3 pointA, T3 pointB, T3 pointC, boolean asDegrees) {
    V3 vectorBA = new V3();
    V3 vectorBC = new V3();        
    return computeAngle(pointA, pointB, pointC, vectorBA, vectorBC, asDegrees);
  }

  public static float computeTorsion(T3 p1, T3 p2, T3 p3, T3 p4, boolean asDegrees) {
  
    float ijx = p1.x - p2.x;
    float ijy = p1.y - p2.y;
    float ijz = p1.z - p2.z;
  
    float kjx = p3.x - p2.x;
    float kjy = p3.y - p2.y;
    float kjz = p3.z - p2.z;
  
    float klx = p3.x - p4.x;
    float kly = p3.y - p4.y;
    float klz = p3.z - p4.z;
  
    float ax = ijy * kjz - ijz * kjy;
    float ay = ijz * kjx - ijx * kjz;
    float az = ijx * kjy - ijy * kjx;
    float cx = kjy * klz - kjz * kly;
    float cy = kjz * klx - kjx * klz;
    float cz = kjx * kly - kjy * klx;
  
    float ai2 = 1f / (ax * ax + ay * ay + az * az);
    float ci2 = 1f / (cx * cx + cy * cy + cz * cz);
  
    float ai = (float) Math.sqrt(ai2);
    float ci = (float) Math.sqrt(ci2);
    float denom = ai * ci;
    float cross = ax * cx + ay * cy + az * cz;
    float cosang = cross * denom;
    if (cosang > 1) {
      cosang = 1;
    }
    if (cosang < -1) {
      cosang = -1;
    }
  
    float torsion = (float) Math.acos(cosang);
    float dot = ijx * cx + ijy * cy + ijz * cz;
    float absDot = Math.abs(dot);
    torsion = (dot / absDot > 0) ? torsion : -torsion;
    return (asDegrees ? torsion / radiansPerDegree : torsion);
  }

  /**
   * This method calculates measures relating to two points in space 
   * with related quaternion frame difference. It is used in Jmol for
   * calculating straightness and many other helical quantities.
   * 
   * @param a
   * @param b
   * @param dq
   * @return  new T3[] { pt_a_prime, n, r, P3.new3(theta, pitch, residuesPerTurn), pt_b_prime };
   */
  public static T3[] computeHelicalAxis(P3 a, P3 b, Quat dq) {
    
    //                b
    //           |   /|
    //           |  / |
    //           | /  |
    //           |/   c
    //         b'+   / \
    //           |  /   \      Vcb = Vab . n
    //         n | /     \d    Vda = (Vcb - Vab) / 2
    //           |/theta  \
    //         a'+---------a
    //                r 

    V3 vab = new V3();
    vab.sub2(b, a);
    /*
     * testing here to see if directing the normal makes any difference -- oddly
     * enough, it does not. When n = -n and theta = -theta vab.n is reversed,
     * and that magnitude is multiplied by n in generating the A'-B' vector.
     * 
     * a negative angle implies a left-handed axis (sheets)
     */
    float theta = dq.getTheta();
    V3 n = dq.getNormal();
    float v_dot_n = vab.dot(n);
    if (Math.abs(v_dot_n) < 0.0001f)
      v_dot_n = 0;
    V3 va_prime_d = new V3();
    va_prime_d.cross(vab, n);
    if (va_prime_d.dot(va_prime_d) != 0)
      va_prime_d.normalize();
    V3 vda = new V3();
    V3 vcb = V3.newV(n);
    if (v_dot_n == 0)
      v_dot_n = 2E-45f; // allow for perpendicular axis to vab
    vcb.scale(v_dot_n);
    vda.sub2(vcb, vab);
    vda.scale(0.5f);
    va_prime_d.scale(theta == 0 ? 0 : (float) (vda.length() / Math.tan(theta
        / 2 / 180 * Math.PI)));
    V3 r = V3.newV(va_prime_d);
    if (theta != 0)
      r.add(vda);
    P3 pt_a_prime = P3.newP(a);
    pt_a_prime.sub(r);
    // already done this. ??
    if (v_dot_n != 2E-45f)
      n.scale(v_dot_n);
    // must calculate directed angle:
    P3 pt_b_prime = P3.newP(pt_a_prime);
    pt_b_prime.add(n);
    theta = computeTorsion(a, pt_a_prime, pt_b_prime, b, true);
    if (Float.isNaN(theta) || r.length() < 0.0001f)
      theta = dq.getThetaDirectedV(n); // allow for r = 0
    // anything else is an array
    float residuesPerTurn = Math.abs(theta == 0 ? 0 : 360f / theta);
    float pitch = Math.abs(v_dot_n == 2E-45f ? 0 : n.length()
        * (theta == 0 ? 1 : 360f / theta));
    return new T3[] { pt_a_prime, n, r, P3.new3(theta, pitch, residuesPerTurn), pt_b_prime };
  }

  public static P4 getPlaneThroughPoints(T3 pointA,
                                              T3 pointB,
                                              T3 pointC, V3 vNorm,
                                              V3 vAB, P4 plane) {
    if (vNorm == null)
      vNorm = new V3();
    if (vAB == null)
      vAB = new V3();
    float w = getNormalThroughPoints(pointA, pointB, pointC, vNorm, vAB);
    plane.set4(vNorm.x, vNorm.y, vNorm.z, w);
    return plane;
  }
  
  public static void getPlaneThroughPoint(T3 pt, V3 normal, P4 plane) {
    plane.set4(normal.x, normal.y, normal.z, -normal.dot(pt));
  }
  
  public static float distanceToPlane(P4 plane, T3 pt) {
    return (plane == null ? Float.NaN 
        : (plane.dot(pt) + plane.w) / (float) Math.sqrt(plane.dot(plane)));
  }

  public static float directedDistanceToPlane(P3 pt, P4 plane, P3 ptref) {
    float f = plane.dot(pt) + plane.w;
    float f1 = plane.dot(ptref) + plane.w;
    return Math.signum(f1) * f /  (float) Math.sqrt(plane.dot(plane));
  }

  public static float distanceToPlaneD(P4 plane, float d, P3 pt) {
    return (plane == null ? Float.NaN : (plane.dot(pt) + plane.w) / d);
  }

  public static float distanceToPlaneV(V3 norm, float w, P3 pt) {
    return (norm == null ? Float.NaN 
        : (norm.dot(pt) + w)  / (float) Math.sqrt(norm.dot(norm)));
  }

  /**
   * note that if vAB or vAC is dispensible, vNormNorm can be one of them
   * @param pointA
   * @param pointB
   * @param pointC
   * @param vNormNorm
   * @param vAB
   */
  public static void calcNormalizedNormal(T3 pointA, T3 pointB,
         T3 pointC, T3 vNormNorm, T3 vAB) {
    vAB.sub2(pointB, pointA);
    vNormNorm.sub2(pointC, pointA);
    vNormNorm.cross(vAB, vNormNorm);
    vNormNorm.normalize();
  }

  public static float getDirectedNormalThroughPoints(T3 pointA, 
         T3 pointB, T3 pointC, T3 ptRef, V3 vNorm, 
         V3 vAB) {
    // for x = plane({atomno=1}, {atomno=2}, {atomno=3}, {atomno=4})
    float nd = getNormalThroughPoints(pointA, pointB, pointC, vNorm, vAB);
    if (ptRef != null) {
      P3 pt0 = P3.newP(pointA);
      pt0.add(vNorm);
      float d = pt0.distance(ptRef);
      pt0.sub2(pointA, vNorm);
      if (d > pt0.distance(ptRef)) {
        vNorm.scale(-1);
        nd = -nd;
      }
    }
    return nd;
  }
  
  /**
   * @param pointA
   * @param pointB
   * @param pointC
   * @param vNorm
   * @param vTemp
   * @return w
   */
  public static float getNormalThroughPoints(T3 pointA, T3 pointB,
                                   T3 pointC, T3 vNorm, T3 vTemp) {
    // for Polyhedra
    calcNormalizedNormal(pointA, pointB, pointC, vNorm, vTemp);
    // ax + by + cz + d = 0
    // so if a point is in the plane, then N dot X = -d
    vTemp.setT(pointA);
    return -vTemp.dot(vNorm);
  }

  /**
   * Project a point onto a plane, also returning the normal vector and the directed distance to the plane.
   * 
   * @param pt
   * @param plane
   * @param retPtProj  returned pt (can be pt)
   * @param retNorm returned normal vector
   * @return directed distance to plane
   */
  public static float getPlaneProjection(T3 pt, P4 plane, T3 retPtProj, V3 retNorm) {
    float dist = distanceToPlane(plane, pt);
    retNorm.set(plane.x, plane.y, plane.z);
    retNorm.normalize();
    if (dist > 0)
      retNorm.scale(-1);
    retPtProj.scaleAdd2(Math.abs(dist), retNorm, pt);
    return dist;
  }

  /**
   * 
   * @param ptCenter
   * @param ptA
   * @param ptB
   * @param ptC
   * @param isOutward
   * @param normal set to be opposite to direction of ptCenter from abd
   * @param vTemp
   * @return true if winding is CCW; false if CW
   */
  public static boolean getNormalFromCenter(P3 ptCenter, P3 ptA, P3 ptB, P3 ptC,
                                      boolean isOutward, V3 normal, V3 vTemp) {
    float d = getNormalThroughPoints(ptA, ptB, ptC, normal, vTemp);
    boolean isReversed = (distanceToPlaneV(normal, d, ptCenter) > 0);
    if (isReversed == isOutward)
      normal.scale(-1f);
    return !isReversed;
  }

  public final static V3 axisY = V3.new3(0, 1, 0);
  
  public static void getNormalToLine(P3 pointA, P3 pointB,
                                   V3 vNormNorm) {
    // vector in xy plane perpendicular to a line between two points RMH
    vNormNorm.sub2(pointA, pointB);
    vNormNorm.cross(vNormNorm, axisY);
    vNormNorm.normalize();
    if (Float.isNaN(vNormNorm.x))
      vNormNorm.set(1, 0, 0);
  }
  
  public static void getBisectingPlane(P3 pointA, V3 vAB,
                                                 T3 ptTemp, V3 vTemp, P4 plane) {
    ptTemp.scaleAdd2(0.5f, vAB, pointA);
    vTemp.setT(vAB);
    vTemp.normalize();
    getPlaneThroughPoint(ptTemp, vTemp, plane);
    }
  
  /**
   * project point onto a line containing ptA and having axis unitVector axisUnitVector,
   * returning the result in point and a vector from ptA to pt in vectorProjection  
   * @param pt input pt to be projected, returns projected
   * @param ptA input point on line
   * @param axisUnitVector input unit vector
   * @param vectorProjection return for pt.sub(ptA) parallel to the axis
   * @return projected distance
   */
 public static float projectOntoAxis(P3 pt, P3 ptA,
                                    V3 axisUnitVector,
                                    V3 vectorProjection) {
   vectorProjection.sub2(pt, ptA);
   float projectedLength = vectorProjection.dot(axisUnitVector);
   pt.scaleAdd2(projectedLength, axisUnitVector, ptA);
   vectorProjection.sub2(pt, ptA);
   return projectedLength;
 }

  

  /**
   * 
   * @param points
   * @param nPoints 
   * @param axisA
   * @param axisUnitVector
   * @param vectorProjection
   * @param nTriesMax
   */
  public static void calcBestAxisThroughPoints(P3[] points, int nPoints, P3 axisA,
                                               V3 axisUnitVector,
                                               V3 vectorProjection,
                                               int nTriesMax) {
    // just a crude starting point.

    axisA.setT(points[0]);
    axisUnitVector.sub2(points[nPoints - 1], axisA);
    axisUnitVector.normalize();

    /*
     * We now calculate the least-squares 3D axis
     * through the helix alpha carbons starting with Vo
     * as a first approximation.
     * 
     * This uses the simple 0-centered least squares fit:
     * 
     * Y = M cross Xi
     * 
     * minimizing R^2 = SUM(|Y - Yi|^2) 
     * 
     * where Yi is the vector PERPENDICULAR of the point onto axis Vo
     * and Xi is the vector PROJECTION of the point onto axis Vo
     * and M is a vector adjustment 
     * 
     * M = SUM_(Xi cross Yi) / sum(|Xi|^2)
     * 
     * from which we arrive at:
     * 
     * V = Vo + (M cross Vo)
     * 
     * Basically, this is just a 3D version of a 
     * standard 2D least squares fit to a line, where we would say:
     * 
     * y = m xi + b
     * 
     * D = n (sum xi^2) - (sum xi)^2
     * 
     * m = [(n sum xiyi) - (sum xi)(sum yi)] / D
     * b = [(sum yi) (sum xi^2) - (sum xi)(sum xiyi)] / D
     * 
     * but here we demand that the line go through the center, so we
     * require (sum xi) = (sum yi) = 0, so b = 0 and
     * 
     * m = (sum xiyi) / (sum xi^2)
     * 
     * In 3D we do the same but 
     * instead of x we have Vo,
     * instead of multiplication we use cross products
     * 
     * A bit of iteration is necessary.
     * 
     * Bob Hanson 11/2006
     * 
     */

    calcAveragePointN(points, nPoints, axisA);

    int nTries = 0;
    while (nTries++ < nTriesMax
        && findAxis(points, nPoints, axisA, axisUnitVector, vectorProjection) > 0.001) {
    }

    /*
     * Iteration here gets the job done.
     * We now find the projections of the endpoints onto the axis
     * 
     */

    P3 tempA = P3.newP(points[0]);
    projectOntoAxis(tempA, axisA, axisUnitVector, vectorProjection);
    axisA.setT(tempA);
  }

  public static float findAxis(P3[] points, int nPoints, P3 axisA,
                        V3 axisUnitVector, V3 vectorProjection) {
    V3 sumXiYi = new V3();
    V3 vTemp = new V3();
    P3 pt = new P3();
    P3 ptProj = new P3();
    V3 a = V3.newV(axisUnitVector);

    float sum_Xi2 = 0;
    for (int i = nPoints; --i >= 0;) {
      pt.setT(points[i]);
      ptProj.setT(pt);
      projectOntoAxis(ptProj, axisA, axisUnitVector,
          vectorProjection);
      vTemp.sub2(pt, ptProj);
      //sum_Yi2 += vTemp.lengthSquared();
      vTemp.cross(vectorProjection, vTemp);
      sumXiYi.add(vTemp);
      sum_Xi2 += vectorProjection.lengthSquared();
    }
    V3 m = V3.newV(sumXiYi);
    m.scale(1 / sum_Xi2);
    vTemp.cross(m, axisUnitVector);
    axisUnitVector.add(vTemp);
    axisUnitVector.normalize();  
    //check for change in direction by measuring vector difference length
    vTemp.sub2(axisUnitVector, a);
    return vTemp.length();
  }
  
  
  public static void calcAveragePoint(P3 pointA, P3 pointB,
                                      P3 pointC) {
    pointC.set((pointA.x + pointB.x) / 2, (pointA.y + pointB.y) / 2,
        (pointA.z + pointB.z) / 2);
  }
  
  public static void calcAveragePointN(P3[] points, int nPoints,
                                P3 averagePoint) {
    averagePoint.setT(points[0]);
    for (int i = 1; i < nPoints; i++)
      averagePoint.add(points[i]);
    averagePoint.scale(1f / nPoints);
  }

  public static boolean isInTetrahedron(P3 pt, P3 ptA, P3 ptB,
                                        P3 ptC, P3 ptD,
                                        P4 plane, V3 vTemp,
                                        V3 vTemp2, boolean fullyEnclosed) {
    boolean b = (distanceToPlane(getPlaneThroughPoints(ptC, ptD, ptA, vTemp, vTemp2, plane), pt) >= 0);
    if (b != (distanceToPlane(getPlaneThroughPoints(ptA, ptD, ptB, vTemp, vTemp2, plane), pt) >= 0))
      return false;
    if (b != (distanceToPlane(getPlaneThroughPoints(ptB, ptD, ptC, vTemp, vTemp2, plane), pt) >= 0))
      return false;
    float d = distanceToPlane(getPlaneThroughPoints(ptA, ptB, ptC, vTemp, vTemp2, plane), pt);
    if (fullyEnclosed)
      return (b == (d >= 0));
    float d1 = distanceToPlane(plane, ptD);
    return d1 * d <= 0 || Math.abs(d1) > Math.abs(d);
  }


  /**
   * Calculate the line that is the intersection of two planes.
   * 
   * @param plane1
   * @param plane2
   * @return       [ point, vector ] or []
   */
  public static Lst<Object> getIntersectionPP(P4 plane1, P4 plane2) {
    float a1 = plane1.x;
    float b1 = plane1.y;
    float c1 = plane1.z;
    float d1 = plane1.w;
    float a2 = plane2.x;
    float b2 = plane2.y;
    float c2 = plane2.z;
    float d2 = plane2.w;
    V3 norm1 = V3.new3(a1, b1, c1);
    V3 norm2 = V3.new3(a2, b2, c2);
    V3 nxn = new V3();
    nxn.cross(norm1, norm2);
    float ax = Math.abs(nxn.x);
    float ay = Math.abs(nxn.y);
    float az = Math.abs(nxn.z);
    float x, y, z, diff;
    int type = (ax > ay ? (ax > az ? 1 : 3) : ay > az ? 2 : 3);
    switch(type) {
    case 1:
      x = 0;
      diff = (b1 * c2 - b2 * c1);
      if (Math.abs(diff) < 0.01) return null;
      y = (c1 * d2 - c2 * d1) / diff;
      z = (b2 * d1 - d2 * b1) / diff;
      break;
    case 2:
      diff = (a1 * c2 - a2 * c1);
      if (Math.abs(diff) < 0.01) return null;
      x = (c1 * d2 - c2 * d1) / diff;
      y = 0;
      z = (a2 * d1 - d2 * a1) / diff;
      break;
    case 3:
    default:
      diff = (a1 * b2 - a2 * b1);
      if (Math.abs(diff) < 0.01) return null;
      x = (b1 * d2 - b2 * d1) / diff;
      y = (a2 * d1 - d2 * a1) / diff;
      z = 0;
    }
    Lst<Object>list = new  Lst<Object>();
    list.addLast(P3.new3(x, y, z));
    nxn.normalize();
    list.addLast(nxn);
    return list;
  }

  /**
   * 
   * Calculate the intersection of a line with a plane.
   * 
   * @param pt1  point on line
   * @param v    unit vector of line
   * @param plane 
   * @param ptRet  point of intersection of line with plane
   * @param tempNorm 
   * @param vTemp 
   * @return       ptRtet
   */
  public static P3 getIntersection(P3 pt1, V3 v,
                                               P4 plane, P3 ptRet, V3 tempNorm, V3 vTemp) {
    getPlaneProjection(pt1, plane, ptRet, tempNorm);
    tempNorm.set(plane.x, plane.y, plane.z);
    tempNorm.normalize();
    if (v == null)
      v = V3.newV(tempNorm);
    float l_dot_n = v.dot(tempNorm);
    if (Math.abs(l_dot_n) < 0.01) return null;
    vTemp.sub2(ptRet, pt1);
    ptRet.scaleAdd2(vTemp.dot(tempNorm) / l_dot_n, v, pt1);
    return ptRet;
  }

	/*
	 * public static Point3f getTriangleIntersection(Point3f a1, Point3f a2,
	 * Point3f a3, Point4f plane, Point3f b1, Point3f b2, Point3f b3, Vector3f
	 * vNorm, Vector3f vTemp, Point3f ptRet, Point3f ptTemp, Vector3f vTemp2,
	 * Point4f pTemp, Vector3f vTemp3) {
	 * 
	 * if (getTriangleIntersection(b1, b2, a1, a2, a3, vTemp, plane, vNorm,
	 * vTemp2, vTemp3, ptRet, ptTemp)) return ptRet; if
	 * (getTriangleIntersection(b2, b3, a1, a2, a3, vTemp, plane, vNorm, vTemp2,
	 * vTemp3, ptRet, ptTemp)) return ptRet; if (getTriangleIntersection(b3, b1,
	 * a1, a2, a3, vTemp, plane, vNorm, vTemp2, vTemp3, ptRet, ptTemp)) return
	 * ptRet; return null; }
	 */
	/*
	 * public static boolean getTriangleIntersection(Point3f b1, Point3f b2,
	 * Point3f a1, Point3f a2, Point3f a3, Vector3f vTemp, Point4f plane, Vector3f
	 * vNorm, Vector3f vTemp2, Vector3f vTemp3, Point3f ptRet, Point3f ptTemp) {
	 * if (distanceToPlane(plane, b1) * distanceToPlane(plane, b2) >= 0) return
	 * false; vTemp.sub(b2, b1); vTemp.normalize(); if (getIntersection(b1, vTemp,
	 * plane, ptRet, vNorm, vTemp2) != null) { if (isInTriangle(ptRet, a1, a2, a3,
	 * vTemp, vTemp2, vTemp3)) return true; } return false; } private static
	 * boolean isInTriangle(Point3f p, Point3f a, Point3f b, Point3f c, Vector3f
	 * v0, Vector3f v1, Vector3f v2) { // from
	 * http://www.blackpawn.com/texts/pointinpoly/default.html // Compute
	 * barycentric coordinates v0.sub(c, a); v1.sub(b, a); v2.sub(p, a); float
	 * dot00 = v0.dot(v0); float dot01 = v0.dot(v1); float dot02 = v0.dot(v2);
	 * float dot11 = v1.dot(v1); float dot12 = v1.dot(v2); float invDenom = 1 /
	 * (dot00 * dot11 - dot01 * dot01); float u = (dot11 * dot02 - dot01 * dot12)
	 * * invDenom; float v = (dot00 * dot12 - dot01 * dot02) * invDenom; return (u
	 * > 0 && v > 0 && u + v < 1); }
	 */

	/**
	 * Closed-form solution of absolute orientation requiring 1:1 mapping of
	 * positions.
	 * 
	 * @param centerAndPoints
	 * @param retStddev
	 * @return unit quaternion representation rotation
	 * 
	 * @author hansonr Bob Hanson
	 * 
	 */
	public static Quat calculateQuaternionRotation(P3[][] centerAndPoints,
			float[] retStddev) {
		/*
		 * see Berthold K. P. Horn,
		 * "Closed-form solution of absolute orientation using unit quaternions" J.
		 * Opt. Soc. Amer. A, 1987, Vol. 4, pp. 629-642
		 * http://www.opticsinfobase.org/viewmedia.cfm?uri=josaa-4-4-629&seq=0
		 * 
		 * 
		 * A similar treatment was developed independently (and later!) by G.
		 * Kramer, in G. R. Kramer,
		 * "Superposition of Molecular Structures Using Quaternions" Molecular
		 * Simulation, 1991, Vol. 7, pp. 113-119.
		 * 
		 * In that treatment there is a lot of unnecessary calculation along the
		 * trace of matrix M (eqn 20). I'm not sure why the extra x^2 + y^2 + z^2 +
		 * x'^2 + y'^2 + z'^2 is in there, but they are unnecessary and only
		 * contribute to larger numerical averaging errors and additional processing
		 * time, as far as I can tell. Adding aI, where a is a scalar and I is the
		 * 4x4 identity just offsets the eigenvalues but doesn't change the
		 * eigenvectors.
		 * 
		 * and Lydia E. Kavraki, "Molecular Distance Measures"
		 * http://cnx.org/content/m11608/latest/
		 */


		retStddev[1] = Float.NaN;
		Quat q = new Quat();
		P3[] ptsA = centerAndPoints[0];
		P3[] ptsB = centerAndPoints[1];
		int nPts = ptsA.length - 1;
		if (nPts < 2 || ptsA.length != ptsB.length)
			return q;
		double Sxx = 0, Sxy = 0, Sxz = 0, Syx = 0, Syy = 0, Syz = 0, Szx = 0, Szy = 0, Szz = 0;
		P3 ptA = new P3();
		P3 ptB = new P3();
		P3 ptA0 = ptsA[0];
		P3 ptB0 = ptsB[0];
		for (int i = nPts + 1; --i >= 1;) {
			ptA.sub2(ptsA[i], ptA0);
			ptB.sub2(ptsB[i], ptB0);
			Sxx += (double) ptA.x * (double) ptB.x;
			Sxy += (double) ptA.x * (double) ptB.y;
			Sxz += (double) ptA.x * (double) ptB.z;
			Syx += (double) ptA.y * (double) ptB.x;
			Syy += (double) ptA.y * (double) ptB.y;
			Syz += (double) ptA.y * (double) ptB.z;
			Szx += (double) ptA.z * (double) ptB.x;
			Szy += (double) ptA.z * (double) ptB.y;
			Szz += (double) ptA.z * (double) ptB.z;
		}
		retStddev[0] = getRmsd(centerAndPoints, q);
		double[][] N = new double[4][4];
		N[0][0] = Sxx + Syy + Szz;
		N[0][1] = N[1][0] = Syz - Szy;
		N[0][2] = N[2][0] = Szx - Sxz;
		N[0][3] = N[3][0] = Sxy - Syx;

		N[1][1] = Sxx - Syy - Szz;
		N[1][2] = N[2][1] = Sxy + Syx;
		N[1][3] = N[3][1] = Szx + Sxz;

		N[2][2] = -Sxx + Syy - Szz;
		N[2][3] = N[3][2] = Syz + Szy;

		N[3][3] = -Sxx - Syy + Szz;

		// this construction prevents JavaScript from requiring preloading of Eigen

		double[] v = ((EigenInterface) Interface.getInterface("javajs.util.Eigen"))
				.setM(N).getEigenvectorsDoubleTransposed()[3];
		q = Quat.newP4(P4.new4((float) v[1], (float) v[2], (float) v[3], (float) v[0]));
		retStddev[1] = getRmsd(centerAndPoints, q);
		return q;
	}

  /**
   * from a list of points, create an array that includes the center
   * point as the first point. This array is used as a starting point for
   * a quaternion analysis of superposition.
   * 
   * @param vPts
   * @return  array of points with first point center
   */
	public static P3[] getCenterAndPoints(Lst<P3> vPts) {
	  int n = vPts.size();
	  P3[] pts = new P3[n + 1];
	  pts[0] = new P3();
	  if (n > 0) {
	    for (int i = 0; i < n; i++) {
	      pts[0].add(pts[i + 1] = vPts.get(i));
	    }
	    pts[0].scale(1f / n);
	  }
	  return pts;
	}

  public static float getRmsd(P3[][] centerAndPoints, Quat q) {
    double sum2 = 0;
    P3[] ptsA = centerAndPoints[0];
    P3[] ptsB = centerAndPoints[1];
    P3 cA = ptsA[0];
    P3 cB = ptsB[0];
    int n = ptsA.length - 1;
    P3 ptAnew = new P3();
    
    for (int i = n + 1; --i >= 1;) {
      ptAnew.sub2(ptsA[i], cA);
      q.transform2(ptAnew, ptAnew).add(cB);
      sum2 += ptAnew.distanceSquared(ptsB[i]);
    }
    return (float) Math.sqrt(sum2 / n);
  }

  /**
   * Get the endpoints of the best line through N points, where N >= 2
   * 
   * @param points
   * @param nPoints
   * @return end points
   */
  public static P3[] getBestLineThroughPoints(P3[] points, int nPoints) {
    if (nPoints <= 0)
      nPoints = points.length;
    if (nPoints <= 2) {
      return points;
    }
    P3 ptA = new P3();
    V3 unitVector = new V3();
    V3 vTemp = new V3();
    calcBestAxisThroughPoints(points, nPoints, ptA, unitVector,
        vTemp, 8);
    return getProjectedLineSegment(points, nPoints, ptA, unitVector, vTemp);
  }

  public static P3[] getProjectedLineSegment(P3[] points, int nPoints,
                                              P3 ptA, V3 unitVector,
                                              V3 vTemp) {
    if (nPoints < 0)
      nPoints = points.length;
    if (vTemp == null)
      vTemp = new V3();
    P3 pmin = null, pmax = null, p; 
    float dmin = Float.MAX_VALUE, dmax = -Float.MAX_VALUE;
    for (int i = 0; i < points.length; i++) {
      projectOntoAxis(p = P3.newP(points[i]), ptA, unitVector, vTemp);
      float d = unitVector.dot(vTemp);
      if (d < dmin) {
        dmin = d;
        pmin = p;
      }
      if (d > dmax) {
        dmax = d;
        pmax = p;
      }
    }
    return new P3[] { pmin, pmax };
  }

  public static boolean isInTriangle(P3 p, P3 a, P3 b, P3 c, V3 v0, V3 v1, V3 v2) { 
    // from http: //www.blackpawn.com/texts/pointinpoly/default.html 
    // Compute   barycentric coordinates 
    v0.sub2(c, a);
    v1.sub2(b, a);
    v2.sub2(p, a);
    float dot00 = v0.dot(v0);
    float dot01 = v0.dot(v1);
    float dot02 = v0.dot(v2);
    float dot11 = v1.dot(v1);
    float dot12 = v1.dot(v2);
    float invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
    float u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    float v = (dot00 * dot12 - dot01 * dot02) * invDenom;
    return (u >= 0 && v >= 0 && u + v <= 1);
  }
  
  /**
   * Calculate the best ax + by + cz + d = 0 plane through a number of points
   * using a three-step check for the best plane based on normal distance. this
   * simple calculation isn't perfect, but it does the job quickly and with no
   * need for a full singular value decomposition.
   * 
   * @param points
   * @param nPoints
   * @param plane
   * @return RMSD for the best plane along with filling the plane itself
   * 
   * @author hansonr 2022.01.26
   */
  public static float calcBestPlaneThroughPoints(P3[] points, int nPoints,
                                                 P4 plane) {
    if (nPoints <= 0) {
      nPoints = points.length;
    }
    if (nPoints == 3) {
      getPlaneThroughPoints(points[0], points[1], points[2], null, null, plane);
      return 0;
    }
    P4 pmin = plane;
    P4 plane2 = new P4();
    P4 plane3;
    float rmsd = calcPlaneForMode(points, nPoints, plane, 'z');
    if (rmsd < 1e-6)
      return rmsd;
    float f2 = calcPlaneForMode(points, nPoints, plane2, 'y');
    if (f2 < rmsd) {
      rmsd = f2;
      pmin = plane2;
      plane3 = plane;
    } else {
      plane3 = plane2;
    }
    if (rmsd >= 1e-6) {
      f2 = calcPlaneForMode(points, nPoints, plane3, 'x');
      if (f2 < rmsd) {
        rmsd = f2;
        pmin = plane3;
      }
    }
    if (pmin != plane) {
      plane.setT(pmin);
      plane.w = pmin.w;
    }
    return rmsd;
  }

  /**
   * Compact calculation of the best pane using a simple method discussed at 
   *    https://stackoverflow.com/questions/12299540/plane-fitting-to-4-or-more-xyz-points
   *    
   * (A^T A)^-1 A^T B
   *
   * run three times to ensure that at least one is not perpendicular.

   * @param points
   * @param nPoints
   * @param plane filled with best plane
   * @param mode
   * @return rmsd
   */
  public static float calcPlaneForMode(P3[] points, int nPoints, P4 plane, char mode) {
    
    double[][] A = new double[nPoints][3];
    double[][] AT = new double[3][nPoints];
    double[][] ATAT = new double[3][nPoints];
    double[][] ATA1 = new double[3][3];
    double[] B = new double[nPoints];
    
    for (int i = nPoints; --i >= 0;) {
      P3 p = points[i];
      A[i][0] = AT[0][i] = (mode == 'x' ? p.z : p.x);
      A[i][1] = AT[1][i] = (mode == 'y' ? p.z : p.y);
      A[i][2] = AT[2][i] = 1;
      B[i] = -(mode == 'y' ? p.y : mode == 'x' ? p.x : p.z);
    }
    M3 m = new M3();
    for (int i = 3; --i >= 0;) {
      for (int j = 3; --j >= 0;) {
        double d = 0;
        for (int k = nPoints; --k >= 0;) {
          d += AT[i][k] * A[k][j];
        }
        m.set33(i, j, (float) d);
      }
    }
    m.invert();
    for (int i = 3; --i >= 0;) {
      for (int j = 3; --j >= 0;) {
        ATA1[i][j] = m.get33(i, j);
      }
    }
    for (int i = 3; --i >= 0;) {
      for (int k = nPoints; --k >= 0;) {
        double d = 0;
      for (int j = 3; --j >= 0;) {
          d += ATA1[i][j] * AT[j][k];
        }
      ATAT[i][k] = d;
      }
    }
    switch (mode) {
    case 'x':
      plane.x = 1;
      break;
    case 'y':
      plane.y = 1;
      break;
    case 'z':
      plane.z = 1;
      break;
    }
    float len2 = 1;
    for (int j = 3; --j >= 0;) {
      double v = 0;
      for (int k = nPoints; --k >= 0;) {
        v += ATAT[j][k]*B[k];
      }
      switch (j) {
      case 0:
        len2 += v * v;
        if (mode == 'x')
          plane.z = (float) v;
        else
          plane.x = (float) v;
        break;
      case 1:
        len2 += v * v;
        if (mode == 'y')
          plane.z = (float) v;
        else 
          plane.y = (float) v;
        break;
      case 2:
        plane.w = (float) v;
      }
    }
    float f = (float) Math.sqrt(len2);
    plane.scale4((1/plane.w > 0 ? 1 : -1)/f);
    float sum2 = 0;
    for (int i = 0; i < nPoints; i++) {
      float d = distanceToPlane(plane, points[i]);
      sum2 += d*d;
    }
    float ret = (float) Math.sqrt(sum2 / nPoints);
    return ret;
  }

  static P3 rndPt() {
    return P3.new3((float) Math.random()*20,(float) (Math.random()*20),(float) (Math.random()*20) );
  }
  static void testRnd() {
    P4 plane = P4.new4((float) Math.random()*20, (float) Math.random()*20, (float) Math.random()*20, (float) Math.random()*20);
    plane.scale4(1/plane.length());
    System.out.println("\n==========\n ");
    System.out.println("plane is " + plane);
    P3 ptProj = new P3();
    V3 vNorm = new V3();
    P3[] pts = new P3[4];
    for (int i = 0; i < pts.length; i++) {
      pts[i] = new P3();
      P3 p = rndPt();
      getPlaneProjection(p, plane, ptProj, vNorm );
      pts[i].setT(ptProj);
      float d = (float)Math.random()*0.1f;
      pts[i].scaleAdd2(d, vNorm, ptProj);
      System.out.println(pts[i] + " d=" + d);
    }
    P4 p2 = new P4();
    float f = calcBestPlaneThroughPoints(pts, -1, p2);
    System.out.println("found " + p2 + " rmsd = " + f);
  }
  
  
  
  static public void test() {
    for (int i = 0; i < 10; i++)
      testRnd();
    System.exit(0);
  }

  /**
   * Based on a set of centering points, returns the list of points on a given
   * plane.
   * 
   * @param pts
   *        initial list centering points such as {1/2 1/2 0}
   * @param plane
   * @return non-null list
   */
  public static Lst<P3> getPointsOnPlane(P3[] pts, P4 plane) {
    Lst<P3> ret = new Lst<P3>();
    for (int i = pts.length; --i >= 0;) {
      float d = Math.abs(Measure.distanceToPlane(plane, pts[i]));
      if (d < 0.001f) {
        ret.addLast(pts[i]);
      }
    }
    return ret;
  }

  /**
   * Based on a set of centering points, creates a list of lattice points in place.
   * 
   * @param cpts centering points such as {1/2 1/2 0}
   * @param h
   * @param k
   * @param l
   * @return non-null list
*/
  public static Lst<P3> getLatticePoints(Lst<P3> cpts, int h, int k, int l) {
    cpts.addLast(new P3());
    h = (h == 0 ? 1 : Math.abs(h));
    k = (k == 0 ? 1 : Math.abs(k));
    l = (l == 0 ? 1 : Math.abs(l));
    int n = cpts.size();
    for (int ih = -h; ih <= h; ih++) {
      for (int ik = -k; ik <= k; ik++) {
        for (int il = -l; il <= l; il++) {
          for (int i = 0; i < n; i++) {
            P3 pt = P3.new3(ih, ik, il);
            pt.add(cpts.get(i));
            cpts.addLast(pt);
          }
        }
      }
    }
    for (int i = n; --i >= 0;)
      cpts.removeItemAt(i);
    return cpts;
  }

}
