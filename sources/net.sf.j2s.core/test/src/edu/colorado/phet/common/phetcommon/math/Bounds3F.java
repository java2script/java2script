// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.math;

import edu.colorado.phet.common.phetcommon.math.vector.Vector3F;

/**
 * An axis-aligned bounding box (AABB), generalized to a 3D bounding box (cuboid), using floats
 */
public class Bounds3F {
    private final float x;
    private final float y;
    private final float z;
    private final float width;
    private final float height;
    private final float depth;

    public Bounds3F( float x, float y, float z, float width, float height, float depth ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.height = height;
        this.depth = depth;
    }

    public static Bounds3F fromMinMax( float minX, float maxX, float minY, float maxY, float minZ, float maxZ ) {
        return new Bounds3F( minX, minY, minZ, maxX - minX, maxY - minY, maxZ - minZ );
    }

    public float getDepth() {
        return depth;
    }

    public float getHeight() {
        return height;
    }

    public float getWidth() {
        return width;
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public float getZ() {
        return z;
    }

    public float getMinX() {
        return x;
    }

    public float getMinY() {
        return y;
    }

    public float getMinZ() {
        return z;
    }

    public float getMaxX() {
        return x + width;
    }

    public float getMaxY() {
        return y + height;
    }

    public float getMaxZ() {
        return z + depth;
    }

    public Vector3F getPosition() {
        return new Vector3F( x, y, z );
    }

    public Vector3F getExtent() {
        return new Vector3F( x + width, y + height, z + depth );
    }

    public Vector3F getCenter() {
        return getPosition().plus( getExtent() ).times( 0.5f );
    }

    public float getCenterX() {
        return getCenter().x;
    }

    public float getCenterY() {
        return getCenter().y;
    }

    public float getCenterZ() {
        return getCenter().z;
    }

    public boolean intersectedBy( Ray3F ray ) {
        // see http://people.csail.mit.edu/amy/papers/box-jgt.pdf

        float tmin, tmax, tymin, tymax, tzmin, tzmax;

        // valid intersection interval
        float t0 = 0.000001f;
        float t1 = Float.POSITIVE_INFINITY;

        if ( ray.dir.x >= 0 ) {
            tmin = ( getMinX() - ray.pos.x ) / ray.dir.x;
            tmax = ( getMaxX() - ray.pos.x ) / ray.dir.x;
        }
        else {
            tmin = ( getMaxX() - ray.pos.x ) / ray.dir.x;
            tmax = ( getMinX() - ray.pos.x ) / ray.dir.x;
        }
        if ( ray.dir.y >= 0 ) {
            tymin = ( getMinY() - ray.pos.y ) / ray.dir.y;
            tymax = ( getMaxY() - ray.pos.y ) / ray.dir.y;
        }
        else {
            tymin = ( getMaxY() - ray.pos.y ) / ray.dir.y;
            tymax = ( getMinY() - ray.pos.y ) / ray.dir.y;
        }
        if ( ( tmin > tymax ) || ( tymin > tmax ) ) { return false; }
        if ( tymin > tmin ) { tmin = tymin; }
        if ( tymax < tmax ) { tmax = tymax; }
        if ( ray.dir.z >= 0 ) {
            tzmin = ( getMinZ() - ray.pos.z ) / ray.dir.z;
            tzmax = ( getMaxZ() - ray.pos.z ) / ray.dir.z;
        }
        else {
            tzmin = ( getMaxZ() - ray.pos.z ) / ray.dir.z;
            tzmax = ( getMinZ() - ray.pos.z ) / ray.dir.z;
        }
        if ( ( tmin > tzmax ) || ( tzmin > tmax ) ) { return false; }
        if ( tzmin > tmin ) { tmin = tzmin; }
        if ( tzmax < tmax ) { tmax = tzmax; }
        return ( ( tmin < t1 ) && ( tmax > t0 ) );
    }
}
