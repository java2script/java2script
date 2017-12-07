// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.math.vector;

import java.io.Serializable;

import static java.lang.Math.sqrt;

/**
 * Abstract base class for Vector4D and MutableVector4D
 */
public abstract class AbstractVector4D implements Serializable {

    public abstract double getX();

    public abstract double getY();

    public abstract double getZ();

    public abstract double getW();

    public double magnitude() { return sqrt( magnitudeSquared() ); }

    // the magnitude squared, which is equal to this.dot( this )
    public double magnitudeSquared() { return getX() * getX() + getY() * getY() + getZ() * getZ() + getW() * getW(); }

    public double dot( AbstractVector4D v ) {
        return getX() * v.getX() + getY() * v.getY() + getZ() * v.getZ() + getW() * v.getW();
    }

    /**
     * Gets the distance between the tip of this vector and the specified vector.
     * Performance is important here since this is in the inner loop in a many-particle calculation in sugar and salt solutions: WaterModel
     *
     * @param v the vector to get the distance to
     * @return the cartesian distance between the vectors
     */
    public double distance( AbstractVector4D v ) {
        double dx = this.getX() - v.getX();
        double dy = this.getY() - v.getY();
        double dz = this.getZ() - v.getZ();
        double dw = this.getW() - v.getW();
        return sqrt( dx * dx + dy * dy + dz * dz + dw * dw );
    }

    public Vector4D normalized() {
        double magnitude = magnitude();
        if ( magnitude == 0 ) {
            throw new UnsupportedOperationException( "Cannot normalize a zero-magnitude vector." );
        }
        return new Vector4D( getX() / magnitude, getY() / magnitude, getZ() / magnitude, getW() / magnitude );
    }

    public Vector4D getInstanceOfMagnitude( double magnitude ) { return times( magnitude / magnitude() ); }

    public Vector4D times( double scalar ) { return new Vector4D( getX() * scalar, getY() * scalar, getZ() * scalar, getW() * scalar ); }

    // component-wise multiplication
    public Vector4D componentTimes( AbstractVector4D v ) {
        return new Vector4D( getX() * v.getX(), getY() * v.getY(), getZ() * v.getZ(), getW() * v.getW() );
    }

    public Vector4D plus( AbstractVector4D v ) { return new Vector4D( getX() + v.getX(), getY() + v.getY(), getZ() + v.getZ(), getW() + v.getW() ); }

    public Vector4D plus( double x, double y, double z, double w ) { return new Vector4D( getX() + x, getY() + y, getZ() + z, getW() + w ); }

    public Vector4D minus( AbstractVector4D v ) { return new Vector4D( getX() - v.getX(), getY() - v.getY(), getZ() - v.getZ(), getW() - v.getW() ); }

    public Vector4D minus( double x, double y, double z, double w ) { return new Vector4D( getX() - x, getY() - y, getZ() - z, getW() - w ); }

    public Vector4D negated() { return new Vector4D( -getX(), -getY(), -getZ(), -getW() ); }

    // ignore the w component
    public Vector3F to3F() { return new Vector3F( getX(), getY(), getZ() ); }

    public Vector4F to4F() { return new Vector4F( getX(), getY(), getZ(), getW() );}
}