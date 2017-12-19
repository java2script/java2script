// Copyright 2002-2012, University of Colorado

/*
 * CVS Info -
 * Filename : $Source$
 * Branch : $Name$
 * Modified by : $Author: olsonj $
 * Revision : $Revision: 66113 $
 * Date modified : $Date: 2012-07-21 04:27:33 -0500 (Sat, 21 Jul 2012) $
 */
package edu.colorado.phet.common.phetcommon.view.util;

import java.awt.Shape;
import java.awt.geom.GeneralPath;
import java.awt.geom.PathIterator;
import java.awt.geom.Point2D;

import edu.colorado.phet.common.phetcommon.math.vector.AbstractVector2D;
import edu.colorado.phet.common.phetcommon.math.vector.Vector2D;

/**
 * This adapter class for GeneralPath allows provides an interface in double coordinates.
 * <p/>
 * A better design would be to extend GeneralPath, but this is impossible since the GeneralPath is final in Java API.
 *
 * @author ?
 * @version $Revision: 66113 $
 */
public class DoubleGeneralPath {
    GeneralPath path;

    public DoubleGeneralPath() {
        this.path = new GeneralPath();
    }

    public DoubleGeneralPath( Shape shape ) {
        path = new GeneralPath( shape );
    }

    public DoubleGeneralPath( Vector2D pt ) {
        this( pt.getX(), pt.getY() );
    }

    public DoubleGeneralPath( Point2D pt ) {
        this( pt.getX(), pt.getY() );
    }

    public DoubleGeneralPath( double x, double y ) {
        path = new GeneralPath();
        path.moveTo( (float) x, (float) y );
    }

    public void moveTo( double x, double y ) {
        path.moveTo( (float) x, (float) y );
    }

    public void moveTo( Point2D pt ) {
        moveTo( pt.getX(), pt.getY() );
    }

    public void moveTo( AbstractVector2D vec ) {
        moveTo( vec.getX(), vec.getY() );
    }

    public void moveToRelative( AbstractVector2D delta ) {
        moveToRelative( delta.getX(), delta.getY() );
    }

    public void moveToRelative( Point2D delta ) {
        moveToRelative( delta.getX(), delta.getY() );
    }

    public void moveToRelative( double dx, double dy ) {
        Point2D cur = path.getCurrentPoint();
        moveTo( cur.getX() + dx, cur.getY() + dy );
    }

    //Quad through the control point to the target point, convenience method
    public void quadTo( Vector2D controlPoint, Vector2D target ) {
        quadTo( controlPoint.getX(), controlPoint.getY(), target.getX(), target.getY() );
    }

    public void quadTo( double x1, double y1, double x2, double y2 ) {
        path.quadTo( (float) x1, (float) y1, (float) x2, (float) y2 );
    }

    public void curveTo( double x1, double y1, double x2, double y2, double x3, double y3 ) {
        path.curveTo( (float) x1, (float) y1, (float) x2, (float) y2, (float) x3, (float) y3 );
    }

    //Bezier curve through the 2 control points to the target point, convenience method
    public void curveTo( Vector2D controlPoint1, Vector2D controlPoint2, Vector2D targetPoint ) {
        curveTo( controlPoint1.getX(), controlPoint1.getY(), controlPoint2.getX(), controlPoint2.getY(), targetPoint.getX(), targetPoint.getY() );
    }

    public void lineTo( double x, double y ) {
        path.lineTo( (float) x, (float) y );
    }

    public void lineTo( Point2D pt ) {
        lineTo( pt.getX(), pt.getY() );
    }

    public void lineToRelative( double dx, double dy ) {
        Point2D cur = path.getCurrentPoint();
        lineTo( cur.getX() + dx, cur.getY() + dy );
    }

    public Point2D getCurrentPoint() {
        return path.getCurrentPoint();
    }

    public void lineToRelative( AbstractVector2D vec ) {
        Point2D cur = path.getCurrentPoint();
        lineTo( cur.getX() + vec.getX(), cur.getY() + vec.getY() );
    }

    public GeneralPath getGeneralPath() {
        return path;
    }

    public void lineTo( AbstractVector2D loc ) {
        lineTo( loc.getX(), loc.getY() );
    }

    public void reset() {
        path.reset();
    }

    public void closePath() {
        path.closePath();
    }

    public void append( Shape shape, boolean connect ) {
        path.append( shape, connect );
    }

    public void append( PathIterator pathIterator, boolean connect ) {
        path.append( pathIterator, connect );
    }
}
