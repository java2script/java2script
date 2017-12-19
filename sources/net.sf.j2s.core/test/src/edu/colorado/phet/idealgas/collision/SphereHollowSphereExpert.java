// Copyright 2002-2011, University of Colorado

/**
 * Class: SphereHollowSphereExpert
 * Package: edu.colorado.phet.collision
 * Author: Another Guy
 * Date: Sep 21, 2004
 */
package edu.colorado.phet.idealgas.collision;

import edu.colorado.phet.idealgas.model.HollowSphere;

public class SphereHollowSphereExpert implements CollisionExpert {

    private ContactDetector detector = new SphereHollowSphereContactDetector();
		private SphereSphereCollision collision;

	@Override
	public boolean detectAndDoCollision(CollidableBody bodyA, CollidableBody bodyB) {
		if (!detector.applies(bodyA, bodyB))
			return false;
		boolean haveCollided = false;

 		if (detector.areInContact(bodyA, bodyB)) {
			doCollide(bodyA, bodyB);
			haveCollided = true;
		}

	SphericalBody sphere = (SphericalBody) bodyA;
	HollowSphere hollowSphere = (HollowSphere) bodyB;

//		// Check containment
//		
//		double dist = MathUtil.getDistance(hollowSphere.getPosition(),
//				sphere.getPosition());
//		double sr = sphere.getRadius();
//		double hr = hollowSphere.getRadius();
//		boolean movingOut = false;
//		boolean containsBody = hollowSphere.containsBody(sphere); 
//		if (containsBody ? (movingOut = (dist > hr - sr)) : dist < hr + sr) {
//			if (movingOut) {
//				if (Math.abs(dist - hr) > 10)
//				System.out.println("SHSE " + (dist - hr));
//				System.out.println("DDD");
//			} else {
//				System.out.println("SHSE moving in");
//			}
//			doCollide(bodyA, bodyB);
//			haveCollided = true;
//		}

		// If a collision occurred, tell the balloon so it can adjust its radius
		if (haveCollided)
			hollowSphere.collideWithParticle(sphere);
		// we need to do this even if there is not a collision
//		if (haveCollided)
//			hollowSphere.checkContainment(sphere, hollowSphere.containsBody(sphere));

		return haveCollided;
	}

	private void doCollide(CollidableBody bodyA, CollidableBody bodyB) {
		if (collision == null)
			collision = new SphereSphereCollision();
		collision.sphereA = (SphericalBody) bodyB;
		collision.sphereB = (SphericalBody) bodyA; // BH cannot have 
		collision.collide();
	}

	@Override
	public int getType() {
		return CollidableBody.TYPE_HOLLOW_SPHERE  | CollidableBody.TYPE_SPHERICAL_BODY;
	}

}