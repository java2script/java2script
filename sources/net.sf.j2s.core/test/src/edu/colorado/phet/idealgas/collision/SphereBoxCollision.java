// Copyright 2002-2011, University of Colorado

/**
 * Class: SphereBoxCollision
 * Class: edu.colorado.phet.physics.collision
 * User: Ron LeMaster
 * Date: Apr 4, 2003
 * Time: 12:35:39 PM
 */
package edu.colorado.phet.idealgas.collision;

import java.awt.geom.Point2D;

import edu.colorado.phet.idealgas.IdealGasConfig;
import edu.colorado.phet.idealgas.model.Box2D;
import edu.colorado.phet.idealgas.model.IdealGasModel;

public class SphereBoxCollision implements Collision {
	
	// BH minimizing calls to getThis(), getThat()

    //----------------------------------------------------------------
    // Instance fields and methods
    //----------------------------------------------------------------

    SphericalBody sphere; // BH set just before collision()
    private Box2D box;
    private IdealGasModel model;

    
    public SphereBoxCollision(Box2D box, IdealGasModel model ) {
        this.box = box;
        this.model = model;
    }

	@Override
	public void collide() {

		Point2D.Double pos = sphere.getPosition();
		double sx = pos.x;
		double sy = pos.y;
		// BH unused double spx = sphere.getPositionPrev().getX();
		// BH unused double spy = sphere.getPositionPrev().getY();

		double r = sphere.getRadius();

		// Check for contact with each of the walls
		// boolean leftWall = ( sx - r ) <= minx;
		// boolean rightWall = ( sx + r ) >= maxx;
		// boolean topWall = ( sy - r ) <= miny;
		// boolean bottomWall = ( sy + r ) >= maxy;

		// boolean leftWall = ( sx - r ) <= minx && ( spx - r ) > minx;
		// boolean rightWall = ( sx + r ) >= maxx && ( spx + r ) < maxx;
		// boolean topWall = ( sy - r ) <= miny && ( spy - r ) > miny;
		// boolean bottomWall = ( sy + r ) >= maxy && ( spy + r ) < maxy;

		double minx = box.getMinX();
		double miny = box.getMinY();
		double maxx = box.getMaxX();
		double maxy = box.getMaxY();

		// if( true || !( sphere instanceof GasMolecule ) || box.containsBody(
		// sphere ) /* (GasMolecule)sphere ).isInBox()*/ ) {
		// if( !( sphere instanceof GasMolecule ) || ( (GasMolecule)sphere
		// ).isInBox() ) {

		boolean leftWall = (sx - r) <= minx;
		boolean rightWall = (sx + r) >= maxx;
		boolean topWall = (sy - r) <= miny;
		boolean bottomWall = (sy + r) >= maxy;
		// }
		// Is the sphere hitting the box from outside
		// else if( sphere instanceof GasMolecule && !( (GasMolecule)sphere
		// ).isInBox() ) {
		// leftWall = ( sx + r ) >= minx && (sy - r ) >= miny && (sy + r) <= maxy;
		// rightWall = ( sx - r ) <= maxx && (sy - r ) >= miny && (sy + r) <= maxy;
		// topWall = ( sy + r ) >= miny && (sx-r) >= minx && (sx+r) <= maxx;
		// bottomWall = ( sy - r ) <= maxy&& (sx-r) >= minx && (sx+r) <= maxx;
		//
		// System.out.println( "(bottomWall|| topWall||rightWall||leftWall = " + (
		// bottomWall || topWall || rightWall || leftWall ));
		// if( bottomWall || topWall || rightWall || leftWall ) {
		// System.out.println( "SphereBoxCollision.collide" );
		// }
		// }

		// BH optimizations

		double svx = sphere.getVelocity().getX();
		double svy = sphere.getVelocity().getY();

		// Collision with left wall?
		if (leftWall) {

			sphere.setVelocityNoObs(svx = -svx, svy);
			double wx = minx;
			double dx = wx - (sx - r);
			double newX = sx + (dx * 2);

			sphere.setPositionNoObs(newX, sy);

			// Handle giving particle kinetic energy if the wall is moving
			if (model.isWorkDoneByMovingWall()) {
				double vx0 = svx;
				double vx1 = vx0 + box.getLeftWallVx();
				double energyPre = sphere.getKineticEnergy();
				sphere.setVelocityNoObs(svx = vx1, svy);
				double energyPost = sphere.getKineticEnergy();

				// Add the energy to the system, so it doesn't get
				// taken back out when energy conservation is performed
				model.addKineticEnergyToSystem(energyPost - energyPre);
			}
		} else if (rightWall) {
			sphere.setVelocityNoObs(svx = -svx, svy);
			double wx = maxx;
			double dx = (sx + r) - wx;
			double newX = sx - (dx * 2);
			sphere.setPositionNoObs(newX, sy);
		}

		// Collision with top wall?
		if (topWall) {
			sphere.setVelocityNoObs(svx, svy = -svy);
			double wy = miny;
			double twoDy = 2 * (wy - (sy - r));
			sphere.setPositionNoObs(sx, sy + twoDy);
			// Adjust y velocity for potential energy
			double g = model.getGravity().getAmt();
			if (g != 0)
				sphere.adjustVelocityForGravity(twoDy, g);
		} else if (bottomWall) {
			sphere.setVelocityNoObs(svx, svy = -svy);
			double wy = maxy;
			double twoDy = 2 * ((sy + r) - wy);
			sphere.setPositionNoObs(sx, sy - twoDy);
			// Adjust y velocity for potential energy
			double g = model.getGravity().getAmt();
			if (g != 0)
				sphere.adjustVelocityForGravity(twoDy, g);

			// Here's where we handle adding heat on the floor
			// todo: probably not the best place for this
			if (IdealGasConfig.HEAT_ONLY_FROM_FLOOR) {
				double preKE = sphere.getKineticEnergy();
				sphere.getVelocity().scale(1 + model.getHeatSource() / 10000);
				double incrKE = sphere.getKineticEnergy() - preKE;
				model.addKineticEnergyToSystem(incrKE);
			}
		}
	}

}
