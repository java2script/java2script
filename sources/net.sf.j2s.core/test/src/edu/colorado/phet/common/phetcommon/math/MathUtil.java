// Copyright 2002-2012, University of Colorado

package edu.colorado.phet.common.phetcommon.math;

import java.awt.geom.AffineTransform;
import java.awt.geom.Ellipse2D;
import java.awt.geom.Line2D;
import java.awt.geom.Point2D;
import java.util.Random;

import edu.colorado.phet.common.phetcommon.math.vector.MutableVector2D;
import edu.colorado.phet.common.phetcommon.util.DoubleRange;
import edu.colorado.phet.common.phetcommon.util.IntegerRange;

/**
 * A class of static general purpose math utilities.
 *
 * @author Ron LeMaster
 * @version $Revision:14677 $
 */
public class MathUtil {
    private static final Random random = new Random( System.currentTimeMillis() );
    public static final double SQRT_2 = Math.sqrt( 2 );
		private static AffineTransform tempTx;

    /**
     * Returns a pseudo-randomly distributed +1 or -1
     *
     * @return the next number
     */
    public static int nextRandomSign() {
        return random.nextBoolean() ? 1 : -1;
    }

    /**
     * Returns the logarithm of a number to a specified base.
     *
     * @param number
     * @param base
     * @return the log
     */
    public static double logBaseX( double number, double base ) {
        return Math.log( number ) / Math.log( base );
    }

    /**
     * Returns the log base 10 of a number.
     * This function is needed for Java 1.4.
     * java.lang.Math.log10 was added in Java 1.5.
     *
     * @param number
     * @return
     */
    public static double log10( double number ) {
        return logBaseX( number, 10 );
    }

    /**
     * Returns +1 or -1, reflecting the sign of the argument
     *
     * @param d
     * @return +1 or -1
     */
    public static int getSign( double d ) {
        if ( d != 0
             && !Double.isNaN( d )
             && !Double.isInfinite( d ) ) {
            return (int) ( Math.abs( d ) / d );
        }
        else {
            return 1;
        }
    }

    /**
     * Returns +1 or -1, reflecting the sign of the argument
     *
     * @param f
     * @return +1 or -1
     */
    public static int getSign( float f ) {
        if ( f != 0
             && !Float.isNaN( f )
             && !Float.isInfinite( f ) ) {
            return (int) ( Math.abs( f ) / f );
        }
        else {
            return 1;
        }
    }

    /**
     * Returns +1 or -1, reflecting the sign of the argument
     *
     * @param i
     * @return +1 or -1
     */
    public static int getSign( int i ) {
        return i >= 0 ? 1 : -1;
    }

    /**
     * Finds the roots of a quadratic equation.
     *
     * @param quadRoots An array in which the roots are to be returned
     * @param a
     * @param b
     * @param c
     * @return The roots of the equation, if not imaginary. Otherwise,
     *         returns NaN
     */
    public static double[] quadraticRoots( double[] quadRoots, double a, double b, double c ) {
        double sqrt = (float) Math.sqrt( ( b * b ) - 4 * a * c );

        quadRoots[0] = ( -b + sqrt ) / ( 2 * a );
        quadRoots[1] = ( -b - sqrt ) / ( 2 * a );
        return quadRoots;
    }

    /**
     * Computes the roots of a quadratic equation
     *
     * @param a
     * @param b
     * @param c
     * @return the roots of a quadratic equation
     */
    public static double[] quadraticRoots( double a, double b, double c ) {
        double[] roots = new double[2];
        return quadraticRoots( roots, a, b, c );
    }

    /**
     * Finds the roots of a quadratic equation.
     *
     * @param quadRoots An array in which the roots are to be returned
     * @param a
     * @param b
     * @param c
     * @return The roots of the equation, if not imaginary. Otherwise,
     *         returns NaN
     */
    public static float[] quadraticRoots( float[] quadRoots, float a, float b, float c ) {
        float sqrt = (float) Math.sqrt( ( b * b ) - 4 * a * c );

        quadRoots[0] = ( -b + sqrt ) / ( 2 * a );
        quadRoots[1] = ( -b - sqrt ) / ( 2 * a );
        return quadRoots;
    }

