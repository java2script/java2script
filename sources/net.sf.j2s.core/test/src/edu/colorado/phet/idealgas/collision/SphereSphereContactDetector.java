// Copyright 2002-2011, University of Colorado

/**
 * Class: SphereSphereContactDetector
 * Package: edu.colorado.phet.lasers.physics.collision
 * Author: Another Guy
 * Date: Mar 26, 2003
 */
package edu.colorado.phet.idealgas.collision;

import java.awt.geom.Point2D.Double;

import edu.colorado.phet.common.phetcommon.math.MathUtil;

public class SphereSphereContactDetector implements ContactDetector {

    @Override
		public boolean applies( CollidableBody bodyA, CollidableBody bodyB ) {
    	return ((bodyA.type & bodyB.type & CollidableBody.TYPE_SOLID_SPHERE) == CollidableBody.TYPE_SOLID_SPHERE); 
    }

	/**
	 * 
	 * @param bodyA
	 * @param bodyB
	 * @return
	 */
	@Override
	public boolean areInContact(CollidableBody bodyA, CollidableBody bodyB) {
		SphericalBody sbA = (SphericalBody) bodyA;
		SphericalBody sbB = (SphericalBody) bodyB;
		Double posA = sbA.getPosition();
		Double posB = sbB.getPosition();
		double rAB = sbA.getRadius() + sbB.getRadius();
		return (Math.abs(posA.x - posB.x) <= rAB 
				&& Math.abs(posA.y - posB.y) <= rAB
				&& MathUtil.getDistanceSq(posA, posB) <= rAB * rAB ); // BH optimizing out Math.sqrt

	}

}
