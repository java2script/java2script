// Copyright 2002-2011, University of Colorado

/**
 * Class: SphereHollowSphereContactDetector
 * Class: edu.colorado.phet.collision
 * User: Ron LeMaster
 * Date: Sep 19, 2004
 * Time: 8:32:34 PM
 */
package edu.colorado.phet.idealgas.collision;

import edu.colorado.phet.common.phetcommon.math.MathUtil;
import edu.colorado.phet.idealgas.model.HollowSphere;

public class SphereHollowSphereContactDetector implements ContactDetector {

	@Override
	public boolean areInContact(CollidableBody bodyA, CollidableBody bodyB) {

		if (!applies(bodyA, bodyB)) {
			return false;
		}

		SphericalBody sphere = (SphericalBody) bodyA;
		HollowSphere hollowSphere = (HollowSphere) bodyB;
		// BH Optimized out unnecessary check for body type -- just need to be
		// careful here

		double dist2 = MathUtil.getDistanceSq(sphere.getPosition(),
				hollowSphere.getPosition()); // BH optimized out getDistance
		double dist2Prev = MathUtil.getDistanceSq(sphere.getPositionPrev(),
				hollowSphere.getPositionPrev());
		double radH = hollowSphere.getRadius();
		double r2 = sphere.getCollidableRange2Sum(radH); // BH optimized logic
		boolean result = (dist2 <= r2 && dist2Prev > r2 
				|| dist2 >= (r2 = sphere.getCollidableRange2Diff(radH)) && dist2Prev < r2);
//		if (Math.sqrt(dist2) > radH && Math.sqrt(dist2Prev) < radH)
//			System.out.println("test sphereHAB " + result + " " + radH + " " +  Math.sqrt(dist2) + " " + Math.sqrt(dist2Prev)
//					+ " " + Math.sqrt(sphere.getCollidableRange2Sum(radH))
//			 + " " + Math.sqrt(sphere.getCollidableRange2Diff(radH)));
//		if (result)
//			System.out.println("test sphereHAB");
		return result;

		// double distPrev = sphere.getPositionBeforeTimeStep().distance(
		// hollowSphere.getPositionBeforeTimeStep() );
		// boolean movedOut = ( dist >= r && distPrev < r );
		// boolean movedIn = ( dist <= r && distPrev > r );
		// result = ( movedOut || movedIn );
		// return result;

		// double distSq = sphere.getPosition().distanceSq(
		// hollowSphere.getPosition() );
		// double distPrevSq = sphere.getPositionPrev().distanceSq(
		// hollowSphere.getPositionPrev() );
		// double radSq = hollowSphere.getRadius() * hollowSphere.getRadius();
		//
		// // Account for the radius of the sphere
		// distSq += distSq < radSq ? sphere.getRadius() : -sphere.getRadius();
		// distPrevSq += distPrevSq < radSq ? sphere.getRadius() :
		// -sphere.getRadius();

		// if( ( distSq > radSq && distPrevSq < radSq )
		// || ( distSq < radSq && distPrevSq > radSq ) ) {
		// result = true;
		// }
	}

	@Override
	public boolean applies(CollidableBody bodyA, CollidableBody bodyB) {
		return ((bodyA.type & CollidableBody.TYPE_SPHERICAL_BODY) == CollidableBody.TYPE_SPHERICAL_BODY 
				&& (bodyB.type & CollidableBody.TYPE_HOLLOW_SPHERE) == CollidableBody.TYPE_HOLLOW_SPHERE);
	}
}