    /**
     * Computes the roots of a quadratic equation
     *
     * @param a
     * @param b
     * @param c
     * @return the roots of a quadratic equation
     */
    public static float[] quadraticRoots( float a, float b, float c ) {
        float[] roots = new float[2];
        return quadraticRoots( roots, a, b, c );
    }

    /**
     * Tells if two float values are equal, within a specified tolerance
     *
     * @param x
     * @param y
     * @param eps The tolerance to be applied to the equality test
     * @return true if the two values are within epsilon of each other (exclusive).
     */
    public static boolean isApproxEqual( float x, float y, float eps ) {
        return Math.abs( x - y ) < eps;
    }

    /**
     * Tells if two Point2D objects are equal by value, within a specified eps
     *
     * @param p1
     * @param p2
     * @param eps The tolerance to be applied the to equality test
     * @return true if the points are equal by value within epsilon of each other
     */
    public static boolean isApproxEqual( Point2D p1, Point2D p2, double eps ) {
        return MathUtil.isApproxEqual( p1.getX(), p2.getX(), eps )
               && MathUtil.isApproxEqual( p1.getY(), p2.getY(), eps );
    }

    /**
     * Tells if two double values are equal, within a specified tolerance
     *
     * @param x
     * @param y
     * @param eps The tolerance to be applied to the equality test
     * @return true if the two values are within epsilon of each other (exclusive).
     */
    public static boolean isApproxEqual( double x, double y, double eps ) {
        return Math.abs( x - y ) < eps;
    }

    /**
     * Determines the position of a point that is the reflection of a specified point across a line.
     *
     * @param p
     * @param ptOnLine
     * @param lineAngle Anlge of line in radians
     * @return the reflected point.
     */
    public static Point2D reflectPointAcrossLine( Point2D p, Point2D ptOnLine, double lineAngle ) {

        double alpha = lineAngle % ( Math.PI * 2 );
        double gamma = Math.atan2( ( p.getY() - ptOnLine.getY() ), ( p.getX() - ptOnLine.getX() ) ) % ( Math.PI * 2 );
        double theta = ( 2 * alpha - gamma ) % ( Math.PI * 2 );
        double d = getDistance(p, ptOnLine);
        return new Point2D.Double( ptOnLine.getX() + d * Math.cos( theta ),
                                   ptOnLine.getY() + d * Math.sin( theta ) );
    }

    /**
     * BH optimized away Double.distance()
     * @param p1
     * @param p2
     * @return
     */
    public static double getDistance(Point2D p1, Point2D p2) {
    	double dx = ((Point2D.Double)p2).x - ((Point2D.Double)p1).x;
    	double dy = ((Point2D.Double)p2).y - ((Point2D.Double)p1).y;
    	return Math.sqrt(dx * dx + dy * dy);
		}

    /**
     * BH optimized away Double.distanceSq()
     * @param p1
     * @param p2
     * @return
     */
    public static double getDistanceSq(Point2D.Double p1, Point2D.Double p2) {
    	double dx = p2.x - p1.x;
    	double dy = p2.y - p1.y;
    	return dx * dx + dy * dy;
		}

		/**
     * Determines the position of a point that is the reflection of a specified point across a line
     * and fills a return Point2D.Double rather than creating a new point.
     *
     * @param p
     * @param ptOnLine
     * @param lineAngle Anlge of line in radians
     * @param return pt.
     * @return the reflected point.
     */
    public static void reflectPointAcrossLinePt ( Point2D.Double p, Point2D.Double ptOnLine, double lineAngle, Point2D.Double ret ) {

        double alpha = lineAngle % ( Math.PI * 2 );
        double gamma = Math.atan2( ( p.getY() - ptOnLine.getY() ), ( p.getX() - ptOnLine.getX() ) ) % ( Math.PI * 2 );
        double theta = ( 2 * alpha - gamma ) % ( Math.PI * 2 );
        double d = getDistance(p, ptOnLine);
        ret.x = ptOnLine.getX() + d * Math.cos( theta );
        ret.y = ptOnLine.getY() + d * Math.sin( theta );
    }

    /**
     * Computes the intersection of two line segments.
     *
     * @param l1
     * @param l2
     * @return the intersection of two line segments.
     */
    public static Point2D.Double getLineSegmentsIntersection( Line2D l1, Line2D l2 ) {
        return getLineSegmentsIntersection( l1.getP1(), l1.getP2(), l2.getP1(), l2.getP2() );
    }

