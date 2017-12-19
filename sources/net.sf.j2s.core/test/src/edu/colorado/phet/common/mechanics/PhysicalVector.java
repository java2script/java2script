// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47761 $
 * Date modified : $Date: 2011-01-07 11:49:12 -0600 (Fri, 07 Jan 2011) $
 */
package edu.colorado.phet.common.mechanics;

/**
 * This class represents mathmatical vectors. It has package visibility,
 * and is intended to be subclassed to represent vectors of specific
 * dimensionalities.
 *
 * @author Ron LeMaster
 * @version $Revision: 47761 $
 */
public class PhysicalVector {

    private double[] scalars;

    protected PhysicalVector( int numDimensions ) {
        scalars = new double[numDimensions];
    }

    protected double getScalarAt( int idx ) {
        return scalars[idx];
    }

    protected void setScalarAt( int idx, double value ) {
        scalars[idx] = value;
    }

    @Override
		public boolean equals( Object obj ) {
        boolean result = true;
        if ( this.getClass() != obj.getClass() ) {
            result = false;
        }
        else {
            PhysicalVector that = (PhysicalVector) obj;
            for ( int i = 0; result == true && i < scalars.length; i++ ) {
                if ( this.scalars[i] != that.scalars[i] ) {
                    result = false;
                }
            }
        }
        return result;
    }

    public double getMagnitudeSq() {
        double sum = 0;
        for ( int i = 0; i < scalars.length; i++ ) {
            sum += scalars[i] * scalars[i];
        }
        return sum;
    }

    public double getMagnitude() {
        return Math.sqrt( getMagnitudeSq() );
    }

    /**
     * @deprecated
     */
    @Deprecated
		public double getLength() {
        return getMagnitude();
    }

    protected PhysicalVector add( PhysicalVector that, PhysicalVector result ) {

        // TODO check that vectors are the same length, or class
        for ( int i = 0; i < scalars.length; i++ ) {
            result.scalars[i] = this.scalars[i] + that.scalars[i];
        }
        return result;
    }

    protected PhysicalVector generalNormalize() {
        double length = getMagnitude();
        return multiply( 1.0 / length, this );
    }

    protected PhysicalVector multiply( double scale, PhysicalVector result ) {
        for ( int i = 0; i < scalars.length; i++ ) {
            result.scalars[i] = scalars[i] * scale;
        }
        return result;
    }

    public double dot( PhysicalVector that ) {

        // TODO check that vectors are the same length, or class

        double result = 0;
        for ( int i = 0; i < scalars.length; i++ ) {
            result += this.scalars[i] * that.scalars[i];
        }
        return result;
    }

    public double distance( PhysicalVector that ) {
        return Math.sqrt( distanceSquared( that ) );
    }

    public double distanceSquared( PhysicalVector that ) {

        // Check that operation can be done
        if ( this.scalars.length != that.scalars.length ) {
            throw new RuntimeException( "Vectors of different dimensionalities set to PhysicalVector.distanceSquared" );
        }
        double result = 0;
        for ( int i = 0; i < scalars.length; i++ ) {
            double diff = this.scalars[i] - that.scalars[i];
            result += diff * diff;
        }
        return result;
    }

    protected PhysicalVector subtract( PhysicalVector that, PhysicalVector result ) {

        // TODO check that vectors are the same length, or class

        for ( int i = 0; i < scalars.length; i++ ) {
            result.scalars[i] = this.scalars[i] - that.scalars[i];
        }
        return result;
    }

    /*
    public static Vector2D average( Vector2D[] dp ) {
        phys2d.imaging.Average x = new phys2d.imaging.Average();
        phys2d.imaging.Average y = new phys2d.imaging.Average();
        for( int i = 0; i < dp.length; i++ ) {
            x.layoutPane( dp[i].getX() );
            y.layoutPane( dp[i].getY() );
        }
        return new Vector2D( x.value(), y.value() );
    }
    */
}
