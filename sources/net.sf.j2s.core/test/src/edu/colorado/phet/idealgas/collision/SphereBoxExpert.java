// Copyright 2002-2011, University of Colorado

/**
 * Class: SphereBoxExpert
 * Package: edu.colorado.phet.collision
 * Author: Another Guy
 * Date: Sep 21, 2004
 */
package edu.colorado.phet.idealgas.collision;

import java.awt.geom.Point2D;

import edu.colorado.phet.idealgas.model.Box2D;
import edu.colorado.phet.idealgas.model.IdealGasModel;

public class SphereBoxExpert implements CollisionExpert, ContactDetector {

    //    private SphereBoxCollisionExpert detector = new SphereBoxCollisionExpert();
    private IdealGasModel model;
		private SphereBoxCollision collision;

    public SphereBoxExpert( IdealGasModel model ) {
        this.model = model;
    }

    static int cnt = 0;

	@Override
	public boolean detectAndDoCollision(CollidableBody bodyA, CollidableBody bodyB) {
		//if (!applies(bodyA, bodyB))
			//return false;

		SphericalBody sphere = (SphericalBody) bodyA;
		Box2D box = (Box2D) bodyB;
		if (!areInContact(sphere, box) || box.isInOpening(sphere))
			return false;

		double sx = sphere.getPosition().getX();
		double sy = sphere.getPosition().getY();
		//double spx = sphere.getPositionPrev().getX();
		//double spy = sphere.getPositionPrev().getY();
		double r = sphere.getRadius();

		// Check for contact with each of the walls
		// boolean leftWall = ( sx - r ) <= box.getMinX() && ( spx - r ) >
		// box.getMinX();
		// boolean rightWall = ( sx + r ) >= box.getMaxX() && ( spx + r ) <
		// box.getMaxX();
		// boolean topWall = ( sy - r ) <= box.getMinY() && ( spy - r ) >
		// box.getMinY();
		// boolean bottomWall = ( sy + r ) >= box.getMaxY() && ( spy + r ) <
		// box.getMaxY();
		boolean leftWall = false;
		boolean rightWall = false;
		boolean topWall = false;
		boolean bottomWall = false;
		if ((sphere.type & CollidableBody.TYPE_GAS_MOLECULE) != CollidableBody.TYPE_GAS_MOLECULE || box.containsBody(sphere)) {
			// if( !( sphere instanceof GasMolecule ) || ( (GasMolecule)sphere
			// ).isInBox() ) {
			leftWall = (sx - r) <= box.getMinX();
			rightWall = (sx + r) >= box.getMaxX();
			topWall = (sy - r) <= box.getMinY();
			bottomWall = (sy + r) >= box.getMaxY();
		}
		// Is the sphere hitting the box from outside
		// else if( sphere instanceof GasMolecule && !( (GasMolecule)sphere
		// ).isInBox() ) {
		// leftWall = ( sx + r ) >= box.getMinX();
		// rightWall = ( sx - r ) <= box.getMaxX();
		// topWall = ( sy + r ) >= box.getMinY();
		// bottomWall = ( sy - r ) <= box.getMaxY();
		// }

		// If the sphere is in contact with two opposing walls, don't do anything.
		// Need this for spheres
		// that fill the box
		if ((leftWall && rightWall || topWall && bottomWall)) 
			return false;

			// BH we want to totally avoid "new" here.

			if (collision == null)
				collision = new SphereBoxCollision(box, model);
			collision.sphere = sphere;
			collision.collide();
			// If the following line is enabled, the helium balloon will freeze the
			// simulation
			// if it expands to fill the box, and so will the hot air balloon if you
			// just edge
			// the movable wall up to it.
			// haveCollided = true;
		return true;
	}

	@Override
	public boolean applies(CollidableBody bodyA, CollidableBody bodyB) {
		return ((bodyA.type | bodyB.type) & (CollidableBody.TYPE_BOX2D | CollidableBody.TYPE_SPHERICAL_BODY))
				== (CollidableBody.TYPE_BOX2D | CollidableBody.TYPE_SPHERICAL_BODY);
	}

    @Override
		public boolean areInContact( CollidableBody bodyA, CollidableBody bodyB ) {
      SphericalBody sphere = (SphericalBody) bodyA;
      Box2D box = (Box2D) bodyB;
      double r = sphere.getRadius();
      Point2D c = sphere.getCenter();
      double y, by;

        // Hitting left wall?
        return  (c.getX() - r <= box.getMinX() 
        		||
        // Hitting right wall?
         c.getX() + r  >= box.getMaxX() && sphere.getVelocity().getX() > 0 
            ||
            // Hitting bottom wall?
         c.getY() + r >= box.getMaxY() && sphere.getVelocity().getY() > 0 
         		||
         		// Hitting top wall? // BH Java fix #4: need a max for how far away a particle can be 
         	(y = c.getY() - r) <= (by = box.getMinY()) && y > by - 20 && sphere.getVelocity().getY() < 0 
        );
    }

    @Override
  	public int getType() {
  		return CollidableBody.TYPE_BOX2D | CollidableBody.TYPE_SPHERICAL_BODY;
  	}

}