    /**
     * Computes the intersection of two line segments. Algorithm taked from Paul Bourke, 1989:
     * http://astronomy.swin.edu.au/~pbourke/geometry/lineline2d/
     *
     * @param p1 One endpoint of line 1
     * @param p2 The other endpoint of line 1
     * @param p3 One endpoint of line 2
     * @param p4 The other endpoint of line 2
     * @return the intersection of two line segments.
     */
    public static Point2D.Double getLineSegmentsIntersection( Point2D p1, Point2D p2,
                                                              Point2D p3, Point2D p4 ) {
        Point2D.Double result = new Point2D.Double();
        double x1 = p1.getX();
        double y1 = p1.getY();
        double x2 = p2.getX();
        double y2 = p2.getY();
        double x3 = p3.getX();
        double y3 = p3.getY();
        double x4 = p4.getX();
        double y4 = p4.getY();

        double numA = ( x4 - x3 ) * ( y1 - y3 ) - ( y4 - y3 ) * ( x1 - x3 );
        double numB = ( x2 - x1 ) * ( y1 - y3 ) - ( y2 - y1 ) * ( x1 - x3 );
        double denom = ( y4 - y3 ) * ( x2 - x1 ) - ( x4 - x3 ) * ( y2 - y1 );

        // If denominator is 0, the lines are parallel or coincident
        if ( denom == 0 ) {
            result.x = Float.NaN;
            result.y = Float.NaN;
        }
        else {
            double ua = numA / denom;
            double ub = numB / denom;

            // ua and ub must both be in the range 0 to 1 for the segments
            // to have an interesection pt.
            if ( !( ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1 ) ) {
              result.x = Float.NaN;
              result.y = Float.NaN;
            }
            else {
                result.x = x1 + ua * ( x2 - x1 );
                result.y = y1 + ua * ( y2 - y1 );
            }
        }
        return result;
    }

    /**
     * Computes the intersection of a line segment with a line. Algorithm taked from Paul Bourke, 1989:
     * http://astronomy.swin.edu.au/~pbourke/geometry/lineline2d/
     *
     * @param p1 Endpoint of line segment
     * @param p2 Other endpoint of line segment
     * @param p3 Point on line
     * @param p4 Point on line
     * @return the intersection of a segment with a line.
     */
    public static Point2D.Double getSegmentLineIntersection( Point2D p1, Point2D p2,
                                                             Point2D p3, Point2D p4 ) {
        Point2D.Double result = new Point2D.Double();
        double x1 = p1.getX();
        double y1 = p1.getY();
        double x2 = p2.getX();
        double y2 = p2.getY();
        double x3 = p3.getX();
        double y3 = p3.getY();
        double x4 = p4.getX();
        double y4 = p4.getY();

        double numA = ( x4 - x3 ) * ( y1 - y3 ) - ( y4 - y3 ) * ( x1 - x3 );
        double numB = ( x2 - x1 ) * ( y1 - y3 ) - ( y2 - y1 ) * ( x1 - x3 );
        double denom = ( y4 - y3 ) * ( x2 - x1 ) - ( x4 - x3 ) * ( y2 - y1 );

        // If denominator is 0, the lines are parallel or coincident
        if ( denom == 0 ) {
          result.x = Double.NaN;
          result.y = Double.NaN;
        }
        else {
            double ua = numA / denom;
            double ub = numB / denom;

            // ua and ub must both be in the range 0 to 1 for the segments
            // to have an interesection pt.
            if ( !( ub >= 0 && ub <= 1 ) ) {
              result.x = Double.NaN;
              result.y = Double.NaN;
            }
            else {
                result.x = x1 + ua * ( x2 - x1 );
                result.y = y1 + ua * ( y2 - y1 );
            }
        }
        return result;
    }

    /**
     * Computes the intersection of two lines. Algorithm taked from Paul Bourke, 1989:
     * http://astronomy.swin.edu.au/~pbourke/geometry/lineline2d/
     *
     * @param l1
     * @param l2
     * @return the intersection of two lines.
     */
    public static Point2D.Double getLinesIntersection( Line2D l1, Line2D l2 ) {
        return getLinesIntersection( l1.getP1(), l1.getP2(), l2.getP1(), l2.getP2() );
    }

