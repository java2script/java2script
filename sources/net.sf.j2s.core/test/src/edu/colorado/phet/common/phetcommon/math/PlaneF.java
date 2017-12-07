// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.math;

import edu.colorado.phet.common.phetcommon.math.vector.Vector3F;

/**
 * A mathematical plane determined by a normal vector to the plane and the distance to the closest
 * point on the plane to the origin
 */
public class PlaneF {
    public final Vector3F normal;
    public final float distance;

    public static final PlaneF XY = new PlaneF( Vector3F.Z_UNIT, 0 );
    public static final PlaneF XZ = new PlaneF( Vector3F.Y_UNIT, 0 );
    public static final PlaneF YZ = new PlaneF( Vector3F.X_UNIT, 0 );

    public PlaneF( Vector3F normal, float distance ) {
        this.normal = normal;
        this.distance = distance;
    }

    public Vector3F intersectWithRay( Ray3F ray ) {
        return ray.pointAtDistance( ray.distanceToPlane( this ) );
    }

    // NOTE: will return null if points are collinear
    public static PlaneF fromTriangle( Vector3F a, Vector3F b, Vector3F c ) {
        Vector3F normal = ( c.minus( a ) ).cross( b.minus( a ) );
        if ( normal.magnitude() == 0 ) {
            return null;
        }
        normal = normal.normalized();

        return new PlaneF( normal, normal.dot( a ) );
    }
}
