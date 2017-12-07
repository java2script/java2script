// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.math.vector;

import edu.colorado.phet.lombok.EqualsAndHashCode;
import edu.colorado.phet.lombok.ToString;

/**
 * Provides a mutable version of AbstractVector4F
 *
 * @author Jonathan Olson
 */
public @EqualsAndHashCode(callSuper = false) @ToString class MutableVector4F extends AbstractVector4F {
    private float x;
    private float y;
    private float z;
    private float w;

    @Override
    public int hashCode() {
      return Float.floatToIntBits(x) ^ Float.floatToIntBits(y) ^ Float.floatToIntBits(z) ^ Float.floatToIntBits(w);
    }
    
    @Override
		public boolean equals(Object o) {
    	if (!(o instanceof MutableVector4F)) {
    		return false;
    	}
    	MutableVector4F m = (MutableVector4F) o;
    	return (m.x == x && m.y == y && m.z == z && m.w == w);    		
    }
    
    public MutableVector4F() {}

    public MutableVector4F( AbstractVector4F v ) { this( v.getX(), v.getY(), v.getZ(), v.getW() ); }

    public MutableVector4F( float x, float y, float z, float w ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    @Override public float getX() { return x; }

    @Override public float getY() { return y; }

    @Override public float getZ() { return z; }

    @Override public float getW() { return w; }

    public MutableVector4F add( AbstractVector4F v ) {
        setX( getX() + v.getX() );
        setY( getY() + v.getY() );
        setZ( getZ() + v.getZ() );
        setW( getW() + v.getW() );
        return this;
    }

    public MutableVector4F normalize() {
        float magnitude = magnitude();
        if ( magnitude == 0 ) {
            throw new UnsupportedOperationException( "Cannot normalize a zero-magnitude vector." );
        }
        return scale( 1f / magnitude );
    }

    public MutableVector4F scale( float scale ) {
        setX( getX() * scale );
        setY( getY() * scale );
        setZ( getZ() * scale );
        setW( getW() * scale );
        return this;
    }

    public MutableVector4F negate() {
        setComponents( -getX(), -getY(), -getZ(), -getW() );
        return this;
    }

    public void setX( float x ) { this.x = x; }

    public void setY( float y ) { this.y = y; }

    public void setZ( float z ) { this.z = z; }

    public void setW( float w ) { this.w = w; }

    // The reason that this seemingly redundant override exists is to make
    // this method public.
    public void setComponents( float x, float y, float z, float w ) {
        setX( x );
        setY( y );
        setY( z );
        setW( w );
    }

    public void setValue( AbstractVector4F value ) { setComponents( value.getX(), value.getY(), value.getZ(), value.getW() ); }

    public void setMagnitude( float magnitude ) {
        normalize();
        scale( magnitude );
    }

    public MutableVector4F subtract( AbstractVector4F v ) {
        setX( getX() - v.getX() );
        setY( getY() - v.getY() );
        setZ( getZ() - v.getZ() );
        setW( getW() - v.getW() );
        return this;
    }
}