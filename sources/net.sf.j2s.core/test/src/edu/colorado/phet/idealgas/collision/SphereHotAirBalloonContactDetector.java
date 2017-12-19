// Copyright 2002-2011, University of Colorado

/**
 * Class: SphereHotAirBalloonContactDetector
 * Class: edu.colorado.phet.collision
 * User: Ron LeMaster
 * Date: Sep 22, 2004
 * Time: 8:10:39 PM
 */
package edu.colorado.phet.idealgas.collision;

import edu.colorado.phet.common.phetcommon.view.util.RectangleUtils;
import edu.colorado.phet.idealgas.model.HotAirBalloon;

public class SphereHotAirBalloonContactDetector implements ContactDetector {

	private SphereHollowSphereContactDetector detector = new SphereHollowSphereContactDetector();

	@Override
	public boolean areInContact(CollidableBody bodyA, CollidableBody bodyB) {
		if (!applies(bodyA, bodyB))
			return false;
		HotAirBalloon balloon = (HotAirBalloon) bodyB;
		SphericalBody sphere = (SphericalBody) bodyA;
		
		return (!RectangleUtils.containsPt(balloon.getOpening(), sphere.getPosition()) 
				&& detector.areInContact(sphere, balloon));
	}

	@Override
	public boolean applies(CollidableBody bodyA, CollidableBody bodyB) {
		return ((bodyA.type | bodyB.type) & (CollidableBody.TYPE_HOT_AIR_BALLOON | CollidableBody.TYPE_SOLID_SPHERE)) == (CollidableBody.TYPE_HOT_AIR_BALLOON | CollidableBody.TYPE_SOLID_SPHERE);
	}
}
