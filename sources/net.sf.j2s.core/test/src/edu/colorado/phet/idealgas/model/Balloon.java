// Copyright 2002-2012, University of Colorado

/**
 * Created by IntelliJ IDEA.
 * User: Another Guy
 * Date: Jan 15, 2003
 * Time: 1:53:09 PM
 * To change this template use Options | File Templates.
 */
package edu.colorado.phet.idealgas.model;

import java.awt.geom.Point2D;

import edu.colorado.phet.common.phetcommon.math.MathUtil;
import edu.colorado.phet.common.phetcommon.math.vector.MutableVector2D;
import edu.colorado.phet.idealgas.collision.CollidableBody;

public class Balloon extends HollowSphere {

    public static final double MIN_RADIUS = 10;

    // Attributes for adjusting the size of the balloon
    private int timeStepsSinceLastRadiusAdjustment = 0;
    private static final int timeStepsBetweenRadiusAdjustments = 5; // BH added static
    // Exponent for the power function that adjusts the size of the balloon when
    // the internal or external pressure changes
    private double dampingExponent = 0.02;
    // Temporary varaibles, pre-allocated for performance
    private MutableVector2D momentumPre = new MutableVector2D();
    private MutableVector2D momentumPost = new MutableVector2D();
    private Box2D box;
    private double accumulatedImpact = 0;


    /**
     * @param center
     * @param velocity
     * @param acceleration
     * @param mass
     * @param radius
     */
    public Balloon( Point2D center,
                    MutableVector2D velocity,
                    MutableVector2D acceleration,
                    double mass,
                    double radius,
                    Box2D box ) {
        super( center, velocity, acceleration, mass, radius );
        this.box = box;
      	type = TYPE_BALLOON;

    }

	/**
	 * Records the impact on the inside or outside of the balloon
	 */
	@Override
	public void collideWithParticle(CollidableBody particle) {

		// Get the new momentum of the balloon
		double m = this.getMass();
		momentumPost.setComponents(m * this.getVelocity().getX(), m
				* this.getVelocity().getY());

		// Compute the change in momentum and record it as pressure
		
		// MutableVector2D momentumChange = momentumPost.subtract( momentumPre );
		// double impact = momentumChange.magnitude();

		// BH Java fix #12: MutableVector2D.subtract operates on "this" and returns "this", so
		// momentumChange would be momentumPost now, and more importantly,
		// momentumPost is now the change. This would be fine, except a little
		// further down we set momentumPre to be the value of momentumPost.
		// The result is that accumulatedImpact is completely wrong.

		double dx = momentumPost.getX() - momentumPre.getX();
		double dy = momentumPost.getY() - momentumPre.getY();
		double impact = Math.sqrt(dx * dx + dy * dy);
		// todo: change this to a test that relies on containsBody, when that is
		// correctly implemented
		// BH actually, this is better the way it is. 
		accumulatedImpact += impact * (contains(particle) ? 1 : -1);
		momentumPre.setComponents(momentumPost.getX(), momentumPost.getY());

		// Adjust the size of the balloon
		if (timeStepsSinceLastRadiusAdjustment >= timeStepsBetweenRadiusAdjustments) {
			adjustRadius();
			// Reset accumulators
			accumulatedImpact = 0;
			timeStepsSinceLastRadiusAdjustment = 0;
		}
	}

    private void adjustRadius() {
        // Adjust the radius of the balloon
        //Make sure the balloon doesn't expand beyond the box
        double maxRadius = 0.99 * Math.min( ( box.getMaxX() - box.getMinX() ) / 2,
                                            ( box.getMaxY() - box.getMinY() ) / 2 );
        double dr = Math.pow( Math.abs( accumulatedImpact ), dampingExponent ) * MathUtil.getSign( accumulatedImpact );
        double newRadius = Math.min( this.getRadius() + dr, maxRadius );
        if ( !Double.isNaN( newRadius ) ) {
            newRadius = Math.min( maxRadius, Math.max( newRadius, MIN_RADIUS ) );
            this.setRadius( newRadius );
        }
    }

    /**
     * @param dt
     */
    @Override
		public void stepInTime( double dt ) {
        stepInTimeCB(dt); // BH optimization
        timeStepsSinceLastRadiusAdjustment++;
    }
}

