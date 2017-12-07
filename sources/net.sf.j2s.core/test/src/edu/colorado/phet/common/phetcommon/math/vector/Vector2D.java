// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.math.vector;

import java.awt.geom.Dimension2D;
import java.awt.geom.Line2D;
import java.awt.geom.Point2D;

import edu.colorado.phet.lombok.EqualsAndHashCode;
import edu.colorado.phet.lombok.ToString;

/**
 * Vector2D represents an (x,y) offset in Cartesian coordinates.
 * This class is immutable, which means that it cannot be modified.
 * If you need mutability, see MutableVector2D.
 * Uses Lombok to generate equals/hashcode/toString.
 *
 * @author Ron LeMaster
 * @author Sam Reid
 */
public @EqualsAndHashCode(callSuper = false) @ToString class Vector2D extends AbstractVector2D {
    public final double x;
    public final double y;

    @Override
    public int hashCode() {
      return Float.floatToIntBits((float) x) ^ Float.floatToIntBits((float) y);
    }
    
    @Override
		public boolean equals(Object o) {
    	if (!(o instanceof Vector2D)) {
    		return false;
    	}
    	Vector2D m = (Vector2D) o;
    	return (m.x == x && m.y == y);    		
    }
    

    //Immutable instance for zero so it doesn't need to be duplicated/re-instantiated in multiple places
    public static final Vector2D ZERO = new Vector2D();
    public static final Vector2D X_UNIT = new Vector2D( 1, 0 );
    public static final Vector2D Y_UNIT = new Vector2D( 0, 1 );

    public Vector2D() { this( 0, 0 ); }

    public Vector2D( double x, double y ) {
        this.x = x;
        this.y = y;
    }

		public double distance2p(Point2D pt) {
			double a, b;
			return (a = pt.getX() - x)*a + (b = pt.getY() - y) * b; 
		}

    public Vector2D( AbstractVector2D v ) { this( v.getX(), v.getY() ); }

    public Vector2D( Point2D p ) { this( p.getX(), p.getY() ); }

    public Vector2D( Point2D initialPt, Point2D finalPt ) { this( finalPt.getX() - initialPt.getX(), finalPt.getY() - initialPt.getY() ); }

    /**
     * Create a new ImmutableVector2D based on the difference (final - initial) of the passed in vectors.
     * Note that the order of the arguments in (initial, final) even though the subtraction is (final - initial).
     * This is done for consistency with the pre-existing constructor ImmutableVector2D(Point2D,Point2D), and by the convention of passing in
     * the initial object first.
     *
     * @param initialPt starting point for the (final-initial) difference
     * @param finalPt   ending point for the (final-initial) difference
     */
    public Vector2D( Vector2D initialPt, Vector2D finalPt ) { this( finalPt.getX() - initialPt.getX(), finalPt.getY() - initialPt.getY() ); }

    public Vector2D( Dimension2D v ) { this( v.getWidth(), v.getHeight() ); }

    @Override public double getY() { return y; }

    @Override public double getX() { return x; }

    public static Vector2D createPolar( double radius, double angle ) { return new Vector2D( Math.cos( angle ), Math.sin( angle ) ).times( radius ); }

    //Convenience creation method for when extreme terseness is desired
    public static Vector2D v( double x, double y ) {return new Vector2D( x, y );}

    //Creates a line from this point to the specified point
    public Line2D.Double lineTo( final double x, final double y ) { return new Line2D.Double( this.x, this.y, x, y ); }

    //Creates a line from this point to the specified point
    public Line2D.Double lineTo( final Vector2D end ) { return lineTo( end.x, end.y ); }

    public static void main( String[] args ) {
        Vector2D v = new Vector2D( 0, 0 );
        System.out.println( "v = " + v );
        System.out.println( "v.hashCode() = " + v.hashCode() );
        Vector2D b = new Vector2D( 1, 2 );
        Vector2D c = new Vector2D( 0, 0 );
        System.out.println( "v.equals( b ) = " + v.equals( b ) + " (should be false)" );
        System.out.println( "v.equals( c ) = " + v.equals( c ) + " (should be true)" );
        System.out.println( "2root2= " + new Vector2D( 0, 0 ).distance( new Vector2D( 1, 1 ) ) );
    }

}