package edu.colorado.phet.common.phetcommon.math;

import edu.colorado.phet.common.phetcommon.math.vector.Vector3D;
import edu.colorado.phet.common.phetcommon.util.Option;

/**
 * Three-dimensional ray (double version), with a position and direction
 */
public class Ray3D {
    // the position where the ray is pointed from
    public final Vector3D pos;

    // the unit vector direction in which the ray is pointed
    public final Vector3D dir;

    public Ray3D( Vector3D pos, Vector3D dir ) {
        this.pos = pos;

        // normalize dir if needed
        this.dir = dir.magnitude() == 1 ? dir : dir.normalized();
    }

    // a ray whose position is shifted by the specified distance in the direction of the ray
    public Ray3D shifted( double distance ) {
        return new Ray3D( pointAtDistance( distance ), dir );
    }

    public Vector3D pointAtDistance( double distance ) {
        return pos.plus( dir.times( distance ) );
    }

    public double distanceToPlane( PlaneD plane ) {
        return ( plane.distance - pos.dot( plane.normal ) ) / dir.dot( plane.normal );
    }

    @Override public String toString() {
        return pos.toString() + " => " + dir.toString();
    }

    public Option<Vector3D> intersectWithTriangle( Vector3D a, Vector3D b, Vector3D c ) {
        PlaneD plane = PlaneD.fromTriangle( a, b, c );

        if ( plane == null ) {
            // points collinear, don't form a triangle
            return new Option.None<Vector3D>();
        }

        // find where our ray
        Vector3D planePoint = plane.intersectWithRay( this );

        // TODO: better way of handling intersection? this intersects triangles if the normal is reversed, but is approximate (will intersect a slightly larger area)
        boolean hit = approximateCoplanarPointInTriangle( a, b, c, planePoint );

        return hit ? new Option.Some<Vector3D>( planePoint ) : new Option.None<Vector3D>();
    }

    private static boolean approximateCoplanarPointInTriangle( Vector3D a, Vector3D b, Vector3D c, Vector3D point ) {
        double areaA = triangleXYArea( point, b, c );
        double areaB = triangleXYArea( point, c, a );
        double areaC = triangleXYArea( point, a, b );
        double insideArea = triangleXYArea( a, b, c );

        // some area must be "outside" the main triangle (just needs to be close)
        return areaA + areaB + areaC <= insideArea * 1.02;
    }

    private static double triangleXYArea( Vector3D a, Vector3D b, Vector3D c ) {
        return Math.abs( ( ( a.getX() - c.getX() ) * ( b.getY() - c.getY() ) - ( b.getX() - c.getX() ) * ( a.getY() - c.getY() ) ) / 2 );
    }
}
