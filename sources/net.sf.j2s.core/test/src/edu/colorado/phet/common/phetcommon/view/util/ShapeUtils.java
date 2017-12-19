// Copyright 2002-2011, University of Colorado

package edu.colorado.phet.common.phetcommon.view.util;

import java.awt.Shape;
import java.awt.geom.Area;
import java.awt.geom.Point2D;
import java.util.Iterator;
import java.util.List;

import edu.colorado.phet.common.phetcommon.math.vector.Vector2D;

/**
 * Utilities related to Shapes.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 * @author John Blanco
 */
public class ShapeUtils {

    /* not intended for instantiation */
    private ShapeUtils() {
    }

    /**
     * Do two Shapes intersect?
     *
     * @param shape1
     * @param shape2
     * @return
     */
    public static final boolean intersects( Shape shape1, Shape shape2 ) {
        Area area1 = new Area( shape1 );
        Area area2 = new Area( shape2 );
        area1.intersect( area2 );
        return !area1.isEmpty();
    }

    /**
     * Returns the intersection of 2 Shapes.
     *
     * @param s1
     * @param s2
     * @return
     */
    public static final Shape intersect( Shape s1, Shape s2 ) {
        Area area = new Area( s1 );
        area.intersect( new Area( s2 ) );
        return area;
    }

    /**
     * Adds a variable number of Shapes.
     *
     * @param shape
     * @param shapes
     * @return
     */
    public static final Shape add( Shape shape, Shape... shapes ) {
        Area area = new Area( shape );
        for ( Shape s : shapes ) {
            area.add( new Area( s ) );
        }
        return area;
    }

    /**
     * Subtracts a variable number of Shapes, in the order of the args.
     *
     * @param shape
     * @param shapes
     * @return
     */
    public static final Shape subtract( Shape shape, Shape... shapes ) {
        Area area = new Area( shape );
        for ( Shape s : shapes ) {
            area.subtract( new Area( s ) );
        }
        return area;
    }

    /**
     * Creates a shape from a set of points.  The points must be in an order
     * that, when connected by straight lines, would form a closed shape.
     * Otherwise strange and undefined output may result.
     *
     * @param points Set of points to connect.
     * @return Shape that the provided points define.
     */
    public static Shape createShapeFromPoints( List<Point2D> points ) {
        DoubleGeneralPath path = new DoubleGeneralPath();
        path.moveTo( points.get( 0 ) );
        for ( Point2D point : points ) {
            path.lineTo( point );
        }
        path.closePath();
        return path.getGeneralPath();
    }

    /**
     * Creates a shape from a set of points specified as Vector2D.
     * The points must be in an order that, when connected by
     * straight lines, would form a closed shape.
     * Otherwise strange and undefined output may result.
     *
     * @param points Set of Vector2D points to connect.
     * @return Shape that the provided points define.
     */
    public static Shape createShapeFromPoints( Iterable<Vector2D> points ) {
        Iterator<Vector2D> iterator = points.iterator();
        DoubleGeneralPath path = new DoubleGeneralPath( iterator.next() );
        while ( iterator.hasNext() ) {
            path.lineTo( iterator.next() );
        }
        path.closePath();
        return path.getGeneralPath();
    }

    /**
     * Creates a rounded shape from a set of points.  The points must be in an
     * order that, if connected by straight lines, would form a closed shape.
     *
     * @param points Set of points to connect.
     * @return Shape that the provided points define.
     */
    public static Shape createRoundedShapeFromPoints( List<Point2D> points ) {
        DoubleGeneralPath path = new DoubleGeneralPath();
        path.moveTo( points.get( 0 ) );
        for ( int i = 0; i < points.size(); i++ ) {
            Vector2D segmentStartPoint = new Vector2D( points.get( i ) );
            Vector2D segmentEndPoint = new Vector2D( points.get( ( i + 1 ) % points.size() ) );
            Vector2D previousPoint = new Vector2D( points.get( i - 1 >= 0 ? i - 1 : points.size() - 1 ) );
            Vector2D nextPoint = new Vector2D( points.get( ( i + 2 ) % points.size() ) );
            Vector2D controlPoint1 = extrapolateControlPoint( previousPoint, segmentStartPoint, segmentEndPoint );
            Vector2D controlPoint2 = extrapolateControlPoint( nextPoint, segmentEndPoint, segmentStartPoint );
            path.curveTo( controlPoint1.getX(), controlPoint1.getY(), controlPoint2.getX(), controlPoint2.getY(), segmentEndPoint.getX(), segmentEndPoint.getY() );
        }
        return path.getGeneralPath();
    }

    public static Shape createRoundedShapeFromVectorPoints( List<Vector2D> points ) {
        DoubleGeneralPath path = new DoubleGeneralPath();
        path.moveTo( points.get( 0 ) );
        for ( int i = 0; i < points.size(); i++ ) {
            Vector2D segmentStartPoint = points.get( i );
            Vector2D segmentEndPoint = points.get( ( i + 1 ) % points.size() );
            Vector2D previousPoint = points.get( i - 1 >= 0 ? i - 1 : points.size() - 1 );
            Vector2D nextPoint = points.get( ( i + 2 ) % points.size() );
            Vector2D controlPoint1 = extrapolateControlPoint( previousPoint, segmentStartPoint, segmentEndPoint );
            Vector2D controlPoint2 = extrapolateControlPoint( nextPoint, segmentEndPoint, segmentStartPoint );
            path.curveTo( controlPoint1.getX(), controlPoint1.getY(), controlPoint2.getX(), controlPoint2.getY(), segmentEndPoint.getX(), segmentEndPoint.getY() );
        }
        return path.getGeneralPath();
    }

    /**
     * Extrapolates a control point given three input points.  The resulting
     * control point is for the segment from point y to point z, and the
     * resulting curve would reasonably connect to point x.
     *
     * @param x Location where the line is "coming from".
     * @param y Beginning of line segment.
     * @param z End of line segment.
     * @return Control point for segment from y to z.
     */
    public static Vector2D extrapolateControlPoint( Vector2D x, Vector2D y, Vector2D z ) {
        Vector2D xy = y.minus( x );
        Vector2D yz = z.minus( y );
        return y.plus( xy.times( 0.25 ).plus( yz.times( 0.25 ) ) );
    }
}
