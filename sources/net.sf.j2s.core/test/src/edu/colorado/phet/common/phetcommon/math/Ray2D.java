// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.math;

import edu.colorado.phet.common.phetcommon.math.vector.Vector2D;

/**
 * Two-dimensional ray (position with a direction)
 */
public class Ray2D {
    // the position where the ray is pointed from
    public final Vector2D pos;

    // the unit vector direction in which the ray is pointed
    public final Vector2D dir;

    public Ray2D( Vector2D pos, Vector2D dir ) {
        this.pos = pos;

        // normalize dir if needed
        this.dir = dir.magnitude() == 1 ? dir : dir.normalized();
    }

    // a ray whose position is shifted by the specified distance in the direction of the ray
    public Ray2D shifted( double distance ) {
        return new Ray2D( pointAtDistance( distance ), dir );
    }

    public Vector2D pointAtDistance( double distance ) {
        return pos.plus( dir.times( distance ) );
    }

    @Override public String toString() {
        return pos.toString() + " => " + dir.toString();
    }
}
