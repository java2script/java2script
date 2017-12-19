// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.math.vector;

import edu.colorado.phet.lombok.EqualsAndHashCode;
import edu.colorado.phet.lombok.ToString;

/**
 * 4D vector, with similar functionality to Vector3F
 *
 * @author Jonathan Olson
 */
public @EqualsAndHashCode(callSuper = false) @ToString class Vector4F extends AbstractVector4F {
    public final float x;
    public final float y;
    public final float z;
    public final float w;

    // public instances so we don't need to duplicate these
    public static final Vector4F ZERO = new Vector4F();
    public static final Vector4F X_UNIT = new Vector4F( 1, 0, 0, 0 );
    public static final Vector4F Y_UNIT = new Vector4F( 0, 1, 0, 0 );
    public static final Vector4F Z_UNIT = new Vector4F( 0, 0, 1, 0 );
    public static final Vector4F W_UNIT = new Vector4F( 0, 0, 0, 1 );

    public Vector4F() {
        this( 0, 0, 0 );
    }

    public Vector4F( Vector3F v ) {
        this( v.getX(), v.getY(), v.getZ() );
    }

    // default to w == 1
    public Vector4F( float x, float y, float z ) {
        this( x, y, z, 1 );
    }

    public Vector4F( float x, float y, float z, float w ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public Vector4F( double x, double y, double z, double w ) {
        this.x = (float) x;
        this.y = (float) y;
        this.z = (float) z;
        this.w = (float) w;
    }

    @Override public float getX() {
        return x;
    }

    @Override public float getY() {
        return y;
    }

    @Override public float getZ() {
        return z;
    }

    @Override public float getW() {
        return w;
    }
}
