// Copyright 2002-2011, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: samreid $
 * Revision : $Revision: 47760 $
 * Date modified : $Date: 2011-01-07 11:42:54 -0600 (Fri, 07 Jan 2011) $
 */

package edu.colorado.phet.common.phetcommon.math;

import java.util.Arrays;

/**
 * Determines the median value of an array of numbers.
 *
 * @author Ron LeMaster
 * @version $Revision: 47760 $
 */
public class MedianFilter {

    private double[] source;
    private double[] target;

    public MedianFilter( double[] data ) {
        source = data;
        target = new double[source.length];
    }

    public static double getMedian( double[] data ) {
        double[] workingData = new double[data.length];
        for ( int i = 0; i < data.length; i++ ) {
            workingData[i] = data[i];
        }
        return getMedianInternal( workingData );
    }

    private static double getMedianInternal( double[] data ) {
        Arrays.sort( data );
        return data[data.length / 2];
    }

    public double[] filter( int width ) {
        double[] temp = new double[width];

        for ( int i = 0; i < source.length - width + 1; i++ ) {

            // sort local group
            for ( int k = 0; k < width; k++ ) {
                temp[k] = source[i + k];
            }
            target[i + width / 2] = getMedianInternal( temp );
        }

        // Fix up the ends of the target array
        for ( int i = 0; i < width / 2; i++ ) {
            target[i] = target[width / 2];
        }
        for ( int i = target.length - width / 2; i < target.length; i++ ) {
            target[i] = target[target.length - width / 2 - 1];
        }
        for ( int i = 0; i < source.length; i++ ) {
            source[i] = target[i];
        }

        return source;
    }

}
