// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.math;


/**
 * TrigCache is a cache of trig function values.
 * It sacrifices precision for speed.
 * The value returned is the closest value in the cache.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
public class TrigCache {

    //----------------------------------------------------------------------------
    // Instance data
    //----------------------------------------------------------------------------

    // cache of sine values
    private double[] _sineValues;

    // cache of cosine values
    private double[] _cosineValues;

    //----------------------------------------------------------------------------
    // Constructors & initializers
    //----------------------------------------------------------------------------

    /**
     * Constructor.
     *
     * @param cacheSize determines the precision of the cache, bigger cache is more precise
     */
    public TrigCache( int cacheSize ) {
        initCache( cacheSize );
    }

    /*
    * Initializes the cache, computes values using Math library.
    */
    private void initCache( final int cacheSize ) {

        double deltaRadians = ( 2 * Math.PI / cacheSize );

        _sineValues = new double[cacheSize];
        _cosineValues = new double[cacheSize];

        for ( int i = 0; i < cacheSize; i++ ) {
            _sineValues[i] = Math.sin( i * deltaRadians );
            _cosineValues[i] = Math.cos( i * deltaRadians );
        }
    }

    //----------------------------------------------------------------------------
    // Trig functions
    //----------------------------------------------------------------------------

    /**
     * Gets the approximate sine of some angle.
     *
     * @param radians the angle, in radians
     * @return the sine
     */
    public double sin( final double radians ) {

        // Map the radians value to an index
        double deltaRadians = ( 2 * Math.PI / _sineValues.length );
        double adjustedRadians = Math.abs( radians ) % ( 2 * Math.PI );
        int index = (int) Math.round( adjustedRadians / deltaRadians );
        if ( index > _sineValues.length - 1 ) {
            index = 0;
        }

        // Look up the value
        double value = _sineValues[index];

        // Correct the value's sign.
        if ( radians < 0 ) {
            value = -value;
        }

        return value;
    }

    /**
     * Gets the approximate cosine of some angle.
     *
     * @param radians the angle, in radians
     * @return the sine
     */
    public double cos( final double radians ) {

        // Map the radians value to an index
        double deltaRadians = ( 2 * Math.PI / _cosineValues.length );
        double adjustedRadians = Math.abs( radians ) % ( 2 * Math.PI );
        int index = (int) Math.round( adjustedRadians / deltaRadians );
        if ( index > _sineValues.length - 1 ) {
            index = 0;
        }

        // Look up the value.
        double value = _cosineValues[index];

        return value;
    }

    //----------------------------------------------------------------------------
    // Test
    //----------------------------------------------------------------------------

    public static void main( String[] args ) {

        // Test configuration
        final int cacheSize = 1000;
        final double minRadians = -4 * Math.PI;
        final double maxRadians = +4 * Math.PI;
        final double deltaRadians = ( 2 * Math.PI ) / 100;
        final double acceptableError = 0.00000001;

        System.out.println( "trig cache size is " + cacheSize );
        System.out.println( "test range is " + minRadians + " to " + maxRadians + " radians, in " + deltaRadians + " radian intervals" );
        System.out.println( "acceptable error is " + acceptableError + " radians" );
        System.out.println( "unacceptable errors will be printed to System.out" );
        System.out.println( "begin test..." );

        TrigCache trigCache = new TrigCache( cacheSize );

        for ( double radians = minRadians; radians <= maxRadians; radians += deltaRadians ) {

            double sinApproximate = trigCache.sin( radians );
            double sinActual = Math.sin( radians );
            double sinError = Math.abs( sinApproximate - sinActual );
            if ( sinError > acceptableError ) {
                System.out.println( "ERROR: radians=" + radians + " sinApproximate=" + sinApproximate + " sinActual=" + sinActual + " error=" + sinError );
            }

            double cosApproximate = trigCache.cos( radians );
            double cosActual = Math.cos( radians );
            double cosError = Math.abs( cosApproximate - cosActual );
            if ( cosError > acceptableError ) {
                System.out.println( "ERROR: radians=" + radians + " cosApproximate=" + cosApproximate + " cosActual=" + cosActual + " error=" + cosError );
            }
        }

        System.out.println( "end test" );
    }
}
