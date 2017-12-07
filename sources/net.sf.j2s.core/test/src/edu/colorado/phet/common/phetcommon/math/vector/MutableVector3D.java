// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.math.vector;

import edu.colorado.phet.lombok.EqualsAndHashCode;
import edu.colorado.phet.lombok.ToString;

/**
 * Provides a mutable version of AbstractVector3D
 *
 * @author Jonathan Olson
 */
public @EqualsAndHashCode(callSuper = false) @ToString class MutableVector3D extends AbstractVector3D {
    private double x;
    private double y;
    private double z;

    @Override
    public int hashCode() {
      return Float.floatToIntBits((float) x) ^ Float.floatToIntBits((float) y) ^ Float.floatToIntBits((float) z);
    }
    
    @Override
		public boolean equals(Object o) {
    	if (!(o instanceof MutableVector3D)) {
    		return false;
    	}
    	MutableVector3D m = (MutableVector3D) o;
    	return (m.x == x && m.y == y && m.z == z);    		
    }
    
    public MutableVector3D() {}

    public MutableVector3D( AbstractVector3D v ) { this( v.getX(), v.getY(), v.getZ() ); }

    public MutableVector3D( double x, double y, double z ) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    @Override public double getX() { return x; }

    @Override public double getY() { return y; }

    @Override public double getZ() { return z; }

    public MutableVector3D add( AbstractVector3D v ) {
        setX( getX() + v.getX() );
        setY( getY() + v.getY() );
        setZ( getZ() + v.getZ() );
        return this;
    }

    public MutableVector3D normalize() {
        double magnitude = magnitude();
        if ( magnitude == 0 ) {
            throw new UnsupportedOperationException( "Cannot normalize a zero-magnitude vector." );
        }
        return scale( 1.0 / magnitude );
    }

    public MutableVector3D negate() {
        setComponents( -getX(), -getY(), -getZ() );
        return this;
    }

    public MutableVector3D scale( double scale ) {
        setX( getX() * scale );
        setY( getY() * scale );
        setZ( getZ() * scale );
        return this;
    }

    public void setX( double x ) { this.x = x; }

    public void setY( double y ) { this.y = y; }

    public void setZ( double z ) { this.z = z; }

    // The reason that this seemingly redundant override exists is to make
    // this method public.
    public void setComponents( double x, double y, double z ) {
        setX( x );
        setY( y );
        setY( z );
    }

    public void setValue( AbstractVector3D value ) { setComponents( value.getX(), value.getY(), value.getZ() ); }

    public void setMagnitude( double magnitude ) {
        normalize();
        scale( magnitude );
    }

    public MutableVector3D subtract( AbstractVector3D v ) {
        setX( getX() - v.getX() );
        setY( getY() - v.getY() );
        setZ( getZ() - v.getZ() );
        return this;
    }
}