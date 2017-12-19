// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.math.vector;

import java.io.Serializable;

import edu.colorado.phet.common.phetcommon.math.MathUtil;

import static java.lang.Math.sqrt;

/**
 * Abstract base class for vector3d classes (mutable and immutable), see #3374.
 * Lombok used to generate equals/hashcode/tostring in the subclasses.
 * Methods that return the immutable subclass (such as "plus") are declared here.  This is a vestigial by-product of our previous architecture
 * and means that MutableVector3D will have mutator methods as well as the immutable methods like "plus".
 *
 * @author Sam Reid
 * @author Jonathan Olson
 */
public abstract class AbstractVector3D implements Serializable {

    public abstract double getX();

    public abstract double getY();

    public abstract double getZ();

    public double magnitude() { return sqrt( magnitudeSquared() ); }

    // the magnitude squared, which is equal to this.dot( this )
    public double magnitudeSquared() { return getX() * getX() + getY() * getY() + getZ() * getZ(); }

    public double dot( AbstractVector3D v ) {
        return getX() * v.getX() + getY() * v.getY() + getZ() * v.getZ();
    }

    /**
     * Gets the distance between the tip of this vector and the specified vector.
     * Performance is important here since this is in the inner loop in a many-particle calculation in sugar and salt solutions: WaterModel
     *
     * @param v the vector to get the distance to
     * @return the cartesian distance between the vectors
     */
    public double distance( AbstractVector3D v ) {
        double dx = this.getX() - v.getX();
        double dy = this.getY() - v.getY();
        double dz = this.getZ() - v.getZ();
        return sqrt( dx * dx + dy * dy + dz * dz );
    }

    // cross-product
    public Vector3D cross( AbstractVector3D v ) {
        return new Vector3D(
                getY() * v.getZ() - getZ() * v.getY(),
                getZ() * v.getX() - getX() * v.getZ(),
                getX() * v.getY() - getY() * v.getX()
        );
    }

    // The angle between this vector and "v", in radians
    public double angleBetween( AbstractVector3D v ) {
        return Math.acos( MathUtil.clamp( -1, normalized().dot( v.normalized() ), 1 ) );
    }

    // The angle between this vector and "v", in degrees
    public double angleBetweenInDegrees( AbstractVector3D v ) { return angleBetween( v ) * 180 / Math.PI; }

    public Vector3D normalized() {
        double magnitude = magnitude();
        if ( magnitude == 0 ) {
            throw new UnsupportedOperationException( "Cannot normalize a zero-magnitude vector." );
        }
        return new Vector3D( getX() / magnitude, getY() / magnitude, getZ() / magnitude );
    }

    public Vector3D getInstanceOfMagnitude( double magnitude ) { return times( magnitude / magnitude() ); }

    public Vector3D times( double scalar ) { return new Vector3D( getX() * scalar, getY() * scalar, getZ() * scalar ); }

    // component-wise multiplication
    public Vector3D componentTimes( Vector3D v ) { return new Vector3D( getX() * v.getX(), getY() * v.getY(), getZ() * v.getZ() ); }

    public Vector3D plus( AbstractVector3D v ) { return new Vector3D( getX() + v.getX(), getY() + v.getY(), getZ() + v.getZ() ); }

    public Vector3D plus( double x, double y, double z ) { return new Vector3D( getX() + x, getY() + y, getZ() + z ); }

    public Vector3D minus( AbstractVector3D v ) { return new Vector3D( getX() - v.getX(), getY() - v.getY(), getZ() - v.getZ() ); }

    public Vector3D minus( double x, double y, double z ) { return new Vector3D( getX() - x, getY() - y, getZ() - z ); }

    public Vector3D negated() { return new Vector3D( -getX(), -getY(), -getZ() ); }

    public Vector3F to3F() { return new Vector3F( getX(), getY(), getZ() );}
}