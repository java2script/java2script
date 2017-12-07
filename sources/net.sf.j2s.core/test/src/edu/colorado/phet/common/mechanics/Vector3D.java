// Copyright 2002-2012, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: olsonj $
 * Revision : $Revision: 66117 $
 * Date modified : $Date: 2012-07-21 20:36:43 -0500 (Sat, 21 Jul 2012) $
 */
package edu.colorado.phet.common.mechanics;

import edu.colorado.phet.common.phetcommon.math.vector.MutableVector2D;

/**
 * Vector3D
 *
 * @author Ron LeMaster
 * @version $Revision: 66117 $
 */
public class Vector3D extends PhysicalVector {

    public static Vector3D createCrossProduct( MutableVector2D v1, MutableVector2D v2 ) {
        double z = v1.magnitude() * v2.magnitude() * Math.sin( v2.getAngle() - v1.getAngle() );
        return new Vector3D( 0, 0, z );
    }

    public Vector3D() {
        this( 0, 0, 0 );
    }

    public Vector3D( MutableVector2D vector ) {
        this( vector.getX(), vector.getY(), 0 );
    }

    public Vector3D( Vector3D vector ) {
        this( vector.getX(), vector.getY(), vector.getZ() );
    }

    public Vector3D( double x, double y, double z ) {
        super( NUM_DIMENSIONS );
        this.setX( x );
        this.setY( y );
        this.setZ( z );
        if ( Double.isNaN( x ) )
        //throw new RuntimeException( "x was NaN" );
        {
            System.out.println( "Vector2D constructor: x was NaN" );
        }
        if ( Double.isNaN( y ) )
        //throw new RuntimeException( "Y was NaN" );
        {
            System.out.println( "Vector2D constructor: y was NaN" );
        }
    }

    @Override
		public String toString() {
        return "[ " + getX() + " " + getY() + " " + getZ() + "]";
    }

    public Vector3D setComponents( double x, double y, double z ) {
        this.setX( x );
        this.setY( y );
        this.setZ( z );
        return this;
    }

    public Vector3D setComponents( Vector3D that ) {
        this.setComponents( that.getX(), that.getY(), that.getZ() );
        return this;
    }

    public double getX() {
        return getScalarAt( X );
    }

    public void setX( double x ) {
        setScalarAt( X, x );
    }

    public double getY() {
        return getScalarAt( Y );
    }

    public void setY( double y ) {
        setScalarAt( Y, y );
    }

    public double getZ() {
        return getScalarAt( Z );
    }

    public void setZ( double z ) {
        setScalarAt( Z, z );
    }

    public Vector3D add( Vector3D that ) {
        return (Vector3D) super.add( that, this );
    }

    public Vector3D normalize() {
        return (Vector3D) super.generalNormalize();
    }

    public Vector3D multiply( double scale ) {
        return (Vector3D) super.multiply( scale, this );
    }

    public Vector3D subtract( Vector3D that ) {
        return (Vector3D) super.subtract( that, this );
    }

    public Vector3D subtract( double x, double y, double z ) {
        Vector3D temp = new Vector3D( x, y, z );
        return this.subtract( temp );
    }

    public Vector3D crossProduct( Vector3D that ) {
        Vector3D result = new Vector3D( this.getY() * that.getZ() - this.getZ() * that.getY(),
                                        -this.getX() * that.getZ() + this.getZ() * that.getX(),
                                        this.getX() * that.getY() - this.getY() * that.getX() );
        return result;
    }

    //
    // Static fields and methods
    //
    private final static int X = 0;
    private final static int Y = 1;
    private final static int Z = 2;
    private final static int NUM_DIMENSIONS = 3;

}
