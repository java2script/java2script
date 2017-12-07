// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.math.vector;

import java.awt.geom.Dimension2D;
import java.io.Serializable;

import static java.lang.Math.sqrt;

/**
 * Abstract base class for Vector2F classes (mutable and immutable), see #3374.
 * Lombok used to generate equals/hashcode/tostring in the subclasses.
 * Methods that return the immutable subclass (such as "plus") are declared here.  This is a vestigial by-product of our previous architecture
 * and means that MutableVector2F will have mutator methods as well as the immutable methods like "plus".
 *
 * @author Sam Reid
 * @author Jonathan Olson
 */
public abstract class AbstractVector2F implements Serializable {

    public abstract float getX();

    public abstract float getY();

    public float magnitude() { return (float) sqrt( magnitudeSquared() ); }

    public float magnitudeSquared() { return getX() * getX() + getY() * getY(); }

    public float dot( AbstractVector2F v ) {
        float result = 0;
        result += this.getX() * v.getX();
        result += this.getY() * v.getY();
        return result;
    }

    /**
     * Returns the angle of the vector. The angle will be between -pi and pi.
     *
     * @return the angle of the vector
     */
    public float getAngle() { return (float) Math.atan2( getY(), getX() ); }

    /**
     * Gets the distance between the tip of this vector and the specified vector.
     * Performance is important here since this is in the inner loop in a many-particle calculation in sugar and salt solutions: WaterModel
     *
     * @param v the vector to get the distance to
     * @return the cartesian distance between the vectors
     */
    public float distance( AbstractVector2F v ) {
        float dx = this.getX() - v.getX();
        float dy = this.getY() - v.getY();
        return (float) sqrt( dx * dx + dy * dy );
    }

    public float getCrossProductScalar( AbstractVector2F v ) {
        return (float) ( this.magnitude() * v.magnitude() * Math.sin( this.getAngle() - v.getAngle() ) );
    }

    public Vector2F normalized() {
        float magnitude = magnitude();
        if ( magnitude == 0 ) {
            throw new UnsupportedOperationException( "Cannot normalize a zero-magnitude vector." );
        }
        return new Vector2F( getX() / magnitude, getY() / magnitude );
    }

    public Vector2F getInstanceOfMagnitude( float magnitude ) { return times( magnitude / magnitude() ); }

    public Vector2F times( float scale ) { return new Vector2F( getX() * scale, getY() * scale ); }

    public Vector2F plus( AbstractVector2F v ) { return plus( v.getX(), v.getY() ); }

    public Vector2F plus( Dimension2D delta ) { return plus( (float) delta.getWidth(), (float) delta.getHeight() ); }

    public Vector2F plus( float x, float y ) { return new Vector2F( getX() + x, getY() + y ); }

    public Vector2F getPerpendicularVector() { return new Vector2F( getY(), -getX() ); }

    public Vector2F minus( float x, float y ) { return new Vector2F( getX() - x, getY() - y ); }

    public Vector2F minus( AbstractVector2F v ) { return minus( v.getX(), v.getY() ); }

    public Vector2F getRotatedInstance( float angle ) { return Vector2F.createPolar( magnitude(), getAngle() + angle ); }

    public Vector2D to2F() { return new Vector2D( getX(), getY() );}
}