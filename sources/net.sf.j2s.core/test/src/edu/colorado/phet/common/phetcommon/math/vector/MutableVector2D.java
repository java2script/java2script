// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.math.vector;

import java.awt.geom.Point2D;

import edu.colorado.phet.lombok.EqualsAndHashCode;
import edu.colorado.phet.lombok.ToString;

/**
 * MutableVector2D represents an offset in (x,y) Cartesian coordinates.
 * This class has all the functionality of Vector2D (the immutable version), as well as mutator functions.
 * Uses Lombok to generate equals/hashcode/toString.
 *
 * @author Sam Reid
 * @author Ron LeMaster
 */
@SuppressWarnings("serial")
public @EqualsAndHashCode(callSuper = false) @ToString class MutableVector2D extends AbstractVector2D {
    private double x;
    private double y;
    
    @Override
    public int hashCode() {
      return Float.floatToIntBits((float) x) ^ Float.floatToIntBits((float) y);
    }
    
    @Override
		public boolean equals(Object o) {
    	if (!(o instanceof MutableVector2D)) {
    		return false;
    	}
    	MutableVector2D m = (MutableVector2D) o;
    	return (m.x == x && m.y == y);    		
    }
    


    public MutableVector2D() {}

    public MutableVector2D( AbstractVector2D v ) { this( v.getX(), v.getY() ); }

    public MutableVector2D( double x, double y ) {
        this.x = x;
        this.y = y;
    }

    public MutableVector2D( Point2D p ) { this( p.getX(), p.getY() ); }

    public MutableVector2D( Point2D src, Point2D dst ) {
        this.x = dst.getX() - src.getX();
        this.y = dst.getY() - src.getY();
    }

    public MutableVector2D add( AbstractVector2D v ) {
        x += v.getX();
        y += v.getY();
        return this;
    }

    public MutableVector2D normalize() {
        double magnitude = magnitude();
        if ( magnitude == 0 ) {
            throw new UnsupportedOperationException( "Cannot normalize a zero-magnitude vector." );
        }
        return scale( 1.0 / magnitude );
    }

    public MutableVector2D scale( double scale ) {
        x *= scale;
        y *= scale;
        return this;
    }

    public void setX( double x ) { this.x = x; }

    public void setY( double y ) { this.y = y; }
    
    
    // The reason that this seemingly redundant override exists is to make
    // this method public.
    public void setComponents( double x, double y ) {
			this.x = x;
			this.y = y;
    }

    public void setValue( AbstractVector2D value ) { setComponents( value.getX(), value.getY() ); }

    public void setMagnitudeAndAngle( double magnitude, double angle ) {
        setComponents( Math.cos( angle ) * magnitude, Math.sin( angle ) * magnitude );
    }

    public void setMagnitude( double magnitude ) { setMagnitudeAndAngle( magnitude, getAngle() ); }

    public void setAngle( double angle ) { setMagnitudeAndAngle( magnitude(), angle ); }

    public MutableVector2D subtract( AbstractVector2D v ) {
        x -= v.getX();
        y -= v.getY();
        return this;
    }

    public MutableVector2D rotate( double theta ) {
        double r = magnitude();
        double alpha = getAngle();
        double gamma = alpha + theta;
        double xPrime = r * Math.cos( gamma );
        double yPrime = r * Math.sin( gamma );
        this.setComponents( xPrime, yPrime );
        return this;
    }

    public MutableVector2D negate() {
        setComponents( -getX(), -getY() );
        return this;
    }

    @Override public double getY() { return y; }

    @Override public double getX() { return x; }

    /**
     * BH added to use fewer "new" calls
     * 
     * @param x
     * @param y
     */
		public void addXY(double x, double y) { // BH
			this.x += x;
			this.y += y;
		}

    public static Vector2D createPolar( final double magnitude, final double angle ) { return Vector2D.createPolar( magnitude, angle ); }

    public static void main( String[] args ) {
        MutableVector2D v = new MutableVector2D( 0, 0 );
        System.out.println( "v = " + v );
        System.out.println( "v.hashCode() = " + v.hashCode() );
        MutableVector2D b = new MutableVector2D( 1, 2 );
        MutableVector2D c = new MutableVector2D( 0, 0 );
        System.out.println( "v.equals( b ) = " + v.equals( b ) + " (should be false)" );
        System.out.println( "v.equals( c ) = " + v.equals( c ) + " (should be true)" );
    }

}