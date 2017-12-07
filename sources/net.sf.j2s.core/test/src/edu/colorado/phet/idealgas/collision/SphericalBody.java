// Copyright 2002-2012, University of Colorado

/**
 * Class: SphericalBody
 * Package: edu.colorado.phet.model.body
 * Author: Another Guy
 * Date: Mar 21, 2003
 */
package edu.colorado.phet.idealgas.collision;

import java.awt.geom.Point2D;

import edu.colorado.phet.common.mechanics.Body;
import edu.colorado.phet.common.phetcommon.math.MathUtil;
import edu.colorado.phet.common.phetcommon.math.vector.MutableVector2D;

/**
 * NOTE: This class is not thread-safe!!!!!
 */
public class SphericalBody extends CollidableBody {

    protected double radius;
    
    protected double collidableRadius2Sum = Double.MIN_VALUE; // BH optimized away Maty.sqrt
    protected double collidableRadius2Diff = Double.MIN_VALUE; // BH optimized away Maty.sqrt
    protected double collidableRadiusS, collidableRadiusD; 
    
	public double getCollidableRange2Sum(double r) {
		// BH optimized
		return (collidableRadius2Sum == Double.MIN_VALUE 
				|| r != collidableRadiusS ? (collidableRadius2Sum = (radius + (collidableRadiusS = r))
				* (radius + r))	: collidableRadius2Sum);
	}

	public double getCollidableRange2Diff(double r) {
		// BH optimized
		return (collidableRadius2Diff == Double.MIN_VALUE 
				|| r != collidableRadiusD ? (collidableRadius2Diff = (radius - (collidableRadiusD = r))
				* (radius - r))	: collidableRadius2Diff);
	}

		protected double radius2; // /BH optimized away Math.sqrt

    public SphericalBody( double radius ) {
    	type = TYPE_SPHERICAL_BODY;
    	setRadius(radius);
    }

    protected SphericalBody( Point2D center,
                             MutableVector2D velocity,
                             MutableVector2D acceleration,
                             double mass,
                             double radius ) {
        super( center, velocity, acceleration, mass, 0 );
      	type = TYPE_SPHERICAL_BODY;
      	setRadius(radius);
    }

    @Override
		public Point2D getCM() {
        return this.getPosition();
    }

    @Override
		public double getMomentOfInertia() {
        return getMass() * radius2 * 2 / 5;
    }

    public double getRadius() {
        return radius;
    }

    public double getRadius2() {
      return radius2;
    }

    public void setRadius( double radius ) {
        this.radius = radius;
        radius2 = radius * radius;
    }

    public Point2D getCenter() {
        return getPosition();
    }

    public double getContactOffset( Body body ) {
        return getRadius();
    }

	/**
	 * Returns the new velocity of a particle reflected off the top or bottom of
	 * the box or a wall, adjusted for potential energy, and gravity.
	 * 
	 * The velocity of the sphere is assumed to be what it was if the sphere had
	 * not been reflected against a horizontal surface. That is, if it is bouncing
	 * off the surface, it will be going as fast as it would if the surface were
	 * note there. But since it actually would be above the floor (for instance),
	 * it should be going slower.
	 * 
	 * We make the correction by changing the kinetic energy of the sphere in the
	 * y direction by an amount equal to the change in kinetic energy that would
	 * occur if the sphere were moved from the non-reflected position to its
	 * actual, reflected, position.
	 * 
	 * Modified by Bob Hanson; moved to SphereicalBody from two duplicate methods
	 * in SphereWallCollision and SphereBoxCollision.
	 * 
	 * 
	 * @param twoDy
	 *          Twice the vertical distance the molecule has been moved by the
	 *          collision.
	 */
	void adjustVelocityForGravity(double twoDy, double g) {
		// BH: If g is 0, it is unnecessary to do this.
		if (g == 0 || twoDy == 0)
			return;
		// BH: Mass does not factor into this calculation,
		// as we are taking sqrt(2/m * (1/2 mv^2 - mgdy)) = sqrt(v^2 - g*2dy)
		//
		// Thus, the parameter of interest is 2dy and we don't need mass. 
		//

		double vy = velocity.getY();
		double diff = vy * vy - twoDy * g;
		if (diff >= 0) {
			velocity.setY(Math.sqrt(diff) * MathUtil.getSign(vy));
		} else {
			// BH: This indicates that the particle, had it not reflected, would not have
			// enough energy to have made it up to the position it is at now.
			// 
			// Sam's original note here: This indicates an anomaly in the collision. Right now, I don't know
			// just what to do about it.
		}
	}

}
