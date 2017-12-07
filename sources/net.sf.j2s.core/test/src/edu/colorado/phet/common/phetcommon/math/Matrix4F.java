// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.math;

import java.nio.FloatBuffer;

import edu.colorado.phet.common.phetcommon.math.vector.Vector3F;
import edu.colorado.phet.common.phetcommon.math.vector.Vector4F;
import edu.colorado.phet.lombok.EqualsAndHashCode;

import static edu.colorado.phet.common.phetcommon.util.FunctionalUtils.mkString;
import static java.util.Arrays.asList;

/**
 * Immutable 4x4 matrix, with similarly-named methods as the vector classes.
 *
 * @author Jonathan Olson
 */
public @EqualsAndHashCode(callSuper = false) class Matrix4F {

    // entries in row-major order (v<row><column>, both starting from 0)
    public final float v00, v01, v02, v03, v10, v11, v12, v13, v20, v21, v22, v23, v30, v31, v32, v33;

    
    @Override
    public int hashCode() {
      return Float.floatToIntBits(v00) ^ Float.floatToIntBits(v01)
          ^ Float.floatToIntBits(v02) ^ Float.floatToIntBits(v03) ^ Float.floatToIntBits(v10)
          ^ Float.floatToIntBits(v11) ^ Float.floatToIntBits(v12) ^ Float.floatToIntBits(v13)
          ^ Float.floatToIntBits(v20) ^ Float.floatToIntBits(v21)
          ^ Float.floatToIntBits(v22) ^ Float.floatToIntBits(v23)
          ^ Float.floatToIntBits(v30) ^ Float.floatToIntBits(v31)
          ^ Float.floatToIntBits(v32) ^ Float.floatToIntBits(v33)
          ;
    }
    
    @Override
		public boolean equals(Object o) {
    	if (!(o instanceof Matrix4F)) {
    		return false;
    	}
    	Matrix4F m = (Matrix4F) o;
    	return (m.v00 == v00 && m.v01 == v01 && m.v02 == v02 && m.v03 == v03
    			&&  m.v10 == v10 && m.v11 == v11 && m.v12 == v12 && m.v13 == v13
    			&&  m.v20 == v20 && m.v21 == v21 && m.v22 == v22 && m.v23 == v23
    			&&  m.v30 == v30 && m.v31 == v31 && m.v32 == v32 && m.v33 == v33
    			);    		
    }
    
    // keep track of matrix type so we can better handle OpenGL uses (like just using translation)
    public final MatrixType type;

    public static enum MatrixType {
        IDENTITY, // strictly the identity
        TRANSLATION_3D, // identity + translation
        SCALING, // scaled identity matrix
        OTHER // anything (including one of the above)
    }

    // easily accessible identity matrix
    public static final Matrix4F IDENTITY = rowMajor( 1, 0, 0, 0,
                                                      0, 1, 0, 0,
                                                      0, 0, 1, 0,
                                                      0, 0, 0, 1,
                                                      MatrixType.IDENTITY );

    /*---------------------------------------------------------------------------*
    * static constructors
    *----------------------------------------------------------------------------*/

    public static Matrix4F fromMatrix3f( Matrix3F m ) {
        return m.toMatrix4f();
    }

    public static Matrix4F translation( float x, float y, float z ) {
        return rowMajor( 1, 0, 0, x,
                         0, 1, 0, y,
                         0, 0, 1, z,
                         0, 0, 0, 1,
                         MatrixType.TRANSLATION_3D );
    }

    public static Matrix4F translation( Vector3F v ) {
        return translation( v.x, v.y, v.z );
    }

    public static Matrix4F scaling( float s ) {
        return scaling( s, s, s );
    }

    public static Matrix4F scaling( float x, float y, float z ) {
        return rowMajor( x, 0, 0, 0,
                         0, y, 0, 0,
                         0, 0, z, 0,
                         0, 0, 0, 1,
                         MatrixType.SCALING );
    }

    /**
     * Returns a matrix rotation around the given axis at the specified angle
     *
     * @param angle the angle, in radians.
     * @param axis  The vector representing the rotation axis. Must be normalized.
     * @return The rotation matrix
     */
    public static Matrix4F rotation( Vector3F axis, float angle ) {
        float c = (float) Math.cos( angle );
        float s = (float) Math.sin( angle );
        float C = 1 - c;

        float x = axis.getX();
        float y = axis.getY();
        float z = axis.getZ();

        return rowMajor( x * x * C + c, x * y * C - z * s, x * z * C + y * s, 0,
                         y * x * C + z * s, y * y * C + c, y * z * C - x * s, 0,
                         z * x * C - y * s, z * y * C + x * s, z * z * C + c, 0,
                         0, 0, 0, 1,
                         MatrixType.OTHER );
    }

    public static Matrix4F rotation( QuaternionF rotation ) {
        return rotation.toRotationMatrix().toMatrix4f();
    }

    public static Matrix4F rotation( QuaternionF rotation, Vector3F translation ) {
        // terms are zero'ed out so addition is faster
        return rotation.toRotationMatrix().toMatrix4f().plus( Matrix4F.translation( translation ) );
    }

    public static Matrix4F rotationX( float angle ) {
        float c = (float) Math.cos( angle );
        float s = (float) Math.sin( angle );

        return rowMajor( 1, 0, 0, 0,
                         0, c, -s, 0,
                         0, s, c, 0,
                         0, 0, 0, 1,
                         MatrixType.OTHER );
    }

    public static Matrix4F rotationY( float angle ) {
        float c = (float) Math.cos( angle );
        float s = (float) Math.sin( angle );

        return rowMajor( c, 0, s, 0,
                         0, 1, 0, 0,
                         -s, 0, c, 0,
                         0, 0, 0, 1,
                         MatrixType.OTHER );
    }

    public static Matrix4F rotationZ( float angle ) {
        float c = (float) Math.cos( angle );
        float s = (float) Math.sin( angle );

        return rowMajor( c, -s, 0, 0,
                         s, c, 0, 0,
                         0, 0, 1, 0,
                         0, 0, 0, 1,
                         MatrixType.OTHER );
    }

    public static Matrix4F rowMajor( float v00, float v01, float v02, float v03,
                                     float v10, float v11, float v12, float v13,
                                     float v20, float v21, float v22, float v23,
                                     float v30, float v31, float v32, float v33 ) {
        return rowMajor( v00, v01, v02, v03,
                         v10, v11, v12, v13,
                         v20, v21, v22, v23,
                         v30, v31, v32, v33,
                         MatrixType.OTHER );
    }

    public static Matrix4F rowMajor( float v00, float v01, float v02, float v03,
                                     float v10, float v11, float v12, float v13,
                                     float v20, float v21, float v22, float v23,
                                     float v30, float v31, float v32, float v33,
                                     MatrixType type ) {
        return new Matrix4F( v00, v01, v02, v03, v10, v11, v12, v13, v20, v21, v22, v23, v30, v31, v32, v33, type );
    }

    public static Matrix4F columnMajor( float v00, float v10, float v20, float v30,
                                        float v01, float v11, float v21, float v31,
                                        float v02, float v12, float v22, float v32,
                                        float v03, float v13, float v23, float v33 ) {
        return columnMajor( v00, v10, v20, v30,
                            v01, v11, v21, v31,
                            v02, v12, v22, v32,
                            v03, v13, v23, v33, MatrixType.OTHER );
    }

    public static Matrix4F columnMajor( float v00, float v10, float v20, float v30,
                                        float v01, float v11, float v21, float v31,
                                        float v02, float v12, float v22, float v32,
                                        float v03, float v13, float v23, float v33, MatrixType type ) {
        return new Matrix4F( v00, v01, v02, v03, v10, v11, v12, v13, v20, v21, v22, v23, v30,
                             v31,
                             v32,
                             v33, type );
    }

    public static Matrix4F fromGLBuffer( FloatBuffer buffer ) {
        buffer.rewind();

        // we actually can read them out in order. Java's order of execution is guaranteed to get this right
        return columnMajor( buffer.get(), buffer.get(), buffer.get(), buffer.get(), buffer.get(), buffer.get(), buffer.get(), buffer.get(), buffer.get(), buffer.get(), buffer.get(), buffer.get(), buffer.get(),
                            buffer.get(),
                            buffer.get(),
                            buffer.get(), MatrixType.OTHER );
    }

    /*---------------------------------------------------------------------------*
    * constructors
    *----------------------------------------------------------------------------*/

    // row-major order
    protected Matrix4F( float v00, float v01, float v02, float v03,
                        float v10, float v11, float v12, float v13,
                        float v20, float v21, float v22, float v23,
                        float v30, float v31, float v32, float v33,
                        MatrixType type ) {
        this.v00 = v00;
        this.v10 = v10;
        this.v20 = v20;
        this.v30 = v30;
        this.v01 = v01;
        this.v11 = v11;
        this.v21 = v21;
        this.v31 = v31;
        this.v02 = v02;
        this.v12 = v12;
        this.v22 = v22;
        this.v32 = v32;
        this.v03 = v03;
        this.v13 = v13;
        this.v23 = v23;
        this.v33 = v33;
        this.type = type;
    }

    public Matrix4F plus( Matrix4F m ) {
        return rowMajor( v00 + m.v00, v01 + m.v01, v02 + m.v02, v03 + m.v03,
                         v10 + m.v10, v11 + m.v11, v12 + m.v12, v13 + m.v13,
                         v20 + m.v20, v21 + m.v21, v22 + m.v22, v23 + m.v23,
                         v30 + m.v30, v31 + m.v31, v32 + m.v32, v33 + m.v33 );
    }

    public Matrix4F minus( Matrix4F m ) {
        return rowMajor( v00 - m.v00, v01 - m.v01, v02 - m.v02, v03 - m.v03,
                         v10 - m.v10, v11 - m.v11, v12 - m.v12, v13 - m.v13,
                         v20 - m.v20, v21 - m.v21, v22 - m.v22, v23 - m.v23,
                         v30 - m.v30, v31 - m.v31, v32 - m.v32, v33 - m.v33 );
    }

    public Matrix4F times( Matrix4F m ) {
        MatrixType type = MatrixType.OTHER;
        if ( this.type == MatrixType.TRANSLATION_3D && m.type == MatrixType.TRANSLATION_3D ) {
            type = MatrixType.TRANSLATION_3D;
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
        return rowMajor( this.v00 * m.v00 + this.v01 * m.v10 + this.v02 * m.v20 + this.v03 * m.v30,
                         this.v00 * m.v01 + this.v01 * m.v11 + this.v02 * m.v21 + this.v03 * m.v31,
                         this.v00 * m.v02 + this.v01 * m.v12 + this.v02 * m.v22 + this.v03 * m.v32,
                         this.v00 * m.v03 + this.v01 * m.v13 + this.v02 * m.v23 + this.v03 * m.v33,
                         this.v10 * m.v00 + this.v11 * m.v10 + this.v12 * m.v20 + this.v13 * m.v30,
                         this.v10 * m.v01 + this.v11 * m.v11 + this.v12 * m.v21 + this.v13 * m.v31,
                         this.v10 * m.v02 + this.v11 * m.v12 + this.v12 * m.v22 + this.v13 * m.v32,
                         this.v10 * m.v03 + this.v11 * m.v13 + this.v12 * m.v23 + this.v13 * m.v33,
                         this.v20 * m.v00 + this.v21 * m.v10 + this.v22 * m.v20 + this.v23 * m.v30,
                         this.v20 * m.v01 + this.v21 * m.v11 + this.v22 * m.v21 + this.v23 * m.v31,
                         this.v20 * m.v02 + this.v21 * m.v12 + this.v22 * m.v22 + this.v23 * m.v32,
                         this.v20 * m.v03 + this.v21 * m.v13 + this.v22 * m.v23 + this.v23 * m.v33,
                         this.v30 * m.v00 + this.v31 * m.v10 + this.v32 * m.v20 + this.v33 * m.v30,
                         this.v30 * m.v01 + this.v31 * m.v11 + this.v32 * m.v21 + this.v33 * m.v31,
                         this.v30 * m.v02 + this.v31 * m.v12 + this.v32 * m.v22 + this.v33 * m.v32,
                         this.v30 * m.v03 + this.v31 * m.v13 + this.v32 * m.v23 + this.v33 * m.v33,
                         type );
    }

    // regular multiplication
    public Vector4F times( Vector4F v ) {
        float x = this.v00 * v.getX() + this.v01 * v.getY() + this.v02 * v.getZ() + this.v03 * v.getW();
        float y = this.v10 * v.getX() + this.v11 * v.getY() + this.v12 * v.getZ() + this.v13 * v.getW();
        float z = this.v20 * v.getX() + this.v21 * v.getY() + this.v22 * v.getZ() + this.v23 * v.getW();
        float w = this.v30 * v.getX() + this.v31 * v.getY() + this.v32 * v.getZ() + this.v33 * v.getW();
        return new Vector4F( x, y, z, w );
    }

    // multiplication of the transpose of this matrix and v
    public Vector4F timesTranspose( Vector4F v ) {
        float x = this.v00 * v.getX() + this.v10 * v.getY() + this.v20 * v.getZ() + this.v30 * v.getW();
        float y = this.v01 * v.getX() + this.v11 * v.getY() + this.v21 * v.getZ() + this.v31 * v.getW();
        float z = this.v02 * v.getX() + this.v12 * v.getY() + this.v22 * v.getZ() + this.v32 * v.getW();
        float w = this.v03 * v.getX() + this.v13 * v.getY() + this.v23 * v.getZ() + this.v33 * v.getW();
        return new Vector4F( x, y, z, w );
    }

    // multiplication of the XYZ coordinates of the vector (not including translation, so we can preserve offsets)
    public Vector3F timesVector( Vector3F v ) {
        float x = this.v00 * v.getX() + this.v10 * v.getY() + this.v20 * v.getZ();
        float y = this.v01 * v.getX() + this.v11 * v.getY() + this.v21 * v.getZ();
        float z = this.v02 * v.getX() + this.v12 * v.getY() + this.v22 * v.getZ();
        return new Vector3F( x, y, z );
    }

    public Vector3F times( Vector3F v ) {
        return times( new Vector4F( v ) ).to3F();
    }

    public Vector3F timesTranspose( Vector3F v ) {
        return timesTranspose( new Vector4F( v ) ).to3F();
    }

    public Matrix4F transposed() {
        return rowMajor( v00, v10, v20, v30,
                         v01, v11, v21, v31,
                         v02, v12, v22, v32,
                         v03, v13, v23, v33 );
    }

    public float determinant() {
        return v03 * v12 * v21 * v30
               - v02 * v13 * v21 * v30
               - v03 * v11 * v22 * v30
               + v01 * v13 * v22 * v30
               + v02 * v11 * v23 * v30
               - v01 * v12 * v23 * v30
               - v03 * v12 * v20 * v31
               + v02 * v13 * v20 * v31
               + v03 * v10 * v22 * v31
               - v00 * v13 * v22 * v31
               - v02 * v10 * v23 * v31
               + v00 * v12 * v23 * v31
               + v03 * v11 * v20 * v32
               - v01 * v13 * v20 * v32
               - v03 * v10 * v21 * v32
               + v00 * v13 * v21 * v32
               + v01 * v10 * v23 * v32
               - v00 * v11 * v23 * v32
               - v02 * v11 * v20 * v33
               + v01 * v12 * v20 * v33
               + v02 * v10 * v21 * v33
               - v00 * v12 * v21 * v33
               - v01 * v10 * v22 * v33
               + v00 * v11 * v22 * v33;
    }

    public Matrix4F negated() {
        return rowMajor( -v00, -v01, -v02, -v03,
                         -v10, -v11, -v12, -v13,
                         -v20, -v21, -v22, -v23,
                         -v30, -v31, -v32, -v33 );
    }

    public Matrix4F inverted() {
        // TODO: optimizations for matrix types!

        float determinant = determinant();

        if ( determinant != 0 ) {
            return rowMajor(
                    ( -v31 * v22 * v13 + v21 * v32 * v13 + v31 * v12 * v23 - v11 * v32 * v23 - v21 * v12 * v33 + v11 * v22 * v33 ) / determinant,
                    ( v31 * v22 * v03 - v21 * v32 * v03 - v31 * v02 * v23 + v01 * v32 * v23 + v21 * v02 * v33 - v01 * v22 * v33 ) / determinant,
                    ( -v31 * v12 * v03 + v11 * v32 * v03 + v31 * v02 * v13 - v01 * v32 * v13 - v11 * v02 * v33 + v01 * v12 * v33 ) / determinant,
                    ( v21 * v12 * v03 - v11 * v22 * v03 - v21 * v02 * v13 + v01 * v22 * v13 + v11 * v02 * v23 - v01 * v12 * v23 ) / determinant,
                    ( v30 * v22 * v13 - v20 * v32 * v13 - v30 * v12 * v23 + v10 * v32 * v23 + v20 * v12 * v33 - v10 * v22 * v33 ) / determinant,
                    ( -v30 * v22 * v03 + v20 * v32 * v03 + v30 * v02 * v23 - v00 * v32 * v23 - v20 * v02 * v33 + v00 * v22 * v33 ) / determinant,
                    ( v30 * v12 * v03 - v10 * v32 * v03 - v30 * v02 * v13 + v00 * v32 * v13 + v10 * v02 * v33 - v00 * v12 * v33 ) / determinant,
                    ( -v20 * v12 * v03 + v10 * v22 * v03 + v20 * v02 * v13 - v00 * v22 * v13 - v10 * v02 * v23 + v00 * v12 * v23 ) / determinant,
                    ( -v30 * v21 * v13 + v20 * v31 * v13 + v30 * v11 * v23 - v10 * v31 * v23 - v20 * v11 * v33 + v10 * v21 * v33 ) / determinant,
                    ( v30 * v21 * v03 - v20 * v31 * v03 - v30 * v01 * v23 + v00 * v31 * v23 + v20 * v01 * v33 - v00 * v21 * v33 ) / determinant,
                    ( -v30 * v11 * v03 + v10 * v31 * v03 + v30 * v01 * v13 - v00 * v31 * v13 - v10 * v01 * v33 + v00 * v11 * v33 ) / determinant,
                    ( v20 * v11 * v03 - v10 * v21 * v03 - v20 * v01 * v13 + v00 * v21 * v13 + v10 * v01 * v23 - v00 * v11 * v23 ) / determinant,
                    ( v30 * v21 * v12 - v20 * v31 * v12 - v30 * v11 * v22 + v10 * v31 * v22 + v20 * v11 * v32 - v10 * v21 * v32 ) / determinant,
                    ( -v30 * v21 * v02 + v20 * v31 * v02 + v30 * v01 * v22 - v00 * v31 * v22 - v20 * v01 * v32 + v00 * v21 * v32 ) / determinant,
                    ( v30 * v11 * v02 - v10 * v31 * v02 - v30 * v01 * v12 + v00 * v31 * v12 + v10 * v01 * v32 - v00 * v11 * v32 ) / determinant,
                    ( -v20 * v11 * v02 + v10 * v21 * v02 + v20 * v01 * v12 - v00 * v21 * v12 - v10 * v01 * v22 + v00 * v11 * v22 ) / determinant
            );
        }
        else {
            throw new RuntimeException( "Matrix could not be inverted" );
        }
    }


    /**
     * Store this matrix in a float buffer. The matrix is stored in column
     * major (openGL) order.
     *
     * @param buf The buffer to store this matrix in
     */
    public void writeToBuffer( FloatBuffer buf ) {
        buf.rewind();
        buf.put( new float[]{
                v00, v10, v20, v30,
                v01, v11, v21, v31,
                v02, v12, v22, v32,
                v03, v13, v23, v33
        } );
    }

    /**
     * Store this matrix in a float buffer. The matrix is stored in row
     * major (maths) order.
     *
     * @param buf The buffer to store this matrix in
     */
    public void writeTransposeToBuffer( FloatBuffer buf ) {
        buf.rewind();
        buf.put( new float[]{
                v00, v01, v02, v03,
                v10, v11, v12, v13,
                v20, v21, v22, v23,
                v30, v31, v32, v33
        } );
    }

    @Override
		public String toString() {
        return mkString( asList(
                mkString( asList( v00, v01, v02, v03 ), " " ),
                mkString( asList( v10, v11, v12, v13 ), " " ),
                mkString( asList( v20, v21, v22, v23 ), " " ),
                mkString( asList( v30, v31, v32, v33 ), " " )
        ), "\n" );
    }

    public Vector3F getTranslation() {
        return new Vector3F( v03, v13, v23 );
    }

    public Vector3F getScaling() {
        return new Vector3F( v00, v11, v22 );
    }

}
