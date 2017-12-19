// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.math;

import java.nio.FloatBuffer;

import edu.colorado.phet.common.phetcommon.math.vector.Vector2F;
import edu.colorado.phet.common.phetcommon.math.vector.Vector3F;
import edu.colorado.phet.lombok.EqualsAndHashCode;

import static edu.colorado.phet.common.phetcommon.util.FunctionalUtils.mkString;
import static java.util.Arrays.asList;

/**
 * Immutable 3x3 matrix, with similarly-named methods as the vector classes.
 *
 * @author Jonathan Olson
 */
public @EqualsAndHashCode(callSuper = false, exclude = "type") class Matrix3F {

    // entries in row-major order (v<row><column>, both starting from 0)
    public final float v00, v01, v02, v10, v11, v12, v20, v21, v22;

    @Override
    public int hashCode() {
      return Float.floatToIntBits(v00) ^ Float.floatToIntBits(v01)
          ^ Float.floatToIntBits(v02) ^ Float.floatToIntBits(v10)
          ^ Float.floatToIntBits(v11) ^ Float.floatToIntBits(v12)
          ^ Float.floatToIntBits(v20) ^ Float.floatToIntBits(v21)
          ^ Float.floatToIntBits(v22);
    }
    
    @Override
		public boolean equals(Object o) {
    	if (!(o instanceof Matrix3F)) {
    		return false;
    	}
    	Matrix3F m = (Matrix3F) o;
    	return (m.v00 == v00 && m.v01 == v01 && m.v02 == v02
    			&&  m.v10 == v10 && m.v11 == v11 && m.v12 == v12
    			&&  m.v20 == v20 && m.v21 == v21 && m.v22 == v22);    		
    }
    
    // keep track of matrix type so we can better handle OpenGL uses (like just using translation)
    public final MatrixType type;

    public static enum MatrixType {
        IDENTITY, // strictly the identity
        TRANSLATION_2D, // identity + translation
        SCALING, // scaled identity matrix
        OTHER // anything (including one of the above)
    }

    // easily accessible identity matrix
    public static final Matrix3F IDENTITY = rowMajor( 1, 0, 0,
                                                      0, 1, 0,
                                                      0, 0, 1,
                                                      MatrixType.IDENTITY );

    /*---------------------------------------------------------------------------*
    * static constructors
    *----------------------------------------------------------------------------*/

    public static Matrix3F translation( float x, float y ) {
        return rowMajor( 1, 0, x,
                         0, 1, y,
                         0, 0, 1,
                         MatrixType.TRANSLATION_2D );
    }

    public static Matrix3F scaling( float s ) {
        return scaling( s, s, s );
    }

    public static Matrix3F scaling( float x, float y, float z ) {
        return rowMajor( x, 0, 0,
                         0, y, 0,
                         0, 0, z,
                         MatrixType.SCALING );
    }

    /**
     * Returns a matrix rotation around the given axis at the specified angle
     *
     * @param angle the angle, in radians.
     * @param axis  The vector representing the rotation axis. Must be normalized.
     * @return The rotation matrix
     */
    public static Matrix3F rotation( Vector3F axis, float angle ) {
        float c = (float) Math.cos( angle );
        float s = (float) Math.sin( angle );
        float C = 1 - c;

        float x = axis.getX();
        float y = axis.getY();
        float z = axis.getZ();

        return rowMajor( x * x * C + c, x * y * C - z * s, x * z * C + y * s,
                         y * x * C + z * s, y * y * C + c, y * z * C - x * s,
                         z * x * C - y * s, z * y * C + x * s, z * z * C + c,
                         MatrixType.OTHER );
    }

    public static Matrix3F rotation( QuaternionF quaternion ) {
        return quaternion.toRotationMatrix();
    }

    public static Matrix3F rotationX( float angle ) {
        float c = (float) Math.cos( angle );
        float s = (float) Math.sin( angle );

        return rowMajor( 1, 0, 0,
                         0, c, -s,
                         0, s, c,
                         MatrixType.OTHER );
    }

    public static Matrix3F rotationY( float angle ) {
        float c = (float) Math.cos( angle );
        float s = (float) Math.sin( angle );

        return rowMajor( c, 0, s,
                         0, 1, 0,
                         -s, 0, c,
                         MatrixType.OTHER );
    }

    public static Matrix3F rotationZ( float angle ) {
        float c = (float) Math.cos( angle );
        float s = (float) Math.sin( angle );

        return rowMajor( c, -s, 0,
                         s, c, 0,
                         0, 0, 1,
                         MatrixType.OTHER );
    }

    public static Matrix3F rowMajor( float v00, float v01, float v02,
                                     float v10, float v11, float v12,
                                     float v20, float v21, float v22 ) {
        return rowMajor( v00, v01, v02,
                         v10, v11, v12,
                         v20, v21, v22,
                         MatrixType.OTHER );
    }

    public static Matrix3F rowMajor( float v00, float v01, float v02,
                                     float v10, float v11, float v12,
                                     float v20, float v21, float v22,
                                     MatrixType type ) {
        return new Matrix3F( v00, v01, v02, v10, v11, v12, v20, v21, v22, type );
    }

    public static Matrix3F columnMajor( float v00, float v10, float v20,
                                        float v01, float v11, float v21,
                                        float v02, float v12, float v22 ) {
        return columnMajor( v00, v10, v20,
                            v01, v11, v21,
                            v02, v12, v22,
                            MatrixType.OTHER );
    }

    public static Matrix3F columnMajor( float v00, float v10, float v20,
                                        float v01, float v11, float v21,
                                        float v02, float v12, float v22,
                                        MatrixType type ) {
        return new Matrix3F( v00, v01, v02,
                             v10, v11, v12,
                             v20, v21, v22,
                             type );
    }

    // a rotation matrix that rotates A to B, by rotating about the axis A.cross( B ) -- Shortest path. ideally should be unit vectors
    public static Matrix3F rotateAToB( Vector3F a, Vector3F b ) {
        // see http://graphics.cs.brown.edu/~jfh/papers/Moller-EBA-1999/paper.pdf for information on this implementation
        Vector3F start = a;
        Vector3F end = b;

        float epsilon = 0.0001f;

        float e, h, f;

        Vector3F v = start.cross( end );
        e = start.dot( end );
        f = ( e < 0 ) ? -e : e;

        // if "from" and "to" vectors are nearly parallel
        if ( f > 1.0f - epsilon ) {
            float c1, c2, c3; /* coefficients for later use */
//            int i, j;

            Vector3F x = new Vector3F(
                    ( start.x > 0.0 ) ? start.x : -start.x,
                    ( start.y > 0.0 ) ? start.y : -start.y,
                    ( start.z > 0.0 ) ? start.z : -start.z
            );

            if ( x.x < x.y ) {
                if ( x.x < x.z ) {
                    x = Vector3F.X_UNIT;
                }
                else {
                    x = Vector3F.Z_UNIT;
                }
            }
            else {
                if ( x.y < x.z ) {
                    x = Vector3F.Y_UNIT;
                }
                else {
                    x = Vector3F.Z_UNIT;
                }
            }

            Vector3F u = x.minus( start );
            v = x.minus( end );

            c1 = 2.0f / u.dot( u );
            c2 = 2.0f / v.dot( v );
            c3 = c1 * c2 * u.dot( v );

            return Matrix3F.IDENTITY.plus( Matrix3F.rowMajor(
                    -c1 * u.x * u.x - c2 * v.x * v.x + c3 * v.x * u.x,
                    -c1 * u.x * u.y - c2 * v.x * v.y + c3 * v.x * u.y,
                    -c1 * u.x * u.z - c2 * v.x * v.z + c3 * v.x * u.z,
                    -c1 * u.y * u.x - c2 * v.y * v.x + c3 * v.y * u.x,
                    -c1 * u.y * u.y - c2 * v.y * v.y + c3 * v.y * u.y,
                    -c1 * u.y * u.z - c2 * v.y * v.z + c3 * v.y * u.z,
                    -c1 * u.z * u.x - c2 * v.z * v.x + c3 * v.z * u.x,
                    -c1 * u.z * u.y - c2 * v.z * v.y + c3 * v.z * u.y,
                    -c1 * u.z * u.z - c2 * v.z * v.z + c3 * v.z * u.z
            ) );
        }
        else {
            // the most common case, unless "start"="end", or "start"=-"end"
            float hvx, hvz, hvxy, hvxz, hvyz;
            h = 1.0f / ( 1.0f + e );
            hvx = h * v.x;
            hvz = h * v.z;
            hvxy = hvx * v.y;
            hvxz = hvx * v.z;
            hvyz = hvz * v.y;

            return Matrix3F.rowMajor(
                    e + hvx * v.x, hvxy - v.z, hvxz + v.y,
                    hvxy + v.z, e + h * v.y * v.y, hvyz - v.x,
                    hvxz - v.y, hvyz + v.x, e + hvz * v.z
            );
        }
    }

    /*---------------------------------------------------------------------------*
    * constructors
    *----------------------------------------------------------------------------*/

    // row-major order
    protected Matrix3F( float v00, float v01, float v02,
                        float v10, float v11, float v12,
                        float v20, float v21, float v22,
                        MatrixType type ) {
        this.v00 = v00;
        this.v10 = v10;
        this.v20 = v20;
        this.v01 = v01;
        this.v11 = v11;
        this.v21 = v21;
        this.v02 = v02;
        this.v12 = v12;
        this.v22 = v22;
        this.type = type;
    }

    public Matrix4F toMatrix4f() {
        return Matrix4F.rowMajor(
                v00, v01, v02, 0,
                v10, v11, v12, 0,
                v20, v21, v22, 0,
                0, 0, 0, 1
        );
    }

    public Matrix3F plus( Matrix3F m ) {
        return rowMajor( v00 + m.v00, v01 + m.v01, v02 + m.v02,
                         v10 + m.v10, v11 + m.v11, v12 + m.v12,
                         v20 + m.v20, v21 + m.v21, v22 + m.v22 );
    }

    public Matrix3F minus( Matrix3F m ) {
        return rowMajor( v00 - m.v00, v01 - m.v01, v02 - m.v02,
                         v10 - m.v10, v11 - m.v11, v12 - m.v12,
                         v20 - m.v20, v21 - m.v21, v22 - m.v22 );
    }

    public Matrix3F times( Matrix3F m ) {
        MatrixType type = MatrixType.OTHER;
        if ( this.type == MatrixType.TRANSLATION_2D && m.type == MatrixType.TRANSLATION_2D ) {
            type = MatrixType.TRANSLATION_2D;
        }
        if ( this.type == MatrixType.SCALING && m.type == MatrixType.SCALING ) {
            type = MatrixType.SCALING;
        }
        if ( this.type == MatrixType.IDENTITY ) {
            type = m.type;
        }
        if ( m.type == MatrixType.IDENTITY ) {
            type = this.type;
        }
        return rowMajor( this.v00 * m.v00 + this.v01 * m.v10 + this.v02 * m.v20,
                         this.v00 * m.v01 + this.v01 * m.v11 + this.v02 * m.v21,
                         this.v00 * m.v02 + this.v01 * m.v12 + this.v02 * m.v22,
                         this.v10 * m.v00 + this.v11 * m.v10 + this.v12 * m.v20,
                         this.v10 * m.v01 + this.v11 * m.v11 + this.v12 * m.v21,
                         this.v10 * m.v02 + this.v11 * m.v12 + this.v12 * m.v22,
                         this.v20 * m.v00 + this.v21 * m.v10 + this.v22 * m.v20,
                         this.v20 * m.v01 + this.v21 * m.v11 + this.v22 * m.v21,
                         this.v20 * m.v02 + this.v21 * m.v12 + this.v22 * m.v22,
                         type );
    }

    // regular multiplication
    public Vector3F times( Vector3F v ) {
        return new Vector3F(
                this.v00 * v.getX() + this.v01 * v.getY() + this.v02 * v.getZ(),
                this.v10 * v.getX() + this.v11 * v.getY() + this.v12 * v.getZ(),
                this.v20 * v.getX() + this.v21 * v.getY() + this.v22 * v.getZ()
        );
    }

    // multiplication of the transpose of this matrix and v
    public Vector3F timesTranspose( Vector3F v ) {
        return new Vector3F(
                this.v00 * v.getX() + this.v10 * v.getY() + this.v20 * v.getZ(),
                this.v01 * v.getX() + this.v11 * v.getY() + this.v21 * v.getZ(),
                this.v02 * v.getX() + this.v12 * v.getY() + this.v22 * v.getZ()
        );
    }

    public Matrix3F transposed() {
        return rowMajor( v00, v10, v20,
                         v01, v11, v21,
                         v02, v12, v22 );
    }

    public float determinant() {
        return v00 * v11 * v22 + v01 * v12 * v20 + v02 * v10 * v21 - v02 * v11 * v20 - v01 * v10 * v22 - v00 * v12 * v21;
    }

    public Matrix3F negated() {
        return rowMajor( -v00, -v01, -v02,
                         -v10, -v11, -v12,
                         -v20, -v21, -v22 );
    }

    public Matrix3F inverted() {
        float determinant = determinant();

        if ( determinant != 0 ) {
            return rowMajor(
                    ( -v12 * v21 + v11 * v22 ) / determinant,
                    ( v02 * v21 - v01 * v22 ) / determinant,
                    ( -v02 * v11 + v01 * v12 ) / determinant,
                    ( v12 * v20 - v10 * v22 ) / determinant,
                    ( -v02 * v20 + v00 * v22 ) / determinant,
                    ( v02 * v10 - v00 * v12 ) / determinant,
                    ( -v11 * v20 + v10 * v21 ) / determinant,
                    ( v01 * v20 - v00 * v21 ) / determinant,
                    ( -v01 * v10 + v00 * v11 ) / determinant
            );
        }
        else {
            throw new RuntimeException( "Matrix could not be inverted" );
        }
    }


    /**
     * Store this matrix in a float buffer. The matrix is stored in column
     * major (openGL) order.
     * <p/>
     * Additionally, it is written in the 4x4 matrix format
     *
     * @param buf The buffer to store this matrix in
     */
    public void writeToBuffer( FloatBuffer buf ) {
        buf.rewind();
        buf.put( new float[]{
                v00, v10, v20, 0,
                v01, v11, v21, 0,
                v02, v12, v22, 0,
                0, 0, 0, 1
        } );
    }

    /**
     * Store this matrix in a float buffer. The matrix is stored in row
     * major (maths) order.
     * <p/>
     * Additionally, it is written in the 4x4 matrix format
     *
     * @param buf The buffer to store this matrix in
     */
    public void writeTransposeToBuffer( FloatBuffer buf ) {
        buf.rewind();
        buf.put( new float[]{
                v00, v01, v02, 0,
                v10, v11, v12, 0,
                v20, v21, v22, 0,
                0, 0, 0, 1
        } );
    }

    @Override
		public String toString() {
        return mkString( asList(
                mkString( asList( v00, v01, v02 ), " " ),
                mkString( asList( v10, v11, v12 ), " " ),
                mkString( asList( v20, v21, v22 ), " " )
        ), "\n" );
    }

    public Vector2F getTranslation() {
        return new Vector2F( v02, v12 );
    }

    public Vector3F getScaling() {
        return new Vector3F( v00, v11, v22 );
    }

    // allows slight numerical imprecision, due to rounding errors that may be lost in intermediate computations
    public boolean equalsWithEpsilon( Matrix3F m, float epsilon ) {
        return Math.abs( v00 - m.v00 ) < epsilon
               && Math.abs( v01 - m.v01 ) < epsilon
               && Math.abs( v02 - m.v02 ) < epsilon
               && Math.abs( v10 - m.v10 ) < epsilon
               && Math.abs( v11 - m.v11 ) < epsilon
               && Math.abs( v12 - m.v12 ) < epsilon
               && Math.abs( v20 - m.v20 ) < epsilon
               && Math.abs( v21 - m.v21 ) < epsilon
               && Math.abs( v22 - m.v22 ) < epsilon;
    }
}
