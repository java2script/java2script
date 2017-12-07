package edu.colorado.phet.common.phetcommon.math.vector;

import edu.colorado.phet.common.phetcommon.math.QuaternionF;
import edu.colorado.phet.lombok.EqualsAndHashCode;
import edu.colorado.phet.lombok.ToString;

/**
 * 3D vector, with similar functionality to Vector2F
 *
 * @author Jonathan Olson
 */
public @EqualsAndHashCode(callSuper = false) @ToString class Vector3F extends AbstractVector3F {
    public final float x;
    public final float y;
    public final float z;
    
    @Override
    public int hashCode() {
      return Float.floatToIntBits(x) ^ Float.floatToIntBits(y) ^ Float.floatToIntBits(z);
    }
    
    @Override
		public boolean equals(Object o) {
    	if (!(o instanceof Vector3F)) {
    		return false;
    	}
    	Vector3F m = (Vector3F) o;
    	return (m.x == x && m.y == y && m.z == z);    		
    }
    


    // public instances so we don't need to duplicate these
    public static final Vector3F ZERO = new Vector3F();
    public static final Vector3F X_UNIT = new Vector3F( 1, 0, 0 );
    public static final Vector3F Y_UNIT = new Vector3F( 0, 1, 0 );
    public static final Vector3F Z_UNIT = new Vector3F( 0, 0, 1 );

    public Vector3F() { this( 0, 0, 0 ); }

    // initialize from a 2D vector, setting z=0
    public Vector3F( Vector2F v ) {
        x = v.x;
        y = v.y;
        z = 0;
    }

    public Vector3F( float x, float y, float z ) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public Vector3F( double x, double y, double z ) {
        this.x = (float) x;
        this.y = (float) y;
        this.z = (float) z;
    }

    @Override public float getX() { return x; }

    @Override public float getY() { return y; }

    @Override public float getZ() { return z; }

    /**
     * Spherical linear interpolation between two unit vectors.
     *
     * @param start Start unit vector
     * @param end   End unit vector
     * @param ratio Between 0 (at start vector) and 1 (at end vector)
     * @return Spherical linear interpolation between the start and end
     */
    public static Vector3F slerp( Vector3F start, Vector3F end, float ratio ) {
        return QuaternionF.slerp( new QuaternionF(  ), QuaternionF.getRotationQuaternion( start, end ), ratio ).times( start );
    }
}
