// Copyright 2002-2011, University of Colorado
package edu.colorado.phet.common.phetcommon.simsharing.components;


/**
 * Helper class for sim-sharing drag handlers.
 * Accumulates drag points, and (on demand) creates a set of sim-sharing parameters that describes the accumulated points.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 * @author Sam Reid
 */
public class SimSharingDragPoints {
//
//    private ArrayList<Point2D> points = new ArrayList<Point2D>();
//
//    public SimSharingDragPoints() {
//        this.points = new ArrayList<Point2D>();
//    }
//
//    public void add( Point2D p ) {
//        points.add( p );
//    }
//
//    public void clear() {
//        points.clear();
//    }
//
//    public ParameterSet getParameters() {
//        ArrayList<Double> xValues = extract( points, new Function1<Point2D, Double>() {
//            public Double apply( Point2D point2D ) {
//                return point2D.getX();
//            }
//        } );
//        ArrayList<Double> yValues = extract( points, new Function1<Point2D, Double>() {
//            public Double apply( Point2D point2D ) {
//                return point2D.getY();
//            }
//        } );
//        return ParameterSet.parameterSet( numberDragEvents, points.size() ).
//                with( minX, min( xValues ) ).
//                with( maxX, max( xValues ) ).
//                with( averageX, average( xValues ) ).
//                with( minY, min( yValues ) ).
//                with( maxY, max( yValues ) ).
//                with( averageY, average( yValues ) );
//    }
//
//    private ArrayList<Double> extract( ArrayList<Point2D> all, Function1<Point2D, Double> extractor ) {
//        ArrayList<Double> list = new ArrayList<Double>();
//        for ( Point2D point2D : all ) {
//            list.add( extractor.apply( point2D ) );
//        }
//        return list;
//    }
//
//    private static double min( ArrayList<Double> v ) {
//        return Collections.min( v );
//    }
//
//    private static double max( ArrayList<Double> v ) {
//        return Collections.max( v );
//    }
//
//    private static double average( ArrayList<Double> v ) {
//        double sum = 0;
//        for ( Double entry : v ) {
//            sum += entry;
//        }
//        return sum / v.size();
//    }
}