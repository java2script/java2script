// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.math;

import edu.colorado.phet.common.phetcommon.math.vector.Vector3F;
import edu.colorado.phet.common.phetcommon.util.Option;

/**
 * Floating-point triangle in 3 dimensions
 *
 * @author Jonathan Olson
 */
public class Triangle3F {
    public final Vector3F a;
    public final Vector3F b;
    public final Vector3F c;

    public Triangle3F( Vector3F a, Vector3F b, Vector3F c ) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    // the plane that contains all three points
    public PlaneF getPlane() {
        return PlaneF.fromTriangle( a, b, c );
    }

    // returns a normal facing to the front, assuming the OpenGL standard of counter-clockwise-facing triangles
    public Vector3F getNormal() {
        return b.minus( a ).cross( c.minus( a ) ).normalized();
    }

    public float getArea() {
        return Math.abs( ( ( a.x - c.x ) * ( b.y - c.y ) - ( b.x - c.x ) * ( a.y - c.y ) ) / 2.0f );
    }

    public Option<TriangleIntersectionResult> intersectWith( Ray3F ray ) {
        PlaneF plane = getPlane();

        if ( plane == null ) {
            // points collinear, don't form a triangle
            return new Option.None<TriangleIntersectionResult>();
        }

        // find where our ray will intersect with this plane
        Vector3F planePoint = plane.intersectWithRay( ray );

        // compute barycentric coordinates
        Vector3F v0 = c.minus( a );
        Vector3F v1 = b.minus( a );
        Vector3F v2 = planePoint.minus( a );

        float dot00 = v0.dot( v0 );
        float dot01 = v0.dot( v1 );
        float dot02 = v0.dot( v2 );

        float dot11 = v1.dot( v1 );
        float dot12 = v1.dot( v2 );

        float p = 1 / ( dot00 * dot11 - dot01 * dot01 );

        // these are the barycentric coordinates
        float u = ( dot11 * dot02 - dot01 * dot12 ) * p;
        float v = ( dot00 * dot12 - dot01 * dot02 ) * p;

        boolean hit = ( u >= 0 ) && ( v >= 0 ) && ( u + v <= 1 );

        if ( hit ) {
            return new Option.Some<TriangleIntersectionResult>( new TriangleIntersectionResult(
                    planePoint,
                    plane.normal.dot( ray.dir ) > 0 ? plane.normal.negated() : plane.normal
            ) );
        }
        else {
            return new Option.None<TriangleIntersectionResult>();
        }
    }

    public static class TriangleIntersectionResult {
        // point where the intersection occurs
        public final Vector3F point;

        // normal at the intersection, "towards" the ray position
        public final Vector3F normal;

        public TriangleIntersectionResult( Vector3F point, Vector3F normal ) {
            this.point = point;
            this.normal = normal;
        }
    }
}