    /**
     * Computes the intersection of two lines. Algorithm taked from Paul Bourke, 1989:
     * http://astronomy.swin.edu.au/~pbourke/geometry/lineline2d/
     *
     * @param p1 A point on line 1
     * @param p2 A point on line 1
     * @param p3 A point on line 2
     * @param p4 A point on line 2
     * @return the intersection of two lines.
     */
    public static Point2D.Double getLinesIntersection( Point2D p1, Point2D p2,
                                                       Point2D p3, Point2D p4 ) {
        Point2D.Double result = new Point2D.Double();
        double x1 = p1.getX();
        double y1 = p1.getY();
        double x2 = p2.getX();
        double y2 = p2.getY();
        double x3 = p3.getX();
        double y3 = p3.getY();
        double x4 = p4.getX();
        double y4 = p4.getY();

        double numA = ( x4 - x3 ) * ( y1 - y3 ) - ( y4 - y3 ) * ( x1 - x3 );
        double denom = ( y4 - y3 ) * ( x2 - x1 ) - ( x4 - x3 ) * ( y2 - y1 );

        // If denominator is 0, the lines are parallel or coincident
        if ( denom == 0 ) {
          result.x = Double.NaN;
          result.y = Double.NaN;
        }
        else {
            double ua = numA / denom;
            result.x = x1 + ua * ( x2 - x1 );
            result.y = y1 + ua * ( y2 - y1 );
        }
        return result;
    }


	/**
	 * BH based on getLineSegmentsIntersection
	 * 
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 * @param x3
	 * @param y3
	 * @param x4
	 * @param y4
	 * @return true if a segment intersects a line.
	 */
	public static boolean segmentsIntersect(double x1, double y1, double x2,
			double y2, double x3, double y3, double x4, double y4) {
		
		double denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
		// If denominator is 0, the lines are parallel or coincident
		if (denom == 0)
			return false;

		double num = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
		double u = num / denom;
		if (u < 0 || u > 1)
			return false;

		num = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);
		u = num / denom;
		if (u < 0 || u > 1)
			return false;

