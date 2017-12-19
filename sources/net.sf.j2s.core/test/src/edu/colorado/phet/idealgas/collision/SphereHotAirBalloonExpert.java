// Copyright 2002-2011, University of Colorado

/**
 * Class: SphereHollowSphereExpert
 * Package: edu.colorado.phet.collision
 * Author: Another Guy
 * Date: Sep 21, 2004
 */
package edu.colorado.phet.idealgas.collision;

import edu.colorado.phet.idealgas.model.IdealGasModel;

public class SphereHotAirBalloonExpert implements CollisionExpert {

    private ContactDetector detector = new SphereHotAirBalloonContactDetector();
//    private IdealGasModel model;
//    private double dt;
		private SphereSphereCollision collision;

    public SphereHotAirBalloonExpert( IdealGasModel model, double dt ) {
//        this.model = model;
//        this.dt = dt;
    }

    @Override
		public boolean detectAndDoCollision( CollidableBody bodyA, CollidableBody bodyB ) {
        boolean haveCollided = false;
        if( detector.applies( bodyA, bodyB ) && detector.areInContact( bodyA, bodyB ) ) {
      		if (collision == null)
      			collision = new SphereSphereCollision();
      		// due to an asymmetry in SphereSphereCollision
      		// it is necessary to have the hollow object be sphereA
      		collision.sphereA = (SphericalBody) bodyB;
      		collision.sphereB = (SphericalBody) bodyA;
      		collision.collide();
            haveCollided = true;
        }
        return haveCollided;
//        return detector.applies( bodyA, bodyB );
    }
    
  	@Override
  	public int getType() {
  		return CollidableBody.TYPE_HOT_AIR_BALLOON  | CollidableBody.TYPE_SPHERICAL_BODY;
  	}

}