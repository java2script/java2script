// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.math.vector;

import edu.colorado.phet.lombok.EqualsAndHashCode;
import edu.colorado.phet.lombok.ToString;

/**
 * ImmutableVector2F represents an (x,y) offset in Cartesian coordinates.
 * This class is immutable, which means that it cannot be modified.
 * There is a subclass Vector2F that adds mutable functionality.
 * Uses Lombok to generate equals/hashcode/toString.
 *
 * @author Ron LeMaster
 * @author Sam Reid
 * @author Jonathan Olson
 */
public @EqualsAndHashCode(callSuper = false) @ToString class Vector2F extends AbstractVector2F {
    public final float x;
    public final float y;
    
    @Override
    public int hashCode() {
      return Float.floatToIntBits(x) ^ Float.floatToIntBits(y);
    }
    
    @Override
		public boolean equals(Object o) {
    	if (!(o instanceof Vector2F)) {
    		return false;
    	}
    	Vector2F m = (Vector2F) o;
    	return (m.x == x && m.y == y);    		
    }
    


    //Immutable instance for zero so it doesn't need to be duplicated/re-instantiated in multiple places
    public static final Vector2F ZERO = new Vector2F();
    public static final Vector2F X_UNIT = new Vector2F( 1, 0 );
    public static final Vector2F Y_UNIT = new Vector2F( 0, 1 );

    public Vector2F() { this( 0, 0 ); }

    public Vector2F( float x, float y ) {
        this.x = x;
        this.y = y;
    }

    public Vector2F( double x, double y ) {
        this.x = (float) x;
        this.y = (float) y;
    }

    public Vector2F( AbstractVector2F v ) { this( v.getX(), v.getY() ); }

    /**
     * Create a new ImmutableVector2F based on the difference (final - initial) of the passed in vectors.
     * Note that the order of the arguments in (initial, final) even though the subtraction is (final - initial).
     * This is done for consistency with the pre-existing constructor ImmutableVector2F(Point2D,Point2D), and by the convention of passing in
     * the initial object first.
     *
     * @param initialPt starting point for the (final-initial) difference
     * @param finalPt   ending point for the (final-initial) difference
     */
    public Vector2F( Vector2F initialPt, Vector2F finalPt ) { this( finalPt.getX() - initialPt.getX(), finalPt.getY() - initialPt.getY() ); }

    @Override public float getY() { return y; }

    @Override public float getX() { return x; }

    public static Vector2F createPolar( float radius, float angle ) {
        return new Vector2F( (float) Math.cos( angle ), (float) Math.sin( angle ) ).times( radius );
    }

    public Vector2F negated() { return times( -1 ); }

    //Convenience creation method for when extreme terseness is desired
    public static Vector2F v( float x, float y ) {return new Vector2F( x, y );}
}