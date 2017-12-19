// Copyright 2002-2012, University of Colorado

/**
 * Class: SphereBoxCollision
 * Class: edu.colorado.phet.physics.collision
 * User: Ron LeMaster
 * Date: Apr 4, 2003
 * Time: 12:35:39 PM
 */
package edu.colorado.phet.idealgas.collision;

import java.awt.geom.Rectangle2D;

import edu.colorado.phet.idealgas.model.IdealGasModel;

/**
 * Performs collision mechanics between a sphere and a wall
 */
public class SphereWallCollision implements Collision {

  private IdealGasModel model;
    SphericalBody sphere;
    Wall wall;
    int contactType;

    public SphereWallCollision( IdealGasModel model ) {
        this.model = model;
    }


	@Override
	public void collide() {
		double sx = sphere.getPosition().getX();
		double sy = sphere.getPosition().getY();
		double svx = sphere.getVelocity().getX();
		double svy = sphere.getVelocity().getY();
		double r = sphere.getRadius();
		Rectangle2D wallBounds = wall.getBoundsNoCopy();

		// If the sphere is hitting a corner, rather than a flat side of the wall,
		// we need to handle
		// the collision in a special way
		// if( ( sx < wallBounds.getMinX() || sx > wallBounds.getMaxX() )
		// && ( sy < wallBounds.getMinY() || sy > wallBounds.getMaxY() )) {
		// if ( false ) {
		//
		// System.out.println( "contactType = " + contactType );
		// // Get the new velocity of the sphere
		// Point2D closestPointOnWall = getClosestPointOnWall( sphere.getPosition(),
		// wall );
		//
		// MutableVector2D loa = new MutableVector2D( sphere.getPosition().getX() -
		// closestPointOnWall.getX(),
		// sphere.getPosition().getY() - closestPointOnWall.getY() );
		//
		// if ( loa.magnitude() == 0 ) {
		// MutableVector2D v2 = new MutableVector2D( sphere.getVelocity()
		// ).normalize().scale( 0.1 );
		// Point2D p2 = new Point2D.Double( sphere.getPosition().getX() + v2.getX(),
		// sphere.getPosition().getY() + v2.getY() );
		// closestPointOnWall = getClosestPointOnWall( p2, wall );
		// loa = new MutableVector2D( p2.getX() - closestPointOnWall.getX(),
		// p2.getY() - closestPointOnWall.getY() );
		// }
		//
		// // Make sure loa is directed toward the inside of the wall. This makes
		// the rest of the computations simpler
		// if ( !wall.getBounds().contains( closestPointOnWall.getX() + loa.getX(),
		// closestPointOnWall.getY() + loa.getY() ) ) {
		// loa.scale( -1 );
		// }
		//
		// // Vector2D tangent = new Vector2D.Double( loa.getY(), -loa.getX() );
		// // double alpha = tangent.getAngle() - sphere.getVelocity().getAngle();
		// double dTheta = loa.getAngle() - sphere.getVelocity().getAngle();
		// // if( alpha > Math.PI / 2 ) {
		// // alpha = Math.PI - alpha;
		// // }
		// // if( alpha < -Math.PI / 2 ) {
		// // alpha = -Math.PI + alpha;
		// // }
		// // double alpha = sphereG
		//
		// sphere.getVelocity().rotate( dTheta * 2 ).scale( -1 );
		//
		// double angle2 = new MutableVector2D( sphere.getPosition().getX() -
		// closestPointOnWall.getX(),
		// sphere.getPosition().getY() - closestPointOnWall.getY() ).getAngle();
		//
		// // Determine if the spehre's CM has penetrated the wall
		// double d = sphere.getPosition().distance( closestPointOnWall );
		// d = ( wall.getBounds().contains( sphere.getPosition() ) ) ? d : -d;
		//
		// // Get the sphere's new position
		// MutableVector2D displacement = loa.normalize().scale( (
		// sphere.getRadius() + d ) * 2 );
		// Point2D newPosition = new Point2D.Double( sphere.getPosition().getX() +
		// displacement.getX(),
		// sphere.getPosition().getY() + displacement.getY() );
		// sphere.setPosition( newPosition );
		// return;
		// }

		switch (contactType) {
		case SphereWallExpert.RIGHT_SIDE: {
			sphere.setVelocityNoObs(-svx, svy);
			double wx = wallBounds.getMaxX();
			double dx = wx - (sx - r);
			sphere.setPositionNoObs(sx + (dx * 2), sy);
			break;
		}
		case SphereWallExpert.LEFT_SIDE: {
			sphere.setVelocityNoObs(-svx, svy);
			double wx = wallBounds.getMinX();
			double dx = (sx + r) - wx;
			sphere.setPositionNoObs(sx - (dx * 2), sy);
			return;
		}
		case SphereWallExpert.TOP: {
			sphere.setVelocityNoObs(svx, svy = -svy);
			double wy = wallBounds.getMinY();
			double twoDy = 2 * ((sy + r) - wy);
			sphere.setPositionNoObs(sx, sy - twoDy);
			// Adjust y velocity for potential energy
			double g = model.getGravity().getAmt();
			if (g != 0)
				sphere.adjustVelocityForGravity(twoDy, g);
			break;
		}
		case SphereWallExpert.BOTTOM: {
			sphere.setVelocityNoObs(svx, svy = -svy);
			double wy = wallBounds.getMaxY();
			double twoDy = 2 * (wy - (sy - r));
			sphere.setPositionNoObs(sx, sy + twoDy);
			// Adjust y velocity for potential energy
			double g = model.getGravity().getAmt();
			if (g != 0)
				sphere.adjustVelocityForGravity(twoDy, g);
			break;
		}
		default:
			throw new RuntimeException("Invalid contact type");
		}
	}

//    /**
//     * Note that this only works for walls that are oriented along the x and y axes
//     *
//     * @param p
//     * @param wall
//     * @return
//     */
//    private Point2D getClosestPointOnWall( Point2D p, Wall wall ) {
//
//        double x = 0;
//        double y = 0;
//
//        switch( contactType ) {
//            case SphereWallExpert.RIGHT_SIDE:
//                x = wall.getBoundsNoCopy().getMaxX();
//                y = p.getY();
//                break;
//            case SphereWallExpert.LEFT_SIDE:
//                x = wall.getBoundsNoCopy().getMinX();
//                y = p.getY();
//                break;
//            case SphereWallExpert.TOP:
//                x = p.getX();
//                y = wall.getBoundsNoCopy().getMinY();
//                break;
//            case SphereWallExpert.BOTTOM:
//                x = p.getX();
//                y = wall.getBoundsNoCopy().getMaxY();
//                break;
//            default:
//                throw new IllegalArgumentException( "Invalid contact type" );
//        }
//
////        double minDx = Math.min( Math.abs( p.getX() - wall.getBounds().getMinX() ), Math.abs( p.getX() - wall.getBounds().getMaxX() ) );
////        double minDy = Math.min( Math.abs( p.getY() - wall.getBounds().getMinY() ), Math.abs( p.getY() - wall.getBounds().getMaxY() ) );
////        if( minDx < minDy ) {
////            y = p.getY();
////            if( Math.abs( p.getX() - wall.getBounds().getMinX() ) < Math.abs( p.getX() - wall.getBounds().getMaxX() ) ) {
////                x = wall.getBounds().getMinX();
////            }
////            else {
////                x = wall.getBounds().getMaxX();
////            }
////        }
////        else {
////            x = p.getX();
////            if( Math.abs( p.getY() - wall.getBounds().getMinY() ) < Math.abs( p.getY() - wall.getBounds().getMaxY() ) ) {
////                y = wall.getBounds().getMinY();
////            }
////            else {
////                y = wall.getBounds().getMaxY();
////            }
////        }
//        return new Point2D.Double( x, y );
//    }

}
