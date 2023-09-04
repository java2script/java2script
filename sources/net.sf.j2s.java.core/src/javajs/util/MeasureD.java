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

final public class MeasureD {

  public final static double radiansPerDegree = (2 * Math.PI / 360);
  
  public static double computeAngle(T3d pointA, T3d pointB, T3d pointC, V3d vectorBA, V3d vectorBC, boolean asDegrees) {
    vectorBA.sub2(pointA, pointB);
    vectorBC.sub2(pointC, pointB);
    double angle = vectorBA.angle(vectorBC);
    return (asDegrees ? angle / radiansPerDegree : angle);
  }

  public static double computeAngleABC(T3d pointA, T3d pointB, T3d pointC, boolean asDegrees) {
    V3d vectorBA = new V3d();
    V3d vectorBC = new V3d();        
    return computeAngle(pointA, pointB, pointC, vectorBA, vectorBC, asDegrees);
  }

  public static double computeTorsion(T3d p1, T3d p2, T3d p3, T3d p4, boolean asDegrees) {
  
    double ijx = p1.x - p2.x;
    double ijy = p1.y - p2.y;
    double ijz = p1.z - p2.z;
  
    double kjx = p3.x - p2.x;
    double kjy = p3.y - p2.y;
    double kjz = p3.z - p2.z;
  
    double klx = p3.x - p4.x;
    double kly = p3.y - p4.y;
    double klz = p3.z - p4.z;
  
    double ax = ijy * kjz - ijz * kjy;
    double ay = ijz * kjx - ijx * kjz;
    double az = ijx * kjy - ijy * kjx;
    double cx = kjy * klz - kjz * kly;
    double cy = kjz * klx - kjx * klz;
    double cz = kjx * kly - kjy * klx;
  
    double ai2 = 1d / (ax * ax + ay * ay + az * az);
    double ci2 = 1d / (cx * cx + cy * cy + cz * cz);
  
    double ai = Math.sqrt(ai2);
    double ci = Math.sqrt(ci2);
    double denom = ai * ci;
    double cross = ax * cx + ay * cy + az * cz;
    double cosang = cross * denom;
    if (cosang > 1) {
      cosang = 1;
    }
    if (cosang < -1) {
      cosang = -1;
    }
  
    double torsion = Math.acos(cosang);
    double dot = ijx * cx + ijy * cy + ijz * cz;
    double absDot = Math.abs(dot);
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
  public static T3d[] computeHelicalAxis(P3d a, P3d b, Qd dq) {
    
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

    V3d vab = V3d.newVsub(b, a);
    /*
     * testing here to see if directing the normal makes any difference -- oddly
     * enough, it does not. When n = -n and theta = -theta vab.n is reversed,
     * and that magnitude is multiplied by n in generating the A'-B' vector.
     * 
     * a negative angle implies a left-handed axis (sheets)
     */
    double theta = dq.getTheta();
    V3d n = dq.getNormal();
    double v_dot_n = vab.dot(n);
    if (Math.abs(v_dot_n) < 0.0001)
      v_dot_n = 0;
    V3d va_prime_d = new V3d();
    va_prime_d.cross(vab, n);
    if (va_prime_d.dot(va_prime_d) != 0)
      va_prime_d.normalize();
    V3d vda = new V3d();
    V3d vcb = V3d.newV(n);
    if (v_dot_n == 0)
      v_dot_n = 2E-45; // allow for perpendicular axis to vab
    vcb.scale(v_dot_n);
    vda.sub2(vcb, vab);
    vda.scale(0.5d);
    va_prime_d.scale(theta == 0 ? 0 : (vda.length() / Math.tan(theta
        / 2 / 180 * Math.PI)));
    V3d r = V3d.newV(va_prime_d);
    if (theta != 0)
      r.add(vda);
    P3d pt_a_prime = P3d.newP(a);
    pt_a_prime.sub(r);
    // already done this. ??
    if (v_dot_n != 2E-45)
      n.scale(v_dot_n);
    // must calculate directed angle:
    P3d pt_b_prime = P3d.newP(pt_a_prime);
    pt_b_prime.add(n);
    theta = computeTorsion(a, pt_a_prime, pt_b_prime, b, true);
    if (Double.isNaN(theta) || r.length() < 0.0001)
      theta = dq.getThetaDirectedV(n); // allow for r = 0
    // anything else is an array
    double residuesPerTurn = Math.abs(theta == 0 ? 0 : 360f / theta);
    double pitch = Math.abs(v_dot_n == 2E-45 ? 0 : n.length()
        * (theta == 0 ? 1 : 360.0 / theta));
    return new T3d[] { pt_a_prime, n, r, P3d.new3(theta, pitch, residuesPerTurn), pt_b_prime };
  }

  public static P4d getPlaneThroughPoints(T3d pointA,
                                              T3d pointB,
                                              T3d pointC, V3d vNorm,
                                              V3d vAB, P4d plane) {
    if (vNorm == null)
      vNorm = new V3d();
    if (vAB == null)
      vAB = new V3d();
    double w = getNormalThroughPoints(pointA, pointB, pointC, vNorm, vAB);
    plane.set4(vNorm.x, vNorm.y, vNorm.z, w);
    return plane;
  }
  
  public static void getPlaneThroughPoint(T3d pt, V3d normal, P4d plane) {
    plane.set4(normal.x, normal.y, normal.z, -normal.dot(pt));
  }
  
  public static double distanceToPlane(P4d plane, T3d pt) {
    return (plane == null ? Double.NaN 
        : (plane.dot(pt) + plane.w) / Math.sqrt(plane.dot(plane)));
  }

  public static double directedDistanceToPlane(P3d pt, P4d plane, P3d ptref) {
    double f = plane.dot(pt) + plane.w;
    double f1 = plane.dot(ptref) + plane.w;
    return Math.signum(f1) * f /  Math.sqrt(plane.dot(plane));
  }

  public static double distanceToPlaneD(P4d plane, double d, P3d pt) {
    return (plane == null ? Double.NaN : (plane.dot(pt) + plane.w) / d);
  }

  public static double distanceToPlaneV(V3d norm, double w, P3d pt) {
    return (norm == null ? Double.NaN 
        : (norm.dot(pt) + w)  / Math.sqrt(norm.dot(norm)));
  }

  /**
   * note that if vAB or vAC is dispensible, vNormNorm can be one of them
   * @param pointA
   * @param pointB
   * @param pointC
   * @param vNormNorm
   * @param vAB
   */
  public static void calcNormalizedNormal(T3d pointA, T3d pointB,
         T3d pointC, T3d vNormNorm, T3d vAB) {
    vAB.sub2(pointB, pointA);
    vNormNorm.sub2(pointC, pointA);
    vNormNorm.cross(vAB, vNormNorm);
    vNormNorm.normalize();
  }

  public static double getDirectedNormalThroughPoints(T3d pointA, 
         T3d pointB, T3d pointC, T3d ptRef, V3d vNorm, 
         V3d vAB) {
    // for x = plane({atomno=1}, {atomno=2}, {atomno=3}, {atomno=4})
    double nd = getNormalThroughPoints(pointA, pointB, pointC, vNorm, vAB);
    if (ptRef != null) {
      P3d pt0 = P3d.newP(pointA);
      pt0.add(vNorm);
      double d = pt0.distance(ptRef);
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
  public static double getNormalThroughPoints(T3d pointA, T3d pointB,
                                   T3d pointC, T3d vNorm, T3d vTemp) {
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
  public static double getPlaneProjection(T3d pt, P4d plane, T3d retPtProj, V3d retNorm) {
    double dist = distanceToPlane(plane, pt);
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
  public static boolean getNormalFromCenter(P3d ptCenter, P3d ptA, P3d ptB, P3d ptC,
                                      boolean isOutward, V3d normal, V3d vTemp) {
    double d = getNormalThroughPoints(ptA, ptB, ptC, normal, vTemp);
    boolean isReversed = (distanceToPlaneV(normal, d, ptCenter) > 0);
    if (isReversed == isOutward)
      normal.scale(-1d);
    return !isReversed;
  }

  public final static V3d axisY = V3d.new3(0, 1, 0);
  
  public static void getNormalToLine(P3d pointA, P3d pointB,
                                   V3d vNormNorm) {
    // vector in xy plane perpendicular to a line between two points RMH
    vNormNorm.sub2(pointA, pointB);
    vNormNorm.cross(vNormNorm, axisY);
    vNormNorm.normalize();
    if (Double.isNaN(vNormNorm.x))
      vNormNorm.set(1, 0, 0);
  }
  
  public static void getBisectingPlane(P3d pointA, V3d vAB,
                                                 T3d ptTemp, V3d vTemp, P4d plane) {
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
   * @return distance moved
   */
  public static double projectOntoAxis(P3d pt, P3d ptA,
                                     V3d axisUnitVector,
                                     V3d vectorProjection) {
    vectorProjection.sub2(pt, ptA);
    double projectedLength = vectorProjection.dot(axisUnitVector);
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
  public static void calcBestAxisThroughPoints(P3d[] points, int nPoints, P3d axisA,
                                               V3d axisUnitVector,
                                               V3d vectorProjection,
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

    P3d tempA = P3d.newP(points[0]);
    projectOntoAxis(tempA, axisA, axisUnitVector, vectorProjection);
    axisA.setT(tempA);
  }

  public static double findAxis(P3d[] points, int nPoints, P3d axisA,
                        V3d axisUnitVector, V3d vectorProjection) {
    V3d sumXiYi = new V3d();
    V3d vTemp = new V3d();
    P3d pt = new P3d();
    P3d ptProj = new P3d();
    V3d a = V3d.newV(axisUnitVector);

    double sum_Xi2 = 0;
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
    V3d m = V3d.newV(sumXiYi);
    m.scale(1 / sum_Xi2);
    vTemp.cross(m, axisUnitVector);
    axisUnitVector.add(vTemp);
    axisUnitVector.normalize();  
    //check for change in direction by measuring vector difference length
    vTemp.sub2(axisUnitVector, a);
    return vTemp.length();
  }
  
  
  public static void calcAveragePoint(P3d pointA, P3d pointB,
                                      P3d pointC) {
    pointC.set((pointA.x + pointB.x) / 2, (pointA.y + pointB.y) / 2,
        (pointA.z + pointB.z) / 2);
  }
  
  public static void calcAveragePointN(P3d[] points, int nPoints,
                                P3d averagePoint) {
    averagePoint.setT(points[0]);
    for (int i = 1; i < nPoints; i++)
      averagePoint.add(points[i]);
    averagePoint.scale(1d / nPoints);
  }

  public static boolean isInTetrahedron(P3d pt, P3d ptA, P3d ptB,
                                        P3d ptC, P3d ptD,
                                        P4d plane, V3d vTemp,
                                        V3d vTemp2, boolean fullyEnclosed) {
    boolean b = (distanceToPlane(getPlaneThroughPoints(ptC, ptD, ptA, vTemp, vTemp2, plane), pt) >= 0);
    if (b != (distanceToPlane(getPlaneThroughPoints(ptA, ptD, ptB, vTemp, vTemp2, plane), pt) >= 0))
      return false;
    if (b != (distanceToPlane(getPlaneThroughPoints(ptB, ptD, ptC, vTemp, vTemp2, plane), pt) >= 0))
      return false;
    double d = distanceToPlane(getPlaneThroughPoints(ptA, ptB, ptC, vTemp, vTemp2, plane), pt);
    if (fullyEnclosed)
      return (b == (d >= 0));
    double d1 = distanceToPlane(plane, ptD);
    return d1 * d <= 0 || Math.abs(d1) > Math.abs(d);
  }


  /**
   * Calculate the line that is the intersection of two planes.
   * 
   * @param plane1
   * @param plane2
   * @return       [ point, vector ] or []
   */
  public static Lst<Object> getIntersectionPP(P4d plane1, P4d plane2) {
    double a1 = plane1.x;
    double b1 = plane1.y;
    double c1 = plane1.z;
    double d1 = plane1.w;
    double a2 = plane2.x;
    double b2 = plane2.y;
    double c2 = plane2.z;
    double d2 = plane2.w;
    V3d norm1 = V3d.new3(a1, b1, c1);
    V3d norm2 = V3d.new3(a2, b2, c2);
    V3d nxn = new V3d();
    nxn.cross(norm1, norm2);
    double ax = Math.abs(nxn.x);
    double ay = Math.abs(nxn.y);
    double az = Math.abs(nxn.z);
    double x, y, z, diff;
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
    list.addLast(P3d.new3(x, y, z));
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
  public static P3d getIntersection(P3d pt1, V3d v,
                                               P4d plane, P3d ptRet, V3d tempNorm, V3d vTemp) {
    getPlaneProjection(pt1, plane, ptRet, tempNorm);
    tempNorm.set(plane.x, plane.y, plane.z);
    tempNorm.normalize();
    if (v == null)
      v = V3d.newV(tempNorm);
    double l_dot_n = v.dot(tempNorm);
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
	 * barycentric coordinates v0.sub(c, a); v1.sub(b, a); v2.sub(p, a); double
	 * dot00 = v0.dot(v0); double dot01 = v0.dot(v1); double dot02 = v0.dot(v2);
	 * double dot11 = v1.dot(v1); double dot12 = v1.dot(v2); double invDenom = 1 /
	 * (dot00 * dot11 - dot01 * dot01); double u = (dot11 * dot02 - dot01 * dot12)
	 * * invDenom; double v = (dot00 * dot12 - dot01 * dot02) * invDenom; return (u
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
	public static Qd calculateQuaternionRotation(P3d[][] centerAndPoints,
			double[] retStddev) {
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


		retStddev[1] = Double.NaN;
		Qd q = new Qd();
		P3d[] ptsA = centerAndPoints[0];
		P3d[] ptsB = centerAndPoints[1];
		int nPts = ptsA.length - 1;
		if (nPts < 2 || ptsA.length != ptsB.length)
			return q;
		double Sxx = 0, Sxy = 0, Sxz = 0, Syx = 0, Syy = 0, Syz = 0, Szx = 0, Szy = 0, Szz = 0;
		P3d ptA = new P3d();
		P3d ptB = new P3d();
		P3d ptA0 = ptsA[0];
		P3d ptB0 = ptsB[0];
		for (int i = nPts + 1; --i >= 1;) {
			ptA.sub2(ptsA[i], ptA0);
			ptB.sub2(ptsB[i], ptB0);
			Sxx += ptA.x * ptB.x;
			Sxy += ptA.x * ptB.y;
			Sxz += ptA.x * ptB.z;
			Syx += ptA.y * ptB.x;
			Syy += ptA.y * ptB.y;
			Syz += ptA.y * ptB.z;
			Szx += ptA.z * ptB.x;
			Szy += ptA.z * ptB.y;
			Szz += ptA.z * ptB.z;
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
		q = Qd.newP4(P4d.new4(v[1], v[2], v[3], v[0]));
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
	public static P3d[] getCenterAndPoints(Lst<P3d> vPts) {
	  int n = vPts.size();
	  P3d[] pts = new P3d[n + 1];
	  pts[0] = new P3d();
	  if (n > 0) {
	    for (int i = 0; i < n; i++) {
	      pts[0].add(pts[i + 1] = vPts.get(i));
	    }
	    pts[0].scale(1d / n);
	  }
	  return pts;
	}

  public static double getRmsd(P3d[][] centerAndPoints, Qd q) {
    double sum2 = 0;
    P3d[] ptsA = centerAndPoints[0];
    P3d[] ptsB = centerAndPoints[1];
    P3d cA = ptsA[0];
    P3d cB = ptsB[0];
    int n = ptsA.length - 1;
    P3d ptAnew = new P3d();
    
    for (int i = n + 1; --i >= 1;) {
      ptAnew.sub2(ptsA[i], cA);
      q.transform2(ptAnew, ptAnew).add(cB);
      sum2 += ptAnew.distanceSquared(ptsB[i]);
    }
    return Math.sqrt(sum2 / n);
  }

  /**
   * Get the endpoints of the best line through N points, where N >= 2
   * 
   * @param points
   * @param nPoints
   * @return end points
   */
  public static P3d[] getBestLineThroughPoints(P3d[] points, int nPoints) {
    if (nPoints <= 0)
      nPoints = points.length;
    if (nPoints <= 2) {
      return points;
    }
    P3d ptA = new P3d();
    V3d unitVector = new V3d();
    V3d vTemp = new V3d();
    calcBestAxisThroughPoints(points, nPoints, ptA, unitVector,
        vTemp, 8);
    return getProjectedLineSegment(points, nPoints, ptA, unitVector, vTemp);
  }

  public static P3d[] getProjectedLineSegment(P3d[] points, int nPoints,
                                              P3d ptA, V3d unitVector,
                                              V3d vTemp) {
    if (nPoints < 0)
      nPoints = points.length;
    if (vTemp == null)
      vTemp = new V3d();
    P3d pmin = null, pmax = null, p; 
    double dmin = Double.MAX_VALUE, dmax = -Double.MAX_VALUE;
    for (int i = 0; i < points.length; i++) {
      projectOntoAxis(p = P3d.newP(points[i]), ptA, unitVector, vTemp);
      double d = unitVector.dot(vTemp);
      if (d < dmin) {
        dmin = d;
        pmin = p;
      }
      if (d > dmax) {
        dmax = d;
        pmax = p;
      }
    }
    return new P3d[] { pmin, pmax };
  }

  public static boolean isInTriangle(P3d p, P3d a, P3d b, P3d c, V3d v0, V3d v1, V3d v2) { 
    // from http: //www.blackpawn.com/texts/pointinpoly/default.html 
    // Compute   barycentric coordinates 
    v0.sub2(c, a);
    v1.sub2(b, a);
    v2.sub2(p, a);
    double dot00 = v0.dot(v0);
    double dot01 = v0.dot(v1);
    double dot02 = v0.dot(v2);
    double dot11 = v1.dot(v1);
    double dot12 = v1.dot(v2);
    double invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
    double u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    double v = (dot00 * dot12 - dot01 * dot02) * invDenom;
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
  public static double calcBestPlaneThroughPoints(P3d[] points, int nPoints,
                                                 P4d plane) {
    if (nPoints <= 0) {
      nPoints = points.length;
    }
    if (nPoints == 3) {
      getPlaneThroughPoints(points[0], points[1], points[2], null, null, plane);
      return 0;
    }
    P4d pmin = plane;
    P4d plane2 = new P4d();
    P4d plane3;
    double rmsd = calcPlaneForMode(points, nPoints, plane, 'z');
    if (rmsd < 1e-6)
      return rmsd;
    double f2 = calcPlaneForMode(points, nPoints, plane2, 'y');
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
  public static double calcPlaneForMode(P3d[] points, int nPoints, P4d plane, char mode) {
    
    double[][] A = new double[nPoints][3];
    double[][] AT = new double[3][nPoints];
    double[][] ATAT = new double[3][nPoints];
    double[][] ATA1 = new double[3][3];
    double[] B = new double[nPoints];
    
    for (int i = nPoints; --i >= 0;) {
      P3d p = points[i];
      A[i][0] = AT[0][i] = (mode == 'x' ? p.z : p.x);
      A[i][1] = AT[1][i] = (mode == 'y' ? p.z : p.y);
      A[i][2] = AT[2][i] = 1;
      B[i] = -(mode == 'y' ? p.y : mode == 'x' ? p.x : p.z);
    }
    M3d m = new M3d();
    for (int i = 3; --i >= 0;) {
      for (int j = 3; --j >= 0;) {
        double d = 0;
        for (int k = nPoints; --k >= 0;) {
          d += AT[i][k] * A[k][j];
        }
        m.set33(i, j, d);
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
    double len2 = 1;
    for (int j = 3; --j >= 0;) {
      double v = 0;
      for (int k = nPoints; --k >= 0;) {
        v += ATAT[j][k]*B[k];
      }
      switch (j) {
      case 0:
        len2 += v * v;
        if (mode == 'x')
          plane.z = v;
        else
          plane.x = v;
        break;
      case 1:
        len2 += v * v;
        if (mode == 'y')
          plane.z = v;
        else 
          plane.y = v;
        break;
      case 2:
        plane.w = v;
      }
    }
    double f = Math.sqrt(len2);
    plane.scale4((1/plane.w > 0 ? 1 : -1)/f);
    double sum2 = 0;
    for (int i = 0; i < nPoints; i++) {
      double d = distanceToPlane(plane, points[i]);
      sum2 += d*d;
    }
    double ret = Math.sqrt(sum2 / nPoints);
    return ret;
  }

  static P3d rndPt() {
    return P3d.new3(Math.random()*20,(Math.random()*20),(Math.random()*20) );
  }
  static void testRnd() {
    P4d plane = P4d.new4(Math.random()*20, Math.random()*20, Math.random()*20, Math.random()*20);
    plane.scale4(1/plane.length());
    System.out.println("\n==========\n ");
    System.out.println("plane is " + plane);
    P3d ptProj = new P3d();
    V3d vNorm = new V3d();
    P3d[] pts = new P3d[4];
    for (int i = 0; i < pts.length; i++) {
      pts[i] = new P3d();
      P3d p = rndPt();
      getPlaneProjection(p, plane, ptProj, vNorm );
      pts[i].setT(ptProj);
      double d = Math.random()*0.1d;
      pts[i].scaleAdd2(d, vNorm, ptProj);
      System.out.println(pts[i] + " d=" + d);
    }
    P4d p2 = new P4d();
    double f = calcBestPlaneThroughPoints(pts, -1, p2);
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
  public static Lst<P3d> getPointsOnPlane(P3d[] pts, P4d plane) {
    Lst<P3d> ret = new Lst<P3d>();
    for (int i = pts.length; --i >= 0;) {
      double d = Math.abs(MeasureD.distanceToPlane(plane, pts[i]));
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
  public static Lst<P3d> getLatticePoints(Lst<P3d> cpts, int h, int k, int l) {
    cpts.addLast(new P3d());
    h = (h == 0 ? 1 : Math.abs(h));
    k = (k == 0 ? 1 : Math.abs(k));
    l = (l == 0 ? 1 : Math.abs(l));
    int n = cpts.size();
    for (int ih = -h; ih <= h; ih++) {
      for (int ik = -k; ik <= k; ik++) {
        for (int il = -l; il <= l; il++) {
          for (int i = 0; i < n; i++) {
            P3d pt = P3d.new3(ih, ik, il);
            pt.add(cpts.get(i));
            cpts.addLast(pt);
          }
        }
      }
    }
    for (int i = n; --i >= 0;)
      cpts.removeItemAt(0);
    return cpts;
  }

}
