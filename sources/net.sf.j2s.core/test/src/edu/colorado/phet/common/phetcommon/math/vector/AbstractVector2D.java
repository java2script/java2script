// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.math.vector;

import java.awt.geom.Dimension2D;
import java.awt.geom.Point2D;
import java.io.Serializable;

import edu.colorado.phet.common.phetcommon.view.Dimension2DDouble;

import static java.lang.Math.sqrt;

/**
 * Abstract base class for vector2d classes (mutable and immutable), see #3374.
 * Lombok used to generate equals/hashcode/tostring in the subclasses.
 * Methods that return the immutable subclass (such as "plus") are declared here.  This is a vestigial by-product of our previous architecture
 * and means that MutableVector2D will have mutator methods as well as the immutable methods like "plus".
 *
 * @author Sam Reid
 */
public abstract class AbstractVector2D implements Serializable {

    public abstract double getX();

    public abstract double getY();

    public double magnitude() { return sqrt( magnitudeSquared() ); }

    public double magnitudeSquared() { return getX() * getX() + getY() * getY(); }

    public double dot( AbstractVector2D v ) {
        double result = 0;
        result += this.getX() * v.getX();
        result += this.getY() * v.getY();
        return result;
    }

    /**
     * Returns the angle of the vector. The angle will be between -pi and pi.
     *
     * @return the angle of the vector
     */
    public double getAngle() { return Math.atan2( getY(), getX() ); }

    public Point2D.Double toPoint2D() { return new Point2D.Double( getX(), getY() ); }

    /**
     * Gets the distance between the tip of this vector and the specified vector.
     * Performance is important here since this is in the inner loop in a many-particle calculation in sugar and salt solutions: WaterModel
     *
     * @param v the vector to get the distance to
     * @return the cartesian distance between the vectors
     */
    public double distance( AbstractVector2D v ) {
        double dx = this.getX() - v.getX();
        double dy = this.getY() - v.getY();
        return sqrt( dx * dx + dy * dy );
    }

    /**
     * Gets the distance between the tip of this vector and the specified vector.
     * Performance is important here since this is in the inner loop in a many-particle calculation in sugar and salt solutions: WaterModel
     *
     * @param v the vector to get the distance to
     * @return the cartesian distance between the vectors
     */
    public double distance2( AbstractVector2D v ) {
        double dx = this.getX() - v.getX();
        double dy = this.getY() - v.getY();
        return dx * dx + dy * dy;
    }

    public double distance( Point2D point ) { return distance( new Vector2D( point ) ); }

    //Transform this ImmutableVector2D into a Dimension2D
    public Dimension2D toDimension() { return new Dimension2DDouble( getX(), getY() ); }

    public Point2D.Double getDestination( Point2D startPt ) { return new Point2D.Double( startPt.getX() + getX(), startPt.getY() + getY() ); }

    public double getCrossProductScalar( AbstractVector2D v ) {
        return ( this.magnitude() * v.magnitude() * Math.sin( this.getAngle() - v.getAngle() ) );
    }

    public Vector2D normalized() {
        double magnitude = magnitude();
        if ( magnitude == 0 ) {
            throw new UnsupportedOperationException( "Cannot normalize a zero-magnitude vector." );
        }
        return new Vector2D( getX() / magnitude, getY() / magnitude );
    }

    public Vector2D getInstanceOfMagnitude( double magnitude ) { return times( magnitude / magnitude() ); }

    public Vector2D times( double scale ) { return new Vector2D( getX() * scale, getY() * scale ); }

    public Vector2D plus( AbstractVector2D v ) { return plus( v.getX(), v.getY() ); }

    public Vector2D plus( Dimension2D delta ) { return plus( delta.getWidth(), delta.getHeight() ); }

    public Vector2D plus( double x, double y ) { return new Vector2D( getX() + x, getY() + y ); }

    public Vector2D plus( Point2D p ) { return new Vector2D( getX() + p.getX(), getY() + p.getY() ); }

    public Vector2D getPerpendicularVector() { return new Vector2D( getY(), -getX() ); }

    public Vector2D minus( double x, double y ) { return new Vector2D( getX() - x, getY() - y ); }

    public Vector2D minus( AbstractVector2D v ) { return minus( v.getX(), v.getY() ); }

    public Vector2D getRotatedInstance( double angle ) { return Vector2D.createPolar( magnitude(), getAngle() + angle ); }

    public Vector2D negated() { return new Vector2D( -getX(), -getY() ); }

    public Vector2F to2F() { return new Vector2F( getX(), getY() ); }
}