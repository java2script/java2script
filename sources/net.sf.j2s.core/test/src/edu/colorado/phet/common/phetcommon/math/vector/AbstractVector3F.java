// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.math.vector;

import java.io.Serializable;

import edu.colorado.phet.common.phetcommon.math.MathUtil;

import static java.lang.Math.sqrt;

/**
 * Abstract base class for vector3f classes (mutable and immutable), see #3374.
 * Lombok used to generate equals/hashcode/tostring in the subclasses.
 * Methods that return the immutable subclass (such as "plus") are declared here.  This is a vestigial by-product of our previous architecture
 * and means that MutableVector3F will have mutator methods as well as the immutable methods like "plus".
 *
 * @author Sam Reid
 * @author Jonathan Olson
 */
public abstract class AbstractVector3F implements Serializable {

    public abstract float getX();

    public abstract float getY();

    public abstract float getZ();

    public float magnitude() { return (float) sqrt( magnitudeSquared() ); }

    // the magnitude squared, which is equal to this.dot( this )
    public float magnitudeSquared() { return getX() * getX() + getY() * getY() + getZ() * getZ(); }

    public float dot( AbstractVector3F v ) {
        return getX() * v.getX() + getY() * v.getY() + getZ() * v.getZ();
    }

    /**
     * Gets the distance between the tip of this vector and the specified vector.
     * Performance is important here since this is in the inner loop in a many-particle calculation in sugar and salt solutions: WaterModel
     *
     * @param v the vector to get the distance to
     * @return the cartesian distance between the vectors
     */
    public float distance( AbstractVector3F v ) {
        float dx = this.getX() - v.getX();
        float dy = this.getY() - v.getY();
        float dz = this.getZ() - v.getZ();
        return (float) sqrt( dx * dx + dy * dy + dz * dz );
    }

    // cross-product
    public Vector3F cross( AbstractVector3F v ) {
        return new Vector3F(
                getY() * v.getZ() - getZ() * v.getY(),
                getZ() * v.getX() - getX() * v.getZ(),
                getX() * v.getY() - getY() * v.getX()
        );
    }

    // The angle between this vector and "v", in radians
    public float angleBetween( AbstractVector3F v ) {
        return (float) Math.acos( MathUtil.clamp( -1, normalized().dot( v.normalized() ), 1 ) );
    }

    // The angle between this vector and "v", in degrees
    public float angleBetweenInDegrees( AbstractVector3F v ) { return (float) ( angleBetween( v ) * 180 / Math.PI ); }

    public Vector3F normalized() {
        float magnitude = magnitude();
        if ( magnitude == 0 ) {
            throw new UnsupportedOperationException( "Cannot normalize a zero-magnitude vector." );
        }
        return new Vector3F( getX() / magnitude, getY() / magnitude, getZ() / magnitude );
    }

    public Vector3F getInstanceOfMagnitude( float magnitude ) { return times( magnitude / magnitude() ); }

    public Vector3F times( float scalar ) { return new Vector3F( getX() * scalar, getY() * scalar, getZ() * scalar ); }

    // component-wise multiplication
    public Vector3F componentTimes( AbstractVector3F v ) { return new Vector3F( getX() * v.getX(), getY() * v.getY(), getZ() * v.getZ() ); }

    public Vector3F plus( AbstractVector3F v ) { return new Vector3F( getX() + v.getX(), getY() + v.getY(), getZ() + v.getZ() ); }

    public Vector3F plus( float x, float y, float z ) { return new Vector3F( getX() + x, getY() + y, getZ() + z ); }

    public Vector3F minus( AbstractVector3F v ) { return new Vector3F( getX() - v.getX(), getY() - v.getY(), getZ() - v.getZ() ); }

    public Vector3F minus( float x, float y, float z ) { return new Vector3F( getX() - x, getY() - y, getZ() - z ); }

    public Vector3F negated() { return new Vector3F( -getX(), -getY(), -getZ() ); }

    public Vector3D to3D() { return new Vector3D( getX(), getY(), getZ() );}
}