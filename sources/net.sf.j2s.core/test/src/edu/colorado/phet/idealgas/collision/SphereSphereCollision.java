// Copyright 2002-2012, University of Colorado

/**
 * Class: SphereSphereCollision
 * Class: edu.colorado.phet.physics.collision
 * User: Ron LeMaster
 * Date: Apr 4, 2003
 * Time: 10:28:08 AM
 */
package edu.colorado.phet.idealgas.collision;

import java.awt.geom.Point2D;
import java.awt.geom.Point2D.Double;

import edu.colorado.phet.common.phetcommon.math.MathUtil;
import edu.colorado.phet.common.phetcommon.math.vector.MutableVector2D;

/**
 * Note: This class is not thread-safe!!!!!
 */
public class SphereSphereCollision implements Collision {
//public class SphereSphereCollision extends HardsphereCollision {

    SphericalBody sphereA;  // BH minimizing new
    SphericalBody sphereB;  // must not be the hollow sphere

    public SphereSphereCollision() {
    }

    private Point2D.Double contactPt = new Point2D.Double();
    private Point2D.Double linePt = new Point2D.Double();
    private MutableVector2D vRel = new MutableVector2D();
    private MutableVector2D n = new MutableVector2D();

	// private MutableVector2D tangentVector = new MutableVector2D(); // BH
	// unneces.

	@Override
	public void collide() {
		Double posA = sphereA.getPosition();
		Double posB = sphereB.getPosition();

		Point2D prevPosA = sphereA.getPositionPrev();
		Point2D prevPosB = sphereB.getPositionPrev();

		double rA = sphereA.getRadius();
		double rB = sphereB.getRadius();
		double dx = posA.x - posB.x;
		double dy = posA.y - posB.y;
		double tangentAngle = Math.atan2(-dx, dy);
		// tangentVector.setComponents(dy, -dx);

		// Get the unit vector along the line of action
		n.setComponents(dx, dy);
		n.normalize();

		// Get the contact point

		double dist = MathUtil.getDistance(posA, posB);
		double ratio = rA / dist;
		double cx = contactPt.x = posA.x - dx * ratio;
		double cy = contactPt.y = posA.y - dy * ratio;

		// If the relative velocity show the points moving apart, then there is no
		// collision.
		// This is a key check to solve otherwise sticky collision problems

		double vxa = sphereA.getVelocity().getX();
		double vya = sphereA.getVelocity().getY();
		double vxb = sphereB.getVelocity().getX();
		double vyb = sphereB.getVelocity().getY();
		vRel.setComponents(vxa - vxb, vya - vyb);

		// todo:!!!!!
		// if( vRel.dot( n ) <= 0 ) {

		// Compute correct position of the bodies following the collision

		// Determine the proper positions of the bodies following the collision
		// BH unused double prevDistB = MathUtil.getDistance(prevPosB, contactPt);
		// BH unused double sB = rB / prevDistB;
		// Point2D.Double linePtB = new Point2D.Double( contactPt.getX() -
		// (contactPt.getX() - prevPosB.getX()) * sB,
		// contactPt.getY() - (contactPt.getY() - prevPosB.getY()) * sB );
		double offsetB = (MathUtil.getDistance(prevPosB, prevPosA) < rA ? -rB : rB);
		double offsetXB = n.getX() * offsetB;
		double offsetYB = n.getY() * offsetB;
		linePt.x = cx - offsetXB;
		linePt.y = cy - offsetYB;
		MathUtil.reflectPointAcrossLinePt(posB, linePt, tangentAngle, posB);

		// todo: The determination of the sign of the offset is wrong. It should be
		// based on which side of the contact
		// tangent the CM was on in its previous position

		double prevDistA = MathUtil.getDistance(prevPosA, contactPt);
		double sA = rA / prevDistA;
		linePt.x = cx - (cx - prevPosA.getX()) * sA;
		linePt.y = cy - (cy - prevPosA.getY()) * sA;

		// BH unused double offsetA = -this.sphereA.getRadius();
		// double offsetA = this.sphereB.getPositionPrev().distance(
		// this.sphereA.getPositionPrev() ) < this.sphereA.getRadius() ?
		// -this.sphereA.getRadius() : this.sphereA.getRadius();
		// BH unused double offsetXA = ( n.getX() * offsetA );
		// BH unused double offsetYA = ( n.getY() * offsetA );
		// Point2D.Double linePtA = new Point2D.Double( contactPt.getX() - offsetXA,
		// contactPt.getY() - offsetYA );

		MathUtil.reflectPointAcrossLinePt(posA, linePt, tangentAngle, posA);

		// Compute the relative velocities of the contact points
		double vr = vRel.dot(n);

		// Assume the coefficient of restitution is 1
		float e = 1;

		// Compute the impulse, j
		double numerator = -vr * (1 + e);

		double ma = sphereA.getMass();
		double mb = sphereB.getMass();
		double denominator = (1 / ma + 1 / mb);
		double j = numerator / denominator;

		// Compute the new linear and angular velocities, based on the impulse
		sphereA.getVelocity().addXY(n.getX() * j / ma, n.getY() * j / ma);
		sphereB.getVelocity().addXY(n.getX() * -j / mb, n.getY() * -j / mb);

		// }
	}
}
