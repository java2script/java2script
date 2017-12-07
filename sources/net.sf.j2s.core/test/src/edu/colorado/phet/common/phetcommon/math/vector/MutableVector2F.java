// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.math.vector;

import edu.colorado.phet.lombok.EqualsAndHashCode;
import edu.colorado.phet.lombok.ToString;

/**
 * Vector2D represents an offset in (x,y) Cartesian coordinates.  This class has all the functionality of the parent
 * class (i.e. functions that do not change the state of this Vector2D and return an ImmutableVector2D) as well as
 * mutator functions.  Uses Lombok to generate equals/hashcode/toString.
 *
 * @author Sam Reid
 * @author Ron LeMaster
 */
public @EqualsAndHashCode(callSuper = false) @ToString class MutableVector2F extends AbstractVector2F {
    private float x;
    private float y;

    @Override
    public int hashCode() {
      return Float.floatToIntBits(x) ^ Float.floatToIntBits(y);
    }
    
    @Override
		public boolean equals(Object o) {
    	if (!(o instanceof MutableVector2F)) {
    		return false;
    	}
    	MutableVector2F m = (MutableVector2F) o;
    	return (m.x == x && m.y == y);    		
    }
    
    public MutableVector2F() {}

    public MutableVector2F( AbstractVector2F v ) { this( v.getX(), v.getY() ); }

    public MutableVector2F( float x, float y ) {
        this.x = x;
        this.y = y;
    }

    public MutableVector2F add( AbstractVector2F v ) {
        setX( getX() + v.getX() );
        setY( getY() + v.getY() );
        return this;
    }

    public MutableVector2F normalize() {
        float magnitude = magnitude();
        if ( magnitude == 0 ) {
            throw new UnsupportedOperationException( "Cannot normalize a zero-magnitude vector." );
        }
        return scale( 1f / magnitude );
    }

    public MutableVector2F scale( float scale ) {
        setX( getX() * scale );
        setY( getY() * scale );
        return this;
    }

    public void setX( float x ) { this.x = x; }

    public void setY( float y ) { this.y = y; }

    // The reason that this seemingly redundant override exists is to make
    // this method public.
    public void setComponents( float x, float y ) {
        setX( x );
        setY( y );
    }

    public void setValue( AbstractVector2F value ) { setComponents( value.getX(), value.getY() ); }

    public void setMagnitudeAndAngle( float magnitude, float angle ) {
        setComponents( (float) Math.cos( angle ) * magnitude, (float) Math.sin( angle ) * magnitude );
    }

    public void setMagnitude( float magnitude ) { setMagnitudeAndAngle( magnitude, getAngle() ); }

    public void setAngle( float angle ) { setMagnitudeAndAngle( magnitude(), angle ); }

    public MutableVector2F subtract( AbstractVector2F v ) {
        setX( getX() - v.getX() );
        setY( getY() - v.getY() );
        return this;
    }

    public MutableVector2F rotate( float theta ) {
        float r = magnitude();
        float alpha = getAngle();
        float gamma = alpha + theta;
        float xPrime = (float) ( r * Math.cos( gamma ) );
        float yPrime = (float) ( r * Math.sin( gamma ) );
        this.setComponents( xPrime, yPrime );
        return this;
    }

    public MutableVector2F negate() {
        setComponents( -getX(), -getY() );
        return this;
    }

    @Override public float getY() { return y; }

    @Override public float getX() { return x; }

    public static Vector2D createPolar( final float magnitude, final float angle ) { return Vector2D.createPolar( magnitude, angle ); }
}