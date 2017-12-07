// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.math;

/**
 * PolarCartesianConverter is a collection of conversions between
 * Polar and Cartesian coordinate systems.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class PolarCartesianConverter {

    private PolarCartesianConverter() {
    }

    public static double getX( double radius, double angle ) {
        return radius * Math.cos( angle );
    }

    public static double getY( double radius, double angle ) {
        return radius * Math.sin( angle );
    }

    public static double getRadius( double x, double y ) {
        return Math.sqrt( ( x * x ) + ( y * y ) );
    }

    public static double getAngle( double x, double y ) {
        return Math.atan2( y, x );
    }
}
