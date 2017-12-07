// Copyright 2002-2012, University of Colorado
package edu.colorado.phet.common.phetcommon.math;

import edu.colorado.phet.common.phetcommon.math.vector.Vector3F;
import edu.colorado.phet.lombok.EqualsAndHashCode;
import edu.colorado.phet.lombok.ToString;

/**
 * Floating-point version of a quaternion. Very helpful for rotation-based computations. See http://en.wikipedia.org/wiki/Quaternion
 *
 * TODO: convert from JME-style parameterization into classical mathematical description?
 *
 * @author Jonathan Olson
 */
public @EqualsAndHashCode(callSuper = false) @ToString class QuaternionF {
    public final float x;
    public final float y;
    public final float z;
    public final float w;

    @Override
    public int hashCode() {
      return Float.floatToIntBits(x) ^ Float.floatToIntBits(y)
          ^ Float.floatToIntBits(z) ^ Float.floatToIntBits(w);
    }
    
    @Override
		public boolean equals(Object o) {
    	if (!(o instanceof QuaternionF)) {
    		return false;
    	}
    	QuaternionF m = (QuaternionF) o;
    	return (m.x == x && m.y == y && m.z == z && m.w == w);    		
    }
    

    public QuaternionF() {
        x = 0;
        y = 0;
        z = 0;
        w = 1;
    }

    public QuaternionF( float x, float y, float z, float w ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    // addition
    public QuaternionF plus( QuaternionF quat ) {
        return new QuaternionF( x + quat.x, y + quat.y, z + quat.z, w + quat.w );
    }

    // scalar multiplication
    public QuaternionF times( float f ) {
        return new QuaternionF( x * f, y * f, z * f, w * f );
    }

    // standard quaternion multiplication (hamilton product)
    public QuaternionF times( QuaternionF quat ) {
        // TODO: note why this is the case? product noted everywhere is the other one mentioned!
        // mathematica-style
//        return new QuaternionF(
//                x * quat.x - y * quat.y - z * quat.z - w * quat.w,
//                x * quat.y + y * quat.x + z * quat.w - w * quat.z,
//                x * quat.z - y * quat.w + z * quat.x + w * quat.y,
//                x * quat.w + y * quat.z - z * quat.y + w * quat.x
//        );

        // JME-style
        return new QuaternionF(
                x * quat.w - z * quat.y + y * quat.z + w * quat.x,
                -x * quat.z + y * quat.w + z * quat.x + w * quat.y,
                x * quat.y - y * quat.x + z * quat.w + w * quat.z,
                -x * quat.x - y * quat.y - z * quat.z + w * quat.w
        );

        /*
            Mathematica!
            In[13]:= Quaternion[-0.0, -0.0024999974, 0.0, 0.9999969] ** Quaternion[-0.9864071, 0.0016701065, -0.0050373166, 0.16423558]
            Out[13]= Quaternion[-0.164231, 0.00750332, 0.00208069, -0.986391]

            In[17]:= Quaternion[-0.0024999974, 0.0, 0.9999969, 0] ** Quaternion[0.0016701065, -0.0050373166, 0.16423558, -0.9864071]
            Out[17]= Quaternion[-0.164239, -0.986391, 0.00125951, 0.00750332]

            JME contains the rearrangement of what is typically called {w,x,y,z}
         */
    }

    // multiplication that transforms the vector by the quaternion
    public Vector3F times( Vector3F v ) {
        if ( v.magnitude() == 0 ) {
            return new Vector3F();
        }

        return new Vector3F(
                w * w * v.x + 2 * y * w * v.z - 2 * z * w * v.y + x * x * v.x + 2 * y * x * v.y + 2 * z * x * v.z - z * z * v.x - y * y * v.x,
                2 * x * y * v.x + y * y * v.y + 2 * z * y * v.z + 2 * w * z * v.x - z * z * v.y + w * w * v.y - 2 * x * w * v.z - x * x * v.y,
                2 * x * z * v.x + 2 * y * z * v.y + z * z * v.z - 2 * w * y * v.x - y * y * v.z + 2 * w * x * v.y - x * x * v.z + w * w * v.z
        );
    }

    public float magnitude() {
        return (float) Math.sqrt( magnitudeSquared() );
    }

    public float magnitudeSquared() {
        return x * x + y * y + z * z + w * w;
    }

    public QuaternionF normalized() {
        float magnitude = magnitude();
        if ( magnitude == 0 ) {
            throw new UnsupportedOperationException( "Cannot normalize a zero-magnitude quaternion." );
        }
        return times( 1 / magnitude );
    }

    public QuaternionF negated() {
        return new QuaternionF( -x, -y, -z, -w );
    }

    public static QuaternionF fromEulerAngles( float yaw, float roll, float pitch ) {
        float sinPitch = (float) Math.sin( pitch * 0.5f );
        float cosPitch = (float) Math.cos( pitch * 0.5f );
        float sinRoll = (float) Math.sin( roll * 0.5f );
        float cosRoll = (float) Math.cos( roll * 0.5f );
        float sinYaw = (float) Math.sin( yaw * 0.5f );
        float cosYaw = (float) Math.cos( yaw * 0.5f );

        float a = cosRoll * cosPitch;
        float b = sinRoll * sinPitch;
        float c = cosRoll * sinPitch;
        float d = sinRoll * cosPitch;

        return new QuaternionF(
                a * sinYaw + b * cosYaw,
                d * cosYaw + c * sinYaw,
                c * cosYaw - d * sinYaw,
                a * cosYaw - b * sinYaw
        );
    }

    public Matrix3F toRotationMatrix() {
        // see http://en.wikipedia.org/wiki/Rotation_matrix#Quaternion

        float norm = magnitudeSquared();
        float flip = ( norm == 1f ) ? 2f : ( norm > 0f ) ? 2f / norm : 0;

        float xx = x * x * flip;
        float xy = x * y * flip;
        float xz = x * z * flip;
        float xw = w * x * flip;
        float yy = y * y * flip;
        float yz = y * z * flip;
        float yw = w * y * flip;
        float zz = z * z * flip;
        float zw = w * z * flip;

        return Matrix3F.columnMajor(
                1 - ( yy + zz ),
                ( xy + zw ),
                ( xz - yw ),
                ( xy - zw ),
                1 - ( xx + zz ),
                ( yz + xw ),
                ( xz + yw ),
                ( yz - xw ),
                1 - ( xx + yy )
        );
    }

    public static QuaternionF fromRotationMatrix( Matrix3F matrix ) {
        float v00 = matrix.v00;
        float v01 = matrix.v01;
        float v02 = matrix.v02;
        float v10 = matrix.v10;
        float v11 = matrix.v11;
        float v12 = matrix.v12;
        float v20 = matrix.v20;
        float v21 = matrix.v21;
        float v22 = matrix.v22;

        // from graphics gems code
        float trace = v00 + v11 + v22;
        float sqt;

        // we protect the division by s by ensuring that s>=1
        if ( trace >= 0 ) {
            sqt = (float) Math.sqrt( trace + 1 );
            return new QuaternionF(
                    ( v21 - v12 ) * 0.5f / sqt,
                    ( v02 - v20 ) * 0.5f / sqt,
                    ( v10 - v01 ) * 0.5f / sqt,
                    0.5f * sqt
            );
        }
        else if ( ( v00 > v11 ) && ( v00 > v22 ) ) {
            sqt = (float) Math.sqrt( 1.0f + v00 - v11 - v22 );
            return new QuaternionF(
                    sqt * 0.5f,
                    ( v10 + v01 ) * 0.5f / sqt,
                    ( v02 + v20 ) * 0.5f / sqt,
                    ( v21 - v12 ) * 0.5f / sqt
            );
        }
        else if ( v11 > v22 ) {
            sqt = (float) Math.sqrt( 1.0f + v11 - v00 - v22 );
            return new QuaternionF(
                    ( v10 + v01 ) * 0.5f / sqt,
                    sqt * 0.5f,
                    ( v21 + v12 ) * 0.5f / sqt,
                    ( v02 - v20 ) * 0.5f / sqt
            );
        }
        else {
            sqt = (float) Math.sqrt( 1.0f + v22 - v00 - v11 );
            return new QuaternionF(
                    ( v02 + v20 ) * 0.5f / sqt,
                    ( v21 + v12 ) * 0.5f / sqt,
                    sqt * 0.5f,
                    ( v10 - v01 ) * 0.5f / sqt
            );
        }
    }

    /**
     * Find a quaternion that transforms a unit vector A into a unit vector B. There
     * are technically multiple solutions, so this only picks one.
     *
     * @param a Unit vector A
     * @param b Unit vector B
     * @return A quaternion s.t. Q * A = B
     */
    public static QuaternionF getRotationQuaternion( Vector3F a, Vector3F b ) {
        return QuaternionF.fromRotationMatrix( Matrix3F.rotateAToB( a, b ) );
    }

    // spherical linear interpolation - blending two quaternions
    public static QuaternionF slerp( QuaternionF a, QuaternionF b, float t ) {
        // if they are identical, just return one of them
        if ( a.x == b.x && a.y == b.y && a.z == b.z && a.w == b.w ) {
            return a;
        }

        float dot = ( a.x * b.x ) + ( a.y * b.y ) + ( a.z * b.z ) + ( a.w * b.w );

        if ( dot < 0.0f ) {
            b = b.negated();
            dot = -dot;
        }

        // how much of each quaternion should be contributed
        float ratioA = 1 - t;
        float ratioB = t;

        // tweak them if necessary
        if ( ( 1 - dot ) > 0.1f ) {
            float theta = (float) Math.acos( dot );
            float invSinTheta = (float) ( 1f / Math.sin( theta ) );

            ratioA = (float) ( Math.sin( ( 1 - t ) * theta ) * invSinTheta );
            ratioB = (float) ( Math.sin( ( t * theta ) ) * invSinTheta );
        }

        return new QuaternionF(
                ( ratioA * a.x ) + ( ratioB * b.x ),
                ( ratioA * a.y ) + ( ratioB * b.y ),
                ( ratioA * a.z ) + ( ratioB * b.z ),
                ( ratioA * a.w ) + ( ratioB * b.w )
        );
    }
}
