package edu.colorado.phet.common.phetcommon.math;

import edu.colorado.phet.common.phetcommon.util.function.Function1;

/**
 * Any 1-dimensional optimization (minimization) algorithms. Notable references:
 * http://shmathsoc.org.cn/lu/core%20part/Chap4.pdf
 *
 * @author Jonathan Olson
 */
public class Optimization1D {

    // one-dimensional search, see http://shmathsoc.org.cn/lu/core%20part/Chap4.pdf
    public static double goldenSectionSearch( Function1<Double, Double> f, double lowBound, double highBound, double epsilon ) {
        final double K = 1.618034;
        double interval = ( highBound - lowBound ) / K;
        double xa = highBound - interval;
        double xb = lowBound + interval;
        double fa = f.apply( xa );
        double fb = f.apply( xb );

        while ( true ) {
            if ( fa >= fb ) {
                lowBound = xa;
                xa = xb;
                xb = lowBound + interval / K;
                fa = fb;
                fb = f.apply( xb );
            }
            else {
                highBound = xb;
                xb = xa;
                xa = highBound - interval / K;
                fb = fa;
                fa = f.apply( xa );
            }

            if ( interval * K < epsilon || xa > xb ) {
                double x;
                if ( fa > fb ) {
                    x = 0.5 * ( xb + highBound );
                }
                else if ( fa == fb ) {
                    x = 0.5 * ( xa + xb );
                }
                else {
                    x = 0.5 * ( lowBound + xa );
                }
                return x;
            }

            interval = interval / K;
        }
    }

    public static void main( String[] args ) {
        // testing finding the minimum
        System.out.println( goldenSectionSearch( new Function1<Double, Double>() {
            @Override
						public Double apply( Double x ) {
                return ( x - 0.5 ) * ( x - 0.5 ) + 2;
            }
        }, 0, 1, 0.01 ) );
    }
}
