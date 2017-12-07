// Copyright 2002-2011, University of Colorado

/**
 * Class: SphereSphereExpert
 * Package: edu.colorado.phet.collision
 * Author: Another Guy
 * Date: Sep 21, 2004
 */
package edu.colorado.phet.idealgas.collision;

import edu.colorado.phet.common.phetcommon.math.MathUtil;
import edu.colorado.phet.idealgas.model.IdealGasModel;

public class SphereSphereExpert implements CollisionExpert {

    private boolean enabled = true;

    public void setEnabled( boolean isEnabled ) {
        enabled = isEnabled;
    }


    private SphereSphereContactDetector detector = new SphereSphereContactDetector();
//    private IdealGasModel model;
//    private double dt;
		private SphereSphereCollision collision;

    public SphereSphereExpert( IdealGasModel model, double dt ) {
//        this.model = model;
//        this.dt = dt;
    }

	@Override
	public boolean detectAndDoCollision(CollidableBody bodyA, CollidableBody bodyB) {
			
		// If the bodies are gas molecules and we are to ignore collisions between
		// gas molecules, return false
		if (enabled
					&& detector.applies(bodyA, bodyB)
					&& detector.areInContact(bodyA, bodyB) 
					&& tweakCheck(bodyA, bodyB)) {
			if (collision == null) // BH optimized: only ever need one of these.
				collision = new SphereSphereCollision();
			collision.sphereA = (SphericalBody) bodyA;
			collision.sphereB = (SphericalBody) bodyB;
			collision.collide();
			return true;
		}
		return false;
	}

	/**
	 * This check returns false if the two bodies were in contact during the
	 * previous time step. Using this check to prevent a collision in such cases
	 * makes the performance of the collision system much more natural looking.
	 * 
	 * @param cbA
	 * @param cbB
	 * @return
	 */
	private boolean tweakCheck(CollidableBody cbA, CollidableBody cbB) {
		SphericalBody sA = (SphericalBody) cbA;
		SphericalBody sB = (SphericalBody) cbB;
		return (MathUtil.getDistanceSq(sA.getPositionPrev(), sB.getPositionPrev()) > sA.radius2);
	}
    
  	@Override
  	public int getType() {
  		return CollidableBody.TYPE_SPHERICAL_BODY;
  	}

}
