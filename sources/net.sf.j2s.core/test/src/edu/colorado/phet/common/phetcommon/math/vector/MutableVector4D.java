// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.math.vector;

import edu.colorado.phet.lombok.EqualsAndHashCode;
import edu.colorado.phet.lombok.ToString;

/**
 * Provides a mutable version of AbstractVector4D
 *
 * @author Jonathan Olson
 */
public @EqualsAndHashCode(callSuper = false) @ToString class MutableVector4D extends AbstractVector4D {
    private double x;
    private double y;
    private double z;
    private double w;

    @Override
    public int hashCode() {
      return Float.floatToIntBits((float) x) ^ Float.floatToIntBits((float) y) ^ Float.floatToIntBits((float) z) ^ Float.floatToIntBits((float) w);
    }
    
    @Override
		public boolean equals(Object o) {
    	if (!(o instanceof MutableVector4D)) {
    		return false;
    	}
    	MutableVector4D m = (MutableVector4D) o;
    	return (m.x == x && m.y == y && m.z == z && m.w == w);    		
    }
    
    public MutableVector4D() {}

    public MutableVector4D( AbstractVector4D v ) { this( v.getX(), v.getY(), v.getZ(), v.getW() ); }

    public MutableVector4D( double x, double y, double z, double w ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    @Override public double getX() { return x; }

    @Override public double getY() { return y; }

    @Override public double getZ() { return z; }

    @Override public double getW() { return w; }

    public MutableVector4D add( AbstractVector4D v ) {
        setX( getX() + v.getX() );
        setY( getY() + v.getY() );
        setZ( getZ() + v.getZ() );
        setW( getW() + v.getW() );
        return this;
    }

    public MutableVector4D normalize() {
        double magnitude = magnitude();
        if ( magnitude == 0 ) {
            throw new UnsupportedOperationException( "Cannot normalize a zero-magnitude vector." );
        }
        return scale( 1.0 / magnitude );
    }

    public MutableVector4D scale( double scale ) {
        setX( getX() * scale );
        setY( getY() * scale );
        setZ( getZ() * scale );
        setW( getW() * scale );
        return this;
    }

    public MutableVector4D negate() {
        setComponents( -getX(), -getY(), -getZ(), -getW() );
        return this;
    }

    public void setX( double x ) { this.x = x; }

    public void setY( double y ) { this.y = y; }

    public void setZ( double z ) { this.z = z; }

    public void setW( double w ) { this.w = w; }

    // The reason that this seemingly redundant override exists is to make
    // this method public.
    public void setComponents( double x, double y, double z, double w ) {
        setX( x );
        setY( y );
        setY( z );
        setW( w );
    }

    public void setValue( AbstractVector4D value ) { setComponents( value.getX(), value.getY(), value.getZ(), value.getW() ); }

    public void setMagnitude( double magnitude ) {
        normalize();
        scale( magnitude );
    }

    public MutableVector4D subtract( AbstractVector4D v ) {
        setX( getX() - v.getX() );
        setY( getY() - v.getY() );
        setZ( getZ() - v.getZ() );
        setW( getW() - v.getW() );
        return this;
    }
}