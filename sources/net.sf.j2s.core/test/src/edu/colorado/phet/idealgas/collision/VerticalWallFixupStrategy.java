// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47772 $
 * Date modified : $Date: 2011-01-07 13:53:07 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.idealgas.collision;

import java.awt.geom.Point2D;

/**
 * VerticalWallFixupStrategy
 * <p/>
 * Keeps spheres from getting through a wall from left to right or right to left
 *
 * @author Ron LeMaster
 * @version $Revision: 47772 $
 */
public class VerticalWallFixupStrategy implements WallFixupStrategy {

// BH abandoned
	
//
//	
//    @Override
//		public void fixup( Wall wall, SphericalBody sphere ) {
//        WallDescriptor wallDesc = wall.getDescriptor(sphere.getRadius());
//        Point2D.Double pt =  sphere.getPosition();
//        //double dAB = wallDesc.AB.ptLineDistSq(pt);
//        double dBC = wallDesc.BC.ptLineDistSq(pt);
//        //double dCD = wallDesc.CD.ptLineDistSq(pt);
//        double dAD = wallDesc.AD.ptLineDistSq(pt);
//
//        if( dBC < dAD ) {
//            sphere.setPositionNoObs( wallDesc.BC.getX1(), sphere.getPosition().getY() );
//            sphere.setVelocityNoObs( Math.abs( sphere.getVelocity().getX() ), sphere.getVelocity().getY() );
//        }
//        else {
//            sphere.setPositionNoObs( wallDesc.AD.getX1(), sphere.getPosition().getY() );
//            sphere.setVelocityNoObs( -Math.abs( sphere.getVelocity().getX() ), sphere.getVelocity().getY() );
//        }
//    }
}
