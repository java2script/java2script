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

/**
 * FloorFixupStrategy
 * <p/>
 * Keeps spheres from getting through a wall from top to bottom
 *
 * @author Ron LeMaster
 * @version $Revision: 47772 $
 */
public class FloorFixupStrategy implements WallFixupStrategy {
	// BH  abandoned
//
//    @Override
//		public void fixup( Wall wall, SphericalBody sphere ) {
//        sphere.setVelocityNoObs( sphere.getVelocity().getX(), -Math.abs( sphere.getVelocity().getY() ) );
//        sphere.setPositionNoObs( sphere.getPosition().getX(), wall.getBoundsNoCopy().getMinY() - sphere.getRadius() );
//    }
}