		return true;
	}

    /**
     * @param m1
     * @param b1
     * @param m2
     * @param b2
     * @return the intersection of two lines.
     */
    public static Point2D.Float getLinesIntersection( float m1, float b1, float m2, float b2 ) {

        Point2D.Float result = new Point2D.Float( 0, 0 );
        if ( m1 == m2 ) {
          result.x = Float.NaN;
          result.y = Float.NaN;
        }
        else if ( m1 == Float.NEGATIVE_INFINITY || m1 == Float.POSITIVE_INFINITY ) {
            // Handle vertical lines!!
            throw new RuntimeException( "Method does not handle vertical lines yet" );
        }
        else {
            float x = ( b2 - b1 ) / ( m1 - m2 );
            result.y = m1 * x + b1;
            result.x = x;
        }
        return result;
    }

    /**
     * Clamps a value to a specified range.
     *
     * @param min   the minimum value
     * @param value the value to be clamped
     * @param max   the maximum value
     * @return the clamped value
     */
    public static double clamp( double min, double value, double max ) {
        if ( Double.isNaN( min ) || Double.isNaN( value ) || Double.isNaN( max ) ) {
            return Double.NaN;
        }
        else if ( value < min ) {
            return min;
        }
        else if ( value > max ) {
            return max;
        }
        return value;
    }

    /**
     * Clamps a value to a specified range.
     *
     * @param min   the minimum value
     * @param value the value to be clamped
     * @param max   the maximum value
     * @return the clamped value
     */
    public static int clamp( int min, int value, int max ) {
        if ( value < min ) {
            return min;
        }
        else if ( value > max ) {
            return max;
        }
        return value;
    }

    public static double clamp( double value, DoubleRange range ) {
        return clamp( range.getMin(), value, range.getMax() );
    }

    public static double clamp( double value, IntegerRange range ) {
        return clamp( range.getMin(), value, range.getMax() );
    }

    /**
     * Returns the angle, in radian, of the angle with respect to the x axis of
     * a directed line segment connecting two points.
     *
     * @param origin The origin of the directed line segment
     * @param end    The endpoint of the directed line segment
     */
    public static double getAngle( Point2D origin, Point2D end ) {
        double theta = Math.atan2( end.getY() - origin.getY(), end.getX() - origin.getX() );
        return theta;
    }

    /**
     * Returns the point in Cartesian coordinates spcified by radial coordinates with a
     * specified origin in Cartesian space.
     *
     * @param r
     * @param theta
     * @param origin
     * @return
     */
    public static Point2D radialToCartesian( double r, double theta, Point2D origin ) {
        double x = r * Math.cos( theta );
        double y = r * Math.sin( theta );
        return new Point2D.Double( origin.getX() + x, origin.getY() + y );
    }

    public static Point2D getPointOnLineClosestToPoint( Line2D line, Point2D point ) {
        double deltaX = ( ( line.getX1() ) - ( line.getX2() ) );
        double deltaY = ( ( line.getY1() ) - ( line.getY2() ) );

        double x = ( line.getX1() ) - ( deltaX * ( deltaX * ( ( line.getX1() ) - ( point.getX() ) ) + deltaY * ( ( line.getY1() ) - ( point.getY() ) ) ) ) / ( deltaX * deltaX + deltaY * deltaY );
        double y = ( deltaX * ( -( ( line.getX2() ) * ( line.getY1() ) ) + ( line.getX1() ) * ( line.getY2() ) + deltaY * ( point.getX() ) ) + deltaY * deltaY * ( point.getY() ) ) / ( deltaX * deltaX + deltaY * deltaY );

        return new Point2D.Double( x, y );
    }

    /**
     * Retrieves a vector that proceeds from the line to the specified point,
     * along the shortest direction between the two.
     *
     * @param line  The line.
     * @param point The point.
     * @return A vector from the line to the point, along the shortest distance
     *         between the two.
     */
    public static MutableVector2D getVectorFromLineToPoint( Line2D line, Point2D point ) {
        Point2D pointOnLine = getPointOnLineClosestToPoint( line, point );

        return new MutableVector2D( point.getX() - pointOnLine.getX(), point.getY() - pointOnLine.getY() );
    }

    public static double signum( double v ) {
        if ( v < 0.0 ) { return -1.0; }
        if ( v > 0.0 ) { return 1.0; }

        return 0.0;
    }

    /**
     * Returns the largest element in the array, determined by >.  Array must have at least one element.
     *
     * @param v
     * @return
     */
    public static double max( double[] v ) {
        assert v.length > 0;
        double max = v[0];
        for ( int i = 0; i < v.length; i++ ) {
            if ( v[i] > max ) {
                max = v[i];
            }
        }
        return max;
    }

    /**
     * This class manages a running average.
     */
    public static class Average {
        private double sum;
        private int num;

        public Average() {
            reset();
        }

        /**
         * Incorporate another value into this average.
         *
         * @param newValue the value to add to this average.
         */
        public void addValue( double newValue ) {
            sum += newValue;
            num++;
        }

        /**
         * Determine the average since the last reset.
         *
         * @return the average since the last reset.
         */
        public double getAverage() {
            return sum / num;
        }

        /**
         * Returns the number of values since last reset().
         *
         * @return the number of values since last reset().
         */
        public int numValues() {
            return num;
        }

        /**
         * Reset the Average.
         */
        public void reset() {
            sum = 0;
            num = 0;
        }
    }


    /**
     * Finds the least common multiple of two integers
     *
     * @param a
     * @param b
     * @return the least common multiple of a and b
     */
    public static int getLeastCommonMultiple( int a, int b ) {
        boolean found = false;
        int aFactor = 0;

        // Get positive versions of both integers
        a = a < 0 ? -a : a;
        b = b < 0 ? -b : b;

        // Search for the least common multiple
        while ( !found ) {
            aFactor++;
            for ( int bFactor = a / b; bFactor * b <= aFactor * a; bFactor++ ) {
                if ( bFactor * b == aFactor * a ) {
                    found = true;
                }
            }
        }
        return a * aFactor;
    }

    /**
     * Returns the points where a line intersects a circle, if they exist.
     * Adapted from:
     * Weisstein, Eric W. "Circle-Line Intersection."
     * From MathWorld--A Wolfram Web Resource. http://mathworld.wolfram.com/Circle-LineIntersection.html
     * <p/>
     * Modified to handle circles that are not centered at (0,0).
     *
     * @param c An Ellipse2D. Assumes width == height
     * @param l A Line2D.
     * @return An array of two points. If the line is tangent to the circle, the array contains two points
     *         with the same coordinates. If the line does not intersect the circle, the array contains two nulls.
     */
    public static Point2D[] getLineCircleIntersection( Ellipse2D c, Line2D l ) {

        double cx = c.getCenterX();
        double cy = c.getCenterY();
        double x1 = l.getX1() - cx;
        double x2 = l.getX2() - cx;
        double y1 = l.getY1() - cy;
        double y2 = l.getY2() - cy;
        double r = c.getWidth() / 2;
        double dx = x2 - x1;
        double dy = y2 - y1;
        double dr = Math.sqrt( dx * dx + dy * dy );
        double D = x1 * y2 - x2 * y1;

        double discriminant = r * r * dr * dr - D * D;
        double radical = Math.sqrt( discriminant );
        double numeratorX_1 = D * dy - MathUtil.getSign( dy ) * dx * radical;
        double numeratorX_2 = D * dy + MathUtil.getSign( dy ) * dx * radical;

        double numeratorY_1 = -D * dx - Math.abs( dy ) * radical;
        double numeratorY_2 = -D * dx + Math.abs( dy ) * radical;

        Point2D[] result = new Point2D[2];
        if ( discriminant >= 0 ) {
            double denom = dr * dr;
            result[0] = new Point2D.Double( cx + numeratorX_1 / denom, cy + numeratorY_1 / denom );
            result[1] = new Point2D.Double( cx + numeratorX_2 / denom, cy + numeratorY_2 / denom );
        }
        return result;
    }

    /**
     * Returns the projection of one vector on another. The arguments are
     * not modified.
     *
     * @param v1
     * @param v2
     * @return A vector that is the projection of v1 on v2
     */
    public static MutableVector2D getProjection( MutableVector2D v1, MutableVector2D v2 ) {
        MutableVector2D proj = new MutableVector2D( v2 ).normalize();
        proj = proj.scale( v1.dot( proj ) );
        return proj;
    }

    public static long daysToMilliseconds( long days ) {
        return days * 24 * 60 * 60 * 1000; // days * hours/day * minutes/hour * sec/minute * ms/sec
    }

    /**
     * Rounds equivalent to RoundingMode.HALF_UP, which was added in Java 1.6.
     * This is nearest-neighbor rounding, the method that most of us were taught in grammar school.
     */
    public static int roundHalfUp( double d ) {
        return (int) ( d + ( ( d >= 0 ) ? 0.5 : -0.5 ) );
    }

    /*
     * Euclid's algorithm for computing the greatest common divisor (GCD) of two integers
     */
    public static int getGreatestCommonDivisor( int a, int b ) {
        if ( b == 0 ) {
            return a;
        }
        else {
            return getGreatestCommonDivisor( b, a % b );
        }
    }

    // Returns true if the specified value is an integer.
    public static boolean isInteger( double value ) {
        return value == Math.round( value );
    }

		public static boolean segmentsIntersectL2(Line2D.Double a, Line2D.Double b) {
			return segmentsIntersect(a.x1, a.y1, a.x2, a.y2, b.x1, b.y1, b.x2, b.y2);			
		}
		
		public static boolean segmentsIntersectLP2(Line2D.Double a, Point2D.Double p1, Point2D.Double p2) {
			return segmentsIntersect(a.x1, a.y1, a.x2, a.y2, p1.x, p1.y, p2.x, p2.y);			
		}

		/**f
		 * SwingjS optimization to avoid overloaded AffineTransform.setToRotation
		 * 
		 * @param tx
		 * @param theta
		 * @param x
		 * @param y
		 */
		public static AffineTransform setToRotation(AffineTransform tx, double theta,
				double x, double y) {
			if (tx == null)
				tx = (tempTx == null ? (tempTx  = new AffineTransform()) : tempTx);
 			tx.setToRotation(theta, x, y);
			return tx;
		}

}
