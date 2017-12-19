package edu.colorado.phet.common.phetcommon.math.vector;

import edu.colorado.phet.lombok.EqualsAndHashCode;
import edu.colorado.phet.lombok.ToString;

/**
 * 3D vector, with similar functionality to Vector2D
 *
 * @author Jonathan Olson
 */
public @EqualsAndHashCode(callSuper = false) @ToString class Vector3D extends AbstractVector3D {
    public final double x;
    public final double y;
    public final double z;
    
    @Override
    public int hashCode() {
      return Float.floatToIntBits((float) x) ^ Float.floatToIntBits((float) y) ^ Float.floatToIntBits((float) z);
    }
    
    @Override
		public boolean equals(Object o) {
    	if (!(o instanceof Vector3D)) {
    		return false;
    	}
    	Vector3D m = (Vector3D) o;
    	return (m.x == x && m.y == y && m.z == z);    		
    }
    


    // public instances so we don't need to duplicate these
    public static final Vector3D ZERO = new Vector3D();
    public static final Vector3D X_UNIT = new Vector3D( 1, 0, 0 );
    public static final Vector3D Y_UNIT = new Vector3D( 0, 1, 0 );
    public static final Vector3D Z_UNIT = new Vector3D( 0, 0, 1 );

    public Vector3D() { this( 0, 0, 0 ); }

    public Vector3D( double x, double y, double z ) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    @Override public double getX() { return x; }

    @Override public double getY() { return y; }

    @Override public double getZ() { return z; }
}
