// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.math;

import edu.colorado.phet.common.phetcommon.math.vector.Vector3F;

/**
 * A three-dimensional ray (position and direction), with floats
 */
public class Ray3F {
    // the position where the ray is pointed from
    public final Vector3F pos;

    // the unit vector direction in which the ray is pointed
    public final Vector3F dir;

    public Ray3F( Vector3F pos, Vector3F dir ) {
        this.pos = pos;

        // normalize dir if needed
        this.dir = dir.magnitude() == 1 ? dir : dir.normalized();
    }

    // a ray whose position is shifted by the specified distance in the direction of the ray
    public Ray3F shifted( float distance ) {
        return new Ray3F( pointAtDistance( distance ), dir );
    }

    public Vector3F pointAtDistance( float distance ) {
        return pos.plus( dir.times( distance ) );
    }

    public float distanceToPlane( PlaneF plane ) {
        return ( plane.distance - pos.dot( plane.normal ) ) / dir.dot( plane.normal );
    }

    @Override public String toString() {
        return pos.toString() + " => " + dir.toString();
    }
}
