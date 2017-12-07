// Copyright 2002-2012, University of Colorado

/**
 * Class: SolidSphere
 * Package: edu.colorado.phet.collision
 * Author: Another Guy
 * Date: Sep 22, 2004
 */
package edu.colorado.phet.idealgas.collision;

import java.awt.geom.Point2D;

import edu.colorado.phet.common.phetcommon.math.vector.MutableVector2D;

public class SolidSphere extends SphericalBody {
    public SolidSphere( double radius ) {
        super( radius );
        type = TYPE_SOLID_SPHERE;
    }

    protected SolidSphere( Point2D center, //    protected SphericalBody( Vector2D center,
                           MutableVector2D velocity, MutableVector2D acceleration, double mass, double radius ) {
        super( center, velocity, acceleration, mass, radius );
        type = TYPE_SOLID_SPHERE;
    }
}
